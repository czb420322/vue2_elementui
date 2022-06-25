<template>
  <div class="study_page">
    <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in banner" :key="index">
          <div v-if="!item.pathUrl">
            <img :src="item.imgUrl" />
          </div>
          <a :href="item.pathUrl" v-else-if="item.pathUrl.substr(0,4) == 'http'">
            <img :src="item.imgUrl" />
          </a>
          <div @click="goPage(item.pathUrl)" v-else>
            <img :src="item.imgUrl" />
          </div>
        </van-swipe-item>
      </van-swipe>
      <ul class="articleList">
        <li class="list" v-for="(articleList, index) in tree[active].children" :key="index">
          <h3 class="itemTitel" v-show="articleList.children && articleList.children.length">{{articleList.name}}</h3>
          <div v-for="(item, index) in articleList.children" :key="index" @click="goPage('knowledgeDetails?id='+item.articleId +'&type='+item.type)">
            <vCard v-if="item.type== '1'" :item="item"></vCard>
            <div class="video_item" v-else >
              <div class="name">{{item.title}}</div>
              <img class="photo" v-if="item.coverImgUrl" :src="item.coverImgUrl" alt="">
              <van-icon class="icon" :name="$CTXBASE + '/img/page/study/ic_vedio@2x.png'" size="22" />
              <div class="txt">
                <span>{{item.readNum}}次学习</span>
                <span span="12">{{item.modifiedDate}}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <br>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import vCard from './vCard.vue'
export default {
  components: {
    vCard
  },
  computed: {
    ...mapState({
      tree: state => state.study.tree,
      active: state => state.study.active,
      twoActive: state => state.study.twoActive,
      banner: state => state.study.banner,
      pagination: state => state.study.pagination,
    })
  },
  data() {
    return {
    }
  },

  created() {
    this.$store.dispatch('study/getStudyBannerList')

    this.tree[this.active].children.forEach((item, index) => {
      this.getStudyArticleList(item.id, index, item.children && item.children.length)
    });
  },

  methods: {
    async getStudyArticleList(recId, index, loading) {
      const res = await this.$axios({
        url: this.$API.API_GETSTUDYARTICLELIST,
        method: "post",
        loading: loading ? 'false' : 'true',
        data: {
          currentPage: this.pagination.currentPage,
          pageSize: this.pagination.pageSize,
          isRec: "1",
          recId,
          status: "1",
          orderType: "1"
        }
      });
      if (res.code == 0 && res.content.result == 0) {
        this.$store.commit('study/updateState', [
          { name: ['tree', this.active, 'children', index, 'children'], value: res.content.data.articleInfoPageGrid.data || [] }
        ])
      } else {
        this.$toast(res.content.resultMessage || '请求失败');
      }
    }
  }
}
</script>