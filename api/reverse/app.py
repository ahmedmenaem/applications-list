import json
import os

from contextlib import contextmanager

from flask import Flask, request, jsonify, send_from_directory
from werkzeug import secure_filename

from .errors import (ApplicationAlreadyExistsError, ApplicationNotFoundError,
                     VersionNotFoundError, configure_blueprint)


app = Flask(__name__)
app.config["DEBUG"] = True
configure_blueprint(app)


CURRENT_FOLDER = os.path.dirname(os.path.abspath(__file__))

UPLOADS_FOLDER = os.path.join(CURRENT_FOLDER, "uploads")
if not os.path.exists(UPLOADS_FOLDER):
    os.makedirs(UPLOADS_FOLDER)


APPLICATIONS_FILEPATH = os.path.join(CURRENT_FOLDER, "applications.json")


def load_applications():
    if not os.path.exists(APPLICATIONS_FILEPATH):
        store_applications({})

    return json.load(open(APPLICATIONS_FILEPATH))


def store_applications(applications):
    json.dump(applications, open(APPLICATIONS_FILEPATH, "w"))


@contextmanager
def applications_context():
    applications = load_applications()
    yield applications
    store_applications(applications)


@app.route("/api/apps/<id>", methods=["POST"])
def create_application(id):
    json = request.get_json()
    json["versions"] = {}
    json["id"] = id

    with applications_context() as applications:

        if id in applications:
            raise ApplicationAlreadyExistsError(id)

        applications[id] = json

    return jsonify(json)


@app.route("/api/apps/<id>", methods=["PUT"])
def update_application(id):
    json = request.get_json()

    match = get_one_application_by_id(id)

    with applications_context() as applications:
        applications[id] = json

    return jsonify(json)


@app.route("/api/apps", methods=["GET"])
def get_applications():
    applications = load_applications()
    return jsonify([x for x in applications.values()])


def get_one_application_by_id(id):
    applications = load_applications()

    if id not in applications:
        raise ApplicationNotFoundError(id)

    return applications[id]


def get_one_version_by_id(application_id, version_id):
    applications = load_applications()

    if application_id not in applications:
        raise ApplicationNotFoundError(application_id)

    application = applications[application_id]

    if version_id not in application["versions"]:
        raise VersionNotFoundError(application_id, version_id)

    return application["versions"][version_id]


@app.route("/api/apps/<id>", methods=["GET"])
def get_one_application(id):
    match = get_one_application_by_id(id)
    return jsonify(match)


@app.route("/api/apps/<id>", methods=["DELETE"])
def delete_app(id):
    match = get_one_application_by_id(id)

    with applications_context() as applications:
        del applications[id]

    return get_applications()


@app.route("/api/apps/<id>/<version_id>", methods=["POST"])
def create_version(id, version_id):
    match = get_one_application_by_id(id)
    version = {"id": version_id, "file": None}
    applications = load_applications()
    applications[id]["versions"][version_id] = version
    store_applications(applications)
    return jsonify(version), 200


@app.route("/api/apps/<id>/<version_id>/file", methods=["POST"])
def fileUpload(id, version_id):
    version = get_one_version_by_id(id, version_id)

    file = request.files["file"]
    filename = secure_filename(file.filename)
    file.save(os.path.join(UPLOADS_FOLDER, filename))

    version["file"] = "/api/files/" + filename

    applications = load_applications()
    applications[id]["versions"][version_id] = version
    store_applications(applications)

    return jsonify(version), 200


@app.route("/api/apps/<id>/<version_id>", methods=["DELETE"])
def delete_version(id, version_id):
    get_one_version_by_id(id, version_id)

    applications = load_applications()
    del applications[id]["versions"][version_id]
    store_applications(applications)

    return get_applications()


@app.route("/api/files/<filename>", methods=["GET"])
def downloadFile(filename):
    return send_from_directory(UPLOADS_FOLDER, filename)
