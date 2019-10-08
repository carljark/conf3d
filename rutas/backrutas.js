var express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
	fs = require('fs');


var modelos = require('../modelos/modelos');

var Pav = modelos.Pav,
	Rev = modelos.Rev,
	User = modelos.User;

router.route('/').get(function(req, res) {
	res.render('index');
});

passport.use('login', new LocalStrategy({
	passReqToCallback : true
},
function (req, username, password, done) {
	User.find({username: username}).then(function(user){
			if (!user){
				console.log('el usuario no existe');
				return done(null, false, { message: 'Nobody here by that name'});
			}
			if (user.password !== password){
				console.log('la contraseña está mal');
				return done(null, false, { message: 'Wrong password'});
			}
			console.log('user.username',user.username);
			return done(null, { username: user.username});
		});
	}
));
var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  //res.redirect('/');
	console.log('puede que aquí se pete');
	res.end();
};

router.get('/editpavs', isAuthenticated, function(req, res){
	console.log('estamos autenticados');
	//app.locals.titulo = 'Pavimentos';
	//app.locals.clase = 'pavimentos';
  res.render('conf3d-editmats', { user: req.user, titulo: 'Pavimentos', clase: 'pavimentos' });
});

router.get('/editrevs', isAuthenticated, function(req, res) {
	//app.locals.titulo = 'Revestimientos';
	//app.locals.clase = 'revestimientos';
	res.render('conf3d-editmats', { user: req.user, titulo: 'Revestimientos', clase: 'revestimientos' });
});
 
// As with any middleware it is quintessential to call next()
// if the user is authenticated
router.route('/autenticar')
.get(function(req,res,next){
	if(req.user){
		console.log('estamos');
		next();
	}
	else {
		res.end();
	}
})
.post(passport.authenticate('login', {
	sucessRedirect: '/autenticar',
	failureRedirect: '/caca',
	failureFlash: true
}));
/* GET Home Page */
// on routes that end in /users
// ----------------------------------------------------
router.route('/api/imgbruto')
.get(function(req, res) {
  console.log('hola imgbruto');
});

router.route(['/api/pavimentos/:mat_id', '/api/revestimientos/:mat_id'])

.put(function(req, res) {
	var clase = req.originalUrl.replace('/api/','');
	clase = clase.replace(/\/.*$/,'');
	var mat;
	if (clase==='pavimentos') mat = Pav.build(); else mat = Rev.build();

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
	  });
})

// get a user by id(accessed at GET http://localhost:8080/api/users/:user_id)
.get(function(req, res) {
                  console.log('joputa');
	var clase = req.originalUrl.replace('/api/','');
	clase = clase.replace(/\/.*$/,'');

	var mat;
	if (clase==='pavimentos') mat = Pav.build(); else mat = Rev.build();
	
	mat.retrieveById(req.params.mat_id, function(material) {
		if (material) {
		  res.json(material);
                  console.log('material pedido' + mat);
		} else {
		  //res.send(401, "Material no encontrado por el id");
                  res.status(status).send("Material no encontrado por el id");
		}
	  }, function(error) {
		res.send("Error: get falló para el route pav_id");
	  });
})

.delete(function(req, res) {
	var clase = req.originalUrl.replace('/api/','');
	clase = clase.replace(/\/.*$/,'');
	var mat;
	if (clase === 'pavimentos'){
		mat = Pav.build();
	}
	else {
		mat = Rev.build();
	}

	var archivo;
	console.log('mat',mat);
	mat.retrieveById(req.params.mat_id, function(hecho) {
		archivo = hecho.archivo;
		mat.removeById(req.params.mat_id, function(materiales) {
			if (materiales) {
			var origen = './app/'+clase+'/'+archivo;
			var destino = './app/borrados/'+archivo;
			  fs.rename(origen,destino, (err) => {
				if (err) throw err;
				fs.stat(destino, (err, stats) => {
				   if (err) throw err;
				   console.log(`stats del archivo movido:\n ${JSON.stringify(stats)}`);
				  res.send('Servidor: '+clase+' '+hecho.modelo+' borrado satisfactoriamente!');
				});
			  });
			} else {
			  res.send(401, clase+' '+mat_id+' no encontrado para ser removido');
			}
		  }, function(error) {
			res.send("Error: "+clase+" es false");
		  });
	});
	
});
router.route(/\/api\/pavimentos|\/api\/revestimientos/)

// create a user (accessed at POST http://localhost:8080/api/users)
.post(function(req, res) {
	var clase = req.originalUrl.replace('/api/','');

	var modelo = req.body.modelo; //bodyParser does the magic
	var archivo = req.body.archivo;
	var mat;

	if (clase === 'pavimentos'){
		mat = Pav.build({ modelo: modelo, archivo: archivo, serie: serie });
	}
	else {
		mat = Rev.build({ modelo: modelo, archivo: archivo, serie: serie });
	}

	mat.add(function(success){
		res.json({ message: '¡Material creado!' });
	},
	function(err) {
		res.send(err);
	});
})

