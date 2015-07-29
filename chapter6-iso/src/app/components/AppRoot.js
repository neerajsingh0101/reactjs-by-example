require("jquery");
require("bootstrap");
require("font-awesome-webpack");
import React from 'react/addons';
import SearchPage from './SearchPage'
import config from '../../../config/app';

var AppRoot = React.createClass({
    propTypes: {
      state: React.PropTypes.object.isRequired
    },
    render()
    {
      return <SearchPage/>;
    }
  })
  ;

export default AppRoot;
