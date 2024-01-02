from app.models.user import User

def init_logout_routes(jwt,api):
    
    # Additional claims (admin privilege)

    @jwt.additional_claims_loader
    def make_additional_claims(identity):
        if identity == "admin":
            return {"is_admin":True}
        return {"is_admin":False}
    
    
    #load the current logged in user
    @jwt.user_lookup_loader
    def user_lookup_callback(jwt_header,jwt_data):
        identity=jwt_data['sub']
        
        return User.query.filter_by(email=identity).one_or_none()
        