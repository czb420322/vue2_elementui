<!--
 * @Author: your name
 * @Date: 2021-06-08 16:48:02
 * @LastEditTime : 2021-08-09 15:06:47
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev-changshu-noBigData\vacp-wfes\src\page\VideoStructPlatform\caseInfo\MarkPool.vue
 -->
<template>
  <div class="onlinecoll">
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/videoStrucPlat',query:{menuCode:700}}">首页 ></router-link>
      <p class="sysname" @click="goTasklist">&nbsp;任务管理 ></p>
      <p class="sysname">&nbsp;布控详情</p>
      <p class="clicklink">
        <router-link tag="span" :to="{path:'/videoStrucPlat',query:{menuCode:700}}">首页</router-link>
        <router-link
          tag="span"
          :to="{path:'/videoStrucPlat/resourceManage',query:{menuCode:704}}"
        >涉案视频管理</router-link>
        <span @click="goTasklist">任务管理</span>
        <router-link
          tag="span"
          :to="{path:'/videoStrucPlat/semanticSearch',query:{menuCode:702}}"
        >特征搜索</router-link>
        <router-link tag="span" :to="{path:'/videoStrucPlat/searchPrint',query:{menuCode:703}}">以图搜图</router-link>
        <router-link
          tag="span"
          :to="{path:'/videoStrucPlat/videoRetrieval',query:{menuCode:710}}"
        >检索查询</router-link>
        <router-link tag="span" :to="{path:'/videoStrucPlat/caseList',query:{menuCode:711}}">案件管理</router-link>
      </p>
    </div>
    <div class="LabelMarkList">
      <div class="searchCondition">
        <div class="result-left">
          <div class="result-left-list">
            <p class="resultTitle">布控设备：{{deviceNumber}}台 报警人次：{{totalCount}}人 设备开始时间：{{beginTime}}</p>
            <ul class="viseInfoList">
              <li v-for="(item,index) in ViseResultList" :key="index">
                <div class="firstImage">
                  <img :src="item.sourceImgUrl" class="sceneImage" style="object-fit:contain">
                </div>
                <div class="secondImage">
                  <div class="secondImage1">
                    <img :src="item.faceurl" alt class="target1" style="object-fit:contain">
                  </div>
                  <div class="secondImage2">
                    <p :title="item.faceName">人脸名称：{{item.faceName}}</p>
                    <p :title="item.idCard" class="overhid">身份证号：{{item.idCard}}</p>
                    <p :title="item.faceDbName">底库名称：{{item.faceDbName}}</p>
                  </div>
                </div>
                <div class="threeImage">
                  <div class="threeImage1">
                    <img :src="item.traceImgUrl" alt class="target2" style="object-fit:contain">
                  </div>
                  <div class="threeImage2">
                    <p :title="item | getDatetime">时间：{{item | getDatetime }}</p>
                    <p :title="item.deviceName">设备：{{item.deviceName}}</p>
                    <p>相似度值：{{item.score | filterSimila }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <el-pagination
            style="float: right;margin-right: 0.1rem;"
            :background="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </div>

        <div class="result-right">
          <div class="selectbox">
            <el-select v-model="userName" placeholder="请选择用户" @change="changeTargetTrack">
              <el-option label="全部" value></el-option>
              <el-option
                v-for="(item,index) in options"
                :label="item.faceName"
                :key="index"
                :value="item.faceName"
              ></el-option>
            </el-select>
          </div>
          <div class="boxMap" id="resourceMap">
            <div
              v-show="showarrPoisArr"
              v-for="(item,index) in mapInfoList"
              class="stytic"
              :key="index"
              :id="'strickPic'+index"
            >
              <div class="styticImgBox">
                <img style="object-fit:contain" class="oneimg" :src="item.traceImgUrl">
              </div>
              <span>{{item.updateTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let videoIco = require("@/assets/images/device/video.png");
import initresourceMap from "../../api/VideoStructPlatform/resourcemap.js";
import moment from "moment";
export default {
  data() {
    return {
      currentPage: 1,
      pageSizes: [4, 8, 12],
      pageSize: 4,
      totalCount: 0,
      ViseResultList: [], //布控结果
      userName: "", //用户名
      options: [], //用户名列表
      drawingManager: null,
      styleOptions: {
        strokeColor: "red", // 边线颜色。
        fillColor: "rgba(255,0,0,.3)", // 填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3, // 边线的宽度，以像素为单位。
        strokeOpacity: 0.8, // 边线透明度，取值范围0 - 1。
        fillOpacity: 0.6, // 填充的透明度，取值范围0 - 1。
        strokeStyle: "solid" // 边线的样式，solid或dashed。
      },
      trackList: [],
      searchRunAllList: [], //
      runSearchList: [],
      mapInfoList: [],
      mapTopList: [], // 展示在点位上的所有图片,
      showarrPoisArr: false,
      taskUuid: "", //任务id
      deviceNumber: "", //设备数量
      beginTime: "", //设备开始时间
      unit: ""
    };
  },
  watch: {},
  filters: {
    filterSimila(val) {
      return (val * 100).toFixed(2) + "%";
    },
    getDatetime(val) {
      if (val.startTime != null) {
        let nowplaytime;
        nowplaytime = new Date(val.startTime).getTime();
        let alltime = Number(nowplaytime) + Number(val.appearTime);
        return moment(alltime).format("YYYY-MM-DD HH:mm:ss");
      }else {
         return "暂无"
      }
    }
  },
  mixins: [initresourceMap],
  components: {},
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCurrentDeployList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCurrentDeployList();
    },

    clearMap() {
      this.resourcemap.clearOverlays();
    },
    // 轨迹画线
    darwLine(arrlist) {
      this.mapInfoList = [];
      this.clearMap();
      let newarr = arrlist;
      newarr = newarr.sort((a, b) =>
        new Date(b.list[0].startTime).getTime() + b.list[0].appearTime <
        new Date(a.list[0].startTime).getTime() + a.list[0].appearTime
          ? 1
          : -1
      );
      //创建点位
      let myIcon = new BMap.Icon(videoIco, new BMap.Size(33, 36), {});
      let num = "";
      let arr = []; //轨迹数组
      let obj = {};
      for (let i = 0; i < newarr.length; i++) {
        var label = new BMap.Label(newarr[i].cameraName, {
          offset: new BMap.Size(10, 32)
        });
        num = new BMap.Point(
          Number(newarr[i].longitude),
          Number(newarr[i].latitude)
        );
        arr.push(num);
        let marker = new BMap.Marker(num, {
          offset: new BMap.Size(6, -13),
          icon: myIcon
        });
        marker.setLabel(label);
        this.resourcemap.addOverlay(marker);
        obj = Object.assign(newarr[i].list[0], newarr[i]);
        this.mapInfoList.push(obj);
      }
      //添加起点和终点图标
      let marker = new BMap.Marker(arr[0]); //起点marker
      let iconc = new BMap.Icon(
        "/static/images/start.png",
        new BMap.Size(60, 60),
        {
          offset: new BMap.Size(5, 5),
          imageOffset: new BMap.Size(5, 10)
        }
      ); //地点图标
      marker.setIcon(iconc);
      marker.setTop(true);
      this.resourcemap.addOverlay(marker); //将标记添加到地图中
      marker = new BMap.Marker(arr[arr.length - 1]); //终点marker
      iconc = new BMap.Icon("/static/images/dest.png", new BMap.Size(60, 60), {
        offset: new BMap.Size(5, 5),
        imageOffset: new BMap.Size(5, 10)
      }); //终点icon
      marker.setIcon(iconc);
      marker.setTop(true);
      this.resourcemap.addOverlay(marker);

      if (arr.length > 1) {
        let sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
          scale: 0.6,
          strokeColor: "#fff",
          strokeWeight: "2"
        });
        let icons = new BMap.IconSequence(sy, "1%", "5%");
        let polyline = new BMap.Polyline(arr, {
          // enableEditing: true, //是否启用线编辑，默认为false
          enableClicking: true, //是否响应点击事件，默认为true
          strokeColor: "#48affe",
          strokeWeight: 6,
          strokeOpacity: 0.99,
          icons: [icons] //折线内的图标样式
        });
        this.resourcemap.addOverlay(polyline);
      }
      let viewPort = this.resourcemap.getViewport(arr);
      this.resourcemap.centerAndZoom(viewPort.center, viewPort.zoom - 1);
      //执行路数
      let icon = new BMap.Icon(
        "/static/images/Mario1.png",
        new BMap.Size(52, 55),
        {
          anchor: new BMap.Size(15, 15)
        }
      );
      this.loadLuShu(icon, arr, 1);

      if (this.mapInfoList.length) {
        setTimeout(() => {
          this.loadArrPoisArr(this.mapInfoList);
        }, 1000);
        // 缩放地图开始
        this.resourcemap.addEventListener("zoomstart", evt => {
          this.iszoom = true;
          this.loadArrPoisArr(this.mapInfoList);
        });
        // 缩放地图结束
        setTimeout(() => {
          this.resourcemap.addEventListener("zoomend", evt => {
            this.loadArrPoisArr(this.mapInfoList);
          });
        }, 200);
        this.resourcemap.addEventListener("dragging", evt => {
          this.loadArrPoisArr(this.mapInfoList);
        });
        // 拖拽地图结束
        this.resourcemap.addEventListener("dragend", evt => {
          this.loadArrPoisArr(this.mapInfoList);
        });
      }
      this.$nextTick(() => {
        setTimeout(() => {
          this.showarrPoisArr = true;
        }, 1000);
      });
    },
    computedDistance(arr) {
      let distance = 0;
      for (let i = 0; i < arr.length - 1; i++) {
        distance += this.resourcemap.getDistance(arr[i], arr[i + 1]);
      }
      return Math.ceil(distance / 5);
    },
    // 路书执行方法
    loadLuShu(icon, arrPois, type) {
      //type的值 ： 1是人，2是骑车人，3是车， 5是专门针对以车搜车的   4是为人脸预备的
      let enableRotation = false;
      if (type == 1 || type == 4) {
        enableRotation = false;
      } else if (type == 2 || type == 3 || type == 5) {
        enableRotation = true;
      }
      let speed = this.computedDistance(arrPois);
      let blueCar = new BMapLib.LuShu(this.resourcemap, arrPois, {
        defaultContent: "", //"从浔阳路到滨江路"
        autoView: enableRotation, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
        icon: icon,
        speed: speed,
        landmarkPois: [],
        // landmarkPois: [{lng:arrPois[1].lng, lat: arrPois[1].lat, html: '到了哪一站', pauseTime: 1}],
        enableRotation: enableRotation //是否设置marker随着道路的走向进行旋转
      });
      blueCar.start();
    },
    //处理轨迹展示的原始数据
    handleMarklist(type) {
      // 轨迹的数组
      this.mapInfoList = [];
      // 对当前选中的数据按照点位ID进行分类，组成二维数组
      this.mapTopList = Object.values(
        this.runSearchList.reduce((res, item) => {
          res[item.deviceUuid]
            ? res[item.deviceUuid].push(item)
            : (res[item.deviceUuid] = [item]);
          return res;
        }, {})
      );
      let obj = {};
      // 将数组去重，取出其中的list的当前项目
      this.mapInfoList = this.runSearchList.reduce((cur, next) => {
        obj[next.deviceUuid]
          ? ""
          : (obj[next.deviceUuid] = true && cur.push(next));
        return cur;
      }, []);
      for (let i in this.mapInfoList) {
        // console.log(this.mapInfoList[i],"this.mapInfoList[i]");
        this.mapInfoList[i].traceImgUrl = this.mapInfoList[
          i
        ].list[0].traceImgUrl;
      }
      // 目前先针对以图搜图排序
      this.runSearchList = this.runSearchList.sort((a, b) =>
        new Date(b.startTime).getTime() + b.appearTime <
        new Date(a.startTime).getTime() + a.appearTime
          ? 1
          : -1
      );
      if (this.mapInfoList.length) {
        //处理数据的经纬度
        let datas = [];
        let num = "";
        for (let i = 0; i < this.runSearchList.length; i++) {
          num = new BMap.Point(
            Number(this.runSearchList[i].longitude),
            Number(this.runSearchList[i].latitude)
          );
          datas.push(num);
        }
        // 如果经纬度一样，则随机把经纬度添加一点
        for (let i = 0; i < datas.length - 1; i++) {
          if (
            datas[i].lng == datas[i + 1].lng &&
            datas[i].lat == datas[i + 1].lat
          ) {
            datas[i].lat = datas[i].lat + Math.random() / 10000;
            datas[i].lng = datas[i].lng + Math.random() / 10000;
          }
        }
      }

      if (this.runSearchList.length) {
        setTimeout(() => {
          this.loadArrPoisArr(this.mapInfoList);
        }, 1000);
        // 缩放地图开始
        this.resourcemap.addEventListener("zoomstart", evt => {
          this.iszoom = true;
          this.loadArrPoisArr(this.mapInfoList);
        });
        // 缩放地图结束
        setTimeout(() => {
          this.resourcemap.addEventListener("zoomend", evt => {
            this.loadArrPoisArr(this.mapInfoList);
          });
        }, 200);
        this.resourcemap.addEventListener("dragging", evt => {
          this.loadArrPoisArr(this.mapInfoList);
        });
        // 拖拽地图结束
        this.resourcemap.addEventListener("dragend", evt => {
          this.loadArrPoisArr(this.mapInfoList);
        });
      }
      this.$nextTick(() => {
        this.showarrPoisArr = true;
      });
    },
    // 判断是否执行嫌疑目标轨迹快照渲染
    loadArrPoisArr(arrPoisArr) {
      // this.isTrajectory = false;
      if (arrPoisArr.length > 0) {
        for (let i = 0; i < arrPoisArr.length; i++) {
          this.pointPixel(
            "strickPic" + i,
            arrPoisArr[i].longitude,
            arrPoisArr[i].latitude
          );
        }
      }
    },
    //定位坐标
    pointPixel(classname, lng, lat) {
      var point = new BMap.Point(lng, lat);
      var pixel = this.resourcemap.pointToPixel(point);
      this.$nextTick(() => {
        setTimeout(() => {
          document.getElementById(classname).style.left = pixel.x - 15 + "px";
          document.getElementById(classname).style.top = pixel.y - 155 + "px";
        }, 100);
      });
    },
    // //展示轨迹
    // showTrack(data) {
    //   this.searchRunAllList = data;
    //   for (let i = 0; i < this.searchRunAllList.length; i++) {
    //     for (let j = 0; j < this.searchRunAllList[i].list.length; j++) {
    //       this.searchRunAllList[i].list[j].type = "track";
    //       this.searchRunAllList[i].list[j].flagIdx = true;
    //     }
    //   }
    // },

    //当前布控任务详情
    getCurrentDeployList() {
      let data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        taskDeployId: this.taskUuid,
        faceName: this.userName
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/task/deploy/queryFace", data).then(res => {
        // console.log(res, "res");
        if (res.data.code == 200) {
          this.ViseResultList = res.data.data.list;
          this.totalCount = res.data.data.totalCount;
        }
      });
    },
    //去任务列表
    goTasklist() {
      this.$router.push({
        path: "/videoStrucPlat/taskManage",
        query: {
          menuCode: 701,
          flagsearch: 1
        }
      });
    },
    getFaceDbName() {
      let data = {
        taskDeployId: this.taskUuid
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/task/deploy/queryNameList", data).then(res => {
        this.options = res.data.data;
      });
    },
    //切换人员目标时刷新轨迹
    changeTargetTrack() {
      this.showarrPoisArr = false;
      this.clearMap();
      if (this.userName != "") {
        let data = {
          taskDeployId: this.taskUuid,
          faceName: this.userName,
          caseUuid: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
        };
        data = this.$qs.stringify(data);
        this.$http
          .post("vsas/task/deploy/queryDeployDevice", data)
          .then(res => {
            if (res.data.code == 200) {
              if (res.data.data.length > 0) {
                let result = res.data.data;
                let arr = [];
                for (let i in result) {
                  if (result[i].list != null) {
                    arr.push(result[i]);
                  }
                }
                this.darwLine(arr);
                this.getCurrentDeployList();
              } else {
                this.$notify({
                  type: "warning",
                  message: "暂无轨迹",
                  position: "bottom-right",
                  duration: 3000
                });
                return;
              }
            }
          });
      }
    }
  },
  mounted() {
    //加载地图
    this.InitMap("resourceMap");
    this.taskUuid = this.$route.query.taskuuid;
    (this.deviceNumber = this.$route.query.deviceNumber),
      (this.beginTime = this.$route.query.beginTime),
      //获取当前布控任务详情
      this.getCurrentDeployList();
    //获取底库人员名称函数
    this.getFaceDbName();
    this.unit = document.documentElement.clientWidth / 1920;
  }
};
</script>
<style scoped>
@import "../../assets/css/commom.css";

