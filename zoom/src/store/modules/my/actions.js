import axios from 'axios'
import API from './../../../api'
import { Toast } from 'vant'

const actions = {
  /**
   * 个人信息
   * agentType: 1 - 专员   2- 代理人  3-会员  4- 用户
   */
  async getUserInfo(context, loading) {
    const res = await axios({
      url: API.API_ACCOUNT_INFO,
      method: 'post',
      loading: loading ? 'true' : 'false'
    });
    if (res.code === 0) {
      context.commit('updataUserInfo', res.content);
      if (res.content.userCode) {
        localStorage.setItem('agentCode', res.content.userCode);
        localStorage.setItem('handlerCode', res.content.handlerCode)
        localStorage.setItem('handlerAgentOrgCode', res.content.handlerAgentOrgCode)
      }
      context.commit('updateState', [{ name: ['manageCode'], value: res.content.manageCode }])
    }
  },
  //分享车险下单时使用此接口获取个人信息
  async getWxInfo(context, data) {
    const res = await axios({
      url: API.API_WXINFO,
      method: 'post',
      loading: 'false',
      data:{
        sysId:data.sysId
      }
    });
    if (res.code === 0) {
      context.commit('updataUserInfo', res.content);
    }
  },
  /**
  * 决策单元
  * 
  */
  async getMyCarType(context, params) {
    let reserveCode, reserveNo
    if (!!params) {
      if (params.struct) {
        reserveCode = params.struct.value.agentCode
        reserveNo = params.struct.value.agreementNo
      }else if(context.state.myagreementList['1'][0]){
        reserveCode = context.state.myagreementList['1'][0].agentCode
        reserveNo = context.state.myagreementList['1'][0].agreementNo
      }
      }
        else {
              reserveCode = ''
               reserveNo = ''
    }


    const res = await axios({
      url: API.API_GETCARUNIT,
      method: 'post',
      loading: 'true',
      data: {
        agentCode: localStorage.handlerCode,
        reserve2: reserveCode || '', //代理协议
        reserve3: reserveNo || '', //代理协议带-   
      }
    });

    if (res.code == 0 && res.content.result == '0') {
      let data = JSON.parse(res.content.data)
      for (let item of data) {
        item.text = item.codeName
      }
      context.commit('mYupdataDecisionUnit', data);
    } else {
      Toast(res.content.resultMessage || '请求出错');
    }
  },
  /**
   * 代理协议号
   */
  async getMyAgreement(context, params) {
    let myBusinessList1 =[ // 业务来源
      {text: "直接业务", value: "0"},
      {text: "个人代理", value: "1"},
      {text: "专业代理", value: "2"},
      {text: "经纪业务—境内经纪", value: "4"},
      {text: "经纪业务—境外经纪", value: "5"},
      {text: "网上业务", value: "8"},
      {text: "兼业代理—银行代理", value: "9"},
      {text: "兼业代理-车行代理", value: "B"},
      {text: "兼业代理-寿代产代理", value: "C"},
      {text: "兼业代理—邮政代理", value: "D"},
      {text: "兼业代理—其他", value: "E"},
      {text: "专业代理-国任销售", value: "F"},
    ]
    let businessType;
    myBusinessList1.map(item => {
      if(params === item.text ) {
        businessType = String(item.value) 
      }

    })
    const res = await axios({
      url: API.API_AGREEMENT,
      method: 'get',
      params: {
        agentCode: localStorage.agentCode,
        searchType: '1',
        businessType: businessType
      }
    });
    if (res.code == 0 && res.content.result == '0') {
      let data = res.content.data
      context.commit('mYupdataAgreementList', data);
      
    }

  },
  /**
   * 代理协议号（分享转录专用）
   */
  async getShareMyAgreement(context) {
    const res = await axios({
      url: API.API_AGREEMENT,
      method: 'get',
      params: {
        agentCode: localStorage.agentCode,
        searchType: '1'
      }
    });

    if (res.code == 0 && res.content.result == '0') {
      let data = res.content.data
      // for( let item of data ){
      //   item.text = item.agreementNo + '-' +item.agentName 
      //   item.value = item.agentName
      // }
      context.commit('mYupdataList', data);
    }
  },
    // 特殊产品
    async getMyAgreementUnique(context, params) {
      let myBusinessList1 =[ // 业务来源
        {text: "直接业务", value: "0"},
        {text: "个人代理", value: "1"},
        {text: "专业代理", value: "2"},
        {text: "经纪业务—境内经纪", value: "4"},
        {text: "经纪业务—境外经纪", value: "5"},
        {text: "网上业务", value: "8"},
        {text: "兼业代理—银行代理", value: "9"},
        {text: "兼业代理-车行代理", value: "B"},
        {text: "兼业代理-寿代产代理", value: "C"},
        {text: "兼业代理—邮政代理", value: "D"},
        {text: "兼业代理—其他", value: "E"},
        {text: "专业代理-国任销售", value: "F"},
      ]
      let businessType;
      myBusinessList1.map(item => {
        if(params === item.text ) {
          businessType = String(item.value) 
        }
  
      })
      const res = await axios({
        url: API.API_AGREEMENT,
        method: 'get',
        params: {
          agentCode: localStorage.agentCode,
          searchType: '1',
          businessType: businessType,
          isExclusive:"Y"
        }
      });
      if (res.code == 0 && res.content.result == '0') {
        let data = res.content.data
        context.commit('mYupdataAgreementList', data);
        
      }
  
    },
  /**
   * 已核投保单注销
   */
  async orderLogout(context, data) {
    const res = await axios({
      url: API.API_ORDER_LOGOUT,
      method: 'post',
      data
    });
    return res
  },
  /**
   * 未核投保单删除
   */
  async delProposalUninsured(context, data) {
    const res = await axios({
      url: API.API_DELPROPOSALUNINSURED,
      method: 'post',
      data: {
        ...data,
        agentCode: localStorage.agentCode
      }
    });
    return res
  },
  /**
   * 当前决策单元
   */
  async getDecisionUnit({ commit }) {
    const res = await axios({
      url: API.API_MY_SEARCH,
      loading: 'false',
      method: 'get'
    });
    commit('updateState', [{ name: ['decisionUnitValue'], value: res.code == 0 && res.content && res.content.codeName ? res.content.codeName : '' }])
  }
}

export default actions
