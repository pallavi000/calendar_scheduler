import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env.local")

class COMMON:
    class ROUTES:
        LOGIN = "/login"
        SIGNUP = "/signup"
        ME = "/me"
    class JWT:
        EXPIRES_IN = os.environ["JWT_EXPIRES_IN"]
        SECRET = os.environ["JWT_SECRET"]