/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the SocialStore and passes the new data to its children.
 */
var ArrayUtil = require('../utils/array');
var assign = require('object-assign');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var SocialStore = require('../stores/SocialStore');
var SocialActions = require('../actions/SocialActions');
var ReactBootstrap =  require('react-bootstrap');
var Col =  ReactBootstrap.Col, Grid =  ReactBootstrap.Grid, Row =  ReactBootstrap.Row;


var SocialTracker = React.createClass({

  getInitialState: function() {
    return assign({}, SocialStore.getState());
  },

  componentDidMount: function() {
    SocialStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SocialStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
        <Grid className="grid">
          <Header/>
          <MainSection/>
          {this.renderFeed()}
        </Grid>
    )
  },


  renderFeed: function() {
    var feed = this.state.feed;
    var feedCollection = ArrayUtil.in_groups_of(feed, 3);
    if (feed.length > 0) {
      return feedCollection.map((feedGroup, index) => {
        console.log(feedGroup);
        return <Row key={`${feedGroup[0].id}${index}`}>
          {feedGroup.map((feed) => {
            if (feed.type == 'tweet') {
              return <Col md={4} key={feed.id}><div className="well twitter"><p>{feed.text}</p></div></Col>;
            } else {
              var display = feed.selftext == "" ? `${feed.title}: ${feed.url}` : feed.selftext;
              return <Col md={4} key={feed.id}><div className="well reddit"><p>{display}</p></div></Col>;
            }
          })}
        </Row>
      });
    } else {
      return <div></div>
    }
  },

  _onChange: function() {
    this.setState(SocialStore.getState());
  }

});

module.exports = SocialTracker;
