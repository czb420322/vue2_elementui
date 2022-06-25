const state = () => ({
  msId: '',  // 店铺加密ID
  shopCloseMessage: '',  // 店铺关闭提示
  shopInfo: {
    productTypeList: []
  },  // 微信信息
  productInfoList: [],  // 微店产品库
  banner: [
    {
      "imageUrl": "/rbt-h5/img/page/shop/WechatIMG2.jpeg",
      "linkUrl": "activity",
      "loaction": true,
      "type": true,
      "mark": ""
    }
  ],
  articleList: [],  // 保险资讯列表
  preview: false,  // 店铺是否预览
  order: {
    waitPay: 0,  // 待付款
    acceptInsure: 0,  // 已承保
    expiryClose: 0,  // 已关闭
    active: 0,
  }
})

export default state
