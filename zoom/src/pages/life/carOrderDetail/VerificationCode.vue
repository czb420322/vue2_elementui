<template>
  <div class="VerificationCodePage">
    <van-dialog v-model="show" title="短信验证" show-cancel-button :before-close="beforeClose" :cancelButtonText="VerificationCodeNum ? VerificationCodeNum + '秒后重新获取' : '重发验证码'">
      <van-icon name="cross" size="22" @click="onCross" style="position: absolute; top: 15px;right: 15px;" />
      <div class="van-hairline--surround">
        <input v-model.trim="value" type="text" placeholder="请输入6位车险投保验证码" maxlength="6" oninput="value=value.replace(/[^\d]/g,'')">
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import compCheck from '../../../assets/js/util/comp-check';
export default {
  computed: {
    VerificationCodeTime: {
      get() {
        return this.$store.state.common.VerificationCodeTime
      },
      set(value) {
        this.$store.commit('common/updateState', [{ name: ['VerificationCodeTime'], value }])
      }
    }
  },
  data() {
    return {
      show: false,
      orderNo: '',
      value: '',
      VerificationCodeNum: 0
    };
  },

  created() {
  },
  methods: {
    async parentMsg(orderNo) {
      this.orderNo = orderNo
      this.value = ''
      // 重新发送短信
      const res = await this.$store.dispatch('order/sendMobileVerificationCode', { orderNo })
      if (res.code == 0 && res.content.result == 0) {
        this.show = true
        this.VerificationCodeTime = compCheck.transformDatesTimetamp()
        this.VerificationCodeNum = 0
        this.setTimeoutVerificationCode()
      }
    },
    setTimeoutVerificationCode() {
      var date = new Date(this.VerificationCodeTime)
      var date1 = new Date(compCheck.transformDatesTimetamp())
      this.VerificationCodeNum = (date.getTime() + 300 * 1000 - date1.getTime()) / 1000
      setTimeout(() => {
        if (this.show && this.VerificationCodeNum > 0) {
          this.setTimeoutVerificationCode()
        } else {
          this.VerificationCodeTime = ''
        }
      }, 1000)
    },
    // 点击事件 - 备注按钮提示框
    beforeClose: function (action, done) {
      done(false) //不关闭弹框
      if (action === 'confirm') { // 确认
        if (this.value && this.value.length == 6) {
          this.saveMsg()
        } else {
          this.$toast('验证码格式不正确！');
        }
      } else if (action === 'cancel') { // 取消
        if (this.VerificationCodeNum <= 0) {
          this.parentMsg(this.orderNo)
        }
      }
    },
    // 提交验证码
    async saveMsg() {
      const res = await this.$axios({
        url: this.$API.API_SAVEMSG,
        method: 'post',
        data: {
          msgCode: this.value,
          orderNo: this.orderNo
        }
      });
      if (res.code == 0 && res.content.result == 0) {
        this.show = false
        this.$emit('click', this.orderNo);
      } else {
        this.$toast(res.content.resultMessage || '请求失败');
      }
    },
    onCross() {
      this.show = false
    }
  }
};
</script>

<style lang="less">
.VerificationCodePage {
  .van-hairline--surround {
    margin: 15px 20px;
    input {
      border: none;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 0.85rem;
      width: 100%;
    }
  }
}
</style>
