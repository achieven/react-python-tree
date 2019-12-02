import sqlalchemy as db
import sqlalchemy.orm as orm
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

import database.mysql as mysql

class NodeModel(Base):
    __tablename__ = "nodes"

    node_id = db.Column(db.Integer,
                     primary_key=True,
                     nullable=False)
    node_name = db.Column(db.String(100),
                     nullable=False)

class EdgeModel(Base):
    __tablename__ = "edges"

    parent_id = db.Column(db.Integer,
                     db.ForeignKey(NodeModel.node_id),
                     nullable=False)
    child_id = db.Column(db.Integer,
                     db.ForeignKey(NodeModel.node_id),
                     primary_key=True,
                     nullable=False)
    child_node = orm.relationship("NodeModel", foreign_keys=[child_id], primaryjoin="NodeModel.node_id == EdgeModel.child_id", lazy=False, innerjoin=True)
    parent_node = orm.relationship("NodeModel", foreign_keys=[parent_id], primaryjoin="NodeModel.node_id == EdgeModel.parent_id", lazy=False, innerjoin=True)



def get_child_nodes(node_id):
    try:
        query = mysql.session.query(EdgeModel).options(orm.joinedload(EdgeModel.child_node)).filter_by(parent_id=node_id)
        result = query.all()
        response = [dict({"node_id": node.child_node.node_id, "node_name": node.child_node.node_name}) for node in result]
        return response
    except Exception as e:
        mysql.session.remove()
        raise e



def get_root_node():
    try:
        query = mysql.session.query(EdgeModel)\
            .filter(~EdgeModel.parent_id.in_(map(get_child_id, mysql.session.query(EdgeModel.child_id).all()))) \
            .options(orm.joinedload(EdgeModel.parent_node))
        result = query.all()
        root_node = list({node['node_id']: node for node in map(get_node, result)}.values())
        if 0 == len(root_node):
            raise Exception("No root was found")
        elif 1 != len(root_node):
            raise Exception("A single root node could not be determined")
        return root_node[0]
    except Exception as e:
        mysql.session.remove()
        raise e

def get_child_id(edge):
    return edge.child_id

def get_node(node):
    return dict({"node_id": node.parent_node.node_id, "node_name": node.parent_node.node_name})