<template>
  <div id="app" :class="$iosSystem ? 'iosSystem' : ''">
    <!-- <transition name = "fade"> -->
      <!-- <router-view /> -->
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    <!-- </transition> -->
    <global-loading></global-loading>
  </div>
</template>
<script>
import globalLoading from './templates/globalLoading';
export default {
  components: {
    globalLoading
  },
  data() {
    return {
    };
  },
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.recallDialog .van-goods-action{
  margin-bottom: 50px;
}
.recallDialog .aleTxt{
  margin: 0;
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 10px;
  z-index: 99;
  font-size: 12px;
  color: #666666;
}
</style>
