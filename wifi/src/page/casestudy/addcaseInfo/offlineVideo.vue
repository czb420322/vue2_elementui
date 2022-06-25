<template>
  <div class="taskMange">
    <el-dialog
      title="视频播放列表"
      :visible.sync="retrieveVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @close="closeDia"
      @open="opendia"
      width="70%"
    >
      <span class="offline" v-if="retrieveVisible">
        <div class="offline_left">
          <div class="palyer" id="idPlayer">
            <div>
              <input id="idSnapshot" type="hidden" style="width:160px" value="c:/">
              <input id="idUrl" type="hidden" style="width:399px" value>
            </div>
          </div>
          <div class="operation">
            <div class="progress" ref="progress" v-show="proressshow">
              <p @click.prevent="jumpon($event);showtimeimg = false" ref="jumpon"></p>
              <!-- 跳播 -->
              <b ref="playpro"></b>
              <!-- 播放进度 -->
              <i ref="unloadpro"></i>
              <!-- 加载进度  -->
              <span class="timespan" v-show="showplayTime">
                {{(palytime * 1000 + videostartime) | totaltime}}&nbsp;&nbsp;/&nbsp;&nbsp;{{(videotime * 1000 + videostartime)
                | totaltime}}
              </span>
              <span
                class="timespan"
                v-show="!showplayTime"
              >00:00:00&nbsp;&nbsp;/&nbsp;&nbsp;00:00:00</span>
            </div>
            <ul>
              <li>
                <img
                  onclick="OnPause('false')"
                  @click="showtimeimg = false;ispause = false;playMit()"
                  v-show="showplay == 'true' ? true : false && showFirstImg"
                  src="../../../assets/images/videoCombat/rtvideo/souse.png"
                  title="播放"
                >
                <img
                  onclick="OnPause('true')"
                  @click="stopZero();ispause = true"
                  v-show="showplay == 'true' ? false : true && showFirstImg"
                  src="../../../assets/images/videoCombat/history/plays.png"
                  title="暂停"
                >
              </li>
              <li @keyup.right="OnSetup(1)">
                <img
                  @click="goretreat();showtimeimg = false"
                  src="../../../assets/images/videoCombat/videoplay/ico1.png"
                  title="快退"
                >
                <img
                  onclick="OnSetup(-1)"
                  @click="retreatframe"
                  src="../../../assets/images/videoCombat/videoplay/play2.png"
                  title="快退一帧"
                >
                <img
                  @click="fastframe"
                  src="../../../assets/images/videoCombat/videoplay/play.png"
                  title="快进一帧"
                >
                <img
                  @click="gofast();showtimeimg = false"
                  src="../../../assets/images/videoCombat/videoplay/ico.png"
                  title="快进"
                >
              </li>
              <li class="imgoperate">
                <img src="../../../assets/images/videoCombat/videoplay/playspeed.png" alt>
                <div>
                  <span
                    @click="playstep(-3,0);showtimeimg = false;workLlable = false"
                    :class="{ONactives:0 == nowIndex}"
                  >
                    <b :class="{Coloractives:0 == nowIndex}">-8X</b>
                  </span>
                  <span
                    @click="playstep(-2,1);showtimeimg = false;workLlable = false"
                    :class="{ONactives:1 == nowIndex}"
                  >
                    <b :class="{Coloractives:1 == nowIndex}">-4X</b>
                  </span>
                  <span
                    @click="playstep(-1,2);showtimeimg = false;workLlable = false"
                    :class="{ONactives:2 == nowIndex}"
                  >
                    <b :class="{Coloractives:2 == nowIndex}">-2X</b>
                  </span>
                  <span
                    @click="playstep(0,3);showtimeimg = false;workLlable = false"
                    :class="{ONactives:3 == nowIndex}"
                  >
                    <b :class="{Coloractives:3 == nowIndex}">0X</b>
                  </span>
                  <span
                    @click="playstep(1,4);showtimeimg = false;workLlable = false"
                    :class="{ONactives:4 == nowIndex}"
                  >
                    <b :class="{Coloractives:4 == nowIndex}">2X</b>
                  </span>
                  <span
                    @click="playstep(2,5);showtimeimg = false;workLlable = false"
                    :class="{ONactives:5 == nowIndex}"
                  >
                    <b :class="{Coloractives:5 == nowIndex}">4X</b>
                  </span>
                  <span
                    @click="playstep(3,6);showtimeimg = false;workLlable = false"
                    :class="{ONactives:6 == nowIndex}"
                  >
                    <b :class="{Coloractives:6 == nowIndex}">8X</b>
                  </span>
                </div>
              </li>
              <li @click="opentimeimg">
                <p></p>
                <span>视频校时</span>
              </li>
              <li
                @click="openSignHandler('idPlayer')"
                v-if="(showVideoStruct == 'true' || zkyStructureSwitch == 'true') && startSing && showplay == 'true'"
                class="find-sing"
              >
                <p></p>
                <span>寻迹追踪</span>
              </li>
              <li
                v-if="(showVideoStruct == 'true' || zkyStructureSwitch == 'true') && startSing && showplay == 'false'"
                class="find-sing1"
              >
                <p></p>
                <span>寻迹追踪</span>
              </li>
              <li
                @click="playstep(0,3);startHandler()"
                v-if="(showVideoStruct == 'true' || zkyStructureSwitch == 'true') && !startSing"
                class="start-sing"
              >
                <p></p>
                <span>开始追踪</span>
              </li>
              <li
                @click="endHandler"
                v-if="(showVideoStruct == 'true' || zkyStructureSwitch == 'true') && !startSing"
                class="end-sing"
              >
                <p></p>
                <span>结束追踪</span>
              </li>

              <li @click="openhandwork()">
                <p></p>
                <span>手工标注</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="offline_right">
          <p style="color:#409eff">播放列表</p>
          <p class="fileinfo">
            <span>文件名称</span>
            <span class="fileTime">文件开始时间</span>
          </p>

          <ul id="videoUl">
            <li
              v-for="(item,index) in videoList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              @click="showFirstImg = true;playVideo(index,item)"
              :class="{palyactive:index == playIndex ? 'palyactive' : '',red:item.deviceType == 0,blue:item.status == 5}"
              :key="index">
              <span class="fileLeft" :title="item.fileName">{{item.fileName}}</span>
              <span :title="item.startTime">{{item.startTime}}</span>
            </li>
          </ul>
          <div v-show="showtimeimg" class="timeings">
            <p>视频校时：</p>
            <input type="text" placeholder="请输入当前视频画面时间" readonly v-model="timeimg" id="timeing">
            <el-button class="tryBtn" @click="closeTime">关闭</el-button>
            <el-button class="searchBtn" @click="correctTime">确定</el-button>
          </div>

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
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="retrieveVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- <sex-off-video :visible.sync="sexVideoDialod" @defaultVideo="defaultVideo" :sex-list="sexList" :sex-index="sexIndex"></sex-off-video> -->
    <handword
      :showhandword="showhandword"
      :videoInfo="videoInfo"
      :isonline="isonline"
      @childbyHandwork="childbyHandwork"
    ></handword>

    <search-picture
      :visible.sync="sexVideoDialod"
      :allfeature="allfeature"
      :trackList="trackList"
      :childFerture="childFerture"
      :opeVideo="opeVideo"
      @defaultVideo="defaultVideo"
      :sex-list="sexList"
      :sex-index="sexIndex"
      :structureList="structureList"
      :paperUuid="paperUuid"
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
let moment = require("moment");
import videoplay from "../../../api/realvideo/videoplay.js";
import videoDown from "../../../api/casestudy/videoDown.js";
import videoMarker from "../../../api/realvideo/videoMarker.js";
import beginEnd from "../../../api/realvideo/BenEedTime.js"; //时间
import handword from "../../videoCombat/fastFight/handworkLable";
// import searchPicture from "../../casestudy/addcaseInfo/MultiScreen.vue";
import reviseTime from "../../../api/realvideo/reviseTime.js";
import workLableMixins from "../../../mixins/work-lable/index.js";

