<template>
  <div class="myGuest">
    <myGuestSearch placeholder="输入产品名/用户名关键字搜索" @searchValue="searchValue"></myGuestSearch>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getSearch">
      <myGuestItem v-for="(item, index) in clientDataList" :key="index" :itemObj="item"></myGuestItem>
    </van-list>
    <my-empty description="查询无数据" v-show="!clientDataList.length && !loading"></my-empty>
    <br>
  </div>
</template>
<script>
import myGuestSearch from "./components/myGuestSearch.vue";
import myGuestItem from "./components/myGuestItem.vue";
export default {
  name: "myGuest",
  components: {
    myGuestSearch,
    myGuestItem
  },
  data() {
    return {
      loading: false,
      finished: false,
      records: "",
      currentPage: 1,
      pageSize: 10,
      activityName: "",
      clientDataList: [],
    };
  },
  mounted() { },
  methods: {
    async searchValue(value) {
      if (value) {
        this.currentPage = 1
        this.activityName = value
        this.clientDataList = []
        const newValue = await this.getSearch()
      }
    },
    async getSearch() {
      const res = await this.$axios({
        url: this.$API.API_MY_TARGET_SEARCH_VISITOR,
        method: "get",
        params: {
          activityName: this.activityName,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        },
      });
      if (res.code === 0 && res.content.data) {
        this.loading = false;
        const { data, records } = res.content;
        this.clientDataList = [...this.clientDataList, ...data];
        if (this.clientDataList.length >= records) {
          this.finished = true;
        }
        if (this.currentPage < records) {
          this.currentPage++;
        } else {
          this.finished = true;
        }
        return this.clientDataList
      }
    },
  },
};
</script>
<style scoped lang="less">
.myGuest {
  display: flex;
  flex-direction: column;
  /deep/.van-nav-bar .van-icon {
    color: #000000;
    font-size: 20px;
  }
}
</style>