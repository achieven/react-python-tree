import _ from 'lodash'
import { toggleNodeAction, getChildrenAction, getRootAction } from "../actions/node"

const tree = (state = {}, action) => {
    let node
    let currentState = _.cloneDeep(state)
    switch (action.type) {
        case toggleNodeAction:
            node = findNodeByPath(currentState, action.path)
            node.showChildren = !node.showChildren
            return currentState
        case getChildrenAction:
            for (let child of action.children) {
                node = findNodeByPath(currentState, child.path)
                node.children = {}
                child.children.forEach(grandChild => {
                    node.children[grandChild.node_id] = newNode(grandChild.node_id, grandChild.node_name, node.path + "." + grandChild.node_id)
                })
            }

            return currentState
        case getRootAction:
            const rootNode = newNode(action.id, action.name, '')
            return rootNode
        default:
            return currentState
    }
}
function newNode (id, name, path) {
    return { id: id, name: name, path: path, showChildren: false }
}
function findNodeByPath(state, path) {
    let pathArr = path.split('.').filter(level => level)
    let currentNode = state
    while(pathArr.length > 0) {
        currentNode = currentNode.children[pathArr[0]]
        pathArr = pathArr.slice(1)
    }
    return currentNode
}

export default tree
