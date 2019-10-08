angular.module('materiales')
.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/portada', {templateUrl: 'portada', controller:'portadaCtrl'})
	.when('/show-scene', {templateUrl: 'tpl/conf3d-show-scene.html', controller:'elegirmat'})
	.when('/select-scene', {templateUrl: 'tpl/carousel.html', controller:'CarouselDemoCtrl'})
	.when('/login', {templateUrl: 'login', controller:'loginCtrl'})
	.when('/editpavs', {templateUrl: 'editpavs', controller:'editmats'})
	.when('/editrevs', {templateUrl: 'editrevs', controller:'editmats'})
	.otherwise({redirectTo:'/portada'});
}]);