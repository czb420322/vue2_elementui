<!--
 * @Author: your name
 * @Date: 2019-12-06 10:43:56
 * @LastEditTime: 2020-04-03 17:45:21
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\videoCombat\onlinecollect.1.vue
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
    <div class="mainleft" v-show="flag">
      <el-tabs type="border-card" @tab-click="handleClick" ref="tabs">
        <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> 视频</span>
            <div class="ss">
              <span>视频设备：</span>
              <el-input v-model="filterText" placeholder="请输入视频设备">
                  <!-- <el-button slot="append" icon="el-icon-search" @click="pop">搜索</el-button> -->
              </el-input>
            </div>
            <el-tree :data="videoList" :filter-node-method="filterNode" :props="defaultProps" @node-click="handleNodeClick" default-expand-all ref="tree2"></el-tree>
        </el-tab-pane>

        <el-tab-pane ref="tab5" v-if="false">
            <span slot="label"><i class="el-icon-date"></i> 车辆</span>
            <div class="ss">
            <span>车辆设备：</span>
            <el-input v-model="filterText" placeholder="请输入车辆设备">
                <!-- <el-button slot="append" icon="el-icon-search" @click="pop">搜索</el-button> -->
            </el-input>
            </div>
            <el-tree :data="mountList" :filter-node-method="filterNode" :props="defaultProps_1" @node-click="handleNodesClick"  ref="tree1"></el-tree>
        </el-tab-pane>

        <el-tab-pane v-if="false">
            <span slot="label"><i class="el-icon-date"></i> 人像</span>
            <div class="ss">
            <span>人像设备：</span>
            <el-input v-model="filterText1" placeholder="请输入人像设备">
                <!-- <el-button slot="append" icon="el-icon-search" @click="pop">搜索</el-button> -->
            </el-input>
            </div>
            <el-tree :data="faceList" :filter-node-method="filterNode" :props="defaultProps" @node-click="handleNodeClick" default-expand-all ref="tree3"></el-tree>
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i>社会面</span>
            <div class="ss">
                <span>社会面：</span>
                <el-input v-model="filterText2" placeholder="请输入社会面">
                </el-input>
            </div>
            <el-tree :data="societyData" :filter-node-method="filterNode" :props="defaultProps" @node-click="handleNodeClick" default-expand-all ref="tree4"></el-tree>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="mainright">
      <div class="mapContent" id="allmap"></div>
      <p @click="changemleft">收起设备</p>
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
let videoIco = require("@/assets/images/device/video.png");
let carIco = require("@/assets/images/device/car.png");
let faceIco = require("@/assets/images/device/face.png");
let RFIDIco = require("@/assets/images/device/RFID.png");

