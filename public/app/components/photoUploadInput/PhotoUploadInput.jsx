var React = require('react');

var PhotoUploadInput = React.createClass({
	render: function() {
		return (
			<div className='row'>
				<div className="container">
					<div className='col-xs-12 col-sm-12 col-md-12'>
						<label htmlFor="photoUploadInput"></label>
						<input type='file' id='photoUploadInput' name='photoUploadInput' accept="image/*" />
					</div>
				</div>
			</div>
		);
	}

});

module.exports = PhotoUploadInput;