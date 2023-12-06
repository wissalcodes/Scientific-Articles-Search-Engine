
def init_routes(app, api):
    
    from . import auth
    
    auth.init_auth_routes(app, api)

