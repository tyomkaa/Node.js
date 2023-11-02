var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const i18n = require('i18n');

const clApiRouter = require('./routes/api/ClientApiRoute');
const matApiRouter = require('./routes/api/MattressApiRoute');
const orApiRouter = require('./routes/api/OrderApiRoute');

var indexRouter = require('./routes/index');
var clientRouter = require('./routes/clientRoute');
var orderRouter = require('./routes/orderRoute');
var mattressRouter = require('./routes/mattressRoute');

const authUtils = require('./util/authUtils');

var app = express();

i18n.configure({
  locales: ['pl', 'en'], 
  directory: path.join(__dirname, 'locales'), 
  objectNotation: true, 
  cookie: 'ekon-lang', 
});

const session = require('express-session');
app.use(session({
  secret: 'my_secret_password',
  resave: false,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(i18n.init);

app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser; 
  res.locals.loggedUser = loggedUser;

  if(!res.locals.loginError){
    res.locals.loginError = undefined;
  }

  next();
});

app.use((req, res, next) => {
  if(!res.locals.lang) {
    res.locals.lang = req.cookies['ekon-lang'];
  }
  next();
});

app.use('/', indexRouter);
app.use('/client', clientRouter);
app.use('/order', orderRouter);
app.use('/mattress', mattressRouter);

app.use('/api/clients', clApiRouter);
app.use('/api/mattresses', matApiRouter);
app.use('/api/orders', orApiRouter);


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
  res.render('error');
});

module.exports = app;
