<!--
 * @Author: chenxf
 * @Date: 2020-06-08 16:50:54
 * @LastEditTime : 2020-12-28 10:04:22
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\components\Dxplayer.vue
 * @ 由于时间改动问题巨大所以特保存上一版本逻辑，取名Dxplayer.1.vue
 -->
<template>
  <div>
    <div class="allpalyr" id="dxplayerId" v-if="showDxplayer" v-show="showDomToplay">
      <div class="playmian">
        <p class="palyTitle">
          <span>视频播放</span>
          <i class="el-icon-close" @click="closeplay"></i>
        </p>
        <div class="palyer">
          <div id="idPlayer"></div>
        </div>
        <input id="idSnapshot" type="hidden" style="width:160px" value="c:/">
        <input id="idUrl" type="hidden" style="width:399px" value>
        <div class="palyImg">
          <p class="btnplayer">
            <img
              onclick="OnSetup(-1)"
              src="../assets/images/videoCombat/videoplay/play4.png"
              title="快退一帧"
            >
          </p>
          <p class="btnplayer">
            <img
              @click="pausefalse"
              v-show="pause == 'false'"
              src="../assets/images/videoCombat/videoplay/pause.png"
              title="暂停"
            >
            <img
              @click="pausetrue"
              v-show="pause == 'true'"
              src="../assets/images/videoCombat/videoplay/play3.png"
              title="播放"
            >
          </p>
          <p class="btnplayer">
            <img
              onclick="OnSetup(1)"
              src="../assets/images/videoCombat/videoplay/play3.png"
              title="快进一帧"
            >
          </p>
          <div style="float: right">
            <p
              @click="openSignHandler('idPlayer')"
              v-if="(showVideoStruct == 'true' || zkyStructureSwitch == 'true') && startSing && pause == 'true'"
              class="find-sing"
            >
              <img src="../assets/images/videoNewImg/trace-sing2.png" alt>
              <span>寻迹追踪</span>
            </p>
            <p
              v-if="(showVideoStruct == 'true' || zkyStructureSwitch == 'true') && startSing && pause == 'false'"
              class="find-sing find-sing1"
            >
              <img src="../assets/images/videoNewImg/trace-sing.png" alt>
              <span>寻迹追踪</span>
            </p>
            <p
              @click="startHandler"
              v-if="(showVideoStruct == 'true' || zkyStructureSwitch == 'true') && !startSing"
              class="find-sing"
            >
              <img src="../assets/images/videoNewImg/start-sing2.png" alt>
              <span>开始追踪</span>
            </p>
            <p
              @click="endHandler"
              v-if="(showVideoStruct == 'true' || zkyStructureSwitch == 'true') && !startSing"
              class="find-sing"
            >
              <img src="../assets/images/videoNewImg/end-sing2.png" alt>
              <span>结束追踪</span>
            </p>
            <p class="find-sing" @click="openhandwork">
              <img src="../assets/images/videoNewImg/handleb2.png" alt>
              <span>手工标注</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <handword :showhandword="showhandword" :isonline="false" @childbyHandwork="childbyHandwork"></handword>

    <search-picture
      :visible.sync="sexVideoDialod"
      :allfeature="allfeature"
      :trackList="trackList"
      :childFerture="childFerture"
      @defaultVideo="defaultVideo"
      :structureList="structureList"
      :opeVideo="opeVideo"
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
import { mapActions, mapMutations, mapState, mapGetters } from "vuex"; //引入vuex
import CVideo from "../api/realvideo/C_video.js"; //C++播放器的方法
import workLableMixins from "../mixins/work-lable/index.js";

