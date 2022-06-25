<template>
  <div id="app">
    <videoflv/>
    <Header/>
    <router-view/>
    <!-- <face-case-info></face-case-info> -->
    <case-nature-dialog :caseUuid="$store.state.caseUuid"></case-nature-dialog>
    <!-- 人特征 -->
    <car3DDialog :caseUuid="$store.state.caseUuid" :suspicionUuid="$store.state.suspicionUuid"></car3DDialog>
    <!-- 车特征 -->
    <carNatureDialog :caseUuid="$store.state.caseUuid" :carNatureObj="$store.state.carNatureObj"></carNatureDialog>
    <!-- 车比对 -->
    <person3DDialog :caseUuid="$store.state.caseUuid" :suspicionUuid="$store.state.suspicionUuid"></person3DDialog>
    <!-- 人比对 -->
    <personNatureDialog
      :caseUuid="$store.state.caseUuid"
      :personNatureObj="$store.state.personNatureObj"
    ></personNatureDialog>
    <!-- 汽车人 -->
    <unCarNatureDialog
      :caseUuid="$store.state.caseUuid"
      :unCarNatureObj="$store.state.unCarNatureObj"
    ></unCarNatureDialog>
    <!-- 骑车人属性比对 -->
    <caseComparison :caseUuid="$store.state.caseUuid"></caseComparison>
    <disk :opendiskInfo="opendiskInfo" @childbydisk="childbydisk"></disk>
    <!-- 空间预警消息提醒 -->
    <skdmsg :opensdkInfo="openSDK"></skdmsg>
    <!-- 空间预警消息提醒 -->
    <Dxplayer></Dxplayer>
    <!-- 视频播放页面，包括以图搜图播放，全局搜索播放，检索结果播放 -->
    <!-- glst结构化的详细信息 -->
    <glstinfo v-show="showglstinfo" ref="glstinfo"></glstinfo>
    <!-- zky结构化的详细信息 -->
    <zkyinfo v-show="showzkyinfo" ref="zkyinfo"></zkyinfo>
    <!-- 标注的详细信息 -->
    <div id="showInfo" class="showInfo" v-show="showInfo">
      <div v-show="showInfoMan == 1">
        <p style="font-weight: 700;color:#BE883A">标注属性</p>
        <p>标注名称:{{lableInfo.markName}}</p>
        <p>标注时间:{{lableInfo | lableTime}}</p>
        <p>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:{{$commons.isEmpty(lableInfoMan.genderCode) ? '未知' : lableInfoMan.genderCode }}</p>
        <p>体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:{{$commons.isEmpty(lableInfoMan.bodyType) ? '未知' : lableInfoMan.bodyType }}</p>
        <p>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族:{{$commons.isEmpty(lableInfoMan.ethicCode) ? '未知' : lableInfoMan.ethicCode}}</p>
        <p>年&nbsp;&nbsp;龄&nbsp;&nbsp;段:{{$commons.isEmpty(lableInfoMan.ageType) ? '未知' : lableInfoMan.ageType}}</p>
        <p>朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向:{{$commons.isEmpty(lableInfoMan.viewType) ? '未知' : lableInfoMan.viewType}}</p>
        <p>发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:{{$commons.isEmpty(lableInfoMan.hairStyle) ? '未知' : lableInfoMan.hairStyle}}</p>
        <p>头发颜色:{{$commons.isEmpty(lableInfoMan.hairColor) ? '未知' : lableInfoMan.hairColor }}</p>
        <p>上衣类型:{{$commons.isEmpty(lableInfoMan.coatStyle) ? '未知' : lableInfoMan.coatStyle }}</p>
        <p>上衣颜色:{{$commons.isEmpty(lableInfoMan.coatColor) ? '未知' : lableInfoMan.coatColor }}</p>
        <p>上衣纹理:{{$commons.isEmpty(lableInfoMan.coatTexture) ? '未知' : lableInfoMan.coatTexture}}</p>
        <p>下衣类型:{{$commons.isEmpty(lableInfoMan.trousersStyle) ? '未知' : lableInfoMan.trousersStyle}}</p>
        <p>下衣颜色:{{$commons.isEmpty(lableInfoMan.trousersColor) ? '未知' : lableInfoMan.trousersColor}}</p>
        <p>鞋子类型:{{$commons.isEmpty(lableInfoMan.shoesStyle) ? '未知' : lableInfoMan.shoesStyle}}</p>
        <p>鞋子颜色:{{$commons.isEmpty(lableInfoMan.shoesColor) ? '未知' : lableInfoMan.shoesColor}}</p>
        <p>包&nbsp;&nbsp;类&nbsp;&nbsp;型:{{$commons.isEmpty(lableInfoMan.bagStyle) ? '未知' : lableInfoMan.bagStyle}}</p>
        <p>包&nbsp;&nbsp;颜&nbsp;&nbsp;色:{{$commons.isEmpty(lableInfoMan.bagColor) ? '未知' : lableInfoMan.bagColor}}</p>
        <p>携&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;物:{{$commons.isEmpty(lableInfoMan.appendant) ? '未知' : lableInfoMan.appendant}}</p>
        <p class="remark">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:{{$commons.isEmpty(lableInfo.remark) ? '' : lableInfo.remark}}</p>
      </div>
      <div v-show="showInfoMan == 2">
        <!-- 骑车人 -->
        <p style="font-weight: 700;color:#BE883A">标注属性</p>
        <p>标注名称:{{lableInfo.markName}}</p>
        <p>标注时间:{{lableInfo | lableTime}}</p>
        <p>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:{{$commons.isEmpty(lableInfoMan.genderCode) ? '未知' : lableInfoMan.genderCode}}</p>
        <p>体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:{{$commons.isEmpty(lableInfoMan.bodyType) ? '未知' : lableInfoMan.bodyType}}</p>
        <p>民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族:{{$commons.isEmpty(lableInfoMan.ethicCode) ? '未知' : lableInfoMan.ethicCode}}</p>
        <p>年&nbsp;&nbsp;龄&nbsp;&nbsp;段:{{$commons.isEmpty(lableInfoMan.ageType) ? '未知' : lableInfoMan.ageType}}</p>
        <p>朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向:{{$commons.isEmpty(lableInfoMan.viewType) ? '未知' : lableInfoMan.viewType}}</p>
        <p>发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:{{$commons.isEmpty(lableInfoMan.hairStyle) ? '未知' : lableInfoMan.hairStyle }}</p>
        <p>上衣类型:{{$commons.isEmpty(lableInfoMan.coatStyle) ? '未知' : lableInfoMan.coatStyle}}</p>
        <p>上衣颜色:{{$commons.isEmpty(lableInfoMan.coatColor) ? '未知' : lableInfoMan.coatColor}}</p>
        <p>上衣纹理:{{$commons.isEmpty(lableInfoMan.coatTexture) ? '未知' : lableInfoMan.coatTexture}}</p>
        <p>下衣类型:{{$commons.isEmpty(lableInfoMan.trousersStyle) ? '未知' : lableInfoMan.trousersStyle }}</p>
        <p>下衣颜色:{{$commons.isEmpty(lableInfoMan.trousersColor) ? '未知' : lableInfoMan.trousersColor}}</p>
        <p>包&nbsp;&nbsp;类&nbsp;&nbsp;型:{{$commons.isEmpty(lableInfoMan.bagStyle) ? '未知' : lableInfoMan.bagStyle}}</p>
        <p>包&nbsp;&nbsp;颜&nbsp;&nbsp;色:{{$commons.isEmpty(lableInfoMan.bagColor) ? '未知' : lableInfoMan.bagColor}}</p>
        <p>眼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;睛:{{$commons.isEmpty(lableInfoMan.eyePart) ? '未知' : lableInfoMan.eyePart}}</p>
        <p>嘴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{{$commons.isEmpty(lableInfoMan.mouthPart) ? '未知' : lableInfoMan.mouthPart}}</p>
        <p>围&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;脖:{{$commons.isEmpty(lableInfoMan.scarf) ? '未知' : lableInfoMan.scarf}}</p>
        <!-- <p>车&nbsp;&nbsp;颜&nbsp;&nbsp;色:{{$commons.isEmpty(lableInfoMan.plateColor) ? '未知' : lableInfoMan.plateColor}}</p> -->
        <p>车&nbsp;&nbsp;颜&nbsp;&nbsp;色:{{$commons.isEmpty(lableInfoMan.vehicleColor) ? '未知' : lableInfoMan.vehicleColor}}</p>
        <p>驾驶人数:{{lableInfoMan.driverCount == undefined ? '未知' : lableInfoMan.driverCount + '人'}}</p>
        <p>是否打伞:{{(lableInfoMan.umbrellaFlag == 0 || '' || null) ? '否' : '是'}}</p>
        <p>是否携物:{{(lableInfoMan.carryingType == 0 || '' || null) ? '否' : '是'}}</p>
        <p class="remark">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注: {{$commons.isEmpty(lableInfo.remark) ? '' : lableInfo.remark}}</p>
      </div>
      <div v-show="showInfoMan == 3">
        <!-- 车 -->
        <p style="font-weight: 700;color:#BE883A">标注属性</p>
        <p>标注名称:{{lableInfo.markName}}</p>
        <p>标注时间:{{lableInfo | lableTime}}</p>
        <p>车辆号牌:{{$commons.isEmpty(lableInfoMan.plateNo) ? '未知' : lableInfoMan.plateNo}}</p>
        <p>车辆类型:{{$commons.isEmpty(lableInfoMan.vehicleClass) ? '未知' : lableInfoMan.vehicleClass}}</p>
        <p>车牌种类:{{$commons.isEmpty(lableInfoMan.plateClass) ? '未知' : lableInfoMan.plateClass}}</p>
        <p>车牌颜色:{{$commons.isEmpty(lableInfoMan.plateColor) ? '未知' : lableInfoMan.plateColor}}</p>
        <p>车身颜色:{{$commons.isEmpty(lableInfoMan.vehicleColor) ? '未知' : lableInfoMan.vehicleColor}}</p>
        <p class="remark">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:{{lableInfo.remark}}</p>
      </div>
    </div>
    <div id="warnMessage" v-show="messageFlag">
      <div class="messageTitle">
        <div style="margin-left: 7px;margin-top: -3px">实时预警</div>
        <span class="el-icon-circle-close-outline" @click="closeMessage"></span>
      </div>
      <div class="messageContent">
        <p>您好，您有一条新的预警消息，请注意查收。</p>
        <p>{{warnMessage.triggerTime}}</p>
        <div class="conta">
          <a href="javascript:;" @click="closeMessage">忽略</a>
          <a href="javascript:;" @click="goToWarnPage">查看</a>
        </div>
      </div>
    </div>

    <div
      class="stuJudge"
      v-show="$store.state.istuJudge"
      @mouseover.stop="istuJudgeOver"
      @mouseout.stop="istuJudgeOut">
      <p class="stutitle">
        <i class="el-icon-message"></i>&nbsp;&nbsp;新消息
        <span class="el-icon-circle-close-outline" @click="$store.state.istuJudge = false"></span>
      </p>
      <div class="allstuJudge">
        <div class="stuMain">
          <div class="stuimg">
            <img :src="$store.state.messageWarn.imgUrl" alt>
          </div>
          <div class="stuTxt">
            <p>可疑目标：{{$store.state.messageWarn.suspicion}}</p>
            <p>出现位置：{{$store.state.messageWarn.device == undefined ? '' : $store.state.messageWarn.device.name}}</p>
            <p>目标出现时间：{{$store.state.messageWarn.mark | computedTime}}</p>
            <p>上传人员：{{$store.state.messageWarn.userName}}</p>
          </div>
        </div>
      </div>
      <p class="stubottom">
        <span
          @click="getGande($store.state.messageWarn.mId,$store.state.messageWarn.judgeId,$store.state.messageWarn.caseUuid,1)
        ;$store.state.istuJudge = false;
        $store.state.istuInfoShow = true;
        $store.state.voteDiabale = false;
        $store.state.isprogress = false;"
        >查看</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span @click="$store.state.istuJudge = false">忽略</span>
      </p>
    </div>

    <!--审批消息-->
    <div
      class="stuJudge"
      v-show="$store.state.approveFlag"
      @mouseover.stop="approveFlagOver"
      @mouseout.stop="approveFlagOut">
      <p class="stutitle">
        <i class="el-icon-message"></i>&nbsp;&nbsp;审批消息
        <span
          class="el-icon-circle-close-outline"
          @click="$store.state.approveFlag=false"
        ></span>
      </p>
      <div class="allstuJudge approveCon" :title="$store.state.messageWarn.approveOpinion">
        <!-- <p>你好！你的案事件申请已审批通过</p> -->
        <p v-show="$store.state.messageWarn.auditFlag == 1">您好，您的案事件申请审批已通过。</p>
        <p v-show="$store.state.messageWarn.auditFlag == 0">您好，您的案事件申请审批未通过。</p>
        <p
          class="approveTxt"
          :title="$store.state.messageWarn.approveOption"
          v-if="$store.state.messageWarn.approveOption != null && $store.state.messageWarn.approveOption != ''"
        >审批意见：{{$store.state.messageWarn.approveOption}}</p>
      </div>
      <p class="stubottom">
        <span
          @click="lookMsg($store.state.messageWarn.mId,'-1',$store.state.messageWarn.caseUuid,3);$store.state.approveFlag=false"
        >忽略</span>
      </p>
    </div>

    <!--相似案件比对消息-->
    <div
      class="stuJudge"
      v-show="$store.state.subapproveFlag"
      @mouseover.stop="subapproveFlagOver"
      @mouseout.stop="subapproveFlagOut">
      <p class="stutitle">
        <i class="el-icon-message"></i>&nbsp;&nbsp;相似案件消息
        <span
          class="el-icon-circle-close-outline"
          @click="$store.state.subapproveFlag=false"
        ></span>
      </p>
      <div class="allstuJudge approveCon">
        <p>您好，您的案事件有相似{{$store.state.messageWarn.typeName}}案件。</p>
      </div>
      <p class="stubottom">
        <span
          @click="lookSimilarCase($store.state.messageWarn.mId,$store.state.messageWarn.caseUuid,2,$store.state.messageWarn.type);$store.state.subapproveFlag=false"
        >查看</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span @click="$store.state.subapproveFlag=false">忽略</span>
      </p>
    </div>

    <!-- 后面所有的消息推送的结果 -->
    <!-- 6表示是案件推送过来的审批 -->
    <!-- 4表示的是串并案推送过来的审批 -->
    <!-- <div class="stuJudge">
      <p style="color:#99c9fa" @click="getMchineInfo">fff</p>
    </div>-->
    <div class="stuJudge" :class="{wrapperShadow:messagerank == 10}" v-show="pushbool">
      <div v-show="messagerank == 6">
        <p class="stutitle">
          <i class="el-icon-message"></i>&nbsp;&nbsp;审批消息
          <span
            class="el-icon-circle-close-outline"
            @click="showhidepushbool(false)"
          ></span>
        </p>
        <div class="allstuJudge approveCon">
          <p>
            您好，{{(pushMessage.establisther == undefined || pushMessage.establisther == null)?
            '' : pushMessage.establisther.trueName}}有新的案件待您审批。
          </p>
        </div>
        <p class="stubottom">
          <span @click="lookMsg(pushMessage.mId,'','',6)">查看</span>
        </p>
      </div>
      <div v-show="messagerank == 4">
        <p class="stutitle">
          <i class="el-icon-message"></i>&nbsp;&nbsp;审批消息
          <span
            class="el-icon-circle-close-outline"
            @click="showhidepushbool(false)"
          ></span>
        </p>
        <div class="allstuJudge approveCon">
          <p>您好，{{pushMessage.creatorName}}有新的串并案件待您审批。</p>
        </div>
        <p class="stubottom">
          <span @click="lookMsg(pushMessage.mId,'','',4)">查看</span>
        </p>
      </div>
      <div v-show="messagerank == 5">
        <p class="stutitle">
          <i class="el-icon-message"></i>&nbsp;&nbsp;审批消息
          <span
            class="el-icon-circle-close-outline"
            @click="showhidepushbool(false)"
          ></span>
        </p>
        <div class="allstuJudge approveCon" :title="pushMessage.approveOption">
          <p v-show="pushMessage.approveFlag == 2">您好，您的串并案审批已通过。</p>
          <p v-show="pushMessage.approveFlag == 3">您好，您的串并案审批未通过。</p>
          <p
            class="approveTxt"
            v-if="pushMessage.approveOption != null && pushMessage.approveOption != ''"
          >审批意见：{{pushMessage.approveOption}}</p>
        </div>
        <p class="stubottom">
          <span
            @click="lookMsg(pushMessage.mId,'-1',pushMessage.caseUuid,5);showhidepushbool(false)"
          >忽略</span>
        </p>
      </div>
      <div v-show="messagerank == 8">
        <p class="stutitle">
          <i class="el-icon-message"></i>&nbsp;&nbsp;任务消息
          <span
            class="el-icon-circle-close-outline"
            @click="showhidepushbool(false)"
          ></span>
        </p>
        <div class="allstuJudge approveCon">
          <p>您好，您有新的案件任务</p>
          <!-- <p v-show="pushMessage.approveFlag == 3">您好，你的串并案未通过审批。</p> -->
          <!-- <p class="approveTxt" v-if="pushMessage.approveOption != null && pushMessage.approveOption != ''">审批意见：{{pushMessage.approveOption}}</p> -->
        </div>
        <p class="stubottom">
          <span
            @click="lookMsg(pushMessage.mId,'-1',pushMessage.caseUuid,9,pushMessage);showhidepushbool(false)"
          >点击查看</span>
        </p>
      </div>
      <div v-show="messagerank == 9">
        <p class="stutitle">
          <i class="el-icon-message"></i>&nbsp;&nbsp;任务消息
          <span
            class="el-icon-circle-close-outline"
            @click="showhidepushbool(false)"
          ></span>
        </p>
        <div class="allstuJudge approveCon">
          <p>您好，团队有新的任务已完成！</p>
          <!-- <p v-show="pushMessage.approveFlag == 3">您好，你的串并案未通过审批。</p> -->
          <!-- <p class="approveTxt" v-if="pushMessage.approveOption != null && pushMessage.approveOption != ''">审批意见：{{pushMessage.approveOption}}</p> -->
        </div>
        <p class="stubottom">
          <span
            @click="lookMsg(pushMessage.mId,'-1',pushMessage.caseUuid,9,pushMessage);showhidepushbool(false)"
          >点击查看</span>
        </p>
      </div>
      <div v-show="messagerank == 10">
        <i class="el-icon-close closedisk" @click="showhidepushbool(false)"></i>
        <div class="diskManage diskFlex">
          <p>
            <b style="color:red">警告：</b>
            {{pushMessage}}
          </p>
        </div>
        <p class="stubottom">
          <span @click="getMchineInfo">点击查看</span>
        </p>
      </div>
    </div>

    <!-- 研判详情 -->
    <div class="stuInfo" v-show="$store.state.istuInfoShow">
        <div>
            <p class="stutitle">
                <span class="stagute">目标研判</span>
            </p>
            <div class="stuInfoMain">
                <div>
                <p class="titles">
                    <span>|</span>&nbsp; 目标图片
                </p>
                <div class="stuInfoimg" id="stuInfoimg">
                    <b @click.stop.self="playJudFlvVideo(judgeDetails)" class="play none"></b>
                    <img class="imgurl" @load="imgscale('.imgurl')" :src="judgeDetails.imgUrl" alt>
                    <div v-show="judgeDetails.featureFlag == 1">
                    <img
                        id="judgeimg"
                        :src="judgeDetails.mark == undefined ? '' : judgeDetails.mark.snapshotFile"
                    >
                    </div>
                </div>
                </div>
                <div class="stuInfo_btn">
                <p class="titles">
                    <span>|</span>&nbsp; 识别信息
                </p>
                <p>
                    <span>目标案件：</span>
                    <span class="contents">{{judgeDetails.caseName}}</span>
                </p>
                <p>
                    <span>可疑目标：</span>
                    <span class="contents">{{judgeDetails.suspicion}}</span>
                </p>
                <p>出现位置：
                    <span
                    class="contents"
                    >{{judgeDetails.device == undefined ? '' : judgeDetails.device.name}}</span>
                </p>
                <p>
                    <span>目标出现时间：</span>
                    <span class="contents">{{judgeDetails.mark | computedTime}}</span>
                </p>
                <p>
                    <span>上传人员：</span>
                    <span class="contents">{{judgeDetails.userName}}</span>
                </p>
                <!-- <p><span>备注说明：</span>
                    <textarea style="resize: none;background: transparent;" v-text="$store.state.judgeDetails.description" readonly >
                    </textarea>
                </p>-->
                <p class="titles">
                    <span>|</span>&nbsp; 投票
                </p>
                <div class="myvote">我的投票：
                    <el-button
                    style="color:#fff"
                    type="success"
                    class="topBtn"
                    :disabled="this.$store.state.voteDiabale"
                    @click="vote(judgeDetails.mId,judgeDetails.judgeId,judgeDetails.caseUuid,1,judgeDetails.mType)"
                    >赞同</el-button>
                    <el-button
                    style="color:#fff"
                    type="warning"
                    class="tryBtn"
                    :disabled="this.$store.state.voteDiabale"
                    @click="vote(judgeDetails.mId,judgeDetails.judgeId,judgeDetails.caseUuid,2,judgeDetails.mType)"
                    >反对</el-button>
                    <div v-show="this.$store.state.isprogress">
                    <p>赞同：
                        <el-progress :percentage="approveProportion" color="#67C23A"></el-progress>
                    </p>
                    <p>反对：
                        <el-progress :percentage="opposeProportion" color="#F56C6C"></el-progress>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            <p class="stutitle stuInfoBtn">
                <el-button type="primary" class="cancleBtn" @click="$store.state.istuInfoShow = false">关闭</el-button>
            </p>
        </div>

    </div>
    <div class="stuInfoMask" v-show="this.$store.state.istuInfoShow"></div>
    <!-- 结构化列表大图 -->
    <div
      class="lookmyBigImg"
      title="点击任何地方关闭"
      @click="setshowlookImgPic(false)"
      v-show="showlookImgPic">
      <div class="lookmyleft">
        <span v-show="showlookImgPic && glstargetinfo.sourceImgUrl" id="canvas"></span>
        <img
          v-if="glstargetinfo.sourceImgUrl"
          id="picture"
          class="showimgs"
          :src="glstargetinfo.sourceImgUrl"
          alt
        >
        <img
          v-if="zkytargetinfo.sourceImgUrl"
          id="picture"
          class="showimgs"
          :src="zkytargetinfo.sourceImgUrl"
          alt
        >
        <img
          v-if="zkytargetinfo.faceObj == undefined ? false : true"
          :src="zkytargetinfo.faceObj == undefined ? '' : zkytargetinfo.faceObj.faceImgUrl"
          id="zkycanvas"
          class="facePhoto"
        />
      </div>
      <div class="lookmyright">
        <glstinfo v-show="glstargetinfo.sourceImgUrl" ref="glstinfo"></glstinfo>
        <zkyinfo v-show="zkytargetinfo.sourceImgUrl" ref="zkyinfo"></zkyinfo>
      </div>
    </div>
  </div>
