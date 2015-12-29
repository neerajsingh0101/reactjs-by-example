import React, { Component, PropTypes } from 'react'
import JSONUtil from '../utils/jsonutil'
import ArrayUtil from '../utils/array'
import { Col, Grid, Row, Jumbotron, Button } from 'react-bootstrap';
import '../styles/App.css'

class SocialTracker extends Component {
  constructor() {
    super();
    this.state = {tweets: []};
  }

  componentDidMount() {
    this.fetchTweets();
  }

  setTweets(json) {
    console.log(this);
    console.log('parsed json', json)
    this.setState({tweets: json})
  }

  fetchTweets() {
    console.log(this);
    fetch('/tweets.json')
        .then(JSONUtil.parseJSON)
        .then(::this.setTweets).catch(JSONUtil.handleParseException)
  }

  render() {
    console.log(this.props);
    console.log(this.state);
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
    let tweetsCollection = ArrayUtil.in_groups_of(this.state.tweets, 3);
    console.log(tweetsCollection);
    if (this.state.tweets.length > 0) {
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
