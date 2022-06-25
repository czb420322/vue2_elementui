<!--
 * @Author: your name
 * @Date: 2019-12-06 10:43:56
 * @LastEditTime: 2020-04-03 17:46:16
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\videoCombat\videomonitor.vue
 -->
<template>
 <div class="monitor">
    <!-- <headers/> -->
    <div class="topInfo">
      <router-link class="sysname" :to="{path:'/videoCombat',query:{menuCode:100}}">视频侦查</router-link>
      <p class="childname">结构化实时检测</p>
    </div>
    <div class="main">
      <div class="left">
        <p><span>|</span>&nbsp;&nbsp;监控区域选择</p>
          <el-tree
            class="filter-tree"
            :data="data2"
            :props="defaultProps"
            default-expand-all
            ref="tree2"
            @node-click="getInfo">
          </el-tree>
      </div>

      <div class="right">
        <div class="one">
          <p class="one_top">实施视频检测</p>
          <div id="idPlayer">
            <div>
              <input id="idUrl" type="hidden" style="width:399px" value="rtmp://192.168.101.16:1935/live/EE6A88B71A37434E8ACD3792B547B518" />
              <input id="idControl" type="hidden" style="width:30px" value="3" />
            </div>
          </div>

        </div>
        <div class="two">
          <p class="two_top">抓拍库</p>
          <div class="two_main" v-show="zhuapai">
            <div class="two_m">
              <p>行人抓拍</p>
              <ul>
                <li v-for="(item,i) in personData" :index='i' @click="getdetails(i)" :key="i">
                  <img :src="item.imgUrl" alt="">
                  <p>{{item.passTime}}</p>
                </li>
              </ul>
            </div>
            <div class="two_m">
              <p>骑车人抓拍</p>
              <ul>
               <li v-for="(item,i) in cpData" :index='i' @click="getcpdetails(i)" :key="i">
                  <img :src="item.imgUrl" alt="">
                  <p>{{item.passTime}}</p>
                </li>
              </ul>
            </div>
            <div class="two_m two_car">
              <p>车辆抓拍</p>
              <ul>
                <li v-for="(item,i) in carData" :index='i' @click="getcardetails(i)" :key="i">
                  <img :src="item.imgUrl" alt="">
                  <p>{{item.passTime}}</p>
                </li>
              </ul>
            </div>
          </div>

        </div>
        <div class="three">
          <p class="three_top">车辆抓拍信息</p>
          <div class="three_main">
            <div class="three_m_t">
              <img :src="imgShowurl" alt="">
            </div>
            <div class="three_m_b" v-show="showperson">
              <ul>
                <li>年龄段<span></span></li>
                <li>包款式<span></span></li>
                <li>包颜色<span></span></li>
                <li>上衣款式<span></span></li>
                <li>上衣颜色<span></span></li>
                <li>下衣款式<span></span></li>
                <li>下衣颜色<span></span></li>
              </ul>
              <ul>
                <li>{{personObj.ageType | myCurrency}}<span></span></li>
                <li>{{personObj.bagStyle | myCurrency}}<span></span></li>
                <li>{{personObj.bagColor | myCurrency}}<span></span></li>
                <li>{{personObj.coatStyle | myCurrency}}<span></span></li>
                <li>{{personObj.coatTexture | myCurrency}}<span></span></li>
                <li>{{personObj.trousersStyle | myCurrency}}<span></span></li>
                <li>{{personObj.trousersColor | myCurrency}}<span></span></li>
              </ul>
              <ul>
                <li>发型<span></span></li>
                <li>头发颜色<span></span></li>
                <li>民族<span></span></li>
                <li>性别<span></span></li>
                <li>朝向<span></span></li>
                <li>鞋子颜色<span></span></li>
                <li>鞋子款式<span></span></li>
              </ul>
              <ul>
                <li>{{personObj.hairStyle | myCurrency}}<span></span></li>
                <li>{{personObj.hairColor | myCurrency}}<span></span></li>
                <li>{{personObj.ethicCode | myCurrency}}<span></span></li>
                <li>{{personObj.gender | myCurrency}}<span></span></li>
                <li>{{personObj.viewType | myCurrency}}<span></span></li>
                <li>{{personObj.shoesColor | myCurrency}}<span></span></li>
                <li>{{personObj.shoesStyle | myCurrency}}<span></span></li>
              </ul>
            </div>
            <div class="three_m_b" v-show="showcp">
              <ul>
                <li>年龄段<span></span></li>
                <li>包款式<span></span></li>
                <li>包颜色<span></span></li>
                <li>上衣款式<span></span></li>
                <li>上衣颜色<span></span></li>
                <li>下衣款式<span></span></li>
                <li>下衣颜色<span></span></li>
              </ul>
              <ul>
                <li>{{cpObj.ageType | myCurrency}}<span></span></li>
                <li>{{cpObj.bagStyle | myCurrency}}<span></span></li>
                <li>{{cpObj.bagColor | myCurrency}}<span></span></li>
                <li>{{cpObj.coatStyle | myCurrency}}<span></span></li>
                <li>{{cpObj.coatColor | myCurrency}}<span></span></li>
                <li>{{cpObj.trousersStyle | myCurrency}}<span></span></li>
                <li>{{cpObj.trousersColor | myCurrency}}<span></span></li>
              </ul>
              <ul>
                <li>骑车人数<span></span></li>
                <li>眼部特征<span></span></li>
                <li>嘴部特征<span></span></li>
                <li>民族<span></span></li>
                <li>体态<span></span></li>
                <li>车颜色<span></span></li>
                <li>发型<span></span></li>
              </ul>
              <ul>
                <li>{{cpObj.driverCount | myCurrency}}<span></span></li>
                <li>{{cpObj.eyePart | myCurrency}}<span></span></li>
                <li>{{cpObj.mouthPart | myCurrency}}<span></span></li>
                <li>{{cpObj.ethicCode | myCurrency }}<span></span></li>
                <li>{{cpObj.bodyType | myCurrency}}<span></span></li>
                <li>{{cpObj.vehicleColor | myCurrency}}<span></span></li>
                <li>{{cpObj.hairStyle | myCurrency}}<span></span></li>
              </ul>
            </div>
            <div class="three_m_b" v-show="showcar">
              <ul>
                <li>车牌号码3<span></span></li>
                <li>车辆品牌<span></span></li>
                <li>车牌类型<span></span></li>
                <li>车牌型号<span></span></li>
                <li>车牌年款<span></span></li>
                <li>车牌颜色<span></span></li>
                <li>车牌长度<span></span></li>
              </ul>
              <ul>
                <li>{{carObj.aaa | myCurrency}}<span></span></li>
                <li>{{carObj.aaa | myCurrency}}<span></span></li>
                <li>{{carObj.aaa | myCurrency}}<span></span></li>
                <li>{{carObj.aaa | myCurrency}}<span></span></li>
                <li>{{carObj.aaa | myCurrency}}<span></span></li>
                <li>{{carObj.aaa | myCurrency}}<span></span></li>
                <li>{{carObj.aaa | myCurrency}}<span></span></li>
              </ul>
              <ul>
                <li>车牌号牌种类<span></span></li>
                <li>车辆号牌颜色<span></span></li>
                <li>车牌颜色深浅<span></span></li>
                <li>车牌高度<span></span></li>
                <li>是否系安全带<span></span></li>
                <li>是否打电话<span></span></li>
                <li>是否打开遮阳板<span></span></li>
              </ul>
              <ul>
                <li>{{carObj.aaa | myCurrency}}<span></span></li>
                <li>{{carObj.aaa | myCurrency}}<span></span></li>
                <li>{{carObj.aaa | myCurrency}}<span></span></li>
                <li>{{carObj.aaa | myCurrency}}<span></span></li>
                <li>{{carObj.aaa | myCurrency}}<span></span></li>
                <li>{{carObj.aaa | myCurrency}}<span></span></li>
                <li>{{carObj.aaa | myCurrency}}<span></span></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="four">
          <p class="four_top">车辆数据统计</p>
          <div class="four_main">
            <div id="main"></div>
          </div>
        </div>

        <p class="footer">
          <img src="../../assets/logo.png">
          武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span>
        </p>
      </div>
    </div>
 </div>
