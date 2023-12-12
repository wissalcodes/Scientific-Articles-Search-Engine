from flask import request, jsonify
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt, get_jwt, current_user
from app.models.user import User
from app import db

def init_auth_routes(api):
    
    admin_ns = Namespace('admin_dashboard',description='admin operations')
        
    all_users_model=api.model(
    
        'All users',
        {
            "first_name" : fields.String(required=True, description='First Name'),
            "last_name" : fields.String(required=True, description= 'Last Name'),
            "username" : fields.String(required =True, description='Username'),
            "email" : fields.String(required=True,description='Email address'),
        }
    
    )
    
    @admin_ns.route('/all_users')
    class UserResource (Resource):
        
        @admin_ns.expect(all_users_model)
        @admin_ns.marshal_with(all_users_model)
        @jwt_required()
        def get(self):
            
            claims = get_jwt()
            if claims.get('is_admin') == True :
  
                users = User.query.filter_by(role='user').all()
                email_to_delete = 'admin@gmail.com'

                for user in users:
                    if user.email == email_to_delete:
                        users.remove(user)
                        
                return users
            
            return None
            # else:
            #     return {'message': 'Permission denied'}, 403  
        
       
        @admin_ns.expect(all_users_model) 
        @jwt_required()
        def post(self): #to add a new moderator
            
            claims = get_jwt()
            if claims.get('is_admin') == True : 
                data = request.get_json()
                email = data.get('email')
                
                user_to_moderator = User.query.filter_by(email=email).first()
                
                if user_to_moderator:
                    user_to_moderator.role = 'moderator'
                    db.session.commit()
                    return {'message':  'role updated to moderator'},200
                else:
                    return {'message': 'User not found'}, 404
                
            else:
                return {'message': 'Permission denied'}, 403  
            
                 
            
    
    @admin_ns.route('/my_profile')
    class UserCurrentResource (Resource):
        
        @jwt_required()
        def get(self):
            
            return jsonify({
                "first name" : current_user.first_name,
                "last name" : current_user.last_name,
                "username":current_user.username,
                "email" : current_user.email
            })
        
        
    @admin_ns.route('/all_moderators')
    class ModeratorResource (Resource):

        @admin_ns.expect(all_users_model)
        @admin_ns.marshal_with(all_users_model)
        @jwt_required()
        
        def get(self):
            claims = get_jwt()
            if claims.get('is_admin') == True :
                moderators = User.query.filter_by(role='moderator').all()
                email_to_delete = 'admin@gmail.com'

                for user in moderators:
                    if user.email == email_to_delete:
                        moderators.remove(user)
                        
                return moderators
            
            return None
            
            # else:
            #     return {'message': 'Permission denied'}, 403  
        
        @admin_ns.expect(all_users_model)
        @jwt_required()
        def delete(self): # to reset the role of a moderator to a regular user
            claims=get_jwt()
            if claims.get('is_admin')==True:
                data = request.get_json()
                email = data.get('email')
                
                moderator_to_user = User.query.filter_by(email=email,role='moderator').first()
                
                if moderator_to_user:
                    moderator_to_user.role = 'user'
                    db.session.commit()
                    return {'message':  'role updated to user'},200
                else:
                    return {'message': 'User not found'}, 404
                
            else:
                return {'message': 'Permission denied'}, 403  
        
    api.add_namespace(admin_ns)
