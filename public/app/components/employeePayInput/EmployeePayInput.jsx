var React = require('react');

var EmployeePayInput = React.createClass({
	render: function() {
		return (
			<div className='row'>
				<div className="container">
					<label htmlFor="employeePayInput">Employee Pay:</label>
					<input type='number' id='employeePayInput' name='employeePayInput'/>
				</div>
			</div>
		);
	}

});

module.exports = EmployeePayInput;