</template>

<script>
import headers from '../../components/header'
import realvideo from '../../api/realvideo/realvideo.js'
var echarts = require('echarts/lib/echarts');
import videoDown from '../../api/casestudy/videoDown.js'
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default {
  data() {
    return {
      currentPage:1, // 当前页码
      pageSize: 10, //每页显示的条数
      totalCount:0, //数据总条数
      data2: [],
      defaultProps: {
        children: "apes",
        label: "name"
      },
      personData:[], // 行人抓拍
      cpData:[],   // 骑车人抓拍
      carData:[],   //车辆抓拍
      zhuapai:false,
      chars:[],
      xchar:[],
      ychar:[],
      imgShowurl:'',   //第三部分图片显示
      showperson:false,
      showcp:false,
      showcar:false,
      personObj:{},
      cpObj:{},
      carObj:{},
    };
  },
  components: {
      headers
  },
   created(){
      this.getDownLoad();
    },
  mounted(){
    OnInitStrus();
    this.getKakou();
  },
  mixins: [realvideo,videoDown],
  filters:{
        myCurrency:function(arg1){
            if(arg1 == null){
              arg1 = '未知'
            }
            return arg1;
        }
      },
  methods: {

    //点击图片获取详情
    //行人
    getdetails(i){
      let person = this.personData[i];
      let data = {
        traceId:person.traceId,
        traceType:person.traceType
      }
      data = this.$qs.stringify(data)
      this.$http.post('vsas/common/trace/detail',data).then(res=>{
          this.showperson = true
          this.personObj = res.data.data
          this.imgShowurl = res.data.data.traceImgUrl
          this.showcp = this.showcar = false;
        // }
        // if(res.data.data.traceType == 1 || res.data.data.traceType == 2 || res.data.data.traceType == 3){
        //   this.showcp = true
        //   this.cpObj = res.data.data
        // }
        // if(res.data.data.traceType == 4 || res.data.data.traceType == 5 || res.data.data.traceType == 6 ||
        // res.data.data.traceType == 7 || res.data.data.traceType == 8){
        //   this.showcar = true
        //   this.carObj = res.data.data
        // }


      })
    },
    //骑车人
    getcpdetails(i){
      let person = this.cpData[i];
      console.log(person);
      let data = {
        traceId:person.traceId,
        traceType:person.traceType
      }
      data = this.$qs.stringify(data)
      this.$http.post('vsas/common/trace/detail',data).then(res=>{
        if(res.data.code == 200){
          console.log(res,2222);
          this.showcp = true
          this.cpObj = res.data.data
          this.imgShowurl = res.data.data.traceImgUrl
          this.showperson = this.showcar = false;
        }

      })
    },
    //车辆
    getcardetails(i){
      let person = this.carData[i];
      let data = {
        traceId:person.traceId,
        traceType:person.traceType
      }
      data = this.$qs.stringify(data)
      this.$http.post('vsas/common/trace/detail',data).then(res=>{
        if(res.data.code == 200){
          console.log(res,5555);
          this.showcar = true
          this.carObj = res.data.data
          this.imgShowurl = res.data.data.imgUrl
          this.showcp = this.showperson = false;
        }
      })
    },
    //点击播放
    getInfo(data){
      this.ychar = this.xchar = [];
      OnPlayStrus();
      this.$http.get('vsas/realTime/photograph/query?deviceId='+data.shebeiId).then(res=>{
          if(res.data.code === 200){
            console.log(res,111111);
            this.zhuapai = true
            this.personData = res.data.data.person.slice(0,5)
            this.cpData  =res.data.data.bicycle.slice(0,5)
            this.carData = res.data.data.vehicle.slice(0,5)
          }
      })
      this.$http.get('vsas/realTime/trace/statistics?deviceId='+data.shebeiId).then(res=>{
          if(res.data.code === 200){
            this.chars = res.data.data
            for (let i = 0; i < this.chars.length; i++) {
              let char = this.chars[i]
              this.ychar.push(char.traceTotal)
            }
            this.getEchar();
          }
      })

    },
    //echar接口
    getEchar(){
      var myChart = echarts.init(document.getElementById('main'));
      myChart.setOption({
          xAxis: {
              type: 'category',
              data: ['行人','自行车','摩托车','三轮车','小型车','大车','卡车','拖拉机','中巴']
          },
          yAxis: {
              type: 'value',
              min:0,
          },
          series: [{
              data: this.ychar,
              type: 'bar',
              barMaxWidth: '20',
              itemStyle:{
                normal:{
                  color:'#4ad2ff'
                }
              },
          }],
          tooltip: {
            trigger: 'item',
          },
      })
      window.addEventListener("resize", function() {
        setTimeout(function() {
          myChart.resize();
        }, 100);
      });
    },
    //区域的接口
    getKakou(){
      // this.$http.get('vsas/task/ape').then(res=>{
      //   console.log(res,9999);
      // })
      this.getVDByModel(res=>{
        this.data2 = res.data.data;
      })
    },
    handleSizeChange(){

    },
    handleCurrentChange(){

    }
  },
  destroyed() {
    OnInitStrus();
  },
};
</script>

