import {httpService} from "../services/httpService"

export const toggleNodeAction = 'TOGGLE_NODE'
export const getChildrenAction = 'GET_CHILDREN'
export const getRootAction = 'GET_ROOT'

export function toggleNode(node) {
    return {
        type: toggleNodeAction,
        path: node.path
    }
}

export async function getRootNode() {
    const rootNode =  await httpService(`root`)
    return {
        type: getRootAction,
        id: rootNode.node_id,
        name: rootNode.node_name
    }
}

export async function getChildNodes(id, path) {
    const children = await httpService(`children/${id}`)
    return {
        path: path,
        children: children
    }
}

export async function getChildrenNodes(nodes) {
    let promises = []
    for (let key in nodes) {
        const child = nodes[key]
        if (!child.fetchedChildren) {
            promises.push(
                getChildNodes(child.id, child.path)
            )
        }
    }
    const childrenResponse = await Promise.all(promises)
    return {
        type: getChildrenAction,
        children: childrenResponse,
    }
}