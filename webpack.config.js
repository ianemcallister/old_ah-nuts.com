module.exports = {
	entry: './public/app/app.jsx',
	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	resolve: {
		root: __dirname,
		alias: {
			MarketRecieptContainer: 'public/app/components/container/MarketRecieptContainer.jsx',
			Navbar: 'public/app/components/navbar/Navbar.jsx',
			SubmissionForm: 'public/app/components/submissionForm/SubmissionForm.jsx',
			MarketNameInput: 'public/app/components/marketNameInput/MarketNameInput.jsx',
			EmployeeNameInput: 'public/app/components/employeeNameInput/EmployeeNameInput.jsx',
			DateInput: 'public/app/components/dateInput/DateInput.jsx',
			GrossSalesInput: 'public/app/components/grossSalesInput/GrossSalesInput.jsx',
			MarketFeeInput: 'public/app/components/marketFeeInput/MarketFeeInput.jsx',
			EmployeePayInput: 'public/app/components/employeePayInput/EmployeePayInput.jsx',
			EmployeeExpensesInput: 'public/app/components/employeeExpensesInput/EmployeeExpensesInput.jsx',
			BankInput: 'public/app/components/bankInput/BankInput.jsx',
			NetProfitsInput: 'public/app/components/netProfitsInput/NetProfitsInput.jsx',
			PhotoUploadInput: 'public/app/components/photoUploadInput/PhotoUploadInput.jsx',
			ApprovalButton: 'public/app/components/approvalButton/ApprovalButton.jsx',
			ReportLineItem: 'public/app/components/reportLineItem/ReportLineItem.jsx'
		},
		extensions: ['','.js','.jsx']
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['react','es2015']
				},
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/
			}
		]
	}
};