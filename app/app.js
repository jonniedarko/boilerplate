require('angular');
require('angular-ui-router');

require('./common');
require('./routes');


angular.module('app', ['ui.router', 'Auth', 'Components', 'Services', 'Routes'])


