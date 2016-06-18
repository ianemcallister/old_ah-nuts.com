var React = require('react');

var ApprovalButton = require('ApprovalButton');

var EmployeePayInput = React.createClass({
	render: function() {
		return (
			<div className='row'>
				<div className="container">
					<div className='col-xs-9 col-sm-9 col-md-9'>
					<label htmlFor="employeePayInput">
						<span>Employee Pay:</span>
					</label>
					<input type='number' id='employeePayInput' name='employeePayInput' className='col-xs-6 col-sm-6 col-md-6 pull-right'/>
					</div>
					<div className='col-xs-3 col-sm-3 col-md-3'>
						<ApprovalButton />
					</div>
				</div>
			</div>
		);
	}

});

module.exports = EmployeePayInput;