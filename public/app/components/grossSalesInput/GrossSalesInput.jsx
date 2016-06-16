var React = require('react');

var GrossSalesInput = React.createClass({
	render: function() {
		return (
			<div className='row'>
				<div className="container">
					<label htmlFor="grossSalesInput">Gross Sales:</label>
					<input type='number' id='grossSalesInput' name='grossSalesInput'/>
				</div>
			</div>
		);
	}

});

module.exports = GrossSalesInput;