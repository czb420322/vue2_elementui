/*********
 * page-util.js版本为1.0.0
 * 修改记录
 * 支持page 1.1.0
 * 支持cookie  1.1.1
 * 升级到 1.1.2 20170714 升级支持支付宝
 * 
 * 
 */
define([ 'sm', 'module/agent', 'util/util', 'then' ], function(sm, agent, util, Thenjs) {

	return {
		
		silentLogin : function() {
			   
	    	   return Thenjs(function (defer) {
	    		   
	    		   var token = util.getToken('token');
	    		   
	    		   if(util.isPlateformApp()){
	    			   
	    			   if(token){
	    				   agent.accountCheck().then(function (defer2, content) {
		   						if(content.token){//服务器还存在
		   							defer2(null, true);
		   						}else{
		   							util.removeToken();//移除
		   							defer2(null, false);
		   						}
			   			   }).then(function (defer2, value) {
			   				   	  defer(null, value);
			   			   });
		    		   }else{
		    			   defer(null, false);
		    		   }
	    			   
	    		   }else if(util.isPlateformPage()){
	    			   if(token){
	    				      //存在需要去验证 下是否过期
	    				   agent.accountCheck().then(function (defer2, content) {
		   						  if(content.token){//服务器还存在
		   							  defer2(null, true);
		   						  }else{
		   							  util.removeToken();//移除
		   							  defer2(null, false);
		   						  }
			   				  }).then(function (defer2, value) {
			   				   	    defer(null, value);
			   				  });
		    		   }else{
		    			   defer(null, false);
		    		   }
	    			  
	    		   }else if(util.isPlateformWx() || util.isPlateformAlipay()){
	    			   
	    			   var third = util.getThird('third');
		    		   
		    		   if(third){
		    			      //存在需要去验证 下是否过期
		    			   agent.accountCheck().then(function (defer2, content) {
		   						  if(content.third && content.token){//服务器还存在
		   							  defer2(null, true);
		   						  }else{
		   							  
		   							  if(content.third){//去登录
		   								   util.removeToken();//移除
		   								agent.thirdLogin({ thirdToken :third, isLogin : '1' }).then(function (defer3, cont) {
			   				   					if(cont.result=='0'){
			   				   						if(cont.token){
			   				   							util.setToken(cont.token);
			   				   							defer3(null, true);
			   				   						}else{
			   				   							defer3(null, false);
			   				   						}
			   				   					}else{
			   				   						defer3(null, false);
			   				   					}
			   			   				  }).then(function (defer3, value) {
			   			   				   		defer2(null, value);
			   			   				  });
		   								   
		   							  }else{//全部删除
		   								  util.removeThird();//
		   								  util.removeToken();//移除
		   								  defer2(null, false);
		   							  }
		   							  
		   						  }
		   						  
			   				  }).then(function (defer2, value) {
			   				   	    defer(null, value);
			   				  });
		    		   }else{//第三方id为空直接返回
		    			   defer(null, false);
		    		   } 
	    		   }
	    		   
		       }).then(function (defer, value) {
					defer(null, value);
			   }).fail(function (defer, error) {
				    defer(null, false);
			   });
	    	   
		},
		
		
		isLogin : function() {
			
	    	   return Thenjs(function (defer) {
	    		   
	    		   var token = util.getToken('token');
	    		   
	    		   if(null==token || ''==token){
	    			   defer(null, false);
	    		   }else{
	    			   agent.accountCheck().then(function (defer2, content) {
	   						if(content.token){
	   							defer2(null, true);
	   						}else{
	   							util.removeToken();//移除
	   							defer2(null, false);
	   						}
	   				  }).then(function (defer2, value) {
	   				   		defer(null, value);
	   				  }); 
	    		   }
		       })
			   .then(function (defer, value) {
					defer(null, value);
			   }).fail(function (defer, error) {
				    defer(null, false);
			   });
	    	   
		}
	
	};

});