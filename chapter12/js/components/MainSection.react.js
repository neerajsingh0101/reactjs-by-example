/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var assign = require('object-assign');
var SocialActions = require('../actions/SocialActions');
var SocialStore = require('../stores/SocialStore');
var ReactBootstrap = require('react-bootstrap');
var Col = ReactBootstrap.Col, Row = ReactBootstrap.Row, Button = ReactBootstrap.Button,
    Input = ReactBootstrap.Input, Table = ReactBootstrap.Table;

var MainSection = React.createClass({

  getInitialState: function () {
    return assign({twitter: 'twitter', reddit: 'twitter'}, SocialStore.getState());
  },

  componentDidMount: function () {
    SocialStore.addChangeListener(this._onChange);
    this.syncFeed();
  },

  componentWillUnmount: function () {
    SocialStore.removeChangeListener(this._onChange);
  },

  render: function () {

    return (
        <Row>
          <Col xs={8} md={8} mdOffset={2}>
            <Table striped hover>
              <thead>
              <tr>
                <th width='200'>Feed Type</th>
                <th>Feed Source</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><Input id='test' type="checkbox" label="Twitter" onChange={SocialActions.filterTweets}
                           checked={this.state.showTweets}/></td>
                <td><Input onChange={this.changeTwitterSource} type="text" addonBefore="@" value={this.state.twitter}/>
                </td>
              </tr>
              <tr>
                <th><Input type="checkbox" label="Reddit" onChange={SocialActions.filterReddits}
                           checked={this.state.showReddits}/></th>
                <td><Input onChange={this.changeRedditSource} type="text" addonBefore="@"
                           value={this.state.reddit}/></td>
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
    );
  },

  changeTwitterSource: function (event) {
    this.setState({twitter: event.target.value});
  },

  changeRedditSource: function (event) {
    this.setState({reddit: event.target.value});
  },

  syncFeed: function () {
    SocialActions.fetchReddits(this.state.reddit);
    SocialActions.fetchTweets(this.state.twitter);
  },

  _onChange: function () {
    this.setState(SocialStore.getState());
  }

});

module.exports = MainSection;
