<template>
  <div>
    <el-dialog
      title="协同任务管理"
      :visible.sync="DialogVisible"
      class="dialog"
      @close="closeDia"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @open="opendiatask"
      width="70%"
    >
      <span class="dialogMain" v-if="DialogVisible">
        <div>
          <div class="task_top">
            <p class="task_t_l">
              <span @click="isflow = true">任务关系图</span>
              <span @click="gradeprop();DialogVisible1 = true">评分比重</span>
            </p>
            <p class="task_t_r">
              <input type="text" placeholder="请输入关键字" v-model="keyword">
              <i class="el-icon-search searchBtn" @click="searchQuery"></i>
              <el-button
                class="el-icon-circle-plus-outline searchBtn"
                @click="createTask"
              >&nbsp;创建任务</el-button>
            </p>
          </div>
          <div class="task_btn">
            <el-table :data="tableData" border style="width: 100%" class="tables" height="4.75rem">
              <div slot="empty">
                <div class="noImg">
                  <img src="../../../assets/updataImg/NoData.png">
                </div>
              </div>
              <el-table-column show-overflow-tooltip type="index" width="80" label="编号"></el-table-column>
              <el-table-column prop="taskName" show-overflow-tooltip label="任务名称"></el-table-column>
              <el-table-column width="150" show-overflow-tooltip label="任务接收人">
                <template slot-scope="scope">
                  {{(scope.row.hlist == undefined || scope.row.hlist.length == 0)? '' : (scope.row.hlist[0].user == null ? '' : scope.row.hlist[0].user.trueName)}}
                  <!-- {{scope.row.hlist[0].user.trueName}} -->
                </template>
              </el-table-column>
              <el-table-column prop="beginTime" width="180" label="创建时间"></el-table-column>
              <el-table-column show-overflow-tooltip prop="taskContent" label="任务描述"></el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="taskStatus"
                :formatter="taskStatus"
                label="任务状态"
              ></el-table-column>
              <el-table-column prop="score" :formatter="scoreFomat" label="评分"></el-table-column>
              <el-table-column prop="operation" label="操作" width="320">
                <template slot-scope="scope">
                  <el-button
                    type="success"
                    @click="getrecord(scope.row)"
                    class="el-icon-time topBtn"
                  >记录</el-button>
                  <el-button
                    type="primary"
                    class="el-icon-edit searchBtn"
                    @click="updataTask(scope.row)"
                  >修改</el-button>
                  <el-button
                    type="danger"
                    class="delBtn"
                    :disabled="scope.row.taskStatus == 2 || scope.row.taskStatus == 3"
                    @click="repeal(scope.row)"
                  >
                    <img src="@/assets/images/caseStydy/repeal.png"> 撤销
                  </el-button>
                  <el-button
                    type="warning"
                    class="el-icon-star-off tryBtn"
                    @click="opengrade(scope.row)"
                  >评分</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              background
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount"
            ></el-pagination>
          </div>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="DialogVisible = false">关 闭</el-button>
        <!-- <el-button class="cancleBtn" @click="DialogVisible = false">取 消</el-button> -->
        <!-- <el-button class="passBtn"  @click="confirm">确 定</el-button> -->
      </span>
    </el-dialog>
    <taskflow :isflow="isflow" :dataCaseInfo="dataCaseInfo" @childbyflow="childbyflow"></taskflow>

    <!-- 评分比重中的 -->
    <el-dialog
      title="人员贡献占比"
      :visible.sync="DialogVisible1"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="dialog grade"
    >
      <span class="gradesp">
        <el-table
          :data="gradesp"
          border
          style="width: 100%"
          class="tables"
          height="4rem"
          append-to-body
        >
          <el-table-column show-overflow-tooltip type="index" width="80" label="编号"></el-table-column>
          <el-table-column prop="trueName" label="专案人员"></el-table-column>
          <el-table-column prop="score" label="总评分"></el-table-column>
          <el-table-column prop="proportion" label="评分比重"></el-table-column>
        </el-table>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="DialogVisible1 = false">关 闭</el-button>
        <!-- <el-button class="cancleBtn" @click="DialogVisible1 = false">取 消</el-button>
        <el-button class="passBtn"  @click="DialogVisible1 = false">确 定</el-button>-->
      </span>
    </el-dialog>

    <!-- 创建任务 -->
    <el-dialog
      :title="createTile"
      :visible.sync="DialogVisible2"
      width="30%"
      @close="closeTask"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="dialog create"
    >
      <span class="createTask">
        <ul>
          <li>
            <span>
              <b style="color:red">*</b>&nbsp; 任务名称：
            </span>
            <input type="text" maxlength="30" v-model="taskName" placeholder="请输入任务名称">
          </li>
          <li>
            <span>
              <b style="color:red">*</b>&nbsp; 任务接收人：
            </span>
            <el-select
              v-model="accepter"
              @visible-change="getNumtoPerson"
              placeholder="请选择任务接收人"
              @change="getNumPerson"
              value-key="name"
            >
              <el-option
                v-for="(item,i) in hands"
                ref="options"
                :value="item"
                :key="i"
                :label="`${item.name}---正在处理任务${item.doingCount}---未处理任务数量${item.undoCount}`"
              >
                <!-- {{item.name}}---正在处理任务{{item.doingCount}}---未处理任务数量{{item.undoCount}} -->
                <!-- {{item.name}}--任务数量{{item.doingCount + item.undoCount}} -->
              </el-option>
            </el-select>
          </li>
          <li>
            <span>
              <b style="color:red">*</b>&nbsp; 任务描述：
            </span>
            <textarea style="resize: none" v-model="taskContent" placeholder="请输入任务描述"></textarea>
          </li>
        </ul>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="DialogVisible2 = false">取 消</el-button>
        <el-button type="primary passBtn" v-no-more-click @click="addTask">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 任务操作记录 -->
    <el-dialog
      title="任务操作记录"
      :visible.sync="DialogVisible3"
      width="40%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="dialog create"
    >
      <span class="gradesp taskhandle" v-if="DialogVisible3">
        <el-table
          :data="taskhandle"
          border
          style="width: 100%"
          class="tables"
          height="4rem"
          append-to-body
        >
          <el-table-column show-overflow-tooltip type="index" width="80" label="编号"></el-table-column>
          <el-table-column prop="taskName" label="任务名称"></el-table-column>
          <el-table-column prop="description" label="操作说明"></el-table-column>
          <el-table-column prop="handlerTime" label="操作时间"></el-table-column>
          <el-table-column prop="user.trueName" label="任务操作人员"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page="currentPage1"
          :page-sizes="[10, 20, 30]"
          :page-size="pageSize1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount1"
        ></el-pagination>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="DialogVisible3 = false">关 闭</el-button>
        <!-- <el-button class="cancleBtn" @click="DialogVisible3 = false">取 消</el-button>
        <el-button class="passBtn"  @click="DialogVisible3 = false">确 定</el-button>-->
      </span>
    </el-dialog>

    <!-- 创建评分 -->
    <el-dialog
      title="任务评分"
      :visible.sync="DialogVisible4"
      width="15%"
      @close="closesorce"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="dialog grade newgrade"
    >
      <span class="taskgrade">
        <input type="num" placeholder="请输入1-100之间的数字" v-model="score" @blur="changeNum">
        <p v-show="showNum" style="color:red">请输入1-100之间的数字</p>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="DialogVisible4 = false">取 消</el-button>
        <el-button type="primary passBtn" v-no-more-click @click="taskGra">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import taskflow from "./taskflow";
