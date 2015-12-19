import React from 'react'
import { render } from 'react-dom'
import { createHistory, useBasename } from 'history'
import { Router, Route, IndexRoute, Link } from 'react-router'
import Backbone from 'backbone';
import Modal from './Modal'
import App from './App'

const history = useBasename(createHistory)({
  basename: '/pinterest'
});

const PictureModel = Backbone.Model.extend({
  defaults : {
    src  : 'http://lorempixel.com/601/600/cats/'
  }
});

const Cats = new Backbone.Collection;
Cats.add(new PictureModel({src: "http://lorempixel.com/601/600/cats/"}));
Cats.add(new PictureModel({src: "http://lorempixel.com/602/600/cats/"}));
Cats.add(new PictureModel({src: "http://lorempixel.com/603/600/cats/"}));
Cats.add(new PictureModel({src: "http://lorempixel.com/604/600/cats/"}));
Cats.add(new PictureModel({src: "http://lorempixel.com/605/600/cats/"}));
Cats.add(new PictureModel({src: "http://lorempixel.com/606/600/cats/"}));

Cats.forEach( (cat) => {
console.log(cat.cid);
  console.log(cat.get('src'));
});

const Home = React.createClass({
  render() {
    return (
      <div>
        <div>
          {Cats.map(cat => (
            <Link key={cat.cid} to={`/pictures/${cat.cid}`} state={{ modal: true, returnTo: this.props.location.pathname }}>
              <img style={{ margin: 10 }} src={cat.get('src')} height="100" />
            </Link>
          ))}
        </div>

        <p><Link to="/some/123/deep/456/route">Go to some deep route</Link></p>

      </div>
    )
  }
})

const Deep = React.createClass({
  render() {
    return (
      <div>
        <p>You can link from anywhere really deep too</p>
        <p>Params stick around: {this.props.params.one} {this.props.params.two}</p>
        <p>
          <Link to={`/pictures/${Cats.first().cid}`} state={{ modal: true, returnTo: this.props.location.pathname }}>
            Link to picture with Modal
          </Link><br/>
          <Link to={`/pictures/${Cats.first().cid}`}>
            Without modal
          </Link>
        </p>
      </div>
    )
  }
});

const Picture = React.createClass({
  render() {
    return (
      <div>
        <img src={Cats.get(this.props.params.id).get('src')} style={{ height: '80%' }} />
      </div>
    )
  }
});

render((
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/pictures/:id" component={Picture}/>
      <Route path="/some/:one/deep/:two/route" component={Deep}/>
    </Route>
  </Router>
), document.getElementById('rootElement'));
