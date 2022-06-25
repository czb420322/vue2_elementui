<template>
  <div class="tt">
    <!-- <div class="content"> -->
      <input type="hidden" v-model="username">
      <input type="hidden" v-model="password">
    <!-- </div> -->

  </div>
</template>
<script>
import login from './login.js'

  export default {
    mixins:[login],
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.tt{
    display: flex;
    position: fixed;
    background: url('../../assets/images/login/bj_all.png') no-repeat;
    background-size: 100% 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
}
  .content{
    position: absolute;
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
  }


</style>
