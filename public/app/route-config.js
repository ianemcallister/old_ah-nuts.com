angular
	.module('marketReceipt')
	.config(config);
/* @ngInject */
function config($routeProvider) {
	$routeProvider
    .when('/', {
        templateUrl: 'app/landing/landing.htm',
        controller: 'landingController',
        controllerAs: 'vm',
        resolve: {	/* @ngInject */
            loadData:loadData
        }
    })
    .when('/marketReceipt', {
        templateUrl: 'app/marketReceipt/marketReceipt.htm',
        controller: 'marketReceiptController',
        controllerAs: 'vm',
        reloadOnSearch: true,
        resolve: { /* @ngInject */
            formData: function(backendSrvc) {
                //return {'resolveTest':'good test'};
                return backendSrvc.getFormData('marketReceipt');
            },
            marketPossibilities: function(backendSrvc/*, $routeParams*/) {
                //return {1:'Something', 2:'something else'}
                return backendSrvc.getPossibleMarkets();
            },
            suggestions: function(backendSrvc, $routeParams) {
                return backendSrvc.getSuggestionData($routeParams);
            },
            searchParams: function($routeParams) { return $routeParams; }
        }
    })
    .when('/success', {
        templateUrl: 'app/success/success.htm',
        controller: 'successController',
        controllerAs: 'vm'
    })
    .otherwise({
        redirectTo: '/'
    });
}

function loadData(backendSrvc) {
	backendSrvc.loadAllForms();
}