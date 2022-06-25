const state = () => ({
  tree: [],
  active: 0,
  twoActive: 0,
  pagination: {
    currentPage: 1,  // 当前页
    pageSize: 5,  // 每页数量
    list: []
  },
  banner: [],
  sortType: {  // 排序规则：1-发布时间，2-阅读量，3-学习时间，4-收藏时间
    value: {
      text: '发布时间',
      value: 1
    },
    list: [
      {
        text: '发布时间',
        value: 1
      },
      {
        text: "阅读量",
        value: 2
      }
    ] // 01微信、02支付宝、03银行卡
  },
  personal: {
    active: 0,
    tabs: [
      {
        text: '最近学习',
        value: 1
      },
      {
        text: "我的收藏",
        value: 3
      }
    ]
  },
  loading: false
})

export default state
