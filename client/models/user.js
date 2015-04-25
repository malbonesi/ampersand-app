var Model = require('ampersand-model');

module.exports = Model.extend({
    url: '/api/user',
    initialize: function(){
        this.fetch();
    },
    props: {
        _id: 'string',
        username: 'string',
        email: 'string',
        password: 'string'
    },
    session: {
        loggedIn: 'boolean'
    }
});