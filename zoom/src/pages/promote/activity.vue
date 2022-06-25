<template>
  <div class="recommendRegisterPage addStaffRegisterPage">
    <div>
      <img class="bj_img" src="./../../../public/img/login/addStaffRegister_bg.jpg" width="100%" alt="">
    </div>
    <!-- <iframe class="video" src='https://player.youku.com/embed/XMzg0MDkyNTQ5Mg==?rel=0&amp;autoplay=1' frameborder=0 ></iframe> -->
    <div class="video">
      <iframe src='https://devyun.guorenpcic.com/rbt-h5/img/poster/video.mp4?rel=0&amp;autoplay=1' frameborder=0></iframe>
      <van-button type="primary" block @click="goProduct" >参加活动</van-button>
    </div>
  </div>
</template>
<script>
import configJs from '../../config.js';
import common from '../../assets/js/util/common';
export default {
  data() {
    return {
    };
  },
  created() {
    
  },
  methods: {
    goProduct(){
      let local = `${decodeURIComponent(this.$route.query.aLink)}&phone=${this.$route.query.phone}&agentCode=${this.$route.query.agentCode}&agentId=${this.$route.query.agentId}&activityId=${this.$route.query.activityId}`;
      window.location.href = this.$WxUrlAuthorize(local);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../assets/less/app/login/addStaffRegister.less';
.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 88%;
  margin: 6%;
  top: 127vw;
  iframe {
    height: 49.5vw;
    width: 100%;
  }
}
</style>
