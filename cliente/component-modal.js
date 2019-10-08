angular.module('materiales')
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
});
