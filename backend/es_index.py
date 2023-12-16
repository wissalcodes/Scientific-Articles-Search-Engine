from elasticsearch import Elasticsearch

    
es = Elasticsearch([{'host': 'localhost', 'port': 9200}], http_auth=('elasticsearch', '4C05s6KNQMOtoF2AYGx2CQ'),)

index_name = 'pending_articles'


def send_to_es(article):
    es.index(index=index_name, doc_type = '_doc' , body=article)

