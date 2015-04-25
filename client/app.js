var Router = require('./router');
var domready = require('domready');
var MainView = require('./views/main');
var User = require('./models/user');
//var socket = require('socket.io-client')('http://localhost');

window.app = {
  init: function(){
      var self = this;
      this.me = new User();
      this.router = new Router();
      domready(function(){
          self.view = new MainView({ el: document.body });
          self.router.history.start({ pushState: true });
      });
  },
  navigate: function(url){
      this.router.history.navigate(url, { trigger: true });
  }
};
//window.socket = socket;
window.app.init();