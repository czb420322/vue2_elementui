
import { Toast } from 'vant';
import util from './util';
import area from '../../json/area.js';

/**
 * 校验身份证
 */
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
        var arr_data_o = card.match(re_fifteen);
        var year_o = arr_data_o[2];
        var month_o = arr_data_o[3];
        var day_o = arr_data_o[4];
        var birthday_o = new Date('19' + year_o + '/' + month_o + '/' + day_o);
        return verifyBirthday('19' + year_o, month_o, day_o, birthday_o);
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
        if (time >= 0 && time <= 150) {
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
        var cardTemp = 0,
            i, valnum;
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
     * 正数(包含小数)
     */
    isPlus: function (numStr, errMsg) {
        if (typeof errMsg == 'undefined') {
            errMsg = '您输入的不是正数';
        }
        if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(numStr)) {
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

    /**
     * 邮编校验
     */
    isCheckZip: function (numStr, errMsg) {
        var reg = new RegExp("^[0-9]*$");
        if (!reg.test(numStr)) {
            Toast(errMsg);
            return false;
        }
        if (numStr.length == 6) {
            return true;
        } else {
            Toast(errMsg);
            return false;
        }
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
        if (!/^[a-zA-Z0-9]*$/.test(numStr) || (numStr.length < 6 || numStr.length > 20)) {
            Toast(errMsg);
            return false;
        }
        return true;
    },

    /**
     * 地址长度校验
     */
    isAddress: function (numStr, errMsg) {
        var numStrTemp = numStr.replace(/[^\u4e00-\u9fa5]/gi, "");
        if (numStrTemp.length < 5) {
            Toast(errMsg);
            return false;
        }
        var pattern = new RegExp("[^a-zA-Z0-9\_\u4e00-\u9fa5]", "i");
        if (pattern.test(numStr)) {
            Toast(errMsg);
            return false;
        }
        return true;
    },

    isCompanyName: function (numStr, errMsg) {
        var numStrTemp = numStr.replace(/[^\u4e00-\u9fa5]/gi, "");
        if (numStrTemp.length < 8) {
            Toast(errMsg);
            return false;
        }
        var pattern = new RegExp("[^a-zA-Z0-9\_\u4e00-\u9fa5]", "i");
        if (pattern.test(numStr)) {
            Toast(errMsg);
            return false;
        }
        return true;
    },

    /**
     * 姓名验证
     *
     */
    isName: function (numStr, errMsg) {
        let saleCode = util.getSessionStorageObj('saleCode') || '';
        if (!numStr) {
            Toast('请输入姓名');
            return false;
        }
        if (typeof errMsg == "undefined") {
            errMsg = '你输入的姓名格式不正确';
        }
        //新疆学平险 全车驾乘人员意外险 不需要校验名称格式
        if(saleCode != 'GRMOBILE_MALL_SL072' && saleCode != 'GRMOBILE_MALL_SL002'){
            if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(numStr)) {
                Toast(errMsg);
                return false;
            }
        }
        return true;
    },
    isName2: function (numStr, errMsg) {
        let saleCode = util.getSessionStorageObj('saleCode') || '';
        if (!numStr) {
            Toast('请输入姓名');
            return false;
        }
        if (typeof errMsg == "undefined") {
            errMsg = '你输入的姓名格式不正确';
        }
        var name = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
        if (numStr && name.test(numStr)) {
            return true;
        }
        //新疆学平险 全车驾乘人员意外险 不需要校验名称格式
        if(saleCode != 'GRMOBILE_MALL_SL072' && saleCode != 'GRMOBILE_MALL_SL002'){
            if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(numStr)) {
                Toast(errMsg);
                return false;
            }
        }
        return true;
    },

    /**
     * 手机号码校验
     *
     */
    isMobile: function (numStr, errMsg) {
        if (!numStr) {
            Toast('请输入手机号码');
            return false;
        }
        if (typeof errMsg == "undefined") {
            errMsg = '你输入的手机号码格式不正确';
        }
        var verify =/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (numStr && numStr.length == 11 && numStr.substring(0, 1) == 1 && verify.test(numStr)) {
            return true;
        }
        Toast(errMsg);
        return false;
    },
    isMobile2: function (numStr, errMsg) {
        if (!numStr) {
            Toast('请输入手机号码');
            return false;
        }
        if (typeof errMsg == "undefined") {
            errMsg = '你输入的手机号码格式不正确';
        }
        var verify = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
        if (numStr && verify.test(numStr)) {
            return true;
        }
        Toast(errMsg);
        return false;
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

    // 组织机构号码校验
    organization : function(val) {
        var checkout= /^[0-9A-Z]{8}[0-9X]$/;
        if(checkout.test(val) === false){
            Toast("请输入正确的机构号码")
            return false
        }
        return true
    },
    // 社会统一信用代码
    creditCode: function (val){
        var regular = /^([159Y]{1})([12439]{1})([0-9ABCDEFGHJKLMNPQRTUWXY]{6})([0-9ABCDEFGHJKLMNPQRTUWXY]{9})([0-90-9ABCDEFGHJKLMNPQRTUWXY])$/;
        if(regular.test(val) === false){
            Toast("请输入正确的社会统一信用代码")
            return false
        }
        return true
    },

    /**
     * 身份证校验
     *
     */
    isIdno: function (idNo, errMsg, type) {
        // var IdCardNumberReg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
        var PassportNumberReg = /^1[45][0-9]{7}$|(^[P|p|S|s]\d{7}$)|(^[S|s|G|g|E|e]\d{8}$)|(^[Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8}$)|(^[H|h|M|m]\d{8,10}$)/;
        var registeredNumberReg = /^\d{9}$/;
        var HongKongandMacao =/^([H|M]\d{10})$/;
       // 规则： 军/兵/士/文/职/广/（其他中文） + "字第" + 4到8位字母或数字 + "号"
       // 样本： 军字第2001988号, 士字第P011816X号
        var isOfficerCard=/^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/;//军官证
        var returnPermit=/^([H]\d{11})$///返乡证
        if (type == '2') {
            //是否为空
            if (idNo === '') {
                Toast('户口本不能为空');
                return false;
            }
            if (!registeredNumberReg.test(idNo)) {
                Toast('户口本格式不正确');
                return false;
            }
        } else if (type == '16') {
            //是否为空
            if (idNo === '') {
                Toast('护照不能为空');
                return false;
            }
            if (!PassportNumberReg.test(idNo)) {
                Toast('护照格式不正确');
                return false;
            }
        }else if(type=='24'){
            if (idNo === '') {
                Toast('身份证(港澳)不能为空');
                return false;
            }
            if (!HongKongandMacao.test(idNo)) {
                Toast('身份证(港澳)格式不正确');
                return false;
            }
        } else if(type=='15'){
            if (idNo === '') {
                Toast('返乡证不能为空');
                return false;
            }
            if (!returnPermit.test(idNo)) {
                Toast('返乡证格式不正确');
                return false;
            }
        }else if(type=='13'){
            if (idNo === '') {
                Toast('军官证不能为空');
                return false;
            }
            if (!isOfficerCard.test(idNo)) {
                Toast('军官证格式不正确');
                return false;
            }
        }else {
            if (typeof errMsg == "undefined") {
                errMsg = '身份证格式不正确';
            }
            //是否为空
            if (idNo === '') {
                Toast('身份证号不能为空');
                return false;
            }
            // 18-65周岁人员。
            // let saleCode = util.getSessionStorageObj('saleCode');
            // let birthDay = this.idNoChangeBirthday(idNo);
            // let age = this.getAge(birthDay);
            // if ((saleCode == 'GRMOBILE_MALL_SL006' || saleCode == 'GRMOBILE_MALL_SL007' || saleCode == 'GRMOBILE_MALL_SL012') && (age < 18 || age > 65)) {
            //     Toast('年龄不能大于65周岁或小于18周岁！');
            //     return false;
            // }
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
        }
        return true;
    },

    //通过身份证更改生日
    idNoChangeBirthday(idNo) {
        var _this = this;
        var birthday = idNo.substring(6, 10) + "-" + idNo.substring(10, 12) + "-" + idNo.substring(12, 14);
        return birthday;
    },

    //通过身份证更改性别
    idNoChangeSex(idNo) {
        var _this = this;
        var sexChange = idNo.substring(16, 17);
        var sex = '';
        if (sexChange % 2 == 0) {//女
            sex = '1';
        } else {
            //男
            sex = '0';
        }
        return sex;
        
    },

    // strBirthday：指的是出生日期，格式为"1990-01-01"
    getAgeByDate(strBirthday) {
        let startDate = util.getSessionStorageObj("startDate") || "";
        var returnAge,
            strBirthdayArr = strBirthday.split("-"),
            birthYear = strBirthdayArr[0],
            birthMonth = strBirthdayArr[1],
            birthDay = strBirthdayArr[2],
            d = new Date(startDate.replace(/-/g, "/")),
            nowYear = d.getFullYear(),
            nowMonth = d.getMonth() + 1,
            nowDay = d.getDate();

        if (nowYear == birthYear) {
            returnAge = 0; //同年 则为0周岁
        } else {
            var ageDiff = nowYear - birthYear; //年之差
            if (ageDiff > 0) {
                if (nowMonth == birthMonth) {
                    var dayDiff = nowDay - birthDay; //日之差
                    if (dayDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                } else {
                    var monthDiff = nowMonth - birthMonth; //月之差
                    if (monthDiff < 0) {
                        returnAge = ageDiff - 1;
                    } else {
                        returnAge = ageDiff;
                    }
                }
            } else {
                returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
            }
        }
        console.log(returnAge)
        return returnAge; //返回周岁年龄
       
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
        if( rackNo && rackNo.length != 17){
            Toast('车架号长度必需17位');
            return false;
        }
        // if (typeof errMsg == "undefined") {
        //     errMsg = '车架号格式不正确';
        // }
        // var reg = /^[a-zA-Z0-9]{17}$/;
        // if (!reg.test(rackNo)) {
        //     Toast(errMsg);
        //     return false;
        // }
        return true;
    },

    /**计算时间差 天*/
    getTimeStr: function (val, timeType) {
        var dd = new Date();
        if (timeType == 'Y') {
            dd.setFullYear(dd.getFullYear() + val); //获取val天后的日期
            dd.setDate(dd.getDate() + 1);
        } else if (timeType == 'M') {
            dd.setMonth(dd.getMonth() + val); //获取val天后的日期
        } else {
            dd.setDate(dd.getDate() + val); //获取val天后的日期
        }
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
        return y + "-" + m + "-" + d;
    },

    /** 获取指定天数之后的日期 */
    getNewDate(dateTemp, days) {
        var dateTemp = dateTemp.split("-");
        var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式
        var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
        var rDate = new Date(millSeconds);
        var year = rDate.getFullYear();
        var month = rDate.getMonth() + 1;
        if (month < 10) month = "0" + month;
        var date = rDate.getDate();
        if (date < 10) date = "0" + date;
        return (year + "-" + month + "-" + date);
    },

    //车牌号验证方法
    isVehicleNumber(vehicleNumber) {
        // var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
        // var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
        if (vehicleNumber != '') {
            // if (vehicleNumber.length == 7) {
            //     return creg.test(vehicleNumber);
            // } else if (vehicleNumber.length == 8) {
            //     return xreg.test(vehicleNumber);
            // } else {
            //     return false;
            // }
            return true;
        }
        return false;
    },

    //车牌号验证方法2
    isVehicleNumber2(str) {
        if (
            str.length >= 7 && str.length <= 8 &&
            /^[\u4e00-\u9fa5]*$/.test(str.substring(0, 1)) &&
            /^[A-Za-z]+$/.test(str.substring(1, 2))
        ) {
            return true;
        }
        return false;
    },

    //车架号验证(机动车)
    isVehicleFrame(vehicleFrame) {
        if (vehicleFrame != '') {
            var a = /^[A-HJ-NPR-Z\d]{17}$/;
            return a.test(vehicleFrame);
        }
    },
    //车架号验证(电动车和摩托车专用6到17位加英文和数字)
    isElectricVehicleFrame(isElectricVehicleFrame) {
        if (isElectricVehicleFrame != '') {
            var a = /^[a-zA-Z0-9@\$\^\.\*\\?]{6,17}$/;
            return a.test(isElectricVehicleFrame);
        }
    },
    /**
     * javascript验证纳税人识别号格式
     * @param  taxId [纳税人识别号]
     * @return true格式正确，false格式错误
     */
    checkTaxId(taxId, errMsg) {
        if (typeof errMsg == "undefined") {
            errMsg = '你输入的纳税人识别号格式不正确';
        }
        var regArr = [/^[\da-z]{10,15}$/i, /^\d{6}[\da-z]{10,12}$/i, /^[a-z]\d{6}[\da-z]{9,11}$/i, /^[a-z]{2}\d{6}[\da-z]{8,10}$/i, /^\d{14}[\dx][\da-z]{4,5}$/i, /^\d{17}[\dx][\da-z]{1,2}$/i, /^[a-z]\d{14}[\dx][\da-z]{3,4}$/i, /^[a-z]\d{17}[\dx][\da-z]{0,1}$/i, /^[\d]{6}[\da-z]{13,14}$/i],
            i, j = regArr.length;
        for (var i = 0; i < j; i++) {
            if (regArr[i].test(taxId)) {
                return true;
            }
        }
        //纳税人识别号格式错误
        Toast(errMsg);
    },

    // 运行环境
    getBrowserWx() {
        var browser = {
            versions: (function () {
                var u = navigator.userAgent,
                    app = navigator.appVersion;
                return {
                    //移动终端浏览器版本信息
                    trident: u.indexOf("Trident") > -1, //IE内核
                    presto: u.indexOf("Presto") > -1, //opera内核
                    webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
                    gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或uc浏览器
                    iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf("iPad") > -1, //是否iPad
                    webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
                };
            })(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        };
        if (browser.versions.mobile) {
            //判断是否是移动设备打开。browser代码在下面
            var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                //在微信中打开
                return true;
            }
        }
        return false;
    },
    // 日期转换成年月日时分秒
    transformTimestamp(val) {
        if (!val) {
            return undefined;
        }
        const date = val.split(' ');
        const Y = date[0].split('-')[0] + '年';
        const M = date[0].split('-')[1] + '月';
        const D = date[0].split('-')[2] + '日 ';
        const h = date[1].split(':')[0] + '时';
        const m = date[1].split(':')[1] + '分';
        const s = date[1].split(':')[2] + '秒'; // 秒
        const dateString = Y + M + D + h + m + s;
        return dateString;
    },
    // 标准时间转日期、year是否修改年份
    transformDatestamp(timestamp, year) {
        let date = new Date();
        if (timestamp) {
            date = new Date(timestamp.replace(/-/g, "/"));
        }
        if (year) {
            date.setFullYear(date.getFullYear() + year);
            date.setDate(date.getDate() - 1);
        }
        const Y = date.getFullYear();
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const dateString = `${Y}-${M}-${D}`;
        return dateString;
    },
    // 当前日期  iDays 修改天数
    getDateByDays(iDays) {
        var date = new Date();
        date = new Date(date.setDate(date.getDate() + iDays));
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        var nowData = year + "-" + month + "-" + day;
        return nowData;
    },
    // 标准时间转成 年月日时分秒格式
    transformDatesTimestamp(date) {
        var date = new Date(date)
        const year = date.getFullYear();
        const month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    },
    // 标准时间转日期、year是否修改年份
    transformDatesTimetamp(timestamp, year, num) {
        let date = new Date();
        if (timestamp) {
            date = new Date(timestamp.replace(/-/g, "/"));
        }
        if (year) {
            date.setFullYear(date.getFullYear() + year*1);
        }
        if (num) {
            date.setDate(date.getDate() + num);
        }
        const Y = date.getFullYear();
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        const dateString = `${Y}-${M}-${D} ${hour}:${minute}:${second}`;
        return dateString;
    },
    // 标准时间添加天
    transformDatesDay(timestamp, num) {
        // if (!timestamp) {
        //     return ''
        // }
        let date = timestamp ? new Date(timestamp.replace(/-/g, "/")) : new Date();
        if (num) {
            date.setDate(date.getDate() + num);
        }
        const Y = date.getFullYear();
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const dateString = `${Y}-${M}-${D}`;
        return dateString;
    },

    /** 
     * 根据身份证号，查出地址的省市区
     */
    getAreaByIdCard(idCard) {
        if (!idCard || idCard.length < 6) return '';
        var provinceNo = idCard.substring(0, 2) + '0000';
        var cityNo = idCard.substring(0, 4) + '00';
        var countyNo = idCard.substring(0, 6);

        var provinceName = area.province_list[provinceNo];
        var cityName = area.city_list[cityNo];
        var countyName = area.county_list[countyNo];

        return [
            { code: provinceNo, name: provinceName },
            { code: cityNo, name: cityName },
            { code: countyNo, name: countyName }
        ];
    },
    /**
     * 时间戳转时间
     * YYYY-MM-DD HH:ii:ss
     */
    timestampToTime(timestamp, type) {
	    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = date.getFullYear();
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        if( type==="YYYY-MM-DD"){
            return `${Y}-${M}-${D}`
        }
	    return `${Y}-${M}-${D} ${hour}:${minute}:${second}`
    },
    // 保险止期
    InsurancePeriod(value, insuYearUnit) {
        if(!value || !insuYearUnit){ return '' }
        let unit = insuYearUnit.replace(/[^a-z]+/ig,"") // 单位
        let num = parseInt(insuYearUnit) // 数量
        if( unit == 'Y' || unit == 'D' || unit == 'd' || unit == 'm' || unit == 'M' ){
            let date = new Date(value.replace(/-/g, "/"))
            if( unit == 'Y' ){
                // 添加年
                date.setFullYear(date.getFullYear() + num);
            }else if( insuYearUnit == '365D' || insuYearUnit == '365d'  ){
                // 添加1年
                date.setFullYear(date.getFullYear() + 1);
            }else if( unit == 'D' || unit == 'd' ){
                // 添加天数
                date.setDate(date.getDate() + num);
            }else if( unit == 'm' || unit == 'M'){
                // 添加月数
                date.setMonth(date.getMonth() + num);
            }
            date.setDate(date.getDate() - 1); 
            const Y = date.getFullYear();
            const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
            const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return `${Y}-${M}-${D}`;
        }
        return ''
    },
    // 获取距离当前日期天数
    getDistanceDate(value) {
        var s1 = new Date(value.replace(/-/g, "/"));
        var s2 = new Date(); //当前日期
        var days = (parseInt(s1.getTime()) + 172800000) - s2.getTime();
        var time = parseInt(days / (1000 * 60 * 60 * 24));
        return time
    },
    // 字符串截取第一个横杠后面的
    substrFirstBehind(value){
        if(!value){
            return value
        }
        return value.split('-')[0]
    }
};