<style scoped>

.monitor {
  width: 100%;
  position: absolute;
  top: 0.6rem;
  bottom: 0px;
  left: 0px;
}
.topInfo {
  width: 100%;
  display: flex;
  font-size: 0.18rem;
  align-items: center;
}
.childname {
  width: 1.62rem;
  height: 0.5rem;
  background: url("../../assets/images/sysmanage/bg.png");
  background-size: 100% 100%;
  color: #63abfe;
  line-height: 0.5rem;
  text-align: center;
}
.sysname {
  width: 1.45rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  cursor: pointer;
}

.main {
  width: 100%;
  position: absolute;
  top: 0.5rem;
  bottom: 0;
  left: 0px;
  border-top: 2px solid #ccc;
}
.left {
  width: 16%;
  height: 100%;
  float: left;
  box-shadow:0px 0px  1px 1px #aaa;;
  position: relative;
}
.left p {
  width: 100%;
  position: absolute;
  top: 0;
  line-height: 0.5rem;
  background-color: #3b9df4;
  z-index: 2;
  padding-left: 0.2rem;
  color: #fff;
}
.left p span {
  font-weight: 900;
}
.el-tree {
  width: 100%;
  height: 100%;
  padding: 0 0.15rem;
  padding-top: 0.6rem;
  overflow-y: auto;
}
 .el-tree >>> .el-tree-node__label{
    font-size: 0.14rem;
  }
