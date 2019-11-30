import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import App from './components/App'
import { getRootNode, getChildrenNodes } from './actions/node'
import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(thunk))
async function init () {
    const rootNode = await getRootNode()
    const node = {id: rootNode.id, path: ""}
    const childrenResponse = await getChildrenNodes([node])
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


