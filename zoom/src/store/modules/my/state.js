const state = () => ({
  iDrill:0,//当前用户i钻（用来判断用户点击注销账号时有i钻就不让注销）
  UserInfo: {},
  decisionUnitValue: '', // 当前决策单元
  myDecisionUnit: [],  // 决策单元
  myagreementList: [], //代理协议号
  myShareagreementList: [], //代理协议号（分享转录专用）
  myBusinessList: [ // 业务来源
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
  ],
  loginNum: 0, // 登记短期登陆次数
  manageCode: '' // 机构号码
})
export default state
