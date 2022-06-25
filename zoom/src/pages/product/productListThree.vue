<!--  -->
<template>
  <div
    class="noCarPage afe-area-inset-bottom productList"
    style="margin-top: 45px"
  >
    <div>
      <i class="top_bar" :style="{ height: $iosSystem + 'px' }"></i>
      <van-nav-bar title="产品列表" :border="false" :fixed="true">
        <template #left>
          <van-icon name="arrow-left" size="20" @click="onClickLeft" />
        </template>
      </van-nav-bar>
      <div>
        <van-sticky :offset-top="$iosSystem + 45" v-if="agentCode=='S0100080'">
          <div class="tabs-box">
            <van-tabs
              v-model="tabActive"
              class="white"
              title-active-color="blue"
              title-inactive-color="#7c7c7c"
              @click="strike()"
            >
              <van-tab
                v-for="(item, index) in tab"
                :key="index"
                :title="item.channelName"
                plain
                class="tabItems"
              ></van-tab>
            </van-tabs>
          </div>
        </van-sticky>
        <ol class="list-box" v-show="tab[tabActive].items.length">
          <li class="item">
            <van-card
              v-show="seekState"
              :title="item.productName"
              :thumb="item.productImageUrl"
              v-for="(item, index) in tab[0].items2"
              :key="index"
              @click="
                goProductDetail(
                  item.productUrl,
                  item.productTag,
                  item.productImageUrl,
                  item.productName
                )
              "
            >
              <template #title>
                <div class="van-card__title">
                  {{ item.productName }}
                  <img
                    class="van-card__title_icon"
                    v-if="item.activityImgUrl"
                    :src="$CTXBASE + item.activityImgUrl"
                    alt=""
                  />
                </div>
              </template>
              <template #desc>
                <div class="tag" v-if="item.productTag">
                  <van-tag
                    color="#38C1E8"
                    v-for="(tag, i) in item.productTag"
                    :key="i"
                    plain
                    >{{ tag }}</van-tag
                  >
                </div>
                <div class="desc-box" v-html="item.productDesc"></div>
                <div class="list-content">
                  <p class="price">
                    ￥<span>{{ item.productPrice }}</span
                    >元起
                  </p>
                  <p
                    class="add_bar"
                    v-if="
                      item.saleDesc &&
                      userInfo.agentType &&
                      userInfo.agentType != '1' &&
                      userInfo.agentType != '0'
                    "
                    @click.stop="showDrill"
                  >
                    <span class="saleDesc" v-html="item.saleDesc"></span>&nbsp;
                    <van-icon name="arrow" />
                  </p>
                </div>
              </template>
            </van-card>
            <van-card
              v-show="!seekState"
              :title="item.productName"
              :thumb="item.productImageUrl"
              v-for="(item, index) in tab[tabActive].items"
              :key="index"
              @click="
                goProductDetail(
                  item.productUrl,
                  item.productTag,
                  item.productImageUrl,
                  item.productName
                )
              "
            >
              <template #title>
                <div class="van-card__title">
                  {{ item.productName }}
                  <img
                    class="van-card__title_icon"
                    v-if="item.activityImgUrl"
                    :src="$CTXBASE + item.activityImgUrl"
                    alt=""
                  />
                </div>
              </template>
              <template #desc>
                <div class="tag" v-if="item.productTag">
                  <van-tag
                    color="#38C1E8"
                    v-for="(tag, i) in item.productTag"
                    :key="i"
                    plain
                    >{{ tag }}</van-tag
                  >
                </div>
                <div class="desc-box" v-html="item.productDesc"></div>
                <div class="list-content">
                  <p class="price" v-html="item.productPrice"></p>
                  <p
                    class="add_bar"
                    v-if="
                      item.saleDesc &&
                      userInfo.agentType &&
                      userInfo.agentType != '1' &&
                      userInfo.agentType != '0'
                    "
                    @click.stop="showDrill"
                  >
                    <span class="saleDesc" v-html="item.saleDesc"></span>&nbsp;
                    <van-icon name="arrow" />
                  </p>
                </div>
              </template>
              <template #footer>
                <van-button
                  size="mini"
                  type="info"
                  @click.stop="
                    goProductDetail(
                      item.productUrl,
                      item.productTag,
                      item.productImageUrl,
                      item.productName
                    )
                  "
                  >立即投保</van-button
                >
              </template>
            </van-card>
          </li>
        </ol>
        <masonryHint-rules ref="masonryHint"></masonryHint-rules>
        <my-empty
          description="更多产品，敬请期待"
          v-show="
            seekState ? !tab[0].items2.length : !tab[tabActive].items.length
          "
        ></my-empty>
      </div>
    </div>
  </div>
