import dao.tree as tree
import database.mysql as mysql


def get_child_nodes(node_id):
    try:
        session = mysql.DBSession()
        return tree.get_child_nodes(session, node_id)
    except Exception as e:
        session.rollback()
        raise e
    finally:
        session.close()


def get_root_node():
    try:
        session = mysql.DBSession()
        return tree.get_root_node(session)
    except Exception as e:
        session.rollback()
        raise e
    finally:
        session.close()
