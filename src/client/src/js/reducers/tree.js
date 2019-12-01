import _ from 'lodash'
import { toggleNodeAction, getChildrenAction, getRootAction } from "../actions/tree"


const newNode = (id, name, path) => {
    return { id: id, name: name, path: path, showChildren: false }
}
const findNodeByPath = (state, path) => {
    let pathArr = path.split('.').filter(level => level)
    let currentNode = state
    while(pathArr.length > 0) {
        currentNode = currentNode.children[pathArr[0]]
        pathArr = pathArr.slice(1)
    }
    return currentNode
}


const tree = (state = {}, action) => {
    let node, currentState
    switch (action.type) {
        case toggleNodeAction:
            currentState = _.cloneDeep(state)
            node = findNodeByPath(currentState, action.path)
            node.showChildren = !node.showChildren
            return currentState
        case getChildrenAction:
            currentState = _.cloneDeep(state)
            if (action.isFechingGrandchildren) {
                const parentNode = findNodeByPath(currentState, action.parentPath)
                parentNode.fetchedGrandchildren = true
            }
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
            return state
    }
}


export default tree
