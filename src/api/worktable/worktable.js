import {baseUrl} from '../../common/js/api'
export function  getWrokTable(url,data,callback){//获取工作台
	$.ajax({
		url: baseUrl.url4 + url,
		data: data,
		type: 'post',
		dataType: 'json',
		success (res) {
			callback && callback(res)
		},
		error (err) {
			fail && fail(err)
		}
	})
}