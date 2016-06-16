var React = require('react');

var MarketNameInput = require('MarketNameInput');
var EmployeeNameInput = require('EmployeeNameInput');
var DateInput = require('DateInput');
var GrossSalesInput = require('GrossSalesInput');
var MarketFeeInput = require('MarketFeeInput');
var EmployeePayInput = require('EmployeePayInput');
var EmployeeExpensesInput = require('EmployeeExpensesInput');
var BankInput = require('BankInput');
var NetProfitsInput = require('NetProfitsInput');
var PhotoUploadInput = require('PhotoUploadInput');

var SubmissionForm = React.createClass({
	render: function() {
		var testing = 'this is a test';
		var guess = this.state.marketGuess;

		return (
			<div className="container">
				<form>
					<MarketNameInput />
					<EmployeeNameInput />
					<DateInput />
					<GrossSalesInput />
					<MarketFeeInput />
					<EmployeePayInput />
					<EmployeeExpensesInput />
					<BankInput />
					<NetProfitsInput />
					<PhotoUploadInput />

					<div className='row'>
						<div className="container">
							<div className='col-xs-12 col-sm-12 col-md-12'>
							<label htmlFor="submitButton"></label>
							<input type='submit' id='submitButton' name='submitButton' value='Submit'/>
							</div>
						</div>
					</div>
				</form>
			</div>
		);

	}

});

module.exports = SubmissionForm;