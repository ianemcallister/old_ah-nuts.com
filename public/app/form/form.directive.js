angular
	.module('marketReceipt')
	.directive('recieptForm', recieptForm);

/* @ngInject */
function recieptForm() {
	var directive = {
		restrict: 'AECM',
		templateUrl: 'app/form/form.directive.htm',
		replace: true,
		scope: {
			data: '='
		},
		link: linkFunc,
		controller: recieptForm,
		controllerAs: 'vm',
		bindToController: true
	}

	/* @ngInject */
	function linkFunc(scope, el, attr, ctrl) {
    }

    recieptForm.$inject = ['$scope', '$log', '$location', 'backendSrvc'];
    
    /* @ngInject */
    function recieptForm($scope, $log, $location, backendSrvc) {
		var vm = this;

		//local variables
		var totalFields = 0;
		var fieldsHash = {};

		//set view model values
		vm.currentDate = new Date();
		vm.uploadedImage = {
			src: 'Market_Image.jpg',
			binary: null
		};

		vm['inputs'] = {};
		vm['approvals'] = {};
		vm['submitBtnClasses'] = {
			"btn":true,
			"btn-danger":true,
			"btn-success":false,
			"col-xs-12":true,
			"col-sm-12":true,
			"col-md-12":true,
			"col-lg-12":true
		}

		//create the needed objects
		Object.keys(vm.data.questions).forEach(function(key) {
			var name = vm.data.questions[key].name;

			//add approval values
			vm.approvals[name] = {
				"addressed":false,
				"value":null,
				"text":'OK?'
			}

			//add input values
			vm.inputs[name] = {};
			vm.inputs[name].value = '';
			vm.inputs[name].suggestion = '415';

			//build fields hash
			fieldsHash[name] = totalFields;

			//incriment fields count
			totalFields++;

		});

		//get suggested values
		vm.inputs['Market'].suggestion = 'Surf City';
		vm.inputs['Name'].suggestion = 'Ahmed';
		vm.inputs['Gross'].suggestion = 415;
		vm.inputs['Fee'].suggestion = 42;
		vm.inputs['Pay'].suggestion = 83;
		vm.inputs['Reciepts'].suggestion = 10;
		vm.inputs['Bank'].suggestion = 60;
		vm.inputs['Due'].suggestion = 220;

		function unlockSubmitBtn() {
			//
			//$log.info('Unlocking btn');
			vm.submitBtnClasses['btn-danger'] = false;
			vm.submitBtnClasses['btn-success'] = true;
		}

		function lockSubmitBtn() {
			//
			//$log.info('Locking btn');
			vm.submitBtnClasses['btn-danger'] = true;
			vm.submitBtnClasses['btn-success'] = false;
		}

		function countApproved() {
			var numberOf = 0;

			Object.keys(vm.data.questions).forEach(function(key) {
				//define variable
				var isApproved = vm.data.questions[key].approvals.addressed;
				//check value
				if(isApproved) numberOf++;
			});

			//$log.info(numberOf, totalFields, numberOf==totalFields);
			if(numberOf==totalFields) unlockSubmitBtn();
			else lockSubmitBtn();

			return numberOf;
		}

		function getPhoto() {
			var preview = document.getElementById('recieptImage')
			var file = document.getElementById('Photo').files[0];
			var reader = new FileReader();
			var imagebinary = null;

			reader.addEventListener('load', function() {
				imagebinary = reader.result;
				preview.src = imagebinary;

			}, false);

			if (file) {
				//preview the image
				reader.readAsDataURL(file);

				//save the value to the variable
				vm.inputs['Photo'] = {
					src: 'Market_Reciept.jpg',
					binary: imagebinary
				};				
			}

			/*r.onloadend = function(e) {
				var data = e.target.result;
				
				$log.info('got here');

				//save the value to the variable
				vm.inputs['Photo'] = {
					src: 'Market_Reciept.jpg',
					binary: data
				}

				$log.info('file loaded', vm.inputs['Photo']);
			}
			$log.info('got here');
			r.readAsDataURL(file);*/
		}

		vm.refreshApprovals = function() {
			//loop through all questions
			Object.keys(vm.data.questions).forEach(function(key) {
				var recordName = vm.data.questions[key].name;
				
				//reset suggestions

				//reset values
				vm.inputs[recordName].value = '';

				//set values
				vm.data.questions[key].approvals.addressed = false;
				vm.data.questions[key].approvals.value = null;
				vm.data.questions[key].approvals.text = "OK?";

				//set classes
				vm.data.questions[key].classes.approvalDiv['round-button-circle-free'] = true;
				vm.data.questions[key].classes.approvalDiv['round-button-circle-approved'] = false;
				vm.data.questions[key].classes.approvalDiv['round-button-circle-revised'] = false;
				
				vm.data.questions[key].classes.inputDiv['has-success'] = false;
				vm.data.questions[key].classes.inputDiv['has-warning'] = false;
				vm.data.questions[key].classes.inputDiv['has-danger'] = false;
			});

			countApproved();
		}

		vm.changed = function(fieldName) {
			var recordNum = fieldsHash[fieldName];
			//notify the record being changed
			//$log.info(fieldName);

			//update the approval button
			vm.data.questions[recordNum].approvals.addressed = true;
			vm.data.questions[recordNum].approvals.value = true;
			vm.data.questions[recordNum].approvals.text = "NO!";

			//change the class
			vm.data.questions[recordNum].classes.approvalDiv['round-button-circle-free'] = false;
			vm.data.questions[recordNum].classes.approvalDiv['round-button-circle-revised'] = true;
			
			//change the input class
			vm.data.questions[recordNum].classes.inputDiv['has-danger'] = true;

			countApproved();
		}

		vm.approveField = function(fieldName) {
			var recordNum = fieldsHash[fieldName];
			var isApproved = vm.data.questions[recordNum].approvals.addressed;
				
			if(!isApproved) {

				//update the values
				vm.inputs[fieldName].value = vm.inputs[fieldName].suggestion;

				//update the button
				vm.data.questions[recordNum].approvals.addressed = true;
				vm.data.questions[recordNum].approvals.value = true;
				vm.data.questions[recordNum].approvals.text = "YES!";
				
				//change the class
				vm.data.questions[recordNum].classes.approvalDiv['round-button-circle-free'] = false;
				vm.data.questions[recordNum].classes.approvalDiv['round-button-circle-approved'] = true;
				
				//change the input class
				vm.data.questions[recordNum].classes.inputDiv['has-success'] = true;

				countApproved();
				
			}

			//$log.info(fieldName);
		}

		$scope.photoAdded = function() {
			var recordNum = fieldsHash['Photo'];

			//get the photo
			getPhoto();

			//update the values
			$log.info(vm.inputs['Photo']);

			//update the button
			vm.data.questions[recordNum].approvals.addressed = true;
			vm.data.questions[recordNum].approvals.value = true;

			//change the input class
			vm.data.questions[recordNum].classes.inputDiv['has-success'] = true;

			countApproved();

			//notify the user
			//$log.info('added a photo', vm.uploadedImage);

			//accesssed through jquery so apply these changes
			$scope.$apply();
		}

		vm.submitForm = function() {

			if(countApproved() == totalFields) {
				var deliveryObject = {};

				Object.keys(vm.inputs).forEach(function(key) {
					if(key !== 'Photo') {
						//for not photos add values
						if(typeof vm.inputs[key].value == 'number')
							deliveryObject[key] = vm.inputs[key].value * 100;
						else deliveryObject[key] = vm.inputs[key].value;
					} else {
						//if it is a photo, copy directly
						deliveryObject[key] = vm.inputs[key];
					}
				});

				//send the values
				backendSrvc.submitFormData(deliveryObject)
				.then(function(response) {
					//notify the user
					$log.info('submitted!', response);

					//if successful, redirect
					$location.path('/success');
					$scope.$apply();

				}).catch(function(error) {
					$log.info('Error:', error);
				});

				
			} else {

				//notify the user
				console.log('need to finish the fields');
			}
		}

		//automatically run the refresh
		vm.refreshApprovals();
	}

	return directive;
}