</template>

<script>
import glstinfo from "./components/glstinfo";
import zkyinfo from "./components/zkyinfo";
import Header from "./components/header";
import { ws } from "../static/js/ws.js";
import caseNatureDialog from "./page/casestudy/caseRetrieval/caseNatureDialog";
import car3DDialog from "./page/casestudy/caseRetrieval/caseDetailDialogs/car3DDialog";
import carNatureDialog from "./page/casestudy/caseRetrieval/caseDetailDialogs/carNatureDialog";
import person3DDialog from "./page/casestudy/caseRetrieval/caseDetailDialogs/person3DDialog";
import personFaceDialog from "./page/casestudy/caseRetrieval/caseDetailDialogs/personFaceDialog";
import personNatureDialog from "./page/casestudy/caseRetrieval/caseDetailDialogs/personNatureDialog";
import unCarNatureDialog from "./page/casestudy/caseRetrieval/caseDetailDialogs/unCarNatureDialog";
import caseComparison from "./components/casecomparison"; //案件所有比对列表弹框
import faceCaseInfo from "./components/faceAndCaseInfo";
import { mapMutations, mapState, mapGetters,mapActions } from "vuex"; //引入vuex
import videoflv from "./components/videoflv"; //全屏播放
import disk from "./components/disk"; //服务器信息列表
import scale from "./api/common/scale.js"; //图片缩放的js
import flvplay from "./api/casestudy/flvPlay.js"; //播放器的flv的js
import skdmsg from "./components/sdkmessage"; //空间预警的页面
import Dxplayer from "./components/Dxplayer"; //空间预警的页面
export default {
  components: {
    Header,
    caseNatureDialog,
    car3DDialog,
    carNatureDialog,
    person3DDialog,
    personFaceDialog,
    personNatureDialog,
    unCarNatureDialog,
    videoflv,
    faceCaseInfo,
    caseComparison,
    glstinfo,
    zkyinfo,
    disk,
    skdmsg,
    Dxplayer
  },
  data() {
    return {
      warnMessage: {},
      stuInfoShow: false,
      isprogress: false,
      judged: {},
      judgedList: [],
      approveProportion: 0, //赞同
      opposeProportion: 0, // 反对
      voteDiabale: false,
      caseUuid: null,
      ten1: null,
      ten2: null,
      ten3: null,
      imgwh: "",
      logotitle: "",
      videoUrl: "",
      opendiskInfo: false, //空间预警
      x:0,
      y:0,
      w:0,
      h:0,
      proprtion:0,
      pianyiX:0,
      pianyiY:0
    };
  },
  created() {
    var worker = new Worker("../../static/js/ws.js");
  },
  mixins: [scale, flvplay],
  filters: {
    lableTime(val) {
      if (val.absoluteTime) {
        let nowabsolutetime = new Date(val.absoluteTime).getTime();
        let allabsolutetime =
          Number(nowabsolutetime) + Number(val.offset * 1000);
        let date = new Date(allabsolutetime);
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
      } else if (val.videoStartTime) {
        let nowplaytime = new Date(val.videoStartTime).getTime();
        let alltime =
          Number(nowplaytime) +
          Number(val.relativeTime) +
          Number(val.offset * 1000);
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
      } else {
        return val.startTime;
      }
    }
  },
  watch: {
    "$store.state.screenWidth"(val) {
      var oIframe = document.getElementById("app");
      oIframe.style.width = val;
    },
    // 监听投票窗口的显示和隐藏
    "$store.state.istuInfoShow"(val) {
      if (val == true) {
        document.title = document.title.split(".")[0];
      } else if (val == false) {
        if (this.$route.path == "/videoCombat/videoplay") {
          document.title = document.title + ".";
        } else if (this.$route.path == "/videoCombat/realvideo") {
          document.title = document.title + "..";
        } else if (this.$route.path == "/videoCombat/historyvideo") {
          document.title = document.title + "....";
        } else {
          if (this.isopenOffVideo) {
            document.title = document.title + ".";
          } else if (this.isopenOnVideo) {
            document.title = document.title + "....";
          }
        }
      }
    },
    opendiskInfo(val) {
      if (val == true) {
        document.title = document.title.split(".")[0];
      } else if (val == false) {
        if (this.$route.path == "/videoCombat/videoplay") {
          document.title = document.title + ".";
        } else if (this.$route.path == "/videoCombat/realvideo") {
          document.title = document.title + "..";
        } else if (this.$route.path == "/videoCombat/historyvideo") {
          document.title = document.title + "....";
        } else {
          if (this.isopenOffVideo) {
            document.title = document.title + ".";
          } else if (this.isopenOnVideo) {
            document.title = document.title + "....";
          }
        }
      }
    },
    "$store.state.messageWarn": {
      handler(newVal, oldVal) {
        if (
          JSON.stringify(this.$store.state.messageWarn) == "{}" ||
          this.$store.state.messageWarn == null ||
          this.$store.state.messageWarn == ""
        ) {
          this.$store.state.approveFlag = false;
          this.$store.state.istuJudge = false;
          this.$store.state.subapproveFlag = false;
        }
      },
      deep: true
    },
    //监听图片打开时候的分析人脸
    judgeDetails(val) {
        this.$nextTick(()=>{
            let imgs = document.getElementById("judgeimg");
            let img = new Image();
            img.onload = function() {
                setTimeout(()=>{
                    let imgWidth = imgs.naturalWidth;
                    let imgHeight = imgs.naturalHeight;
                    let facelist = val.facePos.split(",");
                    let faceLeft = facelist[0]; //人脸相对图片相对位置的左边距离
                    let faceTop = facelist[1]; //人脸相对图片相对位置的上边距离
                    let faceWidth = facelist[2]; //人脸的宽度
                    let faceHeight = facelist[3]; //人脸的高度
                    let unit = 1;
                    let faceLeftPos = 0;
                    let faceTopPos = 0;
                    if (faceWidth < 80 && faceHeight < 80) {
                        faceTopPos = (80 - faceHeight) / 2;
                        faceLeftPos = (80 - faceWidth) / 2;
                    } else {
                        if (1 < faceWidth / faceHeight) {
                            unit = faceWidth / 80;
                            faceLeftPos = 0;
                            faceTopPos = (80 - faceHeight / unit) / 2;
                        } else {
                            unit = faceHeight / 80;
                            faceTopPos = 0;
                            faceLeftPos = (80 - faceWidth / unit) / 2;
                        }
                    }
                    imgs.style.top = -(faceTop / unit - faceTopPos) + "px";
                    imgs.style.left = -(faceLeft / unit - faceLeftPos) + "px";
                    imgs.style.width = imgWidth / unit + "px";
                    imgs.style.height = imgHeight / unit + "px";
                },100)

            };
            img.src = val.imgUrl;
        })

    },
    // 监听打开视频结构化列表打开大图
    showlookImgPic(val) {
        // console.log(this.glstargetinfo);
      var imgs = document.getElementById("picture");
      // 定义框选目标初始的宽高和位置值
      // let x, y, w, h;
      this.x = 0
      this.y = 0
      this.w = 0
      this.h = 0
      this.proprtion = 0
      this.pianyiX = 0
      this.pianyiY = 0
      // // 定义图片缩放比例
      // let proprtion;
      // let pianyiX, pianyiY;
      if (val) {
        // console.log(this.glstargetinfo, '大图数据')
        // console.log(this.zkytargetinfo,'fdsdsffsdfd');

        if(sessionStorage.getItem('glstStructureSwitch') == 'true'){
            setTimeout(() => {
                var img = new Image();
                // 获取大图的位置偏移量
                // let pianyiX, pianyiY;
                img.onload = () => {
                    // 获取需要的数据
                    let str = this.glstargetinfo.sourceImgUrl.split("?")[1].split("&");
                    let arr = [];
                    for (let i in str) {
                    arr.push(str[i].split("=")[1]);
                    }
                    this.x = arr[0];
                    this.y = arr[1];
                    this.w = arr[2];
                    this.h = arr[3];
                    //定义一个初始的宽度，用于计算后面缩放的比例
                    let imageWidth;
                    this.$nextTick(() => {
                    // imgs.onload = () => {
                    // console.log(imgs.id,"kkkkkkkkkk");
                    imageWidth = imgs.offsetWidth;
                    // console.log(imageWidth,"uuuuuuuuuuuuuuuuuu");
                    // console.log(img.width,"kkkkkkkk");
                    //比例值等于大图在页面展示出来的宽度 / 大图初始的宽度
                    this.proprtion = imageWidth / img.width;
                    // console.log(imageWidth,img.width,'kkkkkkkkkkkkkkkkkk');
                    //获取大图在页面上X,Y的偏移量
                    this.pianyiX = imgs.offsetLeft;
                    this.pianyiY = imgs.offsetTop;
                    // console.log(pianyiX,"ddddddddddddddddddddd");
                    // console.log(proprtion,"这个比例");
                    // console.log(w,h,"宽高的值");
                    // }

                    });
                };
                //图片的地址直接设置为返回的数据中的图片地址
                img.src = this.glstargetinfo.sourceImgUrl;
                setTimeout(() => {
                    //获取span
                    var inSign = document.getElementById("canvas");
                    //设置span的宽高和绝对位置，框选出对应的目标
                    inSign.style.width = this.w * this.proprtion + "px";
                    inSign.style.height = this.h * this.proprtion + "px";
                    inSign.style.top = this.y * this.proprtion + this.pianyiY + "px";
                    inSign.style.left = this.x * this.proprtion + this.pianyiX + "px";
                },50)
            }, 20);
        }else if(sessionStorage.getItem('zkyStructureSwitch') == 'true'){
            setTimeout(() => {
                if(this.zkytargetinfo.faceObj){
                    document.getElementById('zkycanvas').style.top = document.getElementById('picture').offsetTop + 'px'
                    document.getElementById('zkycanvas').style.right = document.getElementById('picture').offsetLeft + 'px'
                }
            }, 300);
        }

      }
    }
  },
  mounted() {
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 32) {
        return false;
      }
    };
    var _this = this;
    window.onresize = function() {
        fnResize()

      if (
        _this.$route.path == "/videoCombat/videoplay" ||
        _this.$route.path == "/videoCombat/taskMan/nocolleted" ||
        _this.$route.path == "/videoCombat/taskMan/colleted" ||
        _this.$route.path == "/videoCombat/videomonitor"
      ) {
        console.log(_this.$store.state.isvideoline, 888);
        if (_this.$store.state.isvideoline == true) {
          OnChagehisWindowSize();
        } else {
          OnChageWindowSize();
        }
      } else if (_this.$route.path == "/videoCombat/historyvideo") {
        OnChagehisWindowSize();
      } else if (_this.$route.path == "/videoCombat/realvideo") {
        OnChagelineWindowSize();
      } else if (
        _this.$route.path == "/videoCombat/addcasetwo" &&
        _this.$store.state.diffVideo
      ) {
        OnChageWindowsSize();
      } else {
        if (_this.$store.state.isvideoline == true) {
          OnChagehisWindowSize();
        } else {
          OnChageWindowSize();
        }
      }
    };
    // this.getWarnMessage();
    this.$http.get("/sms/static/getWebConf").then(res => {
      let dataJson = res.data.data;
      let pageIndex = Number(dataJson.pageIndex);
      this.home = pageIndex;
      let logotile = Number(dataJson.currentDeploymentType);
      this.logoTitle = Number(dataJson.currentDeploymentType);
      if (pageIndex == 1 && logotile == 1) {
        document.body.className = "platform_home";
        document.title = "昆仑视频侦查系统";
      } else if (pageIndex == 1 && (logotile == 2 || logotile == 3)) {
        document.body.className = "platform_home";
        document.title = "昆仑案件管理系统";
      } else if (pageIndex == 2) {
        document.body.className = "vehicle_home";
        document.title = "昆仑车辆大数据平台";
      } else if (pageIndex == 3 && logotile == 1) {
        document.body.className = "caseIndex_home";
        document.title = "昆仑视频侦查系统";
      } else if (pageIndex == 3 && (logotile == 2 || logotile == 3)) {
        document.body.className = "caseTop_home";
        document.title = "昆仑案件管理系统";
      } else if (pageIndex == 4 && logotile == 1) {
        document.body.className = "platformStruct_home";
        document.title = "视频结构化一体机";
      }
    });
    window.onload = function() {
        _this.getonlineDeviceList()
      // OnInit();
    //   console.log(_this.$route,4564645645345);
      _this.setrouterlink(sessionStorage.getItem("pageIndex"))
      OnExit();
      setTimeout(() => {
        if (_this.$route.path == "/videoCombat/videoplay") {
          OnInit();
          document.title = document.title + ".";
        } else if (_this.$route.path == "/videoCombat/realvideo") {
          OnInits();
          document.title = document.title + "..";
        } else if (_this.$route.path == "/videoCombat/historyvideo") {
          OnhisInit();
          document.title = document.title + "....";
        }
      }, 200);
      let name = _this.$storage.getSession("name");
      _this.settrueName(_this.$storage.getSession("userInfo").trueName);
      if (name !== "" && name !== null) {
        _this.ws.send('{"msgType":"BUKONG","msgText":"' + name + '"}');
        _this.ws.send('{"msgType":"CONTASK","msgText":"' + name + '"}');
        // _this.getWarnMessage();
        _this.ignore();
      }
    };
    //点击除开消息列表的任何地方 关闭消息弹窗
    document.querySelector("body").addEventListener("mouseover", function(e) {
      let publicTopNewsCase = document.getElementById("publicTopNewsCase");
      let publicTopNewsCaseBtn = document.getElementById(
        "publicTopNewsCaseBtn"
      );
      if (
        publicTopNewsCase &&
        publicTopNewsCaseBtn &&
        !publicTopNewsCase.contains(e.target) &&
        !publicTopNewsCaseBtn.contains(e.target)
      ) {
        _this.$store.state.seekMessage = false;
      }
    });

    document.querySelector("body").addEventListener("click", function(e) {
      //点击页面其他地方 关闭地图的左键点击得到的下拉菜单
      let mapLeftMenu = document.getElementById("MapLeftMenu");
      if (_this.$store.state.isMarkerLable) {
        _this.$store.state.isMarkerLable = false;
      } else {
        _this.$store.state.mapLeftMenuFlag = false;
      }
    });
  },

  methods: {
      ...mapActions([
            'getonlineDeviceList'
        ]),
    ...mapMutations([
      "setpushMessage", //给消息推送的对象赋值
      "setmessagerank", //消息类别
      "showhidepushbool", //消息推送的显示和隐藏
      "settrueName",
      "setjudgeDetails", //设置研判推送过来的值
      "setshowglstinfo", // 设置是否展示结构化信息
      "setshowlookImgPic", // 是否显示大图
      "setrouterlink"
    ]),

    //播放研判10S小视频
    //播放视频
    playJudFlvVideo(item) {
      console.log(item, 111);
      this.$store.state.showvideoflv = true;
      this.$store.state.showohter = false;
      let url = this.getUrl(item.vedioUrl)
      this.flv_load_mds("Video_flv", url);
    },
    //得到所有服务器的信息
    getMchineInfo() {
      this.showhidepushbool(false);
      this.opendiskInfo = true;
    },
    childbydisk(val) {
      this.opendiskInfo = false;
    },
    //投票
    vote(mId, judgeId, caseUuid, num, mType) {
      let data = {
        judgedId: judgeId, //研判投票主键   string  必填
        aspiration: num, //投票结果   int  必填  （投票意愿（1赞成，2反对，3未知））
        userId: "", //当前的投票人id  string  非必填
        description: "" //说明   string  非必填
      };
      data = this.$qs.stringify(data);
      this.$http.post("pca/synergyvote/saveVote", data).then(res => {
        if (res.data.code == 200) {
          this.approveProportion = parseInt(
            res.data.data.approveProportion * 100
          );
          this.opposeProportion = parseInt(
            res.data.data.opposeProportion * 100
          );
          this.$store.state.voteDiabale = true;
          setTimeout(() => {
            this.$store.state.isprogress = true;
          }, 100);
        this.ignore()
          //更新消息状态
          this.lookMsg(mId, judgeId, caseUuid, mType);
        } else if (res.data.code == 100) {
          this.$notify({
            type: "warning",
            message: "您已对此目标投过一次票，不能再投了",
            position: "bottom-right",
            duration: 3000
          });
          // layer.alert(res.data.data, {icon: 5,title: "消息提示"});
          //更新消息状态
          this.lookMsg(mId, judgeId, caseUuid, mType);
        } else {
          this.$notify({
            type: "error",
            message: "投票失败",
            position: "bottom-right",
            duration: 3000
          });
          // layer.alert('投票失败!', {icon: 5,title: "消息提示"});
        }
      });
    },
    // 新增功能
    //案件审批的时候跳转到审批页面进行审批
    //得到后台发送过来的消息
    getWarnMessage() {
      let _this = this;
      _this.warnMessage = {};
      _this.ws.onmessage = function(evt) {
        let userInfo = _this.$storage.getSession("userInfo");
        let data = JSON.parse(evt.data);
        if (data.msgType === "PING") {
          if (userInfo) {
            _this.ws.send(
              '{"msgType":"PONG","msgText":"' + userInfo.userId + '"}'
            );
          } else {
            _this.ws.send('{"msgType":"PONG","msgText":"pong pong "}');
          }
        }
        // console.log(data.msgType, 888888888555); //类型BUKONG

        //布控
        if (data.msgType === "BUKONG") {
          if (
            _this.$storage.getSession("name") !== "" &&
            _this.$storage.getSession("name") !== null
          ) {
            _this.$store.state.messageFlag = true;
            _this.$store.commit("setWarnMessage", data.msgText);
            _this.warnMessage = data.msgText;
          }
        }
        //研判
        else if (data.msgType == "CONTASK") {
          console.log(data.msgText, "研判消息");
          _this.ignore();
          _this.$nextTick(() => {
            //如果研判窗口是打开的就不更新当前数据，否则就更新当数据
            // if(!_this.$store.state.istuInfoShow){
            _this.$store.state.messageWarn = data.msgText;
            _this.getGande(
              data.msgText.mId,
              data.msgText.judgeId,
              data.msgText.caseUuid,
              1
            );
            _this.$store.state.istuJudge = true;
            _this.$store.state.approveFlag = false;
            _this.$store.state.subapproveFlag = false;
            // }
          });
          setTimeout(function() {
            _this.$store.state.istuJudge = false;
          }, 10000);
        }
        //225 通知 217 审批通过
        else if (data.msgType == "APPROVE") {
          console.log(data.msgType, 5555555);
          _this.$store.state.istuJudge = false;
          _this.$store.state.approveFlag = true;
          _this.$store.state.subapproveFlag = false;
          _this.ignore();

          _this.$nextTick(() => {
            _this.$store.state.messageWarn = data.msgText;
          });
          setTimeout(function() {
            _this.$store.state.approveFlag = false;
          }, 10000);
        } else if (data.msgType == "SUBAPPROVE") {
          //相似案件比对消息
          _this.$store.state.istuJudge = false;
          _this.$store.state.approveFlag = false;
          _this.$store.state.subapproveFlag = true;
          _this.ignore();

          _this.$nextTick(() => {
            _this.$store.state.messageWarn = data.msgText;
            //type 字段。 相似类型；（0.案件属性 1.案件人特征 2.案件车特征 3.人 4.车 5.骑车人）
            if (data.msgText.type == 0) {
              _this.$store.state.messageWarn.typeName = "属性";
            } else if (data.msgText.type == 1) {
              _this.$store.state.messageWarn.typeName = "人员特征";
            } else if (data.msgText.type == 2) {
              _this.$store.state.messageWarn.typeName = "车辆特征";
            } else if (data.msgText.type == 3) {
              _this.$store.state.messageWarn.typeName = "人";
            } else if (data.msgText.type == 4) {
              _this.$store.state.messageWarn.typeName = "车";
            } else if (data.msgText.type == 5) {
              _this.$store.state.messageWarn.typeName = "骑车人";
            }
          });
          setTimeout(function() {
            _this.$store.state.subapproveFlag = false;
          }, 10000);
        }
        // 新增webscoket推送
        ////217 通过225 进行案件审批
        else if (data.msgType == "SUBCASEAPPROVE") {
          //6
          _this.ignore();
          _this.$nextTick(() => {
            // _this.$store.state.pushMessage = data.msgText;
            _this.setpushMessage(data.msgText);
            _this.setmessagerank(6);
          });
          _this.showhidepushbool(true);
          _this.$store.state.istuJudge = false;
          _this.$store.state.approveFlag = false;
          _this.$store.state.subapproveFlag = false;
          setTimeout(function() {
            _this.showhidepushbool(false);
          }, 10000);
        }
        //217 收到225 并案审批结果的消息
        else if (data.msgType == "COMBOAPPROVERESULT") {
          //5
          console.log(data.msgText, 5555555);
          _this.ignore();
          _this.$nextTick(() => {
            _this.setpushMessage(data.msgText);
            _this.setmessagerank(5);
          });
          _this.showhidepushbool(true);
          _this.$store.state.istuJudge = false;
          _this.$store.state.approveFlag = false;
          _this.$store.state.subapproveFlag = false;
          setTimeout(function() {
            _this.showhidepushbool(false);
          }, 10000);
        }
        //217 通过225 进行串并案审批
        else if (data.msgType == "SUBCOMBOAPPROVE") {
          //4
          console.log(data.msgText, 555555555555);
          _this.ignore();
          _this.$nextTick(() => {
            _this.setpushMessage(data.msgText);
            _this.setmessagerank(4);
          });
          _this.showhidepushbool(true);
          _this.$store.state.istuJudge = false;
          _this.$store.state.approveFlag = false;
          _this.$store.state.subapproveFlag = false;
          setTimeout(function() {
            _this.showhidepushbool(false);
          }, 10000);
        }
        //一级案件库驳回按钮
        else if (data.msgType == "CASEBACK") {
          //7
          console.log(data.msgText, 4444444444444);
        }
        //作战平台任务分发消息通知
        else if (data.msgType == "TASKDISPENSED") {
          //8
          console.log(data.msgText, 111111);
          _this.ignore();
          _this.$nextTick(() => {
            _this.setpushMessage(data.msgText);
            _this.setmessagerank(8);
          });
          _this.showhidepushbool(true);
          _this.$store.state.istuJudge = false;
          _this.$store.state.approveFlag = false;
          _this.$store.state.subapproveFlag = false;
          setTimeout(function() {
            _this.showhidepushbool(false);
          }, 10000);
        }
        // 任务完成结果消息通知
        else if (data.msgType == "TASKRESULT") {
          //9
          _this.ignore();
          _this.$nextTick(() => {
            _this.setpushMessage(data.msgText);
            _this.setmessagerank(9);
          });
          _this.showhidepushbool(true);
          _this.$store.state.istuJudge = false;
          _this.$store.state.approveFlag = false;
          _this.$store.state.subapproveFlag = false;
          setTimeout(function() {
            _this.showhidepushbool(false);
          }, 10000);
        } else if (data.msgType == "DISK") {
          _this.ignore();
          _this.$nextTick(() => {
            _this.setpushMessage(data.msgText);
            _this.setmessagerank(10);
          });
          _this.showhidepushbool(true);
          _this.$store.state.istuJudge = false;
          _this.$store.state.approveFlag = false;
          _this.$store.state.subapproveFlag = false;
          setTimeout(function() {
            _this.showhidepushbool(false);
          }, 10000);
        }
      };
      _this.ws.onerror = function(evt) {
        _this.ws.close();
      };
      _this.ws.onclose = function(evt) {
        console.log(
          "websocket已关闭------------------------------------------------------------------------------------------------------------------------------"
        );
        let name = _this.$storage.getSession("name");
        if (name) {
          _this.ws = new WebSocket(sessionStorage.getItem("webSocketUrl"));
          //登录成功向websocket服务器发送当前用户名
          _this.ws.send('{"msgType":"BUKONG","msgText":"' + name + '"}');
          _this.ws.send('{"msgType":"CONTASK","msgText":"' + name + '"}');
        } else {
          _this.$router.push("/login");
        }
      };
    },
    // 弹框鼠标移入显示，移开定时
    istuJudgeOver() {
      clearTimeout(this.ten1);
      this.$store.state.istuJudge = true;
    },
    istuJudgeOut() {
      let _this = this;
      this.ten1 = setTimeout(function() {
        _this.$store.state.istuJudge = false;
      }, 4000);
    },
    approveFlagOver() {
      this.$store.state.approveFlag = true;
    },
    approveFlagOut() {
      let _this = this;
      // this.ten2 = setTimeout(function(){
      //   _this.$store.state.approveFlag = false;
      // },4000);
    },
    subapproveFlagOver() {
      this.$store.state.subapproveFlag = true;
    },
    subapproveFlagOut() {
      let _this = this;
      // this.ten3 = setTimeout(function(){
      //   _this.$store.state.subapproveFlag = false;
      // },4000);
    },
    goToWarnPage() {
      this.$router.push("/carJudged/currentDeploy?menuCode=300");
      this.$store.state.messageFlag = false;
    },

    closeMessage() {
      this.$store.state.messageFlag = false;
    },
    //根据研判ID获取研判消息
    getGande(mId, judgeId, caseUuid, mType) {
      let data = {
        judgeId: judgeId
      };
      data = this.$qs.stringify(data);
      this.$http.post("pca/synergyvote/getJudgeVoteById", data).then(res => {
        if (res.data.code == 200) {
          if (res.data.data == null) {
            res.data.data = {};
          }
          //如果是打开了右下角的框，没有打开中间框，则更新下方的值
          if (this.$store.state.istuJudge && !this.$store.state.istuInfoShow) {
            let result = Object.assign(
              this.$store.state.messageWarn,
              res.data.data
            );
            this.$store.state.messageWarn = result;
          } else if (
            !this.$store.state.istuJudge &&
            this.$store.state.istuInfoShow
          ) {
            //如果只打开了中间的框，则更新中间的时间
            let result = Object.assign(res.data.data, {
              caseUuid: caseUuid,
              mType: mType,
              mId: mId
            });
            // this.$store.state.judgeDetails = result;
            this.setjudgeDetails(result);
          } else if (
            this.$store.state.istuJudge &&
            this.$store.state.istuInfoShow
          ) {
            //如果两个都打开，则更新右下角的值
            let result = Object.assign(
              this.$store.state.messageWarn,
              res.data.data
            );
            this.$store.state.messageWarn = result;
          }
        } else {
          this.$notify({
            type: "error",
            message: "获取研判信息失败",
            position: "bottom-right",
            duration: 3000
          });
          // layer.alert('获取研判信息失败!', {icon: 5,title: "消息提示"});
        }
      });
    },
    //查询未读消息
    ignore() {
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      let userId = userInfo.value.userId;
      let datas = {
        judgeId: "", //研判投票主键   string  非必填
        caseUuid: "", //案件主键  string  必填
        mStatus: 1, //消息状态  int 非必填（0或1是未读。2是已读）
        muserId: userId, //当前用户主键  string 必填
        establishId: "" //  string 非必填
      };
      datas = this.$qs.stringify(datas);
      this.$http.post("pca/synergyvote/getWebmessagPage", datas).then(res => {
        if (res.data.code == 200) {
          // this.$store.state.messageList = res.data.data.list;
          this.$store.state.ismessage = true;
          this.$store.commit("AllTopMsg", res.data.data);
          if (this.$store.state.messageList.length == 0) {
            this.$store.state.ismessage = false;
            this.$store.state.istuJudge = false;
            this.$store.state.approveFlag = false;
            this.$store.state.subapproveFlag = false;
          }
        } else {
          this.$notify({
            type: "error",
            message: "查询未读消息失败",
            position: "bottom-right",
            duration: 3000
          });
          // layer.alert('查询未读消息失败!', {icon: 5,title: "消息提示"});
        }
      });
    },

    //查看消息并更改消息已读状态
    lookMsg(mId, judgeId, caseUuid, mType, msg) {
      // let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      // let userId = userInfo.value.userId;
      let datas = {
        mId: mId,
        judgeId: judgeId, //研判投票主键   string  非必填
        caseUuid: caseUuid, //案件主键  string  必填
        mStatus: 2, //消息状态  int 非必填（0或1是未读。2是已读）
        muserId: "", //当前用户主键  string 必填
        mType: mType
        //establishId:''  //  string 非必填
      };
      datas = this.$qs.stringify(datas);
      this.$http.post("pca/synergyvote/updateWebmessage", datas).then(res => {
        if (res.data.code == 200) {
          if (mType == 6) {
            this.showhidepushbool(false);
            this.setmessagerank(0);
            this.$router.push({
              path: "/casestudy/casePicture_look",
              query: {
                caseUuid: this.pushMessage.caseUuid,
                menuCode: 220,
                isTrial: true
              }
            });
          } else if (mType == 4) {
            this.showhidepushbool(false);
            this.setmessagerank(0);
            this.$router.push({
              path: "/casestudy/editMyApprovePage?menuCode=211&mycode=6",
              query: {
                caseCombinationId: this.pushMessage.caseCombinationId
              }
            });
          } else if (mType == 8) {
            this.showhidepushbool(false);
            this.setmessagerank(0);
            let routeData = this.$router.resolve({
              path: "/videoCombat/addcasetwo?menuCode=100",
              query: {
                caseUuid: caseUuid,
                edit: true,
                mycase: true,
                showtask: true,
                editmycase:true,
                scotName: msg.taskName
              }
            });
            window.open(routeData.href, "_blank");
          } else if (mType == 9) {
            this.showhidepushbool(false);
            this.setmessagerank(0);
            let routeData = this.$router.resolve({
              path: "/videoCombat/addcasetwo?menuCode=100",
              query: {
                caseUuid: caseUuid,
                edit: true,
                mycase: true,
                showtask: true,
                editmycase:true,
                scotName: msg.taskName
              }
            });
            window.open(routeData.href, "_blank");
          }
          this.ignore();
        } else if (res.data.code == 100) {
          this.ignore();
          this.$notify({
            type: "error",
            message: res.data.data,
            position: "bottom-right",
            duration: 3000
          });
        } else if (res.data.code == 202) {
          this.ignore();
          this.$notify({
            type: "error",
            message: res.data.message,
            position: "bottom-right",
            duration: 3000
          });
        } else if (res.data.code == 203) {
          this.ignore();
          this.$notify({
            type: "error",
            message: res.data.message,
            position: "bottom-right",
            duration: 3000
          });
        } else {
          this.ignore();
          this.$notify({
            type: "error",
            message: "请求失败，服务器异常",
            position: "bottom-right",
            duration: 3000
          });
          // layer.alert('请求失败，服务器异常',{icon:5,title:"消息提示"});
        }
      });
    },
    goToCaseApprove() {
      this.$router.push({
        path: "/casestudy/caseApprove",
        query: { menuCode: 200, tab: 2 }
      });
    },
    lookSimilarCase(mId, caseUuid, mType, caseType) {
      let judgeId;
      if (caseUuid) {
        this.$store.state.caseUuid = caseUuid;
        if (caseType == 0) {
          judgeId = "0";
          this.$store.state.caseNatureDialogFlag = true;
        } else if (caseType == 1) {
          judgeId = "1";
          this.$store.state.suspicionUuid = this.$store.state.messageWarn.baseSuspicion.suspicionUuid;
          this.$store.state.person3DDialog = true;
        } else if (caseType == 2) {
          judgeId = "2";
          this.$store.state.suspicionUuid = this.$store.state.messageWarn.baseSuspicion.suspicionUuid;
          this.$store.state.car3DDialog = true;
        } else if (caseType == 3) {
          judgeId = "3";
          this.$store.state.personNatureObj = this.$store.state.messageWarn.basePerson;
          this.$store.state.personNatureDialog = true;
        } else if (caseType == 4) {
          judgeId = "4";
          this.$store.state.carNatureObj = this.$store.state.messageWarn.baseVehicle;
          this.$store.state.carNatureDialog = true;
        } else if (caseType == 5) {
          judgeId = "5";
          this.$store.state.unCarNatureObj = this.$store.state.messageWarn.baseBicycle;
          this.$store.state.unCarNatureDialog = true;
        }
        this.lookMsg(mId, judgeId, caseUuid, mType);
      }
    }
  },

  computed: {
    messageFlag: function() {
      return this.$store.state.messageFlag;
    },
    ...mapGetters([
      "pushMessage",
      "messagerank",
      "pushbool",
      "showInfo",
      "showInfoMan",
      "lableInfo",
      "lableInfoMan",
      "openSDK",
      "isopenOffVideo",
      "isopenOnVideo",
      "judgeDetails", //得到研判的值
      "showlookImgPic", // 点击显示视频结构化大图
      "glstargetinfo", //格林深瞳的信息
      'zkytargetinfo', //中科院信息
      "showglstinfo", //显示格林深瞳结构化信息窗口
      'showzkyinfo'  //显示中科院结构化信息
    ]),
  },
  created() {
    // console.log(this.lableInfoMan, 'uuuuuuuuuuuuuu');
  },
};
</script>

