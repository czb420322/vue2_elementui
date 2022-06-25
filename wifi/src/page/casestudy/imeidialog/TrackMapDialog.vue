<template>
  <el-dialog
    class="mapdialog"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
    width="100%"
    top="80px"
    @open="opendia"
    @close="closeHandler"
  >
    <div id="imeiMapContent"></div>
    <i class="el-icon-close map-dialog-close" @click="closeMapDialog"></i>
    <img class="dingwei" src="../../../assets/case/quickPos.png" title="刷新" @click="mapRefresh">
  </el-dialog>
</template>

<script>
import maps from "../../../api/realvideo/map.js";
let pick = require("@/assets/images/device/pick.png");
let RFIDIco = require("@/assets/images/device/RFID.png");
export default {
  name: "MapDialog",
  data() {
    return {
      dialogVisible: false
    };
  },
  props: {
    mapVisible: Boolean,
    locusList: {
      type: Array
    }
  },
  mixins: [maps],
  watch: {
    mapVisible(val) {
      this.dialogVisible = val;
    }
  },
  computed: {},
  mounted() {},
  methods: {
    //打开模态框
    opendia() {
      this.$nextTick(() => {
        // 初始化地图
        this.InitImeiMap("imeiMapContent");
        this.darwLine(); // 轨迹画线
      });
    },
    // 关闭弹层
    closeMapDialog() {
      this.closeHandler();
      this.clearDrawing();
    },
    mapRefresh() {
      this.InitImeiMap("imeiMapContent");
      this.darwLine();
    },
    // 清除地图覆盖物
    clearDrawing() {
      this.imeiDialogMap.clearOverlays();
    },
    // 轨迹画线
    darwLine() {
      let myIcon = new BMap.Icon(pick, new BMap.Size(33, 36), {});
      let arr = [];
      let num = "";
      for (let i = 0; i < this.locusList.length; i++) {
        num = new BMap.Point(
          Number(this.locusList[i].longitude),
          Number(this.locusList[i].latitude)
        );
        arr.push(num);
        let marker = new BMap.Marker(num, {
          offset: new BMap.Size(6, -13),
          icon: myIcon
        });
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
        this.imeiDialogMap.addOverlay(polyline);
        this.imeiDialogMap.setViewport(arr);
      }
    },

    // 关闭弹层
    closeHandler() {
      this.dialogVisible = false;
      this.$emit("closeMap", false);
    }
  }
};
</script>

<style scoped>
@import "../../../assets/css/commom.css";
#imeiMapContent {
  width: 100%;
  height: 100%;
}
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
  height: 855px;
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
.dingwei {
  position: absolute;
  top: 252px;
  right: 38px;
  cursor: pointer;
}
</style>
