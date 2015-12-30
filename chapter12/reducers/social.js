import { FILTER_BY_TWEETS, FILTER_BY_REDDITS, SYNC_REDDITS, SYNC_TWEETS } from '../actions/social'
import _ from 'underscore'

const mergeFeed = (tweets = [], reddits = []) => {
  let mergedFeed = tweets.concat(reddits);
  console.log(mergedFeed)
  mergedFeed =  _.sortBy(mergedFeed, (feedItem) => {
    if (feedItem.type == 'tweet') {
      let date = new Date(feedItem.created_at);
      return date.getTime();
    } else if ((feedItem.type == 'reddit')) {
      return feedItem.created_utc * 1000;
    }
  })
  return mergedFeed;
};

export default function social(state = {tweets: [], reddits: [], feed: []}, action) {
  switch (action.type) {
    case FILTER_BY_TWEETS:
      return {...state, feed: mergeFeed(state.tweets, state.reddits)};
    case FILTER_BY_REDDITS:
      return {...state, feed: mergeFeed(state.tweets, state.reddits)};
    case SYNC_TWEETS:
      return {...state, tweets: action.tweets, feed: mergeFeed(action.tweets, state.reddits)};
    case SYNC_REDDITS:
      return {...state, reddits: action.reddits, feed: mergeFeed(state.tweets, action.reddits)};
    default:
      return state
  }
}
