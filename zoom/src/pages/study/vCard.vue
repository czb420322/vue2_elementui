<template>
  <div class="vCard_page van-hairline--bottom">
    <div class="content_txt">
      <div class="name">{{item.title}}</div>
      <!-- <div class="tag">
        <van-tag plain type="primary">标签</van-tag>
        <van-tag plain type="primary">标签</van-tag>
      </div> -->
      <div class="txt">
        <span v-if="item.readNum || item.readNum == '0'">{{item.readNum}}次学习</span>
        <span span="12">{{item.modifiedDate}}</span>
      </div>
    </div>
    <img class="photo" width="100" height="70" v-if="item.coverImgUrl" :src="item.coverImgUrl">
  </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
  props: ['item'],
  data() {
    return {
      active: 0
    }
  },
  created() {

  },
  methods: {

  },
};
</script>

<style lang="less">
.vCard_page {
  background-color: white;
  display: flex;
  margin: 0 3.5%;
  padding: 14px 0;
  .photo {
    border-radius: 4px;
  }
  .content_txt {
    flex: 1;
    margin-right: 10px;
    align-content: space-between;
    display: flex;
    flex-wrap: wrap;
    .name {
      width: 100%;
      font-size: 16px;
    }
    .tag {
      width: 100%;
      .van-tag {
        margin-right: 4px;
      }
    }
    .txt {
      width: 100%;
      font-size: 12px;
      opacity: 0.4;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>