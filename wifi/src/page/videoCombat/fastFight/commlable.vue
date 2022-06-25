<template>
  <div>
    <el-dialog title="标注池" ref="" :visible.sync="dialogVisible" :close-on-press-escape="false"
    :close-on-click-modal="false" width="70%" @close="closeDia" @open="openDialog">
      <div style="height:7.5rem; position: relative;">
        <div class="comm_left">
              <p class="titles"><b>|</b>&nbsp;标注池
          <!-- <span v-text="ImgmarkList"></span> -->
          </p>
          <el-row>
             <el-col :span="7.5">
              <span>关键字 :&nbsp;</span>
              <input type="text" style="height:28px;padding-left:5px" v-model="keyword" placeholder="请输入关键字">
            </el-col>
            <el-col :span="16.5">
              <div>
                <span>时间 :&nbsp;</span>
                <el-input type="text" v-model="beginData" class="searchInput searchtime" readonly id="text3" placeholder="请选择开始时间"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
                </el-input>  -
                <el-input type="text" readonly v-model="endData" class="searchInput searchtime" id="text4" placeholder="请选择结束时间"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
                </el-input>
                <el-button class="el-icon-search searchBtn" @click="currentPage = 1;getAllMarker(typeId)">&nbsp;&nbsp;查询</el-button>
                <el-button class="el-icon-refresh tryBtn" @click="resetMarker(typeId)">&nbsp;&nbsp;重置</el-button>
              </div>
            </el-col>
          </el-row>
          <div class="comm_main">
            <ul>
              <li v-for="(item,index) in commLabeList" @mouseover="getInfo(item,$event)" @mouseout="goout" :key='index'>
                <div class="comm_top">
                  <b title="删除标注" @click.stop="dellable(item,index)" class="none">
                    <img src="../../../assets/images/videoNewImg/commhand/delete.png"  alt="">
                  </b>
                  <b  @click.stop.self="playFlvVideo(item,index)"  class="play none"></b>
                  <span :id="'img_'+index" class="boderShow"></span>
                  <img :src="item.videoCaptureUrl" alt="" :class="{markNoBorder:index == shownowIndex}" class="imgbox" @load="imgscale('.imgbox')" :onerror="$store.state.defaultImg">
                </div>
                <div class="comm_bottom">
                  <span :title="item.markName">标注名称 :&nbsp;{{item.markName}}</span>
                  <span :title="item.startTime">日期 :&nbsp;{{item.startTime}}</span>
                  <span class="comm_draw" :title="(item.deviceName == null || item.deviceName == '')  ? '未知': item.deviceName" >
                    位置 :&nbsp;{{(item.deviceName == null || item.deviceName == '')  ? '未知': item.deviceName}}</span>
                  <i @click.stop.self="updateLable(item)" class="checkbox el-icon-edit upimg" title="修改标注"></i>
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
        <handword :showhandword="showhandword" :isonline='false' @childbyHandwork="childbyHandwork"></handword>
        <div class="comm_right">
          <p class="titles"><b>|</b> 案件信息</p>
          <!-- <div class="comm_cen">
            <p><b>|</b>&nbsp;案件选择</p>
            <p class="comm_cen_t">
              <span @click="toggleTab(0)" :class="{ONactives:nowIndex == 0}">
              <img v-show="nowIndex == 0" src="../../../assets/isON.png" alt="">
              <img v-show="nowIndex == 1" src="../../../assets/isOFF.png" alt="">
               新增案件</span>
              <span @click="toggleTab(1)" :class="{ONactives:nowIndex == 1}">
              <img v-show="nowIndex == 1" src="../../../assets/isON.png" alt="">
              <img v-show="nowIndex == 0" src="../../../assets/isOFF.png" alt=""> 历史案件</span>
            </p>
          </div> -->

          <div class="comm_btn" v-show="nowIndex==0">
            <p><b>| </b>新增案件</p>
            <p>
              <span>&nbsp;案件编号&nbsp;:&nbsp;</span><input maxlength="30" v-model="caseNumber" @blur="getCaseNumber" type="text">
              <span class="mustText mustText0" v-show="caseNumberMust">该案件编号已存在<i></i></span>
            </p>
            <p class="comm_two">
              <span><b style="color:red">*</b>案件名称&nbsp;:&nbsp;</span>
              <input v-model="caseName" maxlength="100" placeholder="请输入案件名称" type="text">
              <i title="先选择案发时间、案件类型、危害程度，再点击按钮可生成案件名称" @click="fastToName"></i>
              <span class="mustText mustText1" v-show="caseNameMust">案件名称为必填项<i></i></span>
            </p>
            <p class="caseTime" v-if="dialogVisible">
              <span><b style="color:red">*</b>案发时间&nbsp;:&nbsp;</span>
                <el-input type="text" id="text1" readonly class="searchInput searchtime" v-model="beginTime" placeholder="请输入开始时间"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
                </el-input> -
                <el-input type="text" id="text2" readonly class="searchInput searchtime" v-model="endTime" placeholder="请输入结束时间"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
                </el-input>
              <span class="mustText mustText2" v-show='caseDateMust' style="width:2rem">案发开始时间为必填项<i></i></span>
            </p>
            <p>
              <span>&nbsp;案发区域&nbsp;:&nbsp;</span>
              <!-- <input type="text"> -->
              <province class="casearea" style="display:inline-block" ref='province'></province>
            </p>
            <p><span>&nbsp;案发详址&nbsp;:&nbsp;</span><input v-model="caseLocation" type="text"></p>
            <div>
              <p><span><b style="color:red">*</b>案件类型&nbsp;:&nbsp;</span>
                <el-select v-model="caseType" placeholder="请选择案件类型">
                  <el-option v-for="item in CaseType"  :key="item.value"  :label="item.value"  :value="item.value">
                  </el-option>
                </el-select>
                <span class="mustText mustText3" v-show="caseTypeMust">案发类型为必填项<i></i></span>
              </p>
              <p>
                <span>&nbsp;作案工具&nbsp;:&nbsp;</span>
                <el-select v-model="caseTool" placeholder="请选择作案工具">
                  <el-option  value="" label=""></el-option>
                  <el-option v-for="item in CaseTool"  :key="item.value"  :label="item.value"  :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
            <div>
              <p><span>&nbsp;作案手段&nbsp;:&nbsp;</span>
                <el-select v-model="caseMeans" placeholder="请选择作案手段">
                  <el-option  value="" label=""></el-option>
                  <el-option v-for="item in CaseMethod"  :key="item.value"  :label="item.value"  :value="item.value">
                  </el-option>
                </el-select></p>
              <p><span>&nbsp;作案时机&nbsp;:&nbsp;</span>
                <el-select v-model="caseOpportunity" placeholder="请选择作案时机">
                  <el-option  value="" label=""></el-option>
                  <el-option v-for="item in CaseOpportunity"  :key="item.value"  :label="item.value"  :value="item.value">
                  </el-option>
                </el-select></p>
            </div>
            <div>
              <p><span>&nbsp;危害程度&nbsp;:&nbsp;</span>
                <el-select v-model="harm" placeholder="请选择危害程度">
                  <el-option  value="" label=""></el-option>
                  <el-option v-for="item in CaseLevel"  :key="item.value"  :label="item.value"  :value="item.value">
                  </el-option>
                </el-select>
              </p>
              <p><span>&nbsp;侵犯目标&nbsp;:&nbsp;</span>
                <el-select v-model="target" placeholder="请选择侵犯目标">
                  <el-option  value="" label=""></el-option>
                  <el-option v-for="item in CaseTarget"  :key="item.value"  :label="item.value"  :value="item.value">
                  </el-option>
                </el-select>
              </p>
            </div>
            <div>
              <span>&nbsp;案件描述&nbsp;:&nbsp;</span>
              <textarea v-model="caseDescribe" maxlength="500" style="resize:none" placeholder="请输入案件描述"></textarea>
            </div>
            <div class="btn">
              <span title="重置信息" @click="reset"></span>
              <span title="快速生成案件" @click="gonext"></span>
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
                    <img src="../../../assets/updataImg/NoData.png" />
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
              <p class="comm_case_info"><span>案件名称&nbsp;:&nbsp;</span><span>{{showCaseName}}</span></p>
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
              <span style="color:#99c9fa">已关联标注池&nbsp;:&nbsp;</span>
              <span class="del_font" title="解除关联" @click="cancelMark"></span>
            </div>
            <div class="comm_marker">
              <ul>
                <li v-for="(item,index) in markList" @click="delMarker(index)"  @mouseover="getInfo(item.videoMark,$event)" @mouseout="goout" :key="index">
                  <div :id="'vmarkLi' + index">
                    <img v-show="item.videoMark != null" class="imgsmallbox" @load="imgscale('.imgsmallbox')" :src="item.videoMark != null ? item.videoMark.videoCaptureUrl : ''" :onerror="$store.state.defaultImg" >
                    <img v-show="item.videoSliceInfo != null" class="imgsmallbox" @load="imgscale('.imgsmallbox')" :src="item.videoSliceInfo != null ? item.videoSliceInfo.thumbnailStoragePath : '' " :onerror="$store.state.defaultImg" >
                    <img v-show="item.videoSliceInfo == null  && item.videoMark == null" class="imgsmallbox" @load="imgscale('.imgsmallbox')" :src="item.traceImgUrl" :onerror="$store.state.defaultImg" >
                    <span :id="'vimg_'+index" class="boderShow"></span>
                    <b v-show="item.videoSliceInfo != null || item.videoMark != null" @click.stop.self="playsFlvVideo(item,index)" class="play none"></b>
                  </div>
                  <p>
                    <span v-show="item.videoMark != null">标注名称 :&nbsp;{{item.videoMark != null ? item.videoMark.markName : ''}}</span>
                    <span v-show="item.videoMark == null && item.videoSliceInfo == null">标注名称 :&nbsp;{{item.markName}}</span>
                    <span v-show="item.videoSliceInfo != null">视频名称:&nbsp;{{item.videoSliceInfo != null ? item.videoSliceInfo.title : ''}}</span>
                    <span>时间 :&nbsp;{{item.videoMark.startTime}}</span>
                    <span>位置:&nbsp;
                      {{item.deviceName}}
                    </span>
                    <i class="checkbox" :class="markerCheckd[index].state ? 'ONimg' : 'OFFimg'"></i>
                    <el-button class="searchBtn" @click="cancelMarkOne(item)">解除</el-button>
                  </p>
                </li>
              </ul>
            </div>
          </div>


        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="dialogVisible = false">关 闭</el-button>
        <!-- <el-button @click="dialogVisible = false"></el-button>
        <el-button @click="dialogVisible = false"></el-button> -->
      </span>
    </el-dialog>
     <!-- 10秒视频弹层-->
     <!--<el-dialog title="视频播放" ref="" :visible.sync="videoDialogVisible" width="50%">
      <Ceshi :videoUrl="videoUrl"></Ceshi>
    </el-dialog>-->
  </div>
