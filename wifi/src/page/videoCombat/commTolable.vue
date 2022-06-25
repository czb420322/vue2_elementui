<!--
 * @Author: your name
 * @Date: 2019-12-06 10:43:56
 * @LastEditTime: 2020-04-03 17:44:44
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\videoCombat\commTolable.vue
 -->
<template>
 <div class="commtolable">
    <div class="topInfo">
        <img src="../../assets/updataImg/location.png" alt="">
        <span class="sysname childname">当前位置：</span>
        <router-link class="sysname" :to="{path:'/videoCombat',query:{menuCode:100}}">视频侦查> </router-link>
        <p class="sysname">&nbsp;标注池</p>
    </div>
    <div class="main">

      <div class="comm_left">
          <p class="titles"><b>|</b>&nbsp;&nbsp;目标标注池</p>
          <el-row>
            <el-col :span="15">
              <div>
                <span>时间 :&nbsp;</span>
                <input type="text" v-model="beginData" readonly id="text3" placeholder="请输入开始时间"> - <input type="text" readonly v-model="endData" id="text4" placeholder="请输入结束时间">
              </div>
            </el-col>
            <el-col :span="9">
              <!-- <div> -->
                <span>关键字 :&nbsp;</span>
                <input type="text" v-model="keyword" placeholder="请输入查询关键字">
                <el-button class="el-icon-search searchBtn" @click="getAllMarker(typeId)">&nbsp;&nbsp;查询</el-button>
              <!-- </div> -->
            </el-col>
          </el-row>

          <div class="comm_main">
             <ul>
              <li v-for="(item,index) in commLabeList" @mouseover="getInfo(item,$event)" @mouseout="goout" :key='index'>
                <div class="comm_top" :id="'markLi'+index">
                  <b title="删除标注" @click.stop="dellable(item,index)" class="none">
                    <img src="../../assets/images/videoNewImg/commhand/delete.png"  alt="">
                  </b>
                  <b  @click.stop.self="playFlvVideo(item,index)" class="play none"></b>
                  <span :id="'img_'+index" class="boderShow"></span>
                  <img :src="item.videoCaptureUrl" alt="" v-show="showfalse" :id="'marker_'+index" :class="imgListWH[index]" :onerror="$store.state.defaultImg" >
                </div>

                <div class="comm_bottom">
                  <span>标注名称 :&nbsp;{{item.markName}}</span>
                  <span>时间 :&nbsp;{{item.createTime}}</span>
                  <span>位置 :&nbsp;{{(item.deviceName == null || item.deviceName == '')  ? '未知': item.deviceName}}</span>
                  <i @click.stop.self="ClickCheckd(index)" class="checkbox" :class="Checkd[index].state ? 'ONimg' : 'OFFimg'"></i>
                  <el-button v-show="nowIndex == 1" class="searchBtn" @click="relevanceOne(item)">关联</el-button>
                </div>
              </li>
            </ul>
          </div>
           <el-pagination
              @size-change="handleSizeChange"
              small
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[12, 24, 36]"
              :page-size="pageSize"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount">
            </el-pagination>

        </div>
        <div class="comm_right">
          <p class="titles"><b>|</b>&nbsp;&nbsp;案件信息</p>
          <div class="comm_cen">
            <p><b>|</b>&nbsp;案件选择</p>
            <p class="comm_cen_t">
              <span @click="toggleTab(0)" :class="{ONactives:nowIndex == 0}">
              <img v-show="nowIndex == 0" src="../../assets/isON.png" alt="">
              <img v-show="nowIndex == 1" src="../../assets/isOFF.png" alt="">
               新增案件</span>
              <span @click="toggleTab(1)" :class="{ONactives:nowIndex == 1}">
              <img v-show="nowIndex == 1" src="../../assets/isON.png" alt="">
              <img v-show="nowIndex == 0" src="../../assets/isOFF.png" alt=""> 历史案件</span>
            </p>
          </div>

          <div class="comm_btn" v-show="nowIndex==0">
            <p><b>| </b>新增案件</p>
            <p>
              <span>案件编号&nbsp;:&nbsp;</span><input v-model="caseNumber"  @blur="getCaseNumber" type="text">
              <span class="mustText mustText0" v-show="caseNumberMust">该案件编号已存在<i></i></span>
            </p>
            <p class="comm_two">
              <span><b style="color:red">*</b>案件名称&nbsp;:&nbsp;</span>
              <input v-model="caseName" placeholder="请输入案件名称" type="text">
              <i title="先选择案发时间" @click="fastToName"></i>
              <span class="mustText mustText1" v-show="caseNameMust">案件名称为必填项<i></i></span>
            </p>
            <p class="caseTime">
              <span><b style="color:red">*</b>案发时间&nbsp;:&nbsp;</span>
               <el-input type="text" id="text1" readonly class="searchInput searchtime" v-model="beginTime" placeholder="请输入开始时间"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
              </el-input> -
              <el-input type="text" id="text2" readonly class="searchInput searchtime" v-model="endTime" placeholder="请输入结束时间"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
              </el-input>
              <span class="mustText mustText2" v-show='caseDateMust' style="width:2rem">案发开始时间为必填项<i></i></span>
            </p>
            <p>
              <span>案发区域&nbsp;:&nbsp;</span>
              <!-- <input type="text"> -->
              <province class="casearea" style="display:inline-block" ref='province'></province>
            </p>
            <p><span>案发详址&nbsp;:&nbsp;</span><input v-model="caseLocation" type="text"></p>
            <div>
              <p><span><b style="color:red">*</b>案件类型&nbsp;:&nbsp;</span>
                <el-select v-model="caseType" placeholder="请选择案件类型">
                  <el-option v-for="item in CaseType"  :key="item.value"  :label="item.value"  :value="item.value">
                  </el-option>
                </el-select>
                <span class="mustText mustText3" v-show="caseTypeMust">案发类型为必填项<i></i></span>
              </p>
              <p>
                <span>作案工具&nbsp;:&nbsp;</span>
                <el-select v-model="caseTool" placeholder="请选择作案工具">
                  <el-option v-for="item in CaseTool"  :key="item.value"  :label="item.value"  :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
            <div>
              <p><span>作案手段&nbsp;:&nbsp;</span>
                <el-select v-model="caseMeans" placeholder="请选择作案手段">
                  <el-option v-for="item in CaseMethod"  :key="item.value"  :label="item.value"  :value="item.value">
                  </el-option>
                </el-select></p>
              <p><span>作案时机&nbsp;:&nbsp;</span>
                <el-select v-model="caseOpportunity" placeholder="请选择作案时机">
                  <el-option v-for="item in CaseOpportunity"  :key="item.value"  :label="item.value"  :value="item.value">
                  </el-option>
                </el-select></p>
            </div>
            <div>
              <p><span>危害程度&nbsp;:&nbsp;</span>
                <el-select v-model="harm" placeholder="请选择危害程度">
                  <el-option v-for="item in CaseLevel"  :key="item.value"  :label="item.value"  :value="item.value">
                  </el-option>
                </el-select>
              </p>
              <p><span>侵犯目标&nbsp;:&nbsp;</span>
                <el-select v-model="target" placeholder="请选择侵犯目标">
                  <el-option v-for="item in CaseTarget"  :key="item.value"  :label="item.value"  :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
            <div>
              <span>案件描述&nbsp;:&nbsp;</span>
              <textarea v-model="caseDescribe" style="resize:none" placeholder="请输入案件描述"></textarea>
              <span class="mustText mustText4" v-show="caseDescribeLen">请输入少于500个字符<i></i></span>
            </div>
            <div class="btn">
              <span @click="reset"></span>
              <span @click="gonext"></span>

              <!-- <el-button @click="reset"></el-button>
              <el-button @click="gonext">生成案件</el-button> -->
            </div>
          </div>

          <div v-show="nowIndex==1" class="comm_footer">
            <div><b>| </b> 历史案件</div>
            <div class="comm_fone">
              <span>案件列表</span>
              <span>
                <input type="text" placeholder="请输入案件名称" v-model="ceseword">
                <el-button @click="getHisList()" class="el-icon-search searchBtn"></el-button>
              </span>
            </div>
            <div class="comm_table">
              <el-table :data="caseList" @row-click="checkTable" border style="width: 100%" height="1.87rem">
                 <div slot="empty">
                    <div class="noImg">
                      <img src="../../assets/updataImg/NoData.png" />
                    </div>
                  </div>
                <el-table-column label="编号" type='index' width="60">
                </el-table-column>
                <el-table-column label="案件名称" prop="caseName" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </div>
            <div class="comm_target comm_select">
              <p>案件名称&nbsp;:&nbsp;{{showCaseName}}</p>

              <span>嫌疑目标&nbsp;:&nbsp;</span>
              <span>
                <el-select v-model="casetarget" @change="getMarkList" placeholder="请选择嫌疑目标">
                  <el-option
                    v-for="item in optionsPerson"
                    :key="item.suspicionName"
                    :label="item.suspicionName"
                    :value="item">
                  </el-option>
                </el-select>
                <el-button class="el-icon-document searchBtn" @click="relevance">&nbsp;&nbsp;关联</el-button>
              </span>
            </div>
            <div class="comm_fone">
              <span style="color:#99c9fa">已标注池&nbsp;:&nbsp;</span>
              <span class="del_font" title="解除关联" @click="cancelMark"></span>
            </div>
            <div class="comm_marker">
               <ul>
                <li v-for="(item,index) in markList" @mouseover="getInfo(item.videoMark,$event)" @mouseout="goout" @click="delMarker(index)" :key="index">
                  <!-- <img v-show="item.videoMark != null" :src="item.videoMark != null ? item.videoMark.videoCaptureUrl : ''" :onerror="$store.state.defaultImg"  alt="">
                  <img v-show="item.videoSliceInfo != null" :src="item.videoSliceInfo != null ? item.videoSliceInfo.thumbnailStoragePath : '' " alt="" :onerror="$store.state.defaultImg">
                  <img v-show="item.videoSliceInfo == null && item.videoMark == null":src="item.traceImgUrl" alt="" :onerror="$store.state.defaultImg">
                  <b v-show="item.videoSliceInfo != null || item.videoMark != null" @click.stop.self="playsFlvVideo(item,index)" class="play"></b> -->

                  <div :id="'vmarkLi' + index">
                    <img v-show="item.videoMark != null" :src="item.videoMark != null ? item.videoMark.videoCaptureUrl : ''" :onerror="$store.state.defaultImg" :id="'vmarker_'+index" :class="ImgmarkList[index]">
                    <img v-show="item.videoSliceInfo != null" :src="item.videoSliceInfo != null ? item.videoSliceInfo.thumbnailStoragePath : '' " :onerror="$store.state.defaultImg" :id="'vsmarker_'+index" :class="ImgmarkList[index]">
                    <img v-show="item.videoSliceInfo == null && item.videoMark == null" :id="'tvmarker_' + index" :src="item.traceImgUrl" :onerror="$store.state.defaultImg" :class="ImgmarkList[index]">
                    <span :id="'vimg_'+index" class="boderShow"></span>
                    <b v-show="item.videoSliceInfo != null || item.videoMark != null" @click.stop.self="playsFlvVideo(item,index)" class="play"></b>
                  </div>
                  <p>
                    <span v-show="item.videoMark != null">标注名称 :&nbsp;{{item.videoMark != null ? item.videoMark.markName : ''}}</span>
                    <span v-show="item.videoMark == null && item.videoSliceInfo == null">标注名称 :&nbsp;{{item.markName}}</span>
                    <span v-show="item.videoSliceInfo != null">视频名称:&nbsp;{{item.videoSliceInfo != null ? item.videoSliceInfo.title : ''}}</span>
                    <span>时间 :&nbsp;{{item.createTime}}</span>
                    <span>位置:&nbsp;
                      {{item.deviceName}}
                    </span>
                    <i class="checkbox" :class="markerCheckd[index].state ? 'ONimg' : 'OFFimg'"></i>
                    <el-button class="searchBtn" @click="cancelMarkOne(item)">解除</el-button>
                  </p>
                </li>
              </ul>

              <!-- <ul>
                <li v-for="(item,index) in markList" @click="delMarker(index)">
                  <img v-show="item.videoMark != null" :src="item.videoMark != null ? item.videoMark.videoCaptureUrl : '' " alt="" :onerror="$store.state.defaultImg">
                  <img v-show="item.videoSliceInfo != null" :src="item.videoSliceInfo != null ? item.videoSliceInfo.thumbnailStoragePath : '' " alt="" :onerror="$store.state.defaultImg">
                  <img v-show="item.videoSliceInfo == null && item.videoMark == null":src="item.traceImgUrl" alt="" :onerror="$store.state.defaultImg">
                  <b @click.stop="playsFlvVideo(item,index)" class="play"></b>
                  <video @click.stop.self="bigs(index)" v-show="showSmallVideo[index].state" :id="'centerVideo'+index" loop crossorigin="*" style="width: 100%;height: 65%;"></video>
                  <p>
                    <span v-show="item.videoMark != null">标注名称 :&nbsp;{{item.videoMark != null ? item.videoMark.markName : ''}}</span>
                    <span v-show="item.videoSliceInfo != null">视频名称:&nbsp;{{item.videoSliceInfo != null ? item.videoSliceInfo.title : ''}}</span>
                    <span>时间 :&nbsp;{{item.createTime}}</span>
                      {{item.deviceName}}
                    </span>
                    <i class="checkbox" :class="markerCheckd[index].state ? 'ONimg' : 'OFFimg'"></i>
                    <el-button class="searchBtn" @click="cancelMarkOne(item)">解除</el-button>
                  </p>
                </li>
              </ul> -->
            </div>
          </div>
        </div>


    </div>

    <footer>
      <p>
        <img src="../../assets/logo.png"> 武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span>
      </p>
    </footer>



 </div>
