from config import Config
from elasticsearch import Elasticsearch, helpers
from typing import Dict
import warnings

warnings.filterwarnings(action='ignore')

INDEX_NAME = Config.INDEX_NAME
ESKNN_HOST = Config.ESKNN_HOST

es = Elasticsearch(hosts=[ESKNN_HOST])


class ESKNN():
    
    def __init__(self) -> None:
        ''''''
        pass
    
    def create_index(self) -> None:
        body = {
                "properties": {
                    "title": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword"
                            }
                        }
                    },
                    "authors": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword"
                            }
                        }
                    },
                    "institutions": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword"
                            }
                        }
                    },
                    "abstract": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword"
                            }
                        }
                    },
                    "keywords": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword"
                            }
                        }
                    },
                    "article": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword"
                            }
                        }
                    },
                    "references": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword"
                            }
                        }
                    },
                    "date": {
                        "type": "date",
                        "format": "yyyy-MM-dd HH:mm:ss"
                    },
                    "url": {
                        "type": "text"
                    },
                    "is_published": {
                        "type": "boolean"
                    }
                }
            }
        if es.indices.exists(index=INDEX_NAME):
            print(f"Index '{INDEX_NAME}' already exists.")
        else:
            #if the index does not exist
            try:
                es.indices.create(
                    index=INDEX_NAME,
                    body={"mappings": body},
                )
                print(f"Index '{INDEX_NAME}' created successfully.")
            except Exception as e:
                print(f"Failed to create index '{INDEX_NAME}': {e}")
            
    
    def insert_document(self, document) -> None:
        rows = [
            {
                '_index': INDEX_NAME,
                '_source': document
            }
        ]

        result = helpers.bulk(
            es,
            rows,
            request_timeout=30
        )

        return result
    
    
    def search_unpublished_document(self):
        
        # return all the articles that has not been moderated
        try:
            result = es.search(
                request_timeout=30,
                index=INDEX_NAME,
                body={
                'query': {
                        'term': {
                            'is_published': False
                        }
                    }
                }
            )
            return result
        
        except Exception:
            return 0
        
    def delete_unpublished_document(self,article_id):
        
        # Delete the article by ID from the Elasticsearch index
        try:
            
            es.delete(index=INDEX_NAME, id=article_id)
            return 1
        
        except Exception:
        
            return 0
        
        
    def correct_article(self, article_id, field_to_update, data):
        try:
            field_update = {
                'doc': {
                    field_to_update : data
                }
            }
            es.update(index=INDEX_NAME, id=article_id, body=field_update)
            
            return 1
        
        except Exception:
        
            return 0
