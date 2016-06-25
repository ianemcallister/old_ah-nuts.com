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

		//set view model values
		vm.currentDate = new Date();
		vm['inputs'] = {};

		//create the needed objects
		Object.keys(vm.data.questions).forEach(function(key) {
			
			vm.inputs[vm.data.questions[key].name] = '';
		});

		$log.info(vm.inputs);

	}

	return directive;
}