</template>
<script>
import util from "../../assets/js/util/util";
import common from "../../assets/js/util/common";
import life from "../../assets/js/module/life";
import img from "./../../../public/img/account/fenxiang_bai.png";
export default {
  data() {
    return {
      img: img,
      tab: [
        {
          channelType: "chain",
          channelName: "佳美连锁",
          items: [],
          isLoad: false,
        },
        {
          channelType: "clinic",
          channelName: "优选诊所",
          items: [],
          isLoad: false,
        },
       
      ],
      tabActive: 0,
      userInfo: {},
      searchValue: "",
      seekState: false,
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
      agreementList: {},
      transcribePhone: "",
      transcribeName: "",
    };
  },
  async created() {
    this.getToken();
    setTimeout(() => {
      this.getUserInfo()
      this.getSearch();
      this.getMyAgreement();
    }, 1000);
    this.agentCode = this.$route.query.agentCode;
    if (this.$route.query.transcribePhone) {
      this.transcribePhone = this.$route.query.transcribePhone;
      util.setLocalStorageObj("transcribePhone", this.transcribePhone);
      if (this.$route.query.transcribeName) {
        this.transcribeName = this.$route.query.transcribeName;
        util.setLocalStorageObj("transcribeName", this.transcribePhone);
      }
    }
  },
  async mounted() {
    // this.userInfo = (await common.getUserInfo()) || {};

    let tab = util.getSessionStorageObj("productListTab");
    this.tabActive = tab || 0;
    console.log(this.tabActive, "tabActive");
    util.removeSessionStorageObj("productListTab");

    this.getProductList(util.getSessionStorageObj("PRODUCT_LIST"));
    this.getProductList(
      await life.getProductListUnique({
        productSubType: 'all',
        agentCode: this.agentCode,
      })
    );
  },
  methods: {
    async getUserInfo() {
      const res = await this.$axios({
        url: this.$API.API_ACCOUNT_INFO,
        method: "post",
        loading: "false",
      });
      util.setSessionStorageObj("getUserInfoF", res.content);
      if (res.code === 0) {
        localStorage.setItem("agentCode", res.content.userCode);
        this.userInfo = res.content;
      }
    },
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
        if (localStorage.token != res.content.token) {
          localStorage.token = res.content.token;
          localStorage.refreshToken = res.content.refreshToken;
          localStorage.agentCode = res.content.agentCode;
          localStorage.tokenTime = Date.now();
        }
        localStorage.setItem("token", res.content.token);
        localStorage.setItem("refreshToken", res.content.refreshToken);
        localStorage.setItem("agentCode", res.content.agentCode);
        localStorage.setItem("tokenTime", Date.now());
      }
    },

    strike() {
      this.seekState = false;
      this.searchValue = "";
    },
    // 搜索
    async onSearch() {
      if (!this.searchValue) {
        this.$toast("请输入搜索条件");
        return;
      }
      this.seekState = true;
      const res = await this.$axios({
        url: this.$API.API_PRODUCT_LIST_UNIQUE,
        method: "post",
        loading: false,
        data: {
          productSubType: "all",
          agentCode: localStorage.getItem("agentCode"),
          type: sessionStorage.getItem("type"),
          system: sessionStorage.getItem("system"),
          productSearchValue: this.searchValue,
        },
      });
      if (res.code === 0 && res.content.result === "0") {
        this.tab[0].items2 = res.content.productList;
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
    // 分享列表转录
    goShareList() {
      this.goPage("wxSetShift");
    },
    async getProductList(res) {
      if (res && res.code === 0 && res.content.result === "0") {
        this.tab[0].items = res.content.productList.filter((item) => {
          return item.productSubType == "chain";
        });
        this.tab[1].items = res.content.productList.filter((item) => {
          return item.productSubType == "clinic";
        });
        if(this.agentCode=='S0100106'){
          this.tab[0].items = res.content.productList;
        }
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
        util.setLocalStorageObj("searchList", this.searchList);
        this.handlerAgentOrgName = res.content.handlerAgentOrgName;
        this.handlerName = res.content.handlerName;
        this.handlerCode = res.content.handlerCode;
        this.agentCode = res.content.agentCode;
        this.agentName = res.content.agentName;
        this.agentOrgName = res.content.agentOrgName;
      }
    },
    async getMyAgreement() {
      let businessTypeF
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
            util.setLocalStorageObj("agreementList", this.agreementList);
          }
        }

        this.proxyCode = this.agreementList.agentCode;
        this.agreementNo = this.agreementList.agreementNo;
        this.businessType = this.agreementList.businessType;
        this.proxyName = this.agreementList.agentName;

        // this.agreementNoValue = this.agreementList.agreementNo;
      }
    },
    async goProductDetail(url, productTag, productImageUrl, productName) {
      
      util.setSessionStorageObj("productListTab", this.tabActive);
      // this.goPage(url)
      util.setLocalStorageObj("productName", productName);
      util.setLocalStorageObj("home_productTag", productTag);
      util.setLocalStorageObj("home_productImageUrl", productImageUrl);

      // this.$router.push({ path: url });
      if (!this.searchList.proxyName) {
        this.searchList.proxyName = this.agreementList.agentName;
      }
      if (!this.searchList.proxyCode) {
        this.searchList.proxyCode = this.agreementList.agentCode;
      }

      var newData = {
        businessType: this.agreementList.businessType,
        agreementNo: this.agreementList.agreementNo,
        proxyName: this.agreementList.agentName,
        proxyCode: this.agreementList.agentCode,
        agreementOwner: this.searchList.agreementOwner || "",
        codeCode: this.searchList.codeCode || "",
        codeName: this.searchList.codeName || "",
        unitmainTenanceTypeOne: this.searchList.unitmainTenanceTypeOne || "",
        unitmainTenanceTypeOneName:
          this.searchList.unitmainTenanceTypeOneName || "",
        unitmainTenanceTypeTwo: this.searchList.unitmainTenanceTypeTwo || "",
        unitmainTenanceTypeTwoName:
          this.searchList.unitmainTenanceTypeTwoName || "",
      };

      const res = await this.$axios({
        url: this.$API.API_MY_SAVE,
        method: "post",
        data: newData,
      });
      this.$store.state.my.newBusiness = newData;
      // if(res.code == "0" && res.content.result == "0"){
      // }
      util.setLocalStorageObj("sysAgentExpandDTO", newData);
      if (res.code === 0 && res.content.result != "1") {
        if (url) {
          if (this.transcribeName) {
            this.$router.push({
              path:
                url +
                "&transcribePhone=" +
                this.transcribePhone +
                "&transcribeName=" +
                this.transcribeName + "&agentCode=" + this.$route.query.agentCode,
            });
          } else {
            this.$router.push({
              path: url + "&transcribePhone=" + this.transcribePhone + "&agentCode=" + this.$route.query.agentCode,
            });
          }
        }
      } else {
        this.$toast(res.content.resultMessage);
      }
    },
    showDrill() {
      this.$refs.masonryHint.parentMsg(true, this.userInfo.agentType);
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/less/app/home/noCar.less";
#app.iosSystem .productList .van-nav-bar ::after {
  display: none;
}
#app.iosSystem .productList .top_bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 24px;
  background: white;
  z-index: 10000;
}
.productList {
  .van-tab {
    border: 1px solid #5785f4;
    margin: 1px 8px 8px 12px;
    // padding: 3px 0px;
  }
  .van-tabs--line .van-tabs__wrap {
    height: 35px;
  }
}
/deep/.desc-box {
  align-items: baseline;
  line-height: 1px;
  p {
    margin: 1em 0 !important;
  }
}
</style>
