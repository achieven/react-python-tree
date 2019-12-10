import { combineReducers } from 'redux'

import tree from './tree'
import openNodes from './openNodes'

export default combineReducers({
    tree,
    openNodes
})