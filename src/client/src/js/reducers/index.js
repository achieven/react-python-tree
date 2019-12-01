import { combineReducers } from 'redux'
import tree from './tree'
import fetchedGrandchildren from './fetchedGrandchildren'

export default combineReducers({
    tree,
    fetchedGrandchildren
})