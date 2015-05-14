var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

var debug = require('debug')('client-tester');

var Redis = require('ioredis');
var redis = new Redis(6379, "redis");

http.globalAgent.maxSockets = Infinity;

var app = express();

// view engine setup
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


redis.set('todo', JSON.stringify([]));

app.get('/', function(req, res, next){
	redis.get('todo', function (err, result) {
		var todo = JSON.parse(result);
		res.json(todo);
	});
});

app.get('/get/:id', function(req, res, next){
	redis.get('todo', function (err, result) {
		var todo = JSON.parse(result);
		res.json(todo[req.params.id]);
	});
});

app.post('/add', function(req, res, next){	
	redis.get('todo', function (err, result) {
		var todo = JSON.parse(result);
		todo.push(req.body);
		redis.set('todo', JSON.stringify(todo));
		res.send(200);
	});
});

app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
