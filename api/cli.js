var fs = require('fs');
var api = require('./api');
//var mailcenter = require('./mailcenter');

//var guess = api.supplyGuess();

fs.readFile('./dist/assets/image.jpg', function(err, data) {	
	var submissionObject = { Market: 'Surf City',
		Date: new Date(),
		Name: 'Ahmed',
		Gross: 41500,
		Fee: 4200,
		Pay: 8300,
		Reciepts: 1000,
		Bank: 6000,
		Due: 22000,
		image: {
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

});

//console.log(guess);

//mailcenter.sendEmail();

