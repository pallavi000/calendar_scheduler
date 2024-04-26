from functools import wraps
import jwt
from flask import request, g
from constants import COMMON
from services.userService import get_user_by_email


def auth_middleware(f):
    @wraps(f)
    def decorated(*args, **kawargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]
        if not token:
            return {
                "message": "Authentication Token is missing!",
                "data": None,
                "error": "Unauthorized",
                "code": 401,
            }, 401
        try:
            data = jwt.decode(token, COMMON.JWT.SECRET, algorithms=["HS256"])
            if not data.get("email") or not data.get("id"):
                return {"message": "Invalid authorization!", "code": 401}, 401
            current_user = get_user_by_email(email=data.get("email"))
            if current_user is None:
                return {
                    "message": "Invalid Authentication token!",
                    "data": None,
                    "error": "Unauthorized",
                    "code": 401,
                }, 401
        except Exception as e:
            return {
                "message": "Something went wrong",
                "data": None,
                "error": str(e),
                "code": 500,
            }, 500
        g.current_user = current_user.serialize()
        return f(*args, **kawargs)

    return decorated
