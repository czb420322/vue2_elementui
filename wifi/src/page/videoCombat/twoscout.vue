<!--
 * @Author: your name
 * @Date: 2019-12-06 10:43:56
 * @LastEditTime : 2020-11-02 14:50:19
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\videoCombat\twoscout.vue
 -->
<template>
 <div class="caseinfo">
    <!-- 头部选项卡 -->
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt="">
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/videoCombat',query:{menuCode:100}}">视频侦查> </router-link>
      <p class="sysname">&nbsp;协同侦查</p>
    </div>
    <!-- 案件基本信息录入 -->
    <div class="main">
      <div class="centermain">
        <p class="maintile"> <span>1.</span>&nbsp;&nbsp;基本信息</p>
        <div class="mainchars">
          <div class="main_top">
              <div class="main_tleft">
                <p><span>|&nbsp;&nbsp;</span>案件基本信息录入</p>
                <ul class="mainInfo">
                  <li>
                    <span> 案件编号：</span>
                    <input type="text" v-model="caseNumber" @blur="getCaseNumber" maxlength="32" placeholder="请输入案件编号">
                    <div class="mustText mustText0" v-show="caseNumberMust">该案件编号已存在<i></i></div>
                  </li>
                  <li>
                    <span><b class="must">*</b> 案件名称：</span>
                    <input type="text" v-model="caseName" maxlength="120" placeholder="请输入案件名称">
                    <div class="mustText mustText1" v-show="caseNameMust">案件名称为必填项<i></i></div>
                  </li>
                  <li>
                    <span><b class="must">*</b> 案发时间：</span>
                    <input id="timeBegin" class="caseNameSelect caseNameSelectDate" placeholder="请选择开始时间" readonly v-model="beginTime">
                    <span class="to">-</span>
                    <input id="timeEnd" class="caseNameSelect caseNameSelectDate" placeholder="请选择结束时间" readonly v-model="endTime">
                    <div class="mustText mustText2" v-show='caseDateMust' style="width:2rem">案发开始时间为必填项<i></i></div>
                  </li>
                  <li class="casearea">
                     <span>案发区域：</span>
                     <province ref='province'></province>
                  </li>
                  <li>
                     <span>案发详址：</span>
                     <input type="text" v-model="caseLocation" placeholder="请输入案发详址">
                     <div class="mustText mustText1"  v-show="caseLocationMust">请输入小于50个字<i></i></div>
                  </li>
                  <li>
                     <span>案发经度：</span>
                    <input type="text" v-model="caselng" placeholder="请输入案发经度">
                     <div class="mustText mustText1" v-show="caselngMust">请输入正确的经度<i></i></div>
                  </li>
                  <li>
                     <span>案发纬度：</span>
                    <input type="text"  v-model="caselat" placeholder="请输入案发纬度">
                     <div class="mustText mustText1" v-show="caselatMust">请输入正确的纬度<i></i></div>
                  </li>
                  <li>
                     <span><b class="must">*</b> 案件类型：</span>
                     <el-select v-model="caseType" placeholder="请选择案件类型">
                        <el-option v-for='(item,index) in CaseType' :value="item.value" :key="index">
                          {{ item.value }}
                        </el-option>
                      </el-select>
                      <div class="mustText mustText3" v-show="caseTypeMust">案发类型为必填项<i></i></div>
                  </li>
                  <li>
                     <span>作案工具：</span>
                      <el-select v-model="caseTool" placeholder="请选择作案工具">
                        <el-option v-for="(item,index) in CaseTool"  :value="item.value"  :key="index">
                          {{ item.value }}
                        </el-option>
                      </el-select>
                  </li>
                  <li>
                     <span>作案手段：</span>
                      <el-select v-model="caseMeans" placeholder="请选择作案手段">
                        <el-option v-for="(item,index) in CaseMethod" :value="item.value" :key="index">
                          {{ item.value }}
                        </el-option>
                      </el-select>
                  </li>
                  <li>
                     <span><b class="must">*</b>案件状态：</span>
                      <el-select v-model="caseState" placeholder="请选择案件状态">
                        <el-option v-for="(item,index) in caseStates" :label="item.value_name" :value="item.value_code" :key="index">
                        </el-option>
                      </el-select>
                       <div class="mustText mustText3" v-show="caseStateMust">案件状态为必填项<i></i></div>
                  </li>

                  <li>
                      <span>作案时机：</span>
                      <el-select v-model="caseOpportunity" placeholder="请选择作案时机">
                        <el-option v-for="(item,index) in CaseOpportunity" :value="item.value" :label="item.value" :key="index">
                        </el-option>
                      </el-select>
                  </li>
                  <li>
                     <span>危害程度：</span>
                     <el-select v-model="harm" placeholder="请选择危害程度">
                        <el-option v-for="(item,index) in CaseLevel" :value="item.value" :key="index">
                          {{ item.value }}
                        </el-option>
                      </el-select>
                  </li>
                  <li>
                      <span>侵犯目标：</span>
                      <el-select v-model="target" placeholder="请选择侵犯目标">
                         <el-option v-for="(item,index) in CaseTarget" :value="item.value" :key="index">
                          {{ item.value }}
                        </el-option>
                      </el-select>
                  </li>
                  <li>
                     <span>简要案情：</span>
                    <textarea style="resize: none" v-model="caseDescribe" placeholder="请输入简要案情"></textarea>
                    <div class="mustText mustTextDes" v-show="caseDescribeLen">请输入少于100个字符<i></i></div>
                  </li>
                </ul>
              </div>
              <div class="main_tright">
                <div id="mapContent"></div>
                <img class="dingwei" src="../../assets/case/quickPos.png" @click="InitMainMap('mapContent');ajaxEditList()" />
              </div>
          </div>
          <div class="main_btn">
            <el-button type="warning" class="cancleBtn" @click="edit ? editReast() : reast() ">{{ edit ? '重置到编辑前':'重置' }}</el-button>
            <!-- <el-button type="success" @click="goToprev">上一步</el-button> -->
            <el-button type="primary" class="passBtn" @click="gonext">保存并下一步</el-button>
          </div>
        </div>
      </div>
    </div>


    <!-- 经纬度弹框 -->
    <el-dialog
      title="添加案发点"
      :visible.sync="DialogVisible"
      width="30%">
      <div>
        <ul class="ul">
          <li>
            <span>案发经度：</span> <input ref="firstvalue" :value="point.lng" type="text">
            <div style="color:red" v-show="pointLng">请输入正确的经度<i></i></div>
          </li>
          <li>
            <span>案发纬度：</span> <input ref="twovalue" :value="point.lat" type="text">
            <div style="color:red" v-show="pointLat">请输入正确的纬度<i></i></div>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogVisible = false"></el-button>
        <el-button @click="createcase"></el-button>
      </span>
    </el-dialog>


    <!-- 脚注 -->
    <footer>
      <p><img src="../../assets/logo.png">武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span></p>
    </footer>
 </div>
