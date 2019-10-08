angular.module('materiales')
.factory('miServicio', function($http){
	var miServicio = {
		async: function(tabla) {
			var promesa = $http.get('/api/mats/' + tabla).then(function (respuesta) {
                          console.log(respuesta.data);
				return respuesta.data;
			});
			return promesa;
		}
	};
	return miServicio;
});