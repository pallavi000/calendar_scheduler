from models import User
import bcrypt


def get_user_by_email(email):
    return User.query.filter_by(email=email).first()


def generate_hash_password(password):
    hash_password = bcrypt.hashpw(
        password.encode("utf-8"), bcrypt.gensalt()
    )
    return hash_password.decode("utf-8")


def create_user(data):
    new_user = User(
        name=data['name'],
        email=data['email'],
        password=data['password'],
    )
    new_user.save_to_db()
    return new_user.serialize()
