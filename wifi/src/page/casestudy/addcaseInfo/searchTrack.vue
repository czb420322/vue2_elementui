<template>
  <div class="searchTrack">
    <el-dialog
      title="轨迹列表"
      :visible.sync="dialogVisible"
      @close="closeDia"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @open="opendia"
      width="70%"
    >
      <span class="taskrelation" v-if="dialogVisible">
        <el-table
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="width: 100%"
          height="4.95rem"
          @selection-change="handleselection"
          :row-key="handlrowkey"
          @select-all="selectAll"
          ref="table"
          border
        >
          <div slot="empty">
            <div class="noImg">
              <img src="../../../assets/updataImg/NoData.png">
            </div>
          </div>
          <el-table-column :reserve-selection="true" type="selection" width="100"></el-table-column>
          <el-table-column show-overflow-tooltip prop="trajectoryName" label="轨迹名称">
            <template slot-scope="scope">{{scope.row[0].trajectoryName}}</template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row[0].createTime}}</template>
          </el-table-column>
          <el-table-column prop="description" label="备注信息" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row[0].description}}</template>
          </el-table-column>
          <el-table-column prop="status" label="类型">
            <template slot-scope="scope">以图搜图</template>
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="250">
            <template slot-scope="scope">
              <el-button class="topBtn" icon="el-icon-view" @click="seek(scope.row)">查看</el-button>
              <el-button class="beginBtn" icon="el-icon-caret-right" @click="convert(scope.row)">转标注</el-button>
              <el-button
                type="danger"
                class="delBtn"
                icon="el-icon-circle-close-outline"
                @click="deleteVideo(scope.row[0].trajectoryUuid)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </span>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false"></el-button> -->
        <el-button type="primary" @click="dialogVisible = false" class="cancleBtn">关闭</el-button>
        <el-button type="primary" class="passBtn" @click="delAll">批量删除</el-button>
      </span>
    </el-dialog>

    <v-dialog
      :tagDialog.sync="tagDialog"
      :tagDataList="tagDataList"
      @isConvertSuccess="isConvertSuccess"
      :fromPage="fromPage"
    ></v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      totalCount: 0,
      currentPage: 1, // 当前页码
      pageSize: 10, //每页显示的条数
      multipleSelection: [], //选中的当前数组
      color: [
        "red",
        "blue",
        "orange",
        "pink",
        "black",
        "green",
        "yellow",
        "gray",
        "purple"
      ],
      tagDialog: false,
      tagDataList: [],
      fromPage: "2",
      issesionAll: false
    };
  },
  mounted() {},
  watch: {
    showSearchTrack(val) {
      this.dialogVisible = val;
    },
    totalCount(val) {
      if (val % this.pageSize == 0) {
        if (this.currentPage > 1) {
          this.currentPage -= 1;
        } else if (this.currentPage <= 1) {
          this.currentPage = 1;
        }
      }
    }
  },
  props: {
    showSearchTrack: Boolean,
    pointList:Array
  },
  methods: {
    //关闭模态框
    closeDia() {
      this.$emit("saveTrack", false);
      this.$refs.table.clearSelection();
      this.tableData = [];
      this.multipleSelection = [];
      this.currentPage = 1;
      this.pageSize = 10;
      this.issesionAll = false;
    },
    //打开模态框
    opendia() {
      this.gettrack();
    },
    //获取轨迹列表
    gettrack() {
      let data = {
        trajectoryName: "",
        suspicionName: "",
        caseUuid: this.$route.query.caseUuid,
        trajectoryUuid: "",
        pointUuid: ""
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/structure/getTrajectory", data).then(res => {
        if (res.data.code == 200) {
          this.tableData = [];
          let data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].length != 0) {
              this.tableData.push(data[i]);
            }
          }
          this.totalCount = this.tableData.length;
        }
      });
    },
    //当前选中的所有的ID
    handleselection(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //删除单个轨迹
    deleteVideo(id) {
      this.$myconfirm({
        type: "提示",
        msg: "是否删除该轨迹？",
        icon: 1,
        btn: {
          ok: "确定",
          no: "取消"
        }
      }).then(() => {
        let data = {
          trajectoryUuids: id
        };
        data = this.$qs.stringify(data);
        this.$http.post("vsas/structure/deleteTrajectory", data).then(res => {
          console.log(res, 22);
          if (res.data.code == 200) {
            this.gettrack();
            this.$refs.table.clearSelection();
          }
        });
      });
    },
    //批量删除
    delAll() {
      if (this.multipleSelection.length == 0) {
        this.$notify({
          type: "warning",
          message: "请选择要删除的轨迹！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      let type;
      if (this.multipleSelection.length == this.tableData.length) {
        type = "是否删除所有轨迹?";
      } else {
        type = "是否删除选中的轨迹?";
      }
      this.$myconfirm({
        type: "提示",
        msg: type,
        icon: 1,
        btn: {
          ok: "确定",
          no: "取消"
        }
      }).then(() => {
        let arr = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          arr.push(this.multipleSelection[i][0].trajectoryUuid);
        }
        // if(this.multipleSelection.length)
        let data = {
          trajectoryUuids: arr.join(",")
        };
        data = this.$qs.stringify(data);
        this.$http.post("vsas/structure/deleteTrajectory", data).then(res => {
          console.log(res, 22);
          if (res.data.code == 200) {
            this.gettrack();
            this.$refs.table.clearSelection();
          }
        });
      });
    },
    handlrowkey(row) {
      return row[0].trajectoryUuid;
    },
    //全选
    selectAll(selection) {
      if (!this.issesionAll) {
        this.$refs.table.clearSelection();
        this.tableData.forEach(row => {
          this.$refs.table.toggleRowSelection(row, true);
        });
        this.issesionAll = true;
      } else {
        this.$refs.table.clearSelection();
        this.issesionAll = false;
      }
      // if (
      //   !this.multipleSelection.length &&
      //   !(this.tableData.length == selection.length)
      // ) {
      //   this.$refs.table.clearSelection();
      //   return;
      // }
      // this.$refs.table.clearSelection();
      // if (((this.tableData.length - selection.length == this.pageSize) &&
      //     (this.currentPage != Math.ceil(this.tableData.length / this.pageSize)))  ||
      // ((this.tableData.length - selection.length == this.tableData.length - (this.currentPage - 1) * this.pageSize) &&
      // this.currentPage == Math.ceil(this.tableData.length / this.pageSize))) {
      //   this.$refs.table.clearSelection();
      // } else {
      //   this.$refs.table.clearSelection();
      //   this.tableData.forEach(row => {
      //     this.$refs.table.toggleRowSelection(row, true);
      //   });
      // }
    },
    seek(row) {
      this.dialogVisible = false;
      let isnull = false;
      let arrLists = [];
      for (let i = 0; i < row.length; i++) {
        if (row[i].targetObjects != null) {
          arrLists.push(row[i]);
        }
      }
      for (let i = 0; i < arrLists.length; i++) {
        arrLists[i].list = arrLists[i].targetObjects;
      }
      for (let i = 0; i < this.pointList.length; i++) {
        for (let j = 0; j < arrLists.length; j++) {
          if (arrLists[j].pointUuid == this.pointList[i].deviceUuid) {
            arrLists[j].longitude = this.pointList[i].longitude;
            arrLists[j].latitude = this.pointList[i].latitude;
            arrLists[j].deviceUuid = this.pointList[i].deviceUuid;
            arrLists[j].offset = this.pointList[i].offset;
          }
        }
      }
      this.$parent.childBySearch(arrLists, "track");
    },
    //  转标注
    convert(row) {
      this.tagDataList = row;
      console.log(this.tagDataList, "*************************");
      this.tagDialog = true;
    },
    // 转标注成功删除当前条
    isConvertSuccess(id) {
      let getId = id;
      // this.gettrack()
      this.deleteCurrent(getId);
    },
    //删除单个轨迹
    deleteCurrent(id) {
      let data = {
        trajectoryUuids: id
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/structure/deleteTrajectory", data).then(res => {
        if (res.data.code == 200) {
          this.gettrack();
          this.$refs.table.clearSelection();
        }
      });
    }
  }
};
</script>


<style scoped>
@import "../../../assets/css/commom.css";
.el-pagination {
  text-align: right;
  margin-top: 0.1rem;
  margin-right: 0.1rem;
}
</style>
