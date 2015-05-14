var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

var Redis = require('ioredis');
var redis = new Redis(6379, "redis.domain.com");

http.globalAgent.maxSockets = Infinity;

var app = express();

// view engine setup
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

redis.set('foo', 'bar');

app.get('/getdata/:id', function(req, res, next){
	redis.get('foo', function (err, result) {
		res.json(result);
	});
});

app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
