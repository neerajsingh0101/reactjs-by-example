import React from 'react';

var InputExample = React.createClass({
  getInitialState() {
    return (
      { name: ''}
    );
  },

  handleChange(event) {
    this.setState({ name: event.target.value });
  },

  render() {
    return (
      <input type="text" value={this.state.name} />
    );
  }
});

module.exports = InputExample;
