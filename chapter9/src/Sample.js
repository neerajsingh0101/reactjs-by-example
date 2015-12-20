import React from 'react'
import { Cats, PictureModel } from './models';
import { createHistory, useBasename } from 'history'
import { Router, Route, IndexRoute, Link } from 'react-router'

const Sample = React.createClass({
  render() {
    let cat = Cats.get(this.props.params.cid);
    return (
        <div>
          <p>CID for the Cat: {this.props.params.cid}, and Random ID: {this.props.params.randomId}</p>
          <p>Name of this Cat is: {cat.get('name')}</p>
          <p>Some interesting details about this Cat:</p>
          <p> {cat.get('details')} </p>
          <p>
            <Link to={`/pictures/${cat.cid}`} state={{ modal: true, returnTo: this.props.location.pathname }}>
              Link to picture with Modal
            </Link><br/>
            <Link to={`/pictures/${cat.cid}`}>
              Without modal
            </Link>
          </p>
        </div>
    )
  }
});


export {Sample as default};
