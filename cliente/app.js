/*eslint no-console: 0*/
var app = angular.module('materiales', ['angular-loading-bar', 'ngStorage', 'ngTouch', 'ngAnimate', 'ngRoute', 'ui.bootstrap']);
app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
}]);
