import React, { Component } from 'react';
import PersonalDetailsForm from './PersonalDetailsForm';
import EmailPreferencesForm from './EmailPreferencesForm';
import SuccessDetails from './SuccessDetails';

import "babel-core/polyfill";
var App = React.createClass({

  getInitialState(){
    return {currentStep: 1, formValues: {}}
  },

  render () {
    var containerStyle = {
      textAlign: 'center'
    };

    return (
      <div id='main-container' style={containerStyle}>
        {this.renderForm()}
      </div>
    );
  },

  renderForm(){
    switch (this.state.currentStep) {
      case 1:
        return <PersonalDetailsForm ref='personal_details_form'
                                    saveAndProceed={this.saveAndProceed}/>;
      case 2:
        return <EmailPreferencesForm ref='email_preferences_form'
                                     saveAndProceed={this.saveAndProceed}/>;
      case 3:
        return <SuccessDetails ref='success_details' formValues={this.state.formValues}/>;

      default:
        return <PersonalDetailsForm ref='personal_details_form'
                                    saveAndProceed={this.saveAndProceed}/>;
    }
  },
  saveAndProceed(fieldValues){
    var formValues = Object.assign({}, this.state.formValues, fieldValues);
    var nextStep = this.state.currentStep + 1;
    console.log({currentStep: nextStep, formValues: formValues})
    this.setState({currentStep: nextStep, formValues: formValues});
  }

});

export default App;
