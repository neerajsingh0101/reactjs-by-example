import { FILTER_BY_TWEETS, FILTER_BY_REDDITS } from '../actions/social'

export default function social(state = {tweets: [], reddits: [], feed: [] }, action) {
  switch (action.type) {
    case FILTER_BY_TWEETS:
      return {...state, feed: []};
    case FILTER_BY_REDDITS:
      return {...state, feed: []};
    default:
      return state
  }
}
