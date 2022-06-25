<template>
  <div>
    <img v-if="wx" class="img" src="img/common/download1.png" alt />
    <img class="logo" src="img/login/logo-icon.png" alt />
    <div class="btnBox">
      <van-button type="primary" size="large" @click="goAndroid" :disabled="wx">
        <van-icon name="img/common/android.png" />Android版本下载
      </van-button>
      <van-button type="primary" size="large" :disabled="wx" v-if="wx">
        <van-icon name="img/common/IOS.png" />IOS版本下载
      </van-button>
      <a :href="iosUrl" v-else style="display: block;" >
        <van-button type="primary" size="large">
          <van-icon size="18" name="img/common/IOS.png" />IOS版本下载
        </van-button>
      </a>
    </div>
    <div class="txt">
      <p>IOS用户安装指南</p>
      <p>1.由于IOS的安全机制，首次安装App的用户需要进入系统“设置”</p>
      <p>2.选择“通用”/“设备管理”</p>
      <p>3.选择 “iPhone Distribution: GUOREN PROPERTY AND CASUALTY INSURANCE CO.,LTD.”，设置为信任</p>
      <p>4.点击“信任”完成验证</p>
    </div>
    <i class="bg"></i>
  </div>
</template>

<script>
import configJs from './../../config.js';
import app from '../../assets/js/util/app';
export default {
  data() {
    return {
      wx: false,
      isIos: false,
      iosUrl: configJs.download.ios
    };
  },
  created() {
      this.isIos = app.isIos();
  },
  mounted() {
    var browser = {
      versions: (function () {
        var u = navigator.userAgent,
          app = navigator.appVersion;
        return {
          //移动终端浏览器版本信息
          trident: u.indexOf("Trident") > -1, //IE内核
          presto: u.indexOf("Presto") > -1, //opera内核
          webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
          gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或uc浏览器
          iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf("iPad") > -1, //是否iPad
          webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
        };
      })(),
      language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    if (browser.versions.mobile) {
      //判断是否是移动设备打开。browser代码在下面
      var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        //在微信中打开
        this.wx = true;
      }
    } else {
      //否则就是PC浏览器打开
    }
  },
  methods: {
    goAndroid() {
      window.location.href = configJs.download.android;
    },
    goIos() {
      window.location.href = configJs.download.ios;
    }
  }
};
</script>
<style scoped>
.bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #303463;
  z-index: -1;
}
.img {
  display: block;
  width: 100%;
}
.logo {
  display: block;
  margin: 3rem auto;
  width: 22%;
}
.btnBox {
  width: 60%;
  margin: 3rem auto;
}

.btnBox .van-button--primary {
  background-color: #35bffd;
  border: 1px solid #35bffd;
}
.van-button{
  margin: .5rem auto;
}

.van-button__text {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btnBox .van-button .van-icon {
  font-size: 28px;
  margin-right: 5px;
}
.btnBox .van-button:nth-of-type(2) .van-icon {
  font-size: 22px;
}

.txt {
  margin: 30px 4% 0;
  color: white;
  font-size: 13px;
  text-align: center;
}
.txt p {
  margin: 14px 0;
  line-height: 1.5em;
}
.txt p:nth-of-type(1) {
  font-size: 15px;
  font-weight: bold;
}
</style>