</template>


<script>
import commlables from "../../../api/newCaseVideo/commlable.js";
import beginEnd from "../../../api/realvideo/BenEedTime.js"; //时间
import Province from '@/components/province';
import addcase from "../../../api/realvideo/addcase.js";
import flvplay from '../../../api/casestudy/flvPlay.js'  //播放器的flv的js
import { mapActions,mapMutations, mapState,mapGetters } from 'vuex'
import handword from './handworkLable'
import scale from '../../../api/common/scale'
// import imageWh from "../../../api/realvideo/ImageWH.js"; //时间

export default {
  data() {
    return {
      dialogVisible:false,
    };
  },
  mounted() {},
  mixins: [commlables,beginEnd,addcase,flvplay,scale],
  watch: {
    showcommlable(val) {
      this.dialogVisible = val
    }
  },
  props: {
    showcommlable: Boolean
  },
  computed:{
    ...mapGetters([
      'ishandupdate',
      'gethanlabel',
      'lableInfo'
    ]),
  },
  methods: {
     ...mapActions([
       'toggleHandLable',
       'toggleHandfalse'
      ]),
      ...mapMutations([
        'updatehanlabel',
        'setshowInfo', //设置结构化信息显示和隐藏
        'setshowInfoMan', ////结构化信息的类型  人车骑车人
        'setlableInfo',//设置结构化信息
        'setlableInfoMan',//设置结构化信息
        'setisupdatejudged'
      ]),
    //关闭模态框
    closeDia(){
      let title = document.title + ".";
      this.$emit("childbyCommLable", false, title);
      this.beginTime = ''
      this.endTime = ''
      this.beginData = ''
      this.endData = ''
      this.reset();
      this.identifying = 0
      this.pageSize = 12
      this.setshowInfo(false)
    },
  },
  components:{
    Province,handword,
  }
};
</script>

