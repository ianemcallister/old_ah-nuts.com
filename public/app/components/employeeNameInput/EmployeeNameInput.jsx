var React = require('react');

var ApprovalButton = require('ApprovalButton');

var EmployeeNameInput = React.createClass({
	render: function() {
		return (
			<div className='row'>
				<div className="container">
					<div className='col-xs-9 col-sm-9 col-md-9'>
						<label htmlFor="employeeNameInput">Employee:</label>
						<input list='employeeNameDatalist' id='employeeNameInput' name='employeeNameInput'/>
						<datalist name='employeeNameDatalist' id='employeeNameDatalist' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
							<option value="Kevin Luna">Kevin Luna</option>
							<option value="Ahmed">Ahmed</option>
							<option value="Kiley">Kiley</option>
						</datalist>
					</div>
					<div className='col-xs-3 col-sm-3 col-md-3'>
						<ApprovalButton />
					</div>
				</div>
			</div>
		);
	}

});

module.exports = EmployeeNameInput;