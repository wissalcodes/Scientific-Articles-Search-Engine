import json
from urllib.parse import urlparse
from flask import make_response, request, jsonify
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt, get_jwt, current_user
from werkzeug.security import check_password_hash
from app.models.user import User
from werkzeug.security import generate_password_hash,check_password_hash
from app.engine.scraper import *
from pdfminer.high_level import extract_text
from datetime import datetime

def init_ad(api,esknn):
    
    admin_ns = Namespace('admin_dashboard',description='admin operations')
        
    all_moderators_model=api.model(
    
        'modele display',
        {
            "id" : fields.Integer(required=True,description='ID'),
            "first_name" : fields.String(required=True, description='First Name'),
            "last_name" : fields.String(required=True, description= 'Last Name'),
            "username" : fields.String(required =True, description='Username'),
            "email" : fields.String(required=True,description='Email address'),
        }
    
    )
    
    delete_moderator_model=api.model(
    
        'delete moderator model',
        {
            "id" : fields.Integer(required=True,description='ID')

        }
    
    )
    
    password_change_model=api.model(
    
        'Change password',
        {
            "old_password": fields.String(required=True, description='Old password'),
            "new_password": fields.String(required=True, description='New password')
        }
    
    )
    
    moderator_model=api.model(
    
        'Add a moderator',
        {
            "first_name" : fields.String(required=True, description='First Name'),
            "last_name" : fields.String(required=True, description= 'Last Name'),
            "username" : fields.String(required =True, description='Username'),
            "email" : fields.String(required=True,description='Email address'),
            "password":fields.String(required=True,description="Password"),
        }
    
    )   
    
    change_moderator_model=api.model(
    
        'Add a moderator',
        {
            "first_name" : fields.String( description='First Name'),
            "last_name" : fields.String( description= 'Last Name'),
            "username" : fields.String(description='Username'),
            "email" : fields.String(description='Email address'),
        }
    
    )              
            
    
    @admin_ns.route('/my_profile')
    class AdminResource (Resource):
       
        @admin_ns.marshal_with(all_moderators_model, code=200)
        @admin_ns.doc(description='To display info of the profile  .',
             security=[{"Bearer Token": []}])
        @jwt_required()
        def get(self):#display info of the profile          
            
            return current_user,200
            
            
        
        @jwt_required()
        @admin_ns.expect(password_change_model)
         
        @admin_ns.doc(description='To change the password.',
             security=[{"Bearer Token": []}])
        @admin_ns.doc(params={'old_password': {'description': 'The old password', 'required': True, 'type': 'string'},'new_password': {'description': 'The new password', 'required': True, 'type': 'string'}})
        @admin_ns.doc(responses={200: 'Updated', 400: 'old password is wrong', 401: 'Unauthorized'})
        def post(self):
                        
            old_password=request.get_json().get('old_password')
            
            current_user_password=current_user.password
            
            if check_password_hash(current_user_password,old_password):
                
                new_password=request.get_json().get('new_password')
                current_user.update_password(new_password)
                
                return {'message':'Password updated successfully'},200
            else:
                return {'message':'The old password is wrong'},400
            
        
    @admin_ns.route('/all_moderators')
    class ModeratorsResource (Resource):

        @admin_ns.marshal_with(all_moderators_model)
        @jwt_required()
        @admin_ns.doc(description='To Get all the moderators.',
             security=[{"Bearer Token": []}])
        @admin_ns.doc(responses={200: 'Success', 403: 'Unauthorized'})
        def get(self):
            claims = get_jwt()
            if claims.get('is_admin') == True :
                moderators = User.query.filter_by(role='moderator').all()
                                        
                return moderators,200
            
            return {'error':'Unauthorized'},403
            
        
        @admin_ns.expect(delete_moderator_model)
        @jwt_required()
        @admin_ns.doc(description='To delete a moderator.',
             security=[{"Bearer Token": []}])
        @admin_ns.doc(responses={200: 'Success', 403: 'Unauthorized', 400 :'user not found'})
        @admin_ns.doc(params={'id': {'description': 'The id of the moderator', 'required': True, 'type': 'int'}})

        def delete(self): 
            claims=get_jwt()
            if claims.get('is_admin')==True:
                data = request.get_json()
                id_to_delete = data.get('id')
                
                moderator_to_delete= User.query.filter_by(id=id_to_delete).first()
                
                if moderator_to_delete:
                    moderator_to_delete.delete()
                    return {'message':  'Moderator deleted'},200
                else:
                    return {'message': 'User not found'}, 400
                
            else:
                return {'message': 'Permission denied'}, 403  
        
        
    @admin_ns.route('/all_moderators/add_new_moderator')
    class AddNewModeratorResource (Resource):
              
        @admin_ns.doc(description='To add a new moderator.',
             security=[{"Bearer Token": []}])
        @admin_ns.doc(responses={201: 'Success', 403: 'Unauthorized', 400 :'user already exists'})
        @admin_ns.doc(params={'first_name': {'description': 'The First Name', 'required': True, 'type': 'string'}, 'last_name': {'description': 'The last name', 'required': True, 'type': 'string'},'username': {'description': 'The username', 'required': True, 'type': 'string'},'email': {'description': 'The email', 'required': True, 'type': 'string'},'password': {'description': 'The Password', 'required': True, 'type': 'string'}})
        @admin_ns.expect(moderator_model) 
        @jwt_required()
        def post(self):
            
            claims = get_jwt()
            if claims.get('is_admin') == True : 
                data = request.get_json()
                
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
                new_user.role='moderator'
                new_user.save() # add to db

                return make_response(jsonify({"message":"Moderator added successfuly"}),201)
                
            else:
                return {'message': 'Permission denied'}, 403  
            
              
    @admin_ns.route('/all_moderators/<int:id>')
    class ModifyModeratorResource(Resource):
        @admin_ns.expect(change_moderator_model)
        @jwt_required()
        
        @admin_ns.doc(description='To modify an existing moderator.',
             security=[{"Bearer Token": []}])
        @admin_ns.doc(responses={200: 'Success', 403: 'Unauthorized', 400 :'user already exists'})
        @admin_ns.doc(params={'first_name': {'description': 'The First Name', 'required': False, 'type': 'string'}, 'last_name': {'description': 'The last name', 'required': False, 'type': 'string'},'username': {'description': 'The username', 'required': False, 'type': 'string'},'email': {'description': 'The email', 'required': False, 'type': 'string'}})
        
        def post(self,id):
            
            claims = get_jwt()
            if claims.get('is_admin') == True : 
                data = request.get_json()
                
                moderator_to_modify = User.query.filter_by(id=id).first()
                                
                username=data.get('username','')              
                if len (username) > 0 and User.query.filter_by(username=username).first() is not None:
                    return make_response(jsonify({"error" : f"User with username ({username}) already exists"}),400)
                
             
                email=data.get('email','')  
                if len (email) > 0 and User.query.filter_by(email=email).first() is not None:
                    return make_response(jsonify({"error":f"User with email ({email}) already exists"}),400)
                
                first_name=data.get('first_name','')
                last_name=data.get('last_name','')
                
                if len (first_name) > 0:
                    moderator_to_modify.update_first_name(first_name) 
                if len (last_name) > 0:
                    moderator_to_modify.update_last_name(last_name)
                if len (username) > 0:
                    moderator_to_modify.update_username(username)
                if len (email) > 0:
                    moderator_to_modify.update_email(email)
                
                return make_response(jsonify({"message":"Moderator modified successfuly"}),200)
                
            else:
                return {'message': 'Permission denied'}, 403  
            
    
 
    @admin_ns.route('/upload_articles')
    class UploadResource(Resource):
        
        @jwt_required()
        
        @admin_ns.doc(description='To upload articles.',
             security=[{"Bearer Token": []}])
        @admin_ns.doc(responses={200: 'Success', 400 :'Failed to index the article', 403: ' check your internet connection', 401: 'Unauthorized', 404: 'Not a google drive folder'})
        @admin_ns.doc(params={'url': {'description': 'The PDF Url', 'required': True, 'type': 'string'}})
       
        def post(self):
            claims = get_jwt()
            if claims.get('is_admin') == True : 
                data = request.get_json().get('url')
                
                parsed_url = urlparse(data)
                path_components = parsed_url.path.split('/')

                # Check if the URL is from drive.google.com and the path starts with '/drive/folders/' or the path starts with '/u/' (user-owned folder)
                if (parsed_url.netloc == 'drive.google.com' and path_components[1] == 'drive' and path_components[2] == 'folders') or  (parsed_url.netloc == 'drive.google.com' and path_components[2] == 'u' and path_components[1] == 'drive' and path_components[4] == 'folders'):  
                    pdf_urls = get_pdf_urls(data)
                    i=0
                    if pdf_urls:
                        for pdf_url in pdf_urls:
                            
                            try :
                                response = requests.get(pdf_url, timeout=20)
                                if response.status_code == 200:
                                    pdf_buffer= BytesIO(response.content)
                                else:
                                    pdf_buffer= None
                            except Exception as e:
                                print(e)
                            
                            if pdf_buffer:
                                
                                text = extract_text(pdf_buffer)
                                
                                title,i=extract_title(text)
                                authors,institutions=extract_authors_institutions(extract_head_text(text),k=i)

                                output= {
                                    "title":title,
                                    "authors":authors,
                                    "institutions":institutions,
                                    "abstract":extract_abstract(text),
                                    "keywords":extract_keywords(text),
                                    "article":extract_full_text(text),
                                    "references":extract_references(text),
                                    "url":pdf_url,
                                    "date": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                                    "is_published":False
                                }

                                with open("output.json", "a") as json_file:
                                    json.dump(output, json_file, indent=2)
                                    json_file.write('\n')
                                
                                response = esknn.insert_document(output)
                                
                                if response != 0:
                                    i=+1
                                    return {'message':f'The article n° {i} has been uploaded to elastic search successfully'}, 200
                                else:
                                    return {'error':'Failed to index the article'},400
                                
                            else:
                                return {'error':'Failed to download the article from google drive, check your internet connection'},403
                    
                else:
                    return {'error':'the provided url is not a google drive folder'}, 404
            else:
                return {'message': 'Permission denied'}, 401
            
    
    api.add_namespace(admin_ns)

   