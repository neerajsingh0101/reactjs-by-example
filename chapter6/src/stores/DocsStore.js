// ... too, use constants
import { UPDATE_DOCS, SEARCHING, SEARCH_COMPLETED } from '../constants/ActionTypes';
var Immutable = require('immutable');
// what's important is that Store is a pure function,
// and you can write it anyhow you like.

// the Store signature is (state, action) => state,
// and the state shape is up to you: you can use primitives,
// objects, arrays, or even ImmutableJS objects.
const initialState = Immutable.Map({
  docs: [],
  numFound: 0,
  num_found: 0,
  start: 0,
  searchCompleted: false,
  searching: false
});

export default function DocsStore(state = initialState, action = {}) {
  // this function returns the new state when an action comes
  console.log(action);
  switch (action.type) {
    case UPDATE_DOCS:
      console.log(action);
      let docs = action.docs;
      return state.merge(docs);
    case SEARCHING:
      return state.merge({
        searchCompleted: false,
        searching: true
      });
    case SEARCH_COMPLETED:
      return state.merge({
        searchCompleted: true,
        searching: false
      });
    default:
      return state;
  }
}
