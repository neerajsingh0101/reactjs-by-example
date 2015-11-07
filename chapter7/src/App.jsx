require("jquery");
require("bootstrap");
require("bootstrap-webpack");
require("font-awesome-webpack");
require('btoa');

import React from 'react';
import "babel-core/polyfill";
import Update from 'react-addons-update';
import sortBy from 'sort-by';

var Spinner = React.createClass({
  render() {
    return(
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2">
          <div className='text-center'><i className="fa fa-spinner fa-pulse fa-5x"></i></div>
        </div>
      </div>
    );
  }
});

var BookRow = React.createClass({
  render() {
    return(
      <tr>
        <td>{this.props.title}</td>
        <td>{(this.props.author_name || []).join(', ')}</td>
        <td>{this.props.edition_count}</td>
      </tr>
    );
  }
});

var BookList = React.createClass({
  _renderBooks() {
    return this.props.books.map((book, idx) => {
      return (
        <BookRow key={idx}
                 title={book.title}
                 author_name={book.author_name}
                 edition_count={book.edition_count} />
      );
    })
  },

  render() {
    return (
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2">
          <span className='text-center'>Total Results: {this.props.searchCount}</span>
          <table className="table table-stripped">
            <thead>
              <tr>
                <th><a href="#" onClick={this.props._sortByTitle}>Title</a></th>
                <th>Author</th>
                <th>No. of Editions</th>
              </tr>
            </thead>
            <tbody>
              {this._renderBooks()}
            </tbody>
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

  _performSearch(){
    let searchTerm = $(this.refs.searchInput).val();
    this._searchOpenLibrary(searchTerm);
    this.setState({searchCompleted: false, searching: true});
  },

  _parseJSON(response) {
    return response.json();
  },

  _updateState(json){
    this.setState({
      books: json.docs,
      totalBooks: json.numFound,
      searchCompleted: true,
      searching: false
    });
  },

  _searchOpenLibrary(searchTerm) {
    let openlibraryURI = `https://openlibrary.org/search.json?q=${searchTerm}`;
    console.log(openlibraryURI);

    fetch(openlibraryURI)
      .then(this._parseJSON)
      .then(this._updateState)
      .catch(function (ex) {
        console.log('Parsing failed', ex)
      });
  },

  _sortByTitle() {
    let sortByAttribute = this.state.sorting === 'asc' ? "title" : "-title";
    let unsortedBooks = this.state.books;
    console.log("Before sorting :");
    console.log(this.state.books[0].title);
    let sortedBooks = unsortedBooks.sort(sortBy(sortByAttribute));
    console.log("After sorting :");
    console.log(this.state.books[0].title);
    // this.setState({ books: sortedBooks, sorting: this._toggleSorting() });
  },

  _toggleSorting() {
    return this.state.sorting === 'asc' ? 'desc' : 'asc';
  },

  _displaySearchResults() {
    if(this.state.searching) {
      return <Spinner />;
    } else if(this.state.searchCompleted) {
      return (
        <BookList books={this.state.books}
                  searchCount={this.state.totalBooks}
                  _sortByTitle={this._sortByTitle} />
      );
    }
  }
});


module.exports = App;
