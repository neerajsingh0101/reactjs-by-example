import React, { Component } from 'react';
import PersonalDetailsForm from './PersonalDetailsForm';

var App = React.createClass({
    render () {
        var containerStyle = {
            textAlign: 'center'
        };

        return (
            <div id='main-container' style={containerStyle}>
                <h1>User Registration</h1>
                <PersonalDetailsForm handleSubmit={this.handleSubmit}>
                </PersonalDetailsForm>
            </div>
        );
    },
    handleSubmit (event){
        alert('Submit!');
        event.preventDefault();
    }

});

export default App;
