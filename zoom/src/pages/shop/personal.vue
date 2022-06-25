<template>
  <div class="layoutPage shopPersonalPage">
    <div class="header" :style="{ 'padding-top': $iosSystem + 20 + 'px' }">
      <img class="photo" v-if="wxUserInfo.headimgurl" :src="wxUserInfo.headimgurl" alt="">
      <img class="photo" v-else :src="$CTXBASE + '/img/page/shop/userhead@2x.png'" alt="">
      &nbsp;&nbsp;{{wxUserInfo.nickname}}
    </div>
    <div class="layoutContent">
      <div class="border_box">
        <van-row class="order_bar">
          <van-col span="24" class="order_title" @click="goOrder(0)">我的订单
            <van-icon name="arrow" />
          </van-col>
          <van-col span="8" class="order_col" @click="goOrder(0)">
            <p class="number">{{order.waitPay}}</p>
            <van-icon :name="$CTXBASE + '/img/page/shop/1@2x.png'" />
            &nbsp;&nbsp;待付款
          </van-col>
          <van-col span="8" class="order_col" @click="goOrder(1)">
            <p class="number">{{order.acceptInsure}}</p>
            <van-icon :name="$CTXBASE + '/img/page/shop/3@2x.png'" />
            &nbsp;&nbsp;已承保
          </van-col>
          <van-col span="8" class="order_col" @click="goOrder(2)">
            <p class="number">{{order.expiryClose}}</p>
            <van-icon :name="$CTXBASE + '/img/page/shop/2@2x.png'" />
            &nbsp;&nbsp;已关闭
          </van-col>
        </van-row>
      </div>
    </div>

    <v-footer :active="2"></v-footer>
  </div>
</template>

<script>
import vFooter from './footer.vue'
import { mapState } from 'vuex'
export default {
  components: {
    vFooter
  },
  data() {
    return {
      title: this.$route.meta.title
    }
  },
  computed: {
    ...mapState({
      wxUserInfo: state => state.common.wxUserInfo,
      order: state => state.shop.order,
      msId: state => state.shop.msId
    })
  },
  created() {
    this.getorderTotal()
  },
  methods: {
    async getorderTotal() {
      const res = await this.$axios({
        url: this.$API.API_SELECTORDERSTATUSTOTALFORMIRCOSHOP,
        method: "post",
        loading: 'false',
        data: {
          openId: this.wxUserInfo.openid,
          msId: this.msId
        }
      });
      if (res.content) {
        this.$store.commit('shop/updateState', [
          { name: ['order', 'waitPay'], value: res.content.waitPay || 0 },
          { name: ['order', 'acceptInsure'], value: res.content.acceptInsure || 0 },
          { name: ['order', 'expiryClose'], value: res.content.expiryClose || 0 }
        ])
      }
    },
    goOrder(value) {
      this.$store.commit('shop/updateState', [{ name: ['order', 'active'], value }])
      this.goPage('shop/order')
    }
  }
};
</script>

<style lang="less">
@import '../../assets/less/app/shop/index.less';
.shopPersonalPage {
  .header {
    display: flex;
    align-items: center;
    font-size: 0.86rem;
    padding: 3.5%;
    background: white;
    .photo {
      display: block;
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 50%;
    }
  }
}
.border_box {
  overflow: hidden;
  background: white;
  .order_bar {
    color: white;
    background-color: #1776ff; /* 不支持线性的时候显示 */
    background-image: linear-gradient(to right, #1776ff, #6ba7fd);
    border-radius: 8px;
    margin: 3.5%;
    padding-bottom: 1rem;
    .order_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 92%;
      margin: 0 4%;
      padding: 10px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      font-size: 0.8rem;
    }
    .order_col {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      font-size: 0.71rem;
      .number {
        text-align: center;
        margin: 0.6rem 0 0.4rem;
        width: 100%;
        font-size: 0.85rem;
      }
    }
  }
}
</style>