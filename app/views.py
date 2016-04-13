__author__ = 'xiaxuan'
from app import app
from flask import request
from flask import render_template
from app import db
from app.models import FileMetaData
from flask import jsonify

@app.route('/')
def index():
    return render_template('index.html')


@app.route("/list", methods=['GET',])
def list():
    files = FileMetaData.objects.order_by('-createdAt')
    return jsonify(status='success', files=[file.to_json() for file in files])
