import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import '../../css/node.scss'

class Node extends Component  {
    render() {
        if (0 < Object.keys(this.props.tree).length) {
            return <div>
                <button
                    onClick={() => this.props.toggleNode(this.props.tree, this.props.fetchedGrandchildren.has(this.props.tree.id))}
                    className="node"
                >
                    {this.props.tree.name}
                </button>
                <div
                    className={`children ${this.props.tree.showChildren ? 'open' : ''}`}
                >
                    {this.props.tree.children ? Object.keys(this.props.tree.children).map((key) => {
                        return <Node key={key} tree={this.props.tree.children[key]} toggleNode={this.props.toggleNode} fetchedGrandchildren={this.props.fetchedGrandchildren}></Node>
                    }) : null}
                </div>
            </div>
        }
        return null
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !_.isEqual(this.props.tree, nextProps.tree)
    }
}

Node.propTypes = {
    tree: PropTypes.object.isRequired,
    toggleNode: PropTypes.func.isRequired
}

export default Node
