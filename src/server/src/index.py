from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})

import database.mysql as mysql

@app.route("/children/<node_id>")
def getChildNodes(node_id):
    try:
        node_id=int(node_id)
        nextNodes = mysql.getChildNodes(node_id)
        print(nextNodes)
        return dict({"error": False, "content": [dict(node) for node in nextNodes]})
    except Exception as e:
        print(e)
        return dict({"error": True, "content": str(e)})
    except Error as e:
        print(e)
        return dict({"error": True, "content": str(e)})


@app.route("/root")
def getRootNode():
    try:
        rootNode = mysql.getRootNode()
        return dict({"error": False, "content": dict(rootNode)})
    except Exception as e:
        print(e)
        return dict({"error": True, "content": str(e)})
    except Error as e:
        print(e)
        return dict({"error": True, "content": str(e)})


if __name__ == "__main__":
    app.run(port=5000, host='0.0.0.0')