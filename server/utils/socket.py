from flask_socketio import SocketIO
from flask import request

socketio = SocketIO()
users = []


class User:
    def __init__(self, user_id, socket_id):
        self.user_id = user_id
        self.socket_id = socket_id


def create_socket_app(app):
    socketio.init_app(app, cors_allowed_origins="*")
    return app


def get_user_by_user_id(user_id):
    """
    Retrieve user data by user_id.
    """
    for user in users:
        if user.user_id == user_id:
            return user
    return None  # Return None if user_id is not found


def add_user(socket_id, user_id):
    """
    Add a new user to the users list.
    """
    exist = get_user_by_user_id(user_id)
    if exist:
        exist.socket_id = socket_id
    else:
        user = User(user_id, socket_id)
        users.append(user)


def delete_user_by_socket_id(socket_id):
    """
    Delete a user from users based on socket_id.
    """
    for user in users[:]:  # Iterate over a copy of the list to avoid modifying it while iterating
        if user.socket_id == socket_id:
            users.remove(user)


def send_event_notification(user_id, event, job_id):
    user = get_user_by_user_id(user_id)
    if user is not None:
        socketio.emit("event_notification", {"event":event, "job_id":job_id}, room=user.socket_id)


@socketio.on('joined')
def joined(user):
    add_user(socket_id=request.sid, user_id=user["id"])


@socketio.on('disconnect')
def disconnect():
    delete_user_by_socket_id(socket_id=request.sid)