</template>

<script>
import commlables from "../../api/newCaseVideo/commlable.js";
import beginEnd from "../../api/realvideo/BenEedTime.js"; //时间
import Province from '@/components/province';
import addcase from "../../api/realvideo/addcase.js";
import flvplay from '../../api/casestudy/flvPlay.js'  //播放器的flv的js
 export default {
   data () {
     return {

     }
   },
   mixins: [commlables,beginEnd,addcase,flvplay],
   components: {
     Province
   },
   mounted () {
      this.getAllMarker(this.typeId);
      this.toggleTab(0);
      this.OpenTheTime('#text1', '#text2');
      this.OpenTheTime2('#text3', '#text4');
   },
 }
</script>

<style scoped>
@import "../../assets/css/commom.css";
.commtolable {
  width: 100%;
  position: absolute;
  top: 0.6rem;
  bottom: 0px;
  left: 0px;
}
.main{
  padding: 0 0.5rem;
  padding-top: 0.2rem;
}
.comm_left{
  height: 100%;
  width: 60%;
  float: left;
  border: 1px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
}
.comm_right{
  height: 100%;
  width: 39%;
  margin-left: 61%;
  border: 1px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
}
.titles{
  line-height: 0.4rem;
  font-weight: 700;
  font-size: 0.15rem;
  padding-left: 0.1rem;
  background-color: rgba(20,57,96,0.8);
  color: #fff;
}
.el-row{
  margin-top: 0.1rem;
}
.el-col-15,.el-col-9
{
  padding-left: 0.2rem;
  color: #99c9fa;
}
.el-col-15 input{
  line-height: 0.3rem;
  border-radius: 3px;
  width: 1.5rem;
  padding-left: 0.1rem;
}

