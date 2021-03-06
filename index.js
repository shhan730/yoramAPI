const express = require('express');
var app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');

// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));

require('./api/auth/passport')(passport);
app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지

module.exports = app;
