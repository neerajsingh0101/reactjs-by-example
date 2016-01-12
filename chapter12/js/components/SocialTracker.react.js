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
var Col =  ReactBootstrap.Col, Grid =  ReactBootstrap.Grid, Row =  ReactBootstrap.Row,
    Jumbotron =  ReactBootstrap.Jumbotron, Button =  ReactBootstrap.Button, Input=  ReactBootstrap.Input, Table =  ReactBootstrap.Table ;


var SocialTracker = React.createClass({

  getInitialState: function() {
    return assign({twitter: 'twitter', reddit: 'twitter'}, SocialStore.getState());
  },

  componentDidMount: function() {
    SocialStore.addChangeListener(this._onChange);
    this.syncFeed();
  },

  componentWillUnmount: function() {
    SocialStore.removeChangeListener(this._onChange);
  },

  render: function() {
    console.log('render props');
    console.log(this.props);
    return (
        <Grid className="grid">
          <Row>
            <Jumbotron className="center-text">
              <h1>Social Media Tracker</h1>
            </Jumbotron>

          </Row>
          <Row>
            <Col xs={8} md={8} mdOffset={2}>
              <Table striped  hover>
                <thead>
                <tr>
                  <th width='200'>Feed Type</th>
                  <th>Feed Source</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td><Input id='test' type="checkbox" label="Twitter" onChange={SocialActions.filterTweets} checked={this.state.showTweets}/></td>
                  <td><Input onChange={this.changeTwitterSource} type="text" addonBefore="@" value={this.state.twitter}/></td>
                </tr>
                <tr>
                  <th><Input type="checkbox" label="Reddit" onChange={SocialActions.filterReddits} checked={this.state.showReddits}/></th>
                  <td><Input onChange={this.changeRedditSource} type="text" addonBefore="@"
                             value={this.state.twitter}/></td>
                </tr>
                <tr>
                  <th></th>
                  <td><Button bsStyle="primary" bsSize="large" onClick={this.syncFeed}>Sync Feed</Button>
                  </td>
                </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          {this.renderFeed()}
        </Grid>
    )
  },

  changeTwitterSource: function(event) {
    console.log('Atleast this works?');
    this.setState({twitter: event.target.value});
  },

  changeRedditSource: function(event) {
    console.log('Atleast this works?');
    this.setState({reddit: event.target.value});
  },

  syncFeed: function() {
    console.log('syncFeed was called');
    SocialActions.fetchReddits(this.state.reddit);
    SocialActions.fetchTweets(this.state.twitter);
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
