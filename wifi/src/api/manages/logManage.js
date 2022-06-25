import {baseUrl} from '../../common/js/api'

export function getLogList(url,data,success,fail){
	$.ajax({
		url: baseUrl.url4 + url,
		data: data,
		type: 'get',
		dataType: 'json',
		success (res) {
			success && success(res)
		},
		error (err) {
			fail && fail(err)
		}
	})
}