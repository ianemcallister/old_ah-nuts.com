angular
	.module('marketReciept')
	.directive('navbar', navbar);

/* @ngInject */
function navbar() {
	var directive = {
		restrict: 'AECM',
		templateUrl: 'app/navbar/navbar.directive.htm',
		replace: true,
		scope: {},
		link: linkFunc,
		controller: navbarController,
		controllerAs: 'vm',
		bindToController: true
	}

	/* @ngInject */
	function linkFunc(scope, el, attr, ctrl) {
    }

    navbarController.$inject = ['$scope', '$log'];
    
    /* @ngInject */
    function navbarController($scope, $log) {
    	//var vm = this;
	}

	return directive;
}