import React from 'react';
import BookList from './booklist';
import ShippingDetails from './shipping_details';
import DeliveryDetails from './delivery_details';
import Confirmation from './confirmation';
import Success from './success';
import "babel-core/polyfill";

var BookStore = React.createClass({
  getInitialState() {
    return ({ currentStep: 1, formValues: {} });
  },

  updateFormData(formData) {
    var formValues = Object.assign({}, this.state.formValues, formData);
    var nextStep = this.state.currentStep + 1;
    console.log(formValues);
    console.log('updateFormData');
    this.setState({currentStep: nextStep, formValues: formValues});
  },

  render() {
    switch (this.state.currentStep) {
      case 1:
        return <BookList updateFormData={this.updateFormData} />;
      case 2:
        return <ShippingDetails updateFormData={this.updateFormData} />;
      case 3:
        return <DeliveryDetails updateFormData={this.updateFormData} />;
      case 4:
        return <Confirmation data={this.state.formValues} updateFormData={this.updateFormData}/>;
      case 5:
        return <Success data={this.state.formValues}/>;
      default:
        return <BookList updateFormData={this.updateFormData} />;
    }
  }
});



module.exports = BookStore;
