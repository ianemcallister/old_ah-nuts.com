var React = require('react');

var ApprovalButton = require('ApprovalButton');

var DateInput = React.createClass({
	render: function() {
		return (
			<div className='row'>
				<div className="container">
					<div className='col-xs-9 col-sm-9 col-md-9'>
						<label htmlFor="dateInput">Employee:</label>
						<input type='date' id='dateInput' name='dateInput'/>
					</div>
					<div className='col-xs-3 col-sm-3 col-md-3'>
						<ApprovalButton />
					</div>
				</div>
			</div>
		);
	}

});

module.exports = DateInput;