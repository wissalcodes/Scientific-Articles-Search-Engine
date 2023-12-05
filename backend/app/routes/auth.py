from flask_restx import  Namespace, Resource
from app.models.user import User 


auth_ns = Namespace('auth', description='Authentication operations')

@auth_ns.route('/signup')
class Signup(Resource):
    def post(self):
        # Implement signup logic here
        return {'message': 'Signup endpoint'}
    
    def get(self):
        # Implement logic for handling GET requests to /auth/signin
        return {'message': 'GET request to signup endpoint'}

@auth_ns.route('/signin')
class Signin(Resource):
    def post(self):
        # Implement signin logic here
        return {'message': 'Signin endpoint'}
    
    def get(self):
        # Implement logic for handling GET requests to /auth/signin
        return {'message': 'GET request to signin endpoint'}

