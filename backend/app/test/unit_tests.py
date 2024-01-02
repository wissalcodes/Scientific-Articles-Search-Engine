import unittest
from app import app,db
from config import TestConfig
from app.models.user import User

class APITestCase(unittest.TestCase):
    #declare the variables in our test
    def setUp(self):
        app.config.from_object(TestConfig)
        self.app=app
        
        #interface for testing
        self.client=self.app.test_client(self)

        with self.app.app_context():
            # db.init_app(self.app)

            db.create_all()

    def test_hello_world(self):
        hello_world_response=self.client.get('/auth/')
        
        json=hello_world_response.json
        
        self.assertEqual(json,{'message':'hello world!'})
    
    
    def test_sign_up(self):
        signup_response=self.client.post('/auth/signup',
            json={
                "first_name" : 'test',
                "last_name" : 'test',
                "username" : 'test',
                "email" : 'test@gmail.com',
                "password":'test',
            }
        )
        status_code=signup_response.status_code
        self.assertEqual(status_code,201)  
        
    def test_sign_in(self):
        signup_response=self.client.post('/auth/signup',
            json={
                "first_name" : 'test',
                "last_name" : 'test',
                "username" : 'test',
                "email" : 'test@gmail.com',
                "password":'test',
            }
        )
        signin_response=self.client.post('/auth/signin',
            json={
                "email" : 'test@gmail.com',
                "password":'test',
            }
        )
        status_code=signin_response.status_code
        self.assertEqual(status_code,200)  
        
        
    # delete the inserted user after testing the signup
    def tearDown(self):
        with self.app.app_context():
            
            test_user = User.query.filter_by(username='test').first()

            if test_user:
                db.session.delete(test_user)
                db.session.commit()
        

if __name__ == "__main__":
    unittest.main()