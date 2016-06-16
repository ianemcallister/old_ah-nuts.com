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
		return (
			<div className="container">
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
						<label htmlFor="submitButton"></label>
						<input type='submit' id='submitButton' name='submitButton' value='Submit'/>
					</div>
				</div>

			</div>
		);

	}

});

module.exports = SubmissionForm;