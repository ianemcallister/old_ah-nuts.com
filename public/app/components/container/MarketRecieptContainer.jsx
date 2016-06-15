var React = require('react');

var Navbar = require('Navbar');

//container component
var MarketRecieptContainer = React.createClass({
	render: function() {
		return (
			<div>
				<Navbar />
				<div className="container">
					<div className='row'>
						<div className="container">
							<label htmlFor="marketNameInput">Market:</label>
							<input list='marketNameDatalist' id='marketNameInput' name='marketNameInput'/>
							<datalist name='marketNameDatalist' id='marketNameDatalist' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
								<option value="Bixby">Bixby</option>
								<option value="Great Park">Great Park</option>
								<option value="Surf Nights">Surf Nights</option>
							</datalist>
						</div>
					</div>

					<div className='row'>
						<div className="container">
							<label htmlFor="employeeNameInput">Employee:</label>
							<input list='employeeNameDatalist' id='employeeNameInput' name='employeeNameInput'/>
							<datalist name='employeeNameDatalist' id='employeeNameDatalist' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
								<option value="Kevin Luna">Kevin Luna</option>
								<option value="Ahmed">Ahmed</option>
								<option value="Kiley">Kiley</option>
							</datalist>
						</div>
					</div>

					<div className='row'>
						<div className="container">
							<label htmlFor="dateInput">Employee:</label>
							<input type='date' id='dateInput' name='dateInput'/>
						</div>
					</div>

					<div className='row'>
						<div className="container">
							<label htmlFor="grossSalesInput">Gross Sales:</label>
							<input type='number' id='grossSalesInput' name='grossSalesInput'/>
						</div>
					</div>

					<div className='row'>
						<div className="container">
							<label htmlFor="marketFeeInput">Market Fee:</label>
							<input type='number' id='marketFeeInput' name='marketFeeInput'/>
						</div>
					</div>

					<div className='row'>
						<div className="container">
							<label htmlFor="employeePayInput">Employee Pay:</label>
							<input type='number' id='employeePayInput' name='employeePayInput'/>
						</div>
					</div>

					<div className='row'>
						<div className="container">
							<label htmlFor="employeeExpensesInput">Other Expenses:</label>
							<input type='number' id='employeeExpensesInput' name='employeeExpensesInput'/>
						</div>
					</div>

					<div className='row'>
						<div className="container">
							<label htmlFor="bankInput">Bank:</label>
							<input type='number' id='bankInput' name='bankInput'/>
						</div>
					</div>

					<div className='row'>
						<div className="container">
							<label htmlFor="returningInput">Returning:</label>
							<input type='number' id='returningInput' name='returningInput'/>
						</div>
					</div>

					<div className='row'>
						<div className="container">
							<label htmlFor="photoUploadInput"></label>
							<input type='file' id='photoUploadInput' name='photoUploadInput' accept="image/*" />
						</div>
					</div>

					<div className='row'>
						<div className="container">
							<label htmlFor="submitButton"></label>
							<input type='submit' id='submitButton' name='submitButton' value='Submit'/>
						</div>
					</div>

				</div>
			</div>
		);

	}

});

module.exports = MarketRecieptContainer;