<style lang="scss">
@import "./assets/css/commom.css";
@import "./assets/sass/globaldialog.scss";

html,
body {
  min-width: 1200px;
  height: 100%;
  overflow-x: auto;
  position: relative;
  padding-right: 0px !important;
}

body {
  @include background_img("background_img1");
  @include font_color("font_main_color");
  @include background_color("background_color1");
  min-width: 1200px;
  height: 100%;
  overflow-x: auto;
  position: relative;
}
body .el-table th.gutter {
  display: table-cell !important;
}

#warnMessage {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 330px;
  height: 135px;
  @include font_color("font_color1");
  z-index: 9999;
}
.remark {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.approveMsg {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 330px;
  height: 135px;
  border: 1px solid #e4e5e7;
  z-index: 99;
  //   background-color: #fcfdff;
  @include background_color("background_color1");
}

.messageTitle {
  width: 100%;
  height: 30px;
  background-color: #14406d;
  position: relative;
  display: flex;
  align-items: center;
  //   color: #409eff;
  @include font_color("font_color1");
  font-size: 0.14rem;
  border-bottom: 1px solid #4ea5ff;
}
.messageTitle .el-icon-circle-close-outline {
  position: absolute;
  right: 7px;
  //   color: #409eff;
  @include font_color("font_color1");
  cursor: pointer;
}

.messageContent {
  width: 100%;
  height: calc(100% - 30px);
  /* display: flex; */
  /* flex-wrap: wrap; */
  /* align-items: center; */
  /* justify-content: center; */
  padding-top: 10%;
  background: #14406d;
  z-index: 9999;
}
.messageContent > i {
  background: url(assets/icon_news.png) no-repeat;
  display: inline-block;
  width: 22px;
  height: 12px;
  margin-right: 0.1rem;
}
.messageContent p {
  font-size: 12px;
  line-height: 15px;
  width: 100%;
  height: 18px;
  display: block;
  /* color: #606266; */
  color: #99c9fa;
  font-weight: bold;
  padding-left: 60px;
  margin: 0;
  position: relative;
  /* background: #409eff; */
}
.messageContent p:first-child::after {
  position: absolute;
  content: "";
  top: 2px;
  left: 25px;
  width: 22px;
  height: 12px;
  background: url(assets/icon_news.png) no-repeat;
}
.messageContent p:last-child {
  color: #909399;
  font-weight: 400;
}
.conta {
  width: 100%;
  line-height: 20px;
  /* background: #409eff; */
  margin-top: 13px;
  text-align: right;
}
.conta a {
  font-size: 14px;
  margin-right: 5%;
  text-decoration: underline;
}
.conta a:first-child {
  color: #e6a23c;
}
.conta a:first-child:hover {
  color: #ce8e2e;
}
.conta a:last-child {
  @include font_color("font_color1");
}
.conta a:last-child:hover {
  color: #2784e4;
}
select {
  background-color: #fff;
  /* background: white !important; */
}

.stuJudge {
  /* background-color: #43658C; */
  background: url("./assets/updataImg/home-bg.png");
  background-size: 100% 100%;
  position: absolute;
  width: 4rem;
  min-height: 1.6rem;
  max-height: 2.8rem;
  border: 1px solid #43658c;
  right: 0;
  bottom: 0;
  z-index: 9999;
  /*animation-name: disappear;*/
  /*animation-duration: 1s;*/
  /*animation-timing-function: linear;*/
  /*animation-delay: 4s;*/
  /*animation-iteration-count: 1;*/
  /*animation-direction: normal;*/
  /*animation-play-state: running;*/
}
@keyframes disappear {
  from {
    display: block;
    right: 0;
  }
  to {
    right: -4rem;
    display: none;
  }
}

.closedisk {
  color: #99c9fa;
  cursor: pointer;
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
}
.wrapperShadow {
  animation: glow 500ms ease-out infinite alternate;
  padding: 3px;
  right: 3px;
}

@keyframes glow {
  0% {
    border: 1px solid red;
    box-shadow: inset 0 0 0 red;
  }
  100% {
    border: 1px solid red;
    box-shadow: inset 0 0 40px red;
  }
}

.stuMain {
  padding: 0.1rem;
  overflow: hidden;
}
.allstuJudge {
  width: 100%;
  max-height: 2.25rem;
  overflow: auto;
  padding-bottom: 0.31rem;
  /* background-color: #fff; */
  font-size: 0.14rem;
  line-height: 0.2rem;
  color: #99c9fa;
}
.approveCon {
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 98px;
  justify-content: center;
  padding: 0 0.5rem 0 0.75rem;
}
.approveCon p {
  position: relative;
}
.approveCon p::after {
  position: absolute;
  content: "";
  top: 3px;
  left: -0.25rem;
  width: 0.22rem;
  height: 0.12rem;
  background: url(assets/icon_news.png) no-repeat;
}
/* .approveCon .approveTxt{
    width: 2.73rem;
    height:0.4rem;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  } */
.approveCon .approveTxt {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  width: 2.7rem;
  height: 0.4rem;
  white-space: normal;
  text-overflow: ellipsis;
}

.stuMain .stuimg {
  float: left;
  width: 1rem;
  height: 0.8rem;
  margin-right: 0.1rem;
}
.stuMain .stuimg img {
  width: 100%;
  height: 100%;
}
.stuMain .stuTxt {
  float: left;
  width: 2.6rem;
}
.stuMain .stuTxt p {
  height: 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.stuMain > img {
  margin-right: 0.1rem;
}
.stuMain div img {
  width: 0.3rem;
  cursor: pointer;
}
.stuInfo .stutitle {
  line-height: 0.24rem;
  font-size: 0.16rem;
  color: #e5e7e8;
  background: #113254;
  padding: 0.05rem 0.1rem 0.05rem;
  border-bottom: 1px solid #14406d;
}
.stuJudge .stutitle {
  line-height: 0.3rem;
  font-size: 0.14rem;
  color: #e5e7e8;
  background: #113254;
  padding-left: 0.1rem;
  border-bottom: 1px solid #14406d;
}
.stuJudge .stutitle span {
  float: right;
  color: #e5e7e8;
  margin: 0.1rem 0.12rem 0 0;
  cursor: pointer;
}
.stuMain p:last-child {
  display: flex;
  justify-content: space-between;
}
.stubottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  color: red;
  text-align: right;
  padding-right: 0.2rem;
  line-height: 0.3rem;
  font-size: 0.14rem;
  /* background: #f3f6f8; */
  border-top: 1px solid #154c7c;
}
.stubottom span {
  cursor: pointer;
}
.stubottom span:first-child {
  //   color: #409eff;
  @include font_color("font_color1");
}
.stuInfoMask {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 998;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
}
.stuInfo {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9998;
  background: rgba(0, 0, 0, 0.3);
}
.stuInfo > div {
  width: 6.2rem;
  height: 3.3rem;
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 9998;
  transform: translate(-50%, -50%);
  background: url("./assets/updataImg/home-bg.png");
  background-size: 100% 100%;

  /* border: 1px solid #000; */
}
.stuInfoMain {
  padding: 0.1rem;
}
.stuInfoMain > div:first-child {
  width: 2.5rem;
}
.stuInfoMain > div:last-child {
  width: 3.4rem;
}
.stuInfoMain > div {
  display: inline-block;
  height: 2.7rem;
  overflow: hidden;
  padding: 0.1rem;
  /* border: 1px solid #000; */
}
.stuInfoMain > div:first-child .stuInfoimg {
  width: 100%;
  height: calc(100% - 0.2rem);
  border: 1px solid rgba(38, 85, 134, 0.5);
  position: relative;
}

.stuInfoimg .play {
  position: absolute;
  width: 0.25rem;
  height: 0.25rem;
  top: 50%;
  left: 50%;
  display: none;
  transform: translate(-50%, -50%);
  background: url("./assets/images/videoNewImg/commhand/play_button.png")
    no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  z-index: 3;
}
.stuInfoimg div {
  width: 0.8rem;
  height: 0.8rem;
  position: absolute;
  top: 0;
  right: 0;
  border: 1px solid red;
  overflow: hidden;
}
#judgeimg {
  position: absolute;
}
.stuInfoimg:hover .none {
  display: block;
}
.stuInfoMain .imgurl {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.width {
  width: 100%;
}
.height {
  height: 100%;
}
.stuInfoMain .redMark {
  position: absolute;
  z-index: 2;
}
.stuInfoMain p:first-child {
  line-height: 0.25rem;
}
.stuInfoMain .titles {
  //   color: #409eff;
  @include font_color("font_color1");
}
.titles span {
  font-weight: 700;
}
.stuInfo_btn p {
  color: #99c9fa;
  line-height: 0.25rem;
}
.stuInfo_btn p span:last-child {
  display: inline-block;
}
.stuInfo_btn .contents {
  width: 1.8rem;
  color: #ce923a;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
}
textarea {
  width: 1.8rem;
  height: 0.5rem;
  border: 0px solid #000;
  vertical-align: text-top;
}
.myvote {
  color: #99c9fa;
}
.myvote .el-button {
  padding: 0.05rem 0.1rem;
  color: #99c9fa;
}
.myvote /deep/ .el-progress__text {
  color: #fff;
}
.myvote  .el-progress__text {
  color: #fff;
}
.stuInfo .el-progress {
  width: 2rem;
  display: inline-block;
}
.el-progress /deep/ .el-progress-bar__inner {
  transition: width 0s ease !important;
}
.el-progress .el-progress-bar__inner {
  transition: width 0s ease !important;
}
.stuInfoBtn {
  background: #fff;
  text-align: right;
  border-top: 1px solid #14406d;
  padding: 0.1rem 0.2rem;
}
.stuInfoBtn .el-button {
  padding: 0.1rem 0.2rem;
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
}
.stagute {
  padding-left: 0.1rem;
}
.showInfo {
  width: 2.5rem;
  font-size: 0.14rem;
  color: #99c9fa;
  border-radius: 5px;
  padding: 0.1rem;
  background-color: rgba(8, 28, 49, 0.9);
  border: 1px solid rgba(21, 48, 78, 0.9);
  position: absolute;
  z-index: 9999;
}
.showInfo div p {
  width: 2.2rem;
  word-break: break-all;
}
textarea {
  border: 0px solid red !important;
}
.diskManage {
  width: 100%;
  max-height: 2.25rem;
  overflow: auto;
  padding-bottom: 0.2rem;
  /* background-color: #fff; */
  font-size: 0.14rem;
  line-height: 0.2rem;
  color: #99c9fa;
}
.diskFlex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.2rem 0.3rem;
}
/* 9-21修改的样式 */
body /deep/ .el-input__inner {
  @include background_input_1("background_input_1");
  @include border_input_1("border_input_1");
  @include font_color_subject("font_color_subject1");
}
body  .el-input__inner {
  @include background_input_1("background_input_1");
  @include border_input_1("border_input_1");
  @include font_color_subject("font_color_subject1");
}

