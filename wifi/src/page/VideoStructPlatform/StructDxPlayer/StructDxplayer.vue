<!--
 * @Author: chenxf
 * @Date: 2020-06-08 16:50:54
 * @LastEditTime : 2021-02-05 17:45:49
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\components\Dxplayer.vue
 * @ 由于时间改动问题巨大所以特保存上一版本逻辑，取名Dxplayer.1.vue
 -->
<template>
  <div>
    <div class="hideplay" title="收起" @click="setshowplayvideo(false)">
    </div>
    <div class="allpalyr" tabindex="0" id="dxplayerId" v-show="showDomToplay && showStructDxplayer">
      <div class="playmian" id="playmian">
        <p class="palyTitle" v-show="flag">
          <span>视频播放</span>
          <i class="el-icon-close" @click="closeplay"></i>
        </p>
        <div class="palyer" id="player">
          <div id="idPlayer"></div>
        </div>
        <input id="idSnapshot" type="hidden" style="width:160px" value="c:/">
        <input id="idUrl" type="hidden" style="width:399px" value>
        <!-- 全屏的视频播放页面的弹窗 -->
        <div class="palyImg">
          <ul class="funcBtn">
            <li id="li1" >
              <img
                onclick="OnPause('false')"
                v-show="showplay == 'true' ? true : false"
                src="@/assets/images/videoCombat/rtvideo/souse.png"
                title="播放（键盘空格）"
              >
              <img
                onclick="OnPause('true')"
                v-show="showplay == 'true' ? false : true"
                src="@/assets/images/videoCombat/history/plays.png"
                title="暂停（键盘空格）"
              >
            </li>
            <li id="li2">
              <img
                @click="prev($event)"
                src="@/assets/images/videoCombat/videoplay/prev.png"
                title="上一个（键盘上健）"
              >
              <!-- <img
                @click="goretreat()"
                src="@/assets/images/videoCombat/videoplay/ico1.png"
                title="快退"
              >-->
              <img
                @click="retreatframe"
                src="@/assets/images/videoCombat/videoplay/play2.png"
                title="快退一帧（键盘左健）"
              >
              <img
                @click="fastframe"
                src="@/assets/images/videoCombat/videoplay/play.png"
                title="快进一帧（键盘右健）"
              >
              <!-- <img @click="gofast()" src="@/assets/images/videoCombat/videoplay/ico.png" title="快进"> -->
              <img
                @click="next($event)"
                src="@/assets/images/videoCombat/videoplay/next.png"
                title="下一个（键盘下健）"
              >
            </li>
            <li id="li3" @click="fullscreen" class="li picture">
              <p class="el-icon-full-screen" style="font-size:30px"></p>
              <span>{{fulltitle}}</span>
            </li>
            <li id="li4" @click="cutimgtocup" class="li picture">
              <p class="el-icon-picture" style="font-size:30px"></p>
              <span>导出图片</span>
            </li>
            <li id="li5" class="li picture" @click="cutcutvideotocup">
              <p class="el-icon-service" style="font-size:30px"></p>
              <span class="span">导出视频</span>
            </li>
            <!-- <li id="li6" class="li picture" @click="openhandwork()">
              <p class="hand" style="font-size:30px"></p>
              <span class="span1">手工标注</span>
            </li> -->
          </ul>
          <!-- 手工标注弹窗 -->
          <!-- <p class="playerinfo">视频播放切换支持键盘左右键操作</p> -->
        </div>
      </div>
    </div>
    <handword :showhandword="showhandword" :isonline="false" @childbyHandwork="childbyHandwork"></handword>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex"; //引入vuex
