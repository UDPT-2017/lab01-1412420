var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var session = require('express-session');

var app = express();
app.use(express.static('public'));
// view engine
var exphbs  = require('express-handlebars');

// truncate string 
var truncate = require('truncate');

// config view engine
var app = express();
var hbs = exphbs.create({
    helpers: {
      truncate: truncate
    },
    defaultLayout: 'application',
    partialsDir: ['views/partials/'],
    extname: 'hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// *** 

// server.js 
 
var breadcrumbs = require('express-breadcrumbs');
app.use(breadcrumbs.init());
 
// Set Breadcrumbs home information 
app.use(breadcrumbs.setHome());


// ---
// 
// 
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

var index = require('./controllers/index_controller');
var albums = require('./controllers/albums_controller');
var posts = require('./controllers/posts_controller');
var about = require('./controllers/about_controller');
var sessions = require('./controllers/sessions_controller');

// authentication
var auth = require("./auth/authentication");
app.use('/', index);
app.use('/albums', auth, albums);
app.use('/posts', auth, posts);
app.use('/about', auth, about);
app.use('/sessions', sessions);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
