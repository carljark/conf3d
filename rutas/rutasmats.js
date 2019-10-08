/*eslint no-console: 0*/
var express = require('express');
var routerpavrev = new express.Router();
var fs = require('fs');
var modelos = require('../modelos/modelos');
var { Pav } = modelos;
var { Rev } = modelos;
routerpavrev.route([
'/pavimentos/:mat_id',
'/revestimientos/:mat_id'
]).
  put(function(req, res) {
	var clase = req.originalUrl.replace('/api/mats/','');
	clase = clase.replace(/\/.*$/,'');
	var mat;
	if (clase === 'pavimentos') {
          mat = Pav.build();
        } else {
          mat = Rev.build();
        }
	mat.modelo = req.body.modelo;
	mat.archivo = req.body.archivo;
	mat.serie = req.body.serie;
	mat.updateById(req.params.mat_id, function(success) {
          //console.log(success);
          if (success) {
            res.json({ message: 'Material actualizado!' });
          } else {
            res.send(401, "Material no encontrado");
          }
        }, function(error) {
          res.send("Material no encontrado");
          console.log(error);
        });
}).
  get(function(req, res) {
    var clase = req.originalUrl.replace('/api/mats/','');
    clase = clase.replace(/\/.*$/,'');
    var mat;
    if (clase === 'pavimentos'){
      mat = Pav.build();
    } else {
      mat = Rev.build();
    }
    mat.retrieveById(req.params.mat_id, function(material) {
      if (material) {
        res.json(material);
      } else {
        //res.send(401, "Material no encontrado por el id");
        res.status(500).send("Material no encontrado por el id");
      }
      }, function(error) {
            res.send("Error: get falló para el route pav_id: " + error);
      });
  }).
  delete(function(req, res) {
	var clase = req.originalUrl.replace('/api/mats/','');
	clase = clase.replace(/\/.*$/,'');
	var mat;
	if (clase === 'pavimentos'){
          mat = Pav.build();
	} else {
          mat = Rev.build();
	}
	mat.retrieveById(req.params.mat_id, function(hecho) {
          var { archivo } = hecho;
          mat.removeById(req.params.mat_id, function(materiales) {
            if (materiales) {
            var origen = './app/' + clase + '/' + archivo;
            var destino = './app/borrados/' + archivo;
              fs.rename(origen,destino, (err) => {
                if (err) {
                  throw err;
                }
                fs.stat(destino, (errorstat, stats) => {
                   if (errorstat) {
                     throw errorstat;
                   }
                   console.log(`stats del archivo movido:\n ${JSON.stringify(stats)}`);
                  res.send('Servidor: ' + clase + ' ' + hecho.modelo + ' borrado satisfactoriamente!');
                });
              });
            } else {
              res.send(401, clase + ' ' + req.params.mat_id + ' no encontrado para ser removido');
            }
          }, function(error) {
            res.send("Error: " + clase + " es false: " + error);
          });
        });
  });
routerpavrev.route([
'/pavimentos/',
'/revestimientos/'
]).
  post(function(req, res) {
    var clase = req.originalUrl.replace('/api/mats/','');
    //bodyParser does the magic
    var { modelo } = req.body;
    var { archivo } = req.body;
    var { serie } = req.body;
    var mat;
    if (clase === 'pavimentos'){
      mat = Pav.build({
        modelo: modelo,
        archivo: archivo,
        serie: serie
      });
    } else {
      mat = Rev.build({
        modelo: modelo,
        archivo: archivo,
        serie: serie
      });
    }
    mat.add(
      function(success){
        res.json({ message: '¡Material creado!' });
        console.log(success);
      },
      function(err) {
        res.send(err);
      }
    );
  }).
  get(function(req, res) {
    var clase = req.originalUrl.replace('/api/mats/','');
    console.log('clases solicitada: ' + clase);
    var mat;
    if (clase === 'pavimentos') {
      mat = Pav.build();
    } else {
      mat = Rev.build();
    }
    mat.retrieveAll(function(materiales) {
      if (materiales) {
        res.json(materiales);
        console.log('pavimentos ostias');
      } else {
        res.send(401, "Materiales no encontrados");
      }
      }, function(error) {
        res.send("Materiales no encontrados");
        console.log(error);
      });
});
routerpavrev.route([
  '/undelpavimentos',
  '/undelrevestimientos'
]).
  post(function(req,res) {
    var origen,destino;
    var clase = req.originalUrl.replace('/api/mats/undel','');
    fs.readdir('./app/borrados', (error, files) => {
      if (error) {
        throw error;
      }
      files.forEach(function(file) {
              origen = './app/borrados/' + file;
              destino = './app/' + clase + '/' + file;
              fs.rename(origen,destino,(err) => {
                if (err) {
                  throw err;
                }
              });
      });
      res.send('servidor: restauración completada');
    });
});
routerpavrev.route([
'/cleanpavimentos',
'/cleanrevestimientos'
]).
  post(function(req,res) {
    var clase = req.originalUrl.replace('/api/mats/clean','');
    if (clase === 'pavimentos'){
    var pavsClean = Pav.build();
    pavsClean.borrarTodos(
      function(){
        res.send('pavimentos borrados');
      },
      function(error) {
        res.send(error);
      }
    );
    } else {
      var revsClean = Rev.build();
      revsClean.borrarTodos(
        function(){
          res.send('revestimientos borrados');
        },
        function(error) {
          res.send(error);
        }
      );
    }
});
routerpavrev.route([
'/initpavimentos',
'/initrevestimientos'
]).
  post(function(req,res) {
    var clase = req.originalUrl.replace('/api/mats/init','');
    fs.readdir('./app/' + clase, (error, files) => {
      if (error) {
        throw error;
      }
      var matTodos, material;
      if (clase === 'revestimientos'){
        matTodos = Rev.build();
        material = Rev.build();
      } else {
        matTodos = Pav.build();
        material = Pav.build();
      }
      matTodos.conseguirArchivos(
        function(archivosBd) {
          if (archivosBd) {
            var matrizArchivos = archivosBd;
            files.forEach(function(fichero){
              if (fichero.endsWith('.jpg')){
                if (matrizArchivos.find(function (d) {
                    return d.archivo === fichero;
                  })) {
                  console.log('ya está hecho');
                } else {
                  var modelo = fichero.replace('.jpg','');
                  modelo = modelo.replace('_',' ');
                  modelo = modelo.replace('-',' ');
                  modelo = modelo.toUpperCase();
                  var serie = '';
                  if (clase === 'revestimientos'){
                    material = Rev.build({
                      modelo: modelo,
                      archivo: fichero,
                      serie: serie
                    });
                  } else {
                    material = Pav.build({
                      modelo: modelo,
                      archivo: fichero,
                      serie: serie
                    });
                  }
                  material.add(function(success){
                    return success;
                  },function(erroradd) {
                    return erroradd;
                  });
                }
              }
            });
            res.json({ message: '¡' + clase + ' añadidos!' });
          } else {
            console.log('no se ha añadido');
          }
        },
        function(err) {
          res.send(err);
        }
      );
    });
  });
module.exports = routerpavrev;
