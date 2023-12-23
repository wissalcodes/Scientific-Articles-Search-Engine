from flask import Blueprint, request, jsonify
import requests
from app.models.article import Article, Author, Institution

article_manager = Blueprint('article_manager', __name__)

# Endpoint to index an article
@article_manager.route('/index_article', methods=['POST'])
def index_article():
    article_data = request.json
    article = Article(
        article_id=article_data['article_id'],
        title=article_data['title'],
        publication_date=article_data['publication_date'],
        abstract=article_data['abstract'],
        keywords=article_data['keywords'],
        full_text=article_data['full_text'],
        url=article_data['url'],
        authors=[Author(
            author_id=auth['author_id'],
            name=auth['name'],
            institutions=[Institution(
                institution_id=inst['institution_id'],
                institution_name=inst['institution_name']
            ) for inst in auth.get('institutions', [])]
        ) for auth in article_data.get('authors', [])]
    )
    response = requests.post('http://localhost:9200/articles_index/_doc/' + article_data['article_id'], json=article.to_dict())
    return jsonify(response.json())
@article_manager.route('/search_articles', methods=['POST'])
def search_articles():
    search_data = request.json
    search_terms = search_data.get('search_terms', '')

    # Initialize the base query
    search_query = {
        "query": {
            "bool": {
                "must": []
            }
        }
    }

    # Check for title filter
    if search_data.get('title_filter'):
        search_query['query']['bool']['must'].append({
            "match": {
                "title": search_terms
            }
        })

    # Check for author filter
    if search_data.get('authors_filter'):
        search_query['query']['bool']['must'].append({
            "match": {
                "authors.name": search_terms
            }
        })

    # Default search without specific filters
    if not search_query['query']['bool']['must']:
        search_query = {
            "query": {
                "multi_match": {
                    "query": search_terms,
                    "fields": ["title", "abstract", "full_text", "keywords", "authors.name", "authors.institutions.institution_name"]
                }
            }
        }

    # Add sorting by publication_date in descending order (most recent first)
    search_query["sort"] = [{"publication_date": {"order": "desc"}}]

    response = requests.get('http://localhost:9200/articles_index/_search', json=search_query)
    return jsonify(response.json())
