'use strict';

//import express from 'express';
var express = require('express');
var path = require('path');
var http = require('http');
var morgan = require('morgan')
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');

var MongoStore = require('connect-mongo')(session);
var secrets = {
  db: 'mongodb://localhost:27017/scratch',
  session: 'Your Session Secret goes here',
};

/**
 * Connect to MongoDB.
 */
mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});


var passportConf = require('./auth/passport');

var app = express();
app.set('env', 'Dev');
app.set('publicDir', path.join(__dirname, '..', 'public'));
// Log requests to console
app.use(morgan('dev'));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secrets.session,
  store: new MongoStore({ url: secrets.db, autoReconnect: true })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

app.use(function(req, res, next) {
  //if (/api/i.test(req.path)) {
    req.session.returnTo = '/';//req.path;
  //}
  next();
});

app.use(express.static(app.get('publicDir')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

require('./routes')(app);

var server = http.createServer(app);

function startServer() {
  server.listen(9000, function() {
    console.log('Express server listening on %d, in %s mode', 9000, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
