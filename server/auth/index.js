module.exports = {
	controller: require('./auth.controller'),
	routes : require('./auth.routes'),
	oauth2: require('./oauth2.routes'),
	middleware: require('./auth.middleware'),
	passport: require('./passport')
};