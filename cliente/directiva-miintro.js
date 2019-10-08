angular.module('materiales')
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
});