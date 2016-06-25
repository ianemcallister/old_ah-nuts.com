angular
    .module('marketReciept')
    .factory('backendSrvc', backendSrvc);

backendSrvc.$inject = ['$log', '$http'];

/* @ngInject */
function backendSrvc($log, $http) {
	var service = this;

	var backendSrvc = {
		_get:_get,
		_post:_post,
		getFormData:getFormData,
		loadAllForms:loadAllForms
	};

	function _get(filename) {
		var thisResponse = null;

		return new Promise(function(resolve, reject) {

			$http({
				method: 'GET',
				url: 'assets/' + filename
			}).then(function successCallback(response) {
				
				resolve(response.data);
				
			}, function errorCallback(response) {
				console.log('Error:',response);
			});

		});

	}

	function _post() {

	}

	function getFormData(form) {
		var service = this;

		service.allForms = {"marketReciept":'marketReciept.json'};

		var url = service.allForms[form];
		
		return new Promise(function(resolve, rej) {
			//check for existing values
			if(typeof service[form] !== 'undefined')
				resolve(service[form]);
			else { 
				service._get(url).then(function(response) {
					service[form] = response;
					resolve(service[form]);
				});
			}

		});
	
	}

	function loadAllForms() {
		var service = this;

		service.allForms = {"marketReciept":'marketReciept.json'};
	
		console.log(service.allForms);

		//run through each form
		Object.keys(service.allForms).forEach(function(form) {
			var url = service.allForms[form];

			service._get(url).then(function(response) {
				service[form] = response.data;
			});

		});

	}

	return backendSrvc;
}