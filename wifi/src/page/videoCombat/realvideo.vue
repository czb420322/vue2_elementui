<!--
 * @Author: your name
 * @Date: 2019-12-06 10:43:56
 * @LastEditTime : 2020-11-02 17:31:37
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\videoCombat\realvideo.vue
 -->
<template>
  <div class="reavideo">
    <!-- <headers/> -->
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" tag="span" :to="{path:'/videoCombat',query:{menuCode:100}}">视频侦查></router-link>
      <p class="sysname">&nbsp;实时视频</p>
    </div>
    <div class="main">
      <div class="left">
        <div class="left_t">
          <p>
            <i class="el-icon-search"></i>
            <input type="text" placeholder="请输入设备名称" v-model="filterText">
          </p>
          <!-- <el-button @click="getKakou">fff</el-button> -->
          <!-- {{treeData}} -->
          <ul class="showhide">
            <li v-for="(item,index) in treeData" @click="showhide(index)" :key="index">
              <i
                class="el-icon-caret-right"
                @click.stop="showtree(index)"
                v-show="!showlist[index].state"
              ></i>
              <i
                class="el-icon-caret-bottom"
                @click.stop="hidetree(index)"
                v-show="showlist[index].state"
              ></i>
              {{item.name}}
              <p
                v-show="showlist[index].state"
                :class="{spanellipsis : a.isOnline == 1 || a.isOnline === undefined,spancolor : a.isOnline == 2 || a.isOnline == 9 || a.isOnline === null,markNoBorder:i == nowIndex}"
                v-for="(a,i) in item.apes"
                @click.stop="playvideo(a,i)"
                :key="i"
              >{{a.name}}</p>
            </li>
          </ul>
          <!-- <el-tree
            class="filter-tree"
            :data="treeData"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            @node-click = "playvideo"
            ref="tree2">
            <span  :class="{spanellipsis : data.isOnline == 1 || data.isOnline === undefined,spancolor : data.isOnline == 2 || data.isOnline == 9 || data.isOnline === null}" slot-scope="{ node, data }">
              <span :title="node.label">{{ node.label }}</span>
            </span>
          </el-tree>-->
        </div>
        <div class="left_b">
          <p class="videoclg">视频云控制台：</p>
          <div class="adjust">
            <p>视频调节：</p>
            <div class="mainimg">
              <img src="../../assets/images/videoCombat/rtvideo/button.png" alt>
              <div @click="top" @mousedown="direction1=true" @mouseup="direction1=false"></div>
              <div @click="right" @mousedown="direction2=true" @mouseup="direction2=false"></div>
              <div @click="buttom" @mousedown="direction3=true" @mouseup="direction3=false"></div>
              <div @click="left" @mousedown="direction4=true" @mouseup="direction4=false"></div>
              <div @click="center" @mousedown="direction5=true" @mouseup="direction5=false">
                <img
                  v-show="direction5"
                  style="z-index:1"
                  src="../../assets/images/videoCombat/rtvideo/center.png"
                  alt
                >
              </div>
              <img
                v-show="direction1"
                style="z-index:1"
                src="../../assets/images/videoCombat/rtvideo/top.png"
                alt
              >
              <img
                v-show="direction2"
                style="z-index:1"
                src="../../assets/images/videoCombat/rtvideo/right.png"
                alt
              >
              <img
                v-show="direction3"
                style="z-index:1"
                src="../../assets/images/videoCombat/rtvideo/buttom.png"
                alt
              >
              <img
                v-show="direction4"
                style="z-index:1"
                src="../../assets/images/videoCombat/rtvideo/left.png"
                alt
              >
            </div>
          </div>
          <div class="speed">
            <ul>
              <li>
                <p>变倍调节：</p>
                <img @mousedown="zoombig" src="../../assets/images/videoCombat/rtvideo/big.png" alt>
                <img
                  @mousedown="zoomsmall"
                  src="../../assets/images/videoCombat/rtvideo/small.png"
                  alt
                >
                <img
                  class="img1"
                  @mouseup="img1 =false"
                  v-show="img1"
                  src="../../assets/images/videoCombat/rtvideo/clickBig.png"
                  alt
                >
                <img
                  class="img2"
                  @mouseup="img2 =false"
                  v-show="img2"
                  src="../../assets/images/videoCombat/rtvideo/clicksmall.png"
                  alt
                >
              </li>
              <li>
                <p>焦距调节：</p>
                <img
                  @mousedown="focalbig"
                  src="../../assets/images/videoCombat/rtvideo/big.png"
                  alt
                >
                <img
                  @mousedown="focalsmall"
                  src="../../assets/images/videoCombat/rtvideo/small.png"
                  alt
                >
                <img
                  class="img1"
                  @mouseup="img3 =false"
                  v-show="img3"
                  src="../../assets/images/videoCombat/rtvideo/clickBig.png"
                  alt
                >
                <img
                  class="img2"
                  @mouseup="img4 =false"
                  v-show="img4"
                  src="../../assets/images/videoCombat/rtvideo/clicksmall.png"
                  alt
                >
              </li>
              <li>
                <p>光圈调节：</p>
                <img @mousedown="halobig" src="../../assets/images/videoCombat/rtvideo/big.png" alt>
                <img
                  @mousedown="halosmall"
                  src="../../assets/images/videoCombat/rtvideo/small.png"
                  alt
                >
                <img
                  class="img1"
                  @mouseup="img5 =false"
                  v-show="img5"
                  src="../../assets/images/videoCombat/rtvideo/clickBig.png"
                  alt
                >
                <img
                  class="img2"
                  @mouseup="img6 =false"
                  v-show="img6"
                  src="../../assets/images/videoCombat/rtvideo/clicksmall.png"
                  alt
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="left_botton">
          <p>工具箱</p>
          <div>
            <span @click="getImg"></span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="ddddd" id="idPlayer">
          <div>
            <!-- <span>请先下载网页播放器插件，下载完成后右键以管理员身份运行此安装程序，等安装成功后，刷新本页面即可观看视频！</span> -->
            <!-- <input id="idUrl" type="hidden" style="width:399px"  value="gbudp://192.168.101.16:5000/34020000001321000200" /> -->
            <input id="idUrl" type="hidden" style="width:399px" value>
            <!-- <a href="./DxPlayer.exe" download="DxPlayer.exe">点击本链接下载并安装</a> -->
            <input id="idControl" type="hidden" style="width:30px" value="3">
          </div>
        </div>
        <div class="right_btn">
          <ul>
            <li>
              <img
                onclick="OnChangeView(1)"
                src="../../assets/images/videoCombat/rtvideo/onenormal.png"
                title="一分屏"
              >
              <img
                onclick="OnChangeView(4)"
                src="../../assets/images/videoCombat/rtvideo/fournormal.png"
                title="四分屏"
              >
              <img
                onclick="OnChangeView(6)"
                src="../../assets/images/videoCombat/rtvideo/eightnormal.png"
                title="六分屏"
              >
              <img
                onclick="OnChangeView(9)"
                src="../../assets/images/videoCombat/rtvideo/ninenormal.png"
                title="九分屏"
              >
            </li>
            <!-- <li>
              <img onclick="OnStops()" src="../../assets/images/videoCombat/rtvideo/souse.png" title="停止">
            </li>-->
          </ul>
        </div>
      </div>
    </div>

    <footer>
      <p>
        <img src="../../assets/logo.png">武汉大千信息技术有限公司&copy;版权所有 2008-
        <span>{{ new Date().getFullYear() }}</span>
      </p>
    </footer>
  </div>
