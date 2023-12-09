
def init_routes(api):
    
    from . import auth_manager, users_manager
    
    auth_manager.init_auth_routes( api)
    users_manager.init_auth_routes (api)
    
def init_jwt(jwt,api):
    
    from . import logout_manager
    
    logout_manager.init_logout_routes(jwt,api)
    
# def init_app(app):
#     pass

