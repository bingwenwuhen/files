__author__ = 'xiaxuan'
from mongoengine import StringField, IntField, DateTimeField, Document
import datetime


class FileMetaData(Document):
    type = StringField(required=True)
    name = StringField(default=None)
    length = IntField(required=True)
    width = IntField(default=None)
    height = IntField(default=None)
    className = StringField(default=None)
    maxLength = IntField(default=None)
    source = StringField(default=None)
    createdAt = DateTimeField(default=datetime.datetime.now())
    gridfs = StringField(required=True)
    meta = {'collection': 'FileMetaData'}

    def to_json(self):
        return {
            'id': str(self.id),
            'type': self.type,
            'length': str(self.length),
            'createdAt': self.createdAt,
        }
