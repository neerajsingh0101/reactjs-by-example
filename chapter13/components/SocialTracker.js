import React, { Component, PropTypes } from 'react'
import JSONUtil from '../utils/jsonutil'
import ArrayUtil from '../utils/array'
import { Col, Grid, Row, Jumbotron, Button, Input, Table } from 'react-bootstrap';
import '../styles/App.css'

class SocialTracker extends Component {
  constructor() {
    super();
    this.state = {twitter: 'twitter', reddit: 'twitter'}
  }

  componentDidMount() {
    this.syncFeed();
  }

  render() {
    console.log('render props');
    console.log(this.props);
    let {filterTweets, filterReddits} = this.props;
    let {showTweets, showReddits} = this.props.social;
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
                  <td><Input id='test' type="checkbox" label="Twitter" onChange={filterTweets} checked={showTweets}/></td>
                  <td><Input onChange={::this.changeTwitterSource} type="text" addonBefore="@"
                             value={this.state.twitter}/></td>
                </tr>
                <tr>
                  <th><Input type="checkbox" label="Reddit" onChange={filterReddits} checked={showReddits}/></th>
                  <td><Input onChange={::this.changeRedditSource} type="text" addonBefore="@"
                             value={this.state.twitter}/></td>
                </tr>
                <tr>
                  <th></th>
                  <td><Button bsStyle="primary" bsSize="large" onClick={::this.syncFeed}>Sync Feed</Button>
                  </td>
                </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          {this.renderFeed()}
        </Grid>
    )
  }

  changeTwitterSource(event) {
    this.setState({twitter: event.target.value});
  }

  changeRedditSource(event) {
    this.setState({reddit: event.target.value});
  }

  syncFeed() {
    const { fetchTweets, fetchReddits } = this.props;
    fetchReddits(this.state.reddit);
    fetchTweets(this.state.twitter);
    console.log('syncFeed was called');
  }

  renderFeed() {
    let {feed} = this.props.social;
    let feedCollection = ArrayUtil.in_groups_of(feed, 3);
    if (feed.length > 0) {
      return feedCollection.map((feedGroup, index) => {
        console.log(feedGroup);
        return <Row key={`${feedGroup[0].id}${index}`}>
          {feedGroup.map((feed) => {
            if (feed.type == 'tweet') {
              return <Col md={4} key={feed.id}><div className="well twitter"><p>{feed.text}</p></div></Col>;
            } else {
              let display = feed.selftext == "" ? `${feed.title}: ${feed.url}` : feed.selftext;
              return <Col md={4} key={feed.id}><div className="well reddit"><p>{display}</p></div></Col>;
            }

          })}
        </Row>
      });
    } else {
      return <div></div>
    }
  }

}

export default SocialTracker
