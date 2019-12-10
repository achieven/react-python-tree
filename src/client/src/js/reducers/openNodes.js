import _ from 'lodash'
import { toggleNodeAction } from '../actions/tree'

const openNodes = (state = new Set(), action) => {
    switch (action.type) {
        case toggleNodeAction:
            const currentState = _.clone(state)
            if (currentState.has(action.id)) {
                currentState.delete(action.id)
            } else {
                currentState.add(action.id)
            }

            return currentState
        default:
            return state
    }
}


export default openNodes
