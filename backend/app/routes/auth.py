from flask import request,jsonify
from flask_restx import  Namespace, Resource,fields
from app.models.user import User 
from werkzeug.security import generate_password_hash,check_password_hash


    
def init_auth_routes(app,api):
    
    auth_ns = Namespace('auth', description='Authentication operations')
    
    signup_model=api.model(
    
    'SignUp',
    {
        "first_name" : fields.String(required=True, description='First Name'),
        "last_name" : fields.String(required=True, description= 'Last Name'),
        "username" : fields.String(required =True, description='Username'),
        "email" : fields.String(required=True,description='Email address'),
        "password":fields.String(required=True,description="Password"),
        "confirm_password":fields.String(required=True,description="Confirm Password")
    }
    
    )
    
    @auth_ns.route('/signup')
    class Signup(Resource):
        
        # @auth_ns.marshal_with(signup_model) # returns an object
        @auth_ns.expect(signup_model)
        def post(self):
            data =request.get_json()
            
            username=data.get('username')
            db_user=User.query.filter_by(username=username).first()
            
            if db_user is not None:
                print("ccc")
                return jsonify({"message" : f"User with username ({username}) already exists"})
            
            email=data.get('email')
            db_user=User.query.filter_by(email=email).first()
            if db_user is not None:
                return jsonify({"message":f"User with email ({email}) already exists"})
            
            new_user=User(
                first_name = data.get('first_name'),
                last_name = data.get('last_name'),
                username = data.get('username'),
                email = data.get('email'),
                password = generate_password_hash(data.get('password')),
            )
            new_user.save() # add to db

            return jsonify({"message":"User registered successfuly"})
        
        
        def get(self):
            # Implement logic for handling GET requests to /auth/signin
            return {'message': 'GET request to signup endpoint'}

    @auth_ns.route('/signin')
    class Signin(Resource):
        def post(self):
            # Implement signin logic here
            return {'message': 'Signin endpoint'}
        
        def get(self):
            # Implement logic for handling GET requests to /auth/signin
            return {'message': 'GET request to signin endpoint'}
    
    api.add_namespace(auth_ns)
    
    
        




