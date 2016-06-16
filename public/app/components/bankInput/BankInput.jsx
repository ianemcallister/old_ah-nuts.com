var React = require('react');

var BankInput = React.createClass({
	render: function() {
		return (
			<div className='row'>
				<div className="container">
					<label htmlFor="bankInput">Bank:</label>
					<input type='number' id='bankInput' name='bankInput'/>
				</div>
			</div>
		);
	}

});

module.exports = BankInput;