</template>

<script>
import echarts from "echarts";
import axios from 'axios';
import Province from '@/components/province';
import maps from '../../api/realvideo/map.js';
import { mapState, mapActions,mapGetters,mapMutations } from 'vuex';
let videoIco = require('@/assets/images/device/duang.png');
import addcase from "../../api/realvideo/addcase.js";
import  '../../common/laydate/laydate.js';
import beginEnd from "../../api/realvideo/BenEedTime.js"; //时间
export default {
  data() {
    return {
      synergyCombat:true,//协同作战状态
      // map:'',//地图对象
      time: [],
      statuss:[],//案件状态
      caseNumber:'',//案件编号
      caseName:'',//案发名称
      beginTime:'',//开始时间
      endTime:'',//结束时间
      caseLocation:'',//案发详址
      caselng:'',//案发经度
      caselat:'',//案发纬度
      caseState:'',//案发状态
      caseType:'',//案件类型
      caseTool:'', //作案工具
      caseMeans:'',//作案手段
      caseOpportunity:'',//作案时机
      harm:'',//危害程度
      target:'',//侵犯目标
      caseDescribe:'',//简要案情
      checktwo:true,
      casemeansshow:false,
      righttext:'新增案发点',
      DialogVisible:false,
      markers:[],// 存放案发地点的坐标
      caseStates:[],//案件状态下拉框信息
      edit:false,//页面编辑状态
      myUploadTo:false,//从我的上传进入的该页面,
      mysynergy:false,
      caseUuid:'',
      timeBegin:'',
      timeEnd:'',
      caseNumberMust:false,
      caseNameMust:false,
      caseTypeMust:false,
      caseDateMust:false,
      caseStateMust:false,
      caselngMust:false,
      caselatMust:false,
      caseStateMust:false,
      caseLocationMust:false,
      caseDescribeLen:false,
      showTwocase:true,
      pointLng:false,
      pointLat:false,
    };
  },
  computed: {

  },
  created(){
    this.caseUuid = this.$route.query.caseUuid
    this.getCaseStates();
    this.edit = this.$route.query.edit;
    this.myUploadTo = this.$route.query.myUploadTo;
    this.caseInfom = this.$route.query.caseInfom;
    this.mysynergy = this.$route.query.mysynergy;
    this.isysn = this.$route.query.isysn
    if(this.isysn){
      this.synergyCombat = true
    }
    this.ajaxEditList()
  },
  components:{
    Province
  },
  mounted() {
    this.OpenTheTime('#timeBegin', '#timeEnd');
    // 时间控件
      // this.timeBegin = laydate.render({
      //   elem: "#timeBegin",
      //   type: "datetime",
      //   max:  Date.parse(new Date()), //0天后
      //   // btns: ['now','confirm'],
      //   done: (value, date, endDate) =>{
      //       this.beginDateTime = value;
      //       this.timeEnd.config.min = {
      //         year: date.year,
      //         month: date.month - 1, //关键
      //         date: date.date,
      //         hours: date.hours,
      //         minutes: date.minutes,
      //         seconds: date.seconds
      //       }
      //     }
      // })
      // this.timeEnd = laydate.render({
      //   elem: "#timeEnd",
      //   type: "datetime",
      //   min: this.beginDateTime,
      //   // max: 1,
      //   // btns: ['now','confirm'],
      //   done: (value, date, endDate) => {
      //     this.endDateTime = value;
      //     // this.timeBegin.config.max = {
      //     //   year: date.year,
      //     //   month: date.month - 1, //关键
      //     //   date: date.date,
      //     //   hours: date.hours,
      //     //   minutes: date.minutes,
      //     //   seconds: date.seconds
      //     // };
      //   }
      // });
    this.InitMainMap('mapContent');
    this.onRightMapFun(this.map)
  },
  mixins:[maps,addcase,beginEnd],
  methods: {
    //获取案件状态下拉框信息
    getCaseStates(){
        this.$http.get('sms/static/getCaseState')
        .then((res) => {
          this.caseStates = res.data.data
        })
    },
    //重置
    reast(){
      this.map.clearOverlays()
      this.$refs.province.selected =  sessionStorage.getItem("defaultRegion").substring(0,2)+'0000', //'420000',
      this.$refs.province.selectcity = sessionStorage.getItem("defaultRegion").substring(0,4)+'00', //'420100',
      this.$refs.province.selectdist = sessionStorage.getItem("defaultRegion")
      this.$refs.province.getSelectData();
      this.caseNumber = '';
      this.caseName = '';
      this.beginTime = '';
      this.endTime = '';
      this.caseLocation = '';
      this.caselng = '';
      this.caselat = '';
      this.caseState = '';
      this.caseType = '';
      this.caseTool = '';
      this.caseMeans = '';
      this.caseOpportunity = '';
      this.harm = '';
      this.target = '';
      this.caseDescribe = '';
    },
    //编辑重置
    editReast(){
      this.ajaxEditList()
    },
    //创建案发点
    createcase(){
      let lngreg = /^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180(\.0{1,10})?)|180$/
      let latreg = /^[\-\+]?((0|([1-8]\d?))(\.\d{1,10})?|90(\.0{1,10})?)$/
      // let lngreg = /^-?((0|1?[0-7]?[0-9]?)(([.][0-9]{1,6})?)|180(([.][0]{1,6})?))$/
      // let latreg = /^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,6})?)|90(([.][0]{1,6})?))$/
      if(!lngreg.test(this.$refs.firstvalue.value)){
        this.pointLng = true;
        setTimeout(()=>{
          this.pointLng = false;
        },1000);
      }else if(!latreg.test(this.$refs.twovalue.value)){
        this.pointLat = true;
        setTimeout(()=>{
          this.pointLat = false;
        },1000);
      }else{
          this.DialogVisible = false;
        this.caselng = this.$refs.firstvalue.value;
        this.caselat = this.$refs.twovalue.value;
        this.createcounterMarker()
      }

    },
    //上一步
    goToprev(){
      if(this.caseInfom){
        this.$router.push('/casestudy/caseInfomanage?menuCode=202')
      }else if(this.myUploadTo){
        this.$router.push('/casestudy/myupload?menuCode=203')
      }else if(this.mysynergy){
        this.$router.push('/casestudy/mysynergy?menuCode=222')
      }
    },
    getCaseNumber(){
      this.caseNumber=this.caseNumber.replace(/^ +| +$/g,'')
      this.caseName=this.caseName.replace(/^ +| +$/g,'')
      if(this.caseNumber != ''){
          let data = {
            caseLinkMark:this.caseNumber,
          }
          this.$http.get('/pca/casemng/baseinfo/check/CaseLinkMark',{params:data})
          .then((res) => {
            if(res.data.code == 200){
              if(res.data.data != null){
                if(res.data.data.caseUuid != this.caseUuid){
                  this.caseNumberMust = true;
                  setTimeout(()=>{
                    this.caseNumberMust = false;
                  },1000);
                }
              }
            }else{
              this.$myconfirm({
                type: '提示',
                msg: '服务器异常,请稍后重试！',
                icon:4,
                btn: {
                  ok: '确定',
                  no: '取消'
                }
              })
            }
          })
      }
    },
    //下一步
    gonext(){
      this.ajaxInformation()
    },
    // 保存基本信息
    ajaxInformation(){
      if(this.caselng == null || this.caselat == null){
        this.caselng = ''
        this.caselat = ''
      }
      let lngreg = /^-?((0|1?[0-7]?[0-9]?)(([.][0-9]{1,6})?)|180(([.][0]{1,6})?))$/
      let latreg = /^-?((0|[1-8]?[0-9]?)(([.][0-9]{1,6})?)|90(([.][0]{1,6})?))$/
      if(this.caseName == ''){
        this.caseNameMust = true;
        setTimeout(()=>{
          this.caseNameMust = false;
        },1000);
      }else if(this.beginTime == ''){
        this.caseDateMust = true;
        setTimeout(()=>{
          this.caseDateMust = false;
        },1000);
      }else if(this.caseLocation.length > 50){
         this.caseLocationMust = true;
        setTimeout(()=>{
          this.caseLocationMust = false;
        },1000);

      }else if(!lngreg.test(this.caselng)){
        console.log(this.caselng);
        this.caselngMust = true;
        setTimeout(()=>{
          this.caselngMust = false;
        },1000);
      }else if(!latreg.test(this.caselat)){
        this.caselatMust = true;
        setTimeout(()=>{
          this.caselatMust = false;
        },1000);
      }
      else if(this.caseType == ''){
        this.caseTypeMust = true;
        setTimeout(()=>{
          this.caseTypeMust = false;
        },1000);
      }else if(this.caseState === ''){
        this.caseStateMust = true;
        setTimeout(()=>{
          this.caseStateMust = false;
        },1000);
      }else if(this.caseDescribe.length > 100){
          this.caseDescribeLen = true;
        setTimeout(()=>{
          this.caseDescribeLen = false;
        },1000);
      }
      else{
        let data =  {
          caseUuid:this.caseUuid,//案件ID
          caseLinkMark:this.caseNumber,//案件编号
          caseName:this.caseName,//案发名称
          timeLowLimit: this.beginTime,//案发开始时间
          timeUpLimit: this.endTime,//案发结束时间
          placeCode:this.$refs.province.selectdist,//区/县 简码
          // regionFullName:this.$refs.province.regionFullName,//区县 名称
          placeFullAddress:this.caseLocation,//案发详址
          longitude:this.caselng,//案发经度
          latitude:this.caselat,//案发纬度
          state:this.caseState,//案件状态
          caseCategoryDesc:this.caseType,//案件类型
          caseToolDesc:this.caseTool,//作案工具
          caseMethodDesc:this.caseMeans,//作案手段
          caseLevelDesc:this.harm,//危害程度
          caseTargetDesc:this.target,//侵犯目标
          caseOpportunityDesc:this.caseOpportunity,//作案时机
          caseAbstract:this.caseDescribe,//简要案情
          isSpecial:1,//协同作战状态
        }
        data = this.$qs.stringify(data);
        this.$http.post('pca/casemng/baseinfo/save',data)
        .then(response => {
          if(response.data.code == 200){
            this.$router.push({path:'/casestudy/caseInfomanage/addsyncase?menuCode=200',query:{caseUuid:response.data.data.caseUuid,edit:this.edit,showTwocase:this.showTwocase,synergyCombat:this.synergyCombat}})
            // this.$router.push({path:'/casestudy/caseInfomanage/addcasetwo?menuCode=200', query:{caseUuid:response.data.data.caseUuid,edit:this.edit,hide:false,synergyCombat:this.synergyCombat,showcase:this.showcase}})
          }else{
            this.$myconfirm({
                type: '提示',
                msg: '服务器异常,请稍后重试！',
                icon:4,
                btn: {
                  ok: '确定',
                  no: '取消'
                }
              })
          }
        })
      }
    },
    //地图添加右击事件
    onRightMapFun (map) {
      let menu = new BMap.ContextMenu()
      let txtMenuItem = [
        {
          text: this.righttext,
          callback: (e) => {
              this.DialogVisible=true;
              this.point = e
              let point = new BMap.Point(e['lng'], e['lat'])
              let marker = new BMap.Marker(point)
            }
        }
      ]
      for (let i = 0; i < txtMenuItem.length; i++) {
        menu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, {width: 200, id: 'dom_' + i}))
      }
      map.addContextMenu(menu)
    },
    //创建点位
    createcounterMarker(){
      var p0 = this.caselng;
      var p1 = this.caselat;
      var point = new BMap.Point(p0, p1)
      var myIcon = new BMap.Icon(videoIco, new BMap.Size(33, 36), {});
      var marker = new BMap.Marker(point, {
        offset: new BMap.Size(0, -20),
        icon: myIcon
      })
      // this.markers.push(marker)
      this.map.clearOverlays(marker)
      this.map.addOverlay(marker)
    },
    // 编辑状态  进入页面编辑渲染数据
    ajaxEditList(){
      // this.InitMainMap('mapContent');

      if(this.edit){
        this.onRightMapFun(this.map)
        let data = {
          caseUuid:this.caseUuid,
        }
        this.$http.get('pca/casemng/baseinfo/query',{params:data})
        .then((res) => {
          if(res.data.code == 200){
            if(res.data.data.longitude == 200 && res.data.data.latitude == 200){
              this.caselng = ''
              this.caselat = ''
            }
            else {
              this.caselng = res.data.data.longitude;
              this.caselat = res.data.data.latitude;
            }
            this.caseNumber = res.data.data.caseLinkMark;
            this.caseName = res.data.data.caseName;
            this.beginTime = res.data.data.timeLowLimit;
            this.endTime = res.data.data.timeUpLimit;
            this.caseLocation = res.data.data.placeFullAddress;
            this.caseState = res.data.data.state;
            this.caseType = res.data.data.caseCategoryDesc;
            this.caseTool = res.data.data.caseToolDesc;
            this.caseMeans = res.data.data.caseMethodDesc;
            this.caseOpportunity = res.data.data.caseOpportunityDesc;
            this.harm = res.data.data.caseLevelDesc;
            this.target = res.data.data.caseTargetDesc;
            this.caseDescribe = res.data.data.caseAbstract;
            this.synergyCombat = res.data.data.isSpecial ? true : false;
            this.createcounterMarker()//创建点位
          }else{
             layer.alert('获取编辑信息失败，请稍后重试！',{icon:2,title:"消息提示"})
          }
        })
      }
    }

  },
};
</script>

