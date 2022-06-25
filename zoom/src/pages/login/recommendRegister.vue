<template>
  <div class="recommendRegisterPage">  
    <div class="page-group">
      <div class="page page-current">
        <div class="content login-content login-back" :style="{'height' : pageHeight + 'px', backgroundImage:'url(' + pageBg + ')'}" >
          <div class="content-box">
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
              </ul>
            </div>
            <div class="content-block login-content-block">
              <p v-if="activityCategory == '2'"><a class="login-bottom" :class="{'disabled' :pageData.isLoginIng}" @click="loginUp()">立即注册</a></p>
              <p v-else><a class="login-bottom" :class="{'disabled' :pageData.isLoginIng}" @click="loginUp()">立即参与</a></p>
            </div>
            <!-- <div class="content-block login-content-block">
              <router-link class="register" to="register">分享</router-link>
            </div> -->
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
      activityCategory: 1
    };
  },
  created(){
    if(this.$route.query.shareTitle){ document.title = this.$route.query.shareTitle; }
    this.pageHeight = document.documentElement.clientHeight;
    this.pageBg = this.$route.query.bg;
    this.activityCategory = this.$route.query.activityCategory;
    sessionStorage.shareInfo = JSON.stringify({
      agentCode: this.$route.query.agentCode,
      agentId: this.$route.query.agentId,
      activityId: this.$route.query.activityId
    });
    this.getCode();
  },
  methods: {
    getCode() {
      // 判断是否在微信中打开
        if (sessionStorage.getItem("openid") && sessionStorage.getItem("openid") != "undefined") {
          return false;
        }
        var code = this.getUrlParam('code') // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
        var local = window.location.href;
        if (code == null || code === '') {
          window.location.href = this.$WxUrlAuthorize(local)
        } else {
          console.log('document.URL', document.URL);
          console.log('code', code);
        }
    },
    	//获取地址栏的参数
	getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	},
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
      if ( this.pageData.loginInfo.mobile === this.pageData.loginInfo.recommendMobile ) {
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
          system: sessionStorage.getItem('system')
        },
      });
      if (res.code === 0 && res.content.result === '0') {
        // 注册成功跳转到兑吧
        common.goAutologin(res.content.denseMobile);
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
</style>
