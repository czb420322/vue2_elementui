<template>
  <div class="read" :style="{ 'margin-top': $iosSystem + 46 + 'px' }">
    <v-header :title="{ name: title }"></v-header>
    <div class="read_div">
      <div
        class="content_txt"
        v-if="title == '投保须知'"
        :style="{ top: $iosSystem + 46 + 'px' }"
      >
        <iframe
          id="iframe"
          class="iframe_tk"
          :src="
            http_base + '/rbt-picture-h5/pdf/pdf/tbxz2/' + saleCode + '-tb.html'
          "
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>
      <div
        class="content_txt"
        v-else-if="title == '常见问题'"
        :style="{ top: $iosSystem + 46 + 'px' }"
      >
        <iframe
          class="iframe_tk"
          :src="
            http_base +
            '/rbt-picture-h5/pdf/pdf/cjwt2/' +
            saleCode +
            '-cjwt.html'
          "
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>
      <div
        class="content_txt"
        v-else-if="title == '产品费率'"
        :style="{ top: $iosSystem + 46 + 'px' }"
      >
        <iframe
          class="iframe_tk"
          :src="
            http_base +
            '/rbt-picture-h5/pdf/pdf/cpfl2/' +
            saleCode +
            '-cpfl.html'
          "
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>
      <div
        class="content_txt"
        v-else-if="title == '健康告知'"
        :style="{ top: $iosSystem + 46 + 'px' }"
      >
        <iframe
          class="iframe_tk"
          :src="
            http_base +
            '/rbt-picture-h5/pdf/pdf/jkgz2/' +
            saleCode +
            '-jkgz.html'
          "
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>
      <div
        class="content_txt"
        v-else-if="title == '健康指南'"
        :style="{ top: $iosSystem + 46 + 'px' }"
      >
        <iframe
          class="iframe_tk"
          :src="
            http_base +
            '/rbt-picture-h5/pdf/pdf/jkzn2/' +
            saleCode +
            '-jkzn.html'
          "
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>
      <div
        class="content_txt"
        v-else-if="title == '理赔服务'"
        :style="{ top: $iosSystem + 46 + 'px' }"
      >
        <iframe
          class="iframe_tk"
          :src="
            http_base +
            '/rbt-picture-h5/pdf/pdf/lpfw2/' +
            saleCode +
            '-lpfw.html'
          "
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>
      <div
        class="content_txt"
        v-else-if="title == '特药清单'"
        :style="{ top: $iosSystem + 46 + 'px' }"
      >
        <iframe
          class="iframe_tk"
          :src="
            http_base +
            '/rbt-picture-h5/pdf/pdf/tyqd2/' +
            saleCode +
            '-tyqd.html'
          "
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>
      <div
        class="content_txt"
        v-else-if="title == '保险条款'"
        :style="{ top: $iosSystem + 46 + 'px' }"
      >
        <iframe
          class="iframe_tk"
          :src="
            http_base + '/rbt-picture-h5/pdf/pdf/tk2/' + saleCode + '_TK.html'
          "
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>

      <div
        class="content_txt"
        v-else-if="title == '职业列表'"
        :style="{ top: $iosSystem + 46 + 'px' }"
        style="bottom: 1%"
      >
        <iframe
          class="iframe_tk"
          :src="http_base + '/rbt-picture-h5/pdf/pdf/zylb2/grywbxzylb-zy.html'"
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>
      <div
        class="content_txt"
        v-else-if="
          title == '人身保险伤残评定标准' &&
          (saleCode == 'GRMOBILE_MALL_SL047' ||
            saleCode == 'GRMOBILE_MALL_SL048')
        "
        :style="{ top: $iosSystem + 46 + 'px' }"
        style="bottom: 1%"
      >
        <iframe
          class="iframe_tk"
          :src="
            http_base + '/rbt-picture-h5/pdf/pdf/zhiliaoxiangmu/zlxm_47_48.html'
          "
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>
      <div
        class="content_txt"
        v-else-if="title == '人身保险伤残评定标准'"
        :style="{ top: $iosSystem + 46 + 'px' }"
        style="bottom: 1%"
      >
        <iframe
          class="iframe_tk"
          :src="http_base + '/rbt-picture-h5/pdf/pdf/zerenshuoming/ywzr.html'"
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>

      <div
        class="content_txt"
        v-else-if="title == '全天候保险代理股份有限公司客户告知书'"
        :style="{ top: $iosSystem + 46 + 'px' }"
        style="bottom: 1%"
      >
        <iframe
          class="iframe_tk"
          :src="
            http_base + '/rbt-picture-h5/pdf/pdf/gzs/' + saleCode + '-gzs.html'
          "
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>
      <div
        class="content_txt"
        v-else-if="title == '经纪服务委托协议书'"
        :style="{ top: $iosSystem + 46 + 'px' }"
        style="bottom: 1%"
      >
        <iframe
          class="iframe_tk"
          :src="
            http_base +
            '/rbt-picture-h5/pdf/pdf/wtxx2/' +
            saleCode +
            '-wtxx.html'
          "
          frameborder="0"
          width="100%"
          height="100%"
        ></iframe>
      </div>
      <div
        class="read_bt"
        v-show="
          book &&
          (title == '投保须知' ||
            title == '保险条款' ||
            title == '常见问题' ||
            title == '健康告知' ||
            title == '产品费率' ||
            title == '健康指南' ||
            title == '理赔服务' ||
            title == '特药清单' ||
            title == '职业列表' ||
            title == '全天候保险代理股份有限公司客户告知书' ||
            title == '经纪服务委托协议书' ||
            title == '个人信息处理授权协议')
        "
      >
        <van-button
          color="linear-gradient(to right, #2E6EF7, #029EFF)"
          block
          @click="haveRead()"
          :disabled="showBT"
          >我已阅读并同意</van-button
        >
      </div>
      <!-- 签名 -->
      <v-esign ref="esign"></v-esign>
      <ssm v-if="isbig"></ssm>
    </div>
  </div>
