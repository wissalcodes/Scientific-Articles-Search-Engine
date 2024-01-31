from flask import Blueprint, request, jsonify
from app.models.user import User
from app.database import db

users_bp = Blueprint('users_manager', __name__)

@users_bp.route('/update_name/<int:user_id>', methods=['PUT'])
def update_name(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    new_name = request.json.get('new_name')
    if new_name:
        user.update_name(new_name)
        db.session.commit()
        return jsonify({'message': 'Name updated successfully'}), 200
    else:
        return jsonify({'error': 'New name not provided'}), 400


@users_bp.route('/update_family_name/<int:user_id>', methods=['PUT'])
def update_family_name(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    new_family_name = request.json.get('new_family_name')
    if new_family_name:
        user.update_family_name(new_family_name)
        db.session.commit()
        return jsonify({'message': 'Family name updated successfully'}), 200
    else:
        return jsonify({'error': 'New family name not provided'}), 400


@users_bp.route('/update_username/<int:user_id>', methods=['PUT'])
def update_username(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    new_username = request.json.get('new_username')
    if new_username:
        update_result, success = user.update_username(new_username)
        db.session.commit()
        if not success:
            return jsonify({'error': update_result}), 400
        return jsonify({'message': 'Username updated successfully'}), 200
    else:
        return jsonify({'error': 'New username not provided'}), 400


@users_bp.route('/update_email/<int:user_id>', methods=['PUT'])
def update_email(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    new_email = request.json.get('new_email')
    if new_email:
        update_result, success = user.update_email(new_email)
        db.session.commit()
        if not success:
            return jsonify({'error': update_result}), 400
        return jsonify({'message': 'Email updated successfully'}), 200
    else:
        return jsonify({'error': 'New email not provided'}), 400
