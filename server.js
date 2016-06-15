var express = require('express');
var bodyParser = require('body-parser');

//return the express object
var app = express();

//environment variables
var port = process.env.PORT || 3000;

//get the URL encoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

//tell it the folder to serve
app.use(express.static('public'));

//connecting middleware
//app.use('/assets', express.static(__dirname + '/public'));

//my own middleware
/*app.use('/', function(req, res, next) {
	//log the url to the console
	console.log('Request Url: ' + req.url);

	next();
});*/

//handle HTTP requests, for GET calls
app.get('/', function(req, res) {
	
	//send back html
	res.send('<html><head></head><body><h1>Hello World!</h1></body></html>');

});

//open the port for local development
app.listen(port,function() {
	console.log('Express server is up and running on port ' + port);
})