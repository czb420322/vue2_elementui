import {baseUrl} from '../../common/js/api'
import  storage from'../manages/storage.js'
export function loginout(url,data,callback){
	$.ajax({
		url: baseUrl.url1 + url,
		data: {},
		type: 'post',
		dataType: 'json',
		headers:{
			token:storage.getSession("token"),
			currentUser:storage.getSession("name")||""
		},
		success (res) {
			callback && callback(res)
		},
		error (err) {
			fail && fail(err)
		}
	})
}