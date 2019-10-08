angular.module('materiales')
.controller('editmats',[ '$scope', '$http', 'miServicio',
		function($scope,$http,miServicio) {
			//Se llama al método async y entonces (then) se hace lo que sea con lo que es devuelto dentro de nuestra función
			function getMateriales(clase){
				miServicio.async(clase).then(function(d) { $scope[clase] = d; });
			}
			getMateriales('pavimentos');
			getMateriales('revestimientos');
			$scope.cleanmat = function(clase){
				var promiseClean = $http({
					url: '/api/mats/clean'+clase,
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					data: {
					}
				}).then(function(msg){
					$scope[clase] = [];
				});
			};
			$scope.actumateriales = function(clase){
				var promiseActupavs = $http({
					url: '/api/mats/init'+clase,
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					data: {
					}
				}).then(function(msg){
					//console.log('servidor:',msg);
					getMateriales(clase);
				});
			};


		  $scope.editSiNo = true;
		  $scope.toggleEdit = function(elto){
			  //console.log(elto);
			  if (elto.isDisabled===true){
			      elto.isDisabled=false;
			  }
			  else {
			      elto.isDisabled=true;
			  }
		  };
		  function getDat(matriz,nombreCampo){
			  for (var j=0;j<matriz.length;j++){
				  if (matriz[j].campo == nombreCampo){
					  return matriz[j].valor;
				  }
			  }
		  }
		  
		  $scope.desborrar = function(clase) {
			  $http.post('/api/mats/undel'+clase)
			  .then(function() {
				  $scope.actumateriales(clase);
				  //console.log('cliente: '+clase+' restaurados');
			  });
		  };
		  var mat_id;
		  $scope.actumat = function(clase,mat){
				mat_id = mat.id;
				//console.log('clase: ',clase);
				//console.log('mat: ',mat);
				//console.log('mat_id: ',mat_id);
				var cadena = '/api/mats/' + clase + '/' + mat_id;
				//console.log('cadena: ',cadena);
			  $http.put(cadena, mat)
			  .then(function(msg) {
				  //console.log('salida del actumat',msg);
			  });
		  };
			  //    url: 'editbd.php',
			  //    method: 'POST',
			  //    headers: { 'Content-Type': 'application/json' },
			  //    data: pav
		$scope.remove = function(clase,array,item){
			//console.log(item);
				mat_id = item.id;
			array.splice(array.indexOf(item),1);
				//console.log("Se inicia el borrado del elto en",clase);
				//console.log("el id es",mat_id);
				var urlremove = '/api/mats/'+clase+'/'+mat_id;
				//console.log('urlremove: ',urlremove);
				var promiseBorrar = $http({
					url:urlremove,
					method:"DELETE",
					headers: { 'Content-Type': 'application/json' },
					data: {}
				})
				.then(function(msg){
					//console.log("salida de remove del route de la ostia", msg);
				});
		};
	}]);