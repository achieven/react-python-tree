import _ from 'lodash'

import { getChildrenAction, getRootAction } from '../actions/tree'
import { findNodeByPath, newNode } from "../util/tree";

const tree = (state = {}, action) => {
    let node, currentState
    switch (action.type) {
        case getChildrenAction:
            currentState = _.cloneDeep(state)
            node = findNodeByPath(currentState, action.path)
            node.children = {}
            action.children.forEach(child => {
                node.children[child.node_id] = newNode(child.node_id, child.node_name, `${node.path}.${child.node_id}`)
            })

            return currentState
        case getRootAction:
            const rootNode = newNode(action.id, action.name, '')
            return rootNode
        default:
            return state
    }
}


export default tree
