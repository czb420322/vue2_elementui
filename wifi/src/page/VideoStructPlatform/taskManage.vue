<!--
 * @Author: your name
 * @Date: 2019-12-06 10:43:56
 * @LastEditTime : 2021-08-11 09:28:44
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\videoCombat\taskMan.vue
 -->
<template>
  <div class="parent">
    <!-- <headers/> -->
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/videoStrucPlat',query:{menuCode:700}}">首页 ></router-link>
      <p class="sysname">&nbsp;任务管理</p>
      <p class="clicklink">
        <router-link tag="span" :to="{path:'/videoStrucPlat',query:{menuCode:700}}">首页</router-link>
        <router-link
          tag="span"
          :to="{path:'/videoStrucPlat/resourceManage',query:{menuCode:704}}"
        >涉案视频管理</router-link>
        <!-- <router-link tag="span" :to="{path:'/videoStrucPlat/taskManage',query:{menuCode:701}}">任务管理</router-link> -->
        <router-link
          tag="span"
          :to="{path:'/videoStrucPlat/semanticSearch',query:{menuCode:702}}"
        >特征搜索</router-link>
        <router-link tag="span" :to="{path:'/videoStrucPlat/searchPrint',query:{menuCode:703}}">以图搜图</router-link>
        <router-link
          tag="span"
          :to="{path:'/videoStrucPlat/videoRetrieval',query:{menuCode:710}}"
        >检索查询</router-link>

        <router-link tag="span" :to="{path:'/videoStrucPlat/caseList',query:{menuCode:711}}">案件管理</router-link>
        <router-link tag="span" :to="{path:'/videoStrucPlat/MarkPool',query:{menuCode:712}}">标注池</router-link>
      </p>
    </div>
    <p class="splitline"></p>
    <!-- <div class="menus">
      <el-button size="small" :class="{active:currentIndex == '1' }" @click="gotoList">任务管理</el-button>
      <el-button size="small" :class="{active:currentIndex == '2' }" @click="gotosupervise">布控管理</el-button>
    </div>-->
    <div class="warpper">
      <div>
        <el-row>
          <el-col :span="3">
            <div>
              <span>任务名称 :&nbsp;</span>
              <input
                type="text"
                v-model="taskname"
                style="padding-left:10px;"
                class="searchInput firstinput"
                placeholder="请输入任务名称"
              >
            </div>
          </el-col>
          <el-col :span="3">
            <div>
              <span>任务类型 :&nbsp;</span>
              <el-select v-model="tasktype" @change="clearData" placeholder="请选择">
                <el-option label="视频检索" value="0"></el-option>
                <el-option label="视频结构化" value="1"></el-option>
                <el-option label="实时结构化" value="2"></el-option>
                <el-option label="人脸布控" value="10"></el-option>
              </el-select>
            </div>
          </el-col>

          <el-col :span="3" v-show="!isSuperVise">
            <div>
              <span>点位 :&nbsp;</span>
              <el-select
                v-model="Pointscreen"
                filterable
                collapse-tags
                @change="selectPoint"
                placeholder="全部"
              >
                <el-option label="全部" value></el-option>
                <el-option
                  v-for="item in optionsPointEnd"
                  :key="item.value"
                  :label="item.cameraName"
                  :value="item.deviceUuid"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="3">
            <div>
              <span>任务状态 :&nbsp;</span>
              <el-select v-model="taskstatus" @change="changestate" placeholder="全部">
                <el-option
                  v-for="item in optionsTwo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <!-- 这是检索，实时，结构化 -->
          <el-col :span="12" v-show="!isSuperVise">
            <div>
              <span>时间 :&nbsp;</span>
              <el-input
                id="text5"
                readonly
                class="searchInput searchtime"
                v-model="beginTime"
                placeholder="请选择开始时间"
              >
                <i slot="prefix" class="el-input__icon el-icon-time"></i>
              </el-input>-
              <el-input
                id="text6"
                readonly
                class="searchInput searchtime"
                v-model="endTime"
                placeholder="请选择结束时间"
              >
                <i slot="prefix" class="el-input__icon el-icon-time"></i>
              </el-input>&nbsp;
              <!-- 这是检索，结构化，实时的查询 -->
              <el-button
                v-show="!isSuperVise"
                class="el-icon-search searchBtn"
                size="mini"
                @click="currentPage = 1;getNewTaskData()"
              >&nbsp;&nbsp;查询</el-button>
              <el-button
                v-show="!isSuperVise"
                class="el-icon-refresh tryBtn"
                size="mini"
                @click="resets"
              >&nbsp;&nbsp;重置</el-button>
              <el-button
                class="el-icon-plus tryBtn"
                size="mini"
                @click="createOpentask"
              >&nbsp;&nbsp;新建任务</el-button>
              <!-- <el-button class="el-icon-plus tryBtn" size="mini" @click="alldelete">&nbsp;&nbsp;批量删除</el-button> -->
            </div>
          </el-col>
          <!-- 这是人脸布控 -->
          <el-col :span="13" v-show="isSuperVise">
            <div>
              <span>时间 :&nbsp;</span>
              <el-input
                id="text5"
                readonly
                class="searchInput searchtime"
                v-model="beginTime"
                placeholder="请选择开始时间"
              >
                <i slot="prefix" class="el-input__icon el-icon-time"></i>
              </el-input>-
              <el-input
                id="text6"
                readonly
                class="searchInput searchtime"
                v-model="endTime"
                placeholder="请选择结束时间"
              >
                <i slot="prefix" class="el-input__icon el-icon-time"></i>
              </el-input>&nbsp;
              <!-- 这是人脸布控的查询-->
              <el-button
                v-show="isSuperVise"
                class="el-icon-search searchBtn"
                size="mini"
                @click="currentPage = 1;getManFaceVise()"
              >&nbsp;&nbsp;查询</el-button>
              <el-button
                v-show="isSuperVise"
                class="el-icon-refresh tryBtn"
                size="mini"
                @click="reset"
              >&nbsp;&nbsp;重置</el-button>
              <el-button
                class="el-icon-plus tryBtn"
                size="mini"
                @click="createOpentask"
              >&nbsp;&nbsp;新建任务</el-button>
              <el-button
                class="el-icon-plus tryBtn"
                size="mini"
                @click="allVisedelete"
              >&nbsp;&nbsp;批量删除</el-button>
            </div>
          </el-col>
        </el-row>

        <el-table
          v-show="!isSuperVise"
          :data="tableData"
          border
          style="width: 100%"
          height="6.5rem"
          id="tables"
          @selection-change="handleSelectionChange"
          :row-key="getRowKeyId"
        >
          <div slot="empty">
            <div class="noImg">
              <img src="../../assets/updataImg/NoData.png">
            </div>
          </div>
          <!-- <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column> -->
          <el-table-column label="编号" width="60" :key="1">
            <template slot-scope="scope">
              <span>{{(scope.$index + 1) + (currentPage-1)*pageSize}}</span>
            </template>
          </el-table-column>
          <el-table-column label="任务名称" prop="taskName" show-overflow-tooltip width="300" :key="2">
            <template slot-scope="scope">
              <span
                :class="istaskName == 1 ? 'showDecoration' : 'styles'"
                @click="opdioag(scope.$index,scope.row);"
              >{{scope.row.taskName == undefined ? scope.row.searchName : scope.row.taskName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="任务类型" :formatter="formatasktype" :key="3"></el-table-column>
          <el-table-column
            prop="commitTime"
            show-overflow-tooltip
            :formatter="formataskTime"
            label="创建时间"
            :key="4"
          ></el-table-column>
          <el-table-column
            prop="cameraName"
            show-overflow-tooltip
            label="点位名称"
            :key="5"
            v-if="tasktype != 4 && tasktype != 6 && $route.path != '/videoCombat/videoplay'"
          ></el-table-column>
          <el-table-column v-if="tasktype != 2" prop="progress" :key="6" label="任务进度">
            <template slot-scope="scope">
              <el-progress
                :percentage="scope.row.progress.indexOf('/') != -1 ? (Number(scope.row.progress.split('/')[0]) + Number(scope.row.progress.split('/')[1]))/2 : Number(scope.row.progress) > 100 ? 100 : Number(scope.row.progress)"
                color="#8e71c7"
              ></el-progress>
            </template>
          </el-table-column>
          <el-table-column prop="status" :formatter="formatStatus" label="任务状态" :key="8"></el-table-column>
          <el-table-column
            prop="realTimeStatus"
            v-if="tasktype == 2"
            :formatter="formatdeviceStatus"
            label="设备状态"
            :key="9"
          ></el-table-column>

          <el-table-column label="操作" :width="480 * ratio">
            <template slot-scope="scope" class="scopetype">
              <el-button
                class="el-icon-view searchBtn"
                size="mini"
                v-if="tasktype != 2"
                :disabled="scope.row.status != 0 "
                @click="lookTaskInfo(scope.row)"
              >&nbsp;查看</el-button>
              <el-button
                type="success"
                class="el-icon-top topBtn"
                size="mini"
                v-if="tasktype == 0 || tasktype == 1"
                :disabled="scope.row.status == null || scope.row.status == 0 || scope.row.status == 1 || scope.row.status == 4
                                || scope.row.status == 5 ||scope.row.status == 6 || scope.row.status == 9 || scope.row.status == 10 || btndisList[scope.$index]"
                @click="getstick(scope.row,scope.$index)"
              >&nbsp;置顶</el-button>
              <el-button
                type="warning"
                class="el-icon-video-pause tryBtn"
                size="mini"
                v-if="tasktype == 0 || tasktype == 1"
                :disabled="scope.row.status != 10 || scope.row.showlist"
                @click="retry(scope.row,scope.$index)"
              >&nbsp;重试</el-button>
              <el-button
                type="danger"
                class="el-icon-circle-close delBtn"
                size="mini"
                v-if="tasktype != 2"
                :disabled="scope.row.status == 1"
                @click="deleteTask(scope.row)"
              >&nbsp;删除</el-button>
              <!-- <el-button
                class="el-icon-search searchBtn"
                size="mini"
                v-if="tasktype == 1"
                :disabled="scope.row.status != 0 "
                @click="inevs(scope.row)"
              >&nbsp;排查</el-button>-->
              <el-button
                class="el-icon-view searchBtn"
                size="mini"
                v-if="tasktype == 2"
                @click="lookTaskInfo(scope.row)"
              >&nbsp;查看</el-button>
              <el-button
                class="el-icon-video-play beginBtn"
                size="mini"
                v-if="tasktype == 2 && scope.row.status == 2"
                @click="beginTask(scope.row)"
              >&nbsp;开始</el-button>
              <el-button
                class="el-icon-video-pause tryBtn"
                size="mini"
                v-if="tasktype == 2 && scope.row.status == 1"
                @click="stopTask(scope.row)"
              >&nbsp;停止</el-button>
              <el-button
                primary="danger"
                class="el-icon-circle-close delBtn"
                size="mini"
                v-if="tasktype == 2"
                :disabled="scope.row.status == 1"
                @click="delTask(scope.row)"
              >&nbsp;删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-table
          v-show="isSuperVise"
          :data="superviseTableData"
          border
          style="width: 100%"
          height="6.5rem"
          id="superviseTable"
          @selection-change="handleSelectionChanges"
          :row-key="getRowKeyId"
        >
          <div slot="empty">
            <div class="noImg">
              <img src="../../assets/updataImg/NoData.png">
            </div>
          </div>
          <!-- <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column> -->
          <el-table-column label="序号" width="60" :key="1">
            <template slot-scope="scope">
              <span>{{(scope.$index + 1) + (currentPage-1)*pageSize}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="布控名称"
            prop="taskDeployName"
            show-overflow-tooltip
            width="300"
            :key="2"
          ></el-table-column>
          <el-table-column prop="deviceNumber" label="设备数量" :key="3"></el-table-column>
          <el-table-column prop="faceDbNumber" show-overflow-tooltip label="库数量" :key="4"></el-table-column>
          <el-table-column prop="beginTime" show-overflow-tooltip label="开始时间" :key="5"></el-table-column>
          <el-table-column prop="expectEndTime" show-overflow-tooltip label="结束时间" :key="6"></el-table-column>
          <el-table-column prop="commitUser" label="布控人" :key="7"></el-table-column>
          <el-table-column prop="status" :formatter="formatStatusVise" label="任务状态" :key="8"></el-table-column>

          <el-table-column label="操作" width="330">
            <template slot-scope="scope" class="scopetype">
              <el-button
                class="el-icon-view searchBtn"
                size="mini"
                @click="lookViseTaskInfo(scope.row)"
              >&nbsp;查看</el-button>
              <el-button
                class="el-icon-video-pause tryBtn"
                size="mini"
                :disabled="scope.row.status != 1"
                @click="stopViseTask(scope.row)"
              >&nbsp;停止</el-button>
              <el-button
                type="danger"
                class="el-icon-circle-close delBtn"
                size="mini"
                @click="deleteViseTask(scope.row)"
              >&nbsp;删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="dialogBtm">
          <span v-if="tasktype != 2 && tasktype != 10">
            当前系统有
            <span style="color:#d16f66">{{num}}</span> 个任务在排队
          </span>
          <el-pagination
            ref="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[15, 30, 45]"
            :page-size="pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </div>
      </div>
    </div>

    <create-task :opentask="opentask" @childByClose="childByClose"></create-task>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import NewTaskMan from "../../api/newCaseVideo/NewTaskMan.js";
import beginEnd from "../../api/realvideo/BenEedTime.js"; //时间
import createTask from "./resourceManCompon/createTask";
export default {
  data() {
    return {
      opentask: false,
      //   Pointscreen: [], //点位选择的值
      optionsPointEnd: [], //点位所有值
      setCount: 200,
      ratio: 0,
      readSelectTaskList: [], //批量删除非布控任务的数组
      readSelectViseTaskList: [] //批量删除布控任务的数组
    };
  },
  computed: {
    linstne() {
      const {
        taskname,
        tasktype,
        Pointscreen,
        taskstatus,
        beginTime,
        endTime
      } = this;
      return {
        taskname,
        tasktype,
        Pointscreen,
        taskstatus,
        beginTime,
        endTime
      };
    }
  },
  mixins: [NewTaskMan, beginEnd],
  components: {
    createTask
  },
  watch: {
    linstne(val) {
      if (
        val.taskname != "" ||
        val.tasktype != "" ||
        this.Pointscreen != "" ||
        this.taskstatus != "" ||
        this.beginTime != "" ||
        this.endTime != "" ||
        this.currentPage != 1 ||
        this.pageSize != 15
      ) {
        this.currentPage = 1;
        if (val.tasktype == 10) {
          this.isSuperVise = true;
          this.getManFaceVise();
        } else {
          this.isSuperVise = false;
          this.getNewTaskData();
        }
      }
    }
  },
  created() {
    let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    this.ratio = deviceWidth / 1920;
  },
  mounted() {
    this.caseUuid = sessionStorage.getItem("exclusiveCaseUuid");
    this.getRegionArea(this.caseUuid);
    let flagsearch = this.$route.query.flagsearch;
    if (flagsearch == 1) {
      let timeinterval = null;
      this.$nextTick(() => {
        this.OpenTheTime("#text5", "#text6");
        this.endTime = this.$storage.getSession("searchInfo").endTime;
        if (this.endTime == "") {
          document.getElementById("text6").value = "";
        }
      });
      this.taskname = this.$storage.getSession("searchInfo").taskname;
      this.tasktype = this.$storage.getSession("searchInfo").tasktype;
      this.Pointscreen = this.$storage.getSession("searchInfo").Pointscreen;
      this.taskstatus = this.$storage.getSession("searchInfo").taskstatus;
      this.beginTime = this.$storage.getSession("searchInfo").beginTime;
      this.pageSize = this.$storage.getSession("searchInfo").pageSize;
      // this.currentPage = this.$storage.getSession('searchInfo').currentPage
      clearInterval(timeinterval);
      timeinterval = setInterval(() => {
        if (this.tableData.length) {
          this.handleCurrentChange(
            this.$storage.getSession("searchInfo").currentPage
          );
          clearInterval(timeinterval);
        }
      }, 100);
    }else if(flagsearch == 2){
        //检索
        this.tasktype = "0";
        this.pageSize = 15;
        this.$nextTick(() => {
            this.OpenTheTime("#text5", "#text6");
            document.getElementById("text6").value = "";
        });
    } else {
        //结构化
      this.tasktype = "1";
      this.pageSize = 15;
      this.$nextTick(() => {
        this.OpenTheTime("#text5", "#text6");
        document.getElementById("text6").value = "";
      });
    }
    this.lineUpTime();
    if (this.tasktype == 10) {
      this.isSuperVise = true;
      this.getManFaceVise();
    } else {
      this.isSuperVise = false;
      this.getNewTaskData();
    }
  },
  methods: {
    ...mapMutations([
      "setretrievalInfo" // 设置检索数据
    ]),
    createOpentask() {
      this.opentask = true;
    },
    //结构化，检索，实时批量删除
    alldelete() {
      this.$myconfirm({
        type: "提示",
        msg: "删除任务会导致数据全部丢失，是否确定删除？",
        icon: 1,
        btn: {
          ok: "确定",
          no: "取消"
        }
      }).then(() => {
        let _this = this;
        let list = [];
        for (let i = 0; i < this.readSelectTaskList.length; i++) {
          list.push(
            new Promise((resove, rej) => {
              let data = {
                id: this.readSelectTaskList[i].taskUuid
              };
              console.log(data, "准备删掉的数据");
              data = this.$qs.stringify(data);
              // this.$http.post("vsas/task/delete", data).then(res => {
              //   resove(res.data.data);
              // });
            })
          );
        }
        //执行批量删除任务的方法
        Promise.all(list)
          .then(response => {})
          .catch(() => {});
      });
    },
    //布控任务批量删除
    allVisedelete() {
      this.$myconfirm({
        type: "提示",
        msg: "删除任务会导致数据全部丢失，是否确定删除？",
        icon: 1,
        btn: {
          ok: "确定",
          no: "取消"
        }
      }).then(() => {
        let _this = this;
        let list = [];
        for (let i = 0; i < this.readSelectViseTaskList.length; i++) {
          list.push(
            new Promise((resove, rej) => {
              let data = {
                id: this.readSelectViseTaskList[i].taskDeployId
              };
              console.log(data, "准备删掉的数据");
              data = this.$qs.stringify(data);
              // this.$http.post("vsas/task/delete", data).then(res => {
              //   resove(res.data.data);
              // });
            })
          );
        }
        //执行批量删除任务的方法
        Promise.all(list)
          .then(response => {})
          .catch(() => {});
      });
    },
    childByClose(val) {
      this.tasktype = val;
      if (this.tasktype == 10) {
        this.isSuperVise = true;
        this.getManFaceVise();
      } else {
        this.isSuperVise = false;
        this.lineUpTime();
        this.getNewTaskData();
      }
    },
    lookTaskInfo(row) {
      let obj = {};
      obj = Object.assign(this.linstne, {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      this.$storage.setSession("searchInfo", obj);
      if (this.tasktype == 0) {
        this.$router.push({
          path: "/videoStrucPlat/videoRetrieval?menuCode=710",
          query: {
            taskUuid: row.taskUuid,
            deviceId: row.deviceId
          }
        });
        this.setretrievalInfo(row);
      } else if (this.tasktype == 1 || this.tasktype == 2) {
        this.$router.push({
          path: "/videoStrucPlat/semanticSearch?menuCode=702",
          query: {
            id: row.taskUuid,
            did: row.deviceId
          }
        });
      }
    },
    //快速排查
    inevs(row) {
      this.$router.push({
        path: "/videoStrucPlat/semanticSearch?menuCode=702",
        query: {
          taskinfo: row,
          type: 1
        }
      });
    },
    selectPoint(val) {
      this.Pointscreen = val;
    },
    getRegionArea(caseUuid) {
      let data = {
        caseUuid: caseUuid
      };
      data = this.$qs.stringify(data);
      this.$http.post("/vsas/structure/allDeviceUuidStruct", data).then(res => {
        this.optionsPointEnd = res.data.data;
      });
    },
    //重置检索，结构化，实时
    resets() {
      this.currentPage = 1;
      this.taskname = "";
      this.endTime = "";
      this.beginTime = "";
      this.tasktype = "1"; //任务类型
      this.taskstatus = ""; //任务状态
      this.Pointscreen = ""; //点位
      this.lineUpTime();
      this.resetTime();
      this.getNewTaskData();
    },
    //人脸布控的重置
    reset() {
      this.currentPage = 1;
      this.taskname = "";
      this.endTime = "";
      this.beginTime = "";
      this.tasktype = "10"; //任务类型
      this.taskstatus = ""; //任务状态
      this.resetTime();
      this.getManFaceVise();
    },
    //实时结构化开始
    beginTask(row) {
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "正在开始任务"
      });
      let data = {
        taskUuid: row.taskUuid
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/task/sky/resume", data).then(res => {
        this.loading.close();
        this.getNewTaskData();
        this.$notify({
          type: "success",
          message: "开始任务",
          position: "bottom-right",
          duration: 3000
        });
      });
    },
    //实时结构化停止
    stopTask(row) {
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "正在停止任务"
      });
      let data = {
        taskUuid: row.taskUuid
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/task/sky/pause", data).then(res => {
        this.loading.close();
        this.getNewTaskData();
        this.$notify({
          type: "success",
          message: "停止任务",
          position: "bottom-right",
          duration: 3000
        });
      });
    },
    //实时结构化删除
    delTask(row) {
      this.$myconfirm({
        type: "提示",
        msg: "删除该任务会导致相关分析结果丢失，是否删除",
        icon: 1,
        btn: {
          ok: "确定",
          no: "取消"
        }
      }).then(() => {
        let data = {
          taskUuid: row.taskUuid
        };
        data = this.$qs.stringify(data);
        this.$http.post("vsas/task/deleteNow", data).then(res => {
          this.getNewTaskData();
          this.$notify({
            type: "success",
            message: "删除成功",
            position: "bottom-right",
            duration: 3000
          });
        });
      });
    },
    //非布控任务，用户选择的列表
    handleSelectionChange(val) {
      this.readSelectTaskList = val;
    },
    //布控任务，用户选择的列表
    handleSelectionChanges(val) {
      console.log(val, "val");
      this.readSelectViseTaskList = val;
    },
    getRowKeyId(row) {
      return row.taskUuid;
    }
  },
  destroyed() {
    clearTimeout(this.timeId);
    clearTimeout(this.timeId2);
    this.setCount = 200;
  }
};
</script>

