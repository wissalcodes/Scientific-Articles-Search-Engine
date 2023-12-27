from flask import make_response, request, jsonify
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, current_user
from werkzeug.security import check_password_hash
from app.models.user import User
from werkzeug.security import check_password_hash

def init_ad(api,esknn):
    
    moderator_ns = Namespace('moderator_dashboard',description='admin operations')
        
    article_model=api.model(
    
        'Article',
        {
            "title" : fields.String(description='Title'),
            "authors" : fields.String(description= 'Authors'),
            "institutions" : fields.String(description='Institutions'),
            "abstract" : fields.String(description='Abstract'),
            "keywords" : fields.String(description='Keywords'),
            "text" : fields.String(description='Text'),
            "references" : fields.String(description='References'),
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
                
        @moderator_ns.doc(description='To Display the info of the profile.',
             security=[{"Bearer Token": []}])
        @moderator_ns.doc(responses={200: 'Success'})
        @moderator_ns.marshal_with(change_profile_model)
        @jwt_required()
        
        def get(self):
            
            return current_user,200
    
    @moderator_ns.route('/my_profile/change_password')
    class ModeratorResource (Resource):
            
        @jwt_required()
        @moderator_ns.expect(password_change_model)
        @moderator_ns.doc(description='To change the password.',
             security=[{"Bearer Token": []}])
        @moderator_ns.doc(params={'old_password': {'description': 'The old password', 'required': True, 'type': 'string'},'new_password': {'description': 'The new password', 'required': True, 'type': 'string'}})
        @moderator_ns.doc(responses={200: 'Updated', 400: 'old password is wrong', 401: 'Unauthorized'})
       
        def post(self):
            
            old_password=request.get_json().get('old_password')
                        
            if check_password_hash(current_user.password,old_password):
                
                new_password=request.get_json().get('new_password')
                current_user.update_password(new_password)
                
                return {'message':'Password updated successfully'},200
            else:
                return {'error':'The old password is wrong'},401
       
    @moderator_ns.route('/my_profile/change_infos')
    class ModeratorResource (Resource):     
        
        @jwt_required()
        @moderator_ns.expect(change_profile_model)
        
        @moderator_ns.doc(description='To modify the personnal information of the authentified moderator.',
             security=[{"Bearer Token": []}])
        @moderator_ns.doc(responses={200: 'Success', 403: 'Unauthorized', 400 :'user already exists'})
        @moderator_ns.doc(params={'first_name': {'description': 'The First Name', 'required': False, 'type': 'string'}, 'last_name': {'description': 'The last name', 'required': False, 'type': 'string'},'username': {'description': 'The username', 'required': False, 'type': 'string'},'email': {'description': 'The email', 'required': False, 'type': 'string'}})
      
        def post(self):
            
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

        @jwt_required()     
        @moderator_ns.doc(description='To display all the articles that has not been moderated yet.',
             security=[{"Bearer Token": []}])
        @moderator_ns.doc(responses={200: 'Success', 403: 'Unauthorized', 400 :'An error occured while trying to manipulate elastic search'})

        
        def get(self): 
            
            """
            
            ---
            Return: {
            'results': fields.Nested({
                'id': fields.String,
                'source': fields.Nested({
                    'title': fields.String,
                    'authors': fields.String,
                    'institutions': fields.String,
                    'abstract': fields.String,
                    'keywords': fields.String,
                    'article': fields.String,
                    'references': fields.String,
                    'date': fields.DateTime(dt_format='rfc822'),
                    'url': fields.String,
                    'is_published': fields.Boolean,
                })
            })
            }
            """
            if current_user.role == 'moderator':
                response = esknn.search_unpublished_document()
                if(response != 0):
                    
                    hits = response['hits']['hits']
                    
                    results = [{'id': hit['_id'], 'source': hit['_source']} for hit in hits]

                    return {'results': results},200
                else:
                    return {'error','An error occured while trying to manipulate elastic search'},400
            
            else:
                return {'error': 'Permission denied'}, 403  
    
    
    @moderator_ns.route('/articles/moderate/<id>')
    class ArticleResource (Resource):
            
        @jwt_required()
        @moderator_ns.doc(description='To delete an article.',
             security=[{"Bearer Token": []}])
        @moderator_ns.doc(responses={200: 'Success', 403: 'Unauthorized', 400 :'An error occured while trying to manipulate elastic search'})

        def delete(self,id):
            if current_user.role == 'moderator':
                response = esknn.delete_unpublished_document(id)
                
                if(response == 1):
                    
                    return {'message': 'article deleted successfully'},200
                else:
                    return {"error": "An error occured while trying to manipulate elastic search"}, 400
            else:
                return {'error': 'Permission denied'}, 403  
        
        @moderator_ns.expect(article_model)
        @jwt_required()
        @moderator_ns.doc(description='To correct an article.',
             security=[{"Bearer Token": []}])
        @moderator_ns.doc(responses={200: 'Success', 403: 'Unauthorized'})
        @moderator_ns.doc(params={'title': {'description': 'The Title', 'required': False, 'type': 'string'}, 'authors': {'description': 'The authors', 'required': False, 'type': 'string'},'institutions': {'description': 'The institutions', 'required': False, 'type': 'string'},'abstract': {'description': 'The abstract', 'required': False, 'type': 'string'},'keywords': {'description': 'The keywords', 'required': False, 'type': 'string'},'article': {'description': 'The Full text of the article', 'required': False, 'type': 'string'},'references': {'description': 'The references', 'required': False, 'type': 'string'}})

        def put(self,id): 
            if current_user.role == 'moderator':
                data = request.get_json()

                title=data.get('title','')
                authors=data.get('authors','')
                institutions=data.get('institutions','')
                abstract=data.get('abstract','')
                keywords=data.get('keywords','')
                article=data.get('article','')
                references=data.get('references','')

                if len (title) > 0:
                    esknn.correct_article(id,'title',title)
                if len (authors) > 0:
                    esknn.correct_article(id,'authors',authors)
                if len (institutions) > 0:
                    esknn.correct_article(id,'institutions',institutions)
                if len (abstract) > 0:
                    esknn.correct_article(id,'abstract',abstract)
                if len (keywords) > 0:
                    esknn.correct_article(id,'keywords',keywords)
                if len (article) > 0:
                    esknn.correct_article(id,'article',article)
                if len (references) > 0:
                    esknn.correct_article(id,'references',references)
                
                esknn.correct_article(id,'is_published',True)

                return {'message': 'article published successfully'},200
                            
            else:
                return {'error': 'Permission denied'}, 403  
            
    api.add_namespace(moderator_ns)


       