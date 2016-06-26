var api = require('./api');
//var mailcenter = require('./mailcenter');

//var guess = api.supplyGuess();

//console.log(guess);

//mailcenter.sendEmail();

api.receiveForm('marketReciept', { Market: 'Surf City',
  Date: new Date(),
  Name: 'Ahmed',
  Gross: 41500,
  Fee: 4200,
  Pay: 8300,
  Reciepts: 1000,
  Bank: 6000,
  Due: 22000 })
.then(function(response) {
	console.log('Success: ' + response);
}).catch(function(error) {
	console.log('Error: ' + error);
});