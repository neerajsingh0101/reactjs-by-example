import React from 'react/addons';

import AppRoot from './components/AppRoot';


/*
 * @class App
 */
class App {

  /*
   * @constructs App
   * @param {Object} options
   */
  constructor(options) {

    this.state = options.state;
  }

  /*
   * @method render
   * @param {DOM} [element]
   * @returns {String|undefined}
   */
  render(element) {


    // would be in JSX: <AppRoot state={this.state} />
    var appRootElement = React.createElement(AppRoot, {
      state: this.state
    });

    // render to DOM
    if (element) {
      React.render(appRootElement, element);
      return;
    }

    // render to string
    return React.renderToString(appRootElement);
  }

  /*
   * @method render
   * @param {DOM} element
   */
  renderToDOM(element) {
    if (!element) {
      new Error('App.renderToDOM: element is required');
    }

    this.render(element);
  }

  /*
   * @method renderToString
   * @returns {String}
   */
  renderToString() {
    return this.render();
  }
}

export default App;
