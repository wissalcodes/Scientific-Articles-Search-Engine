from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
# Set up the link between the front-end and the back-end
CORS(app, origins=["http://localhost:5173"])

# Add SQLAlchemy to the flask app, creates an SQLite database file "database.db" once db.create_all() is called
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

# Secret key to access the database
app.config['SECRET_KEY'] = "key"

# Initialize the database
db = SQLAlchemy(app)

# Create an example of a model (table) in the database
class Users(db.Model):
    id = db.Column(db.Integer, primary_key =True)  # primary_key makes the id unique
    name =  db.Column(db.String(200), nullable=False) # name cannot be blank
    email =  db.Column(db.String(120), nullable = False, unique = True)
    date_added =  db.Column(db.DateTime, default=datetime.utcnow)

    # Create A String
    def __repr__(self):
        return '<Name %r>' % self.name

# Create a members API route 
@app.route("/members")
def members():
    return{"members": [ "Elabed Amina","Messikh Wissal", "Selidja Abderraouf", "Hennane Douaa", "Boughouas Mohamed"]}

if __name__ == "__main__":
    app.run(debug=True)