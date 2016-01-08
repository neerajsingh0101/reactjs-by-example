import React from 'react';

export default React.createClass({
  getInitialState() {
    return { searchTerm: '' };
  },

  _submitForm() {
    this.props.performSearch(this.state.searchTerm);
  },

  render() {
    return (
      <div className="row" style={this.props.style}>
        <div className="col-lg-8 col-lg-offset-2">
          <div className="input-group">
            <input type="text"
                   className="form-control"
                   placeholder="Search books..."
                   onChange={(event) => { this.setState({searchTerm: event.target.value}) }}/>
            <span className="input-group-btn">
              <button className="btn btn-default"
                      type="button"
                      onClick={this._submitForm}>
                Go!
              </button>
            </span>
          </div>
        </div>
      </div>
    )
  }
})
