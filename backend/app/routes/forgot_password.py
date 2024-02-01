import json
from flask_restx import Namespace,Resource,fields
from flask import request, url_for
from app.models.user import User
import requests

# to do: replace the keys by the env var

def init_auth_routes(api):
    forgot_ns=Namespace('forgot_password', description= 'forgot password operations')
    api.add_namespace(forgot_ns)
    
    forgot_password_model=api.model(
        'Reset Password',
        {
            "email" : fields.String(required=True,description='Email address'),
        }
    )
    
    confirm_reset_model=api.model(
        'Confirm Reset Password',
        {
            "password" : fields.String(required=True,description='Password'),
        }
    )
    
    @forgot_ns.route('/')
    class ResetPasswordRessource(Resource):
        
        @forgot_ns.expect(forgot_password_model)
        @forgot_ns.doc(description='To send the reset password link.')
        @forgot_ns.doc(params={'email': {'description': 'The email', 'required': True, 'type': 'string'}})
        @forgot_ns.doc(responses={200: 'Success', 404 :'User not found'})
        def post (self):
            data = request.get_json()
            email = data.get('email')
            user=User.query.filter_by(email=email).first()
            if user: #send reset password email
                reset_token = generate_reset_token(user.email)
                send_reset_email(user.email, reset_token)
                return {'message': 'reset email sent successfully'},200
            else:
                return {'message': 'User not found'}, 404
            
  
        

    def generate_reset_token(user_email):
        from itsdangerous import URLSafeTimedSerializer

        serializer = URLSafeTimedSerializer('4f0280d43e2b66fe2b651f32440955c7', salt='some_salt')

        # Create the reset token and replace '.' with '_'
        reset_token = serializer.dumps(user_email).replace('.', '_')

        return reset_token

    def confirm_token(token, expiration=3600):
        from itsdangerous import URLSafeTimedSerializer

        serializer = URLSafeTimedSerializer('4f0280d43e2b66fe2b651f32440955c7', salt='some_salt')

        # Replace '_' with '.' before loading the token
        token = token.replace('_', '.')

        try:
            email = serializer.loads(token, max_age=expiration)
            return email
        except Exception:
            return None
        
    def send_reset_email(email, token):
        
        reset_url = f'http://localhost:5173/reset_password/{token}'

        
        subject = 'Réinitialisation du mot de passe'
        body = f'Cliquez sur ce lien pour réinitialiser votre mot de passe: {reset_url}'
        print(reset_url)
                
        sendgrid_api_key ='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'
        
        # Send email using SendGrid's API endpoint
        url = "https://api.sendgrid.com/v3/mail/send"
        headers = {
            "Authorization": f"Bearer {sendgrid_api_key}",
            "Content-Type": "application/json"
        }

        payload = {
            "personalizations": [{"to": [{"email": email}]}],
            "from": {"email": "elabed.aminaaa@gmail.com"},
            "subject": subject,
            "content": [{"type": "text/plain", "value": body}]
        }

        response = requests.post(url, headers=headers, data=json.dumps(payload))
        print(response.status_code)
        print(response.text)

        
    @forgot_ns.route('/reset_password/<token>')
    class ResetPasswordVerifiedResource(Resource):
        @forgot_ns.expect(confirm_reset_model)
        
        @forgot_ns.doc(description='the user will be directed to this endpoint when he clicks on the reset link sent to the his email address.')
        @forgot_ns.doc(responses={200: 'Success', 401 :'link expired'})
        
        def get(self,token):
            print(token)
            email = confirm_token(token)
            if not email:
                return {'message':'the link has expired'},401
            else:
                return {'message':'valid link'},200
        
        
        @forgot_ns.doc(description='To Set the new password.')
        @forgot_ns.doc(params={'password':{'description': 'The Password', 'required': True, 'type': 'string'}})
        @forgot_ns.doc(responses={200: 'Success', 404 :'Failed'})
        
        def post(self,token):
            
            email = confirm_token(token)
                        
            user=User.query.filter_by(email=email).first()
            if user:
                password = request.get_json().get('password')
                if password:
                    user.update_password(password)
                    return {'message':'password reseted successfully'},200
                
            else:
                return {"message":'user not found'},404
            
            

            
        