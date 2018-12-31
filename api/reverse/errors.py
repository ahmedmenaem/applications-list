import json
import traceback


from flask import current_app, Response


class ErrorResponse(Exception):
    '''Base class for JSONAPI responses as exceptions.'''

    def __init__(self, errors=None, status=500):
        indent = None
        separators = (',', ':')

        if current_app.config['JSONIFY_PRETTYPRINT_REGULAR'] or current_app.debug:
            indent = 2
            separators = (', ', ': ')

        if isinstance(errors, str):
            error = {"detail": errors, "status": status}
            errors = [error]
        elif isinstance(errors, dict):
            error = errors
            error['status'] = status
            errors = [error]
        elif isinstance(errors, list) and all(isinstance(e, ErrorResponse) for e in
                                              errors):
            errors = [error for e in errors for error in e.errors]
        elif errors is None:
            errors = []

        self.response_json = {"errors": errors}

        self.errors = errors

        self.response = Response(response=json.dumps(self.response_json,
                                                     indent=indent,
                                                     separators=separators),
                                 mimetype='application/json',
                                 status=status)

        super().__init__(self.response)


class JsonApiErrorResponse(ErrorResponse):
    '''Base class for other JsonApi exceptions that provides a simple constructor.'''
    def __init__(self, code=None, title=None, detail=None, status=500, trace=None):
        error = {"status": status}

        if code:
            error['code'] = code

        if title:
            error['title'] = title

        if detail:
            error['detail'] = detail

        if trace:
            error['trace'] = trace

        super().__init__(errors=error, status=status)


def configure_blueprint(blueprint):
    '''Attaches errorhandler to blueprint.'''

    def handle_error_response(error_response):
        '''Handles ErrorResponse exceptions by returning their response member.'''
        return error_response.response

    blueprint.errorhandler(ErrorResponse)(handle_error_response)

    return blueprint


class ModelAlreadyExistsError(JsonApiErrorResponse):
    '''Error for when a model was meant to be created, but one already existed.'''
    def __init__(self, model=None, model_name=None, id=None, **kwargs):  # pylint: disable=redefined-builtin
        model_name = model_name or model.__name__

        detail = kwargs.pop('detail', None)
        if detail is None:
            if id is None:
                detail = f"{model_name} already exists."
            else:
                detail = f"{model_name} with id {id} already exists."

        super().__init__(
            code='already-exists',
            title=f'{model_name} Already Exists',
            detail=detail,
            status=kwargs.pop('status', 400),
            **kwargs)


class ModelNotFoundError(JsonApiErrorResponse):
    '''Error for when a model was requested by id but could not be found.'''
    def __init__(self, model=None, model_name=None, id=None, **kwargs):  # pylint: disable=redefined-builtin
        model_name = model_name or model.__name__

        detail = kwargs.pop('detail', None)
        if detail is None:
            if id is None:
                detail = f"No {model_name} found."
            else:
                detail = f"No {model_name} with id {id} found."

        super().__init__(
            code='not-found',
            title=kwargs.pop('title', f'{model_name} Not Found'),
            detail=detail,
            status=kwargs.pop('status', 404),
            **kwargs)


class ApplicationNotFoundError(ModelNotFoundError):
    def __init__(self, application_id):
        super().__init__(model_name="Application", title=f"Application {application_id} not found")

class VersionNotFoundError(ModelNotFoundError):
    def __init__(self, application_id, version_id):
        super().__init__(model_name="Version", title=f"Version {version_id} not found for app {application_id}")


class ApplicationAlreadyExistsError(ModelAlreadyExistsError):
    def __init__(self, application_id):
        super().__init__(model_name="Application")