from flask import Flask
from flask_cors import CORS
from flask_restplus import Api, Resource, fields, abort

import controllers.tree as tree

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})
api = Api(app)


node_model = api.model('Root', {
    'node_id': fields.Integer(required=True),
    'node_name': fields.String(required=True)
})

root_response_model = api.model('RootResponse', {
    'content': fields.Nested(node_model, skip_none=True)
})

children_response_model = api.model('ChildrenResponse', {
    'content': fields.List(fields.Nested(node_model))
})


@api.route("/children/<int:node_id>")
class Children(Resource):
    @api.marshal_with(children_response_model)
    def get(self, node_id):
        try:
            child_nodes = tree.get_child_nodes(node_id)
            return dict({"content": child_nodes})
        except Exception as e:
            print(e)
            abort(500, e)


@api.route("/root")
class TreeRoot(Resource):
    @api.marshal_with(root_response_model)
    def get(self):
        try:
            root_node = tree.get_root_node()
            return dict({"content": root_node})
        except Exception as e:
            abort(500, e)


if __name__ == "__main__":
    app.run(port=5000, host='0.0.0.0')
