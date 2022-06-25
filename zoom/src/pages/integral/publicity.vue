<template>
  <div :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
    <v-header :title="{ name: title }"></v-header>
    <div style="position: relative;">
      <img class="bj_img" v-if="judge" src="../../../public/img/page/integral/integral_ZY.jpg" width="100%" alt=""> 
      <img class="bj_img" v-else src="../../../public/img/page/integral/integral_PT.jpg" width="100%" alt=""> 
      <br>
    </div>
    <div class="bt_box" @click="goPage('integral')">
      <img class="bj_img" src="../../../public/img/home/integral_bt2.jpg" width="100%" alt=""> 
    </div>
  </div>
</template>

<script>
import common from "../../assets/js/util/common";
import { mapState } from 'vuex'
export default {
  data() {
    return {
      title: this.$route.meta.title,
      judge:false,
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.my.UserInfo,
    })
  },
  async created() {
    // 处理专员和非专员显示
    if(this.userInfo.agentType == '1'){
      this.judge = true;
    }
  }
};
</script> 

<style lang="less" scoped>
.bj_img {
  display: block;
}
.bt_box{
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
}
</style>