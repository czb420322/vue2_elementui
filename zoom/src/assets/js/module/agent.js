import axios from 'axios';
import configJs from './../../../config.js';
import util from './../util/util';
import { Toast } from 'vant';
import { router } from './../../../router';
import API from './../../../api';
import store from './../../../store';
export default {
	async getHomeInfo(data) {
		const res = await axios({
			url: API.API_HOME_INFO,
			method: 'get',
			loading: util.getSessionStorageObj("HOME_INFO") ? 'false': 'true',
			params: {
				...data,
				type: sessionStorage.getItem('type'),
				system: sessionStorage.getItem('system'),
				manageVersion:store.state.common.manageVersion
			}
		});
		if (res.code === 0 && res.content.result === '0') {
			util.setSessionStorageObj("HOME_INFO", res);
		}else{
			Toast(res.content.resultMessage);
		}
		return res;
	},
};
