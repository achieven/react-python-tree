import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import '../../css/node.scss'
import { getDescendants } from "../util/tree";

class Node extends Component  {
    render() {
        if (0 < Object.keys(this.props.tree).length) {
            return <div>
                <button
                    onClick={() => this.props.toggleNode(this.props.tree)}
                    className="node"
                >
                    {this.props.tree.name}
                </button>
                <div
                    className={`children ${this.props.openNodes.has(this.props.tree.id)? 'open' : ''}`}
                >
                    {this.props.tree.children ? Object.keys(this.props.tree.children).map(key => {
                        return <Node key={key} tree={this.props.tree.children[key]} toggleNode={this.props.toggleNode} openNodes={this.props.openNodes}></Node>
                    }) : null}
                </div>
            </div>
        }
        return null
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const descendants = getDescendants(nextProps.tree)
        const nextPropsOpenNodes = descendants.map(descendant => {
            return nextProps.openNodes.has(descendant)
        })
        const thisPropsOpenNodes = descendants.map(descendant => {
            return this.props.openNodes.has(descendant)
        })
        const shouldUpdate = '' === nextProps.tree.path || !_.isEqual(nextPropsOpenNodes, thisPropsOpenNodes)

        return shouldUpdate
    }
}

Node.propTypes = {
    tree: PropTypes.object.isRequired,
    toggleNode: PropTypes.func.isRequired
}

export default Node
