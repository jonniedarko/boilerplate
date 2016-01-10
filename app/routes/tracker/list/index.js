
function displayList(vm, driveService){

	driveService.list()
			.success(function(data, status, headers, config) {

		            console.log(data);
				    //debugger;
		            vm.data = data.items;//.data;
		        })
		        .error(function(err) {

		            console.error(arguments);
		        });
}

const listCtrl = ['driveService', function listCtrlFn(driveService) {
	var vm = this;
	displayList(vm, driveService);

	vm.create = function(){

		driveService.create(vm.newFileName)
		        .success(function(data, status, headers, config) {
					displayList(vm, driveService);
		        })
		        .error(function(err) {
				     debugger;
		            console.error(arguments);
		        });
	}




	//console.log(driveService)


}]

module.exports = angular.module('Tracker.List', ['googleapis.Drive'])
				.controller('trackerListCtrl', listCtrl);