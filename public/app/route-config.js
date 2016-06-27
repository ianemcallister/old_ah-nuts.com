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
        resolve: { /* @ngInject */
            formData: function(backendSrvc) {
                //return {'resolveTest':'good test'};
                return backendSrvc.getFormData('marketReceipt');
            }
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