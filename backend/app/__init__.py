from flask import Flask
from flask_cors import CORS
from config import Config
from flask_restx import Api
from flask_restx import Namespace, Resource
from .database import db
from .models.user import User



app = Flask(__name__)
app.config.from_object(Config)
api = Api(app, doc='/docs')
db.init_app(app)

CORS(app, origins=["http://localhost:5173"])

# Import your routes
from .routes import main

# Register the blueprint
app.register_blueprint(main.bp)

@api.route('/hello')
class HelloRessource(Resource):
    def get(self):
        return{"message":"Hello world!"}
    
#to add in our db
@app.shell_context_processor
def make_shell_context():
    return{
        "db" : db,
        "User" : User
    }