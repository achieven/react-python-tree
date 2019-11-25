import _ from 'lodash'

const tree = (state = {}, action) => {
    let node;
    let currentState = _.clone(state);
    switch (action.type) {
        case 'GET_CHILDREN':
            node = findNodeByPath(currentState, action.path);
            node.fetchedChildren = true;
            action.children.forEach(child => {
                node.children[child.node_id] = newNode(child.node_id, child.node_name, node.path + "." + child.node_id)
            });
            return currentState;
        case 'GET_ROOT':
            const rootNode = newNode(action.id, action.name, '');
            return rootNode;
        case 'TOGGLE_NODE':
            node = findNodeByPath(currentState, action.path);
            node.showChildren = !node.showChildren;
            return currentState;
        default:
            return currentState
    }
}
function newNode (id, name, path) {
    return {id: id, name: name, path: path, showChildren: false, fetchedChildren: false, children: {}}
}
function findNodeByPath(state, path) {
    let pathArr = path.split('.').filter(level => level);
    let currentNode = state;
    while(pathArr.length > 0) {
        currentNode = currentNode.children[pathArr[0]]
        pathArr = pathArr.slice(1)
    }
    return currentNode;
}

export default tree
