import React, { Component } from 'react';

var PersonalDetailsForm = React.createClass({
    render: function () {
        var inputStyle= {minWidth: 250, marginBottom: 10, padding: 10};
        var submitStyle= {padding: 10};
        return (
            <div id='personal-details'>
                <form onSubmit={this.props.handleSubmit}>
                    <input type="text" ref='email' name="email" placeholder="Email" style={inputStyle}/> <br/>
                    <input type="text" name="first_name" placeholder="First Name" style={inputStyle}/> <br/>
                    <input type="text" name="last_name" placeholder="Last Name" style={inputStyle}/> <br/>
                    <button type="submit" value="Submit" style={submitStyle}>Submit</button>
                </form>
            </div>);
    }
});

export default PersonalDetailsForm;
