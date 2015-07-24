require("jquery");
require("bootstrap");
require("bootstrap-webpack");
require("font-awesome-webpack");

import React from 'react';
import "babel-core/polyfill";
import { createRedux, bindActionCreators } from 'redux';
import { Connector, Provider } from 'redux/react';
import * as stores from './stores/DocsStore';
import SearchApp from './SearchApp'

const redux = createRedux(stores);

export default class App {
  render() {
    return (
      <Provider redux={redux}>
        {() =>
          <SearchApp />
        }
      </Provider>
    );
  }
}
