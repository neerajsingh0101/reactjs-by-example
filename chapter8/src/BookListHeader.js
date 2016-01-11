import React from 'react';

export default React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.searchCount !== this.props.searchCount;
  },

  render() {
    return (
      <span className='text-center'>
        <h3>Total Results: {this.props.searchCount}</h3>
      </span>
    );
  }
})
