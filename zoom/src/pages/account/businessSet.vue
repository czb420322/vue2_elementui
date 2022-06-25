<template>
  <div class="businessSet">
    <div :style="{ 'margin-top': $iosSystem + 60 + 'px' }">
      <v-header :title="{ name: '业务信息' }"></v-header>
      <van-field
        v-if="isValue"
        :value="agentNameValue"
        label="业务来源"
        input-align="right"
        placeholder="请选择业务来源"
        readonly
        disabled
      />
      <div>
        <van-field
          v-if="!isValue"
          :value="agentNameValue"
          label="业务来源"
          input-align="right"
          placeholder="请选择业务来源"
          readonly
          @click="showSelectPicker('my/updBusinessList', businessList)"
          is-link
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
        <template v-if="agentNameValue">
          <van-field
            v-if="agentNameValue !== '直接业务'"
            v-model="proxyName"
            label="代理人"
            placeholder="代理人为空"
            disabled
            input-align="right"
          />
          <van-field
            v-if="agentNameValue !== '直接业务' && !isValue"
            :value="agreementNoValue"
            label="代理协议号"
            input-align="right"
            placeholder="请选择代理协议号"
            @click="updclick()"
            readonly
            is-link
          />
          <!-- <van-field
          v-if="
            agentNameValue !== '直接业务' &&
            myagreementList[1] &&
            myagreementList[1].length === 1 " 
          :value="agreementNoValue"
          label="代理协议号"
          input-align="right"
          placeholder="请选择代理协议号"
          readonly
          disabled
          />-->
          <van-field
            v-if="agentNameValue !== '直接业务' && isValue"
            :value="agreementNoValue"
            label="代理协议号"
            input-align="right"
            placeholder="请选择代理协议号"
            readonly
            disabled
          />
        </template>
        <van-field
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
        />
      </div>
      <div class="box_business">
        <div class="business">
          <div class="businessSet_bt">
            <van-button class="bt" type="info" size="small" @click="ascertain()"
              >确定</van-button
            >
          </div>
          <!-- <div class="business_QRcode">
            <van-button
              class="bt"
              type="primary"
              size="small"
              @click="createQRcode()"
              >生成二维码</van-button
            >
          </div> -->
          <div
            class="business_Share"
            v-if="this.$route.query.url && isTranscribeShowFalg"
          >
            <van-button
              v-if="this.$route.query.url"
              class="bt"
              type="primary"
              size="small"
              text="非车分享转录"
              @click="shadeShowF()"
            />
          </div>
          <div
            class="business_Share"
            v-if="!this.$route.query.url && isTranscribeShowFalg"
          >
            <van-button
              v-if="!this.$route.query.url"
              class="bt"
              type="primary"
              size="small"
              text="转录分享"
              @click="shadeShow()"
            />
          </div>
        </div>
      </div>
    </div>
    <selectPicker ref="selectPicker" @click="updataSelectPicker"></selectPicker>
    <searchSelectPicker
      ref="searchSelectPicker"
      @click="updataSelectPicker"
    ></searchSelectPicker>
  </div>
