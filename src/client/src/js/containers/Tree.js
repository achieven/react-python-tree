import Node from "../components/Node"
import { connect } from 'react-redux'
import { toggleNode, getChildrenNodes } from '../actions/tree'




const mapStateToProps = state => {
    return  {
        tree: state.tree
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleNode: async function (node) {
            if (!node.fetchedGrandchildren) {
                const isFetchingGrandchildren = true
                const childrenNodes = await getChildrenNodes(node.path, isFetchingGrandchildren, node.children)
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
