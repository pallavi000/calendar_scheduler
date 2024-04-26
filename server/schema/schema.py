from marshmallow import Schema, fields, ValidationError


class LoginSchema(Schema):
    email = fields.String(required=True)
    password = fields.String(required=True)


class RegisterSchema(Schema):
    name = fields.String(required=True)
    email = fields.String(required=True)
    password = fields.String(required=True)


class EventSchema(Schema):
    title = fields.String(required=True)
    startTime = fields.String(required=True)
    endTime = fields.String(required=True)
    description = fields.String(required=True)
    participants = fields.String(required=True)