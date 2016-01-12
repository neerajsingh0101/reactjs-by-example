import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import RowAlternator from '../src/RowAlternator';
import BookListHeader from '../src/BookListHeader';
import BookTableHeader from '../src/BookTableHeader';
import BookRow from '../src/BookRow';

export default React.createClass({
  mixins: [PureRenderMixin],

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

  _renderBooks() {
    return this.props.books.map((book, idx) => {
      return (
        <BookRow key={idx}
                 index={idx + 1}
                 title={book.title}
                 author_name={book.author_name}
                 edition_count={book.edition_count} />
      );
    })
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
              {this._renderBooks()}
            </RowAlternator>
          </table>
        </div>
      </div>
    );
  }
});
