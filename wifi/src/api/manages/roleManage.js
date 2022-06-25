import {baseUrl} from '../../common/js/api'
import  storage from'./storage.js'
export function getListRole(url,data,callback,fail){
	$.ajax({
		url: baseUrl.url1 + url,
		data: data,
		type: 'get',
		dataType: 'json',
		headers:{
			token:storage.getSession("token"),
			currentUser:storage.getSession("name")||""
		},
		success (data,status,res) {
			callback && callback(data,status,res)
		},
		error (err) {
			fail && fail(err)
		}
	})
}

export function getMenuFormat(url,callback,fail){
	$.ajax({
		url: baseUrl.url1 + url,
		data: {},
		type: 'get',
		dataType: 'json',
		success (res) {
			callback && callback(res)
		},
		error (err) {
			fail && fail(err)
		}
	})
}

export function addRole(url,data,callback,fail){
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
			callback && callback(res)
		},
		error (err) {
			fail && fail(err)
		}
	})
}

export function getRoleInfo(url,data,callback,fail){
	$.ajax({
		url: baseUrl.url1 + url,
		data: data,
		type: 'get',
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

export function editRoleInfo(url,data,callback,fail){
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
			callback && callback(res)
		},
		error (err) {
			fail && fail(err)
		}
	})
}

export function deleteRoleInfo(url,callback,fail){
	$.ajax({
		url: baseUrl.url1 + url,
		data: {},
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