<style scoped>
@import "../../assets/css/commom.css";

.caseinfo {
  width: 100%;
  position: absolute;
  top: 0.6rem;
  bottom: 0px;
  left: 0px;
}
.caseinfo .addcaseinfo{
  margin-left: -0.1rem;
  color: #409EFF;
}

.caseinfo .main {
  padding: 0.2rem 0.6rem;
  padding-bottom: 0.1rem;
}
.centermain {
  width: 100%;
  height: 100%;
  border: 1px solid #2c3c4f;
}
.maintile {
  /* background-color: #faf9f5; */
  background-color: #0a1c30;
  font-size: 0.16rem;
  padding-left: 0.2rem;
  line-height: 0.5rem;
  color: #fff;
  border: 1px solid rgba(27,55,88,.5);
}
.maintile span{
  font-size: 0.24rem;
  font-weight: 700;
}
.mainchars {
  margin-top: 0.1rem;
  width:100%;
  height: calc(100% - 0.63rem);
  display: flex;
  flex-direction: column;
}
.main_top{
    flex: 1;
}
.main_top >div:first-child{
  width: 40%;
  height: calc(100% - 0.3rem);
  float: left;
  border: 1px solid #0e2847;
  background: rgba(28,60,95,.32);
  margin:0 2%;
}
.main_top >div:last-child{
  width: 54%;
  margin-left: 44%;
  height: calc(100% - 0.3rem);
  border: 1px solid #0e2847;
  background: rgba(28,60,95,.32);
}
.main_btn{
  height: 0.6rem;
  /* border-top:1px solid #dcdfe6; */
  border: 1px solid rgba(15,44,79,.5);
  background-color: rgba(16,35,56,.5);
  /* background-color: #faf9f5; */
  text-align: center;
  line-height: 0.6rem;
}
.main_tleft p{
  background-color: #0e253f;
  color: #fff;
  font-size: 0.14rem;
  line-height: 0.4rem;
  padding-left: 0.2rem;
  border: 1px solid rgba(20,51,84,.5);
}
.main_tright{
  position: relative;
}
.main_tright >div{
  width: 100%;
  height: 100%;
}
.mainInfo{
  padding:0 0.3rem;
}
.mainInfo span{
  display: inline-block;
  width: 1rem;
  font-size: 0.14rem;
  color: #99c9fa;
  text-align: right;
}
.mainInfo .to{
  width: 0.3rem;
  text-align: center;
}
.mainInfo input,.mainInfo select,textarea{
  padding:0 0.1rem;
  width: calc(100% - 1.3rem);
  border: 1px solid #dcdfe6;
  height: 0.3rem;
  border-radius: 3px;
  font-size: 0.14rem;
  color: #606266;
}
.mainInfo select{
  background: white;
}
.caseNameSelect{
  width: 2.445rem !important;
  font-size: 0.14rem;
}
textarea{
  vertical-align: middle;
  height: 0.8rem;
}
.mainInfo >li{
  font-size: 0.16rem;
  float: left;
  width: 50%;
  color: #606266;
  margin-top: 0.15rem;
  position: relative;
}
.mainInfo >li:nth-child(3),
.mainInfo >li:nth-child(4),
.mainInfo >li:nth-child(5),
.mainInfo >li:last-child{
  width: 100%;
}
.must{
  color: red;
}
.selet{
  width: 2rem;
  position: absolute;
  background-color:#fff;
  border: 1px solid #ccc;
  z-index: 999;
  left: 1.05rem;
  overflow: hidden;
}
.el-switch{
  display: inline-block !important ;
  width: 1rem;
}


