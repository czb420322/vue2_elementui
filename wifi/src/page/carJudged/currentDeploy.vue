<template>
  <div class="wrapper">
    <!-- <div class="topNav">
      <router-link tag="div"  class="nav-item" :to="{path:'/carJudged',query:{menuCode:300}}">车辆研判</router-link>
      <div class="nav-item nav-item-search">布控实时展示</div>
    </div> -->
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt="">
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/carJudged',query:{menuCode:300}}">车辆研判 > </router-link>
      <p class="sysname">&nbsp;布控实时展示</p>
    </div>
    <div class="contentMain">
      <!--左侧搜索-->
      <ul class="searchCondition">
        <li class="searchTitle">
          <div class="stIcon"></div>
          布控实时展示
        </li>

        <li style="text-align: center">
          <img src="../../assets/images/carJudged/currentDeploy-icon1.png" alt=""><br />
          <span style="margin-top: 20px;line-height: 150%"> 您可以通过<router-link style="text-decoration: underline;color: #0a83f1" :to="{path:'/carJudged/currentDeploy/historyWarn',query:{menuCode:300}}">历史预警</router-link>查看历史数据</span>
        </li>
        <li style="text-align: center">
          <img src="../../assets/images/carJudged/currentDeploy-icon2.gif" alt=""><br />
          <div style="margin-top: 20px;color: #0a83f1">布控实时监控中...</div>
        </li>
        <li style="text-align: center">
          <el-button @click="changePage" class="searchBtn" type="primary" icon="el-icon-bell">查看历史预警信息
          </el-button>
        </li>
      </ul>

      <div class="content">
        <div id="mapContent"></div>
        <img class="dingwei" src="../../assets/case/quickPos.png" @click="loadMap();initPoint();" />
        <div class="point">
          <span>经度：{{point.lng}}</span><br>
          <span>纬度：{{point.lat}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//日期选择
import vehicle from "../../api/vehicle/vehicle.js";
import mapFun from "../../api/vehicle/mapFun.js";
import "../../common/laydate/laydate.js";
import BMap from "BMap";
import footerThird from "../../components/footer_third";
import Header from "../../components/header";
import "../../../static/js/eventWrapper";
export default {
  components: {
    Header,
    footerThird
  },
  data() {
    return {
      map: null, //地图对象
      drawingManager: null,
      overlays: [],
      /*dataList: [],*/
      dataObj: {},

      newpoints: [],
      filterText: "",
      isBar: false,
      tollgateIdsArr: [], //总体选中的卡口列表
      tollArr: [], //地图选中的卡口列表
      tollTreeArr: [], // 菜单选中的卡口列表
      defaultProps: {
        children: "apeTollgates",
        label: "name"
      },
      i: 0,

      radio: "1",
      timeFlag: false,
      checked: false,
      longitude: 116.404,
      latitude: 39.915,
      showFirst: false,
      showSecond: false,
      carBrand: "不限",
      carModel: "不限",
      carYearType: "不限",
      deployObj: "",
      fromHistory: false
    };
  },

  mixins: [vehicle, mapFun],
  methods: {
    //跳转到历史预警页面
    changePage() {
      this.$router.push({
        path: "/carJudged/currentDeploy/historyWarn",
        query: { menuCode: 300 }
      });
    },
    getCaKouData() {
      if (this.deployObj !== "" && this.deployObj !== null) {
        if (this.deployObj.kakouId) {
          this.$http({
            url: "sms/apeTollgate/findById/" + this.deployObj.kakouId,
            method: "get"
          }).then(res => {
            if (res.statusText === "OK" && res.data.code === 200) {
              this.dataObj = res.data.data;
              if (this.dataObj !== "" && this.dataObj !== null) {
                //if(!this.fromHistory){
                this.warnShake();
                //}
                this.getNewpoints();
              }
            }
          });
        }
      }
    },
    getNewpoints() {
      let _this = this;
      _this.newpoints = [];
      _this.newpoints.push({
        kakouId: _this.dataObj.kakouId,
        longitude: _this.dataObj.longitude,
        latitude: _this.dataObj.latitude
      });
      this.initWarnPoint();
    },
    //初始话历史预警点位
    initWarnPoint() {
      let _this = this;
      let pointMessage = _this.deployObj;
      let kaKouMessage = _this.dataObj;
      let markers = [];
      let carIco = require("@/assets/images/device/car.png");
      for (let i = 0; i < this.newpoints.length; i++) {
        //newpoints写死的数据
        let point = this.newpoints[i];
        let point_marker = new BMap.Point(
          point["longitude"],
          point["latitude"]
        );
        var myIcon = new BMap.Icon(carIco, new BMap.Size(33, 36), {});
        var marker = new BMap.Marker(point_marker, {
          offset: new BMap.Size(0, -20),
          icon: myIcon
        });
        //let marker = new BMap.Marker(point_marker);
        marker.disableMassClear();
        markers.push(marker);
        //弹窗对象
        let opts = {
          width: 150,
          height: 330,
          title: "预警信息"
        };
        //弹窗的内容
        let content = `<div class='warnDialog'>
            <div class='warnDialogImg' style=""><img src="${
              pointMessage.targetImageUrl
            }" alt="" id="caseImg"></div>
            <div class='warnDialogtext' style="color:#606266">
              <div><span style="font-weight:bold">车牌：</span>${
                pointMessage.plateNoInfo == "@"
                  ? "未识别"
                  : pointMessage.plateNoInfo
              }</div>
              <div><span style="font-weight:bold">类型：</span>${
                pointMessage.vehicleKineInfo
              }</div>
              <div><span style="font-weight:bold">品牌：</span>${
                pointMessage.vehicleBrandInfo
              }</div>
              <div><span style="font-weight:bold">车型：</span>${
                pointMessage.vehicleModelInfo
              }</div>
              <div><span style="font-weight:bold">颜色：</span>${
                pointMessage.vehicleColor
              }</div>
              <div><span style="font-weight:bold">区域：</span>${
                kaKouMessage.place
              }</div>
              <div><span style="font-weight:bold">地点：</span>${
                kaKouMessage.name
              }</div>
              <div><span style="font-weight:bold">时间：</span>${
                pointMessage.triggerTime
              }</div>
              <div>
                <button id="addCompare" class="warnDialogtextBtnLeft"><i class="el-icon-plus" style="margin-right: 5px"></i>加入对比池</button>
                <button id="goToImgSearch" class="warnDialogtextBtnRight"><i class="el-icon-search" style="margin-right: 5px" ></i>以图搜车</button>
              </div>
            </div>
          </div>`;
        let info_Window = new BMap.InfoWindow(content, opts);
        this.map.addOverlay(marker);
        marker.addEventListener("click", function() {
          this.openInfoWindow(info_Window);
        });
        EventWrapper.addListener(info_Window, "open", function(e) {
          var addCompare = document.getElementById("addCompare");
          var goToImgSearch = document.getElementById("goToImgSearch");
          addCompare.onclick = () => {
            _this.goToCompare();
          };
          goToImgSearch.onclick = () => {
            _this.goToImgSearch();
          };
        });
        marker.openInfoWindow(info_Window);
      }

      //点位聚合对象
      if (this.markerClusterer != null) {
        //判断markerClusterer对象是否存在
        this.markerClusterer.clearMarkers();
        this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
          markers: markers
        }); //所有标注创建完以后建立点聚合
      } else {
        this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {
          markers: markers
        }); //所有标注创建完以后建立点聚合
      }
    },
    /* warnDialog() {
        this.$alert('暂时没有警报信息', '预警信息', {
          confirmButtonText: '确定',
          callback: action => {
            /!*            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });*!/
          }
        });
      },*/
    //边框闪烁的方法
    warnShake() {
      let wrapper = document.getElementsByClassName("wrapper")[0];
      wrapper.className = "wrapper";
      wrapper.className += " " + "wrapperShadow";
    },
    // 加入对比池
    goToCompare() {
      let vehicleId = this.deployObj.objectId;
      let data = {
        userId: this.$storage.getSession("userInfo").userId,
        clueType: 2,
        source: 1,
        clueId: vehicleId
      };
      data = this.$qs.stringify(data); //post请求分离data
      this.$http.post("tvas/my-clue-pool/add", data).then(res => {
        if (res.data.code == 200) {
          //this.$alert("已加入线索池","消息提示");
           this.$notify({
                        type: 'success',
                        message: '已加入线索池！',
                        position: 'bottom-right',
                        duration: 3000
                      });
         // layer.alert("已加入线索池！", { icon: 6, title: "消息提示" });
        } else {
           this.$notify({
                        type: 'error',
                        message: '加入线索池失败！',
                        position: 'bottom-right',
                        duration: 3000
                      });
          //this.$alert("加入线索池失败","消息提示");
          //layer.alert("加入线索池失败！", { icon: 5, title: "消息提示" });
        }
      });
    },
    //跳转以图搜车
    goToImgSearch() {
      let img = this.deployObj.targetImageUrl;
      let routeData = this.$router.resolve({
        name: "imgSearchCar",
        query: { imgUrl: img, menuCode: 111 }
      });
      window.open(routeData.href, "_blank");
    }
  },
  mounted: function() {
    let _this = this;
    _this.getLocalCoordinate();
    _this.loadMap();
    this.deployObj = this.deployWarnMessage;

    if (sessionStorage.getItem("deployData")) {
      this.deployObj = JSON.parse(sessionStorage.getItem("deployData"));
      this.fromHistory = true;
      sessionStorage.removeItem("deployData");
    }
    //新点位对象赋值给卡口对象
    this.getCaKouData(); //在地图上显示该点位
  },

  computed: {
    //预警信息
    deployWarnMessage: function() {
      return this.$parent.warnMessage;
    }
  },

  watch: {
    deployWarnMessage: {
      handler(newValue, oldValue) {
        this.deployObj = newValue; //新点位对象赋值给卡口对象
        this.fromHistory = false;
        this.getCaKouData(); //在地图上显示该点位)
      },
      deep: true
    }
  }
};
</script>


