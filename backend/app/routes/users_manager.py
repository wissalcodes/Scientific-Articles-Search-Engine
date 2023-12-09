from flask import request, jsonify, make_response
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required
from app.models.user import User
from app import db

def init_auth_routes(api):
    
    user_ns = Namespace('user',description='users operations')
        
    all_users_model=api.model(
    
        'All users',
        {
            "first_name" : fields.String(required=True, description='First Name'),
            "last_name" : fields.String(required=True, description= 'Last Name'),
            "username" : fields.String(required =True, description='Username'),
            "email" : fields.String(required=True,description='Email address'),
        }
    
    )
    
    @user_ns.route('/all')
    class UserResource (Resource):
        
        @user_ns.expect(all_users_model)
        @user_ns.marshal_with(all_users_model)
        # @jwt_required()
        def get(self):
            
            page = request.args.get('page',default=1, type=int)
            per_page = request.args.get('per_page',default=20,type=int) 
                        
            users_pagination = User.query.paginate(page=page, per_page=per_page)

            users = users_pagination.items

            return users
            
    api.add_namespace(user_ns)
