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

  faveUnfave(event){
    let catCid = event.target.dataset;
    let catGenerator = this.state.catGenerator;
    let Cats = catGenerator.Cats;
    let cat = Cats.get(catCid);
    cat.set('faved', !cat.get('faved'));
    catGenerator.Cats = Cats;
    this.setState({catGenerator: catGenerator});
  }
  render() {
    let Cats = this.state.catGenerator.Cats;

    return (
        <div>
          <div>
            <ReactCSSTransitionGroup transitionName="cats"
                                     transitionEnterTimeout={500}
                                     transitionLeaveTimeout={300}
                                     transitionAppear={true}
                                     transitionAppearTimeout={500}>
              {Cats.map(cat => (
                  <div key={cat.cid} style={{float: 'left'}}>
                    <Link to={`/pictures/${cat.cid}`}
                          state={{ modal: true, returnTo: this.props.location.pathname, cat: cat }}>
                      <img style={{ margin: 10 }} src={cat.get('src')} height="100"/>
                    </Link>
                    <ReactCSSTransitionGroup transitionName="faved"
                                             transitionEnterTimeout={500}
                                             transitionLeaveTimeout={300}
                                             transitionAppear={true}
                                             transitionAppearTimeout={500}
                                             className="star">
                    {()=>{
                      if(cat.get('faved') === true){
                        return <span key={`${cat.cid}_${cat.get('faved')}`} className="fa fa-star" onClick={::this.faveUnfave} data-cid={cat.cid}></span>;
                      } else {
                        return <span key={`${cat.cid}_${cat.get('faved')}`} className="fa fa-star-o" onClick={::this.faveUnfave} data-cid={cat.cid}></span>;
                      }
                    }()}
                    </ReactCSSTransitionGroup>
                  </div>
              ))}
            </ReactCSSTransitionGroup>
          </div>
        </div>
    )
  }
}

export {Home as default}
