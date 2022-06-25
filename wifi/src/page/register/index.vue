<!--
 * @Author: your name
 * @Date: 2020-07-17 09:36:01
 * @LastEditTime : 2020-12-14 11:12:37
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\page\register\index.vue
 -->
<template>
  <div class="wrapper">
    <div class="tt_">
      <div class="header">
      </div>
      <div class="navInfo">
        <div class="navLeft">
          <img src="../../assets/reg_mg.png"/>
          <div class="tain">
            <div class="nav_left_name">您好，欢迎使用！</div>
            <div class="nav_left_time">{{timeStr}}</div>
          </div>
        </div>
        <div class="toLogin" @click="toLogin">立即登录</div>
      </div>
    </div>
    <div class="register">
      <div class="content">
        <div class="content_left">
          <div class="qj">
              <!-- <img width="150px" height="150px" src="../../assets/images/login/sb.png"/> -->
          </div>
          <div class="cont_title">| USB视频照片采集</div>
          <div class="cont_pic">
            <img class="img" v-if="img" src="../../assets/images/login/default1.png" alt="">
            <img v-else :src="photoUrl" alt="">

          </div>
                   <div class="cont_btn">
              <div class="usb  cancleBtn">
                视频照片采集
              </div>
              <!-- <el-upload
                action="sys/uploadFile/upload"
                name="files"
                :before-upload="beforeAvatarUpload">
                <div class="send passBtn">
                  本地上传
                </div>
              </el-upload> -->
              <!-- <el-upload
                action="sys/uploadFile/upload"
                name="files"
                :before-upload="beforeAvatarUpload">
                <div class="send passBtn">
                  本地上传
                </div>
              </el-upload> -->

            </div>
        </div>

        <div class="content_right">
           <div class="cont_title">| 账号信息</div>
           <div class="account_info">
             <div class="username">
               <div class="labe">
                 <div class="sydw"><span>*</span>用&nbsp;&nbsp;户&nbsp;&nbsp;名&nbsp;：&nbsp;&nbsp;</div>
                 <input v-model.trim="userName" placeholder="请输入用户名" title="建议以警号编码作为用户账号" @blur="checkUserName" minlength="6" maxlength="25" />
               </div>
               <div ref="userNameTip" class="ts"></div>
             </div>
           </div>

           <div class="account_info">
             <div class="username">
               <div class="labe">
                 <div class="sydw"><span>*</span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;：&nbsp;&nbsp;</div>
                 <input v-model.trim="trueName" placeholder="请输入真实姓名" title="姓名必须为真实姓名,否则无法注册" @blur="checkTrueName" />
               </div>
               <div ref="trueNameTip" class="ts"></div>
             </div>
           </div>

           <div class="account_info">
             <div class="username">
               <div class="labe">
                 <div class="sydw"><span>*</span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码&nbsp;：&nbsp;&nbsp;</div>
                 <input v-model.trim="password" type="password" placeholder="请输入密码"  ref="count" @blur="checkPwd"  minlength="6" maxlength="16" />
               </div>
               <div ref="pwdTip" class="ts"></div>
             </div>
           </div>

           <div class="account_info">
             <div class="username">
               <div class="labe">
                 <div class="sydw"><span>*</span>确认密码&nbsp;：&nbsp;&nbsp;</div>
                 <input v-model.trim="repassword"  type="password" placeholder="请再次输入密码"  ref="recount" @blur="checkRePwd" minlength="6" maxlength="16" />
               </div>
               <div ref="rePwdTip" class="ts"></div>
             </div>
           </div>

           <div class="account_info">
             <div class="username">
               <div class="labe">
                 <div class="sydw"><span>*</span>所属单位&nbsp;：&nbsp;&nbsp;</div>
                 <el-popover
                   class="popover"
                   placement="bottom-start"
                   trigger="click">
                   <div class="treeWrap">
                     <el-tree :data="treeData"  :props="orgProps"  @check="handleClick" show-checkbox ref="treeForm" check-strictly default-expand-all node-key="orgId" ></el-tree>
                   </div>
                   <input slot="reference" readonly v-model.trim="orgName" placeholder="请选择所属单位" title="请选择所属单位" @blur="checkOrgName" />
                 </el-popover>
               </div>
               <div ref="orgTip" class="ts"></div>
             </div>
           </div>

           <div class="account_info">
             <div class="username">
               <div class="labe">
                 <div class="sydw"><span>*</span>身份证号&nbsp;：&nbsp;&nbsp;</div>
                 <input v-model.trim="idCard" placeholder="请输入身份证号" @blur="checkIdCard" minlength="18" maxlength="18"/>
               </div>
               <div ref="idCardTip" class="ts"></div>
             </div>
           </div>

           <div class="account_info">
             <div class="username">
               <div class="labe">
                 <div class="sydw"><span>*</span>电话号码&nbsp;：&nbsp;&nbsp;</div>
                 <input v-model.trim="phone" placeholder="请输入电话号码" @blur="checkPhone" minlength="11" maxlength="11"/>
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

           <div class="btn">
             <span @click="reset"></span>
             <span @click="register"></span>
           </div>
        </div>
      </div>
    </div>
    <div class="loginFooter">
      <img src="../../assets/logo.png" />武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span>
    </div>
  </div>
