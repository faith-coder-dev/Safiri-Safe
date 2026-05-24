from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Initialize database mapper
db = SQLAlchemy()

# 1. USERS TABLE
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    account_tier = db.Column(db.String(20), default='free')
    expiry_date = db.Column(db.DateTime, nullable=True)
    auto_renew = db.Column(db.Boolean, default=False)
    
    # Relationships linking down to children tables (with cascade delete enabled)
    profiles = db.relationship('Profile', backref='user', cascade="all, delete-orphan", lazy=True)
    payments = db.relationship('Payment', backref='user', lazy=True)

    def __repr__(self):
        return f"<User {self.email}>"


# 2. PROFILES TABLE
class Profile(db.Model):
    __tablename__ = 'profiles'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    profile_name = db.Column(db.String(50), nullable=False)
    avatar_url = db.Column(db.String(256), nullable=True)
    device_token = db.Column(db.String(256), nullable=True)
    
    # Relationship linking down to Trips
    trips = db.relationship('Trip', backref='profile', cascade="all, delete-orphan", lazy=True)

    def __repr__(self):
        return f"<Profile {self.profile_name}>"


# 3. TRIPS TABLE
class Trip(db.Model):
    __tablename__ = 'trips'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profiles.id', ondelete="CASCADE"), nullable=False)
    start_point = db.Column(db.String(256), nullable=False)
    destination = db.Column(db.String(256), nullable=False)
    tracking_token = db.Column(db.String(64), unique=True, index=True, nullable=False)
    status = db.Column(db.String(20), default='active')  # active, completed, flagged
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # 🔒 NEW SECURITY COLUMNS FOR ANTI-PIRACY FINGERPRINTING
    device_fingerprint = db.Column(db.String(256), nullable=True)
    ip_fingerprint = db.Column(db.String(100), nullable=True)
    
    # Relationship linking down to Location stream ticks
    locations = db.relationship('Location', backref='trip', cascade="all, delete-orphan", lazy=True)

    def __repr__(self):
        return f"<Trip {self.id} - Token: {self.tracking_token[:8]}>"


# 4. LOCATIONS TABLE 
class Location(db.Model):
    __tablename__ = 'locations'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    trip_id = db.Column(db.Integer, db.ForeignKey('trips.id', ondelete="CASCADE"), nullable=False)
    latitude = db.Column(db.Numeric(10, 7), nullable=False)
    longitude = db.Column(db.Numeric(10, 7), nullable=False)
    battery_pct = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Location Tick for Trip {self.trip_id} at {self.timestamp}>"


# 5. PAYMENTS TABLE
class Payment(db.Model):
    __tablename__ = 'payments'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    gateway_ref = db.Column(db.String(100), unique=True, nullable=False) # M-Pesa Code / Flutterwave ID
    amount = db.Column(db.Numeric(6, 2), nullable=False) # e.g. 100.00
    status = db.Column(db.String(20), nullable=False)  # success, failed, pending
    processed_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Payment {self.gateway_ref} - KSH {self.amount}>"