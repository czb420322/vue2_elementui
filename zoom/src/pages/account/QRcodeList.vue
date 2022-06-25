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
    <p class="name">
      {{ this.transcribeName + this.transcribePhone }}的专属二维码转录
    </p>
  </div>
</template>

<script>
import configJs from "../../config";
import vueQr from "vue-qr";
import common from "../../assets/js/util/common";
export default {
  components: {
    vueQr,
  },
  data() {
    return {
      transcribePhone: "",
      transcribeName: "",
      shareCode: "",
      loginToken: "",
    };
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    // 三好生学平险二维码分享
    meritStudentShadeShow() {
      let shareUrl = "";
      if (this.transcribeName) {
        shareUrl = `${
          configJs.config.http_base + configJs.config.ctx_base
        }/#/productListThree?transcribePhone=${
          this.transcribePhone
        }&transcribeName=${this.transcribeName}&agentCode=${
          this.$route.query.agentCode
        }`;
      } else {
        shareUrl = `${
          configJs.config.http_base + configJs.config.ctx_base
        }/#/productListThree?transcribePhone=${
          this.transcribePhone
        }&agentCode=${this.$route.query.agentCode}`;
      }
      common.goShare({
        shareTitle: "国任“三好生”学平险",
        shareText: "学平险",
        shareImgUrl: null,
        shareUrl: shareUrl,
      });
    },
  },
  created() {
    this.loginToken = localStorage.getItem("token");
    if (this.$route.query.transcribePhone) {
      this.transcribePhone = this.$route.query.transcribePhone;
      if (this.$route.query.transcribeName) {
        this.transcribeName = this.$route.query.transcribeName;
      }
    }
    if (this.transcribeName) {
      this.shareCode = `${
        configJs.config.http_base + configJs.config.ctx_base
      }/#/productListThree?transcribePhone=${
        this.transcribePhone
      }&transcribeName=${this.transcribeName}&agentCode=${
        this.$route.query.agentCode
      }`;
    } else {
      this.shareCode = `${
        configJs.config.http_base + configJs.config.ctx_base
      }/#/productListThree?transcribePhone=${this.transcribePhone}&agentCode=${
        this.$route.query.agentCode
      }`;
    }
    if (this.$route.query.agentCode == "S0999999") {
      setTimeout(() => {
        this.meritStudentShadeShow();
      }, 1000);
    }
  },
  mounted() {},
  beforeDestroy() {}, //生命周期 - 销毁之前
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
      position: absolute;
      top: 25%;
      left: 50%;
      margin-left: -6rem;
    }
  }
  .name {
    text-align: center;
  }
}
</style>