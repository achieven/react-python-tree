import { connect } from 'react-redux'
import { toggleNode, getChildrenNodes } from '../actions/node'
import Node from "../components/Node";


function mapStateToProps(state){
    return  {
        tree: state.tree
    }
}

function mapDispatchToProps(dispatch){
    return {
        toggleNode: function (node) {
            dispatch(getChildrenNodes(node.children)).then(() => {
                dispatch(toggleNode(node))
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Node)

