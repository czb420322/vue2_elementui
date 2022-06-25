<!--
 * @Author: your name
 * @Date: 2020-04-02 14:54:31
 * @LastEditTime : 2020-12-29 10:41:48
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\casestudy\addcaseInfo\searchImg.vue
 -->
<template>
  <!-- 以图搜图 -->
  <div class="searchimg" v-show="openSearchImg" ref="searchImg">
    <div class="searchtitle">
      <span>|&nbsp;&nbsp;追踪目标</span>
      <span class="el-icon-close" @click="closesearimg"></span>
    </div>

    <div class="searchs" v-if="openSearchImg">
      <div @click="dialogVisible = true" id="searchsmallImg">
        <img v-if="!showfaceimg" :src="feacthImg" alt id="imgUrlShow">
        <img v-if="showfaceimg" :src="feacthImg" alt id="smallImg" class="wh">
        <span class="el-icon-plus" title="点击打开上传图片"></span>
        <span class="el-icon-plus big" v-show="feacthImg != '' || feacthImg != null" title="修改图片"></span>
      </div>
    </div>
    <div class="searchtime">
      <span>开始时间：</span>
      <input
        v-if="openSearchImg"
        readonly
        type="text"
        id="beginMark1"
        v-model="beginData"
        placeholder="请输入开始时间"
      >
    </div>
    <div class="searchtime">
      <span>结束时间：</span>
      <input
        v-if="openSearchImg"
        readonly
        type="text"
        id="endMark1"
        v-model="endData"
        placeholder="请输入结束时间"
      >
    </div>

    <div class="searchtime" v-if="openSearchImg">
      <el-slider
        v-model="includeThreshold"
        @change="includeThresholdHandler"
        :format-tooltip="formatTooltip"
        :max="99"
      ></el-slider>
    </div>
    <div class="searchtime">
      <span>电围感应距离：</span>
      <el-input v-model="range" oninput="value=value.replace(/[^\d]/g,'')" maxlength="5"></el-input>米
      <!-- <span style="font-size:12px;color:red">（提示：电围感应距离范围内，
        存在1个或者多个探头（取拍照时
        间最近的探头）时，即视为该电围
      与探头重合）</span>-->
    </div>
    <div class="searchbutton">
      <el-button class="searchBtn" v-no-more-click @click="beginSearch">开始</el-button>
      <el-button class="searchBtn" v-no-more-click @click="resetSearch()">重置</el-button>
      <el-button class="searchBtn" v-no-more-click @click="drawArea()">范围</el-button>
      <el-button
        class="searchBtn"
        v-no-more-click
        @click="saveSkynet"
        :disabled="isSave || showLinecurrent"
      >保存</el-button>
      <el-button class="searchBtn style-top style-left" v-no-more-click @click="drawLoadPic">下载</el-button>
      <el-button class="searchBtn style-top" v-no-more-click @click="showRunLine" v-if="ifOneData">
        {{showLinecurrent ? '显示轨迹' :
        '隐藏轨迹'}}
      </el-button>
      <el-button
        class="searchBtn style-top"
        :disabled="showLinecurrent"
        v-no-more-click
        @click="convertHandler"
      >转标注</el-button>
      <el-button class="searchBtn style-top" v-no-more-click @click="phoneTrack(false)">碰撞手机轨迹</el-button>
    </div>
    <div class="searchpic" v-show="showSkynet">
      <p class="searchsave">
        <span>|&nbsp;&nbsp;保存</span>
      </p>
      <p>
        <span>
          <i style="color:red">*</i> 轨迹名称：
        </span>
        <input type="text" v-model="trajectoryName" maxlength="50" placeholder="请输入轨迹名称">
      </p>
      <p>
        <span>&nbsp;&nbsp;备注信息：</span>
        <textarea
          class="infoName"
          style="resize:none"
          v-model="description"
          maxlength="50"
          placeholder="请输入备注信息"
        ></textarea>
      </p>
      <div class="btn">
        <el-button class="tryBtn" @click="showSkynet = false">关闭</el-button>
        <el-button class="searchBtn" v-no-more-click @click="gettrajectoryName">保存</el-button>
      </div>
    </div>
    <el-dialog
      title="图片上传"
      :visible.sync="dialogVisible"
      @close="closeDia"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      append-to-body
      @open="opendia"
      width="50%"
    >
      <div class="searchimgload" @click="choiceCar($event)">
        <p class="loadtitle">|&nbsp; &nbsp;图片源</p>
        <div class="searchmain" id="searchmain">
          <gs-column>
            <div slot="gsright" class="currentInfo">
              <span class="smallT">&nbsp; | 详细信息</span>
              <!-- 车 -->
              <div v-show="this.strutInfoCar != ''">
                <p>车&nbsp;&nbsp;辆&nbsp;&nbsp;角&nbsp;&nbsp;&nbsp;度:{{$commons.isEmpty(glstargetinfo.vehicleAngle) ? '未知' : glstargetinfo.vehicleAngle }}</p>
                <p>车&nbsp;&nbsp;辆&nbsp;&nbsp;型&nbsp;&nbsp;&nbsp;号:{{$commons.isEmpty(glstargetinfo.vehicleClass) ? '未知' : glstargetinfo.vehicleClass }}</p>
                <p>车&nbsp;&nbsp;辆&nbsp;&nbsp;颜&nbsp;&nbsp;&nbsp;色:{{$commons.isEmpty(glstargetinfo.vehicleColor) ? '未知' : glstargetinfo.vehicleColor }}</p>
                <p>车&nbsp;&nbsp;辆&nbsp;&nbsp;标&nbsp;&nbsp;&nbsp;志:{{$commons.isEmpty(glstargetinfo.landMark) ? '未知' : glstargetinfo.landMark }}</p>
                <p>面&nbsp;&nbsp;部&nbsp;&nbsp;遮&nbsp;&nbsp;&nbsp;挡:{{glstargetinfo.faceMask == 0 ? '面部遮挡' : '面部未遮挡'}}</p>
                <p>车&nbsp;&nbsp;牌&nbsp;&nbsp;颜&nbsp;&nbsp;&nbsp;色:{{$commons.isEmpty(glstargetinfo.plateColor) ? '未知' : glstargetinfo.plateColor }}</p>
                <p>车&nbsp;&nbsp;牌&nbsp;&nbsp;类&nbsp;&nbsp;&nbsp;型:{{$commons.isEmpty(glstargetinfo.plateClass) ? '未知' : glstargetinfo.plateClass }}</p>
                <p>特&nbsp;&nbsp;殊&nbsp;&nbsp;车&nbsp;&nbsp;&nbsp;辆:{{$commons.isEmpty(glstargetinfo.specialVehicles) ? '未知' : glstargetinfo.specialVehicles}}</p>
                <p>车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;后&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;盖:{{$commons.isEmpty(glstargetinfo.vehicleBack) ? '未知' : glstargetinfo.vehicleBack}}</p>
                <p>车&nbsp;&nbsp;身&nbsp;&nbsp;破&nbsp;&nbsp;&nbsp;损:{{$commons.isEmpty(glstargetinfo.bodyBreakage) ? '未知' : glstargetinfo.bodyBreakage}}</p>
                <p>车&nbsp;&nbsp;顶&nbsp;&nbsp;物&nbsp;&nbsp;&nbsp;件:{{$commons.isEmpty(glstargetinfo.roofGoods) ? '未知' : glstargetinfo.roofGoods}}</p>
                <p>车&nbsp;&nbsp;牌&nbsp;&nbsp;遮&nbsp;&nbsp;&nbsp;挡:{{$commons.isEmpty(glstargetinfo.plateOcclusion) ? '未知' : glstargetinfo.plateOcclusion}}</p>
                <p>车&nbsp;&nbsp;身&nbsp;&nbsp;红&nbsp;&nbsp;&nbsp;绳:{{$commons.isEmpty(glstargetinfo.bodyRed) ? '未知' : glstargetinfo.bodyRed}}</p>
              </div>
              <!-- 人 -->
              <div v-show="this.strutInfoPeople != ''">
                <p>上&nbsp;&nbsp;衣&nbsp;&nbsp;款&nbsp;&nbsp;&nbsp;式:{{$commons.isEmpty(glstargetinfo.coatLength) ? '未知' : glstargetinfo.coatLength}}</p>
                <p>上&nbsp;&nbsp;衣&nbsp;&nbsp;纹&nbsp;&nbsp;&nbsp;理:{{$commons.isEmpty(glstargetinfo.coatPattern) ? '未知' : glstargetinfo.coatPattern }}</p>
                <p>上&nbsp;&nbsp;衣&nbsp;&nbsp;颜&nbsp;&nbsp;&nbsp;色:{{$commons.isEmpty(glstargetinfo.coatColor) ? '未知' : glstargetinfo.coatColor }}</p>
                <p>下&nbsp;&nbsp;衣&nbsp;&nbsp;款&nbsp;&nbsp;&nbsp;式:{{$commons.isEmpty(glstargetinfo.trousersStyle) ? '未知' : glstargetinfo.trousersStyle}}</p>
                <p>下&nbsp;&nbsp;衣&nbsp;&nbsp;颜&nbsp;&nbsp;&nbsp;色:{{$commons.isEmpty(glstargetinfo.trousersColor) ? '未知' : glstargetinfo.trousersColor }}</p>
                <p>鞋&nbsp;&nbsp;子&nbsp;&nbsp;款&nbsp;&nbsp;&nbsp;式:{{$commons.isEmpty(glstargetinfo.shoesStyle) ? '未知' : glstargetinfo.shoesStyle }}</p>
                <p>鞋&nbsp;&nbsp;子&nbsp;&nbsp;颜&nbsp;&nbsp;&nbsp;色:{{$commons.isEmpty(glstargetinfo.shoesColor) ? '未知' : glstargetinfo.shoesColor }}</p>
                <p>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:{{$commons.isEmpty(glstargetinfo.sex) ? '未知' : glstargetinfo.sex }}</p>
                <!-- <p>民族:{{$commons.isEmpty(glstargetinfo.ethnic) ? '未知' : glstargetinfo.ethnic }}</p> -->
                <p>头&nbsp;&nbsp;部&nbsp;&nbsp;标&nbsp;&nbsp;&nbsp;志:{{$commons.isEmpty(glstargetinfo.headLandMark) ? '未知' : glstargetinfo.headLandMark }}</p>
                <p>附&nbsp;&nbsp;属&nbsp;&nbsp;物&nbsp;&nbsp;&nbsp;品:{{$commons.isEmpty(glstargetinfo.accessoryItem) ? '未知' : glstargetinfo.accessoryItem }}</p>
                <p>发&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:{{$commons.isEmpty(glstargetinfo.hairStyle) ? '未知' : glstargetinfo.hairStyle }}</p>
                <p>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄:{{$commons.isEmpty(glstargetinfo.age) ? '未知' : glstargetinfo.age }}</p>
                <p>包&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;款&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;式:{{$commons.isEmpty(glstargetinfo.packageStyle) ? '未知' : glstargetinfo.packageStyle }}</p>
              </div>
              <!-- 骑车人 -->
              <div v-show="this.strutInfoBicycle != ''">
                <p>头&nbsp;&nbsp;部&nbsp;&nbsp;标&nbsp;&nbsp;&nbsp;志:{{$commons.isEmpty(glstargetinfo.headLandMark) ? '未知' : glstargetinfo.headLandMark }}</p>
                <p>车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:{{$commons.isEmpty(glstargetinfo.vehicleClass) ? '未知' : glstargetinfo.vehicleClass }}</p>
                <p>车&nbsp;&nbsp;辆&nbsp;&nbsp;角&nbsp;&nbsp;&nbsp;度:{{$commons.isEmpty(glstargetinfo.vehicleAngle) ? '未知' : glstargetinfo.vehicleAngle }}</p>
                <p>骑&nbsp;车&nbsp;人&nbsp;性&nbsp;别:{{$commons.isEmpty(glstargetinfo.sex) ? '未知' : glstargetinfo.sex }}</p>
                <!-- <p>骑车人民族:{{$commons.isEmpty(glstargetinfo.ethnic) ? '未知' : glstargetinfo.ethnic }}</p> -->
                <p>骑车人包类型:{{$commons.isEmpty(glstargetinfo.backpackClass) ? '未知' : glstargetinfo.backpackClass }}</p>
                <p>上&nbsp;&nbsp;衣&nbsp;&nbsp;颜&nbsp;&nbsp;&nbsp;色:{{$commons.isEmpty(glstargetinfo.coatColor) ? '未知' : glstargetinfo.coatColor }}</p>
                <p>上&nbsp;&nbsp;衣&nbsp;&nbsp;图&nbsp;&nbsp;&nbsp;案:{{$commons.isEmpty(glstargetinfo.coatPattern) ? '未知' : glstargetinfo.coatPattern }}</p>
                <p>车&nbsp;&nbsp;身&nbsp;&nbsp;颜&nbsp;&nbsp;&nbsp;色:{{$commons.isEmpty(glstargetinfo.vehicleColor) ? '未知' : glstargetinfo.vehicleColor }}</p>
                <p>违&nbsp;&nbsp;法&nbsp;&nbsp;载&nbsp;&nbsp;&nbsp;人:{{$commons.isEmpty(glstargetinfo.manned) ? '未知' : glstargetinfo.manned }}</p>
              </div>
            </div>
            <div slot="gsMain" class="gs-info">
              <img v-show="imgPicInquire" :src="bigsearchimg" alt id="searchBigimg">
              <canvas id="searchcanvas"></canvas>
            </div>
          </gs-column>
        </div>
        <el-upload
          class="loadbtn"
          action="sms/uploadFile/upload"
          name="uploadImage"
          ref="upload"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
        >
          <el-button size="small" class="topBtn" icon="el-icon-picture-outline" type="primary">上传图片</el-button>
        </el-upload>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary passBtn" :disabled="clickRecodeimg" @click="clickCanvasImg">确 定</el-button>
      </span>

      <!-- </div> -->
    </el-dialog>

    <el-dialog
      title="下载"
      :visible.sync="dialogDownLoad"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      append-to-body
      width="42%"
    >
      <div class="downImg">
        <el-checkbox v-model="thumbnail">缩略图</el-checkbox>
        <el-checkbox v-model="HD">高清</el-checkbox>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="cancleBtn" @click="dialogDownLoad = false">取 消</el-button>
        <el-button type="primary" class="passBtn" @click="downLoadPic" v-no-more-click>确 定</el-button>
      </span>
    </el-dialog>

    <v-dialog :tagDialog.sync="tagDialog" :tagDataList="tagDataList" :fromPage="fromPage"></v-dialog>
    <!-- <glstinfo  ref="glstinfoStruc"></glstinfo> -->
  </div>
