import { connect } from 'react-redux'

import Node from '../components/Node'
import { toggleNode, getChildNodes } from '../actions/tree'

const mapStateToProps = state => {
    return  {
        tree: state.tree,
        openNodes: state.openNodes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleNode: async (node) => {
            if (!node.children) {
                const childrenNodes = await getChildNodes(node.id, node.path)
                dispatch(childrenNodes)
            }

            dispatch(toggleNode(node.id))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Node)
