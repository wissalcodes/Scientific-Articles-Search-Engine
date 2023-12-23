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
    
    
    # return all the articles that has not been moderated
    # def search_document(self, query, field_name) -> Dict:
    #     ''' Search a index\n
    #         --------------
    #         Takes -> fvecs\n
    #         Returns -> dict from es
    #     '''
    #     result = es.search(
    #         request_timeout=30,
    #         index=INDEX_NAME,
    #         body={
    #             'query': {
    #                 'match': {
    #                     field_name: {
    #                         'query': query
    #                     }
    #                 }
    #             }
    #         }
    #     )

    #     return result
