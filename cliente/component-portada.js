angular.module('materiales')
.controller('portadaCtrl', function(Mats,$rootScope,$scope){
	$scope.setAmb = function(image){
		Mats.setAmb(image);
		console.log('joputa');
		document.location.replace('#show-scene');
	};
});