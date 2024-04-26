from flask_sqlalchemy import SQLAlchemy
from utils import Serializer

db = SQLAlchemy()


class User(db.Model, Serializer):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def serialize(self):
        user = Serializer.serialize(self)
        del user['password']
        return user

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()


class Event(db.Model, Serializer):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(120), nullable=False)
    startTime = db.Column(db.String(120), nullable=False)
    endTime = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    participants = db.Column(db.String(255), nullable=False)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()