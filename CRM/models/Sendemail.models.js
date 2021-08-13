
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
	  service: 'gmail',
    
	auth: {
	  user: 'farazahmed.fa276@gmail.com',
	  pass: 'Pakistan786&'
	}
  });
  
  module.exports = transporter;

  