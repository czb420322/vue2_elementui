<template>
  <div class="teamContainer">
    <div class="teamContainer-item" v-for="(item, index) in dataList" :key="index">
      <div class="teamContainer-item-top">
        {{ item.agentName }}&nbsp;&nbsp;&nbsp;
        {{ item.agentMobile }} &nbsp;&nbsp;&nbsp;<van-tag color="#D1E8FC" text-color="#3989EC" size="large">{{ filterType(item.agentType) }}</van-tag>
      </div>
      <div class="teamContainer-cnt">
        <div class="teamContainer-item-bottom">
          <span class="teamContainer-item-bottom-span">活跃状态 :
            <b :class="[ item.active == '高' ? 'gao'  : item.active == '中' ? 'zhong'  : 'di',]">{{ item.active }}</b>
            &nbsp;| &nbsp;出单提成: &nbsp;<b class="commissionRate">{{item.commissionRate}}</b></span><br />
          <span class="teamContainer-item-bottom-greyDate">
            入团时间:&nbsp;&nbsp;{{item.createdDate}}
          </span>
        </div>
        <van-icon size="18px" v-if="UserInfo.manageCode == '19000000'" @click="getNewDetail(item, index)" :class="item.check ? 'rotate' : ''" name="arrow" />
      </div>
      <transition name="fade">
        <div v-show="item.check" :style="{'margin-top': (item.check && item.list && item.list.length ? '1rem':'0')}">
          <div v-for="(element, index) in item.list" :key="index*1000">
            <div class="teamContainer-item van-hairline--top" style="margin: 0;padding: 1rem 0;">
              <div class="teamContainer-item-top">
                {{ element.agentName }}&nbsp;&nbsp;&nbsp;
                {{ element.agentMobile }} &nbsp;&nbsp;&nbsp;<van-tag color="#D1E8FC" text-color="#3989EC" size="large">{{ filterType(element.agentType) }}</van-tag>
              </div>
              <div class="teamContainer-cnt">
                <div class="teamContainer-item-bottom">
                  <span class="teamContainer-item-bottom-span">活跃状态 :
                    <b :class="[ element.active == '高' ? 'gao'  : element.active == '中' ? 'zhong'  : 'di',]">{{ element.active }}</b>
                    &nbsp;| &nbsp;出单提成: &nbsp;<b class="commissionRate">{{element.commissionRate}}</b></span><br />
                  <span class="teamContainer-item-bottom-greyDate">
                    入团时间:&nbsp;&nbsp;{{element.createdDate}}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: "teamItem",
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
    agentType: {
      type: String
    }
  },
  computed: {
    ...mapState({
      UserInfo: state => state.my.UserInfo,
    })
  },
  data() {
    return {
      check: false
    }
  },
  created() {
  },
  methods: {
    filterType(data) {
      if (data == undefined) {
        return "所有";
      } else if (data == 3) {
        return "会员";
      } else if (data == 2) {
        return "代理人";
      } else if (data == 4) {
        return "用户";
      }
    },
    //团队用户详单
    async getNewDetail(item, index) {
      if (this.dataList[index].check) {
        this.dataList[index].check = false
        this.$forceUpdate();
        return
      }
      const res = await this.$axios({
        url: this.$API.API_MY_TEAM_MEMBER,
        method: "post",
        data: {
          agentType: this.agentType,
          agentLevel: '2',
          agentCode: item.agentCode
        }
      });
      if (res.code === 0 && res.content.result == '0') {
        this.dataList[index].check = true
        this.dataList[index].list = res.content.data.data || []
        this.$forceUpdate();
      } else {
        this.$toast(res.content.resultMessage || '请求失败');
      }
    }
  }
};
</script>
<style lang="less" scoped>
.teamContainer {
  width: 92%;
  margin-left: 4%;
  &-item {
    display: flex;
    flex-direction: column;
    background: #ffff;
    margin-top: 0.62rem;
    padding: 1.1rem 0.87rem;
    border-radius: 0.75rem;
    &-top {
      margin-bottom: 1rem;
    }
    &-bottom {
      &-span {
        display: inline-block;
        margin-bottom: 0.5rem;

        .gao {
          color: #ff9914;
          font-size: 0.875rem;
        }
        .zhong {
          color: #70b538;
          font-size: 0.875rem;
        }
        .di {
          color: #ad873c;
          font-size: 0.875rem;
        }
        .commissionRate {
          color: #3a99e9;
          font-size: 0.875rem;
        }
      }
      &-greyDate {
        font-size: 0.75rem;
        color: #999999;
      }
    }
  }
  &-cnt {
    display: flex;
    justify-content: space-between;
    align-items: center;
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