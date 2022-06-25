<template>
  <div class="videoStructure">
    <!-- 临时点视频结构化 -->
    <el-dialog
      title="视频结构化"
      :visible.sync="dialogVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @close="closeDia"
      @open="opendia"
      width="60%"
    >
      <div class="temporary">
        <div class="navBar">
          <div class="nav_left">
            <p class="bartile">|&nbsp;场景快照</p>
            <div>
              <img :src="videoImg" class="imgbox" @load="imgscale('.imgbox')" alt>
            </div>

          </div>
          <div class="nav_right">
            <p class="bartile">|&nbsp;选择视频</p>
            <el-table
              :data="tableList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              style="width: 100%"
              height="4.62rem"
              @selection-change="handleselection"
              :row-key="handlrowkey"
              @select-all="selectAll"
              ref="table"
              border>
              <div slot="empty">
                  <div class="noImg">
                      <img src="../../../assets/updataImg/NoData.png">
                  </div>
              </div>
              <el-table-column :reserve-selection="true" type="selection" width="100"></el-table-column>
              <el-table-column label="文件名称" width="400" prop="fileName" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 分页开始 -->
        <div class="pageList">
          <el-pagination
            background
            small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </div>
        <!-- 分页结束 -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary passBtn" v-no-more-click @click="submitVideo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import scale from '../../../api/common/scale.js'
