import os
from flask import Flask, request, jsonify
from datetime import datetime, timedelta
from models import db, User, Payment

app = Flask(__name__)

#   AUTHENTICATION INTERFACE (REGISTRATION)

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    
    # Strict validation check
    if not email or not password or not name:
        return jsonify({"error": "Missing required registration parameters"}), 400
        
    # Check if user already exists to prevent duplication crashes
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "An account with this email already exists"}), 409
        
    # Create the new user record matching our playbook blueprint
    # (Note: In our next session, we will wrap 'password' in Bcrypt hashing!)
    new_user = User(
        name=name,
        email=email,
        password_hash=password, 
        account_tier='free'
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message": f"Account for {name} successfully initialized!"}), 201



# (M-PESA / GATEWAY INTEGRATION)

@app.route('/api/payments/webhook', methods=['POST'])
def process_gateway_webhook():
    # 1. Anti-Tamper Security Check: Verify signature hash from environment variables
    webhook_signature = request.headers.get('verif-hash')
    secret_hash = os.environ.get('GATEWAY_SECRET_HASH', 'fallback_secure_key_123')
    
    if not webhook_signature or webhook_signature != secret_hash:
        return jsonify({"error": "Unauthorized Webhook Transaction Validation Failed"}), 401
 
    payload = request.get_json()
    
    # 2. Check if the payment transaction state is successful
    if payload.get("status") == "successful":
        user_billing_target = payload.get("customer", {}).get("email")
        transaction_receipt = payload.get("tx_ref") # The unique transaction code
        paid_amount = payload.get("amount")
        
        # 3. Pull the targeted user matching the billing email
        active_user = User.query.filter_by(email=user_billing_target).first()
        
        if active_user:
            # Shift account configuration to Premium Status & add 30 days subscription
            active_user.account_tier = 'premium'
            active_user.expiry_date = datetime.utcnow() + timedelta(days=30)
            
            # 4. Write an immutable financial audit log row to the ledger table
            new_audit_ledger = Payment(
                user_id=active_user.id,
                gateway_ref=transaction_receipt,
                amount=paid_amount,
                status='success'
            )
            
            db.session.add(new_audit_ledger)
            db.session.commit()
            
            return jsonify({"status": "Transaction Success State Configured"}), 200
            
        return jsonify({"error": "Payment verified, but associated user not found"}), 404
 
    return jsonify({"status": "Payload Acknowledged Without Mutation"}), 400
