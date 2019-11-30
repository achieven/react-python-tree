import sqlalchemy as db
import sqlalchemy.orm as orm
import os
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

user = os.environ['DB_USER']
password = os.environ['DB_PASSWORD']
host = '127.0.0.1'
database = 'tree'

engine = db.create_engine('mysql+pymysql://%s:%s@%s/%s' % (user, password, host, database))
conn = engine.connect()
Base.metadata.bind = engine
DBSession = orm.sessionmaker(bind=engine)
session = DBSession()

class NodeModel(Base):
    __tablename__ = "nodes"

    node_id = db.Column(db.Integer,
                     primary_key=True,
                     nullable=False)
    node_name = db.Column(db.String(100),
                     nullable=False)

    def __repr__(self):
        return '<Node model {}>'.format(self.node_id)

class EdgeModel(Base):
    __tablename__ = "edges"

    parent_id = db.Column(db.Integer,
                          db.ForeignKey(NodeModel.node_id),
                     nullable=False)
    child_id = db.Column(db.Integer,
                     db.ForeignKey(NodeModel.node_id),
                     primary_key=True,
                     nullable=False)
    child_name = orm.relationship("NodeModel", foreign_keys=[child_id], primaryjoin="NodeModel.node_id == EdgeModel.child_id", lazy="select", innerjoin=True)
    def __repr__(self):
        return '<Edge model {}>'.format(self.child_name)

def get_child_nodes(node_id):
    try:
        query = session.query(EdgeModel).options(orm.joinedload(EdgeModel.child_name)).filter_by(parent_id=node_id)
        result = query.all()
        response = [dict({"node_id": node.child_name.node_id, "node_name": node.child_name.node_name}) for node in result]
        return response
    except Exception as e:
        print(e)
        session.rollback()
        raise e



def get_root_node():
    metadata = db.MetaData()
    parent = db.Table('edges', metadata, autoload=True, autoload_with=engine).alias()
    nodes = db.Table('nodes', metadata, autoload=True, autoload_with=engine)
    child = db.Table('edges', metadata, autoload=True, autoload_with=engine).alias()
    root_id_query = db.select([parent.c.parent_id])\
        .where(db.not_(db.exists(db.select([child])).where(parent.c.parent_id == child.c.child_id)))\
        .distinct()
    result_root_id = conn.execute(root_id_query)
    root_id = result_root_id.fetchall()
    root_query = db.select([nodes]).where(nodes.c.node_id == root_id[0].parent_id)
    result_root = conn.execute(root_query)
    root_node = result_root.fetchall()
    print(root_node)
    return root_node[0]


