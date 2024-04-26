from datetime import datetime, timedelta, timezone
import bcrypt
import jwt
from flask import Blueprint, jsonify, request

from constants import COMMON
from services.userService import get_user_by_email, generate_hash_password, create_user

from middlewares import auth_middleware

auth_bp = Blueprint("auth", __name__)


@auth_bp.route(COMMON.ROUTES.LOGIN, methods=["POST"])
def login():
    """API for handle login"""
    try:
        body = request.get_json()
        if body is None:
            return "Error: Request must have application/json Content-Type"
        if "email" not in body:
            return {"message": "email must be provided!"}, 400
        if "password" not in body:
            return {"message": "password must be provided!"}, 400

        exist = get_user_by_email(email=body["email"])
        if not exist:
            return {"message": "user not found!"}, 404
        password = body["password"]
        hashed_password = exist.password
        # Check password
        if not bcrypt.checkpw(
            password.encode("utf-8"), hashed_password.encode("utf-8")
        ):
            return {"message": "password is incorrect!"}, 400
        current_user = exist.serialize()
        # Gen token
        body["exp"] = datetime.now(tz=timezone.utc) + timedelta(seconds=int(COMMON.JWT.EXPIRES_IN))
        token = jwt.encode(current_user, COMMON.JWT.SECRET)
        return {"code": 200, "token": token, "data": current_user}

    except Exception as e:
        print(str(e))
        return {"message": "Internal server error"}, 500


@auth_bp.route(COMMON.ROUTES.SIGNUP, methods=["POST"])
def signup():
    """API for handle signup"""

    try:
        body = request.get_json()

        if "email" not in body:
            return {"message": "email must be provided!"}, 400
        if "password" not in body:
            return {"message": "password must be provided!"}, 400

        exist = get_user_by_email(email=body['email'])
        if exist:
            return {"message": "email already exists!"}, 400
        body["password"] = generate_hash_password(body['password'])
        user = create_user(body)
        return {"code": 200, "message": "Signup success", "data": user}, 201
    except Exception as e:
        print(str(e))
        return {"code": 500, "message": "Internal Server Error"}, 500


@auth_bp.route(COMMON.ROUTES.ME, methods=["GET"])
@auth_middleware
def get_info(current_user):
    """API for handle login"""
    try:
        return {"code": 200, "data": current_user}
    except Exception as e:
        print(str(e))
        return {"code": 500, "message": "Internal Server Error"}, 500