<style scoped>
@import url("../../assets/css/commom.css");
.wrapper {
  position: absolute;
  width: 100%;
  min-width: 1200px;
  top: 0.6rem;
  height: calc(100% - 0.6rem);
  box-sizing: border-box;
  /*user-select: none;*/
  overflow: hidden;
  z-index: 999;
}
.wrapperShadow {
  animation: glow 500ms ease-out infinite alternate;
  padding: 3px;
}

@keyframes glow {
  0% {
    border: 1px solid red;
    box-shadow: inset 0 0 0 red;
  }
  100% {
    border: 1px solid red;
    box-shadow: inset 0 0 40px red;
  }
}
.topInfo {
  border-bottom: 2px solid #213147;
}
.contentMain{
  width: 100%;
  height: 100%;
  padding: 0.2rem;
}
.searchCondition {
  width: 3.7rem;
  float: left;
  height: calc(100% - 0.54rem);
  overflow-y: auto;
  border:3px solid #1a3659;
}
.searchCondition li {
  color: #99c9fa;
}

.searchCondition .el-button {
  font-size: 0.14rem;
}
.searchTitle {
  width: 100%;
  height: 0.54rem;
  color: white;
  /* background-color: #409EFF; */
  background: rgba(20, 57, 96, 0.33);
  display: flex;
  align-items: center;
  font-size: 0.16rem;
  margin-top: 0;
  padding-left: 0.2rem;
}

