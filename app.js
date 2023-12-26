const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

// routes files
const login = require('./routes/login/signin');


function main(){
  const app = express();

  setViewEngine(app);
  setLocals(app);
  setMiddlewares(app);
  setRoutes(app);
  errorHandler(app);

  module.exports = app;
}


function setViewEngine(app){
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
}


function setLocals(app){
  app.use(function(req, res, next) {
    next();
  })
}


function setMiddlewares(app){
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
}


function setRoutes(app){
  app.use('/login/signin', login);
}


function errorHandler(app){
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('<h1>Error</h1>')
  });
}

main();