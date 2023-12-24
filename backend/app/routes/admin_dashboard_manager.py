from urllib.parse import urlparse
from flask import make_response, request, jsonify
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt, get_jwt, current_user
from werkzeug.security import check_password_hash
from app.models.user import User
from app import db
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
            "password":fields.String(description="Password"),
        }
    
    )              
            
    
    @admin_ns.route('/my_profile')
    class AdminResource (Resource):
        
        @jwt_required()
        def get(self):#display info of the profile
            
            return jsonify({
                "first name" : current_user.first_name,
                "last name" : current_user.last_name,
                "username":current_user.username,
                "email" : current_user.email           
            })
            
        @jwt_required()
        @admin_ns.expect(password_change_model)
        
        def post(self):#change the password
            
            old_password=request.get_json().get('old_password')
            
            current_user_password=current_user.password
            
            if check_password_hash(current_user_password,old_password):
                
                new_password=request.get_json().get('new_password')
                current_user.update_password(new_password)
                
                return {'message':'Password updated successfully'},200
            else:
                return {'message':'The old password is wrong'},401
            
        
        
    @admin_ns.route('/all_moderators')
    class ModeratorsResource (Resource):

        @admin_ns.expect(all_moderators_model)
        @admin_ns.marshal_with(all_moderators_model)
        @jwt_required()
        
        def get(self):#display all the moderators
            claims = get_jwt()
            if claims.get('is_admin') == True :
                moderators = User.query.filter_by(role='moderator').all()
                                        
                return moderators
            
            return None
            
        
        @admin_ns.expect(delete_moderator_model)
        @jwt_required()
        def delete(self): # delete a moderator
            claims=get_jwt()
            if claims.get('is_admin')==True:
                data = request.get_json()
                id_to_delete = data.get('id')
                
                moderator_to_delete= User.query.filter_by(id=id_to_delete).first()
                
                if moderator_to_delete:
                    moderator_to_delete.delete()
                    return {'message':  'Moderator deleted'},200
                else:
                    return {'message': 'User not found'}, 404
                
            else:
                return {'message': 'Permission denied'}, 403  
        
        
    @admin_ns.route('/all_moderators/add_new_moderator')
    class AddNewModeratorResource (Resource):
              
       
        @admin_ns.expect(moderator_model) 
        @jwt_required()
        def post(self): #to add a new moderator
            
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
        
        def post(self,id): #to modify
            
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
                password=data.get('password','')
                
                if len (first_name) > 0:
                    moderator_to_modify.update_first_name(first_name) 
                if len (last_name) > 0:
                    moderator_to_modify.update_last_name(last_name)
                if len (username) > 0:
                    moderator_to_modify.update_username(username)
                if len (email) > 0:
                    moderator_to_modify.update_email(email)
                if len (password) > 0:
                    moderator_to_modify.update_password(password)
                    
                return make_response(jsonify({"message":"Moderator modified successfuly"}),200)
                
            else:
                return {'message': 'Permission denied'}, 403  
            
    
 
    @admin_ns.route('/upload_articles')
    class UploadResource(Resource):
        
        @jwt_required()
        def post(self):
            claims = get_jwt()
            if claims.get('is_admin') == True : 
                data = request.get_json().get('url')
                
                parsed_url = urlparse(data)
                path_components = parsed_url.path.split('/')

                # Check if the URL is from drive.google.com and the path starts with '/drive/folders/' or the path starts with '/u/' (user-owned folder)
                if (parsed_url.netloc == 'drive.google.com' and path_components[1] == 'drive' and path_components[2] == 'folders') or  (parsed_url.netloc == 'drive.google.com' and path_components[2] == 'u' and path_components[1] == 'drive' and path_components[4] == 'folders'):  
                    extract_data_from_articles(get_pdf_urls(data))
                    return {'message':'articles uploaded'}, 200
                else:
                    return {'error':'the provided url is not a google drive folder'}, 400
            else:
                return {'message': 'Permission denied'}, 403  
            
    
    api.add_namespace(admin_ns)

    def extract_data_from_articles(pdf_urls):
        """ extract the data from a URL that contains a bunch of scientific articles """
        i=0
        if pdf_urls:
            for pdf_url in pdf_urls:
                pdf_buffer = download_pdf_from_url(pdf_url)
                if pdf_buffer:
                    
                    text = extract_text(pdf_buffer)
                    
                    # abstract, keywords, references
                    abstract, keywords, references, ne_text=extract_abstract_keywords_references_final_text(text)

                    b_text = extract_head_text(text)
                    
                    #titles, authors,institutions
                    title, i, n_text =extract_title(b_text,new_text=ne_text)
                    authors, j, _text=extract_authors(b_text,k=i,new_text=n_text)
                    institutions,new_text=extract_intitutions(b_text,k=j,new_text=_text)
                    
                    #text of the article
                    new_text = re.sub('\n+', '\n', new_text).strip()
                    output= {
                        "title":title,
                        "authors":authors,
                        "institutions":institutions,
                        "abstract":abstract,
                        "keywords":keywords,
                        "article":new_text,
                        "references":references,
                        "url":pdf_url,
                        "date": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                        "is_published":False
                    }
                    
                    esknn.insert_document(output) # ingest data to elastic search
                    
                    i=+1
                    print(f'The article n° {i} has been uploaded to elastic search successfully')
                else:
                    return None
                
                