import React from 'react';

var App = React.createClass({
  render: function(){
    return(<RecentChangesTable>
      <RecentChangesTable.Headings headings = {this.props.headings} />
      <RecentChangesTable.Rows changeSets = {this.props.changeSets} />
    </RecentChangesTable>);
  }
});

var RecentChangesTable = React.createClass({
  render: function() {
    return <table className="table">
      {this.props.children}
    </table>;
  }
});

RecentChangesTable.Headings = React.createClass({
  render: function() {
    var headings = this.props.headings.map(function(name, index) {
      return(<RecentChangesTable.Heading key={index} heading = {name}/>);
    });

    return (<thead>
      <tr>
        {headings}
      </tr>
    </thead>);
  }
});

module.exports = App;
