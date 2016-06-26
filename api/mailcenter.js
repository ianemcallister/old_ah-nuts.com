'use static'

var nodemailer = require('nodemailer');
var mailconfig = require('./mailconfig');

var mailCenter = {
	sendEmail:sendEmail
}

function sendEmail(sendTo, sendFrom, subject, body) {
	
	//define the email settings
	var smtpConfig = {
		host: mailconfig.nutsMail.host,
		port: mailconfig.nutsMail.port,
		secure: true, // use SSL
		auth: {
			user: mailconfig.nutsMail.user,
			pass: mailconfig.nutsMail.password
		}
	};

	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport(smtpConfig);

	// setup e-mail data with unicode symbols
	var mailOptions = {
		from: sendFrom, // sender address
		to: 'ian@ah-nuts.com', // list of receivers
		subject: subject, // Subject line
		text: body.plainText, // plaintext body
		html: body.htmlText // html body
	};

	//when mailing, return a response
	return new Promise(function(resolve, reject) {
		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				reject(error);
			}
			resolve('Message sent: ' + info.response);
		});
	});

}

module.exports = mailCenter;