import JSONUtil from '../utils/jsonutil'
import ArrayUtil from '../utils/array'

export const FILTER_BY_TWEETS = 'FILTER_BY_TWEETS';
export const FILTER_BY_REDDITS = 'FILTER_BY_REDDITS';
export const SYNC_TWEETS = 'SYNC_TWEETS';
export const SYNC_REDDITS = 'SYNC_REDDITS';

export function filterTweets() {
  return {
    type: FILTER_BY_TWEETS
  }
}

export function filterReddits() {
  return {
    type: FILTER_BY_REDDITS
  }
}


export function syncTweets(json) {
  return {
    type: SYNC_TWEETS,
    tweets: json,
    receivedAt: Date.now()
  }
}

export function syncReddits(json) {
  return {
    type: SYNC_REDDITS,
    reddits: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function fetchTweets(username) {
  return dispatch => {
    fetch(`/tweets.json?username=${username}`)
        .then(JSONUtil.parseJSON)
        .then(json => dispatch(syncTweets(json))).catch(JSONUtil.handleParseException)
  }
}

export function fetchReddits(topic) {
  return dispatch => {
    fetch(`https://www.reddit.com/r/${topic}.json`)
        .then(JSONUtil.parseJSON)
        .then(json => dispatch(syncReddits(json))).catch(JSONUtil.handleParseException)
  }
}
