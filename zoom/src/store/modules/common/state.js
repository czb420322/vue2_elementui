import insuranceTypes from '../car/insuranceTypes.json'
const state = () => ({
  manageVersion: '000000',//全国版
  platForm: '',
  wxOpenid: '',
  wxUserInfo: {},
  versionList: [], // 专版入口列表
  VerificationCodeTime: '', // 短信验证码时间
  isCheckFlag:'',//区分永创保微信公众号只有代理人才能在永创保进行登录和出单等操作功能；
  productJson: insuranceTypes,
})

export default state
