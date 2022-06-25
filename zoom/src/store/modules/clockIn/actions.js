import axios from 'axios'
import API from '../../../api'
import { Toast } from 'vant'

const actions = {
  /**
   * 考勤规则
   */
  async getRule({ commit, state }, params) {
    const res = await axios({
      url: API.API_ATTENDANCERULE,
      method: 'get',
    })
    if (res.code == 0) {
      if(res.content && res.content.length){
        let arr = res.content[0]
        arr.address = res.content.map(item => {
          return {
            address: item.address,
            addressLatitude: item.addressLatitude,
            addressLongitude: item.addressLongitude
          }
        })
        commit('updateState', [
          { name: ['attendanceRule'], value: arr},
        ])
      }
    } else {
      Toast(res.resultMessage || '查询规则失败');
    }
  },
  /**
   * 某天考勤记录
   */
  async getSomedayRecord({ commit, state }, date) {
    const res = await axios({
      url: API.API_GETSOMEDAYRECORD,
      method: 'get',
      params: {
        date
      }
    })
    if (res.code == 0) {
      commit('updateState', [
        { name: ['atWorkRecord'], value: res.content.atWorkRecord || {} },
        { name: ['offWorkRecord'], value: res.content.offWorkRecord || {} },
      ])
    } else {
      Toast(res.resultMessage || '查询规则失败');
    }
  }
}

export default actions
