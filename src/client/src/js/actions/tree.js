import { httpService } from '../services/httpService'

export const toggleNodeAction  = 'TOGGLE_NODE'
export const getChildrenAction = 'GET_CHILDREN'
export const getRootAction     = 'GET_ROOT'

export const toggleNode = id => {
    return {
        type: toggleNodeAction,
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
        type: getChildrenAction,
        path: path,
        children: children
    }
}