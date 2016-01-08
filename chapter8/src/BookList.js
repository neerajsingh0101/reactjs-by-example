import React from 'react';
import RowAlternator from '../src/RowAlternator';

export default React.createClass({
  render() {
    return (
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2">
          <span className='text-center'>
            Total Results: {this.props.searchCount}
          </span>
          <table className="table table-stripped">
            <thead>
              <tr>
                <th><a href="#" onClick={this.props._sortByTitle}>Title</a></th>
                <th>Author</th>
                <th>No. of Editions</th>
              </tr>
            </thead>
            <RowAlternator firstColor="white" secondColor="lightgrey">
              {this.props.children}
            </RowAlternator>
          </table>
        </div>
      </div>
    );
  }
});
