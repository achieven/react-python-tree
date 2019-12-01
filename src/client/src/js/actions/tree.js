import {httpService} from "../services/httpService"

export const toggleNodeAction = 'TOGGLE_NODE'
export const getChildrenAction = 'GET_CHILDREN'
export const getRootAction = 'GET_ROOT'

export const toggleNode = node => {
    return {
        type: toggleNodeAction,
        path: node.path
    }
}

export const getRootNode = async () => {
    const rootNode =  await httpService(`root`)
    return {
        type: getRootAction,
        id: rootNode.node_id,
        name: rootNode.node_name
    }
}

export const getChildNodes = async (id, path) => {
    const children = await httpService(`children/${id}`)
    return {
        path: path,
        children: children
    }
}

export const getChildrenNodes = async (parentPath, isFechingGrandchildren, nodes) => {
    let promises = []
    for (let key in nodes) {
        const child = nodes[key]
        if (!child.children) {
            promises.push(
                getChildNodes(child.id, child.path)
            )
        }
    }
    const childrenResponse = await Promise.all(promises)
    return {
        type: getChildrenAction,
        children: childrenResponse,
        parentPath: parentPath,
        isFechingGrandchildren: isFechingGrandchildren
    }
}