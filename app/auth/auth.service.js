module.exports.AuthService = [function authService() {
    var isLogged = false;


    return {
        setLoggedIn: function(bool){
            isLogged = bool;
        },
        checkIsLoggedIn:function (){
            return isLogged;
        }
    };
}];

module.exports.UserService = ['$http', '$q', 'AuthService', function($http, $q, AuthService) {
    return {
        logIn: function(email, password) {
            var deferred  = $q.defer();

            $http.post('api/auth/login', {email: email, password: password})
                .success(function(data){

                    AuthService.setLoggedIn(true);

                })
                .error(deferred.reject);

            return deferred.promise
        },

        logOut: function() {
            return $http.post('api/auth/logout');
        },
        signUp: function(email, password, confirmPassword){
            debugger;
          return $http.post('api/auth/signup', {email: email, password: password});
        }
    }
}];
