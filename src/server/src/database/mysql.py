import sqlalchemy as db
import os

user = os.environ['DB_USER']
password = os.environ['DB_PASSWORD']
host = '127.0.0.1'
database = 'tree'

engine = db.create_engine('mysql+pymysql://%s:%s@%s/%s' % (user, password, host, database))
conn = engine.connect()


def get_child_nodes(node_id):
    metadata = db.MetaData()
    edges = db.Table('edges', metadata, autoload=True, autoload_with=engine)
    nodes = db.Table('nodes', metadata, autoload=True, autoload_with=engine)
    query = db.select([nodes])\
        .where(edges.c.parent_id == node_id)\
        .select_from(edges.join(nodes))
    print(query)
    result = conn.execute(query)
    return result.fetchall()


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


