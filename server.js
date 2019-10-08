/* eslint no-console: 0 */
const express = require('express');
const path = require('path');
const http = require('http');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const uuid = require('uuid');
const favicon = require('serve-favicon');
const passport = require('passport');
const router = require('./rutas/rutas.js');

const app = express();
const port = process.env.PORT || 8080;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
function genuuid() {
  return uuid.v4();
}
app.use(session({
  genid: () => genuuid(),
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
app.use('/', router);
app.use('/', express.static(path.join(__dirname, 'cliente')));
app.use('/', express.static(path.join(__dirname, 'app', 'imgsbruto')));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(/^\/js|^\/css/, express.static(path.join(__dirname, 'node_modules')));
app.use('/libs', express.static(path.join(__dirname, 'bower_components')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/tpl', express.static(path.join(__dirname, 'tpl')));
// app.use('/app.js', express.static(path.join(__dirname, 'app.js')));
app.use('/ambientes', express.static(path.join(__dirname, 'app', 'ambientes')));
app.use('/revestimientos', express.static(path.join(__dirname, 'app', 'revestimientos')));
app.use('/pavimentos', express.static(path.join(__dirname, 'app', 'pavimentos')));
app.use('/portada', (req, res, next) => {
  res.render('portada');
  next();
});
app.use('/login', (req, res, next) => {
  res.render('login');
  next();
});
app.use('/autenticar', (req, res, next) => {
  res.send('ereselputoamo');
  next();
});
app.use('/caca', (req, res, next) => {
  res.send('tupu');
  next();
});
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Web server listening on port ${port}`);
});
