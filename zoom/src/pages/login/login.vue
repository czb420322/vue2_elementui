<template>
  <div class="page-group">
    <div class="page page-current">
      <div
        class="content login-content login-back"
        :style="{ 'min-height': pageHeight + 'px' }"
      >
        <!-- <div class="login-banner">
              <div>
                <img src="./../../../public/img/login/logo-icon.png">
              </div>
            </div> -->
        <!-- <img class="login_top_logo" src="./../../../public/img/login/top-ellipse.png" alt=""> -->
        <!-- <img class="login_top_logo" src="../../assets/img/login/rbt.png" alt=""> -->
        <div class="content-box">
          <div class="list-block login-list-block login-lisl">
            <ul class="login-list-ul" v-if="login_type == 1">
              <li>
                <div class="item-content h5-item-content">
                  <div class="item-inner h5-item-inner">
                    <div class="item-input">
                      <input
                        type="text"
                        placeholder="请输入您的工号"
                        v-model.trim="pageData.loginInfo.agentCode"
                      />
                      <input
                        type="text"
                        style="width: 0; height: 0; opacity: 0"
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
                        placeholder="请输入密码"
                        v-model.trim="pageData.loginInfo.agentPwd"
                      />
                      <input
                        type="text"
                        style="width: 0; height: 0; opacity: 0"
                      />
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <ul class="login-list-ul" v-if="login_type == 2">
              <li>
                <div class="item-content h5-item-content">
                  <div class="item-inner h5-item-inner">
                    <div class="item-input">
                      <input
                        type="tel"
                        placeholder="请输入您手机号"
                        v-model.trim="pageData.loginInfo.mobile"
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
                        @click="sendCode()"
                      >
                        <template v-if="!pageData.sendDisabled">
                          获取验证码
                        </template>
                        <template v-if="pageData.sendDisabled">
                          {{ "重新获取(" + pageData.time + ")" }}
                        </template>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <!-- <div class="login_type">
                <span class="lst" v-if="login_type == 1" @click="login_type=2">用手机号登录</span>
                <span class="lst" v-if="login_type == 2" @click="login_type=1">用账号登录</span>
              </div> -->
          </div>

          <div class="content-block login-content-block">
            <p>
              <a
                class="login-bottom"
                :class="{ disabled: pageData.isLoginIng }"
                @click="logWay()"
                >登 录</a
              >
            </p>
          </div>

          <div class="content-block login-content-block btn_bar">
            <!-- <router-link class="register" to="register">注册</router-link> -->
            <!-- <router-link class="register"  to="forgetPassword">修改/忘记密码</router-link> -->
            <router-link class="forgetPasswordBtn" to="forgetPassword"
              >忘记密码</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import validator from "../../assets/js/util/validator";
