<template>
  <div class="parent">
    <!-- <headers/> -->
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/videoStrucPlat',query:{menuCode:700}}">首页 ></router-link>
      <p class="sysname">&nbsp;检索查询</p>
      <p class="clicklink">
        <router-link tag="span" :to="{path:'/videoStrucPlat',query:{menuCode:700}}">首页</router-link>
        <router-link
          tag="span"
          :to="{path:'/videoStrucPlat/resourceManage',query:{menuCode:704}}"
        >涉案视频管理</router-link>
        <router-link tag="span" :to="{path:'/videoStrucPlat/taskManage',query:{menuCode:701}}">任务管理</router-link>
        <router-link
          tag="span"
          :to="{path:'/videoStrucPlat/semanticSearch',query:{menuCode:702}}"
        >特征搜索</router-link>
        <router-link tag="span" :to="{path:'/videoStrucPlat/searchPrint',query:{menuCode:703}}">以图搜图</router-link>
        <!-- <router-link tag="span" :to="{path:'/videoStrucPlat/videoRetrieval',query:{menuCode:710}}">检索查询</router-link> -->
        <router-link tag="span" :to="{path:'/videoStrucPlat/caseList',query:{menuCode:711}}">案件管理</router-link>
        <router-link tag="span" :to="{path:'/videoStrucPlat/MarkPool',query:{menuCode:712}}">标注池</router-link>
      </p>
    </div>
    <p class="splitline"></p>
    <div class="warpper">
      <div class="mainCenter">
        <div class="center">
          <div class="allpalyr" v-show="showvideoPlay">
            <div class="player" id="playmian">
              <p class="palyTitle" v-show="flag">
                <span>视频播放</span>
                <i class="el-icon-close" @click="closePlay"></i>
              </p>
              <div class="playMians" id="playMians">
                <div id="idPlayers"></div>
              </div>
              <input id="idSnapshot" type="hidden" style="width:160px" value="c:/">
              <input id="detailidUrl" type="hidden" style="width:399px" value>
              <div class="palyImg">
                <ul id="ul">
                  <li id="li1">
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
                    <img
                      @click="next($event)"
                      src="@/assets/images/videoCombat/videoplay/next.png"
                      title="下一个（键盘下健）"
                    >
                  </li>
                  <li @click="fullscreen" id="li3">
                    <p class="el-icon-full-screen"  style="font-size:.3rem"></p>
                    <span>{{fulltitle}}</span>
                  </li>
                  <li @click="cutimgtocup"  id="li4">
                    <p class="el-icon-picture" style="font-size:.3rem"></p>
                    <span>导出图片</span>
                  </li>
                  <li  id="li5">
                    <p class="el-icon-service"  style="font-size:.3rem"></p>
                    <span class="span">导出视频</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="videoListsty">
        <div class="video_left">
          <p class="titles" :title="taskName">检索任务名称：{{taskName}}</p>
          <div class="video_img">
            <img :src="videoImg[0]" alt>
            <img :src="videoImg[1]" alt>
            <img :src="videoImg[2]" alt>
          </div>
          <div>
            <p class="v_title">检索规则设置</p>
            <p>
              <span>检索方式：</span>
              <span class="names">{{searchList.type | retrimodel}}</span>
            </p>
            <p>
              <span>目标大小：</span>
              <span class="names">{{searchList.size | targetsize}}</span>
            </p>
            <p>
              <span>目标清晰度：</span>
              <span class="names">{{searchList.clarity | targetqxd}}</span>
            </p>
          </div>
          <div>
            <p class="v_title">视频检索信息</p>
            <p>
              <span>检索进度：</span>
              <span class="names">{{progress + '%'}}</span>
            </p>
            <p>
              <span>任务状态：</span>
              <span class="names">{{filestatus | taskstatus}}</span>
            </p>
          </div>
          <div class="colorArea" v-if="searchList.enabledColor == 1">
            <p class="v_title">颜色检索</p>
            <div class="colorheight colorone" id="colorArea" v-if="colorsearchtype == 0">
              <img id="colorImage" :src="colorarea">
            </div>
            <div class="colorheight" v-if="colorsearchtype == 1">
              <div class="colorsearchtype1" :style="'background:rgb(' + searchList.rgb +')'"></div>
            </div>
            <div class="colorheight colortwo" v-if="colorsearchtype == 2">
              <div class="colorsearchtype2" :style="'background:rgb(' + aaacolor[0] +')'"></div>
              <div class="colorsearchtype3" :style="'background:rgb(' + aaacolor[1] +')'"></div>
            </div>
          </div>
        </div>
        <div class="video_center">
          <div class="margin-bottom-10">
            <span>点位 :&nbsp;</span>
            <el-select v-model="Pointscreen" @change="selectPoint">
              <el-option
                v-for="item in devicedList"
                :key="item.value"
                :label="item.cameraName"
                :value="item.deviceUuid"
              ></el-option>
            </el-select>
            <span class="margin-10">检索任务 :&nbsp;</span>
            <el-select v-model="taskObj" @change="changeReterTask">
              <el-option
                v-for="(item,index) in tasklist"
                :key="index"
                :value="item.taskUuid"
                :label="item.taskName"
              ></el-option>
            </el-select>
          </div>
          <ul>
            <li
              v-for="(item,index) in videoList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              :class="{active:index == videoIndex}"
              :key="index"
              @click.stop="addTask(item)"
            >
              <span v-for="(times,index) in timeresult" :key="index">
                <i
                  v-show="item.status == 4 ? false : item.fileUuid == times.fileuuid ? item.startTime > (Number(times.duration) * 1000 + 1999) : false "
                >缓冲中</i>
              </span>
              <p
                class="play none"
                title="播放"
                v-preventReClick="1500"
                @click.stop="playVideos($event,item.frameTime,index,item,1)"
              ></p>
              <img :src="item.snapshotFile" class="snapUrl" :onerror="$store.state.defaultImg" alt>
              <p class="searchResult">目标出现时间:{{item | retrievalTime}}</p>
            </li>
          </ul>
          <div class="video_page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[12]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              background
              :total="totalCount"
            ></el-pagination>
            <p v-show="filestatus != 0">数据加载中..</p>
            <p v-show="filestatus == 0 && allNum > videoList.length">数据加载中..</p>
            <p v-show="filestatus == 0 &&  videoList.length >= allNum && allNum != 0">数据加载完成</p>
          </div>
        </div>
        <div class="video_right">
          <p class="clue">线索池</p>
          <ul class="mainSmallul">
            <li v-for="(item,index) in nowSuslist" :key="index">
              <div :id="'markLi'+index">
                <b title="删除线索" @click.stop="deleteClue(item,index)" class="deleteLable">
                  <img src="../../assets/images/videoNewImg/commhand/delete.png" alt>
                </b>
                <img
                  class="imgbox"
                  :id="'marker_'+index"
                  :src="item.snapshotFile"
                  alt="暂无图片"
                  v-if="item.snapshotFile"
                >
              </div>
            </li>
          </ul>
          <p class="margin-top-10" align="center">
            <el-button class="searchBtn" size="small" @click="alldelete">清空</el-button>
            <el-button class="searchBtn" size="small" @click="lookTrack">查看轨迹</el-button>
            <!-- <el-button class="searchBtn" size="small">线索下载</el-button> -->
          </p>
        </div>
      </div>
    </div>
    <map-dialog :mapVisible="mapVisible" :mapData="mapData"></map-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex"; //引入vuex
