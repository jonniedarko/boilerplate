'use strict';

//import express from 'express';
var express = require('express');
var path = require('path');
var http = require('http');
var morgan = require('morgan')
var bodyParser = require('body-parser');



var app = express();
app.set('env', 'Dev');
app.set('publicDir', path.join(__dirname, '..', 'app'));
// Log requests to console
app.use(morgan('dev'));

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
