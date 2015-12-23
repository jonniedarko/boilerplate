

var Interceptor = ['$injector', '$q', function InterceptorFn($injector, $q) {
    return {
        request: function (config) {

            /* config.headers = config.headers || {};
             if ($window.sessionStorage.token) {
             config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
             }*/
            return config;
        },

        requestError: function(rejection) {

            return rejection;// $q.reject(rejection);
        },

        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function (response) {

            /* if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthService.isAuthenticated) {
             AuthService.isAuthenticated = true;
             }*/
            return response || $q.when(response);
        },

        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {

            if (rejection != null && rejection.status === 401 /*&& (AuthService.isAuthenticated)*/) {
                $injector.get('$state').go("login");
            }

            return $q.reject(rejection);
        }
    };
}];

angular = require('angular');

module.exports =
	angular.module('Auth.Interceptor', [])
		.factory('AuthInterceptor', Interceptor);
