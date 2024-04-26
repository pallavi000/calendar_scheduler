from datetime import datetime, timedelta, timezone
import bcrypt
import jwt
from flask import Blueprint, g, request

from constants import COMMON
from services.userService import get_user_by_email, generate_hash_password, create_user

from middlewares import auth_middleware
from schema import LoginSchema, RegisterSchema
from marshmallow import ValidationError

auth_bp = Blueprint("auth", __name__)


@auth_bp.route(COMMON.ROUTES.LOGIN, methods=["POST"])
def login():
    """API for handle login"""
    try:
        body = request.json
        # input validation
        schema = LoginSchema()
        try:
            schema.load(body)
        except ValidationError as err:
            return {"message": err.messages}, 400

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
        return {"code": 200, "token": token, "user": current_user}

    except Exception as e:
        print(str(e))
        return {"message": "Internal server error"}, 500


@auth_bp.route(COMMON.ROUTES.SIGNUP, methods=["POST"])
def signup():
    """API for handle signup"""

    try:
        body = request.json
        # input validation
        schema = RegisterSchema()
        try:
            schema.load(body)
        except ValidationError as err:
            return {"message": err.messages}, 400

        exist = get_user_by_email(email=body['email'])
        if exist:
            return {"message": "email already exists!"}, 400
        body["password"] = generate_hash_password(body['password'])
        user = create_user(body)
        return {"code": 201, "message": "Signup success", "user": user}, 201
    except Exception as e:
        print(str(e))
        return {"code": 500, "message": "Internal Server Error"}, 500


@auth_bp.route(COMMON.ROUTES.ME, methods=["GET"])
@auth_middleware
def get_info():
    """API for handle login"""
    try:
        return {"code": 200, "user": g.current_user}
    except Exception as e:
        print(str(e))
        return {"code": 500, "message": "Internal Server Error"}, 500

