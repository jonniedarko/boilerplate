module.exports = {
	port: 9000,
	db: process.env.MONGODB || 'mongodb://localhost:27017/test',

	sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

	google: {
		clientID: process.env.GOOGLE_ID || '27171395493-gb7o9gi379uhj6lta4rku0ho5kj6cshk.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || '75kA1bbUeEhH81dispE-GPQ-',
		accessType: process.env.GOOGLE_ACCESS_TYPE || 'offline',
		approval_prompt: 'force',
		callbackURL: '/auth/google/callback',
		passReqToCallback: true
	}
}