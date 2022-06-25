<!--
 * @Author: chenxf
 * @Date: 2020-07-22 10:00:44
 * @LastEditTime : 2021-01-04 10:51:27
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\components\footer_case_look.vue
 * @
 -->
<template>
  <div class="footer">
    <!-- <img src="../assets/logo.png"/>武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span> -->
  </div>
</template>

 <script>

    export default {
        name: "footer_case_look",
    }
</script>

<style  lang="scss" scoped>
  .footer{
    width:100%;
    height:0.52rem;
    padding-top: 0.08rem;
    font-size:0.14rem;
    line-height: 1.5;
    /* color: rgba(153, 201, 250, 0.4); */
    @include font_color_footer("font_color_footer1");
    text-align: center;
  }
  .footer img{margin-right: 0.05rem;}
</style>
