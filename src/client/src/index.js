import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import App from './js/components/App'
import { getRootNode, getChildrenNodes } from './js/actions/tree'
import rootReducer from './js/reducers'

const store = createStore(rootReducer, applyMiddleware(thunk))
const init = async () => {
    const rootNode = await getRootNode()
    const node = {id: rootNode.id, path: ""}
    const isFetchingGrandchildren = false
    const childrenResponse = await getChildrenNodes(node,isFetchingGrandchildren, [node])
    store.dispatch(rootNode)
    store.dispatch(childrenResponse)
}

init()

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)


