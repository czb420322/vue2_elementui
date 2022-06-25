<template>
  <div class="addvictim">
    <div class="addleft">
      <form ref="victFrom">
        <p class="tilte_top">
          <b>|</b>&nbsp;&nbsp;受害人目标信息
        </p>
        <p>
          <span>
            <b class="must">*</b>受害人名称:
          </span>
          <input
            type="text"
            v-model="VictimName"
            maxlength="30"
            :disabled="victimSee"
            style="width:3rem"
            placeholder="请输入受害人名称"
          >
          <b class="mustText" v-show="VictimNameMust">受害人名称为必填项
            <i></i>
          </b>
        </p>
        <p>
          <span>受害人性别:</span>
          <el-select v-model="VictimSex" :disabled="victimSee">
            <el-option
              v-for="(item,index) in VictimSexs"
              :value="item.value"
              :label="item.text"
              :key="index"
            ></el-option>
          </el-select>
        </p>
        <p>
          <span>受害人手机号:</span>
          <input
            type="text"
            v-model="VictimNumber"
            maxlength="11"
            @blur="checkPhone"
            :disabled="victimSee"
            style="width:40%"
            placeholder="请输入受害人手机号"
          >
          <b class="mustText" v-show="VictimphoneMust">请输入正确的手机号
            <i></i>
          </b>
          <b class="mustText" v-show="Victimphone">此手机号已存在
            <i></i>
          </b>
        </p>
        <p class="idcard">
          <span>受害人身份证:</span>
          <input
            type="text"
            v-model="VictimStatus"
            @blur="checkcard"
            maxlength="18"
            :disabled="victimSee"
            style="width:50%"
            placeholder="请输入受害人手机号"
          >
          <b class="mustText" v-show="VictimcarMust">请输入正确的身份证号码
            <i></i>
          </b>
          <b class="mustText" v-show="Victimcard">此身份证已存在
            <i></i>
          </b>
        </p>
        <p class="describe">
          <span>受害人住址:</span>
          <textarea v-model="VictimAddress" maxlength="100" :disabled="victimSee" placeholder="请输入受害人住址"></textarea>
          <b class="mustText" v-show="VictimAddMust">请输入小于100字字符
            <i></i>
          </b>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      VictimName: "", //受害人名称
      VictimSex: "", //受害人性别
      VictimNumber: "", //受害人电话
      VictimStatus: "", //受害人身份证
      VictimAddress: "", //受害人住址
      currentPage: 1, // 当前页码
      pageSize: 10, //每页显示的条数
      totalCount: 0, //数据总条数
      DialogVisible1: false,
      VictimphoneMust: false,
      Victimphone: false,
      Victimcard: false,
      VictimcarMust: false,
      VictimAddMust: false,
      carrepetition: false,
      phonerepetition: false,
      VictimSexs: [{ text: "男", value: "0" }, { text: "女", value: "1" }],
      VictimNameMust: false
    };
  },
  created() {
    this.reset();
    this.ajaxaa();
  },
  mounted() {},
  components: {},
  props: {
    //受害人ID
    victimId: {
      type: String,
      required: true
    },
    //受害人编辑状态
    victimanageEditState: {
      type: Boolean,
      required: true
    },
    //受害人查看状态
    victimSee: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    //判断手机号是否存在
    checkPhone() {
      let data = {
        caseUuid: this.$route.query.caseUuid,
        victimPhone: this.VictimNumber
      };
      data = this.$qs.stringify(data);
      this.$http.post("pca/casemng/victim/checkPhone", data).then(res => {
        console.log(res, 888);
        if (res.data.code == 200) {
          if (res.data.data) {
            this.phonerepetition = true;
            this.Victimphone = true;
            setTimeout(() => {
              this.Victimphone = false;
            }, 1000);
          } else {
            this.phonerepetition = false;
          }
        } else {
          this.phonerepetition = false;
        }
      });
    },
    //判断身份证是否存在
    checkcard() {
      let data = {
        caseUuid: this.$route.query.caseUuid,
        victimCard: this.VictimStatus
      };
      data = this.$qs.stringify(data);
      this.$http.post("pca/casemng/victim/checkIdCard", data).then(res => {
        console.log(res, 888);
        if (res.data.code == 200) {
          if (res.data.data) {
            this.carrepetition = true;
            this.Victimcard = true;
            setTimeout(() => {
              this.Victimcard = false;
            }, 1000);
          } else {
            this.carrepetition = false;
          }
        } else {
          this.carrepetition = false;
        }
      });
    },
    cardTips() {
      this.Victimcard = true;
      setTimeout(() => {
        this.Victimcard = false;
      }, 1000);
    },
    phoneTips() {
      this.Victimphone = true;
      setTimeout(() => {
        this.Victimphone = false;
      }, 1000);
    },
    mustTips() {
      this.VictimNameMust = true;
      setTimeout(() => {
        this.VictimNameMust = false;
      }, 1000);
    },
    mustPhone() {
      this.VictimphoneMust = true;
      setTimeout(() => {
        this.VictimphoneMust = false;
      }, 1000);
    },
    mustCars() {
      this.VictimcarMust = true;
      setTimeout(() => {
        this.VictimcarMust = false;
      }, 1000);
    },
    mustAdds() {
      this.VictimAddMust = true;
      setTimeout(() => {
        this.VictimAddMust = false;
      }, 1000);
    },
    // 表单重置
    reset() {
      this.VictimName = "";
      this.VictimSex = "0";
      this.VictimNumber = "";
      this.VictimStatus = "";
      this.VictimAddress = "";
    },
    //进入编辑后的 嫌疑人信息渲染
    ajaxaa() {
      if (this.victimanageEditState) {
        let data = {
          victimUuid: this.victimId
        };
        this.$http
          .get("/pca/casemng/victim/details", { params: data })
          .then(res => {
            this.VictimSex = res.data.data.victimSex;
            this.VictimName = res.data.data.victimName;
            this.VictimNumber = res.data.data.victimPhone;
            this.VictimStatus = res.data.data.victimCard;
            this.VictimAddress = res.data.data.victimAddress;
          });
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // 监听当前页码
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  }
};
</script>

<style scoped>
.addvictim {
  height: 4.3rem;
  background-color: rgba(16, 35, 56, 0.5);
  border: 1px solid rgba(15, 44, 79, 0.5);
}
.addleft {
  width: 95%;
  height: 100%;
  margin-left: 1%;
  /* border: 1px solid #000; */
  float: left;
  position: relative;
  padding-left: 2%;
}
.addright {
  width: 62%;
  margin-left: 37%;
  /* border: 1px solid #000; */
  height: 100%;
}
.tilte_top {
  padding: 0.1rem 0;
  color: #fff;
}
.addleft p {
  padding: 0.1rem 0;
  position: relative;
}
.addleft p span {
  width: 1.06rem;
  font-size: 0.14rem;
  display: inline-block;
  text-align: right;
  margin-right: 0.05rem;
  color: #99c9fa;
}
.addleft p input,
textarea {
  width: calc(100% - 1.15rem);
  height: 0.3rem;
  border-radius: 1px;
  padding-left: 0.1rem;
  border: 1px solid #31353b;
  background-color: rgba(16, 35, 56, 0.5);
  color: #99c9fa;
  border: 1px solid #2A2D30 !important;
}
/* select {
  width: 0.5rem;
  border: 1px solid #dcdfe6;
  height: 0.3rem;
  color: #606266;
  border-radius: 0.05rem;
} */
.addleft >>> .el-select {
  color: #99c9fa;
  position: relative;
}
.addleft >>> .el-input--suffix .el-input__inner {
  width: 0.6rem;
  height: 0.3rem;
  border-radius: 1px;
}
.addleft >>> .el-select .el-input__inner {
  padding: 0 0.05rem;
}
.addleft >>> .el-input__suffix i {
  width: 0.25rem;
  line-height: 0.3rem;
  position: absolute;
  right: -0.08rem;
}

/* .susex {
  display: inline-block;
  width: 41%;
} */
/* .tlephone {
  width: 57%;
  display: inline-block;
} */
.addleft .idcard input {
  width: 2.2rem;
}
textarea {
  vertical-align: middle;
  padding: 0 0.1rem;
  height: 1rem;
  resize: none;
}
.describe .el-button {
  margin: 0;
  margin-top: 0.1rem;
  padding: 0.05rem 0.1rem;
}
.describe .leftto {
  margin-left: 1.1rem;
  margin-right: 0.1rem;
}
.addright .mainImg {
  background-color: #f3f4f4;
  height: 85%;
}

.mainul {
  overflow: hidden;
  padding: 0 0.2rem;
}
.mainul li {
  position: relative;
  margin-top: 0.2rem;
  float: left;
  width: 23.5%;
  height: 1.8rem;
  margin-right: 2%;
  border: 1px solid #d5dade;
  box-shadow: 0px 0px 1px;
}
.mainul li:nth-child(4n) {
  margin-right: 0;
}
.mainul li img {
  width: 100%;
  height: 100%;
  display: block;
}
.mainul li p {
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.58);
  font-size: 0.12rem;
}
.mainul li p span {
  display: block;
  color: #fff;
  margin-left: 0.1rem;
}
.mainul li p a {
  width: 0.5rem;
  line-height: 0.2rem;
  background-color: #e6a23c;
  color: #fff;
  border-radius: 3px;
  text-align: center;
  position: absolute;
  right: 0.1rem;
  top: 0.15rem;
}
.el-pagination {
  float: right;
  margin-top: 0.2rem;
  margin-right: 0.2rem;
}
.el-pagination >>> .el-select .el-input .el-input__inner,
.el-pagination >>> .el-pagination__editor.el-input .el-input__inner {
  height: 0.25rem;
}
.el-pagination >>> .el-pagination__sizes .el-input .el-input__inner,
.el-pagination >>> .el-input {
  font-size: 0.13rem;
}
.el-pagination >>> .el-pager,
.el-pagination >>> button:disabled,
.el-pagination >>> .btn-next {
  margin-top: 0.03rem;
}
.el-pagination >>> span:not([class*="suffix"]) {
  font-size: 0.1rem;
}

