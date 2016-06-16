var React = require('react');

var MarketFeeInput = React.createClass({
	render: function() {
		return (
			<div className='row'>
				<div className="container">
					<label htmlFor="marketFeeInput">Market Fee:</label>
					<input type='number' id='marketFeeInput' name='marketFeeInput'/>
				</div>
			</div>
		);
	}

});

module.exports = MarketFeeInput;