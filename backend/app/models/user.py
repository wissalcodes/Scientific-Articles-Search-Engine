from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# example of a model (table) in the database
class Users(db.Model):
    id = db.Column(db.Integer, primary_key =True)  # primary_key makes the id unique
    name =  db.Column(db.String(200), nullable=False) # name cannot be blank
    email =  db.Column(db.String(120), nullable = False, unique = True)
    date_added =  db.Column(db.DateTime, default=datetime.utcnow)

    # Create A String
    def __repr__(self):
        return '<Name %r>' % self.name
