<template>
    <div class="content_content">
        <Header/>
        <div class="account_title">
            <div class="account_title_l">账号管理</div>
            <div class="account_title_r">
                <span @click="relogin">重新登录</span>
                <span @click="gohome">返回首页</span>
            </div>
        </div>
        <div class="account_info">
            <span>密码修改</span>
        </div>
        <div class="account_cont">
            <!-- <div class="account_cont_l">
        <div class="account_zp_title">
          |照片采集
        </div>
        <div class="account_zp_cont">
          <div class="cjtp"><img :src="ruleForm.photoUrl" alt=""></div>
          <div class="cjbtn">
            <el-button type="primary" class="cancleBtn" :disabled="videoStr">视频采集</el-button>
              <el-button type="primary" class="passBtn" :disabled="videoStr">本地上传</el-button>
          </div>
        </div>
            </div>-->
            <div class="account_cont_r">
                <div class="content_title">账号信息</div>
                <div class="content">
                    <div class="username">
                        <div class="labe">
                            <div class="sydw">请输入原密码：</div>
                            <input
                                type="password"
                                ref="password"
                                v-model="password"
                                @blur="losePass"
                                placeholder="请输入原始密码"
                                minlength="6"
                                maxlength="25"
                                autocomplete="off"
                            >
                            <img :src="value" @click="toggle()">
                            <!-- <span v-show="pass">{{password}}</span> -->
                            <div></div>
                        </div>
                        <div class="ts" ref="losePassText"></div>
                    </div>

                    <div class="username">
                        <div class="labe">
                            <div class="sydw">请输入新密码：</div>
                            <input
                                type="password"
                                ref="newpassword"
                                v-model="newpassword"
                                @blur="newLosePass"
                                placeholder="请输入新密码"
                                minlength="6"
                                maxlength="25"
                                autocomplete="off"
                            >
                            <img :src="newvalue" @click="newtoggle()">
                            <!-- <span v-show="newpass">{{newpassword}}</span> -->
                            <div></div>
                        </div>
                        <div class="ts" ref="newLosePassText"></div>
                    </div>

                    <div class="username">
                        <div class="labe">
                            <div class="sydw">请确认新密码：</div>
                            <input
                                type="password"
                                ref="repassword"
                                v-model="repassword"
                                @blur="reLosePass"
                                placeholder="请确认新密码"
                                minlength="6"
                                maxlength="25"
                                autocomplete="off"
                            >
                            <img :src="revalue" @click="retoggle()">
                            <!-- <span v-show="repass">{{repassword}}</span> -->
                            <div></div>
                        </div>
                        <div class="ts" ref="reLosePassText"></div>
                    </div>
                </div>

                <div class="btn">
                    <el-button type="primary" class="cancleBtn" @click="modifyPass">确 定</el-button>
                    <el-button type="primary" class="passBtn" @click="resetPass">重 置</el-button>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>
<script>
//引用头部和底部
import Header from "../../components/header";
import Footer from "../../components/footer";
import md5 from "js-md5";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";

