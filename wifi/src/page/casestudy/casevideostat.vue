<template>
 <div class="caseinfo">
    <div class="topInfo">
       <img src="../../assets/updataImg/location.png" alt="">
        <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 > </router-link>
      <div class="sysname ">&nbsp;部门视频统计</div>
    </div>
    <div class="mainbox">
      <div class="centermain">
         <div class="maintilebox">
        <p class="maintile">部门视频统计</p>
          <div class="main_top">
            <p>
              <span>时间：</span>
              <input class="timeInput" type="text" id="startTime" readonly v-model="startTime" placeholder="请选择开始时间" />
              <span>至</span>
              <input class="timeInput" type="text" id="endTime" readonly v-model="endTime" placeholder="请选择结束时间"  />
              <el-button type="primary" class="searchBtn" icon='el-icon-search' @click="getQuery">统计</el-button>
              <el-button type="warning"  class="tryBtn" icon='el-icon-refresh' @click="getReset">重置</el-button>
              <el-button type="success" class="topBtn"  @click="export2Excel">导出</el-button>
            </p>

          </div>
          </div>
        <div class="mainchars">
          <!-- <div class="main_top">
            <p>
              <span>时间：</span>
              <input class="timeInput" type="text" id="startTime" readonly v-model="startTime" placeholder="请选择开始时间" />
              <span>至</span>
              <input class="timeInput" type="text" id="endTime" readonly v-model="endTime" placeholder="请选择结束时间"  />
              <el-button type="primary" @click="getQuery">统计</el-button>
              <el-button type="success" @click="export2Excel">导出</el-button>
              <el-button type="warning" @click="getReset">重置</el-button>
            </p>

          </div> -->
          <div class="mainContent">
            <div class="main_btn main_btnleft" id="one">
                <p class="btntitle"> <img src="../../assets/images/count/lefticon.png" alt="">部门视频柱状统计分析图</p>
                <div id="caseTimebar"  style="width: 100%;height: calc(100% - 0.47rem)"></div>
            </div>
            <div class="main_btn main_btnright" id="two">
                 <p class="btntitle"><img src="../../assets/images/count/righticon.png" alt="">部门视频饼状统计分析图</p>
              <div id="caseTimepie"  style="width: 100%;height: calc(100% - 0.47rem)"></div>
            </div>
          </div>
        </div>
      </div>
      <footerSecond />
    </div>
 </div>
</template>

