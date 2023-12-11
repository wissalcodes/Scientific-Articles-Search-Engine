from flask import url_for
from app.database import db
from datetime import datetime
from werkzeug.security import generate_password_hash

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
        
