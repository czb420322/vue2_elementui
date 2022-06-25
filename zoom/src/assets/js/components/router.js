/***
 */

define(function (require) {

  var util = require('util/util');

  return {
	  
    template: '<a tapmode href="#" @click="goPage"><slot></slot></a>',
    
    props: {
      url: {
        type: String
      },
      location: {
        type: Boolean,
        default: false
      },
      type: {
        type: Boolean,
        default: false
      },
      pagekey: {
        type: String
      }
    },
    methods: {
      goPage() {
    	
        if (!this.url) {
          return;
        }
        
        util.goPage(this.url, {
            location: this.location,
            type: this.type,
            pageKey: this.pagekey
        });
       
      }
    }
  };

});