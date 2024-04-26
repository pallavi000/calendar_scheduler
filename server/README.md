# Calendar Schedule API

This project is a simple RESTful API built with Flask that allows users to manage their schedules and events.

## Features

- Create, read, update, and delete events
- Get a list of events for a specific date
- Search events by title, date range, or category

## Requirements

- APScheduler==3.10.4
- bcrypt==4.1.2
- Flask==3.0.3
- Flask-APScheduler==1.13.1
- Flask-Cors==4.0.0
- Flask-SocketIO==5.3.6
- Flask-SQLAlchemy==3.1.1
- marshmallow==3.21.1
- PyJWT==2.8.0
- python-dotenv==1.0.1
- python-socketio==5.11.2
- SQLAlchemy==2.0.29
- Werkzeug==3.0.2

## Installation

1. Clone the repository:
```commandline
git clone https://github.com/pallavi000/calendar_scheduler.git
```
2. Navigate to the project directory:
```commandline
cd server
```
3. Install dependencies:
```commandline
pip install -r requirements.txt
```
4. rename env.example to .env

## Usage

1. Start the Flask server:

```commandline
flask run
```

2. Once the server is running, you can use the API endpoints:

- `GET /events`: Get a list of all events
- `POST /events`: Create a new event
- `PUT /events/<event_id>`: Update an existing event
- `DELETE /events/<event_id>`: Delete an event
- `GET /auth/me`: Get current user
- `POST /auth/login`: Login user
- `POST /auth/signup`: Register user

## Contributing

Contributions are welcome! If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

