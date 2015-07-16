var CartTimeoutMixin = {
  componentWillMount: function () {
    this.setInterval(this.decrementCartTimer, 1000);
  },

  decrementCartTimer(){
    if (this.state.cartTimeout == 0) {
      this.props.alertCartTimeout();
      return;
    }
    this.setState({cartTimeout: this.state.cartTimeout - 1});
  },

  componentWillUnmount(){
    this.props.updateCartTimeout(this.state.cartTimeout);
  }

};


module.exports = CartTimeoutMixin;
