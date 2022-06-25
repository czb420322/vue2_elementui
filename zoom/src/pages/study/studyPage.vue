<template>
  <div class="study_page">
    <nav style="margin-top: 10px;" class="van-hairline--bottom">
      <van-tabs v-if="tree[active].children && tree[active].children.length" v-model="twoActive" :ellipsis="false" line-width="0" @click="onReset">
        <van-tab v-for="(item, index) in tree[active].children" :key="index" :title="item.name"></van-tab>
      </van-tabs>
      <div v-else class="van-tabs" style="height: 44px"></div>
      <i v-if="loading" class="_Overlay"></i>

      <div class="sort">
        <span class=" van-hairline--left">
          <van-popover v-model="showPopover" theme="dark" trigger="click" placement="bottom-end" :actions="sortType.list" @select="onSelect">
            <template #reference>
              {{sortType.value.text}}
              <van-icon :name="$CTXBASE + '/img/page/study/ic_down@2x.png'" size="7" />
            </template>
          </van-popover>
        </span>
      </div>
    </nav>

    <div>
      <van-list ref="list" v-model="loading" :finished="finished" :finished-text="pagination.list.length ? '没有更多了~' : ''" @load="getStudyArticleList">
        <ul style="background: white;">
          <li v-for="(item, index) in pagination.list" :key="index" @click="goPage('knowledgeDetails?id='+item.articleId +'&type='+item.type)" >
            <vCard v-if="item" :item="item"></vCard>
          </li>
        </ul>
      </van-list>
      <van-empty v-if="this.finished && !pagination.list.length" :image="$CTXBASE + '/img/page/study/bg_no_info@2x.png'" :description="tree[active].children[twoActive].name != '每日打卡' ? '暂无内容，敬请期待' : '还未上线，敬请期待'" image-size="110" />
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
      sortType: state => state.study.sortType,
      pagination: state => state.study.pagination,
    }),
    loading: {
      get() {
        return this.$store.state.study.loading
      },
      set(value) {
        this.$store.commit('study/updateState', [
          { name: ['loading'], value: value }
        ])
      }
    },
    twoActive: {
      get() {
        return this.$store.state.study.twoActive
      },
      set(value) {
        this.$store.commit('study/updateState', [{ name: ['twoActive'], value: value }])
      }
    },
    currentPage: {
      get() {
        return this.$store.state.study.pagination.currentPage
      },
      set(value) {
        this.$store.commit('study/updateState', [{ name: ['pagination', 'currentPage'], value: value }])
      }
    }
  },
  data() {
    return {
      showPopover: false,
      finished: false,
    }
  },
  created() {
  },
  methods: {
    async getStudyArticleList() {
      const res = await this.$axios({
        url: this.$API.API_GETSTUDYARTICLELIST,
        method: "post",
        loading: "false",
        data: {
          currentPage: this.currentPage,
          pageSize: this.pagination.pageSize,
          status: "1",
          orderType: this.sortType.value.value,
          columnId1: this.tree[this.active].id,
          columnId2: this.tree[this.active].children && this.tree[this.active].children.length ? this.tree[this.active].children[this.twoActive].id : '',
          type: 1
        }
      });
      this.currentPage++
      this.loading = false
      if (res.code == 0 && res.content.result == 0) {
        let arr = this.pagination.list.concat(res.content.data.articleInfoPageGrid.data || [])
        this.$store.commit('study/updateState', [
          { name: ['pagination', 'list'], value: arr }
        ])
        if (res.content.data.articleInfoPageGrid.page >= res.content.data.articleInfoPageGrid.total) {
          this.finished = true  // 数据全部加载完成
        }
      } else {
        this.$toast(res.content.resultMessage || '请求失败');
      }
    },
    onSelect(action) {
      this.$store.commit('study/updateState', [
        { name: ['sortType', 'value'], value: action },
      ])
      this.onReset()
    },
    onReset() {
      console.log('onReset');
      this.currentPage = 1
      this.finished = false
      this.$store.commit('study/updateState', [
        { name: ['pagination', 'list'], value: [] }
      ])
      setTimeout(() => {
        this.$refs.list.check();
      }, 100);
    }
  }
};
</script>