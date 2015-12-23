require('./auth.service');

var UserService = ['$http', '$q', 'AuthService', '$state', function UserServiceFn($http, $q, AuthService, $state) {
    return {
        logIn: function(email, password) {
            var deferred  = $q.defer();

            $http.post('api/auth/login', {email: email, password: password})
                .success(function(data){

                    AuthService.isLogged = true;
					AuthService.user = data;


                })
                .error(deferred.reject);

            return deferred.promise
        },

        logOut: function() {
            $http.post('api/auth/logout')
                .success(function(){
				debugger;
                    AuthService.isLoggedIn = false;
                    $state.go('login');
                })
                .error(function(){

                });


        },
        signUp: function(email, password, confirmPassword){
            debugger;
          return $http.post('api/auth/signup', {email: email, password: password});
        },
        googleLogin: function(){
            return $http.get('auth/google')
			.success(function(){
	          console.log(arguments)
	        })
	        .error(function(){
	          console.error(arguments)
	        });
        },
        getUserInfo: function(){
            return $http.get('api/user');
        }
    }
}];
angular = require('angular');

module.exports =
	angular.module('Auth.UserService', ['Auth.AuthService'])
		.factory('UserService', UserService);
