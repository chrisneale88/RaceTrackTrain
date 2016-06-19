// Dependencies
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Routes
var index = require('./routes/index.js');
var about = require('./routes/about.js');
var viewer = require('./routes/viewer.js');
var user = require('./routes/checkUser.js');

var app = express();
//var io = require("socket.io").listen(app);
//var async = require("async");

// View Engine Setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

// Configure Server Instance
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use('/', index);
app.use('/about', about);
app.use('/checkuser', user);
app.use('/viewer', viewer);

// Catch 404 and forward to the error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handlers



// Development Error Handler
// Will print stacktrace
if(app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production Error Handler
// No stacktrace leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
