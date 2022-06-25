<template>
  <div>
    <div class="page-group">

      <div class="page page-current">
        <div class="content login-content login-back" :style="{ 'min-height' : pageHeight + 'px' }">
          <!-- <div class="login-banner">
            <div>
              <img src="./../../../public/img/login/logo-icon.png">
            </div>
          </div> -->
          <img class="login_top_logo" src="./../../../public/img/login/top-ellipse.png" alt="">
          <div class="content-box">
            <!-- <img class="top-ellipse" src="./../../../public/img/login/top-ellipse.png" alt="">
            <img class="botton-ellipse" src="./../../../public/img/login/bottom-ellipse.png" alt=""> -->

            <div class="list-block login-list-block login-lisl">
              <ul class="login-list-ul">
                <li>
                  <div class="item-content h5-item-content">
                    <div class="item-inner h5-item-inner">
                      <div class="item-input">
                        <input type="tel" placeholder="请输入您手机号" v-model.trim="pageData.loginInfo.mobile">
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content h5-item-content">
                    <div class="item-inner h5-item-inner">
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
                <li>
                  <div class="item-content h5-item-content">
                    <div class="item-inner h5-item-inner">
                      <div class="item-input">
                        <input type="password" placeholder="请输入密码" v-model.trim="pageData.loginInfo.password">
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content h5-item-content">
                    <div class="item-inner h5-item-inner">
                      <div class="item-input">
                        <input type="tel" placeholder="请输入推荐人手机号（非必填）" v-model.trim="pageData.loginInfo.recommendMobile">
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="content-block login-content-block">
              <p><a class="login-bottom" :class="{'disabled' :pageData.isLoginIng}" @click="loginUp()">注 册</a></p>
            </div>

            <div class="content-block login-content-block">
              <router-link class="register" to="login">已有账号，马上登录</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import validator from '../../assets/js/util/validator';
import util from '../../assets/js/util/util';
import MD5 from 'js-md5';
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
          recommendMobile: '',
          password: ''
        }
      },
      pageHeight: 0,
      result: '0'
    };
  },
  created(){
    this.pageHeight = document.documentElement.clientHeight;
  },

  watch: {
    'pageData.loginInfo.code': function (val) {
      this.pageData.isLoginIng = false;
    }
  },
  methods: {
    //注册
    async loginUp() {
      if (!validator.isMobile(this.pageData.loginInfo.mobile, "手机号码格式有误")) {
        return;
      }
      if ( this.result != '2' ) {
        if( !validator.isEmpty(this.pageData.loginInfo.smsCode, "请先发送短信验证码")){
          return;
        }
      }
      if (!validator.isPassword(this.pageData.loginInfo.password, "密码格式有误")) {
        return;
      }
      if ( this.pageData.loginInfo.mobile === this.pageData.loginInfo.recommendMobile ) {
        this.$toast('推荐人手机号和注册手机号不能相同');
        return;
      }
      const res = await this.$axios({
        url: this.$API.API_ACCOUNT_REGISTER,
        method: 'post',
        data: {
          mobile: this.pageData.loginInfo.mobile,
          smsId: this.pageData.loginInfo.smsId,
          smsCode: this.pageData.loginInfo.smsCode,
          password: this.pageData.loginInfo.password,
          recommendMobile: this.pageData.loginInfo.recommendMobile,
          type: sessionStorage.getItem('type'),
          system: sessionStorage.getItem('system')
        },
        liqiang: 'liqiang'
      });

      if (res.code === 0 && res.content.result === '0') {
        this.$toast('注册成功');
        localStorage.setItem('agentCode', res.content.agentCode || '');
        localStorage.setItem('token', res.content.token || '');
        localStorage.setItem('refreshToken', res.content.refreshToken || '');
        localStorage.setItem('tokenTime', Date.now());
        if (null == util.getRedirectUrl() || "" == null == util.getRedirectUrl()) {
          this.$router.push({ name: 'home' });
        } else {
          util.goPage(util.getRedirectUrl());
        }
      }else{
        this.$toast(res.content.resultMessage);
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
        url: this.$API.API_VERIFY_SMSCODE,
        method: 'post',
        data: {
          sign: '1',
          mobile: mobile,
          operateType: "smslogin",
          thirdToken: util.getThird(),
          type: sessionStorage.getItem('type'),
          system: sessionStorage.getItem('system')
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
    }
  },
  // 销毁监听
  destroyed() {
    clearInterval(window.setTimeLoginObj);
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/less/app/login/login.less';
</style>
