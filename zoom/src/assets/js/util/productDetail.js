import { Toast, Dialog } from 'vant';
import axios from 'axios';
import util from './util';
import $ from 'jquery';
import EventBus from './EventBus';
import compCheck from './comp-check';
import { router } from './../../../router';
import API from './../../../api';
import MD5 from 'js-md5';
import store from './../../../store'
import glutton from './glutton';
const compareDate = (s1, s2) => {
    return ((new Date(s1.replace(/-/g, "\/"))) > (new Date(s2.replace(/-/g, "\/"))));
};
// 产品详情立即下单
let isLoading = true;
const goConfirm = async (objPage, channelType, nickName, msId) => {
    EventBus.$emit('GlobalLoadingTrigger', true);
    let pageData = util.getSessionStorageObj('insureInfo');
    let insuredDataName = util.getSessionStorageObj('insuredDataName')
    console.log("pageData", pageData);
    let isPass = false;
    //验证投保人
    var appntInfo = pageData.appntInfo; //投保人
    var appntData = pageData.appntInfo.data; //投保人数据
    var appntInfoDown = '';

    if (pageData.saleCode == "GRMOBILE_MALL_SL042") {
        let salePlanInfo = util.getSessionStorageObj('salePlanInfo'); //销售计划
        if (!salePlanInfo.data.insuYearUnit) {
            Toast('请输入保障期间天数！');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return false;
        }
    }

    // GRMOBILE_MALL_SL014_个人
    if (pageData.saleCode != "GRMOBILE_MALL_SL026" || pageData.saleCode != "GRMOBILE_MALL_SL041" || pageData.saleCode != "GRMOBILE_MALL_SL044" || pageData.saleCode != "GRMOBILE_MALL_SL045" || pageData.saleCode != "GRMOBILE_MALL_SL046" || pageData.saleCode != "GRMOBILE_MALL_SL077") {
        $.each(appntInfo.struct, function (_index, _obj) { //循环验证投保人 值是否为空
            console.log("_index", _index);
            console.log("_obj", _obj);
            if (_obj.isNeed == 'Y' && _obj.isShow == '0') { //需要 验证是否为空
                console.log('投保人参数[' + _obj.name + ']需要验证');
                var val = appntInfo.data[_obj.code];
                console.log('投保人参数[' + _obj.name + ']需要验证,值为:' + val);
                if (val == 0) {
                    var newTiem = new Date()
                    var nowYear = newTiem.getFullYear(); // 当前年
                    var appntYear = appntData.idNo.slice(6, 10) // 投保人年
                    var newAge = nowYear - appntYear //年龄
                    appntInfo.data.age = newAge
                }
                if (null == val || '' == val) {
                    console.log('投保人参数[' + _index + ']是空!!!');
                    appntInfoDown = _obj.name;
                    isPass = true;
                    EventBus.$emit('GlobalLoadingTrigger', false);
                    return false;
                }
            }
            var _rt = true
            if (_obj.isNeed == 'Y') {
                _rt = verifyAppntInfo(appntInfo.data, _obj.code);
            }

            if (!_rt) { //如果没通过
                appntInfoDown = '';
                isPass = true;
                EventBus.$emit('GlobalLoadingTrigger', false);
                return false;
            }

        });

        if (isPass) { //被保人是否有的值为空
            if (appntInfoDown) {
                Toast('请选择或录入投保人' + appntInfoDown + '信息！');
            }
            EventBus.$emit('GlobalLoadingTrigger', false);
            return false;
        }
    } else {
        if (!appntInfo.data.enterprise) {
            Toast('请输入投保人正确的企业名称！');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return false;
        }
        //物流险只有选择证件类型为统一社会信用代码时才判断
        if (appntInfo.data.idType == '10') {
            if (!appntInfo.data.idNo) {
                Toast('请输入投保人统一社会信用代码！');
                EventBus.$emit('GlobalLoadingTrigger', false);
                return false;
            }
            if (appntInfo.data.idNo.length != 18) {
                Toast('请输入正确的统一社会信用代码！');
                EventBus.$emit('GlobalLoadingTrigger', false);
                return false;
            }
        } else {//否则就是身份证
            if (!compCheck.isIdno(appntInfo.data.idNo)) {
                Toast('请输入正确的身份证号码！');
                EventBus.$emit('GlobalLoadingTrigger', false);
                return false;
            }
            console.log('---------', compCheck.isIdno(appntInfo.data.idNo))

        }

        if (!appntInfo.data.mobile || !compCheck.isMobile(appntInfo.data.mobile)) {
            Toast('请输入投保人正确的手机号！');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return false;
        }
        if (!appntInfo.data.email) {
            Toast('请输入投保人电子邮箱！');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return false;
        }
    }

    // GRMOBILE_MALL_SL026 GRMOBILE_MALL_SL041 GRMOBILE_MALL_SL044 GRMOBILE_MALL_SL045 GRMOBILE_MALL_SL046 GRMOBILE_MALL_SL077
    if (pageData.saleCode != "GRMOBILE_MALL_SL026" || pageData.saleCode != "GRMOBILE_MALL_SL041" || pageData.saleCode != "GRMOBILE_MALL_SL044" || pageData.saleCode != "GRMOBILE_MALL_SL045" || pageData.saleCode != "GRMOBILE_MALL_SL046" || pageData.saleCode != "GRMOBILE_MALL_SL077") {
        //判断被保人
        //非本人情况
        console.log("pageData.sameOneFlag", pageData.sameOneFlag);
        let insuredListData = [];
        // if (pageData.sameOneFlag == 'N') {
        var insuredInfoList = []; //被保人结构数据
        if (pageData.saleCode == 'RBTMOBILE_MALL_RBT0019') {
            insuredInfoList = pageData.insuredData; //被保人结构数据
            for(let i=0;i<insuredInfoList.length;i++){
                delete(insuredInfoList[i].data["mobile"]);//被保人不需要手机号码字段
               }
           
        } else {
            insuredInfoList = pageData.insuredInfo; //被保人结构数据
        }
        console.log('pageData.insuredData', pageData.insuredData);
        console.log('pageData.insuredInfo', pageData.insuredInfo);
        console.log('insuredInfoList', insuredInfoList);
        if (pageData.saleCode == "GRMOBILE_MALL_SL031") {
            let birthday = insuredInfoList[0].data.birthday //生日
            let startDate = util.getSessionStorageObj("startDate") || ''; //选中的保险起期
            if (startDate && birthday) {
                let a = compareDate(startDate, birthday)
                if (!compareDate(startDate, birthday)) {
                    Toast('保险起期必须大于出生日期!');
                    EventBus.$emit('GlobalLoadingTrigger', false);
                    return;
                }
            }
        }
        if (pageData.saleCode == "GRMOBILE_MALL_SL031" && insuredInfoList[0].data.idType == '0') {
            if (insuredInfoList[0].data.idNo == '') {
                Toast('请输入身份证号码！');
                EventBus.$emit('GlobalLoadingTrigger', false);
                return;
            }
            if (!compCheck.isIdno(insuredInfoList[0].data.idNo)) {
                Toast('请输入正确的身份证号码！');
                EventBus.$emit('GlobalLoadingTrigger', false);
                return false;
            }

        }
        var insuredInfoDown = '';
        //遍历被保人结构数据并封装成集合
        $.each(insuredInfoList, function (insureLoopIndex, insuredInfo) {

            $.each(insuredInfo.struct, function (_index, _obj) { //循环验证投保人 值是否为空
                console.log("_index", _index);
                console.log("_obj", _obj);
                if (_obj.isNeed == 'Y' && _obj.isShow == '0') { //需要 验证是否为空
                    console.log('被保人参数[' + _obj.name + ']需要验证');
                    var val = insuredInfo.data[_obj.code];
                    console.log('被保人参数[' + _obj.name + ']需要验证,值为:' + val);
                    if (null == val || '' == val) {
                        console.log('被保人参数[' + _index + ']是空!!!');
                        insuredInfoDown = _obj.name;
                        isPass = true;
                        EventBus.$emit('GlobalLoadingTrigger', false);
                        return false;
                    }
                }

                //存在需要校监的 函数 verifyInsuredInfo
                var _rt = true
                if (_obj.isNeed == 'Y') {
                    _rt = verifyInsuredInfo(insuredInfo.data, _obj.code);
                }

                if (!_rt) { //如果没通过
                    insuredInfoDown = '';
                    isPass = true;
                    EventBus.$emit('GlobalLoadingTrigger', false);
                    return false;
                }
                //将页面录入字段赋值
                insuredListData[insureLoopIndex] = insuredInfo.data;
            });
        });

        if (isPass) { //被保人是否有的值为空
            if (insuredInfoDown) {
                Toast('请选择或录入被保人' + insuredInfoDown + '信息！');
            }
            EventBus.$emit('GlobalLoadingTrigger', false);
            return false;
        }
        // } else {
        //     //本人情况  赋值数据到 被保人
        //     var appntInfoData = pageData.appntInfo.data;
        //     insuredListData[0] = appntInfoData;
        // }
        console.log('被保人信息=======[:' + JSON.stringify(insuredListData) + ']');
        //	        	 _this.trial();
    } else {
        // 不需要验证被保人，直接验证投保人就可以
        // var insuredInfo = pageData.insuredInfo[0]; // 被保人
        // if( !insuredInfo.data.enterprise ){
        //     Toast('请输入被保人正确的企业名称！');
        //     EventBus.$emit('GlobalLoadingTrigger', false);
        //     return false;
        // }
        // if( !insuredInfo.data.taxpayerNo || !compCheck.checkTaxId(insuredInfo.data.taxpayerNo) ){
        //     Toast('请输入被保人正确的纳税人识别号！');
        //     EventBus.$emit('GlobalLoadingTrigger', false);
        //     return false;
        // }
    }
    //需要控制投保人身份证出单370622 370684 辽宁也能出单
    if (pageData.saleCode == "GRMOBILE_MALL_SL050" || pageData.saleCode == "GRMOBILE_MALL_SL051" || pageData.saleCode == "GRMOBILE_MALL_SL052" || pageData.saleCode == "GRMOBILE_MALL_SL053") {
        if (appntInfo.data.idType == '0' && appntInfo.data.idNo) {
            if (appntInfo.data.idNo.slice(0, 6) == '370622' || appntInfo.data.idNo.slice(0, 6) == '370684' || store.state.my.UserInfo.manageCode == '12000000') {
            } else {
                Toast('很抱歉，本产品仅限蓬莱地区和辽宁用户投保!');
                EventBus.$emit('GlobalLoadingTrigger', false);
                return false;
            }
        }
    }

    //判断受益人
    //指定收益人
    if (pageData.bnfType == '1') {

        var bnfInfo = pageData.bnfInfo;
        var bnfInfoList = pageData.bnfInfo.dataArray;

        var bnfInfoDown = '';
        var bnfInfoIndex = '';

        $.each(bnfInfoList, function (_index, _bnfInfo) {
            //每个受益人
            var bnfInfoData = _bnfInfo;

            if (isPass) {
                EventBus.$emit('GlobalLoadingTrigger', false);
                return false;
            }

            $.each(bnfInfo.struct, function (__index, _obj) { //循环验证受益人 值是否为空

                if (_obj.isNeed == '1') { //需要 验证是否为空
                    console.log('受益人参数[' + _obj.name + ']需要验证');
                    var val = _bnfInfo[_obj.code];
                    console.log('受益人参数[' + _obj.name + ']需要验证,值为:' + val);
                    if (null == val || '' == val) {
                        console.log('受益人参数[' + _index + ']是空!!!');
                        bnfInfoIndex = (_index + 1); //第几个受益人
                        bnfInfoDown = _obj.name;
                        isPass = true;
                        EventBus.$emit('GlobalLoadingTrigger', false);
                        return false;
                    }
                }

                //存在需要校监的 函数 verifyBnfInfo
                var _rt = this.verifyBnfInfo(bnfInfoData, _obj.code);

                if (!_rt) { //如果没通过
                    bnfInfoDown = '';
                    isPass = true;
                    EventBus.$emit('GlobalLoadingTrigger', false);
                    return false;
                }

            });

        });

        if (isPass) { //受益人是否有的值为空
            if (bnfInfoDown) {
                $.alertMessage('请选择或录入第' + bnfInfoIndex + '位受益人【' + bnfInfoDown + '】信息！');
            }
            EventBus.$emit('GlobalLoadingTrigger', false);
            return false;
        }
        //核算收益人比例 是否位100%
        var currentOrderIndex = '';

        var indexOne = 0;
        var indexTwo = 0;
        var indexThree = 0;

        $.each(bnfInfoList, function (_index, _bnfInfo) {
            var currentOrder = _bnfInfo['bnfOrderBy'];
            if (currentOrder == '1') {
                indexOne++;
            }
            if (currentOrder == '2') {
                indexTwo++
            }
            if (currentOrder == '3') {
                indexThree++;
            }

        });
        if (indexOne == 0) {
            $.alertMessage('请先选择第一顺位的受益人');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return false;
        }
        if (indexOne != 0 && indexTwo == 0 && indexThree != 0) {
            $.alertMessage('请先选择第二顺位的受益人');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return false;
        }

        var allLot = 0;
        $.each(bnfInfoList, function (_index, _bnfInfo) { //循环验证受益人 值是否为空
            var bnfLot = _bnfInfo['bnfscale'];
            allLot = parseInt(allLot) + parseInt(bnfLot);
        });

        console.log('合计受益比例和: ' + allLot);

        if (allLot < 0 || allLot > 100 || allLot != 100) {
            $.alertMessage('受益人对应的受益比例和不为100%！');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return false;
        }
    }

    if (isPass) { //被保人是否有的值为空
        if (accountInfoDown) {
            $.alertMessage('请选择或录入账户信息' + accountInfoDown + '信息！');
        }
        EventBus.$emit('GlobalLoadingTrigger', false);
        return false;
    }

    // GRMOBILE_MALL_SL002 i行销-全车驾乘人员意外险
    if (pageData.saleCode == 'GRMOBILE_MALL_SL002') {
        let car = pageData.tagsList[0].data;
        // 车牌、车架都必填
        if (!car.licenseNo) {
            Toast('请输入车牌号');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return;
        }
        if (!car.frameNo) {
            Toast('请输入车架号');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return;
        }

        // 车辆其它页面验证
        for (let item of pageData.tagsList[0].struct) {
            if (item.isNeed == 'Y' && !car[item.code] && item.isNeed && item.code != 'licenseNo' && item.code != 'frameNo') {
                Toast(item.holder);
                EventBus.$emit('GlobalLoadingTrigger', false);
                return;
            }
        }
        if (car.isNewCar == 'Y') {
            //车架验证
            if (car.frameNo) {
                if (!compCheck.isVehicleFrame(car.frameNo)) {
                    Toast('车架号输入有误');
                    EventBus.$emit('GlobalLoadingTrigger', false);
                    return;
                }
            } else {
                Toast('请输入车架号');
                EventBus.$emit('GlobalLoadingTrigger', false);
                return;
            }
        }
        if (car.isNewCar == 'N') {
            //车牌验证
            if (car.licenseNo) {
                if (!compCheck.isVehicleNumber(car.licenseNo)) {
                    Toast('车牌号输入有误');
                    EventBus.$emit('GlobalLoadingTrigger', false);
                    return;
                }
            } else {
                Toast('请输入车牌号');
                EventBus.$emit('GlobalLoadingTrigger', false);
                return;
            }
        }
    }
    //物流险 GRMOBILE_MALL_SL026{处理车辆相关验证} 玻璃险GRMOBILE_MALL_SL032 任易驾·驾乘人员意外险GRMOBILE_MALL_SL041 RMOBILE_MALL_SL044 RMOBILE_MALL_SL045 RMOBILE_MALL_SL046 处理货车意外险标的信息GRMOBILE_MALL_SL058 RMOBILE_MALL_SL077
    if (pageData.saleCode == 'GRMOBILE_MALL_SL026' || pageData.saleCode == 'GRMOBILE_MALL_SL032' || pageData.saleCode == 'GRMOBILE_MALL_SL041' || pageData.saleCode == 'GRMOBILE_MALL_SL044' || pageData.saleCode == 'GRMOBILE_MALL_SL045' || pageData.saleCode == 'GRMOBILE_MALL_SL046' || pageData.saleCode == 'GRMOBILE_MALL_SL058' || pageData.saleCode == 'GRMOBILE_MALL_SL077') {
        let car = pageData.tagsList[0].data;
        //车牌验证
        if (car.licenseNo) {
            if (!compCheck.isVehicleNumber(car.licenseNo)) {
                Toast('车牌号输入有误');
                EventBus.$emit('GlobalLoadingTrigger', false);
                return;
            }
        }
        //车架验证
        if (car.frameNo) {
            if (!compCheck.isVehicleFrame(car.frameNo)) {
                Toast('车架号输入有误');
                EventBus.$emit('GlobalLoadingTrigger', false);
                return;
            }
        }
        // 车牌、车架都必填
        if (!car.licenseNo) {
            Toast('请输入车牌号');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return;
        }
        if (!car.frameNo) {
            Toast('请输入车架号');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return;
        }
        if (pageData.saleCode == 'GRMOBILE_MALL_SL026') {
            if (!car.deadweight) {
                Toast('请选择核定载重质量');
                EventBus.$emit('GlobalLoadingTrigger', false);
                return;
            }
        } else if (pageData.saleCode == 'GRMOBILE_MALL_SL032') {
            if (!car.regionPath) {
                Toast('请选择省市区');
                EventBus.$emit('GlobalLoadingTrigger', false);
                return;
            }
            if (!car.addressNo) {
                Toast('请输入详细地址');
                EventBus.$emit('GlobalLoadingTrigger', false);
                return;
            }
        } else if (pageData.saleCode == 'GRMOBILE_MALL_SL041' || pageData.saleCode == 'GRMOBILE_MALL_SL044' || pageData.saleCode == 'GRMOBILE_MALL_SL045' || pageData.saleCode == 'GRMOBILE_MALL_SL046' || pageData.saleCode == 'GRMOBILE_MALL_SL058' || pageData.saleCode == 'GRMOBILE_MALL_SL077') {
            if (!car.seatCount) {
                Toast('请选择座位数');
                EventBus.$emit('GlobalLoadingTrigger', false);
                return;
            }
            if (!car.engine_no) {
                Toast('请输入发动机号');
                EventBus.$emit('GlobalLoadingTrigger', false);
                return;
            }
        }


        // 车辆其它页面验证
        for (let item of pageData.tagsList[0].struct) {
            if (item.isNeed == 'Y' && item.code == "seatCount" && !pageData.tagsList[0].data.seatCount || item.isNeed == 'Y' && item.code == "isNewCar" && !pageData.tagsList[0].data.isNewCar) {
                Toast(item.holder);
                EventBus.$emit('GlobalLoadingTrigger', false);
                return;
            }
        }
    }

    // GRMOBILE_MALL_SL005 i行销-非机动车责任险
    // GRMOBILE_MALL_SL008  i行销-摩托车意外险
    // GRMOBILE_MALL_SL057  i行销-摩托车意外险(河南)
    if (pageData.saleCode == 'GRMOBILE_MALL_SL005' || pageData.saleCode == 'GRMOBILE_MALL_SL008' || pageData.saleCode == 'GRMOBILE_MALL_SL013' || pageData.saleCode == 'GRMOBILE_MALL_SL040' || pageData.saleCode == 'GRMOBILE_MALL_SL057' || pageData.saleCode == 'GRMOBILE_MALL_SL082') {
        let car = pageData.tagsList[0].data;
        //车牌验证
        if (car.licenseNo) {
            if (!compCheck.isVehicleNumber(car.licenseNo)) {
                Toast('车牌号输入有误');
                EventBus.$emit('GlobalLoadingTrigger', false);
                return;
            }
        }

        //车架验证(非机动车责任险不用验证)
        if (pageData.saleCode != 'GRMOBILE_MALL_SL005' && pageData.saleCode != 'GRMOBILE_MALL_SL082') {
            if (car.frameNo) {
                if (!compCheck.isVehicleFrame(car.frameNo)) {
                    Toast('车架号输入有误');
                    EventBus.$emit('GlobalLoadingTrigger', false);
                    return;
                }
            }
        }
        if (pageData.saleCode == 'GRMOBILE_MALL_SL082') {
            if (!car.frameNo) {
                Toast('请输入车架号');
                EventBus.$emit('GlobalLoadingTrigger', false);
                return;
            }
            if (!compCheck.isElectricVehicleFrame(car.frameNo)) {
                Toast('车架号输入有误');
                EventBus.$emit('GlobalLoadingTrigger', false);
                return;
            }
        } else {
            // 车牌、车架都必填
            if (car.isNewCar == 'Y') {
                if (!car.licenseNo) {
                    Toast('请输入车牌号');
                    EventBus.$emit('GlobalLoadingTrigger', false);
                    return;
                }
                if (!car.frameNo) {
                    Toast('请输入车架号');
                    EventBus.$emit('GlobalLoadingTrigger', false);
                    return;
                }
            } else {
                // 车牌号或车架号必填一项
                if (!car.frameNo && !car.licenseNo) {
                    Toast('车牌号或车架号必填一项');
                    EventBus.$emit('GlobalLoadingTrigger', false);
                    return;
                }
            }
        }
        // 车辆其它页面验证
        for (let item of pageData.tagsList[0].struct) {
            if (item.isNeed == 'Y' && item.code == "seatCount" && !pageData.tagsList[0].data.seatCount || item.isNeed == 'Y' && item.code == "isNewCar" && !pageData.tagsList[0].data.isNewCar) {
                Toast(item.holder);
                EventBus.$emit('GlobalLoadingTrigger', false);
                return;
            }
        }
    }
    //摩托车驾乘人员人身意外伤害保险 87
    if (pageData.saleCode == 'GRMOBILE_MALL_SL087') {
        let car = pageData.tagsList[0].data;
        if (!car.licenseNo) {
            Toast('请输入车牌号');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return;
        }
        //车牌验证
        if (car.licenseNo) {
            if (!compCheck.isVehicleNumber(car.licenseNo)) {
                Toast('车牌号输入有误');
                EventBus.$emit('GlobalLoadingTrigger', false);
                return;
            }
        }
        if (!car.frameNo) {
            Toast('请输入车架号');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return;
        }
        //车架验证
        if (car.frameNo) {
            if (!compCheck.isElectricVehicleFrame(car.frameNo)) {
                Toast('车架号输入有误');
                EventBus.$emit('GlobalLoadingTrigger', false);
                return;
            }
        }
        // 车辆其它页面验证
        for (let item of pageData.tagsList[0].struct) {
            if (item.isNeed == 'Y' && item.code == "seatCount" && !pageData.tagsList[0].data.seatCount || item.isNeed == 'Y' && item.code == "isNewCar" && !pageData.tagsList[0].data.isNewCar) {
                Toast(item.holder);
                EventBus.$emit('GlobalLoadingTrigger', false);
                return;
            }
        }
    }

    var insuredInfoList = []; //被保人结构数据
    if (pageData.saleCode == 'GRMOBILE_MALL_SL006' || pageData.saleCode == 'GRMOBILE_MALL_SL007' || pageData.saleCode == 'GRMOBILE_MALL_SL012' || pageData.saleCode == 'GRMOBILE_MALL_SL023' || pageData.saleCode == 'GRMOBILE_MALL_SL027' || pageData.saleCode == 'GRMOBILE_MALL_SL028' || pageData.saleCode == 'GRMOBILE_MALL_SL042' || pageData.saleCode == 'GRMOBILE_MALL_SL060' || pageData.saleCode == 'GRMOBILE_MALL_SL061' || pageData.saleCode == 'GRMOBILE_MALL_SL064' || pageData.saleCode == 'GRMOBILE_MALL_SL065' || pageData.saleCode == 'RBTMOBILE_MALL_RBT0019') {
        if (pageData.insuredData && pageData.insuredData.length) {
            insuredInfoList = pageData.insuredData.map((item, index) => {
                EventBus.$emit('GlobalLoadingTrigger', false);
                return item = item.data
            });
        } else {
            Toast('请选择或输入被保人信息');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return;
        }
    } else {
        insuredInfoList = pageData.insuredInfo.map((item, index) => {
            EventBus.$emit('GlobalLoadingTrigger', false);
            return item = item.data
        });
    }
    // 被保人添加 生日、性别
    //物流险不需要走这里（物流险没有性别） 任易驾·驾乘人员意外险GRMOBILE_MALL_SL041 GRMOBILE_MALL_SL044 GRMOBILE_MALL_SL045 GRMOBILE_MALL_SL046 GRMOBILE_MALL_SL077
    if (pageData.saleCode != 'GRMOBILE_MALL_SL026' || pageData.saleCode != 'GRMOBILE_MALL_SL041' || pageData.saleCode != 'GRMOBILE_MALL_SL044' || pageData.saleCode != 'GRMOBILE_MALL_SL045' || pageData.saleCode != 'GRMOBILE_MALL_SL046' || pageData.saleCode != 'GRMOBILE_MALL_SL077') {
        for (let item of insuredInfoList) {
            if (item.idType == "0") { //判断被保人选择证件类型是身份证才验证以下逻辑
                var newTiem = new Date()
                var nowYear = newTiem.getFullYear(); // 当前年
                var insurYear = item.idNo.slice(6, 10)
                var insurNewAge = nowYear - insurYear
                item.age = insurNewAge
                if (item.idNo != '' && compCheck.isIdno(item.idNo)) {
                    item.birthday = compCheck.idNoChangeBirthday(item.idNo);
                    item.sex = compCheck.idNoChangeSex(item.idNo);
                }
            }

        }
    }

    // 身份证重复、性别验证
    if (!repeatIdNo() || !isSex()) {
        EventBus.$emit('GlobalLoadingTrigger', false);
        return;
    }
    //判断i任康孕妇险，i康保-女性保障计划必须是女性
    if (pageData.saleCode == 'GRMOBILE_MALL_SL018' || pageData.saleCode == 'GRMOBILE_MALL_SL019') {
        if (pageData.insuredInfo[0].data.sex == '0') {
            Toast('被保人必须是女性！');
            return;
        }
    }
    //处理百万医疗家庭版GRMOBILE_MALL_SL027 GRMOBILE_MALL_SL064国任·家庭组合保险 山东的个人意外险65 被保人必须选择2个或者2个以上
    if (pageData.saleCode == 'GRMOBILE_MALL_SL027' || pageData.saleCode == 'GRMOBILE_MALL_SL064' || pageData.saleCode == 'GRMOBILE_MALL_SL065') {
        if (insuredInfoList.length < 2) {
            Toast('被保人必须是要2位或者2位以上！');
            return
        }
    }
    //处理家财无忧·百万安心险 GRMOBILE_MALL_SL025  家财无忧·百万安心险（辽宁） GRMOBILE_MALL_SL039 i国任-燃气意外险GRMOBILE_MALL_SL028 房屋登记信息必填验证
    if (pageData.saleCode == 'GRMOBILE_MALL_SL025' || pageData.saleCode == 'GRMOBILE_MALL_SL039' || pageData.saleCode == 'GRMOBILE_MALL_SL028' || pageData.saleCode == 'GRMOBILE_MALL_SL079' || pageData.saleCode == 'GRMOBILE_MALL_SL084') {
        for (let item of pageData.tagsList[0].struct) {
            if (item.isNeed == 'Y' && item.code == "regionPath") {
                if (pageData.tagsList[0].data.regionPath == '') {//判断房屋地址省市区选择
                    Toast(item.holder);
                    return
                }

            }
            if (item.isNeed == 'Y' && item.code == "addressNo") {
                if (pageData.tagsList[0].data.addressNo == '') {//判断房屋地址是否为空
                    Toast('请输入房屋地址，请务必精确至门牌号');
                    return
                }

            }
        }
    }
    // 国任·家庭组合保险  房屋、车辆验证
    if (pageData.saleCode == 'GRMOBILE_MALL_SL064') {
        for (let item of pageData.tagsList) {
            console.log('item', item);
            if (item.risk == '0303') {
                if (!item.data.regionPath) {//判断房屋地址省市区选择
                    Toast('选择所在地区');
                    EventBus.$emit('GlobalLoadingTrigger', false);
                    return
                }
                if (!item.data.addressNo) {//判断房屋地址是否为空
                    Toast('请输入房屋地址，请务必精确至门牌号');
                    EventBus.$emit('GlobalLoadingTrigger', false);
                    return
                }
            } else if (item.risk == '2746') {
                // 车牌号或车架号必填一项
                if (!item.data.frameNo && !item.data.licenseNo) {
                    Toast('车牌号或车架号必填一项');
                    EventBus.$emit('GlobalLoadingTrigger', false);
                    return;
                }
            }
        }
    }
    //宠物险标的信息验证GRMOBILE_MALL_SL073
    if (pageData.saleCode == 'GRMOBILE_MALL_SL073') {
        if (!pageData.tagsList[0].data.customer_name) {
            Toast('请输入宠物昵称');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return;
        }
        if (!pageData.tagsList[0].data.business_detail) {
            Toast('请选择宠物大小');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return;
        }
        if (!pageData.tagsList[0].data.carevaluation_date) {
            Toast('请选择宠物出生日期');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return;
        }
        if (!pageData.tagsList[0].data.plate_number) {
            Toast('请选择宠物性别');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return;
        }
    }
    //处理工程险标的信息验证GRMOBILE_MALL_SL042
    if (pageData.saleCode == 'GRMOBILE_MALL_SL042') {
        // 标的其它页面验证
        if (!pageData.tagsList[0].data.engineer_name) {
            Toast('请输入工程名称');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return;
        }
        if (!pageData.tagsList[0].data.engineer_cost) {
            Toast('请输入工程造价');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return;
        }
        if (!pageData.tagsList[0].data.engineer_address) {
            Toast('请输为保障您的权益，请精确填写入详细地址');
            EventBus.$emit('GlobalLoadingTrigger', false);
            return;
        }
    }
    //行李险标的校验GRMOBILE_MALL_SL076（车加意产品）
    if (pageData.saleCode == 'GRMOBILE_MALL_SL076') {
        // 车辆其它页面验证
        let car = pageData.tagsList[0].data;
        for (let item of pageData.tagsList[0].struct) {
            if (item.isNeed == 'Y' && !car[item.code] && item.isNeed) {
                Toast(item.holder);
                EventBus.$emit('GlobalLoadingTrigger', false);
                return;
            }
        }
    }

    if (!isLoading) {
        return false;
    }
    isLoading = false;

    // 添加自助下单参数验证
    let agentCode = util.getSessionStorageObj("showProductDetail_agentCode");
    let thirdUserId = util.getSessionStorageObj("showProductDetail_userId");
    let shiftList = util.getSessionStorageObj("shiftList");
    let wxUserList = JSON.parse(localStorage.getItem('wxUserList')) || {}; //获取当前用户微信信息名称和头像
    let InterfaceUrl = API.API_INSURE_INPUT_SAVE;
    let transcribePhone = util.getLocalStorageObj("transcribePhone")
    let transcribeName = util.getLocalStorageObj("transcribeName")

    if (objPage == "showProductDetail") {
        InterfaceUrl = API.API_INSURE_INPUT_NEWSAVE;
        // if (!agentCode) {
        //     Toast('agentCode为空,不能下单');
        //     EventBus.$emit('GlobalLoadingTrigger', false);
        //     return;
        // } else if (!thirdUserId) {
        //     Toast('thirdUserId为空,不能下单');
        //     EventBus.$emit('GlobalLoadingTrigger', false);
        //     return;
        // } else if (!sessionStorage.openId) {
        //     Toast('openId为空,不能下单');
        //     EventBus.$emit('GlobalLoadingTrigger', false);
        //     return;
        // }
    }


    var saveObj = {};
    saveObj.orderNo = util.getSessionStorageObj('orderNo'); //订单号
    saveObj.renewNo = pageData.renewNo; // 保单号
    saveObj.appntInfo = pageData.appntInfo.data; //投保人
    saveObj.sameOneFlag = pageData.sameOneFlag; //是否投保人本人
    saveObj.isMultivariant = pageData.baseInfo.isMultivariant || null; //是否多方案
    saveObj.sumPrem = util.getSessionStorageObj('sumPrem');
    saveObj.insuredInfo = insuredInfoList; //被保人
    saveObj.carInfo = pageData.carInfo || null //车辆信息
    saveObj.houseInfo = pageData.houseInfo || null; //房屋信息
    saveObj.accountInfo = pageData.accountInfo || null; //账户
    saveObj.recntInfo = pageData.recntInfo.data || null; //账户
    saveObj.saleCode = pageData.saleCode; //销售计划code
    saveObj.startDate = util.getSessionStorageObj('startDate') || null;

    saveObj.setMealCode = util.getSessionStorageObj('setMealCode'); //套餐选项
    saveObj.insuYearUnit = util.getSessionStorageObj('insuYearUnit'); //保险期间
    saveObj.salePlanInfo = util.getSessionStorageObj('salePlanInfo'); //销售计划大对象
    if(util.getSessionStorageObj('copies')){
        saveObj.salePlanInfo.data.mult = util.getSessionStorageObj('copies')
    }
    saveObj.salePlanInfo.data.insureNum = saveObj.insuredInfo.length; // 被保人数
    saveObj.bnfType = pageData.bnfType; //受益人类型
    saveObj.bnfInfoList = pageData.bnfInfo.dataArray; //受益人列表
    saveObj.saleCode = pageData.saleCode; //销售code
    saveObj.saleName = pageData.saleName; //销售计划名称
    saveObj.riskInfo = {};
    saveObj.riskInfo.mainRiskList = util.getSessionStorageObj('readyMainRiskList');
    saveObj.riskInfo.addRiskList = util.getSessionStorageObj('readyAddRiskList');
    saveObj.tagsList = pageData.tagsList;
    saveObj.type = sessionStorage.getItem('type');
    saveObj.system = sessionStorage.getItem('system');
    saveObj.traceNo = window.GluttonContext.traceNo;
    saveObj.editType = pageData.renewNo ? 'RENEWAL' : 'NEW';  //  //续保标识 NEW-新保 RENEWAL-续保

    if (util.getLocalStorageObj("sysAgentExpandDTO")) {
        saveObj.sysAgentExpandDTO = util.getLocalStorageObj("sysAgentExpandDTO")
    } else {
        saveObj.sysAgentExpandDTO = store.state.my.newBusiness
    }



    console.log(saveObj.sysAgentExpandDTO, "340102199803075952");

    // 添加自助下单参数
    saveObj.agentCode = agentCode;
    saveObj.thirdUserId = thirdUserId;
    saveObj.thirdOpenId = sessionStorage.openId || store.state.common.wxOpenid || '';
    saveObj.openId = sessionStorage.openId || store.state.common.wxOpenid || '';
    saveObj.nickName = wxUserList.nickname || ''; //微信名称
    saveObj.profilePhoto = wxUserList.headimgurl || ''; //微信头像
    //转录分享下单需要的参数
    if (shiftList) {
        // saveObj.transcribePhone = shiftList.transcribePhone || '';
        // saveObj.transcribeName = shiftList.transcribeName || '';
        saveObj.businessType = shiftList.businessType || '';
        saveObj.agreementNo = shiftList.agreementNo || '';
        saveObj.orderArea = shiftList.orderArea || '';
        saveObj.medicalOrgName = shiftList.medicalOrgName || '';
        saveObj.agencyName = shiftList.agencyName || '';
    }
    // 微店出单
    if (channelType) {
        saveObj.channelType = channelType || ''
        saveObj.nickName = nickName || ''
        saveObj.msId = msId || ''
    }

    if (insuredDataName) {
        for (var i = 0; i < insuredDataName.length; i++) {
            saveObj.insuredInfo.push(insuredDataName[i])
        }
    }
    if (transcribePhone) {
        saveObj.transcribePhone = transcribePhone
        if (transcribeName) {
            saveObj.transcribeName = transcribeName
        }
    }


    // 处理物流安全责任险-客户类型
    if (saveObj.saleCode == 'GRMOBILE_MALL_SL014' && saveObj.appntInfo.cls == '1') {
        saveObj.appntInfo.idType = "9";
    }

    let sign = MD5(JSON.stringify(saveObj) + 'grqazwsx').toString();
    const res = await axios({
        url: `${InterfaceUrl}?sign=${sign}`,
        method: 'post',
        data: saveObj
    });
    // 回溯功能
    window.GluttonContext.policyHolderName = saveObj.saleCode != "GRMOBILE_MALL_SL041" ? saveObj.appntInfo.name : saveObj.insuredInfo[0].enterprise // 投保人姓名
    window.GluttonContext.policyHolderIdNo = saveObj.saleCode != "GRMOBILE_MALL_SL041" ? saveObj.appntInfo.idNo : saveObj.insuredInfo[0].uscCode // 投保人证件号码
    window.GluttonContext.policyHolderName = saveObj.saleCode != "GRMOBILE_MALL_SL044" ? saveObj.appntInfo.name : saveObj.insuredInfo[0].enterprise // 投保人姓名
    window.GluttonContext.policyHolderIdNo = saveObj.saleCode != "GRMOBILE_MALL_SL044" ? saveObj.appntInfo.idNo : saveObj.insuredInfo[0].uscCode // 投保人证件号码
    window.GluttonContext.policyHolderName = saveObj.saleCode != "GRMOBILE_MALL_SL045" ? saveObj.appntInfo.name : saveObj.insuredInfo[0].enterprise // 投保人姓名
    window.GluttonContext.policyHolderIdNo = saveObj.saleCode != "GRMOBILE_MALL_SL045" ? saveObj.appntInfo.idNo : saveObj.insuredInfo[0].uscCode // 投保人证件号码
    window.GluttonContext.policyHolderName = saveObj.saleCode != "GRMOBILE_MALL_SL046" ? saveObj.appntInfo.name : saveObj.insuredInfo[0].enterprise // 投保人姓名
    window.GluttonContext.policyHolderIdNo = saveObj.saleCode != "GRMOBILE_MALL_SL046" ? saveObj.appntInfo.idNo : saveObj.insuredInfo[0].uscCode // 投保人证件号码
    window.GluttonContext.policyHolderName = saveObj.saleCode != "GRMOBILE_MALL_SL026" ? saveObj.appntInfo.name : saveObj.insuredInfo[0].enterprise // 投保人姓名
    window.GluttonContext.policyHolderIdNo = saveObj.saleCode != "GRMOBILE_MALL_SL026" ? saveObj.appntInfo.idNo : saveObj.insuredInfo[0].uscCode // 投保人证件号码
    window.GluttonContext.policyHolderName = saveObj.saleCode != "GRMOBILE_MALL_SL077" ? saveObj.appntInfo.name : saveObj.insuredInfo[0].enterprise // 投保人姓名
    window.GluttonContext.policyHolderIdNo = saveObj.saleCode != "GRMOBILE_MALL_SL077" ? saveObj.appntInfo.idNo : saveObj.insuredInfo[0].uscCode // 投保人证件号码
    window.GluttonContext.policyHolderMobile = saveObj.appntInfo.mobile // 投保人手机号
    window.GluttonContext.orderNo = res.content.insOrderNo || '' // 订单号

    // if(res.code == 0 && res.content.result == 0){
    //     //计算佣金接口
    //     const res2 = await axios({
    //         url: API.API_TRYCAJLCOMMISSION,
    //         method: 'get',
    //         loading: 'false',
    //         params: {
    //           agentCode:localStorage.getItem('agentCode'),
    //           productCode:saveObj.saleCode,
    //           preium:saveObj.sumPrem,
    //           planCode:util.getSessionStorageObj('setMealCode') || 'A',//套餐选项
    //           orderNo:res.content.insOrderNo || '', // 订单号
    //           editType: pageData.renewNo ? 'RENEWAL' : 'NEW'  //  //续保标识 NEW-新保 RENEWAL-续保
    //         }
    //       });
    //         if(res2.code == 0 && res2.content.result == 0){
    //             if (objPage == "productDetail") {
    //                 if(shiftList ? !shiftList.medicalOrgName : true){
    //                     if(store.state.my.UserInfo.agentType != '0'){
    //                         //控制河北专员身份不显示佣金提示
    //                         if(res2.content.commission>0 && (store.state.my.UserInfo.OrgCode.substring(0,2) == '15' ? store.state.my.UserInfo.agentType != '1' : true)){
    //                             Dialog.alert({
    //                             message: '完成此笔订单可获得' + res2.content.commission  + 'i钻(不含税)，实际以到账金额为准',
    //                             theme: 'round-button',
    //                             cancelButtonColor: 'linear-gradient(to right, rgb(36, 92, 246)',
    //                             confirmButtonColor: '#0252ff'
    //                             });
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    // }
    EventBus.$emit('GlobalLoadingTrigger', false);
    isLoading = true;
    if (objPage == "productDetail") {
        if (res.code === 0 && res.content.result === '0') {
            console.log(11111111111111111111111111111);
            util.setSessionStorageObj("payUrl", res.content.payUrl);
            util.setSessionStorageObj("orderNo", res.content.insOrderNo);
            let pageData = util.getSessionStorageObj('insureInfo');
            if (pageData.baseInfo.uploadFilesFlag == 'Y') { //处理需要上传图片的非车产品
                if (saveObj.saleCode == 'GRMOBILE_MALL_SL032') {//玻璃险上传图片
                    router.push("productUpload?warrantyNumber=" + res.content.prtNo + '&orderNo=' + res.content.insOrderNo + "&objPage=" + objPage);
                } else if (saveObj.saleCode == 'GRMOBILE_MALL_SL073') {//宠物险上传图片GRMOBILE_MALL_SL073
                    router.push("moreUpload?warrantyNumber=" + res.content.prtNo + '&orderNo=' + res.content.insOrderNo + "&objPage=" + objPage);
                }
            } else {
                glutton.stopRecording()
                setTimeout(() => {
                    router.push(`confirmInsured?orderNo=${res.content.insOrderNo}`);
                }, 1000);
            }

        } else if (res.code === 0 && res.content.result == '1' && res.content.insOrderNo) {
            Toast(res.content.resultMessage);
            setTimeout(() => {
                router.push("orderList");
            }, 2500);
        } else {
            Toast(res.content.resultMessage || res.message);
        }
    } else {
        // 自助下单获取 PayUrl
        if (res.code === 0 && res.content.result === '0') {
            const payUrl = await axios({
                url: API.API_INSURE_INPUT_GETPAYURL,
                method: 'get',
                params: {
                    'insuranceOrderNo': res.content.insOrderNo
                }
            });
            glutton.stopRecording(); // 回溯录制
            let pageData = util.getSessionStorageObj('insureInfo');
            if (pageData.baseInfo.uploadFilesFlag == 'Y') { //处理需要上传图片的非车产品
                if (saveObj.saleCode == 'GRMOBILE_MALL_SL032') {//玻璃险上传图片
                    router.push("productUpload?warrantyNumber=" + res.content.prtNo + '&orderNo=' + res.content.insOrderNo + "&objPage=" + objPage);
                } else if (saveObj.saleCode == 'GRMOBILE_MALL_SL073') {//宠物险上传图片GRMOBILE_MALL_SL073
                    router.push("moreUpload?warrantyNumber=" + res.content.prtNo + '&orderNo=' + res.content.insOrderNo + "&objPage=" + objPage);
                }
            } else if (res.content.insOrderNo) {
                router.push("wxOrderDetail?orderNo=" + res.content.insOrderNo);
            }
            // window.location.href = payUrl.content.payUrl;
        } else if (res.code === 0 && res.content.result == '1' && res.content.insOrderNo) {
            Toast("核保失败！");
        } else {
            Toast(res.content.resultMessage || res.message);
        }

    }

};


