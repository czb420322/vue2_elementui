import {baseUrl} from '../../common/js/api'
import storage from './storage.js'
export function userLogin(url,data,callback){
	$.ajax({
		url:baseUrl.url1+url,
		data: data,
		type: 'post',
        dataType: 'json',
        // headers:{
        //     'token':'',
        //     'currentUser':sessionStorage.getItem("name")||""
        //   },
		success (data, status, xhr) { 
			// if(xhr.getResponseHeader("currentuser")!=null){
			// 	storage.setSession('currentuser',xhr.getResponseHeader("currentuser"))
			//   }
			//   if(xhr.getResponseHeader("token")){
			// 	storage.setSession('token',xhr.getResponseHeader("token"))  
			//   } 
			callback && callback(data, status, xhr)
		},
		error (err) {
			//console.info(err)
		}
	})
	
}