/**
 * 
 * 校验身份证
 * @param card
 * @returns {Boolean}
 */
import { Toast } from 'vant';
var vcity = {
	11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
	21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
	33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南",
	42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
	51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
	63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
};
//检查号码是否符合规范，包括长度，类型  
var isCardNo = function (card) {
	//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
	var reg = /(^\d{17}(\d|X)$)/;
	if (reg.test(card) === false) {
		return false;
	}

	return true;
};

//取身份证前两位,校验省份  
var checkProvince = function (card) {
	var province = card.substr(0, 2);
	if (vcity[province] == undefined) {
		return false;
	}
	return true;
};

//检查生日是否正确  
var checkBirthday = function (card) {
	var len = card.length;
	//身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字  
	if (len == '15') {
		var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
		var arr_data = card.match(re_fifteen);
		var year = arr_data[2];
		var month = arr_data[3];
		var day = arr_data[4];
		var birthday = new Date('19' + year + '/' + month + '/' + day);
		return verifyBirthday('19' + year, month, day, birthday);
	}
	//身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X  
	if (len == '18') {
		var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
		var arr_data = card.match(re_eighteen);
		var year = arr_data[2];
		var month = arr_data[3];
		var day = arr_data[4];
		var birthday = new Date(year + '/' + month + '/' + day);
		return verifyBirthday(year, month, day, birthday);
	}
	return false;
};

//校验日期  
var verifyBirthday = function (year, month, day, birthday) {
	var now = new Date();
	var now_year = now.getFullYear();
	//年月日是否合理  
	if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
		//判断年份的范围（0岁到100岁之间)  
		var time = now_year - year;
		if (time >= 0 && time <= 100) {
			return true;
		}
		return false;
	}
	return false;
};

//校验位的检测  
var checkParity = function (card) {
	//15位转18位  
	//card = changeFivteenToEighteen(card);  
	var len = card.length;
	if (len == '18') {
		var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
		var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
		var cardTemp = 0, i, valnum;
		for (i = 0; i < 17; i++) {
			cardTemp += card.substr(i, 1) * arrInt[i];
		}
		valnum = arrCh[cardTemp % 11];
		if (valnum == card.substr(17, 1)) {
			return true;
		}
		return false;
	}
	return false;
};

