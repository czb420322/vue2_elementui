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
                <li>
                  <div class="item-content h5-item-content">
                    <div class="item-inner h5-item-inner">
                      <div class="item-input">
                        <input
                          type="text"
                          placeholder="请输入登录工号"
                          v-model.trim="pageData.loginInfo.agentCode"
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
                          type="tel"
                          placeholder="请输入手机号"
                          v-model.trim="pageData.loginInfo.agentPhone"
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
                          type="text"
                          placeholder="请输入验证码"
                          v-model.trim="pageData.loginInfo.smsCode"
                        />
                      </div>
                      <div class="login-validate-code">
                        <a
                          class="
                            button
                            button-customer-h5
                            button-fill
                            button-customer-verificode
                          "
                          @click="sendCode"
                          :style="[
                            { color: !show ? '#ccc' : '' },
                            { pointerEvents: !show ? 'none' : '' },
                          ]"
                        >
                          <template v-if="show"> 获取验证码 </template>
                          <template v-if="!show">
                            {{ "重新获取" + count + "s" }}
                          </template>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <!-- <li>
                  <div class="item-content h5-item-content">
                    <div class="item-inner h5-item-inner">
                      <div class="item-input">
                        <input type="password" placeholder="请输入新密码" v-model.trim="pageData.loginInfo.password">
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content h5-item-content">
                    <div class="item-inner h5-item-inner">
                      <div class="item-input">
                        <input type="password" placeholder="请再次输入新密码" v-model.trim="pageData.loginInfo.newPassword">
                      </div>
                    </div>
                  </div>
                </li> -->
              </ul>
            </div>
            <div class="content-block login-content-block">
              <p>
                <a
                  class="login-bottom"
                  :class="{ disabled: pageData.isLoginIng }"
                  @click="loginUp"
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
import util from "../../assets/js/util/util";
import configJs from "../../config.js";
import MD5 from "js-md5";
export default {
  data() {
    return {
      show: true,
      timer: null,
      count: "",
      page: {
        autoloader: true,
      },
      pageData: {
        isLoginIng: false, //是否正在更新
        sendDisabled: false,
        time: 60,
        loginInfo: {
          agentPhone: "",
          agentCode: "",
          smsId: "",
          smsCode: "",
          // password: '',
          // newPassword: ''
        },
      },
      pageHeight: 0,
      // result: "0",
    };
  },
  created() {
    this.pageHeight = document.documentElement.clientHeight;
  },

  watch: {
    "pageData.loginInfo.code": function (val) {
      this.pageData.isLoginIng = false;
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async loginUp() {
      // this.goPage('changePassword');
      var smsId = this.pageData.loginInfo.smsId;
      var smsCode = this.pageData.loginInfo.smsCode;

      if (
        !validator.isEmpty(this.pageData.loginInfo.agentCode, "请输入您的工号")
      ) {
        return;
      }
      if (
        !validator.isEmpty(this.pageData.loginInfo.agentPhone, "请输入手机号")
      ) {
        return;
      }
      if (
        !validator.isMobile(
          this.pageData.loginInfo.agentPhone,
          "手机号码格式有误"
        )
      ) {
        return;
      }
      if (
        !validator.isEmpty(this.pageData.loginInfo.smsCode, "请先输入验证码")
      ) {
        return;
      }
      const res = await this.$axios({
        url: this.$API.API_VERIFY_YZSMS,
        method: "post",
        data: {
          smsId: smsId,
          smsCode: smsCode,
        },
      });
      // console.log(res);
      window.localStorage.setItem(
        "agentCode",
        this.pageData.loginInfo.agentCode
      );
      if (res.content.result == 0 && res.code == 0) {
        this.$toast(res.content.resultMessage);
        this.$router.replace({
          name: "changePassword",
        });
      } else {
        this.$toast(res.content.resultMessage);
      }
    },

    // 获取验证码
    async sendCode() {
      var agentPhone = this.pageData.loginInfo.agentPhone;
      var agentCode = this.pageData.loginInfo.agentCode;
      if (this.pageData.sendDisabled) {
        return;
      }
      if (!validator.isEmpty(agentPhone, "手机号不能为空")) {
        return;
      }
      if (!validator.isMobile(agentPhone, "手机号码格式有误")) {
        return;
      }
      const res = await this.$axios({
        url: this.$API.API_VERIFY_SMSCODE,
        method: "post",
        data: {
          agentPhone: agentPhone,
          agentCode: agentCode,
        },
      });
      // console.log(res);
      if (res.content.result == 1 && res.code == 0) {
        this.$toast(res.content.resultMessage);
      } else {
        this.pageData.loginInfo.smsId = res.content.smsId;
        let TIME_COUNT = 180;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
      }
    },
  },
  // 销毁监听
  destroyed() {
    // clearInterval(window.setTimeLoginObj);
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
</style>
