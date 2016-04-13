__author__ = 'xiaxuan'
from app import app
from flask import request
from flask import render_template
from app import db


@app.route('/')
def index():
    return render_template('index.html')
