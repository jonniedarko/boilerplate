module.exports.AuthService = ['$http', function authService($http) {
    var isLogged = false;


    return {
        setLoggedIn: function(bool){
            isLogged = bool;
        },
        checkIsLoggedIn:function (){
            return isLogged;
        },
        sessionExists: function(){
            return $http.get('api/auth');
        }
    };
}];

module.exports.UserService = ['$http', '$q', 'AuthService', '$state',function($http, $q, AuthService, $state) {
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
            $http.post('api/auth/logout')
                .success(function(){

                    AuthService.setLoggedIn(false);
                    $state.go('home');

                })
                .error(function(){

                });


        },
        signUp: function(email, password, confirmPassword){
            debugger;
          return $http.post('api/auth/signup', {email: email, password: password});
        },
        googleLogin: function(){
            return $http.get('auth/google');
        },
        getUserInfo: function(){
            return $http.get('api/user');
        }
    }
}];
