import React, { Component } from 'react';

var PersonalDetailsForm = React.createClass({
    render: function () {
        return (
            <div id='personal-details'>
                <form onSubmit={this.props.handleSubmit}>
                    <input type="text" name="email" value="Please enter Email"/>
                    <br/>
                    <input type='submit'/>
                </form>
            </div>);
    }
});

export default PersonalDetailsForm;