// 投保人验证
const verifyAppntInfo = (appntData, element) => {
    console.log("appntData", appntData);
    if (appntData && element) {
        let queryList = util.getSessionStorageObj('queryList');
        if (element == 'name') { //姓名
            console.log(queryList,'12222222222222');
            if(queryList.codeCode || queryList.transcribePhone){
                return compCheck.isName2(appntData[element], '请输入投保人正确的姓名格式123！');
            }else{
                return compCheck.isName(appntData[element], '请输入投保人正确的姓名格式rrr！');
            }
            
        } else if (element == 'idNo') { //证件号码 身份证  //如果选择是身份证类型
            if (appntData['idType'] == '0' || appntData['idType'] == '12') {
                return compCheck.isIdno(appntData[element], '请输入投保人正确的身份证格式！');
            } else {
                return true;
            }
        } else if (element == 'mobile') { //手机
            if(queryList.codeCode || queryList.transcribePhone){
                return compCheck.isMobile2(appntData[element], '请输入投保人正确的手机号！');
            }else{
                return compCheck.isMobile(appntData[element], '请输入投保人正确的手机号！');
            }
           
        } else if (element == 'email') { //邮箱
            return compCheck.isEmail(appntData[element], '请输入投保人正确的邮箱！');
        } else if (element == 'stature') { //身高
            return compCheck.isPlus(appntData[element], '请输入投保人正确的身高（cm）！');
        } else if (element == 'addressNo') { //地址
            return compCheck.isAddress(appntData[element], '投保人通讯地址长度不能少于5个汉字,或特殊字符！');
        } else if (element == 'companyName') { //单位名称
            return compCheck.isCompanyName(appntData[element], '投保人单位名称长度不能少于8个汉字,或特殊字符！');
        } else if (element == 'avoirdupois') { //体重
            return compCheck.isPlus(appntData[element], '请输入投保人正确的体重（kg）！');
        } else if (element == 'zip') { //邮政编码
            return compCheck.isCheckZip(appntData[element], '请输入投保人正确的邮政编码！');
        }
    }
    return true;
};