export default {
  data() {
    return {
      videotime: "",
      playtime: "",
      getVideotime: null,
      timeFrag: null,
      showhandword: false,
      timstoplay: null,
      showDomToplay: false, //展示播放器,
      showVideoStruct: "", // 格林森瞳结构化
      zkyStructureSwitch: "", // 中科院结构化

      jghObj: {},
      splitPicUrl: "",
      workLlable: false,
      propWidth: "",
      propHeight: "",
      propLeft: "",
      propTop: "",
      sexVideoDialod: false,
      allfeature: "", // 特征值
      trackList: [],
      childFerture: 1,
      structureList: {},
      beginData: "",
      endData: "",
      opeVideo: 1,
      startSing: true,
      pause: "false",
      paperUuid: "",
      ispause: "" //保存播放暂停的状态
    };
  },
  mixins: [CVideo, workLableMixins],
  computed: {
    ...mapGetters([
      "showDxplayer",
      "DxplayerInfo", //播放器的当前对象
      "deviceInfo",
      "videoretriInfo",
      "structureFileUuid"
    ])
  },
  watch: {
    showDxplayer(val) {
      let times;
      OnExit();
      if (val) {
        setTimeout(() => {
          this.getTimeTobe(this.$route.query.caseUuid);
        }, 100);
        this.showVideoStruct = sessionStorage.getItem("glstStructureSwitch"); // 格林森瞳结构化
        this.zkyStructureSwitch = sessionStorage.getItem("zkyStructureSwitch"); // 中科院结构化
        this.showDomToplay = true;
        this.$nextTick(() => {
          g_change_page = 1;
          OnInit();
          this.timstoplay = setInterval(() => {
            if (window.g_openplay) {
              OnvideoHide();
              clearInterval(this.timstoplay);
              this.playvideo(this.DxplayerInfo);
            }
          }, 200);
          setTimeout(() => {
            clearInterval(this.timstoplay);
          }, 3000);
        });
      } else {
        this.setshowDxplayer(false);
        clearInterval(this.timstoplay);
        document.title = document.title.split(".")[0];
        OnChageWindowSize();
        OnvideoHide();
        OnExit();
        CloseVodPlayer();
      }
    }
  },
  components: {
    handword: () => import("../page/videoCombat/fastFight/handworkLable"),
    WorkLable: () => import("../components/work-lable/WorkLable.vue"),
    searchPicture: () => import("../page/casestudy/addcaseInfo/MultiScreen.vue")
  },
  methods: {
    ...mapMutations([
      "setshowDxplayer", //设置是否打开播放器的页面
      "setisopenOffVideo", //设置播放器是否打开
      "setvideoretriInfo" //设置手工标注的当前时间
    ]),
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
            this.beginData = res.data.data.startTime;
            this.endData = res.data.data.endTime;
          }
        });
    },
    // 开始追踪
    startHandler() {
      OnPause("true"); //暂停
      this.structureList = this.jghObj;
      this.paperUuid = this.structureFileUuid;
      this.startSearch();
    },
    endHandler() {
      this.startSing = true;
      this.workLlable = false;
      OnvideoShow();
      OnPause("false"); //播放
    },
    defaultVideo(data, isPlay) {
      this.showDomToplay = isPlay;
      document.getElementById("dxplayerId").style.zIndex = 3333;
      g_change_page = 1;
      OnAttachWindow();
      setTimeout(() => {
        OnPause("false");
      }, 300);
    },
    trackStatus() {
      if (this.startSing == false) {
        this.endHandler();
      }
    },
    //打开手工标注功能
    openhandwork() {
      this.ispause = window.g_playObj.pause; //记录状态
      this.startSing = true;
      this.workLlable = false;
      let times;
      clearInterval(times);
      OnPause("true");
      OnPlayHide("false");
      OnTakeVideoSnapshot(); //执行C++截图的方法
      this.$nextTick(() => {
        times = setInterval(() => {
          if (window.imgurl != undefined && window.imgurl.length > 20) {
            OnvideoHide(); //隐藏播放器
            this.showhandword = true;
            document.title = document.title.split(".")[0];
            clearInterval(times);
          }
        }, 100);
      });
    },
    //关闭手工标注页面
    childbyHandwork() {
      console.log(this.ispause, 4564646);
      document.title = document.title + ".";
      this.showhandword = false;
      OnvideoShow();
      setTimeout(() => {
        // if (this.ispause == "false") {
        //   OnPause("false"); //播放
        // } else {
        //   OnPause("true"); //暂停
        // }
        OnPause("false"); //播放
      }, 300);
    },
    // 播放
    pausetrue() {
      this.startSing = true;
      this.workLlable = false;
      OnvideoShow();
      OnPause("false"); //播放
    },
    //暂停
    pausefalse() {
      OnPause("true");
    },
    closeplay() {
      this.startSing = true; // 默认关闭页面显示寻迹追踪按钮
      this.workLlable = false;
      clearInterval(this.timstoplay);
      this.setshowDxplayer(false);
      OnChageWindowSize();
      OnvideoHide();
      OnExit();
      CloseVodPlayer();
      this.showDomToplay = false;
      window.g_openplay = false;
      clearInterval(window.g_interval);
      clearInterval(this.getVideotime);
      clearInterval(this.timeFrag);
    },
    playvideo(row) {
      console.log(row, 11111);
      this.setisopenOffVideo(true);
      clearInterval(this.timeFrag);
      clearInterval(this.getVideotime);
      //   if(this.showDxplayer){
      this.setvideoretriInfo(row);
      this.commonCtoPlay([row], 0, "idUrl");
      setTimeout(() => {
        OnPlay(row.deviceUuid, row.pt);
        OnPause("false");
      }, 600);
      this.getVideotime = setInterval(() => {
        this.videotime = window.g_playObj.duration; //总时长
        this.playtime = window.g_playObj.timestamp; //当前时间
        this.pause = window.g_playObj.pause;
      }, 200);
      setTimeout(() => {
        OnPause("false");
        clearInterval(this.timeFrag);
        //文件开始时长
        let startTime = Math.floor(row.appearTime / 1000);
        let endTime = Math.ceil(row.disappearTime / 1000);
        let newStartTime = startTime - 5;
        let newEndTime = endTime + 5;
        let flag = false;
        if (endTime - startTime <= 10 || endTime == startTime) {
          //文件加减5之后的时长
          if (startTime <= 5) {
            //如果目标出现时间小于第3秒，从第0秒开始放
            OnSeek(startTime);
            newEndTime += 5;
          } else {
            //如果目标出现在最后4秒或者目标出现在中间
            if (newEndTime >= this.videotime) {
              OnSeek(startTime - 10);
            } else {
              OnSeek(startTime - 5);
            }
          }
          flag = true;
        } else {
          OnSeek(startTime);
          flag = false;
        }
        setTimeout(() => {
          OnvideoShow();
        }, 100);
        this.showDomToplay = true;

        this.timeFrag = setInterval(() => {
          //通过定时器一直刷新当前播放时间
          //flag== true 表示是开始结束时长误差小于10或者相等
          if (flag) {
            // console.log('进来这个');
            if (startTime <= 5 && this.playtime >= newEndTime) {
              // console.log('按个放到');
              //如果当前播放时间大于等于4秒，则从头开始放
              OnPause("false");
              OnSeek(startTime);
            } else if (
              newEndTime > this.videotime &&
              (this.playtime == this.videotime ||
                this.playtime == 0 ||
                this.playtime == 1) &&
              this.videotime > 0
            ) {
              // console.log('执行这个');
              //如果目标出现时间在文件的最后几秒并且小于4秒，并且当前播放时间等于文件的结束,则文件的播放时间向前推3秒
              OnPause("false");
              OnSeek(startTime - 10);
            } else {
              // console.log(333);
              //表示目标出现在文件的中间则当前文件向前推三秒，向后推4秒
              //如果当前播放时间比目标出现时间+4秒还大 ，则又循环播放
              if (this.playtime >= newEndTime) {
                OnPause("false");
                OnSeek(startTime - 5);
              }
            }
          } else {
            // console.log('进来这个方法');
            console.log(this.playtime, endTime);
            if (this.playtime >= endTime) {
              OnSeek(startTime);
            }
          }
        }, 1000);
      }, 700);
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
        includeThreshold: 0.6, // 比对阈值
        startTime: this.beginData,
        endTime: this.endData
      };

      this.childFerture = this.jghObj.type;
      console.log(this.childFerture, "this.childFerture");
      console.log(this.allfeature, "this.allfeature");
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
            document.getElementById("dxplayerId").style.zIndex = 0;
            this.startSing = true;
            OnPause("true");
            this.workLlable = false;
            this.opeVideo = 1;
            this.sexVideoDialod = true;
            this.trackList = [];
          } else {
            document.getElementById("dxplayerId").style.zIndex = 0;
            this.startSing = true;
            OnPause("true");
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
    }
  }
};
</script>

