import React from 'react';
var SearchPage = React.createClass({

  getInitialState(){
    return {docs: [], numFound: 0, num_found: 0, start: 0, searchCompleted: false, searching: false}
  },

  render() {
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
          if (this.state.searching) {
            return this.renderSearching();
          }
          return this.state.searchCompleted ? this.renderSearchElements() : <div/>
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
    return (
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2">
          <span className='text-center'>Total Results: {this.state.numFound}</span>
          <table className="table table-stripped">
            <thead>
            <th>Title</th>
            <th>Title suggest</th>
            <th>Author</th>
            <th>Edition</th>
            </thead>
            <tbody>
            {this.renderDocs(this.state.docs)}
            </tbody>
          </table>
        </div>
      </div>
    );
  },

  renderDocs(docs){
    return docs.map((doc) => {
      console.log(doc);
      return <tr key={doc.cover_edition_key}>
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
