import axios from 'axios'
import API from './../../../api'
import { router } from './../../../router'
import { Toast } from 'vant'
import CardBinName from '../../../assets/json/CardBinName'
import compCheck from '../../../assets/js/util/comp-check'
import configJs from './../../../config.js'
import store from './../../../store';

const actions = {
  /**
   * 通过银行卡号再获取银行名称
   */
  async getCardBin(context, params) {
    const res = await axios({
      url: `https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=${params.cardNo}&cardBinCheck=true`,
      method: 'get',
      loading: 'false'
    });
    if (res.bank) {
      return CardBinName[res.bank] || ""
    }
    return ""
  },
  /**
   * 埋点
   */
  async goCollectLog({ rootState, dispatch, commit, state }, params) {
    const res = await axios({
      url: API.API_COLLECTLOG,
      method: 'post',
      loading: 'false',
      data: {
        eventAttributes: {
          ...params.eventAttributes,
          OrgCode: rootState.my.UserInfo.OrgCode || '',  // 出单机构
          manageCode: rootState.my.UserInfo.manageCode || ''  // 二级机构
        },
        ...params.data,
        operateDate: compCheck.transformDatestamp(),
        operateTime: compCheck.transformDatesTimetamp(),
        provider: localStorage.agentCode,
        durations: "20",
        eventDurations: "10"
      }
    });
  },
  // 微信授权
  async authorizeWxJsSdk() {
    let local = location.href.split('#')[0]
    var time = Date.parse(new Date()).toString();//获取到毫秒的时间戳，精确到毫秒
    time = time.substr(0, 10);//精确到秒
    const res = await axios({
      url: API.API_GETWECHATACCOUNTJSSDKINFO,
      method: "get",
      loading: "false",
      params: {
        url: local,
        time: time
      }
    });
    wx.config({
      debug: false,
      appId: configJs.APPID,
      timestamp: res.content.timestamp,
      nonceStr: res.content.noncestr,
      signature: res.content.signature,
      jsApiList: ['checkJsApi',
        'getNetworkType',//网络状态接口
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'chooseImage',
        'uploadImage',
        'getLocalImgData'
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    //初始化jsapi接口 状态
    wx.error(function (res) {
      alert("调用微信jsapi返回的状态:" + res.errMsg);
    });
    return res
  },

  /**
   * 微信授权获取 openid
   */
  async getWxUserInfo({ dispatch, commit }) {
    if (!compCheck.getUrlParam('code')) {
      return false
    }
    const res = await axios({
      url: API.API_WX_GETUSERINFO,
      method: 'post',
      loading: 'false',
      data: {
        code: compCheck.getUrlParam('code'),
        type: "wx",
        system: "jk"
      }
    });
    if (res.content && res.content.data && res.content.data.openid) {
      dispatch('getWeChatUserInfo', res.content.data.openid)
    }
  },
  /**
   * 查询微信用户信息
   */
  async getWeChatUserInfo({ commit }, openId) {
    const res = await axios({
      url: API.API_WX_GETWECHATUSERINFO,
      method: 'get',
      loading: 'false',
      params: {
        openId
      }
    });
    if (res.content && res.content && res.content.openid) {
      commit('updateState', [
        { name: ['wxOpenid'], value: res.content.openid },
        { name: ['wxUserInfo'], value: res.content }
      ])
    }
  },
  /**
   * 报错信息提交
   * {
      "erroTime":"报错时间",
      "projectName":"工程名称（后端工程名称、前端版本名称）",
      "pageTitle":"前端页面标题",
      "h5ReqParam":"前端请求参数",
      "h5ReqUrl":"前端请求地址",
      "errorType":"错误类型（1-请求超时；2-请求报错；3-系统异常；4-后台日志异常）",
      "errorContent":"错误信息"
    }
   */
  async goErrorlogAdd({ rootState, dispatch, commit, state }, params) {
    const res = await axios({
      url: API.API_ERRORLOG,
      method: 'post',
      loading: 'false',
      data: {
        erroTime: compCheck.transformDatesTimetamp(),
        pageTitle: document.title,
        projectName: '前端版本',
        ...params
      }
    });
  },
  /**
   * 专版列表
   */
  async getVersionList({ commit, state }) {
    const res = await axios({
      url: API.API_FACTORYCONFIG,
      method: 'get',
      loading: state.versionList.length ? 'false' : 'true',
      params: {
        code: 'C0001'
      }
    });
    if (res.code == 0 && res.content.result == '0') {
      commit('updateState', [
        { name: ['versionList'], value: res.content.data || []},
      ])
    } else {
      Toast(res.content.resultMessage);
    }
  },
   /**
   * 分享埋点
   */
    async goShareRecord({commit}, params) {
      const res = await axios({
        url: API.API_SAVESHAREOPERATECLIENT,
        method: 'post',
        loading: 'false',
        data: {
          manageVersion: store.state.common.manageVersion,
          shareChannel:'0', //shareChannel 分享渠道;0-公众号 1-APP
          shareType:'0', //shareType 分享类型:0-分享;1-分享转录模式(不用区分分享转录) 
          ...params,
        }
      });
    },

    async getPropCarProduct({commit},params){
      const res = await axios({
        url: API.API_GETPROPCARPRODUCT,
        method:"post",
        
      })
    }
}

export default actions
