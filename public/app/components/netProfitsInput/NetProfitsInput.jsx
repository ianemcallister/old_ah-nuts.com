var React = require('react');

var NetProfitsInput = React.createClass({
	render: function() {
		return (
			<div className='row'>
				<div className="container">
					<label htmlFor="returningInput">Returning:</label>
					<input type='number' id='returningInput' name='returningInput'/>
				</div>
			</div>
		);
	}

});

module.exports = NetProfitsInput;