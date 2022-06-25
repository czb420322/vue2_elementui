<template>
  <div class="confirmInsured">
    <v-header :title="{ name: title }"></v-header>
    <div class="banner" :style="{ 'margin-top': ($iosSystem + 46) + 'px' }">
      <h1 class="name">中国人的车</h1>
      <p class="txt">*先赔付再修车，省心省钱</p>
      <p class="txt">*7*24小时免费道路救援</p>
    </div>
    <ol class="content">
      <li class="list">
        <h5 class="name">投保人信息</h5>
        <div class="info-box">
          <van-field v-model="value" label="车牌号" placeholder="请输入车牌" />
          <van-field v-model="value" label="投保地区" placeholder="选择地" right-icon='arrow' />
          <van-field name="switch" label="新车未上牌" input-align="right" >
            <template #input>
              <van-switch v-model="switchChecked" size="24" />
            </template>
          </van-field>
          <van-field name="switch" label="一年过户车" input-align="right" >
            <template #input>
              <van-switch v-model="switchChecked1" size="24" />
            </template>
          </van-field>
          <div class="btn_bar">
            <van-button type="info" block >立即投保</van-button>
            <a class="btn share_btn">分享车险投保</a>
            <a class="btn enquiry_btn">询价记录</a>
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import util from '../../assets/js/util/util';
import app from '../../assets/js/util/app';
import configJs from './../../config.js';
export default {
  data() {
    return {
      title: this.$route.meta.title,
      switchChecked: true,
      switchChecked1: false,
      value: '',
    };
  },
};
</script>

<style lang="less">
@import '../../assets/less/app/product/carInsurance.less';
</style>
