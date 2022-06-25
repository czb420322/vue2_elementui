
var filterUtil = {

	getUrl: function (url) {
		var hashIndex = url.indexOf('#');
		return hashIndex === -1 ? '' : url.slice(hashIndex + 1);
	},
	getRequestParams: function () {
		var url = window.location.search;
		var theRequest = new Object();
		if (url.indexOf("?") !== -1) {
			var str = url.substr(1);
			var strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
			}
		}
		return theRequest;
	},
	getRequestParam: function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r !== null) {
			return (r[2]);
		}
		return null;
	},
	/**
	* 获取一个链接相对于当前页面的绝对地址形式
	*
	* 假设当前页面是 http://a.com/b/c
	* 那么有以下情况:
	* d => http://a.com/b/d
	* /e => http://a.com/e
	* #1 => http://a.com/b/c#1
	* http://b.com/f => http://b.com/f
	*
	* @param {String} url url
	* @returns {String}
	*/
	getAbsoluteUrl: function (url) {
		var link = document.createElement('a');
		link.setAttribute('href', url);
		var absoluteUrl = link.href;
		link = null;
		return absoluteUrl;
	},

	getUrlParam: function (url, name) {

		var paramIndex = url.indexOf('?');
		var paramsUrl = paramIndex === -1 ? '' : url.slice(paramIndex + 1);
		if (null != paramsUrl && '' != paramsUrl) {
			if (name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = paramsUrl.match(reg);
				if (r != null) {
					return decodeURI(r[2]);
				}
			} else {
				var theRequest = new Object();
				var strs = paramsUrl.split("&");
				for (var i = 0; i < strs.length; i++) {
					theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
				}
				return theRequest;
			}
		}
		return null;


	}
};
export default {
	checkLogin: function (param_url) {

		var context = this;
	    	   var url = filterUtil.getAbsoluteUrl(param_url);
			//先获取指定标示
			var requestSystemType = filterUtil.getUrlParam(url, 'type');
			if (requestSystemType && requestSystemType == 'page') {
				sessionStorage.setItem('systemTypeForm', requestSystemType);
				sessionStorage.setItem('systemType', requestSystemType);
			}

			var scopeType = filterUtil.getUrlParam(url, 'scope');
			if (scopeType && scopeType == 'base') {//只存一次
				sessionStorage.setItem('scopeType', scopeType);
			}
			
			var systemTypeForm = sessionStorage.getItem('systemTypeForm');
			var systemType = sessionStorage.getItem('systemType');

			if (systemTypeForm && systemType) {//存在

			} else {
				//每次自动验证
				sessionStorage.setItem('systemType', context.getSystemType());
				sessionStorage.setItem('type', 'page');
				sessionStorage.setItem('system', 'jk');
			}
			// context.checkIsPassUrl(defer, url);
	},

	//处理url是否需要登录 根据平台类型
	checkIsPassUrl: function (defer, url) {

		var context = this;
		var _platform_params = context.isConfigPage();
		//没有找到配置
		if (null == _platform_params) {

			var error_page = filterUtil.getAbsoluteUrl($.pageFilterConfig.ctx_base + $.pageFilterConfig.error_page);
			defer(null, { result: 2, href: error_page });

		} else {

			if (_platform_params.systemType === 'app') {
				var token_cookie = $.fn.cookie('token');
				var token_session = localStorage.getItem('token');
				if (token_cookie && token_cookie != token_session) {
					sessionStorage.setItem('token', token_cookie);
				}
			} else {
				var token_cookie = $.fn.cookie('h5_token');
				var third_cookie = $.fn.cookie('h5_third');
				var token_session = localStorage.getItem('token');
				var third_session = sessionStorage.getItem('third');
				if (null == token_session && token_cookie) {
					sessionStorage.setItem('token', token_cookie);
				}
				if (null == third_session && third_cookie) {
					sessionStorage.setItem('third', third_cookie);
				}
			}

			var params_data = { url: url, systemType: sessionStorage.getItem('systemType'), type: sessionStorage.getItem('type'), system: sessionStorage.getItem('system'), thirdType: sessionStorage.getItem('thirdType'), tokenId: localStorage.getItem('token'), thirdId: sessionStorage.getItem('third') };

			//sessionStorage.setItem('systemType', _platform_params.systemType);
			sessionStorage.setItem('type', _platform_params.type);
			sessionStorage.setItem('system', _platform_params.system);
			sessionStorage.setItem('thirdType', _platform_params.thirdType);
			sessionStorage.setItem('appId', _platform_params.appId);
			sessionStorage.setItem('agentId', _platform_params.agentId);

			params_data.systemType = sessionStorage.getItem('systemType');
			params_data.type = sessionStorage.getItem('type');
			params_data.system = sessionStorage.getItem('system');
			params_data.thirdType = sessionStorage.getItem('thirdType');
			params_data.appId = sessionStorage.getItem('appId');
			params_data.agentId = sessionStorage.getItem('agentId');

			var is_login = context.isNeedLogin(url);
			var is_third = context.isNeedThird(url);

			var page_type = 1;
			//如果是app  之验证必须登录的  页面
			if (params_data.systemType === 'wx' || params_data.systemType === 'alipay') {
				if (is_third || is_login) {
					if (is_third) { page_type = 2; }
					//进入下一个then
					defer(null, { next_then: 1, url: params_data.url, pagetype: page_type, systemType: params_data.systemType, type: params_data.type, system: params_data.system, thirdType: params_data.thirdType, token: params_data.tokenId, third: params_data.thirdId });
				} else {
					defer(null, { result: 0, href: '' });
				}
			} else if (params_data.systemType === 'app') {
				if (is_login && (!is_third)) {
					page_type = 5;
					defer(null, { next_then: 1, url: params_data.url, pagetype: page_type, systemType: params_data.systemType, type: params_data.type, system: params_data.system, thirdType: params_data.thirdType, token: params_data.tokenId, third: params_data.thirdId });
				} else {
					defer(null, { result: 0, href: '' });
				}
			} else if (params_data.systemType === 'page') {
				if (params_data.url.indexOf('register.html') > -1) {
					defer(null, { result: 0, href: `${location.origin}/login/register.html` });
				} else if ((is_login && (!is_third))) {
					page_type = 6;
					defer(null, { next_then: 1, url: params_data.url, pagetype: page_type, systemType: params_data.systemType, type: params_data.type, system: params_data.system, thirdType: params_data.thirdType, token: params_data.tokenId, third: params_data.thirdId });
				} else {
					defer(null, { result: 0, href: '' });
				}
				// defer(null, { result : 0, href: params_data.url });
			}
		}
	},


	//调用ajax 验证 token  或者 third
	checkOauth: function (defer2, value) {
		if (value.token || value.third) {
			$.ajax({
				type: 'GET',
				timeout: $.pageFilterConfig.check_timeout,
				url: $.pageFilterConfig.check_oauth_url,
				dataType: 'json',
				data: { token: value.token, third: value.third, type: value.type, system: value.system },
				success: function (data, status, xhr) {
					if (data.code === 0) {
						defer2(null, { next_then_02: 1, url: value.url, pagetype: value.pagetype, systemType: value.systemType, token: data.content.token, third: data.content.third });
					} else {
						//是否清除cookie
						defer2(null, { result: 2, href: filterUtil.getAbsoluteUrl($.pageFilterConfig.ctx_base + $.pageFilterConfig.error_page) });
					}
				},
				error: function (xhr, type, error) {
					if (null != type && '' != type && type == 'abort') {
						//如果是终止就不往下继续响应
					} else {
						//是否清除cookie
						defer2(null, { result: 2, href: filterUtil.getAbsoluteUrl($.pageFilterConfig.ctx_base + $.pageFilterConfig.error_page) });
					}
				}
			});
		} else {
			defer2(null, { next_then_02: 1, url: value.url, pagetype: value.pagetype, systemType: value.systemType, token: value.token, third: value.third });
		}

	},

	//根据平台类型 处理 ajax验证返回的结果
	checkOauthAfter: function (defer2, value) {
		if (value.next_then_02 && value.next_then_02 == 1) {

			var systemType = sessionStorage.getItem('systemType');
			var system = sessionStorage.getItem('system');
			var type = sessionStorage.getItem('type');

			var third = value.third;
			var token = value.token;


			if (third) { } else {
				$.fn.session_remove('third');
				$.fn.cookie('h5_third', null, { path: '/' });
			}
			if (token) { } else {
				$.fn.session_remove('token');
				$.fn.cookie('h5_token', null, { path: '/' });
			}


			if (value.pagetype === 1) {
				if (token && third) {
					defer2(null, { result: 0, href: '' });
				} else {
					if (third) {
						sessionStorage.setItem(system + '_' + type + '_redirect_url', value.url);
						defer2(null, { result: 2, type: 1, href: filterUtil.getAbsoluteUrl($.pageFilterConfig.ctx_base + $.pageFilterConfig.redirect_page) + "?state=4" });
					} else {
						$.fn.session_remove('third');
						$.fn.cookie('h5_third', null, { path: '/' });
						$.fn.session_remove('token');
						$.fn.cookie('h5_token', null, { path: '/' });

						sessionStorage.setItem(system + '_' + type + '_redirect_url', value.url);

						var hrefUrl = '';
						var scopeType = sessionStorage.getItem('scopeType');

						if (systemType === 'wx') {
							if (scopeType && scopeType == 'base') {
								hrefUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + sessionStorage.getItem('appId') + '&agentid=' + sessionStorage.getItem('agentId') + "&redirect_uri=" + encodeURIComponent($.pageFilterConfig.page_http_base + $.pageFilterConfig.ctx_base + $.pageFilterConfig.redirect_page) + "&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
							} else {
								hrefUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + sessionStorage.getItem('appId') + '&agentid=' + sessionStorage.getItem('agentId') + "&redirect_uri=" + encodeURIComponent($.pageFilterConfig.page_http_base + $.pageFilterConfig.ctx_base + $.pageFilterConfig.redirect_page) + "&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
							}
						} else if (systemType === 'alipay') {
							if (scopeType && scopeType == 'base') {
								hrefUrl = 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=' + sessionStorage.getItem('appId') + '&agentid=' + sessionStorage.getItem('agentId') + "&auth_skip=false&scope=auth_base&redirect_uri=" + encodeURIComponent($.pageFilterConfig.page_http_base + $.pageFilterConfig.ctx_base + $.pageFilterConfig.redirect_page) + "&state=1";
							} else {
								hrefUrl = 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=' + sessionStorage.getItem('appId') + '&agentid=' + sessionStorage.getItem('agentId') + "&auth_skip=false&scope=auth_userinfo&redirect_uri=" + encodeURIComponent($.pageFilterConfig.page_http_base + $.pageFilterConfig.ctx_base + $.pageFilterConfig.redirect_page) + "&state=1";
							}
						}

						defer2(null, { result: 2, type: 0, href: hrefUrl });
					}
				}
			} else if (value.pagetype === 2) {
				if (third) {
					defer2(null, { result: 0, href: '' });
				} else {
					$.fn.session_remove('third');
					$.fn.cookie('h5_third', null, { path: '/' });

					sessionStorage.setItem(system + '_' + type + '_redirect_url', value.url);

					var hrefUrl = '';
					var scopeType = sessionStorage.getItem('scopeType');

					if (systemType === 'wx') {
						//都一直  为base
						if (scopeType && scopeType == 'base') {
							hrefUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + sessionStorage.getItem('appId') + '&agentid=' + sessionStorage.getItem('agentId') + "&redirect_uri=" + encodeURIComponent($.pageFilterConfig.page_http_base + $.pageFilterConfig.ctx_base + $.pageFilterConfig.redirect_page) + "&response_type=code&scope=snsapi_base&state=2#wechat_redirect";
						} else {
							hrefUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + sessionStorage.getItem('appId') + '&agentid=' + sessionStorage.getItem('agentId') + "&redirect_uri=" + encodeURIComponent($.pageFilterConfig.page_http_base + $.pageFilterConfig.ctx_base + $.pageFilterConfig.redirect_page) + "&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect";
						}
					} else if (systemType === 'alipay') {
						if (scopeType && scopeType == 'base') {
							hrefUrl = 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=' + sessionStorage.getItem('appId') + "&auth_skip=false&scope=auth_base&redirect_uri=" + encodeURIComponent($.pageFilterConfig.page_http_base + $.pageFilterConfig.ctx_base + $.pageFilterConfig.redirect_page) + "&state=2";
						} else {
							hrefUrl = 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=' + sessionStorage.getItem('appId') + "&auth_skip=false&scope=auth_userinfo&redirect_uri=" + encodeURIComponent($.pageFilterConfig.page_http_base + $.pageFilterConfig.ctx_base + $.pageFilterConfig.redirect_page) + "&state=2";
						}
					}

					defer2(null, { result: 2, type: 0, href: hrefUrl });
				}
			} else if (value.pagetype === 5) {
				if (token) {
					defer2(null, { result: 0, href: '' });
				} else {
					$.fn.session_remove('token');
					$.fn.cookie('h5_token', null, { path: '/' });

					sessionStorage.setItem(system + '_' + type + '_redirect_url', value.url);

					defer2(null, { result: 2, type: 1, href: filterUtil.getAbsoluteUrl($.pageFilterConfig.ctx_base + $.pageFilterConfig.redirect_page) + "?state=5" });
				}
			} else if (value.pagetype === 6) {
				if (token) {
					defer2(null, { result: 0, href: '' });
				} else {

					$.fn.session_remove('token');
					$.fn.cookie('h5_token', null, { path: '/' });
					sessionStorage.setItem(system + '_' + type + '_redirect_url', value.url);

					defer2(null, { result: 2, type: 1, href: filterUtil.getAbsoluteUrl($.pageFilterConfig.ctx_base + $.pageFilterConfig.login_url) });
				}
			}

		} else {
			defer2(null, value);
		}

	},


	//验证给定url是否需要登录
	isNeedLogin: function (url) {
		var _is_login = true;
		$.each($.pageFilterConfig.access_nologin_page, function (_index, _url) {
			if (url.indexOf(_url) != -1) {
				_is_login = false;
				return false;
			}
		});
		return _is_login;
	},

	//验证给定url是否需要登录
	isNeedThird: function (url) {
		var _is_third = false;
		$.each($.pageFilterConfig.access_only_third_page, function (_index, _url) {
			if (url.indexOf(_url) != -1) {
				_is_third = true;
				return false;
			}
		});
		return _is_third;
	},

	isConfigPage: function () {
		var _is_pass_url = null;
		var _type = sessionStorage.getItem('systemType');
		$.each($.pageFilterConfig.access_system_type, function (_index, _obj) {
			if (_obj.system_type == _type) {
				if (_obj.params) {
					_is_pass_url = {};
					_is_pass_url.systemType = _obj.system_type;
					_is_pass_url.type = _obj.params.type;
					_is_pass_url.system = _obj.params.system;
					_is_pass_url.thirdType = _obj.params.thirdType;
					_is_pass_url.appId = _obj.params.appId;
					_is_pass_url.agentId = _obj.params.agentId;
					return false;
				}
			}
		});
		return _is_pass_url;
	},

	getSystemType: function () {
		var u = navigator.userAgent,
			ua = navigator.userAgent.toLowerCase();
		var isApp = false;

		if (ua.indexOf('app_ios') != -1) {
			isApp = true;
		} else if (ua.indexOf('app_android') != -1) {
			isApp = true;
		}
		var weixin = ua.match(/MicroMessenger/i) == "micromessenger";
		//&& (ua.match(/wxwork/i) == 'wxwork')

		var alipay = ua.match(/AlipayClient/i) == "alipayclient";
		if (isApp) {
			return 'app';
		} else if (weixin) {
			return 'wx'; //wx 
		} else if (alipay) {
			return 'alipay';
		} else {
			return 'page';
		}
	}

	//外部使用组件  $.filterConfig
	// var filterConfig = $.filterConfig = new FilterConfig();

}


