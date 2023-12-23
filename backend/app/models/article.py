class Author:
    def __init__(self, author_id, name, institutions):
        self.author_id = author_id
        self.name = name
        self.institutions = institutions

    def to_dict(self):
        return {
            "author_id": self.author_id,
            "name": self.name,
            "institutions": [inst.to_dict() for inst in self.institutions]
        }

class Institution:
    def __init__(self, institution_id, institution_name):
        self.institution_id = institution_id
        self.institution_name = institution_name

    def to_dict(self):
        return {
            "institution_id": self.institution_id,
            "institution_name": self.institution_name
        }

class Article:
    def __init__(self, article_id, title, publication_date, abstract, keywords, full_text, url, authors):
        self.article_id = article_id
        self.title = title
        self.publication_date = publication_date
        self.abstract = abstract
        self.keywords = keywords
        self.full_text = full_text
        self.url = url
        self.authors = authors

    def to_dict(self):
        return {
            "article_id": self.article_id,
            "title": self.title,
            "publication_date": self.publication_date,
            "abstract": self.abstract,
            "keywords": self.keywords,
            "full_text": self.full_text,
            "url": self.url,
            "authors": [author.to_dict() for author in self.authors]
        }
