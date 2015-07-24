import React from 'react';
import "babel-core/polyfill";
import { createRedux, bindActionCreators } from 'redux';
import { Connector, Provider } from 'redux/react';
import SearchPage from './SearchPage';
import * as SearchActions from './actions/SearchActions';

function select(state) {
  console.log(state);
  return {DocsStore: state.default};
}


export default class SearchApp {
  render() {
    return (
      <Connector select={select}>
        {({ DocsStore, dispatch }) =>
          <SearchPage DocsStore={DocsStore}
            {...bindActionCreators(SearchActions, dispatch)} />
        }
      </Connector>
    );
  }
}

