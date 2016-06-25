angular
    .module('marketReciept')
    .controller('mainController', mainController);

mainController.$inject = ['$log' ];

/* @ngInject */
function mainController($log) {
	var vm = this;

	$log.info('we\'re in the controller');
	console.log('testing');
	
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

	vm.data = {
		'title':"Market Reciept",
		'anotherTest':8375,
		"questions": [
			{"name":'Market Name', 'inputClasses':inputClasses, 'titleClasses': titleClasses },
			{"name":'Employee', 'inputClasses':inputClasses, 'titleClasses': titleClasses },
			{"name":'Gross Sales', 'inputClasses':inputClasses, 'titleClasses': titleClasses },
			{"name":'Market Fee', 'inputClasses':inputClasses, 'titleClasses': titleClasses },
			{"name":'Employee Pay', 'inputClasses':inputClasses, 'titleClasses': titleClasses },
			{"name":'Employee\'s Expenses', 'inputClasses':inputClasses, 'titleClasses': titleClasses },
			{"name":'Starting Bank', 'inputClasses':inputClasses, 'titleClasses': titleClasses },
			{"name":'Due To Ah-Nuts', 'inputClasses':inputClasses, 'titleClasses': titleClasses }
		]
	}
}