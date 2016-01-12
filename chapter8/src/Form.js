import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  // Uncomment following code and comment shouldComponentUpdate to
  // see performance dip due to function reference this.props.performSearch.
  // mixins: [PureRenderMixin],

  getInitialState() {
    return { searchTerm: '' };
  },

  shouldComponentUpdate(nextProps, nextState) {
   return false;
  },

  _submitForm() {
    this.props.performSearch(this.state.searchTerm);
  },

  render() {
    return (
      <div className="row" style={this.props.style}>
        <div>
          <div className="input-group">
            <input type="text"
                   className="form-control input-lg"
                   placeholder="Search books..."
                   onChange={(event) => { this.setState({searchTerm: event.target.value}) }}/>
            <span className="input-group-btn">
              <button className="btn btn-primary btn-lg"
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
