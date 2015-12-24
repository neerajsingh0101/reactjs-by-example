import React from 'react'
import { render } from 'react-dom'
import { createHistory, useBasename } from 'history'
import { Router, Route, IndexRoute, Link } from 'react-router'
import Modal from './Modal'

const App = React.createClass({

  componentWillReceiveProps(nextProps) {
    // if we changed routes...
    if ((
            nextProps.location.key !== this.props.location.key &&
            nextProps.location.state &&
            nextProps.location.state.modal
        )) {
      // save the old children (just like animation)
      this.previousChildren = this.props.children
    }
  },

  render() {
    let { location } = this.props;

    let isModal = (
        location.state &&
        location.state.modal &&
        this.previousChildren
    );

    return (
        <div>
          <h1>Cats Pinterest</h1>

          <div>
            {isModal ?
                this.previousChildren :
                this.props.children
            }

            {isModal && (
                <Modal isOpen={true} returnTo={location.state.returnTo}>
                  {this.props.children}
                </Modal>
            )}
          </div>
        </div>
    )
  }
});

export {App as default}
