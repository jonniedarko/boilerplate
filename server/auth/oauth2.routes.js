var express = require('express');
var passport = require('passport');
var router = express.Router();

// Google
router.get('/auth/google', passport.authenticate('google', {
	scope: [
		'profile',
		'email',
		'https://spreadsheets.google.com/feeds',
		'https://docs.google.com/feeds'
	].join(' '), accessType: 'offline', approvalPrompt: 'force'
}));

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/#/login'}), function (req, res) {
	res.redirect('/');
});

module.exports = router;