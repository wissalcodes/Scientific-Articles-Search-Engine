from sqlite3 import IntegrityError
from flask import url_for
from app.database import db
from datetime import datetime
from werkzeug.security import generate_password_hash
import re
from sqlalchemy.exc import IntegrityError


class User(db.Model):
    id = db.Column(db.Integer, primary_key =True)  
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    username =  db.Column(db.String(20), nullable=False, unique = True) 
    email =  db.Column(db.String(120), nullable = False, unique = True)
    password = db.Column(db.String(30),nullable = False)
    role = db.Column(db.String(10), default = 'user')
    date_added =  db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<Name %r>' % self.name
    
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
                    
    def update(self, username=None, first_name=None, last_name=None):
       if username is not None:
          self.username = username
       if first_name is not None:
          self.first_name = first_name
       if last_name is not None:
           self.last_name = last_name
       db.session.commit()