export default {
  data() {
    return {
      dialogVisible: false, // 默认不显示
      tableList: [], // 定义空数组
      videoImg: "", // 图片默认空
      totalCount: 0, // 默认总数
      currentPage: 1, // 当前页
      pageSize: 10, // 默认页数
      multipleSelection: [], // 默认不勾选
      fileUuidList: [], // 存放fileUuid
      issesionAll:false,  //是否点击了全选
    };
  },
  created() {},
  props: {
    videoNum: Boolean,
    deviceids: String
  },
  watch: {
    videoNum(val) {
      this.dialogVisible = val;
    }
  },
  mixins:[scale],
  mounted() {},
  methods: {
    // 打开模态框
    opendia() {
      this.videoStruct(); // 默认打开结构化列表
    },
    // 关闭模态框
    closeDia() {
      this.$emit("childvideo", false);
      this.tableList = [];
      this.currentPage = 1;
      this.multipleSelection = [];
      this.fileUuidList = [];
      this.videoImg = "";
      this.totalCount = 0
      this.$refs.table.clearSelection();
      this.issesionAll = false
    },
    // 视频结构化
    videoStruct() {
      this.DialogVisible16 = true;
      let data = {
        pageNum: 1,
        pageSize: 2000,
        begin: "",
        end: "",
        // statusl:'2,3,4,6',
        deviceId: this.deviceids,
        caseUuid: this.$route.query.caseUuid,
        orderBy: "start_time",
        orderType: "asc"
      };
      // 获取数据
      this.$http.get("vsas/collection/offline/list", { params: data }).then(res => {
        if (res.data.code == 200) {
          //获取结构化需要的视频，非格式不支持 deviceType != 0，转码失败status != 5，已经做过结构化目标的structStatus == -1
          for (let i = 0; i < res.data.data.list.length; i++) {
            if (
              res.data.data.list[i].structStatus == -1 &&
              res.data.data.list[i].deviceType != 0 &&
              res.data.data.list[i].status != 5
            ) {
              this.tableList.push(res.data.data.list[i]);
              this.totalCount = this.tableList.length;
            }
          }
        // 获取图片
        //循环判断数组，如果图片的url 不等于null则表示有数据，就给DOM img标签赋值
        if (this.tableList.length) {
          for (let i = 0; i < this.tableList.length; i++) {
            if (this.tableList[i].snapUrl != null) {
              this.videoImg = this.tableList[i].snapUrl;
              return;
            }
          }
        } else {
            this.videoImg = ''
          }
        }
      })
    },
    // 提交视频结构化
    submitVideo() {
      // 判断图片是否为空
      if (this.videoImg == "" || this.videoImg == null) {
        this.$notify({
          type: "warning",
          message: "场景图获取中！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      // 存放id
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.fileUuidList.push(this.multipleSelection[i].fileUuid);
      }
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "加载中"
      });
      let data = {
        caseUuid: this.$route.query.caseUuid,
        deviceId: this.deviceids,
        fileUuids: this.fileUuidList.join(",")
      };
      data = this.$qs.stringify(data);
      // 创建人物
      this.$http.post("vsas/task/structure/glst/create", data).then(res => {
        this.loading.close();
        if (res.data.code == 200) {
          this.$notify({
            type: "success",
            message: "任务创建成功！",
            position: "bottom-right",
            duration: 3000
          });
          this.dialogVisible = false;
        } else if (this.multipleSelection == "") {
          this.$notify({
            type: "warning",
            message: "请勾选文件！",
            position: "bottom-right",
            duration: 3000
          });
        } else {
          this.$notify({
            type: "warning",
            message: "任务创建失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    //全选反选操作
    handleselection(val) {
      this.fileUuidList = [];
      this.multipleSelection = val;
    },
    // 勾选所有数据
    selectAll(selection) {
      if(!this.issesionAll){
        this.$refs.table.clearSelection();
        this.tableList.forEach(row => {
          this.$refs.table.toggleRowSelection(row, true);
        });
        this.issesionAll = true
      }else{
        this.$refs.table.clearSelection();
        this.issesionAll = false
      }
      //如果没有勾选，并且当前数组等于当前点击的数组就清空所有框选
    //   if (!this.multipleSelection.length && !(this.tableList.length == selection.length)) {
    //     this.$refs.table.clearSelection();
    //     return;
    //   }
    //   this.$refs.table.clearSelection();
    //   //  || (selection.length == (this.currentPage - 1) * this.pageSize)
    //   //如果点击最后一页，并且是选中目标，则清空，否则就全选
    //   if (
    //     (
    //       (this.tableList.length - selection.length == this.pageSize)  &&
    //       (this.currentPage != Math.ceil(this.tableList.length / this.pageSize))
    //     ) ||
    //   (
    //     (this.tableList.length - selection.length == this.tableList.length - (this.currentPage - 1) * this.pageSize) &&
    //     (this.currentPage == Math.ceil(this.tableList.length / this.pageSize))
    //   )
    // ) {
    //     this.$refs.table.clearSelection();
    //   } else {
    //     this.$refs.table.clearSelection();
    //     this.tableList.forEach(row => {
    //       this.$refs.table.toggleRowSelection(row, true);
    //     });
    //   }
    },
    // 获取索引
    handlrowkey(row) {
      return row.fileUuid;
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    // 切换当前页面
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  }
};
</script>

<style scoped>
@import "../../../assets/css/commom.css";
.temporary {
  width: 100%;
  height: 5.3rem;
}
.navBar{
  width: 100%;
  height: 100%;
}
.nav_left {
  float: left;
  width: 5.7rem;
  height: 100%;
}
.bartile{
  line-height: 0.4rem;
  height: 0.4rem;
  color: #fff;
}
.nav_left div{
  width: 100%;
  height: 4.6rem;
  border: 1px solid #409eff;
  position: relative;
}
.nav_left img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.nav_right {
  float: left;
  margin-left: 0.2rem;
}
/* .nav_right .el-table--border >>> {
  border: 1px solid rgba(12, 68, 135, 0.3) !important;
} */
.nav_right .el-dialog__wrapper >>> .el-dialog {
  border: 2px solid #2e3f51;
  min-width: 7rem;
}
.pageList .el-pagination {
  right: 0.3rem;
  bottom: 0.5rem;
  position: absolute;
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
}
.nav_right .el-table >>> .el-table__empty-block {
  min-height: 1.48rem;
}
.nav_right .el-table >>> th {
  padding: 0.05rem 0;
}
.nav_right .el-table >>> td {
  padding: 0.08rem 0;
}
/* .nav_right >>> .el-table .cell {
  white-space: normal;
  word-break: break-all;
  line-height: 0.23rem;
  height: 0.23rem;
  overflow: hidden;
  text-overflow: ellipsis;
} */
</style>

