<!--
 * @Author: your name
 * @Date: 2019-12-06 10:43:50
 * @LastEditTime : 2020-04-08 15:53:05
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\components\footer_second.vue
 -->
<template>
  <div class="footer">
    <!-- <img src="../assets/logo.png" />武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span> -->
  </div>
</template>

<script>
    export default {
        name: "footer_second"
    }
</script>

<style lang="scss" scoped>
  .footer{
    position: absolute;
    bottom: 0;
    width:100%;
    height:0.6rem;
    font-size:0.14rem;
    line-height: 0.6rem;
    /* color:#909399; */
    /* color: rgba(153, 201, 250, 0.4); */
      @include font_color_footer("font_color_footer1");
    text-align: center;
  }
  .footer img{margin-right: 0.05rem;}
</style>





