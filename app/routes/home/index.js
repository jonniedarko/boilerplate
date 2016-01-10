
const homeCtrl = ['$scope', 'restService', 'AuthService', function homeCtrl($scope, restService, AuthService) {
	function init(){
	    if(AuthService.isLoggedIn){
			$scope.data = [];
		    /*restService.getData()
		        .success(function(data, status, headers, config) {
		            console.log(data);
				    //debugger;
		            $scope.data = data;//.data;
		        })
		        .error(function(err) {
		            console.error(arguments);
		        });
*/
		     restService.list()
		        .success(function(data, status, headers, config) {
				     debugger;
		            console.log(data);
				    //debugger;
		            $scope.data = data.items;//.data;
		        })
		        .error(function(err) {
				     debugger;
		            console.error(arguments);
		        });




		    console.log('I\'m Home & logged in')
		}
		else{
			console.log('I\'m Home & logged in')
		}
	}
	$scope.$on('AuthService:changed', init);
	init();

}]

module.exports = angular.module('Routes.Home', [])
				.controller('homeCtrl', homeCtrl);