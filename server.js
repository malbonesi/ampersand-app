var express = require('express')();
//var http = require('http').Server(express);
var compress = require('compress');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var mongoose = require('mongoose');
var morgan = require('morgan');
var helmet = require('helmet');
var Moonboots = require('moonboots-express');
var templatizer = require('templatizer');
var stylizer = require('stylizer');
var config = require('getconfig');
//var omit = require('lodash.omit');

var auth = require('./lib/auth')();

mongoose.connect(config.db.url);

express.use(morgan('dev'));
//express.use(compress());
//express.use(bodyParser.urlencoded());
express.use(bodyParser.json()); //This lets you get req.body
express.use(validator());
express.use(cookieParser('brittle-bacchus'));
express.use(session({
    resave: false,
    saveUnitialized: false,
    secret: 'brittle-bacchus'
}));

auth.init(express);
express.use(helmet.xssFilter());
express.use(helmet.nosniff());

var authorize = function(req, res, next){
    if (!req.isAuthenticated()) res.status(401).send(); 
    else next();
};

//express.all('/api', authorize);
express.get('/api/user', function(req, res){
    res.send(req.user);
});
express.post('/api/user', auth.register);
express.post('/login', auth.login);
express.get('/logout', auth.logout);
express.get('/exists/:username', auth.checkUser);


var moonboots = new Moonboots({
    server: express,
    moonboots: {
        main: __dirname + '/client/app.js',
        developmentMode: config.isDev,
        stylesheets: [
            __dirname + '/public/css/bootstrap.min.css',
            __dirname + '/public/css/app.css'
        ],
        beforeBuildJS: function(){
            if(config.isDev){
                templatizer(__dirname + '/templates', __dirname + '/client/templates.js');
            }
        },
        beforeBuildCSS: function(done){
            if(!config.isDev) return done();

            stylizer({
                infile: __dirname + '/public/app.styl',
                outfile: __dirname + '/public/css/app.css',
                development: true
            }, done);
        }
    }
});
 
express.listen(8080, function (){
    console.log('Server is running');
}).on('error', function(err) {
        console.log(err);
});

module.exports = express;