from flask_mail import Mail

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///db.sqlite3'
    SECRET_KEY = '4f0280d43e2b66fe2b651f32440955c7'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True
    SQLALCHEMY_ECHO = True
    MAIL_SERVER = 'smtp.sendgrid.net'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = 'apikey'
    MAIL_PASSWORD = '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'
    
    
    
    
    
