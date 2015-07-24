require("jquery");
require("bootstrap");
require("bootstrap-webpack");
require("font-awesome-webpack");
import React from 'react';
import "babel-core/polyfill";


var SearchPage = React.createClass({
  render() {
    console.log(this.props);
    const { searching, searchCompleted } = this.props.DocsStore.toObject();

    let tabStyles = {paddingTop: '5%'};
    return (
      <div className='container'>
        <div className="row" style={tabStyles}>
          <div className="col-lg-8 col-lg-offset-2">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search for Projects..." ref='searchInput'/>
            <span className="input-group-btn">
              <button className="btn btn-default" type="button" onClick={this.performSearch}>Go!</button>
            </span>
            </div>
          </div>
        </div>
        { (() => {
          if (searching) {
            return this.renderSearching();
          }
          return searchCompleted ? this.renderSearchElements() : <div/>
        })()}
      </div>
    );
  },

  renderSearching(){
    return <div className="row">
      <div className="col-lg-8 col-lg-offset-2">
        <div className='text-center'><i className="fa fa-spinner fa-pulse fa-5x"></i></div>
      </div>
    </div>;
  },

  renderSearchElements(){
    const { numFound, docs }  = this.props.DocsStore.toJS();
    return (

      <div className="row">
        <div className="col-lg-8 col-lg-offset-2">
          <span className='text-center'>Total Results: {numFound}</span>
          <table className="table table-stripped">
            <thead>
            <th>Title</th>
            <th>Title suggest</th>
            <th>Author</th>
            <th>Edition</th>
            </thead>
            <tbody>
            {this.renderDocs(docs)}
            </tbody>
          </table>
        </div>
      </div>

    );
  },

  renderDocs(docs){
    return (docs||[]).map((doc) => {
      return <tr key={doc.key}>
        <td>{doc.title}</td>
        <td>{doc.title_suggest}</td>
        <td>{(doc.author_name || []).join(', ')}</td>
        <td>{doc.edition_count}</td>
      </tr>
    })
  },


  performSearch(){
    let searchTerm = $(this.refs.searchInput.getDOMNode()).val();
    this.openLibrarySearch(searchTerm);
    this.props.startSearching();
  },

  parseJSON(response) {
    return response.json();
  },

  updateState(json){
    this.props.updateDocs(json);
    this.props.searchCompleted();
  },

  openLibrarySearch(searchTerm){
    let openlibraryURI = `https://openlibrary.org/search.json?page=1&q=${searchTerm}}`;
    fetch(openlibraryURI)
      .then(this.parseJSON)
      .then(this.updateState)
      .catch(function (ex) {
        console.log('Parsing failed', ex)
      })
  }

});

module.exports = SearchPage;
