<!--  -->
<template>
  <div class="subAudit" :style="{ 'margin-top': $iosSystem + 45 + 'px' }">
    <van-nav-bar :title="title" :border="false" :fixed="true"> </van-nav-bar>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  components: {},
  data() {
    return {
      title:"提审成功"
    };
  },
  methods: {},
  created() {
    setTimeout(() => {
      Toast.success("提审成功");
      setTimeout(() => {
        this.$toast("流程结束请退出");
        localStorage.clear();
        sessionStorage.clear();
      }, 1000);
    }, 1000);
  },
  mounted() {},
};
</script>
<style>
</style>