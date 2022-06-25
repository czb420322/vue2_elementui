<template>
  <div class="box" ref="imageDom1">
    <div class="img_box">
      <div class="detailImg">
        <img :src="detailImg" alt="" />
        <!-- <img src="../../assets/img/login/RBT0001fx.png" alt="" /> -->
      </div>
      <div class="posotion" v-if="detailImg">
        <img src="../../assets/img/login/logo.png" alt="" />
        <ul class="posotion_list">
          <li class="name">
            {{ searchList.shareShowName }}
          </li>
          <li>
            <span class="list_item">联系方式: </span
            ><span v-if="searchList.shareShowMobile!=''">{{ form(searchList.shareShowMobile) }}</span>
            <span v-if="searchList.shareShowMobile==''">---</span>
          </li>
          <li>
            <span class="list_item">执业号: </span
            >{{ searchList.shareShowOperationNo }}
          </li>
          <li class="shareShowOrg">
            <span class="list_item">机构所在地: </span
            >{{ searchList.shareShowOrg }}
          </li>
        </ul>
        <div class="code">
          <vue-qr
            class="icon"
            :logoScale="20"
            :margin="5"
            :size="216"
            :text="shareCode"
            :logoSrc="config.imagePath"
          ></vue-qr>
        </div>
        <div class="tips">*温馨提示: 本产品只限机构所在地销售</div>
      </div>
    </div>
    <img  v-if="detailImg" class="photo" :src="imgUrl" alt="" />
  </div>
</template>
<script>
import util from "../../assets/js/util/util";
import vueQr from "vue-qr";
import { mapState } from "vuex";
import configJs from "./../../config";
import html2canvas from "html2canvas";
export default {
  components: {
    vueQr,
  },
  data() {
    return {
      config: {
        imagePath: require("../../assets/img/login/logo2.png"), //中间logo的地址
      },
      imgUrl: "",
      detailImg: "",
      falg: false,
      agencyFalg: false,
      transcribeFalg: false, //是否转录
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
      business: "",
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
    console.log(this.$route.query, "qqqqqqqqqqqqqq");
    this.QRToken = localStorage.token;
    this.business = util.getSessionStorageObj("business");
    console.log(this.myagreementList, "111");
    if (this.$route.query.transcribePhone) {
      this.transcribeInfo.transcribePhone = this.$route.query.transcribePhone;
      if (this.$route.query.transcribeName) {
        this.transcribeInfo.transcribeName = this.$route.query.transcribeName;
      }
    }

    this.getDetail();
    this.getSearch();
    this.getProduct();
  },
  methods: {
    html2canvas() {
      setTimeout(() => {
        html2canvas(this.$refs.imageDom1, {
          useCORS: true,
          windowWidth: document.body.scrollWidth,
          windowHeight: document.body.scrollHeight,
          allowTaint: true,
        }).then((canvas) => {
          // 转成图片，生成图片地址
          this.imgUrl = canvas.toDataURL("image/png"); //可将 canvas 转为 base64 格式
        });
      }, 1000);
    },
    async getDetail() {
      let productDetail = util.getSessionStorageObj("productDetail");
      let res = "";
      if (productDetail) {
        res = productDetail;
      } else if (this.$route.query.saleCode) {
        res = await this.$axios({
          url: this.$API.API_PRODUCT_DETAIL,
          method: "post",
          data: {
            saleCode: this.$route.query.saleCode,
            type: sessionStorage.getItem("type"),
            system: sessionStorage.getItem("system"),
          },
        });
        this.detailImg = res.content.shareShowPic;
        this.html2canvas();
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
        console.log(this.searchList, "123");
      }
    },
    form(mobile) {
      return String(mobile).replace(/(?=(\d{4})+$)/g, "-");
    },
    // 生成二维码
    getProduct() {
      if (util.getLocalStorageObj("productName")) {
        this.productName = util.getLocalStorageObj("productName");
        this.carFalg = true;
      }
      if (
        this.$route.query.transcribePhone ||
        this.$route.query.transcribeName
      ) {
        if (this.$route.query) {
          this.shareCode = `${
            configJs.config.http_base + configJs.config.ctx_base
          }/#/productDetail?${this.$route.query}&transcribePhone=${
            this.$route.query.transcribePhone
          }&transcribeName=${this.$route.query.transcribeName}&token=${
            this.QRToken
          }&saleCode=${this.$route.query.saleCode}&proxyName=${
            this.$route.query.proxyName
          }&proxyCode=${this.$route.query.proxyCode}&codeCode=${
            this.$route.query.codeCode
          }&businessType=${this.$route.query.businessType}&agreementOwner=${
            this.$route.query.agreementOwner
          }&agreementNo=${
            this.$route.query.agreementNo
          }&time=${new Date().getTime()}`;
        } else {
          this.shareCode = `${
            configJs.config.http_base + configJs.config.ctx_base
          }/#/carInsurance?transcribePhone=${
            this.$route.query.transcribePhone
          }&transcribeName=${this.$route.query.transcribeName}token=${
            this.QRToken
          }`;
        }
      } else {
        // 直接生成二维码
        if (this.$route.query) {
          this.shareCode = `${
            configJs.config.http_base + configJs.config.ctx_base
          }/#/productDetail?token=${this.$route.query.token}&saleCode=${
            this.$route.query.saleCode
          }&proxyName=${this.$route.query.proxyName}&proxyCode=${
            this.$route.query.proxyCode
          }&codeCode=${this.$route.query.codeCode}&businessType=${
            this.$route.query.businessType
          }&agreementOwner=${this.$route.query.agreementOwner}&agreementNo=${
            this.$route.query.agreementNo
          }&time=${new Date().getTime()}`;
        }
      }
    },
  },
};
</script>
<style lang="less">
#app {
  width: 100%;
  height: 100%;
}
.img_box {
  width: 100%;
  height: 100%;
  font-size: .625rem;
  position: relative;
  .detailImg {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.posotion {
  width: 100%;
  position: absolute;
  top: 66%;
  left: 0;
  margin: 0 1.25rem;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  .list_item {
    color: gray;
    line-height: 1.375rem;
  }
  .name {
    font-size: .875rem;
    font-weight: bold;
  }
}
.icon {
  position: absolute;
  bottom: .1875rem;
  right: 1.9375rem;
  width:6.25rem;
  height:6.25rem;
}
.tips {
  position: absolute;
  text-align: center;
  width: 100%;
  margin: .375rem 0;
  color: grey;
  font-size: 11px;
}
.photo {
  display: block;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}
.box {
  width: 100%;
  height: 100%;
}
.shareShowOrg{
  max-width: 12.5rem;
}
</style>