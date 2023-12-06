from flask import request,jsonify, make_response
from flask_restx import  Namespace, Resource,fields
from app.models.user import User 
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import create_access_token,create_refresh_token,jwt_required,get_jwt_identity
 

    
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
    
    login_model=api.model(
    
        'LogIn',
        {
            "email" : fields.String(required=True,description='Email address'),
            "password":fields.String(required=True,description="Password"),
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
        
        @auth_ns.expect(login_model)
        def post(self):
            data=request.get_json()
            
            email=data.get('email')
            password=data.get('password')
            
            db_user = User.query.filter_by(email=email).first()
            
            if db_user and check_password_hash(db_user.password,password):
                access_token = create_access_token(identity=db_user.email)
                refresh_token = create_refresh_token(identity=db_user.email)
                return jsonify(
                    {
                        "access token":access_token,
                        "refresh token":refresh_token
                    }
                )
            # else
            #     return jsonify ({"error":"authentication failed"})
            
            return {'message': 'Signin endpoint'}
        
        def get(self):
            # Implement logic for handling GET requests to /auth/signin
            return {'message': 'GET request to signin endpoint'}
    
    api.add_namespace(auth_ns)
    
    @auth_ns.route('/refresh') #refresh the expired tokens
    class RefreshRessource(Resource):
        @jwt_required(refresh=True)
        def post(self):
            current_user = get_jwt_identity()
            new_access_token=create_access_token(identity=current_user)
            return make_response(jsonify({"access token : ":new_access_token}),200)            
            
    
        




