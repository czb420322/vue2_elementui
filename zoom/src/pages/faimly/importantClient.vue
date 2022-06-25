<template>
  <div class="importantClient">
    <searchClient></searchClient>
    <van-list class="itemList" v-model="loading" :finished="finished" finished-text="没有更多了" @load="getSearch">
      <itemName v-for="item in clientDataList" :key="item.id" :avatar="item.avatar" :customerName="item.customerName" @click.native="clickGo(item.id)" />
    </van-list>
    <br>
  </div>
</template>

<script>
import { getClientAjaxList } from "./components/faimly";
import searchClient from "./components/searchClient.vue";
import itemName from "./components/itemName.vue";
export default {
  name: "importantClient",
  mixins: [getClientAjaxList],
  components: { searchClient, itemName },
};
</script>
<style lang="less" scoped>
.importantClient {
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