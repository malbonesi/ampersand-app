var View = require('ampersand-view');
var templates = require('../templates');
//var SignupForm = require('../forms/signup');
var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var User = require('../models/user');
var xhr = require('xhr');

module.exports = View.extend({
    template: templates.pages.signup,
    subviews: {
        form: {
            hook: 'signup-form',
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
                                    if(val.length < 5 || val.length > 12){
                                        return 'Must be 5-12 characters';
                                    }
                                },
                                function(val){
                                    var re = /^[a-zA-Z0-9]+$/;
                                    if (!re.test(val)){
                                        return 'Must contain only letters and numbers';
                                    }
                                }//,
                               /* function(val){
                                    xhr({
                                        //body: someJSONString,
                                        uri: "/exists/" + val,
                                        headers: {
                                            "Content-Type": "application/json"
                                        }
                                    }, function (err, resp, body) {
                                        console.log('err: ' + err);
                                        console.log('resp: ' + resp);
                                        console.log('body: ' + body);
                                    });
                                }*/
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
                        }),
                        new InputView({
                            type: 'email',
                            name: 'email',
                            label: 'Email',
                            required: true,
                            tests: [
                                function(val){
                                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                    if(!re.test(val)){
                                        return 'Invalid email';
                                    }
                                }
                            ]
                        })
                    ],
                    submitCallback: function(data){
                        /*
                        xhr({
                            //body: someJSONString,
                            uri: "/exists/malbonesi",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }, function (err, resp, body) {
                            console.log('err: ' + err);
                            console.log('resp: ' + JSON.stringify(resp));
                            console.log('body: ' + body);
                        });*/
                        //console.log(data);
                        //Why not set it to app.me right away?
                        //Becuase if it fails, you would probabaly want to remove that ref
                        //So just set it on success, once you know it's valid
                        //But then you have two references to me...
                        //Just set app.me here
                        var self = this;
                        app.me = new User(data);
                        app.me.save([],{
                            wait: true,
                            success: function(model, res){
                                app.me.id = res._id;
                                app.me.unset('password', {silent: true});
                                app.navigate('');
                            },
                            error: function(res){
                                var err = res.body;
                                //Let the user know what happened
                                
                                 console.log(JSON.stringify(self));
                            }
                        });
                    }
                });
            }
        }
    }
});