</template>
<script>
import selectPicker from "./../../templates/selectPicker.vue";
import searchSelectPicker from "./../../templates/searchSelectPicker.vue";
import { mapState } from "vuex";
import common from "../../assets/js/util/common";
import configJs from "../../config";
import util from "../../assets/js/util/util";
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
      codeName: "", //决策单元
      agreementNoValue: "",
      agreementNo: "", //代理协议号
      proxyName: "", //代理协议名称
      proxyCode: "", //代理工号
      agreementOwner: "", //
      agentName: "",
      businessType: "",
      unitList: {},
      agentCode: "", //操作员代码
      agentName: "", //归属业务员
      agentOrgName: "", //归属机构名
      dailiList: "",
      searchList: {}, //serch数据
      isTranscribeShowFalg: false,
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
  created() {
    setTimeout(() => {
      this.getSearch();
    }, 1000);
    this.$store.dispatch("my/getUserInfo");
    if (!this.$route.query.url) {
      util.removeLocalStorageObj("productName");
    }
    if (util.getLocalStorageObj("transcribePhone")) {
      util.removeLocalStorageObj("transcribePhone");
      if (util.getLocalStorageObj("transcribeName")) {
        util.removeLocalStorageObj("transcribeName");
      }
    }
  },
  watch: {
    agentNameValue: {
      handler(val) {
        if (val === "") return;
        if (val === "直接业务" && !this.$route.query.url) {
          this.$store.dispatch("my/getMyCarType", { codeType: "PrpdunitMain" });
        } else {
          this.$store.dispatch("my/getMyAgreement", this.agentNameValue);
        }
      },
      deep: true,
      immediate: true,
    },
    dailiList: {
      handler(val) {
        if (!this.$route.query.url) {
          this.$store.dispatch(
            "my/getMyCarType",
            this.agentNameValue != "直接业务"
              ? { codeType: "PrpdunitMain" }
              : undefined
          );
        }
        if (val && val.length === 1) {
          this.agreementNoValue = `${val[0].agreementNo}-${val[0].agentName}`;
        }
      },
      immediate: true,
    },
    myagreementList: {
      handler(val) {
        if (val[1] && val[1].length) {
          this.dailiList = this.myagreementList[1];
          if (this.dailiList) {
            for (let item of this.dailiList) {
              this.agreementNo = item.agreementNo;
              this.proxyName = item.agentName;
              this.proxyCode = item.agentCode;
            }
            if (this.dailiList && this.dailiList.length === 1) {
              this.agreementNoValue = `${this.dailiList[0].agreementNo}-${this.dailiList[0].agentName}`;
              this.proxyName = this.dailiList[0].agentName;
            }
            // else {
            //   this.agreementNoValue = ''
            //   this.proxyName = '';
            // }
          }
        }
        // } else {
        //   this.agreementNoValue = ''
        //   this.proxyName = '';
        // }
      },
      immediate: true,
    },
  },
  methods: {
    updataSelectPicker(params) {
      if (params.name == "my/updBusinessList") {
        //选中的业务来源
        this.agentNameValue = params.struct.value.text;
        this.businessType = params.struct.value.value;
        this.dailiList = [];
        this.dailiList = this.myagreementList[1];
        this.agreementNoValue = ""; //清空代理协议
        if (this.dailiList && this.dailiList.length) {
          const lastItem = this.dailiList[this.dailiList.length - 1] || {};
          this.proxyName = lastItem.agentName;
          this.agreementNo = lastItem.agreementNo;
        } else {
          this.proxyName = "";
          this.agreementNo = "";
        }
        this.proxyCode = "";
        this.agreementOwner = "";
        this.codeName = "";
        this.$store.commit("my/mYupdataDecisionUnit", []);
      }
      //选中的代理人协议号
      if (params.name == "my/updmYagreementList") {
        this.agreementNo = params.struct.value.agreementNo;
        this.proxyName = params.struct.value.agentName;
        this.proxyCode = params.struct.value.agentCode;
        this.agreementOwner = params.struct.value.handlerName || "";
        const { agreementNo, agentName } = params.struct.value;
        this.agreementNoValue = `${agreementNo}-${agentName}`;
        this.codeName = "";
        if (!this.$route.query.url) {
          this.$store.dispatch(
            "my/getMyCarType",
            this.agentNameValue != "直接业务" ? params : undefined
          );
        }
      }

      if (params.name == "my/updmYdecisionUnit") {
        //选中的决策单元
        this.codeName = params.struct.value.codeName;
        this.unitList = params.struct.value;
      }
    },
    updclick() {
      if (this.myagreementList[1]) {
        this.dailiList = this.myagreementList[1];
        if (this.dailiList) {
          for (let item of this.dailiList) {
            item.text = item.agreementNo + "-" + item.agentName;
            item.value = item.agentName;
          }
        }
      }
      if (!this.dailiList || !this.dailiList.length) {
        this.$toast("代理协议号为空");
        return;
      }
      if (this.agentNameValue != "") {
        this.showSelectPicker("my/updmYagreementList", this.dailiList);
      } else {
        this.$toast("请先选择业务来源");
      }
    },
    showSelectPicker(name, list) {
      if (!list || list.length == 0) {
        this.$toast("暂无数据！");
        return;
      }
      if (this.UserInfoList.agentType == "0" && name == "my/updBusinessList") {
        list = [
          {
            text: "直接业务",
            value: "0",
          },
        ];
      }

      this.$refs.selectPicker.parentMsg({ name: name, struct: { data: list } });
    },
    updataSearchSelectPicker(name, list) {
      if (
        (list.length &&
          (this.agreementNoValue || this.agentNameValue === "直接业务")) ||
        (this.agreementNoValue === "" && this.agentNameValue !== "直接业务")
      ) {
        this.$refs.searchSelectPicker.parentMsg({
          name: name,
          struct: { data: list },
        });
      }
    },
    // 非车分享
    shadeShowF() {
      if (this.businessType == "") {
        this.$toast("请选择业务来源");
        return;
      }
      if (this.businessType !== "0") {
        if (this.agreementNoValue === "") {
          this.$toast("请选择代理人协议号");
          return;
        }
      }
      if (this.codeName == "" && !this.$route.query.url) {
        this.$toast("请选择决策单元");
        return;
      }
      if (this.businessType == "0") {
        //如果选择了直接业务代理协议号相关的要清空
        this.agreementNoValue = "";
        this.agreementNo = "";
        this.proxyName = "";
        this.proxyCode = "";
        this.agreementOwner = "";
      }
      var newData = {
        businessType: this.businessType || "",
        agreementNo: this.agreementNo || "",
        proxyName: this.proxyName || "",
        proxyCode: this.proxyCode || "",
        agreementOwner: this.agreementOwner || "",
        codeCode: this.unitList.codeCode || "",
        codeName: this.unitList.codeName || "",
        unitmainTenanceTypeOne: this.unitList.unitmainTenanceType1 || "",
        unitmainTenanceTypeOneName:
          this.unitList.unitmainTenanceType1Name || "",
        unitmainTenanceTypeTwo: this.unitList.unitmainTenanceType2 || "",
        unitmainTenanceTypeTwoName:
          this.unitList.unitmainTenanceType2Name || "",
      };
      this.$store.state.my.newBusiness = newData;
      let token = localStorage.getItem("token");
      let shareUrl = `${
        configJs.config.http_base + configJs.config.ctx_base
      }/#/share?url=${this.$route.query.url}&token=${token}&`;
      if (this.$store.state.my.newBusiness) {
        Object.keys(this.$store.state.my.newBusiness).map((key) => {
          shareUrl += key + "=" + this.$store.state.my.newBusiness[key] + "&";
        });
      }
      shareUrl = shareUrl.substring(shareUrl.length - 1, 0);
      let test0 = encodeURI(shareUrl);
      let test1 = test0.split("&codeName=")[0];
      let productName = util.getLocalStorageObj("productName"); //分享标题
      let home_productTag = util.getLocalStorageObj("home_productTag"); //分享介绍
      let arrJoinString = "";
      if (home_productTag) {
        arrJoinString = home_productTag.join();
      }
      let home_productImageUrl = util.getLocalStorageObj(
        "home_productImageUrl"
      ); //分享图片
      common.goShare({
        shareTitle: productName + "(转录)",
        shareText: '',
        shareImgUrl: home_productImageUrl,
        shareUrl: test1,
      });
      this.$toast.success("请点击右上角进行分享");
    },
    shadeShow() {
      if (this.businessType == "") {
        this.$toast("请选择业务来源");
        return;
      }
      if (this.businessType !== "0") {
        if (this.agreementNoValue === "") {
          this.$toast("请选择代理人协议号");
          return;
        }
      }
      if (this.codeName == "" && !this.$route.query.url) {
        this.$toast("请选择决策单元");
        return;
      }
      if (this.businessType == "0") {
        //如果选择了直接业务代理协议号相关的要清空
        this.agreementNoValue = "";
        this.agreementNo = "";
        this.proxyName = "";
        this.proxyCode = "";
        this.agreementOwner = "";
      }
      var newData = {
        businessType: this.businessType || "",
        agreementNo: this.agreementNo || "",
        proxyName: this.proxyName || "",
        proxyCode: this.proxyCode || "",
        agreementOwner: this.agreementOwner || "",
        codeCode: this.unitList.codeCode || "",
        codeName: this.unitList.codeName || "",
        unitmainTenanceTypeOne: this.unitList.unitmainTenanceType1 || "",
        unitmainTenanceTypeOneName:
          this.unitList.unitmainTenanceType1Name || "",
        unitmainTenanceTypeTwo: this.unitList.unitmainTenanceType2 || "",
        unitmainTenanceTypeTwoName:
          this.unitList.unitmainTenanceType2Name || "",
      };
      // debugger
      util.setSessionStorageObj("business", newData);
      this.$store.state.my.newBusiness = newData;
      let token = localStorage.getItem("token");

      let shareUrl = `${
        configJs.config.http_base + configJs.config.ctx_base
      }/#/share?vehicleType=${this.$route.query.vehicleType}&token=${token}&`;
      if (this.$store.state.my.newBusiness) {
        Object.keys(this.$store.state.my.newBusiness).map((key) => {
          shareUrl += key + "=" + this.$store.state.my.newBusiness[key] + "&";
        });
      }
      let carTitle = "";
      if (this.$route.query.vehicleType == "02") {
        carTitle = "货车投保转录";
      } else if (this.$route.query.vehicleType == "03") {
        carTitle = "摩托车投保转录";
      } else {
        carTitle = "车险转录";
      }
      shareUrl = shareUrl.substring(shareUrl.length - 1, 0);
      let test0 = encodeURI(shareUrl);
      let test1 = test0.split("&codeName=")[0];
    console.log(test1,'2222222222222222');
      common.goShare({
        shareTitle: carTitle,
        shareText: "",
        shareImgUrl: `${configJs.config.picture_base}/rbt-picture-h5/img/demo/logo.png`,
        shareUrl: test1,
      });
      this.$toast.success("请点击右上角进行分享");
    },
    async createQRcode() {
      if (this.businessType == "") {
        this.$toast("请选择业务来源");
        return;
      }
      if (this.businessType !== "0") {
        if (this.agreementNoValue === "") {
          this.$toast("请选择代理人协议号");
          return;
        }
      }
      if (this.codeName == "" && !this.$route.query.url) {
        this.$toast("请选择决策单元");
        return;
      }
      if (this.businessType == "0") {
        //如果选择了直接业务代理协议号相关的要清空
        this.agreementNoValue = "";
        this.agreementNo = "";
        this.proxyName = "";
        this.proxyCode = "";
        this.agreementOwner = "";
      }
      var newData = {
        businessType: this.businessType || "",
        agreementNo: this.agreementNo || "",
        proxyName: this.proxyName || "",
        proxyCode: this.proxyCode || "",
        agreementOwner: this.agreementOwner || "",
        codeCode: this.unitList.codeCode || "",
        codeName: this.unitList.codeName || "",
        unitmainTenanceTypeOne: this.unitList.unitmainTenanceType1 || "",
        unitmainTenanceTypeOneName:
          this.unitList.unitmainTenanceType1Name || "",
        unitmainTenanceTypeTwo: this.unitList.unitmainTenanceType2 || "",
        unitmainTenanceTypeTwoName:
          this.unitList.unitmainTenanceType2Name || "",
      };
      const res = await this.$axios({
        url: this.$API.API_MY_SAVE,
        method: "post",
        data: newData,
      });
      if (res.code === 0 && res.content.result != "1") {
        this.$toast("提交成功");
        this.$store.state.my.newBusiness = newData;
        util.setSessionStorageObj("business", newData);
        if (this.$route.query.url) {
          this.$router.push({ path: "/QRcode?url=" + this.$route.query.url });
        } else {
          this.$router.push({ path: "/QRcode" });
        }
      } else {
        this.$toast(res.content.resultMessage);
      }
    },

    // 确定按钮
    async ascertain() {
      if (this.businessType == "") {
        this.$toast("请选择业务来源");
        return;
      }
      // if(this.businessType !== "0" ){
      //   if(this.myagreementList[1]&&this.myagreementList[1].length){
      //     if(this.agreementNoValue===''){
      //         this.$toast("请选择代理人协议号");
      //          return;
      //     }
      //   }else if(this.codeName === '' ){
      //     this.$toast("请选择决策单元");
      //     return;
      //   }
      // }
      if (this.businessType !== "0") {
        if (this.agreementNoValue === "") {
          this.$toast("请选择代理人协议号");
          return;
        }
        // }else if (this.codeName === '' ){
        //   this.$toast("1请选择决策单元");
        //   return;
        // }
      }
      if (this.codeName == "" && !this.$route.query.url) {
        this.$toast("请选择决策单元");
        return;
      }
      if (this.businessType == "0") {
        //如果选择了直接业务代理协议号相关的要清空
        this.agreementNoValue = "";
        this.agreementNo = "";
        this.proxyName = "";
        this.proxyCode = "";
        this.agreementOwner = "";
      }
      var newData = {
        businessType: this.businessType || "",
        agreementNo: this.agreementNo || "",
        proxyName: this.proxyName || "",
        proxyCode: this.proxyCode || "",
        agreementOwner: this.agreementOwner || "",
        codeCode: this.unitList.codeCode || "",
        codeName: this.unitList.codeName || "",
        unitmainTenanceTypeOne: this.unitList.unitmainTenanceType1 || "",
        unitmainTenanceTypeOneName:
          this.unitList.unitmainTenanceType1Name || "",
        unitmainTenanceTypeTwo: this.unitList.unitmainTenanceType2 || "",
        unitmainTenanceTypeTwoName:
          this.unitList.unitmainTenanceType2Name || "",
      };
      const res = await this.$axios({
        url: this.$API.API_MY_SAVE,
        method: "post",
        data: newData,
      });
      if (res.code === 0 && res.content.result != "1") {
        this.$toast("提交成功");
        this.$store.state.my.newBusiness = newData;
        if (this.$route.query.url) {
          this.$router.push({ path: "/" + this.$route.query.url });
        } else if (this.$route.query.vehicleType) {
          this.$router.push({
            name: "carInsurance",
            query: {
              vehicleType: this.$route.query.vehicleType,
            },
          });
        } else {
          this.$router.push({ path: "/carInsurance" });
        }
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
    async getSearch() {
      const res = await this.$axios({
        url: this.$API.API_MY_SEARCH,
        method: "get",
        params: {},
      });
      if (res.code === 0 && res.content) {
        this.searchList = res.content;
        util.setSessionStorageObj("searchList", this.searchList);
        var isAgentCode = res.content.agentCode.indexOf("W") != -1;
        if (isAgentCode) {
          this.isValue = true;
        } else {
          this.isTranscribeShowFalg = true;
        }
        this.handlerAgentOrgName = res.content.handlerAgentOrgName;
        this.handlerName = res.content.handlerName;
        this.handlerCode = res.content.handlerCode;
        this.agentCode = res.content.agentCode;
        this.agentName = res.content.agentName;
        this.agentOrgName = res.content.agentOrgName;
        if (res.content.businessType) {
          //以前选中的值要匹配代理协议号数据
          this.dailiList = this.myagreementList[res.content.businessType] || [];
          if (this.dailiList) {
            for (let item of this.dailiList) {
              item.text = item.agreementNo + "-" + item.agentName;
              item.value = item.agentName;
            }
          }

          if (res.content.businessType == "0") {
            this.agentNameValue = "直接业务";
          } else if (res.content.businessType == "1") {
            this.agentNameValue = "个人代理";
          } else if (res.content.businessType == "2") {
            this.agentNameValue = "专业代理";
          } else if (res.content.businessType == "4") {
            this.agentNameValue = "经纪业务—境内经纪";
          } else if (res.content.businessType == "5") {
            this.agentNameValue = "经纪业务—境外经纪";
          } else if (res.content.businessType == "8") {
            this.agentNameValue = "网上业务";
          } else if (res.content.businessType == "9") {
            this.agentNameValue = "兼业代理—银行代理";
          } else if (res.content.businessType == "B") {
            this.agentNameValue = "兼业代理-车行代理";
          } else if (res.content.businessType == "C") {
            this.agentNameValue = "兼业代理-寿代产代理";
          } else if (res.content.businessType == "D") {
            this.agentNameValue = "兼业代理—邮政代理";
          } else if (res.content.businessType == "E") {
            this.agentNameValue = "兼业代理—其他";
          } else if (res.content.businessType == "F") {
            this.agentNameValue = "专业代理-国任销售";
          }
          this.businessType = res.content.businessType;
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
        //决策单元相关
        if (res.content.codeCode) {
          this.codeName = res.content.codeName;
          this.unitList = {
            codeCode: res.content.codeCode,
            codeName: res.content.codeName,
            unitmainTenanceType1: res.content.unitmainTenanceTypeOne,
            unitmainTenanceType1Name: res.content.unitmainTenanceTypeOneName,
            unitmainTenanceType2: res.content.unitmainTenanceTypeTwo,
            unitmainTenanceType2Name: res.content.unitmainTenanceTypeTwoName,
          };
        }
      }
    },
  },
};
</script>>
<style lang="less">
.businessSet {
  .box_business {
    position: fixed;
    bottom: 16%;
    width: 100%;
    .business {
      display: flex;
      justify-content: space-evenly;
      .van-button--small {
        width: 100px;
      }
    }
  }
  // .businessSet_bt {
  //   position: fixed;
  //   bottom: 16%;
  //   left: 25%;
  //   width: 50%;
  //   .bt {
  //     width: 100%;
  //   }
  // }
  // .business_QRcode {
  //   position: fixed;
  //   bottom: 10%;
  //   left: 25%;
  //   width: 50%;
  //   .bt {
  //     width: 100%;
  //   }
  // }
  // .business_Share {
  //   position: fixed;
  //   bottom: 40%;
  //   left: 25%;
  //   width: 50%;
  //   border: 1px solid red;
  //   .bt {
  //     width: 100%;
  //   }
  // }
}
</style>