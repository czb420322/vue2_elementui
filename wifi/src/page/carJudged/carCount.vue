<template>
  <div class="wrapper">
    <!-- <div class="topNav">
      <div class="nav-item">
        <router-link to="/carJudged?menuCode=300">车辆研判</router-link>
      </div>
      <div class="nav-item nav-item-search">车辆属性统计</div>
    </div> -->
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt="">
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/carJudged',query:{menuCode:300}}">车辆研判 > </router-link>
      <p class="sysname">&nbsp;车辆属性统计</p>
    </div>

    <!--监控区域-->
    <div class="mainContent">
      <ul class="searchCondition">
        <li class="searchTitle">
          <img src="../../assets/images/carJudged/car-icon.png" alt=""><span style="margin-left: 10px">车辆属性统计</span>
        </li>

        <li class="carTimeSearch">
          <div style="float: left;height:16px;width: 2px;background-color: #99c9fa;margin-right: 10px;margin-left: 10px"></div>
          过车时段查询
        </li>
        <li class="carTimeSearchInput">
          <div class="beginTime"><span style="color: #FA3535;font-size: 14px;margin-top: 4px">*&nbsp; </span> 开始时间</div>
          <input class="beginTimeInput" id="beginTime" v-model="beginTime" type="text" placeholder="请输入开始时间">
          <div class="beginTime"><span style="color: #FA3535;font-size: 14px;margin-top: 4px">*&nbsp; </span> 结束时间</div>
          <input class="beginTimeInput" id="endTime" v-model="endTime" type="text" placeholder="请输入结束时间">
          <!-- <div class="line"></div> -->
          <div class="queryBtn searchBtn" @click="searchList($event);getVehicleClassList();  getVehiclePlateColorList();getVehiclePlateClassList()">查&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;询
          </div>
        </li>

      </ul>
      <div class="content">
        <div class="contentTitle">
          <img src="../../assets/images/carJudged/count-icon-0.png" alt="">
          <span style="margin-left: 10px;color: #2e93fb;font-weight: 600;font-size: 14px">车辆属性统计</span>
          <!-- <div class="back" @click="backUp">返回上一页</div> -->
        </div>
        <div class="contentDetial">
          <div class="detialTitle">
            <div @click="changeItem($event);yesterDay()" class="detialTitleItem">24小时</div>
            <div @click="changeItem($event);lastWeek()" class="detialTitleItem">最近7天</div>
            <div @click="changeItem($event);lastMonth()" class="detialTitleItem">最近30天</div>
            <div @click="changeItem($event);lastThreeMonth()" class="detialTitleItem">最近90天</div>
            <div @click="changeItem($event);lastSixMonth()" class="detialTitleItem">最近半年</div>
          </div>
          <div class="detialTitleTxt">
            <span>统计时间范围:</span>
            <span v-text="beginTime"> </span> <span> --- </span>
            <span v-text="endTime">&nbsp;2018-03-26</span>
          </div>
          <!--      车辆类别统计  -->
          <div class="carTypeCountWrapper">
            <div class="carTypeCountHeader"><img src="../../assets/images/carJudged/count-icon.png" alt="">&nbsp;&nbsp;<span>车辆类别统计</span></div>
            <div class="carTypeCount">
              <!--百分比   -->
              <div class="carTypeCountPercent">
                <div style="width: 100%;height: 0.2rem;line-height: 0.2rem;margin-top: 5px;display: flex;flex-direction: row;padding-left:0.2rem;">
                  <div style="height: 14px;width: 2px;background-color: #3b9df4;float: left;margin-left: 10px;margin-top: 4px;margin-right: 10px"></div>
                  <span style="font-size:12px;float: left;color:#99c9fa">车辆类别百分比统计</span>
                </div>
                <div id="carTypeChartLeft" style="width:100%;height:100%;display: flex;overflow: hidden;" v-show="percent"></div>
                <div ref="carTypeCountPercent" class="ts"></div>
              </div>
              <!--数量统计-->
              <div class="carTypeCountNum">
                <div style="width: 100%;height: 20px;line-height: 20px;margin-top: 5px;display: flex;flex-direction: row">
                  <div style="height: 14px;width: 2px;background-color: #3b9df4;float: left;margin-left: 10px;margin-top: 4px;margin-right: 10px"></div>
                  <span style="font-size:12px;float: left;color:#99c9fa">车辆类别数量统计</span>
                </div>
                <div class="countChart" id="carTypeChartRight" v-show="percent"></div>
                <div ref="carTypeCountNum" class="ts"></div>
              </div>

            </div>
          </div>

          <div class="plateChartContainer">
            <!--车牌颜色统计-->
            <div class="carColorCount">
              <div class="carColorCountHeader"><img src="../../assets/images/carJudged/count-icon-2.png" alt="">&nbsp;&nbsp;<span>车牌颜色统计</span></div>
              <div id="carColorChart" style="width: 100%;height: 100%;display: flex" v-show="color"></div>
              <div ref="carColorCount" class="ts"></div>
            </div>
            <!--车牌类型统计-->
            <div class="carPlateCount">
              <div class="carPlateCountHeader"><img src="../../assets/images/carJudged/count-icon-3.png" alt=""><span>车牌类型统计</span></div>
              <div id="carPlateChart" style="width: 100%;height: 100%;display: flex" v-show="carType"></div>
              <div ref="carPlateCount" class="ts"></div>
            </div>

          </div>

          <div class="footer">
            <!-- <img src="../../assets/logo.png" />
            武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span> -->
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import echarts from "echarts";
import vehicle from "../../api/vehicle/vehicle.js";
import "../../common/laydate/laydate.js";
import higgcharCommon from '../../api/casestudy/highcharCommon.js'
export default {
  data() {
    return {
      radio: "1",
      beginTime: this.getDateString(
        new Date().getTime() - 6 * 24 * 60 * 60 * 1000
      ).split(" ")[0],
      endTime: this.getCurrentDate().split(" ")[0],
      dataList1: [],
      dataList2: [],
      dataList3: [],
      colorList: [],
      vehicleKeyValueList: [],
      vehicleClassList: [],
      vehiclePlateColorList: [],
      vehiclePlateColorCountList: [],
      vehiclePlateClassList: [],
      vehiclePlateClassCountList: [],
      percent: true,
      color: true,
      carType: true,
      loading: null,
    };
  },

  mixins: [vehicle,higgcharCommon],

  mounted() {
    let _this = this;
    _this.getVehicleClassList();
    _this.getVehiclePlateColorList();
    _this.getVehiclePlateClassList();
    let timeBegin = laydate.render({
      elem: "#beginTime",
      type: "date",
      btns: ["now", "confirm"],
      max: this.endTime,
      //value:(this.getWeekDay().split(' ')[0] + " " + "23:59:59"),
      done: function(value, date) {
        _this.beginTime = value;
        timeEnd.config.min = {
          year: date.year,
          month: date.month - 1, //关键
          date: date.date
        };
      }
    });
    let timeEnd = laydate.render({
      elem: "#endTime",
      type: "date",
      btns: ["now", "confirm"],
      min: this.beginTime,
      max: this.endTime,
      //value:(this.getCurrentDate().split(' ')[0] + " " + "00:00:00"),
      done: function(value, date) {
        _this.endTime = value;
        timeBegin.config.max = {
          year: date.year,
          month: date.month - 1, //关键
          date: date.date
        };
      }
    });
    //日期格式化
    Date.prototype.Format = function(fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    };
  },

  methods: {
    //获取车辆类别数据
    getVehicleClassList() {
      this.dataList1 = [];
      this.vehicleClassList = [];
      this.vehicleKeyValueList = [];
      this.loading = this.$loading({
        text: "正在查询...",
        spinner: "el-icon-loading",
        target: "#imgBox"
      });
      this.$http({
        url: "tvas/attribute/kind/statistics",
        method: "post",
        params: {
          category: "0",
          beginDate: this.beginTime,
          endDate: this.endTime
        }
      }).then(res => {
        this.loading.close();
        if (res.statusText == "OK" && res.data.code == 200) {
          this.dataList1 = res.data.data.rows;
          this.vehicleKeyValueList = this.dataList1.map(a => {
            if (
              a.vehicleKind == null ||
              a.vehicleKind == "" ||
              a.vehicleCount == null ||
              a.vehicleCount == ""
            ) {
              return;
            } else {
              return { value: a.vehicleCount, name: a.vehicleKind };
            }
          });

          //给vehicleKeyValueList排序
          this.vehicleKeyValueList.sort(function(a, b) {
            if (a.value > b.value) {
              return -1;
            } else {
              return 1;
            }
          });
          for (let i = 0; i < this.vehicleKeyValueList.length; i++) {
            // 数据为null或者为空，不显示
            // if(this.vehicleKeyValueList[i].name == null || this.vehicleKeyValueList[i].vehicleKind == "" || this.dataList1[i].vehicleCount == null || this.dataList1[i].vehicleCount == ""){
            // }else{
            this.vehicleClassList.push({
              value:this.vehicleKeyValueList[i].value,
              name:this.vehicleKeyValueList[i].name,
            })
            // this.percent = true
            // }
          }
          if (this.vehicleKeyValueList.length === 0) {
            this.$refs.carTypeCountPercent.innerHTML = "暂无数据";
            this.$refs.carTypeCountPercent.style.display = "block";
            this.$refs.carTypeCountNum.innerHTML = "暂无数据";
            this.$refs.carTypeCountNum.style.display = "block";
            this.percent = false;
          } else {
            this.$refs.carTypeCountPercent.style.display = "none";
            this.$refs.carTypeCountNum.style.display = "none";
            this.percent = true;
            this.typeChartPercent();
            this.$nextTick(()=>{
              let bargraphId = document.getElementById('carTypeChartRight')
              this.typeChartCount(bargraphId);
            })
          }
          // if(this.dataList1.length === 0 || (this.vehicleClassList.length === 1 && this.vehicleClassList[0] == null)){
          //   this.percent = false
          // }else{
          //   this.percent = true
          // }
        }
      });
    },
    //获取车牌颜色数据
    getVehiclePlateColorList() {
      this.dataList2 = [];
      this.vehiclePlateColorList = [];
      this.vehiclePlateColorCountList = [];
      this.colorList = [];
      this.loading = this.$loading({
        text: "正在查询...",
        spinner: "el-icon-loading",
        target: "#imgBox"
      });
      this.$http({
        url: "tvas/attribute/platecolor/statistics",
        method: "post",
        params: {
          category: "0",
          beginDate: this.beginTime,
          endDate: this.endTime
        }
      }).then(res => {
        this.loading.close();
        if (res.statusText == "OK" && res.data.code == 200) {
          this.dataList2 = res.data.data.rows;
          let newDataList2 = [];
          //过滤后台传过来的颜色
          for (let i = 0; i < this.dataList2.length; i++) {
            switch (this.dataList2[i].plateColor) {
              case "蓝":
                newDataList2.push(this.dataList2[i]);
                this.colorList.push("#4FABEF");
                break;
              case "黄":
                newDataList2.push(this.dataList2[i]);
                this.colorList.push("#F8B705");
                break;
              case "白":
                newDataList2.push(this.dataList2[i]);
                this.colorList.push("#E8E8E8");
                break;
              case "黑":
                newDataList2.push(this.dataList2[i]);
                this.colorList.push("#363636");
                break;
              case "绿":
                newDataList2.push(this.dataList2[i]);
                this.colorList.push("#9ACD42");
                break;
            }
          }
          for (let i = 0; i < newDataList2.length; i++) {
            if (
              newDataList2[i].plateColor == null ||
              newDataList2[i].plateColor == "" ||
              newDataList2[i].vehicleCount == null ||
              newDataList2[i].vehicleCount == ""
            ) {
            } else {
              this.vehiclePlateColorList.push(newDataList2[i].plateColor);
              this.vehiclePlateColorCountList.push(
                newDataList2[i].vehicleCount
              );
            }
          }
          if (
            this.vehiclePlateColorList.length === 0 ||
            this.vehiclePlateColorCountList.length === 0
          ) {
            this.$refs.carColorCount.innerHTML = "暂无数据";
            this.$refs.carColorCount.style.display = "block";
          } else {
            this.carColorCount();
            this.$refs.carColorCount.style.display = "none";
          }
          if (this.vehiclePlateColorList.length === 0) {
            //返回的颜色为空
            this.color = false;
          } else {
            this.color = true;
          }
        }
      });
    },
    //获取车牌类型数据
    getVehiclePlateClassList() {
      this.dataList3 = [];
      this.vehiclePlateClassList = [];
      this.vehiclePlateClassCountList = [];
      this.loading = this.$loading({
        text: "正在查询...",
        spinner: "el-icon-loading",
        target: "#imgBox"
      });
      this.$http({
        url: "tvas/attribute/plateclass/statistics",
        method: "post",
        params: {
          category: "0",
          beginDate: this.beginTime,
          endDate: this.endTime
        }
      }).then(res => {
        this.loading.close();
        if (res.statusText == "OK" && res.data.code == 200) {
          this.dataList3 = res.data.data.rows;
          for (let i = 0; i < this.dataList3.length; i++) {
            if (
              this.dataList3[i].plateClass == null ||
              this.dataList3[i].plateClass == "未识别" ||
              this.dataList3[i].plateClass == "" ||
              this.dataList3[i].vehicleCount == null ||
              this.dataList3[i].vehicleCount == ""
            ) {
            } else {
              this.vehiclePlateClassList.push(this.dataList3[i].plateClass);
              this.vehiclePlateClassCountList.push(
                this.dataList3[i].vehicleCount
              );
            }
          }
          if (
            this.vehiclePlateClassList.length === 0 ||
            this.vehiclePlateClassCountList.length === 0
          ) {
            this.$refs.carPlateCount.innerHTML = "暂无数据";
            this.$refs.carPlateCount.style.display = "block";
          } else {
            this.$refs.carPlateCount.style.display = "none";
            this.carPlateCount();
          }
          if (this.dataList3.length === 0) {
            this.carType = false;
          } else {
            this.carType = true;
          }
        }
      });
    },

    changeItem(event) {
      let Item = document.getElementsByClassName("detialTitleItem");
      for (let i = 0; i < Item.length; i++) {
        if (event.srcElement.isEqualNode(Item[i])) {
          Item[i].style.backgroundColor = "RGB(34,72,111)";
          Item[i].style.color = "#2e93fb";
          Item[i].style.border = "1px solid RGB(78,117,162)";
          Item[i].style.borderBottom = "2px solid RGB(24,151,240)";
        } else {
          Item[i].style.backgroundColor = "RGB(12,30,49)";
          Item[i].style.color = "";
          Item[i].style.borderTop = "none";
          Item[i].style.border = "1px solid RGB(21,48,76)";
        }
      }
    },
    searchList(event) {
      this.changeItem(event);
    },
    //车辆类别百分比统计图
    typeChartPercent() {
      let longList = {
        keyValueList: this.vehicleKeyValueList,
        classList: this.vehicleClassList
      };
      let shortList = {};
      let currentList = longList;
      if (this.vehicleKeyValueList.length >= 6) {
        //从第6个开始合并成一个“其他”类
        shortList = {
          keyValueList: this.vehicleKeyValueList.slice(0, 5),
          classList: this.vehicleClassList.slice(0, 5)
        };
        shortList.keyValueList[shortList.keyValueList.length] = {
          value: 0,
          name: "其他"
        };
        shortList.classList[shortList.classList.length] = "其他";
        let otherValue = 0;
        for (let i = 0; i < this.vehicleKeyValueList.length; i++) {
          if (i > 4) {
            otherValue += this.vehicleKeyValueList[i].value;
          }
        }
        shortList.keyValueList[5].value = otherValue;
        currentList = shortList;
      }
      let gdata = [];
      for (let i = 0; i < currentList.keyValueList.length; i++) {
        let idata = [];
        idata[0] = currentList.keyValueList[i].name;
        idata[1] = parseInt(currentList.keyValueList[i].value); // 字符串转浮点数
        gdata.push(idata);
      }
      let piesize = '100%'
      let pieChartsId = document.getElementById('carTypeChartLeft')
      this.getPie(pieChartsId,gdata,false,piesize) //调用封装的饼状图
    },

    //车辆类别数量统计
    typeChartCount(bargraphId) {
      let gdata = [];
      for (let i = 0; i < this.vehicleClassList.length; i++) {
        let idata = [];
        console.log(this.vehicleClassList[i],'jjj');
        idata[0] = this.vehicleClassList[i].name;
        idata[1] = this.vehicleClassList[i].value; // 字符串转浮点数
        gdata.push(idata);
      }
      console.log(gdata,'enene2');
      this.getColumnar(bargraphId,gdata,false) //调用封装的柱状图
    },
    //车牌颜色统计
    carColorCount() {
      let _this = this;
      let myChart = this.$echarts.init(
        document.getElementById("carColorChart"),
        "macarons"
      );
      var dataAxis = this.vehiclePlateColorList;
      var data = this.vehiclePlateColorCountList;
      var xMax = Math.ceil(Math.max.apply(null, data) / 10000 + 1) * 10000;
      var dataShadow = [];
      for (var i = 0; i < data.length; i++) {
        dataShadow.push(xMax);
      }
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          type: "value",
          show: false,
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "category",
          data: dataAxis,
          axisLine: {
            show: true
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#99c9fa"
            }
          }
        },
        grid: {
          y: 10,
          bottom: "20%"
        },
        series: [
          {
            type: "bar",
            barWidth: 20,
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                color: "RGB(30,45,64,.5)"
              }
            },
            barGap: "-100%",
            barCategoryGap: "40%",
            data: dataShadow,
            animation: false
          },
          {
            type: "bar",
            barWidth: 20,
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                color: function(params) {
                  var colorList = _this.colorList;
                  return colorList[params.dataIndex];
                }
              }
            },
            data: data
          }
        ]
      };
      myChart.setOption(option);
      setTimeout(function() {
        myChart.resize();
      }, 100);
      window.addEventListener("resize", function() {
        setTimeout(function() {
          myChart.resize();
        }, 100);
      });
      var zoomSize = 36;
      myChart.on("click", function(params) {
        myChart.dispatchAction({
          type: "dataZoom",
          startValue: data[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue:
            data[Math.min(params.dataIndex + zoomSize / 2, dataAxis.length - 1)]
        });
      });
    },
    //车牌类型统计
    carPlateCount() {
      let myChart = this.$echarts.init(
        document.getElementById("carPlateChart"),
        "macarons"
      );
      var dataAxis = this.vehiclePlateClassList;
      var data = this.vehiclePlateClassCountList;
      var yMax = Math.ceil(Math.max.apply(null, data) / 10000) * 10000;
      var dataShadow = [];
      for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
      }
      let option = {
        title: {
          text: "滑动鼠标滚轮查看更多详细数据...",
          x: "30%",
          textStyle: {
            //设置主标题风格
            Color: "#99c9fa", //设置主标题字体颜色
            fontSize: "12px" //主标题文字风格
          }
        },

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none"
          },
          showContent: true
        },
        toolbox: {
          show: true,
          feature: {}
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            rotate: 270,
            //interval: 0,
            inside: true,
            textStyle: {
              color: "#99c9fa",
              fontSize: "10px"
            },
            boundaryGap: true
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: true
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["RGB(42,56,72)"]
            }
          },
          axisLabel: {
            textStyle: {
              color: "#99c9fa"
            }
            // formatter:'{value} 辆'
          }
        },
        dataZoom: [
          {
            type: "inside"
          }
        ],

        grid: {
          x: 90,
          y: 40,
          bottom: "5%"
        },
        series: [
          {
            // For shadow
            type: "bar",
            itemStyle: {
              normal: { color: "rgba(0,0,0,0.05)" }
            },
            barGap: "-100%",
            barCategoryGap: "40%",
            data: dataShadow,
            animation: false
          },
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#83bff6" },
                  { offset: 0.5, color: "#188df0" },
                  { offset: 1, color: "#188df0" }
                ])
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" }
                ])
              }
            },
            data: data
          }
        ]
      };
      myChart.setOption(option);
      setTimeout(function() {
        myChart.resize();
      }, 100);
      window.addEventListener("resize", function() {
        setTimeout(function() {
          myChart.resize();
        }, 100);
      });
      var zoomSize = 6;
      myChart.on("click", function(params) {
        myChart.dispatchAction({
          type: "dataZoom",
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue:
            dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
      });
    },

    //最近24小时
    yesterDay() {
      // let date = new Date().getTime() - 3600 * 1000 * 24;//开始时间
      // let newDate = new Date(date).Format('yyyy-MM-dd hh:mm:ss');
      // let reg = new RegExp('"', "g");
      // this.beginTime = newDate.replace(reg, "")
      //this.endTime = new Date().Format('yyyy-MM-dd hh:mm:ss').replace(reg, "");
      this.beginTime = this.getDateString(
        new Date().getTime() - 1 * 24 * 60 * 60 * 1000
      ).split(" ")[0];
      this.endTime = this.getDateString(new Date().getTime()).split(" ")[0];
      this.getVehicleClassList();
      this.getVehiclePlateColorList();
      this.getVehiclePlateClassList();
    },
    //最近7天
    lastWeek() {
      // let date = new Date().getTime() - 3600 * 1000 * 24 * 7;
      // let newDate = new Date(date).Format('yyyy-MM-dd hh:mm:ss');
      // let reg = new RegExp('"', "g");
      // this.beginTime = newDate.replace(reg, "")
      // this.endTime = new Date().Format('yyyy-MM-dd hh:mm:ss').replace(reg, "");
      this.beginTime = this.getDateString(
        new Date().getTime() - 7 * 24 * 60 * 60 * 1000
      ).split(" ")[0];
      this.endTime = this.getDateString(new Date().getTime()).split(" ")[0];
      this.getVehicleClassList();
      this.getVehiclePlateColorList();
      this.getVehiclePlateClassList();
    },
    //最近30天
    lastMonth() {
      // let date = new Date().getTime() - 3600 * 1000 * 24 * 30;
      // let newDate = new Date(date).Format('yyyy-MM-dd hh:mm:ss');
      // let reg = new RegExp('"', "g");
      // this.beginTime = newDate.replace(reg, "")
      // this.endTime = new Date().Format('yyyy-MM-dd hh:mm:ss').replace(reg, "");
      this.beginTime = this.getDateString(
        new Date().getTime() - 30 * 24 * 60 * 60 * 1000
      ).split(" ")[0];
      this.endTime = this.getDateString(new Date().getTime()).split(" ")[0];
      this.getVehicleClassList();
      this.getVehiclePlateColorList();
      this.getVehiclePlateClassList();
    },
    //最近90天
    lastThreeMonth() {
      // let date = new Date().getTime() - 3600 * 1000 * 24 * 90
      // let newDate = new Date(date).Format('yyyy-MM-dd hh:mm:ss');
      // let reg = new RegExp('"', "g");
      // this.beginTime = newDate.replace(reg, "")
      // this.endTime = new Date().Format('yyyy-MM-dd hh:mm:ss').replace(reg, "");
      this.beginTime = this.getDateString(
        new Date().getTime() - 90 * 24 * 60 * 60 * 1000
      ).split(" ")[0];
      this.endTime = this.getDateString(new Date().getTime()).split(" ")[0];
      this.getVehicleClassList();
      this.getVehiclePlateColorList();
      this.getVehiclePlateClassList();
    },
    //最近半年
    lastSixMonth() {
      // let date = new Date().getTime() - 3600 * 1000 * 24 * 180
      // let newDate = new Date(date).Format('yyyy-MM-dd hh:mm:ss');
      // let reg = new RegExp('"', "g");
      // this.beginTime = newDate.replace(reg, "")
      // this.endTime = new Date().Format('yyyy-MM-dd hh:mm:ss').replace(reg, "");
      this.beginTime = this.getDateString(
        new Date().getTime() - 180 * 24 * 60 * 60 * 1000
      ).split(" ")[0];
      this.endTime = this.getDateString(new Date().getTime()).split(" ")[0];
      this.getVehicleClassList();
      this.getVehiclePlateColorList();
      this.getVehiclePlateClassList();
    },
    //返回
    backUp() {
      this.$router.push("/carJudged?menuCode=300");
    }
  }
};
</script>


