angular
    .module('marketReceipt')
    .factory('backendSrvc', backendSrvc);

backendSrvc.$inject = ['$log', '$http'];

/* @ngInject */
function backendSrvc($log, $http) {
	var service = this;

	var backendSrvc = {
		_placeholders:_placeholders,
		_get:_get,
		_post:_post,
		_buildPossibleMarkets:_buildPossibleMarkets,
		getFormData:getFormData,
		getPossibleMarkets:getPossibleMarkets,
		loadAllForms:loadAllForms,
		getSuggestionData:getSuggestionData,
		submitFormData:submitFormData
	};

	function _placeholders(which) {
		if(which=='formData') {
			return {
				title:"Market Reciept",
				questions: [
					{
						"name":"Market",
						"datalist":true,
						"type":"text",
						"listName":"marketNameInput",
						"suggestion":"",
						"listValues": [
							"Anaheim Promenade",
							"Twila Reid",
							"Hunington Beach Pier",
							"Irvine Great Park",
							"Bixby Park - Tuesday",
							"Bixby Park - Saturday",
							"Irvine - Discovery",
							"Monrovia Street Fair",
							"Surf City Nights - Hunington"
						],
						"approvals": {
							"addressed":false,
							"value":null,
							"text":"OK?"
						},
						"styles": {
							"question": {
								"padding-left":"0px",
								"padding-top": "10px",
								"font-size":"1.5em"
							},
							"input": {
								"datalist": {
									"height":"56px",
									"padding-left":"0px",
									"padding-right":"0px",
									"font-size":"2em"
								},
								"inputWrapper": {
									"width":"100%",
									"height":"56px"
								}
							}
						},
						"classes": {
							"title": {
								"col-xs-4":true,
								"col-sm-4":true,
								"col-md-4":true,
								"col-ld-4":true,
								"form-control-label":true					
							},
							"input": {
								"col-xs-5":true,
								"col-sm-5":true,
								"col-md-5":true,
								"col-ld-5":true
							},
							"inputDiv": {
								"input-group": true,
								"pull-right": true,
								"has-success":false,
								"has-warning":false,
								"has-danger":false
							},
							"inputSpan": {
								"input-group-addon":true
							},
							"inputInput": {
								"form-control": true,
								"form-control-warning":false,
								"form-control-success":false
							},
							"approval": {
								"col-xs-2":true,
								"col-sm-2":true,
								"col-md-2":true,
								"col-ld-2":true,
								"round-button":true,
								"pull-right":true			
							},
							"approvalDiv": {
								"round-button-circle-free":true,
								"round-button-circle-approved":false,
								"round-button-circle-revised":false
							},
							"approvalA": {
								"round-button":true
							}
						}
					},
					{
						"name":"Name",
						"datalist":false,
						"suggestion":"",
						"type":"text",
						"approvals": {
							"addressed":false,
							"value":null,
							"text":"OK?"
						},
						"styles": {
							"question": {
								"padding-left":"0px",
								"padding-top": "10px",
								"font-size":"1.5em"
							},
							"input": {
								"datalist": {
									"height":"56px",
									"padding-left":"0px",
									"padding-right":"0px",
									"font-size":"2em"
								},
								"inputWrapper": {
									"width":"100%",
									"height":"56px"
								}
							}
						},
						"classes": {
							"title": {
								"col-xs-4":true,
								"col-sm-4":true,
								"col-md-4":true,
								"col-ld-4":true,
								"form-control-label":true					
							},
							"input": {
								"col-xs-5":true,
								"col-sm-5":true,
								"col-md-5":true,
								"col-ld-5":true
							},
							"inputDiv": {
								"input-group": true,
								"pull-right": true,
								"has-success":false,
								"has-warning":false,
								"has-danger":false
							},
							"inputSpan": {
								"input-group-addon":true
							},
							"inputInput": {
								"form-control": true,
								"form-control-warning":false,
								"form-control-success":false
							},
							"approval": {
								"col-xs-2":true,
								"col-sm-2":true,
								"col-md-2":true,
								"col-ld-2":true,
								"round-button":true,
								"pull-right":true			
							},
							"approvalDiv": {
								"round-button-circle-free":true,
								"round-button-circle-approved":false,
								"round-button-circle-revised":false
							},
							"approvalA": {
								"round-button":true
							}
						}
					},
					{
						"name":"Gross",
						"datalist":false,
						"suggestion":"",
						"type":"number",
						"approvals": {
							"addressed":false,
							"value":null,
							"text":"OK?"
						},
						"styles": {
							"question": {
								"padding-left":"0px",
								"padding-top": "10px",
								"font-size":"1.5em"
							},
							"input": {
								"datalist": {
									"height":"56px",
									"padding-left":"0px",
									"padding-right":"0px",
									"font-size":"2em"
								},
								"inputWrapper": {
									"width":"100%",
									"height":"56px"
								}
							}
						},
						"classes": {
							"title": {
								"col-xs-4":true,
								"col-sm-4":true,
								"col-md-4":true,
								"col-ld-4":true,
								"form-control-label":true					
							},
							"input": {
								"col-xs-5":true,
								"col-sm-5":true,
								"col-md-5":true,
								"col-ld-5":true
							},
							"inputDiv": {
								"input-group": true,
								"pull-right": true,
								"has-success":false,
								"has-warning":false,
								"has-danger":false
							},
							"inputSpan": {
								"input-group-addon":true
							},
							"inputInput": {
								"form-control": true,
								"form-control-warning":false,
								"form-control-success":false
							},
							"approval": {
								"col-xs-2":true,
								"col-sm-2":true,
								"col-md-2":true,
								"col-ld-2":true,
								"round-button":true,
								"pull-right":true			
							},
							"approvalDiv": {
								"round-button-circle-free":true,
								"round-button-circle-approved":false,
								"round-button-circle-revised":false
							},
							"approvalA": {
								"round-button":true
							}
						}
					},
					{
						"name":"Fee",
						"datalist":false,
						"suggestion":"",
						"type":"number",
						"approvals": {
							"addressed":false,
							"value":null,
							"text":"OK?"
						},
						"styles": {
							"question": {
								"padding-left":"0px",
								"padding-top": "10px",
								"font-size":"1.5em"
							},
							"input": {
								"datalist": {
									"height":"56px",
									"padding-left":"0px",
									"padding-right":"0px",
									"font-size":"2em"
								},
								"inputWrapper": {
									"width":"100%",
									"height":"56px"
								}
							}
						},
						"classes": {
							"title": {
								"col-xs-4":true,
								"col-sm-4":true,
								"col-md-4":true,
								"col-ld-4":true,
								"form-control-label":true					
							},
							"input": {
								"col-xs-5":true,
								"col-sm-5":true,
								"col-md-5":true,
								"col-ld-5":true
							},
							"inputDiv": {
								"input-group": true,
								"pull-right": true,
								"has-success":false,
								"has-warning":false,
								"has-danger":false
							},
							"inputSpan": {
								"input-group-addon":true
							},
							"inputInput": {
								"form-control": true,
								"form-control-warning":false,
								"form-control-success":false
							},
							"approval": {
								"col-xs-2":true,
								"col-sm-2":true,
								"col-md-2":true,
								"col-ld-2":true,
								"round-button":true,
								"pull-right":true			
							},
							"approvalDiv": {
								"round-button-circle-free":true,
								"round-button-circle-approved":false,
								"round-button-circle-revised":false
							},
							"approvalA": {
								"round-button":true
							}
						}
					},
					{
						"name":"Pay",
						"datalist":false,
						"suggestion":"",
						"type":"number",
						"approvals": {
							"addressed":false,
							"value":null,
							"text":"OK?"
						},
						"styles": {
							"question": {
								"padding-left":"0px",
								"padding-top": "10px",
								"font-size":"1.5em"
							},
							"input": {
								"datalist": {
									"height":"56px",
									"padding-left":"0px",
									"padding-right":"0px",
									"font-size":"2em"
								},
								"inputWrapper": {
									"width":"100%",
									"height":"56px"
								}
							}
						},
						"classes": {
							"title": {
								"col-xs-4":true,
								"col-sm-4":true,
								"col-md-4":true,
								"col-ld-4":true,
								"form-control-label":true					
							},
							"input": {
								"col-xs-5":true,
								"col-sm-5":true,
								"col-md-5":true,
								"col-ld-5":true
							},
							"inputDiv": {
								"input-group": true,
								"pull-right": true,
								"has-success":false,
								"has-warning":false,
								"has-danger":false
							},
							"inputSpan": {
								"input-group-addon":true
							},
							"inputInput": {
								"form-control": true,
								"form-control-warning":false,
								"form-control-success":false
							},
							"approval": {
								"col-xs-2":true,
								"col-sm-2":true,
								"col-md-2":true,
								"col-ld-2":true,
								"round-button":true,
								"pull-right":true			
							},
							"approvalDiv": {
								"round-button-circle-free":true,
								"round-button-circle-approved":false,
								"round-button-circle-revised":false
							},
							"approvalA": {
								"round-button":true
							}
						}
					},
					{
						"name":"Reciepts",
						"datalist":false,
						"suggestion":"",
						"type":"number",
						"approvals": {
							"addressed":false,
							"value":null,
							"text":"OK?"
						},
						"styles": {
							"question": {
								"padding-left":"0px",
								"padding-top": "10px",
								"font-size":"1.5em"
							},
							"input": {
								"datalist": {
									"height":"56px",
									"padding-left":"0px",
									"padding-right":"0px",
									"font-size":"2em"
								},
								"inputWrapper": {
									"width":"100%",
									"height":"56px"
								}
							}
						},
						"classes": {
							"title": {
								"col-xs-4":true,
								"col-sm-4":true,
								"col-md-4":true,
								"col-ld-4":true,
								"form-control-label":true					
							},
							"input": {
								"col-xs-5":true,
								"col-sm-5":true,
								"col-md-5":true,
								"col-ld-5":true
							},
							"inputDiv": {
								"input-group": true,
								"pull-right": true,
								"has-success":false,
								"has-warning":false,
								"has-danger":false
							},
							"inputSpan": {
								"input-group-addon":true
							},
							"inputInput": {
								"form-control": true,
								"form-control-warning":false,
								"form-control-success":false
							},
							"approval": {
								"col-xs-2":true,
								"col-sm-2":true,
								"col-md-2":true,
								"col-ld-2":true,
								"round-button":true,
								"pull-right":true			
							},
							"approvalDiv": {
								"round-button-circle-free":true,
								"round-button-circle-approved":false,
								"round-button-circle-revised":false
							},
							"approvalA": {
								"round-button":true
							}
						}
					},
					{
						"name":"Bank",
						"datalist":false,
						"suggestion":"",
						"type":"number",
						"approvals": {
							"addressed":false,
							"value":null,
							"text":"OK?"
						},
						"styles": {
							"question": {
								"padding-left":"0px",
								"padding-top": "10px",
								"font-size":"1.5em"
							},
							"input": {
								"datalist": {
									"height":"56px",
									"padding-left":"0px",
									"padding-right":"0px",
									"font-size":"2em"
								},
								"inputWrapper": {
									"width":"100%",
									"height":"56px"
								}
							}
						},
						"classes": {
							"title": {
								"col-xs-4":true,
								"col-sm-4":true,
								"col-md-4":true,
								"col-ld-4":true,
								"form-control-label":true				
							},
							"input": {
								"col-xs-5":true,
								"col-sm-5":true,
								"col-md-5":true,
								"col-ld-5":true
							},
							"inputDiv": {
								"input-group": true,
								"pull-right": true,
								"has-success":false,
								"has-warning":false,
								"has-danger":false
							},
							"inputSpan": {
								"input-group-addon":true
							},
							"inputInput": {
								"form-control": true,
								"form-control-warning":false,
								"form-control-success":false
							},
							"approval": {
								"col-xs-2":true,
								"col-sm-2":true,
								"col-md-2":true,
								"col-ld-2":true,
								"round-button":true,
								"pull-right":true			
							},
							"approvalDiv": {
								"round-button-circle-free":true,
								"round-button-circle-approved":false,
								"round-button-circle-revised":false
							},
							"approvalA": {
								"round-button":true
							}
						}
					},
					{
						"name":"Due",
						"datalist":false,
						"suggestion":"",
						"type":"number",
						"description":"$ should be returned to Ah-Nuts",
						"approvals": {
							"addressed":false,
							"value":null,
							"text":"OK?"
						},
						"styles": {
							"question": {
								"padding-left":"0px",
								"padding-top": "10px",
								"font-size":"1.5em"
							},
							"input": {
								"datalist": {
									"height":"56px",
									"padding-left":"0px",
									"padding-right":"0px",
									"font-size":"2em"
								},
								"inputWrapper": {
									"width":"100%",
									"height":"56px"
								}
							}
						},
						"classes": {
							"title": {
								"col-xs-4":true,
								"col-sm-4":true,
								"col-md-4":true,
								"col-ld-4":true,
								"form-control-label":true					
							},
							"input": {
								"col-xs-5":true,
								"col-sm-5":true,
								"col-md-5":true,
								"col-ld-5":true
							},
							"inputDiv": {
								"input-group": true,
								"pull-right": true,
								"has-success":false,
								"has-warning":false,
								"has-danger":false
							},
							"inputSpan": {
								"input-group-addon":true
							},
							"inputInput": {
								"form-control": true,
								"form-control-warning":false,
								"form-control-success":false
							},
							"approval": {
								"col-xs-2":true,
								"col-sm-2":true,
								"col-md-2":true,
								"col-ld-2":true,
								"round-button":true,
								"pull-right":true			
							},
							"approvalDiv": {
								"round-button-circle-free":true,
								"round-button-circle-approved":false,
								"round-button-circle-revised":false
							},
							"approvalA": {
								"round-button":true
							}
						}
					}
				],
				anotherTest:8375
			}
		}
		if(which=='marketPossibilities') {
			return {
				reports_due: [
					{
						employee:"Kevin Luna",
						name:"Bixby Park - Tuesday"
					}
				],
				reports_past_due: [
					{
						dueDate:"06/28/16",
						employee:"Kevin Luna",
						name:"Bixby Park - Tuesday"
					}
				]
			}
		}
	}

	function _get(dir, filename) {
		var thisResponse = null;

		console.log("dir", dir, "filename", filename);

		return new Promise(function(resolve, reject) {

			$http({
				method: 'GET',
				url: dir + filename
			}).then(function successCallback(response) {
				
				resolve(response.data);
				
			}, function errorCallback(error) {
				reject(error);
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

		console.log('got to _buildPossibleMarkets', resources, reportsDue !== null, reportsPastDue !== null);

		if(reportsDue !== null) {
			//build the reports due
			returnObject['reports_due'] = [];
			Object.keys(reportsDue).forEach(function(key) {

				returnObject.reports_due.push({
					name: allLocations[reportsDue[key].market].name,
					employee: (allEmployees[reportsDue[key].scheduled].first_name + ' ' + allEmployees[reportsDue[key].scheduled].last_name)
				});

			});
		}

		if(reportsPastDue !== null) {
			//build the reports past due
			returnObject['reports_past_due'] = [];
			Object.keys(reportsPastDue).forEach(function(key) {

				returnObject.reports_past_due.push({
					name: allLocations[reportsPastDue[key].market].name,
					employee: (allEmployees[reportsPastDue[key].scheduled].first_name + ' ' + allEmployees[reportsPastDue[key].scheduled].last_name),
					dueDate: (key.slice(4,6) + '/' + key.slice(6,8) + '/' + key.slice(2,4))
				});
			});
		}

		console.log('sending this back', returnObject);
		return returnObject
	}

	function getFormData(form) {
		var service = this;
		//return service._placeholders('formData');
		service.allForms = {"marketReceipt":'marketReceipt.json'};

		var url = service.allForms[form];
		
		return new Promise(function(resolve, rej) {
			//check for existing values
			if(typeof service[form] !== 'undefined') {
				$log.info('service[form]',service[form]);
				resolve(service[form]);
			} else { 
				service._get('assets/', url).then(function(response) {
					service[form] = response;
					$log.info('service[form]',service[form]);
					resolve(service[form]);
				}).catch(function(error) {
					rej(error);
				});
			}

		});
	
	}

	function getPossibleMarkets() {
		var service = this;
		console.log('got here, getPossibleMarkets');
		//return service._placeholders('marketPossibilities');
		return new Promise(function(resolve, reject) {
			//TODO: TAKE THIS OUT LATER
			//resolve(service._placeholders('marketPossibilities'));
			console.log('going to getPossibleMarkets');
			//collect the resources
			service._get("db/form/", 'market_receipts/due').then(function(response) {
				console.log("getPossibleMarkets", response);
				//from the response build the returnable object
				var possibleMarketsList = service._buildPossibleMarkets(response);
				//return the possibleMarketsList
				console.log("possibleMarketsList", possibleMarketsList);
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