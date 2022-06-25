import axios from 'axios'
import API from './../../../api'
import { Toast } from 'vant'
import store from './../../../store';
import util from '../../../assets/js/util/util';
const actions = {
  /**
   * 首页页面信息 
   */
  async getHomeInfo({ dispatch, commit, state }) {
    const res = await axios({
      url: API.API_HOME_INFO,
      method: 'get',
      loading: state.specialProductList.length ? 'false' : 'true',
      params: {
        type: sessionStorage.getItem('type'),
        system: sessionStorage.getItem('system'),
        manageVersion: store.state.common.manageVersion,
      }
    });
    if (res && res.code === 0 && res.content.result === '0') {
      console.log('123456')
      let loopPlayList = res.content.loopPlayList
      // if(store.state.my.UserInfo.agentType == '1'){ //专员展示的轮播图（mark等于1的是专员能看到，等于2是通用的 空不做任何处理）
      //   loopPlayList = loopPlayList ? loopPlayList.filter(item => { return item.mark == '1' || item.mark == '' }) : []
      // }else{
      //   loopPlayList = loopPlayList ? loopPlayList.filter(item => { return item.mark == '2' || item.mark == '' }) : []
      // }
      commit('updateState', [
        { name: ['loopPlayList'], value: loopPlayList },
        { name: ['specialProductList'], value: res.content.productList || [] },
        { name: ['homeCardList'], value: res.content.homeCardList || [] },
        { name: ['highlyRecommendedList'], value: res.content.highlyRecommendedList || [] }
      ])
    }
  }
}

export default actions
