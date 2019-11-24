import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'

import App from './components/App'
import {getRootNode} from './actions/node'
import rootReducer from './reducers'

const store = createStore(rootReducer, applyMiddleware(thunk))
store.dispatch(getRootNode())
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)


