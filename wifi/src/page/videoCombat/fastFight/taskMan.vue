<!--
 * @Author: your name
 * @Date: 2019-12-23 08:52:53
 * @LastEditTime : 2021-05-28 10:43:56
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\videoCombat\fastFight\taskMan.vue
 -->
<template>
  <div>
    <el-dialog
      title="任务管理"
      height="6rem"
      top="8vh"
      :visible.sync="dialogVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="77%"
      @close="closeDia"
      @open="openTaskMan"
    >
      <div>
        <el-row>
          <el-col :span="3.5">
            <div>
              <span>任务名称 :&nbsp;</span>
              <input
                type="text"
                v-model="taskname"
                style="padding-left:10px;"
                class="searchInput"
                placeholder="请输入任务名称"
              >
            </div>
          </el-col>
          <el-col
            v-show="(this.glstStrus == 'true' || this.zkyStructureSwitch == 'true') &&  $route.path == '/videoCombat/addcasetwo'"
            :span="4"
          >
            <div>
              <span>任务类型 :&nbsp;</span>
              <el-select v-model="tasktype" @change="clearData" placeholder="请选择">
                <el-option
                  v-for="item in optionsOneStrus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col
            v-show="$route.path == '/videoCombat/addcasetwo' && tasktype != 6 && tasktype != 4"
            :span="3.5"
          >
            <div>
              <span>点位 :&nbsp;</span>
              <el-select v-model="Pointscreen" @change="PointclearData" placeholder="全部">
                <el-option label="全部" value></el-option>
                <el-option
                  v-for="item in optionsPoint"
                  :key="item.value"
                  :label="item.cameraName"
                  :value="item.deviceUuid"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="4">
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
          <el-col :span="10">
            <div v-if="dialogVisible">
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
              <el-button
                class="el-icon-search searchBtn"
                @click="currentPage = 1;getNewTaskData()"
              >&nbsp;&nbsp;查询</el-button>
              <el-button class="el-icon-refresh tryBtn" @click="reset">&nbsp;&nbsp;重置</el-button>
              <!-- <el-button class="el-icon-refresh tryBtn" @click="deleteAll">&nbsp;&nbsp;删除所有</el-button> -->
              <!-- &nbsp; -->
              <!-- <el-button type="danger" @click="reset">重置</el-button> -->
            </div>
          </el-col>
        </el-row>

        <el-table
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          border
          style="width: 100%"
          height="5.05rem"
          id="tables"
        >
          <div slot="empty">
            <div class="noImg">
              <img src="../../../assets/updataImg/NoData.png">
            </div>
          </div>
          <el-table-column label="编号" type="index" width="60"></el-table-column>
          <el-table-column label="任务名称" prop="taskName" show-overflow-tooltip width="180">
            <template slot-scope="scope">
              <span
                :class="istaskName == 1 ? 'showDecoration' : 'styles'"
                @click="opdioag(scope.$index,scope.row);"
              >{{scope.row.taskName == undefined ? scope.row.searchName : scope.row.taskName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="任务类型" :formatter="formatasktype"></el-table-column>
          <el-table-column
            prop="commitTime"
            show-overflow-tooltip
            :formatter="formataskTime"
            label="创建时间"
          ></el-table-column>
          <el-table-column
            prop="cameraName"
            show-overflow-tooltip
            label="点位名称"
            v-if="tasktype != 4 && tasktype != 6 && $route.path == '/videoCombat/addcasetwo'"
          ></el-table-column>
          <el-table-column prop="progress" :key="Math.random()" label="任务进度">
            <template slot-scope="scope">
              <el-progress
                :percentage="scope.row.progress.indexOf('/') != -1 ? (Number(scope.row.progress.split('/')[0]) + Number(scope.row.progress.split('/')[1]))/2 : Number(scope.row.progress)"
                color="#8e71c7"
              ></el-progress>
            </template>
          </el-table-column>
          <el-table-column
            v-if="tasktype == 0"
            :key="Math.random()"
            prop="successRate"
            label="任务成功率"
          >
            <template slot-scope="scope">
              <!-- <el-popover trigger="click" @show="showbadvideo(scope.$index,scope.row)" placement="right"> -->
              <!-- <p v-show="loseList.length > 0">失败视频：</p>
                <p v-if="scope.row.status == 0 && (tasktype == 0 || tasktype == 1)">任务已完成</p>
                <p v-if="scope.row.status != 9 && scope.row.status != 0 && (tasktype == 0 || tasktype == 1)">当前任务正在进行中，请稍等...</p>
              <p v-if="scope.row.status == 9">当前任务已停止，请稍等...</p>-->
              <!-- <p v-show="isuploading">当前任务正在进行中，请稍等...</p> -->
              <div class="losevideo">
                <ol>
                  <li
                    v-for="(item,index) in loseList"
                    :key="index"
                    :title="item.fileName"
                    class="fadeInfo"
                  >{{index + 1}}. &nbsp;{{item.fileName}}</li>
                </ol>
              </div>
              <div slot="reference" class="name-wrapper">
                <el-progress :percentage="Number(scope.row.successRate)" color="#8e71c7"></el-progress>
              </div>
              <!-- </el-popover> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            :key="Math.random()"
            :formatter="formatStatus"
            label="任务状态"
          ></el-table-column>

          <el-table-column label="操作" width="350" v-if="tasktype != 8">
            <template slot-scope="scope" class="scopetype">
              <!-- <el-button
                type="primary"
                class="beginBtn"
                :disabled="scope.row.showlist"
                v-if="scope.row.status == 9 && (tasktype == 0 || tasktype == 1)"
                @click="beginTask(scope.row,scope.$index)"
              >
                <img src="../../../assets/images/videoCombat/begin.png" alt>&nbsp;&nbsp;开始
              </el-button> -->
              <!-- <el-button
                type="primary"
                class="searchBtn"
                v-if="tasktype == 0 || tasktype == 1"
                :disabled="scope.row.status != 1 || scope.row.showlist || tasktype == 1"
                @click="suspend(scope.row,$event,scope.$index)"
              >
                <img src="../../../assets/images/videoCombat/begin.png" alt>&nbsp;&nbsp;停止
              </el-button> -->

              <!-- <el-button type="primary"  class="searchBtn" :disabled="true"><img src="../../../assets/images/videoCombat/begin.png" alt="">&nbsp;&nbsp;停止</el-button> -->
              <!-- <el-button type="warning"  class="tryBtn" :disabled="true"><img src="../../../assets/images/videoCombat/suspend.png" alt="">&nbsp;&nbsp;重试</el-button> -->
              <el-button
                type="success"
                class="topBtn"
                v-if="tasktype == 0 || tasktype == 1"
                :disabled="scope.row.status == null || scope.row.status == 0 || scope.row.status == 1 || scope.row.status ==4
              || scope.row.status == 5 ||scope.row.status == 6 || scope.row.status == 9 || scope.row.status == 10 || btndisList[scope.$index]"
                @click="getstick(scope.row,scope.$index)"
              >
                <img src="../../../assets/images/videoCombat/Stick.png" alt>&nbsp;&nbsp;置顶
              </el-button>

              <el-button
                type="warning"
                class="tryBtn"
                v-if="tasktype == 0 || tasktype == 1"
                :disabled="scope.row.status != 10 || scope.row.showlist"
                @click="retry(scope.row,scope.$index)"
              >
                <img src="../../../assets/images/videoCombat/suspend.png" alt>&nbsp;&nbsp;重试
              </el-button>

              <el-button
                type="danger"
                class="delBtn"
                v-if="tasktype == 0 || tasktype == 1 || tasktype == 6"
                @click="deleteTask(scope.row)"
              >
                <img src="../../../assets/images/videoCombat/cancel.png" alt>&nbsp;&nbsp;删除
              </el-button>
              <!-- <el-button type="primary" class="searchBtn" v-no-more-click v-if="tasktype == 4 || tasktype == 5 || tasktype == 7" @click="downloadTask(scope.row)"><i class="iconfont icon-download"></i>下载</el-button> -->
              <!-- <i class="iconfont" v-if="tasktype == 4">已下载</i> -->
              <el-button
                type="primary"
                class="searchBtn"
                v-no-more-click
                v-if="tasktype == 4 || tasktype == 5 || tasktype == 7"
                @click="downloadTask(scope.row,scope.$index)"
              >
                <i class="iconfont icon-download"></i>下载
              </el-button>
              <el-button class="el-button topBtn el-button-success" v-if="scope.row.flag">
                <i class="iconfont"></i>已下载
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="dialogBtm">
          <span>
            当前系统有
            <span style="color:#d16f66">{{num}}</span> 个任务在排队
          </span>
          <el-pagination
            ref="pagination"
            v-if="dialogVisible"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30]"
            :page-size="pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="dialogVisible = false">关 闭</el-button>
        <!-- <el-button @click="dialogVisible = false"></el-button>
        <el-button @click="dialogVisible = false"></el-button>-->
      </span>
    </el-dialog>
    <!-- 检索任务详情 -->
    <detailRetervals
      :isOpenDetail="isOpenDetail"
      :proptaskUuid="proptaskUuid"
      @childretrieval="childretrieval"
      @childByDetail="childByDetail"
    ></detailRetervals>
    <!-- 结构化任务结果详情页面 -->
    <videoStrus
      :isopenStrus="isopenStrus"
      :proptaskUuid="proptaskUuid"
      @strusclose="strusclose"
      @childByStrus="childByStrus"
    ></videoStrus>
    <!-- 查看图片上传任务结果界面 -->
    <lookBayonet
      :lookbayonet="lookbayonet"
      :proptaskUuid="proptaskUuid"
      :currentData="currentData"
      @childBylookbayonet="childBylookbayonet"
      @openFastSearchCar="openFastSearchCar"
    ></lookBayonet>

    <el-dialog title="检索任务详情" :visible.sync="dialogVisible1" width="40%" class="dialog">
      <div>
        <div class="diatop">
          <div>
            <p>|&nbsp;&nbsp;分析规则设置</p>大小：
            <span>{{size | targetsize}}</span>&nbsp;&nbsp;&nbsp;
            清晰度：
            <span>{{clarity | targetqxd}}</span>&nbsp;&nbsp;&nbsp;
            检索方式：
            <span>{{type | retrimodel}}</span>
          </div>
        </div>
        <div class="diabtn">
          <p>|&nbsp;&nbsp;录像处理列表</p>
          <el-table :data="videoProse" border height="3rem" style="width: 100%">
            <el-table-column label="编号">
              <template slot-scope="scope">
                <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip label="任务名称">
              <template slot-scope="scope">{{DetailList2.taskName}}</template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="fileUrl" :formatter="names" label="视频名称"></el-table-column>
            <el-table-column prop="nprogress" label="进度">
              <template slot-scope="scope">
                <el-progress
                  :text-inside="true"
                  :stroke-width="18"
                  :percentage="parseInt(scope.row.progress)"
                  status="exception"
                ></el-progress>
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">{{DetailList2.status | status }}</template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible1 = false" class="cancleBtn">取 消</el-button>
        <el-button type="primary" @click="clickTerval(DetailList2)" class="passBtn">详 情</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import NewTaskMan from "../../../api/newCaseVideo/NewTaskMan.js";
import beginEnd from "../../../api/realvideo/BenEedTime.js"; //时间
import detailRetervals from "../detailRetervals";
import lookBayonet from "./lookBayonet";
// import videoStrus from '../structuring/videoStrus'  //视频结构化详情页面
import { mapActions, mapMutations, mapState, mapGetters } from "vuex"; //引入vuex

export default {
  data() {
    return {
      dialogVisible: false,
      zkyStructureSwitch: false,
      loseList: [],
      allSuccess: false
      // isuploading:false,
      // isdownload:false,//是否已经下载了结构化结果
    };
  },
  props: {
    showTaskMan: Boolean,
    deviceid: String,
    caseUuid: String,
    taskText: Number,
    pointInfoList: Array,
    dataCaseInfo: Object
  },
  watch: {
    showTaskMan(val) {
      this.dialogVisible = val;
    }
  },
  components: {
    detailRetervals,
    lookBayonet //卡口数据上传结果
  },
  computed: {
    ...mapGetters([
      "searchImgBtn", // 以图搜图图片
      "targetToSearchImg",
      "targetToSearchImgCar",
      "targetToOenStrus"
    ])
  },
  mounted() {
    this.$nextTick(() => {
      let _this = this;
      document.onkeydown = function(e) {
        var key = window.event.keyCode;
        if (key == "13") {
          let value = parseInt($(".is-in-pagination .el-input__inner").val());
          _this.handleCurrentChange(value);
        }
      };
    });
  },
  mixins: [NewTaskMan, beginEnd],
  methods: {
    ...mapMutations([
      "setglststrusInfo", //通过一次排查的返回来更改返回值
      "setdeviceInfo",
      "settargetToOenStrus", //设置当前点击的位置
      "settargetToSearchImg",
      "settargetToSearchImgCar",
      "setstrusResult"
    ]),

    //关闭模态框
    closeDia() {
      this.Pointscreen = "";
      this.optionsPoint = [];
      this.loseList = [];
      if (this.$route.path != "/videoCombat/videoplay") {
        OnExit();
        CloseVodPlayer();
      }
      window.axiosProArr.forEach((e, i) => {
        if (sessionStorage.getItem("isUploadTrue") != 1) {
          e.cancle();
          delete window.axiosProArr[i];
        }
      });
      let title = document.title + ".";
      this.$emit(
        "childByTaskMan",
        false,
        title,
        this.videolist,
        this.deltakslist,
        this.taskInfo,
        this.taskIndex
      );
      clearInterval(this.timeId);
      this.taskname = "";
      this.taskstatus = "";
      this.beginTime = "";
      this.endTime = "";
      this.currentPage = 1;
      this.pageSize = 10;
      this.num = 0;
      this.tableData = [];
      this.istaskName = null;
    },
    //打开模态框
    openTaskMan() {
      // 传过来的点位信息
      if (this.$route.path != "/videoCombat/videoplay") {
        if (this.pointInfoList.length) {
          for (let i = 0; i < this.pointInfoList.length; i++) {
            // 天网，社会面，临时点，卡口点
            if (
              this.pointInfoList[i].cameraType == 5 ||
              this.pointInfoList[i].cameraType == 4 ||
              this.pointInfoList[i].cameraType == 1 ||
              this.pointInfoList[i].cameraType == 8
            ) {
              this.optionsPoint.push(this.pointInfoList[i]);
            }
          }
        }
      }

      //快速打开卡口上传
      if (this.targetToSearchImgCar.type == 1) {
        this.$nextTick(() => {
          this.tasktype = "8";
          this.lookbayonet = true;
          this.proptaskUuid = this.targetToSearchImgCar.taskUuid;
          this.currentPage = this.targetToSearchImgCar.parentPage;
          this.pageSize = 10;
          let data = {
            type: 0
          };
          this.settargetToSearchImgCar(data);
        });
      }

      //快速打开结构化页面
      if (this.targetToSearchImg.type == 3) {
        this.tasktype = "1";
        this.isopenStrus = true;
        this.setglststrusInfo({});
        this.proptaskUuid = this.targetToSearchImg.taskUuid;
      } else {
        this.tasktype = "0";
      }
      clearInterval(this.timeId);
      this.glstStrus = sessionStorage.getItem("glstStructureSwitch");
      this.zkyStructureSwitch = sessionStorage.getItem("zkyStructureSwitch");
      this.deltakslist = [];
      this.videolist = [];

      this.$nextTick(() => {
        this.OpenTheTime("#text5", "#text6");
        document.getElementById("text6").value = "";
      });
      this.lineUpTime();
      this.getNewTaskData();
      // if(this.tasktype == 4){
      // //每一次打开的时候判断session是否有值
      //   if(window.sessionStorage.getItem("downloadList")){
      //     let str = JSON.parse(sessionStorage.getItem("downloadList"))
      //     console.log(str,"aaaaaaaaaaaaaaaaaaaaa");
      //   }else {
      //     let arr = []
      //     // window.sessionStorage.setItem("downloadList",JSON.stringify(arr))
      //     // console.log("没有进，就手动设置一个")
      //   }
      // }
    },
    showbadvideo(index, row) {
      this.loseList = [];
      if (row.status == 0 && row.successRate != 100) {
        //  this.allSuccess = false;
        // this.isuploading = false;
        let data = {
          taskUuid: row.taskUuid
        };
        this.$http
          .get("vsas/task/list/fileInfo/successRate", { params: data })
          .then(res => {
            if (res.data.code == 200) {
              this.loseList = res.data.data;
            }
          });
      } else if (row.status == 0 && row.successRate == 100) {
        // console.log("全部完成进这个,false");
        this.allSuccess = true;
        //  this.isuploading = false;
      } else if (row.status != 0 && row.successRate != 100) {
        // console.log(123);
        // this.allSuccess = false;
        // this.isuploading = true
      }
    }
  },
  destroyed() {
    clearInterval(this.timeId);
  }
};
</script>

<style scoped>
@import "../../../assets/css/commom.css";
.diatop,
.diabtn {
  color: #99c9fa;
}
.el-row {
  margin-bottom: 0.2rem;
  line-height: 0.3rem;
  text-align: center;
}
.searchInput {
  line-height: 0.26rem;
  width: 1.2rem;
  border-radius: 3px;
}
.el-col-12 .el-button {
  padding: 0.07rem 0.1rem;
}
.el-col-10 .el-button {
  padding: 0 0.1rem;
  height: 0.28rem;
}
.searchtime {
  width: 1.8rem;
}
.el-select {
  width: 1.1rem;
}
.el-input__prefix {
  left: 13px;
}
.caseNameSelect {
  width: 1.5rem;
  color: #c5c5c5;
}
.caseNameSelectDate {
  width: 2rem;
  font-size: 0.14rem;
}
.el-select /deep/ .el-input__inner {
  height: 0.28rem;
}
.dialogBtm {
  margin-top: 0.1rem;
  color: #99c9fa;
}
.dialogBtm .el-pagination {
  float: right;
}
.btn {
  display: inline-block;
  width: 0.65rem;
  height: 0.25rem;
  vertical-align: middle;
  background-size: 100% 100%;
  margin-right: 0.1rem;
  cursor: pointer;
}
.el-progress /deep/ .el-progress__text {
  width: 0.4rem;
  color: #99c9fa;
  margin-left: 0.08rem;
  font-size: 0.12rem !important;
}
.btn1 {
  background: url("../../../assets/images/videoNewImg/formBtn/beginnormal.png")
    no-repeat center center;
}
.btn1:hover {
  background: url("../../../assets/images/videoNewImg/formBtn/beginhover.png")
    no-repeat center center;
}
.btn2 {
  background: url("../../../assets/images/videoNewImg/formBtn/stopnormal.png")
    no-repeat center center;
}
.btn2-1 {
  background: url("../../../assets/images/videoNewImg/formBtn/stopdisable.png")
    no-repeat center center;
}
.btn2:hover {
  background: url("../../../assets/images/videoNewImg/formBtn/stophover.png")
    no-repeat center center;
}
.btn3 {
  background: url("../../../assets/images/videoNewImg/formBtn/trynormal.png")
    no-repeat center center;
}
.btn3:hover {
  background: url("../../../assets/images/videoNewImg/formBtn/tryhover.png")
    no-repeat center center;
}
.btn3-1 {
  background: url("../../../assets/images/videoNewImg/formBtn/trydisable.png")
    no-repeat center center;
}

.btn4 {
  background: url("../../../assets/images/videoNewImg/formBtn/delnormal.png")
    no-repeat center center;
}
.btn4:hover {
  background: url("../../../assets/images/videoNewImg/formBtn/delhover.png")
    no-repeat center center;
}
.btn5 {
  background: url("../../../assets/images/videoNewImg/formBtn/topnormal.png")
    no-repeat center center;
}
.btn5-1 {
  background: url("../../../assets/images/videoNewImg/formBtn/topdisable.png")
    no-repeat center center;
}
.btn5:hover {
  background: url("../../../assets/images/videoNewImg/formBtn/tophover.png")
    no-repeat center center;
}
.styles {
  color: #4b9de8;
  cursor: pointer;
  text-decoration: underline;
}
.showDecoration {
  color: #4b9de8;
  cursor: pointer;
  text-decoration: none;
}
.el-select /deep/ .el-input__icon {
  line-height: 0.3rem;
}
.el-table /deep/ .el-table__body-wrapper {
  height: 4.2rem !important;
}
</style>




<style>
.losevideo {
  width: 1.5rem;
  max-height: 0.95rem;
  overflow: auto;
}
.losevideo li {
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.fadeInfo {
  /* display:inline-block; */
  height: 0.2rem;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
</style>
