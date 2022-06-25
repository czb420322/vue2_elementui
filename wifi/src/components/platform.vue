<template>
  <div class="mainBody">
    <Searchall />
    <Uploadpicture v-show="status" />
    <div class="contentwrap">
      <div class="contentleft">
        <div class="custom">
          <div class="mytable">
            <span>我的工作台</span>
            <span @click="add">自定义</span>
          </div>
          <div class="table_info">
            <div class="table_info_">
              <div class="cc_" v-for="(item, index) in anotherImgList" :key="index">
                <router-link tag="div" :to="{path:cssobj[item][1],query:{menuCode:item}}" :class="cssobj[item][0]">
                  <img :src="bigSrc['mm_'+item]" :alt="'mm_'+item" @mouseover="tohover($event,item)" @mouseout="topre($event,item)">
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="statistic_info_list">
          <div class="statistic_info_item">
            <div class="statistic_info_title"><img class="time" src="../assets/images/newIndex/accounticon1.png" alt=""> 车辆研判近一周车流量统计</div>
            <div class="statistic_info_content" id="statistic_info_l_content"></div>
            <p class="ts" v-show="trafficChart">服务异常</p>
            <p class="ts" v-show="showinfo_content">暂无数据</p>
            <!-- <div class="will">即将上线</div> -->
          </div>
          <div class="statistic_info_item m_sii">
            <div class="statistic_info_title"><img class="area" src="../assets/images/newIndex/accounticon2.png" alt="">近一个月案件区域统计</div>
            <p class="ts" v-show="carTypeChartLeft">服务异常</p>
            <p class="ts" v-show="noCarTypeChartLeft">暂无数据</p>
            <div class="statistic_info_content" id="carTypeChartLeft"></div>
            <!--<div class="statistic_info_content" id="statistic_info_m_content"></div>-->
            <!-- <div class="will">即将上线</div> -->
          </div>
          <div class="statistic_info_item">
            <div class="statistic_info_title"><img class="video" src="../assets/images/newIndex/accounticon3.png" alt="">近一个月采集视频统计</div>
            <p class="ts" v-show="carPlateChart">服务异常</p>
            <p class="ts" v-show="noCarPlateChart">暂无数据</p>
            <div class="statistic_info_content" id="carPlateChart"></div>
            <!--<div class="statistic_info_content" id="statistic_info_r_content"></div>-->
            <!-- <div class="will">即将上线</div> -->
          </div>
        </div>
      </div>
      <div class="contentright">
        <div class="current_user"><img src="../assets/images/newIndex/usericon.png" alt=""> 当前用户</div>
        <div class="my_info">
          <div class="my_info_title">我的信息</div>
          <div class="my_info_cont">
            <div class="my_info_cont_l">
              <div class="user_info">
                <span class="user_des">用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;:</span>
                <span class="user_name">{{this.userinfo.trueName}}</span>
              </div>
              <div class="user_info">
                <span class="user_des">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;:</span>
                <span class="user_name">{{this.userinfo.userName}}</span>
              </div>
              <div class="user_info">
                <span class="user_des">所&nbsp;&nbsp;属&nbsp;&nbsp;部&nbsp;&nbsp;门&nbsp;:</span>
                <span class="user_name" :title="userinfo.orgName">{{userinfo.orgName}}</span>
              </div>
              <div class="user_info">
                <span class="user_des">登&nbsp;&nbsp;陆&nbsp;&nbsp;时&nbsp;&nbsp;间&nbsp;:</span>
                <span class="user_name" :title="this.userinfo.lastLoginTime">{{this.userinfo.lastLoginTime}}</span>
              </div>
              <!-- <div class="user_info">
                <span class="user_des">当前用户总数:</span>
                <span class="user_name">1008</span>
              </div> -->
            </div>
            <div class="my_info_cont_r">
              <img v-if="imgUrl" :src="this.userinfo.photoUrl" />
              <img v-else src="../assets/rl.png"  onerror="../assets/rl.png"  alt="" />
            </div>
          </div>
        </div>
        <div class="glaj">
          <div class="task_title">
            <span class="task_des">我的关联案件</span>
            <span class="more">
              <em>更多</em>
              <em>>></em>
            </span>
          </div>
          <div class="aj_info">
            <!-- <div class="aj_title">
              <span>序号</span>
              <span>案件名称</span>
              <span>案件状态</span>
            </div>
            <div class="aj_cont">
              <span>1</span>
              <span>128天桥下杀人案</span>
              <span>未侦破</span>
            </div>
            <div class="aj_cont">
              <span>1</span>
              <span>128天桥下杀人案</span>
              <span>未侦破</span>
            </div>
            <div class="aj_cont">
              <span>1</span>
              <span>128天桥下杀人案</span>
              <span>未侦破</span>
            </div>
            <div class="aj_cont">
              <span>1</span>
              <span>128天桥下杀人案</span>
              <span>未侦破</span>
            </div>
            <div class="aj_cont">
              <span>1</span>
              <span>128天桥下杀人案</span>
              <span>未侦破</span>
            </div> -->
            <p>即将上线</p>
          </div>
        </div>
        <div class="my_task glaj">
          <div class="task_title">
            <span class="task_des">我的任务</span>
            <span class="more">
              <em>更多</em>
              <em>>></em>
            </span>
          </div>
          <div class="task_cont aj_info">
            <!-- <p>1，任务一：啊啊啊啊啊啊啊啊啊啊</p>
            <p>1，任务一：啊啊啊啊啊啊啊啊啊啊</p>
            <p>1，任务一：啊啊啊啊啊啊啊啊啊啊</p> -->
            <p>即将上线</p>
          </div>
        </div>
        <div class="my_task my_msg glaj">
          <div class="task_title">
            <span class="task_des">我的消息</span>
            <span class="more">
              <em>更多</em>
              <em>>></em>
            </span>
          </div>
          <div class="task_cont aj_info">
            <!-- <p>1，消息一：啊啊啊啊啊啊啊啊啊啊</p>
            <p>1，消息一：啊啊啊啊啊啊啊啊啊啊</p>
            <p>1，消息一：啊啊啊啊啊啊啊啊啊啊</p>
            <p>1，消息一：啊啊啊啊啊啊啊啊啊啊</p> -->
            <p>即将上线</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <!-- 弹出框 -->
    <div class="pop_up" v-show="pop">
      <div class="cont">
        <div class="title">
          <p>自定义添加内容</p>
          <span @click="hidden"><img src="../assets/close_imgsearch.png" /></span>
        </div>
        <div class="content">
          <div class="left">
            <div class="l_title">
              <h2>我的工作台</h2>
            </div>
            <div class="l_cont">
              <ul>
                <li :class="{lactive:iconRedact}" v-for="(item,index) in leftImgList" :key="index" @click="ltoggle(item,index)">
                  <img :src="src['m_'+item]" alt=""  @mouseover="selftohover($event,item)" @mouseout="selftopre($event,item)">
                </li>
                <li>
                  <img class="img" src="../assets/images/module/redact.png" alt="">
                </li>
              </ul>
            </div>
            <div class="l_btn">
              <span @click="redact">编辑</span>
            </div>
          </div>
          <div class="right">
            <div class="r_title">
              <h2>全部功能</h2>
            </div>
            <div class="r_cont">
              <div class="combat" v-for="(item,index) in currentImgList" v-if='item.mlist.length!=0' :key="index">
                <p>{{item.name}}</p>
                <div class="combat_cont">
                  <ul>
                    <li :class="{ractive:iconRedact}" v-for="(menu, mindex) in item.mlist" :key="mindex" v-show="menu.rightToggle" @click="rtoggle(menu.menuCode)">
                      <img :src="src['m_'+menu.menuCode]" alt="" @mouseover="selftohover($event,menu.menuCode)" @mouseout="selftopre($event,menu.menuCode)">
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn">
          <span @click="append"></span>
          <span @click="hidden"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Uploadpicture from "../components/upload_picture";
