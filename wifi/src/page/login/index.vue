<!--
 * @Author: your name
 * @Date: 2019-12-24 10:02:59
 * @LastEditTime : 2021-06-08 13:38:46
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\login\index.vue
 -->
<template>
  <div class="tt">
    <!-- <Loginheader/> -->
    <!-- 内容层 -->
    <!-- <DeviceSubmit/> -->
    <Admininformation v-show="ifAdminInfo"/>
    <!-- <div class="content" v-bind:style="{top: layerTop}" v-show="true"> -->
    <div class="content" v-show="structtype == 2">
      <img v-if="home == 2" src="../../assets/images/login/title_vehicle.png" alt="">
      <img v-if="home == 4" src="../../assets/images/login/title_struct.png" alt="">
      <img v-else-if="home != 2 && logoTitle == 1" src="../../assets/images/login/title.png" alt="">
      <img v-else-if="home != 2 && (logoTitle == 3 || logoTitle == 2)" src="../../assets/images/login/caseTitle.png" alt="">
      <!-- <img v-else src="../../assets/images/login/title.png" alt=""> -->
      <div class="contnav">
        <!-- <span :class="{on:user_login}" @click="faceLogin">账号登录</span> -->
        <!-- <span :class="{on:rl_login}" @click="faceLoginRight">人脸登录</span> -->
      </div>
      <div class="contentIn" v-show="user_login" @keyup.enter='accoutLogin(0)'>
        <div class="contentuser">
          <span class="labe">用&nbsp;&nbsp;户&nbsp;&nbsp;名&nbsp;&nbsp;：</span>
          <i><img src="../../assets/images/login/head.png" alt=""></i>
          <input v-model="username" type="text" placeholder="请输入用户名/警队编号" key="username-input" @blur="checkUser" maxlength="25" />
          <!-- <a @click="toRegister">注册账号</a> -->
          <!-- <span class="err" v-show="userErr">请输入账号/警队编号</span> -->
          <div ref="userNameTip" class="err"></div>
        </div>
        <div class="contentuser">
          <span class="labe">密&nbsp;&nbsp;<em style="opacity:0">占</em>&nbsp;&nbsp;码&nbsp;&nbsp;：</span>
          <i><img src="../../assets/images/login/lock.png" alt=""></i>
          <input v-model="password" type="password" placeholder="请输入用户密码" key="password-input"   @blur="checkPwd" minlength="6" maxlength="25" />
          <!-- <a @click="toggleAdminInfo">联系管理员</a> -->
          <!-- <span class="err" v-show="pwdErr">请输入用户密码</span> -->
          <div ref="pwdTip" class="err"></div>
        </div>
        <div class="btn" @click="accoutLogin('0')"></div>
        <div class="link">
          <a @click="toRegister">申请账号</a>
          <a @click="toggleAdminInfo">联系售后</a>
        </div>
      </div>

      <!-- <div class="contentpartner" v-show="user_login">
        <p><strong>合 作 伙 伴 ： </strong></p>
        <p><img src="../../assets/images/login/science.png" alt=""></p>
        <p><img src="../../assets/images/login/school.png" alt=""></p>
      </div> -->

      <div class="contentIn_rl" v-show="rl_login">
        <div class="pic_rl">
            <!-- <img src="../../assets/images/login/sb.png" /> -->
            <p>即将上线</p>
        </div>
        <div class="rl_des">请正视屏幕上方摄像头，系统将会自动根据您的录像采集照片信息..</div>

        <div class="call_rk">
          <a @click="toRegister">注册到人脸库</a>
          <a @click="toggleAdminInfo">联系管理员</a>
        </div>
      </div>




      <register :openregister="openregister" @childbyregister="childbyregister"></register>
      <Admininformation :opentoggleAdminInfo="opentoggleAdminInfo" @childadminInformation="childadminInformation"></Admininformation>
    </div>
    <div v-show="structtype != 1">

    </div>
    <!-- <div class="loginFooter">
      <img src="../../assets/logo.png" /> 武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span>

    </div> -->
  </div>
