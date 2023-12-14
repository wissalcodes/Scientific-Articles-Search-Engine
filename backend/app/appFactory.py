from flask import Flask
from  config import Config
from flask_migrate import Migrate
from .database import db
from .models.user import User
from .routes.Update_User_Info import users_bp
from .routes import init_routes, init_jwt, init_mail
from flask_restx import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail

def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(Config[config_name])

    # Register users Blueprint
    app.register_blueprint(users_bp, url_prefix='/users')

    # Initialize API
    api = Api(app, title='API', doc='/docs')
    init_routes(api)

    # Initialize the database
    db.init_app(app)

    # Initialize database migrations
    migrate = Migrate(app, db)

    # Initialize JWT
    jwt = JWTManager(app)
    init_jwt(jwt, api)

    # Enable CORS
    CORS(app)

    # Initialize Mail
    mail = Mail()
    mail.init_app(app)
    init_mail(api, mail)

    # Add a shell context for easier debugging
    @app.shell_context_processor
    def make_shell_context():
        return {
            "db": db,
            "User": User
        }

    return app
