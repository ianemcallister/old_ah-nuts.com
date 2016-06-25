angular
	.module('marketReciept')
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

    recieptForm.$inject = ['$scope', '$log'];
    
    /* @ngInject */
    function recieptForm($scope, $log) {
		var vm = this;

		//local variables
		var totalFields = 0;
		var fieldsHash = {};

		//set view model values
		vm.currentDate = new Date();
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

		//list the objects
		$log.info(vm.inputs);

		//add suggestion values
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
			$log.info('Unlocking btn');
			vm.submitBtnClasses['btn-danger'] = false;
			vm.submitBtnClasses['btn-success'] = true;
		}

		function lockSubmitBtn() {
			//
			$log.info('Locking btn');
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

			$log.info(numberOf, totalFields,numberOf==totalFields);
			if(numberOf==totalFields) unlockSubmitBtn();
			else lockSubmitBtn();

			return numberOf;
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
			$log.info(fieldName);

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

			$log.info(fieldName);

		}

		vm.submitForm = function() {

			if(countApproved() == totalFields)
				console.log('submitted!');
			else 
				console.log('need to finish the fields');

			
		}
	}

	return directive;
}