import React from 'react';

export default React.createClass({
  shouldComponentUpdate() {
    return false;
  },

  render() {
    return(
      <div className="row">
        <div className='text-center'>
          <i className="fa fa-spinner fa-pulse fa-5x">
          </i>
        </div>
      </div>
    );
  }
});
