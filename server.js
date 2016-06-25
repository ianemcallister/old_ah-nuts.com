var express = require('express');
var bodyParser = require('body-parser');
var api = require('./api/api');

//return the express object
var app = express();

//environment variables
var port = process.env.PORT || 3000;

//get the URL encoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

//tell it the folder to serve
app.use(express.static('dist'));

//connecting middleware
//app.use('/assets', express.static(__dirname + '/public'));

//my own middleware
app.use('/', function(req, res, next) {
	//log the url to the console
	console.log('Request Url: ' + req.url);

	next();
});

//handle HTTP requests, for GET calls
app.get('/assets/:name', function(req, res) {

	console.log('got this');
	var options = {
		root: __dirname + '/dist/assets',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};

	var filename = req.params.name;

	console.log('getting this', filename, 'from', options);

	res.sendFile(filename, options, function(err) {
		if(err) {
			console.log(err);
			res.status(err.status).end();
		} else {
			console.log('sent:', filename);
		}
	});
	//send back html
	//res.send('<html><head></head><body><h1>Hello World!</h1></body></html>');

});

/*app.post('/:path/:file', function(req, res) {
	var path = req.params.path;
	var filename = req.params.file;
	console.log(path, filename);
	res.send({'testing':'test', "path":path, "filename":filename});
});*/
/*app.get('/', function(req, res) {
	res.sendFile(filename, options, function(err) {
		if(err) {
			console.log(err);
			res.status(err.status).end();
		} else {
			console.log('sent:', filename);
		}
	});
});*/

/*app.get('/api/guessMarket', function(req, res) {
	
	var gps = null;
	
	//if a gps was passsed, get it
	if(typeof req.params !== 'undefined') gps = req.params.gps;
	
	//if this get is called supply the most likely data
	var guess = api.supplyGuess(gps);
	
	//send back
	res.send(guess);
})*/

//open the port for local development
app.listen(port,function() {
	console.log('Express server is up and running on port ' + port);
})