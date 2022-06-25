import axios from 'axios'
import API from './../../../api'
import { Toast } from 'vant'

const actions = {
  /**
   * 重新发送短信
   */
  async sendMobileVerificationCode({ }, data) {
    const res = await axios({
      url: API.API_SENDMOBILEVERIFICATIONCODE,
      method: "post",
      data
    })
    Toast(res.content.resultMessage || res.message || '请求失败');
    return res
  }
}

export default actions
