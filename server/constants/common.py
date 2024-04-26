import os
from dotenv import load_dotenv

load_dotenv()


class COMMON:
    class ROUTES:
        LOGIN = "/login"
        SIGNUP = "/signup"
        ME = "/me"
        EVENT = "/"
        EVENT_WITH_ID = "/<int:id>"
        EVENT_SCHEDULE_WITH_ID = "/schedule/<string:job_id>"

    class JWT:
        EXPIRES_IN = os.environ["JWT_EXPIRES_IN"]
        SECRET = os.environ["JWT_SECRET"]
