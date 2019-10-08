angular.module('materiales')
.controller('loginCtrl',function($scope,$rootScope,loginService){
	$scope.user = { 'username': '', 'password':''};
	$scope.error = function(){
		return comprobarDNI();
		//return false;
	};
	//$scope.user.DNI = "45586598S";
	$scope.login=function(user){
		loginService.login(user);
	};

	var comprobarDNI = function () {
		if ($scope.user.DNI){
		if ($scope.user.DNI.length < 9)
		{
			return true;
		}
		else {
			return nif($scope.user.DNI);
			}
		}
		else
			return true;
	};

	var nif = function (dni) {
	  var numero;
	  var lt;
	  var letra;
	  var expresion_regular_dni;
	 
	  expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
	 
	  if (expresion_regular_dni.test (dni) === true){
	     numero = dni.substr(0,dni.length-1);
	     lt = dni.substr(dni.length-1,1);
	     numero = numero % 23;
	     letra='TRWAGMYFPDXBNJZSQVHLCKET';
	     letra=letra.substring(numero,numero+1);
	    if (letra!=lt.toUpperCase()) {
	       //alert('Dni erroneo, la letra del NIF no se corresponde');
			return true;
	     }
		else
		{
	       //alert('Dni correcto');
			return false;
	     }
	  }
		else
		{
	     //alert('Dni erroneo, formato no válido');
			return true;
	   }
	};

});