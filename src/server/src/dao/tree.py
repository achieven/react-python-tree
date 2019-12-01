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

def get_child_nodes(node_id):
    try:
        query = mysql.session.query(EdgeModel).options(orm.joinedload(EdgeModel.child_node)).filter_by(parent_id=node_id)
        result = query.all()
        response = [dict({"node_id": node.child_node.node_id, "node_name": node.child_node.node_name}) for node in result]
        return response
    except Exception as e:
        mysql.session.rollback()
        raise e



def get_root_node():
    try:
        metadata = db.MetaData()
        parent = db.Table('edges', metadata, autoload=True, autoload_with=mysql.engine).alias()
        nodes = db.Table('nodes', metadata, autoload=True, autoload_with=mysql.engine)
        child = db.Table('edges', metadata, autoload=True, autoload_with=mysql.engine).alias()
        root_id_query = db.select([parent.c.parent_id])\
            .where(db.not_(db.exists(db.select([child])).where(parent.c.parent_id == child.c.child_id)))\
            .distinct()
        result_root_id = mysql.conn.execute(root_id_query)
        root_id = result_root_id.fetchall()
        root_query = db.select([nodes]).where(nodes.c.node_id == root_id[0].parent_id)
        result_root = mysql.conn.execute(root_query)
        root_node = result_root.fetchall()
        return root_node[0]
    except Exception as e:
        raise e