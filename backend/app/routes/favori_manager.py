from xml.dom import NotFoundErr
from flask import Blueprint, flash, jsonify, redirect, render_template, url_for
from app.database import db
from elasticsearch import Elasticsearch
from app.models.user import User, FavoriteArticle  # Assuming these are your model import paths

favori_bp = Blueprint('favori_manager', __name__)
es = Elasticsearch(['http://localhost:9200'])  # Ensure this matches your Elasticsearch configuration

from flask import jsonify  # Make sure to import jsonify

@favori_bp.route('/add_favorite/<int:user_id>/<article_identifier>', methods=['POST'])
def add_favorite(user_id, article_identifier):
    # Check if the user exists
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found", "status": "failure"}), 404

    # Check if the article exists in Elasticsearch
    try:
        response = es.get(index="pending_articles", id=article_identifier)
        if not response['found']:
            return jsonify({"message": "Article not found in Elasticsearch", "status": "failure"}), 404
    except NotFoundErr:  # Corrected exception class name here
        return jsonify({"message": "Article not found in Elasticsearch", "status": "failure"}), 404

    # Check if the article is already in user's favorites
    existing_favorite = FavoriteArticle.query.filter_by(user_id=user_id, article_identifier=article_identifier).first()
    if not existing_favorite:
        new_favorite = FavoriteArticle(user_id=user_id, article_identifier=article_identifier)
        db.session.add(new_favorite)
        db.session.commit()
        return jsonify({"message": "Article added successfully", "status": "success"}), 200
    else:
        return jsonify({"message": "Article is already in favorites", "status": "failure"}), 200

@favori_bp.route('/remove_favorite/<int:user_id>/<article_identifier>', methods=['POST'])
def remove_favorite(user_id, article_identifier):
    user = User.query.get(user_id)
    if not user:
        # Return a JSON response indicating failure due to user not found
        return jsonify({"message": "User not found", "status": "failure"}), 404

    favorite_article = FavoriteArticle.query.filter_by(user_id=user_id, article_identifier=article_identifier).first()
    if favorite_article:
        db.session.delete(favorite_article)
        db.session.commit()
        # Return a JSON response indicating successful deletion
        return jsonify({"message": "Article removed from favorites successfully", "status": "success"}), 200
    else:
        # Return a JSON response indicating the article was not found in favorites
        return jsonify({"message": "Article not found in favorites", "status": "failure"}), 404

@favori_bp.route('/article_details/<article_identifier>', methods=['GET'])
def article_details(article_identifier):
    try:
        response = es.get(index="pending_articles", id=article_identifier)
        article_data = response['_source']
        
        # Returning article data as plain text
        return jsonify(article_data), 200
    except NotFoundErr:
        # Article not found in Elasticsearch
        return jsonify({"message": "Article not found in Elasticsearch", "status": "failure"}), 404
    except Exception as e:
        # Generic error handling
        return jsonify({"message": f"Error occurred: {e}", "status": "failure"}), 500
    
    
@favori_bp.route('/favorite_articles/<int:user_id>', methods=['GET'])
def favorite_articles(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    favorite_articles = user.get_favorite_articles()
    articles_data = []
    for fav_article in favorite_articles:
        try:
            response = es.get(index="pending_articles", id=fav_article.article_identifier)
            if response['found']:
                articles_data.append(response['_source'])
        except Exception as e:
            continue 

    return jsonify({"message": f"Favorite articles for user {user_id}", "articles": articles_data})
