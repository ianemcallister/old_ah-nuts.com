angular
    .module('marketReceipt')
    .controller('marketReceiptController', marketReceiptController);

marketReceiptController.$inject = ['$log', 'backendSrvc', 'formData', 'marketPossibilities', 'suggestions', 'searchParams'];

/* @ngInject */
function marketReceiptController($log, backendSrvc, formData, marketPossibilities, suggestions, searchParams) {
	var vm = this;

	$log.info('in the marketReceiptController');

	//local variables
	vm.data = formData;
	vm.possibleMarkets = marketPossibilities;
	vm.suggestions = suggestions;

	$log.info('searchParams', searchParams, Object.keys(searchParams).length);
	$log.info('suggestions', suggestions);

	//if a market has been selected, show the prefilled market
	if(Object.keys(searchParams).length == 0) vm.showForm = false;
	else vm.showForm = true;
	
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