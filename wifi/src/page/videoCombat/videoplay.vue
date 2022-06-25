<template>
  <div class="videoplay" @click="closeTree">
    <!-- <headers/> -->
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/videoCombat',query:{menuCode:100}}">视频侦查></router-link>
      <p class="sysname">&nbsp;极速作战</p>
    </div>
    <div class="main" id="main">
      <div class="left">
        <div class="left_right" id="leftRight">
          <input id="idSnapshot" type="hidden" style="width:160px" value="c:/">
          <input id="idUrl" type="hidden" style="width:399px" value>
          <div class="ddddd" id="idPlayer" v-if="checkOnline == 1">
          </div>
          <div v-if="checkOnline == 2" class="ddddd" :id="checkId">
          </div>
          <div class="left_btn" id="leftBtn" v-show="checkOnline == 1">
            <div class="progress" ref="progress" v-show="proressshow">
              <p @click.prevent="jumpon" ref="jumpon"></p>
              <!-- 跳播 -->
              <b ref="playpro"></b>
              <!-- 播放进度 -->
              <i ref="unloadpro"></i>
              <!-- 加载进度  -->
              <span>{{palytime | datatime}}&nbsp;&nbsp;/&nbsp;&nbsp;{{videotime | datatime}}</span>
            </div>
            <ul>
              <li>
                <img
                  @click="onvidoeplay();ispause = false"
                  onclick="OnPause('false')"
                  v-show="showplay == 'true' ? true : false"
                  src="../../assets/images/videoCombat/rtvideo/souse.png"
                  title="播放"
                >
                <img
                  @click="showpart = null;ispause = true"
                  onclick="OnPause('true')"
                  v-show="showplay == 'true' ? false : true"
                  src="../../assets/images/videoCombat/history/plays.png"
                  title="暂停"
                >
              </li>
              <li @keyup.right.native="OnSetup(1)">
                <img
                  v-show="!ImgfirstShow"
                  @click="goretreat"
                  src="../../assets/images/videoCombat/videoplay/ico1.png"
                  title="快退"
                >
                <img
                  v-show="!ImgfirstShow"
                   @click="prevframe"
                  src="../../assets/images/videoCombat/videoplay/play2.png"
                  title="快退一帧"
                >
                <img
                  v-show="!ImgfirstShow"
                  @click="nextframe"
                  src="../../assets/images/videoCombat/videoplay/play.png"
                  title="快进一帧"
                >
                <img
                  v-show="!ImgfirstShow"
                  @click="gofast"
                  src="../../assets/images/videoCombat/videoplay/ico.png"
                  title="快进"
                >
              </li>
              <!-- <li class="imgoperate notclickn"> -->
              <li class="imgoperate" v-show="!ImgfirstShow">
                <img src="../../assets/images/videoCombat/videoplay/playspeed.png" alt>
                <div>
                  <span :class="{ONactives:0 == nowIndex}"><b  @click="playstep(-3,0)" :class="{Coloractives:0 == nowIndex}">-8X</b></span>
                  <span :class="{ONactives:1 == nowIndex}"><b @click="playstep(-2,1)" :class="{Coloractives:1 == nowIndex}">-4X</b></span>
                  <span :class="{ONactives:2 == nowIndex}"><b @click="playstep(-1,2)" :class="{Coloractives:2 == nowIndex}">-2X</b></span>
                  <span :class="{ONactives:3 == nowIndex}"><b @click="playstep(0,3)" :class="{Coloractives:3 == nowIndex}">0X</b></span>
                  <span :class="{ONactives:4 == nowIndex}"><b @click="playstep(1,4)" :class="{Coloractives:4 == nowIndex}">2X</b></span>
                  <span :class="{ONactives:5 == nowIndex}"><b @click="playstep(2,5)" :class="{Coloractives:5 == nowIndex}">4X</b></span>
                  <span :class="{ONactives:6 == nowIndex}"><b @click="playstep(3,6)" :class="{Coloractives:6 == nowIndex}">8X</b></span>
                </div>
              </li>
              <li v-show="!ImgfirstShow">
                <img
                  onclick="OnChangeView(1)"
                  @click="proressshow = true"
                  src="../../assets/images/videoCombat/rtvideo/onenormal.png"
                  title="一分屏">
                <img
                  onclick="OnChangeView(4)"
                  @click="closeproress();handleTask()"
                  src="../../assets/images/videoCombat/rtvideo/fournormal.png"
                  title="四分屏">
                <img
                  onclick="OnChangeView(6)"
                  @click="closeproress();handleTask()"
                  src="../../assets/images/videoCombat/rtvideo/eightnormal.png"
                  title="六分屏">
                <img
                  onclick="OnChangeView(9)"
                  @click="closeproress();handleTask()"
                  src="../../assets/images/videoCombat/rtvideo/ninenormal.png"
                  title="九分屏">
              </li>
            </ul>
          </div>
        </div>
        <!-- 左侧检索的结果 -->
        <div class="left_l" id="result">
          <img  v-show="ImgfirstShow"  @click="goprev()"  class="left_one"  src="../../assets/images/videoNewImg/pagedown.png"  alt>
          <img  v-show="ImgfirstShow"  @click="gonext()"  class="left_two"  src="../../assets/images/videoNewImg/upturning.png"  alt>
          <img  v-show="ImgfirstShow"  @click="BigRetrieval"  src="../../assets/images/bigsmall/fan.png"  alt>
          <img  v-show="ImgtwoShow"  @click="createRetrieval"  src="../../assets/images/bigsmall/zheng.png"  alt>
          <div class="left_main" ref="scroll">
            <div  v-for="(item,i) in  allVideoList.slice((currentPage-1)*pageSize,currentPage*pageSize)"  @mouseover="showcircul(i)"  :key="i"  @mouseout="hidecir"  :class="{active:i == videoIndex}">
              <span  v-show="showpart != i"  title="播放片段"  @click.stop="palyfrag(item,i)"></span>
              <span  v-show="showpart == i"  @click="pausefrag(i)"  title="暂停片段"></span>
              <span v-if="item.startTime > timeresult[i] * 1000" title="正在缓冲">缓冲中...</span>
              <img class="main_img" :src="item.snapshotFile" alt>
              <b  v-show="showcir == i"  class="circulation"  @click="circulplay(i)">
                <i>({{(currentPage - 1) * 10 + (i + 1)}}/{{totalCount}})共{{totalCount}}个片段</i>
                <img v-show="showpart != i" src="../../assets/images/videoNewImg/circulation.png" title="单个循环播放" alt>
              </b>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <p class="r_one">
          <!-- 任务列表 -->
          <!-- <span>任务列表</span> -->
          <span  @click="checkLis" :class="{'taskColor' : checkOnline == 1}">社会面视频({{videototle}})</span>
          <span @click="checkHis" :class="{'taskColor' : checkOnline == 2}">天网视频</span>
        </p>
        <div v-show="checkOnline == 1" class="right_left">
          <div class="r_mian">
            <el-input type="text" id="text11" class="searchInput searchtime" v-model="beginTime" readonly placeholder="请选择开始时间"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
            </el-input>
            <span>-</span>
            <el-input id="text12" class="searchInput searchtime" readonly v-model="endTime" type="text" placeholder="请选择结束时间"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
            </el-input>
            <p class="r_search">
              <input type="text" maxlength="30" v-model="keyword" placeholder="请输入关键字查询">
              <el-button
                icon="el-icon-search"
                class="searchBtn"
                @click="videoPage = 1;getAllVideo(1);resetInter()"
              >查询</el-button>
              <el-button
                icon="el-icon-refresh"
                class="tryBtn"
                @click="reset()"
              >重置</el-button>
            </p>
          </div>

          <ul class="videosearch">
            <li v-for="(item,index) in videolist"  :index="index"  :key="index"  @click.stop="getplay(index,item)"  >
              <i v-show="nowCheck != index"  @click.stop="showTaskList(item.fileUuid,index)"  class="el-icon-caret-right" >
              </i>
              <i  v-show="nowCheck == index"  @click.stop="hideList(item.fileUuid,index)"  class="el-icon-caret-bottom"  ></i>
              <div v-show="nowCheck == index">
                <p  v-for="(task,i) in taskList"  :key="i"
                  :class="{switchPlay: machine == i}" @click.stop="videoInfo = item;setvideoretriInfo(item);
                  clearVideomore();getoffClickresult(task,i,item);proressshow = true">
                  <span :title="task.taskName">
                    <img src="../../assets/images/videoCombat/begin.png" alt>
                    {{task.taskName}}
                  </span>
                  <span class="taskshow" v-if="task.status == 0">检索完成</span>
                  <span class="taskshow" v-if="task.status == 1">{{task.progress + '%'}}</span>
                  <span class="taskshow" v-if="task.status == 10" style="color:#d16f66">检索失败</span>
                  <span class="taskshow" v-if="task.status == 9" style="color:#d16f66">停止</span>
                  <span class="taskshow" v-if="task.status == 3" style="color:#d16f66">排队</span>
                  <span @click.stop="videoInfo = item;allplay(task,i);setvideoretriInfo(item);proressshow = true" class="el-icon-refresh circlus" title="循环播放"></span>
                  <span  @click.stop="deleteTask(task,item.fileUuid,index)"  class="el-icon-circle-close"  title="删除"></span>
                </p>
              </div>
              <span class="filename" :title="item.fileName">{{item.fileName}}</span>
              <span class="elbtn">
                <span title="视频检索" class="videoret" @click.stop="addvideoReatl(item,index)"></span>
                <!-- <span title='视频结构化' class="videostru"></span> -->
              </span>
            </li>
          </ul>
          <div class="paging">
            <span class="firstPag" @click="prevList">上一页</span>
            <span class="twoPag" @click="nextList">下一页</span>
          </div>
          <div class="tool">工具</div>

          <ul class="toolhandle">
            <li @click="openDataCell">
              <p></p>
              <span>离线视频上传</span>
            </li>
            <li @click="openCommlable">
              <p></p>
              <span>标注池</span>
            </li>
            <li @click="openTaskMan">
              <p></p>
              <span>任务管理</span>
            </li>
            <li @click="openhandwork">
              <p></p>
              <span>手工标注</span>
            </li>
          </ul>
        </div>
        <div v-show="checkOnline == 2" class="right_left right_padding">
          <div class="right_l_one">
            <span>设备名称：</span>
              <input @focus="showTree = true;facilityName = '';facilityId=''" placeholder="请选择天网视频点" maxlength="30" v-model="facilityName" type="text">
              <div class="treeClass" v-if="showTree" @click="showTreeClick">
                <ul class="showhide">
                  <li v-for="(item,index) in listTreeData" @click="showhide(index)" :key="index">
                    <i class="el-icon-caret-right" @click.stop="showtree(index)" v-show="!showlist[index].state"></i>
                    <i class="el-icon-caret-bottom" @click.stop="hidetree(index)" v-show="showlist[index].state"></i>
                    {{item.name}}
                    <p v-show="showlist[index].state" :class="{spanellipsis : a.isOnline == 1 || a.isOnline === undefined,spancolor : a.isOnline == 2 || a.isOnline == 9 || a.isOnline === null}"
                    v-for="(a,i) in item.apes" @click.stop="clickTree(a)" :key="i">{{a.name}}</p>
                  </li>
                </ul>
                <div class="treeClass-none" v-show="isNone">
                  无此视频点
                </div>

                <!-- <el-tree :data="TreeDate" :props="defaultProps" @node-click="clickTree" :filter-node-method="filterNode"  ref="trees"> -->
                <!-- </el-tree> -->
              </div>
          </div>
          <div class="right_l_two">
            <input type="text" id="hisTime1" :title="beginData" readonly v-model="beginData" placeholder="请选择开始时间"> -
            <input type="text" id="hisTime2" :title="endData" readonly v-model="endData" placeholder="请选择结束时间">
            <el-button icon="el-icon-refresh" class="tryBtn" @click="skynetReset()">重置</el-button>
            <el-button class="searchBtn" icon="el-icon-search" @click="searchHisList">查询</el-button>
          </div>
          <div>
            <el-table :data="timetable" border  style="width: 100%" height="1.4rem" >
              <el-table-column prop="timeid" label="编号" width="50">
                <template slot-scope="scope">
                  <span>{{scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="beginTable" label="开始时间">
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="endTable" label="结束时间">
              </el-table-column>
               <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button class="searchBtn videoReatl" @click="playhisvideo(scope.row)">播放</el-button>
                  <el-button class="searchBtn videoReatl" @click="OpenvideoReatl">检索</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div  class="hisretList">
            <p>检索列表：</p>
            <div>
              <ul class="his_task">
                <li v-for="(item, index) in videRetalList" :key="index" @click.stop="showRetalInfo(item,index);proressshow = true">
                  <!-- <i  class="el-icon-caret-right" ></i> -->
                   {{item.taskName}}
                   <span @click.stop="aaaa(item);proressshow = true" class="el-icon-refresh circlus" title="循环播放"></span>
                  <!-- <p>
                    <span  v-show="RetalInfoIndex == index" v-for="(taskMark,i) in taskMarkList" :key="i"
                    @click.stop="clearVideomore();showVideoMore(taskMark.taskUuid,taskMark.progress,taskMark.taskFileList[0].fileUuid,1);
                    getPlayUrl(taskMark.taskUuid,taskMark.taskFileList[0].fileUuid)">
                      {{taskMark.taskFileList[0].fileInfo.fileName}}
                      <span @click.stop="allplay(taskMark.taskFileList[0])" class="el-icon-refresh circlus" title="循环播放"></span>
                    </span>
                  </p> -->
                </li>
              </ul>
            </div>
          </div>
          <div class="tool">工具</div>
          <ul class="markTasue">
            <li @click="openCommlable();showTree = false">
              <p></p>
              <span>标注池</span>
            </li>
            <li @click="openTaskMan();showTree = false">
              <p></p>
              <span>任务管理</span>
            </li>
            <li @click="openthehand();showTree = false">
              <p></p>
              <span>手工标注</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 数据采集  -->
    <dataCell :showDataCell="showDataCell" deviceUuid="" @childByDataCell="childByDataCell"></dataCell>
    <!-- 任务管理 -->
    <taskMan :showTaskMan="showTaskMan" :caseUuid="caseUuid" :deviceid="deviceUuid" @childByTaskMan="childByTaskMan"></taskMan>
    <!-- 视频检索 -->
    <videoRetal :showVideoRetal="showVideoRetal" :gbDeviceId="facilityId" :beginData='beginData' :caseUuid='caseUuid' :endData='endData'  :VideoRetalList="VideoRetalList"  @childbyVideoReat="childbyVideoReat"></videoRetal>
    <!-- 公共标注池 -->
    <commlable :showcommlable="showcommlable" @childbyCommLable="childbyCommLable"></commlable>
    <!-- 手工标注 -->
    <handword :showhandword="showhandword" :isonline='ischeckOnline' @childbyHandwork="childbyHandwork"></handword>

    <footer>
      <p>
        <img src="../../assets/logo.png"> 武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span>
      </p>
    </footer>
  </div>
</template>

<script>
import hisVideoPlay from "../../api/realvideo/hisVideoPlay.js";
import videoplay from "../../api/realvideo/videoplay.js";
import dataCell from "./fastFight/dataCell"; //数据采集
import taskMan from "./fastFight/taskMan"; //任务管理
import videoRetal from "./fastFight/videoRetal"; //视频检索
import commlable from "./fastFight/commlable"; //公共标注池
import beginEnd from "../../api/realvideo/BenEedTime.js"; //时间
import handword from "./fastFight/handworkLable";
import Vue from "vue";
import headers from "../../components/header";
import moment from "moment";
import realvideo from "../../api/realvideo/realvideo.js";
import dictionaries from "../../api/realvideo/dictionaries.js";
import videoDown from "../../api/casestudy/videoDown.js";
import videoMarker from "../../api/realvideo/videoMarker.js";
import reviseTime from '../../api/realvideo/reviseTime.js'
import { windowToCanvas, clearRect, imgwh } from "./canvas.js";
import { mapActions,mapMutations, mapState,mapGetters } from 'vuex'
// $('.videoplay').click((e) => {
//   console.log(e, 'eeeeeeeeeeeeeeeeeeeeee')
//   if((!e.target).closest('.treeClass')) {

//   }
// })

export default {
  data() {
    return {};
  },
  components: {
    headers,
    dataCell,
    taskMan,
    videoRetal,
    commlable,
    handword
  },
  mixins: [hisVideoPlay, videoplay, realvideo, dictionaries, videoDown, videoMarker, beginEnd,reviseTime],
  mounted(){
    // 加载播放器和播放停止按钮的变化
    this.palytime = 0
    this.videotime = 0
    this.$nextTick(() => {
      OnInit();
      this.gettreeModel();
    })


    console.log(63333333);
    this.$store.state.isvideoline = false
    this.getAllVideo(this.videoPage);
    // 刷新视频列表
    this.t = setInterval(() => {
        if (this.$router.currentRoute.path == "/videoCombat/videoplay") {
            this.getAllVideo(this.videoPage);
        } else {
            clearInterval(this.t);
        }
    }, 8000);
    // 获取时间插件格式
    this.OpenTheTime('#text11', '#text12');
    //键盘事件
    // var lett = this;
    document.onkeydown = function (e) {
        var key = window.event.keyCode;
        if (key == 39) {
            OnSetup(1);
        }
        if (key == 37) {
            OnSetup(-1);
        }
        if (key == 116) {
            OnInit();
        }
    };

  },
  methods:{
    ...mapMutations([
      'setvideoretriInfo'  //设置视频播放时候的信息
    ]),
  },
  destroyed() {
    OnExit();
    OnHisExits();
    CloseVodPlayer();
    clearInterval(this.timeFrag) //片段播放的定时器
    clearInterval(this.timetoTaskList) //检索任务的列表定时器
    clearInterval(this.thisTime) //循环播放的定时器
    clearInterval(this.timeTosearch) //列表加载的定时器
    clearInterval(this.timeToMore) //检索任务列表的刷新
    clearInterval(window.g_interval)
    clearInterval(this.timeToplay)
    clearInterval(this.retfragment)
    clearInterval(this.timeTwo)
  }
};
</script>

<style scoped>
@import "../../assets/css/commom.css";

.videoplay {
  width: 100%;
  position: absolute;
  top: 0.6rem;
  bottom: 0px;
  left: 0px;
}
.main {
  width: 100%;
  position: absolute;
  top: 0.4rem;
  bottom: 0.6rem;
  left: 0px;
  overflow: auto;
  color: #fff;
  padding-bottom: 0rem;
  /* background-color: #101010; */
}
.right {
  width: 22.5%;
  height: 99%;
  background: rgba(20, 57, 96, 0.29);
  margin-left: calc(76% + 10px);
  position: relative;
}
.right_left {
  width: 100%;
  height: calc(100% - 0.6rem);
  /* border: 1px solid red; */
  position: relative;
}
.r_one {
  line-height: 0.6rem;
  color: #99c9fa;
  font-size: 0.18rem;
  background: rgba(20, 57, 96, 0.33);
  border-bottom: 2px solid #2c2c2c;
  cursor: pointer;
}
.r_one span{
  display: inline-block;
  width: 48%;
  height: 100%;
  text-align: center;
}
.r_one span:first-child{
  border-right: 3px solid rgba(29, 74, 122, 0.29);
}
.r_mian {
  padding: 0.1rem;
}
.r_mian input {
  line-height: 0.27rem;
  font-size: 0.14rem;
  padding-left: 0.2rem;
  border-radius: 3px;
  border: 0;
  width: 44%;
}
.r_mian span {
  margin: 0 0.1rem;
}
.r_search {
  position: relative;
  margin-top: 0.05rem;
}
.r_search input {
  width: 60%;
  color: #fff;
}
.r_search .el-button {
  position: absolute;
  right: 0;
  top: 0;
  padding: 0rem 0.1rem;
  line-height: 0.31rem;
  font-size: 0.14rem;
  border: 0;
}
.r_search .searchBtn{
  right: 0.8rem;
}
.videosearch {
  color: #99c9fa;
  height: 4.4rem;
  overflow: auto;
  /* margin-top: 0.1rem; */
  padding: 0.1rem;
  font-size: 0.15rem;
  padding: 0 0.1rem;
}
.videosearch li {
  cursor: pointer;
  padding: 0.2rem 0;
  position: relative;
  border-bottom: 2px solid rgba(62, 62, 62, 0.32);
}
.videosearch li div {
  max-height: 1.5rem;
  overflow: auto;
  margin-top: 0.15rem;
}
.videosearch li div p {
  padding: 0.01rem 0.2rem;
  font-size: 0.13rem;
  position: relative;
}
.videosearch li div p:hover {
  color: #409eff;
}
.videosearch li div p span:first-child {
  display: inline-block;
  width: 63%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}
.videosearch li div p span:last-child {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.circlus {
  margin-left: 7%;
}

.videosearch li:hover .filename {
  color: #2e93fb;
}
.videosearch li i {
  position: absolute;
  left: 0;
  top: 0.1rem;
  font-size: 0.18rem;
}
.videosearch li .filename {
  position: absolute;
  left: 0.2rem;
  top: 0;
  width: 75%;
  white-space: nowrap;
  overflow: hidden;
  line-height: 0.4rem;
  /* border: 1px solid red; */
  text-overflow: ellipsis;
}
.videosearch li .elbtn {
  position: absolute;
  top: 0;
  right: 0;
  line-height: 0.4rem;
  width: 15%;
  /* border: 1px solid blue; */
  text-align: right;
  padding: 0 0.1rem;
}
.videosearch li .elbtn span {
  display: inline-block;
  width: 0.21rem;
  height: 0.16rem;
  vertical-align: middle;
}
.taskshow {
  display: inline-block;
  width: 0.8rem;
}
.videosearch li .elbtn .videoret,
.videoret {
  background: url("../../assets/images/videoNewImg/formBtn/strunormal.png")
    no-repeat center center;
}
.videosearch li .elbtn .videoret:hover,
.videoret:hover {
  background: url("../../assets/images/videoNewImg/formBtn/struhover.png")
    no-repeat center center;
}
.videosearch li .elbtn .videostru {
  margin-left: 0.1rem;
  background: url("../../assets/images/videoNewImg/formBtn/retnormal.png")
    no-repeat center center;
}
.videosearch li .elbtn .videostruh:hover {
  background: url("../../assets/images/videoNewImg/formBtn/rethover.png")
    no-repeat center center;
}
.paging {
  line-height: 0.5rem;
  position: relative;
}
.paging span {
  position: absolute;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  border: 1px solid rgba(62, 62, 62, 0.96);
  background-color: rgba(16, 35, 56, 0.32);
}
.paging .firstPag {
  width: 50%;
}
.paging .twoPag {
  width: 50%;
  left: 50%;
}
.paging span:hover {
  background-color: rgba(4, 16, 29, 0.96);
  color: #409eff;
}

.tool {
  line-height: 0.5rem;
  width: 100%;
  background: rgba(20, 57, 96, 0.33);
  padding-left: 0.2rem;
  color: #c5c5c5;
  position: absolute;
  bottom: 0.7rem;
  left: 0;
}
.toolhandle {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.toolhandle li {
  width: 25%;
  float: left;
  height: 0.7rem;
  text-align: center;
  box-sizing: border-box;
  border-right: 1px solid rgba(29, 74, 122, 0.29);
  padding: 0.08rem 0;
  cursor: pointer;
  font-size: 0.14rem;
}
.markTasue {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.markTasue li{
  width:33%;
  float: left;
  height: 0.7rem;
  text-align: center;
  box-sizing: border-box;
  border-right: 1px solid rgba(29, 74, 122, 0.29);
  padding: 0.08rem 0;
  cursor: pointer;
  font-size: 0.14rem;
}
.markTasue li:first-child p {
  width: 0.36rem;
  height: 0.35rem;
  margin: 0 auto;
  background: url("../../assets/images/videoNewImg/copy.png") no-repeat;
  background-size: 100% 100%;
}
.markTasue li:first-child:hover p {
  background: url("../../assets/images/videoNewImg/copeb.png") no-repeat;
  background-size: 100% 100%;
}

.markTasue li:nth-child(2) p {
  width: 0.3rem;
  height: 0.35rem;
  margin: 0 auto;
  background: url("../../assets/images/videoNewImg/logman.png") no-repeat;
  background-size: 100% 100%;
}
.markTasue li:nth-child(2):hover p {
  background: url("../../assets/images/videoNewImg/logmanb.png") no-repeat;
  background-size: 100% 100%;
}
.markTasue li:nth-child(3) p {
  width: 0.32rem;
  height: 0.35rem;
  margin: 0 auto;
  background: url("../../assets/images/videoNewImg/hanldle.png") no-repeat;
  background-size: 100% 100%;
}
.markTasue li:nth-child(3):hover p {
  background: url("../../assets/images/videoNewImg/handleb.png") no-repeat;
  background-size: 100% 100%;
}
.markTasue li:hover {
  background-color: #04101d;
  color: #409eff;
}

.toolhandle li:first-child p {
  width: 0.25rem;
  height: 0.35rem;
  margin: 0 auto;
  background: url("../../assets/images/videoNewImg/datacoll.png") no-repeat;
  background-size: 100% 100%;
}
.toolhandle li:first-child:hover p {
  background: url("../../assets/images/videoNewImg/datacollb.png") no-repeat;
  background-size: 100% 100%;
}
.toolhandle li:nth-child(2) p {
  width: 0.36rem;
  height: 0.35rem;
  margin: 0 auto;
  background: url("../../assets/images/videoNewImg/copy.png") no-repeat;
  background-size: 100% 100%;
}
.toolhandle li:nth-child(2):hover p {
  background: url("../../assets/images/videoNewImg/copeb.png") no-repeat;
  background-size: 100% 100%;
}

.toolhandle li:nth-child(3) p {
  width: 0.3rem;
  height: 0.35rem;
  margin: 0 auto;
  background: url("../../assets/images/videoNewImg/logman.png") no-repeat;
  background-size: 100% 100%;
}
.toolhandle li:nth-child(3):hover p {
  background: url("../../assets/images/videoNewImg/logmanb.png") no-repeat;
  background-size: 100% 100%;
}
.toolhandle li:nth-child(4) p {
  width: 0.32rem;
  height: 0.35rem;
  margin: 0 auto;
  background: url("../../assets/images/videoNewImg/hanldle.png") no-repeat;
  background-size: 100% 100%;
}
.toolhandle li:nth-child(4):hover p {
  background: url("../../assets/images/videoNewImg/handleb.png") no-repeat;
  background-size: 100% 100%;
}
.toolhandle li:hover {
  background-color: #04101d;
  color: #409eff;
}

.left {
  width: 75%;
  float: left;
  height: 100%;
  color: #fff;
  margin-left: calc(1% - 2px);
  position: relative;
}
.left_right {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #02111E;
}
.left_l {
  position: absolute;
  right: 0;
  top: 0;
  width: 0;
  height: 100%;
  padding-left: 0.1rem;
  padding-top: 0.1rem;
  /* border: 1px solid red; */
}
.left_l > img {
  position: absolute;
  left: 0px;
  top: 50%;
  cursor: pointer;
  transform: translateY(-50%);
}
.left_l .left_one {
  top: 0;
  height: 0.15rem;
  width: 0.3rem;
  left: 50%;
  transform: translateX(-50%);
}
.left_l .left_two {
  height: 0.15rem;
  width: 0.3rem;
  left: 50%;
  top: 96%;
  transform: translateX(-50%);
}
.left_l .left_main {
  width: 100%;
  height: 90%;
  margin-top: 10%;
  overflow: auto;
}

.left_l .left_main div {
  width: 100%;
  height: 1rem;
  margin-bottom: 0.1rem;
  position: relative;
}
.active {
  border: 2px solid #409eff;
}
.left_l .left_main div .main_img {
  width: 100%;
  height: 100%;
}
.left_l .left_main div span {
  position: absolute;
  width: 0.25rem;
  height: 0.25rem;
  top: 50%;
  left: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%);
  background-size: 100% 100%;
}
.left_l .left_main div span:first-child {
  background: url("../../assets/images/videoNewImg/commhand/play_button.png")
    no-repeat;
}
.left_l .left_main div span:nth-child(2) {
  background: url("../../assets/images/videoNewImg/commhand/pouse.png")
    no-repeat;
  z-index: 2;
}
.left_l .left_main div span:nth-child(3) {
  display: inline-block;
  width: 0.8rem;
  background-color: rgba(16, 35, 56, 0.5);
  text-align: center;
  z-index: 2;
}

.left_l .left_main div:last-child {
  margin: 0;
}
.left_l .left_main b {
  position: absolute;
  bottom: 0;
  left: 0;
}

.left_right .ddddd {
  width: 100%;
  height: calc(100% - 0.64rem);
  font-size: 0.16rem;
  background-color: #02111E;
}
.left_btn {
  position: absolute;
  height: 0.6rem;
  width: 100%;
  bottom: 0;
  z-index: 2;
  background-color: rgba(20, 57, 96, 0.29);
}
.left_btn .progress {
  width: calc(100% - 2rem);
  height: 0.05rem;
  background-color: #fff;
  position: absolute;
  left: 0.1rem;
  top: -0.15rem;
  border-radius: 5px;
}
.left_btn .progress span:last-child {
  position: absolute;
  top: -5px;
  font-size: 0.14rem;
  right: -1.7rem;
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

.left_btn ul li {
  float: left;
  line-height: 0.6rem;
}
.left_btn ul li img {
  cursor: pointer;
}
.left_btn li:first-child {
  width: 5%;
  height: 0.6rem;
}
.left_btn li:first-child img {
  width: 100%;
  height: 0.59rem;
}
.left_btn li:nth-child(2) {
  width: 20%;
  margin: 0 0.1rem;
  text-align: center;
  font-size: 0.14rem;
}
.searchInput {
  line-height: 0.3rem;
  width: 1.8rem;
  border-radius: 3px;
}
.left_btn li:nth-child(2) img {
  margin-right: 0.1rem;
  vertical-align: middle;
  padding: 0 0.1rem;
}

.left_btn li:nth-child(3) {
  width: 35%;
  height: 0.6rem;
  padding: 0 0.1rem;
  border-left: 1px solid #464646;
}
/* .imgoperate {
  width: 35%;
  height: 0.6rem;
  padding: 0 0.1rem;
  border-left: 1px solid #464646;
} */
.imgoperate img {
  float: left;
  width: 10%;
  margin-top: 0.08rem;
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
  top: -0.45rem;
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

.left_btn li:nth-child(4) {
  width: 35%;
  text-align: center;
  border-left: 1px solid #464646;
}
.left_btn li:nth-child(4) img {
  vertical-align: middle;
  margin: 0 0.2rem;
}
/* .el-picker-panel {
  color: #606266;
  border: 1px solid #e4e7ed;
  -webkit-box-shadow: 0 2px 0.12rem 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 0.12rem 0 rgba(0, 0, 0, 0.1);
  background: #000;
  border-radius: 0.04rem;
  line-height: 0.3rem;
  margin: 0.05rem 0;
} */
.el-dialog__wrapper >>> .el-dialog__header {
  background-color: #f3f6f8;
  font-size: 0.18rem;
}
.el-dialog__wrapper >>> .el-dialog {
  margin-top: 12vh !important;
}
.el-dialog__wrapper >>> .el-dialog__footer {
  padding: 0.2rem;
  border-top: 1px solid #ccc;
  text-align: center;
}
.el-date-editor.el-input {
  width: 2.2rem;
}

.img_left input {
  position: absolute;
  top: 0;
  z-index: 99999;
}
canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}
.el_btn {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.1rem 0.15rem;
}
.notclickn {
  pointer-events: none;
}
.circulation {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  line-height: 0.2rem;
  background: rgba(8, 27, 48, 0.8);
}
.circulation i {
  font-style: normal;
  color: #2e93fb;
  font-size: 0.1rem;
  font-weight: 300;
}
.circulation img {
  float: right;
  margin-right: 0.1rem;
  margin-top: 0.03rem;
  height: 80%;
  width: 8%;
  cursor: pointer;
}
.taskColor{
  color: #2e93fb;
}

.right_padding{
  padding: 0.1rem;
}
.right_l_one{
  height: 0.3rem;
  position: relative;
}

.treeClass{
  z-index: 9999;
  width: 2.5rem;
  height: 2rem;
  background-color: rgba(16, 35, 56, 0.8) !important;
  border: 1px solid rgba(15, 44, 79, 0.8) !important;
  overflow: auto;
  padding: 0.05rem;
  position: absolute;
  top: 0.3rem;
  left:0.74rem;
}
.treeClass-none {
  text-align: center;
  line-height: 2rem
}
.right_l_one input,
.right_l_two input{
  height: 0.3rem;
  padding-left: 0.05rem;
}
.right_l_two{
  margin: 0.1rem 0;
}
.right_l_two input{
  width: 1.38rem;
}
.right_l_two .el-button{
  float: right;
  padding: 0 0.05rem;
  margin-right: 0.05rem;
  line-height: 0.3rem;
  font-size: 0.12rem
}
.el-table >>> .el-table__empty-block{
  min-height: 1rem;
}
.videoReatl{
  padding: 0.03rem 0.06rem;
  font-size: 0.12rem;
}
.hisretList{
  width: 100%;
  height: 3.5rem;
  /* border: 1px solid red; */
}
.hisretList > div{
  height: 3.4rem;
  width: 100%;
  padding: 0.1rem;
  overflow: auto;
  /* border: 1px solid yellow */
}
.his_task li{
  line-height: 0.4rem;
  cursor: pointer;
  border-bottom: 2px solid rgba(62, 62, 62, 0.32);
  color: #99c9fa;
  /* border-bottom: 1px solid red */
}
.his_task li p{
  padding-left: 0.2rem;
  max-height: 1rem;
  overflow: auto;
}
.his_task li p > span{
  display: block;
}
.switchPlay{
  background: #2e93fb;
  opacity: 0.5;
}
.showhide li{
    line-height: 0.26rem;
    color: #99c9fa;
    cursor: pointer;
}
.showhide li i{
  display: inline-block;
  width: 0.15rem;
  height: 0.15rem;
  color: #c0c4cc;
  margin-right: 0.05rem;
}
.showhide p{
  padding-left: 0.4rem;
  color: #99c9fa;
  line-height: 0.26rem;
}
.showhide .spanellipsis{
  color: #99c9fa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.showhide .spancolor{
  color: red;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
