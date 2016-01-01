'use strict';
var Config = require('../config');
//import express from 'express';
var express = require('express');
var path = require('path');
var http = require('http');
var https = require('https');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');

var MongoStore = require('connect-mongo')(session);


/**
 * Connect to MongoDB.
 */
mongoose.connect(Config.db);
mongoose.connection.on('error', function () {
	console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
	process.exit(1);
});


require('./auth/passport');

var app = express();
app.set('env', Config.env);
app.set('publicDir', path.join(__dirname, '..', 'public'));

// Log requests to console
app.use(morgan(Config.env));
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: Config.sessionSecret,
	store: new MongoStore({url: Config.db, autoReconnect: true})
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	next();
});

app.use(function (req, res, next) {
	req.session.returnTo = '/';
	next();
});

app.use(express.static(app.get('publicDir')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

app.use('/', require('./routes'));

var server = http.createServer(app);
//var secureServer = https.createServer({}, app);

function startServer() {
	server.listen(Config.http.port, function () {
		console.log('Express server listening on %d, in %s mode', Config.http.port,  Config.env);
	})
	/*secureServer.listen(9000, function () {
		console.log('Express server listening on %d, in %s mode', 9000, app.get('env'));
	});*/
}

setImmediate(startServer);

// Expose app
module.exports = app;
