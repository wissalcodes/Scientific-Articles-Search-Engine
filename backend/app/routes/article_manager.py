from flask import Blueprint, request, jsonify
import requests
from app.models.article import Article

article_manager = Blueprint('article_manager', __name__)

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
        references=article_data['references'],
        url=article_data['url'],
        authors=article_data['authors'],
        institutions=article_data['institutions'],  # Add institutions field
        is_published=article_data['is_published']
    )
    response = requests.post('http://localhost:9200/articles_index/_doc/' + article.article_id, json=article.to_dict())
    return jsonify(response.json())

@article_manager.route('/search_articles', methods=['POST'])
def search_articles():
    search_data = request.json
    search_terms = search_data.get('search_terms', '')
    filters = search_data.get('filters', {})

    search_query = {
        "query": {
            "bool": {
                "must": [
                    {
                        "term": {
                            "is_published": True  # Filter to include only published articles
                        }
                    }
                ],
                "should": [],  # Optional matches
                "minimum_should_match": 1  # At least one 'should' condition must be met
            }
        },
        "sort": [
            {
                "publication_date": {
                    "order": "desc"
                }
            }
        ]
    }

    # Define a list of filter fields
    filter_fields = ["title", "authors", "keywords", "article", "abstract", "references", "institutions"]


    # Check for title filter
    if search_data.get('title_filter'):
        search_query['query']['bool']['must'].append({
            "match": {
                "title": search_terms
            }
        })
    
    # Check for institutions filter
    if search_data.get('institutions_filter'):
        search_query['query']['bool']['must'].append({
            "match": {
                "institutions": search_terms
            }
        })

    # Check for author filter
    if search_data.get('authors_filter'):
        search_query['query']['bool']['must'].append({
            "match": {
                "authors.name": search_terms
            }
        }) 
    # Add filters based on the provided fields
    for field in filter_fields:
        apply_filter = filters.get(f'{field}_filter', False)
        if apply_filter:
            search_query['query']['bool']['must'].append({
                "match": {
                    field: search_terms
                }
            })

    if not search_query['query']['bool']['must']:
        search_query = {
            "query": {
                "multi_match": {
                    "query": search_terms,
                    "fields": filter_fields
                }
            }
        }

    search_query["sort"] = [{"date": {"order": "desc"}}]

    response = requests.get('http://localhost:9200/articles_index/_search', json=search_query)
    return jsonify(response.json())
