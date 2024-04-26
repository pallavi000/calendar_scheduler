import os

from dotenv import load_dotenv
from flask import Flask, request, Response
from flask_cors import CORS
from models import db, User, Event
from routes import init_route
from utils import create_socket_app, socketio

load_dotenv(dotenv_path=".env.local")

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 200 * 1024 * 1024
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
CORS(app, resources={r'/api/*': {'origins': ["*"]}})


@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res


# db connection
db.init_app(app)
# routes
init_route(app)

with app.app_context():
    db.create_all()

# socket
create_socket_app(app)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", debug=True)
