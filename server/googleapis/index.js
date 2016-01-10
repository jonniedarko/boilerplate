'use strict';

var express = require('express');
var router = express.Router();
var drive = require('./drive');

router.use('/drive',drive.router);

module.exports  = router;

