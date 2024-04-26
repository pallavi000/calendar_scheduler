from routes.auth import auth_bp
from routes.event import event_bp

def init_route(app):
    @app.route("/", methods=["GET"])
    def hello():
        return {"title": "Hello World!"}
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(event_bp, url_prefix="/api/events")
    from errors.handler import errors
    app.register_blueprint(errors)