<style scoped>
@import url("../../assets/css/commom.css");
.wrapper {
  position: absolute;
  width: 100%;
  min-width: 1300px;
  top: 0.6rem;
  height: calc(100% - 0.6rem);
  box-sizing: border-box;
  user-select: none;
  overflow: hidden;
}

.topNav {
  height: 0.54rem;
  background-color: #ffffff;
  width: 100%;
}
.mainContent{
  width: 100%;
  height: 100%;
  padding: 0.15rem 0.2rem;
}

.nav-item {
  display: inline-block;
  height: 0.54rem;
  width: 146px;
  line-height: 0.54rem;
  text-align: center;
  font-size: 0.18rem;
}

.searchCondition {
  width: 3.2rem;
  height: calc(100% - 0.6rem);
  float: left;
  overflow: hidden;
  border: 1px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
}

.searchTitle {
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  background: rgba(20, 57, 96, 0.33);
  color: #2e93fb;
}

li {
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  font-size: 12px;
}

.itemIcon img {
  width: 100%;
  height: 100%;
}

.content {
  height: calc(100% - 0.6rem);
  position: relative;
  display: flex;
  width: calc(100% - 3.2rem);
  flex-direction: column;
  overflow: hidden;
}

.nav-item-search {
  height: 100%;
  width: 162px;
  background: url(../../assets/images/sysmanage/bg.png);
  color: #63abfe;
  text-align: center;
  background-size: 100% 100%;
}

