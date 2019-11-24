from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})

import database.mysql as mysql

@app.route("/children/<node_id>")
def getChildNodes(node_id):
     nextNodes = mysql.getChildNodes(node_id)
     print(nextNodes)
     return jsonify([dict(node) for node in nextNodes])

@app.route("/root")
def getRootNode():
  nextNodes = mysql.getRootNode()
  print(nextNodes)
  return jsonify([dict(node) for node in nextNodes])

if __name__ == "__main__":
    app.run(port=5000, host='0.0.0.0')