body /deep/ .el-input__inner {
  @include background_input_1("background_input_1");
  @include border_input_1("border_input_1");
  @include font_color_subject("font_color_subject1");
  height: 0.28rem;
}
body  .el-input__inner {
  @include background_input_1("background_input_1");
  @include border_input_1("border_input_1");
  @include font_color_subject("font_color_subject1");
  height: 0.28rem;
}

body /deep/ .el-select-dropdown {
  @include background_select_1("background_select_1");
  z-index: 9999 !important;
}
body  .el-select-dropdown {
  @include background_select_1("background_select_1");
  z-index: 9999 !important;
}

body /deep/ .el-cascader__label {
  color: #99c9fa !important;
}
body  .el-cascader__label {
  color: #99c9fa !important;
}
body /deep/ .el-carousel__mask,
.el-cascader-menu,
.el-cascader-menu__item.is-disabled:hover,
.el-collapse-item__header,
.el-collapse-item__wrap {
  background: #0b1928 !important;
}
body  .el-carousel__mask,
.el-cascader-menu,
.el-cascader-menu__item.is-disabled:hover,
.el-collapse-item__header,
.el-collapse-item__wrap {
  background: #0b1928 !important;
}
body /deep/ .el-cascader-menu {
  border-right: 1px solid #134276;
}
body  .el-cascader-menu {
  border-right: 1px solid #134276;
}
body /deep/ .el-cascader-menu__item:focus:not(:active),
.el-cascader-menu__item:hover {
  background: #409eff !important;
  color: #99c9fa !important;
}
body  .el-cascader-menu__item:focus:not(:active),
.el-cascader-menu__item:hover {
  background: #409eff !important;
  color: #99c9fa !important;
}
body /deep/ .el-cascader-menus {
  border: 1px solid #0b1928;
}
body  .el-cascader-menus {
  border: 1px solid #0b1928;
}
body /deep/ .el-cascader-menu__item {
  color: #99c9fa;
}
body  .el-cascader-menu__item {
  color: #99c9fa;
}