// 被保人验证
const verifyInsuredInfo = (insuredData, element) => {
    if (insuredData && element) {
        let queryList = util.getSessionStorageObj('queryList');
        if (element == 'name') { //姓名
            if(queryList.codeCode || queryList.transcribePhone){
                return compCheck.isName2(insuredData[element], '请输入被保人正确的姓名格式！');
            }else{
                return compCheck.isName(insuredData[element], '请输入被保人正确的姓名格式！');
            }
          
        } else if (element == 'idNo') { //证件号码 身份证  //如果选择是身份证类型
            if (insuredData['idType'] == '0' || insuredData['idType'] == '12') {
                return compCheck.isIdno(insuredData[element], '请输入被保人正确的身份证格式！');
            } else {
                return true;
            }
        } else if (element == 'mobile') { //手机
            if(queryList.codeCode || queryList.transcribePhone){
                return compCheck.isMobile2(insuredData[element], '请输入被保人正确的手机号！');
            }else{
                return compCheck.isMobile(insuredData[element], '请输入被保人正确的手机号！');
            }
            
        } else if (element == 'email') { //邮箱
            return compCheck.isEmail(insuredData[element], '请输入被保人正确的邮箱！');
        } else if (element == 'stature') { //身高
            return compCheck.isPlus(insuredData[element], '请输入被保人正确的身高（cm）！');
        } else if (element == 'addressNo') { //地址
            return compCheck.isAddress(insuredData[element], '被保人通讯地址长度不能少于5个汉字,或特殊字符！');
        } else if (element == 'companyName') { //单位名称
            return compCheck.isCompanyName(insuredData[element], '被保人单位名称长度不能少于8个汉字,或特殊字符！');
        } else if (element == 'avoirdupois') { //体重
            return compCheck.isPlus(insuredData[element], '请输入被保人正确的体重（kg）！');
        } else if (element == 'zip') { //邮政编码
            return compCheck.isCheckZip(insuredData[element], '请输入被保人正确的邮政编码！');
        }
    }
    return true;
};


