from app.models.token_block_list import TokenBlocklist
from app import db
from flask_restx import Namespace, Resource
from flask_jwt_extended import get_jwt,jwt_required
from flask import jsonify, make_response

def init_logout_routes(jwt,api):
    
    logout_ns = Namespace('logout', description='Logging out operations')
    
    api.add_namespace(logout_ns)
    
    @jwt.token_in_blocklist_loader
    def token_in_blocklist_callback(jwt_header,jwt_data):
        jti = jwt_data['jti']

        token = db.session.query(TokenBlocklist).filter(TokenBlocklist.jti == jti).scalar()
       
        return token is not None # returns false in case its not blacklisted
    
    @logout_ns.route('/') 
    class LogoutResource(Resource):
        
        @jwt_required(verify_type=False)#==true :forced to access with only refresh tokens ==false both
        def get(self):
            jwt__=get_jwt()
            jti = jwt__['jti']
            token_type = jwt__['type']
            token_block = TokenBlocklist(jti=jti)
            token_block.save_Token_to_db() #revoke the access
            return make_response(jsonify({"message: ":"Logged out successfully",
                                        "message:": f"{token_type} token revoked successfully"}),200)            
            
    
