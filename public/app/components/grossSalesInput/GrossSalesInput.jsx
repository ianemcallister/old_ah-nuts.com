var React = require('react');

var ApprovalButton = require('ApprovalButton');

var GrossSalesInput = React.createClass({
	render: function() {
		return (
			<div className='row'>
				<div className="container">
					<div className='col-xs-9 col-sm-9 col-md-9'>
						<label htmlFor="grossSalesInput">Gross Sales:</label>
						<input type='number' id='grossSalesInput' name='grossSalesInput'/>
					</div>
					<div className='col-xs-3 col-sm-3 col-md-3'>
						<ApprovalButton />
					</div>
				</div>
			</div>
		);
	}

});

module.exports = GrossSalesInput;