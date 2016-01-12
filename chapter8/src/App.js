require("font-awesome-webpack");
require("whatwg-fetch");

import React  from 'react';
import Update from 'react-addons-update';
import sortBy from 'sort-by';
import Immutable from 'immutable';

import Spinner from '../src/Spinner';
import BookRow from '../src/BookRow';
import BookList from '../src/BookList';
import Form from '../src/Form';
import Header from '../src/Header';

export default React.createClass({
  getInitialState() {
    return { books: [],
             totalBooks: 0,
             offset: 100,
             searching: false,
             sorting: 'asc',
             page: 1,
             searchTerm: '',
             totalPages: 1
    };
  },

  _performSearch(searchTerm) {
    this.setState({searching: true, searchTerm: searchTerm});
    this._searchOpenLibrary(searchTerm);
  },

  _parseJSON(response) {
    return response.json();
  },

  _searchAgain() {
    if (this.state.page > this.state.totalPages) {
      this.setState({searching: false});
    } else {
      this._searchOpenLibrary(this.state.searchTerm);
    }
  },

  _updateState(response) {
    let jsonResponse = response;
    let newBooks = this.state.books.concat(jsonResponse.docs);
    let totalPages = jsonResponse.numFound / this.state.offset + 1;
    let nextPage = this.state.page + 1;

    this.setState({
      books: newBooks,
      totalBooks: jsonResponse.numFound,
      page: nextPage,
      totalPages: totalPages
    }, this._searchAgain);

  },

  _fetchData(url) {
    return fetch(url).then(this._parseJSON).catch(function (ex) {
      console.log('Parsing failed', ex)
    });
  },

  _searchOpenLibrary(searchTerm) {
    let openlibraryURI = `https://openlibrary.org/search.json?q=${searchTerm}&page=${this.state.page}`;
    this._fetchData(openlibraryURI).then(this._updateState);
  },

  _sortByTitle() {
    let sortByAttribute = this.state.sorting === 'asc' ? "title" : "-title";
    let newState = Update(this.state,
                          { books: { $apply: (books) => { return books.sort(sortBy(sortByAttribute)) } },
                            sorting: { $apply: (sorting) => { return sorting === 'asc' ? 'desc' : 'asc' } } });
    this.setState(newState);
  },

  render() {
    let style = Immutable.Map({paddingTop: '5%'});
    return (
      <div className='container'>
        <Header style={style}></Header>
        <Form style={style}
              performSearch={this._performSearch}>
        </Form>

        {this.state.totalBooks > 0 ?
         <BookList
             searchCount={this.state.totalBooks}
             _sortByTitle={this._sortByTitle}
             books={this.state.books}>
         </BookList>
       : null }

        { this.state.searching ? <Spinner /> : null }
      </div>
    );
  }
});