import CVideo from "../../../api/realvideo/C_video.js"; //C++播放器的方法
import cvideo from "@/api/realvideo/C_video.js";
import { getvideolist } from "@/api/discernserve/discernSearch.js";
import moment from "moment";
import _ from "lodash";
import addCaseTowJs from "../../../api/casestudy/addcaseTwo.js";
import videoplay from "../../../api/realvideo/videoplay.js";
// import handwork from "./diaLog";
export default {
  data() {
    return {
      show: false, //手工标注弹窗
      isonline: false, //是否在线
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
      paperUuid: "",
      ispause: "", //保存播放暂停的状态
      videoList: [], //点位列表
      currentPage: 1,
      pageSize: 15,
      totalCount: 0,
      playIndex: null,
      playrowObj: {},
      nowIndex: 3, //默认速率
      showplayTime: false,
      palytime: 0, //当前播放时间
      videotime: 0, //总时长
      videostartime: 0, //文件开始时间 2021:05:05 12:12:12
      timeToplay: null,
      showplay: 'false',
      pages: 0, //总页数
      isfullscreen: false, //是否全屏
      fulltitle: "全屏播放" ,//是否全屏
      flag:true
    };
  },
  mixins: [CVideo, cvideo],
  props: {
    deviceUuid: String,
    caseUuid: String
  },
  computed: {
    ...mapGetters([
      "showStructDxplayer",
      "DxplayerInfo", //播放器的当前对象
      "showplayvideo",
      "nowplayObj"
    ])
  },
  filters: {
    totaltime(value) {
      if (value == 0 || value == undefined || isNaN(value)) {
        return "00:00:00";
      } else {
        // 1. 将时间搓转化为时间对象
        let date = new Date(value);
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      }
    }
  },
  watch: {
    //监听点位
    deviceUuid(val) {
      this.currentPage = 1;
      this.pageSize = 15;
      this.playIndex = null;
      this.playrowObj = {};
      this.getlist();
    },
    // //监听页面是否打开
    // showplayvideo(val) {
    //   if (val) {
    //     this.currentPage = this.nowplayObj.currentPage;
    //     this.pageSize = this.nowplayObj.pageSize;
    //     this.playrowObj = this.nowplayObj.obj;
    //     this.getlist();
    //     setTimeout(() => {
    //       document.title = document.title + ".";
    //       setTimeout(() => {
    //         this.playCVideo(this.playIndex, this.playrowObj);
    //       }, 2000);
    //       this.timeToplay = setInterval(() => {
    //           console.log(1111);
    //         this.showplay = window.g_playObj.pause;
    //         this.videotime = window.g_playObj.duration; //当前视频总时长
    //         this.palytime = window.g_playObj.timestamp;
    //         this.nowIndex = Number(window.g_playObj.speed) + 3;
    //       }, 200);
    //       document.addEventListener("keydown", this.keycodevent, true);
    //     }, 1000);
    //   } else {
    //     document.removeEventListener("keydown", this.keycodevent, true);
    //     clearInterval(this.timeToplay);
    //     OnExit();
    //     CloseVodPlayer();
    //     document.title = document.title.split(".")[0];
    //     this.showplayTime = false;
    //     this.palytime = 0; //当前播放时间
    //     this.videotime = 0; //总时长
    //     this.videostartime = 0; //
    //     this.isfullscreen = false;
    //     this.fulltitle = "全屏播放";
    //   }
    // },
    //当前播放时间以及进度条的长度
    palytime(val) {
      if (val != 0) {
        if (Number(val) <= Number(this.videotime)) {
          var percent = (val / this.videotime) * 100 + "%";
          this.$refs.playpro.style.width = percent;
        } else {
          val = this.videotime;
          this.$refs.playpro.style.width = 0;
        }
      } else {
        this.$refs.playpro.style.width = 0;
      }
    },
    showStructDxplayer(val) {
      let times;
      if (val) {
        setTimeout(() => {
          this.getTimeTobe(this.$route.query.caseUuid);
        }, 100);
        this.showDomToplay = true;
        this.$nextTick(() => {
          g_change_page = 1;
          this.timstoplay = setInterval(() => {
            if (window.g_openplay) {
              OnChageWindowSize();
              clearInterval(this.timstoplay);
              this.playvideo(this.DxplayerInfo);
            }
          }, 200);
          setTimeout(() => {
            clearInterval(this.timstoplay);
          }, 3000);
          this.ondown();
        });
      }
    }
    // //监听当前手工标注的窗口是否被打开
    // showhandword(val) {
    //   //表示手工标注的窗口被打开
    //   if (val) {
    //     clearInterval(this.timeToVideo);
    //   } else {
    //     clearInterval(this.timeToVideo);
    //     setTimeout(() => {
    //       if (this.$route.path != "/login") {
    //         this.timeToVideo = setInterval(() => {
    //           this.getVideoList();
    //         }, 8000);
    //       }
    //     }, 500);
    //   }
    // }
  },
  components: {
    // handwork
    handword: () =>
      import("../../../page/videoCombat/fastFight/handworkLable.vue")
    // WorkLable: () => import("../components/work-lable/WorkLable.vue"),
    // searchPicture: () => import("../page/casestudy/addcaseInfo/MultiScreen.vue")
  },
  methods: {
    ...mapMutations([
      "setshowStructDxplayer", //设置是否打开播放器的页面
      "setisopenOffVideo", //设置播放器是否打开
      "setshowplayvideo"
    ]),
    //打开手工标注
    openhandwork() {
    //   OnPause("true");
      OnPlayHide("false");
      //   OnTakeVideoSnapshot(); //执行C++截图的方法
      sessionStorage.setItem(
        "imgurl",
        "http://192.168.102.208:29001/21,232025634c91c0?id=9BBA966BCD08404BB51B45DE0807A746&ts=760"
      );
      window.imgurl =
        "http://192.168.102.208:29001/21,232025634c91c0?id=9BBA966BCD08404BB51B45DE0807A746&ts=760";
      OnvideoHide(); //隐藏播放器
      document.title = document.title.split(".")[0];
      this.showhandword = true;
      //   this.$nextTick(() => {
      //     let times = setInterval(() => {
      //       if (window.imgurl != undefined && window.imgurl.length > 20) {
      //         OnvideoHide(); //隐藏播放器
      //         this.showhandword = true;
      //         document.title = document.title.split(".")[0];
      //         clearInterval(times);
      //       }
      //     }, 100);
      //   });
    },
    childbyHandwork() {
    //   OnPause("false");
      OnvideoShow();
      document.title = document.title + ".";
      this.showhandword = false;
    },

    keycodevent() {
      var key = window.event.keyCode;
      //左右
      if (key == 39) {
        this.fastframe();
      }
      if (key == 37) {
        this.retreatframe();
      }
      //上下
      if (key == 38) {
        this.playprev();
      }
      if (key == 40) {
        this.playnext();
      }
      //空格
      if (key == 32) {
        if (this.showplay == "true") {
          OnPause("false");
        } else {
          OnPause("true");
        }
      }
    },
    //获取视频列表
    //参数是是否自动播放
    getlist(play) {
      this.playIndex = -1;
      let userId = this.$storage.getSession("userInfo").userId;
      let data = {
        fileName: "",
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        deviceId: this.deviceUuid,
        caseUuid: this.caseUuid,
        submiterId: userId,
        orderBy: "upload_time",
        orderType: "desc",
        infoKind: 0
      };
      getvideolist(data).then(res => {
        this.videoList = res.data.data.list;
        this.totalCount = res.data.data.totalCount;
        this.pages = res.data.data.pages;
        if (play == "next") {
          this.playCVideo(0, this.videoList[0]);
        } else if (play == "prev") {
          let index = this.videoList.length - 1;
          this.playCVideo(index, this.videoList[index]);
        }
        let index = _.findIndex(this.videoList, item => {
          return item.fileUuid == this.playrowObj.fileUuid;
        });
        if (index != -1) {
          this.playIndex = index;
        }
      });
    },
    handleSizeChange(val) {
      this.playIndex = null;
      this.currentPage = 1;
      this.pageSize = val;
      this.getlist();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.playIndex = null;
      this.getlist();
    },
    //播放视频
    playCVideo(index, row) {
      this.$refs.playpro.style.width = 0;
      this.showplayTime = true;
      this.videostartime = new Date(row.startTime).getTime();
      this.playIndex = index;
      this.playrowObj = row;
      if (row.status == 3 || row.status == 4) {
        this.commonCtoPlay(this.videoList, index, "idUrl");
        OnPlay(row.deviceId, "");
      } else if (row.deviceType == 0) {
        OnStopAll(-1);
        this.$notify({
          type: "warning",
          message: "格式不支持！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      } else if (row.status == 5) {
        OnStopAll(-1);
        this.$notify({
          type: "warning",
          message: "解析失败！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      } else {
        OnStopAll(-1);
        this.$notify({
          type: "warning",
          message: "正在解析中！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
    },
    //跳播
    jumpon(e) {
      /*1.获取当前鼠标相对于父元素的left值--偏移值*/
      var offset = e.offsetX;
      // /*2.计算偏移值相对总父元素总宽度的比例*/
      var percent = offset / this.$refs.jumpon.clientWidth;
      /*3.计算这个位置对应的视频进度值*/
      this.palytime = parseInt(percent * this.videotime);
      OnSeek(this.palytime);
    },
    //快进一帧
    fastframe() {
      if (this.nowIndex == 3) {
        OnSetup(1);
      } else {
        OnSpeed(0);
        setTimeout(() => {
          OnSetup(1);
        }, 100);
      }
    },
    //快退一帧
    retreatframe() {
      if (this.nowIndex == 3) {
        OnSetup(-1);
      } else {
        OnSpeed(0);
        setTimeout(() => {
          OnSetup(-1);
        }, 100);
      }
    },
    //改变播放进度
    playstep(item, i) {
      this.nowIndex = i;
      OnSpeed(item);
    },
    //快进
    gofast() {
      this.nowIndex++;
      if (this.nowIndex <= 5) {
        OnSpeed(this.nowIndex - 3);
      } else if (this.nowIndex == 6) {
        OnSpeed(this.nowIndex - 3);
      } else if (this.nowIndex > 6) {
        this.nowIndex = 6;
        OnSpeed(3);
      }
    },
    //快退
    goretreat() {
      this.nowIndex--;
      if (this.nowIndex > 0) {
        OnSpeed(this.nowIndex - 3);
      } else if (this.nowIndex == 0) {
        OnSpeed(this.nowIndex - 3);
      } else if (this.nowIndex < 0) {
        this.nowIndex = 0;
        OnSpeed(-3);
      }
    },
    //全屏
    fullscreen() {
      this.isfullscreen = !this.isfullscreen;
      let dvis = document.getElementById("playmian");
      let player = document.getElementById("player");
      if (this.isfullscreen) {
        this.fulltitle = "退出全屏";
        dvis.style.width = "100%";
        dvis.style.height = "90%";
        dvis.style.top = "1rem";
        dvis.style.transform = "translate(-50%, -1%)";
        player.style.height='8.1rem';
        this.flag=false;
      } else {
        this.fulltitle = "全屏播放";
        dvis.style.width = "50%";
        dvis.style.height = "52%";
        dvis.style.top = "1rem";
        dvis.style.transform = "translate(-50%, 30%)";
        player.style.height='4.3rem';
        this.flag=true;
      }
      setTimeout(() => {
        OnChageWindowSize();
      }, 100);
    },
    //导出图片
    cutimgtocup() {
      cutImg();
      //     console.log(this.playrowObj,111);
      //   if (this.playrowObj.status == 3 || this.playrowObj.status == 4) {
      //     cutImg();
      //   } else {
      //     this.$notify({
      //       type: "warning",
      //       message: "暂无画面！",
      //       position: "bottom-right",
      //       duration: 3000
      //     });
      //   }
    },
    //导出视频
    cutcutvideotocup() {
      cutvideo();
      //   if (this.playrowObj.status == 3 || this.playrowObj.status == 4) {
      //     cutvideo();
      //   } else {
      //     this.$notify({
      //       type: "warning",
      //       message: "暂无画面！",
      //       position: "bottom-right",
      //       duration: 3000
      //     });
      //   }
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
            this.beginData = res.data.data.startTime;
            this.endData = res.data.data.endTime;
          }
        });
    },
    ondown() {
      let _this = this;
      document.onkeydown = function(e) {
        var key = window.event.keyCode;
        if (key == 39 && _this.showStructDxplayer) {
          _this.$emit("childybynext", _this.DxplayerInfo.playtype);
        }
        if (key == 37 && _this.showStructDxplayer) {
          _this.$emit("childybyprev", _this.DxplayerInfo.playtype);
        }
      };
    },
    //播放上一个视频，
    prev(e) {
      if (!e.target.disabled) {
        this.$emit("childybyprev", this.DxplayerInfo.playtype);
      }
    },
    //播放下一个视频
    next(e) {
      if (!e.target.disabled) {
        this.$emit("childybynext", this.DxplayerInfo.playtype);
      }
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
      this.setshowStructDxplayer(false);
      OnvideoHide();
      OnStopAll(-1);
      this.showDomToplay = false;
      clearInterval(this.getVideotime);
      clearInterval(this.timeFrag);
    },
    playvideo(row) {
      OnStopAll(-1);
      this.setisopenOffVideo(true);
      clearInterval(this.timeFrag);
      clearInterval(this.getVideotime);
      this.commonCtoPlay([row], 0, "idUrl");
      OnPlay(row.deviceUuid, row.pt);
      OnPause("false");
      this.getVideotime = setInterval(() => {
        this.showplay = window.g_playObj.pause;
        this.videotime = window.g_playObj.duration; //总时长
        this.playtime = window.g_playObj.timestamp; //当前时间
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
        }, 300);
        this.showDomToplay = true;

        this.timeFrag = setInterval(() => {
          //通过定时器一直刷新当前播放时间
          //flag== true 表示是开始结束时长误差小于10或者相等
          if (flag) {
            if (startTime <= 5 && this.playtime >= newEndTime) {
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
              //如果目标出现时间在文件的最后几秒并且小于4秒，并且当前播放时间等于文件的结束,则文件的播放时间向前推3秒
              OnPause("false");
              OnSeek(startTime - 10);
            } else {
              //表示目标出现在文件的中间则当前文件向前推三秒，向后推4秒
              //如果当前播放时间比目标出现时间+4秒还大 ，则又循环播放
              if (this.playtime >= newEndTime) {
                 OnPause("false");
                OnSeek(startTime - 5);
              }
            }
          } else {
            if (this.playtime >= endTime) {
              OnSeek(startTime);
            }
          }
        }, 1000);
      }, 200);
    }
  },
  destroyed() {}
};
</script>

<style scoped>
#li1 {
  width: 60px;
}
#li3,
#li4,
#li5,
#li6 {
  width: 8%;
}
#li2 {
  width: 25%;
}
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
  height: 4.9rem;
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
  line-height: 0.25rem;
  color: #99c9fa;
  font-size: 0.14rem;
  padding: 0 0.2rem;
}
.palyTitle i {
  cursor: pointer;
  margin-top: 0.05rem;
}
.palyImg {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0.5rem;
  border-top: 1px solid rgba(38, 85, 134, 0.32);
}
.palyImg .btnplayer {
  position: absolute;
  width: 0.5rem;
  height: 100%;
  text-align: center;
  line-height: 0.4rem;
  font-size: 0.25rem;
  cursor: pointer;
}
.el-icon-caret-left {
  left: 0;
}
.el-icon-caret-right {
  left: 0.5rem;
}
.playerinfo {
  font-size: 0.14rem;
  padding-left: 1.2rem;
  line-height: 0.4rem;
  color: #409eff;
}
.palyer {
  width: 100%;
  height: 4.3rem;
  padding: 0.05rem 0.1rem;
}
.palyer div {
  width: 100%;
  height: 100%;
  /* border: 1px solid rgba(38, 85, 134, 0.32); */
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
  height: 0.32rem;
  margin: 0 auto;
  margin-top: 0.03rem;
  background: url("../../../assets/images/videoNewImg/hanldle.png") no-repeat;
  background-size: 80% 80%;
}
/* 播放按钮样式 */
.hand {
  width: 0.36rem;
  height: 0.26rem;
  margin: 0.02rem auto 0;
  background: url("../../../assets/images/videoNewImg/handleb2.png") no-repeat;
  background-size: 80% 80%;
  position: relative;
  top: 0.03rem;
}
.span1 {
  position: absolute;
  top: 0.32rem;
}
.li {
  margin-top: -5px;
}
.picture {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.02rem;
}
.span {
  margin-top: -1px;
}
.funcBtn {
  height: 100%;
}

