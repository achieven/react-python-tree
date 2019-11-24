export function toggleNode(node) {
    return {
        type: 'TOGGLE_NODE', //TODO put in const
        node
    }
}

export function getChildNodes(id, path) {
    return function (dispatch) {
        return fetch(`http://localhost:5000/children/${id}`)
            .then(response => response.json())
            .then(response => {
                dispatch({
                    type: "GET_CHILDREN",
                    children: response,
                    id: id,
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

export function getRootNode() {
    return function(dispatch) {
        const rootId = 1;
        dispatch({
            type: "GET_ROOT",
            id: rootId,
            name: 'root'
        })
        dispatch(getChildNodes(rootId, ""))
    }
}