import sqlalchemy as db
import os

user=os.environ['DB_USER']
password=os.environ['DB_PASSWORD']
host='127.0.0.1'
database='tree'

engine = db.create_engine('mysql+pymysql://%s:%s@%s/%s' %(user,password,host,database))
conn = engine.connect()


def getNextNodes(node_id):
    metadata = db.MetaData()
    edges = db.Table('edges', metadata, autoload=True, autoload_with=engine)
    nodes = db.Table('nodes', metadata, autoload=True, autoload_with=engine)
    query = db.select([nodes]).where(edges.c.parent_id == node_id).select_from(edges.join(nodes))
    print(query)
    print(node_id)
    Result = conn.execute(query)
    return Result.fetchall()
