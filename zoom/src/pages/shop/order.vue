<template>
  <div>
    <v-header :title="{ name: '我的订单' }"></v-header>
    <div class="orderListPage afe-area-inset-bottom shopOrderPage" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
      <van-sticky :offset-top="($iosSystem + 45)">
        <div class="tabs-box">
          <van-tabs v-model="active" background="#0252FF" class="white" title-active-color="white" :border="false" title-inactive-color="#B2C9FA" @click="onClick">
            <van-tab v-for="(item,index) in tabs" :key="index" :title="item.text"></van-tab>
          </van-tabs>
        </div>
      </van-sticky>
      <van-list ref="list" v-model="pagination.loading" :finished="pagination.finished" :finished-text="pagination.list.length ? '没有更多了~' : ''" @load="queryOrderList">
        <ol class="list-box">
          <li class="list" v-for="(item,index) in pagination.list" :key="index" @click="goPage('shop/orderDetail?orderNo=' + item.orderNo)">
            <van-panel :title="item.productName" :status="tabs[active].text">
              <van-card :desc="item.productDesc" :title="'投保人：'+item.appntName" :thumb="item.productImageUrl">
                <template #desc>
                  <div v-html="item.productDesc"></div>
                  <div>保障起期：{{item.startDate}}</div>
                  <div>保障止期：{{item.endDate}}</div>
                </template>
              </van-card>
              <template #footer>
                <div class="footer_bar">
                  <p class="price_bar">应付金额：<span class="price">￥{{item.orderAmount}}</span>&nbsp;元</p>
                  <div class="btn">
                    <van-button size="small" round @click.stop="deleteOrder(item.orderNo,index)" v-if="active == 0">删 除</van-button>
                  </div>
                </div>
              </template>
            </van-panel>
          </li>
        </ol>
      </van-list>
    </div>
    <my-empty description="查询无数据" v-if="this.pagination.finished && !pagination.list.length"></my-empty>
  </div>
</template>

<script>
import selectPicker from "../../templates/selectPicker.vue"
import { mapState } from 'vuex'
export default {
  components: {
    selectPicker,
  },
  computed: {
    ...mapState({
      wxUserInfo: state => state.common.wxUserInfo,
      msId: state => state.shop.msId
    }),
    active: {
      get() {
        return this.$store.state.shop.order.active
      },
      set(value) {
        this.$store.commit('shop/updateState', [{ name: ['order', 'active'], value }])
      }
    }
  },
  data() {
    return {
      tabs: [
        { text: '待付款', value: '01' },
        { text: '已承保', value: '08' },
        { text: '已关闭', value: '05' },
      ],
      pagination: {
        list: [],  // 列表
        currentPage: 1,  // 当前页
        pageSize: 20,  // 每页数量
        loading: false,
        finished: false,
      }
    }
  },
  methods: {
    onClick() {
      Object.assign(this.$data.pagination, this.$options.data().pagination)
      setTimeout(() => {
        this.$refs.list.check();
      }, 100);
    },
    async queryOrderList() {
      const res = await this.$axios({
        url: this.$API.API_GETORDERLISTBYOPENID,
        method: "post",
        loading: 'false',
        data: {
          status: this.tabs[this.active].value,
          currentPage: this.pagination.currentPage,
          pageSize: this.pagination.pageSize,
          openId: this.wxUserInfo.openid,
          msId: this.msId
        }
      });
      if (res.code === 0 && res.content.result == "0") {
        this.pagination.currentPage++
        this.pagination.loading = false;
        this.pagination.list = this.pagination.list.concat(res.content.date.orderListPageGrid.data || [])
        // 数据全部加载完成
        if (res.content.date.orderListPageGrid.data == null || res.content.date.orderListPageGrid.data.length < this.pagination.pageSize) {
          this.pagination.finished = true;
        }
      } else {
        this.pagination.loading = false
        this.pagination.finished = true;
        this.$toast(res.content.resultMessage || '获取失败！');
      }
    },
    async deleteOrder(orderNo, index) {
      this.$dialog.confirm({
        title: "提示",
        message: '是否确定删除？',
      }).then(async () => {
        // on confirm
        const res = await this.$axios({
          url: this.$API.API_ORDER_DELETEORDER,
          method: "get",
          params: {
            orderNo: orderNo,
            loginAgentCode: this.wxUserInfo.openid,
          },
        });
        if (res.code === 0 && res.content.result == "0") {
          this.list.splice(index, 1);
          this.$toast(res.content.resultMessage);
        } else {
          this.$toast("删除失败");
        }
      }).catch(() => {
        // on cancel
      })
    }
  }
};
</script>

<style lang="less">
@import './../../assets/less/app/life/order/orderList.less';
.orderListPage {
  .carbox {
    display: flex;
    justify-content: space-around;
    .carbox_git {
      text-align: center;
      font-size: 14px;
      flex: 1;
      img {
        width: 30px;
      }
    }
  }

  .wx_box {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    align-items: center;
    padding: 2px 16px;
    .wx_box_left {
      display: flex;
      align-items: center;
      .wx_head {
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
}
.orderList_van_nav_bar {
  background-color: #0252ff;
  .van-nav-bar__left {
    .van-icon {
      color: #fff;
    }
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .van-nav-bar__right {
    .right_Select_box {
      .right_Select_box_name {
        margin-right: 6px;
        color: #fff;
      }
    }
  }
}
.fwb {
  font-weight: bolder;
}
.blue {
  color: #0252ff;
}
.red {
  color: red;
}
.grey {
  color: #a5a5a5;
}
.auto_box {
  margin: 12px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  .flexbox {
    display: flex;
    justify-content: space-between;
    padding: 4px 16px;
    .flexbox_bt_name {
      width: 80px;
      border-radius: 8px;
    }
    .money_symbol {
      font-size: 12px;
    }
  }
  .van-divider {
    margin: 10px 0;
  }
  .order-tips {
    font-size: 12px;
    color: #aabee7;
    padding: 0 10px 16px 10px;
  }
  .van-button--small {
    font-size: 14px;
  }
  .gr-orange {
    color: #ff7938;
  }
  .flexbox_bt {
    margin-top: 12px;
  }
  .grcard-content {
    font-size: 14px;
    padding: 12px;
  }
}
.orderListPage {
  .van-tab {
    padding: 0;
    min-width: 23%;
  }
  .navigation_abs {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    right: 0;
    justify-content: space-between;
    background-color: #0252ff;
    height: 46px;
    align-items: center;
    z-index: 1;
    padding: 0 16px;
    .abs_div {
      flex: 1;
      font-size: 16px;
      margin: 0 50px;
      border-radius: 15px;
      background: #fff;
      height: 30px;
      .abs_grid {
        display: flex;
        text-align: center;
        margin: 2px;
        height: 26px;
        color: #fff;
        a {
          flex: 1;
          border-radius: 15px;
        }
        .pitch {
          background: #0252ff;
          color: #fff;
        }
      }
    }
  }
}
.shopOrderPage .list-box .list {
  overflow: hidden;
}
</style>
