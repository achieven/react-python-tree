import React from 'react'
import PropTypes from 'prop-types'


function Node ( state) {
    if (0 < Object.keys(state.tree).length) {
        return <div>
            <button
                onClick={() => state.toggleNode(state.tree)}
                disabled={!state.tree.fetchedChildren}
                style={{
                    marginLeft: '15px',
                    display: 'block'
                }}
            >
                {state.tree.name}
            </button>
            <div
                style={{
                    marginLeft: '15px',
                    display: state.tree.showChildren ? 'inline-block' : 'none'
                }}
            >
                {Object.keys(state.tree.children).map(function (key) {
                    return <Node key={key} tree={state.tree.children[key]} toggleNode={state.toggleNode}></Node>
                })}
            </div>
        </div>
    }
    return null
}

Node.propTypes = {
    name: PropTypes.string,
    children: PropTypes.arrayOf(Node)
}

export default Node
