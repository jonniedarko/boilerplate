//var path = require('path');
module.exports = ['UserService', 'AuthService', function(UserService, AuthService) {
  return {
      scope:{},
      restrict: 'EA',
      templateUrl: './components/navbar/navbar.template.html',//path.join(__dirname, 'index'),
      link: function(scope){
            scope.user = null;

            scope.$watch(AuthService.checkIsLoggedIn, function(isLoggedIn){
                console.log('watch isLoggedIn:', isLoggedIn);
                if(isLoggedIn) {
                    UserService.getUserInfo()
                        .success(function (data) {
                            console.log('arguments', arguments);
                            scope.user = data;
                        })
                        .error(function () {
                            console.error('arguments', arguments);
                        });

                    scope.logout = function () {

                        UserService.logOut()
                    }
                }
            })

      }
  };
}];
