import React from 'react';
import RowAlternator from '../src/RowAlternator';
import BookListHeader from '../src/BookListHeader';
import BookTableHeader from '../src/BookTableHeader';

export default React.createClass({
  getInitialState() {
    return ({
      colors: ['grey', 'lightgreen', 'yellow', 'lightblue', 'lightgrey']
    })
  },

  _selectRandomColor() {
    let randomColor = this.state.colors[Math.floor(Math.random()*this.state.colors.length)];
    console.log(randomColor);
    return randomColor;
  },

  render() {
    return (
      <div className="row">
        <div>
          <BookListHeader searchCount={this.props.searchCount}>
          </BookListHeader>
          <table className="table table-stripped">
            <BookTableHeader sortByTitle={this.props._sortByTitle}></BookTableHeader>
            <RowAlternator firstColor="white" secondColor={this._selectRandomColor()}>
              {this.props.children}
            </RowAlternator>
          </table>
        </div>
      </div>
    );
  }
});
