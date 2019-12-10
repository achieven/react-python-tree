export const newNode = (id, name, path) => {
    return { id: id, name: name, path: path, showChildren: false }
}

export const findNodeByPath = (state, path) => {
    let pathArr = path.split('.').filter(level => level)
    let currentNode = state
    while(pathArr.length > 0) {
        currentNode = currentNode.children[pathArr[0]]
        pathArr = pathArr.slice(1)
    }
    return currentNode
}

export const getDescendants = node => {
    let res = [node.id]
    if (node.children) {
        for (let key in node.children) {
            res = [].concat(res, getDescendants(node.children[key]))
        }
    }
    return res
}