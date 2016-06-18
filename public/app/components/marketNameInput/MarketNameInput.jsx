var React = require('react');

var ApprovalButton = require('ApprovalButton');

var MarketNameInput = React.createClass({
	render: function() {

		return (
			<div className='row'>
				<div className="container">
					<div className='col-xs-9 col-sm-9 col-md-9'>
						<label htmlFor="marketNameInput">
							<span>Market:</span>
						</label>
						<input list='marketNameDatalist' id='marketNameInput' name='marketNameInput' placeholder='' className='col-xs-8 col-sm-8 col-md-8 pull-right'/>
						<datalist name='marketNameDatalist' id='marketNameDatalist' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
							<option value="Bixby">Bixby</option>
							<option value="Great Park">Great Park</option>
							<option value="Surf Nights">Surf Nights</option>
						</datalist>
					</div>
					<div className='col-xs-3 col-sm-3 col-md-3'>
						<ApprovalButton />
					</div>
				</div>
			</div>
		);
	}

});

module.exports = MarketNameInput;

