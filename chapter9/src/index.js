import React from 'react'
import { render } from 'react-dom'
import { createHistory, useBasename } from 'history'
import { Router, Route, IndexRoute, Link } from 'react-router'
import Backbone from 'backbone';
import Modal from './Modal'
import App from './App'
import { Cats, PictureModel } from './models';
import Picture from './Picture'
import Sample from './Sample'
const history = useBasename(createHistory)({
  basename: '/pinterest'
});


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
})




render((
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/pictures/:id" component={Picture}/>
      <Route path="/this/:cid/is/:randomId/sampleroute" component={Sample}/>
    </Route>
  </Router>
), document.getElementById('rootElement'));