// 判断是否使用重复身份证
const repeatIdNo = () => {
    let pageData = util.getSessionStorageObj('insureInfo');
    let appntInfo = pageData.appntInfo;
    let insuredInfo = pageData.insuredInfo;
    if (insuredInfo[0].data.idNo == appntInfo.data.idNo && appntInfo.data.idNo && insuredInfo[0].data.relationToAppnt != "00") {
        Toast('身份证号已使用，不能重复！');
        return false;
    }
    return true;
}

// 投保人、被保人配偶时性别不能相同
const isSex = (data) => {
    let pageData = data || util.getSessionStorageObj('insureInfo');
    let appntInfo = pageData.appntInfo;
    let insuredData = pageData.insuredData || [];
    let insuredInfo = pageData.insuredInfo || [];
    let arr = insuredData.concat(insuredInfo);
    let appntInfoSex = appntInfo.data.sex;
    if (appntInfo.data.idType == "0" && appntInfo.data.idNo) {
        appntInfoSex = compCheck.idNoChangeSex(appntInfo.data.idNo);
    }
    for (let item of arr) {
        if (item.data.relationToAppnt == "05") {
            let sex = item.data.sex;
            if (item.data.idType == "0" && item.data.idNo) {
                sex = compCheck.idNoChangeSex(item.data.idNo);
                console.log(sex)
            }
            if(appntInfoSex){
                if (sex === appntInfoSex) {
                    Toast('被保人配偶关系性别不匹配！');
                    return false;
                }
            }
           
        }
    }
    return true;
}

