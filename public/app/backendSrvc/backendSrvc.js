angular
    .module('marketReceipt')
    .factory('backendSrvc', backendSrvc);

backendSrvc.$inject = ['$log', '$http'];

/* @ngInject */
function backendSrvc($log, $http) {
	var service = this;

	var backendSrvc = {
		_get:_get,
		_post:_post,
		_buildPossibleMarkets:_buildPossibleMarkets,
		getFormData:getFormData,
		getPossibleMarkets:getPossibleMarkets,
		loadAllForms:loadAllForms,
		getSuggestionData:getSuggestionData,
		submitFormData:submitFormData
	};

	function _get(dir, filename) {
		var thisResponse = null;

		console.log("dir", dir, "filename", filename);

		return new Promise(function(resolve, reject) {

			$http({
				method: 'GET',
				url: dir + filename
			}).then(function successCallback(response) {
				
				resolve(response.data);
				
			}, function errorCallback(response) {
				console.log('Error:',response);
			});

		});

	}

	function _post(data) {

		$log.info('got this in _post', data);

		return new Promise(function(resolve, reject) {

			var result = $http.post('forms/marketReciept', data)
			.then(function successCallback(response) {
				resolve('success');
			}, function errorCallback(response) {
				resolve('error');
			});

			console.log(result);
		});

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

	function getFormData(form) {
		var service = this;

		service.allForms = {"marketReceipt":'marketReceipt.json'};

		var url = service.allForms[form];
		
		return new Promise(function(resolve, rej) {
			//check for existing values
			if(typeof service[form] !== 'undefined')
				resolve(service[form]);
			else { 
				service._get('assets/', url).then(function(response) {
					service[form] = response;
					resolve(service[form]);
				});
			}

		});
	
	}

	function getPossibleMarkets() {
		var service = this;

		return new Promise(function(resolve, reject) {
			//collect the resources
			service._get("/db/form/", 'market_receipts/due').then(function(response) {
				//from the response build the returnable object
				var possibleMarketsList = service._buildPossibleMarkets(response);
				//return the possibleMarketsList
				resolve(possibleMarketsList);
			}).catch(function(error) {
				reject(error);
			});

		});

	}

	function loadAllForms() {
		var service = this;

		service.allForms = {"marketReceipt":'marketReceipt.json'};
	
		console.log(service.allForms);

		//run through each form
		Object.keys(service.allForms).forEach(function(form) {
			var url = service.allForms[form];

			service._get('assets/', url).then(function(response) {
				service[form] = response.data;
			});

		});

	}

	function getSuggestionData(params) {
		//TODO TAKE THIS OUT LATER
		console.log("got these", params);
		//temporary suggestions
		return {
			'Market':'Surf City',
			'Name':'Ahmed',
			'Gross':415,
			'Fee':42,
			'Pay':83,
			'Reciepts':10,
			'Bank':60,
			'Due':220
		}
	}

	function submitFormData(data) {
		var service = this;

		//notify the user
		$log.info('got this', data);

		
		return new Promise(function(resolve, reject) {

			//submit form
			service._post(data).then(function(response) {
				//notify the user
				//console.log('response:', response);
				//when success is achieved redirect
				resolve(response);
			}).catch(function(err) {
				//console.log('Error:', err);
				reject(err);
			});

		});

	}

	return backendSrvc;
}