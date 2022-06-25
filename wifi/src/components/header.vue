<!--
 * @Author: your name
 * @Date: 2020-07-17 09:35:57
 * @LastEditTime : 2021-06-08 11:59:34
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\components\header.vue
 -->
<template>
  <div
    class="tt_"
    v-show="this.$route.path != '/register' && this.$route.path != '/videoCombat/caseInfoExhibition' && this.$route.path != '/videoCombat/viewinfo' && this.$route.path != '/login'"
  >
    <div class="header">
      <!-- <img src="../assets/logo_icon.png" /> -->
      <Nav/>
    </div>
  </div>
</template>
<script>
import Nav from "./nav";
export default {
  components: {
    Nav
  }
};
</script>

<style scope>
.tt_ {
  position: absolute;
  min-width: 1200px;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.6rem;
  z-index: 1000;
}
.header {
  position: relative;
  display: block;
  /* background: url('../assets/topbg.png') no-repeat; */
  background: url("../assets/topbg_caseIndex.png") no-repeat;
  background-size: 100% 100%;
  height: 0.6rem;
}
.platform_home .header {
  background: #074668 url("../assets/topbg.png") no-repeat;
  /* background: #074668 url('../assets/topbg_platform.png') no-repeat; */
  /* background-size: 100% 103%; */
}
.platformStruct_home .header {
  background: #074668 url("../assets/topbg_platform.png") no-repeat;
    background-size: 100% 100%;
}
.vehicle_home .header {
  background: #074668 url("../assets/topbg_vehicle.png") no-repeat;
  background-size: 100% 100%;
}
.caseIndex_home .header {
  background: #074668 url("../assets/topbg_caseIndex.png") no-repeat;
  background-size: 100% 100%;
}
.caseTop_home .header {
  background: #074668 url("../assets/caseTopTitle.png") no-repeat;
  background-size: 100% 100%;
}
.header > img {
  position: absolute;
  top: 0.05rem;
  left: 2%;
  height: 0.48rem;
}
</style>
