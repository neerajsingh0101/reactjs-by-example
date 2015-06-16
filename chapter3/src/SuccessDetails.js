import React, { Component } from 'react';

var SuccessDetails = React.createClass({
  render: function () {
    return (
      <div id='success-page'>
        <h1>User Registered!</h1><br/>
        <p>
          {this.props.formValues.first_name} {this.props.formValues.last_name}, thankyou for registering with us!
        </p>
      </div>);
  }

});

export default SuccessDetails;

