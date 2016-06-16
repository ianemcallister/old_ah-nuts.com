var React = require('react');

var PhotoUploadInput = React.createClass({
	render: function() {
		return (
			<div className='row'>
				<div className="container">
					<label htmlFor="photoUploadInput"></label>
					<input type='file' id='photoUploadInput' name='photoUploadInput' accept="image/*" />
				</div>
			</div>
		);
	}

});

module.exports = PhotoUploadInput;