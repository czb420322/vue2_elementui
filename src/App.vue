<!--
 * @Author: your name
 * @Date: 2021-06-18 19:52:22
 * @LastEditTime: 2021-09-04 23:29:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lesson22\src\App.vue
-->
<template>
  <div>
    <div>
      <router-link to="/">首页</router-link>|
      <router-link to="/about">关于</router-link>|
      <router-link to="/list">列表</router-link>|
      <!-- <router-link to="/time">时间</router-link> -->
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>