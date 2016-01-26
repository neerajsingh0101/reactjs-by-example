import { FILTER_BY_TWEETS, FILTER_BY_REDDITS, SYNC_REDDITS, SYNC_TWEETS } from '../actions/social'
import _ from 'underscore'

const mergeFeed = (tweets = [], reddits = [], showTweets = true, showReddits = true) => {
  let mergedFeed = []
  mergedFeed = showTweets ? mergedFeed.concat(tweets) : mergedFeed;
  mergedFeed = showReddits ? mergedFeed.concat(reddits) : mergedFeed;

  mergedFeed = _.sortBy(mergedFeed, (feedItem) => {
    if (feedItem.type == 'tweet') {
      let date = new Date(feedItem.created_at);
      return date.getTime();
    } else if ((feedItem.type == 'reddit')) {
      return feedItem.created_utc * 1000;
    }
  })
  return mergedFeed;
};

export default function social(state = {
  tweets: [],
  reddits: [],
  feed: [],
  showTweets: true,
  showReddits: true
}, action) {
  switch (action.type) {
    case FILTER_BY_TWEETS:
      return {...state, showTweets: action.showTweets, feed: mergeFeed(state.tweets, state.reddits, action.showTweets, state.showReddits)};
    case FILTER_BY_REDDITS:
      return {...state, showReddits: action.showReddits, feed: mergeFeed(state.tweets, state.reddits, state.showTweets, action.showReddits)};
    case SYNC_TWEETS:
      return {...state, tweets: action.tweets, feed: mergeFeed(action.tweets, state.reddits, state.showTweets, state.showReddits)};
    case SYNC_REDDITS:
      return {...state, reddits: action.reddits, feed: mergeFeed(state.tweets, action.reddits,  state.showTweets, state.showReddits)}
    default:
      return state
  }
}
