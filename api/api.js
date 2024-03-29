'use static'

var mailCenter = require('./mailcenter.js');
var dateFormat = require('dateformat');
var ahNutsFirebase = require('./ahNutsFirebase');

//define the form hash
var formHash = {'marketReceipt':'Market Receipt'};

var api = {
	_allResources:_allResources,
	_getCurrentTime:_getCurrentTime,
	_getMarketTimesHash:_getMarketTimesHash,
	_getEmployee:_getEmployee,
	_getMarketGross:_getMarketGross,
	_getMarketFee:_getMarketFee,
	_calculatePay:_calculatePay,
	_getMarketPayStructure:_getMarketPayStructure,
	_getEmployeeExpenses:_getEmployeeExpenses,
	_getMarketBank:_getMarketBank,
	_buildMailSubject:_buildMailSubject,
	_buildMailBody:_buildMailBody,
	collectResources:collectResources,
	supplyGuess:supplyGuess,
	receiveForm:receiveForm,
	test: test
}

function _allResources() {
	return {
		'forms': {
			'market_receipts': {
				'due': [
					{db: 'forms', form: 'market_receipts', status: 'due'},
					{db: 'forms', form: 'market_receipts', status: 'past_due'},
					{db: 'locations'},
					{db: 'employees'}
				]
			}
		}
	};
}
function _getCurrentTime() {
	var newTime = new Date();
	return { day: newTime.getDay(), mins: (newTime.getHours() * 60) + newTime.getMinutes() }
}

function _getMarketTimesHash() {
	//pull this data from an ultimate source later
	return {
		2: [
			{start: 900, end: 1140, name: 'Bixby Park', id:'aoidjgs'},
			{start: 1020, end: 1260, name: 'Surf City Nights', id:'aoidjgs'}
		],
		3: [
			{start: 600, end: 840, name: 'Irvine - Discovery', id:'aoidjgs'},
			{start: 960, end: 1200, name: 'Twila Reid Park', id:'aoidjgs'}
		],
		4: [{start: 660, end: 960, name: 'Anaheim Promenade', id:'aoidjgs'}],
		5: [
			{start: 720, end: 1020, name: 'Huntington Beach Pier', id:'aoidjgs'},
			{start: 1020, end: 1260, name: 'Monrovia Street Fair', id:'aoidjgs'}
		], 
		6: [{start: 600, end: 900, name: 'Bixby Park', id:'aoidjgs'}],
		0: [{start: 600, end: 840, name: 'Great Park', id:'aoidjgs'}]
	}
}

function _getEmployee(marketId) {}
function _getMarketGross(marketId) {}
function _getMarketFee(marketId) {}
function _calculatePay(gross, payStructure) {}
function _getMarketPayStructure() {}
function _getEmployeeExpenses() {}
function _getEmployee() {}
function _getMarketBank() {}

function _buildMailSubject(type, data) {
	var returnString = '';
	var marketDate = dateFormat(data.Date, "m/d/yyyy");

	//add the subject
	returnString += (formHash[type] + ' - ');

	//add the market
	returnString += (data.Market + ' - ');

	//add the date
	returnString += marketDate;

	return returnString;
}

function _buildMailBody(type, data) {
	var returnObject = {
		plainText: '',
		htmlText: ''
	};

	//build the header
	returnObject.plainText += (formHash[type] + + "\n");
	returnObject.htmlText += ("<h1>" + formHash[type] + "</h1>" + "\n");

	//build the content
	Object.keys(data).forEach(function(key) {

		if(key !== 'image') {
			//add the field
			returnObject.plainText += (key + ': ');
			returnObject.htmlText += ("<p><strong>" + key + ': </strong>');

			//add the value
			if(typeof data[key] == 'number') {
				returnObject.plainText += ("$" + (parseInt(data[key]) / 100) + '.00');
				returnObject.htmlText += ("$" + (parseInt(data[key]) / 100) + ".00 </p>");
			} else {
				returnObject.plainText += data[key];
				returnObject.htmlText += (data[key] + "</p>");
			}

			//return a line
			returnObject.plainText += "\n";
			returnObject.htmlText += "\n";
		}

	});

	return returnObject;
}