import { mapActions, mapMutations, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      retrieveVisible: false,
      videoList: [],
      isonline: false, //是否在线
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      timeimg: moment().format("YYYY-MM-DD HH:mm:ss"), //校时时间
      videostartime: 0, //视频相对文件的开始时间
      playIndex: null, //当前播放的视频
      showtimeimg: false, //显示校时时间
      showplayTime: false,
      isSearchVisible: false,
      picDialog: true,
      sexVideoDialod: false,
      sexList: [],
      sexIndex: 0,
      recodeResult: {},
      allfeature: "", // 特征值
      currentCar: null, //当前选中的识别坐标
      currentper: null, //当前选中的识别坐标
      currentbic: null, //当前选中的识别坐标
      beginData: "",
      endData: "",
      includeThreshold: "", // 相似度阈值
      trackList: [],
      childFerture: 1,
      workLlable: false,
      propWidth: "",
      propHeight: "",
      propLeft: "",
      propTop: "",
      showVideoStruct: "", // 格林森瞳结构化
      zkyStructureSwitch: "", // 中科院结构化
      jghObj: {},
      splitPicUrl: "",
      structureList: {},
      opeVideo: 1,
      startSing: true,
      showFirstImg: false, //展示第一次进来时候的暂停图标
      paperUuid: ""
    };
  },
  watch: {
    isofflineVideo(val) {
      this.retrieveVisible = val;
    },
    workLlable(val) {
      if (!val) {
        OnvideoShow();
        this.startSing = true;
      }
    },
    showtimeimg(val) {
      if (val) {
        clearInterval(this.timeToVideo);
      } else {
        clearInterval(this.timeToVideo);
        this.timeToVideo = setInterval(() => {
          setTimeout(() => {
            this.getVideoList();
          }, 0);
        }, 8000);
      }
    },
    videoList: {
      handler(val) {
        if (val.length) {
          let arr = val.slice(
            (this.currentPage - 1) * this.pageSize,
            this.currentPage * this.pageSize
          );
          for (let i = 0; i < arr.length; i++) {
            if (this.videoInfo.fileUuid == arr[i].fileUuid) {
              this.playIndex = i;
            }
          }
        }
      },
      deep: true
    },
    //监听当前手工标注的窗口是否被打开
    showhandword(val) {
      //表示手工标注的窗口被打开
      if (val) {
        clearInterval(this.timeToVideo);
      } else {
        clearInterval(this.timeToVideo);
        setTimeout(() => {
          if (this.$route.path != "/login") {
            this.timeToVideo = setInterval(() => {
              this.getVideoList();
            }, 8000);
          }
        }, 500);
      }
    }
  },
  computed: {
    ...mapGetters([
      "ishandupdate",
      "gethanlabel",
      "deviceInfo",
      "isupdatejudged"
    ])
  },
  components: {
    handword,
    // searchPicture,
    WorkLable: () => import("../../../components/work-lable/WorkLable.vue"),
    searchPicture: () => import("../../casestudy/addcaseInfo/MultiScreen.vue")
  },
  mixins: [
    videoplay,
    videoDown,
    videoMarker,
    beginEnd,
    reviseTime,
    workLableMixins
  ],
  props: {
    isofflineVideo: Boolean,
    deviceid: String
  },
  mounted() {},
  filters: {
    totaltime(value) {
      if (value == 0 || value == undefined || isNaN(value)) {
        return "00:00:00";
      } else {
        // 1. 将时间搓转化为时间对象
        let date = new Date(value);
        let YY = date.getFullYear();
        let MM =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        let hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let mi =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        let ss =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return YY + "-" + MM + "-" + DD + " " + hh + ":" + mi + ":" + ss;
      }
    }
  },
  methods: {
    ...mapMutations([
      "setvideoretriInfo", //设置视频播放时候的信息
      "setisopenOffVideo"
    ]),

    // picxAndpicy(picxAndpicy) {
    //   this.jghObj.point = picxAndpicy
    //   console.log(this.jghObj, '最终的数据888888888888------------')
    // },

    // workLableEmit(type, arr) {
    //     this.jghObj.attrs = arr
    //     this.jghObj.type = type
    //     console.log(this.jghObj, '最终的数据------------')
    // },

    defaultVideo(data) {
      g_change_page = 1;
      OnAttachWindow();
      setTimeout(() => {
        OnPause("false");
      }, 300);
    },
    // 点击播放
    playMit() {
      this.workLlable = false;
      OnPause("false");
    },
    // 暂停到0倍速
    stopZero() {
      OnSpeed(0);
      setTimeout(() => {
        OnSetup(1);
      }, 100);
    },
    // 开始追踪
    startHandler() {
      this.structureList = this.jghObj;
      // this.workLlable = false
      // this.opeVideo = 1
      // this.sexVideoDialod = true;
      this.startSearch();
    },
    // 结束追踪
    endHandler() {
      this.workLlable = false;
      OnPause("false");
    },
    // 获取当前案件下的所有文件的最小时间和最大时间，并加载时间插件
    getTimeTobe(id) {
      let data = {
        caseUuid: id
      };
      this.$http
        .get("vsas/structure/getDate", {
          params: data
        })
        .then(res => {
          if (res.data.code == 200) {
            // console.log(res.data.data);
            this.beginData = res.data.data.startTime;
            this.endData = res.data.data.endTime;
          }
        });
    },
    getSignPicHandler() {
      if (this.showVideoStruct == "true") {
        this.glstPic(); // 格灵深瞳截图
      } else if (this.zkyStructureSwitch == "true") {
        this.zkyPic(); // 中科院截图
      }
    },

    // 获取数据
    startSearch() {
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
        // includeThreshold: this.jghObj.attrs.Score / 100, // 比对阈值
        includeThreshold: 0.6, // 比对阈值
        startTime: this.beginData,
        endTime: this.endData
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
            this.opeVideo = 1;
            this.sexVideoDialod = true;
            this.trackList = [];
          } else {
            this.startSing = true;
            this.workLlable = false;
            this.opeVideo = 1;
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

    ruleClick() {
      if (this.videoInfo.fileUuid == undefined) {
        this.$notify({
          type: "warning",
          message: "请播放视频！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.videoList.length == 0) {
        this.$notify({
          type: "warning",
          message: "请上传视频",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.videotime == 0) {
        this.$notify({
          type: "warning",
          message: "正在缓冲中",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
    },

    //打开手工校时功能
    opentimeimg() {
      if (this.videoInfo.fileUuid == undefined) {
        this.$notify({
          type: "warning",
          message: "请播放视频！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.videoList.length == 0) {
        this.$notify({
          type: "warning",
          message: "请上传视频",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.videotime == 0) {
        this.$notify({
          type: "warning",
          message: "正在缓冲中",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      this.workLlable = false;
      OnPause("true");
      this.showtimeimg = true;
      this.timeimg = this.videoInfo.startTime;
      //   this.OpenTime();
      clearInterval(this.timeToVideo);
    },
    //矫正时间
    correctTime() {
      //传入两个参数，一个是视频的当前画面时间，一个是视频播放了的时间，来获取当前视频的开始时间
      this.showtimeimg = false;
      if (!this.ispause) {
        OnPause("false");
      }
      let aaa = this.getSecondTime(
        document.getElementById("timeing").value,
        this.palytime
      );
      let data = {
        fileUuid: this.videoInfo.fileUuid,
        startTime: aaa
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/file/startTime/update", data).then(res => {
        if (res.data.code == 200) {
          this.getVideoList();
          for (let i = 0; i < this.videoList.length; i++) {
            if (this.videoList[i].fileUuid == this.videoInfo.fileUuid) {
              this.playIndex = i;
            }
          }
          setTimeout(() => {
            let date = new Date(this.videoList[this.playIndex].startTime);
            this.videostartime = date.getTime();
            this.videoInfo = this.videoList[this.playIndex];
            this.setvideoretriInfo(this.videoInfo);
          }, 500);
        }
      });
    },
    closeTime() {
      if (!this.ispause) {
        OnPause("false"); //播放
      }
      this.showtimeimg = false;
    },
    //打开时间
    OpenTime() {
      this.$nextTick(() => {
        laydate.render({
          elem: "#timeing", //指定元素
          type: "datetime",
          trigger: "click",
          btns: ["now", "confirm"],
          format: "yyyy-MM-dd HH:mm:ss",
          max: 1,
          done(value, date, endDate) {
            this.timeimg = value;
          }
        });
      });
    },
    //关闭模态框
    closeDia() {
      this.startSing = true; // 默认关闭页面显示寻迹追踪按钮
      window.axiosProArr.forEach((e, i) => {
        if (sessionStorage.getItem("isUploadTrue") != 1) {
          e.cancle();
          delete window.axiosProArr[i];
        }
      });
      this.setisopenOffVideo(false);
      this.$refs.playpro.style.width = 0;
      this.showplayTime = false;
      this.showtimeimg = false;
      this.videoInfo = {};
      this.playIndex = null;
      this.videostartime = 0;
      this.showFirstImg = false;
      window.g_openplay = false;
      window.g_playObj = {};
      clearInterval(this.timeToplay);
      this.currentPage = 1;
      document.title = document.title.split(".")[0];
      this.$emit("childByOffline", false);
      clearInterval(window.g_interval);
      clearInterval(this.timeToSeek);
      clearInterval(this.timeId);
      clearInterval(this.timeToVideo);
      this.videoList = [];
      this.palytime = 0;
      this.videotime = 0;
      this.workLlable = false;
      OnExit();
      CloseVodPlayer();
      // this.changeSuspicionObj(suspicionUuids)
    },
    //打开模态框
    opendia() {
      this.videoList = [];
      this.$store.state.isvideoline = false;
      this.showVideoStruct = sessionStorage.getItem("glstStructureSwitch"); // 格林森瞳结构化
      this.zkyStructureSwitch = sessionStorage.getItem("zkyStructureSwitch"); // 中科院结构化
      this.getTimeTobe(this.$route.query.caseUuid);
      this.setisopenOffVideo(true);
      this.OpenTime();
      setTimeout(() => {
        g_change_page = 1;
        OnInit();
        this.getVideoList();
        setTimeout(() => {
          this.autoPlay();
        }, 100);
        this.timeToplay = setInterval(() => {
          this.showplay = window.g_playObj.pause;
          this.videotime = window.g_playObj.duration; //当前视频总时长
          this.palytime = window.g_playObj.timestamp;
          this.nowIndex = Number(window.g_playObj.speed) + 3;
        }, 300);
        this.timeToVideo = setInterval(() => {
          this.getVideoList();
        }, 8000);
      }, 0);
    },
    // 自动播放
    autoPlay() {
      console.log("有没有进来");
      if (this.videoList.length > 0) {
        setTimeout(() => {
          // this.showFirstImg = true;
          //   this.playVideo(0, this.videoList[0]);
          let dom = document.getElementById("videoUl");
          dom.childNodes[0].click();
        }, 1000);
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.playIndex = null;
      this.getIndexToVideo();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.playIndex = null;
      this.getIndexToVideo();
    },
    getIndexToVideo() {
      if (this.videoList.length) {
        let arr = this.videoList.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
        for (let i = 0; i < arr.length; i++) {
          if (this.videoInfo.fileUuid == arr[i].fileUuid) {
            this.playIndex = i;
          }
        }
      }
    },
    //请求数据列表
    getVideoList() {
      this.radio = "";
      this.videoList = [];
      let data = {
        fileName: "",
        pageNum: 1,
        pageSize: 3000,
        // status:4,
        deviceId: this.deviceid,
        caseUuid: this.$route.query.caseUuid,
        orderBy: "start_time",
        orderType: "asc"
      };
      this.$http
        .get("vsas/collection/offline/list", {
          params: data
        })
        .then(res => {
          if (res.data.code == 200) {
            this.videoList = res.data.data.list;
            this.totalCount = this.videoList.length;
          } else {
            //如果请求错误就关闭定时器
            clearInterval(this.timeToVideo);
          }
        });
    },
    /*
        list Object 当前播放对象
        index,对应的当前索引
        id 对应的是天网还是离线播放的ID
      */

    //播放视频
    playVideo(index, row) {
      this.endHandler();
      this.videoretriInfo = row;
      this.setvideoretriInfo(row);
      this.videostartime = 0;
      this.palytime = 0;
      this.videotime = 0;
      this.playIndex = index;
      if (row.status == 4 || row.status == 3) {
        this.showplayTime = true;
        this.showtimeimg = false;
        this.videoInfo = row;
        let date = new Date(row.startTime);
        this.sexList = this.videoList;
        this.paperUuid = row.fileUuid;
        this.sexIndex = this.pageSize * (this.currentPage - 1) + index;
        this.commonCtoPlay(
          this.videoList,
          this.pageSize * (this.currentPage - 1) + index,
          "idUrl"
        );
        // let lastindex = this.videoList[this.pageSize * (this.currentPage - 1) + index].fileSourcePath.lastIndexOf("/")
        // let playvalue = this.videoList[this.pageSize * (this.currentPage - 1) + index].fileSourcePath
        // let url = sessionStorage.getItem("hdfsAgentAddr");
        // playvalue = playvalue.slice(lastindex - 81, playvalue.length)
        // playvalue = playvalue.replace('source', 'decode')
        // document.getElementById("idUrl").value = url + playvalue;
        OnPlay(row.deviceId, "");
        setTimeout(() => {
          if (window.g_openplay) {
            setTimeout(() => {
              this.videostartime = date.getTime();
            }, 10);
          } else {
            this.videostartime = 0;
          }
        }, 30);
      } else if (row.deviceType == 0) {
        this.showplayTime = false;
        OnStopAll(-1);
        this.$notify({
          type: "warning",
          message: "格式不支持！",
          position: "bottom-right",
          duration: 3000
        });
      } else if (row.status == 5) {
        this.showplayTime = false;
        OnStopAll(-1);
        this.$notify({
          type: "warning",
          message: "解析失败！",
          position: "bottom-right",
          duration: 3000
        });
      } else {
        this.showplayTime = false;
        OnStopAll(-1);
        this.$notify({
          type: "warning",
          message: "正在解析中！",
          position: "bottom-right",
          duration: 3000
        });
      }
    },
    //快进一帧
    fastframe() {
      this.endHandler();
      if (this.nowIndex == 3) {
        OnSetup(1);
      } else {
        OnSpeed(0);
        setTimeout(() => {
          OnSetup(1);
        }, 100);
      }

      this.showtimeimg = false;
      this.ispause = true;
    },
    //快退一帧
    retreatframe() {
      if (!this.startSing) {
        this.endHandler();
      }
      if (this.nowIndex == 3) {
        OnSetup(-1);
      } else {
        OnSpeed(0);
        setTimeout(() => {
          OnSetup(-1);
        }, 100);
      }
      this.showtimeimg = false;
      this.ispause = true;
    }
  }
};
</script>


<style scoped>
@import "../../../assets/css/commom.css";
.offline {
  width: 100%;
  height: 6rem;
  display: inline-block;
  color: #99c9fa;
}

.palyactive {
  color: #4099e4;
}

.offline_left {
  float: left;
  width: 72%;
  height: 100%;
}

.offline_right {
  margin-left: 73%;
  height: 100%;
  width: 27%;
  border: 2px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
  /* padding: 0 0.1rem; */
  position: relative;
}

.palyer {
  width: 100%;
  height: 90%;
  border: 1px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
}

.operation {
  z-index: 2;
  width: 100%;
  height: 10%;
  border: 1px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
  position: relative;
}

.operation ul {
  width: 100%;
  height: 100%;
}

.operation ul li {
  float: left;
  height: 100%;
  cursor: pointer;
}

.operation li:nth-child(2) {
  width: 22%;
  margin: 0 0.1rem;
  text-align: center;
  font-size: 0.14rem;
  line-height: 0.5rem;
}

.operation li:nth-child(2) img {
  margin-right: 0.1rem;
  vertical-align: middle;
  padding: 0 0.1rem;
}

.operation ul li:nth-child(3) {
  width: 32%;
  height: 100%;
  padding: 0 0.1rem;
  border-left: 1px solid #464646;
}

.operation ul li:nth-child(4) {
  margin-left: 0.4rem;
}

.operation ul li:nth-child(5) {
  margin-left: 0.2rem;
}

.operation ul li:nth-child(6) {
  margin-left: 0.2rem;
}

.operation ul li:nth-child(7) {
  margin-left: 0.2rem;
}

.offline_right > p {
  line-height: 0.4rem;
  text-align: center;
  font-size: 0.16rem;
}

.fileinfo span:first-child {
  width: 1.5rem;
  float: left;
  margin-left: -0.34rem;
}

.fileinfo .fileTime {
  width: 1.5rem;
  margin-left: 0.45rem;
}

.offline_right > ul {
  height: calc(100% - 1.3rem);
  overflow: auto;
  padding: 0 0.1rem;
}

.offline_right > ul li {
  cursor: pointer;
  line-height: 0.3rem;
  border-bottom: 2px solid rgba(62, 62, 62, 0.32);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.offline_right > ul li .fileLeft {
  float: left;
  height: 32px;
  overflow: hidden;
  /* white-space: normal; */
  text-overflow: ellipsis;
  width: 1.5rem;
}

.red,
.blue {
  color: red;
}

.imgoperate img {
  float: left;
  width: 12%;
  margin-top: 0.08rem;
  margin-right: 0.1rem;
}

.imgoperate div {
  display: inline-block;
  margin-left: 5%;
  width: 78%;
  border: 2px solid #4e4e4e;
  position: relative;
  margin-top: 0.4rem;
}

.imgoperate div span {
  position: absolute;
  width: 0.15rem;
  height: 0.15rem;
  border-radius: 50%;
  top: -0.07rem;
  cursor: pointer;
  background-color: #fff;
}

.imgoperate span b {
  position: absolute;
  top: -0.25rem;
  width: 0.25rem;
  left: 0rem;
}

.imgoperate div span:nth-child(1) {
  left: -0.07rem;
}

.imgoperate div span:nth-child(2) {
  left: 16.66%;
}

.imgoperate div span:nth-child(3) {
  left: 33.32%;
}

.imgoperate div span:nth-child(4) {
  left: 49.98%;
}

.imgoperate div span:nth-child(5) {
  left: 66.64%;
}

.imgoperate div span:nth-child(6) {
  left: 83.3%;
}

.imgoperate div span:nth-child(7) {
  left: 99.96%;
}

.ONactives {
  background-color: #4099e4 !important;
}

.Coloractives {
  color: #4099e4 !important;
}

.operation .progress {
  width: calc(100% - 2.7rem);
  height: 0.05rem;
  background-color: #fff;
  position: absolute;
  left: 0.1rem;
  top: -0.15rem;
  border-radius: 5px;
}

.operation .progress .timespan {
  position: absolute;
  top: -4px;
  font-size: 0.12rem;
  right: -2.5rem;
}

.progress p {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  opacity: 0;
  border-radius: 4px;
}

.progress b {
  position: absolute;
  height: 0.05rem;
  background-color: #99c9fa;
  border-radius: 5px;
  z-index: 2;
}

.progress i {
  position: absolute;
  width: 400px;
  height: 0.1rem;
  /* background-color: green; */
  border-radius: 5px;
}

.operation li:nth-child(10) {
  float: right;
  margin-right: 0.2rem;
  font-size: 0.12rem;
  cursor: pointer;
}

.operation li:nth-child(4) p {
  width: 0.25rem;
  height: 0.28rem;
  margin: 0 auto;
  margin-top: 0.03rem;
  background: url("../../../assets/images/videoNewImg/timeing1.png") no-repeat;
  background-size: 80% 80%;
  cursor: pointer;
}

.operation .find-sing p {
  width: 0.32rem;
  height: 0.28rem;
  margin: 0 auto;
  margin-top: 0.03rem;
  background: url("../../../assets/images/videoNewImg/trace-sing2.png")
    no-repeat;
  background-size: 80% 80%;
  cursor: pointer;
}
.find-sing1 p {
  width: 0.32rem;
  height: 0.28rem;
  margin: 0 auto;
  margin-top: 0.03rem;
  background: url("../../../assets/images/videoNewImg/trace-sing.png") no-repeat;
  background-size: 80% 80%;
  cursor: pointer;
}
.find-sing1 span {
  color: #b1b1b4;
}
.operation .start-sing p {
  width: 0.28rem;
  height: 0.28rem;
  margin: 0 auto;
  margin-top: 0.03rem;
  background: url("../../../assets/images/videoNewImg/start-sing2.png")
    no-repeat;
  background-size: 80% 80%;
  cursor: pointer;
}

.operation .end-sing p {
  width: 0.28rem;
  height: 0.28rem;
  margin: 0 auto;
  margin-top: 0.03rem;
  background: url("../../../assets/images/videoNewImg/end-sing2.png") no-repeat;
  background-size: 80% 80%;
  cursor: pointer;
}

.operation li:last-child p {
  width: 0.32rem;
  height: 0.28rem;
  margin: 0 auto;
  margin-top: 0.03rem;
  background: url("../../../assets/images/videoNewImg/handleb2.png") no-repeat;
  background-size: 80% 80%;
}

/* .toolhandle li {
          width: 25%;
          float: left;
          text-align: center;
          box-sizing: border-box;
          border-right: 1px solid rgba(29, 74, 122, 0.29);
          padding: 0.08rem 0;
          cursor: pointer;
          font-size: 0.12rem;
        }
        .toolhandle li:first-child p {
          width: 0.25rem;
          height: 0.35rem;
          margin: 0 auto;
          background: url("../../../assets/images/videoNewImg/datacoll.png") no-repeat;
          background-size: 100% 100%;
        }
        .toolhandle li:first-child:hover p {
          background: url("../../../assets/images/videoNewImg/datacollb.png") no-repeat;
          background-size: 100% 100%;
        }
        .toolhandle li:nth-child(2) p {
          width: 0.36rem;
          height: 0.35rem;
          margin: 0 auto;
          background: url("../../../assets/images/videoNewImg/copy.png") no-repeat;
          background-size: 100% 100%;
        }
        .toolhandle li:nth-child(2):hover p {
          background: url("../../../assets/images/videoNewImg/copeb.png") no-repeat;
          background-size: 100% 100%;
        }

        .toolhandle li:nth-child(3) p {
          width: 0.3rem;
          height: 0.35rem;
          margin: 0 auto;
          background: url("../../../assets/images/videoNewImg/logman.png") no-repeat;
          background-size: 100% 100%;
        }
        .toolhandle li:nth-child(3):hover p {
          background: url("../../../assets/images/videoNewImg/logmanb.png") no-repeat;
          background-size: 100% 100%;
        }
        .toolhandle li:nth-child(4) p {
          width: 0.32rem;
          height: 0.35rem;
          margin: 0 auto;
          background: url("../../../assets/images/videoNewImg/hanldle.png") no-repeat;
          background-size: 100% 100%;
        }
        .toolhandle li:nth-child(4):hover p {
          background: url("../../../assets/images/videoNewImg/handleb.png") no-repeat;
          background-size: 100% 100%;
        }
        .toolhandle li:hover {
          background-color: #04101d;
          color: #409eff;
        } */

.el-pagination >>> .el-pager li {
  margin: 0 !important;
  min-width: 0.16rem !important;
}

.timeings {
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #0d1b2c;
  padding: 0.1rem 0.2rem;
}

.timeings input {
  height: 0.3rem;
  line-height: 0.3rem;
  padding-left: 0.1rem;
  width: 2rem;
  border-radius: 3px;
  margin: 0.1rem 0;
}

.timeings p:last-child {
  text-align: right;
}
</style>
