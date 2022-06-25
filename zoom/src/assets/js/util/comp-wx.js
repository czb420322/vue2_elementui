/*********
 *comp-wx.js 
 * 
 */
define([ 'sm', 'module/agent', 'util/util', 'then', 'jweixin'], function(sm, agent, util, Thenjs, jweixin) {
	
	function wxCommon(params) {
		//回调函数
		this.apiList = ['onMenuShareTimeline', 'onMenuShareAppMessage','getLocation'];
		
		if(params && params.apiList){
			this.apiList = this.apiList.concat(params.apiList);
		}
		if(params && params.callBack){
			this.callBack = params.callBack;
		}
		this.errorCount = 3;
		this.signUrl = window.location.href;
		
		this.timestamp = null;
		this.nonceStr = null;
		this.signature = null;
		
	}
	
	wxCommon.prototype = {
			
			//微信验证签名初始化
			init : function() {
				  
				  var content = this;
				  //wx 开始验证签名
				  if(util.isPlateformWx()){
					  agent.initSign({shareUrl : content.signUrl}).then(function (defer, data) {
						   content.timestamp = data.timestamp;
						   content.nonceStr = data.nonceStr;
						   content.signature = data.signature;
						   content.wxConfig();
					  });
				  }
				  
			},
			
			wxConfig : function() {
				
				var content = this;
				
				jweixin.config({
					  debug: false,//
					  appId: util.getAppId('appId'),
					  timestamp: content.timestamp,
					  nonceStr: content.nonceStr,
					  signature: content.signature,
					  jsApiList: content.apiList
				});
				jweixin.error(function (res) {
					if(content.errorCount>=0){
						content.errorCount = content.errorCount-1;
						content.signUrl = $.router.getFirstInitUrl();
					    content.init();
					}
				});
				
				jweixin.ready(function () {
					if(content.callBack){
						content.callBack({appId:util.getAppId('appId'), timestamp: content.timestamp, nonceStr:content.nonceStr, signature:content.signature});
					}
				});   
			 	
			},
			
			
			wxPay : function(options) { 
				
				var content = this;
			
				jweixin.chooseWXPay({
					
				    'timestamp': options.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
				    'nonceStr': options.nonceStr, // 支付签名随机串，不长于 32 位
				    'package': "prepay_id=" + options.prepayId, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
				    'signType': 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
				    'paySign': options.paySign, // 支付签名
				    
				    success: function (res) {
				    	if(options.success){
				    		options.success(res);
				    	}
				    },
					cancel: function (res) {
						if(options.cancel){
				    		options.cancel(res);
				    	}
					},
					fail: function (res) {
						if(options.fail){
				    		options.fail(res);
				    	}
					}
					
				});
				
				
			},
			
			
			wxShare : function(options) { 
				
				   var content = this;
		 
				   jweixin.onMenuShareAppMessage({
					   
					  title: options.title,
					  desc: options.desc,
					  link: options.linkUrl,
					  imgUrl: options.imgUrl,
					  
					  trigger: function (res) {
						 
					  },
					  success: function (res) {
						 
					  },
					  cancel: function (res) {
						 
					  },
					  fail: function (res) {
						 
					  }
					});
				   jweixin.onMenuShareTimeline({
					   	  
					   	  title: options.title, 
						  link: options.linkUrl,
						  imgUrl: options.imgUrl,
						  
						  trigger: function (res) {
							 
						  },
						  success: function (res) {
							 
						  },
						  cancel: function (res) {
							 
						  },
						  fail: function (res) {
							 
						  }
					 });
				   
			},
			/**
			 * 分享给朋友
			 */
			wxShareAppMessage : function(options) { 
				
				   var content = this;
				   
				   jweixin.onMenuShareAppMessage({
					   
					  title: options.title,
					  desc: options.desc,
					  link: options.linkUrl,
					  imgUrl: options.imgUrl,
					  
					  trigger: function (res) {
						 
					  },
					  success: function (res) {
						 
					  },
					  cancel: function (res) {
						 
					  },
					  fail: function (res) {
						 
					  }
					});
			},
			/**
			 * 分享到朋友圈
			 */
			wxShareTimeline : function(options) { 
				
				   var content = this;
				   
				   jweixin.onMenuShareTimeline({
					   	  
					   	  title: options.title, 
						  link: options.linkUrl,
						  imgUrl: options.imgUrl,
						  
						  trigger: function (res) {
							 
						  },
						  success: function (res) {
							 
						  },
						  cancel: function (res) {
							 
						  },
						  fail: function (res) {
							 
						  }
						  
					 });
				   
			},
			/**
			 * callback函数类型
		    * 获取地理位置接口
		    */
			wxGetLocation : function(callback) { 
				
				jweixin.getLocation({
					type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
					success: function (res) {
						var o = {};
						o.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
						o.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
						o.accuracy = res.accuracy; // 位置精度
						callback(o);
					},
					fail: function (res) {
						var o = null;
						callback(o);
					}
				});
		   }
	};
	
	return wxCommon;

	
});