export default {
	/**
	 * 自然数校验，适用于：
	 * 		1.输入金额;2.年龄;......
	 */
	isInt: function (numStr, errMsg) {
		if (typeof errMsg == "undefined") {
			errMsg = '您输入的数字不合法';
		}
		if (!/^\+?[1-9][0-9]*$/.test(numStr)) {
			Toast(errMsg);
			return false;
		}
		return true;
	},
	/**
	 * 金额校验
	 */
	isMoney: function (numStr, errMsg) {
		if (typeof errMsg == 'undefined') {
			errMsg = '您输入的金额不合法';
		}
		if (!/^[1-9]{1}[0-9]{2,7}[.]{8}[0-9]{9,10}$/.test(numStr)) {
			Toast(errMsg);
			return false;
		}
		return true;
	},
	hasCard: function (cardNo, errMsg) {
		if (typeof errMsg == "undefined") {
			errMsg = '请选择银行卡';
		}
		if (typeof cardNo == 'undefined' || cardNo == null || cardNo == '') {
			Toast(errMsg);
			return false;
		}
		return true;
	},
	/**
	 * 密码校验
	 * 		
	 */
	isPassword: function (numStr, errMsg) {
		if (typeof errMsg == "undefined") {
			errMsg = '你输入的密码格式不正确';
		}
		if (!/^[a-zA-Z0-9]*$/.test(numStr) || (numStr.length < 6 || numStr.length > 15)) {
			Toast(errMsg);
			return false;
		}
		return true;
	},
	/**
	 * 地址长度校验
	 */
	isAddress: function (str) {
		str = str.replace(/[^\u4e00-\u9fa5]/gi, "");
		if (str.length < 5) {
			$.alertMessage("地址长度不能少于5个汉字!");
			return false;
		}
		return true;
	},
	/**
	 * 手机号码校验
	 * 		
	 */
	isMobile: function (numStr, errMsg) {
		if (typeof errMsg == "undefined") {
			errMsg = '你输入的手机号码格式不正确';
		}
		if (!/^(13|15|18|14|17|16|19)\d{9}$/.test(numStr)) {
			Toast(errMsg);
			return false;
		}
		return true;
	},
	/**
	 * 电子邮箱校验
	 * 		
	 */
	isEmail: function (numStr, errMsg) {
		if (typeof errMsg == "undefined") {
			errMsg = '你输入的电子邮箱格式不正确';
		}
		var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!reg.test(numStr)) {
			Toast(errMsg);
			return false;
		}
		return true;
	},
	isEmpty: function (str, errMsg) {
		if (typeof errMsg == "undefined") {
			errMsg = '输入为空';
		}
		if (str == '' || str == null || str == undefined) {
			Toast(errMsg);
			return false;
		}
		return true;
	},

	isChecked: function (id, errMsg) {
		if (typeof errMsg == "undefined") {
			errMsg = '请先阅读相关条款并同意';
		}
		var flag = $('#' + id).prop('checked');
		if (!flag) {
			Toast(errMsg);
		}
		return flag;
	},
	/**
	 * 身份证校验
	 * 		
	 */
	isIdno: function (idNo, errMsg) {
		if (typeof errMsg == "undefined") {
			errMsg = '身份证格式不正确';
		}
		//是否为空  
		if (idNo === '') {
			$.alertMessage('身份证号不能为空');
			return false;
		}
		//校验长度，类型  
		if (isCardNo(idNo) === false) {
			Toast(errMsg);
			return false;
		}
		//检查省份  
		if (checkProvince(idNo) === false) {
			Toast(errMsg);
			return false;
		}
		//校验生日  
		if (checkBirthday(idNo) === false) {
			Toast(errMsg);
			return false;
		}
		//检验位的检测  
		if (checkParity(idNo) === false) {
			Toast(errMsg);
			return false;
		}

		return true;
	},
	isLength: function (str, len, tar) {
		var errMsg = tar + '不能小于' + len + '位';
		if (str == '' || str == null || str == undefined) {
			Toast(errMsg);
			return false;
		}
		if (str.length < len) {
			Toast(errMsg);
			return false;
		}
		return true;
	},
	/**车架号校验*/
	isRackNo: function (rackNo, errMsg) {
		if (typeof errMsg == "undefined") {
			errMsg = '车架号格式不正确';
		}
		var reg = /^[a-zA-Z0-9]{17}$/;
		if (!reg.test(rackNo)) {
			Toast(errMsg);
			return false;
		}
		return true;
	},

	/**计算时间差 天*/
	getTimeStr(val, timeType) {
		var dd = new Date();

		if (timeType == 'Y') {
			dd.setFullYear(dd.getFullYear() + val);//获取val天后的日期    
			dd.setDate(dd.getDate() + 1);
		} else if (timeType == 'M') {
			dd.setMonth(dd.getMonth() + val);//获取val天后的日期    
		} else {
			dd.setDate(dd.getDate() + val);//获取val天后的日期    
		}

		var y = dd.getFullYear();
		var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0    
		var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0    
		return y + "-" + m + "-" + d;
	},

	/**计算出生年龄*/
	getAge: function (strDate) {
		var today = new Date();
		var b = strDate.match(
			/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
		if (b == null) {
			return null;
		} else {
			var year = b[1] * 1;
			var month = b[3] * 1;
			var day = b[4] * 1;
			var nowY = today.getFullYear();
			var age = nowY - b[1];
			if (today.getMonth() + 1 < month) {
				age--;
			} else if (today.getMonth() + 1 == month
				&& today.getDate() < day) {
				age--;
			} else if (age < 1) {
				var dayNum = this.getDateDiff(strDate, nowY
					+ '-' + (today.getMonth() + 1) + '-'
					+ today.getDate());
				if (dayNum < 28) {
					age--;
				}
			}
			return age;
		}
	},

	getDateDiff: function (date1, date2) {
		var d1 = this.stringToDate(date1);
		var d2 = this.stringToDate(date2);
		return (d2.getTime() - d1.getTime()) / (1000 * 3600 * 24) + 1;
	},
	stringToDate: function (string) {
		return new Date(Date.parse(string.replace(/-/g, "/")));
	},
	//车险基本信息页面校验发证日期和注册日期
	verifyDataFormat(bagin){
		var bagin_r = bagin.match(/^(\d{4})(-)(\d{2})(-)(\d{2})$/);
		if(bagin_r==null){
			return false;
 		}else{
			 return true;
		}
	}

};