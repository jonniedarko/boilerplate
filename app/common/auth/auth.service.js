const AuthService = ['$http', '$rootScope', function AuthServiceFn($http, $rootScope) {
	var userIsLoggedIn = false;
	var loggedInUser = null;

	$http.get('api/auth')
		.success(function(){

			$http.get('api/user')
			.success(function (userInfo){
				userIsLoggedIn = true;
				loggedInUser = userInfo
				debugger;
				$rootScope.$broadcast('AuthService:changed');
			});
		})

	var auth ={
		get isLoggedIn(){
			debugger;
			console.log('get isLoggedIn', userIsLoggedIn);
			return userIsLoggedIn;
		},
		set isLoggedIn(bool){
			console.log('set isLoggedIn', bool);
			debugger;
			if(bool !== true && bool !== false) throw new TypeError('isLoggedIn Must be a valid boolean');
			userIsLoggedIn = bool;

			if(bool === false){
				this.user = null;
			}
			$rootScope.$broadcast('AuthService:changed');
		},
		get user() {
			console.log('loggedInUser', loggedInUser);
			return loggedInUser;
		},
		set user(user){
			loggedInUser = user;
			//$rootScope.$broadcast('AuthService:changed');
		}
   };

    return auth
}]

angular = require('angular');

ModuleName = 'Auth.AuthService';
Module = angular.module(ModuleName, [])
		.factory('AuthService', AuthService);

module.exports = Module
