<!-- 二维码组件 -->
<template>
  <div class="unique_QRcode">
    <v-header :title="{ name: '专属二维码' }"></v-header>
    <div class="QRcode_container">
      <div class="QRcode">
        <vue-qr
          class="icon"
          :logoScale="20"
          :margin="5"
          :size="216"
          :text="shareCode"
        ></vue-qr>
      </div>
    </div>
    <div class="message" v-show="falg">
      <p v-if="this.agencyFalg && !this.transcribeFalg && this.carFalg">
        {{ agreementNo }} {{ productName }}的专属二维码
      </p>

      <p v-if="this.agencyFalg && !this.transcribeFalg && !this.carFalg">
        {{ agreementNo }}{{ codeName }}车险的专属二维码
      </p>

      <p v-if="!this.agencyFalg && !this.transcribeFalg && this.carFalg">
        {{ productName }} 的专属二维码
      </p>

      <p v-if="!this.agencyFalg && !this.transcribeFalg && !this.carFalg">
        {{ codeName }} 车险的专属二维码
      </p>

      <p v-if="this.transcribeFalg && this.carFalg">
        {{ transcribeInfo.transcribePhone
        }}<span v-if="transcribeInfo.transcribeName">{{
          transcribeInfo.transcribeName
        }}</span>
        {{ productName }} 的专属二维码(转录)
      </p>

      <p v-if="this.transcribeFalg && !this.carFalg">
        {{ transcribeInfo.transcribePhone
        }}<span v-if="transcribeInfo.transcribeName">{{
          transcribeInfo.transcribeName
        }}</span>
        车险的专属二维码(转录)
      </p>
    </div>

    <p class="comment">长按图片可保存到手机进行分享和发送给朋友</p>
  </div>
</template>

<script>
import vueQr from "vue-qr";
import util from "../../assets/js/util/util";
import { mapState } from "vuex";
import configJs from "./../../config";
export default {
  components: {
    vueQr,
  },
  data() {
    return {
      falg: false,
      agencyFalg: false,
      transcribeFalg: false,//是否转录
      carFalg: false, // 是否为车险
      shareCode: "", // 二维码
      agreementNo: "", // 代理号名
      codeName: "", // 决策单元
      productName: "",
      saleCode: "", // 产品代码
      searchList: "", // serch数据
      transcribeInfo: {
        // 转录信息
        transcribePhone: "",
        transcribeName: "",
      },
      QRToken: "",
      business:""
    };
  },
  computed: {
    ...mapState({
      mYdecisionUnit: (state) => state.my.myDecisionUnit, //决策单元数据
      businessList: (state) => state.my.myBusinessList, //业务来源数据
      UserInfoList: (state) => state.my.UserInfo, //个人资料数据
      myagreementList: (state) => {
        const myagreementList = state.my.myagreementList;
        if (myagreementList[1]) {
          let newList = myagreementList[1];
          if (newList) {
            newList = newList.map((item) => {
              item.text = item.agreementNo + "-" + item.agentName;
              item.value = item.agentName;
              return item;
            });
          }
        }
        return myagreementList;
      }, //代理人协议号数据
    }),
  },
  watch: {},
  methods: {
    async getSearch() {
      const res = await this.$axios({
        url: this.$API.API_MY_SEARCH,
        method: "get",
        params: {},
      });
      if (res.code === 0 && res.content) {
        this.codeName = res.content.codeName;
        if (res.content.businessType != "0") {
          this.agencyFalg = true;
          this.agreementNo = res.content.agreementNo  ;
        }
      }
      if (util.getSessionStorageObj("searchList")) {
        this.searchList = util.getSessionStorageObj("searchList");
        // this.codeName = this.searchList.codeName;
      }
      if (this.$route.query.transcribePhone) {
        this.transcribeFalg = true;
      }
    },
    // 生成二维码
    getProduct() {
      let businessUrl = `&agreementNo=${this.business.agreementNo}&agreementOwner=${this.business.agreementOwner}&businessType=${this.business.businessType}&codeCode=${this.business.codeCode}&codeName=${this.business.codeName}&proxyCode=${this.business.proxyCode}&proxyName=${this.business.proxyName}&unitmainTenanceTypeOne=${this.business.unitmainTenanceTypeOne}&unitmainTenanceTypeOneName=${this.business.unitmainTenanceTypeOneName}&unitmainTenanceTypeTwo=${this.business.unitmainTenanceTypeTwo}&unitmainTenanceTypeTwoName=${this.business.unitmainTenanceTypeTwoName}`
      if (util.getLocalStorageObj("productName")) {
        this.productName = util.getLocalStorageObj("productName");
        this.carFalg = true;
      }
      if (this.$route.query.transcribePhone) {
        if (this.$route.query.transcribeName) {
          // 转录手机号   转录姓名都存在
          if (this.$route.query.url) {
            this.shareCode = `${
              configJs.config.http_base + configJs.config.ctx_base
            }/#/${this.$route.query.url}&transcribePhone=${
              this.$route.query.transcribePhone
            }&transcribeName=${this.$route.query.transcribeName}&token=${
              this.QRToken
            }`+ businessUrl;
          } else {
            this.shareCode = `${
              configJs.config.http_base + configJs.config.ctx_base
            }/#/carInsurance?transcribePhone=${
              this.$route.query.transcribePhone
            }&transcribeName=${this.$route.query.transcribeName}token=${
              this.QRToken
            }`+ businessUrl;
          }
        } else {
          // 转录姓名不存在
          if (this.$route.query.url) {
            this.shareCode = `${
              configJs.config.http_base + configJs.config.ctx_base
            }/#/${this.$route.query.url}&transcribePhone=${
              this.$route.query.transcribePhone
            }&token=${this.QRToken}`+ businessUrl;
          } else {
            this.shareCode = `${
              configJs.config.http_base + configJs.config.ctx_base
            }/#/carInsurance?transcribePhone=${
              this.$route.query.transcribePhone
            }&token=${this.QRToken}`+ businessUrl;
          }
        }
      } else {
        // 直接生成二维码
        if (this.$route.query.url) {
          this.shareCode = `${
            configJs.config.http_base + configJs.config.ctx_base
          }/#/${this.$route.query.url}&token=${this.QRToken}`+ businessUrl;
        } else {
          this.shareCode = `${
            configJs.config.http_base + configJs.config.ctx_base
          }/#/carInsurance?token=${this.QRToken}`+ businessUrl;
        }
      }
    },
  },
  created() {
    this.QRToken = localStorage.token;
    this.business = util.getSessionStorageObj("business")
    console.log(this.myagreementList, "111");
    if (this.$route.query.transcribePhone) {
      this.transcribeInfo.transcribePhone = this.$route.query.transcribePhone;
      if (this.$route.query.transcribeName) {
        this.transcribeInfo.transcribeName = this.$route.query.transcribeName;
      }
    }
    setTimeout(() => {
      this.falg = true;
      this.getProduct();
      this.getSearch();
    }, 1000);
  },
  mounted() {},
};
</script>
<style lang="less">
.unique_QRcode {
  .QRcode_container {
    margin-top: 46px;
    width: 100%;
    height: 20rem;
    position: relative;
    .QRcode {
      width: 12rem;
      height: 12rem;
      // background-color: skyblue;
      position: absolute;
      top: 25%;
      left: 50%;
      margin-left: -6rem;
    }
  }
  .message {
    p {
      text-align: center;
      font-size: 1rem;
    }
  }
  .comment {
    text-align: center;
    color: red;
    font-size: 1rem;
    padding: 1rem 0;
  }
}
</style>