.funcBtn li {
  float: left;
  height: 100%;
  cursor: pointer;
}

.funcBtn li:nth-child(1) {
  width: 0.5rem;
}

.funcBtn li:nth-child(1) img {
  width: 100%;
  height: 100%;
}

.funcBtn li:nth-child(2) {
  width: 26%;
  margin: 0 0.1rem;
  /* margin-top: -6px; */
  text-align: center;
  font-size: 0.14rem;
  line-height: 0.5rem;
}

.funcBtn li:nth-child(2) img {
  margin-right: 0.1rem;
  vertical-align: middle;
  padding: 0 0.1rem;
}

.funcBtn li:nth-child(3) {
  width: 9%;
  height: 100%;
  /* padding: 0 0.1rem; */
  border-left: 1px solid #464646;
  user-select: none;
}

.imgoperate img {
  float: left;
  width: 0.45rem;
  height: 75%;
  margin-top: 0.05rem;
  margin-right: 0.1rem;
}

.imgoperate div {
  display: inline-block;
  margin-left: 4%;
  width: 76%;
  border: 2px solid #4e4e4e;
  position: relative;
  margin-top: 0.35rem;
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
/* .funcBtn li:nth-child(3),
.funcBtn li:nth-child(4),
.funcBtn li:nth-child(5),
.funcBtn li:nth-child(6) {
  /* margin-left: 0.3rem; */
/* padding-top: 0.03rem;
} */
.funcBtn li:nth-child(3),
.funcBtn li:nth-child(4) {
  margin-left: 0;
}
.funcBtn li:nth-child(4) p,
.funcBtn li:nth-child(5) p,
.funcBtn li:nth-child(6) p {
  font-size: 0.25rem;
  display: block;
  text-align: center;
}
.funcBtn li:nth-child(5) {
  /* padding-top: 0.08rem; */
  box-sizing: border-box;
}
.Coloractives {
  color: #4099e4 !important;
}

.ONactives {
  background-color: #4099e4 !important;
}
</style>
