# auth.py
from flask import Blueprint, request, jsonify
from db import register_user, verify_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    success, message = register_user(username, password)
    status = 200 if success else 400
    return jsonify({"message": message}), status

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if verify_user(username, password):
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"message": "Invalid credentials"}), 401
