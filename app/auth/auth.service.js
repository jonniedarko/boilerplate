module.exports.AuthService = [function authService() {
    var auth = {
        isLogged: false
    }

    return auth;
}];

module.exports.UserService = ['$http', function($http) {
    return {
        logIn: function(username, password) {
            return $http.post('api/auth/login', {username: username, password: password});
        },

        logOut: function() {

        },
        signUp: function(username, password, confirmPassword){
          return $http.post('api/auth/signup', {username: username, password: password});
        }
    }
}];