.sanwei {
  display: block;
  height: 4rem;
  background-color: #f9fafa;
}
.sanweileft {
  width: 50%;
  float: left;
  height: 100%;
  border: 1px solid #000;
}
.sanweiright {
  width: 50%;
  float: left;
  height: 100%;
  border: 1px solid #000;
}
.titles {
  color: #409eff;
  margin-left: 0.2rem;
}
.sanweitarget {
  margin-left: 0.5rem;
  font-size: 0.12rem;
  padding: 0.1rem 0;
}
.sanweitarget input,
.sanweitarget select {
  width: 2rem;
  height: 0.25rem;
  padding-left: 0.1rem;
  border: 1px solid #dcdfe6;
}
.sanweitarget a {
  margin-left: 1rem;
  text-decoration: underline;
  color: red;
}
.must {
  color: red;
}
.mustText {
  width: 1.7rem;
  background: red;
  position: absolute;
  top: 0.1rem;
  height: 0.3rem;
  display: block;
  color: white;
  font-size: 0.15rem;
  line-height: 0.3rem;
  text-align: center;
  z-index: 9999;
  font-weight: 500;
  left: 4.3rem;
}
.mustText i {
  display: block;
  height: 0.1rem;
  width: 0.1rem;
  background: red;
  position: absolute;
  left: -0.05rem;
  top: 0;
  bottom: 0;
  margin: auto;
  transform: rotateZ(45deg);
  -moz-transform: rotateZ(45deg);
  -webkit-transform: rotateZ(45deg);
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
</style>
