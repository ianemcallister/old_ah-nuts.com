var React = require('react');

//navbar component
var Navbar = React.createClass({
	render:function() {
		return (
			<div>
				<div className="navbar navbar-default">
					<div className="container">
						<a className='navbar-brand' href="">Market Reciept</a>
					</div>
				</div>	
			</div>
		);	
	}
});

module.exports = Navbar;