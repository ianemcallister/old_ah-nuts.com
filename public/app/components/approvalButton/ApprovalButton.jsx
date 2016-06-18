var React = require('react');

var ApprovalButton = React.createClass({
	render: function() {
		return (
			<div>
				<button className='btn btn-warning'>
					Approve
				</button>
			</div>
		);

	}

});

module.exports = ApprovalButton;