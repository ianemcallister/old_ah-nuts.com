var React = require('react');

var Navbar = require('Navbar');
var SubmissionForm = require ('SubmissionForm');

//container component
var MarketRecieptContainer = React.createClass({
	render: function() {
		return (
			<div>
				<Navbar />
				<SubmissionForm />
			</div>
		);

	}

});

module.exports = MarketRecieptContainer;