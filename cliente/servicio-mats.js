angular.module('materiales')
.factory('Mats', function($localStorage,$rootScope){
	$rootScope.$storage = $localStorage;

	//if ($rootScope.$storage.matpared == null){
	if ($rootScope.$storage.matpared === undefined){
		$rootScope.$storage.matpared = 'default.png';
	}
	else {
		$rootScope.matpared = $rootScope.$storage.matpared;
	}

	//if ($rootScope.$storage.matsuelo == null){
	if ($rootScope.$storage.matsuelo === undefined){
		$rootScope.$storage.matsuelo = 'default.png';
	}
	else {
		$rootScope.matsuelo = $rootScope.$storage.matsuelo;
	}

	//if ($rootScope.$storage.escenaactual == null){
	if ($rootScope.$storage.escenaactual === undefined){
		$rootScope.$storage.escenaactual = 'amb01';
	}
	else {
		$rootScope.escenaactual = $rootScope.$storage.escenaactual;
	}


	//if ($rootScope.matpared == null){
	if ($rootScope.matpared === undefined){
		$rootScope.matpared = 'default.png';
	}
	//if ($rootScope.matsuelo == null){
	if ($rootScope.matsuelo === undefined){
		$rootScope.matsuelo = 'default.png';
	}

	//if ($rootScope.escenaactual == null){
	if ($rootScope.escenaactual === undefined){
		$rootScope.escenaactual = 'amb01';
	}

	var Mats = {
		getAmb: function(){
			return $rootScope.escenaactual;
		},
		setAmb: function(imagen){
			$rootScope.escenaactual = imagen;
			$rootScope.$storage.escenaactual = imagen;
		},
		setMatPared: function(mat) {
			$rootScope.matpared = mat;
			$rootScope.$storage.matpared = mat;
		},
		getMatPared: function(){
			return $rootScope.matpared;
		},
		setMatSuelo: function(mat) {
			$rootScope.matsuelo = mat;
			$rootScope.$storage.matsuelo = mat;
		},
		getMatSuelo: function(){
			return $rootScope.matsuelo;
		}
	};
	return Mats;
});