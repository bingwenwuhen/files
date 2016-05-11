__author__ = 'xiaxuan'
# coding:utf-8
from app import app
from flask import request
from flask import render_template
from app.models import FileMetaData
import requests
from flask import jsonify


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


@app.route('/get/<string:name>', methods=['GET', ])
def get(name):
    files = FileMetaData.objects(name=name)
    print(files[0].to_json())
    if files is not None:
        return jsonify(status='success', files=[file.to_json() for file in files])
    else:
        return jsonify(status='error')


@app.route('/download/<string:id>', methods=['GET', ])
def download(id):
    item = requests.get("http://localhost:8080/files/" + id + "/metadata").json()
    return jsonify(status='success', url=item.get("url"))


@app.route("/list/<string:index>", methods=['GET', ])
def list(index):
    if int(index) == 0:
        files = FileMetaData.objects[:5]
    else:
        start = (int(index) - 1)*5
        files = FileMetaData.objects[start:5]
    return jsonify(status='success', files=[file.to_json() for file in files])


@app.route("/count", methods=['GET', ])
def count():
    count = len(FileMetaData.objects)
    return jsonify(status='success', count=count)

