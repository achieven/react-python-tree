import {httpService} from "../services/httpService";

export const toggleNodeAction = 'TOGGLE_NODE';
export const getChildrenAction = 'GET_CHILDREN';
export const getRootAction = 'GET_ROOT';

export function toggleNode(node) {
    return {
        type: toggleNodeAction,
        path: node.path
    }
}

export function getRootNode() {
    let rootNode = {};
    return function(dispatch) {
        return httpService(`root`)
            .then((response) => {
                rootNode = response;
                dispatch({
                    type: getRootAction,
                    id: rootNode.node_id,
                    name: rootNode.node_name
                })
                dispatch(getChildNodes(response.node_id, ""))
            })
    }
}

export function getChildNodes(id, path) {
    return function (dispatch) {
        return httpService(`children/${id}`)
            .then(response => {
                dispatch({
                    type: getChildrenAction,
                    children: response,
                    path: path
                })
            })
    }
}

export function getChildrenNodes(children) {
    return function (dispatch) {
        let promises = [];
        for (let childKey in children) {
            const child = children[childKey]
            if (!child.fetchedChildren) {
                promises.push(
                    dispatch(getChildNodes(child.id, child.path))
                )
            }
        }
        return Promise.all(promises)
    }
}