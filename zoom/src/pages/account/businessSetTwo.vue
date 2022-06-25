<template>
  <div class="businessSet">
    <div :style="{ 'margin-top': $iosSystem + 60 + 'px' }">
      <v-header :title="{ name: '业务信息' }"></v-header>
      <div>
        <!-- <template v-if="agentCode !='S0800413' && agentCode !='S0999999'">
        <van-field
          v-if="!isValue"
          :value="agentNameValue"
          label="业务来源"
          input-align="right"
          placeholder="请选择业务来源"
          readonly
          disabled
        />
        <van-field
          v-if="handlerCode"
          v-model="agentCode"
          label="操作员代码"
          disabled
          input-align="right"
        />
        <van-field
          v-model="agentName"
          label="归属业务员"
          disabled
          input-align="right"
        />
        <van-field
          v-model="agentOrgName"
          label="归属机构名"
          disabled
          input-align="right"
        />
        </template> -->
        <!-- <template v-if="agentNameValue  && agentCode !='S0800413' && agentCode !='S0999999'">
          <van-field
            v-if="agentNameValue !== '直接业务'"
            v-model="proxyName"
            label="代理人"
            placeholder="代理人为空"
            disabled
            input-align="right"
          />
          <van-field
            :value="agreementNoValue"
            label="代理协议号"
            input-align="right"
            placeholder="请选择代理协议号"
            readonly
            disabled
          />
        </template> -->
        <van-cell-group>
          <van-field
            v-model="transcribePhone"
            required
            label="转录人工号"
            placeholder="请输入需记录信息"
            @change="verify_Phone()"
          />
        </van-cell-group>
        <van-cell-group>
          <van-field
            v-model="transcribeName"
            label="转录人姓名"
            placeholder="请输入需记录信息"
          />
        </van-cell-group>
        <!-- <van-field
          v-if="!this.$route.query.url"
          :value="codeName"
          label="决策单元"
          input-align="right"
          placeholder="请选择决策单元"
          readonly
          @click="
            updataSearchSelectPicker('my/updmYdecisionUnit', mYdecisionUnit)
          "
          is-link
        /> -->
      </div>
      <div class="business_QRcode">
        <van-button
          v-show="hidshow"
          class="bt"
          type="primary"
          size="small"
          @click="createQRcode()"
          >生成二维码</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import selectPicker from "./../../templates/selectPicker.vue";
