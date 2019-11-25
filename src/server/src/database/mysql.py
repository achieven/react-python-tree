import sqlalchemy as db
from sqlalchemy import exists
from sqlalchemy.sql import exists


import os

user=os.environ['DB_USER']
password=os.environ['DB_PASSWORD']
host='127.0.0.1'
database='tree'

engine = db.create_engine('mysql+pymysql://%s:%s@%s/%s' %(user,password,host,database))
conn = engine.connect()


def getChildNodes(node_id):
    metadata = db.MetaData()
    edges = db.Table('edges', metadata, autoload=True, autoload_with=engine)
    nodes = db.Table('nodes', metadata, autoload=True, autoload_with=engine)
    query = db.select([nodes]).where(edges.c.parent_id == node_id).select_from(edges.join(nodes))
    print(query)
    Result = conn.execute(query)
    return Result.fetchall()


def getRootNode():
    metadata = db.MetaData()
    parent = db.Table('edges', metadata, autoload=True, autoload_with=engine).alias()
    nodes = db.Table('nodes', metadata, autoload=True, autoload_with=engine)
    child = db.Table('edges', metadata, autoload=True, autoload_with=engine).alias()
    rootIdQuery = db.select([parent.c.parent_id]).where(db.not_(db.exists(db.select([child])).where(parent.c.parent_id == child.c.child_id))).distinct()
    ResultRootId = conn.execute(rootIdQuery)
    rootId = ResultRootId.fetchall()
    rootQuery = db.select([nodes]).where(nodes.c.node_id == rootId[0].parent_id)
    ResultRoot = conn.execute(rootQuery)
    rootNode = ResultRoot.fetchall()
    print(rootNode)
    return rootNode[0]


