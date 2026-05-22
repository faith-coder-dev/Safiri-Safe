import os
from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from models import db
from routes import register, process_gateway_webhook

def create_app():
    app = Flask(__name__)
    
    
    CORS(app)
    
    
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(BASE_DIR, 'safirisafe.db')}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
   
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev_fallback_signature_key_999')

    # Initialize the database and setup migrations
    db.init_app(app)
    Migrate(app, db)
    
   
    app.add_url_rule('/api/auth/register', view_func=register, methods=['POST'])
    app.add_url_rule('/api/payments/webhook', view_func=process_gateway_webhook, methods=['POST'])

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(port=5555, debug=True)
