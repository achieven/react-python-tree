import Node from "../components/Node"
import { connect } from 'react-redux'
import { toggleNode, getChildrenNodes } from '../actions/node'




const mapStateToProps = state => {
    return  {
        tree: state.tree
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleNode: async function (node) {
            const childrenNodes = await getChildrenNodes(node.children)
            dispatch(childrenNodes)
            dispatch(toggleNode(node))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Node)
