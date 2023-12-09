from flask import Flask
from config import Config
from .database import db
from .models.user import User
from flask_migrate import Migrate
from flask_restx import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS

##APP##
app = Flask(__name__)
app.config.from_object(Config)

##API##
api = Api(app,title='API',doc='/docs')

from .routes import init_routes
init_routes(api)

##DATABASE##
db.init_app(app)
migrate=Migrate(app,db)

##Authentication tokens##
jwt = JWTManager(app)
from .routes import init_jwt
init_jwt(jwt,api)

##Backend x client##
CORS(app)

#to add in our db
@app.shell_context_processor
def make_shell_context():
    return{
        "db" : db,
        "User" : User
    }
    
    
