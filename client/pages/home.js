var View = require('ampersand-view');
var templates = require('../templates');
var xhr = require('xhr');

module.exports = View.extend({
    template : templates.pages.home,
    events: {
        'click button': 'checkAuthenticated'
    },
    checkAuthenticated: function(){
        var self = this;
        xhr({
            method: 'get',
            uri: "/checkauth"
        }, 
        function (err, res) {
            console.log(res);
            //self.el.querySelector('[data-hook=auth-msg-container]').innerHTML = res;
        });
    }
});