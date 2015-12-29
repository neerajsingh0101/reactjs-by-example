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


export function syncReddits() {
  return {
    type: SYNC_TWEETS
  }
}

export function syncTweets() {
  return {
    type: SYNC_REDDITS
  }
}

function fetchPosts(reddit) {
  return dispatch => {
    dispatch(requestPosts(reddit))
    return fetch(`http://www.reddit.com/r/${reddit}.json`)
        .then(response => response.json())
        .then(json => dispatch(receivePosts(reddit, json)))
  }
}