</template>

<script>
//引入相对应的js
import beginEnd from "../../../api/realvideo/BenEedTime.js"; //时间插件的引入
import reviseTime from "../../../api/realvideo/reviseTime.js";
import videoDown from "../../../api/casestudy/videoDown.js";
import searchimgjs from "../../../api/casestudy/searchimg.js"; //方法的js
import zkySearchImg from "../../../api/casestudy/zkySearchImg.js"; //方法的js
import { mapActions, mapMutations, mapState, mapGetters } from "vuex"; //引入vuex
// import glstinfo from '../../../components/glstinfo'

export default {
  mixins: [searchimgjs, zkySearchImg, beginEnd, videoDown, reviseTime],
  ...mapGetters([
    "glstargetinfo" //结构化一次排查返回的筛选条件信息
  ]),
  // components:{
  //   glstinfo
  // },
  data() {
    return {
      strutInfoCar: "", //当前框选的车辆的所有信息
      strutInfoPeople: "", //当前框选的人的所有信息
      strutInfoBicycle: "", //当前框选的骑车人的所有信息
      glstargetinfo: {} //当前的信息
    };
  }
};
</script>
<style scoped>
@import "../../../assets/css/commom.css";

.searchimg {
  z-index: 1999;
  width: 2.1rem !important;
  height: 4.6rem !important;
  background-color: rgba(32, 49, 67, 0.9);
  position: absolute !important;
  cursor: pointer;
  border: 1px solid #224670;
}

