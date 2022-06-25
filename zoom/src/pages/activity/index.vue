<template>
  <div :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
    <v-header :title="{ name: title }"></v-header>
    <div style="position: relative;">
      <img class="bj_img" v-if="judge" src="../../../public/img/home/activity_bg1.jpg" width="100%" alt=""> 
      <img class="bj_img" v-else src="../../../public/img/home/activity_bg0.jpg" width="100%" alt=""> 
      <!-- <img class="bj_img" src="../../../public/img/home/activity_bg0.jpg" width="100%" alt="">  -->
      <ol class="position" >
        <!-- <div v-if="judge"> 
          <li v-for="(item,index) in list" :key="index" @click="goPage(item)" ></li>
        </div> -->
        <div> 
         <li class="li_1" v-for="(item,index) in list" :key="index" @click="goPage(item)" ></li>
        </div>

        <div>
          <li class="li_2" v-for="(item2,index2) in list1" :key="index2" @click="goPage(item2)" ></li>
        </div>
        <!-- <div style="margin-top: 20vw;">
          <li @click="goPage('exhibition')" ></li>
        </div> -->
      </ol>
    </div>
  </div>
</template>

<script>
import common from "./../../assets/js/util/common";
export default {
  data() {
    return {
      title: this.$route.meta.title,
      judge:false,
      list: [
        'productDetail?saleCode=GRMOBILE_MALL_SL0623',
      ],
      list1: [
        'productDetail?saleCode=GRMOBILE_MALL_SL062',
        'productDetail?saleCode=GRMOBILE_MALL_SL062',
        'productDetail?saleCode=GRMOBILE_MALL_SL062',
      ],
    };
  },
  async created() {
    this.userInfo = (await common.getUserInfo()) || {};
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
.position{
    position: absolute;
    top: 74vw;
    left: 5%;
    right: 5%;
  .li_1{
    // background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 34vw;
    margin-bottom: 12vw;
  }
  .li_2{
    width: 100%;
    height: 32vw;
  }
}
</style>