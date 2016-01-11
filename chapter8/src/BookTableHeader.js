import React from 'react';

export default React.createClass({
  shouldComponentUpdate() {
    return false;
  },

  render() {
    return (
      <thead>
        <tr>
          <th></th>
          <th><h3><a href="#" onClick={this.props.sortByTitle}>Title</a></h3></th>
          <th><h3>Author</h3></th>
          <th><h3>No. of Editions</h3></th>
        </tr>
      </thead>
    );
  }
})