body /deep/ .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  @include el-background_color_title("el-background_color_title");
}
body .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  @include el-background_color_title("el-background_color_title");
}
body /deep/ .el-select .el-input .el-select__caret {
  font-size: 0.14rem;
  line-height: 0.28rem;
}
body  .el-select .el-input .el-select__caret {
  font-size: 0.14rem;
  line-height: 0.28rem;
}
body /deep/ .el-pagination .el-select .el-input .el-select__caret {
  line-height: 27px;
}
body  .el-pagination .el-select .el-input .el-select__caret {
  line-height: 27px;
}
body /deep/ .el-select .el-input.el-input__icon {
  font-size: 0.25rem;
}
body  .el-select .el-input.el-input__icon {
  font-size: 0.25rem;
}
body /deep/ .el-select-dropdown__item {
  @include font_color_subject("font_color_subject1");
  padding-left: 0.1rem !important;
}
body  .el-select-dropdown__item {
  @include font_color_subject("font_color_subject1");
  padding-left: 0.1rem !important;
}

body /deep/ .el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  background: transparent !important;
}
body .el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  background: transparent !important;
}

body /deep/ .el-date-editor .el-range-input {
  background-color: rgba(0, 0, 0, 0.25) !important;
}
body .el-date-editor .el-range-input {
  background-color: rgba(0, 0, 0, 0.25) !important;
}

