var fs = require('fs');
var api = require('./api');
//var mailcenter = require('./mailcenter');

//var guess = api.supplyGuess();

var req = {
	params: {
		name: 'market_receipts',
		status: 'due'
	}
}

function _buildPossibleMarkets(resources) {
	
	var returnObject = {};
	var reportsDue = resources[0];
	var reportsPastDue = resources[1];
	var allLocations = resources[2];
	var allEmployees = resources[3];

	//build the reports due
	returnObject['reports_due'] = [];
	Object.keys(reportsDue).forEach(function(key) {

		returnObject.reports_due.push({
			name: allLocations[reportsDue[key].market].name,
			employee: (allEmployees[reportsDue[key].scheduled].first_name + ' ' + allEmployees[reportsDue[key].scheduled].last_name)
		});

	});

	//build the reports past due
	returnObject['reports_past_due'] = [];
	Object.keys(reportsPastDue).forEach(function(key) {

		returnObject.reports_past_due.push({
			name: allLocations[reportsPastDue[key].market].name,
			employee: (allEmployees[reportsPastDue[key].scheduled].first_name + ' ' + allEmployees[reportsPastDue[key].scheduled].last_name),
			dueDate: (key.slice(4,6) + '/' + key.slice(6,8) + '/' + key.slice(2,4))
		});
	});

	return returnObject
}

api.collectResources({db: 'forms', form: req.params.name, status: req.params.status }).then(function(response) {
	console.log('good response:');
	var newObject = _buildPossibleMarkets(response);
	console.log('got this in CLI:', newObject);
	//console.log('good response:', response);
}, function(error) {
	console.log('error:', error);
});


/*fs.readFile('./dist/assets/image.jpg', function(err, data) {	
	var submissionObject = { Market: 'Surf City',
		Date: new Date(),
		Name: 'Ahmed',
		Gross: 41500,
		Fee: 4200,
		Pay: 8300,
		Reciepts: 1000,
		Bank: 6000,
		Due: 22000,
		Photo: {
			name: 'Market_Reciept.jpg',
			binary: data 
		}
	}

	console.log(submissionObject);
	
  	if (err) throw err; // Fail if the file can't be read.

  	//otherwise send data
	api.receiveForm('marketReciept', submissionObject)
	.then(function(response) {
		console.log('Success: ' + response);
	}).catch(function(error) {
		console.log('Error: ' + error);
	});

});*/

//console.log(guess);

//mailcenter.sendEmail();

