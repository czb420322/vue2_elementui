<template>
  <div class="headerPage">
    <van-nav-bar :title="title.name" left-arrow :border="false" :fixed="true">
      <template #left>
        <van-icon name="cross" size="20" @click="goPage('home')" v-if="(path == '/confirmInsured' && formName != 'orderList' && formName != 'orderDetail') || path == '/applySuccess'" />
        <van-icon name="arrow-left" size="20" @click="onClickLeft" v-else />
      </template>
      <template #right>
        <van-icon class="ask_img" :name="img" size="20" @click="subsidy()" v-if="path == '/subsidy' || path == '/updBank' " />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>

import util from '../assets/js/util/util';
import img from './../../public/img/account/ask.jpg';
export default {
  name: "tab",
  props: ["title"],
  data() {
    return {
      img: img,
      page: 'home',
      path: ''
    };
  },
  mounted() {
    this.path = this.$route.path;
    console.log(this.path)
    this.formName = util.getSessionStorageObj('formName')
  },
  methods: {
    //预期津贴明细页面专用
    subsidy() {
      this.$parent.subsidyMsg();
    }
  }
};
</script>

<style lang="less">
.headerPage {
  .van-nav-bar {
    background-color: #0252ff;
    z-index: 10000;
    .van-nav-bar__left {
      .van-icon {
        color: white;
      }
    }
    .van-nav-bar__left {
      opacity: 0.85;
    }
    .van-nav-bar__title {
      color: rgba(255, 255, 255, 0.9);
      font-size: 17px;
      font-weight: normal;
    }
  }
  .ask_img .van-icon__image {
    border-radius: 50%;
  }
}
</style>
