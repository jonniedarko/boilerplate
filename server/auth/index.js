
module.exports.controller = require('./auth.controller');
module.exports.routes  = require('./auth.routes');
module.exports.oauth2 = require('./oauth2.routes');
module.exports.middleware = require('./auth.middleware');
module.exports.passport= require('./passport');