.right {
  width: 83%;
  height: 100%;
  margin-left: 17%;
  padding: 0 20px;
  /* border: 1px solid yellow; */
}
.one,
.two,
.three,
.four {
  background-color: #f8f7f7;
}
.one,
.two {
  width: 49%;
  height: 55%;
  margin-top: 1%;
  display: flex;
  flex-direction: column;
}
.one_top,
.two_top,
.three_top,
.four_top{
  width: 2rem;
  font-size: 0.18rem;
  line-height: 0.3rem;
  background-color: #409eff;
  color: #fff;
  text-align: center;
}
.one {
  float: left;
}
.one >div {
  overflow: hidden;
  flex: 1;
  /* border: 1px solid red; */
  padding: 0 0.2rem;
  margin-top: 0.05rem;
}



.two {
  float: right;
}
.two_main{
  width: 100%;
  flex: 1;
  padding: 0 0.1rem;
  overflow: auto;
  overflow: auto;
}
.two_m >p {
  width: 0.22rem;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  font-size: 0.14rem;
  /* padding: 0.05rem 0; */
  float: left;
}
.two_m ul {
  overflow: hidden;
  padding-left: 0.1rem;
  margin-top: 0.1rem;
}
.two_m ul li {
  float: left;
  width: 19%;
  height: 1.3rem;
  margin-right: 1%;
  /* border: 1px solid #000; */
  position: relative;
}
.two_m ul li img{
  width: 90%;
  height: auto;
  display: block;
  border: 2px solid #ccc;
}
.two_m ul li p{
  font-size: 0.1rem;
  position: absolute;
  bottom: 0.1rem;
}
.two_m ul li:hover img{
  border: 2px solid #409eff;
}
.two_m ul li:hover p{
  color: #e6a23c;
}
.two_car ul li{
  margin-bottom: 0;
}
.three,
.four {
  width: 49%;
  height: 34%;
  display: flex;
  margin-top: 1%;
  flex-direction: column;
}
.three {
  float: left;
}
.three_main{
  flex: 1;
  padding: 0.05rem 0.1rem;
  overflow: hidden;
}
.three_m_t{
  width: 40%;
  height: 100%;
  float: left;
}
.three_m_t img{
  width: 100%;
  height: 100%;
}
.three_m_b{
  overflow: hidden;
  height: 100%;
  padding-left: 0.1rem;
}
.three_m_b ul{
  width: 25%;
  height: 100%;
  float: left;
  text-align: center;
  font-size: 0.12rem;
  display: flex;
  flex-direction: column;
}
.three_m_b ul:nth-child(even){
  color: #e6a23c;
  background-color: #f5f5f7;
}
.three_m_b ul:nth-child(odd){
  background-color: #edeff6;
}
.three_m_b ul:nth-child(3){
  width: 32%;
}
.three_m_b ul:nth-child(4){
  width: 18%;
}
.three_m_b ul li{
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction:column;
  text-overflow: ellipsis;
  display: flex;
  padding: 0 2px;
  overflow: hidden;
  border: 1px solid #ccd0d8;
}
.three_m_b ul li span{
  display: inline-block;
  padding-left: 100%;
}
.four {
  float: right;
}
.four_main{
  flex: 1;
  overflow: hidden;
  padding: 0.05rem 0.1rem;
  /* border: 1px solid #000; */
}
.four_main div{
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */
}
.right > p {
  position: absolute;
  bottom: 0;
  width: 77%;
  color: #909399;
  font-size: 0.14rem;
  padding: 0 0.2rem;
  height: 0.5rem;
  text-align: center;
}

</style>
