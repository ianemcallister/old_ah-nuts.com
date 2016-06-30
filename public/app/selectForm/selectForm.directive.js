angular
	.module('marketReceipt')
	.directive('selectPrefilledForm', selectPrefilledForm);

/* @ngInject */
function selectPrefilledForm() {
	var directive = {
		restrict: 'AECM',
		templateUrl: 'app/selectForm/selectForm.directive.htm',
		replace: true,
		scope: {
			data: '='
		},
		link: linkFunc,
		controller: selectPrefilledFormController,
		controllerAs: 'vm',
		bindToController: true
	}

	/* @ngInject */
	function linkFunc(scope, el, attr, ctrl) {
    }

    selectPrefilledFormController.$inject = ['$scope', '$log', '$location'];
    
    /* @ngInject */
    function selectPrefilledFormController($scope, $log, $location) {
		var vm = this;

		function buildprefilledMarketFormPath(optionValues) {
			return {
				path:'/marketReceipt',
				params: {
					date: '20160627',
					start: '1700',
					zip: '00000',
					loc: '01'
				}
			};
		}

		vm.selectOption = function(selection) {
			var optionValues = vm.data[selection];
			
			var marketForm = buildprefilledMarketFormPath(optionValues);
			
			console.log(marketForm);

			//send the user to the requested form
			$location.path(marketForm.path).search(marketForm.params);
		
		}
	}

	return directive;
}