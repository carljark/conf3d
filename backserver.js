// BASE SETUP
// =============================================================================

var express = require('express'),
	path = require('path'),
	http = require('http'),
	reload = require('reload'),
	fs = require('fs'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	html = require('html'),
	session = require('express-session'),
	flash = require('connect-flash'),
	uuid = require('uuid'),
	favicon = require('serve-favicon'),
	router = require('./rutas/rutas.js'),
	passport = require('passport');




var app = express();
//app.use(bodyParser());

var env = app.get('env') == 'development' ? 'dev' : app.get('env');
var port = process.env.PORT || 8080;

//preparamos el servidor para que refresque el navegador con los cambios
var reloadify = require('./lib/reloadify');
reloadify(app, __dirname + '/views');


// IMPORT MODELS
// =============================================================================

var env = "dev";

var crypto = require('crypto');

//funciones comunes
var modelo,archivo,serie;
var matrizArchivos;
function procesarRegistros(ficheros) {
		var pavTodos = Pav.build();
	return pavTodos.conseguirArchivos(function(archivosBd) {
			if (archivosBd) {
				matrizArchivos = archivosBd;
				ficheros.forEach(addPav);
			}
	});
}


function addPav(fichero) {

	if (fichero.endsWith('.jpg')){
		if (matrizArchivos.find(function (d) {
			return d.archivo === fichero;
		})) {
			console.log('encontrado');
		} else {
			console.log('NO encontrado');
			//a partir de aquí se introduce el archivo en la bd
			modelo = fichero.replace('.jpg','');

			modelo = modelo.replace('_',' ');
			modelo = modelo.replace('-',' ');

			modelo = modelo.toUpperCase();

			serie = '';

			var pav = Pav.build({
				modelo: modelo,
				archivo: fichero,
				serie: serie
			});
			pav.add(function(success){
				//res.json({ mensaje: 'Pavimento añadido a la base de datos'});
				return 'ole';
			},function(error) {
				//res.send(error);
				return error;
			});
		}
	}
}


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Methods', '*');

    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
function genuuid () {
	return uuid.v4();
}
app.use(session({
	genid: function(req) {
		return genuuid();
	},
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

app.use('/', router);

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(/^\/js|^\/css/, express.static(path.join(__dirname, 'node_modules')));
app.use('/libs', express.static(path.join(__dirname, 'bower_components')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/tpl', express.static(path.join(__dirname, 'tpl')));
app.use('/app.js', express.static(path.join(__dirname, 'app.js')));
app.use('/ambientes', express.static(path.join(__dirname, 'app', 'ambientes')));
app.use('/revestimientos', express.static(path.join(__dirname, 'app', 'revestimientos')));
app.use('/pavimentos', express.static(path.join(__dirname, 'app', 'pavimentos')));

app.use('/portada', function(req, res, next){
	res.render('portada');
	next();
});


app.use('/login', function(req,res,next){
	res.render('login');
	next();
});
app.use('/autenticar', function(req,res,next){
	res.send('ereselputoamo');
	next();
});
app.use('/caca', function(req,res,next){
	res.send('tupu');
	next();
});

var server = http.createServer(app);
reload(server, app);

//app.locals.cojones = 'Pavimentos';

server.listen(port, function() {
	console.log("Web server listening on port " + port);
});
