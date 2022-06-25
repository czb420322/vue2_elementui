/*********
 * ajax-then.js版本为1.0.0
 * ajax-then.js版本为1.0.1
 * 
 * ajax-then.js版本为1.0.2 处理超时统一处理
 * 
 * ajax-then.js版本为1.0.3 cache : false,//no cache
 * 
 */
define([ 'zepto', 'then' ], function($, Thenjs) {
	
	function RestHttp(params) {
	    this.params = params;
	    this._init();
	}
	
	RestHttp.prototype = {
			
			_init : function() { 
				
				var content = this;
	 
				var defults = {
					type : 'POST',
					timeout : 60000,
					contentType: 'application/x-www-form-urlencoded;charset=UTF-8',  //application/json
					dataType : 'json',
					data:{}
				};
				
				var data_temp = content.params.data;
				var contentType_temp = content.params.contentType;
				content.new_params = $.extend(defults, content.params);
				content.new_params.data = data_temp;
				content.headers = { token : $.fn.session_get('token') };
				if(contentType_temp && contentType_temp=='json'){
					content.new_params.contentType = "application/json;charset=UTF-8";
					content.new_params.type = "post";
					content.new_params.data = JSON.stringify(content.new_params.data);
				}
			},
			
			call : function() {
				 var content = this;
				 
				 return Thenjs(function (defer) {
	   				  $.ajax({
			   					type : content.new_params.type,
								url : content.new_params.url,
								headers : content.headers,
								cache : false,//no cache
								contentType: content.new_params.contentType,
								data : content.new_params.data,
								dataType : content.new_params.dataType,
								timeout : content.new_params.timeout,
						
						        success: function(data, status, xhr) {
						        	
									console.log( data );
									
									if(content.new_params.dataType == 'json'){
										if (data && data.code === 0) {
											 defer(null, { success : 0, content : data.content });
										}else{
											 defer(null, { success : 1, code : data.code, message: data.message });
										}
									}else{
										defer(null, data);
									}
									
						        }, 
						        error: function(xhr, type, error) {
						        	if(content.new_params.dataType == 'json'){
							        	if(null!=type && ''!=type && type=='timeout'){//如果接口是超时处理不锁屏
							        		defer(null, { success : 1, code : 5001, message: '请求超时' });
							        	}else{
							        		defer(null, { success : 1, code : 5000, message: '请求异常' });
							        	}
						        	}else{
										defer(null, '');
									}
						        }
						        
					   });
				  }) 
				  .then(function (defer, value) {
					  //指定页面跳转 或通过
					  console.log(value);
					  
					  if(content.new_params.dataType == 'json'){
					  
						  if(value.success===0){
							  
							  defer(null, value.content);
							  
						  }else if(value.success===1){
							  
							  $.hideMainPageLoader();
							  //处理错误
							  if(value.code===40002){//此接口没有授权 由于您长时间未操作本次登陆失效，请点击重新登录
								  $.alertReloadMessage("由于您长时间未操作本次登录失效，请点击重新登录");
							  }else if(value.code===5001){//此次请求ajax超时  本次操作请求超时，请重新操作
								  $.alertMessage('本次操作请求超时，请重新操作');
							  }else{
								  $.alertMessage("请求系统出现异常，请重新打开", null, 3600000);
							  }
							  
						  }
					  }else{
						  
						  defer(null, value);
						  
					  }
					  
				  }).fail(function (defer, error) {
					  
					  $.hideMainPageLoader();
					  $.alertMessage("请求系统出现异常，请重新打开", null, 3600000);
					  
				  });
			}
		};

	    return RestHttp;

});
