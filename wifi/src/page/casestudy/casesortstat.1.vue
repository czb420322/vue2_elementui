<template>
 <div class="caseinfo">
    <div class="topInfo">
       <img src="../../assets/updataImg/location.png" alt="">
        <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 ></router-link>
      <div class="sysname">&nbsp;案件分类统计</div>
    </div>
    <div class="mainbox">
      <div class="centermain">
         <div class="maintilebox">
        <p class="maintile">案件分类统计</p>
                <div class="main_top">
            <!-- <p> -->
              <span>统计依据：</span>
              <el-select v-model="countif" placeholder="请选择统计依据"  @change="selectCountif">
                <el-option
                  v-for="item in getCountifData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            <!-- </p> -->
            <div class="dpa margLR">
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
                <input class="timeInput" slot="reference" readonly v-model.trim="deptNames" placeholder="请选择办案单位" title="请选择办案单位" />
              </el-popover>
            </div>
            <p class="margLR">
              <span>省份：</span>
              <el-select v-model="provinceId" @change="selectProvince" placeholder="请选择省份">
                <el-option
                  v-for="item in getLoadProvinceData"
                  :key="item.regionId"
                  :label="item.regionName"
                  :value="item.regionId">
                </el-option>
              </el-select>
            <!--</p>-->
            <!--<p class="margLR">-->
              <!--<span>城市：</span>-->
              <el-select v-model="cityId" @change="selectCity" placeholder="请选择城市">
                <el-option
                    v-for="item in getLoadCityData"
                    :key="item.regionId"
                    :label="item.regionName"
                    :value="item.regionId">
                </el-option>
              </el-select>
            <!--</p>-->
            <!--<p class="margLR">-->
              <!--<span>县区：</span>-->
              <el-select v-model="countyId" @change="selectCounty" placeholder="请选择县区">
                  <el-option
                    v-for="item in getLoadCountyData"
                    :key="item.regionId"
                    :label="item.regionName"
                    :value="item.regionId">
                  </el-option>
              </el-select>
            </p>
            <p class="margLR">
              <span>案发时间：</span>
              <el-input class="caseNameSelect timeSelect" type="text" id="startTime" readonly autocomplete="off" v-model="startTime" placeholder="请选择开始时间"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
              </el-input>
              <span>至</span>
              <el-input class="caseNameSelect timeSelect" type="text" id="endTime" readonly autocomplete="off" v-model="endTime" placeholder="请选择结束时间"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
              </el-input>
            </p>
            <p>
              <el-button type="primary" icon='el-icon-search'  class="searchBtn" @click="getQuery">查询</el-button>
              <el-button type="warning" icon='el-icon-refresh' class="tryBtn" @click="getReset">重置</el-button>
              <el-button type="success"  class="topBtn" @click="export2Excel">导出</el-button>
            </p>
          </div>
          </div>
        <div class="mainchars">
          <!-- <div class="main_top">
            <p>
              <span>统计依据：</span>
              <el-select v-model="countif" placeholder="请选择"  @change="selectCountif">
                <el-option
                  v-for="item in getCountifData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </p>
            <div class="dpa margLR">
              <span>办案单位：</span>
              <el-popover placement="bottom-start" trigger="click">
                <el-tree :data="getInitDeptData"
                   show-checkbox
                   default-expand-all
                   node-key="orgName"
                   ref="tree"
                   check-strictly
                   @check="handleClick"
                   :props="defaultProps">
                </el-tree>
                <input class="timeInput" slot="reference" readonly v-model.trim="deptIds" placeholder="请选择办案单位" title="请选择办案单位" />
              </el-popover>
            </div>
            <p class="margLR">
              <span>省份：</span>
              <el-select v-model="provinceId" @change="selectProvince">
                <el-option
                  v-for="item in getLoadProvinceData"
                  :key="item.regionId"
                  :label="item.regionName"
                  :value="item.regionId">
                </el-option>
              </el-select> -->
            <!--</p>-->
            <!--<p class="margLR">-->
              <!--<span>城市：</span>-->
              <!-- <el-select v-model="cityId" @change="selectCity">
                <el-option
                    v-for="item in getLoadCityData"
                    :key="item.regionId"
                    :label="item.regionName"
                    :value="item.regionId">
                </el-option>
              </el-select> -->
            <!--</p>-->
            <!--<p class="margLR">-->
              <!--<span>县区：</span>-->
              <!-- <el-select v-model="countyId" @change="selectCounty">
                  <el-option
                    v-for="item in getLoadCountyData"
                    :key="item.regionId"
                    :label="item.regionName"
                    :value="item.regionId">
                  </el-option>
              </el-select>
            </p>
            <p class="margLR">
              <span>时间：</span>
              <input class="timeInput" type="text" id="startTime" readonly v-model="startTime" placeholder="请选择开始时间" />
              <span>至</span>
              <input class="timeInput" type="text" id="endTime" readonly v-model="endTime" placeholder="请选择结束时间"  />
            </p>
            <p>
              <el-button type="primary" @click="getQuery">统计</el-button>
              <el-button type="success" @click="export2Excel">导出</el-button>
              <el-button type="warning" @click="getReset">重置</el-button>
            </p>
          </div> -->
          <div class="mainContent" v-if="showChars">
            <div class="main_btn main_btnleft" id="one">
                 <p class="btntitle"> <img src="../../assets/images/count/lefticon.png" alt="">案件分类柱状统计分析图</p>
              <div id="caseTimebar" style="width: 100%;height: calc(100% - 0.47rem)"></div>
            </div>
            <div class="main_btn main_btnright" id="two">
               <p class="btntitle"><img src="../../assets/images/count/righticon.png" alt="">案件分类饼状统计分析图</p>
              <div id="caseTimepie" style="width: 100%;height: calc(100% - 0.47rem)"></div>
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
    data () {
      return {
        loading:null,
        imgoneshow:false,
        imgtwoshow:true,
        caseTimebar:true,
        caseTimepie:false,
        time: [],
        getCountifData: [{value: '00',label: '危害程度'},
           {value: '01',label: '作案手段'},
           {value: '02',label: '作案时机'},
           {value: '03',label: '侵犯目标'},
           {value: '04',label: '作案工具'},
           {value: '05',label: '案件类型'}
        ],
        countif:"00",
        getInitDeptData: [],
        deptIds:null,
        defaultProps:{
          children: 'children',
          label: 'orgName'
        },
        deptNames:'',
        getLoadProvinceData:[],
        getLoadCityData: [],
        getLoadCountyData: [],
        getCaseBarChartData:[],
        provinceId:"",
        cityId:"",
        countyId:"",
        defaultProvince:"",
        regionId:"",
        xShowData:[],
        showData:[],
        legendData:[],
        showPieData:[],

        startTime: null,//this.getDateString(new Date().getTime() - 29*24*60*60*1000).split(' ')[0],
        endTime: null, //this.getDateString(new Date().getTime()).split(' ')[0],

        startTimeLayDate:null,
        endTimeLayDate:null,
        showChars:true
      }
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
      this.getLoadProvince();
      this.getDefaultRegion();
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
              saveAsImage: { show: true, name:'案件分类统计' }
            },
            x:780,
            y:'top'
          },
          xAxis: {
            type: "category",
            data: this.xShowData,
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
            minInterval:1,
            name: "数量(件)",
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
                    color:['rgba(0,0,0,0)','rgba(153,201,250,.5)','rgba(153,201,250,.5)','rgba(153,201,250,.5)',
                    'rgba(153,201,250,.5)','rgba(153,201,250,.5)'],
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
              name: "案件分类统计",
              type: "bar",
              itemStyle: {
            normal: {
                  color: (params)=> {
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
        let myChart = this.$echarts.init(document.getElementById("caseTimepie"),"macarons");
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
            itemGap: 15,
            width: "90%",
            height: "10%",
              textStyle:{
                  color:"#99c9fa"
              },
            // orient: 'vertical',
            data: this.legendData
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
              name: "案件分类统计",
              type: "pie",
              radius: "40%",
              center: ["45%", "40%"],
              data:this.showPieData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                },
                  normal: {
                  color: (params)=> {
                    let colorList = this.$store.state.echarColorList
                    return colorList[params.dataIndex]
                  }
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
      // //获取办案单位
      // getInitDept(){
      //   this.$http({
      //     url:'pca/statistics/initDept',
      //     method:'get'
      //   }).then((res)=>{
      //     if(res.statusText=='OK'&& res.data.code==200){
      //       this.getInitDeptData = res.data.data
      //     }else{
      //       layer.alert('获取办案单位列表失败！',{icon:5,title:"消息提示"});
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
      //获取省份
      getLoadProvince(){
        this.$http({
          url:'pca/statistics/loadProvince',
          method:'get'
        }).then((res)=>{
          if(res.statusText=='OK'&& res.data.code==200){
            this.getLoadProvinceData = res.data.data;
          }else{
            this.$notify({
              type: 'warning',
              message: '获取省份列表失败！',
              position: 'bottom-right',
              duration: 3000
            });
          }
        }).catch( res=>{
          console.log(res)
        })
      },
      //获取默认省份
      getDefaultRegion(){
        this.$http({
          url:'pca/statistics/defaultRegion',
          method:'get'
        }).then((res)=>{
          if(res.statusText=='OK'&& res.data.code==200){
            this.defaultProvince = res.data.data;
            this.provinceId = this.defaultProvince;
            this.getDefaultCity();
          }else{
            this.$notify({
              type: 'warning',
              message: '获取默认省份失败！',
              position: 'bottom-right',
              duration: 3000
            });
          }
        }).catch( res=>{
          console.log(res)
        })
      },
      //获取默认城市
      getDefaultCity(){
        this.$http({
          url:'pca/statistics/loadCity',
          method:'get',
          params:{
            id:this.provinceId
          }
        }).then((res)=>{
          if(res.statusText=='OK'&& res.data.code==200){
            this.getLoadCityData = res.data.data;
            this.cityId = this.getLoadCityData[0].regionId;
            this.regionId = this.cityId;
            this.getLoadCounty();
            this.getCaseBarChart();
          }else{
            this.$notify({
              type: 'warning',
              message: '获取城市列表失败！',
              position: 'bottom-right',
              duration: 3000
            });
          }
        }).catch( res=>{
          console.log(res)
        })
      },
      //获取对应省份的所有城市
      getLoadCity(){
        this.$http({
          url:'pca/statistics/loadCity',
          method:'get',
          params:{
            id:this.provinceId
          }
        }).then((res)=>{
          if(res.statusText=='OK'&& res.data.code==200){
             this.getLoadCityData = res.data.data;
             this.cityId = this.getLoadCityData[0].regionId;
             this.getLoadCounty();
             this.regionId = this.cityId;
          }else{
            this.$notify({
              type: 'warning',
              message: '获取城市列表失败！',
              position: 'bottom-right',
              duration: 3000
            });
          }
        }).catch( res=>{
          console.log(res)
        })
      },
      //获取县区
      getLoadCounty(){
        this.$http({
          url:'pca/statistics/loadCounty',
          method:'get',
          params:{
            id:this.cityId
          }
        }).then((res)=>{
          if(res.statusText=='OK'&& res.data.code==200){
            this.getLoadCountyData = res.data.data;
            this.countyId = "--请选择--";
          }else{
            this.$notify({
              type: 'warning',
              message: '获取县区列表失败！',
              position: 'bottom-right',
              duration: 3000
            });
          }
        }).catch( res=>{
          console.log(res)
        })
      },
      //获取案件分类统计
      getCaseBarChart(){
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.$http({
          url:'pca/statistics/caseBarChart',
          method:'get',
          params:{
            countif:this.countif,
            deptIdsArr:this.deptIds,
            placeCode:this.regionId,
            startTime:this.$commons.isEmpty(this.startTime) ? this.startTime : this.startTime + ' 00:00:00',
            endTime: this.$commons.isEmpty(this.endTime) ? this.endTime : this.endTime + ' 23:59:59'
          }
        }).then((res)=>{
          this.showChars = true
          this.loading.close();
          if(res.statusText=='OK'&& res.data.code==200){
            this.getCaseBarChartData = res.data.data;
            for (let i = 0; i < this.getCaseBarChartData.length; i++) {
              if(this.getCaseBarChartData[i].caseLevelDesc == null || this.getCaseBarChartData[i].caseLevelDesc == ''){
                this.getCaseBarChartData.splice(i,1)
              }
            }
            console.log(this.getCaseBarChartData,887777);
            this.xShowData=[];
            this.legendData=[];
            this.showData=[];
            this.showPieData=[];
            for (let i = 0; i<this.getCaseBarChartData.length; i++) {
              if(this.countif=="00"){
                if(this.getCaseBarChartData[i].caseLevelDesc){
                  this.xShowData.push(this.getCaseBarChartData[i].caseLevelDesc);
                  this.legendData.push(this.getCaseBarChartData[i].caseLevelDesc);
                  this.showData.push(this.getCaseBarChartData[i].countNum);
                  this.showPieData.push({value: this.getCaseBarChartData[i].countNum, name: this.getCaseBarChartData[i].caseLevelDesc});
                }
              }else if(this.countif=="01"){
                if(this.getCaseBarChartData[i].caseMethodDesc){
                  this.xShowData.push(this.getCaseBarChartData[i].caseMethodDesc);
                  this.legendData.push(this.getCaseBarChartData[i].caseMethodDesc);
                  this.showData.push(this.getCaseBarChartData[i].countNum);
                  this.showPieData.push({value: this.getCaseBarChartData[i].countNum, name: this.getCaseBarChartData[i].caseMethodDesc});
                }
              }else if(this.countif=="02"){
                if(this.getCaseBarChartData[i].caseOpportunityDesc){
                  this.xShowData.push(this.getCaseBarChartData[i].caseOpportunityDesc);
                  this.legendData.push(this.getCaseBarChartData[i].caseOpportunityDesc);
                  this.showData.push(this.getCaseBarChartData[i].countNum);
                  this.showPieData.push({value: this.getCaseBarChartData[i].countNum, name: this.getCaseBarChartData[i].caseOpportunityDesc});
                }
              }else if(this.countif=="03"){
                if(this.getCaseBarChartData[i].caseTargetDesc){
                  this.xShowData.push(this.getCaseBarChartData[i].caseTargetDesc);
                  this.legendData.push(this.getCaseBarChartData[i].caseTargetDesc);
                  this.showData.push(this.getCaseBarChartData[i].countNum);
                  this.showPieData.push({value: this.getCaseBarChartData[i].countNum, name: this.getCaseBarChartData[i].caseTargetDesc});
                }
              }else if(this.countif=="04"){
                if(this.getCaseBarChartData[i].caseToolDesc){
                  this.xShowData.push(this.getCaseBarChartData[i].caseToolDesc);
                  this.legendData.push(this.getCaseBarChartData[i].caseToolDesc);
                  this.showData.push(this.getCaseBarChartData[i].countNum);
                  this.showPieData.push({value: this.getCaseBarChartData[i].countNum, name: this.getCaseBarChartData[i].caseToolDesc});
                }
              }else if(this.countif=="05"){
                if(this.getCaseBarChartData[i].caseCategoryDesc){
                  this.xShowData.push(this.getCaseBarChartData[i].caseCategoryDesc);
                  this.legendData.push(this.getCaseBarChartData[i].caseCategoryDesc);
                  this.showData.push(this.getCaseBarChartData[i].countNum);
                  this.showPieData.push({value: this.getCaseBarChartData[i].countNum, name: this.getCaseBarChartData[i].caseCategoryDesc});
                }
              }
            }

            // this.showData=[];
            // for (let i = 0; i<this.getCaseBarChartData.length; i++) {
            //   this.showData.push(this.getCaseBarChartData[i].countNum);
            // }
            this.$nextTick(()=>{
              this.getEchar();
              this.getpie();
            })


            // this.showPieData=[];
            // for (let i = 0; i < this.getCaseBarChartData.length; i++) {
            //   this.showPieData.push({value: this.getCaseBarChartData[i].countNum, name: this.legendData[i]});
            // }



          }else{
            this.$notify({
              type: 'warning',
              message: '获取案件分类统计数据失败！',
              position: 'bottom-right',
              duration: 3000
            });
          }
        }).catch( res=>{
          console.log(res)
        })
      },
      //获取选中的Countif
      selectCountif(vId){
        let obj = {};
        obj = this.getCountifData.find((item)=>{
          return item.value == vId;
        });
        this.countif = obj.value;
      },
      //获取选中的省份
      selectProvince(vId){
        let obj = {};
        obj = this.getLoadProvinceData.find((item)=>{
          return item.regionId == vId;
        });
        this.provinceId = obj.regionId;
        this.getLoadCity();
        this.regionId = this.provinceId
      },
      //获取选中的城市
      selectCity(vId){
        let obj = {};
        obj = this.getLoadCityData.find((item)=>{
          return item.regionId == vId;
        });
        this.cityId = obj.regionId;
        this.getLoadCounty();
        this.regionId = this.cityId;
       },
      //获取选中的县区
      selectCounty(vId){
        let obj = {};
        obj = this.getLoadCountyData.find((item)=>{
          return item.regionId == vId;
        });
        this.countyId=obj.regionId;
        this.regionId=this.countyId;
      },
      //查询
      getQuery(){
        this.showChars = false
        this.selectData = this.$refs.tree.getCheckedKeys();
        this.deptIds = this.selectData.join(",");
        this.getCaseBarChart();
      },
      //重置
      getReset(){
        this.showChars = false
        this.$refs.tree.setCheckedKeys([]);
        this.deptNames = ''
        this.deptIds = null;
        this.startTime = null;//this.getDateString(new Date().getTime() - 29*24*60*60*1000).split(' ')[0];
        this.endTime = null;//this.getDateString(new Date().getTime()).split(' ')[0];
        let maxDate =  {
          year: new Date().getFullYear(),
          month: new Date().getMonth(), //关键
          date: new Date().getDate()
        };
        this.startTimeLayDate.config.max = maxDate;
        this.endTimeLayDate.config.min = '1900-01-01';
        this.countif = "00";
        this.provinceId = this.defaultProvince;
        this.getLoadCity();
        this.countyId = "--请选择--";
        this.getCaseBarChart();
      },
        //导出
      getExport(){
        this.$http({
          url:'pca/statistics/categoryExport',
          method:'get',
          params:{
            deptIdsArr:this.deptIds,
            startTime:this.startTime,
            endTime:this.endTime
          }
        }).then((res)=>{
          if(res.statusText=='OK'&& res.data.code==200){
            this.$notify({
              type: 'success',
              message: '导出成功！',
              position: 'bottom-right',
              duration: 3000
            });
          }else{
            this.$notify({
              type: 'error',
              message: '导出失败！',
              position: 'bottom-right',
              duration: 3000
            });
          }
        }).catch( res=>{
          console.log(res)
        })
      },

      export2Excel() {
    　　require.ensure([], () => {
    　　　const { export_json_to_excel } = require('../../vendor/Export2Excel');
    　　　const tHeader = [];
    　　　const filterVal = [];
          if(this.countif=="00"){
            tHeader.push('危害程度','案件数量');
            filterVal.push('caseLevelDesc','countNum');
          }else if(this.countif=="01"){
            tHeader.push('作案手段', '案件数量');
            filterVal.push('caseMethodDesc', 'countNum');
          }else if(this.countif=="02"){
            tHeader.push('作案时机', '案件数量');
            filterVal.push('caseOpportunityDesc', 'countNum');
          }else if(this.countif=="03"){
            tHeader.push('侵犯目标', '案件数量');
            filterVal.push('caseTargetDesc', 'countNum');
          }else if(this.countif=="04"){
            tHeader.push('作案工具', '案件数量');
            filterVal.push('caseToolDesc', 'countNum');
          }else if(this.countif=="05"){
            tHeader.push('案件类型', '案件数量');
            filterVal.push('caseCategoryDesc', 'countNum');
          }
　　　　　const list = this.getCaseBarChartData;
        console.log(list,777777);
　　　　　const data = this.formatJson(filterVal, list);
        console.log(data,554444);
          for (let i = 0; i < data.length; i++) {
            if(data[i][0] == ''){
              data[i][0] = '未知'
            }
          }
          if(this.countif=="00"){
            export_json_to_excel(tHeader, data, '危害程度统计列表');
          }else if(this.countif=="01"){
            export_json_to_excel(tHeader, data, '作案手段统计列表');
          }else if(this.countif=="02"){
            export_json_to_excel(tHeader, data, '作案时机统计列表');
          }else if(this.countif=="03"){
            export_json_to_excel(tHeader, data, '侵犯目标统计列表');
          }else if(this.countif=="04"){
            export_json_to_excel(tHeader, data, '作案工具统计列表');
          }else if(this.countif=="05"){
            export_json_to_excel(tHeader, data, '案件类型统计列表');
          }

　　　　})
　　　},
　　　formatJson(filterVal, jsonData) {
　　　　return jsonData.map(v => filterVal.map(j => v[j]))
　　　}
    }
  }
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
  .caseNameSelect {
    width: 1.5rem;
    font-size: 0.14rem;
    height:0.3rem;
    line-height: 0.3rem;
    color: #606266;
  }
  .main_top >>> .el-input__inner{
    width:1.5rem;
  }
  /* .main_top .dpa{
    position: relative;
    width:2.2rem;
  } */
  .timeInput{
    width:1.2rem;
  }
</style>
