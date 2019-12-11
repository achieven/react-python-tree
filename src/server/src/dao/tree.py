import sqlalchemy as db
import sqlalchemy.orm as orm
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

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



def get_child_nodes(session, node_id):
    try:
        query = session.query(EdgeModel).\
            options(orm.joinedload(EdgeModel.child_node)).\
            filter_by(parent_id=node_id)
        result = query.all()
        response = [dict({"node_id": node.child_node.node_id, "node_name": node.child_node.node_name}) for node in result]
        return response
    except Exception as e:
        raise e



def get_root_node(session):
    try:
        all_children_query = session.query(EdgeModel.child_id).subquery()
        query = session.query(NodeModel).\
            select_from(EdgeModel) \
            .filter(~NodeModel.node_id.in_(all_children_query)) \
            .distinct()
        result = query.one()
        return result
    except Exception as e:
        raise e

def get_child_id(edge):
    return edge.child_id

def get_node(node):
    return dict({"node_id": node.parent_node.node_id, "node_name": node.parent_node.node_name})