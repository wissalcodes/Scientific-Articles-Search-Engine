import unittest
import json
from app import create_app, db

class UserTest(unittest.TestCase):
    
    def setUp(self):
        self.app = create_app('testing')  # Assuming you have a testing configuration
        self.client = self.app.test_client
        self.user_data = {
            'first_name': 'Test',
            'last_name': 'User',
            'username': 'testuser',
            'email': 'testuser@example.com',
            'password': 'testpassword'
        }

        with self.app.app_context():
            # create all tables
            db.create_all()

    def test_user_creation(self):
        res = self.client().post('/auth/signup', data=json.dumps(self.user_data), content_type='application/json')
        result = json.loads(res.data)
        self.assertEqual(res.status_code, 201)
        self.assertEqual(result['message'], 'User registered successfully')

    def tearDown(self):
        """teardown all initialized variables."""
        with self.app.app_context():
            # drop all tables
            db.session.remove()
            db.drop_all()

# This allows running the test from the command line
if __name__ == "__main__":
    unittest.main()
