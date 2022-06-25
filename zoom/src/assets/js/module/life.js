import axios from 'axios';
import configJs from './../../../config.js';
import util from './../util/util';
import { Toast } from 'vant';
import { router } from './../../../router';
import API from './../../../api';

export default {
	async getProductList(data) {
		const res = await axios({
			url: API.API_PRODUCT_LIST,
			method: 'post',
			loading: util.getSessionStorageObj("PRODUCT_LIST") ? 'false' : 'true',
			data: {
				...data,
				type: sessionStorage.getItem('type'),
				system: sessionStorage.getItem('system')
			}
		});
		if (res.code === 0 && res.content.result === '0') {
			util.setSessionStorageObj("PRODUCT_LIST", res);
		} else {
			Toast(res.content.resultMessage);
		}
		return res;
	},
	async getProductListUnique(data) {
		const res = await axios({
			url: API.API_PRODUCT_LIST_UNIQUE,
			method: 'post',
			loading: util.getSessionStorageObj("PRODUCT_LIST_UNIQUE") ? 'false' : 'true',
			data: {
				...data,
				type: sessionStorage.getItem('type'),
				system: sessionStorage.getItem('system')
			}
		})
		if (res.code === 0 && res.content.result === '0') {
			util.setSessionStorageObj("PRODUCT_LIST_UNIQUE", res);
		} else {
			Toast(res.content.resultMessage);
		}
		return res;
	}
};