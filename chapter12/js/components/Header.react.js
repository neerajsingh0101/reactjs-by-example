/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var ReactBootstrap =  require('react-bootstrap');
var Row =  ReactBootstrap.Row, Jumbotron =  ReactBootstrap.Jumbotron;

var Header = React.createClass({

  render: function () {
    return (
        <Row>
          <Jumbotron className="center-text">
            <h1>Social Media Tracker</h1>
          </Jumbotron>
        </Row>
    );
  }

});

module.exports = Header;
