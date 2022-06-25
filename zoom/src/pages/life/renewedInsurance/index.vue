<template>
  <div class="renewedInsurancePage">
    <van-nav-bar :title="title" :border="false" :fixed="true">
      <template #left>
        <van-icon name="arrow-left" color="#fff" size="20" @click="onClickLeft" />
      </template>
      <template #right>
        <a href="javascript:void(0)" class="btn" @click="showConditionPopup">
          <van-icon name="filter-o" color="#fff" size="20" />筛选
        </a>
      </template>
    </van-nav-bar>
    <i class="navBg" :style="{ 'height': ($iosSystem + 122) + 'px' }"></i>
    <div class="tabs_bar" :style="{ 'top': ($iosSystem + 45) + 'px' }" >
      <van-tabs v-model="tabActive" :before-change="beforeChange" color="white" background="#0252ff" title-active-color="white" title-inactive-color="rgba(255,255,255,.5)" line-width="2em">
        <van-tab title="车险"></van-tab>
        <van-tab title="非车险"></van-tab>
      </van-tabs>
    </div>
    <div :style="{ 'margin-top': ($iosSystem + 100) + 'px' }">
      <car ref="car" v-if="tabActive == 0" />
      <noCar ref="noCar" v-else />
    </div>
  </div>
</template>

<script>
import car from './car/index.vue'
import noCar from './noCar/index.vue'
import { mapState } from 'vuex'

export default {
  components: {
    car,
    noCar
  },
  computed: {
    tabActive: {
      get() {
        return this.$store.state.renewedInsurance.tabActive
      },
      set(value) {
        this.$store.commit('renewedInsurance/updateState', [{ name: ['tabActive'], value: value }])
      }
    }
  },
  data() {
    return {
      title: this.$route.meta.title
    }
  },
  created() {
  },
  methods: {
    showConditionPopup() {
      if (this.tabActive == 0) {
        this.$refs.car.showConditionPopup()
      } else {
        this.$refs.noCar.showConditionPopup()
      }
    },
    beforeChange(index){
      if(this.tabActive == index ){
        return false
      }
      this.$store.commit('renewedInsurance/resetState')
      return true
    }
  }
}
</script>
<style lang="less">
@import '../../../assets/less/app/life/renewedInsurance/index.less';
</style>
<style lang="less">
.renewedInsurancePage {
  .tabs_bar {
    position: fixed;
    z-index: 1;
    width: 100%;
  }
  .list-box .list {
    display: flex;
    margin: 12px 12px 0 12px;
    .name {
      margin: 0 0.4rem;
    }
    .info-box {
      padding: 0 0.55rem 0.55rem 0;
    }
  }
  .van-tabs--line .van-tabs__wrap {
    height: 54px;
    padding-bottom: 10px;
}
}
</style>