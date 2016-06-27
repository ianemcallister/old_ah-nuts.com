angular
    .module('marketReciept')
    .controller('successController', successController);

successController.$inject = ['$log'];

/* @ngInject */
function successController($log) {
	//var vm = this;
	$log.info('success controller');
}