import { FILTER_BY_TWEETS, FILTER_BY_REDDITS, SYNC_REDDITS, SYNC_TWEETS } from '../actions/social'

export default function social(state = {tweets: [], reddits: [], feed: [] }, action) {
  switch (action.type) {
    case FILTER_BY_TWEETS:
      return {...state, feed: []};
    case FILTER_BY_REDDITS:
      return {...state, feed: []};
    case SYNC_TWEETS:
      return {...state, tweets: action.tweets};
    case SYNC_REDDITS:
      return {...state, reddits: action.reddits};
    default:
      return state
  }
}