</template>

<script>
import headers from "../../components/header";
import realvideo from "../../api/realvideo/realvideo.js";
import videoDown from "../../api/casestudy/videoDown.js";

export default {
  data() {
    return {
      filterText: "", //搜索点位
      treeData: [],
      defaultProps: {
        children: "apes",
        label: "name"
      },
      img1: false,
      img2: false,
      img3: false,
      img4: false,
      img5: false,
      img6: false,
      direction1: false,
      direction2: false,
      direction3: false,
      direction4: false,
      direction5: false,
      playId: "",
      nowIndex: null
    };
  },
  components: {
    headers
  },
  created() {
    this.getDownLoad();
    this.getVDByModel();
  },
  mounted() {
    OnExits();
    OnInits();
    // this.getKakou();
  },
  mixins: [realvideo, videoDown],
  methods: {
    // 向上
    top() {
      OnControl(1, this.playId);
    },
    // 向右
    right() {
      OnControl(4, this.playId);
    },
    // 向下
    buttom() {
      OnControl(2, this.playId);
    },
    // 想左
    left() {
      OnControl(3, this.playId);
    },
    // 中间
    center() {
      OnControl(11, this.playId);
    },
    //截图
    getImg() {
      console.log(
        document.getElementById("idUrl").value,
        document.getElementById("idUrl").value,
        "jjj"
      );
      if (
        document.getElementById("idUrl").value == "" ||
        document.getElementById("idUrl").value == null
      ) {
        this.$notify({
          type: "warning",
          message: "请播放天网视频！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      Ongetseek();
    },
    zoombig() {
      this.img1 = true;
      OnControl(5, this.playId);
      OnControl(11, this.playId);
    },
    zoomsmall() {
      this.img2 = true;
      OnControl(6, this.playId);
      OnControl(11, this.playId);
    },
    focalbig() {
      this.img3 = true;
      OnControl(7, this.playId);
      OnControl(11, this.playId);
    },
    focalsmall() {
      this.img4 = true;
      OnControl(8, this.playId);
      OnControl(11, this.playId);
    },
    halobig() {
      this.img5 = true;
      OnControl(9, this.playId);
      OnControl(11, this.playId);
    },
    halosmall() {
      this.img6 = true;
      OnControl(10, this.playId);
      OnControl(11, this.playId);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    //播放视频
    playvideo(data, i) {
      this.nowIndex = i;
      OnStops();
      let url = sessionStorage.getItem("controlHead");
      this.playId = data.apeId;
      document.getElementById("idUrl").value = url + this.playId;
      OnPlays();
    }
  },
  beforeDestroy() {
    // this.treeData = []
    // OnExits();
  },
  destroyed() {
    // this.treeData = []
    // OnExits();
  }
};
</script>

<style scoped>
@import "../../assets/css/commom.css";

.reavideo {
  width: 100%;
  position: absolute;
  top: 0.6rem;
  bottom: 0px;
  left: 0px;
}
.main {
  width: 100%;
  min-width: 1200px;
  position: absolute;
  top: 0.4rem;
  bottom: 0.6rem;
  left: 0px;
  overflow: auto;
  color: #fff;
  padding-bottom: 0rem;
  /* background-color: #101010; */
}

.left {
  width: 22%;
  height: 100%;
  float: right;
  margin-right: 1%;
  padding: 0 0.1rem;
  font-size: 0.14rem;
}
.left_t {
  padding: 0.1rem 0.2rem;
  width: 100%;
  height: 40%;
  font-size: 0.14rem;
  position: relative;
  background: rgba(20, 57, 96, 0.29);
}
.left_t > p {
  position: relative;
  color: #8a8f93;
  padding-bottom: 0.2rem;
}
.left_t p input {
  width: 100%;
  height: 25px;
  font-size: 14px;
  border: 0;
  color: #fff;
  background-color: #252424;
  padding-left: 30px;
}
.left_t p i {
  font-size: 16px;
  position: absolute;
  left: 0.1rem;
  top: 5px;
}
.filter-tree,
.showhide {
  height: 77%;
  overflow: auto;
  cursor: pointer;
}
.showhide li {
  line-height: 0.26rem;
  color: #99c9fa;
}
.showhide li i {
  display: inline-block;
  width: 0.15rem;
  height: 0.15rem;
  color: #c0c4cc;
  margin-right: 0.05rem;
}
.showhide p {
  padding-left: 0.4rem;
  color: #99c9fa;
  line-height: 0.26rem;
}

.el-tree {
  background: transparent;
}
.filter-tree >>> .el-tree-node__label {
  font-size: 0.14rem;
  color: #99c9fa;
}
.filter-tree >>> .el-tree-node__content:hover,
.filter-tree >>> .el-tree-node:focus > .el-tree-node__content {
  background-color: rgba(49, 86, 131, 0.2);
  color: #d9582a;
}
.el-date-editor >>> .el-input__inner,
.videotype input {
  background-color: #252424;
  border: 0;
  height: 0.25rem;
}
.el-date-editor >>> .el-input__prefix {
  top: -0.08rem;
}

.left_b {
  margin: 2% 0;
  height: 43%;
  font-size: 0.14rem;
  padding: 0.1rem;
  color: #99c9fa;
  background: rgba(20, 57, 96, 0.29);
}
.left_b .videoclg {
  line-height: 0.4rem;
  font-size: 0.14rem;
}
.adjust {
  float: left;
  width: 48%;
  /* border: 1px solid #000; */
  box-sizing: border-box;
  text-align: center;
}
.adjust .mainimg {
  width: 100%;
  position: relative;
  /* border: 1px solid #000; */
}
.mainimg img {
  position: absolute;
  top: 0;
  left: 0;
}
.mainimg img:first-child {
  position: relative;
}
.mainimg div {
  z-index: 999;
  position: absolute;
  cursor: pointer;
}
.mainimg div:nth-child(2) {
  width: 0.75rem;
  height: 0.5rem;
  top: 0;
  left: 0.52rem;
}
.mainimg div:nth-child(3) {
  width: 0.53rem;
  height: 1.25rem;
  right: 0;
  bottom: 0.3rem;
}
.mainimg div:nth-child(4) {
  width: 0.75rem;
  height: 0.5rem;
  bottom: 0.07rem;
  right: 0.51rem;
}
.mainimg div:nth-child(5) {
  width: 0.53rem;
  height: 1.25rem;
  top: 0.27rem;
  left: 0;
}
.mainimg div:nth-child(6) {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-51%, -50%);
}
.adjust p {
  text-align: left;
  line-height: 0.3rem;
}
.adjust img {
  width: 100%;
}
.speed {
  display: inline-block;
  width: 51%;
  padding: 0 0.1rem;
  box-sizing: border-box;
}
.speed li {
  position: relative;
}
.speed p {
  line-height: 0.3rem;
}
.speed img {
  width: 48%;
  margin: 0;
  padding: 0;
}
.speed .img1,
.speed .img2 {
  position: absolute;
  top: 0.3rem;
}
.speed .img1 {
  left: 0rem;
}
.speed .img2 {
  left: 0.88rem;
}
.left_botton {
  height: 15%;
  background: rgba(20, 57, 96, 0.29);
}
.left_botton p {
  line-height: 0.4rem;
  background: rgba(20, 57, 96, 0.33);
  padding-left: 0.1rem;
}
.left_botton div {
  height: calc(100% - 0.4rem);
  text-align: center;
  position: relative;
}
.left_botton div span {
  width: 0.52rem;
  height: 0.5rem;
  background: url("../../assets/images/videoCombat/history/imgcut.png");
  background-size: 100% 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.left_botton div span:hover {
  background: url("../../assets/images/videoCombat/history/cuthover.png");
}

.right {
  margin-left: 1%;
  width: 75%;
  height: 100%;
  color: #fff;
  position: relative;
  background: rgba(20, 57, 96, 0.29);
}
.right .ddddd {
  width: 100%;
  height: calc(100% - 0.52rem);
}
.ddddd span,
.ddddd a {
  font-size: 0.16rem;
}
.right_btn {
  position: absolute;
  height: 0.6rem;
  width: 100%;
  background-color: rgba(10, 25, 42, 0.65);
  bottom: 0;
}
.right_btn ul li {
  float: left;
  line-height: 0.6rem;
}
.right_btn ul li:nth-child(1) {
  width: 50%;
  text-align: center;
}
.right_btn ul li:nth-child(1) img {
  margin-right: 10%;
}
.imgoperate {
  width: 25%;
  height: 0.6rem;
  text-align: center;
  border-left: 1px solid #464646;
}
.right_btn li:last-child {
  width: 25%;
  text-align: center;
  border-left: 1px solid #464646;
  height: 0.6rem;
  padding: 0 0.2rem;
  text-align: center;
}
.showhide .spanellipsis {
  color: #99c9fa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.showhide .spancolor {
  color: red;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.showhide li p:hover {
  background-color: rgba(49, 86, 131, 0.2);
}
.markNoBorder {
  background-color: rgba(49, 86, 131, 0.2);
}
</style>
