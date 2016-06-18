var React = require('react');

var ApprovalButton = require('ApprovalButton');

var ReportLineItem = React.createClass({
	getDefaultProps: function() {
		return {
			//values: this.props.values
			values: 'error'
		};
	},
	getInitialState: function () {
		return {
			values: this.props.values
		};
	},
	render: function() {
		var values = this.state.values;

		return (
			<div>
				<div className='col-xs-9 col-sm-9 col-md-9'>
					<label htmlFor="bankInput">
						<span>{values.fieldName}:</span>
					</label>
					<input type='number' id='bankInput' name='bankInput' className='col-xs-8 col-sm-8 col-md-8 pull-right'/>
				</div>
				<div className='col-xs-3 col-sm-3 col-md-3'>
					<ApprovalButton />
				</div>
			</div>
		);

	}
});

module.exports = ReportLineItem;