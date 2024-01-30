from flask import Blueprint, request, jsonify
import requests
from app.models.article import Article
from datetime import datetime

article_manager = Blueprint('article_manager', __name__)

@article_manager.route('/index_article', methods=['POST'])
def index_article():
    article_data = request.json
    article = Article(
        article_id=article_data['article_id'],
        title=article_data['title'],
        date=article_data['date'],
        abstract=article_data['abstract'],
        keywords=article_data['keywords'],
        full_text=article_data['full_text'],
        references=article_data['references'],
        url=article_data['url'],
        authors=article_data['authors'],
        institutions=article_data['institutions'],  # Add institutions field
        is_published=article_data['is_published']
    )
    response = requests.post('http://localhost:9200/articles/_doc/' + article.article_id, json=article.to_dict())
    return jsonify(response.json())
    
@article_manager.route('/search_articles', methods=['POST'])
def search_articles():
    search_data = request.json
    search_terms = search_data.get('search_terms', '')
    filters = search_data.get('filters', {})

    # Constructing the Elasticsearch query
    search_query = {
        "query": {
            "bool": {
                "must": [],
                "filter": [
                    {"term": {"is_published": True}}
                ]
            }
        }
    }

    # Check and apply filters if provided
    if 'title_filter' in filters and filters['title_filter']:
        search_query['query']['bool']['must'].append({"match": {"title": search_terms}})
    if 'authors_filter' in filters and filters['authors_filter']:
        search_query['query']['bool']['must'].append({"match": {"authors": search_terms}})
    if 'institutions_filter' in filters and filters['institutions_filter']:
        search_query['query']['bool']['must'].append({"match": {"institutions": search_terms}})

    # If no specific filters are provided, perform a broad search
    if not search_query['query']['bool']['must']:
        search_query['query']['bool']['must'].append({
            "multi_match": {
                "query": search_terms,
                "fields": ["title", "authors", "institutions", "abstract", "keywords", "full_text", "references", "url"]
            }
        })



   # Add date filter if provided
    if 'start_date' in filters and 'end_date' in filters:
        start_date = filters['start_date']
        end_date = filters['end_date']
        date_filter = {
            "range": {
                "date": {
                    "gte": datetime.strptime(start_date, '%Y-%m-%d').strftime('%Y-%m-%d'),
                    "lte": datetime.strptime(end_date, '%Y-%m-%d').strftime('%Y-%m-%d')
                }
            }
        }
        search_query['query']['bool']['filter'].append(date_filter)


    # Add sorting to the query
    search_query["sort"] = [{"date": {"order": "desc"}}]

    # Send the query to Elasticsearch
    response = requests.post('http://localhost:9200/articles/_search', json=search_query)
    return jsonify(response.json())