.stIcon {
  width: 2px;
  height: 0.16rem;
  background-color: #99c9fa;
  display: inline-block;
  margin-right: 0.1rem;
}

li {
  width: 100%;
  font-size: 12px;
  margin-top: 30px;
}

.itemIcon img {
  width: 100%;
  height: 100%;
}

.content {
  height: calc(100% - 0.54rem);
  position: relative;
  width: calc(100% - 3.7rem);
  display: flex;
  border:3px solid #1a3659;
  border-left: 0px solid red;
  padding: 0.12rem;
}

#mapContent {
  width: 100%;
  height: 100%;
}

#mapContent >>> .BMap_bubble_content {
  width: 100%;
  height: 90% !important;
}

#mapContent >>> .warnDialog {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#mapContent >>> .warnDialogImg {
  width: 220px;
  height: 140px;
  overflow: hidden;
}

#mapContent >>> .warnDialogImg img {
  width: 100%;
  height: 100%;
}

#mapContent >>> .warnDialogtext {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin-top: 4px;
}
#mapContent >>> .warnDialogtext .warnDialogtextBtnLeft {
  margin-top: 5px;
  background-color: #3f84ed;
  color: #ffffff;
  border: none;
  font-size: 12px;
  display: none;
  text-align: center;
  width: 100px;
  height: 20px;
  border-radius: 5px;
  line-height: 20px;
  cursor: pointer;
}
#mapContent >>> .warnDialogtext .warnDialogtextBtnRight {
  margin-top: 5px;
  /*margin-left: 20px;*/
  width: 80px;
  height: 20px;
  border-radius: 5px;
  line-height: 20px;
  border: none;
  text-align: center;
  background-color: #47c5c2;
  font-size: 12px;
  color: #ffffff;
  cursor: pointer;
}

.point {
  position: absolute;
  left: 0.22rem;
  bottom: 0.12rem;
  width: 2rem;
  font-size: 0.14rem;
}
.dingwei {
  position: absolute;
  top: 210px;
  right: 38px;
}
/*.wrapper /deep/ .el-message-box__wrapper{
  z-index: 999999;
}*/
</style>

