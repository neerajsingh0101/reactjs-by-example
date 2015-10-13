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
  renderBooks() {
    return this.props.docs.map((doc, idx) => {
      return (
        <BookRow key={idx}
                 title={doc.title}
                 author_name={doc.author_name}
                 edition_count={doc.edition_count} />
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
                <th><a href="#" onClick={this.props.sortByTitle}>Title</a></th>
                <th>Author</th>
                <th>No. of Editions</th>
              </tr>
            </thead>
            <tbody>
              {this.renderBooks()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

var Header = React.createClass({
  render() {
    return(
      <h4>Open Library | Search any book you want!</h4>
    );
  }
});

var App = React.createClass({
  getInitialState(){
    return { docs: [], num_found: 0, searchCompleted: false, searching: false, sorting: 'asc' };
  },

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.docs !== [] && nextState.docs !== [] && this.state.searchCompleted === true && this.state.sorting === nextState.sorting) {
      return nextState.docs !== this.state.docs;
    }
    return true;
  },

  render() {
    console.log(this.state.docs);
    let tabStyles = {paddingTop: '5%'};
    return (
      <div className='container'>
        <div className="row" style={tabStyles}>
          <div className="col-lg-8 col-lg-offset-2">
            <Header />
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search books..." ref='searchInput'/>
              <span className="input-group-btn">
                <button className="btn btn-default" type="button" onClick={this.performSearch}>Go!</button>
              </span>
            </div>
          </div>
        </div>
        {this.displaySearchResults()}
      </div>
    );
  },

  performSearch(){
    let searchTerm = $(this.refs.searchInput).val();
    this.openLibrarySearch(searchTerm);
    this.setState({searchCompleted: false, searching: true});
  },

  parseJSON(response) {
    return response.json();
  },

  updateState(json){
    this.setState({
      ...json,
      searchCompleted: true,
      searching: false
    });
  },

  openLibrarySearch(searchTerm) {
    let openlibraryURI = `https://openlibrary.org/search.json?q=${searchTerm}`;
    console.log(openlibraryURI);

    fetch(openlibraryURI)
      .then(this.parseJSON)
      .then(this.updateState)
      .catch(function (ex) {
        console.log('Parsing failed', ex)
      });
  },

  sortByTitle() {
    let sortAttribute = this.state.sorting === 'asc' ? "title" : "-title";
    let newState = Update(this.state, { docs: { $set: this.state.docs.sort(sortBy(sortAttribute)) },
                                        sorting: { $apply: (sorting) => { return sorting === 'asc' ? 'desc' : 'asc' }}});
    this.setState(newState);
  },

  displaySearchResults() {
    if(this.state.searching) {
      return <Spinner />;
    } else if(this.state.searchCompleted) {
      return (
        <BookList docs={this.state.docs}
                  searchCount={this.state.num_found}
                  sortByTitle={this.sortByTitle} />
      );
    }
  }
});


module.exports = App;
