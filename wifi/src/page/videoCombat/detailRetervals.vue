<!--
 * @Author: chenxf
 * @Date: 2020-06-08 16:50:54
 * @LastEditTime : 2021-01-26 14:35:41
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\page\videoCombat\detailRetervals.vue
 * @
 -->
<template>
  <div class="details">
    <!-- :destroy-on-close="true" -->
    <el-dialog
      title="检索详情"
      top="8vh"
      v-dialogFull
      class="detailRetervals"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      ref="dialogReter"
      @close="closeDia"
      @open="openDia"
      append-to-body
      width="80%"
    >
      <span>
        <div class="mainCenter" v-if="dialogVisible">
          <div class="center">
            <div class="allpalyr" v-if="dialogVisible" v-show="showvideoPlay">
              <div class="player">
                <p class="palyTitle">
                  <span>视频播放</span>
                  <i class="el-icon-close" @click="closePlay"></i>
                </p>
                <div class="playMians">
                  <div id="idPlayers"></div>
                </div>
                <input id="idSnapshot" type="hidden" style="width:160px" value="c:/">
                <input id="detailidUrl" type="hidden" style="width:399px" value>
                <div class="palyImg">
                  <p class="btnplayer">
                    <img
                      onclick="OnCaseSetup(-1)"
                      @click="imgshow = false"
                      src="../../assets/images/videoCombat/videoplay/play4.png"
                      title="快退一帧"
                    >
                  </p>
                  <p class="btnplayer">
                    <img
                      @click="Onpass"
                      v-show="g_play.pause == 'true' ? false : true"
                      src="../../assets/images/videoCombat/videoplay/pause.png"
                      title="暂停"
                    >
                    <img
                      @click="OnPlays"
                      v-show="g_play.pause == 'true' ? true : false"
                      src="../../assets/images/videoCombat/videoplay/play3.png"
                      title="播放"
                    >
                  </p>
                  <p class="btnplayer">
                    <img
                      onclick="OnCaseSetup(1)"
                      @click="imgshow = false"
                      src="../../assets/images/videoCombat/videoplay/play3.png"
                      title="快进一帧"
                    >
                  </p>
                  <!-- <img onclick="OnCaseSpeed(-1)"  @click="imgshow = true" src="../../assets/images/videoCombat/videoplay/ico3.png" title="快退"> -->
                  <!-- <img onclick="OnCaseSpeed(1)" @click="imgshow = true" src="../../assets/images/videoCombat/videoplay/ico4.png" title="快进"> -->
                  <p class="switch">
                    <!-- <el-tooltip content="是否打开顺序播放" placement="top"> -->
                    <el-switch
                      :disabled="disorder"
                      v-model="checkorder"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="顺序播放"
                      inactive-text="单个播放"
                    ></el-switch>
                    <!-- </el-tooltip> -->
                  </p>
                  <div class="search-right" style="float: right">
                    <li
                      @click="openSignHandler('idPlayers')"
                      v-if="(showVideoStruct == 'true' || zkyStructureSwitch == 'true') && startSing && g_play.pause == 'true'"
                      class="find-sing"
                    >
                      <p></p>
                      <span>寻迹追踪</span>
                    </li>
                    <li
                      v-if="(showVideoStruct == 'true' || zkyStructureSwitch == 'true') && startSing && g_play.pause == 'false'"
                      class="find-sing1"
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
                    <li @click="OpenHand" class="Hand-sing">
                      <p></p>
                      <span>手工标注</span>
                    </li>
                  </div>
                </div>
              </div>
            </div>
            <p class="titles">
              检索任务名称：{{taskName}}
              <!-- <el-button type="primary" class="searchBtn" v-no-more-click @click="circula">循环播放</el-button> -->
            </p>
            <div class="videoListsty">
              <div class="video_left">
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
                  <!-- <p><span>视频名称：</span><span class="names" :title="fileName.substring(fileName.lastIndexOf('\/') + 1, fileName.length)">{{fileName | names}}</span> </p> -->
                  <p>
                    <span>检索进度：</span>
                    <span class="names">{{progress + '%'}}</span>
                  </p>
                  <p>
                    <span>任务状态：</span>
                    <span class="names">{{filestatus | status}}</span>
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
                <div>
                  <p class="v_title">切换检索任务</p>
                  <el-select v-model="taskObj" @change="changeReterTask">
                    <el-option
                      v-for="(item,index) in tasklist"
                      :key="index"
                      :value="item.taskUuid"
                      :label="item.taskName"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="video_right">
                <ul>
                  <li
                    v-for="(item,index) in videoList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    :class="{active:index == videoIndex}"
                    @click.stop="ClickCheckd(index)"
                    :key="index"
                  >
                    <i
                      v-if="showchecked"
                      :class="Checkd.slice((currentPage-1)*pageSize,currentPage*pageSize)[index].state ? 'ONimg' : 'OFFimg'"
                    ></i>
                    <span v-for="(times,i) in timeresult" :key="i">
                      <i
                        v-show="item.status == 4 ? false : item.fileUuid == times.fileuuid ? item.startTime > (Number(times.duration) * 1000 + 1999) : false "
                      >缓冲中</i>
                    </span>
                    <!-- <i  :class="Checkd.slice((currentPage-1)pageSize,currentPage*pageSize)[index].state ? 'ONimg' : 'OFFimg'"></i> -->
                    <p
                      class="play none"
                      title="播放"
                      v-preventReClick="1500"
                      @click="playVideos($event,item.frameTime,index,item,1)"
                    ></p>
                    <img
                      :src="item.snapshotFile"
                      class="snapUrl"
                      :onerror="$store.state.defaultImg"
                      alt
                    >
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
            </div>
          </div>
        </div>

        <!-- <handManual :isHand="isHand" :deviceId='deviceId' :caseUuid="caseUuid" :disablegande="disablegande" ref="handManual" @childByhand="childByhand"></handManual> -->
        <handword :showhandword="isHand" :isonline="false" @childbyHandwork="childbyHandwork"></handword>
      </span>
      <span slot="footer" class="dialog-footer">
        <i
          :title="bigfullScreen ? '还原' : '最大化' "
          class="iconfont fullScreen"
          :class="bigfullScreen ? 'icon-zuidahua' : 'icon-huanyuan'"
        ></i>
        <el-checkbox v-show="showchecked" v-model="thumbnail">合并视频</el-checkbox>
        <el-button
          v-show="showchecked"
          type="primary cancleBtn"
          @click="showchecked = false;thumbnail = false"
        >取消下载</el-button>
        <el-button v-show="showchecked" type="primary cancleBtn" @click="downResult">确定下载</el-button>
        <el-button
          v-show="!showchecked"
          type="primary cancleBtn"
          :disabled="filestatus != 0 && disableDwonLoad"
          @click="choiceDown"
        >选择下载</el-button>
        <el-button
          type="primary cancleBtn"
          :disabled="filestatus != 0 && disableDwonLoad"
          @click="alldownLoad"
        >批量下载</el-button>
        <el-button type="primary cancleBtn" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="下载"
      class="downloadRetrieval"
      :visible.sync="dialogDownLoad"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @open="openDownData"
      @close="closeDownData"
      width="25%"
    >
      <div class="multipleChoice">
        <el-radio-group v-model="checkRadio1" @change="checkDownType">
          <el-radio :label="1">序号</el-radio>
          <el-radio :label="2">时间段</el-radio>
          <el-radio :label="3">全部</el-radio>
        </el-radio-group>
      </div>
      <div class="downImg" v-if="checkRadio1 == '1'">
        <span>序号 :&nbsp;</span>
        <input
          class="placeDown"
          type="number"
          :min="1"
          :max="this.totalCount"
          @blur="verifymin"
          v-model="minDownImg"
        > ------
        <input
          class="placeDown"
          type="number"
          :min="1"
          :max="this.totalCount"
          @blur="verifymax"
          v-model="maxDownImg"
        >
      </div>
      <div class="downImg" v-if="checkRadio1 == '2'">
        <el-input
          type="text"
          class="caseNameSelect caseNameSelectDate"
          id="beginDelTime1"
          readonly
          v-model="beginData"
          placeholder="请选择开始时间"
        >
          <i slot="prefix" class="el-input__icon el-icon-time"></i>
        </el-input>-
        <el-input
          type="text"
          class="caseNameSelect caseNameSelectDate"
          id="endDelTime1"
          readonly
          v-model="endData"
          placeholder="请选择结束时间"
        >
          <i slot="prefix" class="el-input__icon el-icon-time"></i>
        </el-input>
      </div>
      <div class="downImg">
        <el-checkbox v-model="thumbnail">合并视频</el-checkbox>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="cancleBtn" @click="dialogDownLoad = false">取 消</el-button>
        <el-button type="primary" class="passBtn" @click="DownMatter" v-no-more-click>确 定</el-button>
      </span>
    </el-dialog>

    <search-picture
      :visible.sync="sexVideoDialod"
      :retrievalTime="retrievalTime"
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
import handword from "./fastFight/handworkLable";
import videoDown from "../../api/casestudy/videoDown.js";
// import reviseTime from '../../api/realvideo/reviseTime.js'
import BenEndTime from "../../api/realvideo/BenEedTime.js";
import detailRetervaljs from "../../api/realvideo/detailRetervaljs.js";
import { mapGetters } from "vuex";
import CVideo from "../../api/realvideo/C_video.js"; // C++播放器的方法
import scale from "../../api/common/scale.js"; // 图片自适应