<style scoped>
@import "../../assets/css/commom.css";
.topInfo {
  border-bottom: 0px;
}
.parent {
  width: 100%;
  position: absolute;
  top: 0.6rem;
  bottom: 0px;
  left: 0px;
}
.el-col {
  font-size: 0.14rem;
}
.el-col-3 .el-select {
  width: calc(100% - 0.9rem);
}
.el-select .el-input,
.el-select /deep/ .el-input {
  width: 90%;
}
.splitline {
  width: 100%;
  height: 0.02rem;
  background: #333232;
}
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.6rem;
  color: #909399;
  padding-top: 0.1rem;
  font-size: 0.14rem;
  text-align: center;
}
footer img {
  vertical-align: middle;
}

.el-select .el-input__inner,
.el-select /deep/ .el-input__inner {
  font-size: 0.14rem;
}

.warpper {
  width: 100%;
  min-width: 1200px;
  position: absolute;
  top: 0.6rem;
  bottom: 0.3rem;
  left: 0;
  overflow: auto;
  padding: 0.2rem 0.34rem 0 0.34rem;
}

.menus .el-button {
  width: 1rem;
  margin-right: 0.2rem;
  padding: 0.12rem 0.2rem;
  font-size: 0.14rem;
}

.el-button {
  background-color: rgba(64, 158, 225, 0.25);
  color: #eceef0;
  border: 1px solid rgba(52, 138, 226, 0.25);
}
.el-button--primary {
  background: #2981dc;
  border: 0px solid #000;
}
.el-row {
  margin-bottom: 0.2rem;
  line-height: 0.3rem;
  text-align: center;
}
.searchInput {
  height: 0.28rem;
  line-height: 0.28rem;
  width: 25%;
  border-radius: 3px;
}
.searchtime .el-input__icon,
.searchtime /deep/ .el-input__icon {
  line-height: 0.25rem;
}
.firstinput {
  width: calc(100% - 1rem);
}
.dialogBtm > span {
  display: block;
  margin-top: 0.1rem;
  font-size: 0.14rem;
}
.el-progress .el-progress-bar,
.el-progress /deep/ .el-progress-bar {
  width: 90%;
}
.el-progress .el-progress__text,
.el-progress /deep/ .el-progress__text {
  width: 0.5rem;
  color: #99c9fa;
  margin-left: 0.03rem;
  font-size: 0.12rem !important;
}
.el-pagination {
  margin-top: 0.1rem;
}
.menus .el-button--default {
  color: #99c9fa;
  border: 0px !important;
  background-color: transparent !important;
  background: url("../../assets/images/videoNewImg/btnhover.png") no-repeat
    center center / 100% 100%;
}

.active {
  color: #409eff !important;
}

@media (max-width: 1440px) {
  .el-col-12 .el-button {
    padding: 0.05rem 0.1rem;
  }
}
</style>



