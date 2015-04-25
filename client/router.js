var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var SignupPage = require('./pages/signup');
var LoginPage = require('./pages/login');
var xhr = require('xhr');

module.exports = Router.extend({
    routes: {
        '': 'home',
        'signup': 'signup',
        'login': 'login',
        'logout': 'logout',
        '(*path)': 'catchAll'
    },
    home: function(){
        this.trigger('page', new HomePage());
    },
    signup: function(){
        this.trigger('page', new SignupPage());
    },
    login: function(){
        this.trigger('page', new LoginPage());
    },
    logout: function(){
        xhr({uri: "/logout"},
        function(err, res){
            app.navigate('');
        });
    },
    catchAll: function () {
        this.redirectTo('');
    }
});