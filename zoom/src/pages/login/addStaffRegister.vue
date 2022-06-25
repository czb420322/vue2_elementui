<template>
  <div class="recommendRegisterPage addStaffRegisterPage">
      <div>
          <img class="bj_img" src="./../../../public/img/login/addStaffRegister_bg.jpg" width="100%" alt="">
      </div>
      
        <div class=" login-content login-back">
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
                <li>
                  <div class="item-content h5-item-content">
                    <div class="item-inner h5-item-inner">
                      <div class="item-input">
                        <input type="password" placeholder="请输入密码" v-model.trim="pageData.loginInfo.password">
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="content-block login-content-block">
              <p><a class="login-bottom" @click="loginUp()">立即注册</a></p>
            </div>
            <!-- <div class="content-block login-content-block">
              <router-link class="register" to="register">分享</router-link>
            </div> -->
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
        sendDisabled: false,
        time: 60,
        loginInfo: {
          mobile: '',
          smsId: '',
          smsCode: '',
          password: ''
        }
      },
      pageHeight: 0,
      result: '0',
      agentCode: '',
      agentId: '',
      activityId: '',
      manageVersion:''
    };
  },
  created() {
    this.manageVersion =  this.$route.query.manageVersion || ''
    if(this.$route.query.shareTitle){ document.title = this.$route.query.shareTitle; }
    this.pageHeight = document.documentElement.clientHeight;
    this.agentCode = this.$route.query.agentCode;
    this.agentId = this.$route.query.agentId;
    this.activityId = this.$route.query.activityId;
    sessionStorage.shareInfo = JSON.stringify({
      agentCode: this.$route.query.agentCode,
      agentId: this.$route.query.agentId,
      activityId: this.$route.query.activityId
    });
    common.getCode("增员");
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
      if (!validator.isPassword(this.pageData.loginInfo.password, "密码格式有误")) {
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
          type: sessionStorage.getItem('type'),
          system: sessionStorage.getItem('system'),
          agentCode: this.$route.query.agentCode || '',
          manageVersion:this.manageVersion || '000000'
        },
        liqiang: 'liqiang'
      });

      if (res.code === 0 && res.content.result === '0') {
        // 注册成功跳转到兑吧
        // common.goAutologin(res.content.denseMobile);
        // 注册成功跳转到下载
        this.$toast.success('注册成功');
        setTimeout(()=>{
          this.goPage('download');
        },1500);
      } else {
        this.$toast(res.content || res.content.resultMessage ? res.content.resultMessage : '请求出错');
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
        if( res.content.resultMessage == '手机号已注册'){
          this.$dialog.confirm({
            title: '提示',
            message: '当前手机号已注册，是否要下载APP',
          })
          .then(() => {
            // on confirm
            this.goPage('download');
          })
          .catch(() => {
            // on cancel
          });
        }else{
          this.$toast(res.content.resultMessage);
        }
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
@import '../../assets/less/app/login/addStaffRegister.less';
.login-back {
		.content-box {
			background-color: rgba(255, 255, 255, .77);
			position        : relative;
			position        : absolute;
			top             : 127vw;
			left            : 0;
			width           : 90%;
			margin          : 0 0 0 5%;
      border-radius   : 10px;
      background: #fff;

			.top-ellipse {
				display: block;
				width  : 100%;
			}

			.botton-ellipse {
				position: absolute;
				bottom  : 0;
				display : block;
				width   : 100%;
			}
		}
  }
  .login-bottom {
			width        : 100%;
			height       : 2.5rem;
			background   : #61A9FC;
			display      : block;
			line-height  : 2.5rem;
			text-align   : center;
			color        : white;
			font-size    : 1rem;
			border-radius: .3rem;
  }
  .bj_img{display: block;}
    


</style>
