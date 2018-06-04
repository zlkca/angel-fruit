//------------------------------------------------------
// Author: zlkca
// Date: Oct 8 2015
// License: MIT
//------------------------------------------------------

'use strict'

var mode = "";
var project = 'angelfruit';

var expiry = 30 * 60 * 1000;

module.exports = {
	port:5001,
	dbHost: 'localhost',
	dbName: project,
	dbUsername:'zlk',
	dbPassword:'',
	dbPort: '27017',
	apiUrl: '/api',
	ALLOW_ORIGINS:["http://yocompute.com", "http://www.yocompute.com"],
	sessionPrefix: project,
	sessionExpiry: expiry, // milliseconds
	//'imageRoot' : imgRoot,
	//'docRoot': docRoot,
	sendgrid:{
		username:'root',
		password:'mypassword'
	},
	passResetEmail: 'MyPasswordService@MyDomain.com',
	jwt:{
		secret: 'mysecret_hmacsha256',
		algorithm: 'HS256',
		expiresInSeconds: expiry / 1000
	},
	privateKeyPath: 'server/rsa_1024_priv.pem'
}
