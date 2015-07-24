// Still using constants...
import { UPDATE_DOCS, SEARCHING, SEARCH_COMPLETED } from '../constants/ActionTypes';


export function updateDocs(docs = {}) {
  return {
    type: UPDATE_DOCS,
    docs
  };
}


export function startSearching() {
  return {
    type: SEARCHING
  };
}


export function searchCompleted() {
  return {
    type: SEARCH_COMPLETED
  };
}
