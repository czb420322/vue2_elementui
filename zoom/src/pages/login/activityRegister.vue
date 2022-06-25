<template>
  <div class="recommendRegisterPage" :style="{'height' : pageHeight + 'px'}">
    <van-swipe ref="swipe" :show-indicators="false" :loop="false" style="height: 100%;" vertical>
      <van-swipe-item>
        <img class="next-btn" @click="goNext" src="../../../public/img/login/next_icon.png" alt="">
        <div class="bg"></div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="content login-content bg" @click="showRegisteFrom = true" :style="{'height' : pageHeight + 'px'}">
          <div class="registeFrom" v-if="showRegisteFrom" >
            <div class="content-box">
              <div class="list-block login-list-block login-lisl">
                <ul class="login-list-ul">
                  <li>
                    <div class="item-content h5-item-content">
                      <div class="item-inner h5-item-inner">
                        <div class="item-input">
                          <input type="tel" placeholder="请输入您手机号" @input="isRegister" v-model.trim="pageData.loginInfo.mobile">
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content h5-item-content">
                      <div class="item-inner h5-item-inner h5-item-inner_">
                        <div class="item-input">
                          <input type="text" placeholder="请输入验证码" v-model.trim="pageData.loginInfo.smsCode">
                        </div>
                        <div class="login-validate-code">
                          <a class="button button-customer-h5 button-fill button-customer-verificode" @click="sendCode">
                            <template v-if="!pageData.sendDisabled">
                              获取验证码
                            </template>
                            <template v-if="pageData.sendDisabled">
                              {{'重新获取('+pageData.time+')'}}
                            </template>
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="content-block login-content-block" style="padding: 0!important">
                <p><a class="login-bottom" :class="{'disabled' :pageData.isLoginIng}" @click="loginUp()">立即参与</a></p>
              </div>
              <!-- <div class="content-block login-content-block">
                <router-link class="register" to="register">分享</router-link>
              </div> -->
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import validator from '../../assets/js/util/validator';
import util from '../../assets/js/util/util';
import MD5 from 'js-md5';
import configJs from '../../config.js';
import common from '../../assets/js/util/common';
export default {
  data() {
    return {
      page: {
        autoloader: true
      },
      pageData: {
        isLoginIng: false, //是否正在更新
        sendDisabled: false,
        time: 60,
        loginInfo: {
          mobile: '',
          smsId: '',
          smsCode: '',
          recommendMobile: ''
        }
      },
      pageHeight: 0,
      pageBg: '',
      result: '0',
      showRegisteFrom: false
    };
  },
  created() {
    if(this.$route.query.shareTitle){ document.title = this.$route.query.shareTitle; }
    this.pageHeight = document.documentElement.clientHeight;
    this.pageBg = this.$route.query.bg;
    sessionStorage.shareInfo = JSON.stringify({
      agentCode: this.$route.query.agentCode,
      agentId: this.$route.query.agentId,
      activityId: this.$route.query.activityId
    });
    sessionStorage.shareCode = this.$route.query.code;
    common.getCode("活动");
  },
  methods: {
    //注册
    async loginUp() {
      if (!validator.isMobile(this.pageData.loginInfo.mobile, "手机号码格式有误")) {
        return;
      }
      if (this.result != '2') {
        if (!validator.isEmpty(this.pageData.loginInfo.smsCode, "请先发送短信验证码")) {
          return;
        }
      }
      if (this.pageData.loginInfo.mobile === this.pageData.loginInfo.recommendMobile) {
        this.$toast('推荐人手机号和注册手机号不能相同');
        return;
      }
      const res = await this.$axios({
        url: this.$API.API_ACCOUNT_REGISTER,
        method: 'post',
        baseURL: 'false',
        data: {
          mobile: this.pageData.loginInfo.mobile,
          smsId: this.pageData.loginInfo.smsId,
          smsCode: this.pageData.loginInfo.smsCode,
          recommendMobile: this.pageData.loginInfo.recommendMobile,
          type: sessionStorage.getItem('type'),
          system: sessionStorage.getItem('system'),
          openId: sessionStorage.openId || '',
          agentCode: this.$route.query.agentCode || ''
        },
      });
      if (res.code === 0 && res.content.result === '0') {
        // 注册成功跳转到兑吧
        common.goAutologin(res.content.denseMobile, res.content.mobile, this.$route.query.code);
      } else {
        this.$toast(res.content.resultMessage);
      }
    },

    // 验证手机号码是否登录 
    async isRegister() {
      if (this.pageData.loginInfo.mobile.length == 11) {
        const res = await this.$axios({
          url: this.$API.API_ACCOUNT_VERIFICATION,
          method: 'post',
          baseURL: 'false',
          loading: 'false',
          data: {
            mobile: this.pageData.loginInfo.mobile
          },
        });
        if (res.code === 0 && res.content.result === '0') {
          // 注册成功跳转到兑吧
          common.goAutologin(res.content.denseMobile, res.content.mobile, this.$route.query.code);
        }
      }
    },

    // 获取验证码
    async sendCode() {
      var _this = this;
      var mobile = this.pageData.loginInfo.mobile;
      if (this.pageData.sendDisabled) {
        return;
      }
      if (!validator.isEmpty(mobile, "手机号不能为空")) {
        return;
      }
      if (!validator.isMobile(mobile, "手机号码格式有误")) {
        return;
      }
      const res = await this.$axios({
        url: this.$API.API_VERIFY_SMS,
        method: 'post',
        baseURL: 'false',
        data: {
          mobile: mobile,
          operateType: "smslogin",
          thirdToken: util.getThird(),
          type: sessionStorage.getItem('type'),
          system: 'bbwc'
        }
      });
      this.result = res.content.result;
      if (res.code === 0 && res.content.result === '0') {
        this.pageData.loginInfo.smsId = res.content.smsId;
        this.pageData.sendDisabled = true;
        this.$toast(`验证码已发送至您的手机${res.content.mobileStar}`);
        window.setTimeLoginObj = window.setInterval(() => {
          if ((this.pageData.time--) <= 0) {
            this.pageData.time = 60;
            this.pageData.sendDisabled = false;
            clearInterval(window.setTimeLoginObj);
          }
        }, 1000);
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
    goNext() {
      this.$refs.swipe.next();
    }
  },
  // 销毁监听
  destroyed() {
    clearInterval(window.setTimeLoginObj);
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/less/app/login/recommendRegister.less';
@import '../../assets/less/app/login/activityRegister.less';
</style>