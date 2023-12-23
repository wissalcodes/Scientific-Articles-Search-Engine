from flask import make_response, request, jsonify
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt, get_jwt, current_user
from werkzeug.security import check_password_hash
from app.models.user import User
from app import db
from werkzeug.security import generate_password_hash,check_password_hash

def init_auth_routes(api):
    
    moderator_ns = Namespace('moderator_dashboard',description='admin operations')
        
    article_model=api.model(
    
        'Article display',
        {
            "id" : fields.Integer(required=True,description='ID'),
            "title" : fields.String(required=True, description='First Name'),
            "authors" : fields.String(required=True, description= 'Last Name'),
            "institutions" : fields.String(required =True, description='Username'),
            "text" : fields.String(required=True,description='Email address'),
        }
    
    )
    
    
    password_change_model=api.model(
    
        'Change password',
        {
            "old_password": fields.String(required=True, description='Old password'),
            "new_password": fields.String(required=True, description='New password')
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
            
    
    @moderator_ns.route('/my_profile')
    class ModeratorResource (Resource):
        
        @jwt_required()
        def get(self):#display info of the profile
            
            return jsonify({
                "first name" : current_user.first_name,
                "last name" : current_user.last_name,
                "username":current_user.username,
                "email" : current_user.email           
            })
            
        @jwt_required()
        @moderator_ns.expect(password_change_model)
        
        def post(self):#change the password
            
            old_password=request.get_json().get('old_password')
                        
            if check_password_hash(current_user.password,old_password):
                
                new_password=request.get_json().get('new_password')
                current_user.update_password(new_password)
                
                return {'message':'Password updated successfully'},200
            else:
                return {'message':'The old password is wrong'},401
            
        @jwt_required()
        @moderator_ns.expect(change_profile_model)
        
        def post(self):#changer infos personnels
            
            data=request.get_json()  
                         
            username=data.get('username','')              
            if len (username) > 0 and User.query.filter_by(username=username).first() is not None:
                return make_response(jsonify({"error" : f"User with username ({username}) already exists"}),400)
            
            email=data.get('email','')  
            if len (email) > 0 and User.query.filter_by(email=email).first() is not None:
                return make_response(jsonify({"error":f"User with email ({email}) already exists"}),400)
            
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
            
            
        
        
    @moderator_ns.route('/articles')
    class ArticleResource (Resource):


        @moderator_ns.marshal_with(article_model)
        @jwt_required()       
        def get(self):#display all the articles
            pass
            
        
        @moderator_ns.expect(article_model)
        @jwt_required()
        def delete(self): # delete an article
            pass
        
        
        
    @moderator_ns.route('/articles/moderate')
    class ModerateResource (Resource):
                   
        @moderator_ns.expect(article_model) 
        @jwt_required()
        
        def post(self): #correct articles
            pass
            
   
    api.add_namespace(moderator_ns)

# # Search documents route
# @app.route('/api/search_document')
# def search_document():
#     data = flask.request.json
    
#     field_name = data['field_name']
#     query = data['query']

#     result = esknn.search_document(query, field_name)

#     documents = []

#     hits = result['hits']['hits']

#     for hit in hits:
#         documents.append(hit['_source'])

#     return {
#         "status": 200,
#         "documents": documents
#     }