</template>
<script>
//引用头部和底部
import md5 from 'js-md5'

  export default {
    props:[],
    data(){
      return {
        userName:"",
        trueName: "",
        password:"",
        repassword:"",
        phone:"",
        idCard:"",
        photoUrl:"",
        orgCode:null,
        orgName:"",
        orgId: null,
        img:true,

        treeData: [],
        orgProps: {
          children: 'children',
          isLeaf: 'leaf',
          label: 'orgName'
        },

        timeStr: ''

      }
    },
    watch:{
    },
    mounted(){
      this.loopTime();
      //初始化部门列表
      this.getListOrg();
        this.$http.get('/sms/static/getWebConf').then(res=>{
          let dataJson = res.data.data;
          let pageIndex = Number(dataJson.pageIndex);
          let logotile = Number(res.data.currentDeploymentType)
          if(pageIndex == 1 && logotile == 1){
            document.body.className = "platform_home";
          }else if(pageIndex == 1 && (logotile == 2 || logotile == 3)){
            document.body.className = 'caseTop_home'
          }else if(pageIndex == 2){
            document.body.className = "vehicle_home";
          }else if(pageIndex == 3 && logotile == 1){
            document.body.className = "caseIndex_home";
          }else if(pageIndex == 3 && (logotile == 2 || logotile == 3)){
            document.body.className = 'caseTop_home'
          }else if(pageIndex == 4){
            document.body.className = 'platformStruct_home'
          }
        })
    },
    created () {
    },

    methods:{
      time: function () {
        var today = new Date();
        var hou;
        var time;
        var m = today.getMinutes()
        var s = today.getSeconds()
        if (m < 10) {
          m = "0" + m
        }
        if (s < 10) {
          s = "0" + s
        }
        hou = today.getHours();
        let timeStr = this.timeStr = (today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + hou + ":" + m + ":" + s);
        return timeStr;
      },
      loopTime: function () {
        setInterval(this.time, 1000);
      },
      toLogin(){
        this.$router.push("/login");
      },
      beforeAvatarUpload(file,a,b) {
          // if(file.type != "image/jpg" && file.type != "image/jpeg" && file.type != "image/bmp" && file.type != "image/png" && file.type != "image/gif" && file.type != "image/tiff"&& file.type != "image/bmf"){
          //this.$alert("只能上传bmp/jpg/jpeg/png/gif/tiff/bmf格式图片！","消息提示");
          // layer.alert('只能上传jpg/jpeg/png/gif/tiff/bmf格式图片！',{icon:5,title:"消息提示"});
        if ((file.type == 'image/jpeg'|| file.type == 'image/jpg' || file.type == 'image/png') && (file.size / 1024 / 1024) < 2) {
          let formData = new FormData();
          formData.append('files',file);
          this.$http({
            url:'/sms/uploadFile/upload',
            method:'post',
            data:formData,
            }).then(res=>{
              if(res.data.code == 200){
                this.photoUrl = res.data.data[0];
                this.img = false;
              }else{
                //this.$alert("图片上传失败","消息提示");
                layer.alert('图片上传失败！',{icon:5,title:"消息提示"});
              }
            });
          return false;
        }else{
          layer.alert('只能上传jpg/jpeg/png格式图片，且不超过2M！',{icon:5,title:"消息提示"});
          return false;
        }
        },
      checkUserName(){

        // this.$http.get('/sms/static/checkUserName',{params:{userName:this.userName}})
        // .then(response => {  //接口返回数据
        //   if(response.data.code == 200){
            // let userNameExp = /[0-9a-zA-Z]{6,25}/;
            let userNameExp = /[0-9a-zA-Z]{0,25}/;
            if(this.userName == ""){
              this.$refs.userNameTip.innerHTML = "用户名不能为空";
              this.$refs.userNameTip.style.display = "block";
            }else if(!userNameExp.test(this.userName)){
              this.$refs.userNameTip.innerHTML = "用户名小于25位字母或数字组合";
              this.$refs.userNameTip.style.display = "block";
            }else{
              this.$http.get('/sms/static/checkUserName?userName='+this.userName)
              .then(response => {  //接口返回数据
                if(response.data.code == 200){
                    this.$refs.userNameTip.style.display = "none";
                }else{
                    this.$refs.userNameTip.innerHTML = "用户名已存在";
                    this.$refs.userNameTip.style.display = "block";
                }
              })
            }

      },
      checkTrueName(){
        if(this.trueName == ""){
          this.$refs.trueNameTip.innerHTML = "真实姓名不能为空";
          this.$refs.trueNameTip.style.display = "block";
        }else{
          if(this.trueName.length > 50){
            this.$refs.trueNameTip.innerHTML = "真实姓名最长为50位字符";
            this.$refs.trueNameTip.style.display = "block";
          }else{
            this.$refs.trueNameTip.style.display = "none";
          }
        }
      },
      checkPwd(){
        // let pwdExp = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%_^&*? ]).*$/;
        var pwdExp = /^[a-zA-Z0-9~!@#$%^&*()<>,.?\[\]{}]{0,16}$/;
        if(this.password == ""){
          this.$refs.pwdTip.innerHTML = "密码不能为空";
          this.$refs.pwdTip.style.display = "block";
        }else if(!pwdExp.test(this.password)){
          // this.$refs.pwdTip.innerHTML = "密码为6到16位数字、大小写字母、特殊字符组合";
          this.$refs.pwdTip.innerHTML = "密码长度小于16位";
          this.$refs.pwdTip.style.display = "block";
        }else{
          this.$refs.pwdTip.style.display = "none";
        }
      },
      checkRePwd(){
        if(this.repassword == ""){
          this.$refs.rePwdTip.innerHTML = "密码不能为空";
          this.$refs.rePwdTip.style.display = "block";
        }else if(this.repassword != this.password){
          this.$refs.rePwdTip.innerHTML = "两次密码不一致";
          this.$refs.rePwdTip.style.display = "block";
        }else{
          this.$refs.rePwdTip.style.display = "none";
        }
      },
      checkOrgName(){
        if(this.orgName != ""){
          this.$refs.orgTip.style.display = "none";
        }
      },
      checkIdCard(){
        let reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
        if(this.idCard == ""){
          this.$refs.idCardTip.innerHTML = "身份证号不能为空";
          this.$refs.idCardTip.style.display = "block";
        }else{
          if (!reg.test(this.idCard)) {
            this.$refs.idCardTip.innerHTML = "身份证号格式不正确";
            this.$refs.idCardTip.style.display = "block";
          }else {
            this.$refs.idCardTip.style.display = "none";
          }
        }
      },
      checkPhone(){
        let phoneExp = /[0-9]{11}/;
        if(this.phone != "" && !phoneExp.test(this.phone)){
          this.$refs.phoneTip.innerHTML = " 电话号码长度为11个字符";
          this.$refs.phoneTip.style.display = "block";
        }else if(this.phone == ""){
          this.$refs.phoneTip.innerHTML = "电话号码不能为空";
          this.$refs.phoneTip.style.display = "block";
        }else{
          this.$refs.phoneTip.style.display = "none";
        }
      },
      checkForm(){
        let flag = true;
        // let userNameExp = /[0-9a-zA-Z]{6,25}/;
        let userNameExp = /[0-9a-zA-Z]{0,25}/;
        if(this.userName == ""){
          this.$refs.userNameTip.innerHTML = "用户名不能为空";
          this.$refs.userNameTip.style.display = "block";
          flag = false;
        }else if(!userNameExp.test(this.userName)){
          this.$refs.userNameTip.innerHTML = "用户名小于25位字母或数字组合";
          this.$refs.userNameTip.style.display = "block";
          flag = false;
        }else{
          this.$refs.userNameTip.style.display = "none";
        }

        if(this.trueName == ""){
          this.$refs.trueNameTip.innerHTML = "真实姓名不能为空";
          this.$refs.trueNameTip.style.display = "block";
          flag = false;
        }else{
          if(this.trueName.length > 50){
            this.$refs.trueNameTip.innerHTML = "真实姓名最长为50位字符";
            this.$refs.trueNameTip.style.display = "block";
            flag = false;
          }else{
            this.$refs.trueNameTip.style.display = "none";
          }
        }

        // let pwdExp = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%_^&*? ]).*$/;
        var pwdExp = /^[a-zA-Z0-9~!@#$%^&*()<>,.?\[\]{}]{0,16}$/;
        if(this.password == ""){
          this.$refs.pwdTip.innerHTML = "密码不能为空";
          this.$refs.pwdTip.style.display = "block";
          flag = false;
        }else if(!pwdExp.test(this.password)){
          // this.$refs.pwdTip.innerHTML = "密码为6到16位数字、大小写字母、特殊字符组合";
          this.$refs.pwdTip.innerHTML = "密码长度小于16位";
          this.$refs.pwdTip.style.display = "block";
          flag = false;
        }else{
          this.$refs.pwdTip.style.display = "none";
        }

        if(this.repassword == ""){
          this.$refs.rePwdTip.innerHTML = "密码不能为空";
          this.$refs.rePwdTip.style.display = "block";
          flag = false;
        }else if(this.repassword != this.password){
          this.$refs.rePwdTip.innerHTML = "两次密码不一致";
          this.$refs.rePwdTip.style.display = "block";
          flag = false;
        }else{
          this.$refs.rePwdTip.style.display = "none";
        }

        if(this.orgName == ""){
          this.$refs.orgTip.innerHTML = "所属单位不能为空";
          this.$refs.orgTip.style.display = "block";
          flag = false;
        }else{
          this.$refs.orgTip.style.display = "none";
        }

        let reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
        if(this.idCard == ""){
          this.$refs.idCardTip.innerHTML = "身份证号不能为空";
          this.$refs.idCardTip.style.display = "block";
          flag = false;
        }else{
          if (!reg.test(this.idCard)) {
            this.$refs.idCardTip.innerHTML = "身份证号格式不正确";
            this.$refs.idCardTip.style.display = "block";
            flag = false;
          }else {
            this.$refs.idCardTip.style.display = "none";
          }
        }

        let phoneExp = /[0-9]{11}/;
        if(this.phone != "" && !phoneExp.test(this.phone)){
          this.$refs.phoneTip.innerHTML = " 电话号码长度为11个字符";
          this.$refs.phoneTip.style.display = "block";
          flag = false;
        }else if(this.phone == ""){
          this.$refs.phoneTip.innerHTML = "电话号码不能为空";
          this.$refs.phoneTip.style.display = "block";
          flag = false;
        }else{
          this.$refs.phoneTip.style.display = "nonde";
        }

        return flag;
      },
      handleClick(data,checked) {
        this.$refs.treeForm.setCheckedNodes([]);
        this.$refs.treeForm.setCheckedNodes([data]);
        this.orgId = data.orgId;
        this.orgName = data.orgName;
        this.orgCode = data.orgCode;
      },
      reset(){
        this.userName = "";
        this.trueName= "";
        this.password= "";
        this.repassword= "";
        this.idCard= "";
        this.phone= "";
        this.photoUrl= "";
        this.orgId = null;
        this.orgCode=null;
        this.orgName=null;
        document.querySelectorAll(".ts").forEach(el => {
          el.style.display = "none";
        })
      },
      //注册
      register:function(){
        if(!this.checkForm()){
          return false;
        }
        let _this = this;
        let param={userName:this.userName,trueName:this.trueName,password:md5.hex(this.password),phone:this.phone,idCard:this.idCard,photoUrl:this.photoUrl,orgCode:this.orgCode,orgId:this.orgId, orgName:this.orgName};
        let data = this.$qs.stringify(param);
        this.$http.post('/sms/usercore/add',data).then(res=>{
          if( res.statusText=='OK' && res.data.code==200){
            // this.$alert('注册成功，待管理员审核', '消息提示', {
            //   confirmButtonText: '确定',
            //   callback: action => {
            //       _this.$router.push({path:"/login"});
            //   }
            // });
            // layer.open({
            //   type: 0,
            //   icon:6,
            //   content: '注册成功！',
            //   title:"消息提示",
            //   yes:function(index){
            //     layer.close(index);
            //     _this.$router.push({path:"/login"});
            //   }
            // });
             this.$myconfirm({
              type: '提示',
              msg: '注册成功！',
              icon: 3,
              btn: {
                ok: '确定',
                 no: '取消'
              }
            }).then(() => {
                 _this.$router.push({path:"/login"});
            })
            .catch(() => {
              console.log('no')
            })
          }else if(res.data.code==100){
            //this.$alert("用户名重复","消息提示");
            layer.alert('用户名重复！',{icon:5,title:"消息提示"});
            return false;
          }else{
            //this.$alert(res.data.message,"消息提示");
            layer.alert(res.data.message,{icon:5,title:"消息提示"});
            return false;
          }
        });
      },

      // 获取部门列表
      getListOrg () {
        let data = {
          orgParentId: ""
        };
        data = this.$qs.stringify(data);//post请求分离data
        this.$http.get('/sms/org/listOrg',data).then(res=>{
          if(res.data.code == 200){
            this.treeData = res.data.data;
          }else{
            //this.$alert("获取部门列表失败","消息提示");
            layer.alert('获取部门列表失败！',{icon:5,title:"消息提示"});
          }
        })
      }

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import url('../../assets/css/commom.css');
  .wrapper{
    position: absolute;
    width: 100%;
    height: 100vh;
    top:0;
    left:0;

    .tt_{
      position: relative;
      height:0.6rem;
    }
    .header{
      position: relative;
      display: block;
      background: url('../../assets/topbg.png') center no-repeat;
      background-size: 100% 100%;
      height: 0.6rem;
    }
    .header img {
      position: absolute;
      top:0.05rem;
      left: 2%;
      height:0.48rem;
    }
    .navInfo {
      position: absolute;
      top:0;
      right: 0;
      height: 0.6rem;
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .navLeft{
        display: flex;
        align-items: center;
        width:2.02rem;
        img{
          width: 0.3rem;
        }
        .tain {
          margin-left: 0.08rem;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: center;
          font-size: 0.12rem;
        }
      }
      .toLogin{
        width:1.08rem;
        font-size: 0.16rem;
        text-align: center;
        cursor: pointer;
      }
    }
    .register{
      height: calc(100vh - 1.6rem);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .content{
  display: flex;
  align-items: center;
  justify-content: center;
  .cont_title{
    display: flex;
    height: 0.6rem;
    width: 100%;
    padding-left:0.3rem;
    align-items: center;
    font-size: 0.21rem;
    font-weight: bold;
    line-height:0.6rem;
    color: #409eff;
  };
  .content_left{
    position: relative;
    display: flex;
    width: 10rem;
    height: 6.84rem;
    background:url(../../assets/images/login/videoinfo.png) center no-repeat;
    background-size: 100% 100%;
    flex-direction: column;
    // padding-bottom: 0.48rem;
    // border-bottom: 1px solid #dcdfe6;
    // box-shadow:0 1px 1px #d8d8d8;
    .qj{
      position: absolute;
      width: 1.5rem;
      height: 1.5rem;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1.1rem;
      z-index: 10;
    }

    .cont_pic{
      // display: flex;
      align-items:center;
      justify-content:center;
      flex: 1;
      width: 94%;
      margin: 0 auto;
      height: calc(100% - 1.5rem);
      // background: url("../../assets/images/login/default1.png") no-repeat;
      // background-size: 100% 100%;
      // border: 1px solid #ccc;
      position: relative;
      //  padding-top:0.2rem;
      .img{
        width: 100%;
        height: 100%;
      }
      img{
        max-width: 100%;
        max-height: 100%;
      }

    }
        .cont_btn{
        display: flex;
        width: 100%;
        height: 0.65rem;
        // background: rgba(120, 127, 135, 0.6);
        // position: absolute;
        // bottom: 0;
        justify-content: center;
        align-items: center;

        .usb{
          // background: url('../../assets/images/login/pz1.png') no-repeat;
          // background-size: 100% 100%;
          text-align: center;
          width: 1.37rem;
          height: 0.36rem;
          line-height: 0.36rem;
          margin: 0 0.25rem;
          cursor: pointer;
          &:last-child{
            background: url('../../assets/images/login/bdsc1.png') no-repeat;
            background-size: 100% 100%;
          }
          &:first-child:hover{
            background: url('../../assets/images/login/pz.png') no-repeat;
            background-size: 100% 100%;
          }
          &:last-child:hover{
            background: url('../../assets/images/login/bdsc.png') no-repeat;
            background-size: 100% 100%;
          }
        }
        .send{
          // background: url('../../assets/images/login/bdsc1.png') no-repeat;
          // background-size: 100% 100%;
          width: 1.37rem;
          height: 0.36rem;
          line-height: 0.36rem;
          margin: 0 0.25rem;
          // margin-top: 0.04rem;
          cursor: pointer;
          &:hover{
            background: url('../../assets/images/login/bdsc.png') no-repeat;
            background-size: 100% 100%;
          }
        }
      }
  }
  .content_right{
    display: flex;
    width: 7.1rem;
    height: 6.84rem;
    background: url(../../assets/images/login/accountinfo.png);
    background-size: 100% 100%;
    margin-left: 0.1rem;
    flex-direction: column;
    // border-bottom: 1px solid #dcdfe6;
    // box-shadow:0 1px 1px #d8d8d8;
    .btn{
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      span{
        width: 1.16rem;
        height: 0.33rem;
        margin: 0 0.1rem;
        cursor: pointer;
        &:first-child{
          background:url(../../assets/images/login/regi.png) center no-repeat;
          background-size: 100% 100%;
        }
        &:first-child:hover{
          background:url(../../assets/images/login/regih.png) center no-repeat;
          background-size: 100% 100%;
        }
        &:last-child{
         background:url(../../assets/images/login/send.png) center no-repeat;
          background-size: 100% 100%;
        }
        &:last-child:hover{
         background:url(../../assets/images/login/sendh.png) center no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .account_info{
      position: relative;
      /*display: flex;*/
      /*flex: 1;*/
      .username{
        width: 100%;
        height: 0.6rem;
        margin-bottom:0.1rem;
        flex-direction: column;
        .labe{
          display: flex;
          justify-content: center;
          .sydw{
            width:1.58rem;
            font-size: 0.16rem;
            line-height: 0.38rem;
            text-align: right;
            color:#99c9fa ;
            span{
              color:#d16f66;
              padding-right:3px;
            }
          }
          input{
            width: 3.8rem;
            height: 0.38rem;
            font-size: 0.16rem;
            border: 1px solid #132b48;
            border-radius: 0.04rem;
            padding-left: 0.1rem;
            color:#99c9fa ;
            background:#041524
          }
          textarea{
            width: 3.8rem;
            height: 0.5rem;
            font-size: 0.16rem;
            padding: 0.04rem 0.1rem;
            border: 1px solid #dcdfe6;
            color:#7b7e80;
          }
          .el-select{
            width:3.8rem;
            font-size: 0.16rem;
            color:#7b7e80;
          }
          .treePop{
            position: absolute;
            top:0.36rem;
            left:2.45rem;
            z-index: 9;
          }
          .treePop .el-tree {
            width: 3.8rem;
            height: 1.54rem;
            overflow: auto;
          }
        }
        .ts{
          display:none;
          font-size: 0.12rem;
          line-height: 0.2rem;
          color: #d16f66;
          margin: 0 auto;
          width: 5.38rem;
          padding-left: 1.7rem;
        }
      }
    }
  }
}
.loginFooter{
  height:1rem;
  padding-top:0.4rem;
  line-height:0.22rem;
  font-size:0.14rem;
  color:#758ca3;
  text-align: center;
  img{
    margin-right: 0.05rem;
  }
}
  .treeWrap{
    overflow-y:auto;
    overflow-x:hidden;
    height: 2rem;
    width:3.54rem;
  }

  .platform_home .wrapper .header{
    background:#0a3550 url('../../assets/topbg_caseIndex.png') no-repeat;
    background-size: 100% 100%;
  }
  .vehicle_home .wrapper .header{
    background: #0a3550 url('../../assets/topbg_vehicle.png') no-repeat;
    background-size: 100% 100%;
  }
  .caseIndex_home .wrapper .header{
    background: #0a3550 url('../../assets/topbg_caseIndex.png') no-repeat;
    background-size: 100% 100%;
  }
  .caseTop_home .wrapper .header{
    background: #0a3550 url('../../assets/caseTopTitle.png') no-repeat;
    background-size: 100% 100%;
  }
.platformStruct_home .wrapper .header{
    background:#0a3550 url('../../assets/topbg_platform.png') no-repeat;
    background-size: 100% 100%;

}

</style>
