<template>
  <div class="study_page">
    <header :style="{ 'padding-top': $iosSystem + 'px' }">
      <van-icon name="arrow-left" size="20" @click="onClickLeft" />
      <van-tabs v-model="active" :ellipsis="false" color="#1989fa" line-width="15px" v-show="tree.length">
        <van-tab v-for="(item, index) in tree" :key="index" :title="item.name"></van-tab>
      </van-tabs>
      <van-icon :name="$CTXBASE + '/img/page/study/my_icon.png'" size="28" @click="goPage('studyPersonal')" />
      <i v-if="loading" class="_Overlay"></i>
    </header>
    <div v-if="tree.length" :style="{ 'padding-top': ($iosSystem + 45) + 'px' }">
      <recommendPage v-if="tree[active].sort == 1"></recommendPage>
      <studyPage v-else-if="tree[active].sort == 2"></studyPage>
      <videoPage v-else-if="tree[active].sort == 3"></videoPage>
      <van-empty v-else :image="$CTXBASE + '/img/page/study/bg_no_info@2x.png'" description="还未上线，敬请期待" image-size="110" />
    </div>
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
      tree: state => state.study.tree
    }),
    active: {
      get() {
        return this.$store.state.study.active
      },
      set(value) {
        this.$store.commit('study/updateState', [
          { name: ['active'], value: value },
          { name: ['twoActive'], value: 0 },
          { name: ['pagination', 'currentPage'], value: 1 },
          { name: ['pagination', 'pageSize'], value: this.tree[value].sort == 1 ? 5 : 20 },
          { name: ['pagination', 'list'], value: [] }
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
  async created() {
    await this.$store.dispatch('study/getStudyColumnList', {})
  }
};
</script>

<style lang="less">
@import '../../assets/less/app/study/index.less';
</style>