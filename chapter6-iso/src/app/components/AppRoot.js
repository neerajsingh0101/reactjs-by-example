require("jquery");
import React from 'react/addons';
import SearchPage from './SearchPage'
import config from '../../../config/app';

var AppRoot = React.createClass({
    propTypes: {
      state: React.PropTypes.object.isRequired // We can use state as needed ahead to initialize the App.
    },
    render()
    {
      return <SearchPage/>;
    }
  })
  ;

export default AppRoot;
