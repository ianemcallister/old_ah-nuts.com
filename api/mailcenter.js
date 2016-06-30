'use static'

var nodemailer = require('nodemailer');
//var mailconfig = require('./mailconfig');
var environment = process.env.NODE_ENV;
if(typeof process.env.NODE_ENV == 'undefined') { //undefined means development
	var AH_NUTS_SECRETS = require('./env.js');
	var MAIL_HOST = AH_NUTS_SECRETS.MAIL_HOST;
	var MAIL_PORT = AH_NUTS_SECRETS.MAIL_PORT;
	var MAIL_USER = AH_NUTS_SECRETS.MAIL_USER;
	var FIREBASE_DB = AH_NUTS_SECRETS.FIREBASE_DB;
} else {							//this is production, pull from the env
	var MAIL_HOST = process.env.AH_NUTS_MAIL_HOST;
	var MAIL_PORT = process.env.AH_NUTS_MAIL_PORT;
	var MAIL_USER = process.env.AH_NUTS_MAIL_USER;
	var MAIL_PASSWORD = process.env.AH_NUTS_MAIL_PASSWORD;
}


var mailCenter = {
	sendEmail:sendEmail
}

function sendEmail(sendTo, sendFrom, subject, body, attch) {
	
	//define the email settings
	var smtpConfig = {
		host: MAIL_HOST,
		port: MAIL_PORT,
		secure: true, // use SSL
		auth: {
			user: MAIL_USER,
			pass: MAIL_PASSWORD			
		}
	};

	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport(smtpConfig);

	// setup e-mail data with unicode symbols
	var mailOptions = {
		from: sendFrom, // sender address
		to: 'ian@ah-nuts.com, steve@ah-nuts.com', // list of receivers
		subject: subject, // Subject line
		text: body.plainText, // plaintext body
		html: body.htmlText // html body
	};

	if(typeof attch !== 'undefined') {
		mailOptions['attachments'] = [
			{
				filename: attch.name,
				content: attch.binary
			}
		]
	}

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