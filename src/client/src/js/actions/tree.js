import {httpService} from '../services/httpService'

export const toggleNodeAction = 'TOGGLE_NODE'
export const getChildrenAction = 'GET_CHILDREN'
export const getGrandchildrenAction = 'GET_GRANDCHILDREN'
export const getRootAction = 'GET_ROOT'

export const toggleNode = path => {
    return {
        type: toggleNodeAction,
        path: path
    }
}

export const getGrandchildrenNodes = id => {
    return {
        type: getGrandchildrenAction,
        id: id
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

export const getChildrenNodes = async (nodes) => {
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
        children: childrenResponse
    }
}