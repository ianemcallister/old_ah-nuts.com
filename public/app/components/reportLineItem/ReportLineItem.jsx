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

		//view elements
		var inputLabelName = this.state.values.fieldName + 'Input';
		var dataListName = this.state.values.fieldName + 'List';
		var placeholder = this.state.values.placeholder;
		var input = null;

		//build the input, if there is a datalist
		if(this.state.values.datalist) {
			//build the datalist
			var aDatalist = this.props.values.listValues.map(function(value) {

				return (
					<option value={value}>{value}</option>
				);

			});

			//add the datalist to the input
			input = (
				<div>
					<input list='{dataListName}' id='{inputLabelName}' name='{inputLabelName}' placeholder={placeholder} className='col-xs-8 col-sm-8 col-md-8'/>
					<datalist name='{dataListName}' id='{dataListName}' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
						{aDatalist}
					</datalist>
				</div>
			);
		} else {
			input = (
				<div>
					<input id='{inputLabelName}' name='{inputLabelName}' placeholder={placeholder} className='col-xs-8 col-sm-8 col-md-8'/>
				</div>
			);
		}

		//return the JSX
		return (
			<div>
				<div className='col-xs-9 col-sm-9 col-md-9 inputTitle'>
					<label htmlFor="bankInput">
						<span>{values.fieldName}:</span>
					</label>
					{input}
				</div>
				<div className='col-xs-3 col-sm-3 col-md-3'>
					<span className='pull-right'><ApprovalButton /></span>
				</div>
			</div>
		);

	}
});

module.exports = ReportLineItem;