import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

var data = [{ "when": "2 minutes ago",
              "who": "Jilaal Dupre",
              "description": "Created new account"
},
            {
              "when": "1 hour ago",
              "who": "Losaae White",
              "description": "Added fist chapter"
            }];
var headings = ['When', 'Who', 'Description'];



ReactDOM.render(<App headings = {headings}
                     changeSets = {data} />,
                document.getElementById('container'));