.el-col-9 input{
  width: 1.2rem;
  line-height: 0.3rem;
  border-radius: 3px;
  margin-right: 0.1rem;
  padding-left: 0.1rem;
}
.el-col-9 .el-button{
  padding: 0 0.2rem;
  height: 0.3rem;
}

.comm_main{
  height: 84%;
  padding: 0.1rem 0.15rem;
}
.comm_main ul{
  width: 100%;
  height: 100%;
  overflow: auto;
}
.comm_main ul li{
  border: 2px solid #102d50;
  height: 1.9rem;
  float: left;
  width: 24%;
  position: relative;
  margin-bottom: 0.1rem;
  margin-right: 1%;
  overflow: hidden;
}
.none {
  display: none;
}
.comm_main ul li:hover .none{
  display: block;
}
.comm_main ul li b{
  position: absolute;
  right: 0;
  top: 0;
  width: 0.25rem;
  height: 0.25rem;
  font-size: 0.16rem;
  z-index: 4;
  color: red;
}
.comm_main ul li b img{
  position: absolute;
  top: 0;
  left: 0;
}
.comm_main ul li video,
.comm_marker ul li video{
  position: absolute;
  top:0;
  left: 0;
  z-index: 3;
}
.comm_main li .play,
.comm_marker li .play{
  position: absolute;
  width: 0.25rem;
  height: 0.25rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: url('../../assets/images/videoNewImg/commhand/play_button.png') no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  z-index: 3;
}
/* .comm_main ul li img{
  width: 100%;
  height: 100%;
} */
.comm_main ul li .comm_bottom{
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: rgba(14, 39, 70, 0.52);
  color: #dcdfe0;
  font-size: 0.12rem;
  padding:0.05rem 0.05rem;
}
.comm_main ul li .comm_bottom i{
  position: absolute;
  width: 0.15rem;
  height: 0.15rem;
  bottom: 0.05rem;
  right: 0.05rem;
}
.comm_main ul li .comm_bottom span{
  display: block;
  width: 100%;
  line-height: 0.17rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.comm_top{
  width: 2.5rem;
  height: 1.3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.comm_top img{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.comm_top .width{
  width: 100%;
}
.comm_top .height{
  height: 100%;
}
.ONimg{
  background:url('../../assets/ImgCheckdON.png') no-repeat center center;
  background-size:100% 100%;
}
.OFFimg{
  background:url('../../assets/ImgCheckdOFF.png') no-repeat center center;
  background-size:100% 100%;
}
.comm_cen p:first-child,
.comm_footer >div:first-child{
  line-height: 0.3rem;
  padding-left: 0.2rem;
  color: #fff;
  font-size: 0.14rem;
}
.comm_cen p:last-child{
  line-height: 0.4rem;
  display: flex;
  color: #99c9fa;
}
.comm_cen p:last-child span{
  flex: 1;
  text-align: center;
  cursor: pointer;
}

.comm_cen_t img{
  vertical-align: sub;
}
.ONactives{
  color: #58a9ff;
}
.comm_btn{
  padding-left: 0.2rem;
}
.comm_btn > p,
.comm_btn > div{
  width: 100%;
  margin-bottom: 0.1rem;
  color: #99c9fa;
  position: relative;
}
.comm_btn > p:first-child{
  color: #fff;
  line-height: 0.3rem;
}
.comm_btn > p span,
.comm_btn > div span{
  display: inline-block;
  width: 0.9rem;
  text-align: right;
  font-size: 0.14rem;
}
.comm_btn > p input,
.comm_btn > div .el-select{
  line-height: 0.3rem;
  border-radius: 3px;
  width: calc(100% - 1rem);
  padding-left: 0.1rem;
}
.comm_btn .comm_two input{
  width: calc(100% - 1.4rem);
}
.comm_two i{
  display: inline-block;
  width: 0.3rem;
  height: 0.3rem;
  vertical-align: top;
  background: url('../../assets/images/videoNewImg/commhand/fastnormal.png') no-repeat center center;
  background-size:100% 100%;
}
.comm_two i:hover{
  background: url('../../assets/images/videoNewImg/commhand/fasthover.png') no-repeat center center;
  background-size:100% 100%;
}

.comm_main li .el-button,
.comm_marker li .el-button{
  position: absolute;
  bottom: 0.05rem;
  right: 0.3rem;
  font-size: 0.1rem !important;
  padding: 0.02rem 0.03rem !important;
}
.comm_marker li .el-button{
  bottom: 0.02rem;
}

.searchInput {
  line-height: 0.3rem;
  width: 1.6rem;
  border-radius: 3px;
}
.comm_btn > div .el-select >>> .el-input__inner{
  height: 0.3rem;
  font-size: 0.14rem;
}
.comm_btn > div{
  display: flex;
}
.comm_btn > div p{
  width: 100%;
  flex: 1;
}
.comm_btn > div textarea{
  width: calc(100% - 1rem);
  height: 0.5rem;
  padding-left: 0.1rem;
  background: transparent;
  border: 1px solid #2A2D30 !important;
}
.el-pagination{
  width: 100%;
  overflow: hidden;
  text-align: right;
}
.btn{
  padding-left: 0.9rem;
}
.btn span{
  display: inline-block;
  width: 0.8rem;
  height: 0.28rem;
  cursor: pointer;

}
.btn span:first-child{
  margin-right: 0.1rem;
  background: url('../../assets/images/videoNewImg/commhand/searchnormal.png') no-repeat center center;
  background-size:100% 100%;
}
.btn span:first-child:hover{
    background: url('../../assets/images/videoNewImg/commhand/searchhover.png') no-repeat center center;
    background-size:100% 100%;
}
.btn span:last-child{
  background: url('../../assets/images/videoNewImg/commhand/casenormal.png') no-repeat center center;
  background-size:100% 100%;
}
.btn span:last-child:hover{
  background: url('../../assets/images/videoNewImg/commhand/casehover.png') no-repeat center center;
  background-size:100% 100%;
}
.comm_btn .caseTime input{
  width: 1.85rem;
}
.casearea /deep/ .province{
  width: 1.1rem !important;
  color: #99c9fa;
  background: transparent;
  border: 1px solid #2A2D30 !important;
}
.casearea /deep/ .province >>> .el-input__inner{
  height: 0.3rem;
  font-size: 0.14rem;
}

.comm_btn .mustText{
  width: 1.5rem !important;
  background: red;
  position: absolute;
  top:0;
  height: 100%;
  color: white !important;
  font-size: 0.14rem;
  line-height: 0.3rem;
  text-align: center;
  z-index: 9999;
  text-align: center;
}
.mustText i{
  display: block;
  height: 0.1rem;
  width: 0.1rem;
  background: red;
  position: absolute;
  left: -0.05rem;
  top:0;
  bottom: 0;
  margin: auto;
  transform: rotateZ(45deg);
  -moz-transform: rotateZ(45deg);
  -webkit-transform: rotateZ(45deg);
}
.mustText1,
.mustText0{
  right: 0.46rem;
}


/* .comm_footer div{
  border: 1px solid red;
} */

.comm_footer .comm_fone{
  padding-left: 0.25rem;
  padding-right: 0.1rem;
}


.comm_footer .comm_table{
  margin: 0.05rem 0.1rem;
}
.comm_footer .comm_fone{
  display: flex;
  color: #409eff;
  line-height: 0.3rem;
}
.comm_target p{
  color: #409eff;
}
.comm_target{
  padding-left: 0.25rem;
  color: #99c9fa;
}
.comm_target .el-button{
  padding: 0 0.1rem;
  line-height: 0.23rem;
}

.comm_footer .comm_fone span{
  flex: 1;
}
.comm_footer .comm_fone input{
  line-height: 0.3rem;
  border-radius: 3px;
  padding-left: 0.1rem;
  width: 1.5rem;
}
.comm_footer .comm_fone .el-button{
  padding: 0 0.1rem;
  height: 0.3rem;
}
.comm_footer .comm_fone span:last-child{
  text-align: right;
}
.el-table /deep/ th{
  padding: 0.05rem
}
.el-table /deep/ td{
  padding: 0.02rem 0;
}
.comm_footer .comm_select .el-select{
  width: 2.6rem;
  padding: 0;
  line-height: 0.25rem;
}
.comm_footer .comm_select .el-select >>> .el-input__inner{
  height: 0.25rem;
}
.comm_marker{
  padding:0 0.1rem;
  height: 2.8rem;
  overflow: auto;
}
.comm_marker li{
  float: left;
  width: 32%;
  height: 1.4rem;
  margin-right: 1%;
  margin-bottom: 0.05rem;
  position: relative;
  overflow: hidden;
}
.comm_marker li div{
  height: 1rem;
  width: 2.17rem;
  position: relative;
}
.comm_marker li img{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.comm_marker .width{
  width: 100%;
}
.comm_marker .height{
  height: 100%;
}

.comm_marker li p{
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  font-size: 0.12rem;
  /* background-color: yellow; */
  background-color: rgba(14, 39, 70, 0.52);
}
.comm_marker li p span{
  color: #dcdfe0;
  display: block;
  width: 100%;
  white-space: nowrap;
  line-height: 0.16rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
.comm_marker ul li p i{
  position: absolute;
  width: 0.13rem;
  height: 0.13rem;
  bottom: 0.03rem;
  right: 0.03rem;
}
.el-dialog__wrapper >>> .el-dialog{
  margin-top:5vh!important;
}
.del_font{
  cursor: pointer;
  background: url('../../assets/images/videoNewImg/commhand/delnormal.png') no-repeat center center;
}
.del_font:hover{
  background: url('../../assets/images/videoNewImg/commhand/delhover.png') no-repeat center center;
}
.noImg{
  width: 1.1rem;
  height: 0.85rem;
}
.boderShow{
  position: absolute;
  z-index: 2;
}
</style>
