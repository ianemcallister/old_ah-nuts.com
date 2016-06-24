angular
    .module('marketReciept')
    .controller('mainController', mainController);

mainController.$inject = ['$log' ];

/* @ngInject */
function mainController($log) {
	//var vm = this;

	$log.info('we\'re in the controller');
	console.log('testing');
}