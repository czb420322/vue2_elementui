<template>
  <div class="study_page studyPersonal_page">
    <div class="header_box">
      <div class="userInfo" :style="{ 'padding-top': ($iosSystem + 20) + 'px' }">
        <van-icon name="arrow-left" size="20px" @click="onClickLeft" :style="{ 'top': ($iosSystem + 13) + 'px' }" />
        <img v-if="userInfo.agentProfile" class="photo" :src="userInfo.agentProfile">
        <img v-else class="photo" :src="$CTXBASE + '/img/page/gr_head.png'" alt="">
        <p class="name">{{userInfo.name || userInfo.mobileStar}}</p>
      </div>
      <div class="nav_bar">
        <van-tabs v-model="active" @click="onReset" line-width="2.2rem" color="#1989fa" class="van-hairline--top">
          <van-tab v-for="(item, index) in tabs" :title="item.text" :key="index"></van-tab>
        </van-tabs>
        <i v-if="loading" class="_Overlay"></i>
      </div>
    </div>

    <ul class="articleList" :style="{ 'margin-top': ($iosSystem + 172) + 'px' }">
      <li class="list">
        <van-list ref="list" v-model="loading" :finished="finished" :finished-text="list.length ? '没有更多了~' : ''" @load="getStudyOperateArticleListUser">
          <div v-for="(item, index) in list" :key="index" @click="goPage('knowledgeDetails?id='+item.articleId +'&type='+item.type)">
            <vCard v-if="item.type== '1'" :item="item"></vCard>
            <div class="video_item" v-else>
              <div class="name">{{item.title}}</div>
              <img class="photo" v-if="item.coverImgUrl" :src="item.coverImgUrl" alt="">
              <van-icon class="icon" :name="$CTXBASE + '/img/page/study/ic_vedio@2x.png'" size="22" />
              <div class="txt">
                <span>{{item.readNum}}次学习</span>
                <span span="12">{{item.modifiedDate}}</span>
              </div>
            </div>
          </div>
        </van-list>
        <van-empty v-if="this.finished && !list.length" :image="$CTXBASE + '/img/page/study/bg_no_info@2x.png'" description="暂无内容，敬请期待" image-size="110" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import recommendPage from './recommendPage.vue'
import studyPage from './studyPage.vue'
import videoPage from './videoPage.vue'
import vCard from './vCard.vue'
export default {
  components: {
    recommendPage,
    studyPage,
    videoPage,
    vCard
  },
  computed: {
    ...mapState({
      userInfo: state => state.my.UserInfo,
      tabs: state => state.study.personal.tabs,
    }),
    active: {
      get() {
        return this.$store.state.study.personal.active
      },
      set(value) {
        this.$store.commit('study/updateState', [
          { name: ['personal', 'active'], value: value }
        ])
      }
    },
    loading: {
      get() {
        return this.$store.state.study.loading
      },
      set(value) {
        this.$store.commit('study/updateState', [
          { name: ['loading'], value: value }
        ])
      }
    }
  },
  data() {
    return {
      finished: false,
      currentPage: 1,  // 当前页
      pageSize: 20,  // 每页数量
      list: []
    }
  },
  created() {
    this.$store.dispatch('my/getUserInfo');
  },
  methods: {
    async getStudyOperateArticleListUser() {
      const res = await this.$axios({
        url: this.$API.API_GETSTUDYOPERATEARTICLELISTUSER,
        method: "post",
        loading: 'false',
        data: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          operateType: this.tabs[this.active].value
        }
      });
      this.currentPage++
      this.loading = false
      if (res.code == 0 && res.content.result == 0) {
        this.list = this.list.concat(res.content.data.articleInfoPageGrid.data || [])
        if (res.content.data.articleInfoPageGrid.page >= res.content.data.articleInfoPageGrid.total) {
          this.finished = true  // 数据全部加载完成
        }
      } else {
        this.$toast(res.content.resultMessage || '请求失败');
      }
    },
    onReset() {
      this.currentPage = 1
      this.finished = false
      this.list = []
      setTimeout(() => {
        this.$refs.list.check();
      }, 100);
    }
  }
};
</script>

<style lang="less">
@import '../../assets/less/app/study/index.less';
</style>