export default {
    data() {
        return {
            ruleForm: {
                photoUrl: null
            },
            list: [],
            //  modifyData:{
            password: "",
            newpassword: "",
            repassword: "",
            value: require("../../assets/hidden-pass.png"),
            newvalue: require("../../assets/hidden-pass.png"),
            revalue: require("../../assets/hidden-pass.png"),
            pass: false,
            newpass: false,
            repass: false,
            videoStr: true
            //  }
        };
    },
    computed: {
        ...mapGetters(["getToIndex"])
    },
    mounted() {},
    created() {},
    methods: {
        beforeAvatarUpload(file, a, b) {
            if (
                file.type != "image/jpg" &&
                file.type != "image/jpeg" &&
                file.type != "image/bmp" &&
                file.type != "image/png" &&
                file.type != "image/gif" &&
                file.type != "image/tiff" &&
                file.type != "image/bmf"
            ) {
                //this.$alert("只能上传bmp/jpg/jpeg/png/gif/tiff/bmf格式图片！","消息提示");
                layer.alert("只能上传bmp/jpg/jpeg/png/gif/tiff/bmf格式图片！", {
                    icon: 5,
                    title: "消息提示"
                });
                return false;
            }
            let formData = new FormData();
            formData.append("files", file);
            this.$http({
                url: "/sms/uploadFile/upload",
                method: "post",
                data: formData
            }).then(res => {
                if (res.data.code == 200) {
                    this.ruleForm.photoUrl = res.data.data[0];
                } else {
                    this.$notify({
                        type: "warning",
                        message: "图片上传失败！",
                        position: "bottom-right",
                        duration: 3000
                    });
                    //this.$alert("图片上传失败","消息提示");
                    // layer.alert('图片上传失败！',{icon:5,title:"消息提示"});
                }
            });
            // }
            return false;
        },
        // 失去焦点
        losePass: function() {
            // regExp = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%_^&*? ]).*$/;
            if (this.password == "") {
                this.$refs.losePassText.innerHTML = "*请输入原密码";
                this.$refs.losePassText.style.display = "block";
            } else {
                // var regExp = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%_^&*? ]).*$/;
                var regExp = /^[a-zA-Z0-9~!@#$%^&*()<>,.?\[\]{}]{0,16}$/;
                if (!regExp.test(this.password)) {
                    // this.$refs.losePassText.innerHTML = "*输入密码,密码为6到16位数字、大小写字母、特殊字符组合";
                    this.$refs.newLosePassText.innerHTML =
                        "*输入密码,密码长度小于16位";
                    this.$refs.losePassText.style.display = "block";
                } else {
                    this.$refs.losePassText.style.display = "none";
                }
            }
        },
        newLosePass: function() {
            if (this.newpassword == "") {
                this.$refs.newLosePassText.innerHTML = "*请输入新密码";
                this.$refs.newLosePassText.style.display = "block";
            } else {
                // var regExp = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%_^&*? ]).*$/;
                var regExp = /^[a-zA-Z0-9~!@#$%^&*()<>,.?\[\]{}]{0,16}$/;
                if (!regExp.test(this.newpassword)) {
                    this.$refs.newLosePassText.innerHTML =
                        "**输入密码,密码长度小于16位";
                    this.$refs.newLosePassText.style.display = "block";
                } else {
                    this.$refs.newLosePassText.style.display = "none";
                }
            }
        },
        reLosePass: function() {
            if (this.repassword == "") {
                // this.$refs.reLosePassText.innerHTML = "*请输入新密码";
                // this.$refs.reLosePassText.style.display = "block";
            } else {
                if (this.newpassword != this.repassword) {
                    // this.$refs.reLosePassText.innerHTML = "*两次输入的新密码不一致";
                    this.$refs.reLosePassText.style.display = "block";
                } else {
                    // var regExp = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%_^&*? ]).*$/;
                    var regExp = /^[a-zA-Z0-9~!@#$%^&*()<>,.?\[\]{}]{0,16}$/;
                    if (!regExp.test(this.repassword)) {
                        // this.$refs.reLosePassText.innerHTML = "*输入密码,密码为6到16位数字、大小写字母、特殊字符组合";
                        this.$refs.newLosePassText.innerHTML =
                            "*输入密码,密码长度小于16位";
                        this.$refs.reLosePassText.style.display = "block";
                    } else {
                        this.$refs.reLosePassText.style.display = "none";
                    }
                }
            }
        },
        // 显示密码
        toggle: function() {
            if (this.pass == false) {
                this.$refs.password.type = "text";
                this.value = require("../../assets/show-pass.png");
                this.pass = true;
            } else {
                this.$refs.password.type = "password";
                this.value = require("../../assets/hidden-pass.png");
                this.pass = false;
            }
        },
        newtoggle: function() {
            if (this.newpass == false) {
                this.$refs.newpassword.type = "text";
                this.newvalue = require("../../assets/show-pass.png");
                this.newpass = true;
            } else {
                this.$refs.newpassword.type = "password";
                this.newvalue = require("../../assets/hidden-pass.png");
                this.newpass = false;
            }
        },
        retoggle: function() {
            if (this.repass == false) {
                this.$refs.repassword.type = "text";
                this.revalue = require("../../assets/show-pass.png");
                this.repass = true;
            } else {
                this.$refs.repassword.type = "password";
                this.revalue = require("../../assets/hidden-pass.png");
                this.repass = false;
            }
        },

        relogin: function() {
            this.$router.push({ path: "/login" });
        },
        gohome: function() {
            // this.$router.push({path:"/index"})
            // this.$router.push({ path: this.getToIndex.path });
            this.$router.push({path:'/videoStrucPlat',query:{ menuCode: '700' }})
        },
        // 重置
        resetPass() {
            this.password = "";
            this.newpassword = "";
            this.repassword = "";
            // this.$refs.reLosePassText.style.display = "none";
        },
        checkForm: function() {
            let flag = true;
            // let pwdExp = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%_^&*? ]).*$/;
            var pwdExp = /^[a-zA-Z0-9~!@#$%^&*()<>,.?\[\]{}]{0,16}$/;
            if (this.password == "") {
                this.$refs.losePassText.innerHTML = "*请输入密码";
                this.$refs.losePassText.style.display = "block";
                flag = false;
            } else {
                if (!pwdExp.test(this.password)) {
                    flag = false;
                }
            }

            if (this.newpassword == "") {
                this.$refs.newLosePassText.innerHTML = "*请输入密码";
                this.$refs.newLosePassText.style.display = "block";
                flag = false;
            } else {
                if (!pwdExp.test(this.newpassword)) {
                    flag = false;
                }
            }

            if (this.repassword == "") {
                this.$refs.reLosePassText.innerHTML = "*请输入密码";
                this.$refs.reLosePassText.style.display = "block";
                flag = false;
            } else {
                if (!pwdExp.test(this.repassword)) {
                    flag = false;
                }
            }
            return flag;
        },
        // 提交
        modifyPass: function() {
            if (!this.checkForm()) {
                return false;
            }
            var that = this;
            let data = {
                oldPwd: md5.hex(this.password),
                nPwd: md5.hex(this.newpassword),
                confirmPwd: md5.hex(this.repassword)
            };
            md5.hex(this.password) == ""
                ? (this.err1 = true)
                : (this.err1 = false);
            md5.hex(this.newpassword) == ""
                ? (this.err2 = true)
                : (this.err2 = false);
            if (md5.hex(this.repassword) == "") {
                this.err3 = true;
                this.err4 = false;
            } else {
                this.err3 = false;
                md5.hex(this.newpassword) != md5.hex(this.repassword)
                    ? (this.err4 = true)
                    : (this.err4 = false);
            }
            let param = this.$qs.stringify(data);
            this.$http.post("sms/usercore/updateUserPwd", param).then(res => {
                if (
                    md5.hex(this.password) != "" &&
                    md5.hex(this.newpassword) != "" &&
                    md5.hex(this.repassword) != "" &&
                    md5.hex(this.newpassword) == md5.hex(this.repassword)
                ) {
                    if (res.data != null && res.data.code == 200) {
                        let _this = this;
                        this.$notify({
                            type: "success",
                            message: "修改成功！",
                            position: "bottom-right",
                            duration: 3000
                        });
                        _this.$router.push({ path: "/login" });
                    } else {
                        this.$notify({
                            type: "warning",
                            message: "修改失败,请输入正确的原密码",
                            position: "bottom-right",
                            duration: 3000
                        });
                        return false;
                    }
                } else {
                    if (res.data.code == 100) {
                        this.$notify({
                            type: "warning",
                            message: "新密码与确认密码不一致！",
                            position: "bottom-right",
                            duration: 3000
                        });
                    }
                }
            });
        }
    },
    components: {
        Header
    },
    components: {
        Footer
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../assets/css/commom.css";
.content_content {
    // background: white;
    position: relative;
    .account_title {
        display: flex;
        height: 0.6rem;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.6rem;
        padding-left: 0.1rem;
        padding-right: 0.1rem;
        .account_title_l {
            font-size: 0.2rem;
            color: #409eff;
            // border-left: 1px solid #409eff;
            padding: 0.1rem;
            // background:pink;
        }
        .account_title_r {
            font-size: 0.16rem;
            color: #409eff;
            padding-right: 1%;
            text-align: right;
            width: 2rem;
            cursor: pointer;
            span:last-child {
                border-left: 2px solid #409eff;
                padding-left: 0.05rem;
            }
        }
    }
    .account_info {
        display: flex;
        height: 0.4rem;
        background-color: rgba(16, 35, 56, 0.5);
        padding-left: 0.1rem;
        align-items: center;
        width: 98%;
        margin-left: 1%;

        span {
            border-left: 2px solid #409eff;
            padding-left: 0.1rem;
            // background: pink;
            color: #409eff;
        }
    }
    .account_cont {
        width: 90%;
        height: 5.6rem;
        // min-height: 5.6rem;
        display: flex;
        //  position: absolute;
        // top:2rem;
        // left: 50%;
        // margin-left: -45%;
        // z-index: -1;
        margin: 0.5rem auto;
        .account_cont_l {
            background: url(../../assets/images/login/videoinfo.png) center
                no-repeat;
            background-size: 100% 100%;
            display: flex;
            width: 55%;
            border-radius: 0.05rem;
            padding: 1%;
            margin-right: 0.2rem;
            height: 100%;
            flex-direction: column;
            .account_zp_title {
                display: flex;
                width: 100%;
                font-size: 0.16rem;
                font-weight: bold;
                color: #409eff;
                padding-left: 0.03rem;
                // border-left: 2px solid #409eff;
                margin-bottom: 0.2rem;
            }
            .account_zp_cont {
                display: flex;
                height: 5rem;
                width: 100%;
                flex-direction: column;
                .cjtp {
                    height: 4rem;
                    width: 100%;
                    background: url("../../assets/images/login/default2.png")
                        no-repeat;
                    background-size: 100% 100%;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .cjbtn {
                    display: flex;
                    flex: 1;
                    justify-content: center;
                    align-items: center;
                    .cjbtn_1 {
                        // background: url('../../assets/images/login/pz1.png') no-repeat;
                        // background-size: 100% 100%;
                        width: 1.16rem;
                        height: 0.33rem;
                        line-height: 0.33rem;
                        text-align: center;
                        margin: 0 0.1rem;

                        cursor: pointer;
                        // &:hover{
                        //   background: url('../../assets/images/login/pz.png') no-repeat;
                        //   background-size: 100% 100%;
                        // }
                    }
                    .cjbtn_2 {
                        // background: url('../../assets/images/login/bdsc1.png') no-repeat;
                        // background-size: 100% 100%;
                        width: 1.16rem;
                        height: 0.33rem;
                        line-height: 0.33rem;
                        text-align: center;
                        margin: 0 0.1rem;
                        cursor: pointer;
                        // margin-top: 0.04rem;
                        cursor: pointer;
                        // &:hover{
                        //   background: url('../../assets/images/login/bdsc.png') no-repeat;
                        //   background-size: 100% 100%;
                        // }
                    }
                }
            }
        }
        .account_cont_r {
            display: flex;
            flex: 1;
            margin-left: 1%;
            background: url("../../assets/images/login/accountinfo.png")
                no-repeat;
            background-size: 100% 100%;
            height: 100%;
            flex-direction: column;
            margin-left: 0.1rem;
            border-radius: 0.05rem;
            padding: 1%;
            padding-left: 2%;
            .content_title {
                display: flex;
                width: 100%;
                font-size: 0.16rem;
                color: #409eff;
                align-items: center;
                border-left: 2px solid #409eff;
            }
            .content {
                display: flex;
                width: 100%;
                height: 4rem;
                display: flex;
                flex-direction: column;
                .username {
                    width: 100%;
                    display: flex;
                    height: 0.5rem;
                    display: flex;
                    // flex-direction: column;
                    justify-content: center;
                    margin-top: 0.44rem;
                    .labe {
                        display: flex;
                        // margin-bottom: 0.2rem;
                        // height: 0.35rem;
                        position: relative;
                        .sydw {
                            display: flex;
                            justify-content: space-between;
                            width: 1.3rem;
                            line-height: 0.35rem;
                            font-size: 0.16rem;
                            margin-right: 0.15rem;
                            color: #99c9fa;
                        }
                        .select_c {
                            width: 3.8rem;
                            height: 0.35rem;
                            border: 1px solid red;
                        }
                        input {
                            // width: 3.8rem;
                            width: 4.8rem;
                            height: 0.35rem;
                            border: 1px solid #132b48;
                            background: #041524;
                            border-radius: 0.04rem;
                            padding-left: 0.1rem;
                            color: #99c9fa;
                        }
                        img {
                            position: absolute;
                            top: 0.09rem;
                            right: 0.2rem;
                            width: 0.2rem;
                            height: 0.16rem;
                            cursor: pointer;
                            background-size: 100% 100%;
                        }
                        span {
                            position: absolute;
                            top: 0.02rem;
                            left: 1.5rem;
                            width: 4rem;
                            line-height: 0.3rem;
                            background: #041524;
                            color: #99c9fa;
                        }
                        textarea {
                            width: 0.38rem;
                            height: 0.5rem;
                        }
                    }
                    .ts {
                        font-size: 0.12rem;
                        color: #bf665f;
                        margin-top: 0.4rem;
                        position: absolute;
                        left: 40%;
                        top: 5px;
                    }
                }
            }
            .btn {
                display: flex;
                flex: 1;
                justify-content: center;
                align-items: center;
                span {
                    width: 1rem;
                    height: 0.33rem;
                    line-height: 0.33rem;
                    margin: 0 0.1rem;
                    color: white;
                    letter-spacing: 0.05rem;
                    font-size: 0.16rem;
                    // background:green;
                    text-align: center;
                    cursor: pointer;
                    &:last-child {
                        // background: #e6a23c;
                        margin-left: 0.2rem;
                    }
                }
            }
        }
    }
}
</style>
