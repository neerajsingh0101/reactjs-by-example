import React, { Component, PropTypes } from 'react'
import JSONUtil from '../utils/jsonutil'
import ArrayUtil from '../utils/array'
import {fetchTweets} from '../actions/social'
import { Col, Grid, Row, Jumbotron, Button } from 'react-bootstrap';
import '../styles/App.css'

class SocialTracker extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { fetchTweets } = this.props;
    fetchTweets('github');
  }

  render() {
    console.log('render props');
    console.log(this.props);
    return (
        <Grid>
          <Row>
            <Jumbotron className="center-text">
              <h1>Social Media Tracker</h1>
            </Jumbotron>
          </Row>
          {this.renderTweets()}
        </Grid>
    )
  }

  renderTweets() {
    let {tweets} = this.props.social;
    let tweetsCollection = ArrayUtil.in_groups_of(tweets, 3);
    if (tweets.length > 0) {
      return tweetsCollection.map((tweets, index) => {
        console.log(tweets);
        return <Row key={`${tweets[0].id}${index}`}>
          {tweets.map((tweet) => {
            return <Col xs={4} md={4} key={tweet.id}>{tweet.text}</Col>;
          })}
        </Row>
      });

    } else {
      return <div></div>
    }
  }
}

export default SocialTracker
