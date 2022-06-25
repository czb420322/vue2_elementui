import Vue from 'vue';
import { router } from './../router';
import axios from 'axios';
import configJs from './../config.js';
import API from './../api';
import EventBus from '@/assets/js/util/EventBus';
import { Toast } from 'vant';
import { errorlog } from './../assets/js/util/errorlog'
import store from './../store'
Vue.use(Toast);

axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.interceptors.request.use(config => {
	sessionStorage.axiosUrl = config.url;
	// form data 请求
	if (config.url === API.API_TEAM_ACHIEVEMENT || config.url === API.API_TEAM_DETAIL || config.url === API.API_TEAM_MEMBER || config.url === API.API_ACTIVITY_FINDACTIVITYLIST || config.url === API.API_COMMON_MD5 || config.url === API.API_ACTIVITY_SAVEAGENTVISITORLOG || config.url === API.API_ACTIVITY_GENERATECARD || config.url === API.API_TEAM_SUBSIDYDETAIL) {
		config.transformRequest = [function (data) {
			let ret = ''
			for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
			}
			return ret
		}]
	}

	if (config.loading != 'false') {
		EventBus.$emit('GlobalLoadingTrigger', true);
	}

	// 添加时间戳
	if (config.url !== API.API_COMMON_MD5) {
		if(config.method == "post"){
			config.data = {
				...config.data,
				_t: Date.parse(new Date())
			}
		}else{
			config.params = {
				...config.params,
				_t: Date.parse(new Date())
			}
		}
	}
	// 添加 manageVersion
	if(config.method == "post"){
		config.data = {
			...config.data,
			manageVersion: store.state.common.manageVersion
		}
	}else{
		config.params = {
			...config.params,
			manageVersion: store.state.common.manageVersion
		}
	}

	// 设置 token
	if (localStorage.getItem("token")) {
		config.headers.token = localStorage.getItem("token");
	}
	return config
}, error => {
	EventBus.$emit('GlobalLoadingTrigger', false);
	return Promise.reject(error);
})

axios.interceptors.response.use(response => {
	errorlog('response', response)
	if (response.config.loading != 'false') {
		EventBus.$emit('GlobalLoadingTrigger', false);
	}
	return response.data
}, error => {
	if (sessionStorage.axiosUrl === API.API_INSURE_INPUT_SAVE) {
		Toast('订单已受理，因网络原因请到订单管理处查看');
		setTimeout(() => {
			router.push({ path: '/orderList' })
		}, 2500);
	} else {
		Toast(error.message.includes('timeout') ? '请求超时' : '请求失败！');
	}
	errorlog('error', error)
	EventBus.$emit('GlobalLoadingTrigger', false);
	return { content: {} }
})

Vue.prototype.$axios = axios;

//自定义
var instance = axios.create({
	baseURL: configJs.config.http_base_agent,
	timeout: 30000,
	headers: {
		"Content-Type": "multipart/form-data"
	}
});
instance.interceptors.request.use(function (myConfig) {
	// 设置 token
	if (localStorage.getItem("token")) {
		myConfig.headers.token = localStorage.getItem("token");
	}
	return myConfig;
});

Vue.prototype.instance = instance;

//车险上传图片
var commonInstance = axios.create({
	timeout: 30000,
	headers: {
		"Content-Type": "multipart/form-data"
	}
});
commonInstance.interceptors.request.use(function (myConfig) {
	// 设置 token
	if (localStorage.getItem("token")) {
		myConfig.headers.token = localStorage.getItem("token");
	}
	return myConfig;
});

Vue.prototype.commonInstance = commonInstance;