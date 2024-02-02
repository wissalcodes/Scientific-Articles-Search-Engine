from datetime import datetime
from flask import request, jsonify
from flask_restx import Namespace, Resource
import requests



def init_auth_routes(api):

    article_ns = Namespace('article_manager',description='searching operations')
    api.add_namespace(article_ns)
    
    @article_ns.route('/search_articles')
    class SearchResource (Resource):
        
        @article_ns.doc(description='To search an article using keywords with or with no filters.')
        @article_ns.doc(responses={200: 'Success'})
        @article_ns.doc(params={'search_terms': {'description': 'input search query', 'required': True, 'type': 'string'},'title_filter': {'description': 'Filter by title', 'required': False, 'type': 'boolean'},'authors_filter': {'description': 'Filter by authors', 'required': False, 'type': 'boolean'},'institutions_filter': {'description': 'Filter by institutions', 'required': False, 'type': 'boolean'},'keywords_filter': {'description': 'Filter by keywords', 'required': False, 'type': 'boolean'},'start_date': {'description': 'Filter by period', 'required': False, 'type': 'date'},'end_date': {'description': 'Filter by period', 'required': False, 'type': 'date'}})
        def post(self):
            search_data = request.json
            search_terms = search_data.get('search_terms', '')

            # Base structure of the Elasticsearch query
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
            if search_data.get('title_filter'):
                search_query['query']['bool']['must'].append({"match": {"title": search_terms}})
            if search_data.get('authors_filter'):
                search_query['query']['bool']['must'].append({"match": {"authors": search_terms}})
            if search_data.get('institutions_filter'):
                search_query['query']['bool']['must'].append({"match": {"institutions": search_terms}})
            if search_data.get('keywords_filter'):
                search_query['query']['bool']['must'].append({"match": {"keywords": search_terms}})

        # Add date filter if provided
            if search_data.get('start_date') and search_data.get('end_date'):
                
                parts = search_data.get('start_date').split("-")
                digits = [int(part) for part in parts if part.isdigit()]
                start_date = datetime(digits[0], digits[1], digits[2], 00, 00, 00).strftime('%Y-%m-%d %H:%M:%S')
                
                parts = search_data.get('end_date').split("-")
                digits = [int(part) for part in parts if part.isdigit()]
                end_date = datetime(digits[0], digits[1], digits[2], 23, 59, 59).strftime('%Y-%m-%d %H:%M:%S')

                date_filter = {
                    "range": {
                        "date": {
                            "gte": start_date,
                            "lte": end_date,
                        }
                    }
                }
                search_query['query']['bool']['must'].append(date_filter)
            

            # If no specific filters are provided, perform a broad search
            if not search_query['query']['bool']['must']:
                search_query['query']['bool']['must'].append({
                    "multi_match": {
                        "query": search_terms,
                        "fields": ["title", "authors", "institutions", "abstract", "keywords", "full_text", "references"]
                    }
                })

            # Add sorting to the query
            search_query["sort"] = [{"date": {"order": "desc"}}]
            print(search_query)
            # Send the query to Elasticsearch
            response = requests.post('http://localhost:9200/articles/_search', json=search_query)
            
            if response.status_code == 200:
                result_data = response.json()

                hits = result_data.get('hits', {}).get('hits', [])

                results = [{'id': hit['_id'], 'source': hit['_source']} for hit in hits]

                return {'results': results}, 200
                
            else:
                return {'error': 'Elasticsearch request failed'}, response.status_code
        
