#### prerequesites:

pip3  
python3  
mysql (specifically was developed with mysql 8.0.16)

#### installing:
pip3 install -r requirements.txt
create database tree in mysql  
mysql -uroot -p tree < tree_dump.mysql

#### running:

DB_HOST=<localhost> DB_USER=<user> DB_PASSWORD=<password> python3 src/index.py
