import {baseUrl} from '../../common/js/api'
import  storage from'./storage.js'
export function getListUser(url,data,callback,fail){
	$.ajax({
		url: baseUrl.url1 + url,
		data: data,
		type: 'get',
		dataType: 'json',
		headers:{
			token:storage.getSession("token"),
			currentUser:storage.getSession("name")||""
		},
		success (res,status,xhr) {
			callback && callback(res,status,xhr)
		},
		error (err) {
			fail && fail(err)
		}
	})
}

export function changeStatus(url, success, fail){
	$.ajax({
		url: baseUrl.url1 + url,
		headers:{
			token:storage.getSession("token"),
			currentUser:storage.getSession("name")||""
		},
		data: {},
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

export function getAllRole(url, success, fail){
	$.ajax({
		url: baseUrl.url1 + url,
		data: {},
		type: 'get',
		dataType: 'json',
		headers:{
			token:storage.getSession("token"),
			currentUser:storage.getSession("name")||""
		},
		success (res) {
			success && success(res)
		},
		error (err) {
			fail && fail(err)
		}
	})
}

export function addUser(url, data, success, fail){
	$.ajax({
		url: baseUrl.url1 + url,
		data: data,
		type: 'post',
		dataType: 'json',
		headers:{
			token:storage.getSession("token"),
			currentUser:storage.getSession("name")||""
		},
		success (res) {
			success && success(res)
		},
		error (err) {
			fail && fail(err)
		}
	})
}

export function editUser(url, data, success, fail){
	$.ajax({
		url: baseUrl.url1 + url,
		data: data,
		type: 'post',
		dataType: 'json',
		headers:{
			token:storage.getSession("token"),
			currentUser:storage.getSession("name")||""
		},
		success (res) {
			success && success(res)
		},
		error (err) {
			fail && fail(err)
		}
	})
}

export function getUserInfo(url, success, fail){
	$.ajax({
		url: baseUrl.url1 + url,
		data: {},
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

export function getSysModule(url,success,fail){
	$.ajax({
		url: baseUrl.url1 + url,
		data: {},
		type: 'get',
		dataType: 'json',
		headers:{
			token:storage.getSession("token"),
			currentUser:storage.getSession("name")||""
		},
		success (res) {
			success && success(res)
		},
		error (err) {
			fail && fail(err)
		}
	})
}

export function getModuleList(url, id, success, fail){
	// var that = this;
	let name =  storage.getSession("name");
	let token = storage.getSession("token");
	$.ajax({
		url: baseUrl.url1 + url,
		type:'post',
		data:{"parentId":id},
		dataType:'JSON',
		headers:{
			'token':token,
			'currentUser':name
		},
		success (data,status,res) {
			success && success(data,status,res)
		},
		error (err) {
			fail && fail(err)
		}
	})
}
