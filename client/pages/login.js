var View = require('ampersand-view');
var templates = require('../templates');
//var SignupForm = require('../forms/signup');
var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var User = require('../models/user');
var xhr = require('xhr');

module.exports = View.extend({
    
template: templates.pages.login,
subviews: {
    form: {
        hook: 'login-form',
        prepareView: function(el){
            return new FormView({
                el: el,
                fields: [
                    new InputView({
                        name: 'username',
                        label: 'Username',
                        required: true,
                        tests: [
                            function(val){
                                console.log('checking: ' + val);
                                if(val.length < 5 || val.length > 12){
                                    return 'Must be 5-12 characters';
                                }
                            },
                            function(val){
                                var re = /^[a-zA-Z0-9]+$/;
                                if (!re.test(val)){
                                    return 'Must contain only letters and numbers';
                                }
                            }
                        ]
                    }),
                    new InputView({
                        type: 'password',
                        name: 'password',
                        label: 'Password',
                        required: true,
                        tests: [
                            function(val){
                                if(val.length < 6){
                                    return 'Must be at least 6 characters';
                                }
                            }
                        ]
                    })
                ],
                submitCallback: function(data){
                    var self = this;
                    xhr({
                        method: 'post',
                        uri: "/login",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data)
                    }, 
                    function (err, res) {
                        if(res.statusCode === 200){
                            app.navigate('');
                        }
                        else{
                            console.log(res);
                            self.el.querySelector('[data-hook=error-msg]').innerHTML = 'Invalid Username/Password';
                        }
                    });
                }
            });
        }
    }
}
});