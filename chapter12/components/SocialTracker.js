import React, { Component, PropTypes } from 'react'
import JSONUtil from '../utils/jsonutil'
import ArrayUtil from '../utils/array'
import {fetchTweets} from '../actions/social'
import { Col, Grid, Row, Jumbotron, Button, Input, Table } from 'react-bootstrap';
import '../styles/App.css'

class SocialTracker extends Component {
  constructor() {
    super();
    this.state = {twitter: 'github', reddit: 'github'}
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
          <Row>
            <Col  xs={6} md={6} mdOffset={2}>
            <Table striped bordered condensed hover>
              <thead>
              <tr>
                <th>Feed Type</th>
                <th>Feed Source</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Twitter</td>
                <td><Input onChange={::this.changeTwitterSource} type="text" addonBefore="@" value={this.state.twitter}/></td>
              </tr>
              <tr>
                <td>Reddit</td>
                <td><Input type="text" addonBefore="@"/></td>
              </tr>
              <tr>
                <td colSpan="2"><Button bsStyle="primary" bsSize="large" onClick={::this.syncFeed}>Sync Feed</Button></td>
              </tr>
              </tbody>
            </Table>
             </Col>
          </Row>
          {this.renderTweets()}
        </Grid>
    )
  }

  changeTwitterSource(event){
    this.setState({twitter: event.target.value});
  }

  syncFeed(){
    const { fetchTweets } = this.props;
    fetchTweets(this.state.twitter);
    console.log('syncFeed was called');
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
