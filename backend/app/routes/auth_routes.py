from flask import Blueprint, request, jsonify
from ..models import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    user = User.query.filter_by(email=data.get('email')).first()

    if user and user.password == data.get('password'):
        return jsonify({"message": "Login success"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401