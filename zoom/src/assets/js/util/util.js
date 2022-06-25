/*********
 * util.js版本为 
 *
 * 2017-4-14 修改支持page类型 版本 
 * 2017-04-25 修改方法名称 
 * 把 
 * setRedirctObj,getRedirctObj,removeRedirctObj 
 * 改为 
 * setSessionStorageObj,getSessionStorageObj,removeSessionStorageObj
 * 
 */

const session_set = function (key, value) { 
	window.sessionStorage.setItem(key, value);
}
const session_get = function(key) { 
	return window.sessionStorage.getItem(key);
}
const session_remove = function(key) { 
	window.sessionStorage.removeItem(key);
}
// 给compressImg() 方法压缩图片专用
const base64toFile = function (dataurl, filename) {

	let arr = dataurl.split(',')

	let mime = arr[0].match(/:(.*?);/)[1]

	let suffix = mime.split('/')[1]

	let bstr = atob(arr[1])

	let n = bstr.length

	let u8arr = new Uint8Array(n)

	while (n--) {

		u8arr[n] = bstr.charCodeAt(n)

	}

	return new File([u8arr], `${filename}.${suffix}`, {

		type: mime

	})

}
const cookie = function (key, value, options) {
	var days, time, result, decode
	if (arguments.length > 1 && String(value) !== "[object Object]") {
		// Enforce object
		options = $.extend({}, options)

		if (value === null || value === undefined) options.expires = -1

		if (typeof options.expires === 'number') {
			days = (options.expires * 24 * 60 * 60 * 1000)
			time = options.expires = new Date()

			time.setTime(time.getTime() + days)
		}

		value = String(value)

		return (document.cookie = [
			encodeURIComponent(key), '=',
			options.raw ? value : encodeURIComponent(value),
			options.expires ? '; expires=' + options.expires.toUTCString() : '',
			options.path ? '; path=' + options.path : '',
			options.domain ? '; domain=' + options.domain : '',
			options.secure ? '; secure' : ''
		].join(''))
	}
	options = value || {}
	decode = options.raw ? function (s) { return s } : decodeURIComponent
	return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null
}

