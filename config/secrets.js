module.exports = {

	db: process.env.MONGODB || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/test',

	sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

	google: {
		clientID: process.env.GOOGLE_ID || 'someie.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || '- some secret - ',
		accessType: process.env.GOOGLE_ACCESS_TYPE || 'offline',
		approval_prompt: 'force',
		callbackURL: '/auth/google/callback',
		passReqToCallback: true
	}

};
