import React, { Component } from 'react';

var EmailPreferencesForm = React.createClass({
  render: function () {
    var inputStyle = {minWidth: 250, marginBottom: 10, padding: 10};
    var submitStyle = {padding: 10};
    return (
      <div id='email-preferences'>
        <h1>Email preferences</h1>

        <form onSubmit={this.handleSubmit}>
          <label for='mondayPreference'>Monday Preference: </label>
          <input type="checkbox" ref='mondayPreference' name="mondayPreference"
                 style={inputStyle}/> <br/>
          <label for='wednesdayPreference'>Wednesday Preference: </label>
          <input type="checkbox" ref='wednesdayPreference' name="wednesdayPreference"
                 style={inputStyle}/> <br/>
          <label for='saturdayPreference'>Saturday Preference: </label>
          <input type="checkbox" ref='saturdayPreference' name="saturdayPreference"
                 style={inputStyle}/> <br/>

          <select defaultValue="onlySubscribed" style={inputStyle} ref='newsLetterType'
                  name="newsLetterType">
            <option value="onlySubscribed">Only when I comment</option>
            <option value="allComments">On all Comments</option>
            <option value="allActivity">On all Activity</option>
          </select><br/>

          <button type="submit" value="Save" style={submitStyle}>Save
          </button>
        </form>
      </div>);
  },
  handleSubmit(event){
    event.preventDefault();

    var formValues = {
      mondayPreference: this.refs.mondayPreference.getDOMNode().value,
      wednesdayPreference: this.refs.wednesdayPreference.getDOMNode().value,
      saturdayPreference: this.refs.saturdayPreference.getDOMNode().value,
      newsLetterType: this.refs.newsLetterType.getDOMNode().value
    };
    this.props.saveAndProceed(formValues);
  }
});

export default EmailPreferencesForm;
