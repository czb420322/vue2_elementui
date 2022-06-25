<template>
  <div class="setUpPage" :style="{ 'margin-top': ($iosSystem + 58) + 'px' }">
    <v-header class="bar bar-nav" :title="{ name: title }"></v-header>
    <div>
      <van-cell-group style="margin-bottom: 12px;">
        <van-cell title="微店名称" is-link :value="shopInfo.msName" to="/shop/edit?type=1" />
        <van-cell title="微店详情" is-link to="/shop/edit?type=2" />
        <van-cell title="微店产品库" is-link to="/shop/edit?type=3" />
      </van-cell-group>
      <van-cell-group style="margin-bottom: 12px;">
        <van-cell title="产品分类设置" is-link to="/shop/edit?type=4" />
        <van-cell title="产品设置" is-link to="/shop/edit?type=5" />
        <van-cell title="业务来源" is-link to="/businessSet" v-if="userInfo.agentType == '1' || userInfo.agentType == '0'" />
      </van-cell-group>
      <!-- <van-cell-group style="margin-bottom: 12px;">
        <van-cell title="资讯设置" is-link to="/shop/edit?type=6" />
      </van-cell-group> -->
      <van-cell-group style="margin-bottom: 12px;">
        <van-cell title="微店开关" is-link to="/shop/edit?type=7" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      shopInfo: state => state.shop.shopInfo,
      userInfo: state => state.my.UserInfo
    })
  },
  data() {
    return {
      title: this.$route.meta.title
    }
  },
  created() {
    this.$store.dispatch('shop/getShopInfo')
  }
}
</script>