import Vue from "vue";

export default {
  data() {
    return {
      DialogVisible: false,
      DialogVisible1: false, //评分比重
      DialogVisible2: false, //创建任务
      DialogVisible3: false, //任务操作记录
      DialogVisible4: false, //任务评分
      tableData: [], //任务管理
      taskhandle: [], // 操作记录
      createTile: "创建任务",
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      currentPage1: 1,
      pageSize1: 10,
      totalCount1: 0,
      gradesp: [], // 评分比重
      keyword: "", //关键字
      taskName: "", //任务名称
      taskContent: "", //任务描述
      isflow: false,
      hands: [],
      accepter: {}, //接受人
      taskId: "",
      score: "", //评分
      accepterId: "",
      showNum: false, // 数字的显示和隐藏
      isadd: false //区分是否是添加进来的
    };
  },
  watch: {
    istask(val) {
      this.DialogVisible = val;
    },
    totalCount(val) {
      if (val % 10 == 0) {
        if (this.currentPage > 1) {
          this.currentPage -= 1;
          this.searchQuery();
        } else {
          this.currentPage = 1;
          this.searchQuery();
        }
      }
    }
  },
  props: ["istask", "dataCaseInfo"],
  mounted() {},
  components: {
    taskflow
  },
  methods: {
    opendiatask() {
      if (this.$route.query.showtask) {
        this.keyword = this.$route.query.scotName;
        this.currentPage = 1;
      } else {
        this.keyword = "";
        this.currentPage = 1;
      }
      this.searchQuery();
      this.getTeam();
    },
    //评分的改变
    changeNum() {
      let xxreg = /^$|^([1-9][0-9]{0,1}|100)$/;
      if (!xxreg.test(this.score)) {
        this.showNum = true;
      } else {
        this.showNum = false;
      }
    },
    scoreFomat(row, column, cellValue) {
      if (row.score == null) {
        return 0;
      } else {
        return cellValue;
      }
    },
    //过滤
    taskStatus(row, column, cellValue) {
      if (cellValue === 1) {
        return "未处理";
      } else if (cellValue === 2) {
        return "已处理";
      } else if (cellValue === 3) {
        return "已完成";
      } else if (cellValue === 4) {
        return "已撤销";
      }
    },
    closesorce() {
      this.score = "";
      this.showNum = false;
    },
    childbyflow(val) {
      this.isflow = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.searchQuery();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchQuery();
    },
    getrecord(row) {
      this.taskId = row.taskId;
      this.DialogVisible3 = true;
      this.Taskrecord();
    },
    //任务操作记录
    Taskrecord() {
      let data = {
        taskId: this.taskId,
        caseUuid: this.caseUuid,
        pageNum: this.currentPage1,
        pageSize: this.pageSize1
      };
      data = this.$qs.stringify(data);
      this.$http
        .post("pca/synergytasklog/selectTaskloggerPage", data)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res, 22255);
            this.taskhandle = res.data.data.list;
            this.totalCount1 = res.data.data.totalCount;
          }
        });
    },
    handleSizeChange1(val) {
      this.pageSize1 = val;
      this.Taskrecord();
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val;
      this.Taskrecord();
    },
    //点击关闭
    closeDia() {
      this.$emit("childBytask", false);
      this.keyword = "";
      this.currentPage = 1;
      this.pageSize = 10;
    },
    // //点击确认
    // confirm(){
    //   this.DialogVisible = false;
    // },
    //创建任务
    createTask() {
      this.createTile = "创建任务";
      this.getTeam();
      this.DialogVisible2 = true;
      this.clearTask();
    },
    //根据caseUuid查询团队
    getTeam() {
      this.hands = [];
      let data = {
        caseUuid: this.$route.query.caseUuid, //案件主键id
        userId: "", // 任务名称
        deptId: "", //任务内容，
        distRole: 2
      };
      data = this.$qs.stringify(data);
      this.$http.post("pca/synergyhandler/selectListByCase", data).then(res => {
        if (res.data.code == 200) {
          let arr = res.data.data;
          for (let i = 0; i < arr.length; i++) {
            let obj = {};
            obj.handId = arr[i].handlerId;
            obj.name = arr[i].user.trueName;
            obj.undoCount = arr[i].undoCount;
            obj.doingCount = arr[i].doingCount;
            this.hands.push(obj);
          }
        }
      });
    },
    //新增任务  修改任务
    addTask() {
      if (this.taskName == "" || this.taskContent == "") {
        this.$notify({
          type: "warning",
          message: "任务名称或描述不能为空",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.accepter == "") {
        this.$notify({
          type: "warning",
          message: "请选择任务接收人",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.taskContent.length > 100) {
        this.$notify({
          type: "warning",
          message: "描述信息不能超过100字",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.taskName.length > 34) {
        this.$notify({
          type: "warning",
          message: "任务名称不能超过34个字符",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.createTile == "创建任务") {
        let data = {
          caseUuid: this.$route.query.caseUuid, //案件主键id
          taskName: this.taskName, // 任务名称
          taskContent: this.taskContent, //任务内容
          handler: this.accepter.handId //处理任务的团队主键
        };
        data = this.$qs.stringify(data);
        this.$http.post("pca/synergytask/savetask", data).then(res => {
          if (res.data.code == 200) {
            this.DialogVisible2 = false;
            this.currentPage = 1;
            this.searchQuery();
            this.clearTask();
          }
        });
      } else {
        console.log(this.accepter.handId, 22233);
        console.log(this.hands, 33366);
        console.log(this.isadd);
        if (this.accepter.handId == null || this.accepter.handId == "") {
          this.$notify({
            type: "warning",
            message: "请分配团队人员",
            position: "bottom-right",
            duration: 3000
          });
          return;
        }
        if (this.isadd) {
          this.hands.pop();
          for (let i = 0; i < this.hands.length; i++) {
            if (this.accepter.handId != this.hands.handId) {
              this.$notify({
                type: "warning",
                message: "团队没有此人！",
                position: "bottom-right",
                duration: 3000
              });
              return;
            }
          }
        }
        let flag;
        if (this.accepter.handId == this.accepterId) {
          flag = 0;
        } else {
          flag = 1;
        }
        let data = {
          taskId: this.taskId, //任务主键id  string    必填
          taskName: this.taskName, //任务名称    string     非必填
          taskContent: this.taskContent, //任务内容   string    非必填
          handler: this.accepter.handId, //处理任务的团队主键（多个人就用分号;隔开） 非必填
          flag: flag //处理任务的团队是否修改了。如果修改了就传1（此时handler必须有值），没修改就传0.  Int  必填s
        };
        data = this.$qs.stringify(data);
        this.$http.post("pca/synergytask/updateContask", data).then(res => {
          if (res.data.code == 200) {
            this.DialogVisible2 = false;
            this.currentPage = 1;
            this.searchQuery();
            this.clearTask();
          }
        });
      }
    },
    clearTask() {
      this.taskName = "";
      this.accepter = "";
      this.taskContent = "";
      // this.keyword = '';
      this.score = "";
    },
    //修改任务
    updataTask(row) {
      this.getTeam();
      this.isadd = false;
      console.log(row);
      this.accepter = {
        doingCount: 0,
        handId: row.hlist[0].handlerId,
        name: row.hlist[0].user == null ? "" : row.hlist[0].user.trueName,
        undoCount: 0
      };
      for (let i = 0; i < this.hands.length; i++) {
        if (this.accepter.handId != this.hands[i].handId) {
          this.hands.push(this.accepter);
          this.isadd = true;
        }
      }
      console.log(row);
      console.log(this.hands, 366);
      this.createTile = "修改任务";
      this.DialogVisible2 = true;
      this.taskName = row.taskName;
      this.taskContent = row.taskContent;
      // this.accepter = row.hlist[0].handlerId
      this.accepterId = row.hlist[0].handlerId;
      this.taskId = row.taskId;
    },
    //撤销任务
    repeal(row) {
      this.$myconfirm({
        type: "提示",
        msg: "是否撤销此人任务？",
        icon: 1,
        btn: {
          ok: "确定",
          no: "取消"
        }
      })
        .then(() => {
          let data = {
            taskId: row.taskId,
            taskStatus: 4
          };
          data = this.$qs.stringify(data);
          this.$http.post("pca/synergytask/cancleContask", data).then(res => {
            if (res.data.code == 200) {
              this.$notify({
                type: "success",
                message: "撤销成功！",
                position: "bottom-right",
                duration: 3000
              });
              this.searchQuery("");
            }
          });
        })
        .catch(() => {
          console.log("no");
        });
    },
    //查询任务列表
    searchQuery() {
      if (this.keyword != "" && this.keyword != null) {
        this.currentPage = 1;
      }
      let data = {
        caseUuid: this.$route.query.caseUuid,
        handler: "",
        userId: "",
        keyword: this.keyword, // 关键字    string     非必填
        pageNum: this.currentPage, //当前页  int
        pageSize: this.pageSize, //当前页结果数量  int
        orderBy: "update_time", //排序字段  string    非必填
        orderType: "desc" //排序方式   string  非必填
      };
      data = this.$qs.stringify(data);
      this.$http.post("pca/synergytask/getConTaskPage", data).then(res => {
        console.log(res, 2222);
        this.tableData = res.data.data.list;
        this.totalCount = res.data.data.totalCount;
        this.clearTask();
      });
    },
    closeTask() {
      this.isadd = false;
      this.getTeam();
    },
    getNumtoPerson(val) {
      this.hands = [];
      this.getTeam();
    },
    getNumPerson(val) {
      this.accepter = {
        doingCount: val.doingCount,
        handId: val.handId,
        name: val.name,
        undoCount: val.undoCount
      };
    },
    //打开评分
    opengrade(row) {
      this.taskId = row.taskId;
      this.DialogVisible4 = true;
    },
    //评分
    taskGra() {
      if (this.showNum) {
        return;
      }
      this.DialogVisible4 = false;
      let data = {
        taskId: this.taskId,
        score: this.score
      };
      data = this.$qs.stringify(data);
      this.$http.post("pca/synergytask/editContask", data).then(res => {
        if (res.data.code == 200) {
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.taskId == this.tableData[i].taskId) {
              this.tableData[i].score = this.score;
              this.searchQuery();
              this.clearTask();
            }
          }
        }
      });
    },
    //评分比重
    gradeprop() {
      let data = {
        caseUuid: this.$route.query.caseUuid,
        taskId: "",
        distRole: 2
      };
      data = this.$qs.stringify(data);
      this.$http.post("pca/synergyhandler/getProportions", data).then(res => {
        console.log(res, 22111);
        if (res.data.code == 200) {
          this.gradesp = res.data.data;
        }
      });
    }
  }
};
</script>

<style scoped>
@import "../../../assets/css/commom.css";
.dialog >>> .el-dialog__header {
  background-color: #f3f6f8;
}
.dialog >>> .el-dialog__footer {
  /* text-align: center; */
  padding: 0.1rem 0.2rem;
}
.dialog >>> .el-dialog__body {
  padding: 0.2rem;
  padding-bottom: 0rem;
}
.grade >>> .el-dialog__body {
  padding: 0.2rem;
}
.create >>> .el-dialog__footer,
.grade >>> .el-dialog__footer {
  border-top: 1px solid #d5dade;
}
.dialogMain {
  display: block;
  height: 5.8rem;
}
.dialogMain > div {
  width: 100%;
  height: 100%;
  /* border-bottom: 1px solid #d0d2d7; */
  /* border: 1px solid #000; */
}
.task_top {
  line-height: 0.4rem;
  /* border: 1px solid #000; */
  display: flex;
  justify-content: space-between;
}
.task_t_l span {
  line-height: 0.3rem;
  margin-top: 0.05rem;
  padding: 0 0.1rem;
  /* border: 1px solid #d3d6dd; */
  float: left;
  background-color: #142942;
  color: #99c9fa;
  border: none;
  cursor: pointer;
}
.task_t_l span:hover {
  background-color: #112439;
  color: #2e93fb;
}
.task_t_l span:last-child {
  margin-left: 2px;
}
.task_t_r {
  position: relative;
}
.task_t_r input,
.task_t_r i {
  margin-top: 0.05rem;
  border-radius: 2px;
}
.task_t_r input {
  width: 2.5rem;
  line-height: 0.28rem;
  padding-left: 0.1rem;
  margin-right: 0.6rem;
  color: #99c9fa;
  border: 1px solid #d3d5dc;
}
.task_t_r i {
  position: absolute;
  width: 0.3rem;
  height: 0.3rem;
  left: 2.455rem;
  text-align: center;
  color: #fff;
  cursor: pointer;
  font-size: 0.18rem;
  line-height: 0.3rem;
  background-color: #409eff;
}
.task_t_r .el-button {
  padding: 0.07rem 0.1rem;
}
.el-pagination {
  text-align: right;
  margin-top: 0.1rem;
}
.task_btn {
  margin-top: 0.1rem;
}
.task_btn >>> .el-table th,
.gradesp >>> .el-table th {
  background-color: #edf1f4;
  text-align: center;
}
.task_btn >>> .el-table td,
.gradesp >>> .el-table td {
  text-align: center;
  padding: 0.08rem 0rem;
}
.task_btn >>> .el-table--border th,
.task_btn >>> .el-table--border td,
.gradesp >>> .el-table--border th,
.gradesp >>> .el-table--border td {
  text-align: center;
  border-right: 1px solid #e6e6e6;
}
.task_btn >>> .el-table__body .el-button {
  padding: 0.05rem 0.1rem;
}
.createTask ul li {
  padding: 0.1rem;
}
.createTask ul li span {
  display: inline-block;
  width: 1.5rem;
  text-align: right;
  color: #99c9fa;
}
.createTask ul li input,
.createTask ul li select,
.createTask ul li textarea {
  width: calc(100% - 1.6rem);
  line-height: 0.3rem;
  padding-left: 0.1rem;
  color: #99c9fa;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
}
.createTask ul li select {
  height: 0.3rem;
}
textarea {
  height: 1rem;
  vertical-align: middle;
  background-color: rgba(0, 0, 0, 0.2);
}
.taskhandle .el-pagination {
  margin-bottom: 0.1rem;
}
.taskgrade input {
  line-height: 0.3rem;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  width: 100%;
  padding-left: 0.1rem;
}
.el-pagination >>> .btn-prev {
  background-color: rgba(0, 0, 0, 0.25) !important;
  color: #409eff !important;
  /* border: 1px solid #2A2D30 ; */
  border-radius: 3px;
}
.el-pagination >>> .btn-next {
  background-color: rgba(0, 0, 0, 0.25) !important;
  color: #409eff !important;
  /* border: 1px solid #2A2D30 ; */
  border-radius: 3px;
}
.el-pagination >>> .el-pager li {
  background: rgba(0, 0, 0, 0.25);
  color: #99c9fa;
}
.el-select {
  width: calc(100% - 1.6rem);
}
.createTask >>> .el-input__inner {
  height: 0.3rem;
  line-height: 0.3rem;
  border-radius: 1px;
}
.el-dialog__wrapper >>> .el-dialog {
  min-width: 4rem;
}
</style>
