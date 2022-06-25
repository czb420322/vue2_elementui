<template>
  <div v-show="dialogVisible" class="phoneTrack">
    <div class="navBar">
      <p>
        重合电围数：
        <input
          v-model="coincide"
          oninput="value=value.replace(/[^\d]/g,'')"
          type="number"
          class="coincide"
        >
      </p>
      <div class="searchtime">
        <span>开始时间：</span>
        <input
          readonly
          type="text"
          id="beginTrack"
          ref="beginDateCI"
          v-model="beginTime"
          placeholder="请输入开始时间"
        >
        <i class="el-icon-circle-close" @click="clear('beginDateCI')"></i>
      </div>
      <div class="searchtime">
        <span>结束时间：</span>
        <input
          readonly
          type="text"
          id="endTrack"
          ref="endDateCI"
          v-model="endTime"
          placeholder="请输入结束时间"
        >
        <i class="el-icon-circle-close" @click="clear('endDateCI')"></i>
      </div>
      <span class="el-icon-close closePhone" @click="closeTrack"></span>
      <p style="margin:0.05rem" align="center">
        <el-button
          class="gs-search-btn el-icon-search searchBtn"
          size="small"
          @click="currentPage = 1;getEscapeList()"
        >&nbsp;&nbsp;查询</el-button>
        <el-button
          class="gs-search-btn"
          type="primary"
          size="small"
          v-no-more-click
          :disabled="showExport"
          @click="exportTrack"
        >导出轨迹</el-button>
      </p>
      <el-table :data="locusData" border style="width: 100%;margin-bottom: 0.1rem" height="2.5rem">
        <el-table-column show-overflow-tooltip prop="imsi" label="IMSI码" align="center" width="120">
          <template slot-scope="scope">
            <span
              class="showDecoration"
              @click="openMap(scope.$index,scope.row,1);"
            >{{scope.row.imsi}}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="times" label="重合电围数" align="center"></el-table-column>
        <el-table-column v-if="isShowBound" align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :class="scope.row.latAndlng[0].deleteFlag ? 'searchBtn' : 'beginBtn'"
              @click="handleBind('',scope.$index, scope.row,$event)"
            >{{ scope.row.latAndlng[0].deleteFlag ? '绑定' : '解绑'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :small="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="totalCount"
      ></el-pagination>
      <p v-if="trackProbe" style="margin-top:0.05rem">该轨迹中有{{trackPoint}}个探头和手机轨迹重合</p>
    </div>
  </div>
</template>
<script>
import beginEnd from "../api/realvideo/BenEedTime.js"; //时间插件的引入
export default {
  mixins: [beginEnd],
  data() {
    return {
      dialogVisible: false,
      options: [],
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      coincide: "", // 重合电围
      beginTime: "", // 开始时间
      endTime: "", // 结束时间
      trackPoint: 0, // 重合点位
      isShowBound: false, // 默认不显示操作
      locusData: [], // 存储的数据
      points: [], //经纬度
      trackProbe: false,
      showExport: true, // 是否禁用导出卷宗
      pathData: {}, // 导出轨迹数据
      suspicionUuids: "",
      ranges: 300,
      points: ""
    };
  },
  mounted() {},
  watch: {
    showPhoneTrack(val) {
      this.dialogVisible = val; //是否打开页面
      if (val) {
        this.OpenTheTime("#beginTrack", "#endTrack");
        document.getElementById("endTrack").value = "";
      } else {
        this.beginTime = "";
        this.endTime = "";
        this.trackPoint = 0;
        this.trackProbe = false;
        this.showExport = true;
      }
    },
    // 嫌疑目标下拉碰撞手机轨迹
    electricData(val) {
      this.isShowBound = val.showBound;
      this.suspicionUuids = val.sendUuids;
      this.ranges = val.ranges;
      this.points = val.pointes;
      this.coincide = "";
      this.pathData = {};
      this.getLongLat(val.pList.data); // 传递过滤数据
      if (this.locusData.length) {
        for (let i = 0; i < this.locusData.length; i++) {
          if (this.locusData[i].latAndlng[0].deleteFlag == false) {
            this.showExport = false;
            this.pathData = this.locusData[i]; // 导出轨迹时的数据
          }
        }
      }
      this.totalCount = val.pList.total; // 数据总数
    },
    // 以图搜图碰撞手机轨迹数据
    picTrackDate(val) {
      this.coincide = "";
      if (val.trackDate) {
        this.getLongLat(val.trackDate.data); // 传递过滤数据
        this.totalCount = val.trackDate.total; // 数据总数
      }
      this.points = val.pointCount;
      this.ranges = val.ranges;
      this.isShowBound = val.showBound;
      this.beginTime = val.beginTime;
      this.endTime = val.endTime;
    }
  },
  props: {
    showPhoneTrack: Boolean,
    electricData: Object,
    picTrackDate: Object
  },
  methods: {
    // 封装过滤数据的方法
    getLongLat(val) {
      this.locusData = [];
      let screen = [];
      let electric = [];
      for (let i = 0; i < val.length; i++) {
        for (const key in val[i]) {
          let obj = {};
          obj.imsi = key;
          obj.times = val[i][key].count;
          electric = val[i][key].list;
          this.locusData.push(obj);
          screen.push(electric);
        }
      }
      for (let i = 0; i < this.locusData.length; i++) {
        for (let k = i; k < screen.length; k++) {
          this.locusData[i].latAndlng = screen[i];
        }
      }
    },
    clear(node) {
      switch (node) {
        case "beginDateCI":
          this.beginTime = null;
          break;
        case "endDateCI":
          this.endTime = null;
          break;
      }
    },
    // 查询
    getEscapeList() {
      this.trackProbe = false;
      this.searchTrack(0);
    },
    // 调用查询方法
    searchTrack(sign) {
      let data;
      let benginDate;
      let end;
      if (sign == 0) {
        // 点击查询
        benginDate = this.beginTime;
        end = this.endTime;
      } else if (sign == 1) {
        // 绑定解绑
        benginDate = "";
        end = "";
      }
      data = {
        caseUuid: this.$route.query.caseUuid,
        suspicionUuids: this.suspicionUuids, // 嫌疑人id
        range: this.ranges, // 电围距离
        beginTime: benginDate, // 开始时间
        endTime: end, // 结束时间
        pageSize: this.pageSize,
        imsi: "",
        pointNum: this.coincide, // 重合电围数
        points: this.points, // 经纬度
        page: this.currentPage // 当前页
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/baseStation/collision", data).then(res => {
        if (res.data.code == 200) {
          if (res.data.total > 0) {
            this.totalCount = res.data.total; //数据总数
            this.getLongLat(res.data.data); // 调用封装的数据
          } else {
            this.$notify({
              type: "warning",
              message: "查询数据为空",
              position: "bottom-right",
              duration: 3000
            });
            this.locusData = [];
            this.totalCount = 0;
          }
        } else {
          this.$notify({
            type: "error",
            message: "获取数据失败",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    // 点击imei码打开地图
    openMap(index, row, num) {
      this.pathData = {};
      this.trackProbe = true;
      this.showExport = false;
      this.trackPoint = row.times; // 重合电围
      this.pathData = row; // 导出轨迹时的数据
      this.$emit("childByTrack", this.pathData, num); // 传值给父组件
    },
    // 绑定
    handleBind(flag, index, row, dom) {
      let data = {
        imsi: row.imsi, //imsi
        suspicionUuids: this.suspicionUuids, //嫌疑人id
        flag: flag, // 判断是否绑定嫌疑人
        caseUuid: this.$route.query.caseUuid // 案件id
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/baseStation/bindImsi", data).then(res => {
        if (res.data.code == 200) {
          this.searchTrack(1); // 绑定时先调查询方法刷新列表数据
          if (row.latAndlng[0].deleteFlag) {
            this.$notify({
              type: "success",
              message: "绑定成功",
              position: "bottom-right",
              duration: 3000
            });
            this.showExport = false;
            this.trackPoint = row.times; // 重合电围
            this.pathData = row; // 导出轨迹时的数据
            this.$emit("childByTrack", this.pathData, 1); // 传值给父组件
          } else {
            this.$notify({
              type: "success",
              message: "解绑成功",
              position: "bottom-right",
              duration: 3000
            });
            this.showExport = true;
            this.$parent.changeSuspicionObj(this.suspicionUuids, "", true);
          }
        } else if (res.data.code == 201) {
          this.$myconfirm({
            type: "提示",
            msg: "是否要覆盖这个imsi已经绑定的其他嫌疑人的记录？",
            icon: 1,
            btn: {
              ok: "确定",
              no: "取消"
            }
          })
            .then(() => {
              this.handleBind("1", index, row, dom); //覆盖这个imsi已经绑定的其他嫌疑人的记录
            })
            .catch(() => {
              console.log("no");
            });
        } else if (res.data.code == 202) {
          this.$myconfirm({
            type: "提示",
            msg: "是否要覆盖这个嫌疑人已绑定的其他imsi的记录？",
            icon: 1,
            btn: {
              ok: "确定",
              no: "取消"
            }
          })
            .then(() => {
              this.handleBind("1", index, row, dom); //覆盖这个嫌疑人已绑定的其他imsi的记录
            })
            .catch(() => {
              console.log("no");
            });
        } else {
          this.$notify({
            type: "error",
            message: "绑定失败",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    // 导出轨迹
    exportTrack() {
      if (!this.showExport) {
        // 判断导出绑定之后的轨迹
        this.$emit("childByTrack", this.pathData, 1); // 传值给父组件
        this.$nextTick(() => {
          this.$parent.cutTrack(); // 调用父组件方法
        });
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.searchTrack(0); // 调查询方法
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchTrack(0); // 调查询方法
    },
    // 重置
    emptyData() {
      this.beginTime = "";
      this.endTime = "";
      this.trackPoint = 0;
      this.trackProbe = false;
      this.locusData = [];
      this.totalCount = 0;
      this.$emit("emitPhoneTrack", false);
    },
    // 关闭
    closeTrack() {
      // 关闭时清空数据
      this.beginTime = "";
      this.endTime = "";
      this.trackPoint = 0;
      this.trackProbe = false;
      this.showExport = true;
      this.$emit("emitPhoneTrack", false);
      this.identifier = 0;
      this.totalCount = 0;
      this.$emit("resetTrack", 0);
      this.coincide = "";
      this.locusData = [];
      //   this.$parent.changeSuspicionObj(this.suspicionUuids); // 关闭时调用嫌疑目标下拉
    }
  }
};
</script>
<style scoped>
@import "../assets/css/commom.css";
.phoneTrack {
  width: 3.5rem;
  height: 4.8rem;
  position: absolute;
  top: 0.7rem;
  right: 0.9rem;
  background-color: rgba(37, 67, 100, 0.9);
  color: #99c9fa;
  z-index: 999;
}
.navBar {
  padding: 0.1rem 0.05rem;
}
.el-input {
  width: 1.4rem;
}
.closePhone {
  position: absolute;
  top: 0.15rem;
  right: 0.15rem;
  cursor: pointer;
}
.searchtime {
  margin-top: 0.1rem;
  padding: 0 0.1rem;
}

.searchtime input {
  width: 1.6rem;
  height: 0.3rem;
  padding: 0.05rem;
}
.searchtime .el-icon-circle-close {
  color: #e1e3e9;
  right: 0.25rem;
  position: relative;
  cursor: pointer;
}
.showDecoration {
  color: #4b9de8;
  cursor: pointer;
  text-decoration: underline;
}
.el-message-box {
  color: #99c9fa !important;
  background-color: #113254 !important;
}
.el-message-box__title {
  color: #99c9fa !important;
}
.el-message-box__content {
  color: #99c9fa;
}
.gs-search-btn {
  height: 28px;
  line-height: 14px;
  text-align: center;
  padding: 0 10px;
  color: #fff;
  font-size: 12px;
  border: 0;
  cursor: pointer;
  margin-left: 15px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.coincide {
  width: 1.4rem;
  height: 0.28rem;
}
</style>
