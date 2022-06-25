<!--
 * @Author: your name
 * @Date: 2021-08-03 18:06:18
 * @LastEditTime: 2021-08-09 15:31:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \new_agent\src\pages\faimly\allClient.vue
-->
<template>
  <div class="allClient">
    <searchClient></searchClient>
    <van-list
      class="itemList"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getSearch"
    >
      <itemName
        v-for="item in clientDataList"
        :key="item.id"
        :avatar="item.avatar"
        :customerName="item.customerName"
        @click.native="clickGo(item.id)"
      />
    </van-list>
  </div>
</template>
<script>
import searchClient from "./components/searchClient.vue";
import itemName from "./components/itemName.vue";
import { getClientAjaxList } from "./components/faimly";
export default {
  name: "allClient",
  components: {
    searchClient,
    itemName,
  },
  mixins: [getClientAjaxList],
  data() {
    return {
      clientDataList: [],
      loading: false,
      finished: false,
      records: "",
      currentPage: 1,
      pageSize: 10,
    };
  },
  methods: {
  },
};
</script>
<style lang="less" scoped>
.allClient {
  display: flex;
  flex-direction: column;
  .itemList {
    width: 92%;
    margin-left: 4%;
    border-radius: 0.75rem;
    background: #fff;
    margin-top: 0.75rem;
    .faimly-box-content:first-child {
      border-top: none;
    }
  }
}
</style>