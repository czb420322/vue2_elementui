import axios from 'axios';
import configJs from './../../../config.js';
import util from './util';
import { Toast } from 'vant';
import { router } from './../../../router';
import API from './../../../api';

export default {
	/**
	 * 判断是否登录
	 */
	async accountCheck() {
		const res = await axios({
			url: API.API_COMMON_CHECK,
			method: 'post',
			loading: 'false',
			data: {
				type: sessionStorage.getItem('type'),
				system: sessionStorage.getItem('system'),
				third: '',
				token: localStorage.token,
				// token:localStorage.getItem("token"),
				refreshToken: localStorage.refreshToken,
				// platForm: configJs.config.platForm
			}
		})
		if (!res || !res.content || !res.content.token) {
			localStorage.clear();
			sessionStorage.clear();
			router.push({ path: '/login' })
		} else if (res.content.token) {
			localStorage.setItem('token', res.content.token);
		}
	},
	/**
	 * 获取公众号code
	 */
	getCode(page) {
		sessionStorage.followOfficalAccount = 0;
		// 判断是否在微信中打开
		var ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			if (sessionStorage.getItem("openid") && sessionStorage.getItem("openid") != "undefined") {
				return false;
			}
			var code = this.getUrlParam('code') // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
			var local = window.location.href;
			if (code == null || code === '') {
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + configJs.APPID + '&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect'
			} else {
				console.log('document.URL', document.URL);
				console.log('code', code);
				this.getOpenId(code, page) //把code传给后台获取用户信息
			}
		}
	},
	/**
	 * 把code传给后台,得到openid
	 */
	async getOpenId(code, page) {
		let data = sessionStorage.shareInfo ? JSON.parse(sessionStorage.shareInfo) : {};
		const res = await axios({
			url: API.API_ACTIVITY_SAVEAGENTVISITORLOG,
			method: 'post',
			data: {
				...data,
				openCode: code
			}
		});
		if (res.code == '0' && res.content.subscribe != '1') {
			sessionStorage.followOfficalAccount = 1;
		}
		if (res.code == '0' && res.content.openid) {
			sessionStorage.openId = res.content.openid;
			console.log("把code传给后台,得到openid", page);
			localStorage.setItem('wxUserList', JSON.stringify(res.content));
			if (page == "活动") {
				this.checkOpenId(res.content.openid);
			}
		}
		console.log("sessionStorage.followOfficalAccount", sessionStorage.followOfficalAccount);
	},
	/**
	 * 登录openid
	 */
	async checkOpenId(openId) {
		let data = sessionStorage.shareInfo ? JSON.parse(sessionStorage.shareInfo) : {};
		const res = await axios({
			url: API.API_ACCOUNT_CHECKOPENID,
			method: 'post',
			data: {
				openId
			}
		});
		if (res.code == '0' && res.content.result == '0') {
			this.goAutologin(res.content.denseMobile, res.content.mobile, sessionStorage.shareCode);
		}
	},
	/**
	 * 获取地址栏的参数
	 */
	getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	},
	/**
	 * 兑吧
	 */
	async goAutologin(denseMobile, mobile, code) {
		console.log('code', code);
		const timestamp = Date.parse(new Date());
		const followOfficalAccount = '0';
		const dcustom = `followOfficalAccount=${followOfficalAccount}&nickname=${mobile}`;
		let redirect = configJs.redirect;
		if (code) { redirect = `${redirect}&code=${code}&is_from_share=0` }
		console.log('redirect', redirect);
		let data = {
			uid: denseMobile,
			credits: 0,
			appKey: configJs.appKey,
			timestamp: timestamp,
			redirect,
			dcustom
		}
		console.log('data', JSON.stringify(data));
		const res = await axios({
			url: this.$API.API_COMMON_MD5,
			method: 'post',
			data
		});
		console.log('res', res);
		if (res.code === 0 && res.content.code == '0') {
			let url = `https://76543.activity-1.m.duiba.com.cn/autoLogin/autologin?uid=${encodeURIComponent(denseMobile)}&credits=0&appKey=${encodeURIComponent(configJs.appKey)}&timestamp=${encodeURIComponent(timestamp)}&sign=${encodeURIComponent(res.content.content)}&redirect=${encodeURIComponent(redirect)}&dcustom=${encodeURIComponent(dcustom)}`
			console.log('url', url);
			window.location.href = url;
		} else {
			this.$toast(res.content.resultMessage);
		}
	},
	/**
	 * 重新发起支付
	 */
	async toPayPage(appntInfo, sumPrem, orderNo) {
		const res = await axios({
			url: API.API_INSURE_INPUT_GETPAYURL,
			method: 'get',
			params: {
				'insuranceOrderNo': orderNo
			}
		});
		if (res.code === 0 && res.content.result == '0') {
			util.setSessionStorageObj("appntInfo", appntInfo);
			util.setSessionStorageObj("payUrl", res.content.payUrl);
			util.setSessionStorageObj("sumPrem", sumPrem);
			util.setSessionStorageObj("orderNo", orderNo);
			router.push(`confirmInsured?orderNo=${orderNo}`);
		} else {
			Toast(res.content.resultMessage);
		}
	},
	/**
	 * 获取用户信息
	 */
	async getUserInfo() {
		const res = await axios({
			url: API.API_ACCOUNT_INFO,
			method: 'post',
			loading: 'false'
		});
		util.setSessionStorageObj("getUserInfoF", res.content);
		if (res.code === 0) {
			localStorage.setItem('agentCode', res.content.userCode);
			return res.content;
		}
	},
	/**
	 * 消息列表
	 */
	async getSystemWord() {
		const res = await axios({
			url: API.API_COMMONMESSAGE_LIST,
			method: 'get',
			loading: 'false'
		});
		if (res.code === 0 && res.content) {
			if (!res.content.result) {
				util.setSessionStorageObj("informationData", res.content);
				return res.content;
			} else {
				util.setSessionStorageObj("informationData", {});
				return {};
			}
		}
	},
	/**
	 * 修改消息状态
	 */
	async updRead(list) {
		const res = await axios({
			url: API.API_COMMONMESSAGE_READ,
			method: 'get',
			params: {
				'messageIdStr': list,
			}
		});
		if (res.code === 0) {
			util.setSessionStorageObj("readNum", 0);
			router.push({ name: "informationList" });
		}
	},
	// 获取当前时间
	getNowFormatDate() {
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
			+ " " + date.getHours() + seperator2 + date.getMinutes()
			+ seperator2 + date.getSeconds();
		return currentdate;
	},
	CurentDate() {
		var now = new Date();
		var year = now.getFullYear();       //年
		var month = now.getMonth() + 1;     //月
		var day = now.getDate();            //日
		var clock = year + "-";
		if (month < 10)
			clock += "0";
		clock += month + "-";
		if (day < 10)
			clock += "0";
		clock += day + " ";
		return (clock);
	},
	/**
	 * 分享注册
	 */
	async shareConfig () {
		let local = document.URL.split('#')[0]
		var time = Date.parse(new Date()).toString();//获取到毫秒的时间戳，精确到毫秒
		time = time.substr(0, 10);//精确到秒
		const res = await axios({
			url: API.API_GETWECHATACCOUNTJSSDKINFO,
			method: "post",
			loading: "false",
			data: {
				url: local,
				time: time
			}
		});

		wx.config({
			debug: false,
			appId: configJs.APPID,
			timestamp: res.content.timestamp,
			nonceStr: res.content.noncestr,
			signature: res.content.signature,
			jsApiList: ['checkJsApi',
				'getNetworkType',//网络状态接口
				'onMenuShareTimeline',
				'onMenuShareAppMessage'
			] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
	},

	/**
	 * 分享
	 */
	 async goShare( params ) {
		let local = document.URL.split('#')[0]
		var time = Date.parse(new Date()).toString();//获取到毫秒的时间戳，精确到毫秒
		time = time.substr(0, 10);//精确到秒
		const res = await axios({
			url: API.API_GETWECHATACCOUNTJSSDKINFO,
			method: "post",
			loading: "false",
			data: {
				url: local,
				time: time
			}
		});

		wx.config({
			debug: false,
			appId: configJs.APPID,
			timestamp: res.content.timestamp,
			nonceStr: res.content.noncestr,
			signature: res.content.signature,
			jsApiList: ['checkJsApi',
				'getNetworkType',//网络状态接口
				'onMenuShareTimeline',
				'onMenuShareAppMessage'
			] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		wx.ready(function () {
			// 分享给朋友
			wx.onMenuShareAppMessage({
				title: params.shareTitle, // 分享标题
				desc: params.shareText, // 分享描述
				link: params.shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: params.shareImgUrl, // 分享图标
				type: '', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function () {
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});
			// 分享到朋友圈
			wx.onMenuShareTimeline({
				title: params.shareTitle, // 分享标题
				desc: params.shareText, // 分享描述
				link: params.shareUrl, // 分享链接
				imgUrl: params.shareImgUrl, // 分享图标
				success: function (res) { },
				cancel: function () { }
			});

		});
		//初始化jsapi接口 状态
		// wx.error(function (res) {
		// 	// alert(JSON.stringify(params))
		// 	alert("调用微信jsapi返回的状态:" + res.errMsg);
		// });
	},

	/**
	 * 分享转录专用
	 */
	async goShareZL(params) {
		console.log('params', params);
		let local = location.href.split('#')[0]
		var time = Date.parse(new Date()).toString();//获取到毫秒的时间戳，精确到毫秒
		time = time.substr(0, 10);//精确到秒
		const res = await axios({
			url: API.API_GETWECHATACCOUNTJSSDKINFO,
			method: "get",
			loading: "false",
			params: {
				url: local,
				time: time
			}
		});

		wx.config({
			debug: false,
			appId: configJs.APPID,
			timestamp: res.content.timestamp,
			nonceStr: res.content.noncestr,
			signature: res.content.signature,
			jsApiList: ['checkJsApi',
				'getNetworkType',//网络状态接口
				'updateTimelineShareData',
				'updateAppMessageShareData'
			] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});

		wx.ready(function () {
			// 分享给朋友
			wx.updateAppMessageShareData({
				title: params.shareTitle, // 分享标题
				desc: params.shareText, // 分享描述
				link: encodeURI(params.shareUrl), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: params.shareImgUrl, // 分享图标
				type: '', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function () {
					// 用户确认分享后执行的回调函数
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});
			// 分享到朋友圈
			wx.updateTimelineShareData({
				title: params.shareTitle, // 分享标题
				desc: params.shareText, // 分享描述
				link: encodeURI(params.shareUrl), // 分享链接
				imgUrl: params.shareImgUrl, // 分享图标
				success: function (res) { },
				cancel: function () { }
			});
		});
		//初始化jsapi接口 状态
		// wx.error(function (res) {
		// 	alert("调用微信jsapi返回的状态:" + res.errMsg);
		// });
	},
	dialogAlert() {
		Notify({ type: 'warning', message: '请点击右上角分享（发送给朋友）' });
		// Dialog.alert({
		// 	message: '请点击右上角分享',
		// 	theme: 'round-button',
		// 	cancelButtonColor: 'linear-gradient(to right, rgb(36, 92, 246)',
		// 	confirmButtonColor: '#0252ff'
		// });
	},
	//下载电子保单提示
	downloadAlert() {
		Notify({ type: 'warning', message: '请点击右上角分享(发送给朋友)然后点击查看或下载' });
	}
};
