from datetime import timedelta
from flask import request,jsonify, make_response
from flask_restx import  Namespace, Resource,fields
from app.models.user import User 
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import create_access_token,create_refresh_token, get_jwt,jwt_required,get_jwt_identity,current_user
    
def init_auth_routes(api):
    
    auth_ns = Namespace('auth', description='Authentication operations')
    
    signup_model=api.model(
    
        'SignUp',
        {
            "first_name" : fields.String(required=True, description='First Name'),
            "last_name" : fields.String(required=True, description= 'Last Name'),
            "username" : fields.String(required =True, description='Username'),
            "email" : fields.String(required=True,description='Email address'),
            "password":fields.String(required=True,description="Password"),
        }
    
    )
    
    user_model=api.model(
    
        'User',
        {
            "id" : fields.Integer(required=True, description='ID'),
            "first_name" : fields.String(required=True, description='First Name'),
            "last_name" : fields.String(required=True, description= 'Last Name'),
            "username" : fields.String(required =True, description='Username'),
            "email" : fields.String(required=True,description='Email address'),
            "role":fields.String(required=True,description="Role"),
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
    ##add decorator for logged out ppl
    class Signup(Resource):
        
        @auth_ns.expect(signup_model)      
        @auth_ns.doc(description='To Sign up.')
        @auth_ns.doc(params={'first_name': {'description': 'The First Name', 'required': True, 'type': 'string'}, 'last_name': {'description': 'The last name', 'required': True, 'type': 'string'},'username': {'description': 'The username', 'required': True, 'type': 'string'},'email': {'description': 'The email', 'required': True, 'type': 'string'},'password':{'description': 'The Password', 'required': True, 'type': 'string'}})
        @auth_ns.doc(responses={201: 'Success', 400 :'user already exists'})

        def post(self):
            data =request.get_json()
            
            username=data.get('username')
            db_user=User.query.filter_by(username=username).first()
            
            if db_user is not None:
                return make_response(jsonify({"error" : f"User with username ({username}) already exists"}),400)
            
            email=data.get('email')
            db_user=User.query.filter_by(email=email).first()
            if db_user is not None:
                return make_response(jsonify({"error":f"User with email ({email}) already exists"}),400)
            
            new_user=User(
                first_name = data.get('first_name'),
                last_name = data.get('last_name'),
                username = data.get('username'),
                email = data.get('email'),
                password = generate_password_hash(data.get('password')),
            )
            new_user.save() # add to db

            return make_response(jsonify({"message":"User registered successfuly"}),201)
        
        
    @auth_ns.route('/signin')
    class Signin(Resource):
        @auth_ns.expect(login_model)
        @auth_ns.doc(description='To Sign in.')
        @auth_ns.doc(params={'email': {'description': 'The email', 'required': True, 'type': 'string'},'password':{'description': 'The Password', 'required': True, 'type': 'string'}})
        @auth_ns.doc(responses={201: 'Success', 401 :'Failed'})
        
        
        def post(self):
            """
            ---
            
            Return: {
                        "access_token": access_token,
                        "refresh_token": refresh_token,
                    }
            """
            data = request.get_json()

            email = data.get('email')
            password = data.get('password')

            db_user = User.query.filter_by(email=email).first()

            if db_user:
                
                if check_password_hash(db_user.password, password):
                    
                    access_token = create_access_token(identity=db_user.email,expires_delta=timedelta(hours=24))
                    refresh_token = create_refresh_token(identity=db_user.email)
                    return make_response(
                        jsonify({
                            "access_token": access_token,
                            "refresh_token": refresh_token,
                        }), 200
                    )
                else:
                    return make_response(
                        jsonify({"error": "Authentication failed. Incorrect password."}), 401
                    )
            else:
                return make_response(
                    jsonify({"error": "Authentication failed. User not found."}), 401
                )

    api.add_namespace(auth_ns)
    
    @auth_ns.route('/refresh') #refresh the expired tokens
    class RefreshRessource(Resource):
        @jwt_required(refresh=True)
        def post(self):
            current_user = get_jwt_identity()
            new_access_token=create_access_token(identity=current_user)
            return make_response(jsonify({"access token : ":new_access_token}),200)      
        
    @auth_ns.route('/redirect')
    class RedirectResource(Resource):
        @jwt_required()
        @auth_ns.marshal_with(user_model)
        @auth_ns.doc(description='To get the current user s info.',
             security=[{"Bearer Token": []}])
        def get(self):
            claims = get_jwt()
            if claims.get('is_admin') == True : 
                role = 'admin'
            else:
                role = current_user.role
                
            return jsonify({
                "id": current_user.id,
                "first name" : current_user.first_name,
                "last name" : current_user.last_name,
                "username":current_user.username,
                "email" : current_user.email,
                "role": role
            }),200
    
    @auth_ns.route('/')

    class RedirectResource(Resource):
        def get(self):
            return {'message':'hello world!'},200
        
   
    
        




