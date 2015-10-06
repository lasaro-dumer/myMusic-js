/**
* Module dependencies.
*/

var express = require('express');
var session = require('express-session');
var routes = require('./routes');
var path = require('path');
var favicon = require('serve-favicon');
var moment = require('moment');

var server_port = process.env.PORT || 5000
//var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var app = express();

// all environments
app.set('port', server_port);
app.use(express.cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

console.log(moment().format('YYYY-MM-DD HH:mm:ss.SSS'));

app.get('/', routes.index);
app.get('/stream',routes.stream);
//POSTS - for assync basically
//app.post('/login', routes.login);
exports.timestamp = function(){
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
}

var io = require('socket.io').listen(app.listen(app.get('port'), function(){
    process.env.NODE_ENV = app.get('env');
    console.log("Running in "+ process.env.NODE_ENV +" mode");
    console.log("Listening on localhost:" + app.get('port'));
}));
