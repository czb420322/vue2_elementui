import {baseUrl} from '../../common/js/api'



export function getListOrg(url,data,success,fail){
	$.ajax({
		url: baseUrl.url5 + url,
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

export function getOrglistPage(url,data,success,fail){
	$.ajax({
		url: baseUrl.url5 + url,
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

export function getParentOrgName(url,data,success,fail){
	$.ajax({
		url: baseUrl.url5 + url,
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

export function addOrg(url,data,success,fail){
	$.ajax({
		url: baseUrl.url5 + url,
		data: data,
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

export function editOrg(url,data,success,fail){
	$.ajax({
		url: baseUrl.url5 + url,
		data: data,
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





