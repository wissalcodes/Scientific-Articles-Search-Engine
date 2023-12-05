from flask import Blueprint

bp = Blueprint('main', __name__)


def init_routes(app, api):
    # Import specific route modules here
    from . import auth
    # Initialize routes with app and api instances
    auth.init_auth_routes(app, api)

