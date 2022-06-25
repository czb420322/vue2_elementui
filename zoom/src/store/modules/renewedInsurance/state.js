const state = () => ({
  tabActive: 0,
  car: {
    query: {
      frameNo: '',  //车架号
      licenseNo: '',  //车牌号
      handlerCode: '',  //业务员工号
      appntName: '',  //投保人姓名
      agreementNo: '',  //代理协议
      agencyChannelName: '',  //代理经济渠道名称
      renewalType: '',  //续保类型 0-可续保 1-应续保 2-已续保
      distributeFlag: '',  //分配标识 0-未认领 1-已认领 2-被分配
      riskMark: '',  //险种类型 0801-交强 0802-商业
      edDistanceDate: '',  //距终保日期
      edDistance: '',  //距终保日期天数
      currentDate: '',  //车架号
      currentDate: '',  //当前时间
      manageCode: '',  //管理机构
      actions: [
        { text: '车牌号' },
        { text: '投保人' },
        { text: '代理协议号' },
        { text: '代理经纪渠道' },
      ],
      actionsName: '车牌号'
    },
    renewalPagination: {
      loading: false,
      finished: false,
      pageSize: 10,
      currentPage: 1
    },
    renewalList: [],
    renewalDetail: {},
    renewalAllChecked: false,
  },
  noCar: {
    query: {
      frameNo: '',  //车架号
      riskName: '',  //险种名称
      handlerCode: '',  //业务员工号
      appntName: '',  //投保人姓名
      agreementNo: '',  //代理协议
      agencyChannelName: '',  //代理经济渠道名称
      renewalType: '',  //续保类型 0-可续保 1-应续保 2-已续保
      distributeFlag: '',  //分配标识 0-未认领 1-已认领 2-被分配
      riskMark: '',  //险种类型 11-健康险
      edDistanceDate: '',  //距终保日期
      edDistance: '',  //距终保日期天数
      currentDate: '',  //车架号
      currentDate: '',  //当前时间
      manageCode: '',  //管理机构
      actions: [
        { text: '投保人' },
        { text: '险种名称' },
        { text: '代理协议号' },
        { text: '代理经纪渠道' },
      ],
      actionsName: '投保人'
    },
    renewalPagination: {
      loading: false,
      finished: false,
      pageSize: 10,
      currentPage: 1
    },
    renewalList: [],
    renewalDetail: {},
    renewalAllChecked: false,
    use: false
  }
})

export default state
