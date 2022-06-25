<template>
  <div class="orderListPage" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }" style="min-height: 100vh;">
    <div>
      <v-header :title="{ name: 'i国任' }"></v-header>
      <div>
        <img class="bj_img"  v-if="judge" src="../../../../public/img/home/jxsd.png" width="100%" alt="">
        <img class="bj_img" v-else src="../../../../public/img/home/jxsd_1.png" width="100%" alt="">
      </div>
     
    </div>
  </div>
</template>

<script>

import common from '../../../assets/js/util/common';
export default {
  data() {
    return {
      judge:true
    };
  },
  async created() {
    this.userInfo = (await common.getUserInfo()) || {};
    //处理河北
    if(this.userInfo.OrgCode.substring(0,2) == '15' || this.userInfo.OrgCode.substring(0,2) == '21'){
      this.judge = false;
    }
  },
  methods: {
    showState(){
      this.$refs.informationPopup.parentMsg(true);
    }
  }
};
</script> 

<style lang="less" scoped>
.bj_img{display: block;}

</style>