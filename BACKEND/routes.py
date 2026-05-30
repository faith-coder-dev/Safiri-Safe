import os
import uuid
from flask import request, jsonify, make_response
from flask_bcrypt import Bcrypt
from datetime import datetime, timedelta
from flask_jwt_extended import (
    create_access_token, 
    set_access_cookies, 
    jwt_required, 
    get_jwt_identity
)
from models import db, User, Payment, Trip, Profile, Location

bcrypt = Bcrypt()

def register():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    
    if not email or not password or not name:
        return jsonify({"error": "Missing required registration parameters"}), 400
        
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Account already exists"}), 409
        
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(
        email=email,
        password_hash=hashed_password,
        account_tier='free'
    )
    
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Account successfully initialized"}), 201


def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
        
    user = User.query.filter_by(email=email).first()
    
    if user and bcrypt.check_password_hash(user.password_hash, password):
        response = make_response(jsonify({
            "message": "Authentication successful",
            "user": {"id": user.id, "email": user.email, "account_tier": user.account_tier}
        }), 200)

        access_token = create_access_token(identity=str(user.id))
        set_access_cookies(response, access_token)
        return response
        
    return jsonify({"error": "Invalid credentials"}), 401


def process_gateway_webhook():
    webhook_signature = request.headers.get('verif-hash')
    secret_hash = os.environ.get('GATEWAY_SECRET_HASH', 'fallback_secure_key_123')
    
    if not webhook_signature or webhook_signature != secret_hash:
        return jsonify({"error": "Unauthorized"}), 401
 
    payload = request.get_json() or {}
    
    if payload.get("status") == "successful":
        user_billing_target = payload.get("customer", {}).get("email")
        active_user = User.query.filter_by(email=user_billing_target).first()
        
        if active_user:
            active_user.account_tier = 'premium'
            active_user.expiry_date = datetime.utcnow() + timedelta(days=30)
            
            new_audit = Payment(
                user_id=active_user.id,
                gateway_ref=payload.get("tx_ref"),
                amount=payload.get("amount"),
                status='success'
            )
            
            db.session.add(new_audit)
            db.session.commit()
            return jsonify({"status": "Success"}), 200
            
        return jsonify({"error": "User not found"}), 404
 
    return jsonify({"status": "Acknowledged"}), 400


@jwt_required()
def get_current_user_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(int(current_user_id))
    
    if not user:
        return jsonify({"error": "Profile missing"}), 404
        
    return jsonify({
        "authenticated_user_id": user.id,
        "email": user.email,
        "account_tier": user.account_tier
    }), 200


@jwt_required()
def initialize_trip_session():
    current_user_id = get_jwt_identity()
    data = request.get_json() or {}
    
    start = data.get('start_point')
    dest = data.get('destination')
    
    if not start or not dest:
        return jsonify({"error": "Missing parameters"}), 400
        
    active_profile = Profile.query.filter_by(user_id=int(current_user_id)).first()
    if not active_profile:
        active_profile = Profile(user_id=int(current_user_id), profile_name="Self")
        db.session.add(active_profile)
        db.session.commit()
        
    user_agent = request.headers.get('User-Agent', 'Unknown-Device')
    raw_ip = request.remote_addr or '127.0.0.1'
    truncated_ip = ".".join(raw_ip.split(".")[:3]) + ".0"
    token = str(uuid.uuid4()) + str(uuid.uuid4())[:28]
    
    new_trip = Trip(
        profile_id=active_profile.id,
        start_point=start,
        destination=dest,
        tracking_token=token,
        status='active',
        device_fingerprint=user_agent,
        ip_fingerprint=truncated_ip
    )
    
    db.session.add(new_trip)
    db.session.commit()
    
    return jsonify({
        "trip_id": new_trip.id,
        "tracking_token": new_trip.tracking_token
    }), 201


@jwt_required()
def end_trip_session(trip_id):
    current_user_id = get_jwt_identity()
    trip = Trip.query.join(Profile).filter(
        Trip.id == trip_id, 
        Profile.user_id == int(current_user_id)
    ).first()
    
    if not trip:
        return jsonify({"error": "Unauthorized"}), 404
        
    trip.status = 'completed'
    db.session.commit()
    return jsonify({"message": "Journey closed"}), 200


def stream_device_coordinates(active_tracking_token):
    current_trip = Trip.query.filter_by(tracking_token=active_tracking_token, status='active').first()
    
    if not current_trip:
        return jsonify({"error": "Session not found"}), 404
        
    agent = request.headers.get('User-Agent', 'Unknown-Device')
    ip = request.remote_addr or '127.0.0.1'
    truncated_ip = ".".join(ip.split(".")[:3]) + ".0"
    
    if current_trip.device_fingerprint != agent or current_trip.ip_fingerprint != truncated_ip:
        current_trip.status = 'flagged'
        db.session.commit()
        return jsonify({"error": "Security breach"}), 403
        
    data = request.get_json() or {}
    lat = data.get('latitude')
    lng = data.get('longitude')
    bat = data.get('battery')
    
    if lat is None or lng is None or bat is None:
        return jsonify({"error": "Missing parameters"}), 400
        
    coordinate_tick = Location(trip_id=current_trip.id, latitude=lat, longitude=lng, battery_pct=int(bat))
    db.session.add(coordinate_tick)
    db.session.commit()
    
    return jsonify({"status": "Logged"}), 200


@jwt_required()
def view_live_journey(active_tracking_token):
    current_viewer_id = get_jwt_identity()
    current_trip = Trip.query.filter_by(tracking_token=active_tracking_token).first()
    
    if not current_trip:
        return jsonify({"error": "Link invalid"}), 404
        
    if current_trip.status in ['completed', 'flagged']:
        return jsonify({"error": "Session closed"}), 410
        
    owner_id = Profile.query.get(current_trip.profile_id).user_id
    
    if int(current_viewer_id) != owner_id:
        return jsonify({"error": "Access Denied"}), 403
        
    # PAGINATION: Fetch the last 50 location ticks for history
    location_history = Location.query.filter_by(trip_id=current_trip.id)\
        .order_by(Location.timestamp.desc())\
        .limit(50).all()
    
    # Format the data (reversed so the path renders oldest -> newest)
    history_data = [{
        "latitude": float(tick.latitude),
        "longitude": float(tick.longitude),
        "battery_pct": tick.battery_pct,
        "last_updated": tick.timestamp.isoformat()
    } for tick in reversed(location_history)]
        
    return jsonify({
        "trip_id": current_trip.id,
        "status": current_trip.status,
        "history": history_data
    }), 200