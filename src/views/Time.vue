<!--
 * @Author: your name
 * @Date: 2021-09-04 23:09:17
 * @LastEditTime: 2021-09-04 23:34:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lesson22\src\views\Time.vue
-->
<template>
  <div>
    <ul>
        123456
      <li v-for="(item, index) in  list" :key="index">
        时间:{{ item.time | formatDate }}
      </li>
    </ul>
  </div>
</template>

<script>
   import formatDate from './time.js'
export default {
  data(){
    return {
      list: "",
    }
  },
  filters: {
    formatDate(time) {
      time = time * 1000;
      let date = new Date(time);
      console.log(new Date(time));
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
  },
  mounted() {
    //get请求
    this.$http.get("http://localhost:3456/timelist").then(
      (res) => {
        console.log(res);
        this.list = res.data;
        console.log(this.list);
      },
      function () {
        console.log("请求失败处理");
      }
    );
  },
};
</script>

<style scoped>
</style>