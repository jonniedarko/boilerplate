var express = require('express');
var Auth = require('./auth.controller');

var router = express.Router();

router.post('/signup', Auth.signup);
router.post('/login', Auth.login);
router.post('/logout', Auth.logout);

module.exports = router;