<style scoped>
.allpalyr {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 3333;
}
.playmian {
  position: absolute;
  width: 9rem;
  height: 5.1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: #113254;
}
.palyTitle {
  display: flex;
  justify-content: space-between;
  background: rgba(20, 57, 96, 0.33);
  border: 1px solid rgba(15, 44, 79, 0.8);
  line-height: 0.3rem;
  color: #99c9fa;
  font-size: 0.14rem;
  padding: 0 0.2rem;
}
.palyTitle i {
  cursor: pointer;
  margin-top: 0.09rem;
}
.palyImg p {
  display: inline-block;
  padding: 0 0.2rem;
  height: 0.6rem;
}
.palyImg .btnplayer {
  width: 0.5rem;
  height: 0.3rem;
  margin-top: 0.15rem;
  position: relative;
}
.palyImg .btnplayer img {
  position: absolute;
  top: 0;
}
.palyImg p:last-child {
  cursor: pointer;
  float: right;
  margin-right: 0.3rem;
}
/* .palyImg p:last-child img {
  margin-top: 0.05rem;
} */

.palyer {
  width: 100%;
  height: 4.3rem;
  padding: 0.05rem 0.2rem;
}
.palyer div {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(38, 85, 134, 0.32);
}
.find-sing {
  width: 1rem;
  float: left;
}
.find-sing span {
  display: block;
  font-size: 12px;
  color: #7eabd9;
}
.find-sing1 span {
  color: #b1b1b4;
}
.find-sing img {
  width: 0.25rem;
  height: 0.25rem;
  margin: 0 0.1rem;
  margin-top: 0.02rem;
  background-size: 80% 80%;
  cursor: pointer;
}
.handlable {
  display: block;
  width: 0.32rem;
  height: 0.28rem;
  margin: 0 auto;
  margin-top: 0.03rem;
  background: url("../assets/images/videoNewImg/hanldle.png") no-repeat;
  background-size: 80% 80%;
}
</style>
