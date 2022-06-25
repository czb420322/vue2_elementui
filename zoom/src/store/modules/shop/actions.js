import axios from 'axios'
import API from './../../../api'
import { Toast } from 'vant'

const actions = {
  /**
   * 微店信息
   */
  async getShopInfo({ commit, state }, params) {
    const res = await axios({
      url: API.API_SELAGENTMIRCOSHOP,
      method: 'post',
      loading: !state.shopInfo.msName ? 'true' : 'false'
    })
    if (res.result == 0) {
      commit('updateState', [
        { name: ['shopInfo'], value: res.content.mircoShopInfo || { productDTOList: [] } },
        { name: ['shopCloseMessage'], value: '' }
      ])
    } else {
      Toast(res.resultMessage || '店铺信息查询失败');
    }
  },
  /**
   * 微店信息
   */
  async getShopInfoMsId({ commit, state }, data) {
    const res = await axios({
      url: API.API_SELAGENTMIRCOSHOPBYMSID,
      method: 'post',
      loading: !state.shopInfo.msName ? 'true' : 'false',
      data
    })
    if (res.result == 0) {
      commit('updateState', [
        { name: ['shopInfo'], value: res.content.mircoShopInfo || { productDTOList: [] } },
        { name: ['shopCloseMessage'], value: '' }
      ])
    } else if (res.result == 2) {
      commit('updateState', [
        { name: ['shopCloseMessage'], value: res.resultMessage }
      ])
    } else {
      Toast(res.resultMessage || '店铺信息查询失败');
    }
  },
  /**
   * 修改微店信息
   */
  async editShopInfo({ commit, state }, data) {
    const res = await axios({
      url: API.API_ADDORUPDATEMIRCOSHOP,
      method: 'post',
      data
    });
    if (res.result == 0) {
      Toast('修改成功')
      commit('updateState', [
        { name: ['shopInfo'], value: res.content.mircoShopInfo }
      ])
      setTimeout(() => {
        window.history.go(-1)
      },1200)
    } else {
      Toast(res.resultMessage);
    }
  },
  /**
   * 查询微店产品库信息
   */
  async queryMircoShopProductLibrary({ commit, state }, data) {
    const res = await axios({
      url: API.API_QUERYMIRCOSHOPPRODUCTLIBRARY,
      method: 'post',
      loading: 'false',
      data
    });
    if (res.result == 0) {
      commit('updateState', [
        { name: ['productInfoList'], value: res.content.productInfoList }
      ])
    } else {
      Toast(res.resultMessage);
    }
  },
  /**
   * 批量调整产品列表
   */
  async modifyMircoShopProductList({ commit, state }, data) {
    const res = await axios({
      url: API.API_MODIFYMIRCOSHOPPRODUCTLIST,
      method: 'post',
      loading: 'false',
      data
    });
    if (res.result == 0) {
      Toast('修改成功')
      setTimeout(() => {
        window.history.go(-1)
      },1200)
    } else {
      Toast(res.resultMessage);
    }
  },
  /**
   * 批量调整产品类型列表
   */
  async modifyMircoShopProductTypeList({ dispatch, commit, state }, data) {
    const res = await axios({
      url: API.API_MODIFYMIRCOSHOPPRODUCTTYPELIST,
      method: 'post',
      loading: 'false',
      data
    });
    if (res.result == 0) {
      Toast('修改成功')
      setTimeout(() => {
        window.history.go(-1)
      },1200)
    } else {
      Toast(res.resultMessage);
    }
  },
  /**
   * 获取所有保险资讯列表
   */
  async getSelStudyArticleList({ dispatch, commit, state }, data) {
    const res = await axios({
      url: API.API_SELSTUDYARTICLELIST,
      method: 'post',
      loading: 'false',
      data
    });
    if (res.result == 0) {
      commit('updateState', [
        { name: ['articleList'], value: res.content.list }
      ])
    } else {
      Toast(res.resultMessage);
    }
  },
  /**
   * 批量调整微店资讯列表
   */
  async modifyMircoShopNewsList({ dispatch, commit, state }, data) {
    const res = await axios({
      url: API.API_MODIFYMIRCOSHOPNEWSLIST,
      method: 'post',
      loading: 'false',
      data
    });
    if (res.result == 0) {
      Toast('修改成功')
      setTimeout(() => {
        window.history.go(-1)
      },1200)
    } else {
      Toast(res.resultMessage);
    }
  },
  /**
   * 校验产品是否已加入微店
   */
  async checkProductIsExistInMircoShop({ dispatch, commit, state }, data) {
    const res = await axios({
      url: API.API_CHECKPRODUCTISEXISTINMIRCOSHOP,
      method: 'post',
      loading: 'false',
      data
    });
    return res.content && res.content.existFlag ? res.content.existFlag : '0'
  },
  /**
   * 微店添加、删除单个产品
   */
  async setMircoShopProduct({ dispatch, commit, state }, data) {
    const res = await axios({
      url: data.isAddShop == '0' ? API.API_ADDMIRCOSHOPPRODUCT : API.API_DELMIRCOSHOPPRODUCT,
      method: 'post',
      data: {
        productCode: data.productCode
      }
    });
    Toast(res.resultMessage || '请求出错')
  }
}

export default actions
