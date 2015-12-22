import React from 'react'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
import {PictureModel, CatGenerator} from './models';
import { createHistory, useBasename } from 'history'
import { Router, Route, IndexRoute, Link } from 'react-router'
import './Cats.css'

class Home extends React.Component {
  constructor() {
    super();
    this.timer = null;
    this.state = {catGenerator: new CatGenerator()};
    console.log(this.state);
  }

  componentDidMount() {
    this.timer = setInterval(::this.generateCats, 1000);
  }

  generateCats() {
    console.log(this);
    let catGenerator = this.state.catGenerator;
    catGenerator.createCat();
    clearInterval(this.timer);
    this.timer = setInterval(::this.generateCats, catGenerator.randRange());
    this.setState({catGenerator: catGenerator});
  }

  render() {
    let Cats = this.state.catGenerator.Cats;
    return (
        <div>
          <div>
            <ReactCSSTransitionGroup transitionName="cats" transitionEnterTimeout={500} transitionLeaveTimeout={300} transitionAppear={true} transitionAppearTimeout={500}>
              {Cats.map(cat => (
                  <Link key={cat.cid} to={`/pictures/${cat.cid}`}
                        state={{ modal: true, returnTo: this.props.location.pathname, cat: cat }}>
                    <img style={{ margin: 10 }} src={cat.get('src')} height="100"/>
                  </Link>
              ))}
              <span className="fa fa-star-o"></span>
              <span className="fa fa-star"></span>
            </ReactCSSTransitionGroup>
          </div>
        </div>
    )
  }
}

export {Home as default}
