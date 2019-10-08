angular.module('materiales')
.controller('navCtrl', function($scope,loginService){
	$scope.authOk = function () {
		return loginService.getAuth();
	};
	//console.log($scope.authOk());
	$scope.elec1 = false;
	$scope.elec2 = false;
	$scope.elec3 = false;
	$scope.elec4 = false;
	$scope.elec5 = false;
	$scope.elec6 = false;
	$scope.titulo = "Configurador 3D";
	$scope.activar = function (elto) {
		$scope.elec1 = false;
		$scope.elec2 = false;
		$scope.elec3 = false;
		$scope.elec4 = false;
		$scope.elec5 = false;
		$scope.elec6 = false;
		$scope[elto] = true;
	};
});