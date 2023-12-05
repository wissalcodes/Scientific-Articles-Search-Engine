#from decouple import config

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///db.sqlite3'
    SECRET_KEY = '4f0280d43e2b66fe2b651f32440955c7'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True
    SQLALCHEMY_ECHO = True
    
    
