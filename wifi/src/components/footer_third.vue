<!--
 * @Author: your name
 * @Date: 2019-12-06 10:43:49
 * @LastEditTime: 2020-04-03 17:42:45
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\components\footer_third.vue
 -->
<template>
  <div class="footer">
    <!-- <img src="../assets/logo.png" />武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span> -->
  </div>
</template>

<script>
    export default {
        name: "footer_third"
    }
</script>

<style scoped>
  .footer{
    position:absolute;
    bottom:0;
    left:0;
    z-index: 2;
    width:100%;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size:0.14rem;
    /* color:#909399; */
    color: rgba(153, 201, 250, 0.4);
    text-align: center;
  }
  .footer img{margin-right: 0.05rem;}
</style>
