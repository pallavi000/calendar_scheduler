from routes.auth import auth_bp

def init_route(app):
    from errors.handler import errors
    app.register_blueprint(errors)

    @app.route("/", methods=["GET"])
    def hello():
        return {"title": "Hello World!"}
    app.register_blueprint(auth_bp, url_prefix="/api/auth")