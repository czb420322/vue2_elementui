<!-- 分享转录 -->
<template>
  <div class="share">
    <v-header :title="{ name: '业务信息' }"></v-header>
    <div class="share_cantiner">
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
      <div class="share_btn">
        <van-button class="bt" type="info" size="small" @click="ascertain()"
          >确定</van-button
        >
      </div>
      <!-- <div class="share_QRcode">
        <van-button
          class="bt"
          type="primary"
          size="small"
          @click="transcribeQRcode()"
          >生成二维码</van-button
        >
      </div> -->
    </div>
  </div>
</template>

<script>
import compCheck from "../../assets/js/util/comp-check";
import util from "../../assets/js/util/util";
export default {
  components: {},
  data() {
    return {
      transcribePhone: "",
      transcribeName: "",
      searchList: {}, //serch数据
      businessType: "",
    };
  },
  created() {
    if (this.$route.query.token) {
      localStorage.setItem("token", this.$route.query.token);
      localStorage.setItem("tokenTime", Date.now());
    }
    setTimeout(() => {
      this.getSearch();
    }, 2000);
  },
  //方法集合
  methods: {
    // 手机号输入完成
    verify_Phone() {
      compCheck.isMobile2(this.transcribePhone, "请输入正确的工号");
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
      }
    },

    // 点击确定
    async ascertain() {
      if (!this.transcribePhone) {
        this.$toast("请输入转录人工号");
        return;
      }
      if (this.transcribePhone) {
        compCheck.isMobile2(this.transcribePhone, "请输入正确的手机格式");
        if (compCheck.isMobile2(this.transcribePhone, "请输入正确的手机格式")) {
          if (this.transcribeName) {
            compCheck.isName2(this.transcribeName, "请输入正确格式的姓名");
            if (
              compCheck.isName2(this.transcribeName, "请输入正确格式的姓名")
            ) {
              var newData = {
                businessType: this.$route.query.businessType || "",
                agreementNo: this.$route.query.agreementNo || "",
                proxyName: this.$route.query.proxyName || "",
                proxyCode: this.$route.query.proxyCode || "",
                agreementOwner: this.$route.query.agreementOwner || "",
                codeCode: this.$route.query.codeCode || "",
                codeName: this.$route.query.codeName || "",
                unitmainTenanceTypeOne:
                  this.$route.query.unitmainTenanceTypeOne || "",
                unitmainTenanceTypeOneName:
                  this.$route.query.unitmainTenanceTypeOneName || "",
                unitmainTenanceTypeTwo:
                  this.$route.query.unitmainTenanceTypeTwo || "",
                unitmainTenanceTypeTwoName:
                  this.$route.query.unitmainTenanceTypeTwoName || "",
              };

              this.$store.state.my.newBusiness = newData;
              util.setLocalStorageObj("transcribePhone", this.transcribePhone);
              util.setLocalStorageObj("transcribeName", this.transcribeName);
              if (this.$route.query.url) {
                this.$router.push({
                  path:
                    "/" +
                    this.$route.query.url +
                    "&transcribePhone=" +
                    this.transcribePhone +
                    "&transcribeName=" +
                    this.transcribeName +
                    "&agreementNo=" +
                    this.$route.query.agreementNo +
                    "&agreementOwner=" +
                    this.$route.query.agreementOwner +
                    "&businessType=" +
                    this.$route.query.businessType +
                    "&codeCode=" +
                    this.$route.query.codeCode +
                    "&proxyCode=" +
                    this.$route.query.proxyCode +
                    "&proxyName=" +
                    this.$route.query.proxyName +
                    "&token=" +
                    this.$route.query.token,
                });
              } else {
                this.$router.push({
                  path:
                    "/carInsurance?vehicleType=" +
                    this.$route.query.vehicleType +
                    "&transcribePhone=" +
                    this.transcribePhone +
                    "&transcribeName=" +
                    this.transcribeName +
                    "&agreementNo=" +
                    this.$route.query.agreementNo +
                    "&agreementOwner=" +
                    this.$route.query.agreementOwner +
                    "&businessType=" +
                    this.$route.query.businessType +
                    "&codeCode=" +
                    this.$route.query.codeCode +
                    "&proxyCode=" +
                    this.$route.query.proxyCode +
                    "&proxyName=" +
                    this.$route.query.proxyName +
                    "&token=" +
                    this.$route.query.token,
                });
              }
            }
          } else {
            var newData = {
              businessType: this.$route.query.businessType || "",
              agreementNo: this.$route.query.agreementNo || "",
              proxyName: this.$route.query.proxyName || "",
              proxyCode: this.$route.query.proxyCode || "",
              agreementOwner: this.$route.query.agreementOwner || "",
              codeCode: this.$route.query.codeCode || "",
              codeName: this.$route.query.codeName || "",
              unitmainTenanceTypeOne:
                this.$route.query.unitmainTenanceTypeOne || "",
              unitmainTenanceTypeOneName:
                this.$route.query.unitmainTenanceTypeOneName || "",
              unitmainTenanceTypeTwo:
                this.$route.query.unitmainTenanceTypeTwo || "",
              unitmainTenanceTypeTwoName:
                this.$route.query.unitmainTenanceTypeTwoName || "",
            };
            this.$store.state.my.newBusiness = newData;
            util.setLocalStorageObj("transcribePhone", this.transcribePhone);
            if (this.$route.query.url) {
              this.$router.push({
                path:
                  "/" +
                  this.$route.query.url +
                  "&transcribePhone=" +
                  this.transcribePhone +
                  "&agreementNo=" +
                  this.$route.query.agreementNo +
                  "&agreementOwner=" +
                  this.$route.query.agreementOwner +
                  "&businessType=" +
                  this.$route.query.businessType +
                  "&codeCode=" +
                  this.$route.query.codeCode +
                  "&proxyCode=" +
                  this.$route.query.proxyCode +
                  "&proxyName=" +
                  this.$route.query.proxyName +
                  "&token=" +
                  this.$route.query.token,
              });
            } else {
              this.$router.push({
                name: "carInsurance",
                query: {
                  vehicleType: this.$route.query.vehicleType,
                  transcribePhone: this.transcribePhone,
                  agreementNo: this.$route.query.agreementNo,
                  agreementOwner: this.$route.query.agreementOwner,
                  businessType: this.$route.query.businessType,
                  codeCode: this.$route.query.codeCode,
                  proxyCode: this.$route.query.proxyCode,
                  proxyName: this.$route.query.proxyName,
                  token: this.$route.query.token,
                },
              });
              // this.$router.push({
              //   path:
              //     "/carInsurance?vehicleType=" +
              //     this.$route.query.vehicleType +
              //     "&transcribePhone=" +
              //     this.transcribePhone +
              //     "&agreementNo=" +
              //     this.$route.query.agreementNo +
              //     "&agreementOwner=" +
              //     this.$route.query.agreementOwner +
              //     "&businessType=" +
              //     this.$route.query.businessType +
              //     "&codeCode=" +
              //     this.$route.query.codeCode +
              //     "&proxyCode=" +
              //     this.$route.query.proxyCode +
              //     "&proxyName=" +
              //     this.$route.query.proxyName +
              //     "&token=" +
              //     this.$route.query.token,
              // });
            }
          }
        }
      }
    },
    // 生成转录二维码
    async transcribeQRcode() {
      if (!this.transcribePhone) {
        this.$toast("请输入转录人工号");
        return;
      }
      var newData = {
        businessType: this.searchList.businessType || "",
        agreementNo: this.searchList.agreementNo || "",
        proxyName: this.searchList.proxyName || "",
        proxyCode: this.searchList.proxyCode || "",
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
      util.setSessionStorageObj("business", newData);
      if (this.transcribePhone) {
        compCheck.isMobile2(this.transcribePhone, "请输入正确的手机格式");
        if (compCheck.isMobile2(this.transcribePhone, "请输入正确的手机格式")) {
          if (this.transcribeName) {
            compCheck.isName2(this.transcribeName, "请输入正确格式的姓名");
            if (
              compCheck.isName2(this.transcribeName, "请输入正确格式的姓名")
            ) {
              const res = await this.$axios({
                url: this.$API.API_MY_SAVE,
                method: "post",
                data: newData,
              });
              if (res.code === 0 && res.content.result != "1") {
                this.$store.state.my.newBusiness = newData;
                util.setLocalStorageObj(
                  "transcribePhone",
                  this.transcribePhone
                );
                util.setLocalStorageObj("transcribeName", this.transcribeName);
                if (this.$route.query.url) {
                  this.$router.push({
                    path:
                      "/QRcode?url=" +
                      this.$route.query.url +
                      "&transcribePhone=" +
                      this.transcribePhone +
                      "&transcribeName=" +
                      this.transcribeName,
                  });
                } else {
                  this.$router.push({
                    path:
                      "/QRcode?transcribePhone=" +
                      this.transcribePhone +
                      "&transcribeName=" +
                      this.transcribeName,
                  });
                }
              }
            }
          } else {
            const res = await this.$axios({
              url: this.$API.API_MY_SAVE,
              method: "post",
              data: newData,
            });
            if (res.code === 0 && res.content.result != "1") {
              this.$store.state.my.newBusiness = newData;
              util.setLocalStorageObj("transcribePhone", this.transcribePhone);
              if (this.$route.query.url) {
                this.$router.push({
                  path:
                    "/QRcode?url=" +
                    this.$route.query.url +
                    "&transcribePhone=" +
                    this.transcribePhone,
                });
              } else {
                this.$router.push({
                  path: "/QRcode?transcribePhone=" + this.transcribePhone,
                });
              }
            }
          }
        }
      }
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.share_cantiner {
  padding-top: 46px;
  .share_btn {
    position: fixed;
    bottom: 16%;
    left: 25%;
    width: 50%;
    .bt {
      width: 100%;
    }
  }
  .share_QRcode {
    position: fixed;
    bottom: 10%;
    left: 25%;
    width: 50%;
    .bt {
      width: 100%;
    }
  }
}
</style>