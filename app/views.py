__author__ = 'xiaxuan'
# coding:utf-8
from app import app
from flask import request
from flask import render_template
from app.models import FileMetaData
from app import db
from flask import jsonify
import json

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/delete', methods=['POST', ])
def delete():
    form = request.form
    file_id = form.get('id')
    if file_id is None:
        return jsonify(status='error')
    file = FileMetaData.objects.get_or_404(id=file_id)
    file.delete()
    return jsonify(status='success')


@app.route('/get/<string:id>', methods=['GET', ])
def get(id):
    file = FileMetaData.objects.get_or_404(id=id)
    if file is not None:
        return jsonify(status='success', file=file)
    else:
        return jsonify(status='error')


# 暂时留置，日后开发
@app.route('/download/<string:id>', methods=['GET', ])
def download(id):
    pass


@app.route("/list", methods=['GET', ])
def list():
    files = FileMetaData.objects[:5]
    print len(files)
    return jsonify(status='success', files=[file.to_json() for file in files])