body /deep/ .el-table--enable-row-hover .el-table__body tr:hover > td {
  @include el-background_color_hover("el-background_color_hover");
}
body  .el-table--enable-row-hover .el-table__body tr:hover > td {
  @include el-background_color_hover("el-background_color_hover");
}

body /deep/ .el-pagination.is-background .el-pager li {
  @include el-page_background_color_1("el-page_background_color_1");
  @include font_color_subject("font_color_subject1");
  font-weight: normal;
}
body  .el-pagination.is-background .el-pager li {
  @include el-page_background_color_1("el-page_background_color_1");
  @include font_color_subject("font_color_subject1");
  font-weight: normal;
}
body /deep/ .el-pagination.is-background .el-pager li:hover {
  @include el-page_background_color_2("el-page_background_color_2");
  color: #409eff !important;
}
body .el-pagination.is-background .el-pager li:hover {
  @include el-page_background_color_2("el-page_background_color_2");
  color: #409eff !important;
}
body /deep/ .el-popover {
  color: #99c9fa;
}
body  .el-popover {
  color: #99c9fa;
}

body /deep/ .el-pagination.is-background .el-pager .active {
  @include el-page_background_color_2("el-page_background_color_2");
  color: #409eff !important;
}
body  .el-pagination.is-background .el-pager .active {
  @include el-page_background_color_2("el-page_background_color_2");
  color: #409eff !important;

}
body /deep/ .el-pagination.is-background .btn-prev,
body /deep/ .el-pagination.is-background .btn-next {
  @include el-page_background_color_1("el-page_background_color_1");
  @include el-page_font_color_1("el-page_font_color_1");
}
body  .el-pagination.is-background .btn-prev,
body  .el-pagination.is-background .btn-next {
  @include el-page_background_color_1("el-page_background_color_1");
  @include el-page_font_color_1("el-page_font_color_1");
}
body .layui-laydate,
body .layui-laydate-list {
  //   background-color: rgba(3, 16, 31, 0.95);
  @include layer-background_color_1("background_colortest");

  border: 1px solid #193555;
  z-index: 4000 !important;
}
body .layui-laydate-header {
  border-bottom: 1px solid #193555;
}
body .layui-laydate-footer {
  border-top: 1px solid #193555;
}
body .laydate-time-list li ol {
  border: 1px solid #193555;
}

