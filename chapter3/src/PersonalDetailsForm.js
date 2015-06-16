import React, { Component } from 'react';

var PersonalDetailsForm = React.createClass({
  render: function () {
    var inputStyle = {minWidth: 250, marginBottom: 10, padding: 10};
    var submitStyle = {padding: 10};
    return (
      <div id='personal-details'>
        <h1>Personal details</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref='email' name="email" placeholder="Email"
                 style={inputStyle}/> <br/>
          <input type="text" ref='first_name' name="first_name"
                 placeholder="First Name" style={inputStyle}/> <br/>
          <input type="text" ref='last_name' name="last_name"
                 placeholder="Last Name" style={inputStyle}/> <br/>
          <input type="number" ref='age' name="age" placeholder="Age"
                 style={inputStyle}/> <br/>
          <button type="submit" value="Submit" style={submitStyle}>Submit
          </button>
        </form>
      </div>);
  },
  handleSubmit(event){
    event.preventDefault();

    var formValues = {
      email: this.refs.email.getDOMNode().value,
      first_name: this.refs.first_name.getDOMNode().value,
      last_name: this.refs.last_name.getDOMNode().value,
      age: this.refs.age.getDOMNode().value
    };
    this.props.saveAndProceed(formValues);
  }
});

export default PersonalDetailsForm;
