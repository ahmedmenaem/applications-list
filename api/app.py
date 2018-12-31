from reverse import app

import os

if __name__ == "__main__":
    FLASK_CI = os.getenv("FLASK_CI")

    if not FLASK_CI:
        app.run(debug=True, port=5000)
    else:
        print("FLASK_CI: app.run() would have worked.")
