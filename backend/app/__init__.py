from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"])
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = '4f0280d43e2b66fe2b651f32440955c7'

db = SQLAlchemy(app)

# Import your routes
from .routes import main

# Register the blueprint
app.register_blueprint(main.bp)
