var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

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
      truncate: truncate,
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


var index = require('./routes/index');
var albums = require('./routes/albums');
var posts = require('./routes/posts');
var about = require('./routes/about');

app.use('/', index);
app.use('/albums', albums);
app.use('/posts', posts);
app.use('/about', about);
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
