from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})

import database.mysql as mysql

@app.route("/children/<node_id>")
def get_child_nodes(node_id):
    try:
        node_id = int(node_id)
        next_nodes = mysql.get_child_nodes(node_id)
        print(next_nodes)
        return dict({"error": False, "content": next_nodes})
    except Exception as e:
        print(e)
        return dict({"error": True, "content": str(e)})


@app.route("/root")
def get_root_node():
    try:
        root_node = mysql.get_root_node()
        return dict({"error": False, "content": dict(root_node)})
    except Exception as e:
        print(e)
        return dict({"error": True, "content": str(e)})


if __name__ == "__main__":
    app.run(port=5000, host='0.0.0.0')