<!--
 * @Author: your name
 * @Date: 2020-11-27 16:32:37
 * @LastEditTime : 2020-12-15 09:27:51
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\page\casestudy\imeidialog\ImeiDialog.vue
 -->
<template>
  <div>
    <el-dialog
      title="基站数据展示-汇总列表"
      @close="closeHandler"
      :visible.sync="isVisible"
      @open="openHandler"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="false"
      width="10rem"
      top="13.5vh"
      class="imei-dialog-warpper"
    >
      <div class="content">
        <el-form ref="form" :model="formModel" v-if="isShow">
          <el-form-item label="IMEI码" prop="imeiNo">
            <!-- <el-input v-model="formModel.imeiNo" oninput="value=value.replace(/[^\d]/g,'')"></el-input> -->
            <el-input v-model="formModel.imeiNo"></el-input>
          </el-form-item>
          <el-form-item label="经过电围数量" prop="markerNum">
            <el-input-number v-model="formModel.markerNum" controls-position="right" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="IMSI个数" prop="imsiNum">
            <el-input-number v-model="formModel.imsiNum" controls-position="right" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="经过区域">
            <el-button type="primary passBtn" @click="setAreaHandler">设置区域</el-button>
          </el-form-item>
          <el-form-item label="感知时间" prop="startDate">
            <el-input
              id="baseStart1"
              readonly
              class="searchInput searchtime"
              v-model="formModel.startDate"
              placeholder="请选择开始时间"
            >
              <i slot="prefix" class="el-input__icon el-icon-time"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="--" prop="endDate">
            <el-input
              id="baseEnd1"
              readonly
              class="searchInput searchtime"
              v-model="formModel.endDate"
              placeholder="请选择结束时间"
            >
              <i slot="prefix" class="el-input__icon el-icon-time"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <button
              type="button"
              class="gs-search-btn el-icon-search searchBtn"
              @click="formModel.pageNo = 1;queryData()"
            >查询</button>
            <button type="button" class="gs-search-btn el-icon-refresh tryBtn" @click="reset">重置</button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table :data="tableData" v-if="isShow" style="height: 4.4rem">
          <el-table-column type="index" label="序号" width="70" align="center" header-align="center"></el-table-column>
          <el-table-column label="IMEI码" prop="IMEI" align="center" header-align="center">
            <template slot-scope="scope">
              <span
                class="showDecoration"
                v-if="scope.row.imei != ''"
                @click="rowHandler(scope.row)"
              >{{scope.row.imei}}</span>
              <span class="reveal" v-else>未知</span>
            </template>
          </el-table-column>
          <el-table-column
            label="经过电围数量"
            prop="markerNum"
            align="center"
            header-align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="IMSI个数"
            prop="imsiNum"
            align="center"
            header-align="center"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
        <div class="imei-info-warpper" v-if="!isShow">
          <div class="imei-info-title">IMEI码:{{infoImei}}</div>
          <div class="imei-info-count">
            <div class="imei-info-count-item" v-for="(item, index) in imsiData" :key="index">
              <div class="navBar">
                <div class="imei-info-count-item-title">
                  <span class="wharf">IMSI码：{{item.list[0].imsi}}</span>
                  <el-button
                    type="primary passBtn"
                    @click="mapHandler(index, item.list[0].imsi)"
                  >查看轨迹</el-button>
                </div>
                <el-table :data="item.list" :key="index" class="grid">
                  <el-table-column
                    type="index"
                    label="序号"
                    width="70"
                    align="center"
                    header-align="center"
                  ></el-table-column>
                  <el-table-column
                    label="电围名称"
                    prop="name"
                    align="center"
                    show-overflow-tooltip
                    width="200"
                    header-align="center"
                  ></el-table-column>
                  <el-table-column
                    label="感知时间"
                    prop="time"
                    align="center"
                    header-align="center"
                    show-overflow-tooltip
                  ></el-table-column>
                </el-table>
              </div>
              <el-pagination
                style="padding: 10px 20px; float: right; margin-top: 5px"
                slot="gsFooter"
                @current-change="handleCurrentChange($event, index, item.list[0].imsi)"
                :page-size="imsiPageSize"
                :current-page="imsiCurrentPage[index]"
                layout="total, prev, pager, next"
                :total="imsiTotal[index]"
              ></el-pagination>
            </div>
          </div>
          <div class="imei-info-back-btn">
            <el-button type="primary" class="cancleBtn" @click="backHandler">返回</el-button>
          </div>
        </div>
      </div>
      <pagination
        v-if="isShow"
        :total="totalNum"
        :current-page="formModel.pageNo"
        :page-size="formModel.pageSize"
        @sizeChange="imsiCurrentPage"
        @currentChange="imeiCurrentChange"
      ></pagination>
      <div slot="footer">
        <el-button type="primary" class="cancleBtn" @click.stop="isVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <map-dialog
      :ismapDialog="ismapDialog"
      :imeiMapType="imeiMapType"
      @getMapData="getMapData"
      :pathList="pathList"
      :ownPoint="ownPoint"
      :anfadian="anfadian"
    ></map-dialog>
  </div>
