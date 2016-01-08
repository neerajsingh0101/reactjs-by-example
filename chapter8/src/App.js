require("font-awesome-webpack");
require("whatwg-fetch");

import React  from 'react';
import Update from 'react-addons-update';
import sortBy from 'sort-by';

import Spinner from '../src/Spinner';
import BookRow from '../src/BookRow';
import BookList from '../src/BookList';
import Form from '../src/Form';
import Header from '../src/Header';

export default React.createClass({
  getInitialState() {
    return { books: [],
             totalBooks: 0,
             searchCompleted: false,
             searching: false,
             sorting: 'asc' };
  },

  _performSearch(searchTerm) {
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
    console.log(url);
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
  },

  render() {
    let style = {paddingTop: '5%'};

    return (
      <div className='container'>
        <Header style={style}></Header>
        <Form style={style}
              performSearch={this._performSearch}>
        </Form>
        {this._displaySearchResults()}
      </div>
    );
  }
});