import workLableMixins from "../../mixins/work-lable/index.js";
export default {
  data() {
    return {
      bigfullScreen: false,
      workLlable: false,
      propWidth: "",
      propHeight: "",
      propLeft: "",
      propTop: "",
      jiansuo: true,
      videoretriInfo: {}
    };
  },
  components: {
    handword,
    WorkLable: () => import("../../components/work-lable/WorkLable.vue"),
    searchPicture: () =>
      import("../../page/casestudy/addcaseInfo/MultiScreen.vue")
  },
  computed: {
    ...mapGetters(["deviceInfo"])
  },
  watch: {
    isOpenDetail(val) {
      this.dialogVisible = val;
    },
    videoList(val) {
      if (val.length > 0) {
        if (val.length >= this.allNum && this.allNum != 0) {
          // clearInterval(this.videoResult)
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
    // 监听当前切换的状态功能问题
    checkorder(val) {
      // if(!this.imgshow) {
      //     this.imgshow = !this.imgshow
      //   }
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
        this.showVideoStruct = sessionStorage.getItem("glstStructureSwitch"); // 格林森瞳结构化
        this.zkyStructureSwitch = sessionStorage.getItem("zkyStructureSwitch"); // 中科院结构化
        this.getTimeTobe(this.$route.query.caseUuid);
      }
    }
  },
  props: {
    isOpenDetail: Boolean,
    proptaskUuid: String
  },
  mixins: [
    videoDown,
    CVideo,
    detailRetervaljs,
    BenEndTime,
    scale,
    workLableMixins
  ]
};
</script>

<style scoped>
@import "../../assets/css/commom.css";
.el-dialog__wrapper >>> .el-dialog {
  /* margin-top: 9vh !important; */
  min-width: 0rem;
  margin: 0 auto;
}
/* .detailRetervals {
  z-index: 3000 !important;
} */
.allpalyr {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.player {
  z-index: 999;
  position: absolute;
  width: 9rem;
  height: 5.05rem;
  border: 1px solid #2e3f51;
  /* top: ;
    left: 0; */
  top: 50%;
  left: 50%;
  background-color: #113254;
  transform: translate(-50%, -50%);
}

.palyTitle {
  display: flex;
  justify-content: space-between;
  background: rgba(20, 57, 96, 0.33);
  border: 1px solid rgba(15, 44, 79, 0.8);
  line-height: 0.35rem;
  color: #99c9fa;
  font-size: 0.14rem;
  padding: 0 0.2rem;
}

.palyTitle i {
  cursor: pointer;
  margin-top: 0.12rem;
}

.player .playMians {
  padding: 0.1rem 0.2rem;
  height: 4.2rem;
}

.player #idPlayers {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(38, 85, 134, 0.32);
}

.palyImg {
  position: relative;
}

.palyImg .switch {
  display: inline-block;
  padding: 0 0.2rem;
  height: 0.6rem;
  margin: 0 0.2rem;
  position: absolute;
  top: 7px;
}

/* .palyImg p {
  display: inline-block;
  padding: 0 0.2rem;
  height: 0.6rem;
  margin: 0 0.2rem;
} */

.palyImg .btnplayer {
  width: 0.5rem;
  height: 0.3rem;
  margin-top: 0.1rem;
  display: inline-block;
  padding: 0 0.2rem;
  height: 0.6rem;
  margin: 0 0.2rem;
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

.mainCenter {
  width: 100%;
  height: calc(100% - 0.1rem);
  /* padding:0.1rem 0.5rem; */
  position: relative;
}

.mainVideo {
  position: absolute;
  width: 5.3rem;
  height: 3rem;
  background-color: yellow;
  z-index: 9;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.mainVideo i {
  position: absolute;
  right: 0;
  z-index: 9;
  background-color: #fff;
  cursor: pointer;
}

.mainVideo div,
.mainVideo div video {
  width: 100%;
  height: 100%;
}

.center {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(38, 85, 134, 0.32);
  background-color: rgba(28, 60, 95, 0.32);
  position: relative;
}

.titles {
  line-height: 0.5rem;
  background: rgba(20, 57, 96, 0.33);
  border: 1px solid rgba(15, 44, 79, 0.8);
  color: #99c9fa;
  font-size: 0.16rem;
  padding-left: 0.2rem;
}

.titles .el-button {
  float: right;
  margin-top: 0.1rem;
  margin-right: 0.2rem;
  padding: 0.05rem 0.1rem;
}

.videoListsty {
  width: 100%;
  height: calc(100% - 0.5rem);
  /* height: 5.6rem; */
  overflow: auto;
  position: relative;
  padding: 0.1rem;
  /* padding: 0.3rem 0.8rem 0.1rem; */
}

.video_left {
  width: 20%;
  height: 100%;
  border: 1px solid rgba(28, 60, 95, 0.32);
  float: left;
}

.video_left {
  color: #99c9fa;
  padding: 0 0.15rem;
}

.video_left p {
  line-height: 0.3rem;
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
}

.v_title span {
  float: left;
  margin-left: 0.1rem;
  /* text-align: left; */
}

.video_left .names {
  width: calc(100% - 1.2rem);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  float: right;
  text-align: left;
}

.video_right {
  width: 79%;
  margin-left: 21%;
  height: 100%;
}

.video_right li {
  position: relative;
}

.video_right li span i {
  position: absolute;
  width: 0.8rem;
  height: 0.25rem;
  top: 50%;
  left: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%);
  background-size: 100% 100%;
  /* display: inline-block; */
  background-color: rgba(16, 35, 56, 0.5);
  text-align: center;
  z-index: 2;
  color: #99c9fa;
  font-style: normal;
}

.videoListsty ul {
  width: 100%;
  min-height: 5em;
  height: calc(100% - 0.4rem);
  /* height: 5rem; */
  overflow: auto;
}

.videoListsty ul li {
  width: 24%;
  height: 30.6%;
  border: 2px solid rgba(38, 85, 134, 0.32);
  background-color: rgba(28, 60, 95, 0.32);
  float: left;
  margin-bottom: 1%;
  margin-right: 1%;
}

.videoListsty .active {
  border: 2px solid #409eff;
}

.videoListsty ul li:nth-child(4n) {
  margin-right: 0;
}

.videoListsty ul li img {
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

.two {
  position: absolute;
  left: 2.98rem;
}

.playVideo {
  height: 5rem;
  display: inline-block;
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

.video_img {
  border: 1px solid #409eff;
  width: 2.5rem;
  height: 1.8rem;
  position: relative;
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

.video_page {
  width: 100%;
  height: 0.4rem;
  line-height: 0.4rem;
}

.video_page p {
  color: #99c9fa;
  bottom: 0.15rem;
  left: 5rem;
  position: absolute;
  margin-right: 0.2rem;
}

/* .el-pagination{
    position: absolute;
    height: 0.5rem;
    bottom: 0.1rem;
    right: 0.5rem;
  } */
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
.video_page .el-pagination {
  float: right;
  height: 0.4rem;
  line-height: 0.4rem;
}

.searchimg {
  position: absolute;
  top: 0;
  right: 0;
  display: none;
}

.video_right li:hover .none {
  display: block;
}

.video_right .play {
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

.search {
  position: absolute;
  color: #fff;
  cursor: pointer;
  height: 0.2rem;
  display: none;
  line-height: 0.2rem;
  text-align: center;
  padding: 0 0.1rem;
  right: 0.05rem;
  font-size: 0.12rem;
  top: 0rem;
  border: 1px solid rgb(64, 158, 255);
  background-color: rgb(64, 158, 255, 0.8);
}

.el-switch /deep/ .el-switch__label {
  color: #99c9fa;
}

.el-switch /deep/ .el-switch__input:focus ~ .el-switch__core {
  outline: 0px;
}

.downImg {
  margin-top: 0.1rem;
}

.downImg span {
  color: #99c9fa;
}

.downImg /deep/ .el-checkbox__inner {
  /* background-color: rgba(0,0,0,.2); */
  border: 1px solid #134276;
  margin-right: 0.1rem;
}

.downImg /deep/ .el-checkbox__label {
  color: #99c9fa;
}

.placeDown {
  width: 0.9rem;
  height: 0.25rem;
  padding-left: 0.1rem;
}

.caseNameSelect {
  width: 1.5rem;
  color: #c5c5c5;
}

.caseNameSelectDate {
  width: 1.8rem;
  font-size: 0.14rem;
}

.video_right li i {
  position: absolute;
  width: 0.13rem;
  height: 0.13rem;
  top: 0.03rem;
  right: 0.03rem;
}

.ONimg {
  background: url(../../assets/ImgCheckdON.png) no-repeat center center;
  background-size: 100% 100%;
}

.OFFimg {
  background: url(../../assets/ImgCheckdOFF.png) no-repeat center center;
  background-size: 100% 100%;
}

.el-checkbox {
  color: #409eff;
}

.fullScreen {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 50px;
  top: 10px;
  cursor: pointer;
  color: #909399;
  font-size: 0.14rem;
}

.fullScreen :hover {
  color: #409eff;
}
.find-sing p {
  width: 0.25rem;
  height: 0.25rem;
  margin: 0 auto;
  background: url("../../assets/images/videoNewImg/trace-sing2.png") no-repeat;
  background-size: 80% 80%;
}
.find-sing1 p {
  width: 0.25rem;
  height: 0.25rem;
  margin: 0 auto;
  background: url("../../assets/images/videoNewImg/trace-sing.png") no-repeat;
  background-size: 80% 80%;
}
.search-right .find-sing1 span {
  color: #b1b1b4;
}
.search-right li {
  float: left;
  margin-right: 0.3rem;
  cursor: pointer;
}
.search-right li span {
  display: block;
  font-size: 12px;
  color: #7eabd9;
}
.start-sing p {
  width: 0.25rem;
  height: 0.25rem;
  margin: 0 auto;
  background: url("../../assets/images/videoNewImg/start-sing2.png") no-repeat;
  background-size: 80% 80%;
}
.end-sing p {
  width: 0.25rem;
  height: 0.25rem;
  margin: 0 auto;
  background: url("../../assets/images/videoNewImg/end-sing2.png") no-repeat;
  background-size: 80% 80%;
}
.Hand-sing p {
  width: 0.25rem;
  height: 0.25rem;
  margin: 0 auto;
  background: url("../../assets/images/videoNewImg/handleb2.png") no-repeat;
  background-size: 80% 80%;
}
.downloadRetrieval {
  z-index: 3500 !important;
}
</style>

<style>
.detailRetervals /deep/ .el-dialog__body {
  height: 7rem;
}
</style>
