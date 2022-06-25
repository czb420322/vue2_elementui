<template>
  <div class="setUpPage" :style="{ 'margin-top': ($iosSystem + 46) + 'px' }">
    <i class="top_bar" :style="{ 'height': $iosSystem + 'px' }"></i>
    <div>
      <van-nav-bar title="账户设置" :border="false" :fixed="true">
        <template #left>
          <van-icon name="arrow-left" color="#3B3B3B" size="20" @click="onClickLeft" />
        </template>
      </van-nav-bar>
      <div class="content-box">
        <header class="userInfo">
          <div class="updHeadPortrait">
            <input v-if="isIos" class="file" type="file" accept="image/*" @change="afterRead($event)" ref="refIdInput" />
            <img v-if="agentProfile" @click="isIos ? null : showPicChoose()" class="photo" :src="agentProfile">
            <img v-else @click="isIos ? null : showPicChoose()" class="photo" src="./../../../public/img/page/gr_head.png">
          </div>
          <!-- <img class="photo" src="./../../../public/img/page/gr_head.png" alt=""> -->
          <div class="user">
            <p class="name">{{userInfo.name || userInfo.mobileStar}}
              <img class="icon" v-if="userInfo.sex == '0'" src="./../../assets/img/account/sex_man_icon.png" alt="">
              <img class="icon" v-else-if="userInfo.sex == '1'" src="./../../assets/img/account/sex_woman_icon.png" alt="">
            </p>
            <p style="font-size: 12px; opacity: .6;" v-if="userInfo.superAgentName" >归属专员姓名：{{userInfo.superAgentName}}</p>
            <p style="font-size: 12px; opacity: .6;" v-if="userInfo.superAgentMobile" >归属专员手机号：{{userInfo.superAgentMobile}}</p>
          </div>
        </header>
        <van-cell :border="false" title="账号与安全" is-link to="accountSafety" />
        <!-- <van-cell :border="false" title="消息设置" is-link to="informationSet" /> -->
        <van-cell :border="false" title="消息设置" is-link @click="developing" />
        <van-cell :border="false" title="银行卡" is-link to="bank" v-show="userInfo.agentType == '2'" />
        <div class="function_list">
          <van-cell :border="false" title="常见问题" is-link @click="developing" />
          <van-cell :border="false" title="功能反馈" is-link @click="developing" />
        </div>
        <a class="logOut" @click="goSignOut">退出登录</a>
      </div>
       <!-- 选择拍照相册选择 -->
      <van-dialog class="selectPhoto" v-model="showDialog" :title="null" :showConfirmButton="false" :closeOnClickOverlay="true">
        <van-cell-group title="请选择图片来源">
          <van-cell @click="goGetPic()" title="相册" />
          <van-cell @click="goGetCamera()" title="拍照" />
        </van-cell-group>
      </van-dialog>

    </div>
  </div>
</template>

<script>

import common from '../../assets/js/util/common';
import app from '../../assets/js/util/app';
import util from '../../assets/js/util/util';
import EventBus from '../../assets/js/util/EventBus';
import { mapState } from 'vuex'
export default {
  data() {
    return {
      showDialog: false,
      isIos: false,
      agentProfile:'',
    };
  },
  computed:{
    ...mapState({
      userInfo: state => state.my.UserInfo
    })
  },
  created() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (isWeixin) {
      this.isIos = true;
    }else{
      this.isIos = app.isIos()
    }
    this.$store.dispatch('my/getUserInfo');
    this.agentProfile = this.userInfo.agentProfile
  },
  mounted () {
    window.appntInfoOpenAndroidCameraCallback = this.appntInfoOpenAndroidCameraCallback;
  },
  methods: {
    // 上传相片
    async afterRead(src) {
      let file
      if (this.isIos) {
        file = src.target.files[0]
      } else {
        file = util.btof(src, "upfile")
      }
      EventBus.$emit('GlobalLoadingTrigger', true);
      var formdata = new FormData();
      formdata.append('type', '01');
      formdata.append('file', file);
      this.instance.post('user/updateProfile', formdata).then((res) => {
        EventBus.$emit('GlobalLoadingTrigger', false);
        if (res.data.code == 0 && res.data.content.resultCode == '1') {
          this.agentProfile = res.data.content.agentProfile
          this.$toast('上传成功');
        } else {
          this.$toast(res.data.content.resultMessage || '上传失败！');
        }
      }).catch(error=>{
        EventBus.$emit('GlobalLoadingTrigger', false);
      });
    },
    showPicChoose() {
      this.showDialog = true;
    },
    // 调用安卓系统
    goGetCamera() {
      console.log('安卓调用摄像头')
      this.showDialog = false;
      app.getCamera({ 'callbackMethod': 'appntInfoOpenAndroidCameraCallback' })
    },
    goGetPic() {
      console.log('安卓调用相册')
      this.showDialog = false;
      app.getPhoto({ 'callbackMethod': 'appntInfoOpenAndroidCameraCallback' })
    },
    // 摄像头回调函数
    appntInfoOpenAndroidCameraCallback(result) {
      let code = result.code;
      if (code == 0) {
        this.afterRead('data:image/jpg;base64,' + result.object.base64Datas)
      }
    },
    developing() {
      this.$toast('功能开发中，敬请期待！');
    },
    // 退出登录
    goSignOut() {
      this.$dialog.confirm({
        title: '退出',
        message: '您确定要退出当前用户吗？',
      }).then(() => {
        // on confirm
        localStorage.clear();
        sessionStorage.clear();
        this.goPage('login');
      }).catch(() => {
        // on cancel
      });
    },
   
    // 账号注销
    async logOff() {
      const res = await this.$axios({
        url: this.$API.API_ACCOUNT_LOGOUT,
        method: 'get'
      });
      this.$toast(res.content.resultMessage || '请求失败');
      if (res.code == 0 && res.content.result == 0) {
        localStorage.clear();
        sessionStorage.clear();
        setTimeout(() => {
          this.goPage('login');
        }, 1200)
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import './../../assets/less/app/account/setUp.less';
#app.iosSystem .setUpPage .van-nav-bar ::after {
  display: none;
}
#app.iosSystem .setUpPage .top_bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 24px;
  background: white;
  z-index: 1;
}
.updHeadPortrait {
  position: relative;
  // width: 2rem;
  // height: 1.2rem;
  display: flex;
  justify-content: flex-end;
  .file{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .icon {
    display: block;
    height: 1.2rem;
    padding-left: 0.4rem;
  }
}
.selectPhoto {
  .van-cell-group__title {
    text-align: left;
  }
  .van-cell::after {
    display: block;
  }
  .van-cell__title span::before {
    display: none;
  }
  .van-cell__title{
    text-align: left;
  }
}
</style>
