var React = require('react');

/*var MarketNameInput = require('MarketNameInput');
var EmployeeNameInput = require('EmployeeNameInput');
var DateInput = require('DateInput');
var GrossSalesInput = require('GrossSalesInput');
var MarketFeeInput = require('MarketFeeInput');
var EmployeePayInput = require('EmployeePayInput');
var EmployeeExpensesInput = require('EmployeeExpensesInput');
var BankInput = require('BankInput');
var NetProfitsInput = require('NetProfitsInput');
var PhotoUploadInput = require('PhotoUploadInput');*/
var ReportLineItem = require('ReportLineItem');

var SubmissionForm = React.createClass({
	getDefaultProps: function() {
		return { items: [
			{fieldName:'Market'}, 
			{fieldName:'Employee'},
			{fieldName:'Gross Sales'},
			{fieldName:'Market Fee'},
			{fieldName:'Employee Pay'},
			{fieldName:'Employee\'s Expenses'},
			{fieldName:'Starting Bank'},
			{fieldName:'Due to Ah-Nuts'}
			] 
		}
	},
	getRecipetItems: function(marketCorrection) {
		//if a marketCorrection value is provided use that, otherwise
		//server will guess
		//
		//if I can, collect GPS location data
		//call the server (possbily passing GPS location data)
		//from the server get the following:
		//   *Market Name Guess
		//   *Employee Guess
		//   *Gross sales (with details) based on guessed Market
		//   *Market fee (with details) based on guessed Market
		//   *Employee pay (with details) based on guessed marget and guessed employee
		//   *Employee expenses (with details) based on guessed employee expense reports
		//   *Bank value based on guessed employee profile
		//   *Net Profit value based on guesed market
	},
	approveField: function(field) {
		//as the user gives feedback on each item act accordingly
		//if a field is approved, kick off subsequent calculations
		//if a field is not approved.....
	},
	revizeFieldValue: function(field, value) {
		//if the suggested field value is not accepted
		//MarketName - re-run getRecipetItems with inputed value
		//Employee Name - prompt for explaination
		//Date - prompt for explaination
		//Gross - prompt for explaination
		//Market Fee - prompt for explaination
		//Employee Pay - prompt for explaination
		//Employee Expenses - prompt for explaination
		//Bank - prompt for explaination
		//Net Profit - prompt for explaination
	},
	getCurrentDate: function() {
		//from the current browser/device
		//return the value
	},
	launchExplainationPrompt: function(inputItem) {
		//when a field is revized, this function prompts the component to
		//display an explaination field
	},
	launchErrorPrompt: function(inputItem) {
		//notify user that an error occured with a specific field
	},
	render: function() {
		var testing = 'this is a test';
		
		var listItems = this.props.items.map(function(item) {
			
			return (
				<li>
					<ReportLineItem values={item} />
				</li>
			);

		});

		return (
			<div className="container">
				<p>*Swipe a field left if not approving</p>
				<form>
					<ul>
						{listItems}
					</ul>
				
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