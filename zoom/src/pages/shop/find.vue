<template>
  <div class="layoutPage findPage">
    <div class="nav_bar van-hairline--bottom" :style="{ 'padding-top': $iosSystem + 'px' }">
      <span class="nav_title">{{title}}</span>
    </div>

    <div class="layoutContent">
      <template v-if="shopInfo.showNews == '1'">
        <h4 class="title_column"><span>保险资讯</span></h4>
        <template v-if="newsList && newsList.length">
          <div v-for="(item, index) in newsList" :key="index" @click="goPage(`wxKnowledgeDetails?id=${item.studyId}&type=${item.type}&isNav=true`)" style="background: white">
            <vCard v-if="item" :item="item"></vCard>
          </div>
        </template>
      </template>
      <van-empty v-else :image="$CTXBASE + '/img/page/study/bg_no_info@2x.png'" description="暂无内容，敬请期待" image-size="110" />
    </div>

    <v-footer :active="1"></v-footer>
  </div>
</template>

<script>
import util from '../../assets/js/util/util';
import vFooter from './footer.vue'
import vCard from './../study/vCard.vue'
import { mapState } from 'vuex'
import compCheck from './../../assets/js/util/comp-check'
export default {
  components: {
    vFooter,
    vCard
  },
  data() {
    return {
      title: this.$route.meta.title,
      newsList: []
    }
  },
  computed: {
    ...mapState({
      shopInfo: state => state.shop.shopInfo
    })
  },
  created() {
    // 保险资讯
    if (this.shopInfo.newsList && this.shopInfo.newsList.length) {
      for (let item of this.shopInfo.newsList) {
        this.newsList.push({
          ...item,
          modifiedDate: item.createdDate ? compCheck.timestampToTime(item.createdDate * 1) : ''
        })
      }
    }
  },
  methods: {

  }
};
</script>

<style lang="less">
@import '../../assets/less/app/shop/index.less';
.findPage {
  .nav_bar {
    background-color: white;
    .nav_title {
      display: block;
      height: 46px;
      color: #3b3b3b;
      font-size: 17px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .title_column {
    margin: 0;
    background: white;
    padding: 3.5%;
    span {
      display: block;
      border-left: 4px solid #1776ff;
      padding-left: 5px;
      line-height: 1em;
    }
  }
}
</style>