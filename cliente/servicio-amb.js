angular.module('materiales')
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
});