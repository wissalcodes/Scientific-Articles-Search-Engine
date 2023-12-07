
def init_routes(app, api):
    
    from . import auth
    
    auth.init_auth_routes(app, api)
    
def init_jwt(jwt,api):
    
    from . import logout_manager
    
    logout_manager.init_logout_routes(jwt,api)

