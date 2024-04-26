from middlewares import auth_middleware
from flask import Blueprint, request, g, jsonify
from marshmallow import ValidationError
from services.eventService import get_events_by_user_id, create_new_event, update_event, delete_event
from utils import schedule_event_notification, clear_schedule_event_notification
from constants import COMMON
from schema import EventSchema
from werkzeug.exceptions import NotFound

event_bp = Blueprint("event", __name__)


@event_bp.route(COMMON.ROUTES.EVENT, methods=["GET"])
@auth_middleware
def get_events():
    """API for getting events"""
    try:
        events = get_events_by_user_id(g.current_user["id"])
        return {"code": 200, "events": events}
    except Exception as e:
        print(str(e))
        return {"code": 500, "message": "Internal Server Error"}, 500


@event_bp.route(COMMON.ROUTES.EVENT, methods=["POST"])
@auth_middleware
def create_event():
    """API for creating event"""
    try:
        body = request.json
        # input validation
        schema = EventSchema()
        try:
            schema.load(body)
        except ValidationError as err:
            return {"message": err.messages}, 400
        event = create_new_event(body, g.current_user['id'])
        schedule_event_notification(event)
        return {"code": 201, "message":"event created!", "event":event}
    except Exception as e:
        print(str(e))
        return {"code": 500, "message": "Internal Server Error"}, 500


@event_bp.route(COMMON.ROUTES.EVENT_WITH_ID, methods=["PUT"])
@auth_middleware
def handle_update_event(id):
    """API for updating event"""
    try:
        body = request.json
        # input validation
        schema = EventSchema()
        try:
            schema.load(body)
        except ValidationError as err:
            return {"message": err.messages}, 400
        event = update_event(id, body, g.current_user['id'])
        return {"code": 201, "message": "event created!", "event": event}
    except NotFound as e:
        return {"code": 404, "message": "Event not found."}, 404
    except Exception as e:
        print(str(e))
        return {"code": 500, "message": "Internal Server Error"}, 500


@event_bp.route(COMMON.ROUTES.EVENT_WITH_ID, methods=["DELETE"])
@auth_middleware
def handle_delete_event(id):
    """API for updating event"""
    try:
        delete_event(id, g.current_user['id'])
        return {"code": 200, "message": "event deleted!"}
    except NotFound as e:
        return {"code": 404, "message": "Event not found."}, 404
    except Exception as e:
        print(str(e))
        return {"code": 500, "message": "Internal Server Error"}, 500


@event_bp.route(COMMON.ROUTES.EVENT_SCHEDULE_WITH_ID, methods=["DELETE"])
@auth_middleware
def clear_schedule_job(job_id):
    """API for clearing schedule job"""
    try:
        clear_schedule_event_notification(job_id=job_id)
        return {}, 204
    except Exception as e:
        print(str(e))
        return {"code": 500, "message": "Internal Server Error"}, 500