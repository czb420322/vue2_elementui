<template>
  <div class="layoutPage shopPage myShopPage">
    <van-nav-bar :title="title" left-arrow :border="false" :fixed="false">
      <template #left>
        <van-icon name="arrow-left" color='white' size="20" @click="onClickLeft" />
      </template>
      <template #right>
        <van-icon v-if="shopInfo.msId" name="share-o" color='white' size="20" @click="goShare" />
      </template>
    </van-nav-bar>

    <van-swipe class="banner" :autoplay="3000" indicator-color="white" style="margin: 3%">
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
        <div class="product_list" v-for="(item,index) in productList" :key="index">
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

    <van-tabbar :fixed='false' active-color="#333" inactive-color="#333">
      <van-tabbar-item v-if="shopInfo.msId" :to="`/shop?msId=${shopInfo.msId}&preview=true`">
        <span>预览</span>
        <template #icon="">
          <img :src="$CTXBASE + '/img/page/shop/ic_menu_search_s@2x.png'" style="height: 25px" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/shop/setUp">
        <span>微店设置</span>
        <template #icon="">
          <img :src="$CTXBASE + '/img/page/shop/ic_menu_set_s@2x.png'" style="height: 25px" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import vFooter from './footer.vue'
import configJs from './../../config.js'
import app from '../../assets/js/util/app'
import { mapState } from 'vuex'
export default {
  components: {
    vFooter
  },
  computed: {
    ...mapState({
      userInfo: state => state.my.UserInfo,
      shopInfo: state => state.shop.shopInfo,
      banner: state => state.shop.banner,
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
      active: 0
    }
  },
  created() {
    this.$store.dispatch('shop/getShopInfo')
  },
  methods: {
    // 分享
    goShare() {
      let local = `${configJs.config.http_base}/rbt-h5-gzh/#/shop?msId=${this.shopInfo.msId}&preview=false`;
      app.goShare({
        shareTitle: `${this.shopInfo.ownerName}的微店`,
        shareText: '高保障，低保费，超高性价比保险产品都在微店里，赶紧来看看把！',
        shareImgUrl: configJs.config.http_base + configJs.config.ctx_base + '/img/page/base/feiXiangioc.png',
        shareUrl: this.$WxUrlAuthorize(local)
      });
    },
  }
};
</script>

<style lang="less">
@import '../../assets/less/app/shop/index.less';
.myShopPage .van-nav-bar__title {
  color: white;
}
</style>