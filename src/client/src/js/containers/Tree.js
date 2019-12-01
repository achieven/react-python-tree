import Node from '../components/Node'
import { connect } from 'react-redux'
import { toggleNode, getChildrenNodes, getGrandchildrenNodes } from '../actions/tree'




const mapStateToProps = state => {
    return  {
        tree: state.tree,
        fetchedGrandchildren: state.fetchedGrandchildren
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleNode: async (node, fetchedGrandchildren) => {
            if (!fetchedGrandchildren.has(node.id)) {
                const childrenNodes = await getChildrenNodes(node.children)
                dispatch(getGrandchildrenNodes(node.id))
                dispatch(childrenNodes)
            }

            dispatch(toggleNode(node))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Node)