function collectResources(resource) {
	var serverAPI = this;
	var allPromises = [];

	console.log('in the collectResources');
	return new Promise(function(resolve, reject) {

		//before anything can be downloaded, make sure the db is up to date
		ahNutsFirebase._updateDB().then(function() {
			//once everything has been updated, work on this request
			//define the types of collections
			var requiredResources = serverAPI._allResources();

			//log to the user
			console.log('got this resource', resource);

			//distinguish which resources are being collected
			var requiredModels = requiredResources[resource.db][resource.form][resource.status];

			console.log('requiredModels', requiredModels);
			//build promises
			requiredModels.forEach(function(requirnments) {
				allPromises.push(new Promise(function(resolve, reject) {
					ahNutsFirebase.getDbData(requirnments).then(function(response) {
						resolve(response);
					}).catch(function(error) {
						reject(error);
					});
				}));
			});

			resolve(Promise.all(allPromises));

		}).catch(function(e) {
			console.log('the error:', e);
			reject(e);
		});

	});

}

function supplyGuess(gps) {
	//looking for current market
	var bestMarket;
	var guess = {};

	//based on the time, guess the best market
	var thisDate = this._getCurrentTime();
	var wkDay = thisDate.day;
	var minutesInDay = thisDate.mins;

	//load market hash
	var marketTimesHash = this._getMarketTimesHash();

	//get all markets for that day
	var daysMarkets = marketTimesHash[wkDay];

	//if there is more than one, guess the time
	if(daysMarkets.length > 1) {
		var bestRecord = 0;

		//check all times, pick the best one
		daysMarket.forEach(function(market) {

			//if(market.end)
		});

	} else bestMarket = daysMarkets[0];

	//add the market to the guess
	guess['market'] = bestMarket.name;
	
	var employeeProfile = this._getEmployee(bestMarket.id);
	employeeProfile = {name: '', id: ''};

	guess['employee'] = employeeProfile.name; //'Kevin Luna';
	guess['gross'] = this._getMarketGross(bestMarket.id); //82542;
	guess['marketFee'] = this._getMarketFee(bestMarket.id); //5900;
	guess['employeePay'] = this._calculatePay(guess['gross'], this._getMarketPayStructure(bestMarket.id)); //16700;
	guess['expenses'] = this._getEmployeeExpenses(employeeProfile.id); //8000;
	guess['bank'] = this._getMarketBank(bestMarket.id); //6000;
	guess['net'] = guess['gross'] - guess['marketFee'] - guess['employeePay'] - guess['expenses']; //45942;

	return guess;
}

function receiveForm(type, data) {
	var serverAPI = this;

	var mailSubject = serverAPI._buildMailSubject(type, data);
	var mailBody = serverAPI._buildMailBody(type, data);
	var fromEmployee = ('\"' + data.Name + '\" <employee@ah-nuts.com>'); //'"Nut Slinger" <employee@ah-nuts.com>'
	/*var attachements = {};
	if(data.Photo.binary !== null) {
		attachements = {
			name: data.Photo.src,
			binary: data.Photo.binary
		}
	} else attachements = null;*/
	
	//console.log(mailSubject, fromEmployee, mailBody);
	//return a promise
	return new Promise(function(resolve, reject) {

		mailCenter.sendEmail('"Ian McAllister" <ian@ah-nuts.com>', fromEmployee, mailSubject, mailBody/*, attachements*/)
		.then(function(response) {
			//if mail sent & filed to db correctly send affirmative
			resolve(response);
		}).catch(function(err) {
			//if mail not sent and/or db not written to send error
			reject(err);
		})
		
	});

}

function test() {
	return { items: [
			{placeholder:'testing'},
			{placeholder:'testing'},
			{placeholder:'testing'},
			{placeholder:'testing'},
			{placeholder:'testing'},
			{placeholder:'testing'},
			{placeholder:'testing'},
			{placeholder:'testing'}
			] 
		};
}

module.exports = api;