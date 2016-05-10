__author__ = 'xiaxuan'

from flask import Flask
from mongoengine import connect

app = Flask(__name__)
# app.config.from_object('config')
MONGODB_SETTINGS = {
                    'db': 'files',
                    "host": '103.235.225.39',
                    "port": 27021
                    }
app.config['MONGODB_DB'] = 'files'
app.config['MONGODB_HOST'] = 'localhost'
app.config['MONGODB_PORT'] = 27017


db = connect(db='files', host='127.0.0.1', port=27017)

from app import views
from app import models
