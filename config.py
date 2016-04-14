__author__ = 'xiaxuan'
from app import app
MONGODB_SETTINGS = {
                    'db': 'files',
                    "host": '103.235.225.39',
                    "port": 27021
                    }
app.config['MONGODB_SETTINGS'] = MONGODB_SETTINGS

