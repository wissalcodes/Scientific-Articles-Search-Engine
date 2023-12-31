from sqlite3 import IntegrityError
from flask import url_for
from app.database import db
from datetime import datetime
from werkzeug.security import generate_password_hash
import re
from sqlalchemy.exc import IntegrityError
from datetime import datetime

class FavoriteArticle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    article_identifier = db.Column(db.String(255), nullable=False)
    added_on = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<FavoriteArticle {self.article_identifier}>'


class User(db.Model):
    id = db.Column(db.Integer, primary_key =True)  
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    username =  db.Column(db.String(20), nullable=False, unique = True) 
    email =  db.Column(db.String(120), nullable = False, unique = True)
    password = db.Column(db.String(30),nullable = False)
    role = db.Column(db.String(10), default = 'user')
    date_added =  db.Column(db.DateTime, default=datetime.utcnow)
    favorite_articles = db.relationship('FavoriteArticle', backref='user', lazy=True)


    def __repr__(self):
        return '<Name %r>' % self.name
    
    # Method to add an article to favorites
    def add_favorite_article(self, article):
        if article not in self.favorite_articles:
            self.favorite_articles.append(article)
            db.session.commit()
    
        # Method to remove an article from favorites
    def remove_favorite_article(self, article):
        if article in self.favorite_articles:
            self.favorite_articles.remove(article)
            db.session.commit()

    # Method to get all favorite articles
    def get_favorite_articles(self):
         favorite_articles = FavoriteArticle.query.filter_by(user_id=self.id).all()
         return favorite_articles




    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
    def update_password(self,password):
        self.password = generate_password_hash(password)
        db.session.commit()
        
    def is_valid_email(email):
        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        return re.match(email_regex, email) is not None

    def email_exists(email):
        return User.query.filter_by(email=email).first() is not None



    def update_email(self, new_email):
        if not User.is_valid_email(new_email):
            return 'Invalid email format', False
        if User.email_exists(new_email):
            return 'Email already exists', False
        try:
            self.email = new_email
            db.session.commit()
            return 'Email updated successfully', True
        except IntegrityError:
            db.session.rollback()
            return 'Database error occurred', False
                    
    def update_name(self, new_name):
        self.first_name = new_name
        db.session.commit()

    def update_family_name(self, new_family_name):
        self.last_name = new_family_name
        db.session.commit()

    @staticmethod
    def username_exists(username):
        return User.query.filter_by(username=username).first() is not None

    def update_username(self, new_username):
        if User.username_exists(new_username):
            return 'Username already exists', False

        try:
            self.username = new_username
            db.session.commit()
            return 'Username updated successfully', True
        except Exception as e:
            db.session.rollback()
            return f'Database error occurred: {e}', False