export default {
	getUrlKey: function (name, url) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) ||['',''])[1].replace(/\+/g, '%20')) || null
	},
	/**
	 * 超过四位的字符串加星
	 */
	asteriskByString: function (str) {
		try {
			if (typeof str != 'string')
				str = str + '';
			str = $.trim(str);
			var star = '';
			if (str.length >= 4) {
				for (var i = 0; i < str.length - 4; i++) {
					star += "*";
				}
				str = str.substring(0, 3) + star + str.substring(str.length - 1);
			}
			return str;
		} catch (e) {
			console.error(e);
			return str;
		}
	},

	setSource: function (_param) {
		var system = session_get('system');
		var type = session_get('type');
		session_set(system + '_' + type + '_source', JSON.stringify(_param));
	},
	getSource: function () {
		var system = session_get('system');
		var type = session_get('type');
		var currentSource = session_get(system + '_' + type + '_source');
		try {
			currentSource = JSON.parse(currentSource);
			return currentSource;
		} catch (e) {
			currentSource = {};
			return currentSource;
		}
	},
	removeSource: function () {
		var system = session_get('system');
		var type = session_get('type');
		session_remove(system + '_' + type + '_source');
	},



	setLocalStorageObj: function (key, _param) {
		var system = session_get('system');
		var type = session_get('type');
		window.localStorage.setItem(system + '_' + type + '_local_' + key, JSON.stringify(_param));
	},
	getLocalStorageObj: function (key) {
		var system = session_get('system');
		var type = session_get('type');
		var currentLocal = {};
		try {
			currentLocal = JSON.parse(window.localStorage.getItem(system + '_' + type + '_local_' + key));
			return currentLocal;
		} catch (e) {
			currentLocal = {};
			return currentLocal;
		}
	},
	removeLocalStorageObj: function (key) {
		var system = session_get('system');
		var type = session_get('type');
		window.localStorage.removeItem(system + '_' + type + '_local_' + key);
	},


	setSessionStorageObj: function (key, obj) {
		var system = session_get('system');
		var type = session_get('type');
		session_set(system + '_' + type + '_redirect_' + key, JSON.stringify(obj));
	},
	getSessionStorageObj: function (key) {
		var system = session_get('system');
		var type = session_get('type');
		var sessObj = session_get(system + '_' + type + '_redirect_' + key);
		try {
			sessObj = JSON.parse(sessObj);
			return sessObj;
		} catch (e) {
			sessObj = null;
			return sessObj;
		}
	},
	removeSessionStorageObj: function (key) {
		var system = session_get('system');
		var type = session_get('type');
		session_remove(system + '_' + type + '_redirect_' + key);
	},

	getScopeType: function () {
		return session_get('scopeType');
	},

	getThirdType: function () {
		return session_get('thirdType');
	},
	getToken: function () {
		return session_get('token');
	},
	getThird: function () {
		return session_get('third');
	},
	getAppId: function () {
		return session_get('appId');
	},
	setPageTitle: function (title) {
		document.title = title;
		if ($.device.ios) {
			var $body = $('body');
			var $iframe = $("<iframe style='display:none;' src='/favicon.ico'></iframe>");
			$iframe.on('load', function () {
				setTimeout(function () {
					$iframe.off('load').remove();
				}, 0);
			}).appendTo($body);
		}
	},
	setTitle: function (title) {
		$('header').find('h1').text(title);
	},
	setToken: function (token) {
		session_set('token', token);
		//存入cookie
		cookie('h5_token', token, { path: '/' });
	},
	setOrderToken: function (token) {
		session_set('orderToken', token);
		//存入cookie
		cookie('h5_orderToken', token, { path: '/' });
	},
	setThird: function (third) {
		session_set('third', third);
		//存入cookie
		cookie('h5_third', third, { path: '/' });
	},
	setRedirectUrl: function (url) {
		var system = session_get('system');
		var type = session_get('type');
		return session_set(system + '_' + type + '_redirect_url', url);
	},

	getRedirectUrl: function () {
		var system = session_get('system');
		var type = session_get('type');
		return session_get(system + '_' + type + '_redirect_url');
	},

	removeRedirectUrl: function () {
		var system = session_get('system');
		var type = session_get('type');
		session_remove(system + '_' + type + '_redirect_url');
	},

	removeToken: function () {
		session_remove('token');
		cookie('h5_token', null, { path: '/' });
	},

	removeThird: function () {
		session_remove('third');
		cookie('h5_third', null, { path: '/' });
	},

	getSystemType: function () {
		return session_get('systemType');
	},

	getAppType: function (system) {
		var userAgent = navigator.userAgent;
		/*	
			if(userAgent.indexOf(system+'app_ios')!=-1){
				return "ios";
			}else if(userAgent.indexOf(system+'app_android')!=-1){
				return "android";
			}else{
				return "";
			}
		*/
		if (userAgent.indexOf('app_ios') != -1) {
			return "ios";
		} else if (userAgent.indexOf('app_android') != -1) {
			return "android";
		} else {
			return "";
		}
	},

	callAppFuction: function (params) {

		var system = session_get('system');
		var userAgent = navigator.userAgent;
		var appType = '';

		/*
		  if(userAgent.indexOf(system+'app_ios')!=-1){
			  appType = "ios";
		  }else if(userAgent.indexOf(system+'app_android')!=-1){
			  appType = "android";
		  }
		*/

		if (userAgent.indexOf('app_ios') != -1) {
			appType = "ios";
		} else if (userAgent.indexOf('app_android') != -1) {
			appType = "android";
		}
		console.log('======================callAppFuction=========================');

		//alert('开始调用 '+appType+' ,js接口报文时间:'+new Date().getTime());
		//alert(JSON.stringify(params));

		//$.alertMessage('开始调用 ,js接口报文时间:'+new Date().getTime()+'报文:'+ JSON.stringify(params) );

		if (appType === 'ios') {
			iosTimeout(JSON.stringify(params));
			//JSonString(JSON.stringify(params));
		} else if (appType === 'android') {
			window.jsObj.jsCallAndroid(JSON.stringify(params));
		}

		//解决ios方法加载比微信慢问题
		function iosTimeout(str) {

			try {

				JSonString(str);

			} catch (err) {

				setTimeout(function () {
					iosTimeout(str);
				}, 50);

			}
		}

	},

	getSystemAndTypeParams: function () {
		var system = session_get('system');
		var type = session_get('type');
		return { system: system, type: type };
	},

	getPlateform: function () {
		var systemType = session_get('systemType');
		if (systemType) {
			return systemType;
		} else {
			return '';
		}
	},

	isPlateformAndroid: function () {
		var systemType = session_get('systemType');
		if (systemType && systemType === 'app') {
			var userAgent = navigator.userAgent;
			if (userAgent.indexOf('app_ios') != -1) {
				return false;
			} else if (userAgent.indexOf('app_android') != -1) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	},

	isPlateformIos: function () {
		var systemType = session_get('systemType');
		if (systemType && systemType === 'app') {
			var userAgent = navigator.userAgent;
			if (userAgent.indexOf('app_ios') != -1) {
				return true;
			} else if (userAgent.indexOf('app_android') != -1) {
				return false;
			} else {
				return false;
			}
		} else {
			return false;
		}
	},
	isPlateformApp: function () {
		var systemType = session_get('systemType');
		if (systemType && systemType === 'app') {
			return true;
		} else {
			return false;
		}
	},

	isPlateformWx: function () {
		var systemType = session_get('systemType');
		if (systemType && systemType === 'wx') {
			return true;
		} else {
			return false;
		}
	},

	isPlateformPage: function () {
		var systemType = session_get('systemType');
		if (systemType && systemType === 'page') {
			return true;
		} else {
			return false;
		}
	},

	isPlateformAlipay: function () {
		var systemType = session_get('systemType');
		if (systemType && systemType === 'alipay') {
			return true;
		} else {
			return false;
		}
	},

	getRequestParams: function () {
		var url = window.location.search;
		var theRequest = {};
		if (url.indexOf("?") !== -1) {
			var str = url.substr(1);
			var strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
			}
		}
		return theRequest;
	},
	getAbsoluteUrl: function (url) {
		var link = document.createElement('a');
		link.setAttribute('href', url);
		var absoluteUrl = link.href;
		link = null;
		return absoluteUrl;
	},

	getRequestParam: function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r !== null) {
			return (r[2]);
		}
		return null;
	},
	getUrlParam: function (url, name) {
		var paramIndex = url.indexOf('?');
		var paramsUrl = paramIndex === -1 ? '' : url.slice(paramIndex);
		if (null !== paramsUrl && '' !== paramsUrl) {
			if (name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = paramsUrl.substr(1).match(reg);
				if (r !== null) {
					return decodeURI(r[2]);
				}
			} else {
				var theRequest = {};
				var strs = paramsUrl.split("&");
				for (var i = 0; i < strs.length; i++) {
					theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
				}
				return theRequest;
			}
		}
		return null;
	},
	typeUrl: function (url) {
		var _url = url;
		var _type = session_get('systemType');
		var paramIndex = url.indexOf('?');
		var paramsUrl = paramIndex === -1 ? '' : url.slice(paramIndex + 1);
		if (paramIndex == -1) {//不存在
			_url = _url + "?type=" + _type;
		} else {//存在
			if (null != paramsUrl && '' != paramsUrl) {
				if (null == this.getUrlParam(_url, "type")) _url = _url + "&type=" + _type;
			} else {
				_url = _url + "type=" + _type;
			}
		}
		return _url;
	},
	randomUrl: function (url) {
		var _url = url;
		var _random = Math.round(Math.random() * 10000000000000000);
		var paramIndex = url.indexOf('?');
		var paramsUrl = paramIndex === -1 ? '' : url.slice(paramIndex + 1);
		if (paramIndex == -1) {//不存在
			_url = _url + "?random=" + _random;
		} else {//存在
			if (null != paramsUrl && '' != paramsUrl) {
				if (null == this.getUrlParam(_url, "random")) _url = _url + "&random=" + _random;
			} else {
				_url = _url + "random=" + _random;
			}
		}
		return _url;
	},
	goPage: function (page, params) {

		//alert('goPage...');

		console.log('goPage error......');

		var userAgent = this.getAppType(session_get('system'));

		if (userAgent && params && params.pageKey) {//app

			var dataTemp = {};
			var naviInitTemp = {};
			var _wap_url = page;

			if (params.type && params.type === true) {
				_wap_url = this.typeUrl(page);
			}
			var _url = this.getAbsoluteUrl(_wap_url);

			if (params.pageData) {
				dataTemp = params.pageData;
			}
			if (params.naviInit) {
				naviInitTemp = params.naviInit;
			}

			/* 	if(params.pageKey == 'CUSTOMER_LOGIN' || params.pageKey == 'MY_INFO_PAGE_ACCOUNT'){
					 _url = '';
				 }
				 */
			//MY_INFO_PAGE  MY_INFO_PAGE_ACCOUNT
			/*if(params.pageKey == 'MY_INFO_PAGE_ACCOUNT'){
			   naviInitTemp = {
					   "dataObject":{
						   setFunction : {
							   jsFunction : "PageScope.onAppCallBack"
						   }
					   }
				 };
			   dataTemp = { 'callBackKey' : 'loginout' };
		   }*/
			//alert('params.pageKey:' + params.pageKey);
			//alert('params._url:' + _url);

			this.callAppFuction({ 'functionName': 'jumpValue', 'dataObject': { 'pageCode': params.pageKey, 'url': _url, 'businessData': dataTemp, 'naviInit': naviInitTemp } });

		} else {
			if (params && params.location && params.location === true) {

				var wap_url = page;
				if (params.type && params.type === true) {
					wap_url = this.typeUrl(wap_url);
					//自动添加token
					var token = this.getToken();
					if (token) {
						wap_url = wap_url + '&token=' + token;
					}
				}
				if (params.random && params.random === true) {
					wap_url = this.randomUrl(wap_url);
				}
				window.location = wap_url;

			} else {
				if ($.smConfig.ignoreCache.allForward) {
					$.router.load(page, true);
				} else {
					$.router.load(page, false);
				}
			}
		}

	},

	goRedirectPage: function (page, params) {
		if (params && params.reload && params.reload === true) {
			session_set('system_reload_source', 'reload');
		}
		$.router.load(page, true, false, true);
	},
	// base64 转file
    btof:function(data, fileName) {
		const dataArr = data.split(",");
		const byteString = atob(dataArr[1]);
  
		const options = {
		  type: "image/jpeg",
		  endings: "native"
		};
		const u8Arr = new Uint8Array(byteString.length);
		for (let i = 0; i < byteString.length; i++) {
		  u8Arr[i] = byteString.charCodeAt(i);
		}
		return new File([u8Arr], fileName + ".jpg", options);
	  },
	//压缩图片
	compressImg(file) {
		var src;
		var files;
		var fileSize = parseFloat(parseInt(file['size']) / 1024 / 1024).toFixed(2);
		var read = new FileReader();
		read.readAsDataURL(file);
		return new Promise(function (resolve, reject) {
			read.onload = function (e) {
				var img = new Image();
				img.src = e.target.result;
				img.onload = function () {
					//默认按比例压缩
					var w = this.width,
						h = this.height;
					//生成canvas
					var canvas = document.createElement('canvas');
					var ctx = canvas.getContext('2d');
					var base64;
					// 创建属性节点
					canvas.setAttribute("width", w);
					canvas.setAttribute("height", h);
					ctx.drawImage(this, 0, 0, w, h);
					if (fileSize < 0.5) {
						//如果图片小于0.5兆 那么压缩0.6
						base64 = canvas.toDataURL(file['type'], 0.6);
					} else if (fileSize > 0.5 && fileSize < 2) {
						//如果图片大于0.5M并且小于2M 那么压缩0.5
						base64 = canvas.toDataURL(file['type'], 0.4);
					} else {
						//如果图片超过2m 那么压缩0.2
						base64 = canvas.toDataURL(file['type'], 0.2);
					}
					// 回调函数返回file的值（将base64编码转成file）
					files = base64toFile(base64, Math.ceil(Math.random() * 10)); //如果后台接收类型为base64的话这一步可以省略
					resolve(files)
				};
			};
		})
	},
	//
	base64to(dataurl, filename) {

		let arr = dataurl.split(',')
	
		let mime = arr[0].match(/:(.*?);/)[1]
	
		let suffix = mime.split('/')[1]
	
		let bstr = atob(arr[1])
	
		let n = bstr.length
	
		let u8arr = new Uint8Array(n)
	
		while (n--) {
	
			u8arr[n] = bstr.charCodeAt(n)
	
		}
	
		return new File([u8arr], `${filename}.${suffix}`, {
	
			type: mime
	
		})
	
	}
};
