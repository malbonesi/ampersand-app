var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var FacebookStrategy = require('passport-facebook').Strategy;
//var TwitterStrategy = require('passport-twitter').Strategy;
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require('../models/user');

passport.serializeUser(function(user, done){
    done(null, user._id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err || !user){ return done(err, null); }
        return done(null, user);
    });
});

module.exports = function(server, options){

return {

init: function(server){
    //Log in with username and password 
    passport.use(new LocalStrategy(function(username, password, done){
        User.findOne({ username: username }, function(err, user){
            if (err) { return done(err); }
            if (!user){ return done(null, false, { message: 'Username not found.' }); }
            
            user.comparePassword(password, function(err, isMatch){
                if(err){ return done(err); }
                if(!isMatch){ return done(null, false, { message: 'Incorrect password.' }); }
                return done(null, user);
            });
        });
    }));
    
    //Log in with Facebook
    
    //Log in with Google
    
    //Log in with Twitter
    
    //Initalize passport and sessions
    server.use(passport.initialize());
    server.use(passport.session());
},
register: function(req, res, next){
    //These should only fail if someone is not submitting through the form
    req.assert('username', 'Username invalid').isAlphanumeric().len(5,12);
    req.assert('email', 'Email invalid').isEmail();
    req.assert('password', 'Password invalid').len(6,20);
    
    var errors = req.validationErrors();
    if (errors) {
        res.status(400);
        return res.send('Invalid');
    }
    
    //{ $regex: req.body.username, $options: 'i' }
    User.findOne({username: req.body.username}, function(err, existingUser){
         if (err){ return next(err); }
         if (existingUser) {
            res.status(401);
            return res.send('Username exists');
        }
        
        User.create({ username: req.body.username, password: req.body.password, email: req.body.email }, function(err, user){
            if (err){ return next(err); }
            
            //Log the user in
            req.logIn(user, function(err){
                if (err){ return next(err); }
                
                res.status(201);
                return res.send(user._id);
            });
        });
    });
},
login: function(req, res, next){
    req.assert('username', 'Username or password invalid').isAlphanumeric().len(5,12);
    req.assert('password', 'Username or password invalid').len(6,20);
    
    var errors = req.validationErrors();
    if (errors) {
        return res.status(401).send();
    }
    
    passport.authenticate('local', function(err, user, info){
        if (err) return next(err);
        
        if (!user) {
            return res.status(401).send();
        }

        req.login(user, function(err) {
            if (err) return next(err); 
            return res.status(200).send();
        });
        
    })(req, res, next);

},
logout: function(req, res){
    req.logout();
    res.end();
},
checkUser: function(req, res, next){
    User.findOne({username: { $regex: req.params.username, $options: 'i' }}, function(err, existingUser){
         if (err){ return next(err); }
         if (existingUser) {
            return res.send('true');
        }
        else {
            return res.send('false');
        }
    });
}
};
};