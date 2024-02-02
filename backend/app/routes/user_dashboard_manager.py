from flask import make_response, request, jsonify
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, current_user
from werkzeug.security import check_password_hash
from app.models.user import User
from werkzeug.security import check_password_hash

def init_auth_routes(api):
    
    user_ns = Namespace('user_dashboard',description='user operations')
          
    
    password_change_model=api.model(
    
        'Change password',
        {
            "old_password": fields.String(required=True, description='Old password'),
            "new_password": fields.String(required=True, description='New password')
        }
    
    )    
    
    profile_model=api.model(
    
        'profile',
        {
            "id" : fields.Integer(required=True,description='ID'),
            "first_name" : fields.String( description='First Name'),
            "last_name" : fields.String( description= 'Last Name'),
            "username" : fields.String(description='Username'),
            "email" : fields.String(description='Email address'),
            "role" : fields.String(description='Role'),
            
        }
    
    ) 
    
    change_profile_model=api.model(
    
        'Change infos profile',
        {
            "first_name" : fields.String( description='First Name'),
            "last_name" : fields.String( description= 'Last Name'),
            "username" : fields.String(description='Username'),
            "email" : fields.String(description='Email address'),
            
        }
    
    )              
            
    
    @user_ns.route('/my_profile')
    
    class UserResource (Resource):
                
        @user_ns.doc(description='To Display the info of the profile.',
             security=[{"Bearer Token": []}])
        @user_ns.doc(responses={200: 'Success'})
        @user_ns.marshal_with(profile_model)
        @jwt_required()
        
        def get(self):
            
            return current_user,200
    
    @user_ns.route('/my_profile/change_password')
    class UserPasswordResource (Resource):
            
        @jwt_required()
        @user_ns.expect(password_change_model)
        @user_ns.doc(description='To change the password.',
             security=[{"Bearer Token": []}])
        @user_ns.doc(params={'old_password': {'description': 'The old password', 'required': True, 'type': 'string'},'new_password': {'description': 'The new password', 'required': True, 'type': 'string'}})
        @user_ns.doc(responses={200: 'Updated', 400: 'old password is wrong', 401: 'Unauthorized'})
       
        def post(self):
            
            old_password=request.get_json().get('old_password')
                        
            if check_password_hash(current_user.password,old_password):
                
                new_password=request.get_json().get('new_password')
                current_user.update_password(new_password)
                
                return {'message':'Password updated successfully'},200
            else:
                return {'error':'The old password is wrong'},401
       
    @user_ns.route('/my_profile/change_infos')
    class UserUpdateResource (Resource):     
        
        @jwt_required()
        @user_ns.expect(change_profile_model)
        
        @user_ns.doc(description='To modify the personnal information of the authentified user.',
             security=[{"Bearer Token": []}])
        @user_ns.doc(responses={200: 'Success', 403: 'Unauthorized', 400 :'user already exists'})
        @user_ns.doc(params={'first_name': {'description': 'The First Name', 'required': False, 'type': 'string'}, 'last_name': {'description': 'The last name', 'required': False, 'type': 'string'},'username': {'description': 'The username', 'required': False, 'type': 'string'},'email': {'description': 'The email', 'required': False, 'type': 'string'}})
      
        def post(self):
            
            data=request.get_json()  
                         
            username=data.get('username','')              
            if len (username) > 0 and User.query.filter_by(username=username).first() is not None:
                return {"error" : f"User with username ({username}) already exists"},400
            
            email=data.get('email','')  
            if len (email) > 0 and User.query.filter_by(email=email).first() is not None:
                return {"error":f"User with email ({email}) already exists"},400
            
            first_name=data.get('first_name','')
            last_name=data.get('last_name','')
            
            if len (first_name) > 0:
                current_user.update_first_name(first_name) 
            if len (last_name) > 0:
                current_user.update_last_name(last_name)
            if len (username) > 0:
                current_user.update_username(username)
            if len (email) > 0:
                current_user.update_email(email)
                
            return {'message':'info updated successfully'},200
            
    api.add_namespace(user_ns)


       