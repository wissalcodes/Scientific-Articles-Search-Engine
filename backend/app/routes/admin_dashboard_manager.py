from flask import request, jsonify
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt, get_jwt, current_user
from app.models.user import User

def init_auth_routes(api):
    
    user_ns = Namespace('admin_dashboard',description='admin operations')
        
    all_users_model=api.model(
    
        'All users',
        {
            "first_name" : fields.String(required=True, description='First Name'),
            "last_name" : fields.String(required=True, description= 'Last Name'),
            "username" : fields.String(required =True, description='Username'),
            "email" : fields.String(required=True,description='Email address'),
        }
    
    )
    
    @user_ns.route('/all_users')
    class UserResource (Resource):
        
        @user_ns.expect(all_users_model)
        @user_ns.marshal_with(all_users_model)
        @jwt_required()
        def get(self):
            
            claims = get_jwt()
            if claims.get('is_admin') == True :
  
                users = User.query.all()

                return users
            
            return None
        
        def post(self): #to add a new moderator
            pass
    
    @user_ns.route('/my_profile')
    class UserCurrentResource (Resource):
        
        @jwt_required()
        def get(self):
            
            return jsonify({
                "first name" : current_user.first_name,
                "last name" : current_user.last_name,
                "username":current_user.username,
                "email" : current_user.email
            })
        
        
    @user_ns.route('/all_moderators')
    class ModeratorResource (Resource):

        @user_ns.expect(all_users_model)
        @user_ns.marshal_with(all_users_model)
        @jwt_required()
        
        def get(self):
            claims = get_jwt()
            if claims.get('is_admin') == True :
                
                #modifyyy: query on the role  (filter)          
                moderators = User.query.filter_by()

                return moderators
            
            return None
            
        def delete(self): # to reset the role of a moderator to a regular user
            pass
        
    api.add_namespace(user_ns)
