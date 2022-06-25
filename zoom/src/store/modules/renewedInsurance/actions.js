import axios from 'axios'
import API from './../../../api'
import compCheck from '../../../assets/js/util/comp-check';
import { Toast } from 'vant'
let renewalListLoad = false, noCarRenewalListLoad = false

const actions = {
  /**
   * 续保列表
   */
  async getRenewalList({ commit, state }) {
    if (!renewalListLoad) {
      let query = state.car.query
      renewalListLoad = true
      const res = await axios({
        url: API.API_RENEWALLIST,
        method: 'post',
        loading: 'false',
        data: {
          handlerCode: localStorage.agentCode,
          licenseNo: query.actionsName == query.actions[0].text ? query.licenseNo : '', // 车牌号
          appntName: query.actionsName == query.actions[1].text ? query.appntName : '', // 投保人姓名
          agreementNo: query.actionsName == query.actions[2].text ? query.agreementNo : '', //代理协议
          agencyChannelName: query.actionsName == query.actions[3].text ? query.agencyChannelName : '', //代理经济渠道名称
          distributeFlag: query.distributeFlag, // 分配标识 
          renewalType: query.renewalType, // 续保类型
          riskMark: query.riskMark, // 续保类型
          endDate:query.endDate,// 终保日期
          underwriteEndDate:query.underwriteEndDate,//核保日期
          // edDistance: query.edDistance ? query.edDistance : query.endDate ? compCheck.getDistanceDate(query.endDate) : '90', // 距终保日期天数
          pageSize: state.car.renewalPagination.pageSize,
          currentPage: state.car.renewalPagination.currentPage
        }
      });
      renewalListLoad = false
      commit('updateState', [
        { name: ['car', 'renewalPagination', 'loading'], value: false },
        { name: ['car', 'renewalAllChecked'], value: false }
      ])
      if (res.code == 0 && res.content.result == '0') {
        if (res.content.data && res.content.data.length) {
          res.content.data.forEach(item => {
            item.detailInfo.allocationStatus = item.baseInfo.allocationStatus
            item.detailInfo.claimStatus = item.baseInfo.claimStatus
            item.detailInfo.renewType = item.baseInfo.renewType
            item.detailInfo.renewFlag = item.baseInfo.renewFlag
            item.detailInfo.tableId = item.baseInfo.tableId
            item.detailInfo.isOperate = item.baseInfo.isOperate
            item.detailInfo.allocationLimtDays = item.baseInfo.allocationLimtDays || ''
            item.checked = false
          })
          commit('updateState', [
            { name: ['car', 'renewalList'], value: state.car.renewalList.concat(res.content.data) },
            { name: ['car', 'renewalPagination', 'currentPage'], value: state.car.renewalPagination.currentPage + 1 }
          ])
        }
        if (!res.content.data || res.content.data.length < 10) {
          commit('updateState', [
            { name: ['car', 'renewalPagination', 'finished'], value: true }
          ])
        }
      } else {
        Toast(res.content.resultMessage || res.message || '请求失败');
        commit('updateState', [
          { name: ['car', 'renewalPagination', 'finished'], value: true }
        ])
      }
    }
  },
  /**
   * 续保列表 非车险
   */
  async getRenewInfo({ commit, state }) {
    if (!noCarRenewalListLoad) {
      let query = state.noCar.query
      noCarRenewalListLoad = true
      const res = await axios({
        url: API.API_GETRENEWINFO,
        method: 'post',
        loading: 'false',
        data: {
          handlerCode: localStorage.agentCode,
          appntName: query.actionsName == query.actions[0].text ? query.appntName : '', // 投保人姓名
          riskName: query.actionsName == query.actions[1].text ? query.riskName : '', // 险种名称
          agreementNo: query.actionsName == query.actions[2].text ? query.agreementNo : '', //代理协议
          agencyChannelName: query.actionsName == query.actions[3].text ? query.agencyChannelName : '', //代理经济渠道名称
          distributeFlag: query.distributeFlag, // 分配标识 
          renewalType: query.renewalType, // 续保类型
          riskCateGory: query.riskMark, // 续保类型
          endDate:query.endDate,// 终保日期
          underwriteEndDate:query.underwriteEndDate,//核保日期
          // edDistance: query.edDistance ? query.edDistance : query.edDistanceDate ? compCheck.getDistanceDate(query.edDistanceDate) : '', // 距终保日期天数
          pageSize: state.noCar.renewalPagination.pageSize,
          currentPage: state.noCar.renewalPagination.currentPage,
          edDistance: '30'
        }
      });
      noCarRenewalListLoad = false
      commit('updateState', [
        { name: ['noCar', 'renewalPagination', 'loading'], value: false },
        { name: ['noCar', 'renewalAllChecked'], value: false }
      ])
      if (res.code == 0 && res.content.result == '0') {
        if (res.content.data && res.content.data.length) {
          res.content.data.forEach(item => {
            item.checked = false
          })
          commit('updateState', [
            { name: ['noCar', 'renewalList'], value: state.noCar.renewalList.concat(res.content.data) },
            { name: ['noCar', 'renewalPagination', 'currentPage'], value: state.noCar.renewalPagination.currentPage + 1 }
          ])
        }
        if (!res.content.data || res.content.data.length < 10) {
          commit('updateState', [
            { name: ['noCar', 'renewalPagination', 'finished'], value: true }
          ])
        }
      } else {
        Toast(res.content.resultMessage || res.message || '请求失败');
        commit('updateState', [
          { name: ['noCar', 'renewalPagination', 'finished'], value: true }
        ])
      }
    }
  },
  /**
   * 续保认领
   */
  async renewalClaim({ dispatch, commit, state }, params) {
    let query = state.car.query
    const res = await axios({
      url: API.API_RENEWALCLAIM,
      method: 'post',
      data: {
        handlerCode: localStorage.agentCode,
        licenseNo: query.actionsName == query.actions[0].text ? query.licenseNo : '', // 车牌号
        appntName: query.actionsName == query.actions[1].text ? query.appntName : '', // 投保人姓名
        agreementNo: query.actionsName == query.actions[2].text ? query.agreementNo : '', //代理协议
        agencyChannelName: query.actionsName == query.actions[3].text ? query.agencyChannelName : '', //代理经济渠道名称
        distributeFlag: query.distributeFlag, // 分配标识 
        renewalType: query.renewalType, // 续保类型
        riskMark: query.riskMark, // 续保类型
        edDistance: query.edDistance ? query.edDistance : query.edDistanceDate ? compCheck.getDistanceDate(query.edDistanceDate) : '', // 距终保日期天数
        ...params
      }
    });
    return res
  },
  /**
   * 续保认领 非车险
   */
  async noCarRenewalClaim({ dispatch, commit, state }, params) {
    let query = state.car.query
    const res = await axios({
      url: API.API_NOCARRENEWALCLAIM,
      method: 'post',
      data: {
        handlerCode: localStorage.agentCode,
        licenseNo: query.actionsName == query.actions[0].text ? query.licenseNo : '', // 车牌号
        appntName: query.actionsName == query.actions[1].text ? query.appntName : '', // 投保人姓名
        agreementNo: query.actionsName == query.actions[2].text ? query.agreementNo : '', //代理协议
        agencyChannelName: query.actionsName == query.actions[3].text ? query.agencyChannelName : '', //代理经济渠道名称
        distributeFlag: query.distributeFlag, // 分配标识 
        renewalType: query.renewalType, // 续保类型
        riskMark: query.riskMark, // 续保类型
        edDistance: query.edDistance ? query.edDistance : query.edDistanceDate ? compCheck.getDistanceDate(query.edDistanceDate) : '', // 距终保日期天数
        ...params
      }
    });
    return res
  },
  /**
   * 放弃认领
   */
  async goCancelClaim({ dispatch, commit, state }, params) {
    let query = state.car.query
    const res = await axios({
      url: API.API_CANCELCLAIM,
      method: 'post',
      data: {
        handlerCode: localStorage.agentCode,
        ...params
      }
    });
    return res
  },
}

export default actions
