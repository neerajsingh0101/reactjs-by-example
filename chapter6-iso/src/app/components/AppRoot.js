require("jquery");
require("bootstrap");
require("font-awesome-webpack");
import React from 'react/addons';
import SearchPage from './SearchPage'
import config from '../../../config/app';

var AppRoot = React.createClass({
  mixins: [React.addinsPureRenderMixin],

  render () {
    return <SearchPage/>;
  }
});

AppRoot.propTypes = {
  state: React.PropTypes.object.isRequired
};

export default AppRoot;
