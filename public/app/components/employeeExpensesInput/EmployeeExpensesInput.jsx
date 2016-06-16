var React = require('react');

var EmployeeExpensesInput = React.createClass({
	render: function() {
		return (
			<div className='row'>
				<div className="container">
					<label htmlFor="employeeExpensesInput">Other Expenses:</label>
					<input type='number' id='employeeExpensesInput' name='employeeExpensesInput'/>
				</div>
			</div>
		);
	}

});

module.exports = EmployeeExpensesInput;