import Searchall from "../components/search_all";
import Footer from "../components/footer";
import { mapState } from "vuex";
import { cssobj } from "../common/js/workTableRouter.js";
import { getWorkTable } from "../api/worktable/worktable.js";
import moment from 'moment'

// // 引入基本模板
// let echarts = require('echarts/lib/echarts')

// // 引入柱状图组件
// require('echarts/lib/chart/bar')
// // 引入提示框和title组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
// // require('echarts/lib/component/xAxis')
var echarts = require("echarts");

export default {
  data() {
    return {
      name: this.$storage.getSession("name")
        ? this.$storage.getSession("name")
        : "",
      cssobj: cssobj,
      worklist: [],
      userinfo: {},
      pop: false,
      currentMenus: [],
      sum: [],
      samearr: [],
      imgList: [],
      leftImgList: [],
      defaultImgList: this.$storage.getSession("defaultImgList"), //['101','102','103','105','106','107'],
      anotherImgList: [],
      src: {},
      bigSrc: {},
      getImgUrl: "sms/menu/getUserMenus", //存数据接口
      leftUrl: "sms/usercore/workBench/getMyWork",
      okUrl: "sms/usercore/workBench/save",
      iconRedact: false,
      imgUrl: true,
      areaList: [],
      countList: [],
      dataList: [],
      showinfo_content:false,
      trafficChart : false,
      beginTime:moment((new Date()) - 7*3600*1000*24).format("YYYY-MM-DD"),
      endTime:moment(new Date()).format("YYYY-MM-DD"),
      carTypeChartLeft:false,
      noCarTypeChartLeft:false,
      carPlateChart:false,
      noCarPlateChart:false,
       //视频采集统计
        dataList3: [],
        vehiclePlateClassList: [],
        vehiclePlateClassCountList: [],
        //案件区域统计
        dataList1: [],
        vehicleClassList: [],
        vehicleKeyValueList: [],

    };
  },
  computed: {
    ...mapState(["status"]),
    currentImgList: function() {
      let arr = [];
      for (let i = 0; i < this.imgList.length; i++) {
        let temp = {
          mcs: this.imgList[i].mcs,
          mlist: [],
          name: this.imgList[i].name
        };
        for (let j = 0; j < this.imgList[i].mlist.length; j++) {
          if (this.leftImgList.length > 0) {
            for (let k = 0; k < this.leftImgList.length; k++) {
              if (this.imgList[i].mlist[j].menuCode == this.leftImgList[k]) {
                temp.mlist[j] = {
                  menuCode: this.imgList[i].mlist[j].menuCode,
                  menuName: this.imgList[i].mlist[j].menuName,
                  rightToggle: false
                };
                break;
              } else {
                temp.mlist[j] = {
                  menuCode: this.imgList[i].mlist[j].menuCode,
                  menuName: this.imgList[i].mlist[j].menuName,
                  rightToggle: true
                };
              }
            }
          } else {
            temp.mlist[j] = {
              menuCode: this.imgList[i].mlist[j].menuCode,
              menuName: this.imgList[i].mlist[j].menuName,
              rightToggle: true
            };
          }
        }
        arr.push(temp);
      }

      return arr;
    }
  },
  created() {
      Date.prototype.Format = function (fmt) {
        var o = {
          "M+": this.getMonth() + 1,                 //月份
          "d+": this.getDate(),                    //日
          "h+": this.getHours(),                   //小时
          "m+": this.getMinutes(),                 //分
          "s+": this.getSeconds(),                 //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }
  },
  mounted() {
    // this.drawLine();
    // this.drawLine_1();
    this.getUserinfo();
    this.getImgList();
    this.getLeftImgList();
    this.getDataList(); //车流量统计
    this.trafficChartCount();
    this.getVehiclePlateClassList();
    this.getDefaultRegion();
  },
  components: {
    Searchall,
    Uploadpicture,
    Footer
  },
  methods: {
      //获取默认省份
      getDefaultRegion(){
        this.$http({
          url:'pca/statistics/defaultRegion',
          method:'get'
        }).then((resS)=>{
          if(resS.statusText=='OK'&& resS.data.code==200){
            let provinceId = resS.data.data;

            this.$http({
              url:'pca/statistics/loadCity',
              method:'get',
              params:{
                id: provinceId
              }
            }).then((res)=>{
              if(res.statusText == 'OK'&& res.data.code == 200){
                this.getVehicleClassList(res.data.data[0].regionId);
              }else{
                this.$notify({
                  type: 'error',
                  message: '获取省份下城市列表失败！',
                  position: 'bottom-right',
                  duration: 3000
                });
                // layer.alert('获取省份下城市列表失败！',{icon:5,title:"消息提示"});
              }
            }).catch( res=>{
            })

          }else{
            this.$notify({
                  type: 'error',
                  message: '获取默认省份失败！',
                  position: 'bottom-right',
                  duration: 3000
                });
            // layer.alert('获取默认省份失败！',{icon:5,title:"消息提示"});
          }
        }).catch( res=>{
        })
      },
      //获取案件区域统计
      getVehicleClassList(regionId) {
        this.dataList1= [];
        this.vehicleClassList = [];
        this.vehicleKeyValueList = [];
        let beginDate = new Date((new Date()).getTime() - 30*24*60*60*1000).Format('yyyy-MM-dd hh:mm:ss');
        let endDate = new Date((new Date()).getTime()).Format('yyyy-MM-dd hh:mm:ss');
        this.$http({
          url: 'pca/statistics/caseArea',
          method: 'get',
          params: {
            id: regionId,
            beginDate: beginDate.split(' ')[0],
            endDate: endDate.split(' ')[0]
          }
        }).then(res => {
          if(res.statusText=="OK" && res.data.code==200){
            this.vehicleKeyValueList=[];
            this.vehicleClassList = [];

            this.dataList1 = res.data.data;
            this.vehicleKeyValueList = this.dataList1.map(a => {
              return {value: a.count, name: a.regionName}
            });

            //给vehicleKeyValueList排序
            this.vehicleKeyValueList.sort(function(a,b){
              if(a.value > b.value){
                return -1;
              }else{
                return 1;
              }
            });

            for (let i = 0; i < this.vehicleKeyValueList.length; i++) {
              this.vehicleClassList.push(this.vehicleKeyValueList[i].name);
            }

            if(this.vehicleClassList.length == 0){
              this.noCarTypeChartLeft = true;
            }else{
              this.typeChartPercent();
            }
          }else{
            this.carTypeChartLeft = true;
          }
        })
      },
           //车辆类别百分比统计图
      typeChartPercent() {

        let longList = {
          keyValueList: this.vehicleKeyValueList,
          classList: this.vehicleClassList
        };
        let shortList = {};
        let currentList = longList;
        if(this.vehicleKeyValueList.length >= 6){
          //从第6个开始合并成一个“其他”类
          shortList = {
            keyValueList: this.vehicleKeyValueList.slice(0,5),
            classList: this.vehicleClassList.slice(0,5)
          };
          shortList.keyValueList[shortList.keyValueList.length] = {
            value: 0,
            name: "其他"
          };
          shortList.classList[shortList.classList.length] = "其他";
          let otherValue = 0;
          for(let i=0;i<this.vehicleKeyValueList.length;i++){
            if(i>4){
              otherValue += this.vehicleKeyValueList[i].value;
            }
          }
          shortList.keyValueList[5].value = otherValue;
          currentList = shortList;
        }

        let myChart = this.$echarts.init(document.getElementById('carTypeChartLeft'));
        myChart.setOption(
          {
            title: {},
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)",
              position: function (p) {
                return [p[0] + 30, p[1] - 30];
              },
            },
            toolbox: {
              show: true,
              right:"10%",
              feature: {
                // mark: {show: true},
                // restore: {show: true},
                // saveAsImage: {show: true},
              }
            },
            legend: {
              type: 'plain',
              itemGap: 2,
              itemWidth: 20,
              height: "90%",
              width:'80%',
              bottom:20,
              textStyle:{
                  color:"#99c9fa"
              },

              data: currentList.classList
            },
            series: [
              {
                name: '案件区域统计',
                type: 'pie',
                clockwise: true,
                startAngle: -120,
                radius: '50%',
                center: ['50%', '35%'],
                seriesLayoutBy: 'row',
                avoidLabelOverlap: true,
                label: {
                  show: true,
                  position:'outer'
                },
                labelLine: {
                  show: true,
                  length: 5
                },

                itemStyle: {
                  normal: {
                    color: function(params) {
                      let colorList = [
                        '#7928b8' ,'#6e72ea','#6290ed','#4361af','#2a3b9e',
                        '#5728b8','#7928b8' ,'#6e72ea','#6290ed','#4361af','#2a3b9e',
                        '#5728b8','#7928b8' ,'#6e72ea','#6290ed','#4361af','#2a3b9e',
                        '#5728b8'
                      ];
                      return colorList[params.dataIndex]
                    },

                  }
                },
                data: currentList.keyValueList
              }
            ]
          }
        );

        myChart.on("click",function(params){
          if(params.dataIndex >= 5){
            if(currentList.keyValueList.length == 6){
              currentList = longList;
            }else{
              currentList = shortList;
            }
            myChart.setOption(
              {
                title: {},
                tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)",
                  position: function (p) {
                    return [p[0] + 30, p[1] - 30];
                  },
                },
                toolbox: {
                  show: true,
                  right:"10%",
                  feature: {
                    mark: {show: true}
                    // restore: {show: true},
                    //saveAsImage: {show: true},
                  }
                },
                legend: {
                  type: 'plain',
                  itemGap: 2,
                  itemWidth: 20,
                  height: "90%",
                  width:'80%',
                  bottom:20,
                  textStyle:{
                  color:"#99c9fa"
                        },
                  // height: "90%",
                  // orient: 'vertical',
                  // y: "center",
                  // x: "75%",
                  data: currentList.classList
                },
                series: [
                  {
                    name: '车辆类别百分比统计',
                    type: 'pie',
                    clockwise: true,
                    startAngle: -120,
                    radius: '50%',
                    center: ['50%', '35%'],
                    seriesLayoutBy: 'row',
                    avoidLabelOverlap: true,
                    label: {
                      show: true,
                      position:'outer'
                    },
                    labelLine: {
                      show: true,
                      length: 5
                    },
                    itemStyle: {
                      normal: {
                        color: function(params) {
                          let colorList = [
                          '#7928b8' ,'#6e72ea','#6290ed','#4361af','#2a3b9e',
                        '#5728b8','#7928b8' ,'#6e72ea','#6290ed','#4361af','#2a3b9e',
                        '#5728b8','#7928b8' ,'#6e72ea','#6290ed','#4361af','#2a3b9e',
                        '#5728b8'
                          ];
                          return colorList[params.dataIndex]
                        }
                      }
                    },
                    data: currentList.keyValueList
                  }
                ]
              }
            );
          }
        });

        //图表自适应
        window.addEventListener("resize", function () {
          setTimeout(function () {
            myChart.resize();
          }, 500)
        });
      },
     //采集视频数据获取
      getVehiclePlateClassList() {
        this.dataList3= [];
        this.vehiclePlateClassList = [];
        this.vehiclePlateClassCountList = [];
        let beginDate = new Date((new Date()).getTime() - 30*24*60*60*1000).Format('yyyy-MM-dd hh:mm:ss');
        let endDate = new Date((new Date()).getTime()).Format('yyyy-MM-dd hh:mm:ss');
        this.$http({
          url: 'pca/statistics/video',
          method: 'post',
          params: {
            startTime: beginDate.split(' ')[0],
            endTime: endDate.split(' ')[0]
          }
        }).then(res => {
          if(res.statusText=="OK" && res.data.code==200){
            this.vehiclePlateClassList = [];
            this.vehiclePlateClassCountList = [];
            for (let i = 0; i < res.data.data.length; i++) {
              this.vehiclePlateClassList.push(res.data.data[i].creatorOrg);
              this.vehiclePlateClassCountList.push(res.data.data[i].countNum);
            }
            if(this.vehiclePlateClassList.length == 0 || this.vehiclePlateClassCountList.length == 0){
              this.noCarPlateChart = true;
            }else{
              this.carPlateCount();
            }
          }else{
            this.carPlateChart = true;
            // this.$alert("服务异常","消息提示");
          }
        })
      },
      //采集视频统计
      carPlateCount() {
        // this.vehiclePlateClassList = ["11","22","33","44","55","66","77","88","99","11","22","33","44","55","66","77","88","99"];
        // this.vehiclePlateClassCountList = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9];
        let myChart = this.$echarts.init(document.getElementById('carPlateChart'));
        var dataAxis = this.vehiclePlateClassList;
        var data = this.vehiclePlateClassCountList;
        var yMax = Math.ceil(Math.max.apply(null, data));
        var dataShadow = [];
        for (var i = 0; i < data.length; i++) {
          dataShadow.push(yMax);
        }
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none',
            },
            showContent: true
          },
          toolbox: {
            right:"10%",
            show: true,
            feature: {
              mark: {show: true}
              // restore: {show: true},
              //saveAsImage: {show: true}
            }
          },
          xAxis: {
            data: this.vehiclePlateClassList,
            axisLabel: {
              rotate: 270,
              //interval: 0,
              inside: true,
             color:"#99c9fa",
              textStyle: {
                // color: '#606266',
                color:"#99c9fa",
                fontSize: '12px'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
                  lineStyle:{
                     color:"#99c9fa"
                  }
            },
            z: 10
          },
          yAxis: {
            minInterval:1,
            axisLine: {
              show: true,
               lineStyle:{
                     color:"#99c9fa"
                  }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
            color:"#99c9fa",
              textStyle: {
                // color: '#999'
                 color:"#99c9fa",
              }
            },
            splitLine:{
                  lineStyle:{
                    color:['#99c9fa'],
                    type:'dashed'
                    }
              },
          },
          dataZoom : {
            show : (this.vehiclePlateClassList.length > 8),
            start : 0,
            end : Math.ceil(400 / this.vehiclePlateClassList.length),
            bottom: "10%"
          },
          grid: {
            bottom: (this.vehiclePlateClassList.length > 8)? '20%':'10%',
            left: '5%',
            containLabel: true
          },
          series: [
            // { // For shadow
            //   type: 'bar',
            //   barWidth: 30,
            //   itemStyle: {
            //     normal: {color: 'rgba(0,0,0,0.05)'}
            //   },

            //   barGap: '-100%',
            //   // barCategoryGap: '40%',
            //   data: dataShadow
            //   // animation: false
            // },
            {
              type: 'bar',
              barWidth: 30,
              itemStyle: {
                normal: {
                  color: function(params) {
                      let colorList = [
                        '#0b68a9' ,'#1e95e9','#6e72ea','#6e72ea','#1a94e9',
                        '#0b68a9',   '#0b68a9' ,'#1e95e9','#6e72ea','#6e72ea','#1a94e9',
                        '#0b68a9',   '#0b68a9' ,'#1e95e9','#6e72ea','#6e72ea','#1a94e9',
                        '#0b68a9'
                      ];
                      return colorList[params.dataIndex]
                    }
                }
              },
              data: this.vehiclePlateClassCountList
            }
          ]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          setTimeout(function () {
            myChart.resize();
          }, 100)
        });
        if(this.vehiclePlateClassList.length > 8){
          let zoomSize = 8;
          myChart.on('click', function (params) {
            myChart.dispatchAction({
              type: 'dataZoom',
              startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
              endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
            });
          });
        }

      },
    //过车流量统计
    getDataList() {
      this.areaList = [];
      this.countList = [];
      this.dataList = [];
      this.loading = this.$loading({
        text: "正在查询...",
        spinner: "el-icon-loading",
        target: "#imgBox"
      });
      this.$http({
        url: "tvas/flow/query",
        method: "post",
        params: {
          category: "0",
          beginDate:this.beginTime,
          endDate: this.endTime
        }
      }).then(res => {
        this.loading.close();
        this.dataList = res.data.data.rows;
        for (let i = 0; i < this.dataList.length; i++) {
          if (
            this.dataList[i].placeName == null ||
            this.dataList[i].placeName == "" ||
            this.dataList[i].vehicleCount == null ||
            this.dataList[i].vehicleCount == ""
          ) {
          } else {
            this.areaList.push(this.dataList[i].placeName);
            this.countList.push(this.dataList[i].vehicleCount);
          }
        }
        // console.log(this.areaList,this.countList)
        if (this.areaList.length == 0 || this.countList.length == 0) {
          this.showinfo_content = true
        } else {
          this.showinfo_content = false
          this.trafficChartCount();
        }
      }).catch(()=>{
        this.trafficChart=true
      });
    },

    trafficChartCount() {
      let myChart = this.$echarts.init(document.getElementById("statistic_info_l_content"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none"
          },
          showContent: true
        },
        toolbox: {
          show: true,
          right: "15%",
          feature: {
            // mark: {show: true},
            // /*dataView: {show: true, readOnly: false},*/
            // magicType: {show: true, type: ['line', 'bar']},
            // // restore: {show: true},
            // saveAsImage: {show: true},
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
               axisTick: {
              show: false
            },

              axisLabel:{
                color:"#99c9fa",
              },
             axisLine:{
                  lineStyle:{
                     color:"#99c9fa"
                  }
              },
            data: this.areaList
          }
        ],
        yAxis: [

          {
            type: "value",
                    axisLabel:{
                color:"#99c9fa"
              },
            axisTick: {
              show: false
            },
              splitLine:{
                  lineStyle:{
                    color:['#99c9fa'],
                    type:'dashed'
                    }
              },
                axisLine:{
                  lineStyle:{
                     color:"#99c9fa"
                  }
              },
            // axisLabel:{formatter:'{value} 辆'}
          }
        ],
        grid: {
          left: "14.5%",
          containLabel: true
        },
        series: [
          {
            name: "过车流量",
            type: "bar",
            barWidth: 30,
            itemStyle: {
              normal: {
                 color: function(params) {
                      let colorList = [
                        '#0b68a9' ,'#1e95e9','#6e72ea','#6e72ea','#1a94e9',
                        '#0b68a9','#0b68a9' ,'#1e95e9','#6e72ea','#6e72ea','#1a94e9',
                        '#0b68a9','#0b68a9' ,'#1e95e9','#6e72ea','#6e72ea','#1a94e9',
                        '#0b68a9'

                      ];
                      return colorList[params.dataIndex]
                    }
              },
              emphasis: {
                // color: "#ff7f50"
              }
            },
            data: this.countList
          }
        ]
      };
      myChart.setOption(option);
      //图表自适应
      window.addEventListener("resize", function() {
        setTimeout(function() {
          myChart.resize();
        }, 500);
      });
    },

    // aa(){
    //   if(this.anotherImgList.length == 0){
    //     this.defaultImgList.forEach(element => {
    //       this.anotherImgList.push(element);
    //     });
    //   }
    // },
    getImgList(imgList) {
      this.$http({
        //调用接口
        method: "POST",
        url: this.getImgUrl //this指data
      }).then(response => {
        //接口返回数据

        if (response.data.code == 200) {
          this.imgList = response.data.data;
          for (let i = 0; i < this.imgList.length; i++) {
            this.requreImg(this.imgList[i].mlist);
            // if (i == 12 || i == 13 || i == 14 || i == 15 || i == 16) {
            // } else {
            //   this.requreImg(this.imgList[i].mlist);
            // }
          }
        } else {
          // this.$alert("服务异常","消息提示");
        }
      });
    },

    getLeftImgList(leftImgList) {
      // 左边
      this.$http({
        //调用接口
        method: "POST",
        url: this.leftUrl //this指data
      }).then(response => {
        //接口返回数据
        // alert(1)
        if (response.data.code == 200) {
          let dd = response.data.data; //['101','102']
          if (dd.length == 0) {
            this.anotherImgList = [];
            this.leftImgList = [];
            this.defaultImgList.forEach(element => {
              this.leftImgList.push(element);
              this.anotherImgList.push(element);
              this.leftImgList.sort(function(a, b) {
                return a - b;
              });
              this.anotherImgList.sort(function(a, b) {
                return a - b;
              });
            });
          } else {
            this.anotherImgList = [];
            this.leftImgList = [];
            for (let i = 0; i < dd.length; i++) {
              this.leftImgList.push(dd[i].menuCode);
              this.anotherImgList.push(dd[i].menuCode);
            }
            this.leftImgList.sort(function(a, b) {
              return a - b;
            });
            this.anotherImgList.sort(function(a, b) {
              return a - b;
            });
          }
        } else {
          // this.$alert("服务异常","消息提示");
        }
      });
    },

    requreImg(arr) {
      // console.log(arr);
      arr.forEach(element => {
        this.src[
          "m_" + element.menuCode
        ] = require("../assets/images/module/m_" + element.menuCode + ".png");
        this.bigSrc[
          "mm_" + element.menuCode
        ] = require("../assets/images/index/mm_" + element.menuCode + ".png");
      });
    },

    // 添加图标弹出框
    add: function() {
      this.getLeftImgList();
      this.pop = true;
      this.iconRedact = false;
    },

    // 关闭弹出框
    hidden: function() {
      this.pop = false;
    },

    // 添加/删除选项
    ltoggle: function(item, index) {
      if (this.iconRedact == true) {
        if (this.leftImgList.length > 1) {
          this.leftImgList.splice(index, 1);
        } else {
          // this.$alert("最少不能小于1个菜单","消息提示");
          this.$notify({
            type: 'warning',
            message: '最少不能小于1个菜单',
            position: 'bottom-right',
            duration: 3000
          });
          // layer.open({
          //   type: 0,
          //   content: "最少不能小于1个菜单",
          //   title: "消息提示",
          //   yes: function(index) {
          //     layer.close(index);
          //   }
          // });
        }
      }
    },
    rtoggle: function(menuCode) {
      if (this.iconRedact == true) {
        if (this.leftImgList.length < 10) {
          this.leftImgList.push(menuCode);
        } else {
          // this.$alert("最多不能超过10个菜单","消息提示");
           this.$notify({
            type: 'warning',
            message: '最多不能超过10个菜单',
            position: 'bottom-right',
            duration: 3000
          });
          // layer.open({
          //   type: 0,
          //   content: "最多不能超过10个菜单",
          //   title: "消息提示",
          //   yes: function(index) {
          //     layer.close(index);
          //   }
          // });
          this.iconRedact = false;
        }
      }
    },
    append: function() {
      let param = { menusIds: this.leftImgList.join(",") };
      let data = this.$qs.stringify(param);
      this.$http({
        //调用接口
        method: "POST",
        url: this.okUrl,
        data: data
      }).then(response => {
        //接口返回数据
        // alert(1)
        if (response.data.code == 200) {
          // alert(response.data)
          // this.leftImgList = response.data;
          // this.anotherImgList = this.leftImgList;
          // if(this.anotherImgList){}
          this.anotherImgList = [];
          this.leftImgList.forEach(element => {
            this.anotherImgList.push(element);
            this.anotherImgList.sort(function(a, b) {
              return a - b;
            });
          });
        } else {
          // this.$alert("自定义工作台更新失败","消息提示");
           this.$notify({
            type: 'warning',
            message: '自定义工作台更新失败！',
            position: 'bottom-right',
            duration: 3000
          });
          // layer.open({
          //   type: 0,
          //   icon: 5,
          //   content: "自定义工作台更新失败！",
          //   title: "消息提示",
          //   yes: function(index) {
          //     layer.close(index);
          //   }
          // });
        }
      });
      this.pop = false;
    },
    redact: function() {
      this.iconRedact = true;
    },
      tohover(el,code){
       let img = require('../assets/images/indexHover/mm_'+code+'_h.png')
        el.currentTarget.setAttribute('src',img)
      },
      topre(el,code){
        let img = require('../assets/images/index/mm_'+code+'.png')
        el.currentTarget.setAttribute('src',img)
      },
       selftohover(el,code){
       let img = require('../assets/images/indexHover/m_'+code+'_h.png')
        el.currentTarget.setAttribute('src',img)
      },
      selftopre(el,code){
        let img = require('../assets/images/module/m_'+code+'.png')
        el.currentTarget.setAttribute('src',img)
      },
    //工作台
    // getWork:function(){
    //   let url = '';
    //   let data = {};
    //   getWorkTable(url,data,res=>{
    //     if(res.code===200){

    //     }
    //   })
    // },
    //获取用户信息
    getUserinfo: function() {
      this.userinfo = this.$storage.getSession("userInfo");
      if (this.userinfo.photoUrl == "") {
        this.imgUrl = false;
      }
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(
        document.getElementById("statistic_info_r_content")
      );

      // 绘制图表
      myChart.setOption({
        title: { text: "" },
        tooltip: {},
        // xAxis: {
        //   data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子","内衣","板鞋","帽子"]
        // },
        xAxis: {
          data: [
            "衬衫",
            "羊毛衫",
            "雪纺衫",
            "裤子",
            "裤子",
            "裤子",
            "裤子",
            "裤子"
          ],
          tickPixelInterval: 10,
          tickWidth: 100
        },

        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 10, 10, 10]
          }
        ]
      });
    },

    drawLine_1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(
        document.getElementById("statistic_info_m_content")
      );

      // 绘制图表
      myChart.setOption({
        title: {
          //text: '某站点用户访问来源',
          //subtext: '纯属虚构',
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left"
          // data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },

        series: [
          {
            // name:'访问来源',
            name: "今日车型统计",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "小轿车" },
              { value: 310, name: "皮卡车" },
              { value: 234, name: "SUV" },
              { value: 135, name: "大货车" },
              { value: 1548, name: "面包车" }
            ]
          }
        ]
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// .mainBody {
//   display: flex;
//   flex-direction: column;
//   margin-top: 1.2rem;
//   height: calc(100vh - 1.2rem);
//   min-height: 660px;
// }
// .contentwrap {
//   display: flex;
//   width: 100%;
//   flex: 1;
//   background: #f4f4f4;
//   padding-top: 0.1rem;
//   overflow: hidden;
//   .contentleft {
//     display: flex;
//     width: 78%;
//     margin: 0 1%;
//     flex-direction: column;
//     align-items: center;
//     justify-content: space-between;
//     .custom {
//       display: flex;
//       width: 100%;
//       height: 3.5rem;
//       flex-direction: column;
//       background: #fff;
//       border: 1px solid #dcdfe6;
//       box-shadow: 0 1px 1px #d8d8d8;
//       .mytable {
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
//         height: 0.36rem;
//         padding-left: 0.2rem;
//         color: white;
//         line-height: 0.36rem;
//         font-size: 0.18rem;

//         background: #409eff;
//         span {
//           margin-right: 0.1rem;
//         }
//         & span:last-child {
//           font-size: 0.14rem;
//           cursor: pointer;
//         }
//       }
//       .table_info {
//         width: 100%;
//         display: flex;
//         flex: 1;

//         .table_info_ {
//           width: 100%;
//           display: flex;
//           flex-wrap: wrap;
//           flex: 1;
//           padding: 0.18rem 0;

//           .cc_ {

//             width: 18%;
//             margin: 0 1%;
//             cursor: pointer;
//             img {
//               width: 100%;

//               cursor: pointer;
//             }
//           }
//         }
//       }
//     }
//     .statistic_info_list {
//       display: flex;
//       flex: 1;

//       width: 100%;
//       justify-content: space-between;
//       margin-top: 0.2rem;

       .will {

        flex: 1;
        line-height: 0.32rem;
         font-size: 0.14rem;
         background: #eee;
         text-align: center;
        display: flex;
         align-items: center;
         justify-content: center;
      }
//       .statistic_info_item {
//         display: flex;
//         flex-direction: column;
//         flex: 1;
//         height: 100%;
//         background: #fff;
//         border: 1px solid #dcdfe6;
//         box-shadow: 0 1px 1px #d8d8d8;
//         .ts {
//           color: #999;
//           font-size: 0.14rem;
//           margin: 2%;
//         }
//         .statistic_info_title {
//           display: flex;
//           align-items: center;
//           height: 0.36rem;
//           width: 100%;
//           padding-left: 0.2rem;
//           line-height: 0.36rem;
//           font-size: 0.18rem;
//           color: white;

//           background: #409eff;
//         }
//         .statistic_info_content {
//           display: flex;
//           flex: 1;

//         }
//       }
//       .m_sii {
//         margin: 0 0.2rem;
//       }
//     }
//   }
//   .contentright {
//     display: flex;
//     flex-direction: column;
//     width: 19%;
//     min-width: 3.5rem;
//     margin-right: 1%;
//     background: #fff;
//     border: 1px solid #dcdfe6;
//     box-shadow: 0 1px 1px #d8d8d8;
//     .current_user {
//       display: flex;
//       height: 0.36rem;
//       color: white;
//       padding-left: 0.2rem;
//       align-items: center;

//       font-size: 0.18rem;
//       line-height: 0.36rem;
//       background: #409eff;
//     }
//     .my_info {
//       display: flex;
//       flex-direction: column;
//       border-bottom: 1px solid #f6f7fb;
//       margin-bottom: 0.1rem;
//       .my_info_title {
//         display: flex;
//         align-items: center;
//         height: 0.35rem;
//         padding: 0 0.1rem;
//         font-size: 0.16rem;
//         line-height: 0.35rem;
//         color: #ff8c00;
//       }
//       .my_info_cont {
//         display: flex;

//         padding-left: 0.2rem;
//         margin-bottom: 0.2rem;
//         align-items: center;
//         justify-content: space-around;
//         .my_info_cont_l {

//           width: 2.8rem;

//           .user_info {
//             font-size: 0.14rem;
//             line-height: 0.26rem;
//             color: #606266;
//             width: 2.5rem;

//             .user_des {

//               width: 1.1rem;


//               float: left;

//             }
//             .user_name {
//               width: 1.4rem;

//               overflow: hidden;
//               text-overflow: ellipsis;
//               white-space: nowrap;

//               float: left;

//             }
//           }
//         }
//         .my_info_cont_r {
//           flex: 1;
//           margin: 0.1rem;
//           img {
//             width: 100%;
//             min-width: 0.7rem;
//             height: 100%;
//             min-height: 1rem;
//             border: 1px solid #b1cde1;
//           }
//         }
//       }
//     }
//     .glaj {
//       flex: 1;
//       min-height: 1.5rem;
//       display: flex;
//       flex-direction: column;
//       border-bottom: 1px solid #f6f7fb;
//       margin-bottom: 0.1rem;
//       .task_title {
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
//         height: 0.35rem;
//         padding: 0 0.1rem;
//         font-size: 0.16rem;
//         line-height: 0.35rem;
//         color: #ff8c00;

//         .more {
//           font-size: 0.12rem;
//           cursor: pointer;
//         }
//       }
//       .aj_info {
//         display: flex;
//         flex-direction: column;

//         flex: 1;
//         font-size: 0.14rem;
//         line-height: 2.2;
//         color: #606266;
//         margin-bottom: 0.15rem;
//         padding: 0 0.1rem;
//         p {
//           display: flex;
//           align-items: center;
//           justify-content: center;

//           text-align: center;
//           width: 95%;
//           height: 95%;
//           margin: 0 auto;
//           color: #000;
//           background: #efefef;
//         }
//         .aj_title {
//           display: flex;
//           justify-content: center;
//           span {
//             display: flex;
//             justify-content: center;
//           }
//           span:first-child {
//             flex: 1;
//           }
//           span:nth-child(2) {
//             flex: 3;
//           }
//           span:last-child {
//             flex: 2;
//           }
//         }
//         .aj_cont {
//           display: flex;
//           justify-content: center;
//           span {
//             display: flex;
//             justify-content: center;
//           }
//           span:first-child {
//             flex: 1;
//           }
//           span:nth-child(2) {
//             flex: 3;
//           }
//           span:last-child {
//             flex: 2;
//           }
//         }
//       }
//     }
//     .my_task {
//       flex: 1;
//       display: flex;
//       flex-direction: column;
//       margin-top: 1px;
//       border-bottom: 1px solid #f6f7fb;
//       margin-bottom: 0.1rem;
//       min-height: 1.5rem;
//       .task_title {
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
//         height: 0.35rem;
//         padding: 0 0.1rem;
//         font-size: 0.16rem;
//         line-height: 0.35rem;
//         color: #ff8c00;

//         .more {
//           font-size: 0.12rem;
//           cursor: pointer;
//         }
//       }
//       .task_cont {
//         padding: 0 0.2rem;
//         margin-bottom: 0.15rem;
//         line-height: 2.2;
//         flex: 1;
//         p {

//           display: flex;
//           justify-content: center;
//           align-items: center;
//           text-align: center;
//           width: 100%;
//           height: 100%;
//           font-size: 0.14rem;
//           background: #efefef;
//         }
//       }
//     }
//     .my_msg {
//       border: none;
//       flex: 1;
//     }
//   }
// }

// .pop_up {

//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;

//   background: rgba(122, 117, 117, 0.8);
//   z-index: 9;
//   .cont {
//     width: 12.8rem;
//     height: 7.3rem;
//     background: #fff;
//     border-radius: 0.1rem;

//     margin: 5% auto;
//   }
//   .title {
//     width: 100%;
//     line-height: 0.6rem;
//     font-size: 0.2rem;
//     border-bottom: 1px solid #ccc;
//     padding: 0 2%;
//     p {
//       float: left;
//     }
//     span {
//       float: right;
//       margin-right: 1%;
//       color: #64affa;
//       cursor: pointer;
//       img {
//         width: 0.14rem;
//       }
//     }
//   }
//   .title::after {
//     display: block;
//     content: "";
//     clear: both;
//   }
//   .content {
//     width: 100%;
//     height: 5.85rem;
//     display: flex;
//     h2 {
//       width: 1.5rem;
//       height: 0.2rem;
//       line-height: 0.2rem;

//       margin-top: 0.1rem;
//       font-size: 0.16rem;
//       margin-left: 0.3rem;
//       padding-left: 0.1rem;
//       border-left: 0.03rem solid #58a9ff;
//     }
//     .left {
//       display: flex;
//       flex-direction: row;
//       flex-wrap: wrap;
//       width: 25%;
//       height: 5.85rem;
//       border-right: 1px solid #ccc;
//       box-sizing: border-box;
//       .l_title {
//         width: 100%;
//         height: 0.4rem;
//         background: #ebf1f5;
//         border-bottom: 1px solid #ccc;
//       }
//       .l_cont {
//         width: 100%;
//         height: 5rem;
//         overflow: hidden;
//         padding: 6%;
//         ul {
//           width: 100%;
//           height: 4.3rem;
//           padding: 2%;
//           overflow: hidden;
//           li {
//             display: inline-block;
//             width: 1.15rem;
//             height: 0.78rem;
//             margin-bottom: 3%;
//             cursor: pointer;
//             margin-left: 5%;
//             position: relative;
//             img {
//               width: 100%;
//               height: 100%;
//             }
//           }
//           .lactive::after {
//             content: " ";
//             position: absolute;
//             top: -0.05rem;
//             right: -0.05rem;
//             width: 0.2rem;
//             height: 0.2rem;
//             border-radius: 50%;
//             background: url(../assets/sm_minus.png) no-repeat center center;
//           }
//         }
//       }
//       .l_btn {
//         width: 100%;
//         height: 0.45rem;
//         background: #ecf2f5;
//         border-bottom: 1px solid #ccc;
//         border-top: 1px solid #ccc;
//         span {
//           display: block;
//           width: 0.8rem;
//           line-height: 0.25rem;
//           background: #67c23a;
//           margin: 0.08rem auto;
//           text-align: center;
//           border-radius: 0.02rem;
//           border: 1px solid #55b227;
//           cursor: pointer;
//         }
//       }
//     }
//     .right {
//       display: flex;
//       flex-direction: row;
//       flex-wrap: wrap;
//       width: 75%;
//       height: 5.85rem;
//       box-sizing: border-box;
//       .r_title {
//         width: 100%;
//         height: 0.4rem;
//         background: #ebf1f5;
//         border-bottom: 1px solid #ccc;
//       }
//       .r_cont {
//         width: 100%;
//         height: 5.45rem;
//         overflow-y: auto;

//         border-bottom: 1px solid #ccc;
//         p {
//           width: 100%;
//           line-height: 0.4rem;
//           font-size: 0.14rem;
//           color: #409eff;
//           padding-left: 0.3rem;
//         }
//         .combat {
//           width: 100%;

//           margin-bottom: 2%;
//           .combat_cont {
//             width: 100%;

//             padding-left: 0.3rem;
//             cursor: pointer;
//             ul {
//               li {
//                 display: inline-block;
//                 width: 1.15rem;
//                 height: 0.78rem;
//                 cursor: pointer;
//                 margin-right: 2%;
//                 position: relative;
//                 img {
//                   width: 100%;
//                   height: 100%;
//                 }
//               }
//             }
//             .ractive::after {
//               content: " ";
//               position: absolute;
//               top: -0.05rem;
//               right: -0.05rem;
//               width: 0.2rem;
//               height: 0.2rem;
//               border-radius: 50%;
//               background: url(../assets/sm_add.png) no-repeat center center;
//             }
//           }
//         }
//       }
//     }
//   }
//   .btn {
//     display: flex;
//     justify-content: center;

//     margin-top: 1.5%;
//     span {
//       width: 1rem;
//       height: 0.4rem;
//       line-height: 0.4rem;
//       font-size: 0.2rem;
//       background: #409eff;
//       text-align: center;
//       border-radius: 0.05rem;
//       color: #fff;
//       cursor: pointer;
//       &:last-child {
//         margin-left: 10%;
//         color: #606266;
//         border: 1px solid #dcdfe6;
//         background: #fff;
//       }
//       &:first-child:hover {
//         color: #fff;
//         border-color: #66b1ff;
//         background: #66b1ff;
//       }
//       &:last-child:hover {
//         color: #409eff;
//         border-color: #c6e2ff;
//         background: #ecf5ff;
//       }
//     }
//   }
// }
  .mainBody{
    display: flex;
    flex-direction: column;
    margin-top:1.2rem;
    height: calc(100vh - 1.2rem);
    min-height:660px;
  }
  .contentwrap{
    display: flex;
    width: 100%;
    flex:1;
    // background:#f4f4f4;
    //padding-top:0.1rem;
    overflow: hidden;
    .contentleft{
      display: flex;
      width: 75%;
      margin: 0 1%;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .custom{
        display: flex;
        width: 100%;
        height:3.5rem;
        flex-direction: column;
        background:url(../assets/images/newIndex/wktable.png) center no-repeat;
        background-size:100% 100%;
        // border: 1px solid rgba(15, 44, 79, 0.5);
        // background-color: rgba(16, 35, 56, 0.5);
        // background:#fff;
       // border: 1px solid #dcdfe6;
        // box-shadow:0 1px 1px rgba(15, 44, 79, 0.5);
        .mytable{
          display: flex;
          // align-items: center;
          // justify-content: space-between;
          height: 0.4rem;
          // padding-left: 0.2rem;
          color: #99c9fa;
          line-height:0.4rem;
          font-size: 0.14rem;
          // background:#409eff;
          // background-color: rgba(16, 35, 56, 0.5);
          span{
            display: block;
            text-align: center;
            font-size: 0.14rem;
            background-size:cover;
            // margin-right: 0.1rem;
            height:0.4rem;
            width:1.86rem;
            background:url(../assets/images/newIndex/wksel.png) center no-repeat;
            background-size:100% 95%;


          }
          & span:last-child{
            cursor: pointer;
            font-size:0.14rem;
            background:url(../assets/images/newIndex/wkys.png) center no-repeat;
            background-size:100% 95%;
            margin-left:-0.22rem;
            margin-top:0.03rem
          }
        }
        .table_info{
          display: flex;
          flex:1;
          /*align-items: center;*/
          .table_info_{
            display: flex;
            flex-wrap:wrap;
            flex:1;
            padding:0.18rem 0;
            /*justify-content: space-around;*/
            .cc_{
              // display: flex;
              // flex-direction: column;
              // justify-content: center;
              // align-items: center;
              width: 18%;
              margin: 0 1%;
              cursor: pointer;
              img{
                width:100%;
                height:100%;
              }
            }
          }
        }
      }
      .statistic_info_list{
        display: flex;
        flex: 1;
        /*height: 450px;*/
        width: 100%;
        justify-content: space-between;
        margin-top:0.2rem;
        // margin-bottom: 10px;
        .statistic_info_item{
          display: flex;
          flex-direction: column;
          flex: 1;
          height: 100%;
          background:url(../assets/images/newIndex/account.png) center no-repeat;
          background-size: 100% 100%;
          border: 1px solid rgba(15, 44, 79, 0.5);
          // box-shadow:0 1px 1px #d8d8d8;
          .ts{
            color: #999;
            font-size: 0.14rem;
            margin: 2%;
          }
          .statistic_info_title{
            display: flex;
            align-items: center;
            height: 0.33rem;
            // width: 100%;
            margin:0.1rem 0.16rem 0 0.16rem;
            // padding-left: 0.2rem;
            // line-height:0.33rem;
            font-size:0.15rem;
            color:#cdcfd1;
            /*background: url('../assets/mytable.png') no-repeat;*/
            /*background-size: cover;*/
            background:url(../assets/images/newIndex/title.png) center no-repeat;
            background-size: 100% 100%;
            img{
              border:none;
              margin:0 0.1rem;
              // vertical-align: middle
            }
            .time{
            border:none;
            width: 0.23rem;
            height: 0.18rem;
            }
            .area{
            width: 0.22rem;
            height: 0.14rem;
            }
            .video{
            width: 0.22rem;
            height: 0.17rem;
            }
          }
          .statistic_info_content{
            display: flex;
            flex: 1;
            // background: yellow;
          }
        }
        .m_sii{
          margin: 0 0.2rem;
        }
      }
    }
    .contentright{
      display: flex;
      flex-direction: column;
      width:22%;
      min-width: 3.5rem;
      background:url(../assets/images/newIndex/user.png) center no-repeat;
      background-size: 100% 100%;
      border: 1px solid rgba(15, 44, 79, 0.5);
      // box-shadow:0 1px 1px #d8d8d8;
      .current_user{
        height: 0.30rem;
        color: white;
        margin:0.1rem 0.1rem 0 0.1rem;
        padding-left:0.37rem;
        /*background: url('../assets/mytable.png') no-repeat;*/
        /*background-size: cover;*/
        font-size: 0.15rem;
        line-height:0.30rem;
        background:url(../assets/images/newIndex/title.png) center no-repeat;
        background-size: 100% 100%;
        position:relative;
        img{
          position:absolute;
          top:0.05rem;
          left:0.1rem;
          height:0.18rem;
          width:0.18rem;
        }
      }
      .my_info{
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid rgba(15, 44, 79, 0.5);
        margin-bottom: 0.1rem;
        .my_info_title{
          display: flex;
          align-items: center;
          height: 0.35rem;
          padding:0 0.1rem;
          font-size: 0.14rem;
          line-height:0.35rem;
           color:#cdcfd1;
        }
        .my_info_cont{
          display: flex;
          /*height: 1.2rem;*/
          padding-left: 0.2rem;
          margin-bottom: 0.2rem;
          align-items: center;
          justify-content:space-around;

          // background: #409eff;
          .my_info_cont_l{
            /*display: flex;*/
            width: 2.8rem;
            font-size: 0.12rem;
            //border:1px solid rgba(15, 44, 79, 0.5);
            /*flex-direction: column;*/
            /*justify-content: space-around;*/
            /*height: 1.18rem;*/
            /*min-height: 108px;*/
            /*position: relative;*/
            .user_info{

              line-height:0.3rem;
              color:#99c9fa;
              width: 2.5rem;
              overflow: hidden;
              /*height:0.3rem;*/
              /*position: relative;*/
              .user_des{
                /*line-height:0.3rem;*/
                width: 1.1rem;
                /*height: 0.3rem;*/
                /*position: absolute;*/
                float: left;
                /*top: 0;*/
                /*left: 0;*/
              }
              .user_name{
                width: 1.4rem;
                /*height: 0.3rem;*/
                /*line-height:0.3rem;*/
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                /*position: absolute;*/
                float: left;
                /*top: 0;*/
                /*left: 1.1rem;*/
              }
            }
          }
          .my_info_cont_r{
            flex: 1;
            margin: 0.1rem;
            img{
             width: 85%;
              height: 85%

              // border:1px solid #b1cde1;

            }
          }
        }
      }
      .glaj{
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid rgba(15, 44, 79, 0.5);
        margin-bottom: 0.1rem;
        .task_title{
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 0.35rem;
          padding:0 0.1rem;
          font-size: 0.14rem;
          line-height:0.35rem;
          color:#cdcfd1;
          // background: url('../assets/mytable.png') no-repeat;
          // background-size: cover;
          .more{
            font-size:0.12rem;
            cursor: pointer;
            color:#00a0ff;
          }
        }
        .aj_info{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          font-size: 0.12rem;
          line-height:0.3rem;
          color: #99c9fa;
          margin-bottom:0.15rem;
          padding:0 0.1rem;
          p{
            margin-left: 3%;
          }
          .aj_title{
            display: flex;
            justify-content: space-between;
            background: rgba(0,0,0,0.05);
            span{
              // display: flex;
              // justify-content: center;
              text-align: left;
            }
            span:first-child{
              // flex: 1;
              width: 1rem
            }
            span:nth-child(2){
              // flex: 3;
              width: 1.2rem;
              //
            }
            span:last-child{
              // flex: 2;
              width: 1rem;
              //  text-align: center;
            }
          }
          .aj_cont{
            display: flex;
            justify-content: space-between;

            span{
              // display: flex;
              // white-space: nowrap;
              // justify-content: center;
              text-align: left;
              display:inline-block;
              height:0.3rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            span:first-child{
              // flex: 1;
              width: 1rem;
            }
            span:nth-child(2){
              // flex: 1.5;
              width: 1.2rem;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            span:last-child{
              // flex: 2.3;
              width: 1rem;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .glaj:last-child{
        border-bottom:none;
      }
    }
  }

  .menuList{
    .checkedList{
      border-bottom:1px solid red;
    }
    .checkedList, .allList{
      display: flex;
      flex-wrap: wrap;
      .menuItem{
        width: 1.78rem;
        height:0.8rem;
        margin: 0.1rem;
        cursor: pointer;
        background-color: #f0f5f9;
        background-size : 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }

  // 弹出框
  .pop_up{
    // display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    // margin-top: 1.5rem;
    // margin-left: 2.5rem;
    background: rgba(0,0,0, 0.3);
    // opacity: 0.9;
    z-index: 9;
    .cont{
      width: 12.8rem;
      height: 7.19rem;
      background:url(../assets/updataImg/home-bg.png) center no-repeat;
      background-size: 100% 100%;
      // background:#fff;
      // border-radius: 0.1rem;
      // padding: 0.2rem;
      margin: 5% auto;
    }
    .title{
      width: 100%;
      line-height: 0.6rem;
      font-size: 0.2rem;
      border-bottom: 1px solid rgba(20,57,96,0.8);
      padding: 0 2%;
      background: rgba(20,57,96,0.8);
      color:#cdcfd1;
      p{
        float: left;
      }
      span{
        float: right;
        margin-right: 1%;
        color: #64affa;
        cursor: pointer;
        img{
          width: 0.14rem;
        }
      }
    }
    .title::after{
      display: block;
      content: "";
      clear: both;
    }
    .content{
      width: 100%;
      height: 5.85rem;
      display: flex;
      h2{
        width: 1.5rem;
        height: 0.2rem;
        line-height: 0.2rem;
        // background: #409eff;
        // line-height: 0.4rem;
        margin-top: 0.1rem;
        font-size: 0.16rem;
        margin-left: 0.3rem;
        padding-left: 0.1rem;
        border-left: 0.03rem solid #cdcfd1;
      }
      .left{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 25%;
        height: 5.85rem;
        border-right: 1px solid rgba(255, 255, 255, 0.2);
        box-sizing: border-box;
        border-left: 1px solid rgba(255, 255, 255, 0.2);
        .l_title{
          width: 100%;
          height: 0.4rem;
          background-color: rgba(34, 70, 112, 0.31);
          border-top: 1px solid  rgba(255, 255, 255, 0.2);
         color:#cdcfd1;
        }
        .l_cont{
          width: 100%;
          height: 5rem;
          overflow: hidden;
          background:rgba(16,35,56,0.31);
          // display: flex;
          // justify-content: center;
          // align-items:center;
          // flex-wrap: wrap;
          // margin-top: 2%;
          padding: 6%;
          ul{
            width: 100%;
            height: 4.3rem;
            padding: 2%;
            overflow: hidden;
            li{
              display: inline-block;
              width: 1.15rem;
              height: 0.78rem;
              margin-bottom: 3%;
              cursor: pointer;
              margin-left: 5%;
              position: relative;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .lactive::after{
              content: " ";
              position: absolute;
              top: -0.05rem;
              right: -0.05rem;
              width: 0.2rem;
              height: 0.2rem;
              border-radius: 50%;
              background: url(../assets/sm_minus.png) no-repeat center center;
            }
          }
        }
        .l_btn{
          width: 100%;
          height: 0.46rem;
          // line-height:0.46rem;
          background: rgba(34,70,112,0.09);
          // border-bottom: 1px solid #ccc;
          border-top: 1px solid rgba(0,0,0,.5);
          span{
            display: block;
            width: 0.8rem;
            font-size: 0.12rem;
            height: 0.25rem;
            line-height: 0.25rem;
            background:rgba(43,66,91,0.5);
            margin: 0.08rem auto;
            text-align: center;
            color:#cdcfd1;
            border-radius: 0.02rem;
            border: 1px solid rgba(43,66,91,1);
            cursor: pointer;
          }
        }
      }
      .right{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 75%;
        height: 5.85rem;
        box-sizing: border-box;
        .r_title{
          width: 100%;
          height: 0.4rem;
          background: rgba(20,57,96,0.31);
          color:#cdcfd1;
          // border-bottom: 1px solid #ccc;
        }
        .r_cont{
          width: 100%;
          height: 5.45rem;
          overflow-y: auto;
          // background: #ccc;
          // border-bottom: 1px solid #ccc;
          p{
            width: 100%;
            line-height: 0.4rem;
            font-size: 0.14rem;
          color:#cdcfd1;
            padding-left: 0.3rem;
          }
          .combat{
            width: 100%;
            margin-bottom: 2%;
            .combat_cont{
              width: 100%;
              padding-left: 0.3rem;
              cursor: pointer;
              ul{
                li{
                  display: inline-block;
                  width: 1.15rem;
                  height: 0.78rem;
                  cursor: pointer;
                  margin-right: 2%;
                  margin-bottom:0.04rem;
                  position: relative;
                  img{
                    width: 100%;
                    height: 100%;
                  }
                }
              }
              .ractive::after{
                content: " ";
                position: absolute;
                top: -0.05rem;
                right: -0.05rem;
                width: 0.2rem;
                height: 0.2rem;
                border-radius: 50%;
                background: url(../assets/sm_add.png) no-repeat center center;
              }
            }
          }
        }
      }
    }
    .btn{
      // display: flex;
      // justify-content: center;
      height:0.72rem;
      background: rgba(20,57,96,0.29);
      border-top:1px solid rgba(29,74,122,0.29);
      border-bottom:1px solid rgba(29,74,122,0.29);
      padding-right:0.3rem;
      box-sizing: border-box;
      span{
        display: block;
        float:right;
        width: 0.78rem;
        height: 0.28rem;
        line-height: 0.28rem;
        margin-top:0.22rem;
        // font-size: 0.2rem;
        // background:url(../../assets/images/confirm/truenormal.png) center no-repeat;
        // background-size: 100% 100%;
        // text-align: center;
        // border-radius: 0.05rem;
        // color: #fff;
        cursor: pointer;
        &:first-child{
        background:url(../assets/images/confirm/truenormal.png) center no-repeat;
        background-size: 100% 100%;
        }
        &:last-child{
          margin-right: 0.07rem;
          // color: #606266;
          // border: 1px solid #dcdfe6;
          // background: #fff;
        background:url(../assets/images/confirm/canclenormal.png) center no-repeat;
        background-size: 100% 100%;
        }
        &:first-child:hover{
          // color: #fff;
          // border-color: #66b1ff;
        background:url(../assets/images/confirm/truehover.png) center no-repeat;
        background-size: 100% 100%;
        }
        &:last-child:hover{
          // color: #409eff;
          // border-color: #c6e2ff;
        background:url(../assets/images/confirm/canclehover.png) center no-repeat;
        background-size: 100% 100%;
        }
      }
    }
    ::-webkit-scrollbar {
  width: 0.05rem;
  height: 0.05rem;
}

::-webkit-scrollbar-thumb {
  border-radius: 0.05rem;
  background-color: rgba(153, 201, 250, 0.38);
}
  }
</style>
