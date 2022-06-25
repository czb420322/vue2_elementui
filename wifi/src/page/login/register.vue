<!--
 * @Author: your name
 * @Date: 2020-01-09 17:45:55
 * @LastEditTime : 2020-12-08 19:10:33
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\login\register.vue
 -->
<template>
  <div class="taskMange">
    <el-dialog
      title="用户申请"
      :visible.sync="dialogVisible"
      @close="closeDia"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      :destroy-on-close="true"
      @open="opendia"
      width="30%"
    >
      <div class="taskrelation">
        <div class="content_right">
          <div class="cont_title">| 账号信息</div>
          <div class="account_info oneaccount">
            <div class="username">
              <div class="labe">
                <div class="sydw">
                  <span>*</span>用&nbsp;&nbsp;户&nbsp;&nbsp;名&nbsp;：&nbsp;&nbsp;
                </div>
                <input
                  v-model.trim="userName"
                  placeholder="请输入用户名"
                  title="建议以警号编码作为用户账号"
                  @blur="checkUserName"
                  minlength="1"
                  maxlength="25"
                >
              </div>
              <div ref="userNameTip" class="ts"></div>
            </div>
          </div>

          <div class="account_info">
            <div class="username">
              <div class="labe">
                <div class="sydw">
                  <span>*</span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;：&nbsp;&nbsp;
                </div>
                <input
                  v-model.trim="trueName"
                  placeholder="请输入真实姓名"
                  title="姓名必须为真实姓名,否则无法注册"
                  @blur="checkTrueName"
                >
              </div>
              <div ref="trueNameTip" class="ts"></div>
            </div>
          </div>

          <div class="account_info">
            <div class="username">
              <div class="labe">
                <div class="sydw">
                  <span>*</span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码&nbsp;：&nbsp;&nbsp;
                </div>
                <input
                  v-model.trim="password"
                  type="password"
                  placeholder="请输入密码"
                  ref="count"
                  @blur="checkPwd"
                  minlength="6"
                  maxlength="25"
                >
              </div>
              <div ref="pwdTip" class="ts"></div>
            </div>
          </div>

          <div class="account_info">
            <div class="username">
              <div class="labe">
                <div class="sydw">
                  <span>*</span>确认密码&nbsp;：&nbsp;&nbsp;
                </div>
                <input
                  v-model.trim="repassword"
                  type="password"
                  placeholder="请再次输入密码"
                  ref="recount"
                  @blur="checkRePwd"
                  minlength="6"
                  maxlength="25"
                >
              </div>
              <div ref="rePwdTip" class="ts"></div>
            </div>
          </div>

          <div class="account_info">
            <div class="username">
              <div class="labe">
                <div class="sydw">
                  <span>*</span>组织部门&nbsp;：&nbsp;&nbsp;
                </div>
                 <!-- <el-popover class="popover" placement="right" trigger="click">
                  <div class="treeWrap">
                    <el-tree
                      :data="treeData"
                      :props="orgProps"
                      @check="handleClick"
                      show-checkbox
                      ref="treeForm"
                      check-strictly
                      default-expand-all
                      node-key="orgId"
                    ></el-tree>
                  </div>
                  <input
                    slot="reference"
                    readonly
                    v-model.trim="orgName"
                    placeholder="请选择所属单位"
                    title="请选择所属单位"
                    @blur="checkOrgName"
                  >
                </el-popover> -->
                <!-- <el-cascader class="search-form-item" :options="treeData" :props="defaultProps" :show-all-levels="false"></el-cascader> -->
                <!-- <el-cascader class="search-form-item" :props="{ checkStrictly: true }"  @blur="checkOrgName" :options='treeData' :props='defaultProps' :expand-trigger='expendTrigger' :show-all-levels='false' filterable  @change='changeHandler' :clearable='true'></el-cascader > -->
                 <el-cascader class="search-form-item" node-key="orgId" @blur="checkOrgName" :options='treeData' :props='defaultProps' :change-on-select='changeOnSelect' :expand-trigger='expendTrigger' :show-all-levels='false' filterable  @change='changeHandler' :clearable='true'></el-cascader >
                <!-- <el-cascader class="search-form-item"  @blur="checkOrgName" :options='treeData' :props='defaultProps' :change-on-select='changeOnSelect' :expand-trigger='expendTrigger' :show-all-levels='false' filterable  @change='changeHandler' :clearable='true'></el-cascader > -->
              </div>
              <div ref="orgTip" class="ts"></div>
            </div>
          </div>

          <div class="account_info">
            <div class="username">
              <div class="labe">
                <div class="sydw">
                  <span>*</span>身份证号&nbsp;：&nbsp;&nbsp;
                </div>
                <input
                  v-model.trim="idCard"
                  placeholder="请输入身份证号"
                  @blur="checkIdCard"
                  minlength="18"
                  maxlength="18"
                >
              </div>
              <div ref="idCardTip" class="ts"></div>
            </div>
          </div>

          <div class="account_info">
            <div class="username">
              <div class="labe">
                <div class="sydw">
                  <span>*</span>电话号码&nbsp;：&nbsp;&nbsp;
                </div>
                <input
                  v-model.trim="phone"
                  placeholder="请输入电话号码"
                  @blur="checkPhone"
                  minlength="11"
                  maxlength="11"
                >
              </div>
              <div ref="phoneTip" class="ts"></div>
            </div>
          </div>

          <div class="account_info" style="display: none;">
            <div class="username">
              <div class="labe">
                <div class="sydw">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注&nbsp;：&nbsp;&nbsp;</div>
                <textarea/>
              </div>
              <div ref="textareaTip" class="ts"></div>
            </div>
          </div>

          <!-- <div class="btn">
             <span @click="reset"></span>
             <span @click="register"></span>
          </div>-->
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary passBtn" @click="register()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import md5 from "js-md5";

