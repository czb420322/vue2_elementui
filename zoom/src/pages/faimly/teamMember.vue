<template>
  <div class="my-team">
    <div class="my-team-client">
      <van-nav-bar :title="$route.meta.title" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
      <van-search v-model="value" shape="round" show-action input-align="center" placeholder="请输入搜索关键词" @search="clickTab">
        <template #action>
          <div @click="clickTab">搜索</div>
        </template>
      </van-search>
    </div>
    <van-tabs type="card" v-model="active" class="my-team-myCard" @click="clickTab">
      <van-tab v-for="item in itemList" :key="item.agentType" :title="item.agentName"></van-tab>
    </van-tabs>

    <div class="my-team-myCard-counts" v-if="active == 0">
      <div>
        <p class="top">代理人</p>
        <p>{{agentStatistics || 0}}人</p>
      </div>
      <div>
        <p class="top">会员</p>
        <p>{{memberStatistics || 0}}人</p>
      </div>
      <div>
        <p class="top">用户</p>
        <p>{{userStatistics || 0}}人</p>
      </div>
    </div>

    <van-list ref="list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <teamItem :dataList="clientDataList" :agentType=itemList[active].agentType></teamItem>
    </van-list>
    <br>
  </div>
</template>
<script>
import teamItem from "./components/teamItem.vue";
export default {
  name: "teamMember",
  components: {
    teamItem,
  },
  data() {
    return {
      active: 0,
      value: "",
      itemList: [
        {
          agentName: "所有",
          agentType: "",
        },
        {
          agentName: "会员",
          agentType: 3,
        },
        {
          agentName: "用户",
          agentType: 4,
        },
        {
          agentName: "代理人",
          agentType: 2,
        },
      ],
      currentPage: 1,
      loading: false,
      finished: false,
      clientDataList: [],
      agentType: "",
      agentStatistics: '', // 下级代理人总数
      memberStatistics: '', // 下级会员总数
      userStatistics: '', // 下级用户总数
    };
  },
  created() {
    this.getPeopleCounting()
  },
  methods: {
    clickTab() {
      this.currentPage = 1
      this.loading = false
      this.finished = false
      this.clientDataList = []
      setTimeout(() => {
        this.$refs.list.check();
      }, 100);
    },
    async onLoad() {
      const res = await this.$axios({
        url: this.$API.API_MY_TEAM_MEMBER,
        method: "post",
        data: {
          agentType: this.itemList[this.active].agentType,
          agentName: this.value,
          pageSize: 10,
          currentPage: this.currentPage,
        },
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
    async getPeopleCounting() {
      const res = await this.$axios({
        url: this.$API.API_PEOPLECOUNTING,
        method: "post"
      });
      this.agentStatistics = res.content.agentStatistics || '' // 下级代理人总数
      this.memberStatistics = res.content.memberStatistics || ''  // 下级会员总数
      this.userStatistics = res.content.userStatistics || ''  // 下级用户总数
    }
  }
};
</script>
<style lang="less" >
.my-team {
  .van-nav-bar ::after {
    background-color: white !important;
  }
  &-client {
    width: 100%;
    position: sticky;
    z-index: 99;
    top: 0;
    background: #ffff;
    .van-nav-bar__arrow {
      font-size: 22.5px;
    }
    .van-hairline--bottom::after {
      border: none;
    }
    .van-nav-bar ::after {
      background-color: #ffff !important;
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
      white-space: nowrap;
      padding-top: 0.5rem;
      margin-left: 0.65rem;
    }
    .van-tabs__nav--card .van-tab.van-tab--active {
      background: #eeeeee;
      color: #ffff;
      span {
        display: inline-block;
        background: #3a99e9;
        padding: 0.2rem 0.5rem;
        border-radius: 1rem;
      }
    }
    .van-tab {
      flex: 0;
      padding: 0.3rem;
      span {
        display: inline-block;
        background: #ffff;
        padding: 0.2rem 0.5rem;
        border-radius: 1rem;
      }
    }
    .van-tabs__nav--card .van-tab {
      color: #798896;
      border: none;
    }
  }
  &-myCard {
    &-counts {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: linear-gradient(45deg, #3a99e9 0%, #1a7bcd 100%);
      width: 92%;
      margin: 10px auto 0;
      border-radius: 0.75rem;
      padding: 0.5rem 0;
      p {
        text-align: center;
        font-size: 1rem;
        color: #fff;
        margin: 0.5em 0;
      }
      .top {
        font-size: 0.75rem;
      }
    }
  }
}
</style>