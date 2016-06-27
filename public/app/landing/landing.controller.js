angular
    .module('marketReceipt')
    .controller('landingController', landingController);

landingController.$inject = ['$log', '$location'];

/* @ngInject */
function landingController($log, $location) {
	var vm = this;

	vm.redirectTo = function(formName) {
		$log.info('clicked', formName);
		$location.path('/'+formName);
	}
}