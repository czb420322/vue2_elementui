<template>
  <div class="noCarPage">
    <v-header :title="{ name: '非车推荐' }"></v-header>

    <div class="tabs-box">
      <van-tabs v-model="tabActive" background="#0252FF" class="white" title-active-color="white" :border="false" title-inactive-color="#B2C9FA">
        <van-tab v-for="(item,index) in tab" :key="index" :title="item"></van-tab>
      </van-tabs>
    </div>

    <ol class="list-box">
      <li class="item"  v-for="(item,index) in 2" :key="index">
        <h5 class="name"><img class="icon" src="./../../../../public/img/home/noCar/icon_01.png" alt="">获客神器</h5>
        <van-card desc="保障期间：6个月 | 投保年龄：18~65岁" title="出行无忧交通工具意外险" thumb="/img/page/base/head2.png" v-for="(item,index) in 2" :key="index"  @click="goDetail">
          <template #tags>
            <div class="list-content">
              <van-tag color="#38C1E8" plain>意外险</van-tag>
              <p class="price">￥<span>100</span>.00起</p>
            </div>
          </template>
        </van-card>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: ['全部', '意外', '医疗'],
      tabActive: 0,
    };
  },
  methods: {
    goDetail(){
      this.$router.push({ name: 'homeProductDetail' });
    }
  }
};
</script>

<style lang="less">
@import '../../../assets/less/app/home/noCar.less';
</style>
