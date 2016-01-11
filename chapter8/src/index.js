import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import Perf from 'react-addons-perf';

window.Perf = Perf;
window.Perf.start();

ReactDOM.render(<App />, document.getElementById('rootElement'));
