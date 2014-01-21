
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');

var user = require('./routes/user');
var http = require('http');
var path = require('path');
var util = require('util');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var MongoStore=require('connect-mongo')(express);
var settings=require('./settings');

app.configure(function(){
        app.set('view',__dirname+'/views');
        app.set('view engine','jade');
        app.use(express.json());
        app.use(express.urlencoded());
        app.use(express.methodOverride());
        app.use(express.cookieParser());
        app.use(express.session({
            secret:settings.cookieSecret,
            store:new MongoStore({
                db : settings.db
            })
        }));
        app.use(app.router());
        app.use(express.static(__dirname+'/public'));
    }

);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.locals({
    inspect: function (obj) {
        return util.inspect(obj, true);
    }
});
app.use({
    headers: function (req, res) {
        res.locals.headers = req.headers;
        next();
    }
});

app.get('/', routes.index);
app.get('/u/:user', routes.user);
app.post('/post', routes.post);
app.get('/reg', routes.reg);
app.post('/reg', routes.doReg);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', routes.logout);
//app.get('/hello', routes.hello);
//app.get('/users', user.list);
//app.get('/list', function (req, res) {
//    res.render('list', {
//        title: 'List',
//        items: [1991, 'kuma', 'express', 'node.js']
//    });
//});



//app.get('/helper', function (req, res) {
//    res.render('helper', {
//        title: 'Helpers'
//    });
//});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


