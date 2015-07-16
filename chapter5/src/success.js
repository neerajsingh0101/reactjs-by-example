import React from 'react';

var Success = React.createClass({
  render() {
    var numberOfDays = "1 to 2 ";

    if (this.props.data.deliveryOption === 'Normal') {
      numberOfDays = "3 to 4 ";
    }
    return (
      <div>
        <h2>
          Thank you for shopping with us {this.props.data.fullName}.
        </h2>
        <h4>
          You will soon get {this.props.data.selectedBooks.join(", ")} at {this.props.data.shippingAddress} in approrximately {numberOfDays} days.
        </h4>
      </div>
    );
  }
});

module.exports = Success;