export default {
  data() {
    return {
      addshebei: this.$storage.getSession("642") != null, // 新增设备的按钮权限
      updateshebeibtn: this.$storage.getSession("643") != null, // 修改设备的按钮权限
      addkakou: this.$storage.getSession("645") != null, // 新增设备的按钮权限
      updatekakoubtn: this.$storage.getSession("647") != null, // 新增设备的按钮权限
      searchkakou: this.$storage.getSession("646") != null, // 新增设备的按钮权限
      outerVisible: false,
      index: 0, // 左侧菜单切换的索引
      flag: true, // 设备的收起和显示
      videoList: [], // 视频
      mountList: [], // 车辆
      faceList: [], // 人像
      societyData: [], // 社会面
      defaultProps: {
        children: "apes",
        label: "name"
      },
      defaultProps_1: {
        children: "apeTollgates",
        label: "name"
      },
      filterText: "", // 输入关键字
      filterText1:'',
      filterText2:'',
      filterText3:'',
      markerClusterer: null, // 点位聚合的对象
      point: {},
      showOther:false
    };
  },
  watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      },
      filterText1(val) {
        this.$refs.tree3.filter(val);
      },
      filterText2(val) {
        this.$refs.tree4.filter(val);
      },
      filterText3(val) {
        this.$refs.tree1.filter(val);
      }
  },
  components: {
    headers
  },
  computed: {
    ...mapState(["map", "videolist", "markerData"])
  },
  created() {
     this.queryVideoData();
     this.getDownLoad();
  },
  mounted() {
    this.InitMainMap('allmap'); //地图对象要在页面加载完了后再渲染  不能写在created里面4
  },
  mixins: [videoDown,maps],
  methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
    // 2. 创建标注点位  使用点位聚合
    createMarker(data, img) {
      let markers = [];
      this.removeMarker(); //先移除坐标
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i]["apes"].length; j++) {
          // ((x) => {
          var p0 = data[i]["apes"][j]["longitude"];
          var p1 = data[i]["apes"][j]["latitude"];
          var point = new BMap.Point(p0, p1);
          var myIcon = new BMap.Icon(img, new BMap.Size(33, 36), {});
          var marker = new BMap.Marker(point, {
            // offset: new BMap.Size(0, -20),
            icon: myIcon
          });
          marker.id = data[i]["apes"][j]["shebeiId"];
          marker.data = data[i]["apes"][j];
          markers.push(marker);
          if(this.index == 0){
            this.addallmarker(marker, point);
          }
          else if(this.index == 2){
            this.addallmarker1(marker, point);
          }
           else if(this.index == 3){
            this.addallmarker2(marker, point);
          }

          this.map.addOverlay(marker);
        }
      }
      // 获取所有的点位
      let allOverlay = this.map.getOverlays();
      //创建点位聚合的对象
      if (this.markerClusterer != null) {
        this.markerClusterer.clearMarkers();
        this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
          markers: markers
        }); //所有标注创建完以后建立点聚合
      } else {
        this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
          markers: markers
        });
      }
    },
    addallmarker(marker, point) {
      let opts = {
        width: 200, // 信息窗口宽度
        height: 130, // 信息窗口高度
        title: '视频设备详情' // 信息窗口标题
      }
      let content = `<div>
                      <p>设备名称：${marker.data.name}</p>
                      <p>设备经度：${marker.data.longitude}</p>
                      <p>设备纬度：${marker.data.latitude}</p>
                      <p id="upload">上传视频</p>
                      <p id='down'>下载视频</p>
                      </div>`
      let infoWindow = new BMap.InfoWindow(content, opts)
       marker.addEventListener('click', () => {
            this.map.openInfoWindow(infoWindow, point) //开启信息窗口
            var upload = document.getElementById('upload')
            var down = document.getElementById('down')
            upload.onclick = () => {
              sessionStorage.setItem('shebeiId',marker.data.shebeiId)
              sessionStorage.setItem('caseUuid','')
              let url ="http://127.0.0.1:60000/DxHandler.js?cbk=onOpenWindows&req=10000000-0000-0000-0000-000000000000";
              let g_socket = document.createElement("script");
              g_socket.src = url;
              document.body.appendChild(g_socket);
            }
            down.onclick = () => {
            }
        });
    },
    addallmarker1(marker, point) {
      let opts = {
        width: 200, // 信息窗口宽度
        height: 130, // 信息窗口高度
        title: '视频设备详情' // 信息窗口标题
      }
      let content = `<div>
                      <p>设备名称：${marker.data.name}</p>
                      <p>设备经度：${marker.data.longitude}</p>
                      <p>设备纬度：${marker.data.latitude}</p>
                      <p id="upload">上传视频111</p>
                      <p id='down'>下载视频1111</p>
                      </div>`
      let infoWindow = new BMap.InfoWindow(content, opts)
       marker.addEventListener('click', () => {
            this.map.openInfoWindow(infoWindow, point) //开启信息窗口
            var upload = document.getElementById('upload')
            var down = document.getElementById('down')
            upload.onclick = () => {
              sessionStorage.setItem('shebeiId',marker.data.shebeiId)
              sessionStorage.setItem('caseUuid','')
              let url ="http://127.0.0.1:60000/DxHandler.js?cbk=onOpenWindows&req=10000000-0000-0000-0000-000000000000";
              let g_socket = document.createElement("script");
              g_socket.src = url;
              document.body.appendChild(g_socket);
            }
            down.onclick = () => {
            }
        });
    },
    addallmarker2(marker, point) {
      let opts = {
        width: 200, // 信息窗口宽度
        height: 130, // 信息窗口高度
        title: '视频设备详情' // 信息窗口标题
      }
      let content = `<div>
                      <p>设备名称：${marker.data.name}</p>
                      <p>设备经度：${marker.data.longitude}</p>
                      <p>设备纬度：${marker.data.latitude}</p>
                      <p id="upload">上传视频</p>
                      </div>`
      let infoWindow = new BMap.InfoWindow(content, opts)
       marker.addEventListener('click', () => {
            this.map.openInfoWindow(infoWindow, point) //开启信息窗口
            var upload = document.getElementById('upload')
            upload.onclick = () => {
              sessionStorage.setItem('shebeiId',marker.data.shebeiId)
              sessionStorage.setItem('caseUuid','')
              let url ="http://127.0.0.1:60000/DxHandler.js?cbk=onOpenWindows&req=10000000-0000-0000-0000-000000000000";
              let g_socket = document.createElement("script");
              g_socket.src = url;
              document.body.appendChild(g_socket);
            }
        });
    },
    // 3。 创建坐标之前先清空地图上的所有坐标
    removeMarker() {
      this.map.clearOverlays();
    },
    // 4. 点击左侧菜单触发的时间 让坐标动起来
    handleNodeClick(data) {
      let allOverlay = this.map.getOverlays(); // 获取当前标注的个数
      for (let i = 0; i < allOverlay.length; i++) {
        if (data.shebeiId === allOverlay[i].id) {
          // 给点击的当前点设置一个跳跃的点
          allOverlay[i].setAnimation(BMAP_ANIMATION_BOUNCE);
          //1s后停止跳跃
          setTimeout(function() {
            allOverlay[i].setAnimation(null);
          }, 1000);
        }
      }
    },
    handleNodesClick(data) {
     let allOverlay = this.map.getOverlays(); // 获取当前标注的个数
      for (let i = 0; i < allOverlay.length; i++) {
        if (data.kakouId === allOverlay[i].id) {
          // 给点击的当前点设置一个跳跃的点
          allOverlay[i].setAnimation(BMAP_ANIMATION_BOUNCE);
          //1s后停止跳跃
          setTimeout(function() {
            allOverlay[i].setAnimation(null);
          }, 1000);
        }
      }
    },
    // 2 创建坐标点
    createMount(data) {
      let markers = [];
      this.removeMarker(); //先移除坐标
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i]["apeTollgates"].length; j++) {
          (x => {
            let p0 = data[i]["apeTollgates"][j]["longitude"];
            let p1 = data[i]["apeTollgates"][j]["latitude"];
            let point = new BMap.Point(p0, p1);
            let myIcon = new BMap.Icon(carIco, new BMap.Size(33, 36), {});
            let marker = new BMap.Marker(point, { icon: myIcon });
            marker.id = data[i]["apeTollgates"][j]["kakouId"];
            marker.data = data[i]["apeTollgates"][j];
            markers.push(marker);
            this.addAllMarkerClick(marker, point);
            //添加标注到地图上
            this.map.addOverlay(marker);
          })(i);
        }
      }
      let allOverlay = this.map.getOverlays();
      //创建点位聚合的对象
      if (this.markerClusterer != null) {
        this.markerClusterer.clearMarkers();
        this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
          markers: markers
        }); //所有标注创建完以后建立点聚合
      } else {
        this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
          markers: markers
        });
      }
    },
    addAllMarkerClick (marker, point) {
      let opts = {
        width: 200, // 信息窗口宽度
        height: 100, // 信息窗口高度
        title: '卡口信息' // 信息窗口标题
      }
      let _this=this
      marker.addEventListener('click', function () {
        let kakouId = this.data.kakouId
          let content = `<div>
                          <p>卡名名称：${marker.data.name}</p>
                          <p>卡口地区：${marker.data.place}</p>
                          <p id="doculue">上传图片附件</p>
                          <input type='file' id="inputFile" class="inputFile">
                          </div>`
          let infoWindow = new BMap.InfoWindow(content, opts)
          _this.map.openInfoWindow(infoWindow, point) //开启信息窗口
          var inputFile = document.getElementById('inputFile')
          inputFile.onchange = () => {
            let file = document.getElementById('inputFile').files[0];
              let formdata = new FormData();
              formdata.append('file', file)
              formdata.append('tollgateId',kakouId)

              _this.$http({url:'vsas/collection/offline/tollgate',method:'post',data:formdata}).then(res=>{
                if(res.data.code == 200){
                }

              })

          }
        })
    },
    // // 5点击卡口ID进行跳跃
    // handleNodesClick(data) {
    //   let allOverlay = this.map.getOverlays(); // 获取当前标注的个数
    //   for (let i = 0; i < allOverlay.length; i++) {
    //     if (data.kakouId === allOverlay[i].data.kakouId) {
    //       // 给点击的当前点设置一个跳跃的点
    //       allOverlay[i].setAnimation(BMAP_ANIMATION_BOUNCE);
    //       //1s后停止跳跃
    //       setTimeout(function() {
    //         allOverlay[i].setAnimation(null);
    //       }, 1000);
    //     }
    //   }
    // },
    // 8设备的收起和显示
    changemleft (e) {
      this.flag = !this.flag
      if (this.flag === true) {
        e.target.textContent = '收起设备';
      if (this.index == 0) {
         this.InitMainMap('allmap');
        this.queryVideoData()
      } else if (this.index == 1) {
         this.InitMainMap('allmap');
        this.queryMoutDevice()
      } else if (this.index == 2) {
         this.InitMainMap('allmap');
        this.queryFaceData()
      } else if (this.index == 3) {
         this.InitMainMap('allmap');
        this.querySocietyData()
      }
      } else {
        this.InitMainMap('allmap');
         if (this.index == 0) {
            this.InitMainMap('allmap');
          this.queryVideoData()
        } else if (this.index == 1) {
           this.InitMainMap('allmap');
          this.queryMoutDevice()
        } else if (this.index == 2) {
           this.InitMainMap('allmap');
          this.queryFaceData()
        } else if (this.index == 3) {
           this.InitMainMap('allmap');
          this.querySocietyData()
        }
        e.target.textContent = '显示设备';
      }
    },
    // 获取视频的信息
    queryVideoData() {
      this.$http.post("/sms/ape/selectByVideo").then(res => {
        if (res.data.code === 200) {
          this.videoList = res.data.data;
          this.InitMainMap('allmap');
          this.createMarker(this.videoList, videoIco); // 页面加载的时候加载坐标点
        }
      });
    },
    // 卡口信息
    queryMoutDevice() {
      this.$http.post("/sms/apeTollgate/search").then(res => {
        if (res.data.code === 200) {
          this.mountList = res.data.data;
          this.InitMainMap('allmap');
          this.createMount(this.mountList); //加载标注
        }
      });
    },
    // 人像
    queryFaceData() {
      this.$http.post("/sms/ape/selectByPortrait").then(res => {
        if (res.data.code === 200) {
          this.faceList = res.data.data;
          this.createMarker(this.faceList, faceIco); // 页面加载的时候加载坐标点
        }
      });
    },
    // 社会面
    querySocietyData() {
      this.$http.post("/sms/ape/selectBySociety").then(res => {
        if (res.data.code === 200) {
          this.societyData = res.data.data;
          this.createMarker(this.societyData, RFIDIco); // 页面加载的时候加载坐标点
        }
      });
    },
    // 切换tab栏重新加载地图
    handleClick(tab, event) {
      this.index = tab.index;
      this.$store.dispatch("changeDeviceType", tab["index"]); //设置地图对象到vueX 中
      if (tab.index == 0) {
        this.queryVideoData();
        this.InitMainMap('allmap'); //重新加载地图
      } else if (tab.index == 1) {
        this.querySocietyData();
        this.InitMainMap('allmap'); //重新加载地图
      } else if (tab.index == 2) {
        this.queryFaceData();
        this.InitMainMap('allmap'); //重新加载地图
      } else if (tab.index == 3) {
        // this.mountSubmit=false;
        this.querySocietyData();
        this.InitMainMap('allmap'); //重新加载地图
      }
    },
  }
};
</script>