import videoRetrieval from "../../api/VideoStructPlatform/videoRetrieval.js";
import CVideo from "../../api/realvideo/C_video.js"; // C++播放器的方法
import mapDialog from "./mapDialog";
// import functBtn from "../VideoStructPlatform/StructDxPlayer/functBtn";
export default {
  data() {
    return {
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
      showplay: "false",
      pages: 0, //总页数
      isfullscreen: false, //是否全屏
      fulltitle: "全屏播放", //是否全屏
      flag: true
    };
  },
  components: {
    mapDialog
    // functBtn
  },
  mixins: [videoRetrieval, CVideo],
  computed: {},
  mounted() {
    this.caseUuid = sessionStorage.getItem("exclusiveCaseUuid");
    this.$nextTick(() => {
       OnCaseInit();
      this.getRetrievalDevice(this.caseUuid); // 查询点位
    });
    clearInterval(this.g_playTime);
    this.g_playTime = setInterval(() => {
      this.g_play = window.g_caseObj;
    }, 400);
    let _this = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 39 && _this.showvideoPlay) {
        _this.next();
      }
      if (key == 37 && _this.showvideoPlay) {
        _this.prev();
      }
    };
  },
  destroyed() {
    clearInterval(this.codinTime);
    clearInterval(this.timeTwo);
    clearInterval(this.timeId);
    clearInterval(this.taskprogress);
    clearTimeout(this.videoResult);
  },
  watch: {
    videoList(val) {
      if (val.length > 0) {
        if (val.length >= this.allNum && this.allNum != 0) {
          clearTimeout(this.videoResult);
        }
      }
    },
    cTimesResult(val) {
      if (val.length) {
        this.timeresult.splice(this.timeresultlength, this.timeresult.length);
        this.timeresult = this.timeresult.concat(val);
      }
    },
    //监听当前播放器的窗口是否打开
    showvideoPlay(val) {
      // thumbnail
      //如果窗口是关闭的则执行关闭播放器窗口的方法
      if (!val) {
        this.$nextTick(() => {
          OnChageWindowsSize();
          OnHide();
          setTimeout(() => {
            OnHide();
          }, 1000);
        });
      } else {
        this.zkyStructureSwitch = sessionStorage.getItem("zkyStructureSwitch"); // 中科院结构化
      }
    },
    // 监听当前切换的状态功能问题
    checkorder(val) {
      this.disorder = true;
      let index = (this.currentPage - 1) * this.pageSize + this.videoIndex;
      // 如果是打开的状态则执行顺序播放，如果关闭则执行单个循环播放
      if (val) {
        // 清除单个循环的定时器，进入循环播放
        clearInterval(this.thisTime);
        clearInterval(this.timeId);
        this.setvideoretriInfo(this.videoList[index]);
        this.orderPlay(index);
      } else {
        // 清除顺序播放的定时器
        clearInterval(this.thisTime);
        clearInterval(this.timeId);
        if (index >= this.videoList.length) {
          index = this.videoList.length - 1;
        }
        this.playVideos(
          this.eventStopplay,
          this.videoList[index].frameTime,
          this.videoIndex,
          this.videoList[index],
          2
        );
      }
      setTimeout(() => {
        this.disorder = false;
      }, 1000);
    }
  },
  filters: {
    retrievalTime(val) {
      if (val.offset == undefined) {
        val.offset = 0;
      }
      let nowplaytime = new Date(val.videoStartTime).getTime();
      let alltime =
        Number(nowplaytime) + Number(val.frameTime) + Number(val.offset * 1000);
      let date = new Date(alltime);
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
    },
    taskstatus(val) {
      if (val == 1) {
        return "执行中";
      } else if (val == 2) {
        return "暂停";
      } else if (val == 3) {
        return "排队";
      } else if (val == 4) {
        return "获取视频流";
      } else if (val == 5 || val == 6) {
        return "文件处理中";
      } else if (val == 9) {
        return "停止";
      } else if (val === 0) {
        return "已完成";
      } else if (val == 10) {
        return "失败";
      } else {
        return "";
      }
    },
    retrimodel(val) {
      if (val == 1) {
        val = "区域";
      } else if (val == 2) {
        val = "跨线";
      } else if (val == 3) {
        val = "方向";
      }
      return val;
    },
    targetsize(val) {
      if (val == 1) {
        val = "大";
      } else if (val == 2) {
        val = "中";
      } else if (val == 3) {
        val = "小";
      }
      return val;
    },
    targetqxd(val) {
      if (val == 1) {
        val = "清晰";
      } else if (val == 2) {
        val = "较清晰";
      } else if (val == 3) {
        val = "模糊";
      } else if (val == 4) {
        val = "较模糊";
      }
      return val;
    }
  },
  methods: {
    ...mapMutations([
      "setisopenOffVideo", //是否打开播放器
      "setvideoretriInfo"
    ]),
    /* 键盘事件 */
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
    }, //导出图片
    cutimgtocup() {
      cutImg();
    },
    //导出视频
    cutcutvideotocup() {
      cutvideo();
    },

    //全屏
    fullscreen() {
      this.isfullscreen = !this.isfullscreen;
      let dvis = document.getElementById("playmian");
      let player = document.getElementById("playMians");
      if (this.isfullscreen) {
        this.fulltitle = "退出全屏";
        dvis.style.width = "100%";
        dvis.style.height = "100%";
        dvis.style.top = "1.1rem";
        dvis.style.transform = "translate(-50%, -15.5%)";
        dvis.style.marginTop = '.3rem'
        player.style.height = "8.5rem";
        this.flag = false;
      } else {
        this.fulltitle = "全屏播放";
        dvis.style.width = "9rem";
        dvis.style.height = "5.5rem";
        dvis.style.top = "42%";
        dvis.style.left = "50%";
        dvis.style.transform = "translate(-50%, -50%)";
        player.style.height = "4.85rem";
        dvis.style.marginTop = '0'
        this.flag = true;
      }
      setTimeout(() => {
        OnChageWindowsSize();
      }, 100);
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/commom.css";
/*播放按钮样式  */
.div{
    position: relative;
    top: -0.49rem;
    right: -45%;
    display: flex;
}
.li {
  margin-top: -5px;
}
#li1 {
  width: .6rem;
  height: 100%;
}
#li1 img{
    width: 100%;
    height: 100%;
}
#li2 {
  float: left;
  margin-left: .2rem;
  line-height: .6rem;
  width: 30%;
}