<style scoped>
@import "../../../assets/css/commom.css";
.main_video{
  position: absolute;
  width: 4rem;
  height: 2.25rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 2;
  border: 1px solid rgba(16, 45, 78, 0.8);
  background-color: rgba(4, 18, 36, 0.8)
}
.main_video video{
  width: 100%;
  height: 100%;
}
.main_video img{
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
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
.el-col-12
{
  padding-left: 0.1rem;
  color: #99c9fa;
}
.el-col-12 input{
  line-height: 0.25rem;
  border-radius: 3px;
  width: 1.5rem;
  padding-left: 0.1rem;
}

/* .el-col-9 input{
  width: 1.2rem;
  line-height: 0.25rem;
  border-radius: 3px;
  margin-right: 0.1rem;
  padding-left: 0.1rem;
} */

.comm_main{
  height: 84%;
  padding: 0.1rem 0.15rem;
}
.comm_top{
  width: 1.75rem;
  height: 1.26rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
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
/* .comm_main ul li video,
.comm_marker ul li video{
  position: absolute;
  top:0;
  left: 0;
  z-index: 3;
} */
.comm_main li .play,
.comm_marker li .play{
  position: absolute;
  width: 0.25rem;
  height: 0.25rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: url('../../../assets/images/videoNewImg/commhand/play_button.png') no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  z-index: 3;
}

.comm_main ul li .comm_bottom{
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: rgba(14, 39, 70, 0.52);
  color: #dcdfe0;
  font-size: 0.12rem;
  height: 0.62rem;
  padding: 0.05rem 0.05rem;
  cursor: pointer;
}
.comm_main ul li .comm_bottom i{
  position: absolute;
  width: 0.15rem;
  height: 0.15rem;
  bottom: 0.05rem;
  right: 0.05rem;
}
.comm_main  .comm_bottom .upimg{
  right: 0.25rem;
  cursor: pointer;
  color: #409eff;
  text-align: center;
  line-height: 0.15rem;
}
.comm_main ul li .comm_bottom span{
  display: block;
  width: 1.5rem;
  line-height: 0.18rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.comm_main ul li .comm_bottom .comm_draw{
  display: block;
  width: 1.2rem;
  line-height: 0.18rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.comm_main li .el-button,
.comm_marker li .el-button{
  position: absolute;
  bottom: 0.05rem;
  right: 0.3rem;
  font-size: 0.1rem !important;
  padding: 0.01rem 0.03rem !important;
}
.comm_main li .el-button{
  right: 0.48rem;
}
.comm_marker li .el-button{
  bottom: 0.02rem;
}
.ONimg{
  background:url(../../../assets/ImgCheckdON.png) no-repeat center center;
  background-size:100% 100%;
}
.OFFimg{
  background:url(../../../assets/ImgCheckdOFF.png) no-repeat center center;
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
  width: 0.8rem;
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
  background: url('../../../assets/images/videoNewImg/commhand/fastnormal.png') no-repeat center center;
  background-size:100% 100%;
}
.comm_two i:hover{
  background: url('../../../assets/images/videoNewImg/commhand/fasthover.png') no-repeat center center;
  background-size:100% 100%;
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
.searchInput {
  line-height: 0.3rem;
  width: 1.7rem;
  border-radius: 3px;
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
  background: url('../../../assets/images/videoNewImg/commhand/searchnormal.png') no-repeat center center;
  background-size:100% 100%;
}
.btn span:first-child:hover{
    background: url('../../../assets/images/videoNewImg/commhand/searchhover.png') no-repeat center center;
    background-size:100% 100%;
}
.btn span:last-child{
  background: url('../../../assets/images/videoNewImg/commhand/casenormal.png') no-repeat center center;
  background-size:100% 100%;
}
.btn span:last-child:hover{
  background: url('../../../assets/images/videoNewImg/commhand/casehover.png') no-repeat center center;
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
.comm_btn .mustText0{
  right: 0.2rem;
}
.comm_btn .mustText1{
  right: 0.57rem;
}
.comm_btn .mustText2{
  right: 0.91rem;
}
.searchInput {
  line-height: 0.3rem;
  width: 1.6rem;
  border-radius: 3px;
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
  justify-content: flex-start;
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

.comm_footer .comm_fone input{
  line-height: 0.25rem;
  border-radius: 3px;
  padding-left: 0.1rem;
  width: 1.5rem;
}
.comm_footer .comm_fone span:last-child{
  width: 0.3rem;
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
  border: 1px solid #102d50;
  overflow: hidden;
}
.comm_marker li div{
  height: 0.9rem;
  width: 1.52rem;
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
.comm_marker ul li:hover .none{
  display: block;
}

.comm_marker li div .width{
  width: 100%;
}
.comm_marker li div .height{
  height: 100%;
}



.comm_marker li p{
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  font-size: 0.12rem;
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
  background: url('../../../assets/images/videoNewImg/commhand/delnormal.png') no-repeat center center;
}
.del_font:hover{
  background: url('../../../assets/images/videoNewImg/commhand/delhover.png') no-repeat center center;
}
.noImg{
  width: 0.95rem;
  height: 0.78rem;
}
.boderShow{
  position: absolute;
  z-index: 2;
}
.comm_case_info span:first-child{
  display: inline-block;
  width: 0.8rem;
  overflow: hidden;
}
.comm_case_info span:last-child{
  display: inline-block;
  width: calc(100% - 1.1rem);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fs18 {
  font-size: .16rem;
}
.markNoBorder{
  border: 1px solid #409eff!important;
}
</style>
