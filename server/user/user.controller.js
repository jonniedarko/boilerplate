var User = require('./user.model');
var Q = require('q');

module.exports.signUp = function(email, password) {
	var deferred = Q.defer();

	var user = new User({
		email: email,
		password: password
	});

	User.findOne({email: email}, function (err, existingUser) {
		if (existingUser) {
			//  req.flash('errors', { msg: 'Account with that email address already exists.' });
			/*return res.status(409).send('That email is already Registered')*/
			deferred.reject({message: 'That email is already Registered'});
		}
		user.save(function (err) {
			if (err) {
				//return next(err);
				deferred.reject(err)
			}
			deferred.resolve(user);

		});
	});

	return deferred.promise;
};