.searchpic {
  z-index: 1999;
  width: 2.2rem !important;
  height: 2.5rem !important;
  background-color: rgba(32, 49, 67, 0.9);
  position: absolute !important;
  top: 0%;
  left: 110%;
  cursor: pointer;
  border: 1px solid #224670;
}

.searchs {
  width: 100%;
  height: 2rem;
  padding: 0 0.1rem;
}

.big {
  z-index: 5;
  display: none;
}

.searchs div {
  width: 100%;
  height: 100%;
  border: 1px solid #3d90e3;
  position: relative;
  overflow: hidden;
}

.searchs div:hover span {
  display: block;
}

.searchs div img {
  position: absolute;
  z-index: 2;
}

.searchs div .wh {
  text-align: center;
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.infoName {
  background-color: rgba(0, 0, 0, 0.2) !important;
  margin-top: 0.05rem;
  margin-left: 0.2rem;
}

.searchs div span {
  width: 0.5rem;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.3rem;
  color: #99c9fa;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.searchtitle {
  height: 0.4rem;
  line-height: 0.4rem;
  color: #409eff;
  font-weight: 700;
  padding-left: 0.1rem;
}

.searchtitle span:nth-child(1) {
  color: #fff;
}

.searchsave {
  height: 0.4rem;
  line-height: 0.4rem;
  color: #fff;
  font-weight: 700;
  padding-left: 0.1rem;
}

.searchpic input {
  border-radius: 3px;
  margin-top: 0.05rem;
  margin-left: 0.2rem;
  padding: 0.02rem;
}

.searchpic :nth-child(2) span {
  color: #409eff;
  display: block;
  padding-left: 0.2rem;
}

.searchpic :nth-child(3) span {
  color: #409eff;
  display: block;
  padding-left: 0.2rem;
}

.searchtitle span:first-child {
  float: left;
}

.searchtitle span:last-child {
  float: right;
  margin-top: 0.1rem;
  padding-right: 0.1rem;
}

.searchtime {
  color: #409eff;
  margin-top: 0.1rem;
  font-size: 0.12rem;
  padding: 0 0.1rem;
}

.searchtime input {
  width: 1.2rem;
}

.searchtime .el-input {
  width: 0.8rem;
}

.searchbutton {
  margin-top: 0.1rem;
  padding: 0 0.05rem;
}

.searchbutton .el-button {
  /* padding: 0.03rem 0.02rem; */
  padding: 0.03rem 0.07rem;
  font-size: 0.12rem !important;
}

.searchimgload {
  height: 5.2rem;
  color: #409eff;
  font-size: 0.16rem;
  font-weight: 700;
  background-color: rgba(16, 35, 56, 0.5);
  padding: 0 0.1rem;
}

.searchimgload .searchmain {
  width: 100%;
  height: 4.2rem;
  border: 1px solid #1f4572;
  position: relative;
}
.searchmain img {
  height: 100%;
}
.searchmain img,
.searchmain canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loadtitle {
  line-height: 0.4rem;
  padding-left: 0.2rem;
}

.loadbtn {
  margin-top: 0.15rem;
  text-align: center;
}

.btn {
  text-align: center;
  margin-top: 0.1rem;
}

.btn .el-button {
  padding: 0.05rem 0.1rem;
}

.downImg {
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
  color: #99c9fa;
}

.downImg /deep/ .el-input {
  width: 1.8rem !important;
}

.downImg /deep/ .el-checkbox__label {
  color: #99c9fa;
  margin-right: 0.1rem;
}

.placeDown {
  width: 0.9rem;
  height: 0.25rem;
  padding-left: 0.1rem;
}

.taskImg {
  color: #99c9fa;
}

.taskImg div {
  margin-bottom: 0.2rem;
}

.el-dialog__wrapper /deep/ .el-dialog {
  min-width: 0rem;
}

.taskrelation ul {
  overflow: auto;
  color: #99c9fa;
  height: 3.9rem;
}

.taskrelation ul li {
  margin-bottom: 0.15rem;
}

.taskrelation ul li span {
  margin-right: 0.3rem;
}

.taskrelation ul li span:last-child {
  text-decoration: underline;
  cursor: pointer;
}

.el-pagination {
  text-align: right;
  margin-top: 0.15rem;
}

.searchimg /deep/ .el-button:active {
  color: #fff;
  border-color: transparent;
}

.style-top {
  margin-top: 0.05rem;
}

.searchbutton .style-left {
  margin-left: 0rem;
}
.infoItem {
  /* width: 30%; */
  height: 5.2rem;
  border: 0.01rem solid red;
}
.gs-info {
  position: relative;
  height: 100%;
}
.currentInfo {
  width: 3rem;
  margin-left: 0.1rem;
}
#searchsmallImg {
  position: relative;
}
#searchsmallImg img {
  position: relative;
}
#searchsmallImg .wh {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
