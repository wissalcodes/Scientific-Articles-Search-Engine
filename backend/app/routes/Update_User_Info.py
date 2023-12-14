# routes/users_manager.py
from flask import Blueprint, request, jsonify
from app.models.user import User
from app.database import db

users_bp = Blueprint('users_manager', __name__)

@users_bp.route('/update_user/<int:user_id>', methods=['POST'])
def update_user_route(user_id):
    # Retrieve user by ID
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Get data from request
    username = request.form.get('username')
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')

    # Update user details using the model's method
    user.update(username=username, first_name=first_name, last_name=last_name)

    return jsonify({'message': 'User updated successfully', 'user': {'id': user.id, 'username': user.username, 'first_name': user.first_name, 'last_name': user.last_name}}), 200

# Remember to register the Blueprint in your app/__init__.py file
