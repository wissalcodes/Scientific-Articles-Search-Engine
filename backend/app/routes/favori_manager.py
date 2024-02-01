from xml.dom import NotFoundErr
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, current_user
from flask_restx import Namespace,Resource
from app.database import db
from elasticsearch import Elasticsearch
from app.models.user import User, FavoriteArticle  

favori_bp = Blueprint('favori_manager', __name__)
es = Elasticsearch(['http://localhost:9200'])  

def init_auth_routes(api):

    favorites_ns = Namespace('favori_manager',description='favorite articles operations')

    @favorites_ns.route('/add_favorite/<int:user_id>/<article_identifier>')
    
    class AddFavsResource (Resource):
        
        @jwt_required()
        @favorites_ns.doc(description='To add an article to the user s favorites.',
             security=[{"Bearer Token": []}])
        @favorites_ns.doc(responses={200: 'Success', 403: 'Unauthorized', 400 :'article is already in favorites'})

        def post(self,user_id, article_identifier):

            if current_user.role == 'user':
                # Check if the article is already in user's favorites
                existing_favorite = FavoriteArticle.query.filter_by(user_id=user_id, article_identifier=article_identifier).first()
                if not existing_favorite:
                    new_favorite = FavoriteArticle(user_id=user_id, article_identifier=article_identifier)
                    db.session.add(new_favorite)
                    db.session.commit()
                    return jsonify({"message": "Article added successfully", "status": "success"}), 200
                else:
                    return jsonify({"message": "Article is already in favorites", "status": "failure"}), 400
            else:
                return {'error': 'Permission denied'}, 403  

    
    @favorites_ns.route('/remove_favorite/<int:user_id>/<article_identifier>')
    class RemoveFavsResource (Resource):
        
        @jwt_required()
        @favorites_ns.doc(description='To remove an article from the user s favorites.',
             security=[{"Bearer Token": []}])
        @favorites_ns.doc(responses={200: 'Success', 403: 'Unauthorized', 400 :'article is not in favorites'})

        def post(self,user_id, article_identifier):

            if current_user.role == 'user':
                
                favorite_article = FavoriteArticle.query.filter_by(user_id=user_id, article_identifier=article_identifier).first()
                if favorite_article:
                    db.session.delete(favorite_article)
                    db.session.commit()
                    # Return a JSON response indicating successful deletion
                    return jsonify({"message": "Article removed from favorites successfully", "status": "success"}), 200
                else:
                    # Return a JSON response indicating the article was not found in favorites
                    return jsonify({"message": "Article not found in favorites", "status": "failure"}), 404
            else:
                return {'error': 'Permission denied'}, 403  

    @favorites_ns.route('/article_details/<article_identifier>')
    
    class ViewFavsResource (Resource):
        
        @jwt_required()
        @favorites_ns.doc(description='To remove an article from the user s favorites.',
             security=[{"Bearer Token": []}])
        @favorites_ns.doc(responses={200: 'Success', 403: 'Unauthorized', 400 :'article is not in favorites'})

        def get(self, article_identifier):

            if current_user.role == 'user':
                try:
                    response = es.get(index="articles", id=article_identifier)
                    article_data = response['_source']
                    
                    # Returning article data as plain text
                    return jsonify(article_data), 200
                except NotFoundErr:
                    # Article not found in Elasticsearch
                    return jsonify({"message": "Article not found in Elasticsearch", "status": "failure"}), 404
                except Exception as e:
                    # Generic error handling
                    return jsonify({"message": f"Error occurred: {e}", "status": "failure"}), 500
            else:
                return {'error': 'Permission denied'}, 403  
            
        
    @favorites_ns.route('/favorite_articles/<int:user_id>')
    
    class GetFavsResource (Resource):
        
        @jwt_required()
        @favorites_ns.doc(description='To remove an article from the user s favorites.',
             security=[{"Bearer Token": []}])
        @favorites_ns.doc(responses={200: 'Success', 403: 'Unauthorized', 400 :'article is not in favorites'})

        def get(self,user_id):

            if current_user.role == 'user':

                favorite_articles = current_user.get_favorite_articles()
                articles_data = []
                for fav_article in favorite_articles:
                    try:
                        response = es.get(index="articles", id=fav_article.article_identifier)
                        if response['found']:
                            # Include both _id and _source in the response
                            articles_data.append({"_id": response['_id'], "_source": response['_source']})
                    except Exception as e:
                        continue 

                return jsonify({"message": f"Favorite articles for user {user_id}", "articles": articles_data})
            
            else:
                return {'error': 'Permission denied'}, 403  
    
    api.add_namespace(favorites_ns)