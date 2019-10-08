angular.module('materiales')
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
  });
  