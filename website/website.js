var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var morgan = require('morgan')

var request = require('request');
var service = 'http://todoservice.dockerbox.in/';

http.globalAgent.maxSockets = Infinity;

var app = express();

// view engine setup
app.set('views', __dirname + '/view');console.log( __dirname + '/view');
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(morgan('combined'));

app.get('/', function(req, res, next){
	request(service, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    res.render('index', {todo : JSON.parse(body)});
	  } else {
	  	res.json('service error');
	  }
	});
});

app.post('/', function(req, res, next){	
	request.post({url : service + 'add', json: req.body}, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    res.redirect('/');
	  } else {
	  	res.json('service error');
	  }
	});
});

app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
