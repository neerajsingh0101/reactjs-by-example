import React from 'react';


var ModalAlertTimeout = React.createClass({
  componentDidMount(){
    setTimeout(()=> {
      let timeoutModal = this.refs.timeoutModal.getDOMNode();
      $(timeoutModal).modal('show');
      $(timeoutModal).on('hidden.bs.modal', this.unMountComponent);
    }, 100);
  },


  unMountComponent () {
    React.unmountComponentAtNode(this.getDOMNode().parentNode);
  },

  render() {
    return (

      <div className="modal fade" ref='timeoutModal'>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                aria-hidden="true">×</span></button>
              <h4 className="modal-title">Timeout</h4>
            </div>
            <div className="modal-body">
              <p>The cart has timed-out. Please try again!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
module.exports = ModalAlertTimeout;
