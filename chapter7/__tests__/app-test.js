jest.dontMock('../src/App');
const App = require('../src/App');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Spinner from './../src/Spinner';

describe('App', () => {
  it('mounts successfully', () => {
    let app = TestUtils.renderIntoDocument(<App />);
    expect(app.state.books).toEqual([]);
    expect(app.state.searching).toEqual(false);
  }),

  it('start searching when user enters search term and clicks submit', () => {
    let app = TestUtils.renderIntoDocument(<App />);
    let inputNode = TestUtils.findRenderedDOMComponentWithTag(app, 'input');
    inputNode.value = "Dan Brown";
    TestUtils.Simulate.change(inputNode);
    let submitButton = TestUtils.findRenderedDOMComponentWithTag(app, 'button');
    TestUtils.Simulate.click(submitButton);
    expect(app.state.searching).toEqual(true);
    expect(app.state.searchCompleted).toEqual(false);
    let spinner = TestUtils.findRenderedComponentWithType(app, Spinner);
    expect(spinner).toBeTruthy();
  }),

  it('renders books when search result is received from API', () => {
    let app = TestUtils.renderIntoDocument(<App />);
    let inputNode = TestUtils.findRenderedDOMComponentWithTag(app, 'input');
    inputNode.value = "Dan Brown";
    TestUtils.Simulate.change(inputNode);

    let mockResponse = require('./response.json');
    app._fetchData = jest.genMockFunction().mockReturnValue({
      then: function(callback) {
        return callback(mockResponse);
      }
    });

    runs(() => {
      let submitButton = TestUtils.findRenderedDOMComponentWithTag(app, 'button');
      TestUtils.Simulate.click(submitButton);
    });

    waitsFor(() => {
      return app.state.searchCompleted;
    });

    runs(() => {
      expect(app.state.searching).toEqual(false);
      expect(app.state.searchCompleted).toEqual(true);
      expect(app.state.books).toEqual(mockResponse.docs);
    });
  }),

  it('shallow rendering', () => {
    let renderer = TestUtils.createRenderer();
    let result = renderer.render(<App />);
    result = renderer.getRenderOutput();
    expect(result.type).toEqual('div');
  })
});
