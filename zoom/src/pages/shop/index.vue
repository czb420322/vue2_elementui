<template>
  <div class="layoutPage shopPage">
    <template v-if="!shopCloseMessage">
      <van-nav-bar :border="false">
        <template #left>
          <div class="nav_bar_left" @click="showShopInfo">
            <van-icon :name="$CTXBASE + '/img/page/shop/ic_top_store_w@2x.png'" size="18" />&nbsp;
            <span style="color: white">{{shopInfo.msName}}</span>
            <van-icon name="arrow" size="16" color="white" />
          </div>
        </template>
      </van-nav-bar>
      <i class="round_bg"></i>

      <van-swipe class="banner" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in banner" :key="index">
          <img :src="item.imageUrl" />
        </van-swipe-item>
      </van-swipe>

      <template v-if="productTypeList && productTypeList.length">
        <van-tabs v-model="active" :ellipsis="false" color="#1989fa" line-width="15px" class="van-hairline--bottom">
          <template v-for="(item, index) in productTypeList">
            <van-tab :key="index" :title="item.typeName"></van-tab>
          </template>
        </van-tabs>
      </template>

      <div class="layoutContent">
        <template v-if="productTypeList.length && productList.length">
          <div class="product_list" v-for="(item,index) in productList" :key="index" @click="goProductDetail(item)">
            <van-card :title="item.productName" :thumb="item.productImageUrl">
              <template #title>
                <div class="van-card__title">
                  {{item.productName}}
                  <img class="van-card__title_icon" v-if="item.activityImgUrl" :src="$CTXBASE + item.activityImgUrl" alt="">
                </div>
              </template>
              <template #desc>
                <div class="tag" v-if="item.productTag">
                  <van-tag color="#38C1E8" v-for="(tag, i) in item.productTag" :key="i" plain>{{tag}}</van-tag>
                </div>
                <div class="desc-box" v-html="item.productDesc"></div>
                <div class="list-content ">
                  <p class="price">￥<span>{{item.productPrice}}</span>元起</p>
                </div>
              </template>
            </van-card>
          </div>
          <br>
        </template>
        <van-empty v-else :image="$CTXBASE + '/img/page/study/bg_no_info@2x.png'" description="暂无内容，敬请期待" image-size="110" />
      </div>

      <v-footer :active="0"></v-footer>
    </template>

    <template v-else>
      <br>
      <van-empty :image="$CTXBASE + '/img/page/study/bg_no_info@2x.png'" :description="shopCloseMessage" image-size="110" />
    </template>

    <shopInfo ref="shopInfo"></shopInfo>
  </div>
</template>

<script>
import vFooter from './footer.vue'
import shopInfo from './shopInfo.vue'
import configJs from '../../config.js'
import { mapState } from 'vuex'

export default {
  components: {
    vFooter,
    shopInfo
  },
  computed: {
    ...mapState({
      manageVersion: state => state.common.manageVersion,
      msId: state => state.shop.msId,
      shopCloseMessage: state => state.shop.shopCloseMessage,
      shopInfo: state => state.shop.shopInfo,
      banner: state => state.shop.banner,
      preview: state => state.shop.preview
    }),
    productTypeList() {
      if (this.shopInfo && this.shopInfo.productTypeList) {
        return this.shopInfo.productTypeList.filter(item => {
          return item.isOpen == '1'
        })
      }
      return []
    },
    productList() {
      if (this.shopInfo && this.shopInfo.productTypeList && this.productTypeList[this.active].productDTOList) {
        return this.productTypeList[this.active].productDTOList.filter(item => {
          return item.isOpen == '1'
        })
      }
      return []
    }
  },
  data() {
    return {
      title: this.$route.meta.title,
      active: 0,
    }
  },
  created() {
    if (this.$route.query.preview) {
      this.$store.commit('shop/updateState', [{ name: ['preview'], value: this.$route.query.preview == 'true' ? true : false }])
    }
    if (this.$route.query.msId) {
      this.$store.commit('shop/updateState', [{ name: ['msId'], value: this.$route.query.msId }])
    }
    this.$store.dispatch('shop/getShopInfoMsId', { msId: this.msId })
  },
  methods: {
    goProductDetail(item) {
      if (!this.preview) {
        let local = `${configJs.config.http_base + configJs.config.ctx_base}/#/showProductDetail?saleCode=${item.productCode}&phone=${this.shopInfo.ownerMobile}&agentCode=${this.shopInfo.agentCode}&agentId=${this.shopInfo.agentId}&activityId=${item.productId}&channelType=mircoshop`
        window.location.href = this.$WxUrlAuthorize(local)
      } else {
        this.$toast('预览不能下单！');
      }
    },
    showShopInfo() {
      this.$refs.shopInfo.parentMsg()
    }
  }
};
</script>

<style lang="less">
@import '../../assets/less/app/shop/index.less';
</style>