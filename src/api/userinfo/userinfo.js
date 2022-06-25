import {baseUrl} from '../../common/js/api'
export function getUserInfo(url,data,callback){
    // let that = this;
    $.ajax({
		url: baseUrl.url1_1 + url,
		data: data,
		type: 'post',
        dataType: 'json',
        headers:{
            'token':'',
            'currentUser':sessionStorage.getItem("name")||""
          },
		success (res) {
			callback && callback(res)
		},
		error (err) {
			fail && fail(err)
		}
	})
}