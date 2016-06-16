var React = require('react');

var EmployeeNameInput = React.createClass({
	render: function() {
		return (
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
		);
	}

});

module.exports = EmployeeNameInput;