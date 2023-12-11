
def init_routes(api):
    
    from . import auth_manager,admin_dashboard_manager
    
    auth_manager.init_auth_routes( api)
    admin_dashboard_manager.init_auth_routes (api)
    
def init_jwt(jwt,api):
    
    from . import logout_manager, access_manager
    
    logout_manager.init_logout_routes(jwt,api)
    access_manager.init_logout_routes(jwt,api)
   
def init_mail(api,mail):
    
    from . import forgot_password
    
    forgot_password.init_forg_pass (api,mail)
# def init_app(app):
#     pass

