import {baseUrl} from '../../common/js/api'

export function getDictionaryItem(url,data,success,fail){
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

export function getDictionaryVal (url,data,success,fail){
    $.ajax({
        url: baseUrl.url4 + url,
        data: data,
        type: "post",
        dataType: "json",
        success (res) {
            success && success(res)
        },
        error (err) {
            fail && fail(err)
        }

    })
}