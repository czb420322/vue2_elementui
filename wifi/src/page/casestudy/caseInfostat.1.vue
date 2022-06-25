<template>
 <div class="caseinfo">
    <div class="topInfo">
       <img src="../../assets/updataImg/location.png" alt="">
       <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 ></router-link>
      <div class="sysname ">&nbsp;案件信息统计</div>
    </div>
    <div class="mainbox">

      <div class="centermain">
        <div class="maintilebox">
          <div class="maintile">案件信息统计</div>
          <div class="main_top">
            <div class="dpa">
              <span>办案单位：</span>
              <el-popover placement="bottom-start" trigger="click">
                <el-tree :data="getInitDeptData"
                   show-checkbox
                   default-expand-all
                   node-key="orgId"
                   ref="tree"
                   check-strictly
                   @check="handleClick"
                   :props="defaultProps">
                </el-tree>
                <input class="timeInput" slot="reference" readonly v-model.trim="deptNames" style="padding-left:5px" placeholder="请选择办案单位" title="请选择办案单位" />
              </el-popover>
            </div>
            <p class="margLR">
              <span>案发时间：</span>
              <el-input class="caseNameSelect timeSelect" type="text" id="startTime" readonly autocomplete="off" v-model="startTime" placeholder="请选择开始时间"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
              </el-input>
              <span>至</span>
              <el-input class="caseNameSelect timeSelect" type="text" id="endTime" readonly autocomplete="off" v-model="endTime" placeholder="请选择结束时间"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
              </el-input>
              <el-button  class="searchBtn" icon='el-icon-search' @click="getQuery">查询</el-button>
              <el-button class="tryBtn" icon='el-icon-refresh' @click="getReset">重置</el-button>
              <el-button   class="topBtn" @click="export2Excel">导出</el-button>
            </p>
          </div>
       </div>
        <!-- <p class="maintile">案件信息统计</p> -->
        <div class="mainchars">
          <div class="mainContent" v-if="showChars">
            <div class="main_btn main_btnleft">
              <p class="btntitle"> <img src="../../assets/images/count/lefticon.png" alt="">案件信息柱状统计分析图</p>
              <p class='handleout'>侦破率 ：{{rate}}%</p>
              <div id="caseNum" style="width: 100%;height:calc(100% - 0.47rem)"></div>
            </div>
            <div class="main_btn main_btnright">
              <p class="btntitle"><img src="../../assets/images/count/righticon.png" alt="">案件信息饼状统计分析图</p>
              <p class='handleout'>侦破率 ：{{rate}}%</p>
              <div id="caseNum2" style="width: 100%;height: calc(100% - 0.47rem)"></div>
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
        time: [],
        getInitDeptData: [],
        getCaseInformationData:[],
        rate:"",
        showData:[],
        showPieData:[],
        defaultProps:{
          children: 'children',
          label: 'orgName'
        },
        selectData:[],
        deptIds:null,
        deptNames:'',
        startTime: null,//this.getDateString(new Date().getTime() - 29*24*60*60*1000).split(' ')[0],
        endTime: null, //this.getDateString(new Date().getTime()).split(' ')[0],
        startTimeLayDate:null,
        endTimeLayDate:null,
        showChars:true
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
      this.getInitDept();
      this.getCaseInformation();
    },
    methods: {
      handleClick(data,checked) {
        this.deptNames = ''
        this.deptIds = checked.checkedKeys.join(",");
        if(checked.checkedNodes.length){
          for (let i = 0; i < checked.checkedNodes.length; i++) {
            this.deptNames += checked.checkedNodes[i].orgName + ','
          }
          this.deptNames = this.deptNames.substr(0, this.deptNames.length - 1)
        }else{
          this.deptNames = ''
        }


      },
      getEchar() {
        var showData =this.showData;
        let myChart = this.$echarts.init(document.getElementById("caseNum"), "macarons");
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
              magicType: { show: true, type: ["line", "bar"] },  //柱状，折线
              restore: { show: true },  //重置
              saveAsImage: {  //下载
                show: true,
                name:"案件信息统计"
              }
            },
            x:780,
            y:'top'
          },
          xAxis: {
            type: "category",
            data: ["案件数量", "已破案件", "未破案件"],
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
            minInterval: 1,
            type: "value",
            name: "数量(件)",
            axisLabel: {
              show: true,
              textStyle: {
              color:"rgba(153,201,250)",
                fontSize: 14
              },
              minInterval:1,
            },
              axisTick: {
              show: false
            },
              splitLine:{
                lineStyle:{
                  color:['rgba(0,0,0,0)','rgba(153,201,250,.5)','rgba(153,201,250,.5)','rgba(153,201,250,.5)','rgba(153,201,250,.5)','rgba(153,201,250,.5)','rgba(0,0,0,0)'],
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
              data: showData,
              barWidth: 30,
              type: "bar",
              itemStyle: {
                normal: {
                  color: (params) => {
                    var colorList = this.$store.state.echarColorList
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
        var showPieData = this.showPieData;
        let myChart = this.$echarts.init(document.getElementById("caseNum2"),"macarons");
        let option = {
          title: {
            x: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            type: 'plain',
            left: '10%',
            top: "80%",
            width: "90%",
            height: "10%",
            itemGap: 15,
            textStyle:{
              color:"#99c9fa"
            },
            // orient: 'vertical',
            data: ["案件数量", "已破案件", "未破案件"]
          },
          series: [
            {
              label:{            //饼图图形上的文本标签
                normal:{
                  // show:true,
                  // position:'inner', //标签的位置
                  textStyle : {
                    fontWeight : 300 ,
                    fontSize : 16    //文字的字体大小
                  },
                  // formatter:'{d}%'
                }
              },
              name: "案件信息统计",
              type: "pie",
              radius: "40%",
              center: ["45%", "40%"],
              data: showPieData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                },
                  normal: {
                        color: (params)=> {
                          var colorList = this.$store.state.echarColorList
                          return colorList[params.dataIndex]
                        }
                      }
              }
            }
          ]
        };

        myChart.setOption(option);
        //图表自适应
        window.addEventListener("resize", function() {
          setTimeout(function() {
            myChart.resize();
          }, 100);
        });
      },
       //获取办案单位
      // getInitDept(){
      //   this.$http({
      //     url:'pca/statistics/initDept',
      //     method:'get'
      //   }).then((res)=>{
      //     if(res.statusText=='OK'&& res.data.code==200){
      //       this.getInitDeptData = res.data.data;
      //     }else{
      //       this.$notify({
      //         type: 'warning',
      //         message: '获取办案单位列表失败！',
      //         position: 'bottom-right',
      //         duration: 3000
      //       });
      //     }
      //   }).catch( res=>{
      //     console.log(res)
      //   })
      // },

      //获取办案单位
      getInitDept(){
        this.$http({
          url:'pca/statistics/initAllVsasDept',
          method:'get'
        }).then((res)=>{
          if(res.statusText=='OK'&& res.data.code==200){
            let arr = []
            for (const key in res.data.data) {
              arr.push(key)
            }
            let arr1 = []
            for (let i = 0; i < arr.length; i++) {
              arr1.push(res.data.data[arr[i]])
            }
            let ccc = []
            for (let i = 0; i < arr1.length; i++) {
              ccc = ccc.concat(arr1[i])
            }
            this.getInitDeptData = ccc
          }else{
            this.$notify({
              type: 'warning',
              message: '获取办案单位列表失败！',
              position: 'bottom-right',
              duration: 3000
            });
          }
        }).catch( res=>{
          console.log(res)
        })
      },

      //获取案件信息统计
      getCaseInformation(){
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.$http({
          url:'pca/statistics/caseInformation',
          method:'get',
          params:{
            deptIdsArr:this.deptIds,
            startTime:this.$commons.isEmpty(this.startTime) ? this.startTime : this.startTime + ' 00:00:00',
            endTime: this.$commons.isEmpty(this.endTime) ? this.endTime : this.endTime + ' 23:59:59'
          }
        }).then((res)=>{
          this.showChars = true
          this.loading.close();
          if(res.statusText=='OK'&& res.data.code==200){
            this.rate = res.data.data.rate;
            this.showData = [];
            this.showData.push(res.data.data.caseNum);
            this.showData.push(res.data.data.solvedNum);
            this.showData.push(res.data.data.unsolvedNum);
            this.$nextTick(()=>{
              this.getEchar();
            })


            this.showPieData = [];
            this.showPieData.push({value: res.data.data.caseNum, name: "案件数量"});
            this.showPieData.push({value: res.data.data.solvedNum, name: "已破案件"});
            this.showPieData.push({value: res.data.data.unsolvedNum, name: "未破案件"});
             this.$nextTick(()=>{
              this.getpie();
            })
          }else{
            this.$notify({
              type: 'warning',
              message: '获取案件信息统计数据失败！',
              position: 'bottom-right',
              duration: 3000
            });
          }
        }).catch( res=>{
          console.log(res)
        })
      },
      //查询
      getQuery(){
        this.showChars = false
        this.selectData=this.$refs.tree.getCheckedKeys();
        this.deptIds=this.selectData.join(",");
        this.getCaseInformation();
      },
      //重置
      getReset(){
        this.showChars = false;
        this.$refs.tree.setCheckedKeys([]);
        this.deptIds = null;
        this.deptNames = '';
        this.startTime = null;//this.getDateString(new Date().getTime() - 29*24*60*60*1000).split(' ')[0];
        this.endTime = null;//this.getDateString(new Date().getTime()).split(' ')[0];
        let maxDate =  {
          year: new Date().getFullYear(),
          month: new Date().getMonth(), //关键
          date: new Date().getDate()
        };
        this.startTimeLayDate.config.max = maxDate;
        this.endTimeLayDate.config.min = '1900-01-01';
        // this.getCaseInformation();
        this.getCaseInformation();
        // this.toolbox.feature.restore.show = true
      },

      export2Excel() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('../../vendor/Export2Excel');
          const tHeader = ['案件信息', '案件数量'];
          const filterVal = ['name', 'value'];
          const list = this.showPieData;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '案件数量统计列表');
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
.caseNameSelect{
  width: 1.87rem;
  font-size: 0.14rem;
  height:0.3rem;
  line-height: 0.3rem;
  color: #606266;
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
    top: 0.5rem;
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
