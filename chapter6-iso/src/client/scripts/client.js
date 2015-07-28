import App from '../../app';

var attachElement = document.getElementById('app');

var state = {};

var app;


// Create new app and attach to element
app = new App({
  state: state
});

app.renderToDOM(attachElement);
