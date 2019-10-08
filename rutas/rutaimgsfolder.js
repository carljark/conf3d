var express = require('express');
var routerimgs = new express.Router();
var fs = require('fs');
routerimgs.route('/api/imgsfolder').
get(function(solicitud, respuesta) {
  fs.readdir('./app/imgsbruto', (error, files) => {
    if (error){
      throw error;
    }
    var imagenes = [];
    var id = 0;
    var meter = false;
    var modelo = "";
    files.forEach(function(file) {
      id += 1;
      imagenes.push({
        id: id,
        ruta: file,
        nombre: modelo,
        meter: meter
      });
    });
    respuesta.json(imagenes);
  });
});
module.exports = routerimgs;