<script>
  import footerSecond from '../../components/footer_second'
  export default {
    components: {
      footerSecond
    },
    data() {
      return {
        loading:null,
        imgoneshow: false,
        imgtwoshow: true,
        time: [],
        getVideoData:[],
        xShowData:[],
        showData:[],
        legendData:[],
        showPieData:[],
        startTime: null,//this.getDateString(new Date().getTime() - 29*24*60*60*1000).split(' ')[0],
        endTime: null, //this.getDateString(new Date().getTime()).split(' ')[0],

        startTimeLayDate:null,
        endTimeLayDate:null
      };
    },
    mounted() {
      let _this = this;
      this.startTimeLayDate = laydate.render({
        elem: '#startTime',
        type: 'date',
        btns: ['now','confirm'],
        max: 0,
        done: function (value, date) {
          _this.startTime = value;
          _this.endTimeLayDate.config.min = {
            year:date.year,
            month:date.month-1, //关键
            date: date.date
          };
        }
      });
      this.endTimeLayDate= laydate.render({
        elem: '#endTime',
        type: 'date',
        btns: ['now','confirm'],
        max: 0,
        done: function (value, date) {
          _this.endTime = value;
          _this.startTimeLayDate.config.max={
            year:date.year,
            month:date.month-1,//关键
            date: date.date
          }
        }
      });
    },
    created(){
      this.getVideo();
    },
    methods: {
      getEchar() {
        let myChart = this.$echarts.init(document.getElementById("caseTimebar"), "macarons");
        let option = {
          tooltip: {
            trigger: "item",
            axisPointer: {
              type: "shadow",
              label: {
                show: true
              }
            }
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              // dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true,name:'部门视频统计' }
            }
          },

          xAxis: {
            type: "category",
            data:this.xShowData,
            axisLabel: {
              show: true,
              textStyle: {
               color:"rgba(153,201,250)",
                fontSize: 14
              }
            },
             axisLine:{
                  lineStyle:{
                    color:"rgba(153,201,250,.5)",
                  }
              },
              axisTick: {
              show: false
            },
          },
          yAxis: {
            type: "value",
            name: "数量",
               axisLabel: {
              show: true,
              textStyle: {
              color:"rgba(153,201,250)",
                fontSize: 14
              }
            },
              axisTick: {
              show: false
            },
              splitLine:{
                  lineStyle:{
                    color:['rgba(0,0,0,0)','rgba(153,201,250,.5)','rgba(153,201,250,.5)','rgba(153,201,250,.5)','rgba(153,201,250,.5)','rgba(153,201,250,.5)','rgba(153,201,250,.5)'],
                    type:'dashed'
                    }
              },
                axisLine:{
                  lineStyle:{
                     color:"rgba(153,201,250,.5)"
                  }
              },
              splitArea:{
                show:false
              }
          },

          series: [
            {
              data: this.showData,
              barWidth: 30,
              barGap: "50%",
              name: "部门视频统计",
              type: "bar",
              itemStyle: {
                normal: {
                  color: function(params) {
                    var colorList = [
                   "rgba(178,105,199)","rgba(156,112,209)","rgba(142,108,228)","rgba(102,99,230)",
                    "rgba(63,93,223)","rgba(52,126,227)","rgba(27,139,217)","rgba(46,121,245)","rgba(46,180,250)",
                    "rgba(107,163,255)","rgba(178,105,199)","rgba(156,112,209)","rgba(142,108,228)","rgba(102,99,230)",
                    "rgba(63,93,223)","rgba(52,126,227)","rgba(27,139,217)","rgba(46,121,245)","rgba(46,180,250)",
                    "rgba(107,163,255)"
                    ];
                    return colorList[params.dataIndex];
                  }
                },
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function() {
          setTimeout(function() {
            myChart.resize();
          }, 100);
        });
      },
      getpie() {
        let myChart = this.$echarts.init(document.getElementById("caseTimepie"), "macarons");
        let option = {
          title: {
            x: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            type: "plain",
            left: '10%',
            top: "80%",
            itemGap: 15,
            width: "90%",
            height: "10%",
               textStyle:{
              color:"#99c9fa"
          },
            // orient: "vertical",
            data:this.legendData
          },
          series: [
            {
              label: {
                //饼图图形上的文本标签
                normal: {
                  // show:true,
                  // position:'inner', //标签的位置
                  textStyle: {
                    fontWeight: 300,
                    fontSize: 16, //文字的字体大小
                  },
                  avoidLabelOverlap: true,   //是否启用防止标签重叠策略
                  // formatter:'{d}%'
                }
              },
              name: "部门视频统计",
              type: "pie",
              radius: "40%",
              center: ["45%", "40%"],
              data: this.showPieData,
              itemStyle: {
                normal: {
                   color: function(params) {
                      let colorList = [
                      "rgba(178,105,199)","rgba(156,112,209)","rgba(142,108,228)","rgba(102,99,230)",
                      "rgba(63,93,223)","rgba(52,126,227)","rgba(27,139,217)","rgba(46,121,245)","rgba(46,180,250)",
                      "rgba(107,163,255)","rgba(178,105,199)","rgba(156,112,209)","rgba(142,108,228)","rgba(102,99,230)",
                      "rgba(63,93,223)","rgba(52,126,227)","rgba(27,139,217)","rgba(46,121,245)","rgba(46,180,250)",
                      "rgba(107,163,255)"
                      ];
                      return colorList[params.dataIndex]
                    },
                  formatter(v) {
                      let text = Math.round(v.percent)+'%' + '' + v.name
                      if(text.length <= 8)
                      {
                          return text;
                      }else if(text.length > 8 && text.length <= 16){
                          return text = `${text.slice(0,8)}\n${text.slice(8)}`
                      }else if(text.length > 16 && text.length <= 24){
                          return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16)}`
                      }else if(text.length > 24 && text.length <= 30){
                          return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16,24)}\n${text.slice(24)}`
                      }else if(text.length > 30){
                          return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16,24)}\n${text.slice(24,30)}\n${text.slice(30)}`
                      }
                  }
                },
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function() {
          setTimeout(function() {
            myChart.resize();
          }, 100);
        });
      },
      //获取部门视频统计
      getVideo(){
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.$http({
          url:'pca/statistics/video',
          method:'get',
          params:{
            startTime:this.startTime,
            endTime:this.endTime
          }
        }).then((res)=>{
          this.loading.close();
          if(res.statusText=='OK'&& res.data.code==200){
            this.getVideoData = res.data.data;
            if(this.xShowData.length==0){
              for (let i = 0; i<this.getVideoData.length; i++) {
                this.xShowData.push(this.getVideoData[i].creatorOrg);
              }
            }
            this.showData=[];
            for (let i = 0; i < this.getVideoData.length; i++) {
              this.showData.push(this.getVideoData[i].countNum);
            }
            this.getEchar();

            this.legendData=[];
            for (let i = 0; i<this.getVideoData.length; i++) {
              this.legendData.push(this.getVideoData[i].creatorOrg);
            }
            this.showPieData=[];
            for (let i = 0; i < this.getVideoData.length; i++) {
              this.showPieData.push({value: this.getVideoData[i].countNum, name: this.legendData[i]});
            }
            this.getpie();
          }else{
            layer.alert('获取部门视频统计数据失败！',{icon:5,title:"消息提示"});
          }

        }).catch( res=>{
          console.log(res)
        })
      },
       //查询
      getQuery(){
        this.getVideo();
      },
      //重置
      getReset(){
        this.startTime = null;//this.getDateString(new Date().getTime() - 29*24*60*60*1000).split(' ')[0];
        this.endTime = null;//this.getDateString(new Date().getTime()).split(' ')[0];
        let maxDate =  {
          year: new Date().getFullYear(),
          month: new Date().getMonth(), //关键
          date: new Date().getDate()
        };
        this.startTimeLayDate.config.max = maxDate;
        this.endTimeLayDate.config.min = '1900-01-01';
        this.getVideo();
      },
      export2Excel() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('../../vendor/Export2Excel');
          const tHeader = ['部门', '视频数量'];
          const filterVal = ['creatorOrg', 'countNum'];
          const list = this.getVideoData;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '部门视频统计列表');
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    }
  };
</script>

<style scoped>


  @import "../../assets/css/commom.css";
  @import "../../assets/css/case_statistics.css";
  .main_btn {
    position: relative;

  }
  .main_btnleft{
    width:9.25rem;
   background:url('../../assets/images/count/leftechart.png') center no-repeat;
   background-size: 100% 100%
  }
.main_btnleft .btntitle{
  display:flex;
  align-items: center;
  height:0.47rem;
  line-height:0.47rem;
  margin: 0 0.06rem ;
  margin-top:0.04rem;
  font-size: 0.18rem;
padding-left:0.3rem;
color:#dcdfe0;
  background:url('../../assets/images/count/lefttitle.png') center no-repeat;
   background-size: 100% 100%
}
.main_btnleft img{
  width: 0.22rem;
  height:0.17rem;
  margin-right:0.11rem;
  vertical-align: middle
}
  .main_btnright{
     width:8.6rem;
   background:url('../../assets/images/count/rightechart.png') center no-repeat;
   background-size: 100% 100%
  }
  .main_btnright .btntitle{
  display:flex;
  align-items: center;
  height:0.47rem;
  line-height:0.47rem;
  margin: 0 0.06rem ;
  margin-top:0.04rem;
  font-size: 0.18rem;
padding-left:0.3rem;
color:#dcdfe0;
  background:url('../../assets/images/count/righttitle.png') center no-repeat;
   background-size: 100% 100%
}
.main_btnright img{
  width: 0.22rem;
  height:0.17rem;
  margin-right:0.11rem;
  vertical-align: middle
}
  .main_btn .handleout {
    position: absolute;
    top: 0.8rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    width: 3.05rem;
    height: 0.42rem;
    line-height: 0.42rem;
    /* border: 1px solid #ccc; */
    border-radius: 3px;
    color: #cae1fa;
    /* box-shadow: 2px 5px 6px rgba(0, 0, 0, 0.1); */
    background:url('../../assets/images/count/title.png') center no-repeat;
    background-size: 100% 100%;
    font-size: 0.2rem;
  }
  .maintilebox{
    width: 100%;
  background-color: rgba(20,38,61,.9);
  border-top:1px solid #235589;
  border-bottom:1px solid #0c2a4e;
    display:flex;
     justify-content: space-between
  }

</style>
