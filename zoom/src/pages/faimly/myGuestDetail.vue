<!--
 * @Author: your name
 * @Date: 2021-08-09 10:21:12
 * @LastEditTime: 2021-08-10 16:19:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \new_agent\src\pages\faimly\myGuestDetail.vue
-->
<template>
  <div class="myGuestDetail">
    <myGuestSearch
      :placeholder="titles.activityName"
      :readonly="readonly"
    ></myGuestSearch>
    <div class="myGuestDetail-container">
      <div class="myGuestDetail-container-top">
        <van-image
          class="pictures"
          width="70"
          height="70"
          :src="titles.imgUrl"
        />
        <div class="myGuestDetail-container-top-right">
          <p>{{ titles.activityName }}</p>
          累计<span>{{ records }}</span
          >访问过
        </div>
      </div>
      <div class="myGuestDetail-container-guestTitle">访问记录</div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getSearch"
      >
        <div
          class="myGuestDetail-container-bottom"
          v-for="(item, index) in clientDataList"
          :key="index"
        >
          <div class="myGuestDetail-container-bottom-avator">
            <van-image
              class="pictures"
              width="20"
              height="20"
              round
              :src="item.avatar"
            />
            {{ item.customerName }}
          </div>
          <div class="myGuestDetail-container-bottom-time">
            {{ getLocalTime(item.createDate) }}
          </div>
        </div></van-list
      >
    </div>
  </div>
</template>
<script>
import myGuestSearch from "./components/myGuestSearch.vue";
export default {
  name: "myGuestDetail",
  components: { myGuestSearch,  },
  data() {
    return {
      readonly: true,
      clientDataList: [],
      loading: false,
      finished: false,
      records: "",
      currentPage: 1,
      pageSize: 10,
      records: 0,
      titles: {},
    };
  },
  mounted() {
    //   this.getSearch()
  },
  methods: {
    getLocalTime(oldtime) {
      if (oldtime) {
        var datejson = new Date(oldtime).toJSON();
        var date = new Date(+new Date(datejson) + 8 * 3600 * 1000)
          .toISOString()
          .replace(/T/g, " ")
          .replace(/\.[\d]{3}Z/, "");

        return date;
      } else {
        return "";
      }
    },
    async getSearch() {
      const res = await this.$axios({
        url: this.$API.API_MY_TARGET_SEARCH_VISITOR_HISTROY,
        method: "get",
        params: {
          activityId: this.$route.params.activityId,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        },
      });

      if (res.code === 0 && res.message === "成功") {
        this.loading = false;
        const { data, records } = res.content;
        this.titles = data[0];
        this.records = records;
        this.clientDataList = [...this.clientDataList, ...data];
        if (this.clientDataList.length >= records) {
          this.finished = true;
        }
        if (this.currentPage < records) {
          this.currentPage++;
        } else {
          this.finished = true;
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.myGuestDetail {
  display: flex;
  flex-direction: column;

  .myGuestDetail-container {
    background: #ffff;
    width: 92%;
    margin: 0.8rem 4% auto 4%;
    display: flex;
    flex-direction: column;
    border-radius: 0.625rem;
    &-top {
      display: flex;
      margin: 0.5rem 0.68rem 0.7rem;
      border-bottom: 1px solid #dcdcdc;
      padding: 0.95rem 0;
      &-right {
        margin-left: 1.1rem;
        p {
          margin: 0.5rem 0;
          font-size: 0.98rem;
          font-weight: 500;
        }
        span {
          color: #3989ec;
          font-size: 0.75rem;
          font-weight: 400;
        }
      }
    }
    &-guestTitle {
      margin-left: 0.68rem;
      font-weight: 500;
      font-size: 0.88rem;
      color: #000000;
    }
    &-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-avator {
        display: flex;
        align-items: center;
        font-size: 0.82rem;
        color: #3a99e9;
        font-weight: 400;
        .pictures {
          margin: 0.5rem 0.68rem 0.7rem;
        }
      }
      &-time {
        margin-right: 0.87rem;
        font-size: 0.75rem;
        font-weight: 400;
        color: #999999;
      }
    }
  }
}
</style>