import util from "../../assets/js/util/util";
import { mapState } from "vuex";
import MD5 from "js-md5";
export default {
  data() {
    return {
      page: {
        autoloader: true,
      },
      pageData: {
        isLoginIng: false, //是否正在更新
        sendDisabled: false,
        time: 60,
        loginInfo: {
          agentCode: "", //登陆工号
          agentPwd: "", //用户输入密码
        },
      },
      pageHeight: 0,
      login_type: 1,
    };
  },
  computed: {
    ...mapState({
      manageVersion: (state) => state.common.manageVersion,
    }),
  },
  created() {
    console.log("这是假");
    sessionStorage.setItem("type", "page");
    sessionStorage.setItem("system", "jk");
    this.$store.commit("common/updateState", [
      { name: ["manageVersion"], value: this.manageVersion },
    ]);
    this.pageHeight = document.documentElement.clientHeight;
    let loginInfo = util.getLocalStorageObj("loginInfo");
    if (loginInfo) {
      this.pageData.loginInfo = loginInfo;
      this.logWay();
    }
  },
  methods: {
    //登陆方式
    logWay() {
      if (this.login_type == 1) {
        this.loginUp();
      } else {
        this.loginUpNote();
      }
    },
    //登陆接口(用账号登陆)
    async loginUp() {
      if (this.pageData.isLoginIng) {
        return;
      }
      var agentPwd = this.pageData.loginInfo.agentPwd;
      var agentCode = this.pageData.loginInfo.agentCode;
      if (!validator.isEmpty(agentCode, "工号不能为空")) {
        return;
      }
      if (!validator.isEmpty(agentPwd, "请输入密码")) {
        return;
      }
      const res = await this.$axios({
        url: this.$API.API_ACCOUNT_LOGIN,
        method: "post",
        data: {
          agentCode: agentCode,
          agentPwd: MD5(agentPwd).toString(),
          thirdToken: util.getThird(),
          type: sessionStorage.getItem("type"),
          system: sessionStorage.getItem("system"),
        },
      });

      this.$toast(res.content.resultMessage || "请求失败");
      if (res.code === 0 && res.content.result === "0") {
        util.setLocalStorageObj("loginInfo", this.pageData.loginInfo);
        localStorage.setItem("agentCode", res.content.agentCode);
        localStorage.setItem("token", res.content.token);
        localStorage.setItem("refreshToken", res.content.refreshToken);
        localStorage.setItem("tokenTime", Date.now());
        this.$router.push({ name: "home" });
      }
      // console.log(res);
      // firstLoginFlag 返回1 表示首次登录
      if (res.content.firstLoginFlag === "1") {
        window.sessionStorage.setItem(
          "agentCode",
          this.pageData.loginInfo.agentCode
        );
        setTimeout(() => {
          this.$router.push({
            name: "changePassword",
          });
        }, 1000);
      }
    },
    //登陆接口(用短信登陆)
    async loginUpNote() {
      var mobile = this.pageData.loginInfo.mobile;
      var smsCode = this.pageData.loginInfo.smsCode;
      var smsId = this.pageData.loginInfo.smsId;
      if (!validator.isEmpty(mobile, "手机号不能为空")) {
        return;
      }
      if (!validator.isEmpty(smsCode, "验证码不能为空")) {
        return;
      }
      const res = await this.$axios({
        url: this.$API.API_ACCOUNT_LOGINFORSMS,
        method: "post",
        data: {
          agentCode: mobile,
          smsId: smsId,
          smsCode: smsCode,
          thirdToken: util.getThird(),
          type: sessionStorage.getItem("type"),
          system: sessionStorage.getItem("system"),
        },
      });
      if (res.code === 0 && res.content.result === "0") {
        util.setLocalStorageObj("loginInfo", this.pageData.loginInfo);
        localStorage.setItem("agentCode", res.content.agentCode);
        localStorage.setItem("token", res.content.token);
        localStorage.setItem("refreshToken", res.content.refreshToken);
        localStorage.setItem("tokenTime", Date.now());
        this.$store.commit("common/updateState", [
          { name: ["manageVersion"], value: this.manageVersion },
        ]);
        this.$router.push({ name: "home" });
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
    //获取验证码
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
        method: "post",
        data: {
          sign: "1",
          mobile: mobile,
          operateType: "smslogin",
          thirdToken: util.getThird(),
          type: sessionStorage.getItem("type"),
          system: sessionStorage.getItem("system"),
        },
      });
      this.result = res.content.result;
      if (res.code === 0 && res.content.result === "0") {
        this.pageData.loginInfo.smsId = res.content.smsId;
        this.pageData.sendDisabled = true;
        this.$toast(`验证码已发送至您的手机${res.content.mobileStar}`);
        window.setTimeLoginObj = window.setInterval(() => {
          if (this.pageData.time-- <= 0) {
            this.pageData.time = 60;
            this.pageData.sendDisabled = false;
            clearInterval(window.setTimeLoginObj);
          }
        }, 1000);
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/less/app/login/login.less";
.login-bg {
  background-color: red; /* 不支持线性的时候显示 */
  background-image: linear-gradient(to right, #86ceed, #61a9fc);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.btn_bar {
  display: flex;
  justify-content: space-between;
  width: 96%;
  margin: auto;
}
</style>
