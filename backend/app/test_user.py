# tests/test_user.py
import unittest
from appFactory import create_app
from app.database import db
from app.models.user import User

class UserModelTestCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        # Add test user setup if necessary

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_user_creation(self):
        user = User(username='testuser', email='test@example.com', password='test')
        db.session.add(user)
        db.session.commit()

        self.assertIsNotNone(User.query.filter_by(username='testuser').first())

    def test_user_partial_update(self):
        user = User(username='testuser', email='test@example.com', password='test')
        db.session.add(user)
        db.session.commit()

        # Simulate user updating only the username
        user.update(username='newusername')

        # Assert changes
        self.assertEqual(user.username, 'newusername')
        self.assertNotEqual(user.first_name, 'NewFirstName')  # Assuming 'NewFirstName' was the old value

if __name__ == '__main__':
    unittest.main()
