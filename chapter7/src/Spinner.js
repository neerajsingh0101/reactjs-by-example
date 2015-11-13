import React from 'react';

var Spinner = React.createClass({
  render() {
    return(
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2">
          <div className='text-center'><i className="fa fa-spinner fa-pulse fa-5x"></i></div>
        </div>
      </div>
    );
  }
});

module.exports = Spinner;
