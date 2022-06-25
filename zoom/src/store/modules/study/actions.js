import axios from 'axios'
import API from './../../../api'
import { Toast } from 'vant'

const actions = {
  /**
   * 分类
   */
  async getStudyColumnList({ commit, state }, params) {
    if (state.tree.length) {
      return false
    }
    const res = await axios({
      url: API.API_GETSTUDYCOLUMNLIST,
      method: 'post',
      loading: 'false',
      data: {
        status: "1",
        ...params
      }
    });
    if (res.code == 0 && res.content.result == 0 && res.content.data && res.content.data.length) {
      let arr = res.content.data.filter(item => {
        item.children = []
        return item.level == 1
      })
      for (let item of arr) {
        for (let it of res.content.data) {
          if (it.level == 2 && it.parentId && item.id == it.parentId) {
            item.children.push(it)
          }
        }
      }
      commit('updateState', [
        { name: ['tree'], value: arr }
      ])
    } else {
      Toast(res.content.resultMessage);
    }
  },
  /**
   * 轮播图
   */
  async getStudyBannerList({ commit }) {
    const res = await axios({
      url: API.API_GETSTUDYBANNERLIST,
      method: 'post',
      loading: 'false',
      data: {
        positionType: "1",
        status: "1"
      }
    });
    if (res.code == 0 && res.content.result == 0) {
      commit('updateState', [
        { name: ['banner'], value: res.content.data || [] }
      ])
    } else {
      Toast(res.content.resultMessage);
    }
  }
}

export default actions
