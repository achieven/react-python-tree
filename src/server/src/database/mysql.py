from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from os import environ

host = environ['DB_HOST']
user = environ['DB_USER']
password = environ['DB_PASSWORD']
database = 'tree'

engine = create_engine('mysql+pymysql://%s:%s@%s/%s' % (user, password, host, database))
DBSession = sessionmaker(bind=engine)

