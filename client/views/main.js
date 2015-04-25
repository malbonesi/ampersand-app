var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var templates = require('../templates');

module.exports = View.extend({
   template: templates.main,
   autoRender: true,
   events: {
       'click a': 'handleLinkClick'
   },
   initialize: function(){
       this.listenTo(app.router, 'page', this.handleNewPage);
   },
   render: function(){
       this.renderWithTemplate();
       this.pageSwitcher = new ViewSwitcher(this.queryByHook('page-container'));
   },
   handleNewPage: function(page){
       this.pageSwitcher.set(page); //set() will automatically call render() on that view, btw
                                    //so don't necessarily need to set autoRender: true
   },
   handleLinkClick: function(e){
       var aTag = e.target;
       if (aTag.host === window.location.host){
            //This is a local click
            app.navigate(aTag.pathname);
            e.preventDefault();//Don't let it go to the server
       }
   }
});