var Twitter = require('twitter');
var config = require('./config');

var client = new Twitter({
  consumer_key: config.twitter_consumer_key,
  consumer_secret: config.twitter_consumer_secret,
  access_token_key: config.twitter_access_token_key,
  access_token_secret: config.twitter_access_token_secret
});

var express= require('express');
var app = new (require('express'))();
var port = 3000

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

app.use(express.static(__dirname));

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
