<!--
 * @Author: your name
 * @Date: 2020-07-17 09:36:03
 * @LastEditTime: 2020-11-02 14:49:41
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\page\videoCombat\onlinecollect.vue
 -->
<template>
 <div class="onlinecoll">
   <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt="">
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/videoCombat',query:{menuCode:100}}">视频侦查></router-link>
      <router-link :to="{path:'/videoCombat/datacollection',query:{ menuCode: '602' }}" class="sysname">数据采集 > </router-link>
      <p class="sysname">&nbsp;标准采集</p>
    </div>
   <div class="main">
    <div class="mainleft">
      <div class="normMain_left">
          <p class="norm_top">标准采集</p>
          <p class="norm_center">
            <input type="text" v-model="filterText" placeholder="请输入设备名称">
            <el-button  class="el-icon-search searchBtn"></el-button>
          </p>
          <el-tree :data="societyData"
          :filter-node-method="filterNode"
          :props="defaultProps"
          @node-click="handleNodeClick"
          default-expand-all ref="tree"></el-tree>
        </div>
    </div>
    <div class="mainright">
        <div class="mapContent" id="allmap"></div>
          <img class="dingwei" src="../../assets/case/quickPos.png" @click="getinits" />
          <div class="point">
            <span>经度：{{point.lng}}</span><br>
            <span>纬度：{{point.lat}}</span>
        </div>
    </div>
   </div>
  <footer>
      <p><img src="../../assets/logo.png">武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span></p>
    </footer>
 </div>
</template>

<script>
import headers from "../../components/header";
import maps from '../../api/realvideo/map.js'
import { mapState, mapActions } from "vuex";
import videoDown from '../../api/casestudy/videoDown.js'
import normData from "../../api/newCaseVideo/normData.js";
let videoIco = require("@/assets/images/device/video.png");

export default {
  data() {
    return {

    };
  },

  components: {
    headers
  },
  computed: {
    ...mapState(["map", "videolist", "markerData"])
  },
  created() {
     this.getDownLoad();
  },
  mounted() {
    this.InitMainMap('allmap'); //地图对象要在页面加载完了后再渲染  不能写在created里面4
    this.querySocietyData();
  },
  mixins: [videoDown,maps,normData],
  methods: {

  }
};
</script>

<style scoped>
@import "../../assets/css/commom.css";
.onlinecoll {
  width: 100%;
  position: absolute;
  top: 0.6rem;
  bottom: 0px;
  left: 0px;
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.6rem;
  padding-top: 0.1rem;
  font-size: 0.14rem;
  color: #909399;
  text-align: center;
  border: 0;
}
footer img {
  vertical-align: middle;
}
.main {
  width: 100%;
  position: absolute;
  top: 0.6rem;
  bottom: 0rem;
  left: 0px;
  overflow: auto;
  padding: 0;
}
.mainleft {
  width: 22%;
  height: 100%;
  float: left;
  box-shadow: 2px 2px 1px #ccc;
}
.mainleft > div {
  height: 100%;
  background-color: #0F243C;
}



.mainright {
  overflow: hidden;
  height: 100%;
  border-bottom: 1px solid #d7dce0;
  position: relative;
}
.mainright > p {
  width: 1rem;
  line-height: 0.4rem;
  font-size: 0.16rem;
  text-align: center;
  color: #c5c5c5;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #152E4C;
}
.mainright > div {
  width: 100%;
  height: 100%;
  /* border: 1px solid #000; */
}
.norm_top{
  line-height: 0.4rem;
  padding: 0 0.2rem;
  background-color: rgba(20,57,96,0.8);
  color: #fff;
}
.norm_center{
  line-height: 0.3rem;
  padding: 0 0.2rem;
  margin:0.15rem 0;
  position: relative;
}
.norm_center input{
  height: 0.3rem;
  width: 100%;
  border-radius: 3px;
  padding-left: 0.1rem;
}
.norm_center .el-button{
  padding: 0 0.15rem;
  position: absolute;
  top:0;
  right: 0.2rem;
  height: 0.3rem;
}
.dingwei{
    position: absolute;
    top: 205px;
    right: 37px;
}

.mainright .point {
  position: absolute;
  left: 0.1rem;
  bottom: 0.15rem;
  width: 2rem;
  height: 0.3rem;
  border: 0;
  font-size: 0.14rem;
}
.el-tree {
  height: 5.5rem;
  margin-top: 0.2rem;
  overflow: auto;
  background: transparent;
  padding: 0 0.3rem;
}
.el-tree >>> .el-tree-node__label {
  font-size: 0.14rem;
  color: #99c9fa
}

.el-tree >>> .el-tree-node__content:hover{
 background-color: rgba(49, 86, 131, 0.2);
}
.el-tree >>> .el-tree-node:focus>.el-tree-node__content{
  background-color: rgba(49, 86, 131, 0.2);
}

.el-tree >>> .el-tree-node__label::before{
  display: block;
  content: '';
}
.el-tree >>> .el-tree-node__children>.el-tree-node>.el-tree-node__content>.el-tree-node__label::before{
  display: inline-block;
  margin-right: 7px;
  content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAANCAYAAACdKY9CAAAA+UlEQVQokbWPPU4CURSFv/czkAyBiQ0ORGNiZ4wLcA0WFgY6p7SksHMLLIDQQiXTmNhauQO3YCExYyCDZIA4LzwbxkJfMY0nucU9OV/uuaIzSl+AY/7qA7gCgjgKngtTdEapnb4nF7/T7bA5Ac631j5KISZxFNwBaOAT4CvPV0W45vv7wAxIBOzlxpx0x4sh0JOOKli7NYAXR0EihOh7WqfAEXCoXcB6vZkDre54cQs87aYCnDkBC3Y2T68b9dqlUupmZxsp5akTAFhm2dsyywbFrrWqHrTCB+cPLkkhFWBKAz/gvwMaaABUPM8vka9r4LUdNu9LHph+A9q2Q0DSk+vlAAAAAElFTkSuQmCC);
}
.el-tree >>> .el-tree-node__content>.expanded::before{
  display: inline-block;
  content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADKSURBVDhPY/z//z8DCPw9lecGpIKA+CMQ/wOJ4QB8QHwPWWPXmXv/RUBsRjDCDn79ZfhrqcooyATlw8HrTww/Xn1i+I4Lf/3B8AekDkMjsYAqGkEBgtNv6ABZI9u//3hDEwWANQJD1PPZewaZt58ZfoJFiQBMQE19QE2JD9/8/wQVIwqAbJS68ez/uw9fGX5BhIgDMD8SHSgwgBw4JAHGPydzlx+//f8rOwsDM1QML/j1h+GvBTDJgTQGA/mOQPwBLEMY8DMwMNwEAO+nV0EjCPpFAAAAAElFTkSuQmCC);
}

#allmap >>> .BMap_bubble_content #uploads,
#allmap >>> .BMap_bubble_content #upload{
  color: #409EFF;
}

/* #allmap /deep/ .BMap_bubble_content #uploads{
  color: #409eff !important;
} */
#allmap >>> .BMap_bubble_content .inputFile{
  position: absolute;
  bottom: 12px;
  opacity: 0;
}
</style>
