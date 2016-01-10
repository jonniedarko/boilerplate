const addCtrl = ['$scope', 'restService', function addCtrlFn($scope, restService) {
	$scope.form = {};
	$scope.save = function () {
		restService.saveData($scope.form)
			.success(function () {
				$scope.form = {};
			})
			.error(function (err) {
				console.error(err);
			})
	}


	$scope.create = function(){
		//debugger;
		 restService.create($scope.newFile)
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
	}

}];

module.exports = angular.module('Routes.Add', [])
	.controller('addCtrl', addCtrl);