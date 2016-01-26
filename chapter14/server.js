var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpack_config = require('./webpack.config');
var Twitter = require('twitter');
var config = require('./config');
console.log(config);
var client = new Twitter({
  consumer_key: config.twitter_consumer_key,
  consumer_secret: config.twitter_consumer_secret,
  access_token_key: config.twitter_access_token_key,
  access_token_secret: config.twitter_access_token_secret
});

var app = new (require('express'))();
var port = 3000

var compiler = webpack(webpack_config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpack_config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

app.get('/tweets.json', function (req, res) {
  console.log(req.query.username);
  var params = {screen_name: req.query.username};
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    console.log(error);
    if (!error) {
      res.json(tweets);
    } else {
      res.json({error: error});
    }
  });
});


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
});
