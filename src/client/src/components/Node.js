import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from "lodash"

class Node extends Component  {
    render() {
        if (0 < Object.keys(this.props.tree).length) {
            return <div>
                <button
                    onClick={() => this.props.toggleNode(this.props.tree)}
                    disabled={!this.props.tree.fetchedChildren}
                    style={{
                        marginLeft: '15px',
                        display: 'block'
                    }}
                >
                    {this.props.tree.name}
                </button>
                <div
                    style={{
                        marginLeft: '15px',
                        display: this.props.tree.showChildren ? 'inline-block' : 'none'
                    }}
                >
                    {Object.keys(this.props.tree.children).map((key) => {
                        return <Node key={key} tree={this.props.tree.children[key]} toggleNode={this.props.toggleNode}></Node>
                    })}
                </div>
            </div>
        }
        return null
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(this.props.tree.id, " going to render? ", !_.isEqual(this.props.tree, nextProps.tree))
        return !_.isEqual(this.props.tree, nextProps.tree)
    }
}

Node.propTypes = {
    tree: PropTypes.object.isRequired,
    toggleNode: PropTypes.func.isRequired
}

export default Node
