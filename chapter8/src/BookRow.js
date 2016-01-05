import React from 'react';

export default React.createClass({
  render() {
    return(
      <tr style={this.props.style}>
        <td>{this.props.title}</td>
        <td>{(this.props.author_name || []).join(', ')}</td>
        <td>{this.props.edition_count}</td>
      </tr>
    );
  }
});
