from flask import Flask
from flask_cors import CORS
from flask_restplus import Api, Resource, abort
from flask_marshmallow import Marshmallow

import controllers.tree as tree_controller
import dao.tree as tree_dao


app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})

api = Api(app)
ma = Marshmallow(app)


class NodeSchema(ma.ModelSchema):
    class Meta:
        model = tree_dao.NodeModel


node_schema = NodeSchema()
nodes_schema = NodeSchema(many=True)


@api.route("/children/<int:node_id>")
class Children(Resource):
    def get(self, node_id):
        try:
            child_nodes = tree_controller.get_child_nodes(node_id)
            return dict({"content": nodes_schema.dump(child_nodes)})
        except Exception as e:
            print(e)
            abort(500, e)


@api.route("/root")
class TreeRoot(Resource):
    def get(self):
        try:
            root_node = tree_controller.get_root_node()
            return dict({"content": node_schema.dump(root_node)})
        except Exception as e:
            abort(500, e)


if __name__ == "__main__":
    app.run(port=5000, host='0.0.0.0')