<style scoped>
@import "../../assets/css/commom.css";
/* .mapContent >>> .BMap_bubble_title{
  background-color: red;
} */
.onlinecoll >>> .el-dialog {
  margin-top: 10vh;
}
.onlinecoll .el-dialog__header {
  background-color: #f3f6f9;
  font-size: 0.16rem;
}
::-webkit-scrollbar {
  width: 0.1rem;
  height: 0.1rem;
}

::-webkit-scrollbar-thumb {
  border-radius: 0.1rem;
  background-color: #e7e9ee;
  /* box-shadow: inset 0 0 5px #000; */
}

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
}
footer img {
  vertical-align: middle;
}
.kakoutitle {
  font-size: 0.16rem;
  color: #409eff;
}
.kakouinfo li span:first-child {
  color: #303133;
}
.main {
  width: 100%;
  position: absolute;
  top: 0.6rem;
  bottom: 0rem;
  left: 0px;
  overflow: auto;
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
.ss {
  font-size: 0.14rem;
  height: 0.5rem;
  color: #c5c5c5;
}
.ss >>> .el-input-group {
  width: 100%;
  height: 0.3rem;
  margin-top: 0.1rem;
  font-size: 0.14rem;
}
.ss >>> .el-input__inner {
  height: 0.3rem;
}
.ss >>> .el-button {
  padding: 0.14rem 0.2rem;
}
.mainleft >>> .el-tabs__item {
  padding: 0 0.16rem;
  height: 0.4rem;
  line-height: 0.4rem;
}
.mainleft >>> .el-tabs__item:nth-child(2) {
  padding-left: 0.16rem;
}
.mainleft >>> .el-tabs__item:last-child {
  padding-right: 0.16rem;
}
.mainleft >>> .el-tabs__item span {
  font-size: 0.14rem;
}
.mainleft >>> .el-tabs__nav-prev,
.mainleft >>> .el-tabs__nav-next {
  line-height: 0.44rem;
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
}
.el-tree >>> .el-tree-node__label {
  font-size: 0.14rem;
  color: #c5c5c5
}

.dialog1 >>> .el-dialog__header,
.dialog2 >>> .el-dialog__header,
.dialog3 >>> .el-dialog__header {
  background-color: #f3f6f8;
  padding: 0.2rem 0.2rem 0.1rem;
}
.dialog1 >>> .el-dialog__title,
.dialog2 >>> .el-dialog__title,
.dialog3 >>> .el-dialog__title {
  font-size: 0.18rem;
}
.dialog1 /deep/ .el-dialog,
.dialog2 /deep/ .el-dialog {
  margin-top: 10vh !important;
}

.dialog1 >>> .el-dialog__body,
.dialog2 >>> .el-dialog__body,
.dialog3 >>> .el-dialog__body {
  border-bottom: 1px solid #d5dade;
  padding: 0.3rem 0.2rem;
  font-size: 0.14rem;
}

#allmap >>> .BMap_bubble_content #details,
#allmap >>> .BMap_bubble_content #upload,
#allmap >>> .BMap_bubble_content #down,
#allmap >>> .BMap_bubble_content #downdetails,
#allmap >>> .BMap_bubble_content #doculue {
  color: #409eff !important;
}
#allmap >>> .BMap_bubble_content .inputFile{
  position: absolute;
  bottom: 12px;
  opacity: 0;
}

 .el-tabs--border-card,.el-tree{
     background-color: #0F243C;
  }
  .el-tabs--border-card{
    border: 1px solid #0C3465;
  }
  .el-tabs--border-card /deep/ .el-tabs__header{
    background-color: #0F243C;
    border: 0px solid #000;
  }
  .el-tabs--border-card /deep/ .el-tabs__header .el-tabs__item.is-active{
  background-color: #152E4C;
  border-right-color: #0F243C;
  border-left-color: #0F243C;
  border-top-color: #1C5DA7;
  box-sizing: border-box;
  }
   .el-tree >>> .el-tree-node__content:hover,
  .el-tree >>> .el-tree-node:focus>.el-tree-node__content{
    color: #409eff !important;
    background: #0C3465;
  }

</style>
