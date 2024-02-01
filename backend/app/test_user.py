import unittest
from .database import create_app, db
from models.user import User

class UserUpdateTestCase(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # Set up before all tests
        cls.app = create_app() 
        cls.app_context = cls.app.app_context()
        cls.app_context.push()
        db.create_all()

    @classmethod
    def tearDownClass(cls):
        # Clean up after all tests
        db.session.remove()
        db.drop_all()
        cls.app_context.pop()

    def setUp(self):
        # Runs before each test method
        self.client = self.app.test_client()

        # Add a test user
        test_user = User(
            first_name="Douaa",
            last_name="hennane",
            username="douaa7",
            email="douaa@example.com",
            password="password"
        )
        db.session.add(test_user)
        db.session.commit()

    def tearDown(self):
        # Runs after each test method
        User.query.delete()

    def test_update_name(self):
        # Fetch the test user's ID
        user_id = User.query.filter_by(username="douaa7").first().id

        # Perform the update operation
        response = self.client.put(
            f'/update_name/{user_id}',
            json={'new_name': 'DOU'}
        )
        self.assertEqual(response.status_code, 200)

        # Verify that the name was updated
        updated_user = User.query.get(user_id)
        self.assertEqual(updated_user.first_name, 'DOU')

if __name__ == '__main__':
    unittest.main()
