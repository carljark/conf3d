angular.module('materiales')
.factory('loginService',function($rootScope,$http){
	'use strict';
	var loginService = {};
	loginService.checkLogin = function () {
		$http.get('autenticar')
		.then(function(mensaje){
			if (mensaje.data === 'ereselputoamo') {
				loginService.logeado = true;
			}
			else {
				loginService.logeado = false;
			}
		});
	};
	loginService.checkLogin();
	loginService.login = function (user) {
		var promise = $http({
			url: 'autenticar',
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			data: {
				username: user.username,
				password: user.password
			}
		}).then(function(msg){
			//console.log("salida", msg.data);
			if (msg.data !== ""){
				loginService.data = msg.data;
				//console.log('msg.data',msg.data);
				if (loginService.data === 'ereselputoamo'){
					//console.log('logeado');
					loginService.logeado = true;
				}
				else {
					loginService.logeado = false;
				}
				//window.location.href = "#/enlaces";
			}
			return loginService.logeado;
		});
	};
	loginService.getAuth = function () {
		return loginService.logeado;
	};
	return loginService;
});