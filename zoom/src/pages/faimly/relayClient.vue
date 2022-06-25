<!--
 * @Author: your name
 * @Date: 2021-08-06 14:07:43
 * @LastEditTime: 2021-08-06 17:52:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \new_agent\src\pages\faimly\relayClient.vue
-->
<template>
    <div class="relayClient">
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
    name:'relayClient',
    mixins: [getClientAjaxList],
    components: { searchClient ,itemName},
}
</script>
<style lang="less" scoped>
.relayClient{
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