.onlinecoll {
  width: 100%;
  min-width: 1200px;
  position: absolute;
  top: 0.6rem;
  bottom: 0px;
  left: 0px;
}

.LabelMarkList {
  width: 100%;
  height: calc(100% - 0.6rem);
}

.searchCondition {
  padding-bottom: 0.2rem;
  width: 98%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.14rem;
  padding-left: 0.2rem;
  margin-top: 0.2rem;
  /* border: 1px solid red; */
  margin: 0 auto;
}

.resultTitle {
  color: #f56c6c;
  font-size: 0.18rem;
  text-align: center;
  margin: 0.05rem 0;
}

.result-left {
  width: 40%;
  height: 100%;
  /* border: 1px solid green; */
}

.result-right {
  width: 58%;
  height: 100%;
  /* border: 1px solid blue; */
}

.result-left-list {
  width: 100%;
  height: 95%;
}

.viseInfoList {
  width: 100%;
  height: calc(100% - 0.6rem);
  border: 1px solid #102d50;
  /* border: 1px solid #99c9fa; */
  overflow-y: auto;
}

.viseInfoList li {
  float: left;
  width: 45%;
  height: 3.4rem;
  border: 1px solid #102d50;
  margin-left: 3%;
  padding: 0.2rem 0;
}

.viseInfoList li p {
  width: 1.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.firstImage {
  width: 100%;
  height: 40%;
  /* border: 1px solid red; */
  position: relative;
}

.sceneImage {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 100%;
}

.secondImage {
  float: left;
  width: 45%;
  height: 50%;
  margin-left: 0.2rem;
  margin-top: 0.1rem;
}

.secondImage1 {
  height: 1.15rem;
}

.secondImage1 img {
  width: 100%;
  height: 100%;
}
.threeImage {
  float: left;
  width: 40%;
  height: 50%;
  margin-left: 0.09rem;
  margin-top: 0.1rem;
}

.threeImage1 {
  height: 1.15rem;
}

.threeImage1 img {
  width: 100%;
  height: 100%;
}

.secondImage p {
  display: inline-block;
  overflow: hidden;
}

.selectbox {
  width: 100%;
  height: 7%;
}

.selectbox .el-select {
  top: 0.1rem;
}

.boxMap {
  width: 98%;
  height: 90%;
  margin: auto;
}

.stytic {
  position: absolute;
  width: 80px;
  height: 123px;
  z-index: 10;
  border: 1px solid #155eb5;
  padding: 0.05rem;
  background-color: rgba(82, 160, 229, 0.9);
}

.carsimg {
  position: absolute;
}

.stytic .styticImgBox {
  width: 90%;
  height: 80px;
  border: 1px solid #155eb5;
  position: absolute;
  overflow: hidden;
}

.styticImgBox i {
  width: 10px;
  height: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  cursor: pointer;
  color: #fff;
}

.stytic span {
  position: absolute;
  bottom: 0.05rem;
  color: white;
  font-size: 12px;
}

.oneimg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>
