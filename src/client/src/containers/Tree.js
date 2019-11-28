import Node from "../components/Node"
import { connect } from 'react-redux'
import { toggleNode, getChildrenNodes } from '../actions/node'




function mapStateToProps(state){
    return  {
        tree: state.tree
    }
}

function mapDispatchToProps(dispatch){
    return {
        toggleNode: async function (node) {
            const childrenNodes = await getChildrenNodes(node.children)
            dispatch(childrenNodes)
            dispatch(toggleNode(node))
        }
    }
}

const NodeConnector = connect(
    mapStateToProps,
    mapDispatchToProps
)(Node)
export default NodeConnector
