var React = require('react');

var DateInput = React.createClass({
	render: function() {
		return (
			<div className='row'>
				<div className="container">
					<label htmlFor="dateInput">Employee:</label>
					<input type='date' id='dateInput' name='dateInput'/>
				</div>
			</div>
		);
	}

});

module.exports = DateInput;