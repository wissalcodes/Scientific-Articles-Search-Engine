from flask import Flask
from config import Config
from .database import db
from .models.user import User
from flask_migrate import Migrate
from .routes.auth import auth_ns
from flask_restx import Api

app = Flask(__name__)
app.config.from_object(Config)

api = Api(app,title='API',doc='/docs')

def my_api():
    return Api()


api.add_namespace(auth_ns)

db.init_app(app)
migrate=Migrate(app,db)


#CORS(app, origins=["http://localhost:5173"])


#to add in our db
@app.shell_context_processor
def make_shell_context():
    return{
        "db" : db,
        "User" : User
    }