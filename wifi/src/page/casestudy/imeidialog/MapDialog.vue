<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      @open="opendia"
      top="90px"
      class="mapdialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="100%"
    >
      <div id="imeiMapContent"></div>
      <div class="map-dialog-btn-warpper" v-if="isShowBtn">
        <div class="map-dialog-btn" @click="drawReact">
          <div class="map-dialog-btn-draw"></div>
        </div>
        <div class="map-dialog-btn" @click="closeDraw">
          <div class="map-dialog-btn-move"></div>
        </div>
        <div class="map-dialog-btn" @click="clearDrawing">
          <div class="map-dialog-btn-clear"></div>
        </div>
      </div>
      <i class="el-icon-close map-dialog-close" @click="closeMapDialog"></i>
      <img class="dingwei" src="../../../assets/case/quickPos.png" title="刷新" @click="mapRefresh">
    </el-dialog>
  </div>
</template>

<script>
import maps from "../../../api/realvideo/map.js";
let linshi = require("@/assets/images/device/temporary.png");
let video = require("@/assets/images/device/video.png");
let pick = require("@/assets/images/device/pick.png");
let RFIDIco = require("@/assets/images/device/RFID.png");
let cased = require("@/assets/images/device/duang.png");
let info = require("@/assets/images/device/info.png");
let kakou = require("@/assets/images/device/kakou.png");
export default {
  data() {
    return {
      dialogVisible: false,
      styleOptions: {
        isOpen: true, //是否开启绘制模式
        enableDrawingTool: false, //是否显示工具栏
        enableCalculate: false, //开启测量面积、距离
        drawingToolOptions: {
          anchor: BMAP_ANCHOR_TOP_LEFT, //位置
          offset: new BMap.Size(5, 5) //偏离值
        },
        rectangleOptions: {
          strokeColor: "red", // 边线颜色。
          fillColor: "rgba(255,0,0,.3)", // 填充颜色。当参数为空时，圆形将没有填充效果。
          strokeWeight: 3, // 边线的宽度，以像素为单位。
          strokeOpacity: 0.8, // 边线透明度，取值范围0 - 1。
          fillOpacity: 0.6, // 填充的透明度，取值范围0 - 1。
          strokeStyle: "solid" // 边线的样式，solid或dashed。
        } //矩形的样式
      },
      overlays: [], // 存放框选点位的数组
      isShowBtn: false,
      drawingManager: ""
    };
  },
  mixins: [maps],
  watch: {
    ismapDialog(val) {
      this.dialogVisible = val;
    }
  },
  props: {
    ismapDialog: Boolean,
    imeiMapType: {
      type: String,
      default: ""
    },
    pathList: {
      type: Array
    },
    aaList: {
      type: Array
    },
    ownPoint: {
      type: Array
    },
    anfadian: {
      type: Object
    }
  },
  methods: {
    //关闭模态框
    closeMapDialog() {
      if (this.imeiMapType == "set") {
        this.$emit("getMapData", this.overlays);
        this.clearDrawing();
      } else {
        this.clearDrawing();
        this.$emit("setImsiPageSize", 10);
      }
      this.isShowBtn = false;
      this.$parent.ismapDialog = false;
    },
    //打开模态框
    opendia() {
      this.$nextTick(() => {
        // 初始化地图
        this.InitImeiMap("imeiMapContent");
        // 打开弹层
        this.openHandler();
      });
    },
    drawReact: function() {
      let _this = this;
      this.drawingManager = new BMapLib.DrawingManager(
        _this.imeiDialogMap,
        _this.styleOptions
      );
      let overlaycomplete = e => {
        let allData = e.overlay.getPath();
        let obj = {};
        obj.minLatitude = allData[3].lat;
        obj.maxLatitude = allData[1].lat;
        obj.minLongitude = allData[3].lng;
        obj.maxLongitude = allData[1].lng;
        _this.overlays.push(obj);
      };
      this.drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE);
      this.drawingManager.addEventListener("overlaycomplete", overlaycomplete);
    },
    // 重置地图
    mapRefresh() {
      // 初始化地图
      this.InitImeiMap("imeiMapContent");
      if (this.imeiMapType == "set") {
        this.allPointMap();
      } else if (this.imeiMapType == "see") {
        this.darwLine(); // 判断是否基站数据导入轨迹画线
      }
    },
    //移动
    closeDraw() {
      if (this.drawingManager != "") {
        this.drawingManager.close(); //关闭绘制
      }
    },
    // 打开弹层
    openHandler() {
      if (this.imeiMapType == "set") {
        this.isShowBtn = true;
        this.allPointMap();
      } else if (this.imeiMapType == "see") {
        this.darwLine(); // 判断是否基站数据导入轨迹画线
      } else {
        this.isShowBtn = false;
      }
    },
    // 所有点位
    allPointMap() {
      let myIcon = new BMap.Icon(RFIDIco, new BMap.Size(33, 36), {});
      let myIcon1 = new BMap.Icon(cased, new BMap.Size(35, 36), {});
      let myInfo = new BMap.Icon(info, new BMap.Size(35, 36), {});
      let mykakou = new BMap.Icon(kakou, new BMap.Size(35, 36), {});
      let linshi1 = new BMap.Icon(linshi, new BMap.Size(35, 36), {});
      let skynet = new BMap.Icon(video, new BMap.Size(35, 36), {});
      if (this.anfadian.cameraName == "案发点") {
        let point1 = new BMap.Point(
          this.anfadian.longitude,
          this.anfadian.latitude
        );
        let marker1 = new BMap.Marker(point1, {
          offset: new BMap.Size(6, -13),
          icon: myIcon1
        });
        this.imeiDialogMap.addOverlay(marker1);
        this.imeiDialogMap.centerAndZoom(
          // 设置案发点为中心点
          new BMap.Point(this.anfadian.longitude, this.anfadian.latitude),
          sessionStorage.getItem("bmapLevel")
        );
      }
      for (let i = 0; i < this.ownPoint.length; i++) {
        var label = new BMap.Label(this.ownPoint[i].cameraName, {
          offset: new BMap.Size(10, 32)
        });
        let p0 = this.ownPoint[i].longitude;
        let p1 = this.ownPoint[i].latitude;
        let point = new BMap.Point(p0, p1);
        let showIcon;
        if (this.ownPoint[i].cameraType == 1) {
          showIcon = skynet;
        } else if (this.ownPoint[i].cameraType == 4) {
          showIcon = myIcon;
        } else if (this.ownPoint[i].cameraType == 5) {
          showIcon = linshi1;
        } else if (this.ownPoint[i].cameraType == 6) {
          showIcon = myInfo;
        } else if (this.ownPoint[i].cameraType == 8) {
          showIcon = mykakou;
        } else {
          showIcon = myIcon;
        }
        let marker = new BMap.Marker(point, {
          offset: new BMap.Size(6, -13),
          icon: showIcon
        });
        marker.setLabel(label);
        this.imeiDialogMap.addOverlay(marker);
      }
    },
    // 清除地图覆盖物
    clearDrawing() {
      this.overlays = [];
      this.imeiDialogMap.clearOverlays();
      this.allPointMap();
    },
    // 轨迹画线
    darwLine() {
      let myIcon = new BMap.Icon(pick, new BMap.Size(33, 36), {});
      let arr = [];
      let num = "";
      for (let i = 0; i < this.pathList.length; i++) {
        var label = new BMap.Label(this.pathList[i].name, {
          offset: new BMap.Size(10, 32)
        });
        num = new BMap.Point(
          Number(this.pathList[i].longitude),
          Number(this.pathList[i].latitude)
        );
        arr.push(num);
        let marker = new BMap.Marker(num, {
          offset: new BMap.Size(6, -13),
          icon: myIcon
        });
        marker.setLabel(label);
        this.imeiDialogMap.addOverlay(marker);
      }
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
      this.imeiDialogMap.addOverlay(marker); //将标记添加到地图中
      marker = new BMap.Marker(arr[arr.length - 1]); //终点marker
      iconc = new BMap.Icon("/static/images/dest.png", new BMap.Size(60, 60), {
        offset: new BMap.Size(5, 5),
        imageOffset: new BMap.Size(5, 10)
      }); //终点icon
      marker.setIcon(iconc);
      marker.setTop(true);
      this.imeiDialogMap.addOverlay(marker);
      if (this.pathList.length > 1) {
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
        this.imeiDialogMap.addOverlay(polyline);
      }
      this.imeiDialogMap.setViewport(arr);
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../assets/css/commom.css";

.mapdialog.el-dialog__wrapper /deep/ .el-dialog .el-dialog__header {
  display: none;
}
.mapdialog.el-dialog__wrapper {
  overflow: hidden;
}

.mapdialog.el-dialog__wrapper /deep/ .el-dialog {
  margin: 0;
}
.mapdialog.el-dialog__wrapper /deep/ .el-dialog .el-dialog__body {
  border: 0 !important;
  padding: 0 !important;
  height: 845px;
}

.mapdialog .el-dialog {
  border: 0;
}
.map-dialog-close {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 20px;
  z-index: 99;
  background: #074668;
  color: #fff;
  width: 0.25rem;
  height: 0.25rem;
  cursor: pointer;
}

.map-dialog-close:before {
  line-height: 0.25rem;
  margin-left: 3px;
}
#imeiMapContent {
  width: 100%;
  height: 100%;
}

.map-dialog-warpper {
  position: absolute;
}

.map-dialog-warpper.gs-dialog-wrapper .el-dialog__header {
  display: none;
}

.map-dialog-warpper.gs-dialog-wrapper .el-dialog .el-dialog__body {
  border: 0 !important;
  padding: 0 !important;
}

.map-dialog-warpper.el-dialog__wrapper .el-dialog {
  border: 0;
}

.map-dialog-btn-warpper {
  position: absolute;
  width: 6rem;
  height: 0.5rem;
  z-index: 99;
  bottom: 0.3rem;
  left: 50%;
  transform: translateX(-50%);
}

.map-dialog-btn {
  width: 0.49rem;
  height: 0.49rem;
  cursor: pointer;
  background-color: #113254;
  margin-left: 1rem;
  float: left;
  border-radius: 4px;
}

.map-dialog-btn-draw {
  width: 100%;
  height: 100%;
  background: url("../../../assets/images/carJudged/frame-1.png") center
    no-repeat;
  background-size: 100% 100%;
}

.map-dialog-btn-draw:hover {
  background: url("../../../assets/images/carJudged/frame-1-h.png") center
    no-repeat;
  background-size: 100% 100%;
}

.map-dialog-btn-move {
  width: 100%;
  height: 100%;
  background: url("../../../assets/images/carJudged/move-1.png") center
    no-repeat;
  background-size: 100% 100%;
}

.map-dialog-btn-move:hover {
  background: url("../../../assets/images/carJudged/move-1-h.png") center
    no-repeat;
  background-size: 100% 100%;
}

.map-dialog-btn-clear {
  width: 100%;
  height: 100%;
  background: url("../../../assets/images/carJudged/delete-1.png") center
    no-repeat;
  background-size: 100% 100%;
}

.map-dialog-btn-clear:hover {
  background: url("../../../assets/images/carJudged/delete-1-h.png") center
    no-repeat;
  background-size: 100% 100%;
}

.map-dialog-close {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 20px;
  z-index: 99;
  background: #074668;
  color: #fff;
  width: 0.25rem;
  height: 0.25rem;
  cursor: pointer;
}

.map-dialog-close:before {
  line-height: 0.25rem;
  margin-left: 3px;
}
.dingwei {
  position: absolute;
  top: 252px;
  right: 38px;
  cursor: pointer;
}
</style>