export default {
  data() {
    return {
      dialogVisible: false,
      userName: "",
      trueName: "",
      password: "",
      repassword: "",
      phone: "",
      idCard: "",
      photoUrl: "",
      orgCode: null,
      orgName: [],
      orgId: null,
      img: true,

      treeData: [],
      orgProps: {
        children: "children",
        isLeaf: "leaf",
        label: "orgName"
      },

      timeStr: "",
      defaultProps: {
        value: 'orgId',
        label: 'orgName',
        children: 'children'
      },
      expendTrigger: 'click',
      changeOnSelect: true,
    };
  },
  mounted() {},
  watch: {
    openregister(val) {
      this.dialogVisible = val;
    }
  },
  props: {
    openregister: Boolean
  },
  methods: {

    changeHandler(value) {
      this.orgName = value[value.length-1]
    //   console.log(this.orgName);
    },
    closeDia() {
      this.$emit("childbyregister", false);
      this.reset();
    //   this.defaultProps.value = ''
    },
    //打开模态框
    opendia() {
      this.loopTime();
      //初始化部门列表
      this.getListOrg();
      this.$http.get("/sms/static/getWebConf").then(res => {
        let dataJson = res.data.data;
        let pageIndex = Number(dataJson.pageIndex);
        let logotile = Number(res.data.currentDeploymentType);
        if (pageIndex == 1 && logotile == 1) {
          document.body.className = "platform_home";
        } else if (pageIndex == 1 && (logotile == 2 || logotile == 3)) {
          document.body.className = "caseTop_home";
        } else if (pageIndex == 2) {
          document.body.className = "vehicle_home";
        } else if (pageIndex == 3 && logotile == 1) {
          document.body.className = "caseIndex_home";
        } else if (pageIndex == 3 && (logotile == 2 || logotile == 3)) {
          document.body.className = "caseTop_home";
        }else if (pageIndex == 4) {
          document.body.className = "platformStruct_home";
        }
      });
    },
    time: function() {
      var today = new Date();
      var hou;
      var time;
      var m = today.getMinutes();
      var s = today.getSeconds();
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 10) {
        s = "0" + s;
      }
      hou = today.getHours();
      let timeStr = (this.timeStr =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate() +
        " " +
        hou +
        ":" +
        m +
        ":" +
        s);
      return timeStr;
    },
    loopTime: function() {
      setInterval(this.time, 1000);
    },
    toLogin() {
      this.$router.push("/login");
    },
    beforeAvatarUpload(file, a, b) {
      // if(file.type != "image/jpg" && file.type != "image/jpeg" && file.type != "image/bmp" && file.type != "image/png" && file.type != "image/gif" && file.type != "image/tiff"&& file.type != "image/bmf"){
      //this.$alert("只能上传bmp/jpg/jpeg/png/gif/tiff/bmf格式图片！","消息提示");
      // layer.alert('只能上传jpg/jpeg/png/gif/tiff/bmf格式图片！',{icon:5,title:"消息提示"});
      if (
        (file.type == "image/jpeg" ||
          file.type == "image/jpg" ||
          file.type == "image/png") &&
        file.size / 1024 / 1024 < 2
      ) {
        let formData = new FormData();
        formData.append("files", file);
        this.$http({
          url: "/sms/uploadFile/upload",
          method: "post",
          data: formData
        }).then(res => {
          if (res.data.code == 200) {
            this.photoUrl = res.data.data[0];
            this.img = false;
          } else {
            this.$notify({
              type: "warning",
              message: "图片上传失败！",
              position: "bottom-right",
              duration: 3000
            });
          }
        });
        return false;
      } else {
        this.$notify({
          type: "warning",
          message: "只能上传jpg/jpeg/png格式图片，且不超过2M！",
          position: "bottom-right",
          duration: 3000
        });
        return false;
      }
    },
    checkUserName() {
      // this.$http.get('/sms/static/checkUserName',{params:{userName:this.userName}})
      // .then(response => {  //接口返回数据
      //   if(response.data.code == 200){
    //   let userNameExp = /^[A-Za-z0-9-_]+$/
      let userNameExp = /^[\u-\u4e00\u9fa5-\uffff]+$/
      if (this.userName == "") {
        this.$refs.userNameTip.innerHTML = "用户名不能为空";
        this.$refs.userNameTip.style.display = "block";
      } else if (!userNameExp.test(this.userName)) {
        this.$refs.userNameTip.innerHTML = "用户名不能有中文小于25位字母或数字组合";
        this.$refs.userNameTip.style.display = "block";
      }else {
        this.$http
          .get("/sms/static/checkUserName?userName=" + this.userName)
          .then(response => {
            //接口返回数据
            if (response.data.code == 200) {
              this.$refs.userNameTip.style.display = "none";
            } else {
              this.$refs.userNameTip.innerHTML = "用户名已存在";
              this.$refs.userNameTip.style.display = "block";
            }
          });
      }
    },
    checkTrueName() {
      if (this.trueName == "") {
        this.$refs.trueNameTip.innerHTML = "真实姓名不能为空";
        this.$refs.trueNameTip.style.display = "block";
      } else {
        if (this.trueName.length > 50) {
          this.$refs.trueNameTip.innerHTML = "真实姓名最长为50位字符";
          this.$refs.trueNameTip.style.display = "block";
        } else {
          this.$refs.trueNameTip.style.display = "none";
        }
      }
    },
    checkPwd() {
      // let pwdExp = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%_^&*? ]).*$/;
      var pwdExp = /^[a-zA-Z0-9~!@#$%^&*()<>,.?\[\]{}]{0,16}$/;
      if (this.password == "") {
        this.$refs.pwdTip.innerHTML = "密码不能为空";
        this.$refs.pwdTip.style.display = "block";
      } else if (!pwdExp.test(this.password)) {
        // this.$refs.pwdTip.innerHTML = "密码为6到16位数字、大小写字母、特殊字符组合";
        this.$refs.pwdTip.innerHTML = "密码长度小于25位";
        this.$refs.pwdTip.style.display = "block";
      } else {
        this.$refs.pwdTip.style.display = "none";
      }
    },
    checkRePwd() {
      if (this.repassword == "") {
        this.$refs.rePwdTip.innerHTML = "密码不能为空";
        this.$refs.rePwdTip.style.display = "block";
      } else if (this.repassword != this.password) {
        this.$refs.rePwdTip.innerHTML = "两次密码不一致";
        this.$refs.rePwdTip.style.display = "block";
      } else {
        this.$refs.rePwdTip.style.display = "none";
      }
    },
    checkOrgName() {
      if (this.orgName != "") {
        this.$refs.orgTip.style.display = "none";
      }
    },
    checkIdCard() {
      let reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
      if (this.idCard == "") {
        this.$refs.idCardTip.innerHTML = "身份证号不能为空";
        this.$refs.idCardTip.style.display = "block";
      } else {
        if (!reg.test(this.idCard)) {
          this.$refs.idCardTip.innerHTML = "身份证号格式不正确";
          this.$refs.idCardTip.style.display = "block";
        } else {
          this.$refs.idCardTip.style.display = "none";
        }
      }
    },
    checkPhone() {
      // let phoneExp = /[0-9]{11}/;
      let phoneExp = /^1(3|4|5|7|8)\d{9}$/
      if (this.phone != "" && !phoneExp.test(this.phone)) {
        this.$refs.phoneTip.innerHTML = "请输入正确的手机号码";
        this.$refs.phoneTip.style.display = "block";
      } else if (this.phone == "") {
        this.$refs.phoneTip.innerHTML = "电话号码不能为空";
        this.$refs.phoneTip.style.display = "block";
      } else {
        this.$refs.phoneTip.style.display = "none";
      }
    },
    checkForm() {
      let flag = true;
      // let userNameExp = /[0-9a-zA-Z]{6,25}/;
      // let userNameExp = /[^\u4e00-\u9fa5]+$/
      let userNameExp = /^[A-Za-z0-9-_$]{0,24}$/
      if (this.userName == "") {
        this.$refs.userNameTip.innerHTML = "用户名不能为空";
        this.$refs.userNameTip.style.display = "block";
        flag = false;
      } else if (!userNameExp.test(this.userName)) {
        this.$refs.userNameTip.innerHTML = "用户名不能有中文小于25位字母或数字组合";
        this.$refs.userNameTip.style.display = "block";
        flag = false;
      }else {
        this.$refs.userNameTip.style.display = "none";
      }

      if (this.trueName == "") {
        this.$refs.trueNameTip.innerHTML = "真实姓名不能为空";
        this.$refs.trueNameTip.style.display = "block";
        flag = false;
      } else {
        if (this.trueName.length > 50) {
          this.$refs.trueNameTip.innerHTML = "真实姓名最长为50位字符";
          this.$refs.trueNameTip.style.display = "block";
          flag = false;
        } else {
          this.$refs.trueNameTip.style.display = "none";
        }
      }
      // let pwdExp = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%_^&*? ]).*$/;
      var pwdExp = /^[a-zA-Z0-9~!@#$%^&*()<>,.?\[\]{}]{0,16}$/;
      if (this.password == "") {
        this.$refs.pwdTip.innerHTML = "密码不能为空";
        this.$refs.pwdTip.style.display = "block";
        flag = false;
      } else if (!pwdExp.test(this.password)) {
        // this.$refs.pwdTip.innerHTML = "密码为6到16位数字、大小写字母、特殊字符组合";
        this.$refs.pwdTip.innerHTML = "密码长度小于16位";
        this.$refs.pwdTip.style.display = "block";
        flag = false;
      } else {
        this.$refs.pwdTip.style.display = "none";
      }

      if (this.repassword == "") {
        this.$refs.rePwdTip.innerHTML = "密码不能为空";
        this.$refs.rePwdTip.style.display = "block";
        flag = false;
      } else if (this.repassword != this.password) {
        this.$refs.rePwdTip.innerHTML = "两次密码不一致";
        this.$refs.rePwdTip.style.display = "block";
        flag = false;
      } else {
        this.$refs.rePwdTip.style.display = "none";
      }

      if (this.orgName == "") {
        this.$refs.orgTip.innerHTML = "所属单位不能为空";
        this.$refs.orgTip.style.display = "block";
        flag = false;
      } else {
        this.$refs.orgTip.style.display = "none";
      }

      let reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
      if (this.idCard == "") {
        this.$refs.idCardTip.innerHTML = "身份证号不能为空";
        this.$refs.idCardTip.style.display = "block";
        flag = false;
      } else {
        if (!reg.test(this.idCard)) {
          this.$refs.idCardTip.innerHTML = "身份证号格式不正确";
          this.$refs.idCardTip.style.display = "block";
          flag = false;
        } else {
          this.$refs.idCardTip.style.display = "none";
        }
      }

      let phoneExp = /[0-9]{11}/;
      if (this.phone != "" && !phoneExp.test(this.phone)) {
        this.$refs.phoneTip.innerHTML = " 电话号码长度为11个字符";
        this.$refs.phoneTip.style.display = "block";
        flag = false;
      } else if (this.phone == "") {
        this.$refs.phoneTip.innerHTML = "电话号码不能为空";
        this.$refs.phoneTip.style.display = "block";
        flag = false;
      } else {
        this.$refs.phoneTip.style.display = "nonde";
      }

      return flag;
    },
    handleClick(data, checked) {
      this.$refs.treeForm.setCheckedNodes([]);
      this.$refs.treeForm.setCheckedNodes([data]);
      this.orgId = data.orgId;
      this.orgName = data.orgName;
      this.orgCode = data.orgCode;
    },
    reset() {
      this.userName = "";
      this.trueName = "";
      this.password = "";
      this.repassword = "";
      this.idCard = "";
      this.phone = "";
      this.photoUrl = "";
      this.orgId = '';
      this.orgCode = '';
      this.orgName = "";
      document.querySelectorAll(".ts").forEach(el => {
        el.style.display = "none";
      });
    },
    //注册
    register: function() {
      if (!this.checkForm()) {
        return false;
      }
      let _this = this;
      let param = {
        userName: this.userName,
        trueName: this.trueName,
        password: md5.hex(this.password),
        phone: this.phone,
        idCard: this.idCard,
        photoUrl: this.photoUrl,
        orgCode: this.orgCode,
        orgId: this.orgName,
        orgName: this.orgId
      };
      let data = this.$qs.stringify(param);
      this.$http.post("/sms/usercore/add", data).then(res => {
        // this.dialogVisible = false;
        if (res.statusText == "OK" && res.data.code == 200) {
          this.$notify({
            type: "success",
            message: "申请成功，待管理员审批！",
            position: "bottom-right",
            duration: 3000
          });
          this.dialogVisible = false;
          //  this.$myconfirm({
          //   type: '提示',
          //   msg: '注册成功！',
          //   icon: 3,
          //   btn: {
          //     ok: '确定',
          //      no: '取消'
          //   }
          // }).then(() => {
          //      _this.$router.push({path:"/login"});
          // })
          // .catch(() => {
          //   console.log('no')
          // })
        } else if (res.data.code == 100) {
          this.$notify({
            type: "warning",
            message: "用户名重复！",
            position: "bottom-right",
            duration: 3000
          });
          return false;
        } else {
          this.$notify({
            type: "warning",
            message: res.data.message,
            position: "bottom-right",
            duration: 3000
          });
          return false;
        }
      });
    },

    // 获取部门列表
    getListOrg() {
      let data = {
        orgParentId: ""
      };
      data = this.$qs.stringify(data); //post请求分离data
      this.$http.get("/sms/org/listOrg", data).then(res => {
        if (res.data.code == 200) {
          this.treeData = res.data.data;
          this.treeData.forEach(v => {
            if(v.children && v.children.length < 1) {
              delete v.children
            } else {
              if(v.children) {
                v.children.forEach(e => {
                if(e.children && e.children.length < 1) {
                  delete e.children
                } else {
                  if(e.children) {
                      e.children.forEach(s => {
                    if(s.children && s.children.length < 1) {
                      delete s.children
                    } else {
                      if(s.children) {
                        s.children.forEach(d => {
                          if(d.children && d.children.length < 1) {
                            delete d.children
                          }
                       })
                      }
                    }
                  })
                  }
                }
              })
              }
            }
          })
          console.log(this.treeData)
        } else {
          this.$notify({
            type: "warning",
            message: "获取部门列表失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    }
  }
};
</script>


<style scoped lang="scss">
@import "../../assets/css/commom.css";
.taskMange /deep/ .el-input--suffix .el-input__inner {
  height: 0.38rem
}
.taskMange /deep/ .el-input__inner {
  height: 0.38rem
}
.el-dialog__wrapper /deep/ .el-dialog {
  min-width: 7rem!important;
}
.taskMange /deep/ .el-cascader {
  line-height: 0.38rem
}
.el-cascader {
  line-height: 0.38rem
}
.taskMange /deep/ .el-input__icon {
  line-height: 0.38rem
}
.el-input__icon {
  line-height: 0.38rem
}
.search-form-item {
  width: 3.8rem ;
  height: 0.38rem
}
.content_right {
  display: flex;
  width: 6.3rem;
  height: 5.5rem;
  background: url(../../assets/images/login/accountinfo.png);
  background-size: 100% 100%;
  margin-left: 0.1rem;
  flex-direction: column;
}
.search-form-item /deep/.el-input__inner {
  height: 0.3rem!important;
}
.search-form-item /deep/ .el-cascader-menu {
  background: red;
}
.cont_title{
  display: flex;
  height: 0.5rem;
  width: 100%;
  padding-left:0.3rem;
  align-items: center;
  font-size: 0.16rem;
  font-weight: bold;
  line-height:0.5rem;
  color: #409eff;
};

.account_info {
  position: relative;
}
.username {
  width: 100%;
  height: 0.6rem;
  flex-direction: column;
}
.oneaccount{
  margin-top: .3rem
}
.labe {
  display: flex;
}

.sydw {
  width: 1.58rem;
  font-size: 0.16rem;
  line-height: 0.3rem;
  text-align: right;
  color: #99c9fa;
}
.sydw span {
  color: #d16f66;
  padding-right: 3px;
}
.labe input {
  width: 3.8rem;
  height: 0.3rem;
  font-size: 0.16rem;
  border: 1px solid #132b48;
  border-radius: 0.04rem;
  padding-left: 0.1rem;
  color: #99c9fa;
  background: #041524;
}
textarea {
  width: 3.8rem;
  height: 0.5rem;
  font-size: 0.16rem;
  padding: 0.04rem 0.1rem;
  border: 1px solid #dcdfe6;
  color: #7b7e80;
}
.el-select {
  width: 3.8rem;
  font-size: 0.16rem;
  color: #7b7e80;
}
.treePop {
  position: absolute;
  top: 0.36rem;
  left: 2.45rem;
  z-index: 9;
}
.treePop .el-tree {
  width: 3.8rem;
  height: 1.54rem;
  overflow: auto;
}
.ts {
  display: none;
  font-size: 0.12rem;
  line-height: 0.2rem;
  color: #d16f66;
  margin: 0 auto;
  width: 5.38rem;
  padding-left: 1.7rem;
}
.search-form-item >>> .el-cascader-menu__list {
  background: #99c9fa;
}
</style>
