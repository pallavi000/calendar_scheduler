from models import Event


def get_events_by_user_id(user_id):
    events = Event.query.filter_by(user_id=user_id).all()
    return Event.serialize_list(events)


def get_event_by_id_and_user_id(id, user_id):
    return Event.query.first_or_404(description={id, user_id})


def create_new_event(data, user_id):
    new_event = Event(
        title=data["title"],
        startTime=data['startTime'],
        endTime=data['endTime'],
        description=data['description'],
        participants=data['participants'],
        user_id=user_id
    )
    new_event.save_to_db()
    return new_event.serialize()


def update_event(id, data, user_id):
    event = get_event_by_id_and_user_id(id, user_id)
    event.title = data['title']
    event.description = data['description']
    event.startTime = data['startTime']
    event.endTime = data['endTime']
    event.participants = data['participants']
    event.update()
    return event


def delete_event(id, user_id):
    event = get_event_by_id_and_user_id(id, user_id)
    event.delete_from_db()
    return event
