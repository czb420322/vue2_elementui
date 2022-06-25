<template>
  <div class="confirmdialog-huan">
    <van-popup
      v-model="passshow"
      style="width: 60%; height: 200px; border-radius: 8px"
    >
      <div class="popup_title">
        <div class="popup_title_">填写验证码</div>
      </div>
      <!-- 输入框 -->
      <p class="ssm_fs" v-if="!countdown">验证码已发送至{{ mobile }}</p>
      <img
        src="../../../../public/img/base/close.png"
        alt="close"
        class="close"
        @click="close"
      />
      <van-field
        v-model.trim="verificationCode"
        maxlength="6"
        :formatter="formatter"
        center
        clearable
        placeholder="填写验证码"
      >
        <template #button>
          <span v-if="countdown" class="blue" @click="getCode()">{{
            text
          }}</span>
          <span v-if="!countdown" class="block">{{ text }} ({{ count }})</span>
          <!-- <van-button size="small" type="primary">获取验证码</van-button> -->
        </template>
      </van-field>
      <div style="text-align: center">
        <button class="btn" slot="button" @click="saveQuery">确定</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
// import orderDetailVue from "./orderDetail.vue";
// import glutton from '../../../assets/js/util/glutton';
export default {
  name: "ssm",
  data() {
    return {
      mobile: "", //手机号码
      passshow: true, //密码弹窗
      showKeyboard: false, //数字键盘显示隐藏
      password: "",
      verificationCode: "", //收到的验证码
      countdown: true, //验证码的状态，默认显示发送验证码
      smsId: "",
      count: "", //60秒倒计时
      timer: null,
      text: "获取验证码",
      productDetailInfo: {
        orderNo: "",
        propPoliy: "",
        productName: "",
        orderStatus: "",
        orderAmount: "",
        appntName: "",
        appntSex: "",
        insuredName: "",
        insuredSex: "",
        benefitName: "",
        benefitSex: "",
      },
    };
  },
  created() {
    this.orderDetail(); //调用订单详情的接口获取投保人的手机号
  },
  methods: {
    formatter(value) {
      // 过滤输入的非数字
      return value.replace(/[^\d]/g, "");
    },
    //发送验证码
    async getssm() {
      const res = await this.$axios({
        url: this.$API.API_MY_SSM,
        method: "get",
        params: {
          mobile: this.mobile,
        },
      });
      if (res.content.smsId != undefined) {
        this.smsId = res.content.smsId;
        console.log(this.smsId, "发送验证码");
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
    // 订单详情接口用于获取投保人手机号
    async orderDetail() {
      const res = await this.$axios({
        url: this.$API.API_ORDER_FINDORDERDETAILS,
        method: "post",
        data: {
          insuranceOrderNo: this.$route.query.orderNo,
        },
      });
      this.mobile = res.data[0].applicant.mobile;
    },
    //检查验证码是否一致
    async getjx(id) {
      const res = await this.$axios({
        url: this.$API.API_MY_JXM,
        method: "get",
        params: {
          smsId: id,
          smsCode: this.verificationCode,
        },
      });
      if (res.content.resultMessage != "验证码不一致，请重新填写验证码") {
        const res = await this.$axios({
          url: this.$API.API_INSURE_INPUT_GETPAYURL,
          method: "get",
          params: {
            insuranceOrderNo: this.productDetailInfo.orderNo,
          },
        });
        //  this.$emit("getVerificationCode");
        if (res.code === 0) {//这个条件判断如和是成功的
          // console.log("00000+++++++............");
          this.$emit("getVerificationCode");
          // setTimeout(() => {
          //   window.location.href = res.content.payUrl;
          // }, 500);c
        } else {
          // console.log("111111---");
          this.$toast(res.content.resultMessage);
        }
      } else {
        // console.log("22222****//");
        this.$toast("验证码有误");
      }
    },
    // 获取验证码按钮
    getCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.countdown = false;
        this.text = "重新发送";
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.countdown = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
      this.getssm();
    },
    //确定
    saveQuery() {
 
      if (this.countdown) {
        this.$toast("请先获取验证码");
        return;
      }
      if (this.verificationCode.length == 0) {
        this.$toast("验证码不能为空");
        return;
      }
      if (this.verificationCode.length < 6) {
        this.$toast("验证码格式为6位纯数字");
        return;
      }
      if (this.verificationCode.length == 6) {
        this.getjx(this.smsId);
        this.$parent.setSignImgUrl(this.value);
      }
    },
    close() {
      this.passshow = false;
    },
  },
};
</script>

<style lang="less" scoped>
.confirmdialog-huan {
  // width:200px;
  height: 100vh;
  background: #fff;
}

.popup {
  width: 350px;
  height: 280px;
  padding-top: 16px;
  text-align: center;
  border-radius: 7px;
}

.van-popup--center {
  border-radius: 7px;
  overflow: hidden;
}

.popup_title {
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.popup_title_ {
  width: 5.9375rem;
  height: 1.1875rem;
  font-size: 1.1875rem;
  font-family: SourceHanSansCN-Bold, SourceHanSansCN;
  font-weight: bold;
  color: #333333;
  line-height: 1.78rem;
  text-align: center;
}

.popup_yes {
  margin: 0 auto;
  margin-top: 50px;
}

.popup_ {
  position: fixed;
  bottom: 0;
  z-index: 99999;
}

.ssm_fs {
  // width: 9.4375rem;
  // height: 0.75rem;
  // padding-left:16px;
  font-size: 00.75rem;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 12.5;
  color: #999999;
  line-height: 1.125rem;
  text-align: center;
}

.btn {
  width: 10rem;
  // height: 21.125rem;
  margin-top: 1.5rem;
  background: linear-gradient(270deg, #93c6f8 0%, #4a76f3 100%);
  border-radius: 1.375rem;
  color: #ffffff;
  border: none;
}

.close {
  position: fixed;
  width: 2rem;
  height: 2rem;
  right: 2%;
  top: 5%;
}

.reg_active {
  width: 130px;
  height: 2rem;
  background: #07c160;
  color: #fff;
  border: none;
}

.reg_disActive {
  width: 130px;
  height: 2rem;
  /* background: #07c160; */
  color: #323233;
  border: none;
}

.blue {
  color: #4a77f3;
}

.block {
  color: #aaaaaa;
}
</style>
