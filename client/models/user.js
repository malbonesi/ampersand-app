var Model = require('ampersand-model');

module.exports = Model.extend({
    url: '/api/user',
    initialize: function(){
        this.fetch();
    },
    props: {
        _id: 'string', //id is a string, because it's going to be some crazy mongo hash
        username: 'string',
        email: 'string',
        password: 'string'
    },
    session: {
        loggedIn: 'boolean'
    }
});