#li2 img:nth-child(2) {
  margin-left: 13%;
  margin-right: 16%;
}
#li2 img:nth-child(3) {
  margin-left: 5%;
  margin-right: 16%;
}
#li3,#li4,#li5 {
display: flex;
flex-direction: column;
margin-right:5%;
text-align: center;
padding-top: .05rem;
cursor: pointer;
}
.picture {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.span {
  margin-top: -2px;
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
  width: 40%;
  margin: 0 0.1rem;
  margin-top: -6px;
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
  width: 12%;
  height: 100%;
  padding: 0 0.1rem;
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

.funcBtn li:nth-child(4),
.funcBtn li:nth-child(5),
.funcBtn li:nth-child(6) {
  margin-right: 0.3rem;
  padding-top: 0.03rem;
}

.funcBtn li:nth-child(4) p,
.funcBtn li:nth-child(5) p,
.funcBtn li:nth-child(6) p {
  font-size: 0.25rem;
  display: block;
  text-align: center;
}

.Coloractives {
  color: #4099e4 !important;
}

.ONactives {
  background-color: #4099e4 !important;
}

.parent {
  width: 100%;
  position: absolute;
  top: 0.6rem;
  bottom: 0px;
  left: 0px;
}
.splitline {
  width: 100%;
  height: 0.02rem;
  background: #333232;
}
.warpper {
  width: 100%;
  min-width: 1200px;
  position: absolute;
  top: 0.3rem;
  bottom: 0.6rem;
  left: 0;
  /* overflow: auto; */
  padding: 0.2rem 0.1rem;
  height: 8.9rem;
}
.titles {
  line-height: 0.5rem;
  margin-bottom: 0.1rem;
  color: #99c9fa;
  font-size: 0.16rem;
}
.videoListsty {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
}
.video_center ul {
  width: 100%;
  min-height: 5em;
  height: calc(100% - 0.8rem);
  overflow: auto;
}

.video_center ul li {
  width: 32%;
  height: 23%;
  border: 2px solid rgba(38, 85, 134, 0.32);
  background-color: rgba(28, 60, 95, 0.32);
  float: left;
  margin-bottom: 1%;
  margin-right: 1%;
}

.video_center span {
  font-size: 0.14rem;
}
.video_center .active {
  border: 2px solid #409eff;
}

.video_center ul li:nth-child(3n) {
  margin-right: 0;
}

.video_center ul li img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.video_left {
  width: 20%;
  height: 100%;
  color: #99c9fa;
  padding: 0 0.15rem;
  float: left;
}

.video_left p {
  line-height: 0.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.video_left .v_title {
  font-size: 0.16rem;
  line-height: 0.4rem;
}

.video_left span {
  width: 0.9rem;
  display: inline-block;
  text-align: left;
  margin-left: 0.1rem;
  font-size: 0.14rem;
}
.video_left .names {
  width: calc(100% - 1.2rem);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  float: right;
  text-align: left;
}
.video_img {
  border: 1px solid #409eff;
  width: 2.5rem;
  height: 1.8rem;
  position: relative;
}
.video_left .v_title {
  font-size: 0.16rem;
  line-height: 0.4rem;
}
.v_title span {
  float: left;
  margin-left: 0.1rem;
}
.video_center {
  width: 57%;
  height: 100%;
  float: left;
}
.margin-10 {
  margin-left: 10px;
}
.video_center li {
  position: relative;
}

.video_center li:hover .none {
  display: block;
}

.video_center .play {
  position: absolute;
  width: 0.25rem;
  height: 0.25rem;
  top: 50%;
  left: 50%;
  display: none;
  transform: translate(-50%, -50%);
  background: url("../../assets/images/videoNewImg/commhand/play_button.png")
    no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  z-index: 3;
}
.video_right {
  width: 23%;
  height: 100%;
  float: left;
  border: 1px solid #13436e;
}

.video_page {
  text-align: right;
  height: 0.3rem;
  line-height: 0.3rem;
}
.clue {
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: center;
  font-size: 0.16rem;
}
.margin-top-10 {
  margin-top: 0.1rem;
}
.margin-bottom-10 {
  margin-bottom: 0.1rem;
}
.video_img img {
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.searchResult {
  width: 100%;
  position: absolute;
  bottom: 0rem;
  color: #fff;
  background-color: rgba(15, 44, 79, 0.6);
  font-weight: 600;
  font-size: 0.12rem;
}
.player {
  z-index: 999;
  position: absolute;
  width: 9rem;
  height: 5.5rem;
  border: 1px solid #2e3f51;
  top: 50%;
  left: 50%;
  background-color: #113254;
  transform: translate(-50%, -50%);
}
.player .playMians {
  width: 100%;
  height: 4.85rem;
  padding: 0.05rem 0.1rem;
}

.player #idPlayers {
  width: 100%;
  height: 100%;
  /* border: 3px solid red; */
  /* border: 1px solid rgba(38, 85, 134, 0.32); */
}
.palyTitle {
  display: flex;
  justify-content: space-between;
  background: rgba(20, 57, 96, 0.33);
  border: 1px solid rgba(15, 44, 79, 0.8);
  height: .25rem;
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
  height: 0.6rem;
  border-top: 1px solid rgba(38, 85, 134, 0.32);
}
.palyImg ul{
    width: 100%;
    height: 100%;
}
.palyImg ul li{
    float: left;
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
.el-select .el-input__inner,
.el-select /deep/ .el-input__inner {
  font-size: 0.14rem;
}

.el-switch .el-switch__label,
.el-switch /deep/ .el-switch__label {
  color: #99c9fa;
}

.el-switch .el-switch__input:focus ~ .el-switch__core,
.el-switch /deep/ .el-switch__input:focus ~ .el-switch__core {
  outline: 0px;
}
.mainSmallul {
  height: calc(100% - 1rem);
  overflow-y: auto;
  padding: 0 0.1rem;
  position: relative;
}
.mainSmallul li {
  position: relative;
  margin-top: 0.13rem;
  float: left;
  width: 48%;
  height: 1.2rem;
  margin-right: 2%;
  border: 2px solid #102d50;
  background-color: rgba(28, 60, 95, 0.32);
}
.deleteLable {
  display: none;
  z-index: 999;
}
.mainSmallul li:hover div .deleteLable {
  display: block;
  position: absolute;
  cursor: pointer;
  width: 0.3rem;
  height: 0.3rem;
  top: 0;
  right: -0.1rem;
  z-index: 3;
}
.mainSmallul li div {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 999;
}
.mainSmallul li div > img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.colorArea {
  position: relative;
  width: 1.5rem;
  height: 0.7rem;
  overflow: hidden;
}
.colorArea img {
  width: 100%;
  height: 100%;
}
.colorheight {
  height: 0.3rem;
  padding-left: 0.1rem;
}
.colorone {
  width: 0.5rem;
  height: 0.3rem;
  margin-left: 0.1rem;
  position: relative;
  overflow: hidden;
}
.colortwo {
  position: relative;
}
.colortwo div {
  position: absolute;
  width: 0.5rem;
  height: 0.3rem;
  top: 0;
}
.colorsearchtype1 {
  width: 0.5rem;
  height: 0.3rem;
}
.colorsearchtype3 {
  left: 0.6rem;
  border-left: 1px solid #ccc;
}
.video_page p {
  color: #99c9fa;
  bottom: 0.12rem;
  left: 5rem;
  font-size: 0.14rem;
  position: absolute;
}
</style>
