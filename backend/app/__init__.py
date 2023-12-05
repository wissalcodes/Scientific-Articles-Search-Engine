from flask import Flask
from config import Config
from .database import db
from .models.user import User
from flask_migrate import Migrate
from flask_restx import Api
from flask_jwt_extended import JWTManager

##APP##
app = Flask(__name__)
app.config.from_object(Config)
##API##
api = Api(app,title='API',doc='/docs')

# Import routes after initializing app and api
from .routes import init_routes
# Initialize routes with app and api instances
init_routes(app, api)

##DATABASE##
db.init_app(app)
migrate=Migrate(app,db)

JWTManager(app)
#CORS(app, origins=["http://localhost:5173"])

#to add in our db
@app.shell_context_processor
def make_shell_context():
    return{
        "db" : db,
        "User" : User
    }
    
    
