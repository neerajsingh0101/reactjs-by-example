import path from 'path';
import Express from 'express';

import AppRoot from '../app/components/AppRoot'
import React from 'react/addons';

var app = Express();
var server;

const PATH_STYLES = path.resolve(__dirname, '../client/styles');
const PATH_DIST = path.resolve(__dirname, '../../dist');

app.use('/styles', Express.static(PATH_STYLES));
app.use(Express.static(PATH_DIST));

app.get('/', (req, res) => {
  var reactAppContent = React.renderToString(<AppRoot state={{} }/>);
  console.log(reactAppContent);
  res.render(path.resolve(__dirname, '../client/index.ejs'), {reactOutput: reactAppContent});
});

server = app.listen(process.env.PORT || 3000, () => {
  var port = server.address().port;

  console.log('Server is listening at %s', port);
});
