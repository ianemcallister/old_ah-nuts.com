var express = require('express');
var bodyParser = require('body-parser');

//return the express object
var app = express();

//environment variables
var port = process.env.PORT || 3000;

//get the URL encoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

//connecting middleware
//app.use('/assets', express.static(__dirname + '/public'));

//handle HTTP requests, for GET calls
app.get('/', function(req, res) {
	//send back html, including middleware
	res.send('<html><head></head><body><h1>Hello World!</h1></body></html>');

});

//open the port for local development
app.listen(port,function() {
	console.log('Express server is up and running on port ' + port);
})