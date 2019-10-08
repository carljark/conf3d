angular.module('materiales', ['angular-loading-bar', 'ngStorage', 'ngTouch', 'ngAnimate', 'ngRoute', 'ui.bootstrap'])
      .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
      }])
	  .factory('explorador', function(){
				// Opera 8.0+
			var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
				// Firefox 1.0+
			var isFirefox = typeof InstallTrigger !== 'undefined';
				// At least Safari 3+: "[object HTMLElementConstructor]"
			var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
				// Internet Explorer 6-11
			var isIE = /*@cc_on!@*/false || !!document.documentMode;
				// Edge 20+
			var isEdge = !isIE && !!window.StyleMedia;
				// Chrome 1+
			var isChrome = !!window.chrome && !!window.chrome.webstore;
				// Blink engine detection
			var isBlink = (isChrome || isOpera) && !!window.CSS;
			var explorador = {
				isIE: isIE,
				isEdge: isEdge,
				isFirefox: isFirefox,
				isChrome: isChrome
			};
			return explorador;

	  })
.factory('miServicio', function($http){
	var miServicio = {
		async: function(tabla) {
			// $http devuelve una promesa, la cual tiene una función, la cual también devuelve una promesa
			var promesa = $http.get('/api/'+tabla).then(function (respuesta) {
				//la función then aquí es una oportunidad para modificar la respuesta
				//el valor devuelto es tomado por el then en el controller
				return respuesta.data;
			});
			//se devuelve la promesa al controller
			return promesa;
		}
	};
	return miServicio;
})
.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/portada', {templateUrl: 'portada', controller:'portadaCtrl'})
	.when('/show-scene', {templateUrl: 'tpl/conf3d-show-scene.html', controller:'elegirmat'})
	.when('/select-scene', {templateUrl: 'tpl/carousel.html', controller:'CarouselDemoCtrl'})
	.when('/login', {templateUrl: 'login', controller:'loginCtrl'})
	.when('/editpavs', {templateUrl: 'editpavs', controller:'editmats'})
	.when('/editrevs', {templateUrl: 'editrevs', controller:'editmats'})
	.otherwise({redirectTo:'/portada'});
}])
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
})
.factory('Amb', function($rootScope){
	function dist(puntoA,puntoB){
		x1 = puntoA[0];
		x2 = puntoB[0];
		y1 = puntoA[1];
		y2 = puntoB[1];
		return Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2);
	}

	function poliDist(multilinea){
		var i = 0;
		var suma = 0;
		for (i;i<multilinea.length-1;i++){
			suma += dist(multilinea[i],multilinea[i+1]);
		}
		return suma;
	}

	function pathApuntos(camino){
		camino = camino.replace(/[mM] /,'');
		camino = camino.replace(' z','');
		camino = camino.split(' ');
		var poli = [];
		var j = 0;
		for (j;j<camino.length;j++){
			poli.push(camino[j].split(','));
		}
		return poli;
	}
	//var polilinea = pathApuntos('m 2,504 502,0 36,-103 296,0 0,-61 35,0 316,116 0,392 -1186,0 z');
	//var polAmb2 = poliDist(pathApuntos('M 2,608 379,532 l 193,7 121,-38 163,2 0,40 64,1 0,-40 268,2 0,342 -1185,0 z'));
	//console.log('polAmb2',polAmb2);



				//suelo: 'M 2,608 379,532 l 193,7 121,-38 163,2 0,40 64,1 0,-40 268,2 0,342 -1185,0 z',

	//var total = poliDist(polilinea);

	var ambiente = {
		amb01 :  {
				nombre: 'amb01',
				pared: 'm 834,2 0,398 -299,0 c 0,0 2,-16 0,-23 0,-3 -4,-7 -4,-7 0,0 -5,-2 -6,-4 -3,-3 -4,-8 -6,-12 -3,-3 -5,-6 -9,-9 -3,-2 -5,-5 -8,-6 -4,-2 -10,1 -13,-2 -2,-2 0,-5 -2,-7 -5,-4 -12,-2 -18,-4 -7,-1 -15,0 -20,-4 -2,-1 -1,-5 -3,-6 -3,-2 -7,0 -10,0 -5,1 -11,2 -16,4 -3,1 -6,4 -9,5 -4,2 -8,2 -12,3 -4,1 -8,4 -12,5 -3,0 -5,1 -8,0 -4,0 -10,-4 -10,-6 L 368,2 Z',
				suelo: 'm 2,504 502,0 36,-103 296,0 0,-61 35,0 316,116 0,392 -1186,0 z',
				largopared: '1712',
				largosuelo: '3261',
				transformpared: '',
				transformsuelo: ''
		},
		amb02 : {
				nombre: 'amb02',
				pared: 'M 1149 269 L 1070 272 L 1069 678 L 1149 679 L 1149 269 z M 715 280 L 3 312 L 3 661 L 447 670 L 474 665 L 715 674 L 867 625 L 867 366 L 715 280 z ',
				suelo: 'M 2,608 379,532 l 193,7 121,-38 163,2 0,40 64,1 0,-40 268,2 0,342 -1185,0 z',
				largopared: '1000',
				largosuelo: '3046',
				transformpared: 'matrix(0.80010057,0,0,0.80010057,0,-0.00102552)',
				transformsuelo: ''
		}
	};

	
	var Amb = {
		getAmb: function(){
			return $rootScope.escenaactual;
		},
		setAmb: function(imagen){
			$rootScope.escenaactual = imagen;
		},
		getPared: function(){
			return ambiente[$rootScope.escenaactual].pared;
		},
		getLargoPared: function(){
			return ambiente[$rootScope.escenaactual].largopared;
		},
		getSuelo: function(){
			return ambiente[$rootScope.escenaactual].suelo;
		},
		getLargoSuelo: function(){
			return ambiente[$rootScope.escenaactual].largosuelo;
		},
		getTransformPared: function(){
			return ambiente[$rootScope.escenaactual].transformpared;
		},
		getTransformSuelo: function(){
			return ambiente[$rootScope.escenaactual].transformsuelo;
		}
	};
	return Amb;
})
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
		})
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
})
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

})
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
})
.controller('portadaCtrl', function(Mats,$rootScope,$scope){
	$scope.setAmb = function(image){
		Mats.setAmb(image);
		document.location.replace('#show-scene');
	};
})
.controller('CarouselDemoCtrl', function (Mats,$scope,$rootScope) {
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  //vamos a elegir el ambiente actual
  //$scope.active = 0;
  var indiceActual = Mats.getAmb();
  indiceActual = indiceActual.replace('amb0','');
  indiceActual--;
  $scope.active = indiceActual;
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.cambiarEscena = function(elto) {
	  elto = elto.replace(/.*\//,'');
	  elto = elto.replace(/\..*/,'');
	  Mats.setAmb(elto);
  };

  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
	var newNumero = slides.length + 1;
      //image: 'http://lorempixel.com/' + newWidth + '/300',
    slides.push({
      text: ['Dormitorio','Salon','That is so cool','I love that'][slides.length % 4],
      image: 'ambientes/amb0' + newNumero + '.jpg',
      id: currIndex++
    });
  };

  $scope.randomize = function() {
    var indexes = generateIndexesArray();
    assignNewIndexesToSlides(indexes);
  };

  for (var i = 0; i < 2; i++) {
    $scope.addSlide();
  }

  // Randomize logic below

  function assignNewIndexesToSlides(indexes) {
    for (var i = 0, l = slides.length; i < l; i++) {
      slides[i].id = indexes.pop();
    }
  }

  function generateIndexesArray() {
    var indexes = [];
    for (var i = 0; i < currIndex; ++i) {
      indexes[i] = i;
    }
    return shuffle(indexes);
  }

  // http://stackoverflow.com/questions/962802#962890
  function shuffle(array) {
    var tmp, current, top = array.length;

    if (top) {
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    }

    return array;
  }
})
.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, carpeta) {
	toCamel = function (str) {
		return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
			return index === 0 ? letter.toUpperCase() : letter.toLowerCase();
		}).replace(/\s+/g, '');
	}; 


	$scope.camelize = function (frase){
		var palabras = frase.split(' ');
		var camelizado = '';
		for (var i = 0; i<palabras.length;i++) {

			camelizado = camelizado + ' ' + toCamel(palabras[i]);

		}
		return camelizado;
	};

	$scope.carpeta = carpeta;
	$scope.titulo = toCamel(carpeta.replace('/',''));
	toCamel('VAMOS HIJOPUTAS');
    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };
    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };
    $scope.cancel = function () {
        //$uibModalInstance.dissmiss('cancel');
        $uibModalInstance.close();
    };
})
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
							var rP = "ambientes/"+$scope.escenaactual+"/revestimientos/"+Mats.getMatPared();
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
			}])
			.directive('myTouchstart', [function() {
				return function(scope, element, attr) {

					element.on('touchstart', function(event) {
						scope.$apply(function() {
							scope.$eval(attr.myTouchstart);
						});
					});
				};
			}])
			.directive('myTouchend', [function() {
				return function(scope, element, attr) {

					element.on('touchend', function(event) {
						scope.$apply(function() {
							scope.$eval(attr.myTouchend);
						});
					});
				};
			}])
			.directive('c3dtpl', function() {
				return {
					restrict: 'E',
					templateUrl: 'tpl/contenido.html'
				};
			})
			.directive('c3dsvgbase', function(Amb,Mats,$rootScope,$document,$window) {
				return {
					restrict: 'E',
					templateUrl: 'tpl/c3dsvgbase.html',
					replace: true,
					link: function postLink(scope, element, attrs) {
						scope.amb = Mats.getAmb();
						scope.pared = Amb.getPared();
						scope.suelo = Amb.getSuelo();
						scope.obtenersuelo = function () {
							return Amb.getSuelo();
						};
						scope.transformpared = Amb.getTransformPared();
						scope.transformsuelo = Amb.getTransformSuelo();
						var paredPath = document.querySelector('#revestimiento');
						var sueloPath = document.querySelector('#pavjark');
						//var largoPared = parseInt(document.querySelector('#revestimiento').getTotalLength());
						var largoPared = Amb.getLargoPared();
						var largoSuelo = Amb.getLargoSuelo();
						//console.log('largoPared',largoPared);
						//var largoSuelo = parseInt(document.querySelector('#pavjark').getTotalLength());
						scope.getLargoSuelo = function() {
							//largoSuelo = parseInt(document.querySelector('#pavjark').getTotalLength());
							return largoSuelo;
						};
						//scope.getLargoSuelo();
						//definimos una clase y la aplicamos en la plantilla onhover
						if (scope.isIE){
							paredPath.setAttribute('d',scope.pared);
							paredPath.setAttribute('transform',scope.transformpared);
							sueloPath.setAttribute('d',scope.suelo);
							sueloPath.setAttribute('transform',scope.transformsuelo);
							//console.log('largoSuelo',parseInt(document.querySelector('#pavjark').getTotalLength()));
							sueloPath.style.strokeDasharray = largoSuelo;
							var initPath = 0;
							var pathDelta = parseInt(largoSuelo/100);
							var pathRevestDelta = parseInt(largoPared/100);
							var longLimit = largoSuelo;
							paredPath.style.strokeDashoffset = initPath;

							var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
							window.requestAnimationFrame = requestAnimationFrame;
							var reqAnimFrameID;
							var reqAnimFrameRevestID;
							var suma = largoSuelo;
							//console.log('suma',suma);
							var sumaRevest = largoPared;
							var fps = 20;
							var animActual;
							var currentAnimRevest;
							var drawRevest = function () {
								currentAnimRevest = setTimeout(function() {
									reqAnimFrameRevestID = requestAnimationFrame(drawRevest);
									sumaRevest = sumaRevest - 1;
									paredPath.style.strokeDashoffset = sumaRevest;
									//console.log('paredPath.style.strokeDashoffset',paredPath.style.strokeDashoffset);

								}, 200 / fps);//total / fps
							};
							var draw = function () {
								animActual = setTimeout(function() {
									reqAnimFrameID = requestAnimationFrame(draw);
									// Drawing code goes here
									sueloPath.style.strokeDashoffset = suma;
									if (suma < 0){
										suma = largoSuelo*2;
									}
									else {
										suma = suma - pathDelta;
									}

								}, 100 / fps);
							};

							scope.animarRevest = function(){
								//console.log('se inicia la animacion de la pared');
								//console.log('sumaRevest',sumaRevest);
								reqAnimFrameRevestID = drawRevest();
							};
							scope.animar = function(){
								//console.log('se inicia la animacion');
								reqAnimFrameID = draw();
							};
							scope.animOutRevest = function(){
								window.cancelAnimationFrame(reqAnimFrameRevestID);
								clearTimeout(currentAnimRevest);
								sumaRevest = largoPared;
							};
							scope.animOut = function(){
								window.cancelAnimationFrame(reqAnimFrameID);
								clearTimeout(animActual);
							};

							var doAnim = function () {
								if (sueloPath.style.strokeDashoffset > longLimit){
									//console.log('fin',sueloPath.style.strokeDashoffset);
									suma = suma + pathDelta;
									sueloPath.style.strokeDashoffset = suma;
									window.cancelAnimationFrame(reqAnimFrameID);
									return;
								}
								suma = suma + pathDelta;
								sueloPath.style.strokeDashoffset = suma;
								reqAnimFrameID = requestAnimationFrame(doAnim);
							};
						}//fin del if IE
					}
				};
			})
.directive('miIntro', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.miIntro);
                });

                event.preventDefault();
            }
        });
    };
})
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
					url: '/api/clean'+clase,
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
					url: '/api/init'+clase,
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
			  $http.post('/api/undel'+clase)
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
				var cadena = '/api/'+clase+'/'+mat_id;
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
				var urlremove = '/api/'+clase+'/'+mat_id;
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
