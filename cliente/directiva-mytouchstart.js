angular.module('materiales')
.directive('myTouchstart', [function() {
    return function(scope, element, attr) {

        element.on('touchstart', function(event) {
            scope.$apply(function() {
                scope.$eval(attr.myTouchstart);
            });
        });
    };
}]);