var React = require('react');

var MarketNameInput = React.createClass({
	render: function() {
		return (
			<div className='row'>
				<div className="container">
					<label htmlFor="marketNameInput">Market:</label>
					<input list='marketNameDatalist' id='marketNameInput' name='marketNameInput'/>
					<datalist name='marketNameDatalist' id='marketNameDatalist' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
						<option value="Bixby">Bixby</option>
						<option value="Great Park">Great Park</option>
						<option value="Surf Nights">Surf Nights</option>
					</datalist>
				</div>
			</div>
		);
	}

});

module.exports = MarketNameInput;