</template>
<script>
//引用头部和底部
import Admininformation from '../../components/admin_information'
import DeviceSubmit from '../../components/device_submit'
import { mapActions,mapMutations, mapState,mapGetters } from 'vuex'
import md5 from 'js-md5'
import register from './register'
import login from './login.js'

  export default {
    mixins:[login],
    components:{
      Admininformation,DeviceSubmit,register
    },

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.tt{
    display: flex;
    position: fixed;
    // background: url('../../assets/images/login/bj_all.png') no-repeat;
    background-size: 100% 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
  .content{
    position: absolute;
    // top:418px;
    // background: #1a3657;
    background: rgba(16,35,56,0.27);
    box-shadow:2px -1px 13px 2px rgba(149,200,253,0.1);
    border: 1px solid #27456C;
    // height: auto;
    height: 5.5rem;
    width: 7.68rem;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    transition: top .3s ease;
    // box-shadow: 0 0 0.15rem #888;
    // border-radius: 0.05rem;
    img{
      width: 100%;
      border-radius: 0.05rem 0.05rem 0 0;
    }
    .contentIn_rl{
      height: calc(100% - 1.06rem);
      display: flex;
      flex-direction: column;
      align-items: center;
      .pic_rl{
        position: relative;
        display: flex;
        width: 68%;
        height: 63%;
        border: 1px solid #ccc;
        // background: url('../../assets/images/login/rlcj.png') no-repeat;
        background-size: 100% 100%;
        p{
          width: 100%;
          line-height: 3.2rem;
          color: #999;
          text-align: center;
          font-size: 0.2rem;
        }
        img{
          width: 1.5rem;
          margin-top: 0.3rem;
          top: 0.06rem;
          right: 0.8rem;
          position: absolute;
        }
      }
      .rl_des{
        color: red;
        font-size: 0.16rem;
        line-height: 0.36rem;
      }
      .btn_rl{
        display: flex;
        background: #4a99e5;
        width: 3rem;
        height: 0.45rem;
        justify-content: center;
        align-items: center;
        font-size: 0.2rem;
        color:white;
        letter-spacing: 0.05rem;
      }
      .call_rk{
        display: flex;
        font-size: 0.2rem;
        margin-top: 0.15rem;
        color: #0488ff;
        justify-content: space-between;
        a{
          margin: 0 0.3rem;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    .contnav{
      display:flex;
      justify-content: center;
      width: 100%;
      margin:3% 0 2%;
      font-size: 0.21rem;
      line-height: 0.48rem;
      color: #99c9fa ;

      span{
        position: relative;
        cursor: pointer;//手势
        &.on{
          color: #2e93fb;
          border-bottom:2px solid  #2e93fb;
        }
        &:last-child{
          margin-left: 0.4rem;
        }
      }
    }
    .contentIn{
      padding-top: 4%;
      .contentuser{
        position: relative;
        height: 0.8rem;
        margin-bottom: 2%;
        padding: 0 14%;
        margin-top: 0.1rem;
        .labe{
          width:25%;
          font-size: 0.2rem;
          line-height: 0.4rem;
          color: #99c9fa ;
          padding-right: 0.2rem;
        }
        i{
          display: flex;
          width: 0.2rem;
          height: 0.2rem;
          position: absolute;
          top: 0.1rem;
          left: 33%;
        }
        input{
          width: 70%;
          font-size:0.18rem;
          height: 0.4rem;
          padding-left: 0.4rem;
          border:1px solid #132b48;
          font-size: 0.16rem;
          color:#99c9fa ;
          background: #0a1d31 !important
        }
        a{
          width: 20%;
          font-size:0.18rem;
          line-height:0.4rem;
          color: #0a83f1;
          padding-left: 0.12rem;
          text-decoration:underline;
          cursor: pointer;
        }
        .err{
          position:absolute;
          left: 2.68rem;
          top: 0.46rem;
          padding-left:0.2rem;
          font-size:0.16rem;
          line-height: 0.24rem;
          color:red;
        }
      }
      .btn{
        width: 64%;
        height: 0.5rem;
        margin:0 auto;
        line-height: 0.5rem;
        text-align: center;
        background: url('../../assets/images/login/login.png') no-repeat center / 100% 100%;
        cursor: pointer;
      }
      .link{
        width: 72%;
        height: 0.5rem;
        margin: 0.3rem auto;
        // background: #ccc;
        a{
          display: inline-block;
          width: 20%;
          margin-left: 20%;
          line-height: 0.5rem;
          font-size: 0.18rem;
          color: #99c9fa ;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    .contentpartner{
      width: 95%;
      /*height: 0.55rem;*/
      margin: 0 auto;
      padding-top: 0.2rem;
      border-top: 2px solid #324f72;
      // background: #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      p{
        width: 1.35rem;
        // line-height: 0.35rem;
        display: inline-block;
        text-align: right;
        font-size: 0.18rem;
        margin-left: 8%;
        color: #99c9fa ;
        // border: 1px solid red;
        &:first-child{
          margin-left: 0;
          text-align: center;
        }
      }
    }
  }
  .loginFooter{
    position: fixed;
    bottom:0.24rem;
    left:0;
    width:100%;
    text-align:center;
    font-size:0.14rem;
    color:#758ca3;
    line-height:1.5;
    img{
      margin-right: 0.05rem;
    }
  }
  }
.platform_home .tt{
  background: url('../../assets/images/login/bg.png') no-repeat;
  // background: url('../../assets/images/login/bj_all.png') no-repeat;
  background-size: 100% 100%;
  z-index: 1999;
}
.platformStruct_home .tt {
  background: url('../../assets/images/login/bg.png') no-repeat;
  background-size: 100% 100%;
  z-index: 1999;
}
.vehicle_home .tt{
  // background: url('../../assets/images/login/bj_all_vehicle.png') no-repeat;
  background: url('../../assets/images/login/bg.png') no-repeat;
  background-size: 100% 100%;
  z-index: 1999;
}
.caseIndex_home .tt{
  // background: url('../../assets/images/login/bj_all_caseIndex.png') no-repeat;
  background: url('../../assets/images/login/bg.png') no-repeat;
  background-size: 100% 100%;
  z-index: 1999;
}
.caseTop_home .tt{
  // background: url('../../assets/images/login/bj_all_caseIndex.png') no-repeat;
  background: url('../../assets/images/login/bg.png') no-repeat;
  background-size: 100% 100%;
  z-index: 1999;
}

input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active {
transition-delay: 99999s;
transition: color 99999s ease-out, background-color 99999s ease-out;
}

</style>
