angular.module('materiales')
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
});
