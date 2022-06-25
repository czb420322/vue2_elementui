<!--
 * @Author: your name
 * @Date: 2021-08-06 14:08:31
 * @LastEditTime: 2021-08-10 13:55:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \new_agent\src\pages\faimly\birthdayClient.vue
-->
<template>
  <div class="birthdayClient">
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
import { getClientAjaxList } from "./components/faimly";
import searchClient from "./components/searchClient.vue";
import itemName from "./components/itemName.vue";
export default {
  name: "birthdayClient",
  mixins: [getClientAjaxList],
  components: { searchClient ,itemName},
  methods: {
    clickGo(id) {
      this.$router.push({
        path: `/infoClient/${id}`,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.birthdayClient{
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