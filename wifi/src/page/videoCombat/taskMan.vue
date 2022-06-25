<!--
 * @Author: your name
 * @Date: 2019-12-06 10:43:56
 * @LastEditTime : 2021-05-28 13:38:25
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\videoCombat\taskMan.vue
 -->
<template>
 <div class="parent">
   <!-- <headers/> -->
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt="">
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/videoCombat',query:{menuCode:100}}">视频侦查> </router-link>
      <p class="sysname">&nbsp;任务管理</p>
    </div>
    <p class="splitline"></p>
    <div class="warpper">
      <div class="menus">
        <el-button :type="listFlag" @click="gotoNocoll">未完成</el-button>
        <el-button :type="approveFlag" @click="gotoColl">已完成</el-button>
      </div>
      <router-view></router-view>
    </div>
    <footer>
      <p>
        <img src="../../assets/logo.png">武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span>
      </p>
    </footer>
 </div>
</template>

<script>
import headers from '../../components/header'
 export default {
   data () {
      return {
        listFlag:'primary',
        approveFlag:'default'
     }
   },
    methods:{
        gotoNocoll () {
            this.$router.push({path:'/videoCombat/taskMan/nocolleted',query:{ menuCode: '108' }});
            this.listFlag = "primary"
            this.approveFlag = "default"
        },
        gotoColl () {
          this.$router.push({path:'/videoCombat/taskMan/colleted',query:{ menuCode: '108' }});
            this.listFlag = "default"
            this.approveFlag = "primary"
        }
    },
    components: {
     headers
   }
 }
</script>

<style scoped>
@import "../../assets/css/commom.css";

.parent{
  width: 100%;
  position: absolute;
  top: 0.6rem;
  bottom: 0px;
  left: 0px;
}

.splitline{
  width: 100%;
  height: 0.02rem;
  background: #333232;
}
footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.6rem;
  color: #909399;
  padding-top: 0.1rem;
  font-size: 0.14rem;
  text-align: center;
}
footer img{
  vertical-align: middle;
}


.warpper{
    width: 100%;
    min-width: 1200px;
    position: absolute;
    top: 0.5rem;
    bottom: 0.6rem;
    left: 0;
    overflow: auto;
    padding: 0.2rem 0.34rem 0 0.34rem;
}

.menus .el-button{
  width: 1.2rem;
  margin-right: 0.2rem;
  padding: 0.12rem 0.2rem;
  font-size: 0.14rem;
}

.el-button{
  background-color: rgba(64, 158, 225, 0.25);
  color: #ECEEF0;
  border: 1px solid rgba(52, 138, 226, 0.25);
}
.el-button--primary{
  background:#2981DC;
  border: 0px solid #000;
}

</style>