.selet li{
  border-bottom: 1px solid #ccc;
  padding: 0.05rem;
}
.selet li:hover{
  background:royalblue;
  color:white;
}
.casearea >div{
  display: inline-block;
}
.casearea >>> select{
  width: 1.5rem;
  height: 0.3rem;
  padding-left: 0.1rem;
  border: 1px solid #dcdfe6;
  background: white;
  font-size: 0.14rem;
  color: #606266;
}
.el-date-editor--datetimerange.el-input__inner{
  width: calc(100% - 1.3rem);
}
.el-range-editor.el-input__inner{
  height: 0.3rem;
  padding: 0 0.1rem;
}
.casetime >>> .el-date-editor .el-range-input{
  font-size: 0.14rem;
}
.casetime >>> .el-date-editor .el-range__icon,
.casetime >>> .el-date-editor .el-range-separator{
  font-size: 0.14rem;
  line-height: 0.3rem;
}
.el-button{
  padding: 0.1rem 0.2rem;
  font-size: 0.14rem;
  border-radius: 0.04rem;
}
.caseinfo >>> .el-dialog__header{
  background-color: #f3f6f8;
  padding: 0.2rem 0.2rem 0.1rem;
}
.caseinfo >>> .el-dialog__title{
  font-size: 0.18rem;
}
.ul{
  height: 0.4rem;
  color: #99c9fa;
}
.ul li{
  float: left;
  padding-left: 0.2rem;
}
.ul li input{
  width: 1.3rem;
  height: 0.3rem;
  padding-left: 0.1rem;
  border: 1px solid #dcdfe6;
}
.mustText{
  width: 1.5rem;
  background: red;
  position: absolute;
  top:0;
  height: 100%;
  color: white;
  font-size: 0.15rem;
  line-height: 0.3rem;
  text-align: center;
  z-index: 9999;
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
.el-select{
  width: calc(100% - 1.3rem);
}
.el-select >>> .el-input__inner{
  height: 0.3rem;

}

.mustText0{
  right: -1.3rem;
}
.mustText1{
  right: -1.3rem;
}
.mustText2{
  right: 1rem;
}
.mustText3{
  right: -1.3rem;
}

.dingwei{
  position: absolute;
  right: 38px;
  top: 205px;
}
.mustTextDes{
  width: 1.7rem;
  height: 0.3rem;
  right:-1.5rem;
  line-height: 0.3rem;
}
textarea{
  color: #99c9fa;
}

</style>
