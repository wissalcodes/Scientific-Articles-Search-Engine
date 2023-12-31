class Article:
    def __init__(self, article_id, title, date, abstract, keywords, full_text, references, url, authors,institutions, is_published):
        self.article_id = article_id
        self.title = title
        self.date = date
        self.abstract = abstract
        self.keywords = keywords
        self.full_text = full_text
        self.references = references
        self.url = url
        self.authors = authors
        self.institutions = institutions 
        self.is_published = is_published

    def to_dict(self):
        return {
            "article_id": self.article_id,
            "title": self.title,
            "date": self.date,
            "abstract": self.abstract,
            "keywords": self.keywords,
            "article": self.full_text,
            "references": self.references,
            "url": self.url,
            "authors": self.authors,
            "institutions": self.institutions, 
            "is_published": self.is_published
        }