</template>

<script>
import EventBus from "../../../assets/js/util/EventBus";
import vEsign from "@/templates/esign.vue";
import util from "../../../assets/js/util/util";
import glutton from "../../../assets/js/util/glutton";
import configJs from "./../../../config.js";
import ssm from './ssm.vue'
export default {
  components: {
    vEsign,
    ssm
  },
  data() {
    return {
      isbig: false, //控制短信的弹窗
      title: "",
      book: true,
      saleCode: "",
      index: "",
      showBT: false, //进入页面的按钮状态
      look: 0,
      orderNo: "",
      http_base:
        configJs.config.picture_base || "https://devyun.guorenpcic.com",
      // http_base: 'https://devyun.guorenpcic.com'
      pageData: {},
    };
  },
  created() {
    if (sessionStorage.orderDetailInfo) {
      this.pageData = JSON.parse(sessionStorage.orderDetailInfo);
    }
    this.book = this.$route.query.book || true;
    this.title = this.$route.query.title;
    this.saleCode = this.$route.query.productCode;
    this.look = this.$route.query.look || 0;
    this.orderNo = this.$route.query.orderNo;
    sessionStorage.setItem;
    window.GluttonContext.traceNo = sessionStorage.traceNo || "";
    // window.GluttonContext.orderNo = this.$route.query.orderNo;
    // window.GluttonContext.policyHolderIdNo = this.pageData.insured[0].idNo;
    // window.GluttonContext.policyHolderMobile = this.pageData.insured[0].mobile;
    // window.GluttonContext.policyHolderName = this.pageData.insured[0].name;
    glutton.startRecording(); // 回溯录制3
    this.pageData = JSON.parse(sessionStorage.getItem("orderDetailInfo"));
  },
  async mounted() {
    await glutton.glutton.forceSubmit();
    //   window.addEventListener("scroll", this.handleScroll, true);
  },

  // destroyed() {
  //   window.removeEventListener("scroll", this.handleScroll);
  // },
  methods: {
    //滑到底部才能点击我已阅读
    // handleScroll(e) {
    //   if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
    //     console.log("已经到底部了");
    //     this.showBT = false;
    //   }
    // },
    async handleReset() {
      console.info("重置签名");
      this.$refs.esign.reset();
    },
    async handleGenerate() {
      console.info("生成签名");
      var _this = this;
      _this.$refs.esign
        .generate()
        .then((res) => {
          console.info("签名res:" + JSON.stringify(res));
          _this.signImgUrl = res;
          _this.show = false;
        })
        .catch((err) => {
          _this.show = false;
          _this.$toast(err); // 画布没有签字时会执行这里 'Not Signned'
        });
    },
    setSignImgUrl(img) {
      if (!img) {
        this.$toast("请签署姓名！");
        return;
      }
      // 转成文件
      var tofile = this.btof(img, "upfile");
      if (tofile.size < 3500) {
        this.$toast("您的签名不合规，请签署正确的签名");
        return;
      }
      this.signImgUrl = img;
      EventBus.$emit("GlobalLoadingTrigger", true);
      this.updSignature();
    },
    //上传签名
    async updSignature() {
      // 转成文件
      var tofile = this.btof(this.signImgUrl, "upfile");
      setTimeout(async () => {
        var formdata = new FormData();
        formdata.append("file", tofile);
        formdata.append("fileGroup", "QM"); //类型
        formdata.append("businessNo", this.orderNo); //订单号
        this.commonInstance
          .post(this.$API.API_CARUPLOADQM, formdata)
          .then((res) => {
            EventBus.$emit("GlobalLoadingTrigger", false);
            if (res.data.code == 0 && res.data.content.code == 0) {
              util.setSessionStorageObj("clauseSetBook", true);
              this.goPage("wxOrderDetail?orderNo=" + this.orderNo);
            } else {
              this.signImgUrl = "";
              this.$toast("上传失败");
            }
          });
      });
    },
    // base64 转file
    btof(data, fileName) {
      const dataArr = data.split(",");
      const byteString = atob(dataArr[1]);

      const options = {
        type: "image/jpeg",
        endings: "native",
      };
      const u8Arr = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        u8Arr[i] = byteString.charCodeAt(i);
      }
      return new File([u8Arr], fileName + ".jpg", options);
    },
    haveRead() {
      this.isbig=true;
      //  //三秒后执行按钮
      //  setTimeout(() => {
      //   this.$router.replace({path: '/read?title=' + title + '&productCode=' + this.saleCode + '&orderNo=' + this.orderNo})
      //   window.location.reload()
      // }, 3000)
      // this.showBT = true;
      if (this.saleCode == "RBTMOBILE_MALL_RBT0008") {
        if (this.title == "投保须知" && this.look == 0) {
          util.setSessionStorageObj("noticeSetBook", true);
          if (!util.getSessionStorageObj("clauseSetBook")) {
            this.goPage(
              "read?title=" +
                "保险条款" +
                "&productCode=" +
                this.saleCode +
                "&orderNo=" +
                this.orderNo
            );
            this.showBT = false;
            window.location.reload();
          }
        } else if (this.title == "保险条款" && this.look == 0) {
          util.setSessionStorageObj("clauseSetBook", true);
          if (!util.getSessionStorageObj("settlementSetBook")) {
            this.goPage(
              "read?title=" +
                "理赔服务" +
                "&productCode=" +
                this.saleCode +
                "&orderNo=" +
                this.orderNo
            );
            this.showBT = false;
            window.location.reload();
          }
        } else if (this.title == "理赔服务" && this.look == 0) {
          util.setSessionStorageObj("settlementSetBook", true);
          if (!util.getSessionStorageObj("questionSetBook")) {
            this.goPage(
              "read?title=" +
                "常见问题" +
                "&productCode=" +
                this.saleCode +
                "&orderNo=" +
                this.orderNo
            );
            this.showBT = false;
            window.location.reload();
          }
        } else if (this.title == "常见问题" && this.look == 0) {
          util.setSessionStorageObj("questionSetBook", true);
          if (!util.getSessionStorageObj("guideSetBook")) {
            this.goPage(
              "read?title=" +
                "健康指南" +
                "&productCode=" +
                this.saleCode +
                "&orderNo=" +
                this.orderNo
            );
            this.showBT = false;
            window.location.reload();
          }
        } else if (this.title == "健康指南" && this.look == 0) {
          util.setSessionStorageObj("guideSetBook", true);
          if (!util.getSessionStorageObj("inventorySetBook")) {
            this.goPage(
              "read?title=" +
                "特药清单" +
                "&productCode=" +
                this.saleCode +
                "&orderNo=" +
                this.orderNo
            );
            this.showBT = false;
            window.location.reload();
          }
        } else if (this.title == "特药清单" && this.look == 0) {
          util.setSessionStorageObj("inventorySetBook", true);
          this.showBT = false;
          if (this.look == 1) {
            this.$router.go(-1);
          } else if (util.getSessionStorageObj("inventorySetBook")) {
            this.showDialog();
          }
        } else {
          this.$router.go(-1);
        }
      } else if (this.saleCode == "RBTMOBILE_MALL_RBT0009") {
        if (this.title == "投保须知" && this.look == 0) {
          util.setSessionStorageObj("noticeSetBook", true);
          if (!util.getSessionStorageObj("clauseSetBook")) {
            this.goPage(
              "read?title=" +
                "保险条款" +
                "&productCode=" +
                this.saleCode +
                "&orderNo=" +
                this.orderNo
            );
            this.showBT = false;
            window.location.reload();
          }
        } else if (this.title == "保险条款" && this.look == 0) {
          util.setSessionStorageObj("clauseSetBook", true);
          if (!util.getSessionStorageObj("settlementSetBook")) {
            this.goPage(
              "read?title=" +
                "理赔服务" +
                "&productCode=" +
                this.saleCode +
                "&orderNo=" +
                this.orderNo
            );
            this.showBT = false;
            window.location.reload();
          }
        } else if (this.title == "理赔服务" && this.look == 0) {
          util.setSessionStorageObj("settlementSetBook", true);
          if (!util.getSessionStorageObj("questionSetBook")) {
            this.goPage(
              "read?title=" +
                "常见问题" +
                "&productCode=" +
                this.saleCode +
                "&orderNo=" +
                this.orderNo
            );
            this.showBT = false;
            window.location.reload();
          }
        } else if (this.title == "常见问题" && this.look == 0) {
          util.setSessionStorageObj("questionSetBook", true);
          if (!util.getSessionStorageObj("rateSetBook")) {
            this.goPage(
              "read?title=" +
                "产品费率" +
                "&productCode=" +
                this.saleCode +
                "&orderNo=" +
                this.orderNo
            );
            this.showBT = false;
            window.location.reload();
          }
        } else if (this.title == "产品费率" && this.look == 0) {
          util.setSessionStorageObj("rateSetBook", true);
          this.showBT = false;
          if (this.look == 1) {
            this.$router.go(-1);
          } else if (util.getSessionStorageObj("rateSetBook")) {
            this.showDialog();
          }
        } else {
          this.$router.go(-1);
        }
      } else if (this.saleCode == "RBTMOBILE_MALL_RBT0019") {
        if (this.title == "投保须知" && this.look == 0) {
          util.setSessionStorageObj("noticeSetBook", true);
          if (!util.getSessionStorageObj("clauseSetBook")) {
            this.goPage(
              "read?title=" +
                "保险条款" +
                "&productCode=" +
                this.saleCode +
                "&orderNo=" +
                this.orderNo
            );
            this.showBT = false;
            window.location.reload();
          }
        } else if (this.title == "保险条款" && this.look == 0) {
          util.setSessionStorageObj("clauseSetBook", true);
          if (!util.getSessionStorageObj("clientInformSetBook")) {
            this.goPage(
              "read?title=" +
                "全天候保险代理股份有限公司客户告知书" +
                "&productCode=" +
                this.saleCode +
                "&orderNo=" +
                this.orderNo
            );
            this.showBT = false;
            window.location.reload();
          }
        } else if (
          this.title == "全天候保险代理股份有限公司客户告知书" &&
          this.look == 0
        ) {
          util.setSessionStorageObj("clientInformSetBook", true);
          this.showBT = false;
          if (this.look == 1) {
            this.$router.go(-1);
          } else if (util.getSessionStorageObj("clientInformSetBook")) {
            this.showDialog();
          } else {
            this.$router.go(-1);
          }
        }
      } else if (
        this.saleCode == "RBTMOBILE_MALL_RBT0018" ||
        this.saleCode == "RBTMOBILE_MALL_RBT0020" ||
        this.saleCode == "RBTMOBILE_MALL_RBT0021" ||
        this.saleCode == "RBTMOBILE_MALL_RBT0022" ||
        this.saleCode == "RBTMOBILE_MALL_RBT0023" ||
        this.saleCode == "RBTMOBILE_MALL_RBT0024" ||
        this.saleCode == "RBTMOBILE_MALL_RBT0025" ||
        this.saleCode == "RBTMOBILE_MALL_RBT0027" ||
        this.saleCode == "RBTMOBILE_MALL_RBT0028" ||
        this.saleCode == "RBTMOBILE_MALL_RBT0030"
      ) {
        if (this.title == "投保须知" && this.look == 0) {
          util.setSessionStorageObj("noticeSetBook", true);
          if (!util.getSessionStorageObj("clauseSetBook")) {
            this.goPage(
              "read?title=" +
                "保险条款" +
                "&productCode=" +
                this.saleCode +
                "&orderNo=" +
                this.orderNo
            );
            this.showBT = false;
            window.location.reload();
          }
        } else if (this.title == "保险条款" && this.look == 0) {
          util.setSessionStorageObj("clauseSetBook", true);
          if (!util.getScopeType("serveSetBook")) {
            this.goPage(
              "read?title=" +
                "经纪服务委托协议书" +
                "&productCode=" +
                this.saleCode +
                "&orderNo=" +
                this.orderNo
            );
            this.showBT = false;
            window.location.reload();
          }
        } else if (this.title == "经纪服务委托协议书" && this.look == 0) {
          util.setSessionStorageObj("serveSetBook", true);
          this.showBT = false;
          if (this.look == 1) {
            this.$router.go(-1);
          } else if (util.getSessionStorageObj("serveSetBook")) {
            this.showDialog();
          } else {
            this.$router.go(-1);
          }
        }
      } else {
        //投保须知必读
        if (this.title == "投保须知") {
          util.setSessionStorageObj("noticeSetBook", true);
          if (!util.getSessionStorageObj("clauseSetBook") && this.look == 0) {
            this.goPage(
              "read?title=" +
                "保险条款" +
                "&productCode=" +
                this.saleCode +
                "&orderNo=" +
                this.orderNo
            );
            window.location.reload();
            this.showBT = false;
          } else {
            this.$router.go(-1);
          }
        } else if (this.title == "保险条款") {
          //保险条款必读
          // util.setSessionStorageObj("clauseSetBook", true);
          this.showBT = false;
          if (this.look == 1) {
            this.$router.go(-1);
          } else if (util.getSessionStorageObj("noticeSetBook")) {
            this.showDialog();
            this.goPage("wxOrderDetail?orderNo=" + this.orderNo);
          }
        }
      }
    },
    showDialog() {
      this.$refs.esign.parentMsg();
    },
  },
};
</script>

<style lang="less">
.read {
  // .read_div {
  // position: fixed;
  // width: 100%;
  // height: 100%;
  // }
  .content_txt {
    position: fixed;
    width: 100%;
    bottom: 76px;
    padding: 6px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    // padding: .7rem;
    // position: absolute;
    // display: block;
    // // width: 100%;
    // left: 0;
    // right: 0;
    // top: 0;
    // bottom: 20%;
    // width: 100%;
    // height: 78%;
    // bottom: 12%;
    // padding: 6px;
    // -webkit-overflow-scrolling: touch;
    // overflow: scroll;
    // iframe{
    //   width: 1px;
    //         min-width: 100%;
    //         *width: 100%;
    //   // width: 100%;
    //   height: 100%;
    // }
  }
  .read_bt {
    margin: 16px 5%;
    position: fixed;
    bottom: 0;
    width: 90%;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    .carClause_bt_name {
      text-align: center;
      font-size: 14px;
      color: #f4bd00;
    }
  }
}
</style>
