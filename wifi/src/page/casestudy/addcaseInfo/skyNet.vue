

<template>
  <div class="taskMange">
    <el-dialog
      title="视频播放列表"
      :visible.sync="dialogVisible"
      @close="closeDia"
      top="8vh"
      @open="opendia"
      :close-on-click-modal="false"
      width="80%"
    >
      <span class="taskrelation" v-if="dialogVisible">
        <div class="sky_left">
          <div class="palyer" :id="checkId">
            <div>
              <input id="idSnapshot" type="hidden" style="width:160px" value="c:/">
              <input id="idUrl" type="hidden" style="width:399px" value>
            </div>
          </div>
          <div class="operation">
            <ul>
              <li
                @click="openSignHandler(checkId)"
                v-if="(showVideoStruct == 'true' || zkyStructureSwitch == 'true') && startSing"
                class="find-sing"
              >
                <p></p>
                <span>寻迹追踪</span>
              </li>
              <li
                @click="readySignHandler"
                v-if="(showVideoStruct == 'true' || zkyStructureSwitch == 'true') && !startSing"
                class="start-sing"
              >
                <p></p>
                <span>开始追踪</span>
              </li>
              <li
                @click="getSignDataHandler"
                v-if="(showVideoStruct == 'true' || zkyStructureSwitch == 'true') && !startSing"
                class="end-sing"
              >
                <p></p>
                <span>结束追踪</span>
              </li>
              <li>
                <img
                  @click="screenshots"
                  src="../../../assets/images/videoCombat/history/imgcut.png"
                  alt
                >
              </li>
              <li>
                <img
                  @click="openHishandwork()"
                  src="../../../assets/images/videoCombat/history/handable.png"
                  alt
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="sky_right">
          <div class="right_l_one">
            <span>设备名称：</span>
            <!-- <input @focus="showTree = true;facilityName = ''" v-model="facilityName" type="text"> -->
            <input class="deviceName" readonly v-model="fileName" placeholder="请输入设备名称">
            <div v-show="false" class="treeClass">
              <el-tree
                :data="TreeDate"
                :props="defaultProps"
                @node-click="clickTree"
                :filter-node-method="filterNode"
                default-expand-all
                ref="treeNode"
              ></el-tree>
            </div>
          </div>
          <div class="right_l_two" v-if="dialogVisible">
            <span>时间段: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <input type="text" id="hisTime3" readonly v-model="beginData" placeholder="请输入开始时间"> -
            <input type="text" id="hisTime4" readonly v-model="endData" placeholder="请输入结束时间">
            <el-button class="searchBtn" v-no-more-click @click="searchHisList">查询</el-button>
          </div>
          <div>
            <el-table :data="timetable" border style="width: 100%" height="1.4rem">
              <el-table-column prop="timeid" label="编号" width="50">
                <template slot-scope="scope">
                  <span>{{scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="beginTable" label="开始时间"></el-table-column>
              <el-table-column show-overflow-tooltip prop="endTable" label="结束时间"></el-table-column>
              <el-table-column label="操作" width="140">
                <template slot-scope="scope">
                  <el-button class="searchBtn videoReatl" @click="searchVideoPlay(scope.row)">播放</el-button>
                  <!-- <el-button class="searchBtn videoReatl" @click="OpenvideoReatl">检索</el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- <div  class="hisretList">
            <p>检索列表：</p>
            <div>
              <ul class="his_task">
                <li v-for="(item, index) in videRetalList" :key="index" @click.stop="showRetalInfo(item,index)">
                  <i  class="el-icon-caret-right" ></i>
                  <p>
                    {{item.searchName}}
                    <span  v-show="RetalInfoIndex == index" v-for="(taskMark,i) in taskMarkList" :key="i" @click.stop="playHisRetalVideo(taskMark)">
                      {{taskMark.taskFileList[0].fileInfo.fileName}}
                    </span>

                  </p>
                </li>
              </ul>
            </div>
          </div>-->
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="cancleBtn" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 手工标注 -->
    <handword :showhandword="showhandword" :isonline="isonline" @childbyHandwork="childbyHandwork"></handword>
    <!-- 视频检索 -->
    <videoRetal
      :showVideoRetal="showVideoRetal"
      :caseUuid="caseUuid"
      :gbDeviceId="facilityId"
      :beginData="beginData"
      :endData="endData"
      :VideoRetalList="VideoRetalList"
      @childbyVideoReat="childbyVideoReat"
    ></videoRetal>

    <search-picture
      :visible.sync="sexVideoDialod"
      :allfeature="allfeature"
      :trackList="trackList"
      :childFerture="childFerture"
      @defaultVideo="defaultVideo"
      :structureList="structureList"
      :opeVideo="opeVideo"
    ></search-picture>

    <work-lable
      :visible.sync="workLlable"
      :prop-width="propWidth"
      :prop-height="propHeight"
      :prop-left="propLeft"
      :prop-top="propTop"
      :splitPicUrl="splitPicUrl"
      v-if="workLlable"
      @work-lable-emit="workLableEmit"
      @picxAndpicy="picxAndpicy"
    ></work-lable>
  </div>
</template>

<script>
import hisVideoPlay from "../../../api/realvideo/hisVideoPlay.js";
import videoplay from "../../../api/realvideo/videoplay.js";
import videoDown from "../../../api/casestudy/videoDown.js";
import videoMarker from "../../../api/realvideo/videoMarker.js";
import beginEnd from "../../../api/realvideo/BenEedTime.js"; //时间
import realvideo from "../../../api/realvideo/realvideo.js";
import videoRetal from "../../videoCombat/fastFight/videoRetal"; //视频检索
import handword from "../../videoCombat/fastFight/handworkLable";
import workLableMixins from "../../../mixins/work-lable/index.js";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogVisible: false,
      fileName: "",
      fileId: "",
      deviceId: "",
      isonline: true, //是否在线

      workLlable: false,
      propWidth: "",
      propHeight: "",
      propLeft: "",
      propTop: "",
      sexVideoDialod: false,
      allfeature: "", // 特征值
      childFerture: 1,
      structureList: {},
      trackList: [],
      beginData: "",
      endData: "",
      opeVideo: 3,
      initiateDate: "",
      terminateDate: "",
      strucStartTime: "",
      strucEndTime: "",
      startSing: true,
      showVideoStruct: "", // 格林森瞳结构化
      zkyStructureSwitch: "" // 中科院结构化
    };
  },
  mounted() {},
  watch: {
    isskyNet(val) {
      this.dialogVisible = val;
    }
  },
  mixins: [
    hisVideoPlay,
    beginEnd,
    videoplay,
    videoDown,
    realvideo,
    videoMarker,
    workLableMixins
  ],
  props: {
    isskyNet: Boolean,
    pTinfo: Object
  },
  computed: {
    ...mapGetters([
      "ishandupdate",
      "gethanlabel",
      "deviceInfo",
      // "videoretriInfo", //检索片段播放和视频播放时候的信息
      "isupdatejudged"
    ])
  },
  components: {
    videoRetal,
    handword,
    WorkLable: () => import("../../../components/work-lable/WorkLable.vue"),
    searchPicture: () =>
      import("../../../page/casestudy/addcaseInfo/MultiScreen.vue")
  },
  methods: {
    ...mapMutations(["setisopenOnVideo"]),

    // this.commonCtoPlay([item], 0, 'detailidUrl')
    // defaultVideo(val) {
    //   if (this.isonline) {
    //     document.title = document.title.split(".")[0] + "....";
    //     OnPauseHistory("0");
    //   } else {
    //   }
    //   // window.g_change = true

    //   // OnPauseHistory('false')
    //   // setTimeout(() => {
    //   //   this.playrtsp = true
    //   // let url = sessionStorage.getItem('controlHead');
    //   // document.getElementById("idUrl").value = url +this.facilityId+"?t=" + this.timetable[0].beginTable.replace(' ','_') +"@" + this.timetable[0].endTable.replace(' ','_');   // 最终
    //   // OnhisPlays(this.deviceId);
    //   // }, 1000)

    //   // this.showhandword = val
    //   // document.title = title
    //   // this.showVideo()
    // },
    // 开始追踪
    readySignHandler() {
      this.structureList = this.jghObj;
      this.startSearch();
    },
    // 结束追踪
    getSignDataHandler() {
      this.startSing = true;
      document.title = document.title.split(".")[0] + "....";
      this.workLlable = false;
      OnPauseHistory("0");
    },

    defaultVideo(data) {
      if (this.isonline) {
        OnExit();
        // OnChangeView(1)
        document.title = document.title.split(".")[0] + "....";
        setTimeout(() => {
          OnPauseHistory("0"); // 播放
        }, 300);
      }
    },
    // 获取当前案件下的所有文件的最小时间和最大时间，并加载时间插件
    getTimeTobe() {
      let data = {
        caseUuid: this.$route.query.caseUuid
      };
      this.$http
        .get("vsas/structure/getDate", {
          params: data
        })
        .then(res => {
          if (res.data.code == 200) {
            this.strucStartTime = res.data.data.startTime;
            this.strucEndTime = res.data.data.endTime;
          }
        });
    },
    // 获取数据
    startSearch() {
      console.log(this.jghObj, "这个是什么值");
      this.allfeature = ""; // 先把特征清空再赋值
      if (this.jghObj.attrs == undefined || this.jghObj.attrs == "") {
        this.$notify({
          type: "warning",
          message: "暂无特征",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.zkyStructureSwitch == "true") {
        this.allfeature = this.jghObj.attrs.Feature;
      } else if (this.showVideoStruct == "true") {
        this.allfeature = this.jghObj.attrs.Features;
      }
      let data = {
        feature: this.allfeature, // 特征
        featureFlag: this.jghObj.type, // 特征类型，1：行人，2：车辆，3：骑车人，4：人脸
        searchType: 0, // 查询类型：0：正常以图搜图，1：框选区域以图搜图
        deviceUuids: "", // 框选范围传过来的值
        caseUuid: this.$route.query.caseUuid,
        includeThreshold: 0.6, // 比对阈值
        startTime: this.strucStartTime,
        endTime: this.strucEndTime
      };

      this.childFerture = this.jghObj.type;
      data = this.$qs.stringify(data);
      this.$http.post("vsas/structure/search", data).then(res => {
        if (res.data.code == 200) {
          if (res.data.data == null || res.data.data.length == 0) {
            // this.sexVideoDialod = false; // 数据为空不打开弹层
            // this.trackList = [];
            // this.$notify({
            //   type: "warning",
            //   message: "暂无数据！",
            //   position: "bottom-right",
            //   duration: 3000
            // });
            // return;
            this.startSing = true;
            this.workLlable = false;
            this.opeVideo = 3;
            document.title = document.title.split(".")[0] + ".";
            this.sexVideoDialod = true;
            this.trackList = [];
          } else {
            this.startSing = true;
            this.workLlable = false;
            // OnPlayHide("false");
            this.opeVideo = 3;
            document.title = document.title.split(".")[0] + ".";
            this.sexVideoDialod = true;
            this.trackList = res.data.data;
          }
        } else if (res.data.code == 100) {
          this.$notify({
            type: "warning",
            message: "在特征库中未搜索到结果",
            position: "bottom-right",
            duration: 3000
          });
          return;
        }
      });
    },

    screenshots() {
      this.getSignDataHandler();
      if (
        document.getElementById("idUrl").value == "" ||
        document.getElementById("idUrl").value == null
      ) {
        return;
      }
      setTimeout(() => {
        Ongetseeks();
      }, 500);
    },
    //关闭模态框
    closeDia() {
      this.startSing = true; // 默认关闭页面显示寻迹追踪按钮
      this.workLlable = false;
      this.setisopenOnVideo(false);
      this.checkOnline = 2;
      this.$emit("childBySkynet", false);
      document.title = document.title.split(".")[0];
      OnHisExits();
      clearInterval(g_interval);
      this.timetable = [];
      //关闭模态框时重置一下两个时间段
      this.beginData = this.getEarlierDate();
      this.endData = this.getCurrentDate();
    },
    childbyHandwork(val, title) {
      this.showhandword = val;
      document.title = title;
    },
    //得到树形结构数据的ID
    getKakou() {
      let data = {
        apeName: this.pTinfo.list.cameraName
      };
      data = this.$qs.stringify(data);
      this.$http.post("/sms/ape/selectByVideo", data).then(res => {
        if (res.data.code == 200) {
          this.TreeDate = res.data.data;
          for (let i = 0; i < this.TreeDate.length; i++) {
            for (let j = 0; j < this.TreeDate[i].apes.length; j++) {
              if (this.deviceId == this.TreeDate[i].apes[j].shebeiId) {
                this.facilityId = this.TreeDate[i].apes[j].apeId;
              }
            }
          }
        } else {
          this.loading.close();
          this.$notify({
            type: "error",
            message: "获取视频列表失败",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    //打开模态框
    opendia() {
      this.showVideoStruct = sessionStorage.getItem("glstStructureSwitch"); // 格林森瞳结构化
      this.zkyStructureSwitch = sessionStorage.getItem("zkyStructureSwitch"); // 中科院结构化
      OnHisExits();
      this.setisopenOnVideo(true);
      this.$store.state.isvideoline = true;
      this.caseUuid = this.$route.query.caseUuid;
      OnhisInit();
      this.$nextTick(() => {
        this.OpenTheTime3("#hisTime3", "#hisTime4");
        this.getKakou();
      });
      this.fileName = this.pTinfo.list.cameraName;
      this.deviceId = this.pTinfo.list.deviceUuid;
      setTimeout(() => {
        this.getTimeTobe(); //获取时间
      }, 300);
      this.beginData = this.getEarlierDate();
      this.endData = this.getCurrentDate();
    },
    //天网视频播放
    searchVideoPlay(row) {
      this.getSignDataHandler();
      this.$store.state.lableBeginTime = row.beginTable;
      this.playrtsp = true;
      let url = sessionStorage.getItem("controlHead");
      document.getElementById("idUrl").value =
        url +
        this.facilityId +
        "?t=" +
        row.beginTable.replace(" ", "_") +
        "@" +
        row.endTable.replace(" ", "_"); // 最终
      OnhisPlays(this.deviceId);
    },
    stop() {
      OnPauseHistory("true");
    },
    start() {
      OnPauseHistory("false");
    }
  }
};
</script>


<style scoped>
@import "../../../assets/css/commom.css";
.taskrelation {
  width: 100%;
  display: inline-block;
  height: 6.5rem;
}
.sky_left {
  width: 69%;
  height: 100%;
  float: left;
  border: 1px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
}
.operation {
  width: 100%;
  height: 10%;
  border: 1px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
}
.operation ul li {
  float: left;
  width: 25%;
  text-align: center;
  margin-top: 0.05rem;
  cursor: pointer;
}
.operation ul li span {
  color: #99c9fa;
}
/* .operation ul li:first-child {
  width: 50%;
  text-align: center;
  line-height: 0.6rem;
} */
.operation ul li:first-child img {
  margin-right: 0.4rem;
}
.find-sing p {
  width: 0.3rem;
  height: 0.3rem;
  margin: 0 auto;
  background: url("../../../assets/images/videoNewImg/trace-sing2.png")
    no-repeat;
  background-size: 80% 80%;
}
.start-sing p {
  width: 0.3rem;
  height: 0.3rem;
  margin: 0 auto;
  background: url("../../../assets/images/videoNewImg/start-sing2.png")
    no-repeat;
  background-size: 80% 80%;
}
.end-sing p {
  width: 0.3rem;
  height: 0.3rem;
  margin: 0 auto;
  background: url("../../../assets/images/videoNewImg/end-sing2.png") no-repeat;
  background-size: 80% 80%;
}
.palyer {
  width: 100%;
  height: 90%;
  border: 1px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
}
.sky_right {
  width: 30%;
  height: 100%;
  margin-left: 70%;
  border: 1px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
}

.right_padding {
  padding: 0.1rem;
}
.right_l_one {
  height: 0.3rem;
  position: relative;
}
.right_l_one span {
  color: #fff;
}

.treeClass {
  z-index: 9999;
  width: 2.3rem;
  height: 2rem;
  background-color: rgba(16, 35, 56, 0.8) !important;
  border: 1px solid rgba(15, 44, 79, 0.8) !important;
  overflow: auto;
  padding: 0.05rem;
  position: absolute;
  top: 0.3rem;
  left: 0.75rem;
}
.treeClass .el-tree {
  width: 100%;
  height: 1.8rem;
}
.right_l_one input,
.right_l_two input {
  height: 0.3rem;
  padding-left: 0.1rem;
}
.right_l_two span {
  color: #fff;
}
.right_l_two {
  margin: 0.1rem 0;
}
.right_l_two input {
  width: 1.5rem;
}
.right_l_two .el-button {
  float: right;
  padding: 0 0.1rem;
  line-height: 0.3rem;
  font-size: 0.12rem;
}
.el-table >>> .el-table__empty-block {
  min-height: 1rem;
}
.videoReatl {
  padding: 0.03rem 0.06rem;
  font-size: 0.12rem;
}

.hisretList {
  width: 100%;
  height: 4rem;
  color: #99c9fa;
}
.hisretList > div {
  height: 3.8rem;
  width: 100%;
  padding: 0.1rem;
  overflow: auto;

  /* border: 1px solid yellow */
}
.his_task li {
  line-height: 0.4rem;
  cursor: pointer;
  border-bottom: 2px solid rgba(62, 62, 62, 0.32);
  /* border-bottom: 1px solid red */
}
.his_task li p {
  display: inline-grid;
}
.his_task li p span {
  display: block;
  padding-left: 0.2rem;
}
.deviceName {
  width: 3.1rem;
}
.el-table--border {
  height: 5rem !important;
}
</style>
