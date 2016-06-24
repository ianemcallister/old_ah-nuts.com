angular
	.module('marketReciept')
	.directive('recieptForm', recieptForm);

/* @ngInject */
function recieptForm() {
	var directive = {
		restrict: 'AECM',
		templateUrl: 'app/form/form.directive.htm',
		replace: true,
		scope: {},
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
    	//var vm = this;
    	console.log('in the form');
	}

	return directive;
}