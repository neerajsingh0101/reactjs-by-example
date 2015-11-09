import React from 'react';

var RowAlternator = React.createClass({
  propTypes: {
    firstColor: React.PropTypes.string,
    secondColor: React.PropTypes.string
  },

  render() {
    return (
      <tbody>
        { this.props.children.map((row, idx) => {
            if (idx %2 == 0) {
              return React.cloneElement(row, { style: { background: this.props.firstColor }});
            } else {
              return React.cloneElement(row, { style: { background: this.props.secondColor }});
            }
          })
        }
      </tbody>
    )
  }
});

module.exports = RowAlternator;