.carTimeSearch {
  width: 100%;
  padding-left: 10px;
  height: 50px;
  margin-top: 3px;
  font-size: 14px;
  font-weight: 600;
  color: #99c9fa;
  display: flex;
  align-items: center;
}

.carTimeSearchInput {
  width: 100%;
  height: calc(100% - 75px);
}

.beginTime {
  width: 80px;
  height: 28px;
  border-radius: 3px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  float: left;
  color: #99c9fa;
}

.beginTimeInput {
  height: 28px;
  width: 200px;
  margin-left: -3px;
  margin-bottom: 17px;
  border: 1px solid #e6e8ed;
  padding-left: 0.05rem;
  color: #606266;
}

/* .line {
    width: 98.2%;
    height: 1px;
    background-color: #E4E7ED;

  } */

.queryBtn {
  width: 98.2%;
  height: 0.4rem;
  margin-top: 17px;
  border-radius: 2px;
  color: white;
  text-align: center;
  line-height: 0.4rem;
  font-size: 0.14rem;
  cursor: pointer;
}

/* .queryBtn:hover {
    background-color: #74BCFF;
  } */

.contentTitle {
  height: 50px;
  margin-left: 20px;
  background: #0e243d;
  width: 100%;
  color: #c5c5c5;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.contentDetial {
  width: calc(100% - 20px);
  height: calc(100% - 53px);
  overflow-y: auto;
  margin-top: 3px;
  background-color: rgba(16, 35, 56, 0.5);
  margin-left: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* .back {
    position: absolute;
    right: 35px;
    width: 80px;
    height: 22px;
    background-color: #3b9df4;
    font-size: 10px;
    text-align: center;
    line-height: 22px;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  } */

.detialTitle {
  height: 0.5rem;
  display: flex;
  flex-direction: row;
}

.detialTitleItem {
  width: 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: RGB(12, 30, 49);
  border: 1px solid RGB(21, 48, 76);
  justify-content: center;
  font-size: 0.12rem;
  color: #99c9fa;
  cursor: pointer;
  margin-right: 0.1rem;
}

.detialTitleTxt {
  font-size: 0.12rem;
  width: 100%;
  height: 0.4rem;
  display: flex;
  align-items: center;
  padding-left: 20px;
  color: #99c9fa;
}

.carTypeCountWrapper {
  width: calc(100% - 0.4rem);
  height: 4rem;
  /* border: 1px solid #E5E5E5; */
  overflow: hidden;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  background: url("../../assets/images/count/echarBig.png") center no-repeat;
  background-size: 100% 100%;
}

.carTypeCountHeader {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  display: flex;
  align-items: center;
  font-size: 0.14rem;
  color: #3b9df4;
  padding-left: 0.2rem;
  background: url("../../assets/images/count/lefttitle.png") 0.1rem center
    no-repeat;
  background-size: 25% 70%;
}

.carTypeCount {
  width: 100%;
  /* height: calc(100% - 50px); */
  height: 100%;
  display: flex;
  flex-direction: row;
}

.carTypeCountPercent {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.carTypeCountNum {
  width: 50%;
  /*display: flex;*/
  /*flex-direction: column;*/
}
.countTitle {
  width: 100%;
  height: 20px;
  line-height: 20px;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
}
.countTxt {
  height: 14px;
  width: 2px;
  background-color: #3b9df4;
  float: left;
  margin-left: 10px;
  margin-top: 4px;
  margin-right: 10px;
}
.countSpan {
  font-size: 12px;
  float: left;
  color: #8b8b8b;
}
.countChart {
  width: 100%;
  height: calc(100% - 25px);
}

.plateChartContainer {
  width: calc(100% - 40px);
  display: flex;
  height: 3.5rem;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 20px;
}

.carColorCount {
  display: flex;
  width: 50%;
  flex-direction: column;
  background: url("../../assets/images/count/echarBg.png") center no-repeat;
  background-size: 100% 100%;
}

.carPlateCount {
  display: flex;
  width: 50%;
  margin-left: 0.1rem;
  flex-direction: column;
  background: url("../../assets/images/count/echarBg.png") center no-repeat;
  background-size: 100% 100%;
}

.carColorCountHeader {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  display: flex;
  align-items: center;
  font-size: 0.14rem;
  color: #3b9df4;
  padding-left: 0.2rem;
  background: url("../../assets/images/count/lefttitle.png") 0.1rem center
    no-repeat;
  background-size: 35% 70%;
}

.carPlateCountHeader {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  display: flex;
  align-items: center;
  font-size: 0.14rem;
  color: #3b9df4;
  padding-left: 0.2rem;
  background: url("../../assets/images/count/lefttitle.png") 0.1rem center
    no-repeat;
  background-size: 35% 70%;
}

.companyMessage {
  width: 100%;
  height: 30px;
  text-align: center;
  font-size: 12px;
  margin-top: 15px;
}

.footer {
  width: 100%;
  height: 0.6rem;
  font-size: 0.14rem;
  line-height: 0.6rem;
  background-color: rgba(16, 35, 56, 0.5);
  color: rgba(153, 201, 250, 0.4);
  text-align: center;
}

.footer img {
  margin-right: 0.05rem;
}

.ts {
  color: #999;
  font-size: 0.14rem;
  margin: 2%;
}

/*  @media screen and( max-height: 800px) {
      .companyMessage {
        font-size: 12px;
      }
    }*/
</style>
