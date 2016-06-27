angular
    .module('marketReceipt')
    .controller('marketReceiptController', marketReceiptController);

marketReceiptController.$inject = ['$log', 'backendSrvc', 'formData'];

/* @ngInject */
function marketReceiptController($log, backendSrvc, formData) {
	var vm = this;
	vm.data = formData;

	var titleClasses = {
		'col-xs-5':true,
		'col-sm-5':true,
		'col-md-5':true,
		'col-lg-5':true		
	};

	var inputClasses = {
		'col-xs-7':true,
		'col-sm-7':true,
		'col-md-7':true,
		'col-lg-7':true
	};

}