// 更新被保人为本人的信息
const updateSelf = (data) => {
    let pageData = data || util.getSessionStorageObj('insureInfo');
    let appntInfo = pageData.appntInfo;
    let insuredData = pageData.insuredData || [];
    let insuredInfo = pageData.insuredInfo || [];
    for (let item of insuredData) {
        if (item.data.relationToAppnt == "00") {
            item.data.name = appntInfo.data.name;
            item.data.idNo = appntInfo.data.idNo;
            item.data.idType = appntInfo.data.idType;
            item.data.mobile = appntInfo.data.mobile;
            item.data.age = appntInfo.data.age;
            item.data.sex = appntInfo.data.sex;
            item.data.birthday = appntInfo.data.birthday;
            item.data.cls = appntInfo.data.cls;
        }
    }
    for (let item of insuredInfo) {
        if (item.data.relationToAppnt == "00") {
            //处理带出物流险企业名称 安装工程险企业名称
            if (pageData.saleCode == 'GRMOBILE_MALL_SL026' || pageData.saleCode == 'GRMOBILE_MALL_SL042') {
                item.data.enterprise = appntInfo.data.enterprise;
            } else {
                item.data.name = appntInfo.data.name;
            }
            item.data.idNo = appntInfo.data.idNo;
            item.data.idType = appntInfo.data.idType;
            item.data.mobile = appntInfo.data.mobile;
            item.data.age = appntInfo.data.age;
            item.data.sex = appntInfo.data.sex;
            item.data.birthday = appntInfo.data.birthday;
            item.data.cls = appntInfo.data.cls;
        }
    }
    util.setSessionStorageObj('insureInfo', pageData);
}

