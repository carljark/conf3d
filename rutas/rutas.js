/*eslint no-console: 0*/
/*eslint max-params: 0*/
var express = require('express');
var router = new express.Router();
const routerimgs = require('./rutaimgsfolder.js');
const routermats = require('./rutasmats.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var fs = require('fs');
var modelos = require('../modelos/modelos');
var { Pav } = modelos;
var { User } = modelos;
router.route('/').get(function(req, res) {
	res.render('index');
});
passport.use('login', new LocalStrategy(
  { passReqToCallback: true },
  function (req, username, password, done) {
    console.log('nombre de usuario pasado desde el cliente: ' + username);
    console.log('contraseña de usuario pasada desde el cliente: ' + password);
    User.findOne({
      where: { nombre: username },
      attributes: [
        'id',
        'nombre',
        'password'
      ]
    }).
      then((resultado) => {
        console.log('resultado en el buscador: ' + resultado);
        console.log('contraseña de usuario pasada al buscador password: ' + password);
        if (!resultado){
          console.log('el usuario no existe');
          return done(null, false, { message: 'Nobody here by that name' });
        }
        if (resultado.password !== password){
          console.log('la contraseña está mal');
          return done(null, false, { message: 'Wrong password' });
        }
        console.log('correcta la contraseña y el usuario = "' + resultado.nombre + ':' + resultado.password + '"');
        return done(null, { nombre: resultado.nombre });
      });
  }
));

function isAuthenticated (req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.end();
  return false;
}
router.get('/editpavs', isAuthenticated, function(req, res){
  res.render('conf3d-editmats', {
    user: req.user,
    titulo: 'Pavimentos',
    clase: 'pavimentos'
  });
});

router.get('/editrevs', isAuthenticated, function(req, res) {
  res.render('conf3d-editmats', {
    user: req.user,
    titulo: 'Revestimientos',
    clase: 'revestimientos'
  });
});

router.route('/autenticar').
  get(function(req,res,next) {
      if (req.user) {
        next();
      } else {
      res.end();
    }
    }).
  post(passport.authenticate('login', {
	sucessRedirect: '/autenticar',
	failureRedirect: '/caca',
	failureFlash: true
  }));

router.route('/api/meter/:id').
  put(function(req, res) {
    Pav.build({
      modelo: req.body.nombre,
      archivo: req.body.ruta
    }).
      save().
      // el objeto una vez salvado lo podemos meter como argumento de la
      // siguiente función
      then(() => {
    const orig = './app/imgsbruto/' + req.body.ruta;
    const dest = './app/pavimentos/' + req.body.ruta;
    fs.rename(orig, dest, (error) => {
      if (error) {
        throw error;
      }
      fs.stat(dest, (errorstat, stats) => {
        if (errorstat){
          throw errorstat;
        }
        res.send('movido');
        console.log('stats: ' + stats);
      });
    });
  }).
      catch((error) => {
        console.log('error al put: ' + error);
  });
});
// router.use(function(req, res, next) {
//     var ip = req.connection.remoteAddress;
// 	console.log('ip:',ip);
// 	next();
// });
router.use('/api/imgsfolder', routerimgs);
router.use('/api/mats', routermats);
module.exports = router;
