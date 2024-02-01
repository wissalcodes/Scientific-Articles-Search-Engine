
def init_routes(api):
    
    from . import auth_manager,forgot_password, user_dashboard_manager, favori_manager, article_manager
    
    auth_manager.init_auth_routes(api)
    forgot_password.init_auth_routes (api)
    user_dashboard_manager.init_auth_routes(api)
    favori_manager.init_auth_routes(api)
    article_manager.init_auth_routes(api)

    
def init_jwt(jwt,api):
    
    from . import logout_manager, access_manager
    
    logout_manager.init_logout_routes(jwt,api)
    access_manager.init_logout_routes(jwt,api)
   
def init_route_admin(api,esknn):
    
    from . import admin_dashboard_manager, moderator_dashboard_manager
    
    admin_dashboard_manager.init_ad(api,esknn)
    moderator_dashboard_manager.init_ad(api,esknn)
    