body .layui-laydate-content td {
  color: #99c9fa;
}
body .layui-laydate-content .laydate-day-next,
body .layui-laydate-content .laydate-day-prev,
body .layui-laydate .laydate-disabled {
  color: #46596b !important;
}
body .layui-laydate .layui-this {
  background-color: transparent !important;
  color: #409eff !important;
}
body .laydate-set-ym span,
body .laydate-time-list p,
body .layui-laydate-header i,
body .layui-laydate-footer span,
body .layui-laydate-content th,
body .layui-laydate-list li ol li {
  color: #99c9fa;
}

body .layui-laydate-header i:hover {
  //   color: #409eff;
  @include font_color("font_color1");
}
body .laydate-footer-btns span {
  background: transparent;
  border: 0px solid #000;
}
body .layui-laydate-content td:hover {
  background-color: transparent !important;
  color: #409eff !important;
}
body .layui-laydate-list li ol li:hover {
  background-color: transparent !important;
  color: #409eff !important;
}

body .layui-laydate-footer span:hover,
body .laydate-footer-btns span:hover {
  color: #99c9fa !important;
}
body .laydate-btns-time,
body .laydate-footer-btns span {
  color: #409eff !important;
}

body .layui-laydate ::-webkit-scrollbar {
  width: 0.08rem;
  height: 0.05rem;
}
body .layui-laydate ::-webkit-scrollbar-thumb {
  border-radius: 0.08rem;
  background-color: rgba(153, 201, 250, 0.38) !important;
}

