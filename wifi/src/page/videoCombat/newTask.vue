<!--
 * @Author: your name
 * @Date: 2020-07-17 09:36:03
 * @LastEditTime: 2020-11-02 14:49:31
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\page\videoCombat\newTask.vue
 -->
<template>
 <div class="newtask">
   <!-- <headers/> -->
   <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt="">
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/videoCombat',query:{menuCode:100}}">视频侦查></router-link>
      <p @click="gonewtask" class="sysname">&nbsp;任务管理 > </p>
      <p class="sysname">&nbsp;新增任务</p>
    </div>
    <p class="splitline"></p>
    <div class="newtask_btn">
      <!-- <div class="news_t">
        <p class="langs"><span>|</span>&nbsp;&nbsp;新增任务</p>
        <p @click="gonewtask" class="back"><i class="el-icon-back"></i>返回上一页</p>
      </div> -->
      <div class="new_b">
        <div>
            <p class="tasktype"><span>|</span>&nbsp;&nbsp;任务类型选择</p>
            <p class="prosetype">
              <em>解析类型：&nbsp;&nbsp;</em>
              <router-link tag="span" :to="{path:'/videoCombat/taskMan/newtask/videoreterval',query:{menuCode:108}}"><b><i></i></b> 视频检索</router-link>
              <router-link tag="span" :to="{path:'/videoCombat/taskMan/newtask/videostruc',query:{menuCode:108}}"><b><i></i></b> 视频结构化</router-link>
            </p>
            <div class="new_main">
              <router-view></router-view>
            </div>
        </div>
      </div>
    </div>
     <footer>
      <p><img src="../../assets/logo.png"> 武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span></p>
    </footer>
 </div>
</template>

<script>
import headers from '../../components/header'
 export default {
   data () {
     return {
       radio2:1,
     }
   },
   components: {
     headers
   },
   methods:{
      //去主页
      gonewtask(){
        // this.$router.push('/videoCombat/taskMan')
        this.$router.push({path:'/videoCombat/taskMan',query:{ menuCode: '108' }});
      },
   }
 }
</script>

<style scoped>
@import "../../assets/css/commom.css";
.newtask{
  width: 100%;
  position: absolute;
  top: 0.6rem;
  bottom: 0px;
  left: 0px;
}
/* .topInfo{
  width: 100%;
  display: flex;
  font-size: 0.18rem;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #d7d5d5;
}
.childname{
  width: 1.62rem;
  height: 0.5rem;
  background: url("../../assets/images/sysmanage/bg.png");
  background-size: 100% 100%;
  color: #63abfe;
  line-height: 0.5rem;
  text-align: center;
}
.sysname{
  width: 1.45rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  cursor: pointer;
}
.topInfo .two{
  position: absolute;
  left: 2.98rem;
} */

/* .splitline{
  width: 100%;
  height: 0.1rem;
  background: #f3f6f8;
  border-bottom: 3px solid #d9dbdd;
} */
  footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 0.6rem;
    padding-top: 0.1rem;
    font-size: 0.14rem;
    color: #909399;
    text-align: center;
  }
  footer img{
    vertical-align: middle;
  }

  .newtask_btn{
    width: 100%;
    position: absolute;
    top: 0.6rem;
    bottom: 0.6rem;
    left: 0px;
    overflow: auto;
    padding-bottom: 0.1rem;
    /* padding: 0.2rem 0.4rem; */
    /* border: 1px solid #000; */
  }
  .news_t{
    display: flex;
    color: #409eff;
    line-height:0.6rem;
    padding: 0 0.2rem;
    /* background-color: #f3f6f8; */
    /* border-bottom: 2px solid #ebedf1; */
    justify-content: space-between;
  }
  .news_t .back{
    font-size: 0.14rem;
    cursor: pointer;
  }
  .langs{
    font-size: 0.16rem;
  }
  .tasktype{
    background-color: rgba(12,68,135,0.5);
    padding-left: 0.2rem;
    line-height: 0.5rem;
    font-size: 0.16rem;
    color: #c5c5c5;
  }
  .langs span,.tasktype span{
    color: #409eff;
    font-weight: 900;
  }
  .new_b{
    height: 100%;
    padding: 0.4rem 2rem;
  }
  .new_b >div{
    height: 100%;
    border: 2px solid #0C3465;
    /* background-color: #fcfcfd; */
  }
  .prosetype{
    font-size: 0.14rem;
    line-height: 0.4rem;
    padding-left: 0.4rem;
    color: #c5c5c5;
    background: rgba(13,29,50,.8);
  }

  .prosetype span{
    margin-left: 0.5rem;
    cursor: pointer;
    position: relative;
  }
  .prosetype b{
    position: absolute;
    top: 0.04rem;
    left: -0.25rem;
    display: inline-block;
    /* border: 1px solid #dcdfe6; */
    border-radius: 100%;
    width: 0.14rem;
    height: 0.14rem;
    background-color: #fff;
    box-sizing: border-box;
  }
  .prosetype b i{
    position: absolute;
    width: 0.06rem;
    height: 0.06rem;
    border-radius: 100%;
    background-color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%)
  }
  .new_main{
    width: 100%;
    height: calc(100% - 0.9rem);
  }


  .router-link-active b{
    background-color: #409eff;
  }

</style>
