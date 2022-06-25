<template>
  <div class="diskInfo">
    <el-dialog
      title="服务器信息列表"
      :visible.sync="dialogVisible"
      @close="closeDia"
      :append-to-body="true"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @open="opendia"
      width="50%"
    >
      <span class="taskrelation">
        <el-button
          v-show="role"
          class="delBtn"
          title="清理当前系统产生的日志和临时文件"
          @click="clearServer"
        >清理非业务数据</el-button>
        <el-button v-show="role" class="delBtn" title="清理已删除案件" @click="clearCase">清理业务数据</el-button>
        <el-table
          ref="table"
          :data="tableData"
          border
          style="width: 100%"
          class="tables"
          max-height="4.4rem"
        >
          <div slot="empty">
            <div class="noImg">
              <img src="../assets/updataImg/NoData.png">
            </div>
          </div>
          <el-table-column show-overflow-tooltip prop="ipAddr" label="服务器IP地址"></el-table-column>
          <el-table-column prop="hostName" show-overflow-tooltip label="服务器名称"></el-table-column>
          <el-table-column prop="status" show-overflow-tooltip label="磁盘用量状态">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p v-show="scope.row.status == '异常'">异常: 您的磁盘容量已超过{{score.except}}%</p>
                <p v-show="scope.row.status == '警告'">警告: 您的磁盘容量已超过{{score.warning}}%</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{scope.row.status}}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">
              <p class="viewDisks" @click="toogleExpand(scope.row,scope.$index)">查看节点详细磁盘用量信息</p>
            </template>
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table
                :data="scope.row.diskInfoDescModelList"
                style="width: 100%;"
                height="3.5rem"
                inline
                class="demo-table-expand"
              >
                <div slot="empty">
                  <div class="noImg">
                    <img src="../assets/updataImg/NoData.png">
                  </div>
                </div>
                <el-table-column show-overflow-tooltip prop="fileSystemName" label="文件系统名称"></el-table-column>
                <el-table-column prop="totalCount" show-overflow-tooltip label="磁盘分区大小"></el-table-column>
                <el-table-column prop="userCount" show-overflow-tooltip label="磁盘分区用量"></el-table-column>
                <el-table-column prop="auailCount" show-overflow-tooltip label="剩余可用空间"></el-table-column>
                <el-table-column prop="usageRate" show-overflow-tooltip label="磁盘分区用量占比（%）">
                  <template slot-scope="scope">
                    <p
                      class="viewDisks"
                      :class="{red:scope.row.usageRate.split('%')[0] >= 85}"
                    >{{scope.row.usageRate}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="fileDir" show-overflow-tooltip width="190" label="挂载目录"></el-table-column>
              </el-table>
            </template>
          </el-table-column>
        </el-table>
      </span>
      <!-- <div>
        <p style="color:#fff;font-size:16px;">联系管理员</p>
      </div>-->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex"; //引入vuex
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      expands: [],
      viewList: [],
      role: false, //当前用户是否有删除权限
      score: {} //当前系统提醒的阈值
    };
  },
  mounted() {},
  watch: {
    opendiskInfo(val) {
      this.dialogVisible = val;
    }
  },
  computed: {
    ...mapGetters(["isopenOffVideo", "isopenOnVideo"])
  },
  props: {
    opendiskInfo: Boolean
  },
  methods: {
    //关闭模态框
    closeDia() {
      this.$emit("childbydisk", false);
      if (this.$route.path == "/videoCombat/videoplay") {
            document.title = document.title + ".";
        } else if (this.$route.path == "/videoCombat/realvideo") {
            document.title = document.title + "..";
        } else if (
            this.$route.path == "/videoCombat/historyvideo"
        ) {
            document.title = document.title + "....";
        }
    },
    //打开模态框
    opendia() {
      this.getScoreAndRole();
      this.getDiskInfo();
    },
    //得到机器的详细信息
    getDiskInfo() {
      this.$http.get("sms/monitor/getDistInfo").then(res => {
        this.tableData = res.data.data;
      });
    },
    //得到当前用户是否有权限清理日志以及清理案件，以及得到阈值
    getScoreAndRole() {
      this.$http.get("sms/monitor/getScoreAndRole").then(res => {
        console.log(res, 2333);
        if (res.data.code == 200) {
          this.role = res.data.data.role;
          this.score = res.data.data.score;
        }
      });
    },
    // 点击展开
    toogleExpand(row, index) {
      let $table = this.$refs.table;
      $table.toggleRowExpansion(row);
    },

    //清理日志
    clearServer() {
      this.$http.get("sms/monitor/clearServer").then(res => {
        this.$http.get("vsas/task/startDeleteTask").then(res => {
          this.$notify({
            type: "success",
            message: "清理成功！",
            position: "bottom-right",
            duration: 3000
          });
        });
      });
    },
    //清理案件
    clearCase() {
      this.$http.post("pca/casemng/clearDeleteCase").then(res => {
        if (res.data.code == 200) {
          this.$notify({
            type: "success",
            message: "清理成功！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    }
  }
};
</script>


<style scoped>
@import "../assets/css/commom.css";
.diskInfo {
  z-index: 99999;
}
.viewDisks {
  cursor: pointer;
  color: #4b9de8;
  text-decoration: none;
}
.taskrelation /deep/ .el-table__expanded-cell {
  background-color: #040c17 !important;
}
.el-table /deep/ td {
  padding: 0.08rem 0.08rem;
}
body /deep/ .el-table--enable-row-hover .el-table__body tr:hover>td {
  background: none !important;
}
.red {
  color: red;
}
.el-table /deep/ .el-table__expand-icon > .el-icon {
  color: #99c9fa;
}
.tables {
  margin-top: 0.1rem;
}
</style>
