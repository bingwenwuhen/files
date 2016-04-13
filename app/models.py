__author__ = 'xiaxuan'
from app import db
import datetime


class FileMetaData(db.Document):
    id = db.StringField(required=True)
    name = db.StringField(required=True)
    type = db.StringField(required=True)
    length = db.IntField(required=True)
    description = db.StringField(required=True)
    createdAt = db.DateTimeField(default=datetime.datetime.now())
    data = db.StringField(required=True)
    url = db.StringField(required=True)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'length': str(self.length),
            'description': self.description,
            'createdAt': self.createdAt,
            'data': self.data,
            'url': self.url
        }
