import {baseUrl} from '../../common/js/api'

export function getLogList(url,data,md5String,success,fail){
	$.ajax({
		url: baseUrl.url4 + url,
		data: data,
		headers: {
			request_auth_header: "",
			x_videtekauth_token: md5String
		},
		type: 'post',
		dataType: 'json',
		success (res) {
			success && success(res)
		},
		error (err) {
			fail && fail(err)
		}
	})
}