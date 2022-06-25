<template>
  <div class="caseinfo">
    <div class="rightMenu" v-show="$store.state.mapLeftMenuFlag" id="MapLeftMenu">
      <!-- 1 天网  4 社会点  5 临时点 -->
      <div class="imgshow" @click="opentheimg" v-show="listType != 8">
        <img
          :src="showimgrul == null ? $store.state.defaultImg : showimgrul "
          class="showlabeImg"
          @load="imgscale('.showlabeImg')"
          alt
          :onerror="$store.state.defaultImg"
        >
      </div>
      <div class="item rightInfo">
        <p class="pointDefaule">点位信息</p>
        <p>
          <span
            v-if="listType != 6 && listType != 7 && listType != 8"
          >(比北京时间{{offset | secondHands}}秒)</span>
        </p>
        <p v-if="listType != 7" :title="listName">
          <span>名称</span>
          ：{{listName}}
        </p>
        <p v-if="listType == 7">
          <span>名称</span>：案发点
        </p>
        <p>经纬度：{{listlng +' - '+ listlat}}</p>
        <p v-if="listType != 7">
          <span>类型</span>
          ：{{listType | typetopt}}
        </p>
      </div>
      <ul>
        <li
          v-if="listType != 6 && listType != 7 && listType != 1 && listType != 8"
          class="item"
          @click="showDataCell = true;"
        >
          <span class="Menuleft offlineUpload"></span> 视频管理
        </li>
        <li
          v-if="listType == 5 || listType == 4 || listType == 10"
          class="item"
          @click="openOffline"
        >
          <span class="Menuright videoPlay"></span>视频播放
        </li>
        <li v-if="listType == 1" class="item" @click="openSkyNet">
          <span class="Menuleft skynetPlay"></span>视频播放
        </li>
        <li
          v-if="listType != 6 && listType != 7 && listType != 1  && listType != 8"
          class="item"
          @click="isvideoval = true;isonline=false"
        >
          <span class="Menuleft skynetRetrivel"></span>视频检索
        </li>
        <li v-if="listType == 1" class="item" @click="isvideoval = true;isonline=true">
          <span class="Menuright videoRetrivel"></span>视频检索
        </li>
        <li
          class="item"
          v-if="listType != 7 && listType != 6 && listType != 1 && listType != 8"
          @click="openlist(0)"
        >
          <span class="Menuright videoList"></span>检索结果
        </li>
        <li class="item" v-if="listType == 1" @click="openlist(0)">
          <span class="Menuleft videoListAl"></span>检索结果
        </li>
        <li
          v-if="(listType == 4 || listType == 5 || listType == 10) && (showVideoStruct == 'true' || zkyStructureSwitch == 'true')"
          class="item"
          @click="videoNum = true "
        >
          <span class="Menuleft videoStruct"></span>
          <span>视频结构化</span>
        </li>
        <li
          v-if="listType == 1 && (showVideoStruct == 'true' || zkyStructureSwitch == 'true')"
          class="item"
          @click="skynetNum =true"
        >
          <span class="Menuright videoStructOut"></span>
          <span>视频结构化</span>
        </li>
        <li
          class="item"
          v-if="listType != 7 && listType != 6 && listType != 8 && (showVideoStruct == 'true' || zkyStructureSwitch == 'true')"
          @click="openlist(1)"
        >
          <span class="Menuright videoStructResult" :class="{videoResult:listType == 1}"></span>
          <span>结构化结果</span>
        </li>
        <li v-if="listType == 1 || listType == 4" class="item" @click="equipmentComparse">
          <span class="Menuleft equipmentTime" :class="{equipmentHour:listType == 1}"></span>设备校时
        </li>

        <li v-if="listType == 5 || listType == 10" class="item" @click="opentemporary">
          <span class="Menuleft solidyTemporary"></span>固化临时点
        </li>
        <li v-if="listType == 6 || listType == 7" class="item" @click="isfileupload = true">
          <span class="Menuleft uploadInformation"></span>上传信息
        </li>
        <li v-if="listType == 8" class="item" @click="openUploadbayonet">
          <span class="Menuleft uploadInformation"></span>上传卡口数据
        </li>
        <li
          v-if="listType == 5 || listType == 6 || listType == 8 || listType == 10"
          class="item"
          @click="movePt"
        >
          <span :class="{moveSpeck:listType == 5}" class="Menuright runTemporary"></span>
          移动{{listType | pointName}}
        </li>
        <li
          v-if="listType == 5 || listType == 6 || listType == 10 || listType == 8"
          class="item"
          @click="openupdate(listType)"
        >
          <span :class="{editSpeck:listType == 5}" class="Menuleft editTemporary"></span>
          编辑{{listType | pointName}}
        </li>
        <li
          v-if="listType == 5 || listType == 6 || listType == 10 || listType == 8"
          class="item"
          @click="deleteInfo(pTinfo)"
        >
          <span :class="{deleteSpeck:listType == 6}" class="Menuright deleteTemporary"></span>
          删除{{listType | pointName}}
        </li>
        <li v-if="listType == 7" class="item" @click="moveCase(pTinfo)">
          <span class="Menuright moveTemporary"></span>移动案发点
        </li>
        <li v-if="listType == 7" class="item" @click="updateCase">
          <span class="Menuleft editPoint"></span>
          <span>编辑案发点</span>
        </li>
        <li v-if="listType == 7" class="item" @click="deleteCase">
          <span class="Menuright deletePoint"></span>删除案发点
        </li>
      </ul>
    </div>

    <div
      style="position: absolute; width: 100%; height: 100%; overflow: auto; top: 50px;left: 0; z-index: -1"
      id="sbd"
    >
      <div id="hideMapContent" style="width: 100%; height: 100%"></div>
    </div>
    <!-- 标注碰撞开始 -->
    <el-dialog
      title="标注碰撞"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @open="checklable = '0'"
      :visible.sync="openlable"
      width="30%"
    >
      <span>
        <el-radio v-model="checklable" label="0">标注池</el-radio>
        <el-radio v-model="checklable" label="2">所有标注</el-radio>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" class="cancleBtn" @click="openlable = false">取 消</el-button>
        <el-button
          type="primary passBtn"
          v-no-more-click
          class="passBtn"
          @click="openlableDemo()"
        >确 定</el-button>
      </span>
    </el-dialog>

    <lable-collide
      :openlablecollide="openlablecollide"
      :checklabledemo="checklable"
      :labelcollidedeviceList="labelcollidedeviceList"
      @childbylablecolli="childbylablecolli"
    ></lable-collide>

    <!-- 全局搜索结构化目标页面 -->
    <globalSearch
      :showAllTarget="showAllTarget"
      @childbyglobalSearch="childbyglobalSearch"
      @childbyopenSearchImg="childbyopenSearchImg"
      v-show="showVideoStruct == 'true'"
    ></globalSearch>

    <!-- 全局搜索结构化目标页面zky -->
    <globalSearchZky
      :showAllTargetZky="showAllTargetZky"
      @childbyglobalSearchzky="childbyglobalSearchzky"
      @childbyopenSearchImg="childbyopenSearchImg"
      v-show="zkyStructureSwitch == 'true'"
    ></globalSearchZky>
    <!-- 标注页面 -->
    <!-- <handword :showhandword="showhandword"  :isonline="false"  @childbyHandwork="childbyHandwork"></handword> -->
    <!-- 检索结果 -->
    <!-- <detailRetervals :isOpenDetail="isOpenDetail" :proptaskUuid ="taskUuid" @childByDetail="childByDetail"></detailRetervals> -->
    <odetailRetervals
      :isOpenDetail="isOpenDetail"
      :proptaskUuid="taskUuid"
      @childByDetail="childByDetail"
    ></odetailRetervals>

    <!-- 结构化结果 -->
    <videoStrus :isopenStrus="isopenStrus" :proptaskUuid="taskUuid" @childByStrus="childByStrus"></videoStrus>
    <!-- 串案审批 -->
    <megerCase :openmegerCase="openmegerCase" @childbymeger="childbymeger"></megerCase>
    <!-- 离线视频列表 -->
    <dataCell
      :showDataCell="showDataCell"
      :deviceUuid="deviceUuid"
      @childByDataCell="childByDataCell"
    ></dataCell>
    <!-- 附件上传 -->
    <accessUpload
      :openaccess="openaccess"
      @childByaccess="childByaccess"
      @isUploadSuccess="isUploadSuccess"
    ></accessUpload>
    <!-- 发起协同 -->
    <syncase :issyncase="issyncase" @childbysyn="childbysyn"></syncase>
    <!-- 打开编辑案件 -->
    <caseInfos
      :isCaseInfos="isCaseInfos"
      :hotspotId="hotspotId"
      :dataCaseInfo="dataCaseInfo"
      @childbycaseInfo="childbycaseInfo"
      @childbycaseOnright="childbycaseOnright"
    ></caseInfos>
    <!-- 打开嫌疑目标管理 -->
    <targetSus
      :istargetsus="istargetsus"
      :pointlist="pointInfoList"
      :dataCaseInfo="dataCaseInfo"
      @childsearchImgBtn="childsearchImgBtn"
      @childyTargetSus="childyTargetSus"
    ></targetSus>
    <!-- <targetSus :istargetsus="istargetsus" @childsearchImgBtn="childsearchImgBtn"  @childyTargetSus="childyTargetSus" @trajectoryUuid="trajectoryUuid"></targetSus> -->
    <!-- 打开天网 -->
    <skyNet :isskyNet="isskyNet" :pTinfo="pTinfo" @childBySkynet="childBySkynet"></skyNet>
    <!-- 展示图片 -->
    <openshowImg
      :isopenimg="isopenimg"
      :isdelete="false"
      :lableImgList="lableImgList"
      :u_imgrul="u_imgrul"
      @childByshowImg="childByshowImg"
    ></openshowImg>
    <!-- 文件上传 -->
    <uploadImg
      :isfileupload="isfileupload"
      :hotspotId="hotspotId"
      :pTinfo="pTinfo"
      :u_imgrul="u_imgrul"
      :u_id="u_id"
      @childbyfile="childbyfile"
    ></uploadImg>
    <!-- 固化和编辑功能 -->
    <solidifyName :istemporary="istemporary" :pTinfo="pTinfo" @childBytemps="childBytemps"></solidifyName>
    <!-- 离线视频播放 -->
    <offlineVideo
      :isofflineVideo="isofflineVideo"
      :deviceid="deviceUuid"
      @childByOffline="childByOffline"
    ></offlineVideo>
    <!-- 新增图片线索 -->
    <!-- <imglable :isImg="isImgclue" :deviceid="deviceUuid" @childByimg="childByimg"></imglable> -->
    <!-- 视频检索 -->
    <videoval
      :istrue="isvideoval"
      :isonline="isonline"
      :deviceids="deviceUuid"
      :lablemarkList="lableImgList"
      @childByValue="childByValue"
    ></videoval>
    <!-- <videoval :istrue="isvideoval" :deviceids="deviceUuid" @childByValue="childByValue"></videoval> -->
    <!-- 任务列表指挥员 -->
    <taskManage :istask="isTask" :dataCaseInfo="dataCaseInfo" @childBytask="childBytask"></taskManage>
    <!-- 任务列表侦查员 -->
    <personManage
      :isPersonMan="isPersonMan"
      :dataCaseInfo="dataCaseInfo"
      @childByOpen="childByOpen"
    ></personManage>
    <!-- 检索任务详情列表 -->
    <taskMan
      :showTaskMan="isretriev"
      :caseUuid="$route.query.caseUuid"
      :pointInfoList="pointInfoList"
      :deviceid="deviceUuid"
      :dataCaseInfo="dataCaseInfo"
      @taskretrieval="taskretrieval"
      @taskmanstrus="taskmanstrus"
      @childByTaskMan="childByTaskMan"
    ></taskMan>
    <!-- 采集列表 -->
    <gatherList :isgather="isgather" :deviceid1="deviceUuid" @childBygather="childBygather"></gatherList>
    <!-- 研判结果 -->
    <JudgeResult :showJudege="showJudege" @childbyJud="childbyJud"></JudgeResult>
    <!-- 案件比对 -->
    <!-- <caseContrast :isaaa="isaaa" :caseUuid="$route.query.caseUuid" @incre="childByCaseContrast"></caseContrast> -->
    <!-- 临时点视频结构化 -->
    <videoStructure :videoNum="videoNum" :deviceids="deviceUuid" @childvideo="childvideo"></videoStructure>
    <!-- 天网视频结构化 -->
    <skynetVideo :skynetNum="skynetNum" :pTinfo="pTinfo" @childskynet="childskynet"></skynetVideo>
    <!-- 轨迹列表功能 -->
    <searchTrack :showSearchTrack="showSearchTrack" :pointList="pointList" @saveTrack="saveTrack"></searchTrack>
    <!-- 碰撞手机轨迹 -->
    <phoneTrack
      :showPhoneTrack="showPhoneTrack"
      :electricData="electricData"
      :picTrackDate="picTrackDate"
      @childByTrack="childByTrack"
      ref="childCountList"
      @emitPhoneTrack="emitPhoneTrack"
      @resetTrack="resetTrack"
    ></phoneTrack>



    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link
        v-if="!showcase && !showTwocase && !specialCase && !mycase"
        class="sysname"
        :to="{path:'/casestudy',query:{menuCode:200}}"
      >案件库 ></router-link>
      <router-link
        v-if="showcase || showTwocase || specialCase || mycase"
        class="sysname"
        :to="{path:'/videoCombat',query:{menuCode:100}}"
      >视频侦查 ></router-link>
      <router-link
        v-if="mycase"
        class="sysname"
        :to="{path:'/videoCombat/caseInfomanage',query:{ismyupload:true,synergy: '-1',menuCode:120}}"
      >&nbsp;我的案事件 ></router-link>
      <p v-if="specialCase" class="sysname">&nbsp;专案侦查</p>
      <p v-if="myUploadTo" class="sysname">&nbsp;我的案事件</p>
      <!-- <p v-if="mycase" class="sysname">&nbsp;我的案事件</p> -->
      <p v-if="mycase && editmycase" class="sysname">&nbsp;案件编辑</p>
      <p v-if="mycase && addmycase" class="sysname">&nbsp;案件新增</p>
    </div>

    <div class="main" id="main">
      <div class="tarckTovideo" v-if="showtrack">
        <video
          muted
          disablePictureInPicture
          autoplay="autoplay"
          controls="controls"
          id="tarckVideo"
        ></video>
      </div>
      <!--  -->
      <!-- 以图搜图页面功能 -->
      <searchImg
        ref="searchImg"
        id="searchImg"
        :isshowTargetImg="isshowTargetImg"
        :showSearchImg="showSearchImg"
        :gosearchtype="gosearchtype"
        :rangeList="rangeList"
        :runSearchList="runSearchList"
        @childByClick="childByClick"
        @childbycolse="childbycolse"
        @resetCount="resetCount"
        @childBySearch="childBySearch"
        @isShowTrajectoryArr="isShowTrajectoryArr"
        @isPhoneTrack="isPhoneTrack"
      ></searchImg>
      <!-- 以车搜车 -->
      <searchcarImg
        ref="searchImgs"
        id="searchImgs"
        :showSearchCarImg="showSearchCarImg"
        :gosearchtype="gosearchtype"
        :rangeList="rangeList"
        :fast="fast"
        @childbycolses="childbycolses"
        @closeSearchCarImg="closeSearchCarImg"
        @childBySearch="childBySearch"
      ></searchcarImg>

      <!-- <p v-if="specialCase" class="maintile">
          <span>1.</span>&nbsp;&nbsp;专案侦查
        </p>
        <p v-if="mycase" class="maintile">
          <span>1.</span>&nbsp;&nbsp;我的案事件
      </p>-->
      <div
        v-if="showarrPoisArr"
        v-for="(item,index) in mapInfoList"
        class="stytic"
        :key="index"
        :id="'strickPic'+index"
      >
        <div
          class="playItem strick-playvideo"
          @click.stop="playCVideo(item, item)"
          v-show="item.type == 'img'"
        ></div>
        <div class="styticImgBox">
          <i title="下一张" @click="addimg(item)" class="el-icon-arrow-right"></i>
          <i title="上一张" @click="removeimg(item)" class="el-icon-arrow-left"></i>
          <img
            style="object-fit:contain"
            class="oneimg oneimg1 aaa"
            v-show="isimg && !item.regionHeight"
            :src="item.traceImgUrl == undefined ? item.sourceImgUrl : item.traceImgUrl"
            alt
          >
          <img
            class="carsimg"
            :id="'carsImg'+index"
            v-show="isimg && item.regionHeight"
            :src="item.sourceImgUrl"
            alt
          >
        </div>
        <img class="twoimg" src="../../assets/images/caseStydy/arrows.png" alt>
        <span>{{item | getDatetime}}</span>
        <el-button
          icon="el-icon-close"
          type="danger"
          class="delBtn removebtn"
          v-show="showdeleteLine"
          v-no-more-click
          title="移除轨迹点"
          @click="deleteLine(item,index)"
        ></el-button>
      </div>

      <!-- 嫌疑目标轨迹图片 -->
      <div
        v-show="isTrajectory && !isVideo"
        v-for="(item,index) in trajectoryArr"
        :class="[suschangeradio == 1 ? 'stytic1' : suschangeradio == 4 ? 'stytic3' : 'stytic2']"
        :key="'trajectoryPic'+index"
        :id="'trajectoryPic'+index"
      >
        <span class="otherradiao" :title="item.num" v-if="suschangeradio == 2">{{item.num | substr}}</span>
        <span class="otherradiao" v-show="suschangeradio == 3">{{item.count}}</span>
        <span
          class="otherradiao"
          v-show="suschangeradio == 4"
        >{{item.mintime | nowTimes}}{{item.maxtime == '' ? '' : '，'}}{{item.maxtime == '' ? '' : item.maxtime | nowTimes}}</span>
        <div v-show="suschangeradio == 1" class="styticImgBox1">
          <img class="oneimg oneimg2" :src="item.videoCaptureUrl" alt style="object-fit:contain">
        </div>
        <img
          v-show="suschangeradio == 1"
          class="twoimg"
          src="../../assets/images/caseStydy/arrows.png"
          alt
        >
        <span v-show="suschangeradio == 1">
          {{getTrajectory(item.videoStartTime || item.absoluteTime, Number(item.relativeTime),
          Number(item.offset))}}
        </span>
      </div>
      <div class="mainmap" id="mainmap">
        <div id="mapContent" v-if="showmap" @mouseleave="mouseFlag && leave()"></div>
        <div class="playBody" v-show="isshowvideoflv">
          <div class="closeVideo" v-show="isshowVideo">
            <div class="block">
              <img @click="exit" src="../../assets/images/videoNewImg/commhand/delete.png" alt>
              <video
                class="playerVideo"
                controlslist="nodownload"
                loop
                autoplay
                disablePictureInPicture
                :src="playerVide"
                controls
                crossorigin="*"
              ></video>
            </div>
          </div>
        </div>
        <!--  -->
        <div class="point">
          <span>经度：{{point.lng}}</span>
          <br>
          <span>纬度：{{point.lat}}</span>
        </div>
        <img class="dingwei" src="../../assets/case/quickPos.png" title="刷新" @click="initAll();">
        <div class="suspectPreson">
          <p
            @click.stop="spaceVideoArrowFlag == 1 ? spaceVideoArrowFlag = 2 : spaceVideoArrowFlag = 1;skynetFlag = null;closeSearchImg();closeSearchCarImg();isRightClick = false;showSearchImg = false;showPhoneTrack = false"
          >
            嫌疑目标
            <i v-show="spaceVideoArrowFlag == 1" class="el-icon-caret-top"></i>
            <i
              v-show="spaceVideoArrowFlag == 2 || skynetFlag == 2 || skynetFlag == 1"
              class="el-icon-caret-bottom"
            ></i>
          </p>
          <div v-if="spaceVideoArrowFlag == 1" class="suspectPresonbox">
            <div class="selectbox">
              <select v-model="suspicionUuids" @change="changeSuspicionObj(suspicionUuids,true)">
                <option value>全部</option>
                <option
                  v-for="(item,index) in suspicionList"
                  :value="item.suspicionUuid"
                  :key="index"
                  :label="item.suspicionName + changeSuspicionType(item.suspicionType)"
                ></option>
              </select>
              <el-radio-group
                v-show="suspicionUuids"
                @change="changeTrack"
                v-model="suschangeradio"
              >
                <el-radio :label="1">轨迹分析</el-radio>
                <el-radio :label="2">空间分析</el-radio>
                <el-radio :label="3">频次分析</el-radio>
                <el-radio :label="4">时间分析</el-radio>
              </el-radio-group>
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
                    >{{ v.rightFlag }}</div>
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
              <div
                v-show="warningDataFlag && !showProgreesFlag"
                style="padding-left: 14px;height: 2.8rem;overflow: auto;"
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

              <!-- 轨迹进度结束 -->
              <div class="empty" v-show="!caseMessageObj.length == 0">暂无数据</div>
              <el-button
                class="Dwatch"
                @click="Dialog3D = true"
                :disabled="is3DEmpty"
                :title="is3DEmpty ? '目标没有特征' : '查看目标特征'"
                v-show="suspicionUuids"
              >查看特征</el-button>
              <el-button
                class="Dwatch"
                v-show="showsyn && suspicionUuids"
                @click="show3D(suspicionType)"
                :disabled="is3DEmpty"
                :title="is3DEmpty? '目标没有特征' : '目标特征比对'"
              >特征比对</el-button>
              <el-button
                class="Dwatch"
                @click="editPolylineHandler(defaultText)"
                :disabled="!polylineObj || opentrackpoly"
                v-show="suspicionUuids && suschangeradio == 1"
              >{{ defaultText }}</el-button>
              <el-button
                class="Dwatch"
                @click="savePolylineHandler"
                :disabled="!polylineObj || opentrackpoly"
                v-show="suspicionUuids && suschangeradio == 1"
              >轨迹保存</el-button>
              <el-button
                class="Dwatch"
                :disabled="opentrackpoly"
                v-show="suspicionUuids"
                @click="trackpolyNavigation();"
              >轨迹导航</el-button>
              <div class="searchtime suspectTrack" v-show="suspicionUuids">
                <span>电围感应距离：</span>
                <el-input
                  v-model="range"
                  :disabled="!polylineObj"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  maxlength="5"
                ></el-input>米
                <el-button
                  class="Dwatch darkColor"
                  v-no-more-click
                  v-show="!polylineObj"
                  :disabled="!polylineObj || suschangeradio != 1 || opentrackpoly"
                  @click="targetTrack(true)"
                >碰撞手机轨迹</el-button>
                <el-button
                  class="Dwatch"
                  v-no-more-click
                  :disabled="suschangeradio != 1 || opentrackpoly"
                  v-show="polylineObj"
                  @click="targetTrack(true)"
                >碰撞手机轨迹</el-button>
              </div>
            </div>
          </div>
        </div>
        <!-- 点位展示 -->
        <div class="pointType" :class="spaceVideoArrowFlag == 2 ? 'pointTypefold' : 'pointType'">
          <p
            @click="spaceVideoArrowFlag == 1 ? spaceVideoArrowFlag = 2 : spaceVideoArrowFlag = 1;skynetFlag = null;closeSearchImg();closeSearchCarImg();isRightClick = false;showSearchImg = false;showPhoneTrack = false"
          >点位
            <!-- <i v-show="spacePointArrowFlag == 1" class="el-icon-caret-top"></i> -->
            <i v-show="spaceVideoArrowFlag == 1" class="el-icon-caret-top"></i>
            <!-- <i v-show="spacePointArrowFlag == 2 || skynetFlag == 2 || skynetFlag == 1" class="el-icon-caret-bottom"></i>-->
            <i
              v-show="spaceVideoArrowFlag == 2 || skynetFlag == 2 || skynetFlag == 1"
              class="el-icon-caret-bottom"
            ></i>
          </p>
          <div v-show="spaceVideoArrowFlag == 1" class="suspectPresonbox">
            <div class="criminalSuspectDetial">
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
        <ul class="caserelece">
          <li v-show="showsyn">
            <div class="innerbox">案件属性
              <ul class="relece">
                <li @click="editCase();checkSearchLable()">编辑案件</li>
                <li @click="castToSynergy();checkSearchLable()">转为协同</li>
                <!-- 10月14新增 -->
                <li @click="exportCase(1)">导出卷宗</li>
                <!-- 10月14新增 -->
                <li class="submitBtn">
                  <el-button
                    :disabled="disableTocase"
                    :title="disableTocase ? '正在审批' : ''"
                    @click="getSubmitTocase"
                    v-show="showclomn == 1 && showLibraryFlag != 0 && dataCaseInfo.creator == $storage.getSession('userInfo').userId"
                  >提交审批</el-button>
                </li>
                <!-- 10月14新增 -->
              </ul>
            </div>
          </li>
          <li v-show="dataCaseInfo.isSpecial ==  1">
            <div class="innerbox">协同侦查
              <ul class="relece">
                <li v-show="showsyn" @click="opensynergy();checkSearchLable()">团队管理</li>
                <!-- 10月14修改 -->
                <li @click="OpentaskMan();checkSearchLable()">任务分配</li>
                <li @click="showJudege = true;checkSearchLable()">研判结果</li>
                <!-- 10月14新增 -->
              </ul>
            </div>
          </li>
          <li>
            <div class="innerbox">案件关联
              <ul class="relece">
                <li
                  @click="DialogVisible1 = true;skynetFlag = null;spaceVideoArrowFlag = 1;showSearchImg = false;map.clearOverlays();checkSearchLable()"
                >设备关联</li>
                <li
                  @click="excelVisibleDialog = true;isRightClick = false;skynetFlag = null;showSearchImg = false;map.clearOverlays();checkSearchLable();"
                >手机数据导入</li>
              </ul>
            </div>
          </li>
          <li v-show="showVideoStruct == 'true' || zkyStructureSwitch == 'true'">案件分析
            <ul class="relece">
              <li @click="checkSearchLable();searchAll()">全局搜索</li>
              <li @click="openSeekImg">以图搜图</li>
              <li @click="openSeekCarImg">以车搜车</li>
              <li @click="showSearchTrack = true;skynetFlag = null;checkSearchLable()">轨迹列表</li>
              <li @click="imeiVisibleDialog = true;skynetFlag = null;checkSearchLable()">基站数据展示</li>
              <li @click="checkCaseHaveLable();skynetFlag = null;checkSearchLable()">标注碰撞</li>
              <li @click="openGlobalCase" v-show="true">全局案件</li>
              <li @click="openGlobalRetrieve" v-show="true">全局检索</li>
            </ul>
          </li>
          <li>
            <div class="innerbox">嫌疑目标
              <ul class="relece">
                <!-- <li @click="openSutarget()">新增目标</li> -->
                <!-- <li @click="DialogVisible4=true">目标管理</li> -->
                <li @click="centerTag">嫌疑目标管理</li>
              </ul>
            </div>
          </li>
          <li>
            <div class="innerbox">附件
              <ul class="relece">
                <!-- <li @click="DialogVisible7=true">上传附件</li> -->
                <li @click="openaccess=true;skynetFlag = null;checkSearchLable()">上传附件</li>
                <li @click="DialogVisible8=true;skynetFlag = null;checkSearchLable();">附件列表</li>
                <li @click="ccccc()">查看半径</li>
              </ul>
            </div>
          </li>
          <li>
            <div class="innerbox" @click="openretriev();checkSearchLable()">任务管理</div>
          </li>
          <li v-show="showsyn">
            <div class="innerbox">串案筛选
              <ul class="relece">
                <!-- <li @click="opCaseContrast1">案件比对1</li> -->
                <li
                  @click="opCaseContrast();skynetFlag = null;$store.state.targetProperty = false; $store.state.caseTarget = false;$store.state.suspicionUuid = '';checkSearchLable()"
                >案件比对</li>
                <!-- <li @click="opCaseContrast">比对播放</li> -->
                <li @click="openmeger();skynetFlag = null;checkSearchLable()">串案保存</li>
              </ul>
            </div>
          </li>
          <!-- <li v-show="dataCaseInfo.isSpecial ==  1" @click="showJudege = true;isTrajectory = false;closeSearchImg();">研判结果</li> -->
        </ul>
        <!-- 朋友圈开始 -->
        <div class="friendsOn">
          <p
            v-show="dataCaseInfo.isSpecial ==  1"
            @click="spaceVideoArrowFlag == 1 ? spaceVideoArrowFlag = 2 : spaceVideoArrowFlag = 1;hitsCut();skynetFlag = null;closeSearchImg();closeSearchCarImg();isRightClick = false;showSearchImg = false;showPhoneTrack = false"
          >
            案情交流
            <i v-show="spaceVideoArrowFlag == 1" class="el-icon-caret-top friendUp"></i>
            <i
              v-show="spaceVideoArrowFlag == 2 || skynetFlag == 2 || skynetFlag == 1"
              class="el-icon-caret-bottom friendDown"
            ></i>
          </p>
          <div
            v-if="spaceVideoArrowFlag == 1 && dataCaseInfo.isSpecial == 1"
            class="fridendSuspectDetial"
          >
            <div class="listWrap" id="WrapOpen">
              <textarea
                :disabled="isWrapContent"
                style="resize:none;background-color: rgba(0,0,0,.2)!important;"
                placeholder="请输入发布内容"
                maxlength="200"
                v-model.trim="aculceCount"
              ></textarea>
              <div class="headBtn">
                <el-button
                  @click="editContent"
                  type="primary"
                  :title="isEditAnnounce ? '只有指挥员才能编辑' : ''"
                  :disabled="isEditAnnounce"
                >编辑</el-button>
                <el-button
                  type="success"
                  :title="isAnnounce ? '只有指挥员才能发布' : ''"
                  class="el-icon-circle-check-outline topBtn"
                  :disabled="isAnnounce"
                  @click="issueCount(1)"
                >发布</el-button>
              </div>
              <ul id="replyContentId" class="replyContentList">
                <li class="item" v-for="(item,index1) in communicationList" :key="'nine' + index1">
                  <span :id="'ccc' + index1" class="name">
                    <em class="issuer">{{item.msgUser}}：</em>
                    <span :title="item.msgInfo">{{item.msgInfo}}</span>
                  </span>
                  <div class="firstPicter">
                    <div class="fileList">
                      <div
                        class="listBox"
                        v-for="(item,index) in item.imgUrls"
                        :key="'eight' + index"
                      >
                        <a target="_blank" :href="item">
                          <img :src="item">
                        </a>
                      </div>
                      <div
                        class="listBox"
                        v-for="(item,indexs) in item.videoUrls"
                        :key="'seven' + indexs"
                      >
                        <!-- <a target="_blank">
                            <video controls :src="item"></video>
                        </a>-->
                        <b @click="playsFlvVideo(item)" class="playItem none"></b>
                        <!-- <img class="imgwidth" :src="item" @click="playsFlvVideo(item)"> -->
                        <video :src="item" autoplay></video>
                      </div>
                    </div>
                  </div>
                  <span class="time">{{item.updateTime}}</span>
                  <span
                    class="replyIcop"
                    title="回复"
                    @click.stop="getreplylist(item.msgUser,item.msgUuid,item.caseUuid,1);commentFlag == 1 ? commentFlag = 2 : commentFlag = 1"
                  >
                    <i class="el-icon-chat-dot-square"></i>
                  </span>
                  <div style="clear:both"></div>
                  <div class="replyBox">
                    <!-- 回复区开始 -->
                    <div class="replypeople">
                      <ul>
                        <li
                          class="replyConent"
                          v-for="(aaa,index4) in item.childMsgs"
                          :key="'one' + index4"
                        >
                          <span
                            class="replyIcop_childer"
                            title="回复"
                            @click="replyIcop_second(aaa.msgUser,aaa.msgUuid,aaa.caseUuid,2);commentFlag == 1 ? commentFlag = 2 : commentFlag = 1"
                          >
                            <i class="el-icon-chat-dot-square"></i>
                          </span>
                          <em>{{aaa.msgUser}}</em>
                          <b style="color:skyblue">回复</b>
                          <em>{{item.msgUser}}：</em>
                          <span class="conter" :title="aaa.msgInfo">{{aaa.msgInfo}}</span>

                          <div class="fileList">
                            <div
                              class="listBox position"
                              v-for="(kkkk,index3) in aaa.imgUrls"
                              :key="'five' + index3"
                            >
                              <a target="_blank" :href="kkkk">
                                <img :src="kkkk">
                              </a>
                            </div>
                            <div
                              class="listBox position"
                              v-for="(item,index6) in aaa.videoUrls"
                              :key="'six' + index6"
                            >
                              <b @click="playsFlvVideo(item)" class="playItem none"></b>
                              <img
                                class="imgwidth"
                                src="../../assets/images/caseStydy/vedioFile.png"
                                @click="playsFlvVideo(item)"
                              >
                            </div>
                          </div>
                          <span class="timeOut">{{aaa.createTime}}</span>
                          <!-- 二级回复 -->
                          <div
                            class="replyConent"
                            v-for="(bbb,index2) in aaa.childMsgs"
                            :key="'two' + index2"
                          >
                            <em>{{bbb.msgUser}}</em>
                            <b style="color:skyblue">回复</b>
                            <em>{{aaa.msgUser}}：</em>
                            <span class="conter" :title="bbb.msgInfo">{{bbb.msgInfo}}</span>
                            <div class="fileList">
                              <div
                                class="listBox position"
                                v-for="(cccc,index7) in bbb.imgUrls"
                                :key="'three' + index7"
                              >
                                <a target="_blank" :href="cccc">
                                  <img :src="cccc">
                                </a>
                              </div>
                              <div
                                class="listBox position"
                                v-for="(item,index5) in bbb.videoUrls"
                                :key="'four' + index5"
                              >
                                <b @click="playsFlvVideo(item)" class="playItem none"></b>
                                <img
                                  class="imgwidth"
                                  src="../../assets/images/caseStydy/vedioFile.png"
                                  @click="playsFlvVideo(item)"
                                >
                              </div>
                            </div>
                            <span class="timeOut">{{bbb.createTime}}</span>
                          </div>
                        </li>
                        <!-- 二级回复 -->
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div
            id="spaceCommentId"
            v-show="iscomment"
            class="spaceComment"
            :class="commentFlag == 1 ? 'ONspaceComment' : commentFlag == 2 ? 'OFFspaceComment' : 'OFFspaceSkynets'"
          >
            <div class="headTextarea">
              <div class="replyPerson" v-show="replyPerson">
                @{{ replyPerson }}
                <div class="textDel el-icon-circle-close" @click="textDel()"></div>
              </div>
              <textarea
                :class="replyPerson ? 'ONtextarea' : ''"
                style="resize:none;border:none!important;"
                placeholder="请输入案情交流内容，少于800字符长度的内容或图片/视频"
                v-model="ReleaseTaskContent"
                maxlength="800"
              ></textarea>
              <div class="fileBox">
                <div class="imgItem" v-for="(item,index) in UploadArray" :key="index">
                  <div class="del el-icon-close" @click="del(index)"></div>
                  <img :src="item" alt>
                </div>
                <div class="imgItem" v-for="(item,index) in videoArray" :key="index">
                  <div class="del el-icon-close" @click="del(index,'videoFile')"></div>
                  <!-- <video :src="item"></video> -->
                  <img src="../../assets/images/caseStydy/vedioFile.png" alt>
                </div>
              </div>
            </div>
            <!-- 添加文件按钮 -->
            <div class="headBtn">
              <el-upload
                class="uploadPhoto"
                action="/sms/uploadFile/upload"
                name="file"
                :limit="9"
                ref="upload"
                multiple
                :before-upload="beforeAvatarUpload"
                :on-exceed="handExceed"
              >
                <el-button
                  size="small"
                  class="topBtn"
                  icon="el-icon-picture-outline"
                  type="primary"
                >上传</el-button>
              </el-upload>
              <el-button
                type="success"
                class="el-icon-circle-check-outline topBtn"
                @click="replyTask()"
              >{{replyPerson ? ' 确认':' 发布'}}</el-button>
            </div>
          </div>
          <div
            v-if="spaceVideoArrowFlag == 1 && dataCaseInfo.isSpecial == 1"
            id="commentId"
            class="botttomComment"
          >
            <span title="发表" @click="announce();">
              <i class="el-icon-chat-dot-square"></i>
            </span>
          </div>
        </div>

        <!-- 朋友圈结束 -->
        <div class="propretiesOn">
          <p
            v-show="dataCaseInfo.isSpecial !=  1"
            @click="spaceVideoArrowFlag == 1 ? spaceVideoArrowFlag = 2 : spaceVideoArrowFlag = 1;skynetFlag = null;closeSearchImg();closeSearchCarImg();isRightClick = false;showSearchImg = false;showPhoneTrack = false"
          >
            案事件属性展开
            <i v-show="spaceVideoArrowFlag == 1" class="el-icon-caret-top"></i>
            <i
              v-show="spaceVideoArrowFlag == 2 || skynetFlag == 1 || skynetFlag == 2"
              class="el-icon-caret-bottom"
            ></i>
          </p>
          <div
            v-if="spaceVideoArrowFlag == 1 && dataCaseInfo.isSpecial !=  1"
            class="criminalSuspectDetials criminalSuspectDetial2"
          >
            <ul>
              <li v-for="(item, index) in this.$constant.CASE_INFO" :key="index">
                {{item.value}}:
                <span>{{ dataCaseInfo[[item.key]] }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 样式bug -->
    <el-dialog title="查看特征信息" top="2vh" :visible.sync="Dialog3D" width="70%" height="100%">
      <div v-if="Dialog3D">
        <Suspects3D
          :suspicionUuid="suspicionUuids"
          :suspicionSee="true"
          :Suspects3DType="suspicionType"
        ></Suspects3D>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="searchBtn" @click="Dialog3D = false">返 回</el-button>
      </span>
    </el-dialog>

    <!-- 以图搜图结构化滑动开始 -->
    <div
      v-if="spaceSkyArrow"
      class="spaceSkyArrow"
      :class="skynetFlag == 1 ? 'ONspaceSkynet' : skynetFlag == 2 ? 'OFFspaceSkynet' : 'OFFspaceSkynets'"
    >
      <div
        class="spaceVideoArrowIcon"
        @click="skynetFlag==1 ? skynetFlag = 2 : skynetFlag = 1;spaceVideoArrowFlag = 2"
      >
        <div
          v-show="skynetFlag == 1"
          class="el-icon-arrow-down spaceVideoArrowIcon-Item"
          style="color: white;font-size: 22px"
        ></div>
        <div
          v-show="skynetFlag == 2"
          class="el-icon-arrow-up spaceVideoArrowIcon-Item"
          style="color: white;font-size: 22px"
        ></div>
      </div>
    </div>

    <div
      class="spaceSkynet spaceVideoWrap ONspaceVideo"
      :class="skynetFlag == 1 ? 'ONspaceVideo' : skynetFlag == 2 ? 'OFFspaceVideo' : 'OFFspaceVideos'"
    >
      <div class="spaceVideBut leftBut el-icon-arrow-left" @click="scrollRight('left')"></div>
      <div class="spaceVideBut rightBut el-icon-arrow-right" @click="scrollRight('right')"></div>
      <div class="spaceVideo" id="spacePic" v-on:scroll.passive="spaceVideoScroll()">
        <div class="videoItem" v-for="(item,index) in checkMarkList" :key="index">
          <div class="playItem none" v-show="!item.regionHeight" @click="playCVideo(item)"></div>
          <div class="frameVideo" id="frameVideo">
            <img
              class="searchBlock"
              v-show="!item.regionHeight"
              :src="item.regionHeight ? item.sourceImgUrl : item.traceImgUrl"
            >
            <img
              class="searchcarBlock"
              :id="'searchcarBlock' + index"
              v-show="item.regionHeight"
              :src="item.regionHeight ? item.sourceImgUrl : item.traceImgUrl"
            >
            <span
              class="selectPic"
              @click="checkSelectPic(index, item)"
              v-text="item.flagIdx ? '取消' : '选中'"
            ></span>
            <span
              class="similary"
            >相似度：{{ Number(item.similarity.toFixed(2)) == 1 ? Math.trunc(item.similarity) + '00%' : item.similarity.toFixed(2)+'%'}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 以图搜图结构化滑动结束 -->
    <!-- 滑动开始 -->
    <div
      v-if="!spaceSkyArrow"
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
    <div
      class="spaceVideoWrap"
      :class="spaceVideoArrowFlag == 1 ? 'ONspaceVideo' : spaceVideoArrowFlag == 2 ? 'OFFspaceVideo' : 'OFFspaceVideos'"
    >
      <div class="spaceVideBut leftBut el-icon-arrow-left" @click="scrollLeftRight('left')"></div>
      <div class="spaceVideBut rightBut el-icon-arrow-right" @click="scrollLeftRight('right')"></div>
      <div class="spaceVideo" id="spaceVideo" v-on:scroll.passive="spaceVideoScroll()">
        <div class="videoItem" v-for="(item,index) in SuspicionObjList" :key="index">
          <div class="playItem none" title="播放" @click="getVideoUrls(item, index)"></div>
          <div v-if="item.type===4" class="videolable" style="width: 100%;height: 100%">
            <div
              class="judged judgedItem "
              v-show="item.typeId == 1 && (!item.suspicionUuid == '' || !item.suspicionUuid == null)  && showsyn"
              @click="opCasePersonContrast(item)"
            >人员属性比对</div>
            <div
              class="judged judgedItemsleft"
              v-show="item.typeId == 1 && (item.suspicionUuid == '' || item.suspicionUuid == null)  && showsyn"
            >人员属性比对</div>
            <div
              class="judged judgedItem"
              v-show="item.typeId == 4 && (!item.suspicionUuid == '' || !item.suspicionUuid == null) && showsyn"
              @click="opCasePersonContrast(item)"
            >骑车人属性比对</div>
            <div
              class="judged judgedItemsleft"
              v-show="item.typeId == 4 && (item.suspicionUuid == '' || item.suspicionUuid == null)  && showsyn"
            >骑车人属性比对</div>
            <div
              class="judged judgedItem"
              v-show="item.typeId == 2 && (!item.suspicionUuid == '' || !item.suspicionUuid == null)  && showsyn"
              @click="opCasePersonContrast(item)"
            >车辆属性比对</div>
            <div
              class="judged judgedItemsleft"
              v-show="item.typeId == 2 && (item.suspicionUuid == '' || item.suspicionUuid == null)  && showsyn"
            >车辆属性比对</div>
            <div class="judgedother judgedDownCenter" @click.stop="downLoadPictBtn(item)">下载</div>
            <div
              class="judgedother judgedItemsCenter"
              @click.stop="collecPictBtn(item)"
              v-show="showVideoStruct == 'true' || zkyStructureSwitch == 'true'"
              title="快捷以图搜图"
            >搜</div>
            <div
              class="judged judgedItems"
              v-show="!item.suspicionUuid == '' || !item.suspicionUuid == null"
            >已关联标注</div>
            <div
              class="judged judgedItemsw"
              v-show="item.suspicionUuid == '' || item.suspicionUuid == null "
            >未关联标注</div>
            <div
              @click="getVideoUrls(item,index)"
              class="markVideo"
              id="markVideo"
              :class="isactive == index ? 'markNone' : '' "
            >
              <!-- <span :id="'img_'+index"  class="boderShow"></span> -->
              <img :src="item.videoCaptureUrl" style="object:contain">
              <div slot="error"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 滑动结束 -->
    <!-- 关联设备 -->
    <el-dialog
      title="设备关联"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :visible.sync="DialogVisible1"
      :destroy-on-close="true"
      v-if="DialogVisible1"
      width="70%"
    >
      <span v-if="DialogVisible1">
        <Stereotypo
          ref="Stereotypo"
          :dataCaseInfo="dataCaseInfo"
          @deviceDence="deviceDence"
          :isCancle="isCancle"
        ></Stereotypo>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary cancleBtn"
          @click="DialogVisible1 = false; isCancle = false"
          class="cancleBtn"
        >取 消</el-button>
        <el-button
          type="primary passBtn"
          v-no-more-click
          @click="relevance(); isCancle = false"
          class="passBtn"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 关联线索 -->
    <!-- 附件列表 -->
    <el-dialog
      title="附件列表"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :visible.sync="DialogVisible8"
      width="50%"
    >
      <span v-if="DialogVisible8">
        <downaccessory
          ref="accessoryList"
          :caseuuId="$route.query.caseUuid"
          :isNotDel="true"
          :isShowprogress="isShowprogress"
        ></downaccessory>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancleBtn" type="primary" @click="DialogVisible8 = false">返 回</el-button>
      </span>
    </el-dialog>

    <!-- 新增案发点 -->
    <el-dialog
      :title="pointCrime"
      :visible.sync="DialogVisible12"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="30%"
    >
      <span>
        <ul class="ul addcasehapen">
          <li>
            <span>
              <b>*</b>案发经度：
            </span>
            <input
              ref="firstvalue"
              maxlength="50"
              @blur="verifylng(caselng)"
              v-model="caselng"
              type="text"
              placeholder="请输入案发经度"
            >
            <div class="mustText mustText0" v-show="showlng">
              请输入正确的经度
              <i></i>
            </div>
            <!-- <span v-show="showlng" style="color:red">请输入正确的经度</span> -->
          </li>
          <li>
            <span>
              <b>*</b>案发纬度：
            </span>
            <input
              ref="twovalue"
              maxlength="50"
              @blur="verifylat(caselat)"
              v-model="caselat"
              type="text"
              placeholder="请输入案发纬度"
            >
            <div class="mustText mustText0" v-show="showlat">
              请输入正确的纬度
              <i></i>
            </div>
          </li>
        </ul>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="DialogVisible12 = false">取 消</el-button>
        <el-button type="primary passBtn" :disabled="isDisableClick" @click="createcase(pTinfo)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="'添加'+ addtype + '点位'"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @open="$store.state.mapLeftMenuFlag = false"
      :visible.sync="DialogVisible13"
      width="30%"
    >
      <span class="temporary">
        <ul
          class="ul"
          style="-webkit-user-select: none;-moz-user-select:none;-ms-user-select:none;user-select:none"
        >
          <li>
            <span>
              <b style="color:red">*</b>
              {{addtype}}点位置名称：
            </span>
            <input type="text" maxlength="25" v-model="extra" placeholder="请输入点位名称" :title="extra">
            <div class="mustText mustText0" v-show="emptyMust">
              点位名称不能为空
              <i></i>
            </div>
            <div class="mustText mustText0" v-show="tenLength">
              名称不能超过25个字符
              <i></i>
            </div>
          </li>
          <li>
            <span>
              <b style="color:red">*</b>
              {{addtype}}点位经度：
            </span>
            <input
              @blur="verifylng(firstPoint)"
              maxlength="50"
              v-model="firstPoint"
              type="text"
              placeholder="请输入点位经度"
            >
            <div class="mustText mustText0" v-show="showlng">
              请输入正确的经度
              <i></i>
            </div>
            <!-- <span v-show="showlng" style="color:red">请输入正确的经度</span> -->
          </li>
          <li>
            <span>
              <b style="color:red">*</b>
              {{addtype}}点位纬度：
            </span>
            <input
              @blur="verifylat(twoPonit)"
              maxlength="50"
              v-model="twoPonit"
              type="text"
              placeholder="请输入点位纬度"
            >
            <div class="mustText mustText0" v-show="showlat">
              请输入正确的纬度
              <i></i>
            </div>
            <!-- <span  v-show="showlat" style="color:red">请输入正确的纬度</span> -->
          </li>
          <li v-show="equipmentTime">
            <span class="compareTime">设备校时：</span> 比北京时间
            <el-select v-model="fastType" placeholder="请选择">
              <el-option
                v-for="(item,index) in targetType"
                :label="item.label"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
            <input
              v-model="secondHand"
              class="searchSecond"
              maxlength="10"
              type="text"
              placeholder="请输入秒数"
            > &nbsp;秒
            <div class="mustText mustText1" v-show="showInteger">
              请输入正整数
              <i></i>
            </div>
          </li>
        </ul>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="DialogVisible13 = false">取 消</el-button>
        <el-button type="primary passBtn" @click="adddianwei" :disabled="isclick">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改点位信息"
      :visible.sync="DialogVisible14"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="20%"
    >
      <span class="temporary">
        <ul class="ul">
          <li>
            <span>
              <b style="color:red">*</b>点位名称：
            </span>
            <input
              type="text"
              v-model.trim="extra"
              maxlength="25"
              @blur="showtemp = false"
              placeholder="请输入点位名称"
              :title="extra"
            >
            <!-- <p v-show="showtemp" style="color:red">点位名称不能为空</p> -->
            <div class="mustText mustText0" v-show="emptyMust">
              点位名称不能为空
              <i></i>
            </div>
            <div class="mustText mustText0" v-show="tenLength">
              名称不能超过25个字符
              <i></i>
            </div>
          </li>
          <li>
            <span>
              <b style="color:red">*</b>点位经度：
            </span>
            <input
              v-model="ptlng"
              maxlength="50"
              @blur="verifylng(ptlng)"
              type="text"
              placeholder="请输入点位经度"
            >
            <div class="mustText mustText0" v-show="showlng">
              请输入正确的经度
              <i></i>
            </div>
          </li>
          <li>
            <span>
              <b style="color:red">*</b>点位纬度：
            </span>
            <input
              v-model="palat"
              maxlength="50"
              @blur="verifylat(palat)"
              type="text"
              placeholder="请输入点位纬度"
            >
            <div class="mustText mustText0" v-show="showlat">
              请输入正确的纬度
              <i></i>
            </div>
          </li>
          <li v-show="equipmentTime">
            <span class="compareTime">设备校时：</span> 比北京时间
            <el-select v-model="fastType" placeholder="快">
              <el-option
                v-for="(item,index) in targetType"
                :label="item.label"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
            <input
              v-model="secondHand"
              class="searchSecond"
              maxlength="7"
              type="text"
              placeholder="请输入秒数"
            > &nbsp;秒
            <div class="mustText mustText1" v-show="showInteger">
              请输入正整数
              <i></i>
            </div>
          </li>
        </ul>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="DialogVisible14 = false">取 消</el-button>
        <el-button type="primary passBtn" :disabled="isDoubleClick" @click="updateInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设备校时 -->
    <el-dialog
      title="设备校时"
      :visible.sync="DialogVisible15"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="20%"
    >
      <span class="temporary">
        <ul class="ul">
          <li>
            <span class="compareTime">设备校时：</span> 比北京时间
            <el-select v-model="fastType" placeholder="快">
              <el-option
                v-for="(item,index) in targetType"
                :label="item.label"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
            <input
              v-model="secondHand"
              class="searchSale"
              maxlength="7"
              type="text"
              placeholder="请输入秒数"
            > &nbsp;秒
            <div class="mustText mustText1" v-show="showInteger">
              请输入正整数
              <i></i>
            </div>
          </li>
        </ul>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary " class="cancleBtn" @click="DialogVisible15 = false">取 消</el-button>
        <el-button type="primary " class="passBtn" v-no-more-click @click="equipmentCalibate">确 定</el-button>
      </span>
    </el-dialog>

    <imei-dialog
      :imeiVisibleDialog="imeiVisibleDialog"
      :caseUuid="caseUuid"
      @childImeiDia="childImeiDia"
      :pointList="pointList"
      :deskPoint="deskPoint"
    ></imei-dialog>

    <excel-imei-data :visible.sync="excelVisibleDialog" :caseUuid="$route.query.caseUuid"></excel-imei-data>

    <!-- 卡口图片上传 -->
    <bayonetPoint
      :openbayonet="openbayonet"
      @childBybayonet="childBybayonet"
      :deviceUuid="deviceUuid"
    ></bayonetPoint>








  </div>
</template>

<script>
import verify from "../../api/casestudy/verify.js";
import addCaseTowJs from "../../api/casestudy/addcaseTwo.js";
import maps from "../../api/realvideo/map.js";
import flvplay from "../../api/casestudy/flvPlay.js"; //播放器的flv的js
import track from "../../api/casestudy/track.js"; //轨迹列表，公共功能
import reviseTime from "../../api/realvideo/reviseTime.js";
import uploadVi from "../../api/casestudy/uploadVI.js";
import videoDown from "../../api/casestudy/videoDown.js";
import fileupload from "../../api/casestudy/fileupload.js";
import CVideo from "../../api/realvideo/C_video.js"; //C++播放器的方法
import searchRunline from "../../api/casestudy/searchRunline.js"; //以图搜图，以车搜车，以脸搜脸
import Stereotypo from "./addcaseInfo/Stereotypo";
import openlablecollide from "../../api/casestudy/openlablecollide.js";
import trackChange from "../../api/casestudy/trackChange.js"; // 轨迹导航
import caseInterflow from "../../api/casestudy/caseInterflow.js"; // 案情交流
import pointLogic from "../../api/casestudy/pointLogic.js"; // 点位
import exportCase from "../../api/casestudy/exportCase.js"; // 导出卷宗

let linshi = require("@/assets/images/device/temporary.png");
let info = require("@/assets/images/device/info.png");
import scale from "../../api/common/scale.js"; //图片自适应的方法
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
// import Vue from 'vue'
export default {
  data() {
    return {
      isShowprogress: [] //上传失败的附件不显示，成功的显示
    };
  },
  mounted() {
    if (g_openplay) {
      OnExit();
    }
    // OnExit();
  },
  components: {
    Stereotypo,
    ExcelImeiData: () => import("./excelImeiData/ExcelImeiData.vue"),
    ImeiDialog: () => import("./imeidialog/ImeiDialog.vue"),
    clue: () => import("./addcaseInfo/clue"),
    Suspects: () => import("./addcaseInfo/addSuspects"),
    sutarget: () => import("./addcaseInfo/sutarget"),
    victimadd: () => import("./addcaseInfo/addvictim"),
    Suspects3D: () => import("./addcaseInfo/addSuspects3D"),
    victimanage: () => import("./addcaseInfo/victimage"),
    addaccessory: () => import("./addcaseInfo/addaccessory"),
    downaccessory: () => import("./addcaseInfo/downaccessory"),
    dwonvideo: () => import("./addcaseInfo/downvideo"),
    videoval: () => import("./addcaseInfo/videoval"),
    // imglable: () => import('./addcaseInfo/imglable'),
    taskManage: () => import("./addcaseInfo/taskManage"),
    gatherList: () => import("./addcaseInfo/gatherList"),
    personManage: () => import("./addcaseInfo/personMan"),
    // caseContrast: () => import("./addcaseInfo/caseContrast"),
    JudgeResult: () => import("./addcaseInfo/JudgeResult"),
    offlineVideo: () => import("./addcaseInfo/offlineVideo"),
    solidifyName: () => import("./addcaseInfo/solidify"),
    uploadImg: () => import("./addcaseInfo/uploadImg"),
    openshowImg: () => import("./addcaseInfo/openshowImg"),
    skyNet: () => import("./addcaseInfo/skyNet"),
    taskMan: () => import("../videoCombat/fastFight/taskMan"),
    targetSus: () => import("./addcaseInfo/targetSus"),
    caseInfos: () => import("./addcaseInfo/updateCaseInfo"),
    syncase: () => import("./addcaseInfo/syncase"),
    accessUpload: () => import("./addcaseInfo/accessoryUpload"),
    dataCell: () => import("../videoCombat/fastFight/dataCell"),
    megerCase: () => import("./addcaseInfo/mergerApprove"),
    videoStructure: () => import("./addcaseInfo/videoStructure"),
    skynetVideo: () => import("./addcaseInfo/skynetVideo"),
    searchImg: () => import("./addcaseInfo/searchImg"), //以图搜图页:
    searchcarImg: () => import("./addcaseInfo/searchCarImg"), //以车搜车页
    searchTrack: () => import("./addcaseInfo/searchTrack"), // 轨迹列表页面
    phoneTrack: () => import("../../components/phoneTrack.vue"), // 轨迹列表页面
    odetailRetervals: () => import("../videoCombat/detailRetervals.vue"), //检索结果页面
    videoStrus: () => import("../videoCombat/structuring/videoStrus.vue"), //结构化结果页面
    // handword: () => import('../videoCombat/fastFight/handworkLable.vue'),  //手工标注页面
    globalSearch: () => import("./addcaseInfo/globalSearch.vue"), //全局搜过结构化目标页面
    globalSearchZky: () => import("./addcaseInfo/globalSearchZky.vue"), //全局搜过结构化目标页面zky
    bayonetPoint: () => import("./addcaseInfo/bayonetPoint.vue"),
    lableCollide: () => import("./addcaseInfo/lablecollides.vue"), //标注碰撞
    // retrievList
    // car3DDialog,carNatureDialog,person3DDialog,personFaceDialog,
    // personNatureDialog,unCarNatureDialog


  },
  mixins: [
    addCaseTowJs,
    maps,
    fileupload,
    uploadVi,
    videoDown,
    flvplay,
    reviseTime,
    verify,
    scale,
    track,
    CVideo,
    searchRunline,
    openlablecollide,
    trackChange,
    caseInterflow,
    pointLogic,
    exportCase
  ],
  methods: {
    ...mapActions(["togglePersonfalse"]),
    ...mapMutations([
      "setsendInfo",
      "setsearchImgBtn",
      "setshowjudged",
      "setglstfeature",
      "setvideoretriInfo", //设置打开手工标注页面的时间
      "setdeviceInfo", //设置当前点位的信息
      "setshowDxplayer", //设置播放的打开控制按钮
      "setDxplayerInfo", //设置播放器的值
      "settargetToOenStrus", //设置当前打开结构化结果的地方
      "settargetToSearchImg", // 存储嫌疑目标id
      "setstrusResult", // 设置结构化当前排查的参数
      "setglststrusInfo" //通过glst一次排查的返回来更改返回值
    ]),

    isUploadSuccess(data) {
      this.isShowprogress = data;
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../assets/css/commom.css";
@import "../../assets/css/verify.css";
@import "./progress.css";
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
  top: 252px;
  right: 38px;
}

.caseinfo {
  width: 100%;
  min-width: 1200px;
  position: absolute;
  top: 0.6rem;
  bottom: 0px;
  left: 0px;
  overflow: hidden;
}

.criminalSuspectDetial {
  width: 2rem;
  min-height: 2.8rem;
  max-height: 4.2rem;
  padding-bottom: 0.1rem;
  /* padding-left: 7px; */
  position: relative;
  // background-color: rgba(32, 49, 67, 0.9);
  @include background_color("background_partner1");
  opacity: 0.9;
}

.criminalSuspectDetials {
  width: 2rem;
  min-height: 2.7rem;
  position: relative;
  background: rgba(32, 49, 67, 0.9);
  opacity: 0.9;
}

.fridendSuspectDetial {
  width: 100%;
  margin: 0 auto;
  position: relative;
  background-color: rgba(32, 49, 67, 0.9);
}

.headTextarea {
  width: 100%;
  border-top: 1px solid rgba(84, 136, 189, 0.9);
  border-bottom: 1px solid rgba(84, 136, 189, 0.9);
  height: 1.95rem;
  padding: 0 0.1rem;
  box-sizing: border-box;
  overflow: auto;
  border-radius: 0.02rem;
  background: none;
  position: relative;
}

.headTextarea textarea {
  width: 100%;
  margin-top: 0.2rem;
  height: 0.7rem;
  padding: 0.1rem;
  box-sizing: border-box;
  font-size: 0.14rem;
  line-height: 0.2rem;
  background: none;
  color: #99c9fa;
}

.criminalSuspectDetial1 {
  margin-right: 2px;
}

.criminalSuspectDetial ul {
  border-bottom: 1px solid #32475e;
}

.criminalSuspectDetial span {
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

.centerSpaceVideo {
  width: 35%;
  height: 40%;
  position: absolute;
  top: 30%;
  left: 37%;
  z-index: 99;
  overflow: hidden;
}

.spaceVideoWrap {
  width: 60%;
  height: 1.9rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 99;
  transition: 0.2s;
}

.spaceSkynet {
  z-index: 100;
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
  opacity: 0.92;
  padding-right: 0;
  z-index: 99;
}

.spaceVideoArrow,
.spaceSkyArrow {
  width: 60%;
  height: 0.25rem;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 99;
  bottom: 2.4rem;
  display: flex;
  justify-content: center;
  margin-bottom: 0;
  transition: 0.2s;
}

.ONspaceVideoArrow,
.ONspaceSkynet {
  bottom: 1.9rem;
}

.OFFspaceSkynet,
.OFFspaceVideoArrow {
  bottom: 0rem;
}

.OFFspaceSkynets,
.OFFspaceVideoArrows {
  bottom: -0.6rem;
}

.spaceVideoArrowIcon {
  width: 100px;
  height: 100%;
  @include background_color("background_btnbj_4");
  @include font_color("font_color_white1");
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.videoItem {
  height: 97%;
  width: 24.13%;
  margin: 0 5px;
  position: relative;
  display: inline-block;
  cursor: pointer;
  align-items: center;
  border: 1px solid #235588;
}


.main {
  /* border: 1px solid #000; */
  width: 100%;
  height: calc(100% - 0.3rem);
  /* padding: 0.14rem 0.14rem 0 0.14rem; */
  box-sizing: border-box;
  border: 1px solid #29629e;
  position: absolute;
  left: 0;
  right: 0;
  top: 0.91rem;
  margin: auto;
  overflow: hidden;
  padding-bottom: 0;
}


.main .maintile {
  line-height: 0.45rem;
  padding-left: 0.2rem;
  font-size: 0.16rem;
  color: #fff;
  border: 1px solid rgba(20, 51, 84, 0.5);
  background-color: #0e253f;
  z-index: 99;
  position: absolute;
  top: 0.09rem;
  width: calc(100% - 0.28rem);
  height: 0.45rem;
}

.maintile span {
  color: #fff;
  font-size: 0.24rem;
}

.main > div {
  width: 100%;
  height: 100%;
  position: relative;
}

.mainmap #mapContent {
  width: 100%;
  height: 100%;
}

#mapContent /deep/ .BMap_Marker {
  background-size: 100px 100px !important;
  z-index: 0 !important;
}

.submitBtn .el-button {
  width: 100%;
  height: 0.28rem;
  font-size: 0.14rem !important;
  border: 1px solid transparent;
}

.caserelece {
  position: absolute;
  top: 0px;
  /* left: 4.2rem; */
  left: 50%;
  transform: translateX(-57%);
  z-index: 999;
}

.caserelece > li {
  width: 1.1rem;
  text-align: center;
  font-size: 0.14rem;
  float: left;
  // color: #99c9fa;
  @include font_color("font_color_3c93ec");
  // background: rgba(37, 67, 100, 0.9);
  @include background_color("background_partner1");
  border-top: 1px solid #275280;
  border-bottom: 1px solid #275280;
  line-height: 0.28rem;
  cursor: pointer;
  padding-top: 0.03rem;
  box-sizing: border-box;
}

.caserelece li ul {
  display: none;
  // background-color: rgba(32, 49, 67, 0.9);
  @include background_color("background_partner1");
}

.caserelece > li:hover .relece {
  display: block;
}
.caserelece li ul li {
  // background-color: rgba(32, 49, 67, 0.9);
  @include background_color("background_partner1");
  // color: #99c9fa;
  @include font_color("font_color_3c93ec");
}
.caserelece li ul li .el-button {
  @include background_color("background_partner1");
  @include font_color("font_color_3c93ec");
}

.caserelece li ul > li:hover {
  cursor: pointer;
  // background-color: #2b4c6f;
  // @include border('boder1');
  @include background_color("background_colortest");
  // color: #2e93fb;
  @include font_color("font_color1");
}

.mainmap .suspectPreson,
.mainmap .propretiesOn {
  position: absolute;
  top: 0;
  width: 2rem;
  font-size: 0.14rem;
  z-index: 99;
  /* color: #606266; */
  /* background-color: #fff; */
}

.pointType {
  position: absolute;
  top: 4.9rem;
  width: 2rem;
  font-size: 0.14rem;
  z-index: 99;
}

.pointTypefold {
  position: absolute;
  top: 0.4rem;
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
  background: #35536e;
  @include border("boder1");
  @include font_color("font_color_3c93ec");
  width: 2rem;
}

.pointType .suspectPresonbox {
  background: rgba(32, 49, 67, 0.5);
  color: #99c9fa;
}

.pointType select {
  width: 92%;
  color: #99c9fa;
  margin: 0.05rem 0;
  margin-left: 4%;
  padding: 0.02rem;
  line-height: 0.2rem;
}

.mainmap .friendsOn {
  position: absolute;
  top: 0;
  width: 3.5rem;
  font-size: 0.14rem;
  z-index: 99;
}

.mainmap .friendsOn {
  right: 0.9rem;
}

.friendsOn p {
  padding: 0rem 0.1rem;
  text-align: center;
  font-size: 0.14rem;
  padding: 0.05rem 0;
  cursor: pointer;
  background-color: rgba(37, 67, 100, 0.9);
  border: 1px solid rgba(84, 136, 189, 0.9);
  color: #99c9fa;
  width: 3.5rem;
}

.mainmap .propretiesOn {
  right: 0.9rem;
}

.suspectPreson p,
.propretiesOn p {
  padding: 0rem 0.1rem;
  text-align: center;
  font-size: 0.14rem;
  padding: 0.05rem 0;
  cursor: pointer;
  /* background-color: rgba(37, 67, 100, 0.9); */
  @include background_color("background_title");
  // border: 1px solid rgba(84, 136, 189, 0.9);
  @include border("boder1");
  // color: #99c9fa;
  @include font_color("font_color_3c93ec");
  width: 2rem;
}

.suspectPreson ul {
  height: 3.6rem;
  overflow: auto;
}

.suspectPreson p i,
.propretiesOn p i,
.pointType p i {
  float: right;
  font-size: 0.2rem;
  margin-right: 0.06rem;
}

.propretiesOn div {
  overflow: auto;
}

.suspectPreson select {
  width: 92%;
  // color: #99c9fa;
  @include font_color("font_color_3c93ec");
  margin: 0.05rem 0;
  margin-left: 4%;
  padding: 0.02rem;
  line-height: 0.2rem;
}

.suspectPreson ul li,
.propretiesOn ul li {
  margin: 0.05rem 0;
  padding: 0rem 0.1rem;
  // color: #99c9fa;
  @include font_color("font_color_3c93ec");
  word-break: break-all;
  font-size: 0.12rem;
}

.suspectPreson .suspectPresonbox {
  background: rgba(32, 49, 67, 0.5);
  color: #99c9fa;
}

.suspectPreson .suspectPresonbox .selectbox {
  width: 100%;
  @include border("boder1");
  // background: rgba(32, 49, 67, 0.9);
  @include background_color("background_partner1");
}

.suspectPresonbox select {
  // background: #0a1a2b;
  @include background_color("background_partner1");
  // border: 1px solid #353a3e;
  @include border("boder1");
  font-size: 12px;
}

.el-button {
  padding: 0.02rem 0rem;
  font-size: 0.14rem;
}


.el-select /deep/ .el-input__inner {
  height: 0.3rem;
  line-height: 0.3rem;
}

.el-select /deep/ .el-input {
  width: 0.6rem;
}
.el-upload__tip {
  color: red;
}
.main .stytic,
.main .stytic1,
.main .stytic2,
.main .stytic3 {
  position: absolute;
  width: 80px;
  height: 123px;
  z-index: 10;
  border: 1px solid #155eb5;
  padding: 0.05rem;
  background-color: rgba(82, 160, 229, 0.9);
}
.main .stytic2,
.main .stytic3 {
  min-width: 1rem;
  height: 0.25rem;
  margin-top: 0.9rem;
  margin-left: -0.3rem;
}
.main .stytic3 {
  margin-left: -1.2rem;
  width: 3rem;
}
.main .stytic2 .otherradiao,
.main .stytic3 .otherradiao {
  width: 100%;
  display: inline-block;
  line-height: 0.25rem;
  color: #fff;
  margin-top: -0.05rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

.stytic .styticImgBox,
.stytic1 .styticImgBox1 {
  width: 100%;
  height: 80px;
  border: 1px solid #155eb5;
  position: relative;
  overflow: hidden;
}
.styticImgBox i {
  width: 10px;
  height: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  cursor: pointer;
  color: #fff;
}
.styticImgBox .el-icon-arrow-right {
  right: 0;
}
.styticImgBox .el-icon-arrow-left {
  left: 0;
}





.oneimg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
}
.oneimg2 {
  max-width: 100%;
  max-height: 100%;
}

.stytic .twoimg,
.stytic1 .twoimg {
  position: absolute;
  bottom: -21px;
  left: 50%;
  transform: translateX(-50%);
}

.stytic span,
.stytic1 span {
  font-size: 0.1rem;
  text-align: center;
  color: #fff;
}


textarea {
  width: 1.8rem;
  height: 0.5rem;
  border: 0px solid #000;
  vertical-align: text-top;
}


.el-progress {
  width: 2rem;
  display: inline-block;
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
  color: #909399;
}

.mainmap /deep/ .BMap_contextMenu {
  width: 135px;
  background-color: rgba(32, 49, 67, 0.9);
  box-shadow: none !important;
}

.mainmap /deep/ .BMap_contextMenu div {
  width: 133px !important;
  color: #99c9fa !important;
  box-sizing: border-box;
  margin: 0 !important;
}

.mainmap /deep/ .BMap_contextMenu div:hover {
  color: #409eff !important;
  background: rgba(37, 67, 100, 0.9);
}



.videoItem /deep/ .el-popover div {
  display: flex;
  align-items: center;
  justify-content: center;
}


.temporary ul li {
  margin-bottom: 0.1rem;
  color: #99c9fa;
  position: relative;
}

.temporary ul li p {
  padding-left: 0.3rem;
}

.temporary ul span {
  margin-left: 0.2rem;
  display: inline-block;
  width: 1.3rem;
  text-align: right;
  height: 0.3rem;
}

.temporary ul input {
  width: 2rem;
  height: 0.3rem;
  margin-left: 0.1rem;
  text-indent: 0.1rem;
}

.frameVideo {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-size: 100% 100%;
  overflow: hidden;
}
.frameVideo .searchcarBlock {
  position: absolute;
}

.videolable {
  position: relative;
}

.videolable:hover > .judgedItemsCenter {
  opacity: 1;
}

.videolable:hover > .judgedDownCenter {
  opacity: 1;
}


.judged{
    position: absolute;
    top: 0;
    z-index: 999;
    height: 0.2rem;
    cursor: pointer;
    color: #fff;
    padding: 2px 3px;
    border-radius: 3px;
    margin-left: 2px;
    margin-top: 2px;
    line-height: 0.2rem;
    font-size: 0.12rem;
}
.judgedItem {
    left: 0;
    background-color: #409eff;
}
.judgedItems {
    right: 0;
    background-color: rgb(63, 204, 63);
}
.judgedItemsw {
  right: 0;
  background-color: #808080;
}

.judgedItemsleft {
  left: 0;
  background-color: #808080;
}
.judgedother{
    position: absolute;
    bottom: 0.02rem;
    z-index: 999;
    height: 0.2rem;
    cursor: pointer ;
    color: #fff;
    padding: 0 0.1rem;
    border-radius: 3px;
    line-height: 0.2rem;
    font-size: 0.12rem;
    text-align: center;
    border: 1px solid rgb(64, 158, 255);
    background-color: #409eff;
    opacity: 0;
}
.judgedItemsCenter {
  right: 0rem;
}

.judgedDownCenter {
  right: 0.5rem;
}

.rightMenu {
  position: absolute;
  z-index: 9999;
  width: 2.3rem;
  background-color: rgba(32, 49, 67, 0.9);
  left: 100px;
  padding: 0.1rem 0.05rem;
  font-size: 0.12rem;
}


.Menuleft{
    position: absolute;
    left: 10px;
    width: 16px;
    height: 16px;
}
.Menuright{
    position: absolute;
    left: 118px;
    width: 16px;
    height: 16px;
}

.offlineUpload {
  background: url("../../assets/images/caseStydy/offlineUpload.png");
}
.videoListAl {
  background: url("../../assets/images/caseStydy/detaResult.png");
}
.videoStruct {
  background: url("../../assets/images/caseStydy/struVideo.png");
}
.editTemporary {
  background: url("../../assets/images/caseStydy/editTemporary.png");
}
.uploadInformation {
  background: url("../../assets/images/caseStydy/uploadInformation.png");
}

.equipmentTime {
  background: url("../../assets/images/caseStydy/equipmentTime.png");
}

.skynetRetrivel {
  background: url("../../assets/images/caseStydy/skynetRetrivel.png");
}

.skynetPlay {
  background: url("../../assets/images/caseStydy/videoPlay.png");
}

.editPoint {
  background: url("../../assets/images/caseStydy/editTemporary.png");
}
.solidyTemporary {
  background: url("../../assets/images/caseStydy/solidyTemporary.png");
}

.videoList {
  background: url("../../assets/images/caseStydy/detaResult.png");
}
.videoRetrivel {
  background: url("../../assets/images/caseStydy/skynetRetrivel.png");
}

.deleteTemporary {
  background: url("../../assets/images/caseStydy/deleteTemporary.png");
}

.deletePoint {
  background: url("../../assets/images/caseStydy/deleteTemporary.png");
}
.videoStructResult {
  background: url("../../assets/images/caseStydy/videoRetrivel.png");
}

.videoStructOut {
  background: url("../../assets/images/caseStydy/struVideo.png");
}

.runTemporary {
  background: url("../../assets/images/caseStydy/runTemporary.png");
}
.moveTemporary {
  background: url("../../assets/images/caseStydy/runTemporary.png");
}

.videoPlay {
  background: url("../../assets/images/caseStydy/videoPlay.png");
}

.rightMenu .item {
  width: 100%;
  padding: 0.05rem 0.05rem;
  cursor: pointer;
  color: #99c9fa;
  /* border:1px solid rgba(84, 136, 189, 0.9); */
  margin: 0 0 -1px -1px;
}

.rightMenu ul li {
  /* border:1px solid rgba(84, 136, 189, 0.9); */
  margin: 0 0 -1px -1px;
}

.rightMenu .imgshow {
  width: 100%;
  height: 1.5rem;
  cursor: pointer;
  border: 1px solid #23456d;
  position: relative;
}

.rightMenu .rightInfo p {
  padding: 0.02rem 0;
  color: #ffa41b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rightMenu ul li.item {
  width: 50%;
  float: left;
  padding-left: 28px;
}

.rightMenu ul li:nth-child(2n) {
  border-left: 0;
}

.rightMenu .item:hover {
  background: rgba(37, 67, 100, 0.9);
}

/* .rightMenu .item:nth-of-type(1){
      position: relative;
    } */

.rightMenu .item .but {
  height: 0.4rem;
  width: 0.15rem;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  text-align: center;
  line-height: 0.4rem;
  position: absolute;
  top: 0.2rem;
  display: none;
  z-index: 10;
}

.rightMenu .item .but:hover {
  background: rgba(0, 0, 0, 0.8);
}

.rightMenu .item:hover .but {
  display: block;
}

.rightMenu .item .el-icon-arrow-left {
  left: 0;
}

.rightMenu .item .el-icon-arrow-right {
  right: 0;
}

.rightMenu .item .imgWrap {
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transition: 0.2s;
}

.rightMenu .item .imgWrap .slide {
  float: left;
  width: 1.2rem;
  height: 100%;
}

.rightMenu .item .imgWrap img {
  width: 100%;
  height: 100%;
}

.rightMenu .item:hover {
  color: #409eff;
}

.removebtn {
  padding: 0.01rem;
  background: #f56c6c !important;
  height: 0.2rem;
  width: 0.2rem;
  text-align: center;
  line-height: 0.2rem;
  top: 0;
  right: 0px;
  position: absolute;
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

.headBtn {
  width: 100%;
  display: flex;
  margin: 0 auto;
  justify-content: space-around;
  margin-top: 0.05rem;
  margin-bottom: 0.05rem;
}

.listWrap .headBtn {
  width: 100%;
  display: flex;
  margin: 0.05rem auto;
  justify-content: space-around;
}

.headBtn /deep/ .el-button {
  font-size: 0.16rem;
  padding: 0.05rem 0.05rem;
  position: relative;
}

.headBtn /deep/ .el-button input {
  height: 100%;
  width: 100%;
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
}

.spaceVideBut:hover {
  @include border_2("border_99c9fa");
}

.spaceVideoArrowIcon:hover {
  @include border_2("border_99c9fa");
}

.leftBut {
  left: -0.4rem;
  border-radius: 0.05rem 0 0 0.05rem;
}

.rightBut {
  right: -0.4rem;
  border-radius: 0 0.05rem 0.05rem 0;
}

.ONspaceVideo {
  bottom: 0rem;
}

.OFFspaceVideo {
  bottom: -2.4rem;
}

.OFFspaceVideos {
  bottom: -2.6rem;
}


.caserelece .innerbox {
  width: 100%;
  border-right: 1px solid #537fa9;
  text-align: center;
}

.el-dialog__wrapper /deep/ .el-dialog__footer {
  text-align: right;
}

.addcasehapen li {
  line-height: 0.4rem;
  position: relative;
  margin-left: 0.2rem;
}

.addcasehapen li input {
  width: 2rem;
  height: 0.3rem;
  padding-left: 0.1rem;
}

.addcasehapen li span b {
  color: red;
}


.mustText0 {
  right: 0.4rem;
}

.mustText1 {
  right: 0.2rem;
}

.el-dialog__wrapper /deep/ .el-dialog {
  min-width: 6rem !important;
}

.width {
  width: 100%;
  height: auto;
}

.height {
  width: auto;
  height: 100%;
}

.markVideo {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: content-box;
}

.markNone {
  border: 1px solid #409eff;
}

.markVideo img,
.imgshow img {
  position: absolute;
  max-width: 99%;
  max-height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
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

.compareTime {
  margin-right: 0.09rem;
}

.temporary ul li .searchSecond {
  width: 0.9rem;
}

.temporary ul li .searchSale {
  width: 0.85rem;
}

.frameVideo .searchBlock {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  object-fit: contain;
}

.selectPic {
  position: absolute;
  left: 0.1rem;
  height: 0.2rem;
  font-size: 0.12rem;
  text-align: center;
  line-height: 0.2rem;
  border-radius: 0.02rem;
  padding: 0 0.1rem;
  background-color: #409eff;
  color: #fff;
}

.similary {
  position: absolute;
  padding: 0 0.1rem;
  font-size: 0.12rem;
  line-height: 0.2rem;
  height: 0.2rem;
  border-radius: 0.02rem;
  background-color: #409eff;
  right: 0.1rem;
  bottom: 0;
  color: #fff;
}

.pointDefaule {
  font-size: 14px;
}

#mapContent /deep/ .BMap_bubble_title {
  line-height: 0.18rem !important;
  color: #1163ad !important;
}

#mapContent /deep/ .BMapLabel {
  z-index: 9999;
}

.playItem {
  position: absolute;
  width: 0.25rem;
  height: 0.25rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url("../../assets/images/videoNewImg/commhand/play_button.png")  no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  z-index: 3;
  display: none;
}
.stytic:hover .strick-playvideo,
.stytic1:hover .strick-playvideo {
  display: block;
}




.videoItem:hover .none {
  display: block;
}


/* rgba(32, 49, 67, 0.9) */

.friendUp {
  position: absolute;
  right: 0.2rem;
}

.friendDown {
  position: absolute;
  right: 0.2rem;
}

.listWrap {
  width: 100%;
  padding-bottom: 0.1rem;
  min-height: 1.2rem;
  max-height: 4.8rem;
  overflow-y: auto;
  overflow-x: hidden;
}

.listWrap textarea {
  width: 100%;
  height: 0.8rem;
  padding: 0.1rem;
  box-sizing: border-box;
  font-size: 0.14rem;
  line-height: 0.2rem;
  background: none;
  color: #99c9fa;
}

.replyContentList {
  width: 100%;
  border-top: 1px solid rgba(84, 136, 189, 0.9);
  height: auto;
}

.replyContentList .item {
  border-bottom: 1px solid rgba(84, 136, 189, 0.9);
}

.replyContentList .item:last-child {
  border-bottom: none;
}

.replyContentList .item .name {
  position: relative;
}

.firstPicter {
  width: 100%;
  height: auto;
}

.replyContentList .item .fileList {
  width: 98%;
  overflow: hidden;
  box-sizing: border-box;
  padding-left: 0.03rem;
}

.replyContentList .item .fileList .listBox {
  height: 0.9rem;
  width: 0.9rem;
  float: left;
  margin-right: 0.06rem;
  margin-bottom: 0.1rem;
  border-radius: 0.1rem;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  background: white;
}

.replyContentList .item .fileList .listBox.position {
  float: left;
}

.replyContentList .item .fileList .listBox a {
  height: 100%;
  width: 100%;
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
}

.replyContentList .item .fileList .listBox img,
.replyContentList .item .fileList .listBox video {
  width: 100%;
  height: 100%;
}

.replyContentList .item .fileList .listBox video {
  background: #fff;
}

.replyContentList .item .time {
  font-weight: bold;
  font-size: 0.12rem;
  line-height: 0.25rem;
  height: auto;
  color: #99c9fa;
  display: block;
}

.replyContentList .item .time {
  width: 100%;
  float: left;
  font-size: 0.12rem;
  height: 0.2rem;
  line-height: 0.2rem;
  font-weight: normal;
  color: #99c9fa;
}

.replyContentList .item .name em.issuer {
  font-size: 0.14rem;
  color: skyblue;
  padding-right: 0.05rem;
}

.replyContentList .item .name {
  float: left;
  color: #1b6daf;
  width: 100%;
  min-height: 0.3rem;
  font-size: 0.14rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: normal;
}

.replyContentList .item .replyIcop {
  float: right;
  width: 0.3rem;
  height: 0.13rem;
  margin-bottom: 0.1rem;
  cursor: pointer;
  color: skyblue;
}

.replypeople {
  text-align: left;
}

.replypeople ul {
  width: 100%;
  height: auto;
}

.replypeople ul li.replyConent {
  padding-left: 0.1rem;
  width: 100%;
  min-height: 0.2rem;
  line-height: 0.2rem;
  background: #0e253f;
}

.replypeople ul li .replyConent i {
  color: #5ce2e0;
  margin-left: 0.1rem;
}

.replyConent em {
  color: #1b6daf;
}

.replypeople ul li .replyConent b {
  color: #999;
}
.main .tarckTovideo {
  position: absolute;
  width: 5rem;
  height: 3rem;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(32, 49, 67, 0.5);
  z-index: 999;
}
.tarckTovideo video {
  width: 100%;
  height: 100%;
}
.replypeople ul li .colorLine {
  border-bottom: 1px dashed #ccc;
  display: flex;
  justify-content: flex-end;
}

.replypeople ul:last-child li.colorLine {
  border-bottom: none;
}

.replyConent .replyIcop_childer {
  width: 0.2rem;
  display: inline-block;
  cursor: pointer;
  color: skyblue;
}

.conter {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #1b6daf;
}

.replypeople ul p.conter {
  margin-left: 0.1rem;
  width: 100%;
  min-height: 0.3rem;
  line-height: 0.25rem;
  height: auto;
  box-sizing: border-box;
  text-align: left;
}

.timeOut {
  display: block;
  font-size: 0.12rem;
  padding-right: 0.1rem;
  color: #99c9fa;
}

.headTextarea .fileBox {
  width: 100%;
  height: 100px;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: auto;
}

.headTextarea .fileBox .imgItem {
  height: 1rem;
  width: 1rem;
  float: left;
  margin: 0.01rem;
  margin-top: 0;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: 1px solid #ccc;
}

.headTextarea .fileBox .imgItem img {
  max-height: 100%;
  max-width: 100%;
}

.headTextarea .replyPerson {
  position: absolute;
  left: 0.1rem;
  top: 0.1rem;
  padding-left: 0.2rem;
  height: 0.2rem;
  line-height: 0.2rem;
  color: #1b6daf;
  font-weight: bold;
  font-size: 0.14rem;
  width: 1.1rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.headTextarea .fileBox .imgItem .del {
  height: 0.16rem;
  width: 0.16rem;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  font-size: 0.12rem;
  font-weight: bold;
  text-align: center;
  line-height: 0.16rem;
  background: #b74848;
  color: white;
  display: none;
}

.headTextarea .fileBox .imgItem:hover .del {
  display: block;
}

.headTextarea .replyPerson {
  border: none !important;
}

.headTextarea .replyPerson .textDel {
  height: 0.2rem;
  width: 0.2rem;
  text-align: center;
  line-height: 0.2rem;
  position: absolute;
  left: 0;
  color: red;
  cursor: pointer;
}

.botttomComment {
  width: 100%;
  height: 20px;
  background: rgba(37, 67, 100, 0.9);
  bottom: -20px;
  position: absolute;
}

.botttomComment span {
  cursor: pointer;
  position: absolute;
  right: 0.1rem;
  color: skyblue;
  bottom: 0;
}

.spaceComment {
  width: 100%;
  background: rgba(32, 49, 67, 0.9);
  height: 234px;
  width: 350px;
  margin: auto;
  z-index: 99;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}

.headBtn .topBtn {
  padding: 0.05rem 0.05rem !important;
}

.videoResult {
  left: 10px;
}

.equipmentHour {
  left: 118px;
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

.criminalSuspectDetial .el-tree {
  overflow: auto;
  height: 2.3rem;
}
.fileList .listBox:hover .none {
  display: block;
}

.playerVideo {
  width: 100%;
  height: 100%;
  z-index: 9;
}

.closeVideo {
  width: 5rem;
  height: 2.5rem;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
}

.closeVideo img {
  position: absolute;
  top: 0.1rem;
  right: 0.05rem;
  z-index: 2;
  cursor: pointer;
}

.playBody {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999;
}

.pointNar {
  width: 1.5rem;
  margin-left: 0.25rem;
  margin-top: 0.05rem;
  @include font_color("font_color_3c93ec");
}

.span-ellipsis {
  width: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.suspectTrack .el-input {
  width: 0.8rem;
}
.suspectTrack .el-button {
  width: 0.9rem;
}
.topInfo a,
.topInfo p,
.topInfo span {
  @include font_color("font_color_3c93ec");
}
.Dwatch {
  color: #99c9fa;
}
.stytic .styticImgBox,
.stytic1 .styticImgBox1 {
  width: 100%;
  height: 80px;
  border: 1px solid #155eb5;
  position: relative;
  overflow: hidden;
}
.styticImgBox i {
  width: 10px;
  height: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  cursor: pointer;
}
.styticImgBox .el-icon-arrow-right {
  right: 0;
}
.styticImgBox .el-icon-arrow-left {
  left: 0;
}
.el-image {
  width: 100%;
  height: 100%;
}
.el-radio-group {
  padding-left: 0.05rem;
}
.el-radio {
  margin: 0.03rem 0;
  margin-right: 0.16rem;
}
.carsimg {
  position: absolute;
}
</style>
