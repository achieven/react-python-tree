import sqlalchemy as db
import sqlalchemy.orm as orm
import os
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

host = os.environ['DB_HOST']
user = os.environ['DB_USER']
password = os.environ['DB_PASSWORD']
database = 'tree'

engine = db.create_engine('mysql+pymysql://%s:%s@%s/%s' % (user, password, host, database))
conn = engine.connect()
Base.metadata.bind = engine
DBSession = orm.sessionmaker(bind=engine)
session = DBSession()