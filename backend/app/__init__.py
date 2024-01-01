from flask import Flask
from flask_migrate import Migrate
from flask_restx import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail

from config import Config
from .database import db
from .models.user import User
from .routes import init_routes,init_jwt,init_route_admin

from .engine.es import ESKNN

##APP##
app = Flask(__name__)
##Backend x client##
CORS(app, origins="http://localhost:5173")
app.config.from_object(Config)

##API##
api = Api(app,title='API',doc='/api/docs')

init_routes(api)

##DATABASE##
db.init_app(app)
migrate=Migrate(app,db)

##Authentication tokens##
jwt = JWTManager(app)
init_jwt(jwt,api)


##Reset password##
mail=Mail()
mail.init_app(app)

# Check the index
esknn = ESKNN()
# result = esknn.create_index()

init_route_admin(api,esknn) 


#to add in our db
@app.shell_context_processor
def make_shell_context():
    return{
        "db" : db,
        "User" : User
    }
    