body /deep/ .el-button--primary.is-active,
body /deep/ .el-button--primary:active {
  background: transparent !important;
}
body  .el-button--primary.is-active,
body  .el-button--primary:active {
  background: transparent !important;
}

body /deep/ .is-dark {
  overflow: hidden !important;
}
body  .is-dark {
  overflow: hidden !important;
}
::-webkit-scrollbar {
  width: 0.05rem;
  height: 0.05rem;
}
::-webkit-scrollbar-thumb {
  border-radius: 0.05rem;
  background-color: rgba(153, 201, 250, 0.38);
}

.el-progress /deep/ .el-progress__text {
  font-size: 0.12rem !important;
  color: none;
}
.el-progress  .el-progress__text {
  font-size: 0.12rem !important;
  color: none;
}
.el-tree--highlight-current
  /deep/
  .el-tree-node.is-current
  > .el-tree-node__content {
  @include background_depart_highlight_hover(
    "background_depart_highlight_hover"
  );
}
.el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  @include background_depart_highlight_hover(
    "background_depart_highlight_hover"
  );
}

.lookmyBigImg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999;
}
.lookmyleft {
  background-color: rgba(8, 28, 49, 0.9);
  width: 80%;
  height: 100%;
  position: relative;
  float: left;
  position: relative;
}
.lookmyleft .showimgs {
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
.lookmyleft span {
  position: absolute;
  border: 0.03rem solid red;
  z-index: 1;
}
.lookmyright {
  /* border-left: 1px solid red; */
  margin-left: 80%;
  width: 20%;
  height: 100%;
}
.el-image {
  width: 100%;
  height: 100%;
}
.facePhoto {
  position: absolute;
  z-index: 99;
  width: 1rem;
  height: 1rem;
  top: 0;
  right: 0;
}
@media (max-width:1440px){
    .el-select-dropdown /deep/ .el-select-dropdown__item {
        font-size: .12rem
    }
    .el-select-dropdown__item {
         font-size: .12rem
    }
}

</style>
