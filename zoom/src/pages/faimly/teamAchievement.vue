<template>
  <div class="my-achievement">
    <div class="my-achievement-client">
      <van-nav-bar :title="$route.meta.title" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
      <van-search v-model="value" shape="round" show-action input-align="center" placeholder="请输入搜索关键词" @search="clickTab">
        <template #action>
          <div @click="clickTab">搜索</div>
        </template>
      </van-search>
    </div>
    <van-tabs type="card" v-model="active" class="my-achievement-myCard" @click="clickTab">
      <van-tab v-for="item in itemList" :key="item.agentType" :title="item.agentName">
        <div class="my-achievement-myCard-counts">
          <div>
            <p class="top">累计保费</p>
            <p>￥{{ achievementObj.premium }}</p>
          </div>
          <div>
            <p class="top">累计提成</p>
            <p>{{ achievementObj.commissionRate }}</p>
          </div>
          <div>
            <p class="top">累计出单数</p>
            <p>{{ achievementObj.orderQuantity }}</p>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <van-list ref="list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <achievementItem v-for="(item, index) in clientDataList" :key="index" :dataList="item"></achievementItem>
    </van-list>
    <br>
  </div>
</template>
<script>
import achievementItem from "./components/achievementItem.vue";
export default {
  name: "teamAchievement",
  components: {
    achievementItem,
  },
  data() {
    return {
      active: 0,
      value: "",
      itemList: [
        {
          agentName: "年",
          statisticsDate: 1,
        },
        {
          agentName: "月",
          statisticsDate: 2,
        },
        {
          agentName: "日",
          statisticsDate: 3,
        },
      ],
      currentPage: 1,
      loading: false,
      finished: false,
      clientDataList: [],
      agentType: "",
      statisticsDate: 1,
      achievementObj: {}, //累计保费数据
    };
  },
  created() {
    this.getAchievementItem()
  },
  methods: {
    clickTab() {
      this.currentPage = 1
      this.loading = false
      this.finished = false
      this.clientDataList = []
      this.getAchievementItem();
      setTimeout(() => {
        this.$refs.list.check();
      }, 100);
    },
    //累计保费
    async getAchievementItem() {
      const res = await this.$axios({
        url: this.$API.API_MY_TEAM_ACHIEVEMENT,
        method: "post",
        data: {
          statisticsDate: this.itemList[this.active].statisticsDate,
        },
      });
      if (res.code === 0) {
        this.achievementObj = res.content;
      }
    },
    //团队用户详单
    async onLoad() {
      const res = await this.$axios({
        url: this.$API.API_MY_TEAM_DETAIL,
        method: "post",
        data: {
          statisticsDate: this.itemList[this.active].statisticsDate,
          agentName: this.value,
          pageSize: 10,
          currentPage: this.currentPage,
        }
      });
      this.loading = false;
      if (res.code === 0 && res.content.result == '0') {
        const { data, records } = res.content.data;

        this.clientDataList = [...this.clientDataList, ...data || []];
        if (this.clientDataList.length >= records) {
          this.finished = true;
        }
        if (this.currentPage < records) {
          this.currentPage++;
        } else {
          this.finished = true;
        }
      } else {
        this.finished = true;
        this.$toast(res.content.resultMessage || '请求失败');
      }
    },
  },
};
</script>
<style lang="less" >
.my-achievement {
  .van-nav-bar ::after {
    background: #ffff !important;
  }
  &-client {
    width: 100%;
    position: sticky;
    z-index: 99;
    top: 0;
    background: #ffff;
    .van-hairline--bottom::after {
      border: none;
    }
    .van-nav-bar__arrow {
      font-size: 22.5px;
    }
    .van-nav-bar .van-icon {
      color: #000000;
      font-size: 20px;
    }
  }
  .van-tabs--card > .van-tabs__wrap {
    height: 41px !important;
  }
  &-myCard {
    .van-tabs__nav--card {
      height: 40px;
      border: none;
      margin: 0;
      background: #eeeeee;
      padding-top: 0.5rem;
    }
    .van-tabs__nav--card .van-tab.van-tab--active {
      background: #eeeeee;
      color: #ffff;
      span {
        display: inline-block;
        background: #3a99e9;
        padding: 0.2rem 1rem;
        border-radius: 1rem;
      }
    }
    .van-tab {
      flex: 0;
      margin-left: 0.5rem;
      span {
        display: inline-block;
        background: #ffff;
        padding: 0.2rem 1rem;
        border-radius: 1rem;
      }
    }
    .van-tabs__nav--card .van-tab {
      color: #798896;
      border: none;
    }
    .van-tab__pane,
    .van-tab__pane-wrapper {
      margin-top: 0.8rem;
    }
    &-counts {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: linear-gradient(45deg, #3a99e9 0%, #1a7bcd 100%);
      width: 92%;
      min-height: 6.2rem;
      margin-left: 4%;
      border-radius: 0.75rem;
      p {
        text-align: center;
        font-size: 1rem;
        color: #fff;
      }
      .top {
        font-size: 0.75rem;
      }
    }
  }
}
</style>