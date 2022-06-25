import axios from 'axios'
import API from './../../../api'
import { router } from './../../../router'
import { Toast, Dialog } from 'vant'
import MD5 from 'js-md5';
import common from '../../../assets/js/util/common';
import compCheck from '../../../assets/js/util/comp-check';
import configJs from '../../../config.js';
import area from '../../../assets/json/area';
import glutton from '../../../assets/js/util/glutton'

const actions = {
  /**
   * 特约列表
   */
  async getClauses(context) {
    const res = await axios({
      url: API.API_CLAUSES,
      method: 'post',
      data: {
        agentCode: localStorage.handlerCode,
        orderNo: context.state.orderNo
      }
    });
    if (res.code == 0 && res.content.result == '0') {
      // 交强险 ciPrptenagesDTOList   商业险 biPrptenagesDTOList
      context.commit('updataPrptenagesDTOList', {
        ciPrptenagesDTOList: res.content.ciPrptenagesDTOList.map(item => { item.checkbox = false; item.checked = false; return item }),
        biPrptenagesDTOList: res.content.biPrptenagesDTOList.map(item => { item.checkbox = false; item.checked = false; return item })
      });
    } else {
      Toast(res.content.resultMessage);
    }
    return res
  },
  /**
   * 车型搜索
   */
  async getCarType({ dispatch }, params) {
    if (!localStorage.agentCode && localStorage.token) {
      await dispatch('my/getUserInfo', {}, { root: true })
    }
    let data = params
    data.userCode = localStorage.agentCode
    const res = await axios({
      url: API.API_CARTYPE,
      method: 'post',
      loading: params.codeType == 'PrpdunitMain' ? 'false' : 'true',
      data
    });
    return res;
  },
  /**
   * 进口车查询
   */
  async getCarVIN(context, data) {
    const res = await axios({
      url: API.API_GETCARVIN,
      method: 'post',
      data
    });
    return res;
  },
  /**
   * 车险核保
   */
  async submitUnderWriting({ dispatch, commit, state }, params) {
    // 回溯传参
    window.GluttonContext.policyHolderName = state.applyInfoDTO.name // 投保人姓名
    window.GluttonContext.policyHolderIdNo = state.applyInfoDTO.idNo // 投保人证件号码
    window.GluttonContext.policyHolderMobile = state.applyInfoDTO.mobile // 投保人手机号
    window.GluttonContext.orderNo = state.orderNo || '' // 订单号

    const res = await axios({
      url: API.API_SUBMITUNDERWRITING,
      method: 'post',
      data: {
        orderNo: params.orderNo
      }
    });
    // underWriteFlag  0-核保失败  1-核保中 2核保成功
    let agentCode = localStorage.agentCode
    Toast(res.content.resultMessage || (res.content.underWriteFlag == '1' ? '核保中' : res.content.underWriteFlag == '2' ? '核保成功' : '核保失败'));
    if (res.code == 0 && res.content.underWriteFlag == '2' && agentCode != 'S0900335') {
      //判断车险是否分享出单
      if (params.share) {
        dispatch('getOrderDetail')
      } else {
        setTimeout(() => { router.push({ path: `/carConfirmInsured?orderNo=${state.orderNo}` }) }, 2000);
      }
    } else if (res.code == 0 && res.content.underWriteFlag == '1' && agentCode != 'S0900335') {
      setTimeout(() => { router.push({ path: '/account' }) }, 2000);
    }
    return res
  },
  //查询支付连接
  async getOrderDetail(dataList) {
    const res = await axios({
      url: API.API_GENERATEPAYMENTURL,
      method: 'post',
      data: {
        orderNo: dataList.state.orderNo,
        isWXPay: true
      }
    });
    if (res.code === 0) {
      if (res.content.payUrl) {
        window.location.href = res.content.payUrl;
      } else {
        this.$toast('获取支付链接失败');
      }
    } else {
      this.$toast(res.message);
    }

  },
  /**
   * 车价查询
   */
  async getCarPrice(context, params) {
    let carParams = context.state

    console.log(carParams, '3123123123123');
    console.log(params,'444444444444');
    // 起保时间
    let startDate
    if (carParams.VehicleInsurance.switchChecked1) {  // 商业险
      if (carParams.VehicleInsurance.bImmeValiFlag) {  // 及时起保
        startDate = compCheck.transformDatesDay(carParams.VehicleInsurance.bImmeValidEndDate.substring(0, 10), 1)
      } else {
        startDate = carParams.commercialInsuranceStartDate
      }
    } else {
      if (carParams.VehicleInsurance.cImmeValiFlag) {  // 及时起保
        startDate = compCheck.transformDatesDay(carParams.VehicleInsurance.cImmeValidEndDate.substring(0, 10), 1)
      } else {
        startDate = carParams.compulsoryInsuranceStartDate
      }
    }

    if (carParams.carPriceTime == startDate && params.page != "carBaseInfo") {
      return ""
    }
    // 保存车价起保时间
    context.commit('updataCarPriceTime', startDate);

    // 判断是否单个车价
    let data = JSON.parse(JSON.stringify(params.data))
    delete data.carPriceRequest;

    let type = params.url.split('/')[params.url.split('/').length - 1]
    if (type == 'getCarPrice') {
      data.startDate = startDate.substring(0, 10)
    } else {
      console.log('startDate', startDate);
      console.log('startDate', startDate);

      data.carPriceQueryRespVo.startDateBI = startDate.substring(0, 10)
    }
    // 保存车险报文
    let carPriceRequest = {
      url: params.url,
      request: data
    }
    data.carPriceRequest = JSON.stringify(carPriceRequest)

    const res = await axios({
      url: params.url,
      method: 'post',
      data: {
        ...data,
        editType: carParams.editType
      }
    });
    console.log(res,'sssssssssssssssssssss');
    if (res.code == 0 && res.content.result == '0') {
      context.commit('updataCarPriceRequest', { url: params.url, request: data });  // 保存试算信息
      context.commit('updataCarPrice', JSON.parse(res.content.data));
      return res
    } else {
      Toast(res.content.resultMessage || '车价查询失败');
    }
    return res
  },
  /**
   * 代理协议号
   */
  async getAgreement(context) {
    const res = await axios({
      url: API.API_AGREEMENT,
      method: 'get',
      params: {
        agentCode: localStorage.agentCode
      }
    });
    if (res.code == 0 && res.content.result == '0') {
      let data = JSON.parse(res.content.data)
      for (let item of data) {
        item.text = `${item.agreementNo}-${item.agentName}`
        item.value = item.agentCode
      }
      context.commit('updataAgreementList', data);
    }
  },
  /**
   * 车+意列表
   */
  async getNocarProductList({ rootState, commit, state }) {
    console.log("2222", rootState);
    if (state.accidentInsurance.list.length) {
      return false
    }
    const res = await axios({
      url: API.API_GETNOCARPRODUCTLIST,
      method: 'post',
      data: {
        manageCode: rootState.my.UserInfo && rootState.my.UserInfo.manageCode || '',
        vehicleType: state.vehicleType
      }
    });
    if (res.code == 0 && res.content.result == '0') {
      for (let item of res.content.accidentProductList) {
        item.salePlanInfoList = []
        item.price = ''
        item.checkbox = false
      }
      commit('updateCarState', [
        { name: ['accidentInsurance', 'list'], value: res.content.accidentProductList || '' },
      ])
    }
    return true
  },
  /**
   * 车+意详情
   */
  async getCaaProductDetail({ commit, state }, saleCode) {
    const res = await axios({
      url: API.API_CAA_PRODUCT_DETAIL,
      method: 'get',
      params: {
        saleCode,
        type: sessionStorage.getItem('type'),
        system: sessionStorage.getItem('system')
      }
    });
    if (res.code == 0 && res.content.result == '0') {
      state.accidentInsurance.list.forEach((item, index) => {
        if (saleCode == item.productCode) {
          commit('updateCarState', [
            { name: ['accidentInsurance', 'list', index, 'salePlanInfoList'], value: res.content.salePlanInfoList || '' },
            { name: ['accidentInsurance', 'list', index, 'insuYearUnit'], value: res.content.insuYearUnit || '' },
            { name: ['accidentInsurance', 'list', index, 'mult'], value: res.content.mult || '' },
            { name: ['accidentInsurance', 'list', index, 'notificationList'], value: res.content.notificationList || '' },
            { name: ['accidentInsurance', 'list', index, 'programmePremium'], value: res.content.programmePremium || '' },
            { name: ['accidentInsurance', 'list', index, 'copies'], value: res.content.copies || '' },
            { name: ['accidentInsurance', 'list', index, 'stepper'], value: state.accidentInsurance.list[index].stepper || 1 }
          ])
        }
      })
    }
  },
  /**
   * 佣金、福利券
   */
  async tryCalCommission(context, data) {
    const res = await axios({
      url: API.API_TRYCALCOMMISSION,
      method: 'post',
      data: data.data
    });
    if (res.code == 0 && res.content.result == '0') {
      //控制分享车险出单不显示佣金弹窗提示
      if (!data.userInfoData.sign) {
        if (data.userInfoData.agentType != '0') {
          //控制河北专员辽宁专员身份不显示佣金提示
          if ((res.content.sumIncomeAmount || res.content.sumIntegral) && (data.userInfoData.OrgCode.substring(0, 2) == '15' || data.userInfoData.OrgCode.substring(0, 2) == '12' ? data.userInfoData.agentType != '1' : true)) {
            glutton.stopRecording(); // 回溯录制
            Dialog.alert({
              message: '完成此笔订单可获取' + (res.content.sumIncomeAmount ? res.content.sumIncomeAmount + 'i钻' : '') + (res.content.sumIncomeAmount && res.content.sumIntegral ? '及' : '') + (res.content.sumIntegral ? res.content.sumIntegral + '服务券' : '') + '，实际以到账金额为准',
              theme: 'round-button',
              cancelButtonColor: 'linear-gradient(to right, rgb(36, 92, 246)',
              confirmButtonColor: '#0252ff'
            }).then(() => {
              glutton.startRecording(); // 回溯录制
            });
          }
        }
      }

    } else {
      Toast(res.content.resultMessage || 'i钻、福利券查询失败');
    }
  },
  /**
   * 上一次投保地区
   */
  async getLastInsureCity({ commit, state }, data) {
    if (!state.carInsureEntry.cityCode) {
      const res = await axios({
        url: API.API_GETLASTINSURECITY,
        method: 'get',
        loading: 'false',
        params: {
          agentCode: data.agentCode
        }
      });
      if (res.code == 0 && res.content.result == '0' && res.content.data.cityCode && res.content.data.cityName) {
        commit('updateCityCode', { code: res.content.data.cityCode, name: res.content.data.cityName });
      }
    }
  },
  /**
   * 确认是否试算、试算 params
   */
  goVerifyTrial(context) {
    let UserInfo = context.rootState.my.UserInfo
    let carParams = context.state
    let params = {
      // 车价
      "carPrice": carParams.vehicleType !== '2' ? carParams.carPrice.actualValue || '' : carParams.carTypeDTO.purchasePrice || '',
      // 车价uuid
      "carPriceUuid": carParams.carPrice && carParams.carPrice.inputvo ? carParams.carPrice.inputvo : "",
      "orderNo": carParams.orderNo,
      "agentCode": localStorage.agentCode,
      "editType": carParams.editType,
      // A("A","推荐套餐"), B("B","保障周全方案"), C("C","自定义方案");
      "productCode": carParams.VehicleInsurance.active == 0 ? 'A' : carParams.VehicleInsurance.active == 1 ? 'B' : carParams.VehicleInsurance.active == 2 ? 'C' : '',
      //商业险对象
      "commercialInsurance": {
        //商业险主信息
        "prpTmain": {
          //起保时间
          "startDate": carParams.commercialInsuranceStartDate.substring(0, 10),
          //终保时间
          "endDate": compCheck.transformDatesTimetamp(carParams.commercialInsuranceStartDate, 1, -1).substring(0, 10),
          //即时起保时间
          "immeValidStartDate": '',
          //即时终保时间
          "immeValidEndDate": '',
          //即时起保标识
          "immeValiFlag": carParams.VehicleInsurance.bImmeValiFlag ? "1" : "",
          //折扣标志
          "feeandDiscountFlag": "0",
          //期望折扣
          "expectDiscount": carParams.discountData.expectDiscount,
          //输入日期
          "inputDate": common.CurentDate(),
          //签单日期
          "signDate": common.CurentDate(),
          //起保小时
          "startHour": "00",
          //终保小时
          "endHour": "24",
          //转保验证码
          "answer": ""
        },
        //商业险车辆信息
        "prpTitemCar": {
          //商业险体系
          "termsSystem": "04",
          //条款体系
          "clauseType": "F54",
          "countryNature": carParams.carPrice.carCountryNature
        },
        //输入标志
        "inputRisk": 1,
        //保费计算标志
        "calculateFlagBI": "1",
        //理赔对象
        "ciInsureDemandPay": [],
        //风险警示信息对象
        "ciInsureDemandWarningClaim": [],
        //险种
        "prptitemkindList": [],
        //平台交互信息
        "ciInsureDemand": {
          //平台查询码
          "demandNo": ""
        },
        //续保对象
        "prpTrenewal": carParams.policyNo.b ? [{ "oldpolicyno": carParams.policyNo.b }] : [],
        //特别约定对象
        "prptengageList": [],
        //费率对象
        "prpTmainRate": {}
      },
      //交强险大对象
      "compulsoryInsurance": {
        "prptengageList": [],
        //交强险主信息
        "prpTmain": {
          "startDate": carParams.compulsoryInsuranceStartDate.substring(0, 10),
          "endDate": compCheck.transformDatesTimetamp(carParams.compulsoryInsuranceStartDate, 1, -1).substring(0, 10),
          "immeValidStartDate": '',
          "immeValidEndDate": '',
          "immeValiFlag": carParams.VehicleInsurance.cImmeValiFlag ? "1" : "",
          "inputDate": common.CurentDate(),
          "signDate": common.CurentDate(),
          "startHour": "00",
          "endHour": "24",
          "answer": ""
        },
        "prpTitemCar": {
          "clauseType": "F54",
          "countryNature": carParams.carPrice.carCountryNature
        },
        "ciInsureDemand": {
          "demandNo": ""
        },
        //车船税
        "prpTcarshipTax": {
          //完税凭证号
          "paidCertificate": ""
        },
        "prptitemkindList": [],
        "inputRisk": 1,
        "calculateFlagCI": "1",
        "prpTmainRate": {},
        "prpTrenewal": carParams.policyNo.c ? [{ "oldpolicyno": carParams.policyNo.c }] : []
      }
    }
    /**
     * 及时起保
     */
    // 商业险
    if (carParams.VehicleInsurance.bImmeValiFlag) {
      params.commercialInsurance.prpTmain.startDate = compCheck.transformDatesDay(carParams.VehicleInsurance.bImmeValidEndDate.substring(0, 10), 1)
      params.commercialInsurance.prpTmain.endDate = compCheck.transformDatesTimetamp(carParams.VehicleInsurance.bImmeValidEndDate, 1).substring(0, 10)
      params.commercialInsurance.prpTmain.immeValidStartDate = carParams.VehicleInsurance.bImmeValidEndDate.substring(0, 13) + ':00:00'
      params.commercialInsurance.prpTmain.immeValidEndDate = compCheck.transformDatesTimetamp(carParams.VehicleInsurance.bImmeValidEndDate, 1).substring(0, 10) + " 23:59:59"
      // params.commercialInsurance.prpTmain.startHour = carParams.VehicleInsurance.bImmeValidEndDate.substring(11, 13)
    }
    // 交强险
    if (carParams.VehicleInsurance.cImmeValiFlag) {
      params.compulsoryInsurance.prpTmain.startDate = compCheck.transformDatesDay(carParams.VehicleInsurance.cImmeValidEndDate.substring(0, 10), 1)
      params.compulsoryInsurance.prpTmain.endDate = compCheck.transformDatesTimetamp(carParams.VehicleInsurance.cImmeValidEndDate, 1).substring(0, 10)
      params.compulsoryInsurance.prpTmain.immeValidStartDate = carParams.VehicleInsurance.cImmeValidEndDate.substring(0, 13) + ':00:00'
      params.compulsoryInsurance.prpTmain.immeValidEndDate = compCheck.transformDatesTimetamp(carParams.VehicleInsurance.cImmeValidEndDate, 1).substring(0, 13) + ':00:00'
      // params.compulsoryInsurance.prpTmain.startHour = carParams.VehicleInsurance.cImmeValidEndDate.substring(11, 13)
      // params.compulsoryInsurance.prpTmain.endHour = carParams.VehicleInsurance.cImmeValidEndDate.substring(11, 13)
    }

    // 商业险险种
    let RiskPlan = JSON.parse(JSON.stringify(carParams.insuranceTypes));

    if (carParams.VehicleInsurance.switchChecked1) {
      for (let item of RiskPlan) {
        if (item.struct && !item.disabled && item.checked) {
          let it = {
            checked: 1, //选择标志
            kindCode: item.kindCode,  //险种代码
            kindName: item.kindName, //险种名称
            itemKindNo: item.itemKindNo, //序号
            startDate: params.commercialInsurance.prpTmain.startDate,
            endDate: params.commercialInsurance.prpTmain.endDate,
            isDeductible: 0, //不计免赔
            rate: 0, //费率
            modeCode: "",  //规格型号
            unitAmount: item.unitAmount || "", //单位保额
            amount: item.amount || 0, // 保额
            deductible: 0, // 免赔额
            quantity: item.quantity || "", //座位数/服务次数
            flag: item.flag, //标志字段
            mainKindFlag: item.mainKindFlag //主线标志
          }
          if (item.kindCode == '20A' || item.kindCode == '21A' && carParams.VehicleInsurance.active == 2) {
            it.deductible = item.struct.value.value || 0 //免赔额
          }
          // 保额
          if (item.kindCode == '20B' || item.kindCode == '21B' || item.kindCode == '20L' || item.kindCode == '20E2' ||
            item.kindCode == '20J' || item.kindCode == '20F' || item.kindCode == '21F1' || item.kindCode == '20R1' || item.kindCode == '20R2' ||
            item.kindCode == '20R3' || item.kindCode == '20Y' || item.kindCode == '20Y1' || item.kindCode == '20Y2' ||
            item.kindCode == '20D2'
          ) {
            it.amount = item.struct.value.value || item.struct.value; //保额
          }
          // 免赔额
          if (item.kindCode == '20E1' || item.kindCode == '20E3' || item.kindCode == '20E4' || item.kindCode == '20E5' || item.kindCode == '20K1') {
            it.deductible = item.struct.value.value || item.struct.value; //免赔额
          }
          // 增值服务
          if (item.kindCode == '20Z1' || item.kindCode == '20Z2' || item.kindCode == '20Z3' || item.kindCode == '20Z4' || item.kindCode == '21Z1' || item.kindCode == '21Z2' || item.kindCode == '21Z3' || item.kindCode == '21Z4' || item.kindCode == '20Y1' || item.kindCode == '20Y2') {
            it.quantity = item.struct.value.value || item.struct.value; //免赔额
          }
          // 机动车车上人员责任保险
          if (item.kindCode == '20D3' || item.kindCode == '21D3' || item.kindCode == '20Y1') {
            it.amount = item.struct.value.value
            it.unitAmount = item.struct.value.value
          }
          // 附加修理期间费用补偿险
          if (item.kindCode == '20T1') {
            it.amount = item.unitAmount * item.quantity
            it.unitAmount = item.unitAmount
          } 
          if (item.kindCode == '20D4' || item.kindCode == '21D4' || item.kindCode == '20Y2') {
            it.amount = item.struct.value.value * (carParams.carTypeDTO.seatCount * 1 - 1)
            it.quantity = carParams.carTypeDTO.seatCount * 1 - 1
            it.unitAmount = item.struct.value.value
          }
          // 选择其他选项可以输入
          if ((item.kindCode == '20D3' || item.kindCode == '20D4' || item.kindCode == '21D3' || item.kindCode == '21D4' || item.kindCode == '20Y2' || item.kindCode == '20B' || item.kindCode == '20Y') && item.struct.value.text == '其它') {
            it.unitAmount = item.struct.value.value
            it.unitAmount = it.unitAmount * 10000 + ""
            it.quantity = carParams.carTypeDTO.seatCount * 1 - 1
            it.amount = item.struct.value.value * (carParams.carTypeDTO.seatCount * 1 - 1)
            it.amount = it.amount * 10000 + ""
          }
          if (item.kindCode == '20Y1') {
            it.quantity = '1'
            it.amount = item.struct.value.value * it.quantity
          }
          if (item.kindCode == '20Y1' && item.struct.value.text == '其它') {
            it.quantity = '1'
            it.amount = item.struct.value.value * it.quantity
            it.amount = it.amount * 10000 + ""
          }
          params.commercialInsurance.prptitemkindList.push(it);
        }
      }
    }

    // 充电桩
    let prpTChargingPostDataList = []
    let item21C1 = RiskPlan.filter(item => { return item.kindCode == '21C1' })[0]
    let item21C2 = RiskPlan.filter(item => { return item.kindCode == '21C2' })[0]
    carParams.chargingPostDataList.forEach((item, index) => {
      // 损失险 && 责任险全部选中
      if ((item21C1.checked && item21C2.checked) || (item21C1.checked && item.amout['21C1']) || (item21C2.checked && item.amout['21C2'])) {
        let { chargingposttype, chargingpostcode, chargingpostaddress, chargingpostaddresstype, chargingpostkind, chargingpostyearlimit, amout } = item
        let coverage = ''
        if (item21C1.checked && item21C2.checked) {
          if (amout['21C1'] && amout['21C2']) {
            coverage = 3
          } else if (amout['21C2']) {
            coverage = 2
          } else {
            coverage = 1
          }
        } else if (item21C2.checked) {
          coverage = 2
        } else {
          coverage = 1
        }
        prpTChargingPostDataList.push({
          /**投保单号*/
          proposalNo: carParams.policyNo.b || '',
          /**充电桩型号*/
          chargingposttype,
          /**充电桩编码*/
          chargingpostcode,
          /**电桩地址*/
          chargingpostaddress,
          /**充电桩安装地点类型*/
          chargingpostaddresstype: chargingpostaddresstype.value || '',
          /**充电桩种类*/
          chargingpostkind: chargingpostkind.value || '',
          /**充电桩使用年限*/
          chargingpostyearlimit: chargingpostyearlimit.value || '',
          /**投保险别 1：单投充电桩损失保险 2：单投充电桩责任险 3：同时投保责任和损失险*/
          coverage: coverage,
          /**充电桩损失险保额*/
          lossSumLimit: amout['21C1'].value || '',
          /**充电桩责任险保额*/
          liabilitySumLimit: amout['21C2'].value || '',
          /**顺序号*/
          serialno: (index + 1)
        })
      }
    })
    params.commercialInsurance.prpTChargingPostDataList = prpTChargingPostDataList

    // 单交强险时
    if (!params.commercialInsurance.prptitemkindList.length) {
      params.commercialInsurance.calculateFlagBI = 0;
      params.commercialInsurance.inputRisk = 0;
      params.commercialInsurance.prpTmain.endDate = "";
      params.commercialInsurance.prpTmain.inputDate = "";
      params.commercialInsurance.prpTmain.signDate = "";
      params.commercialInsurance.prpTmain.startDate = "";
    }

    // 交强险与车船税
    if (carParams.VehicleInsurance.switchChecked) {
      for (let item of RiskPlan) {
        if (item.kindCode == 'BZ') {
          let it = {
            kindCode: item.kindCode,  //险种代码
            kindName: item.kindName, //险种名称
            startDate: params.compulsoryInsurance.prpTmain.startDate,
            endDate: params.compulsoryInsurance.prpTmain.endDate,
            deductible: "",
            isDeductible: true,
            rate: "",
            amount: "",
            noTaxPremium: "",
            taxFee: "",
            flag: " 2  03"
          }
          params.compulsoryInsurance.prptitemkindList.push(it);
        }
      }
    } else {
      params.compulsoryInsurance.inputRisk = 0
      params.compulsoryInsurance.calculateFlagCI = 0
    }

    // 转保单投保
    if (carParams.VerificationCode.bicheckCode) {
      params.commercialInsurance.prpTmain.answer = carParams.VerificationCode.bValue
      params.commercialInsurance.ciInsureDemand.demandNo = carParams.VerificationCode.bidemandNo
    }
    if (carParams.VerificationCode.cicheckCode) {
      params.compulsoryInsurance.prpTmain.answer = carParams.VerificationCode.cValue
      params.compulsoryInsurance.ciInsureDemand.demandNo = carParams.VerificationCode.cidemandNo
    }

    // 车+意   09000000深圳隐藏
    if (UserInfo.manageCode != '09000000' && carParams.vehicleType != '2') {
      let caaInsurance = carParams.accidentInsurance.list.filter(item => {
        return item.checkbox == true
      })
      if (caaInsurance.length && carParams.accidentInsurance.switchChecked) {
        params.caaInsuranceInputDTO = {
          productName: caaInsurance[0].productName,
          productCode: caaInsurance[0].productCode,
          totalPrice: caaInsurance[0].price,
          insuYearUnit: caaInsurance[0].insuYearUnit,
          mult: caaInsurance[0].stepper,
          accidentStartDate: params.commercialInsurance.prpTmain.startDate || params.compulsoryInsurance.prpTmain.startDate || '',
          salePlanInfo: caaInsurance[0].salePlanInfoList[caaInsurance[0].active],
        }
      }
    }

    // 放在这个prpTmain对象里面，车加意标识字段：noCarFlag，1-为含有意外险    0-为不含意外险
    params.commercialInsurance.prpTmain.noCarFlag = carParams.accidentInsurance.switchChecked && (!carParams.VehicleInsurance.switchChecked1 || (params.caaInsuranceInputDTO && params.caaInsuranceInputDTO.totalPrice && params.caaInsuranceInputDTO.totalPrice >= 100)) ? 1 : 0
    params.compulsoryInsurance.prpTmain.noCarFlag = carParams.accidentInsurance.switchChecked && (!carParams.VehicleInsurance.switchChecked1 || (params.caaInsuranceInputDTO && params.caaInsuranceInputDTO.totalPrice && params.caaInsuranceInputDTO.totalPrice >= 100)) ? 1 : 0

    // 车船税减免标志
    if (UserInfo.manageCode == '07000000') {
      params.compulsoryInsurance.prpTcarshipTax = {
        taxRelifFlag: carParams.vehicleVesselTax.taxRelifFlag.value.value,
        paidFreeCertificate: carParams.vehicleVesselTax.taxRelifFlag.value.value == 'W' && carParams.vehicleVesselTax.paidFreeCertificate ? carParams.vehicleVesselTax.paidFreeCertificate : '',
        taxComName: carParams.vehicleVesselTax.taxRelifFlag.value.value == 'W' && carParams.vehicleVesselTax.taxComName ? carParams.vehicleVesselTax.taxComName : '',
        taxComCode: carParams.vehicleVesselTax.taxRelifFlag.value.value == 'W' && carParams.vehicleVesselTax.taxComCode ? carParams.vehicleVesselTax.taxComCode : '',
        taxDocumentDate: carParams.vehicleVesselTax.taxRelifFlag.value.value == 'W' && carParams.vehicleVesselTax.taxDocumentDate ? carParams.vehicleVesselTax.taxDocumentDate : ''
      }
    }

    let sign = MD5(JSON.stringify(params) + 'grqazwsx').toString();
    context.commit('updataVerifyTrial', { name: 'isTrial', value: sign != carParams.verifyTrial.sign ? true : false });

    // 判断是否清除期望折扣
    let discountData_params = JSON.parse(JSON.stringify(params));
    discountData_params.commercialInsurance.prpTmain.expectDiscount = ""
    let discountData_sign = MD5(JSON.stringify(discountData_params)).toString();
    if (carParams.discountData.sign && carParams.discountData.sign != discountData_sign) {
      context.commit('updateCarState', [
        { name: ['discountData', 'selfAdjustRateFirst'], value: 0 }
      ])
    }
    context.commit('updateCarState', [
      { name: ['discountData', 'sign'], value: discountData_sign }
    ])
    // 判断是否清除期望折扣——结束

    return { "params": params, "RiskPlan": RiskPlan }
  },

  /**
 * 代理协议号
 */
  async getMyAgreement(context) {
    const res = await axios({
      url: API.API_AGREEMENT,
      method: 'get',
      params: {
        agentCode: localStorage.agentCode
      }
    });

    if (res.code == 0 && res.content.result == '0') {
      let data = JSON.parse(res.content.data)
      for (let item of data) {
        item.text = item.agreementNo + '-' + item.agentName
        item.value = item.agentName
      }
      context.commit('mYupdataAgreementList', data);
    }
  },
  /**
   * 车险下单轨迹
   */
  async goCarlocus({ dispatch, commit, state }, data) {
    const res = await axios({
      url: API.API_GETORDERDETAILS,
      method: 'post',
      data
    });
    console.log(res, '123123123213123123');
    if (res.code === 0 && res.content) {
      let sysAgentExpandDTO = res.content.sysAgentExpandDTO
      let carNewData = {
        agreementNo: sysAgentExpandDTO.agreementNo,
        businessType: sysAgentExpandDTO.businessType,
        codeCode: sysAgentExpandDTO.codeCode,
        codeName: sysAgentExpandDTO.codeName,
        proxyCode: sysAgentExpandDTO.proxyCode,
        proxyName: sysAgentExpandDTO.proxyName,
        unitmainTenanceTypeOne: sysAgentExpandDTO.unitmainTenanceTypeOne,
        unitmainTenanceTypeOneName: sysAgentExpandDTO.unitmainTenanceTypeOneName,
        unitmainTenanceTypeTwo: sysAgentExpandDTO.unitmainTenanceTypeTwo,
        unitmainTenanceTypeTwoName: sysAgentExpandDTO.unitmainTenanceTypeTwoName
      }
      localStorage.setItem('agreement', JSON.stringify(carNewData))
      commit('updataSysAgentExpandDTO', carNewData)
      // 清除车险记录
      commit('resetState')
      if (data.isDel) {
        // 删除订单处理
        const orderLogout = await dispatch('my/orderLogout', { orderNo: data.orderNo, cancelFlag: data.type }, { root: true })
        if (orderLogout.code != '0' || orderLogout.content.result != '0') {
          Toast(orderLogout.content.resultMessage || '请求出错');
          return false
        }
      } else {
        // 判断是否编辑
        commit('updateCarState', [
          { name: ['editType'], value: res.content.policyBI && res.content.policyBI.proposalNo || res.content.policyCI && res.content.policyCI.proposalNo ? 1 : 0 },
          { name: ['VehicleInsurance', 'switchChecked'], value: res.content.policyCI ? true : false },
          { name: ['VehicleInsurance', 'switchChecked1'], value: res.content.policyBI ? true : false }
        ])
        // 订单号
        commit('updateCarState', [
          { name: ['orderNo'], value: res.content.propOrderVehicleDTO.orderNo },
          { name: ['editInsurance'], value: res.content.propOrderDTO.editType || 'NEW' }
        ])
      }
      // 立即投保
      if (parseInt(res.content.propOrderDTO.pageStep) >= 1) {
        commit('updateCarState', [
          { name: ['carBanner'], value: res.content.propOrderVehicleDTO.ownerImageUrl || '' },
          { name: ['carInsureEntry', 'address'], value: res.content.propOrderVehicleDTO.ownerAddress ? ([{ name: res.content.propOrderVehicleDTO.ownerProvinceName }, { name: res.content.propOrderVehicleDTO.ownerCityName }, { name: res.content.propOrderVehicleDTO.ownerAddress }]) : [] },
          { name: ['carInsureEntry', 'cityCode'], value: res.content.propOrderVehicleDTO.cityCode || '' },
          { name: ['carInsureEntry', 'cityName'], value: res.content.propOrderVehicleDTO.cityName || '' },
          { name: ['carInsureEntry', 'isLicenseNo'], value: res.content.propOrderVehicleDTO.licenseNo == "新车" ? true : false },
          { name: ['carInsureEntry', 'licenseName'], value: res.content.propOrderVehicleDTO.licenseNo != "新车" ? res.content.propOrderVehicleDTO.licenseNo.substring(0, 1) : '' },
          { name: ['carInsureEntry', 'licenseNo'], value: res.content.propOrderVehicleDTO.licenseNo != "新车" ? res.content.propOrderVehicleDTO.licenseNo.substring(1, 8) : res.content.propOrderVehicleDTO.licenseNo },
          { name: ['carInsureEntry', 'transferFlag'], value: res.content.propOrderVehicleDTO.transferFlag == '1' ? 1 : 0 },
          { name: ['carInsureEntry', 'transferDate'], value: res.content.propOrderVehicleDTO.transferDate ? compCheck.timestampToTime(res.content.propOrderVehicleDTO.transferDate, 'YYYY-MM-DD') : '' },
          { name: ['renewInsuranceQuery', 'checked'], value: res.content.propOrderDTO.renewalFlag == '1' && !data.isDel ? true : false },
        ])
        // 添加轨迹
        // history.pushState(null, null, `${configJs.config.ctx_base}/#/carInsurance`);
      }
      // 基本信息
      if (parseInt(res.content.propOrderDTO.pageStep) >= 2) {
        // 车价
        let carPriceRequest = JSON.parse(res.content.propOrderVehicleDTO.carPriceRequest) || {}

        commit('updateCarState', [
          { name: ['vehicleDTO', 'frameNo'], value: res.content.propOrderVehicleDTO.frameNo || '' },
          { name: ['vehicleDTO', 'engineNo'], value: res.content.propOrderVehicleDTO.engineNo || '' },
          { name: ['vehicleDTO', 'purchaseDate'], value: res.content.propOrderVehicleDTO.purchaseDate ? compCheck.timestampToTime(res.content.propOrderVehicleDTO.purchaseDate, 'YYYY-MM-DD') : '' },
          { name: ['vehicleDTO', 'enrollDate'], value: res.content.propOrderVehicleDTO.enrollDate ? compCheck.timestampToTime(res.content.propOrderVehicleDTO.enrollDate, 'YYYY-MM-DD') : '' },
          { name: ['vehicleDTO', 'businessDate'], value: res.content.propOrderVehicleDTO.businessDate ? compCheck.timestampToTime(res.content.propOrderVehicleDTO.businessDate, 'YYYY-MM-DD') : '' },
          { name: ['carOwnerDTO', 'carOwner'], value: res.content.propOrderVehicleDTO.carOwner || '' },
          { name: ['carOwnerDTO', 'carOwnerNature', 'value'], value: res.content.propOrderVehicleDTO.carOwnerNature == '0' ? state.carOwnerDTO.carOwnerNature.data[0] : res.content.propOrderVehicleDTO.carOwnerNature == '1' ? state.carOwnerDTO.carOwnerNature.data[1] : state.carOwnerDTO.carOwnerNature.data[2] },
          { name: ['carOwnerDTO', 'carOwnerIdNo'], value: res.content.propOrderVehicleDTO.carOwnerIdNo || '' },
          { name: ['carTypeDTO'], value: res.content.propOrderVehicleModelDTO || '' },



          { name: ['fuelCategory', 'value'], value: (res.content.propOrderVehicleModelDTO && res.content.propOrderVehicleModelDTO.fuelType) ? state.fuelCategory.data[res.content.propOrderVehicleModelDTO.fuelType] : state.fuelCategory.value },



          { name: ['carTypeDTO', 'fuelType'], value: res.content.propOrderVehicleModelDTO.fuelType || '' },



          { name: ['vehicleDTO', 'saleCompany'], value: res.content.propOrderVehicleModelDTO.saleCompany || '' },
          { name: ['vehicleDTO', 'sale4SFlag'], value: res.content.propOrderVehicleModelDTO.saleFlag === "1" ? true : false },
          { name: ['carInsureEntry', 'transferFlag'], value: res.content.propOrderVehicleModelDTO.transferFlag === "1" ? 1 : 0 },

          // 车价报文
          { name: ['carPriceRequest', 'url'], value: carPriceRequest.url || '' },
          { name: ['carPriceRequest', 'request'], value: carPriceRequest.request || {} },
          { name: ['carPrice', 'actualValue'], value: res.content.propOrderVehicleDTO.actualValue || '' },
          { name: ['carPrice', 'inputvo'], value: res.content.propOrderDTO.uuid || '' },
          { name: ['carPrice', 'carCountryNature'], value: res.content.propOrderVehicleDTO.carCountryNature || '' },
        ])
        let carOwnerIDEndDate = res.content.propOrderVehicleDTO.carOwnerIDValidEndDate ? compCheck.timestampToTime(res.content.propOrderVehicleDTO.carOwnerIDValidEndDate, 'YYYY-MM-DD') : ''
        carOwnerIDEndDate = res.content.propOrderVehicleDTO.carOwnerIDValidDateLongFlag == '1' ? '2999-12-31' : carOwnerIDEndDate
        commit('updataIdNoDate', [
          { name: ['carOwnerDTO', 'carOwnerIDEndDate'], value: carOwnerIDEndDate },
          { name: ['carOwnerDTO', 'carOwnerIDStartDate'], value: res.content.propOrderVehicleDTO.carOwnerIDValidStartDate ? compCheck.timestampToTime(res.content.propOrderVehicleDTO.carOwnerIDValidStartDate, 'YYYY-MM-DD') : '' },
        ])
        // 添加轨迹
        // history.pushState(null, null, `${configJs.config.ctx_base}/#/carBaseInfo`);
      }
      //新车销售公司所在地
      if (res.content.propOrderVehicleModelDTO.saleAreacode) {
        commit('updateCarState', [
          {
            name: ['saleAreaCode', 'value'],
            value: [...state.saleAreaCode.data].filter(item => {
              return item.value === res.content.propOrderVehicleModelDTO.saleAreacode
            })[0]
          }
        ])
      }
      // 号牌种类
      if (res.content.propOrderVehicleDTO.licenseType) {
        commit('updateCarState', [
          {
            name: ['licensePlateType', 'struct', 'value'], value: [...state.licensePlateType.struct.data, ...state.licensePlateType.struct.shangHaiData, ...state.licensePlateType.struct.motorcycle].filter(item => {
              return item.value == res.content.propOrderVehicleDTO.licenseType
            })[0]
          }
        ])
      }
      // 车险投保
      if (parseInt(res.content.propOrderDTO.pageStep) >= 4) {
        // 交强险
        if (res.content.policyCI) {
          commit('updateCarState', [
            { name: ['VehicleInsurance', 'cImmeValiFlag'], value: res.content.policyCI.immedEffectFlag ? true : false },
            { name: ['VehicleInsurance', 'cImmeValidEndDate'], value: res.content.policyCI.immedEffectFlag ? compCheck.timestampToTime(res.content.policyCI.startDate, 'YYYY-MM-DD HH:ii:ss') : "" },
            { name: ['compulsoryInsuranceStartDate'], value: !res.content.policyCI.immedEffectFlag ? compCheck.timestampToTime(res.content.policyCI.startDate, 'YYYY-MM-DD HH:ii:ss') : "" },
            { name: ['tryCalculation', 'sumPremiumCI'], value: res.content.policyCI.premium * 1 - res.content.policyCI.taxActual * 1 || 0 },
            { name: ['tryCalculation', 'sumPayTax'], value: res.content.policyCI.taxActual || 0 },
          ])
        } else {
          commit('updateCarState', [
            { name: ['VehicleInsurance', 'switchChecked'], value: false }
          ])
        }
        // 商业险
        if (res.content.policyBI) {
          commit('updateCarState', [
            { name: ['VehicleInsurance', 'active'], value: res.content.propOrderDTO.productCode == 'A' ? 0 : res.content.propOrderDTO.productCode == 'B' ? 1 : res.content.propOrderDTO.productCode == 'C' ? 2 : 0 },
            { name: ['VehicleInsurance', 'bImmeValiFlag'], value: res.content.policyBI.immedEffectFlag ? true : false },
            { name: ['VehicleInsurance', 'bImmeValidEndDate'], value: res.content.policyBI.immedEffectFlag ? compCheck.timestampToTime(res.content.policyBI.startDate, 'YYYY-MM-DD HH:ii:ss') : "" },
            { name: ['commercialInsuranceStartDate'], value: !res.content.policyBI.immedEffectFlag ? compCheck.timestampToTime(res.content.policyBI.startDate, 'YYYY-MM-DD HH:ii:ss') : "" },
            { name: ['tryCalculation', 'sumPremiumBI'], value: res.content.policyBI.premium || 0 },
          ])
        } else {
          commit('updateCarState', [
            { name: ['VehicleInsurance', 'switchChecked1'], value: false },
          ])
        }
        // 试算金额
        commit('updateCarState', [
          {
            name: ['tryCalculation'], value: {
              sumPremiumCI: res.content.policyCI ? (res.content.policyCI.premium || 0) * 1 - (res.content.policyCI.taxActual || 0) * 1 : 0,
              sumPayTax: res.content.policyCI && res.content.policyCI.taxActual ? res.content.policyCI.taxActual : 0,
              sumPremiumBI: res.content.policyBI && res.content.policyBI.premium ? res.content.policyBI.premium : 0,
              actualValue: res.content.propOrderVehicleDTO.actualValue || 0,
              uuid: res.content.propOrderDTO.uuid || '',
            }
          }
        ])
        // 试算还原
        let arrTemp = []
        let arr = JSON.parse(JSON.stringify(state.insuranceTypes)).map((item, index) => {
          if (res.content.policyBI && res.content.policyBI.policyRiskDTOList && res.content.policyBI.policyRiskDTOList.length) {
            for (let it of res.content.policyBI.policyRiskDTOList) {
              if (item.kindCode == it.riskCoreCode) {
                console.log('item.kindCode', item.kindCode);

                item.checked = true
                item.disabled = false
                item.premium = it.premium
                item.amount = it.amount
                // console.log('item', item);
                // console.log('it', it);
                if (item.struct.type == "select") {
                  for (let key of item.struct.data) {
                    if (item.kindCode == '20E1' || item.kindCode == '20E3' || item.kindCode == '20E4' || item.kindCode == '20E5') {
                      if (key.value == it.deductible) {
                        item.struct.value = key
                      }
                    } else if (item.kindCode == '20A' || item.kindCode == '21A') {
                      if (key.value == it.deductible) {
                        item.struct.value = key
                      }
                    } else if (item.kindCode == '20D4' || item.kindCode == '20D3' || item.kindCode == '21D4' || item.kindCode == '21D3' || item.kindCode == '20Y1' || item.kindCode == '20Y2' || item.kindCode == '20B') {
                      if (it.unitAmount >= '10') {
                        item.struct.value = {
                          text: "其它",
                          value: it.unitAmount / 10000
                        }
                      }
                    } else if (key.value == it.amount) {
                      item.struct.value = key
                    }
                  }
                }
                if (item.kindCode == '20A' || item.kindCode == '21A') {
                  for (let key of item.struct.data) {
                    if (key.value == it.deductible) {
                      item.struct.value = key
                    }
                  }
                }
                // 增值服务
                if (item.kindCode == '20Z1' || item.kindCode == '21Z1') {
                  for (let key of item.struct.data) {
                    if (key.value == it.quantity) {
                      item.struct.value = key
                    }
                  }
                }
                // 增值服务
                if (item.kindCode == '20Z2' || item.kindCode == '20Z3' || item.kindCode == '20Z4' || item.kindCode == '21Z2' || item.kindCode == '21Z3' || item.kindCode == '21Z4') {
                  item.struct.value = it.quantity
                }
                // 车上货物责任险
                if (item.kindCode == '20D2') {
                  item.struct.value = it.amount
                }
                // 副加险
                if (item.additional && item.additional.length) {
                  arrTemp = arrTemp.concat(item.additional);
                }
              }
              // 副加险
              if (arrTemp.some(kindCode => { return item.kindCode == kindCode })) {
                item.disabled = false
              }
              // 增值服务
              if (arrTemp.length) {
                if (item.kindCode == '20Z1' || item.kindCode == '20Z2' || item.kindCode == '20Z3' || item.kindCode == '20Z4' || item.kindCode == '21Z1' || item.kindCode == '21Z2' || item.kindCode == '21Z3' || item.kindCode == '21Z4') {
                  item.disabled = false
                }
              }
            }
          }
          if (res.content.policyCI) {
            for (let it of res.content.policyCI.policyRiskDTOList) {
              if (item.kindCode == it.riskCoreCode) {
                item.checked = true
                item.disabled = false
                item.premium = it.premium
              }
            }
          }
          return item
        });
        // ------- 已有充电桩 回显 -------
        if (res.content.policyBI && res.content.policyBI.propPolicyChargingpostList) {
          for (let it2 of res.content.policyBI.propPolicyChargingpostList) {
            let chargingPostData = {
              /**投保保额*/
              amouts: {
                '21C1': '',
                '21C2': ''
              },
              /**投保单号*/
              proposalNo: it2.orderNo,
              /**充电桩型号*/
              chargingposttype: it2.chargingPostAddressType,
              /**充电桩编码*/
              chargingpostcode: it2.chargingPostCode,
              /**电桩地址*/
              chargingpostaddress: it2.chargingPostAddress,
              /**充电桩安装地点类型*/
              chargingpostaddresstype: it2.chargingPostType,
              /**充电桩种类*/
              chargingpostkind: it2.chargingPostKind,
              /**充电桩使用年限*/
              chargingpostyearlimit: it2.chargingPostYearLimit,
              /**投保险别*/
              coverage: it2.coverage,
            }
            // coverage 判断类型
            if (it2.coverage == 3) {
              chargingPostData.amouts['21C1'] = it2.lossSumLimit
              chargingPostData.amouts['21C2'] = it2.liabilitySumLimit
            } else if (it2.coverage == 2) {
              chargingPostData.amouts['21C2'] = it2.lossSumLimit || it2.liabilitySumLimit
            } else {
              chargingPostData.amouts['21C1'] = it2.lossSumLimit || it2.liabilitySumLimit
            }
            // 充电桩安装地点类型
            let chargingpostaddresstype = {
              value: { text: "", value: "" },
              data: [
                { value: "1", text: "地面停车场" },
                { value: "2", text: "地面停车楼/地下停车场" },
              ],
            }
            // 充电桩使用年限
            let chargingpostyearlimit = {
              value: { text: "", value: "" },
              data: [
                { value: "1", text: "2年及以内" },
                { value: "2", text: "2-5（含）年" },
                { value: "3", text: "5年以上" },
              ],
            }
            // 充电桩种类
            let chargingpostkind = {
              value: { text: "", value: "" },
              data: [
                { value: "1", text: "地面充电桩" },
                { value: "2", text: "壁挂式充电桩" },
                { value: "9", text: "其他类充电桩" },
              ],
            }
            chargingPostData.chargingpostaddresstype = chargingpostaddresstype.data.filter(item => {
              return item.value == it2.chargingPostAddressType
            })[0]
            chargingPostData.chargingpostyearlimit = chargingpostyearlimit.data.filter(item => {
              return item.value == it2.chargingPostYearLimit
            })[0]
            chargingPostData.chargingpostkind = chargingpostkind.data.filter(item => {
              return item.value == it2.chargingPostKind
            })[0]
            state.chargingPostDataList = state.chargingPostDataList.concat(chargingPostData)
          }
        }
        setTimeout(() => {
          commit('updateCarState', [
            { name: ['insuranceTypes'], value: arr }
          ])
        }, 100)

        // 试算特约
        if (res.content.propOrderDTO) {
          if (res.content.propOrderDTO.biPrptenages) {
            commit('updateCarState', [
              { name: ['tryCalculation', 'biPrptenages'], value: JSON.parse(res.content.propOrderDTO.biPrptenages).filter(item => { return item.type == 'trial' }) },
            ])
          }
          if (res.content.propOrderDTO.ciPrptenages) {
            commit('updateCarState', [
              { name: ['tryCalculation', 'ciPrptenages'], value: JSON.parse(res.content.propOrderDTO.ciPrptenages).filter(item => { return item.type == 'trial' }) }
            ])
          }
        }

        // 添加轨迹
        // history.pushState(null, null, `${configJs.config.ctx_base}/#/carVehicleInsurance`);
      }
      // 补充信息
      if (res.content.orderAppntDTO && res.content.orderAppntDTO.idNo !='') {
        // 投保人
        commit('updateCarState', [
          { name: ['applyInfoDTO', 'insuredNature', 'value'], value: res.content.orderAppntDTO.cls ? state.applyInfoDTO.insuredNature.data.filter(item => { return item.value == res.content.orderAppntDTO.cls })[0] : '' },
          { name: ['applyInfoDTO', 'name'], value: res.content.orderAppntDTO.name || '' },
          { name: ['applyInfoDTO', 'idNo'], value: res.content.orderAppntDTO.idNo || '' },
          { name: ['applyInfoDTO', 'mobile'], value: res.content.orderAppntDTO.mobile || '' },
          { name: ['applyInfoDTO', 'province'], value: res.content.orderAppntDTO.province || '' },
          { name: ['applyInfoDTO', 'city'], value: res.content.orderAppntDTO.city || '' },
          { name: ['applyInfoDTO', 'county'], value: res.content.orderAppntDTO.county || '' },
          { name: ['applyInfoDTO', 'address'], value: area.province_list[res.content.orderAppntDTO.province] + area.city_list[res.content.orderAppntDTO.city] + area.county_list[res.content.orderAppntDTO.county] },
          { name: ['applyInfoDTO', 'detailed_address'], value: res.content.orderAppntDTO.address || '' },
          { name: ['applyInfoDTO', 'phoneHolderName'], value: res.content.orderAppntDTO.phoneHolderName || '' },
          { name: ['applyInfoDTO', 'phoneHolderIdentifyNumber'], value: res.content.orderAppntDTO.phoneHolderIdentifyNumber || '' },
          { name: ['applyInfoDTO', 'appliLinkerName'], value: res.content.orderAppntDTO.appliLinkerName || '' },
        ])
        let idNoEndDate = res.content.orderAppntDTO.appntIDValidStartDate ? compCheck.timestampToTime(res.content.propOrderVehicleDTO.carOwnerIDValidEndDate, 'YYYY-MM-DD') : ''
        idNoEndDate = res.content.orderAppntDTO.appntIDValidDateLongFlag == '1' ? '2999-12-31' : idNoEndDate
        commit('updataIdNoDate', [
          { name: ['applyInfoDTO', 'idNoStartDate'], value: res.content.orderAppntDTO.appntIDValidStartDate ? compCheck.timestampToTime(res.content.orderAppntDTO.appntIDValidStartDate, 'YYYY-MM-DD') : '' },
          { name: ['applyInfoDTO', 'idNoEndDate'], value: idNoEndDate },
        ])
        // 被保人
        commit('updateCarState', [
          { name: ['insureInfoDTO', 'insuredNature', 'value'], value: res.content.policyInsuredDTOList[0].cls ? state.insureInfoDTO.insuredNature.data.filter(item => { return item.value == res.content.policyInsuredDTOList[0].cls })[0] : '' },
          { name: ['insureInfoDTO', 'name'], value: res.content.policyInsuredDTOList[0].name || '' },
          { name: ['insureInfoDTO', 'idNo'], value: res.content.policyInsuredDTOList[0].idNo || '' },
          { name: ['insureInfoDTO', 'mobile'], value: res.content.policyInsuredDTOList[0].mobile || '' },
          { name: ['insureInfoDTO', 'province'], value: res.content.policyInsuredDTOList[0].province || '' },
          { name: ['insureInfoDTO', 'city'], value: res.content.policyInsuredDTOList[0].city || '' },
          { name: ['insureInfoDTO', 'county'], value: res.content.policyInsuredDTOList[0].county || '' },
          { name: ['insureInfoDTO', 'address'], value: area.province_list[res.content.policyInsuredDTOList[0].province] + area.city_list[res.content.policyInsuredDTOList[0].city] + area.county_list[res.content.policyInsuredDTOList[0].county] },
          { name: ['insureInfoDTO', 'detailed_address'], value: res.content.policyInsuredDTOList[0].address || '' },
          { name: ['insureInfoDTO', 'phoneHolderName'], value: res.content.policyInsuredDTOList[0].phoneHolderName || '' },
          { name: ['insureInfoDTO', 'phoneHolderIdentifyNumber'], value: res.content.policyInsuredDTOList[0].phoneHolderIdentifyNumber || '' },
          { name: ['insureInfoDTO', 'insuredLinkerName'], value: res.content.policyInsuredDTOList[0].insuredLinkerName || '' },
        ])
        let idNoEndDates = res.content.policyInsuredDTOList[0].insuredIDValidEndDate ? compCheck.timestampToTime(res.content.policyInsuredDTOList[0].insuredIDValidEndDate, 'YYYY-MM-DD') : ''
        idNoEndDates = res.content.policyInsuredDTOList[0].insuredIDValidDateLongFlag == '1' ? '2999-12-31' : idNoEndDates
        commit('updataIdNoDate', [
          { name: ['insureInfoDTO', 'idNoStartDate'], value: res.content.policyInsuredDTOList[0].insuredIDValidStartDate ? compCheck.timestampToTime(res.content.policyInsuredDTOList[0].insuredIDValidStartDate, 'YYYY-MM-DD') : '' },
          { name: ['insureInfoDTO', 'idNoEndDate'], value: idNoEndDates },
        ])
        if (!data.isDel) {
          await dispatch('getClauses')
          let biPrptenagesDTOList = state.biPrptenagesDTOList.map(item => {
            if (res.content.propOrderDTO && res.content.propOrderDTO.biPrptenages) {
              for (let it of JSON.parse(res.content.propOrderDTO.biPrptenages)) {
                if (it.type != 'trial' && item.clauseCode == it.clauseCode) {
                  item.checkbox = true
                  item.checked = true
                  item.clausesContext = it.clausesContext
                  item.context = it.context
                  item.inputDataValue = it.inputDataValue
                  item.inputField = it.inputField
                  item.riskCode = it.riskCode
                }
              }
            }
            return item
          })
          let ciPrptenagesDTOList = state.ciPrptenagesDTOList.map(item => {
            if (res.content.propOrderDTO && res.content.propOrderDTO.ciPrptenages) {
              for (let it of JSON.parse(res.content.propOrderDTO.ciPrptenages)) {
                if (it.type != 'trial' && item.clauseCode == it.clauseCode) {
                  item.checkbox = true
                  item.checked = true
                  item.clausesContext = it.clausesContext
                  item.context = it.context
                  item.inputDataValue = it.inputDataValue
                  item.inputField = it.inputField
                  item.riskCode = it.riskCode
                }
              }
            }
            return item
          })
          // 特约选择
          commit('updateCarState', [
            { name: ['biPrptenagesDTOList'], value: biPrptenagesDTOList },
            { name: ['ciPrptenagesDTOList'], value: ciPrptenagesDTOList }
          ])
        }
      }
      // 编辑下单：1  车险下单：0
      commit('updateCarState', [
        { name: ['editType'], value: 1 }
      ])
      // 车加意
      commit('updateCarState', [
        { name: ['resPolicyCaa'], value: res.content.policyCaa }
      ])
      // 车船税减免标志
      if (res.content.propOrderVehicleDTO.taxRelifFlag) {
        commit('updateCarState', [
          {
            name: ['vehicleVesselTax', 'taxRelifFlag', 'value'], value: state.vehicleVesselTax.taxRelifFlag.data.filter(item => {
              return item.value == res.content.propOrderVehicleDTO.taxRelifFlag
            })[0]
          },
          { name: ['vehicleVesselTax', 'taxComCode'], value: res.content.propOrderVehicleDTO.taxComCode || '' },
          { name: ['vehicleVesselTax', 'taxComName'], value: res.content.propOrderVehicleDTO.taxComName || '' },
          { name: ['vehicleVesselTax', 'paidFreeCertificate'], value: res.content.propOrderVehicleDTO.paidFreeCertificate || '' },
          { name: ['vehicleVesselTax', 'taxDocumentDate'], value: res.content.propOrderVehicleDTO.taxDocumentDate || '' },
        ])
      }
      // 货车
      if (res.content.propOrderVehicleDTO.maincarKindCode == 'H') {
        commit('updateCarState', [
          {
            name: ['trucksUseNatureCode', 'value'], value: res.content.propOrderVehicleDTO.useNatureCode ? state.trucksUseNatureCode.data.filter(item => {
              return item.value == res.content.propOrderVehicleDTO.useNatureCode
            })[0] : { text: "", value: "" }
          },  // 使用性质
          {
            name: ['carKindCode', 'value'], value: res.content.propOrderVehicleDTO.carKindCode ? state.carKindCode.data.filter(item => {
              return item.value == res.content.propOrderVehicleDTO.carKindCode
            })[0] : { text: "", value: "" }
          },  // 车辆种类
          {
            name: ['vehicleCategory', 'value'], value: res.content.propOrderVehicleDTO.vehicleCategory ? state.vehicleCategory.data.filter(item => {
              return item.value == res.content.propOrderVehicleDTO.vehicleCategory
            })[0] : { text: "", value: "" }
          },  // 车辆类型
          {
            name: ['licenseCategory', 'value'], value: res.content.propOrderVehicleDTO.licenseCategory ? state.licenseCategory.data.filter(item => {
              return item.value == res.content.propOrderVehicleDTO.licenseCategory
            })[0] : { text: "", value: "" }
          },  // 车辆类型描述
          {
            name: ['licenseColor', 'value'], value: res.content.propOrderVehicleDTO.licenseColor ? state.licenseColor.data.filter(item => {
              return item.value == res.content.propOrderVehicleDTO.licenseColor
            })[0] : state.licenseColor.data.filter(item => { return item.value == '04' })[0]
          },  // 号牌颜色
        ])
      } else if (res.content.propOrderVehicleDTO.maincarKindCode == 'M') {
        commit('updateCarState', [
          {
            name: ['motorbikeUseNatureCode', 'value'], value: res.content.propOrderVehicleDTO.useNatureCode ? state.motorbikeUseNatureCode.data.filter(item => {
              return item.value == res.content.propOrderVehicleDTO.useNatureCode
            })[0] : { text: "", value: "" }
          },  // 使用性质
          {
            name: ['motorbikeKindCode', 'value'], value: res.content.propOrderVehicleDTO.carKindCode ? state.motorbikeKindCode.data.filter(item => {
              return item.value == res.content.propOrderVehicleDTO.carKindCode
            })[0] : { text: "", value: "" }
          },  // 车辆种类
          {
            name: ['motorbikeDescribe', 'value'], value: res.content.propOrderVehicleDTO.licenseCategory ? state.motorbikeDescribe.data.filter(item => {
              return item.value == res.content.propOrderVehicleDTO.licenseCategory
            })[0] : { text: "", value: "" }
          },  // 车辆类型描述
          {
            name: ['motorbikeLicenseColor', 'value'], value: res.content.propOrderVehicleDTO.licenseColor ? state.motorbikeLicenseColor.data.filter(item => {
              return item.value == res.content.propOrderVehicleDTO.licenseColor
            })[0] : state.licenseColor.data.filter(item => { return item.value == '04' })[0]
          },  // 号牌颜色
        ])
      } else {
        commit('updateCarState', [
          {
            name: ['useNatureCode', 'value'], value: res.content.propOrderVehicleDTO.useNatureCode ? state.useNatureCode.data.filter(item => {
              return item.value == res.content.propOrderVehicleDTO.useNatureCode
            })[0] : { text: "", value: "" }
          }
        ]) // 客车使用性质
      }
      /**
       * 记录跳转
       */
      if (res.content.propOrderVehicleDTO.maincarKindCode == 'H') {
        router.push({ path: '/carInsurance?vehicleType=02' })
      } else if (res.content.propOrderVehicleDTO.maincarKindCode == 'M') {
        router.push({ path: '/carInsurance?vehicleType=03' })
      } else {
        router.push({ path: '/carInsurance' })
      }
      // switch (res.content.propOrderDTO.pageStep) {
      //   case '1':
      //     router.push({ path: '/carBaseInfo' })
      //     break;
      //   case '2':
      //     router.push({ path: '/carBaseInfo' })
      //     break;
      //   case '3':
      //     router.push({ path: '/carVehicleInsurance' })
      //     break;
      //   case '4':
      //     router.push({ path: '/carReplenishInfo' })
      //     break;
      //   case '5':
      //     router.push({ path: '/carReplenishInfo' })
      //     break;
      // }
    }
    console.log('goCarlocus', state);
  },
  /**
   * 续保
   */
  async renewInsurance({ dispatch, commit, state, rootState }) {
    const res = await axios({
      url: API.API_RENEWALINFO,
      method: 'post',
      data: {
        licenseNo: state.carInsureEntry.licenseName + state.carInsureEntry.licenseNo,
        frameNo: state.vehicleDTO.frameNo
      }
    });
    if (res.code === 0 && res.content && res.content.result === '0') {
      // 清除数据，保留立即投保数据
      const { orderNo, carBanner, resPolicyCaa, vehicleType, vehicleDTO } = state
      commit('resetState')
      commit('updateCarState', [
        { name: ['orderNo'], value: orderNo },
        { name: ['carBanner'], value: carBanner },
        { name: ['editInsurance'], value: 'RENEWAL' },
        { name: ['resPolicyCaa'], value: resPolicyCaa },
        { name: ['vehicleType'], value: vehicleType },
      ])

      // 立即投保
      commit('updateCarState', [
        { name: ['carInsureEntry', 'isLicenseNo'], value: res.content.propOrderVehicleDTO.licenseNo == "新车" ? true : false },
        { name: ['carInsureEntry', 'licenseName'], value: res.content.propOrderVehicleDTO.licenseNo != "新车" ? res.content.propOrderVehicleDTO.licenseNo.substring(0, 1) : '' },
        { name: ['carInsureEntry', 'licenseNo'], value: res.content.propOrderVehicleDTO.licenseNo != "新车" ? res.content.propOrderVehicleDTO.licenseNo.substring(1, 8) : res.content.propOrderVehicleDTO.licenseNo },
        { name: ['carInsureEntry', 'transferFlag'], value: res.content.propOrderVehicleDTO.transferFlag == '1' ? 1 : 0 },
        { name: ['carInsureEntry', 'transferDate'], value: res.content.propOrderVehicleDTO.transferDate ? compCheck.timestampToTime(res.content.propOrderVehicleDTO.transferDate, 'YYYY-MM-DD') : '' },
      ])
      // 基本信息
      // 车价
      let carPriceRequest = JSON.parse(res.content.propOrderVehicleDTO.carPriceRequest) || {}
      commit('updateCarState', [
        { name: ['vehicleDTO', 'frameNo'], value: res.content.propOrderVehicleDTO.frameNo || '' },
        { name: ['vehicleDTO', 'engineNo'], value: res.content.propOrderVehicleDTO.engineNo || '' },
        { name: ['vehicleDTO', 'purchaseDate'], value: res.content.propOrderVehicleDTO.purchaseDate ? compCheck.timestampToTime(res.content.propOrderVehicleDTO.purchaseDate, 'YYYY-MM-DD') : '' },
        { name: ['vehicleDTO', 'enrollDate'], value: res.content.propOrderVehicleDTO.enrollDate ? compCheck.timestampToTime(res.content.propOrderVehicleDTO.enrollDate, 'YYYY-MM-DD') : '' },
        { name: ['carOwnerDTO', 'carOwner'], value: res.content.propOrderVehicleDTO.carOwner || '' },
        { name: ['carOwnerDTO', 'carOwnerNature', 'value'], value: state.carOwnerDTO.carOwnerNature.data[0] },
        { name: ['carOwnerDTO', 'carOwnerIdNo'], value: res.content.propOrderVehicleDTO.carOwnerIdNo || '' },
        { name: ['carTypeDTO'], value: res.content.propOrderVehicleModelDTO || '' },
        // 车价报文
        { name: ['carPriceRequest', 'url'], value: carPriceRequest.url || '' },
        { name: ['carPriceRequest', 'request'], value: carPriceRequest.request || {} },
        { name: ['carPrice', 'actualValue'], value: res.content.propOrderVehicleDTO.actualValue || '' },
        { name: ['carPrice', 'carCountryNature'], value: res.content.propOrderVehicleDTO.carCountryNature || '' },
      ])
      // 上海特殊规则
      if (rootState.my.UserInfo.manageCode == '07000000') {
        commit('updateCarState', [
          { name: ['vehicleDTO', 'purchaseDate'], value: vehicleDTO.purchaseDate || state.vehicleDTO.purchaseDate },
          { name: ['vehicleDTO', 'enrollDate'], value: vehicleDTO.enrollDate || state.vehicleDTO.enrollDate }
        ])
      }
      // 号牌种类
      if (res.content.propOrderVehicleDTO.licenseType) {
        commit('updateCarState', [
          {
            name: ['licensePlateType', 'struct', 'value'], value: [...state.licensePlateType.struct.data, ...state.licensePlateType.struct.shangHaiData, ...state.licensePlateType.struct.motorcycle].filter(item => {
              return item.value == res.content.propOrderVehicleDTO.licenseType
            })[0]
          }
        ])
      }
      // 车险投保
      commit('updateCarState', [
        // 交强险
        { name: ['VehicleInsurance', 'switchChecked'], value: res.content.policyCI ? true : false },
        { name: ['compulsoryInsuranceStartDate'], value: res.content.policyCI && res.content.policyCI.startDate ? compCheck.timestampToTime(res.content.policyCI.startDate, 'YYYY-MM-DD HH:ii:ss') : "" },
        // 商业险
        { name: ['VehicleInsurance', 'switchChecked1'], value: res.content.policyBI ? true : false },
        { name: ['VehicleInsurance', 'active'], value: 2 },
        { name: ['commercialInsuranceStartDate'], value: res.content.policyBI && res.content.policyBI.startDate ? compCheck.timestampToTime(res.content.policyBI.startDate, 'YYYY-MM-DD HH:ii:ss') : "" },
        // 试算金额
        {
          name: ['tryCalculation'], value: {
            sumPremiumCI: res.content.policyCI ? (res.content.policyCI.premium || 0) * 1 - (res.content.policyCI.taxActual || 0) * 1 : 0,
            sumPayTax: res.content.policyCI && res.content.policyCI.taxActual ? res.content.policyCI.taxActual : 0,
            sumPremiumBI: res.content.policyBI && res.content.policyBI.premium ? res.content.policyBI.premium : 0,
            actualValue: res.content.propOrderVehicleDTO.actualValue || 0,
          }
        }
      ])

      // 试算还原
      let arrTemp = []
      let arr = JSON.parse(JSON.stringify(state.insuranceTypes)).map((item, index) => {
        if (res.content.policyBI && res.content.policyBI.policyRiskDTOList && res.content.policyBI.policyRiskDTOList.length) {
          for (let it of res.content.policyBI.policyRiskDTOList) {
            if (item.kindCode == it.riskCoreCode) {
              if ((it.riskCoreCode == '20A' || it.riskCoreCode == '21A') && !it.deductible) {
                it.deductible = '0'
              }
              item.checked = true
              item.disabled = false
              item.premium = it.premium
              item.amount = it.amount
              // console.log('item', item);
              // console.log('it', it);
              if (item.struct.type == "select") {
                for (let key of item.struct.data) {
                  if (item.kindCode == '20E1' || item.kindCode == '20E3' || item.kindCode == '20E4' || item.kindCode == '20E5') {
                    if (key.value == it.deductible) {
                      item.struct.value = key
                    }
                  } else if (item.kindCode == '20A' || item.kindCode == '21A') {
                    if (key.value == it.deductible) {
                      item.struct.value = key
                    }
                  } else if (item.kindCode == '20D4' || item.kindCode == '21D4') {
                    if (key.value == it.unitAmount) {
                      item.struct.value = key
                    }
                  } else if (key.value == it.amount) {
                    item.struct.value = key
                  }
                }
              }
              if (item.kindCode == '20A' || item.kindCode == '21A') {
                for (let key of item.struct.data) {
                  if (key.value == it.deductible) {
                    item.struct.value = key
                  }
                }
              }
              // 增值服务
              if (item.kindCode == '20Z1' || item.kindCode == '21Z1') {
                for (let key of item.struct.data) {
                  if (key.value == it.quantity) {
                    item.struct.value = key
                  }
                }
              }
              // 增值服务
              if (item.kindCode == '20Z2' || item.kindCode == '20Z3' || item.kindCode == '20Z4' || item.kindCode == '21Z2' || item.kindCode == '21Z3' || item.kindCode == '21Z4') {
                item.struct.value = it.quantity
              }
              // 副加险
              if (item.additional && item.additional.length) {
                arrTemp = arrTemp.concat(item.additional);
              }
            }
            // 副加险
            if (arrTemp.some(kindCode => { return item.kindCode == kindCode })) {
              item.disabled = false
            }
            // 增值服务
            if (arrTemp.length) {
              if (item.kindCode == '20Z1' || item.kindCode == '20Z2' || item.kindCode == '20Z3' || item.kindCode == '20Z4' || item.kindCode == '21Z1' || item.kindCode == '21Z2' || item.kindCode == '21Z3' || item.kindCode == '21Z4') {
                item.disabled = false
              }
            }
          }
        }
        if (res.content.policyCI) {
          for (let it of res.content.policyCI.policyRiskDTOList) {
            if (item.kindCode == it.riskCoreCode) {
              item.checked = true
              item.disabled = false
              item.premium = it.premium
            }
          }
        }
        return item
      });
      setTimeout(() => {
        commit('updateCarState', [
          { name: ['insuranceTypes'], value: arr }
        ])
      }, 100)

      // 保单号
      commit('updateCarState', [
        { name: ['policyNo', 'b'], value: res.content.policyBI && res.content.policyBI.policyNo ? res.content.policyBI.policyNo : '' }, // 商业险保单号
        { name: ['policyNo', 'c'], value: res.content.policyCI && res.content.policyCI.policyNo ? res.content.policyCI.policyNo : '' } // 交强险保单号
      ])

      // 补充信息
      // 投保人
      commit('updateCarState', [
        { name: ['applyInfoDTO', 'name'], value: res.content.orderAppntDTO.name || '' },
        { name: ['applyInfoDTO', 'idNo'], value: res.content.orderAppntDTO.idNo || '' },
        { name: ['applyInfoDTO', 'mobile'], value: res.content.orderAppntDTO.mobile || '' },
        // { name: ['applyInfoDTO', 'address'], value: res.content.orderAppntDTO.address || '' }
        { name: ['applyInfoDTO', 'phoneHolderName'], value: res.content.orderAppntDTO.phoneHolderName || '' },
        { name: ['applyInfoDTO', 'phoneHolderIdentifyNumber'], value: res.content.orderAppntDTO.phoneHolderIdentifyNumber || '' },
      ])
      // 被保人
      commit('updateCarState', [
        { name: ['insureInfoDTO', 'name'], value: res.content.policyInsuredDTOList[0].name || '' },
        { name: ['insureInfoDTO', 'idNo'], value: res.content.policyInsuredDTOList[0].idNo || '' },
        { name: ['insureInfoDTO', 'mobile'], value: res.content.policyInsuredDTOList[0].mobile || '' },
        // { name: ['insureInfoDTO', 'address'], value: res.content.orderAppntDTO.address || '' },
        { name: ['insureInfoDTO', 'phoneHolderName'], value: res.content.policyInsuredDTOList[0].phoneHolderName || '' },
        { name: ['insureInfoDTO', 'phoneHolderIdentifyNumber'], value: res.content.policyInsuredDTOList[0].phoneHolderIdentifyNumber || '' },

      ])
      commit('updateCarState', [
        { name: ['renewInsuranceQuery', 'checked'], value: true }
      ])


      // 车主证件起止日期
      if (res.content.propOrderVehicleDTO.carOwnerIDValidDateLongFlag) {
        // 证件起期
        commit('updateCarState', [{ name: ['propOrderVehicleDTO', 'carOwnerIDValidStartDate'], value: timestampToTime(res.content.propOrderVehicleDTO.carOwnerIDValidStartDate) }])
        if (res.content.propOrderVehicleDTO.carOwnerIDValidDateLongFlag == 1) {
          commit('updateCarState', [{ name: ['propOrderVehicleDTO', 'carOwnerIDValidEndDate'], value: "2999-12-31" }])
        } else {
          // 证件止期
          commit('updateCarState', [{ name: ['propOrderVehicleDTO', 'carOwnerIDValidEndDate'], value: timestampToTime(res.content.propOrderVehicleDTO.carOwnerIDValidEndDate) }])
        }
        // 是否永久
        commit('updateCarState', [{ name: ['propOrderVehicleDTO', 'carOwnerIDValidDateLongFlag'], value: res.content.propOrderVehicleDTO.carOwnerIDValidDateLongFlag }])
      }

      // 投保人证件起止日期
      if (res.content.orderAppntDTO.appntIDValidDateLongFlag) {
        // 证件起期
        commit('updateCarState', [{ name: ['orderAppntDTO', 'appntIDValidStartDate'], value: timestampToTime(res.content.orderAppntDTO.appntIDValidStartDate) }])

        if (res.content.orderAppntDTO.appntIDValidDateLongFlag == 1) {
          // 证件止期
          commit('updateCarState', [{ name: ['orderAppntDTO', 'appntIDValidEndDate'], value: "2999-12-31" }])
        } else {
          // 证件止期
          commit('updateCarState', [{ name: ['orderAppntDTO', 'appntIDValidEndDate'], value: timestampToTime(res.content.orderAppntDTO.appntIDValidEndDate) }])
        }
        // 是否永久
        commit('updateCarState', [{ name: ['orderAppntDTO', 'appntIDValidDateLongFlag'], value: res.content.orderAppntDTO.appntIDValidDateLongFlag }])
      }

      // 被保人证件起止日期
      if (res.content.policyInsuredDTOList[0].insuredIDValidDateLongFlag) {
        // 证件起期
        commit('updateCarState', [{ name: ['policyInsuredDTOList', 'insuredIDValidStartDate'], value: timestampToTime(res.content.policyInsuredDTOList[0].insuredIDValidStartDate) }])
        if (res.content.policyInsuredDTOList[0].insuredIDValidDateLongFlag == 1) {
          // 证件止期
          commit('updateCarState', [{ name: ['policyInsuredDTOList', 'insuredIDValidEndDate'], value: "2999-12-31" }])
        } else {
          // 证件止期
          commit('updateCarState', [{ name: ['policyInsuredDTOList', 'insuredIDValidEndDate'], value: timestampToTime(res.content.policyInsuredDTOList[0].insuredIDValidEndDate) }])
        }
        // 是否永久
        commit('updateCarState', [{ name: ['policyInsuredDTOList', 'insuredIDValidDateLongFlag'], value: res.content.policyInsuredDTOList[0].insuredIDValidDateLongFlag }])
      }

      /**
       * 续保数据回显
       */
      // 使用性质
      if (res.content.propOrderVehicleDTO.useNatureCode) {
        let useNatureCodeArr = state.useNatureCode.data.filter(item => { return item.value == res.content.propOrderVehicleDTO.useNatureCode })
        commit('updateCarState', [
          { name: ['useNatureCode', 'value'], value: useNatureCodeArr.length ? useNatureCodeArr[0] : { text: "", value: "" } },
        ])
      }
      // 车辆种类
      if (res.content.propOrderVehicleDTO.carKindCode) {
        let carKindCodeArr = state.carKindCode.data.filter(item => { return item.value == res.content.propOrderVehicleDTO.carKindCode })
        commit('updateCarState', [
          { name: ['carKindCode', 'value'], value: carKindCodeArr.length ? carKindCodeArr[0] : { text: "", value: "" } },
        ])
      }
      // 车辆类型
      if (res.content.propOrderVehicleDTO.vehicleCategory) {
        let vehicleCategoryArr = state.vehicleCategory.data.filter(item => { return item.value == res.content.propOrderVehicleDTO.vehicleCategory })
        commit('updateCarState', [
          { name: ['vehicleCategory', 'value'], value: vehicleCategoryArr.length ? vehicleCategoryArr[0] : { text: "", value: "" } },
        ])
      }
      // 车辆类型描述
      if (res.content.propOrderVehicleDTO.licenseCategory) {
        let licenseCategoryArr = state.licenseCategory.data.filter(item => { return item.value == res.content.propOrderVehicleDTO.licenseCategory })
        commit('updateCarState', [
          { name: ['licenseCategory', 'value'], value: licenseCategoryArr.length ? licenseCategoryArr[0] : { text: "", value: "" } },
        ])
      }

      // await dispatch('getClauses')
      // let biPrptenagesDTOList = state.biPrptenagesDTOList.map(item => {
      //   if (res.content.propOrderDTO && res.content.propOrderDTO.biPrptenages) {
      //     for (let it of JSON.parse(res.content.propOrderDTO.biPrptenages)) {
      //       if (it.type != 'trial' && item.clauseCode == it.clauseCode) {
      //         item.checkbox = true
      //         item.checked = true
      //         item.clausesContext = it.clausesContext
      //         item.context = it.context
      //         item.inputDataValue = it.inputDataValue
      //         item.inputField = it.inputField
      //         item.riskCode = it.riskCode
      //       }
      //     }
      //   }
      //   return item
      // })
      // let ciPrptenagesDTOList = state.ciPrptenagesDTOList.map(item => {
      //   if (res.content.propOrderDTO && res.content.propOrderDTO.ciPrptenages) {
      //     for (let it of JSON.parse(res.content.propOrderDTO.ciPrptenages)) {
      //       if (it.type != 'trial' && item.clauseCode == it.clauseCode) {
      //         item.checkbox = true
      //         item.checked = true
      //         item.clausesContext = it.clausesContext
      //         item.context = it.context
      //         item.inputDataValue = it.inputDataValue
      //         item.inputField = it.inputField
      //         item.riskCode = it.riskCode
      //       }
      //     }
      //   }
      //   return item
      // })
      // // 特约选择
      // commit('updateCarState', [
      //   { name: ['biPrptenagesDTOList'], value: biPrptenagesDTOList },
      //   { name: ['ciPrptenagesDTOList'], value: ciPrptenagesDTOList }
      // ])
    } else {
      commit('updateCarState', [
        { name: ['editInsurance'], value: 'NEW' }
      ])
      Toast(res.content.resultMessage || '暂无数据');
    }
    return res
  },
  async getPropCarProduct({ commit, state }, params) {
    let fuelType = sessionStorage.fuelType
    const res = await axios({
      url: API.API_GETPROPCARPRODUCT,
      method: "get",
      params: {
        fuelType
      }
    })
    if (res.content && res.code == 0) {
      commit('updateCarState', [
        {
          name: ['insuranceTypes'], value: res.content
        }
      ])
    }
  }
}

function timestampToTime(timestamp) {
  if (timestamp === 0 || timestamp == null) {
    return ''
  } else {
    var date = new Date(timestamp)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return Y + M + D
  }
}

export default actions