</template>

<script>
import beginEnd from "../../../api/realvideo/BenEedTime.js"; //时间
export default {
  name: "ImeiDialog",
  props: {
    imeiVisibleDialog: Boolean,
    caseUuid: {
      type: String,
      default: ""
    },
    pointList: {
      type: Array
    },
    deskPoint: {
      type: Object
    }
  },
  mixins: [beginEnd],
  inheritAttrs: false,
  data() {
    return {
      isVisible: false,
      pathList: [],
      ownPoint: [],
      anfadian: {},
      ismapDialog: false,
      imsiTotal: [0, 0],
      imsiPageSize: 10,
      imsiCurrentPage: [1, 1],
      mapVisible: false,
      imeiMapType: "",
      isShow: true,
      formModel: {
        caseUuid: this.caseUuid,
        imeiNo: "", //imei码
        markerNum: "", // 经过点位数量
        imsiNum: "", // imsi数量
        startDate: "", // 开始时间
        endDate: "", // 结束时间
        passArea: null, // 经过区域
        pageNo: 1,
        pageSize: 10
      },
      totalNum: 0,
      tableData: [],
      imsiData: [],
      imsiTitle: "",
      infoImei: ""
    };
  },
  components: {
    MapDialog: () => import("./MapDialog.vue")
  },
  created() {},
  watch: {
    imeiVisibleDialog(val) {
      this.isVisible = val;
    }
  },
  methods: {
    // 打开弹层
    openHandler() {
      this.queryData();
      this.isShow = true;
      this.$nextTick(() => {
        this.OpenTheTime99("#baseStart1", "#baseEnd1");
      });
    },
    // 每页条数切换
    imeiSizeChange(val) {
      this.formModel.pageSize = val;
      this.queryData();
    },
    // 分页切换
    imeiCurrentChange(val) {
      this.formModel.pageNo = val;
      this.queryData();
    },
    // 查询
    queryData() {
      if (this.formModel.imeiNo) {
        let reg = /^\d+$/;
        if (!reg.test(this.formModel.imeiNo)) {
          this.$notify({
            type: "warning",
            message: "IMEI码只能输入数字",
            position: "bottom-right",
            duration: 2000
          });
          return;
        }
      }
      if (this.formModel.startDate > this.formModel.endDate) {
        this.$notify({
          type: "warning",
          message: "结束时间不能小于开始时间",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.formModel.markerNum == 0) {
        this.formModel.markerNum = "";
      }
      if (this.formModel.imsiNum == 0) {
        this.formModel.imsiNum = "";
      }
      console.log(this.formModel.pageNo);
      let data = { ...this.formModel };
      console.log(this.formModel.pageNo);
      data = this.$qs.stringify(data);
      this.$http.post("vsas/baseStation/searchImei", data).then(res => {
        this.tableData = res.data.data.list;
        this.totalNum = res.data.data.totalCount;
      });
    },
    // 选择每页条数
    // handlerSelect(val) {
    //   this.pageOption.pageSize = val
    //   let pagination = {
    //     pageNo: this.pageOption.pageNo,
    //     pageSize: this.pageOption.pageSize
    //   }
    //   let data = { ...this.formModel, ...pagination }
    //   data = this.$qs.stringify(data);
    //   this.$http.post('vsas/baseStation/searchImei', data).then((res) => {
    //     this.pageOption.total = res.data.data.totalCount
    //     this.pageOption.pageNo = res.data.data.pageNum
    //     this.pageOption.pageSize = res.data.data.pageSize
    //   });
    // },

    // 当前页跳转
    handleCurrentChange(val, index, imsi) {
      this.imsiCurrentPage[index] = val;
      this.getPageData(this.imsiCurrentPage[index], imsi, index, val);
    },
    // 当前imsi列表翻页
    getPageData(pageNo, imsi, index, val) {
      let pagination = {
        caseUuid: this.caseUuid,
        pageNo: val,
        pageSize: 10,
        imsi: imsi,
        passArea: this.formModel.passArea // 经过区域
      };
      let data = { ...this.formModel, ...pagination };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/baseStation/imsiPage", data).then(res => {
        this.$set(this.imsiData, index, res.data.data);
      });
    },

    // 设置区域
    setAreaHandler() {
      this.ismapDialog = true;
      this.ownPoint = this.pointList;
      this.anfadian = this.deskPoint;
      this.imeiMapType = "set";
    },
    // // 跳转
    // jumpTo(pageNo) {
    //   this.pageOption.pageNo = parseInt(pageNo);
    //   console.log("当前是第" + pageNo + "页");
    //   // do something
    // },
    // 获取地图框选坐标
    getMapData(data) {
      this.formModel.passArea = JSON.stringify(data);
    },
    // 关闭查看轨迹页面，重置每页条数
    setImsiPageSize(data) {
      this.imsiPageSize = 10;
    },
    // 返回table列表
    backHandler() {
      window.axiosProArr.forEach((e, i) => {
        e.cancle();
        delete window.axiosProArr[i];
      });
      this.imsiData = [];
      this.isShow = !this.isShow;
      this.$nextTick(() => {
        this.OpenTheTime99("#baseStart1", "#baseEnd1");
      });
    },

    // 点击table行
    rowHandler(row) {
      this.imsiCurrentPage[0] = 1;
      this.imsiCurrentPage[1] = 1;
      this.imsiPageSize = 10;
      this.imsiData = [];
      this.infoImei = row.imei;
      this.isShow = !this.isShow;
      let pagination = {
        caseUuid: this.caseUuid,
        imeiNo: row.imei, //imei码
        markerNum: this.formModel.markerNum, // 经过点位数量
        imsiNum: this.formModel.imsiNum, // imsi数量
        startDate: this.formModel.startDate, // 开始时间
        endDate: this.formModel.endDate, // 结束时间
        passArea: this.formModel.passArea, // 经过区域
        pageNo: 1,
        pageSize: 10
      };
      let data = pagination;
      data = this.$qs.stringify(data);
      this.$http.post("vsas/baseStation/searchImsi", data).then(res => {
        if (res.data.code == 200) {
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].list.length > 0) {
              this.imsiData.push(res.data.data[i]);
            }
          }
          this.imsiData.forEach((v, k) => {
            this.imsiTotal[k] = v.totalCount;
            this.pageSize = v.pageSize;
          });
        }
      });
    },
    // 查看轨迹
    mapHandler(index, imsi) {
      //   this.imsiPageSize = 100;
      this.imeiMapType = "see";
      this.getPointData(imsi);
    },

    // 查看轨迹的数据请求
    getPointData(imsi) {
      let data = {
        imeiNo: this.infoImei,
        pageNo: 1,
        pageSize: 100,
        imsi: imsi,
        passArea: this.formModel.passArea, // 经过区域
        caseUuid: this.caseUuid
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/baseStation/imsiPage", data).then(res => {
        this.pathList = res.data.data.list;
        this.ismapDialog = true;
      });
    },

    // 分页条数切换
    sizeChange(val) {
      this.pageSize = val;
      // this.queryData();
    },

    // 当前页切换
    currentChange(val) {
      this.pageNo = val;
      // this.queryData();
    },

    reset() {
      this.formModel.imeiNo = ""; //imei码
      this.formModel.markerNum = ""; // 经过点位数量
      this.formModel.imsiNum = ""; // imsi数量
      this.formModel.startDate = ""; // 开始时间
      this.formModel.endDate = ""; // 结束时间
      this.formModel.passArea = null; // 经过区域
      this.formModel.pageNo = 1;
      this.formModel.pageSize = 10;
      let data = {
        caseUuid: this.caseUuid,
        imeiNo: "", //imei码
        markerNum: "", // 经过点位数量
        imsiNum: "", // imsi数量
        startDate: "", // 开始时间
        endDate: "", // 结束时间
        passArea: null, // 经过区域
        pageNo: 1,
        pageSize: 10
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/baseStation/searchImei", data).then(res => {
        this.tableData = res.data.data.list;
        this.totalNum = res.data.data.totalCount;
      });
    },

    // 关闭弹层
    closeHandler() {
      this.$parent.imeiVisibleDialog = false;
      this.formModel.imeiNo = ""; //imei码
      this.formModel.markerNum = ""; // 经过点位数量
      this.formModel.imsiNum = ""; // imsi数量
      this.formModel.startDate = ""; // 开始时间
      this.formModel.endDate = ""; // 结束时间
      this.formModel.passArea = null; // 经过区域
      this.formModel.pageNo = 1;
      this.formModel.pageSize = 10;
      this.$emit("childImeiDia", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/commom.css";

.el-dialog__body {
  height: 6.5rem;
}
.content .el-form-item {
  display: inline-block;
  margin-right: 10px;
  vertical-align: top;
  margin-bottom: 22px;
}
.content /deep/ .el-form-item__content {
  display: inline-block;
  vertical-align: top;
}

.content /deep/ .el-input-number.is-controls-right .el-input-number__decrease {
  border-bottom: 1px solid #134276;
  border-left: 1px solid #134276;
}
.content /deep/ .el-input-number__decrease,
.el-input-number__increase {
  background: #2f6098 !important;
  color: #fff !important;
}

.content /deep/ .el-input-number.is-controls-right .el-input-number__decrease,
.el-input-number.is-controls-right .el-input-number__increase {
  line-height: 12px !important;
}
.content /deep/ .el-input-number.is-controls-right .el-input-number__increase {
  border-bottom: 1px solid #134276;
  border-left: 1px solid #134276;
  line-height: 12px !important;
  background: #2f6098 !important;
  color: #fff !important;
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
.imei-info-title {
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 18px;
  color: #99c9fa;
}
.imei-info-count {
  width: 100%;
  height: 5.25rem;
  justify-content: center;
  display: flex;
}
.imei-info-count-item-title {
  color: #99c9fa;
}
.wharf {
  padding-left: 01rem;
  line-height: 0.42rem;
  float: left;
}
.imei-info-count-item-title .el-button {
  float: right;
  padding: 8px 20px;
}
.imei-info-count-item {
  width: 48%;
  margin-right: 1%;
  float: left;
}
.navBar {
  width: 100%;
  height: 4.8rem;
  overflow: hidden;
}
.content /deep/ .el-input__prefix {
  top: 0 !important;
}
.el-input-number {
  line-height: 28px;
}
.imei-info-back-btn {
  text-align: center;
}
.grid {
  margin-right: 5px;
}
.imei-dialog-warpper /deep/ .el-pagination .btn-prev {
  background-color: rgba(0, 0, 0, 0.25) !important;
  color: #409eff !important;
  border-radius: 3px;
}
.imei-dialog-warpper /deep/ .el-pagination .btn-next {
  background-color: rgba(0, 0, 0, 0.25) !important;
  color: #409eff !important;
  border-radius: 3px;
}
.imei-dialog-warpper /deep/ .el-pager li {
  color: #99c9fa;
}
.imei-dialog-warpper /deep/ .el-pagination .el-pager li {
  background: rgba(0, 0, 0, 0.25);
}
.imei-dialog-warpper /deep/ .el-pagination .el-pager .active {
  color: #409eff;
  background: #112759;
}
.imei-dialog-warpper /deep/ .el-picker-panel {
  background-color: rgba(3, 16, 31, 0.95);
  border: 1px solid #193555;
}
.showDecoration {
  color: #4b9de8;
  cursor: pointer;
  text-decoration: underline;
}
.reveal {
  color: #4b9de8;
}
.el-input-number__decrease,
.el-input-number__increase {
  // -webkit-appearance: none !important
  width: 13px;
  height: 15px;
  background: none !important;
  border: none;
  color: white;
}
.el-input-number.is-controls-right .el-input-number__decrease {
  background: none;
}
.el-input-number.is-controls-right .el-input-number__increase {
  background: none;
}
.el-button {
  border: none !important;
}
</style>
