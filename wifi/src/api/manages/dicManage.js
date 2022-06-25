import {baseUrl} from '../../common/js/api'

export function getListDictionaryItem(url,data,success,fail){
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

export function validItemName(url,data,success,fail){
	$.ajax({
		url: baseUrl.url4 + url,
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

export function insertDictionaryItem(url,data,success,fail){
	$.ajax({
		url: baseUrl.url4 + url,
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

export function updateDictionaryItem(url,data,success,fail){
	$.ajax({
		url: baseUrl.url4 + url,
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

export function deleteDictionaryItem(url,data,success,fail){
	$.ajax({
		url: baseUrl.url4 + url,
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

export function getListDictionaryValue(url,data,success,fail){
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

export function insertDictionaryValue(url,data,success,fail){
	$.ajax({
		url: baseUrl.url4 + url,
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

export function validValueCode(url,data,success,fail){
	$.ajax({
		url: baseUrl.url4 + url,
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

export function validValueName(url,data,success,fail){
	$.ajax({
		url: baseUrl.url4 + url,
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

export function deleteDictionaryValue(url,data,success,fail){
	$.ajax({
		url: baseUrl.url4 + url,
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

export function updateDictionaryValue(url,data,success,fail){
	$.ajax({
		url: baseUrl.url4 + url,
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


