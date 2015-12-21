import React from 'react'
import { Cats, PictureModel } from './models';
import { createHistory, useBasename } from 'history'
import { Router, Route, IndexRoute, Link } from 'react-router'


const Home = React.createClass({
  render() {
    let sampleCat = Cats.sample();
    return (
        <div>
          <div>
            {Cats.map(cat => (
                <Link key={cat.cid} to={`/pictures/${cat.cid}`} state={{ modal: true, returnTo: this.props.location.pathname }}>
                  <img style={{ margin: 10 }} src={cat.get('src')} height="100" />
                </Link>
            ))}
          </div>
          <p><Link to={`/this/${sampleCat.cid}/is/456/sampleroute`}>{`Interesting Details about ${sampleCat.get('name')}`}</Link></p>
        </div>
    )
  }
});


export {Home as default}
