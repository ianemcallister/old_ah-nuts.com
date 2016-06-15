//presentation component -- doesn't maintain state
var GreeterMessage = React.createClass({
	render: function() {
		var name = this.props.name;
		var message = this.props.message;

		return (
			<div>
				<h1>Hello {name}!</h1>
				<p>{message}</p>
			</div>
		);
	}
});

var GreeterForm = React.createClass({
	onFormSubmit: function(e) {
		e.preventDefault();

		var updates = {};
		var name = this.refs.name.value;
		var message = this.refs.message.value;

		if (name.length > 0) {
			this.refs.name.value = '';
			updates.name = name;
		}

		if (message.length > 0) {
			this.refs.message.value = '';
			updates.message = message;
		}

		this.props.onNewData(updates);
	},
	render: function() {
		return (
			<form onSubmit={this.onFormSubmit}>
				<input type='text' ref='name' placeholder="Enter Name"/>
				<textarea ref='message' placeholder="Enter Message"></textarea>
				<button>Submit</button>
			</form>			
		);

	}
});

//container component -- does maintain state and renders children
var Greeter = React.createClass({
	getDefaultProps: function() {
		return {
			name: 'React',
			message: 'This is a form component'
		};
	},
	getInitialState: function () {
		return {
			name: this.props.name,
			name: this.props.message
		};
	},
	handleNewData: function(updates) {
		this.setState(updates);
	},
	render: function() {
		var name = this.state.name;
		var message = this.state.message;

		return (
			<div>

				<div>
					<GreeterMessage name={name} message={message}/>
				</div>

				<div>
					<GreeterForm onNewData={this.handleNewData}/>
				</div>

			</div>
		);
	}
});

//container component
var MarketReciept = React.createClass({
	render: function() {
		return (
<div>
	<div className="navbar navbar-default">
		<div className="container">
			<a className='navbar-brand' href="">Market Reciept</a>
		</div>
	</div>
	<div className="container">
		<div className='row'>
			<div className="container">
				<label htmlFor="marketNameInput">Market:</label>
				<input list='marketNameDatalist' id='marketNameInput' name='marketNameInput'/>
				<datalist name='marketNameDatalist' id='marketNameDatalist' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
					<option value="Bixby">Bixby</option>
					<option value="Great Park">Great Park</option>
					<option value="Surf Nights">Surf Nights</option>
				</datalist>
			</div>
		</div>

		<div className='row'>
			<div className="container">
				<label htmlFor="employeeNameInput">Employee:</label>
				<input list='employeeNameDatalist' id='employeeNameInput' name='employeeNameInput'/>
				<datalist name='employeeNameDatalist' id='employeeNameDatalist' className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
					<option value="Kevin Luna">Kevin Luna</option>
					<option value="Ahmed">Ahmed</option>
					<option value="Kiley">Kiley</option>
				</datalist>
			</div>
		</div>

		<div className='row'>
			<div className="container">
				<label htmlFor="dateInput">Employee:</label>
				<input type='date' id='dateInput' name='dateInput'/>
			</div>
		</div>

		<div className='row'>
			<div className="container">
				<label htmlFor="grossSalesInput">Gross Sales:</label>
				<input type='number' id='grossSalesInput' name='grossSalesInput'/>
			</div>
		</div>

		<div className='row'>
			<div className="container">
				<label htmlFor="marketFeeInput">Market Fee:</label>
				<input type='number' id='marketFeeInput' name='marketFeeInput'/>
			</div>
		</div>

		<div className='row'>
			<div className="container">
				<label htmlFor="employeePayInput">Employee Pay:</label>
				<input type='number' id='employeePayInput' name='employeePayInput'/>
			</div>
		</div>

		<div className='row'>
			<div className="container">
				<label htmlFor="employeeExpensesInput">Other Expenses:</label>
				<input type='number' id='employeeExpensesInput' name='employeeExpensesInput'/>
			</div>
		</div>

		<div className='row'>
			<div className="container">
				<label htmlFor="bankInput">Bank:</label>
				<input type='number' id='bankInput' name='bankInput'/>
			</div>
		</div>

		<div className='row'>
			<div className="container">
				<label htmlFor="returningInput">Returning:</label>
				<input type='number' id='returningInput' name='returningInput'/>
			</div>
		</div>

		<div className='row'>
			<div className="container">
				<label htmlFor="photoUploadInput"></label>
				<input type='file' id='photoUploadInput' name='photoUploadInput' accept="image/*" />
			</div>
		</div>

		<div className='row'>
			<div className="container">
				<label htmlFor="submitButton"></label>
				<input type='submit' id='submitButton' name='submitButton' value='Submit'/>
			</div>
		</div>

	</div>
</div>
		);

	}

});

var firstName = 'Ian';

ReactDOM.render(
	<MarketReciept />,
	//<Greeter name={firstName} />,
	document.getElementById('app')
);