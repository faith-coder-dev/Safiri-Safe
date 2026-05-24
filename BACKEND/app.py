import os
from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from models import db
from flask_jwt_extended import JWTManager

from routes import (
    register, 
    login, 
    process_gateway_webhook, 
    get_current_user_profile, 
    initialize_trip_session, 
    end_trip_session, 
    stream_device_coordinates, 
    view_live_journey, 
    bcrypt
)

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(BASE_DIR, 'safirisafe.db')}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev_fallback_signature_key_999')

    app.config['JWT_SECRET_KEY'] = 'safiri-safe-super-secret-token-key-2026'
    app.config['JWT_TOKEN_LOCATION'] = ['cookies']
    app.config['JWT_COOKIE_CSRF_PROTECT'] = True
    app.config['JWT_COOKIE_SECURE'] = False  

    db.init_app(app)
    Migrate(app, db)
    bcrypt.init_app(app)
    
    JWTManager(app)
    
    app.add_url_rule('/api/auth/register', view_func=register, methods=['POST'])
    app.add_url_rule('/api/auth/login', view_func=login, methods=['POST'])
    app.add_url_rule('/api/payments/webhook', view_func=process_gateway_webhook, methods=['POST'])
    app.add_url_rule('/api/auth/profile', view_func=get_current_user_profile, methods=['GET'])
    
    app.add_url_rule('/api/trips/initialize', view_func=initialize_trip_session, methods=['POST'])
    app.add_url_rule('/api/trips/end/<int:trip_id>', view_func=end_trip_session, methods=['POST'])
    
    app.add_url_rule('/api/tracking/stream/<string:active_tracking_token>', view_func=stream_device_coordinates, methods=['POST'])
    app.add_url_rule('/api/tracking/view/<string:active_tracking_token>', view_func=view_live_journey, methods=['GET'])

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(port=5555, debug=True)