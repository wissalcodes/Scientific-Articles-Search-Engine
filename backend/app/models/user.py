from app.database import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key =True)  
    username =  db.Column(db.String(20), nullable=False) 
    email =  db.Column(db.String(120), nullable = False, unique = True)
    password = db.Column(db.String(30),nullable = False)
    date_added =  db.Column(db.DateTime, default=datetime.utcnow)

    # Create A String
    def __repr__(self):
        return '<Name %r>' % self.name
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
    def update(self):
        pass

