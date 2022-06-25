<template>
  <div>
    <div class="page-group">
      <div class="page page-current">
        <div
          class="content login-content login-back"
          :style="{ 'min-height': pageHeight + 'px' }"
        >
          <van-icon
            @click="onClickLeft()"
            class="bt_left"
            name="arrow-left"
            color="#fff"
            size="20px"
            :style="{ 'margin-top': $iosSystem + 'px' }"
          />

          <!-- <div class="login-banner">
            <div>
              <img src="./../../../public/img/login/logo-icon.png">
            </div>
          </div> -->
          <!-- <img class="login_top_logo" src="./../../../public/img/login/top-ellipse.png" alt=""> -->

          <div class="content-box">
            <!-- <img class="top-ellipse" src="./../../../public/img/login/top-ellipse.png" alt=""> -->
            <!-- <img class="botton-ellipse" src="./../../../public/img/login/bottom-ellipse.png" alt=""> -->

            <div class="list-block login-list-block login-lisl">
              <ul class="login-list-ul">
                <li style="color: red; padding: 8px 10px 0 10px">
                  请设置您的账户密码,新密码长度需大于等于6,同时包含字母和数字
                </li>
                <!-- <li>
                  <div class="item-content h5-item-content">
                    <div class="item-inner h5-item-inner">
                      <div class="item-input">
                        <input
                          type="text"
                          placeholder="请输入工号"
                          v-model.trim="pageData.loginInfo.agentCode"
                        />
                      </div>
                    </div>
                  </div>
                </li> -->
                <li>
                  <div class="item-content h5-item-content">
                    <div class="item-inner h5-item-inner">
                      <div class="item-input">
                        <input
                          type="password"
                          placeholder="请输入新密码"
                          v-model.trim="pageData.loginInfo.password"
                          ref="newsPassword"
                        />
                        <img
                          class="password-img-show"
                          :src="
                            passwordFlog
                              ? passwordImgSrc.passwordImgSrcHide
                              : passwordImgSrc.passwordImgSrcShow
                          "
                          alt=""
                          @click="pwShow()"
                        />
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content h5-item-content">
                    <div class="item-inner h5-item-inner">
                      <div class="item-input">
                        <input
                          type="password"
                          placeholder="请再次输入新密码"
                          v-model.trim="pageData.loginInfo.newPassword"
                          ref="newsDeterminPassWord"
                        />
                        <img
                          class="password-img-show"
                          :src="
                            determinepwFlog
                              ? passwordImgSrc.passwordImgSrcHide
                              : passwordImgSrc.passwordImgSrcShow
                          "
                          alt=""
                          @click="detPwShow()"
                        />
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="content-block login-content-block">
              <p>
                <a
                  class="login-bottom"
                  :class="{ disabled: pageData.isLoginIng }"
                  @click="loginUp()"
                  >确认</a
                >
              </p>
            </div>

            <!-- <div class="content-block login-content-block">
              <router-link class="register" to="login">登录</router-link>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import validator from "../../assets/js/util/validator";
import passwordImgSrcShow from "../../assets/img/login/passwordShow.png";
import passwordImgSrcHide from "../../assets/img/login/passwordHide.png";

// import util from '../../assets/js/util/util';
// import configJs from '../../config.js';
// import MD5 from 'js-md5';
export default {
  data() {
    return {
      passwordImgSrc: {
        //密码显示隐藏
        passwordImgSrcShow: passwordImgSrcShow,
        passwordImgSrcHide: passwordImgSrcHide,
      },
      passwordFlog: true,
      determinepwFlog: true,
      page: {
        autoloader: true,
      },
      getagentCode: null,
      pageData: {
        isLoginIng: false, //是否正在更新
        loginInfo: {
          agentCode: "",
          password: "",
          newPassword: "",
        },
      },
      pageHeight: 0,
      result: "0",
    };
  },
  mounted() {
    this.pageData.loginInfo.agentCode =
      window.localStorage.getItem("agentCode");
  },
  // watch: {
  //   'pageData.loginInfo.code': function (val) {
  //     this.pageData.isLoginIng = false;
  //   }
  // },
  methods: {
    pwShow() {
      this.passwordFlog = !this.passwordFlog;
      if (this.passwordFlog) {
        this.$refs.newsPassword.type = "password";
      } else {
        this.$refs.newsPassword.type = "text";
      }
    },
    detPwShow() {
      this.determinepwFlog = !this.determinepwFlog;
      if (this.determinepwFlog) {
        this.$refs.newsDeterminPassWord.type = "password";
      } else {
        this.$refs.newsDeterminPassWord.type = "text";
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    async loginUp() {
      var agentCode = this.pageData.loginInfo.agentCode;
      var agentPwd = this.pageData.loginInfo.password;
      var confirmAgentPwd = this.pageData.loginInfo.newPassword;
      if (
        this.pageData.loginInfo.password != this.pageData.loginInfo.newPassword
      ) {
        this.$toast("两次密码不一致");
        return;
      }
      if (
        !validator.isPassword(
          this.pageData.loginInfo.password,
          "密码安全程度较低，请根据提示修改"
        )
      ) {
        return;
      }
      const res = await this.$axios({
        url: this.$API.API_AMEND_PASSWORD,
        method: "post",
        data: {
          agentPwd,
          confirmAgentPwd,
          agentCode,
        },
      });
      if (res.code == 0 && res.content.result == 0) {
        this.$toast(res.content.resultMessage);
        setTimeout(() => {
          this.$router.replace({
            name: "login",
          });
        }, 1500);
        window.localStorage.removeItem("agentCode");
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
  },
  // 销毁监听
  destroyed() {
    clearInterval(window.setTimeLoginObj);
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/less/app/login/login.less";
.bt_left {
  position: absolute;
  top: 3%;
  left: 5%;
}
.list-block .item-input {
  position: relative;
}
.item-input img {
  display: block;
  width: 30px !important;
  height: 30px !important;
  position: absolute;
  top: 13px;
  right: 10px;
}
</style>
