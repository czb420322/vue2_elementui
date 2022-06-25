<template>
  <div :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
    <v-header :title="{ name: title }"></v-header>
    <div style="position: relative;">
      <img class="bj_img" src="../../../public/img/home/million_bj.jpg" width="100%" alt="">
      <p class="million_bt" @click="goPage('productDetail?saleCode=GRMOBILE_MALL_SL015')"></p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: this.$route.meta.title,
    };
  }
};
</script> 

<style lang="less" scoped>
.bj_img {
  display: block;
}
.million_bt{
    position: absolute;
    top: 209vw;
    height: 9vw;
    width: 39%;
    margin: 0;
    left: 30%;
    z-index: 9;
}
</style>