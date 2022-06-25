<template>
  <div class="items">
    <p class="items-top">
      <b>{{ dataList.agentName }}</b>&nbsp;&nbsp;&nbsp;最近一单：¥{{ dataList.newestOrderPremium }}&nbsp;
      {{ dataList.newestOrderDate }}
    </p>
    <div class="items-cnt">
      <p class="items-bottom">
        累计保费：¥{{ dataList.premium }} ｜累计出单数：{{dataList.orderQuantity}}
        <br />累计提成：{{ dataList.commissionRate }} | 人员身份：{{ dataList.agentType == '2' ? '代理人' : dataList.agentType == '3' ? '会员' : dataList.agentType == '4' ? '用户' : ''}}
      </p>
      <van-icon size="18px" v-if="UserInfo.manageCode == '19000000'" @click="getNewDetail(dataList.agentCode)" :class="check ? 'rotate' : ''" name="arrow" />
    </div>
    <transition name="fade">
      <div v-show="check">
        <div v-for="(item, index) in list" :key="index*1000">
          <div class="van-hairline--top"></div>
          <div style="overflow: hidden">
            <p class="items-top">
              <b>{{ item.agentName }}</b>&nbsp;&nbsp;&nbsp;最近一单：¥{{ item.newestOrderPremium }}&nbsp;
              {{ item.newestOrderDate }}
            </p>
            <div class="items-cnt">
              <p class="items-bottom">
                累计保费：¥{{ item.premium }} ｜累计出单数：{{item.orderQuantity}}
                <br />累计提成：{{ item.commissionRate }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: "achievementItem",
  props: {
    dataList: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState({
      UserInfo: state => state.my.UserInfo,
    })
  },
  data() {
    return {
      check: false,
      list: []
    }
  },
  created() {
    console.log('dataList', this.dataList);
  },
  methods: {
    //团队用户详单
    async getNewDetail(agentCode) {
      if (this.check) {
        this.check = false
        return
      }
      const res = await this.$axios({
        url: this.$API.API_MY_TEAM_DETAIL,
        method: "post",
        data: {
          statisticsDate: '1',
          agentLevel: '2',
          agentCode
        }
      });
      if (res.code === 0 && res.content.result == '0') {
        this.check = true
        this.list = res.content.data.data || []
      } else {
        this.$toast(res.content.resultMessage || '请求失败');
      }
    },
  }
};
</script>
<style scoped lang='less'>
.items {
  background: #fff;
  width: 92%;
  margin-left: 4%;
  margin-top: 0.625rem;
  border-radius: 0.75rem;
  padding: 0.2rem 0.87rem;
  font-weight: 400;
  &-top {
    font-size: 0.625rem;

    color: #999999;
    b {
      font-size: 0.97rem;
      font-weight: 400;
      color: #333333;
    }
  }
  &-cnt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
  }
  &-bottom {
    font-size: 0.75rem;
    color: #333333;
    font-weight: 400;
    margin: 0;
  }
  .van-icon-arrow {
    transform: rotate(0deg);
    transition: transform 0.3s linear;
  }
  .rotate {
    transform: rotate(90deg);
    transition: transform 0.3s linear;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>