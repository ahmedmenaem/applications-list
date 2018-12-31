Code Challenge: Verge
=====================

To demonstrate your frontend skills, you will create a simple web
application, Verge, for storing and retrieving different versions of software.

Verge allows a user to:
- Create a new Application (for example, "Google Chrome")
- Create a new Version (for example, "1.0.0")
- Upload Google-Chrome-1.0.0.exe and associate it with this Version
- View a list of Applications
- View a list of Versions for a given Application

(For simplicity, we won't have any user accounts.)

## Backend Specification

The backend is provided as a Flask application. You need to install Python 3.6 or higher, then install the requirements with `pip`:

```console
$ python3.6 -mpip install -r api/requirements.txt --user
Collecting Click==7.0 (from -r api/requirements.txt (line 1))
  Using cached https://files.pythonhosted.org/packages/fa/37/45185cb5abbc30d7257104c434fe0b07e5a195a6847506c074527aa599ec/Click-7.0-py2.py3-none-any.whl
Collecting Flask==1.0.2 (from -r api/requirements.txt (line 2))
  Using cached https://files.pythonhosted.org/packages/7f/e7/08578774ed4536d3242b14dacb4696386634607af824ea997202cd0edb4b/Flask-1.0.2-py2.py3-none-any.whl
...
```

You can then run the application with:

```console
$ python3.6 api/app.py
 * Serving Flask app "reverse.app" (lazy loading)
 * Environment: production
   WARNING: Do not use the development server in a production environment.
   Use a production WSGI server instead.
 * Debug mode: on
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 905-979-686
```

As it says, the application is run on port 5000.

The API is very simple:

### Create Application `POST /api/apps/<id>`
Creates an Application, using the id specified in the URL as the "id" for this application.

Example: `POST /api/apps/google-chrome`

Request:
```json
{
  "name": "Google Chrome"
}
```

Response (200 OK):
```json
{
  "id": "google-chrome",
  "name": "Google Chrome"
}
```


### Get All Applications `GET /api/apps`
Gets all Applications.

Returns:
```json
[
  {
    "id": "google-chrome",
    "name": "Google Chrome",
  },
  {
    "id": "adobe-photoshop-cc",
    "name": "Adobe Photoshop CC",
  },
  ...
]
```

### Get One Application `GET /api/apps/<id>`
Example: `GET /api/apps/google-chrome`

Gets the Application with the given id, if one exists.

Returns:
```json
{
  "id": "google-chrome",
  "name": "Google Chrome",
  "versions": [
    { "id": "1.0", "file": "/files/Google-Chrome-1.0.0.exe" },
    { "id": "2.0", "file": null },
    { "id": "2.1", "file": null },
  ]
}
```

### Delete One Application `DELETE /api/apps/<id>`
Example: `DELETE /api/apps/google-chrome`

Deletes the Application with the given id, if one exists.

### Create Version `POST /api/apps/<id>/<version-id>`
Example: `POST /api/apps/google-chrome/1.0`

Creates a Version for the Application with the given id.

### Upload File for Version `POST /api/apps/<id>/<version-id>/file`
Example: `POST /api/apps/google-chrome/1.0`

Uploads the file attached with multipart/form-data under key "file" and associates it with this version.

Returns:
```json
{
  "id": "1.0",
  "file": "/api/files/Google-Chrome-1.0.0.exe"
}
```

### Get One Version `GET /api/apps/<id>/<version-id>`
Example: `GET /api/apps/google-chrome/1.0`

Gets the Version for this Application with the given version-id, including the
link to the file if it has been uploaded.

Returns:
```json
{
  "id": "1.0",
  "file": "/api/files/Google-Chrome-1.0.0.exe"
}
```

### Download File `GET /api/files/<file>`
Example: `GET /api/files/Google-Chrome-1.0.0.exe`

Download a version that has been uploaded with the Upload File for Version
route.


## Frontend Specification
Using ReactJS, (Typescript preferred if you are able), make a simple frontend
for the API above that allows a user to create an Application, a Version,
upload a file for that Version, and view the list of Applications and
Versions that have already been created.

A starter project has been provided for you in `frontend/`, using the output
of create-react-app (with Typescript). You can start the development server
using `yarn start`. This will automatically proxy any requests beginning with
`/api/` to the api server - just be sure to start the API server first.

Feel free to use React Router if you would like to have multiple pages.

Your submission will be judged on the quality of the code, but also on its
simplicity, so don't overcomplicate things. Try and make a UI that is easy to
use. Feel free to use a component library like Rebass, Material-UI, or
Reactstrap to get you started.