import searchSelectPicker from "./../../templates/searchSelectPicker.vue";
import { mapState } from "vuex";
import util from "../../assets/js/util/util";
import compCheck from "../../assets/js/util/comp-check";
import $ from "jquery";
import { Toast } from 'vant';
export default {
  components: {
    selectPicker,
    searchSelectPicker,
  },
  data() {
    return {
      isValue: false,
      handlerCode: "",
      handlerAgentOrgName: "",
      handlerName: "",
      agentNameValue: "", //业务来源
      // codeName: "", //决策单元
      agreementNoValue: "",
      agreementNo: "", //代理协议号
      proxyName: "", //代理协议名称
      proxyCode: "", //代理工号
      agreementOwner: "", //
      agentName: "",
      businessType: "",
      agentCode: "", //操作员代码
      agentName: "", //归属业务员
      agentOrgName: "", //归属机构名
      dailiList: "",
      searchList: {}, //serch数据
      transcribePhone: "",
      transcribeName: "",
      agreementList: {},
      docmHeight: "0", //默认屏幕高度
      showHeight: "0", //实时屏幕高度
      hidshow: true, //显示或者隐藏
      isResize: false, //默认屏幕高度是否已获取
    };
  },
  watch: {
    showHeight: function () {
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false;
      } else {
        this.hidshow = true;
      }
    },
  },
  created() {
    if (util.getLocalStorageObj("businessType")) {
      util.removeLocalStorageObj("businessType");
    }
    if (util.getLocalStorageObj("searchList")) {
      util.removeLocalStorageObj("searchList");
    }
    if (util.getLocalStorageObj("agreementList")) {
      util.removeLocalStorageObj("agreementList");
    }
    if (util.getLocalStorageObj("sysAgentExpandDTO")) {
      util.removeLocalStorageObj("sysAgentExpandDTO");
    }
    this.getToken();
    setTimeout(() => {
      this.getSearch();
      this.getMyAgreement();
    }, 2000);
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        if (!this.isResize) {
          // 默认屏幕高度
          this.docmHeight = document.documentElement.clientHeight;
          this.isResize = true;
        }
        // 实时屏幕高度
        this.showHeight = document.body.clientHeight;
      })();
    };
  },
  methods: {
    async getToken() {
      let agentCode = this.$route.query.agentCode;
      const res = await this.$axios({
        url: this.$API.API_ACCOUNT_TOKEN,
        method: "post",
        data: {
          agentCode: agentCode,
        },
      });
      if (res.code == 0 && res.content.result == 0) {
        localStorage.setItem("agentCode", res.content.agentCode);
        localStorage.setItem("token", res.content.token);
        localStorage.setItem("refreshToken", res.content.refreshToken);
        localStorage.setItem("tokenTime", Date.now());
      }
    },

    verify_Phone() {
      compCheck.isMobile2(this.transcribePhone, "请输入正确的工号");
    },
    async getSearch() {
      this.agentNameValue = "个人代理";

      const res = await this.$axios({
        url: this.$API.API_MY_SEARCH,
        method: "get",
        params: {},
      });
      if (res.code === 0 && res.content) {
        this.searchList = res.content;
        util.setLocalStorageObj("searchList", this.searchList);
        // var isAgentCode = res.content.agentCode;
        // if (isAgentCode != "S0800413" && isAgentCode != "S0999999") {
        //   this.$toast("无权限");
        //   setTimeout(() => {
        //     this.$router.push({ path: "/home" });
        //   }, 3000);
        //   return;
        // }
        this.handlerAgentOrgName = res.content.handlerAgentOrgName;
        this.handlerName = res.content.handlerName;
        this.handlerCode = res.content.handlerCode;
        this.agentCode = res.content.agentCode;
        this.agentName = res.content.agentName;
        this.agentOrgName = res.content.agentOrgName;
        if (res.content.businessType) {
          //以前选中的值要匹配代理协议号数据
          // this.dailiList = this.myagreementList[res.content.businessType] || [];
          if (this.dailiList) {
            for (let item of this.dailiList) {
              item.text = item.agreementNo + "-" + item.agentName;
              item.value = item.agentName;
            }
          }
        }
        if (res.content.agreementNo !== "") {
          this.agreementNo = res.content.agreementNo;
          if (!res.content.proxyName) {
            this.proxyName = res.content.proxyName;
          }
          if (res.content.proxyName) {
            this.agreementNoValue =
              res.content.agreementNo + "-" + res.content.proxyName;
          }
          this.proxyCode = res.content.proxyCode || "";
          this.agreementOwner = res.content.agreementOwner || "";
        }
      }
    },
    async getMyAgreement() {
      let businessTypeF;
      if (localStorage.getItem("agentCode") == "S0100080") {
        businessTypeF = "4";
      } else if (localStorage.getItem("agentCode") == "S0100106") {
        businessTypeF = "2";
      }
      util.setLocalStorageObj("businessType", businessTypeF);
      this.businessType = util.getLocalStorageObj("businessType");

      const res = await this.$axios({
        url: this.$API.API_AGREEMENT,
        method: "get",
        params: {
          agentCode: localStorage.agentCode,
          searchType: "1",
          businessType: this.businessType,
          isExclusive: "Y",
        },
      });
      if (res.code == 0 && res.content.result == 0) {
        let data = res.content.data;
        for (let i in data) {
          for (let j = 0; j < data[i].length; j++) {
            this.agreementList = data[i][j];
            // util.setLocalStorageObj("agreementList", this.agreementList);
          }
        }
        this.agreementNoValue = this.agreementList.agreementNo;
        this.proxyName = this.agreementList.agentName;
      }
    },
    async createQRcode() {
      // if (this.businessType == "") {
      //   this.$toast("请选择业务来源");
      //   return;
      // }
      if (this.businessType !== "0") {
        if (this.agreementNoValue === "") {
          this.$toast("请选择代理人协议号");
          return;
        }
      }
      if (!this.transcribePhone) {
        this.$toast("请输入转录人工号");
        return;
      }
      var newData = {
        businessType: this.agreementList.businessType,
        agreementNo: this.agreementList.agreementNo || "",
        proxyName: this.agreementList.agentName || "",
        proxyCode: this.agreementList.agentCode || "",
        agreementOwner: this.agreementOwner || "",
        codeCode: this.searchList.codeCode || "",
        codeName: this.searchList.codeName || "",
        unitmainTenanceTypeOne: this.searchList.unitmainTenanceTypeOne || "",
        unitmainTenanceTypeOneName:
          this.searchList.unitmainTenanceTypeOneName || "",
        unitmainTenanceTypeTwo: this.searchList.unitmainTenanceTypeTwo || "",
        unitmainTenanceTypeTwoName:
          this.searchList.unitmainTenanceTypeTwoName || "",
      };
      // console.log(newData, "newData");
      if (this.transcribePhone) {
        compCheck.isMobile2(this.transcribePhone, "请输入正确的手机格式");
        if (compCheck.isMobile2(this.transcribePhone, "请输入正确的手机格式")) {
          if (this.transcribeName) {
            compCheck.isName2(this.transcribeName, "请输入正确格式的姓名");
            if (compCheck.isName2(this.transcribeName, "请输入正确格式的姓名")) {
              const res = await this.$axios({
                url: this.$API.API_MY_SAVE,
                method: "post",
                data: newData,
              });
              this.$store.state.my.newBusiness = newData;
              // console.log(this.$store.state.my.newBusiness, "111");
              this.$router.push({
                path:
                  "/QRcodeList?transcribePhone=" +
                  this.transcribePhone +
                  "&transcribeName=" +
                  this.transcribeName +
                  "&agentCode=" +
                  this.$route.query.agentCode,
              });
            }
          } else {
            const res = await this.$axios({
              url: this.$API.API_MY_SAVE,
              method: "post",
              data: newData,
            });
            this.$store.state.my.newBusiness = newData;
            // console.log(this.$store.state.my.newBusiness, "222s");
            this.$router.push({
              path:
                "/QRcodeList?transcribePhone=" +
                this.transcribePhone +
                "&agentCode=" +
                this.$route.query.agentCode,
            });
          }
        }
      }
    },
  },
};
</script>>
<style lang="less">
.businessSet {
  .business_QRcode {
    position: fixed;
    bottom: 4%;
    left: 25%;
    width: 50%;
    .bt {
      width: 100%;
    }
  }
}
</style>