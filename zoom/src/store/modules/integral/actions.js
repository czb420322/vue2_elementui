import axios from 'axios'
import API from './../../../api'
import { Toast } from 'vant'

const actions = {
  /**
   * 获取用户积分（结算积分、预积分）
   */
  async getIntegerPointUser({ commit }) {
    const res = await axios({
      url: API.API_GETINTEGERPOINTUSER,
      method: 'post',
      loading: 'false'
    });
    if (res.code == 0 && res.content.result == 0) {
      commit('updateState', [
        { name: ['pointNum'], value: res.content.data.pointNum || 0 },
        { name: ['prePointNum'], value: res.content.data.prePointNum || 0 },
      ])
    } else {
      Toast(res.content.resultMessage);
    }
  },
  /**
   * 获取用户积分（结算积分、预积分）
   */
  async exchangeIntegerPointUser({ dispatch, commit }) {
    const res = await axios({
      url: API.API_EXCHANGEINTEGERPOINTUSER,
      method: 'post',
    });
    Toast(res.content.resultMessage);
    if (res.code == 0 && res.content.result == 0) {
      dispatch('getIntegerPointUser')
    }
  },
  /**
   * 获取积分明细
   */
  async getPointIncomeByPage({ commit, state }, data) {
    const res = await axios({
      url: API.API_GETPOINTINCOMEBYPAGE,
      method: 'post',
      loading: 'true',
      data
    });
    if (res.code == 0 && res.content.result == 0) {
      commit('updateState', [
        { name: ['integralDetailed'], value: res.content.data.incomeInfoPageGrid.data || [] }
      ])
    } else {
      Toast(res.content.resultMessage);
    }
  },
  /**
   * 获取积分排行榜
   */
  async getPointRankByPage({ commit, state }, data) {
    const res = await axios({
      url: API.API_GETPOINTRANKBYPAGE,
      method: 'post',
      loading: 'false',
      data
    });
    if (res.code == 0 && res.content.result == 0) {
      commit('updateState', [
        { name: ['leagueTable'], value: res.content.data.rankInfoPageGrid.data || [] }
      ])
    } else {
      Toast(res.content.resultMessage);
    }
  },
}

export default actions
