
import API from './../../../api';
import store from './../../../store'
/**
 * 错误统计
 */
export function errorlog(status, res) {
	if (
		localStorage.getItem("token") && res && res.config && res.config.url != API.API_ERRORLOG &&
		(
			// 接口
			res.config.url.includes(API.API_GETCHECKCARCODE) ||
			res.config.url.includes(API.API_CARBASICINFOENTRY) ||
			res.config.url.includes(API.API_GETCARPRICE) ||
			res.config.url.includes(API.API_TRYCALCULATION) ||
			res.config.url.includes(API.API_GETQUOTATIONINFO) ||
			res.config.url.includes(API.API_CLAUSES) ||
			res.config.url.includes(API.API_SAVEPROPOSAL) ||
			res.config.url.includes(API.API_SUBMITUNDERWRITING) ||
			res.config.url.includes(API.API_GETORDERLIST) ||
			res.config.url.includes(API.API_GETORDERDETAILS) ||
			res.config.url.includes(API.API_GETIMAGE) ||
			res.config.url.includes(API.API_FEICHE_GETORDERLIST) ||
			res.config.url.includes(API.API_ORDER_FINDORDERDETAILS) ||
			res.config.url.includes(API.API_INSURE_INPUT_GETPAYURL) ||
			res.config.url.includes(API.API_RENEWALLIST) ||
			res.config.url.includes(API.API_GETRENEWINFO) ||
			res.config.url.includes(API.API_RENEWALCLAIM) ||
			res.config.url.includes(API.API_NOCARRENEWALCLAIM) ||
			res.config.url.includes(API.API_CANCELCLAIM) ||
			res.config.url.includes(API.API_SENDMOBILEVERIFICATIONCODE) ||
			res.config.url == '/insure/upload'
		)
	) {
		let errorType, errorContent
		if (status == 'response') {
			// 影像上传
			if (res.config.url.includes(API.API_INSUREUPLOAD)) {
				if (res.data.code != 0 || res.data.content.code != 0) {
					errorType = '2'
					errorContent = res.data.message || '上传失败'
				}
				// 非车险订单详情
			} else if (res.config.url.includes(API.API_ORDER_FINDORDERDETAILS)) {
				if (res.data.code != 0) {
					errorType = '2'
					errorContent = res.data.message || '请求失败'
				}
			} else if (res.data.content && res.data.content.result != 0) {
				errorType = '2'
				errorContent = res.data.content.resultMessage || '请求失败'
			}
		} else if (status == 'error') {
			if (res.message.includes('timeout')) {
				errorType = '1'
				errorContent = '请求超时'
			} else {
				errorType = '3'
				errorContent = '请求失败'
			}
		}
		if (errorType && errorContent) {
			store.dispatch('common/goErrorlogAdd', {
				h5ReqUrl: res.config.url,
				h5ReqParam: res.config.data,
				errorType,
				errorContent
			})
		}
	}
}