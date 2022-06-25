<!--
 * @Author: your name
 * @Date: 2020-11-09 11:05:02
 * @LastEditTime : 2021-08-10 15:14:39
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes\src\page\VideoStructPlatform\resourceManCompon\skynet.vue
 -->
<template>
  <div class="showdeviceoId">
    <div class="searchkline">
      <span @click="getclickstrus()" class="commBtn others addBtn">视频上传自动结构化</span>
      <span @click="getclick()" class="commBtn addBtn">视频文件上传</span>
      <span @click="goback()" class="commBtn addBtn">返回上一级</span>
      <span @click="gotask()" class="commBtn addBtn">返回任务列表</span>
      <span @click="deletList()" class="commBtn addBtn">批量删除</span>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      class="tables"
      height="6.25rem"
      @selection-change="handleselection"
      :row-key="handlrowkey"
      ref="table"
    >
      <div slot="empty">
        <div class="noImg">
          <img src="../../../assets/updataImg/NoData.png">
        </div>
      </div>
      <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span>{{(scope.$index + 1) + (currentPage-1)*pageSize}}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="fileName" label="文件名称"></el-table-column>
      <el-table-column prop="fileSize" align="center" label="文件大小(M)" :formatter="fileSize"></el-table-column>
      <!-- 新增的宽高 -->
      <el-table-column prop="width" align="center" label="宽"></el-table-column>
      <el-table-column prop="height" align="center" label="高"></el-table-column>
      <el-table-column
        prop="uploadTime"
        align="center"
        label="上传时间"
        :formatter="dateFormat"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="videoUnicode" align="center" label="编码格式" :formatter="videoUnicode"></el-table-column>
      <el-table-column prop="status" align="center" label="状态" :formatter="formatStatus"></el-table-column>
      <el-table-column label="进度" align="center">
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.progress" color="#8e71c7"></el-progress>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="300" align="center">
        <template slot-scope="scope">
          <!-- <el-button
            @click="reTry(scope.row,scope.$index)"
            type="warning"
            class="el-icon-video-pause tryBtn"
            size="mini"
          >&nbsp;&nbsp;重试</el-button> -->
          <el-button
            type="primary"
            class="searchBtn"
            size="mini"
            @click="openplayvideo(scope.row,scope.$index)"
            icon="el-icon-video-play"
          >&nbsp;&nbsp;播放</el-button>
          <el-button
            type="danger"
            class="delBtn"
            size="mini"
            @click="deleteVideo(scope.row)"
            icon="el-icon-circle-close"
          >&nbsp;&nbsp;删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="video_page">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[15, 30, 45]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
      <p>已上传：{{num1}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正在上传：{{num2}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格式不支持：{{num3}}</p>
    </div>
  </div>
</template>

<script>
import datacell from "../../../api/newCaseVideo/DataCell.js";
import beginEnd from "../../../api/realvideo/BenEedTime.js"; //时间
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      checklist: [], //当前选中要删除的数组
      setCount: 200
    };
  },
  props: {
    deviceUuid: String,
    getcaseUuid: String,
    nodesFatherId: String
  },
  created() {
    this.caseUuid = this.getcaseUuid;
    this.pageSize = 15;
  },
  mounted() {
    this.getAllDataCell();
    this.getNumtoAll();
    this.getSetIntervat();
  },
  mixins: [datacell, beginEnd],
  components: {},
  methods: {
    ...mapMutations(["setshowplayvideo", "setnowplayObj"]),
    //刷新定时器
    getSetIntervat() {
      clearInterval(this.timeOut);
      this.timeOut = setInterval(() => {
        setTimeout(() => {
          this.setCount++;
          this.getAllDataCell();
          this.getNumtoAll();
          this.$parent.nowclicknodes.target.innerText =
            this.$parent.nowclicknodes.target.innerText.split("(")[0] +
            "(" +
            this.totalCount +
            ")";
        }, 0);
      }, 10000 * Math.ceil(this.setCount / 200));
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getAllDataCell();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAllDataCell();
    },
    //返回上一级
    goback() {
      this.setshowplayvideo(false);
      let dom = this.nodesFatherId;
      let aaa = document.getElementById(dom);
      aaa.childNodes[1].click();
    },
    //返回任务列表
    gotask() {
      this.setshowplayvideo(false);
      this.$router.push({
        path: "/videoStrucPlat/taskManage",
        query: {
          menuCode: 701
        }
      });
    },
    //批量删除
    deletList() {
      if (!this.checklist.length) {
        this.$notify({
          type: "warning",
          message: "请先选择需要删除的视频文件，再进行批量删除操作！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      this.setshowplayvideo(false);
      this.$myconfirm({
        type: "提示",
        msg: "视频产生的相关数据全部丢失,是否确认删除！",
        icon: 1,
        btn: {
          ok: "确定",
          no: "取消"
        }
      }).then(() => {
        let ids = this.checklist
          .map(item => {
            return item.fileUuid;
          })
          .join(",");
        let data = {
          fileUuids: ids //java的接口交互，中间用逗号分隔
        };
        data = this.$qs.stringify(data);
        this.$http.post("/vsas/collection/batch/del", data).then(res => {
          if (res.data.code == 200) {
            this.getAllDataCell();
            this.getNumtoAll();
            this.$refs.table.clearSelection();
          } else {
            this.$notify({
              type: "warning",
              message: "删除文件失败",
              position: "bottom-right",
              duration: 3000
            });
          }
        });
      });
    },
    handlrowkey(row) {
      return row.fileUuid;
    },
    handleselection(val) {
      this.checklist = val;
    },
    //打开视频播放
    openplayvideo(row, index) {
      let data = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        obj: row
      };
      this.setnowplayObj(data);
      this.setshowplayvideo(true);
    },
    //重试
    reTry(row, index) {
      console.log(row, index);

    },
  },
  destroyed() {
    clearInterval(this.timeOut);
    this.setCount = 200;
  }
};
</script>

<style scoped>
@import "../../../assets/css/commom.css";

.showdeviceoId {
  padding: 0 0.15rem;
  position: relative;
}

.searchkline {
  margin-bottom: 0.1rem;
}

.searchkline span {
  display: inline-block;
  width: 1.2rem;
  height: 0.3rem;
  line-height: 0.3rem;
  cursor: pointer;
  font-size: 0.12rem;
  margin-right: 0.2rem;
}

.el-pagination {
  margin: 0.1rem 0;
}

.el-pagination .el-pagination__total,
.el-pagination /deep/ .el-pagination__total {
  line-height: 0.3rem;
}

.el-progress .el-progress__text,
.el-progress /deep/ .el-progress__text {
  width: 0.5rem;
  color: #99c9fa;
  margin-left: 0.03rem;
  font-size: 0.12rem !important;
}

.el-progress .el-progress-bar,
.el-progress /deep/ .el-progress-bar {
  width: 90%;
}

.video_page > p {
  font-size: 0.14rem;
}

@media (max-width: 1440px) {
  .commBtn.others {
    width: 2rem;
  }
}
</style>