// 清除产品缓存
const clearProductStorage = () => {
    util.removeSessionStorageObj("mainRiskList");
    util.removeSessionStorageObj("addRiskList");
    util.removeSessionStorageObj("riskPlanList");
    util.removeSessionStorageObj("dutyList");
    util.removeSessionStorageObj("mult");
    util.removeSessionStorageObj("planCode");
    util.removeSessionStorageObj("amt");
    util.removeSessionStorageObj("agreeButton");
    util.removeSessionStorageObj("isAgree");
    util.removeSessionStorageObj("orderNo");
    util.removeSessionStorageObj("appntInfo");
    util.removeSessionStorageObj("sameOneFlag");
    util.removeSessionStorageObj("sumPrem");
    util.removeSessionStorageObj("insuredInfo");
    util.removeSessionStorageObj("carInfo");
    util.removeSessionStorageObj("houseInfo");
    util.removeSessionStorageObj("accountInfo");
    util.removeSessionStorageObj("recntInfo");
    util.removeSessionStorageObj("saleCode");
    util.removeSessionStorageObj("setMealCode");
    util.removeSessionStorageObj("insuYearUnit");
    util.removeSessionStorageObj("salePlanInfo");
    util.removeSessionStorageObj("bnfType");
    util.removeSessionStorageObj("bnfInfoList");
    util.removeSessionStorageObj("readyMainRiskList");
    util.removeSessionStorageObj("readyAddRiskList");
    util.removeSessionStorageObj("tagsList");
    util.removeSessionStorageObj("type");
    util.removeSessionStorageObj("system");

    util.removeSessionStorageObj("trialObj");
    util.removeSessionStorageObj("productDetailScrollTop");
    util.removeSessionStorageObj("productDetail");
    util.removeSessionStorageObj("insureInfo");
    util.removeSessionStorageObj("schemeActive");
    util.removeSessionStorageObj("startDate");
    util.removeSessionStorageObj("valueListIndex");
    util.removeSessionStorageObj("valueListSign");
    util.removeSessionStorageObj("shiftList");
    util.removeSessionStorageObj("insuredDataName");
    util.removeSessionStorageObj("copies");
}

export default {
    goConfirm,
    verifyAppntInfo,
    verifyInsuredInfo,
    repeatIdNo,
    isSex,
    updateSelf,
    clearProductStorage
};
