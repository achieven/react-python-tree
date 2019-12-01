import _ from 'lodash'
import { getGrandchildrenAction } from '../actions/tree'



const fetchedGrandchildren = (state = new Set(), action) => {
    switch (action.type) {
        case getGrandchildrenAction:
            const currentState = _.clone(state)
            currentState.add(action.id)
            return currentState
        default:
            return state
    }
}


export default fetchedGrandchildren