.get(function(req, res) {
	var clase = req.originalUrl.replace('/api/','');
	var mat;
	if (clase==='pavimentos') mat = Pav.build(); else mat = Rev.build();

	mat.retrieveAll(function(materiales) {
		if (materiales) {
		  res.json(materiales);
		} else {
		  res.send(401, "Materiales no encontrados");
		}
	  }, function(error) {
		res.send("Materiales no encontrados");
	  });
});


router.route(/\/api\/undelpavimentos|\/api\/undelrevestimientos/)
.post(function(req,res) {
	var origen,destino;
	var clase = req.originalUrl.replace('/api/undel','');
	fs.readdir('./app/borrados', (error, files) => {
		if (error) throw error;
		files.forEach(function(file) {
			origen = './app/borrados/'+file;
			destino = './app/'+clase+'/'+file;
			fs.rename(origen,destino,(err) => {
				if (err) throw err;
				console.log('restauración correcta');
			});

		});
		res.send('servidor: restauración completada');
	});
});

router.route(/\/api\/cleanpavimentos|\/api\/cleanrevestimientos/)
.post(function(req,res) {
	var clase = req.originalUrl.replace('/api/clean','');
	if (clase === 'pavimentos'){
	var pavsClean = Pav.build();
	pavsClean.borrarTodos(function(){
		res.send('pavimentos borrados');
	},
	function(error) {
		res.send(error);
	});
	}
	else {
		var revsClean = Rev.build();
		revsClean.borrarTodos(function(){
			res.send('revestimientos borrados');
		},
		function(error) {
			res.send(error);
		});

	}
});

router.route(/\/api\/initpavimentos|\/api\/initrevestimientos/)
.post(function(req,res) {
	var clase = req.originalUrl.replace('/api/init','');
	console.log('clase:',clase);
	fs.readdir('./app/'+clase, (error, files) => {
		if (error) throw error;
		//entonces añadimos los ficheros a la base de datos
		//comprobando previamente que el fichero de imagen no existe en la base de datos
		//para no repetir registros con la misma imagen
		//usamos un loop con la cantidad de files
		//
		//console.log('ficheros en'+clase,files);
		var matTodos, material;
		if (clase === 'revestimientos'){
			matTodos = Rev.build();
			material = Rev.build();
		}
		else {
			matTodos = Pav.build();
			material = Pav.build();
		}
			matTodos.conseguirArchivos(function(archivosBd) {
				if (archivosBd) {
					console.log('archivosBd:',archivosBd);
					matrizArchivos = archivosBd;
					files.forEach(function(fichero){
						console.log('fichero en '+clase+':',fichero);
						if (fichero.endsWith('.jpg')){
							if (matrizArchivos.find(function (d) {
								return d.archivo === fichero;
							})) {
								console.log('encontrado');
							} else {
								console.log('NO encontrado');
								//a partir de aquí se introduce el archivo en la bd
								var modelo = fichero.replace('.jpg','');

								modelo = modelo.replace('_',' ');
								modelo = modelo.replace('-',' ');

								modelo = modelo.toUpperCase();
								
								serie = '';

								if (clase === 'revestimientos'){
									material = Rev.build({
										modelo: modelo,
										archivo: fichero,
										serie: serie
									});
								}
								else {
									material = Pav.build({
										modelo: modelo,
										archivo: fichero,
										serie: serie
									});
								}
								material.add(function(success){
									//res.json({ mensaje: 'Pavimento añadido a la base de datos'});
									return 'ole';
								},function(error) {
									//res.send(error);
									return error;
								});
							}
						}
					});
					res.json({ message: '¡'+clase+' añadidos!' });
				}
				else {
					console.log('no hay '+clase+' en la base datos');
				}
			},
			function(err) {
				res.send(err);
			});
	});
});



var carpetas = [
	'./app/',
	'./app/js/'
];
function cambios(req,res){
	console.log('Ficheros auditados:');
	//var carpeta = './public/js/';
	var j = 0;
	carpetas.forEach(function (p){
		fs.readdir(p, (error, files) => {
			if (error) throw error;
			files.map(function (file) {
				return path.join(p, file);
			}).filter(function (file) {
				//return (fs.statSync(file).isFile() && file.match(/.js$|.html$/));
				return (file.match(/\.js$|\.html$/));
			}).forEach(function (file) {
				console.log(file);
				fs.watchFile(file,function(){
					console.log("Fichero cambiado: %s (%s)", file, path.extname(file));
					delete require.cache[file];
					console.log('función para refrescar el navegador cliente');
				});
			});
		});
	});
}
router.use(function(req, res, next) {
    var ip = req.connection.remoteAddress;
	console.log('ip:',ip);
	next();
});
//router.use(function(req, res, next) {
//	cambios(req,res);
//	next();
//});
module.exports = router;
