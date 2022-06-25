/*
 * @Author: your name
 * @Date: 2020-09-29 15:00:15
 * @LastEditTime: 2020-12-14 10:05:49
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes\src\api\realvideo\addcase.js
 */
const mixins = {
  data: function () {
    return {
      CaseType:[],//案件类型
      CaseOpportunity:[],//作案时机
      CaseLevel:[],//危害程度
      CaseTarget:[],//侵犯目标
      CaseMethod:[],//作案手段
      CaseTool:[],//作案工具
    }
  },
  created() {

  },
  methods: {
    //案件类型
    getCaseType() {
      this.$http.get('sms/static/getTypeByCode?code=CaseType').then(res => {
        if (res.data.code == 200) {
            console.log('是否执行这个？');
          this.CaseType = res.data.data
        }
      })
    },
    //作案时机
    getCaseOpportunity() {
      this.$http.get('sms/static/getTypeByCode?code=CaseOpportunity').then(res => {
        if (res.data.code == 200) {
          this.CaseOpportunity = res.data.data
        }
      })
    },
    //危害程度
    getCaseLevel() {
      this.$http.get('sms/static/getTypeByCode?code=CaseLevel').then(res => {
        if (res.data.code == 200) {
          this.CaseLevel = res.data.data
        }
      })
    },
    //侵犯目标
    getCaseTarget() {
      this.$http.get('sms/static/getTypeByCode?code=CaseTarget').then(res => {
        if (res.data.code == 200) {
          this.CaseTarget = res.data.data
        }
      })
    },
    //作案手段
    getCaseMethod() {
      this.$http.get('sms/static/getTypeByCode?code=CaseMethod').then(res => {
        if (res.data.code == 200) {
          this.CaseMethod = res.data.data
        }
      })
    },
    //作案工具
    getCaseTool() {
      this.$http.get('sms/static/getTypeByCode?code=CaseTool').then(res => {
        if (res.data.code == 200) {
          this.CaseTool = res.data.data
        }
      })
    },
  }
};
export default mixins
