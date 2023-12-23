# app/__init__.py
from flask import Flask
from flask_migrate import Migrate
from flask_restx import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail

from config import Config
from .database import db
from .models.user import User
from .routes.users_manager import users_bp
from .routes import init_routes, init_jwt, init_mail
from .routes.article_manager import article_manager

##APP##
app = Flask(__name__)
app.config.from_object(Config)

## Register  users Blueprint
app.register_blueprint(users_bp, url_prefix='/users') 
 ## Register  users Blueprint

app.register_blueprint(article_manager)

##API##
api = Api(app, title='API', doc='/docs')

init_routes(api)

##DATABASE##
db.init_app(app)
migrate = Migrate(app, db)

##Authentication tokens##
jwt = JWTManager(app)
init_jwt(jwt, api)

##Backend x client##
CORS(app)

##Reset password##
mail = Mail()
mail.init_app(app)
init_mail(api, mail)

# to add in our db
@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "User": User
    }
