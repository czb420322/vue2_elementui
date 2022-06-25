<!--
 * @Author: your name
 * @Date: 2020-04-02 14:54:31
 * @LastEditTime : 2020-12-16 14:03:42
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\casestudy\addcaseInfo\searchImg.vue
 -->
<template>
  <!-- 以图搜图 -->
  <div class="searchimgs" v-show="openSearchImg" ref="searchImgs">
    <div class="searchtitle">
      <span>|&nbsp;&nbsp;以车搜车</span>
      <span class="el-icon-close" @click="closesearimgs"></span>
    </div>

    <div class="searchs" v-if="openSearchImg">
      <div @click="dialogVisible = true" id="searchsmallImg">
        <img v-if="!showfaceimg" :src="feacthImg" alt id="imgUrlShow">
        <img v-if="showfaceimg" :src="feacthImg" alt id="smallImg" class="wh">
        <span class="el-icon-plus" title="点击打开上传图片"></span>
        <span class="el-icon-plus big" v-show="feacthImg != '' || feacthImg != null" title="上传图片"></span>
      </div>
    </div>
    <div class="searchtime">
      <span>开始时间：</span>
      <input
        v-if="openSearchImg"
        readonly
        type="text"
        id="beginMark"
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
        id="endMark"
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
    <!-- <div v-if="false" class="searchtime">
      <span>电围感应距离：</span>
      <el-input v-model="range"></el-input>米
      <span style="font-size:12px;color:red">（提示：电围感应距离范围内，
        存在1个或者多个探头（取拍照时
        间最近的探头）时，即视为该电围
        与探头重合）</span>
    </div>-->
    <div class="searchbutton">
      <el-button class="searchBtn" v-no-more-click @click="beginSearch">开始</el-button>
      <el-button class="searchBtn" v-no-more-click @click="resetSearch()">重置</el-button>
      <el-button class="searchBtn" v-no-more-click @click="drawArea()">范围</el-button>

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
      <div class="searchimgload" v-if="openSearchImg" @click="choiceCar($event)">
        <p class="loadtitle">|&nbsp; &nbsp;图片源</p>
        <div class="searchmain" id="searchcarmain">
          <img v-show="imgPicInquire" :src="bigsearchimg" alt id="searchBigcarimg">
          <canvas id="searchcarcanvas"></canvas>
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
  </div>
</template>

<script>
import scale from "../../../api/common/scale.js";
//引入相对应的js
import beginEnd from "../../../api/realvideo/BenEedTime.js"; //时间插件的引入
import searchCarimgjs from "../../../api/casestudy/searchCarImg.js";

export default {
  mixins: [searchCarimgjs,beginEnd],
  mounted() {
  }
};
</script>
<style scoped>
@import "../../../assets/css/commom.css";
.searchimgs {
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

.searchimgs /deep/ .el-button:active {
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
#searchsmallImg{
    position: relative;
}
#searchsmallImg img{
    position: relative;
}
#searchsmallImg .wh {
    position: absolute;
    margin:auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
