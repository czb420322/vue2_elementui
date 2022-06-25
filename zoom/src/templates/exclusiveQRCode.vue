<template>
  <div class="exclusiveQRCode">
    <div class="tooth">
      <v-header :title="{ name: '专属二维码' }"></v-header>
      <vue-qr
        class="tooth-icon"
        :logoScale="20"
        :margin="5"
        :size="216"
        :text="shareCode"
      ></vue-qr>
      <p>齿科专属二维码</p>
    </div>
    <div class="student">
      <vue-qr
        class="student-icon"
        :logoScale="20"
        :margin="5"
        :size="216"
        :text="shareCodeTwo"
      ></vue-qr>
      <p>学平险</p>
      <button @click="goCar()">车险</button>
    </div>
  </div>
</template>

<script>
import vueQr from "vue-qr";
import configJs from "../config";
export default {
  components: {
    vueQr,
  },
  data() {
    return {
      shareCode: `${
        configJs.config.http_base + configJs.config.ctx_base
      }/#/businessSetTwo?agentCode=S0100080`,
      shareCodeTwo: `${
        configJs.config.http_base + configJs.config.ctx_base
      }/#/businessSetTwo?agentCode=S0100106`,
    };
  },
  computed: {},
  watch: {},
  methods: {
    goCar() {
      this.goPage("carInsuranceTwo?agentCode=S0900335");
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {}, //生命周期 - 销毁之前
};
</script>
<style lang="less">
.exclusiveQRCode {
  padding-top: 50px;
  display: flex;
  justify-content: space-around;
  .tooth {
    p {
      margin: 0;
      text-align: center;
    }
  }
  .student {
    p {
      margin: 0;
      text-align: center;
    }
  }
}
</style>