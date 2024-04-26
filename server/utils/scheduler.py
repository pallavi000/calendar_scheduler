from apscheduler.schedulers.background import BackgroundScheduler
from .socket import send_event_notification
from datetime import datetime
import uuid

scheduler = BackgroundScheduler(daemon=True)
scheduler.start()


def schedule_event_notification(event):
    start_date = parse_moment_datetime(event["startTime"])
    end_date = parse_moment_datetime(event["endTime"])
    # Schedule the notification and store the job ID
    job_id = str(uuid.uuid4())  # Generate a unique ID for the job
    scheduler.add_job(send_event_notification, 'cron', minute='*', start_date=start_date, end_date=end_date, args=[event["user_id"], event, job_id], id=job_id)


def clear_schedule_event_notification(job_id):
    if scheduler.get_job(job_id):
        scheduler.remove_job(job_id)


def parse_moment_datetime(moment_datetime_str):
    # Parse the Moment.js datetime string to a Python datetime object
    return datetime.strptime(moment_datetime_str, "%Y-%m-%dT%H:%M:%S%z")