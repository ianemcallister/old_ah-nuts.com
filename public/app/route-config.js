angular
	.module('marketReciept')
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
    .when('/marketReciept', {
        templateUrl: 'app/marketReciept/marketReciept.htm',
        controller: 'marketRecieptController',
        controllerAs: 'vm',
        resolve: { /* @ngInject */
        	formData: function(backendSrvc) {
        		//return {'resolveTest':'good test'};
        		return backendSrvc.getFormData('marketReciept');
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