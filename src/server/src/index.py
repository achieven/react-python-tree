from flask import Flask, jsonify
app = Flask(__name__)

from database.mysql import getNextNodes

@app.route("/<node_id>")
def hello(node_id):
     nextNodes = getNextNodes(node_id)
     print(nextNodes)
     return jsonify([dict(node) for node in nextNodes])

if __name__ == "__main__":
    app.run(port=5000, host='0.0.0.0')