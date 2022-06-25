<template>
  <div class="wrappers">
    <div class="rightMenu" v-show="$store.state.mapLeftMenuFlag" id="MapLeftMenu">
      <div class="imgshow" @click="opentheimg" v-show="listType != 8">
        <img
          :src="showimgrul"
          alt
          class="showlabeImg"
          @load="imgscale('.showlabeImg')"
          :onerror="$store.state.defaultImg"
        >
      </div>
      <div class="item rightInfo">
        <p>点位信息</p>
        <p v-if="listType != 6 && listType != 7  && listType != 8">(比北京时间{{offset | secondHands}}秒)</p>
        <p v-if="listType != 7" :title="listName">名称：{{listName}}</p>
        <p v-if="listType == 7">名称：案发点</p>
        <p>经纬度：{{listlng +' - '+ listlat}}</p>
        <p v-if="listType != 7">类型：{{listType | typetopt}}</p>
      </div>
    </div>

    <div
      style="position: absolute; width: 100%; height: 90%; overflow: auto; top: 30px;left: 0;z-index: -1;"
      id="sbd"
    >
      <div style="width: 100%; height: 100%;position: absolute;" id="bigBox">
        <div id="hideMapContent" style="width: 100%; height: 100%"></div>
      </div>
    </div>

    <div class="topInfo">
      <img src="../../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link
        class="sysname"
        v-show="!seek"
        :to="{path:'/casestudy',query:{menuCode:200}}"
      >案件库 ></router-link>
      <router-link
        class="sysname"
        v-show="seek"
        :to="{path:'/videoCombat',query:{menuCode:100}}"
      >视频侦查></router-link>
      <router-link
        :to="{path:'/videoCombat/caseInfomanage',query:{synergy:'-1',menuCode: 120,ismyupload:true}}"
        class="sysname sysnamesecond"
        v-if="seek && !isclick"
      >&nbsp;我的案事件 ></router-link>
      <router-link
        :to="{path:'/casestudy/caseInfomanage',query:{synergy:'-1',menuCode: 202}}"
        class="sysname sysnamesecond"
        v-if="caseManage && !seek"
      >&nbsp;案事件信息管理 ></router-link>
      <router-link
        :to="{path:'/videoCombat/caseInfomanage',query:{synergy:'-1',menuCode: 120,ismyupload:true}}"
        class="sysname sysnamesecond"
        v-if="mycaseVideo && !seek"
      >&nbsp;案事件信息管理 ></router-link>
      <router-link
        :to="{path:'/casestudy/myupload',query:{menuCode:203}}"
        class="sysname sysnamesecond"
        v-if="myUploadTo"
      >
        &nbsp;案事件查看
        >
      </router-link>
      <router-link
        :to="{path:'/casestudy/mycollect',query:{menuCode:204}}"
        class="sysname sysnamesecond"
        v-if="myCollect"
      >
        &nbsp;我的收藏
        >
      </router-link>
      <router-link
        :to="{path:'/casestudy/mybrowse',query:{menuCode:205}}"
        class="sysname sysnamesecond"
        v-if="myBrowse"
      >
        &nbsp;最近浏览
        >
      </router-link>
      <router-link
        :to="{path:'/casestudy/mysynergy',query:{menuCode:222}}"
        class="sysname sysnamesecond"
        v-if="mysynergy"
      >
        &nbsp;我的协同
        >
      </router-link>
      <router-link
        :to="{path:'/casestudy/caseApprove',query:{menuCode:220}}"
        class="sysname sysnamesecond"
        v-if="isTrial"
      >
        &nbsp;案件审批
        >
      </router-link>
      <router-link
        :to="{path:'/casestudy/caseMark',query:{menuCode:221}}"
        class="sysname sysnamesecond"
        v-if="isgrade"
      >
        &nbsp;案件评分
        >
      </router-link>
      <p class="sysname">案件详情</p>
    </div>
    <div class="contentBody">
      <!-- <div class="contentTitle">
        <div class="contentTitleIcon"></div>
        <div>案件详情</div>
      </div>-->
      <!-- 嫌疑目标轨迹图片 -->
      <div
        v-show="isTrajectory && !isVideo"
        v-for="(item,index) in trajectoryArr"
        class="stytic"
        :key="index"
        :id="'trajectoryPic'+index"
        v-if="item.videoCaptureUrl"
      >
        <div class="styticImgBox">
          <img class="oneimg oneimg2" :src="item.videoCaptureUrl" alt>
        </div>
        <!-- <img class="oneimg" :src="item.videoCaptureUrl" alt> -->
        <img class="twoimg" src="../../../assets/images/caseStydy/arrows.png" alt>
        <span>
          {{getTrajectory(item.videoStartTime || item.absoluteTime, Number(item.relativeTime),
          Number(item.offset))}}
        </span>
      </div>

      <div id="mapContent"></div>

      <div class="point">
        <span>经度：{{point.lng}}</span>
        <br>
        <span>纬度：{{point.lat}}</span>
      </div>

      <img
        class="dingwei"
        src="../../../assets/case/quickPos.png"
        title="刷新"
        @click="suspicionUuids= '';showProgreesFlag = false;getSuspicionMessage()"
      >

      <!--顶部按钮-->
      <!-- <div class="optionBOX"> -->
      <!--嫌犯目标-->
      <div class="suspectPreson">
        <p @click="spaceVideoArrowFlag == 1 ? spaceVideoArrowFlag = 2 : spaceVideoArrowFlag = 1">
          嫌疑目标
          <i v-show="spaceVideoArrowFlag == 1" class="el-icon-caret-top"></i>
          <i v-show="spaceVideoArrowFlag == 2" class="el-icon-caret-bottom"></i>
        </p>
        <div v-if="spaceVideoArrowFlag == 1" class="suspectPresonbox">
          <div class="selectbox">
            <select v-model="suspicionUuids" @change="changeSuspicionObj(suspicionUuids)">
              <option value>全部</option>
              <option
                v-for="(item,index) in suspicionList"
                :key="index"
                :value="item.suspicionUuid"
              >
                {{item.suspicionName
                + changeSuspicionType(item.suspicionType)}}
              </option>
            </select>
          </div>
          <div class="criminalSuspectDetial criminalSuspectDetial1">
            <!-- 轨迹进度开始 -->
            <div class="progress-wrapper" v-show="showProgreesFlag && suspicionUuids">
              <div class="start-progress">
                开始
                <i class="el-icon-time"></i>
              </div>
              <div class="progress-item" v-for="(item, index) in showProgreesArr" :key="index">
                <div
                  class="progress-item-title"
                  :class="item[0].warnFlag ? 'progress-item-title-warn': ''"
                >
                  <div class="progress-item-title-count">{{ item[0].timeFlag }}</div>
                  <div class="icon-right"></div>
                </div>
                <div class="progress-item-count" v-for="(v, k) in item" :key="k">
                  <div
                    class="progress-item-left"
                    :class="v.warnFlag ? 'progress-item-left-warn' : ''"
                  >
                    {{ v.rightFlag
                    }}
                  </div>
                  <div
                    class="progress-item-right"
                    :class="v.warnFlag ? 'progress-item-right-warn' : ''"
                  >
                    <div>点位：{{ v.deviceName }}</div>
                    <div>{{ v.rightTime }}</div>
                  </div>
                </div>
              </div>
              <div class="end-progress">结束</div>
            </div>
            <!-- 轨迹进度结束 -->
            <div
              v-show="warningDataFlag && !showProgreesFlag"
              style="padding-left: 14px;height: 3.2rem;overflow: auto;"
            >
              <div
                v-for="(item, index) in warningDataList"
                :key="index"
                class="block-margin-bottom"
              >
                <div style="display: flex">
                  <span>嫌疑目标：&nbsp;</span>
                  <span
                    :class="item[0].warnType==1 ? 'warningType-1' : 'warningType-2'"
                    :title="item[0].suspicionName"
                  >{{item[0].suspicionName }}</span>
                </div>
                <div>
                  <span>轨迹状态：</span>
                  <span
                    :class="item[0].warnType==1 ? 'warningType-1' : 'warningType-2'"
                    :title="item[0].warnType"
                  >{{ item[0].warnType==1?'正常' : '异常' }}</span>
                </div>
              </div>
            </div>

            <el-button
              @click="Dialog3D = true"
              :disabled="is3DEmpty"
              :title="is3DEmpty? '目标没有特征' : '查看目标特征'"
              v-show="suspicionUuids"
            >查看特征</el-button>
          </div>
        </div>
      </div>

      <div class="middlebox">
        <!-- <div
          class="caseEvaluate"
          v-show="!mycaseVideo"
          @click="evaluate = ''; DialogVisible = true"
        >
          <div class="innerbox">
            <img style="margin-right: 7px" src="../../../assets/case/caseEvalution-icon.png" alt>
            <span>评价</span>
          </div>
        </div>-->
        <div class="downloadAccessory" @click="accessorydown();">
          <div class="innerbox">
            <img
              style="margin-right: 7px"
              src="../../../assets/case/accessoryDownLoad-icon.png"
              alt
            >
            <span>附件下载</span>
          </div>
        </div>
        <div
          class="exportAccessory"
          @click="exportCase(2);showProgreesFlag = false;suspicionUuids = '';changeSuspicionObj()"
        >
          <div class="innerbox">
            <img style="margin-right: 7px" src="../../../assets/case/caseExport-icon.png" alt>
            <span>导出卷宗</span>
          </div>
        </div>
        <div class="spaceHide">
          <div class="oneKey" @click="oneKeyFlag=!oneKeyFlag" v-show="oneKeyFlag">
            <span class="el-icon-caret-bottom" style="margin-right: 5px;margin-top: 2px"></span>
            <span style="margin-right: 4px;">一键隐藏</span>
          </div>
          <div class="oneKey" @click="oneKeyFlag=!oneKeyFlag" v-show="!oneKeyFlag">
            <span class="el-icon-caret-top" style="margin-right: 5px;margin-top: 2px"></span>
            <span style="margin-right: 4px;">一键展开</span>
          </div>
        </div>
        <div
          v-if="$route.path == '/videoCombat/casePicture_look'"
          class="exportAccessory"
          @click="gotoUpdateRoute(caseUuid)"
        >
          <div class="innerbox">
            <img style="margin-right: 7px" src="../../../assets/case/caseExport-icon.png" alt>
            <span>跳转编辑页</span>
          </div>
        </div>
      </div>
      <!--案件属性-->
      <div class="propretiesOn">
        <p @click="spaceVideoArrowFlag == 1 ? spaceVideoArrowFlag = 2 : spaceVideoArrowFlag = 1">
          案事件属性展开
          <i v-show="spaceVideoArrowFlag == 1" class="el-icon-caret-top"></i>
          <i v-show="spaceVideoArrowFlag == 2" class="el-icon-caret-bottom"></i>
        </p>
        <div v-if="spaceVideoArrowFlag == 1" class="criminalSuspectDetial liebiao">
          <ul>
            <li v-for="(item, index) in this.$constant.CASE_INFO" :key="index">
              {{item.value}}:
              <span>{{ dataCaseInfo[[item.key]] }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- </div>  -->
      <el-dialog title="查看特征信息" :visible.sync="Dialog3D" width="70%">
        <div v-if="Dialog3D">
          <Suspects3D
            :suspicionUuid="suspicionUuids"
            :suspicionSee="true"
            :Suspects3DType="suspicionType"
          ></Suspects3D>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" class="cancleBtn" @click="Dialog3D = false">返 回</el-button>
        </span>
      </el-dialog>



      <!--视频列表-->
      <div
        class="spaceVideoArrow"
        :class="spaceVideoArrowFlag == 1 ? 'ONspaceVideoArrow' : spaceVideoArrowFlag == 2 ? 'OFFspaceVideoArrow': 'OFFspaceVideoArrows' "
      >
        <div
          class="spaceVideoArrowIcon"
          @click="spaceVideoArrowFlag == 1 ? spaceVideoArrowFlag = 2 : spaceVideoArrowFlag = 1;skynetFlag = null"
        >
          <div
            v-show="spaceVideoArrowFlag == 1"
            class="el-icon-arrow-down spaceVideoArrowIcon-Item"
            style="color: white;font-size: 22px"
          ></div>
          <div
            v-show="spaceVideoArrowFlag == 2"
            class="el-icon-arrow-up spaceVideoArrowIcon-Item"
            style="color: white;font-size: 22px"
          ></div>
        </div>
      </div>
      <!-- 点位展示 -->
      <div class="pointType" :class="spaceVideoArrowFlag == 2 ? 'pointTypefold' : 'pointType'">
        <p @click="pointChange">
          点位
          <i v-show="spaceVideoArrowFlag == 1" class="el-icon-caret-top"></i>
          <i v-show="spaceVideoArrowFlag == 2" class="el-icon-caret-bottom"></i>
        </p>
        <div v-if="spaceVideoArrowFlag == 1" class="suspectPresonbox">
          <div class="criminalSuspect">
            <el-input class="pointNar" v-model="pointName" placeholder="请输入点位名称"></el-input>
            <el-tree
              class="filter-tree"
              :data="pointDataList"
              :props="defaultProps"
              :filter-node-method="filterNode"
              ref="tree"
              accordion
              @node-click="handleNodeClick"
            >
              <span class="span-ellipsis" slot-scope="{node, data}">
                <span :title="node.label">{{node.label}}</span>
              </span>
            </el-tree>
          </div>
        </div>
      </div>
      <div
        class="spaceVideoWrap"
        :class="spaceVideoArrowFlag == 1 ? 'ONspaceVideo' : spaceVideoArrowFlag == 2 ? 'OFFspaceVideo' : 'OFFspaceVideos'"
      >
        <div class="spaceVideBut leftBut el-icon-arrow-left" @click="scrollLeftRight('left')"></div>
        <div class="spaceVideBut rightBut el-icon-arrow-right" @click="scrollLeftRight('right')"></div>
        <div class="spaceVideo" id="spaceVideo" v-on:scroll.passive="spaceVideoScroll()">
          <div class="videoItem" v-for="(item,index) in  SuspicionObjList" :key="index">
            <div v-if="item.type===4" style="width: 100%;height: 100%">
              <div class="playItem none" @click="getVideoUrl(item,index)"></div>
              <div
                class="frameVideo"
                @click="getVideoUrl(item,index)"
                :class="isactive == index ? 'markNone' : '' "
              ></div>
              <div class="markVideo" :class="isactive == index ? 'markNone' : '' ">
                <span class="boderShow"></span>
                <img
                  class="markerImg"
                  @load="imgscale('.markerImg')"
                  :src="item.videoCaptureUrl"
                  :onerror="$store.state.defaultImg"
                  alt="暂无图片"
                  v-show="item.videoCaptureUrl"
                  draggable="false"
                >
                <img
                  style="width: 100%;height: 100%;color:white"
                  src="@/assets/error_none.png"
                  alt="暂无图片"
                  v-show="!item.videoCaptureUrl"
                  draggable="false"
                >
              </div>
            </div>
          </div>
          <div class="approveRight" v-show="isTrial">
            <div class="approveUp approshow searchBtn" @click="spaceVideoShow=false">审 批</div>
          </div>
        </div>
      </div>

      <!-- 审批状态下才显示 -->
      <div
        v-show="!spaceVideoShow"
        :class="['approveWrap',spaceVideoArrowFlag == 1? 'ONspaceVideo':'OFFspaceVideo']"
      >
        <div class="approveLeft">
          <div class="approveResult">
            <span style="width: 60px;margin-right: 7px">审批结果&nbsp;: &nbsp;</span>
            <el-select v-model="approveStatus" placeholder="请选择审批结果">
              <el-option value="1" label="通过"></el-option>
              <el-option value="2" label="不通过"></el-option>
            </el-select>
            <!-- <select>
              <option value="1">通过</option>
              <option value="2">不通过</option>
            </select>-->
          </div>
          <div class="approveSuggest">
            <span style="width: 60px; margin-right: 7px">审批意见&nbsp;: &nbsp;</span>
            <textarea
              maxlength="200"
              style="width: calc(90% - 60px);height: 100%;background-color:rgb(44, 45, 46);color:#99c9fa;;border: 1px solid #5F5E57;font-size: 14px;background: rgba(0, 0, 0, 0.5);resize:none"
              v-model="approveOpinion"
              placeholder="请输入审批意见"
            ></textarea>
          </div>
        </div>
        <div class="approveRight">
          <div class="approveSure searchBtn" @click="caseToApprove()">确 定</div>
          <div class="approveUp topBtn" @click="spaceVideoShow=true">收 起 审 批</div>
        </div>
      </div>
    </div>
    <!-- <footer>
      <p>
        <img src="../../../assets/logo.png">武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span></p>
    </footer>-->
    <!-- 下载附件-->
    <el-dialog title="附件列表" :visible.sync="accessoryFlag" width="50%">
      <span v-if="accessoryFlag">
        <downaccessory ref="accessoryList" :caseuuId="$route.query.caseUuid" :isNotDel="false"></downaccessory>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="cancleBtn" @click="cancel">返 回</el-button>
      </span>
    </el-dialog>

    <!-- 视频下载 -->
    <el-dialog title="视频列表" :visible.sync="videoListFlag" width="50%">
      <span v-if="videoListFlag">
        <dwonvideo ref="videolists" :caseuuId="$route.query.caseUuid" :isNotDel="false"></dwonvideo>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="cancleBtn" @click="videoListFlag = false">返 回</el-button>
      </span>
    </el-dialog>

    <!-- 评价 -->
    <el-dialog title="案件评价" :visible.sync="DialogVisible" width="40%">
      <span class="evaluate" v-if="DialogVisible">
        <div class="evaluate_top">
          <p>已评价(共{{evaluateList.length}}条)</p>
          <ul>
            <li v-for="(item,index) in evaluateList" :key="index">
              <p>
                <span>{{ item.userName }}：</span>
                <span>{{ item.createTime }}</span>
              </p>
              <div class="text">{{ item.content }}</div>
            </li>
          </ul>
        </div>
        <div class="evaluate_btn">
          <p>再次评论</p>
          <textarea maxlength="200" style="resize: none;" v-model="evaluate" placeholder="请输入评论内容"></textarea>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogVisible=false"></el-button>
        <el-button @click="caseEvaluate()"></el-button>
      </span>
    </el-dialog>

    <openshowImg
      :isopenimg="isopenimg"
      :lableImgList="lableImgList"
      :isdelete="true"
      :u_imgrul="u_imgrul"
      @childByshowImg="childByshowImg"
    ></openshowImg>
  </div>
</template>

<script>
import maps from "../../../api/realvideo/map.js"; //引入地图JS模块
import downaccessory from "../addcaseInfo/downaccessory"; //引入附件下载列表组件
import dwonvideo from "../addcaseInfo/downvideo"; //引入视频下载列表组件
import car3DDialog from "./caseDetailDialogs/car3DDialog";
import carNatureDialog from "./caseDetailDialogs/carNatureDialog";
import person3DDialog from "./caseDetailDialogs/person3DDialog";
import personFaceDialog from "./caseDetailDialogs/personFaceDialog";
import personNatureDialog from "./caseDetailDialogs/personNatureDialog";
import unCarNatureDialog from "./caseDetailDialogs/unCarNatureDialog";
import Suspects3D from "../addcaseInfo/addSuspects3D";
import openshowImg from "../addcaseInfo/openshowImg"; //展示图片
import track from "../../../api/casestudy/track.js"; //展示图片
import scale from "../../../api/common/scale.js";
import trackChange from "../../../api/casestudy/trackChange.js"; // 轨迹导航
import exportCase from "../../../api/casestudy/exportCase.js"; // 导出卷宗


let carIco = require("@/assets/images/device/car.png");
let faceIco = require("@/assets/images/device/face.png");
import flvplay from "../../../api/casestudy/flvPlay.js"; //播放器的flv的js
import reviseTime from "../../../api/realvideo/reviseTime.js";
import flvjs from "flv.js";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import _ from "lodash";
import html2canvas from "html2canvas";
import canvg from "canvg";

export default {
  components: {
    car3DDialog,
    carNatureDialog,
    person3DDialog,
    personFaceDialog,
    personNatureDialog,
    unCarNatureDialog,
    downaccessory,
    dwonvideo,
    Suspects3D,
    openshowImg,
    loading: null
  },
  data() {
    return {
      listType: "",
      listName: "",
      listlng: "",
      listlat: "",
      lableImgList: [],
      isopenimg: false,
      suspectFlag: true,
      oneKeyFlag: true,
      accessoryFlag: false,
      spaceVideoArrowFlag: true,
      centerSpaceVideoFlag: false,
      downloadVideoFlag: true,
      DialogVisible: false,
      videoListFlag: false,
      videoUrl: "",
      caseUuid: "",
      dataCaseInfo: "",
      suspicionList: [],
      suspicionObj: "",
      evaluate: "",
      evaluateList: [],
      suspicionUuids: "", //select嫌疑人目标ID
      SuspicionObjList: [],
      carNatureObj: "",
      personFaceObj: "",
      personNatureObj: {}, //特征比对
      unCarNatureObj: "",
      caseMessageObj: {},
      videoList: [],
      accessoryList: [],
      myUploadTo: false,
      caseManage: false,
      myBrowse: false,
      myCollect: false,
      mysynergy: false,
      spaceVideoShow: true,
      isTrial: false,
      suspicionType: "",
      approveStatus: "1",
      approveOpinion: "",
      Dialog3D: false,
      is3DEmpty: true, //特征是否为空
      leftSlipNum: 5, //左滑个数
      isgrade: false,
      seek: false,
      isclick: false,
      seekFlag: false,
      lableId: "",
      caseMarkNum: 1, //列表分页的查询
      caseMarkTotal: 100,
      imgListWH: [],
      mycaseVideo: false, //实战平台中的案件库中的查看
      showmarkImg: false,
      // mapData:[]
      offset: 0, // 设备校时
      isactive: null,
      showProgreesFlag: false,
      isTrajectory: false,
      isVideo: false,
      exportPicList: [],
      arr: [],
      uniqArr: [],
      currentSpeed: "",
      pointDataList: [
        {
          cameraName: "临时点",
          children: []
        },
        {
          cameraName: "信息点",
          children: []
        },
        {
          cameraName: "案发点",
          children: []
        },
        {
          cameraName: "天网点",
          children: []
        },
        {
          cameraName: "社会面点",
          children: []
        }
      ],
      pointList: [], //当前显示的所有点位信息
      defaultProps: {
        children: "children",
        label: "cameraName"
      },
      pointName: "",
      isCurrentUser: false,
      allTrackData: [], // 所有轨迹数据
      lineDdd: [],
      markCcc: [],
      exportSusNum: 0, //导出卷宗的时候嫌疑目标的长度
      exportImgList: [] //导出卷宗的时候嫌疑目标的长度
    };
  },
  mixins: [maps, flvplay, reviseTime, track, scale, trackChange, exportCase],
  methods: {
    ...mapActions(["togglePersonLable"]),
    // 审批
    caseToApprove() {
      if (this.caseUuid == "" || this.caseUuid == null) {
        this.$notify({
          type: "warning",
          message: "不符合提交条件！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.approveStatus == "" || this.approveStatus == null) {
        this.$notify({
          type: "warning",
          message: "审批结果不能为空！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "正在审批中"
      });
      let params = {
        targetId: this.caseUuid,
        approveStatus: this.approveStatus,
        approveOpinion: this.approveOpinion
      };
      let data = this.$qs.stringify(params);
      this.$http({
        url: " pca/approve/approveCase/toApprove",
        method: "post",
        data: data
      }).then(res => {
        this.loading.close();
        if (res.statusText === "OK" && res.data.code === 200) {
          this.$notify({
            type: "success",
            message: "审批成功！",
            position: "bottom-right",
            duration: 3000
          });
          this.$router.push("/casestudy/caseApprove?menuCode=220");
        } else if (res.data.code === 100) {
          this.$notify({
            type: "warning",
            message: res.data.data,
            position: "bottom-right",
            duration: 3000
          });
        } else {
          this.$notify({
            type: "error",
            message: "审批失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },

    //打开中间的视频
    getVideoUrl(data, index) {
      this.isTrajectory = false;
      setTimeout(() => {
        this.map.centerAndZoom(
          new BMap.Point(data.device.longitude, data.device.latitude + 0.018),
          sessionStorage.getItem("bmapLevel")
        );
      }, 200);
      this.isactive = index;
      this.lableId = data.typeId;
      this.map.removeOverlay(this.ImgMarker);
      let url = "";
      if (data.storagePath) {
        url = this.getUrl(data.storagePath);
      } else if (data.videoUrl) {
        url = this.getUrl(data.videoUrl);
      }
      if (data.markTarget == null) {
        this.caseMessageObj = {};
      } else {
        this.caseMessageObj = data.markTarget;
      }
      // 2019-04-23添加案件标注视频
      let point = new BMap.Point(data.device.longitude, data.device.latitude);
      setTimeout(() => {
        this.monitoringPointInfoWin(point, data, url);
      }, 200);
    },
    //定位到当前的点位
    monitoringPointInfoWin(point, data, url) {
      let html = "";
      html = `<div class="pointBox"> <video autoplay="autoplay" loop  disablePictureInPicture controls="controls" id="centerVideo_flv"></video> </div>`;
      let infoWindow = new BMap.InfoWindow(html, {
        title: "点位名称：" + data.device.name,
        offset: new BMap.Size(0, -17)
      });
      infoWindow.disableCloseOnClick();
      setTimeout(() => {
        this.map.openInfoWindow(infoWindow, point);
        this.$nextTick(() => {
          setTimeout(() => {
            this.isVideo = true;
            this.flv_load_mds("centerVideo_flv", url);
          }, 150);
        });
      }, 100);
      infoWindow.addEventListener("clickclose", evt => {
        this.isTrajectory = true;
        this.showarrPoisArr = true;
        this.isVideo = false;
        this.map.centerAndZoom(point, sessionStorage.getItem("bmapLevel"));
        for (let i = 0; i < this.trajectoryArr.length; i++) {
          let getLongitude = this.trajectoryArr[i].longitude; // 获取经度
          let getLatitude = this.trajectoryArr[i].latitude; // 获取纬度
          this.zuobiao2Pixels(getLongitude, getLatitude, i);
        }
      });
    },
    //10月14新增  跳转编辑页面
    gotoUpdateRoute(caseUuid) {
      if (this.dataCaseInfo.approvalStatus == 1) {
        this.$notify({
          type: "warning",
          message: "案件正在审批中！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.isCurrentUser == "true" || !this.isCurrentUser) {
        this.$router.push({
          path: "/videoCombat/addcasetwo?menuCode=100",
          query: {
            caseUuid: caseUuid,
            edit: true,
            mycase: true,
            editmycase: true
          }
        });
      } else if (this.isCurrentUser == "false") {
        this.$notify({
          type: "warning",
          message: "不允许编辑他人案件！",
          position: "bottom-right",
          duration: 3000
        });
      }
    },

    //拖拽视频窗口
    drag() {
      this.$refs.centerSpaceVideo.style.left = "32.5%";
      this.$refs.centerSpaceVideo.style.top = "30%";
      var dragCircle = document.getElementById("centerSpaceVideo");
      dragCircle.onmousedown = function(ev) {
        ev = ev || window.event;
        var relaX = ev.clientX - this.offsetLeft;
        var relaY = ev.clientY - this.offsetTop;
        document.onmousemove = function(ev) {
          ev = ev || window.event;
          dragCircle.style.left = ev.clientX - relaX + "px";
          dragCircle.style.top = ev.clientY - relaY + "px";
        };
        document.onmouseup = function(ev) {
          ev = ev || window.event;
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    },
    //查看案件详细信息
    getCaseMessage() {
      this.$http({
        url: "pca/casemng/baseinfo/query",
        method: "get",
        params: {
          caseUuid: this.caseUuid
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.dataCaseInfo = res.data.data;
          this.caseLabel(res.data.data.longitude, res.data.data.latitude, true);
        } else {
          this.$notify({
            type: "warning",
            message: "服务器异常,请稍后重试",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    //进入页面查询嫌疑目标列表
    getSuspicionMessage(state, id) {
      this.$http({
        url: "pca/casemng/suspicion/list",
        method: "get",
        params: {
          caseUuid: this.caseUuid
          // caseUuid: "FC5216267BDB4E3492E8DA39D32CDE19"
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.suspicionList = res.data.data;
          this.changeSuspicionObj(this.suspicionUuids);
          this.warningData(this.suspicionList);
          if (this.suspicionList.length != 0) {
            if (id) {
              this.suspicionUuids = id;
            } else {
              this.suspicionUuids = "";
            }
          } else {
            this.suspicionUuids = "";
          }
          this.exportToData(this.suspicionList);
        }
      });
    },
    // 切换嫌疑目标信息
    changeSuspicionObj(val) {
      this.pointName = "";
      this.isVideo = false;
      this.trajectoryArr = [];
      // this.isTrajectory = false;
      this.lableId = null;
      // this.$store.state.suspicionUuid = this.suspicionUuids;
      // this.spaceVideoArrowFlag = true;
      if (!val) {
        this.isTrajectory = false;
        this.polylineObj = null;
        this.warningDataFlag = true;
      } else {
        this.isTrajectory = true;
        this.warningDataFlag = false;
      }
      this.showProgreesFlag = false;
      this.showProgreesArr = [];
      this.progreesArr = [];
      // this.trajectoryArr = []
      this.$http({
        url: "pca/casemng/suspicion/details",
        method: "get",
        params: {
          suspicionUuid: this.suspicionUuids
        }
      }).then(res => {
        if (res.data.code == 200) {
          clearInterval(this.timer);
          //表示有嫌疑目标
          if (res.data.data != null) {
            this.map.clearOverlays();
            this.suspicionType = res.data.data.suspicionType;
            this.currentSpeed = res.data.data.speed;
            this.ajaxTree(res.data.data.suspicionUuid);
            // this.ajaxTree(res.data.data.suspicionUuid);
            setTimeout(() => {
              this.getlats(res.data.data.suspicionUuid, res.data.data.speed);
            }, 200);
            // 绑定的手机轨迹
            setTimeout(() => {
              let points = [];
              for (let i = 0; i < this.trajectoryArr.length; i++) {
                let obj = {};
                obj.latitude = this.trajectoryArr[i].latitude;
                obj.longitude = this.trajectoryArr[i].longitude;
                obj.time = this.getTrajectory(
                  this.trajectoryArr[i].videoStartTime ||
                    this.trajectoryArr[i].absoluteTime,
                  Number(this.trajectoryArr[i].relativeTime),
                  Number(this.trajectoryArr[i].offset)
                );
                points.push(obj);
              }
              let data = {
                caseUuid: this.caseUuid,
                beginTime: "",
                endTime: "",
                range: 300,
                points: JSON.stringify(points),
                suspicionUuids: this.suspicionUuids,
                page: 1,
                searchFlag: 1,
                pageSize: "",
                imsi: "",
                pointNum: ""
              };
              data = this.$qs.stringify(data);
              this.$http.post("vsas/baseStation/collision", data).then(res => {
                if (res.data.code == 200) {
                  let trackList = [];
                  trackList = res.data.data;
                  if (res.data.data != "" && res.data.data != undefined) {
                    this.locusData = [];
                    for (let i = 0; i < trackList.length; i++) {
                      for (const key in trackList[i]) {
                        this.locusData = trackList[i][key].list;
                      }
                    }
                    this.childByTrack(this.locusData);
                  }
                } else {
                  this.$notify({
                    type: "error",
                    message: "获取绑定的轨迹失败",
                    position: "bottom-right",
                    duration: 3000
                  });
                }
              });
            }, 400);
          } else {
            this.map.clearOverlays();
            this.ajaxTree();
          }
          this.getLableList();
          if (this.suspicionUuids) {
            this.suspicionUuid3D();
          }
        }
      });
    },
    //  轨迹碰手机传值
    childByTrack(val) {
      if (this.lineDdd.length) {
        // 点击时清空之前数据
        for (let i = 0; i < this.lineDdd.length; i++) {
          this.map.removeOverlay(this.lineDdd[i]);
        }
        this.lineDdd = [];
      }
      if (this.markCcc.length) {
        // 点击时清空之前数据
        for (let i = 0; i < this.markCcc.length; i++) {
          this.map.removeOverlay(this.markCcc[i]);
        }
        this.markCcc = [];
      }
      this.map.removeOverlay(this.markerOrigin); // 清除起点和终点
      // 监听鼠标拖动后离开线
      var allspot = [];
      allspot = val; // 嫌疑目标下拉
      var pt = [];
      var myIcon = new BMap.Icon(faceIco, new BMap.Size(33, 36), {});
      var choseIcon = new BMap.Icon(carIco, new BMap.Size(33, 36), {});
      // 添加marker
      for (let i = 0; i < allspot.length; i++) {
        var label = new BMap.Label(allspot[i].name, {
          offset: new BMap.Size(10, 32)
        });
        pt = new BMap.Point(allspot[i].longitude, allspot[i].latitude);
        if (allspot[i].flag) {
          // 根据标识符判断是否重合显示画线标志
          this.markerSign = new BMap.Marker(pt, {
            offset: new BMap.Size(0, -20),
            icon: myIcon
          });
        } else {
          this.markerSign = new BMap.Marker(pt, {
            offset: new BMap.Size(0, -20),
            icon: choseIcon
          });
        }
        this.markerSign.setLabel(label);
        this.markCcc.push(this.markerSign); // 存储mark数据
        this.map.addOverlay(this.markerSign); //添加mark
      }
      // 数据转换
      let ccc = q => {
        let f = 0,
          r = [];
        for (; ++f < q.length; ) r.push([q[f - 1], q[f]]);
        return r;
      };
      let newArr2 = ccc(allspot);
      let lineColor = "";
      for (let i = 0; i < newArr2.length; i++) {
        // 循环获取经纬度连线
        let arrPois = [];
        if (
          newArr2[i][0].longitude != newArr2[i][1].longitude &&
          newArr2[i][0].latitude != newArr2[i][1].latitude
        ) {
          arrPois.push(
            new BMap.Point(newArr2[i][0].longitude, newArr2[i][0].latitude)
          );
          arrPois.push(
            new BMap.Point(newArr2[i][1].longitude, newArr2[i][1].latitude)
          );
          if (newArr2[i][0].flag && newArr2[i][1].flag) {
            //根据标识符判断线段色调
            lineColor = "red";
          } else {
            lineColor = "green";
          }
          let icons = new BMap.IconSequence(
            new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
              // 设置线段宽度图标颜色
              scale: 0.6, //图标缩放大小
              strokeWeight: "2", //图标宽度
              strokeColor: "white" //图标颜色
            }),
            "1%",
            "50%",
            false
          );
          let polylineLy = new BMap.Polyline(
            arrPois, //所有的GPS坐标点
            {
              strokeColor: lineColor, // 线段颜色
              icons: [icons],
              strokeWeight: 6, //线路大小
              strokeOpacity: 0.5
            }
          );
          this.lineDdd.push(polylineLy);
          this.map.addOverlay(polylineLy);
          // map.addOverlay(marker);
        }
      }
      // 原数据过滤取经纬度
      let lonList = [];
      for (let i = 0; i < val.length; i++) {
        // 获取经纬度
        lonList.push(new BMap.Point(val[i].longitude, val[i].latitude));
      }
      let markerOriginStart = new BMap.Marker(lonList[0]); //起点marker
      let iconc = new BMap.Icon(
        "/static/images/start.png",
        new BMap.Size(40, 34),
        {
          offset: new BMap.Size(5, 5),
          imageOffset: new BMap.Size(5, 10)
        }
      ); //地点图标
      markerOriginStart.setIcon(iconc); //设置起点图标
      markerOriginStart.setTop(true);
      this.markCcc.push(markerOriginStart); // 添加起点数据
      this.map.addOverlay(markerOriginStart); //将标记添加到地图中
      this.markerOrigin = new BMap.Marker(lonList[lonList.length - 1]); //终点marker
      iconc = new BMap.Icon("/static/images/dest.png", new BMap.Size(40, 34), {
        offset: new BMap.Size(5, 5),
        imageOffset: new BMap.Size(5, 10)
      }); //终点icon
      this.markerOrigin.setIcon(iconc); //设置终点图标
      this.markerOrigin.setTop(true);
      this.markCcc.push(this.markerOrigin); // 添加终点数据
      this.map.addOverlay(this.markerOrigin); //将标记添加到地图中
      // this.map.setViewport(lonList);
      this.setZoom(allspot, this.map); // 设置当前地图层级
    },
    //进入页面查询标注列表
    getLableList() {
      let data = {
        caseUuid: this.caseUuid,
        suspicionUuid: this.suspicionUuids,
        pageNum: this.caseMarkNum,
        pageSize: 10,
        type: 1
      };
      data = this.$qs.stringify(data);
      this.$http.post("pca/casemng/list/case/mark", data).then(res => {
        if (res.data.code == 200) {
          this.SuspicionObjList = res.data.data.list;
          this.caseMarkTotal = res.data.data.totalCount;
          if (this.SuspicionObjList.length) {
            this.imgscale(".markerImg");
          } else {
            this.warningDataFlag = false;
          }
          this.getCaseMessage();
        }
      });
    },
    //查询嫌疑人特征信息
    suspicionUuid3D() {
      let data = {
        suspicionUuid: this.suspicionUuids
      };
      this.$http
        .get("/pca/casemng/suspicion/three/query", {
          params: data
        })
        .then(res => {
          if (res.data.data.length == 0) {
            this.is3DEmpty = true;
          } else {
            this.is3DEmpty = false;
          }
        });
    },

    //获取点位信息
    ajaxTree() {
      this.InitMainMap("mapContent");
      let data = {
        caseUuid: this.caseUuid
      };
      this.$http
        .get("pca/casemng/device/rel/query", {
          params: data
        })
        .then(res => {
          this.pointList = res.data.data;
          let data = [];
          let obj;
          data = this.getfoundLabelList(res.data.data);
          this.foundLabel(data, 2);
        });
    },

    //打开图片展示
    opentheimg() {
      if (this.showimgrul == "") {
        this.$notify({
          type: "warning",
          message: "暂无数据！",
          position: "bottom-right",
          duration: 3000
        });
      } else {
        if (this.listType == 6 || this.listType == 7) {
          this.lableImgList = [];
        } else {
          this.u_imgrul = "";
        }
        this.isopenimg = true;
      }
    },
    childByshowImg(val, imgurl) {
      this.isopenimg = val;
    },

    //查询视频点位的标注信息方法
    getAllImg(id) {
      let data = {
        deviceId: id,
        caseUuid: this.$route.query.caseUuid
      };
      data = this.$qs.stringify(data);
      this.$http.post("pca/point/device/mark/query", data).then(res => {
        if (res.data.code == 200) {
          this.lableImgList = res.data.data;
          if (this.lableImgList.length == 0) {
            this.showimgrul = "";
          } else {
            this.showimgrul = this.lableImgList[0].videoCaptureUrl;
          }
        }
      });
    },
    //评价
    caseEvaluate() {
      this.evaluate = this.evaluate.replace(/^ +| +$/g, "");
      if (this.evaluate == "") {
        this.$notify({
          type: "warning",
          message: "评论不能为空！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      this.$http({
        url: "pca/casemng/case/evaluation",
        method: "post",
        params: {
          caseUuid: this.caseUuid,
          content: this.evaluate
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.evaluate = "";
          this.caseEvaluateList();
        } else {
          this.$notify({
            type: "error",
            message: "请求失败，服务器异常！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    //评价列表
    caseEvaluateList() {
      this.$http({
        url: "pca/casemng/case/evaluation/list",
        method: "get",
        params: {
          caseUuid: this.caseUuid
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.evaluateList = res.data.data.list;
        }
      });
    },

    // 12.17新增判断当前标注是否转完成的接口，返回值
    // 通过点位查任务ID,通过任务查点位信息
    async getLableIsOK() {
      let result = null;
      let data = {
        caseUuid: this.$route.query.caseUuid,
        taskType: 6
      };
      data = this.$qs.stringify(data);
      await this.$http.post("vsas/task/checkTaskFinish", data).then(res => {
        result = res.data;
      });
      return result;
    },
    //底部线索框滚动条懒加载
    spaceVideoScroll() {
      let scrollLeft = document.getElementById("spaceVideo").scrollLeft; //251
      let scrollWidth = document.getElementById("spaceVideo").scrollWidth; //0-18
      let clientWidth = document.getElementById("spaceVideo").clientWidth; //233
    },
    //点击线索框横向滚动
    scrollLeftRight(type) {
      let count = 0;
      let scrollLeft = document.getElementById("spaceVideo").scrollLeft; //251
      let scrollWidth = document.getElementById("spaceVideo").scrollWidth; //0-18
      let clientWidth = document.getElementById("spaceVideo").clientWidth; //233
      if (type == "left") {
        document.getElementById("spaceVideo").scrollLeft =
          document.getElementById("spaceVideo").scrollLeft - 200;
        if (document.getElementById("spaceVideo").scrollLeft == 0) {
          this.caseMarkNum--;
          if (this.caseMarkNum <= 1) {
            this.$notify({
              type: "warning",
              message: "已经到第一页了",
              position: "bottom-right",
              duration: 3000
            });
            this.caseMarkNum = 1;
          }
          this.getLableList();
        }
      }
      if (type == "right") {
        if (this.caseMarkNum >= Math.ceil(this.caseMarkTotal / 10)) {
          if (Math.ceil(scrollLeft) >= scrollWidth - clientWidth) {
            this.$notify({
              type: "warning",
              message: "已经到最后一页了",
              position: "bottom-right",
              duration: 3000
            });
            document.getElementById("spaceVideo").scrollLeft =
              scrollWidth - clientWidth;
            return;
          }
        }
        document.getElementById("spaceVideo").scrollLeft =
          document.getElementById("spaceVideo").scrollLeft + 200;
        if (Math.ceil(scrollLeft) >= scrollWidth - clientWidth) {
          count = 1;
          count++;
          if (count == 2) {
            //this.suspicionList = []
            this.caseMarkNum++;
            if (this.caseMarkNum >= Math.ceil(this.caseMarkTotal / 10)) {
              this.$notify({
                type: "warning",
                message: "已经到最后一页了",
                position: "bottom-right",
                duration: 3000
              });
              this.caseMarkNum = Math.ceil(this.caseMarkTotal / 10);
            }
            this.getLableList();
            document.getElementById("spaceVideo").scrollLeft = 10;
          }
        }
        // document.getElementById("spaceVideo").scrollLeft = document.getElementById("spaceVideo").scrollLeft + 200;
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.cameraName.indexOf(value) !== -1;
    },
    // 点击点位切换
    handleNodeClick(data) {
      // this.suspicionUuids = ''
      this.isTrajectory = false;
      this.map.closeInfoWindow();
      // this.changeSuspicionObj(false)
      this.$store.state.mapLeftMenuFlag = false;
      setTimeout(() => {
        if (data.longitude == undefined && data.latitude == undefined) {
          if (this.trajectoryArr.length > 0) {
            for (let i = 0; i < this.trajectoryArr.length; i++) {
              let getLongitude = this.trajectoryArr[i].longitude; // 获取经度
              let getLatitude = this.trajectoryArr[i].latitude; // 获取纬度
              this.zuobiao2Pixels(getLongitude, getLatitude, i);
            }
          }
          if (this.showarrPoisArr) {
            this.loadArrPoisArr(this.mapInfoList);
          }
        } else {
          this.mapzoom = 16;
          this.maplng = data.longitude;
          this.maplat = data.latitude;
          this.map.centerAndZoom(
            new BMap.Point(this.maplng, this.maplat),
            this.mapzoom
          );
          let allOverlay = this.map.getOverlays(); // 获取当前标注的个数
          for (let i = 0; i < allOverlay.length; i++) {
            if (data.deviceUuid && data.deviceUuid == allOverlay[i].id) {
              allOverlay[i].setAnimation(BMAP_ANIMATION_BOUNCE);
              setTimeout(function() {
                allOverlay[i].setAnimation(null);
              }, 1000);
            } else if (
              data.cameraName == "案发点" &&
              data.longitude == allOverlay[i].lng
            ) {
              allOverlay[i].setAnimation(BMAP_ANIMATION_BOUNCE);
              setTimeout(function() {
                allOverlay[i].setAnimation(null);
              }, 1000);
            }
          }
          if (this.trajectoryArr.length > 0) {
            for (let i = 0; i < this.trajectoryArr.length; i++) {
              let getLongitude = this.trajectoryArr[i].longitude; // 获取经度
              let getLatitude = this.trajectoryArr[i].latitude; // 获取纬度
              this.zuobiao2Pixels(getLongitude, getLatitude, i);
            }
          }
          if (this.showarrPoisArr) {
            this.loadArrPoisArr(this.mapInfoList);
          }
        }
      }, 200);
    },
    //附件列表
    accessorydown() {
      //清空标识
      this.accessoryFlag = true;
      this.showProgreesFlag = false;
      this.suspicionUuids = "";
      this.isTrajectory = false;
      this.trajectoryArr = [];
      this.changeSuspicionObj(false);
    },
    pointChange() {
      this.isTrajectory = true;
      this.spaceVideoArrowFlag == 1
        ? (this.spaceVideoArrowFlag = 2)
        : (this.spaceVideoArrowFlag = 1);
      if (this.spaceVideoArrowFlag == 1) {
        this.pointName = "";
        const tree = this.$refs.tree; // 关闭时所有折叠状态关闭
        tree.$children.forEach(item => (item.expanded = false));
      }
    },
    //返回
    cancel() {
      this.accessoryFlag = false;
    },
    trajectoryList() {
      let data = {
        caseUuid: this.$route.query.caseUuid
      };
      this.$http
        .get("pca/casemng/suspicion/mark/allTrajectory", {
          params: data
        })
        .then(res => {
          if (res.data.code == 200) {
            for (const key in res.data.data) {
              // 数据过滤
              this.allTrackData.push(res.data.data[key]);
            }
          }
        });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.InitMainMap("mapContent");
      this.InitHideMainMap(hideMapContent);
      this.caseEvaluateList();
    });
    this.trajectoryList();
  },
  created() {
    if (this.$route.query.isTrial) {
      this.isTrial = this.$route.query.isTrial;
      this.spaceVideoShow = true;
    }
    this.myUploadTo = this.$route.query.myUploadTo;
    this.caseManage = this.$route.query.caseManage;
    this.myBrowse = this.$route.query.myBrowse;
    this.myCollect = this.$route.query.myCollect;
    this.mysynergy = this.$route.query.mysynergy;
    this.caseUuid = this.$route.query.caseUuid;
    this.isgrade = this.$route.query.isgrade;
    this.seek = this.$route.query.seek;
    this.isclick = this.$route.query.isclick;
    this.seekFlag = this.$route.query.seekFlag;
    this.mycaseVideo = this.$route.query.mycaseVideo;
    this.isCurrentUser = this.$route.query.isCurrentUser;
    this.getSuspicionMessage("clear");
  },

  computed: {
    allFlag() {
      if (
        !this.suspectFlag &&
        !this.centerSpaceVideoFlag &&
        this.spaceVideoArrowFlag == 1
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    oneKeyFlag() {
      if (this.oneKeyFlag) {
        this.suspectFlag = true;
        this.spaceVideoArrowFlag = 1;
        this.downloadVideoFlag = true;
      } else {
        this.suspectFlag = false;
        this.spaceVideoArrowFlag = 2;
        this.downloadVideoFlag = false;
      }
    },
    allFlag(newval, oldval) {
      let el = document.getElementById("mapContent");
      el.style.opacity = 1;
    },
    pointName(val) {
      this.$refs.tree.filter(val);
    },
    pointList: {
      handler(val, oldval) {
        this.pointDataList = [
          {
            cameraName: "临时点",
            children: []
          },
          {
            cameraName: "信息点",
            children: []
          },
          {
            cameraName: "案发点",
            children: []
          },
          {
            cameraName: "天网点",
            children: []
          },
          {
            cameraName: "社会面点",
            children: []
          },
          {
            cameraName: "卡口点",
            children: []
          }
        ];
        if (
          this.dataCaseInfo.latitude != undefined ||
          this.dataCaseInfo.longitude != undefined
        ) {
          let aaa = this.dataCaseInfo;
          aaa.cameraName = "案发点";
          this.pointDataList[2].children = [aaa];
        }
        if (val.length) {
          for (let i = 0; i < val.length; i++) {
            if (val[i].cameraType == 5) {
              this.pointDataList[0].children.push(val[i]);
            }
            if (val[i].cameraType == 6) {
              this.pointDataList[1].children.push(val[i]);
            }
            if (val[i].cameraType == 4) {
              this.pointDataList[4].children.push(val[i]);
            }
            if (val[i].cameraType == 1) {
              this.pointDataList[3].children.push(val[i]);
            }
            if (val[i].cameraType == 8) {
              this.pointDataList[5].children.push(val[i]);
            }
          }
        }
      },
      deep: true
    },
    spaceVideoArrowFlag(val) {
      if (val == 2) {
        this.oneKeyFlag = false;
      } else if (val == 1) {
        this.oneKeyFlag = true;
      }
    }
  }
};
</script>


<style lang="scss" scoped>
/* @import "../../../../src/assets/css/commom.css"; */
@import "../../../assets/css/commom.css";
@import "../progress.css";

input {
  width: 70%;
  height: 28px;
  border: 1px solid #e6e8ed;
  padding-left: 5px;
}

.warningType-1 {
  color: green !important;
  width: 1rem;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.warningType-2 {
  color: red !important;
  width: 1rem;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

input:focus {
  border: 1px solid #409eff;
}

.wrappers {
  position: absolute;
  width: 100%;
  top: 0.6rem;
  height: calc(100% - 0.6rem);
  box-sizing: border-box;
  overflow: hidden;
  /* background-color: #FFFFFF; */
}

.contentBody {
  box-sizing: border-box;
  border: 1px solid #29629e;
  width: 100%;
  height: calc(100% - 0.28rem);
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  margin: auto;
  overflow: hidden;
}

#sbd .stytic {
  position: absolute;
  width: 80px;
  height: 123px;
  z-index: 10;
  border: 1px solid #155eb5;
  padding: 0.05rem;
  background-color: rgba(82, 160, 229, 0.9);
}

.wrappers .stytic {
  position: absolute;
  width: 80px;
  height: 123px;
  z-index: 10;
  border: 1px solid #155eb5;
  padding: 0.05rem;
  background-color: rgba(82, 160, 229, 0.9);
}

.stytic .styticImgBox {
  width: 100%;
  height: 80px;
  border: 1px solid #155eb5;
  position: relative;
}
.oneimg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.wrappers .twoimg {
  position: absolute;
  bottom: -21px;
  left: 50%;
  transform: translateX(-50%);
}

.stytic span {
  font-size: 0.1rem;
  color: #fff;
}

.topNav {
  height: 0.54rem;
  background-color: #ffffff;
  width: 100%;
  border-bottom: 2px solid #e2e3e3;
}

.nav-item {
  display: inline-block;
  height: 0.54rem;
  width: 100px;
  line-height: 0.54rem;
  text-align: center;
  font-size: 18px;
}

.itemIcon img {
  width: 100%;
  height: 100%;
}

.footer img {
  margin-right: 0.05rem;
}

.nav-item {
  display: inline-block;
  height: 0.54rem;
  width: 140px;
  line-height: 0.54rem;
  text-align: center;
  font-size: 18px;
}

.nav-item-search {
  height: 100%;
  width: 168px;
  background: url(../../../assets/images/sysmanage/bg.png);
  color: #63abfe;
  text-align: center;
  background-size: 100% 100%;
}

.searchConditionContainer input {
  width: 62%;
  height: 28px;
  border: 1px solid #e6e8ed;
  padding-left: 5px;
  margin-left: 20px;
}

.contentTitle {
  width: 100%;
  height: 0.5rem;
  background-color: #ecf0f3;
  display: flex;
  align-items: center;
}

.contentTitleIcon {
  width: 2px;
  height: 18px;
  margin-left: 20px;
  margin-right: 10px;
  background-color: #3b9df4;
}

#mapContent {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* box-shadow: 0 0 1px; */
  border: 1px solid #3970a4;
}

.contentBody /deep/ .footer {
  bottom: 15px;
}

.spaceCondition {
  position: absolute;
  top: calc(0.5rem + 10px);
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: space-between;
}

.criminalSuspect {
  position: relative;
  width: 2rem;
  min-height: 1.6rem;
  padding-bottom: 0.1rem;
  background-color: rgba(32, 49, 67, 0.9);
}

.criminalSuspectDetial {
  position: relative;
  width: 2rem;
  min-height: 2.8rem;
  max-height: 3.8rem;
  background-color: rgba(32, 49, 67, 0.9);
  /* padding-left: 7px; */
}

.liebiao {
  height: 4.4rem;
}

.criminalSuspectDetial1 {
  margin-right: 2px;
}

.criminalSuspectDetial ul {
  border-bottom: 1px solid #32475e;
}

.criminalSuspectDetial span {
  // color: #99c9fa;
  @include font_color("font_color_3c93ec");
}

.criminalSuspectDetial /deep/ .el-button {
  width: 0.78rem;
  height: 0.24rem;
  font-size: 0.12rem !important;
  padding: 0.05rem 0.1rem;
  margin-top: 0.1rem;
  background: #203b5a !important;
  border: 1px solid #3d6e91 !important;
  margin-left: 0.13rem;
}

.criminalSuspectDetial /deep/ .el-button:nth-of-type(1) {
  top: -0.3rem;
}
.criminalSuspectDetial /deep/ .darkColor {
  background: #606266 !important;
}
.spaceScore {
  width: 80px;
  height: 28px;
  background-color: #3b9df4;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  margin-right: 15px;
  position: absolute;
  top: calc(0.5rem + 10px);
  right: 580px;
  z-index: 99;
}

.markNone {
  border: 1px solid #409eff;
}

.addCollect {
  width: 120px;
  height: 28px;
  background-color: #67c23a;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  margin-right: 15px;
  cursor: pointer;
  position: absolute;
  top: calc(0.5rem + 10px);
  right: 440px;
  z-index: 99;
}

.caseEvaluate {
  width: 1rem;
  height: 28px;
  background-color: #60bd32;
  color: #99c9fa;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border-radius: 3px; */
  /* margin-right: 15px; */
  cursor: pointer;
  background: rgba(37, 67, 100, 0.9);
  /* position: absolute;
    top: calc(0.5rem + 10px);
    right: 920px;
    z-index: 99 */
}

.downloadVideo {
  width: 1.5rem;
  height: 28px;
  background-color: #409eff;
  color: #99c9fa;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(37, 67, 100, 0.9);
  /* margin-right: 15px; */
  cursor: pointer;
  /* position: absolute;
    top: calc(0.5rem + 10px);
    right: 750px;
    z-index: 99; */
}

.videoList {
  width: 1.5rem;
  height: 200px;
  background-color: #ffffff;
  color: white;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(37, 67, 100, 0.9);
  /* margin-right: 15px; */
  cursor: pointer;
  /* position: absolute;
    top: calc(0.5rem + 38px);
    right: 750px;
    z-index: 99; */
  overflow-y: auto;
}

.downloadAccessory {
  width: 1.5rem;
  height: 28px;
  background-color: #409eff;
  color: #99c9fa;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(37, 67, 100, 0.9);
  /* margin-right: 15px; */
  cursor: pointer;
  /* position: absolute;
    top: calc(0.5rem + 10px);
    right: 580px;
    z-index: 99; */
}

.exportAccessory {
  width: 1.2rem;
  height: 28px;
  background-color: #e6a23c;
  color: #99c9fa;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(37, 67, 100, 0.9);

  padding: 3px 0;
  box-sizing: border-box;
  /* margin-right: 15px; */
  cursor: pointer;
  /* position: absolute;
    top: calc(0.5rem + 10px);

    right: 440px;
    z-index: 99; */
}

.spaceHide {
  width: 1.2rem;
  /* margin-right: 15px; */
  display: flex;
  flex-direction: column;

  /* position: absolute;
    top: calc(0.5rem + 10px);
    right: 300px; */
  /*z-index: 99;*/
}

.oneKey {
  width: 100%;
  height: 28px;
  background: rgba(37, 67, 100, 0.9);
  color: #99c9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border-radius: 3px; */
  font-size: 14px;
  cursor: pointer;
}

.centerSpaceVideo {
  width: 35%;
  height: 40%;
  position: absolute;
  top: 30%;
  left: 30%;
  z-index: 99;
  overflow: hidden;
}

.spaceVideoWrap {
  width: 60%;
  height: 1.9rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.8rem;
  margin: auto;
  z-index: 99;
  transition: 0.2s;
}

.spaceVideo {
  width: 100%;
  height: 100%;
  padding: 0.07rem;
  white-space: nowrap;
  overflow-x: auto;
  box-sizing: border-box;
  user-select: none;
  background: rgba(32, 49, 67, 0.9);
  padding-right: 0;
}

.approveWrap {
  width: 60%;
  height: 1.9rem;
  background-color: #5a5f65;
  position: absolute;
  z-index: 99;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  overflow-y: hidden;
  overflow-x: auto;
  padding: 5px;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  transition: 0.2s;
}

.spaceVideoArrow {
  width: 60%;
  height: 25px;
  position: absolute;
  z-index: 99;
  bottom: 2.4rem;
  display: flex;
  justify-content: center;
  margin-bottom: 0;
  transition: 0.2s;
}

.ONspaceVideoArrow {
  bottom: 1.9rem;
}

.OFFspaceVideoArrow {
  bottom: 0;
}

.spaceVideoArrowIcon {
  width: 100px;
  height: 100%;
  background-color: #5a5f65;
  background: rgba(32, 49, 67, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.approveLeft {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.approveResult {
  height: 40%;
  width: 100%;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #99c9fa;
}

.approveResult .el-select {
  padding: 4px;
  width: calc(90% - 60px);
  background-color: rgb(44, 45, 46);
  background: rgba(0, 0, 0, 0.5);
}

.approveResult .el-select /deep/ .el-input__inner {
  height: 0.4rem;
}

.approveSuggest {
  height: 60%;
  width: 100%;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #99c9fa;
  justify-content: flex-end;
}

.approveRight {
  width: 20%;
  height: 100%;
  /* display: flex;
  flex-direction: column; */
  position: absolute;
  right: 0;
  top: 0;
}

.approveSure {
  width: 120px;
  height: 30px;
  background-color: #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 3px;
  margin-top: 12%;
  margin-left: 10%;
  cursor: pointer;
}

.approveUp {
  width: 120px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 3px;
  margin-top: 12%;
  margin-left: 10%;
  cursor: pointer;
  position: absolute;
  top: 60px;
}

.approshow {
  z-index: 9999;
}

.videoItem {
  height: 98%;
  width: 24.13%;
  margin: 0 5px;
  position: relative;
  display: inline-block;
  cursor: pointer;
  align-items: center;
  border: 1px solid #235588;
}

.videoCloseIcon {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  color: white;
  cursor: pointer;
  background-color: black;
  font-size: 14px;
}

.centerVideoCloseIcon {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  color: white;
  cursor: pointer;
  background-color: #f56c6c;
  font-size: 16px;
  width: 25px;
  height: 20px;
  text-align: center;
}

.centerVideoCloseIcon:hover {
  background-color: red;
}
.el-tree {
  overflow: auto;
  height: 1.8rem;
  color: #99c9fa;
}
.videoList /deep/ .el-tree {
  background: #f6f6f6;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.videoList /deep/ .el-tree-node__content:hover {
  background-color: #e0eefb;
}

.videoList
  /deep/
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background-color: rgba(49, 86, 131, 0.2);
  border-left: 2px solid #58a9ff;
}

.videoList /deep/ .el-icon-caret-right:before {
  content: url(../../../assets/case/videoDownload-parent-icon.png);
}

.videoList /deep/ .el-tree-node__children .el-icon-caret-right:before {
  content: url(../../../assets/case/videoDownload-child-icon.png);
}

.videoList /deep/ .el-tree-node__children .el-tree-node__label:after {
  content: url(../../../assets/case/videoDownload-arrow-icon.png);
  margin-left: 15px;
}

*:before,
*:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.wrappers /deep/ .el-dialog__header {
  background-color: #f3f6f8;
  padding: 10px 20px 10px;
}

/* .wrappers /deep/ .el-dialog__footer {
  display: flex;
  justify-content: center;
} */

.nav-item-front {
  height: 100%;
  width: 162px;
  background: url(../../../assets/images/sysmanage/bg-02.png);
  text-align: center;
  background-size: 100% 100%;
  margin-left: -10px;
}

.nav-item-search {
  height: 100%;
  width: 154px;
  background: url(../../../assets/images/sysmanage/bg.png);
  color: #63abfe;
  text-align: center;
  background-size: 100% 100%;
  margin-left: -12px;
}

.evaluate {
  display: block;
  height: 4.3rem;
}

.evaluate_top {
  height: 3rem;
}

.evaluate_top > p,
.evaluate_btn > p {
  line-height: 0.3rem;
  color: #99c9fa;
}

.evaluate_top ul {
  height: 2.6rem;
  overflow: auto;
}

.evaluate_top ul li {
  padding: 0 0.2rem;
  font-size: 0.14rem;
  border-bottom: 1px solid rgba(84, 136, 189, 0.9);
}

.evaluate_top ul li .text {
  padding: 0.05rem 0.2rem 0.2rem 0.2rem;
  color: #99c9fa;
}

.evaluate_top ul li p {
  display: flex;
  justify-content: space-between;
  padding-top: 0.2rem;
  color: #99c9fa;
}

.evaluate_top li p span:first-child {
  color: #99c9fa;
}

.evaluate_top li p span:last-child {
  color: #99c9fa;
}

.evaluate_btn {
  margin-top: 0.1rem;
  height: 1.3rem;
}

textarea {
  padding: 0.1rem;
  width: 100%;
  height: 0.9rem;
  background: rgba(15, 30, 48, 0.7);
  border: 1px solid #1b334d;
  color: #99c9fa;
}

.el-dialog__wrapper /deep/ .el-dialog__header {
  background-color: #f3f6f8;
  font-size: 0.18rem;
}

.el-dialog__wrapper /deep/ .el-dialog__body {
  padding: 0.2rem;
}

.el-dialog__wrapper /deep/ .el-dialog {
  margin-top: 10vh !important;
}

.el-dialog__wrapper /deep/ .el-dialog__footer {
  padding: 0.2rem;
  border-top: 1px solid #12385b;
}

.compare_btn {
  height: 20px;
  background-color: #409eff;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  padding: 2px 3px;
  display: inline-block;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  margin-left: 2px;
  margin-top: 2px;
  line-height: 20px;
}

.videoItem /deep/ .el-popover div {
  display: flex;
  align-items: center;
  justify-content: center;
}

/*.handleTxt:hover {*/
/*background-color:#51e0ed*/
/*}*/
.compare_btn:hover {
  background-color: #76b9ff;
}

.accessorySave {
  width: 80px;
  height: 30px;
}

.downvideo {
  /* border: 1px solid #000; */
  height: 5rem;
}

.downvideo /deep/ .el-table th {
  background-color: #f3f6f8;
  text-align: center;
}

.downvideo /deep/ .el-table td {
  text-align: center;
  padding: 0.05rem 0;
}

.empty {
  text-align: center;
  width: 100%;
  height: 10%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  color: #999;
}

.topInfo {
  /* margin-bottom: 0.16rem; */
  border-bottom: 1px solid #1c2939;
}

/* .childname{
  color: #000;
  } */
/* .addcaseinfo{
    margin-left: -0.1rem;
    color: #409EFF;
  } */

.suspectPreson,
.propretiesOn {
  position: absolute;
  top: 0;
  /* box-shadow: 0 0 1px; */
  /* top: calc(0.5rem + 10px); */
  width: 2rem;
  font-size: 0.14rem;
  z-index: 99;
  /*z-index: 999;*/
}

.suspectPreson {
  left: 0;
  /* margin-right:2px; */
}

.propretiesOn {
  right: 1rem;
}

.suspectPreson /deep/ .el-button {
  background: rgba(32, 49, 67, 0.9);
  color: #99c9fa;
  border: none;
  border-radius: 0%;
}

.suspectPreson .suspectPresonbox {
  background: rgba(32, 49, 67, 0.5);
  color: #99c9fa;
}

.suspectPreson .suspectPresonbox .selectbox {
  width: 100%;
  background: rgba(32, 49, 67, 0.9);
}

.suspectPresonbox select {
  background: #0a1a2b;
  border: 1px solid #353a3e;
}

.propretiesOn {
  /* right: 1.8rem; */
  margin-left: 2px;
}

.suspectPreson p,
.propretiesOn p {
  padding: 0rem 0.1rem;
  text-align: center;
  font-size: 0.14rem;
  padding: 0.05rem 0;
  height: 26px;
  cursor: pointer;
  background-color: rgba(37, 67, 100, 0.9);
  border: 1px solid rgba(84, 136, 189, 0.9);
}

.suspectPreson ul {
  height: 3.6rem;
  overflow: auto;
}

.suspectPreson p i,
.propretiesOn p i {
  float: right;
  font-size: 0.2rem;
  margin-right: 0.06rem;
}

.propretiesOn div {
  overflow: auto;
}

.suspectPreson select {
  width: 92%;
  color: #99c9fa;
  margin: 0.05rem 0;
  margin-left: 4%;
  padding: 0.02rem;
}

.suspectPreson ul li,
.propretiesOn ul li {
  margin: 0.05rem 0;
  padding: 0rem 0.1rem;
  color: #99c9fa;
  word-break: break-all;
  font-size: 0.12rem;
}

.ONspaceVideo {
  bottom: 0rem;
}

.OFFspaceVideo {
  bottom: -2.4rem;
}

.point {
  position: absolute;
  bottom: 0.05rem;
  left: 5px;
  font-size: 0.14rem;
  padding: 0 0.1rem;
  border-radius: 5px;
  background-color: rgba(32, 49, 67, 0.9);
  color: #99c9fa;
}

.dingwei {
  position: absolute;
  top: 258px;
  right: 39px;
  z-index: 999;
}


#mapContent /deep/ .BMap_Marker {
  background-size: 100px 100px !important;
  z-index: 999 !important;
}

.frameVideo {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  /* background: url('../../../assets/frameVideo.png') no-repeat; */
  background-size: 100% 100%;
}

.spaceVideBut {
  width: 0.4rem;
  height: 1rem;
  position: absolute;
  top: 0.5rem;
  cursor: pointer;
  background: rgba(32, 49, 67, 0.9);
  box-sizing: border-box;
  line-height: 1rem;
  font-size: 0.3rem;
  text-align: center;
  color: white;
}

.spaceVideBut:hover {
  background: rgba(32, 49, 67, 0.9);
}

.spaceVideoArrowIcon:hover {
  background: rgba(32, 49, 67, 0.9);
}

.leftBut {
  left: -0.4rem;
  border-radius: 0.05rem 0 0 0.05rem;
}

.rightBut {
  right: -0.4rem;
  border-radius: 0 0.05rem 0.05rem 0;
}

.optionBOX {
  width: 100%;
  position: absolute;
  top: 0.14rem;
  z-index: 99;
  display: flex;
  justify-content: space-between;
}

.optionBOX .innerbox {
  width: 100%;
  border-right: 1px solid #537fa9;
  text-align: center;
}

.middlebox {
  display: flex;
  position: absolute;
  top: 0;
  left: 6rem;
  z-index: 11;
}

.judgedItem {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  height: 0.2rem;
  background-color: #409eff;
  cursor: pointer;
  color: #fff;
  padding: 2px 3px;
  border-radius: 3px;
  margin-left: 2px;
  margin-top: 2px;
  line-height: 0.2rem;
  font-size: 0.12rem;
}

.rightMenu {
  position: absolute;
  z-index: 9999;
  width: 2.3rem;
  /* background-color: #fff; */
  background-color: rgba(32, 49, 67, 0.9);
  left: 100px;
  padding: 0.1rem 0.05rem;
  /* box-shadow: inset 0 0 10px #CCC; */
  border: 1px solid #2f5077;
  font-size: 0.12rem;
}

.rightMenu .item {
  width: 100%;
  padding: 0.05rem 0.1rem;
  cursor: pointer;
  color: #99c9fa;
}

.rightMenu .imgshow {
  width: 100%;
  height: 1.5rem;
  cursor: pointer;
  border: 1px solid #23456d;
  position: relative;
}

/* .imgshow img{
    width: 100%;
    height: 100%;
  } */
.rightMenu .rightInfo p {
  padding: 0.02rem 0;
  color: #ffa41b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.markVideo {
  position: relative;
  width: 100%;
  height: 100%;
}

.markVideo .width {
  width: 100%;
}

.markVideo img,
.imgshow img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.markVideo .height {
  height: 100%;
}

.boderShow {
  position: absolute;
  z-index: 2;
}

/* 新增样式 */
#mapContent /deep/ .pointBox,
#mapContent /deep/ .pointBox a {
  display: block;
  height: 3rem;
  width: 5.5rem;
  position: relative;
  top: 0.1rem;
  background: #cccccc;
}

#mapContent /deep/ .pointBox img,
#mapContent /deep/ .pointBox video {
  height: 100%;
  width: 100%;
  cursor: pointer;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
}

.videoItem .playItem {
  position: absolute;
  width: 0.25rem;
  height: 0.25rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("../../../assets/images/videoNewImg/commhand/play_button.png")
    no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  z-index: 3;
  display: none;
}

.videoItem:hover .none {
  display: block;
}

.judgedItems {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  height: 0.2rem;
  background-color: rgb(63, 204, 63);
  cursor: pointer;
  color: #fff;
  padding: 2px 3px;
  border-radius: 3px;
  margin-left: 2px;
  margin-top: 2px;
  line-height: 0.2rem;
  font-size: 0.12rem;
}

.judgedItemsw {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  height: 0.2rem;
  background-color: #808080;
  cursor: pointer;
  color: #fff;
  padding: 2px 3px;
  border-radius: 3px;
  margin-left: 2px;
  margin-top: 2px;
  line-height: 0.2rem;
  font-size: 0.12rem;
}

#mapContent /deep/ .BMap_bubble_title {
  line-height: 0.18rem !important;
  color: #1163ad !important;
}

.pointType {
  position: absolute;
  top: 4.7rem;
  left: 0;
  width: 2rem;
  font-size: 0.14rem;
  z-index: 99;
}

.pointType p {
  padding: 0rem 0.1rem;
  text-align: center;
  font-size: 0.14rem;
  padding: 0.05rem 0;
  cursor: pointer;
  background-color: rgba(37, 67, 100, 0.9);
  border: 1px solid rgba(84, 136, 189, 0.9);
  color: #99c9fa;
  width: 2rem;
}

.pointType .suspectPresonbox {
  background: rgba(32, 49, 67, 0.5);
  color: #99c9fa;
}

.pointType p i {
  float: right;
  font-size: 0.2rem;
  margin-right: 0.06rem;
}

.pointType select {
  width: 92%;
  color: #99c9fa;
  margin: 0.05rem 0;
  margin-left: 4%;
  padding: 0.02rem;
  line-height: 0.2rem;
}

.pointTypefold {
  position: absolute;
  top: 0.4rem;
  width: 2rem;
  font-size: 0.14rem;
  z-index: 99;
}

.pointNar {
  width: 1.5rem;
  margin-left: 0.25rem;
  margin-top: 0.05rem;
}
.block-margin-bottom {
  margin-bottom: 5px;
}
.progress-item-title-warn:after {
  background-color: red;
}
.oneimg2 {
  max-width: 100%;
  max-height: 100%;
}
</style>
