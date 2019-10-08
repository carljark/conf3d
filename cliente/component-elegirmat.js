angular.module('materiales')
.controller('elegirmat',['miServicio','Amb', 'Mats',
			'$scope','$document', '$rootScope', '$http', '$uibModal', '$log', 'explorador',
			function (miServicio, Amb, Mats, $scope, $document,
					  $rootScope, $http, $uibModal, $log, explorador) {
				miServicio.async('pavimentos').then(function(d) { $scope.pavimentos = d; });
				miServicio.async('revestimientos').then(function(d) { $scope.revestimientos = d; });
				//console.log(window.innerWidth);
				//var TIME_TO_RESPOND_SECS = 5;
				var getAmbBase = function () {
					var aB = 'ambientes/' + $scope.escenaactual + '/amb.jpg';
					$http.get(aB)
					.then(function () {
						$scope.ambBase = aB;
					});
				};

				getAmbBase();

				$scope.escenaactual = Amb.getAmb();

				$scope.touched = false;
				$scope.touchStart = function(){
					$scope.touched = true;
				};
				$scope.touchEnd = function(){
					$scope.touched = false;
				};
				//$scope.isIE = true;
				$scope.isIE = explorador.isIE || explorador.isEdge;

						$scope.actumatpared = function() {
							var rP = "ambientes/" + $scope.escenaactual + "/revestimientos/" + Mats.getMatPared();
							$http.get(rP)
							.then(function () {
								$scope.rutapared = rP;
							});
						};
						$scope.actumatpared();
						$scope.actumatsuelo = function() {
							var rS = "ambientes/"+$scope.escenaactual+"/pavimentos/"+ Mats.getMatSuelo();
							$http.get(rS)
							.then(function () {
								$scope.rutasuelo = rS;
							});
						};
						$scope.actumatsuelo();
						$scope.elegir = function(archivo,carpeta) {
							archpng = archivo.replace('jpg','png');
							escenamat = $scope.escenaactual + '/' + carpeta + '/' + archpng ;
							//aqui guardar el material en rootscope con el material
							//
							if (carpeta == 'revestimientos'){
								Mats.setMatPared(archpng);
								$scope.actumatpared();
							}
							else {
								Mats.setMatSuelo(archpng);
								$scope.actumatsuelo();//no funciona una funcion del controlador en la directiva
							}
						};

				$scope.open = function(materiales) {
					var modalInstance = $uibModal.open({
						animation: true,
						templateUrl: 'tpl/c3dmodalnew.html',
						controller: 'ModalInstanceCtrl',
						size: 'lg',
						resolve: {
							items: function () {
								if (materiales == 'pavimentos'){
									return $scope.pavimentos;
								} else {
									return $scope.revestimientos;
								}
							},
							carpeta: function () {
								if (materiales == 'pavimentos'){
									return 'pavimentos/';
								} else {
									return 'revestimientos/';
								}
							}
						}
					});
					modalInstance.result.then(function (selectedItem) {
						$scope.selected = selectedItem;
						$scope.elegir(selectedItem.archivo,materiales);
					}, function () {
						$log.info('Modal dismissed at: ' + new Date());
					});
				};
			}]);
