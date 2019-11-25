import {httpService} from "../services/httpService";

export function toggleNode(node) {
    return {
        type: 'TOGGLE_NODE', //TODO put in const
        path: node.path
    }
}

export function getRootNode() {
    let rootNode = {};
    return function(dispatch) {
        return httpService(`http://localhost:5000/root`)
            .then((response) => {
                rootNode = response;
                dispatch({
                    type: "GET_ROOT",
                    id: rootNode.node_id,
                    name: rootNode.node_name
                })
                dispatch(getChildNodes(response.node_id, ""))
            })
    }
}

export function getChildNodes(id, path) {
    return function (dispatch) {
        return httpService(`http://localhost:5000/children/${id}`)
            .then(response => {
                dispatch({
                    type: "GET_CHILDREN",
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