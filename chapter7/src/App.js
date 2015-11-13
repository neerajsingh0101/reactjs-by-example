require("jquery");
require('btoa');
require('whatwg-fetch');
// require("bootstrap");
// require("bootstrap-webpack");
// require("font-awesome-webpack");

import React from 'react';
import Update from 'react-addons-update';
import sortBy from 'sort-by';
import RowAlternator from '../src/RowAlternator';
import Spinner from '../src/Spinner';

var BookRow = React.createClass({
  render() {
    return(
      <tr style={this.props.style}>
        <td>{this.props.title}</td>
        <td>{(this.props.author_name || []).join(', ')}</td>
        <td>{this.props.edition_count}</td>
      </tr>
    );
  }
});

var BookList = React.createClass({
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

var App = React.createClass({
  getInitialState(){
    return { books: [],
             totalBooks: 0,
             searchCompleted: false,
             searching: false,
             sorting: 'asc' };
  },

  render() {
    let tabStyles = {paddingTop: '5%'};

    return (
      <div className='container'>
        <div className="row" style={tabStyles}>
          <div className="col-lg-8 col-lg-offset-2">
            <h4>Open Library | Search any book you want!</h4>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search books..." ref='searchInput'/>
              <span className="input-group-btn">
                <button className="btn btn-default" type="button" onClick={this._performSearch}>Go!</button>
              </span>
            </div>
          </div>
        </div>
        {this._displaySearchResults()}
      </div>
    );
  },

  _performSearch() {
    let searchTerm = this.refs.searchInput.value;
    this.setState({searchCompleted: false, searching: true});
    this._searchOpenLibrary(searchTerm);
  },

  _parseJSON(response) {
    return response.json();
  },

  _updateState(response) {
    let jsonResponse = response;

    this.setState({
      books: jsonResponse.docs,
      totalBooks: jsonResponse.numFound,
      searchCompleted: true,
      searching: false
    });
  },

  _fetchData(url) {
    return fetch(url).then(this._parseJSON).catch(function (ex) {
      console.log('Parsing failed', ex)
    });
  },

  _searchOpenLibrary(searchTerm) {
    let openlibraryURI = `https://openlibrary.org/search.json?q=${searchTerm}`;
    this._fetchData(openlibraryURI).then(this._updateState);
  },

  _sortByTitle() {
    let sortByAttribute = this.state.sorting === 'asc' ? "title" : "-title";
    let newState = Update(this.state,
                          { books: { $apply: (books) => { return books.sort(sortBy(sortByAttribute)) } },
                            sorting: { $apply: (sorting) => { return sorting === 'asc' ? 'desc' : 'asc' } } });
    this.setState(newState);
  },

  _renderBooks() {
    return this.state.books.map((book, idx) => {
      return (
        <BookRow key={idx}
                 title={book.title}
                 author_name={book.author_name}
                 edition_count={book.edition_count} />
      );
    })
  },

  _displaySearchResults() {
    if (this.state.searching) {
      return <Spinner />;
    } else if (this.state.searchCompleted) {
      return (
        <BookList
            searchCount={this.state.totalBooks}
            _sortByTitle={this._sortByTitle}>
          {this._renderBooks()}
        </BookList>
      );
    }
  }
});


module.exports = App;
