<template>
  <div>
    <div class="headers">
      <h2 class="headers-title">昆仑平台-结构化分析</h2>
    </div>
    <div class="wrapper">
      <div class="content">
        <div class="col col-l xpanel">
          <div class="xpanel-wrapper xpanel-wrapper-35">
            <div class="xpanel xpanel-r-t">
              <div class="title">检索统计</div>
              <div class="contentTable">
                <p style="color:#fff">
                  <i class="el-input__icon el-icon-time"></i>全市各区县检索统计
                </p>
                <p class="hr"></p>
                <div id="columnarChart" style="width: 100%;height:200px"></div>
              </div>
            </div>
          </div>
          <div class="xpanel-wrapper xpanel-wrapper-25">
            <div class="xpanel xpanel-r-m">
              <div class="xpanel">
                <div class="fill-h" id="wordChart"></div>
              </div>
            </div>
          </div>
          <div class="xpanel-wrapper xpanel-wrapper-36">
            <div class="xpanel xpanel-r-b">
              <div class="title">过车排名统计</div>
              <div class="contentTable">
                <p style="color:#fff">
                  <i class="el-input__icon el-icon-time"></i>今日过车排名统计
                </p>
                <p class="hr"></p>
                <div>
                  <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="name" show-overflow-tooltip label="排名" width="60"></el-table-column>
                    <el-table-column prop="date" show-overflow-tooltip label="区县名称"></el-table-column>
                    <el-table-column prop="date" show-overflow-tooltip label="抓拍总量"></el-table-column>
                    <el-table-column prop="date" show-overflow-tooltip label="预警总量"></el-table-column>
                    <el-table-column prop="date" show-overflow-tooltip label="预警占比">
                      <template slot-scope="scope">
                        <el-progress
                          :text-inside="true"
                          :stroke-width="18"
                          :percentage="percentage"
                          :class="percentage  < 50 ? '' : 'progresstwo' "
                        ></el-progress>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col col-c">
          <div class="xpanel-wrapper xpanel xpanel-wrapper-62 xpanel-l-b">
            <div class="chart-wrapper">
              <h3 class="chart-title">车辆分布区域</h3>
              <div class="chart-div" id="mapChartId">
                <div class="chart-loader">
                  <div class="loader"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="xpanel-wrapper xpanel-wrapper-36">
            <div class="xpanel xpanel-r-t">
              <div class="title">区域过车实时统计</div>
              <div class="statistic_info_content" id="brokeline1" style="width: 100%;height:85%"></div>
            </div>
          </div>
        </div>
        <div class="col col-r">
          <div class="xpanel-wrapper xpanel-wrapper-35">
            <div class="xpanel xpanel-r-t">
              <div class="title">今日车辆种类统计</div>
              <div class="main-top-left">
                <div id="panelId" style="width: 100%;height:85%"></div>
              </div>
              <div class="main-top-left">
                <div id="getInstrumentId" style="width: 100%;height:85%"></div>
              </div>
            </div>
          </div>
          <div class="xpanel-wrapper xpanel-wrapper-25">
            <div class="xpanel xpanel-r-m">
              <div class="xpanel">
                <div class="fill-h" id="wordChart"></div>
              </div>
            </div>
          </div>
          <div class="xpanel-wrapper xpanel-wrapper-36">
            <div class="xpanel xpanel-r-b">
              <div class="title"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <i class="el-icon-close map-dialog-close" @click="closeDialog"></i>
  </div>
</template>

<script>
// import echarts from "echarts";
// import "../../../static/js/echarts/echarts-wordcloud.min.js";
import getCrossCarMapChart from "../../api/echarts/getCrossCarMapChart.js";
import getCarPlateNumber from "../../api/echarts/getCarPlateNumber.js";
import columnarChart from "../../api/echarts/columnarChart.js";
import brokeline1 from "../../api/echarts/brokeline1.js";
import getInstrument from "../../api/echarts/getInstrument.js";
import getBrokeLineNumber from "../../api/echarts/getBrokeLineNumber";
import panelChart from "../../api/echarts/panelChart";

export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "1",
          address: "上海市普陀区金沙江路 1518 弄",
          percentage: 0
        },
        {
          date: "2016-05-04",
          name: "2",
          address: "上海市普陀区金沙江路 1517 弄",
          percentage: 10
        },
        {
          date: "2016-05-01",
          name: "3",
          address: "上海市普陀区金沙江路 1519 弄",
          percentage: 50
        },
        {
          date: "2016-05-03",
          name: "4",
          address: "上海市普陀区金沙江路 1516 弄",
          percentage: 80
        }
      ],
      percentage: 80
    };
  },
  filters: {},
  mixins: [
    getCrossCarMapChart,
    getCarPlateNumber,
    getBrokeLineNumber,
    columnarChart,
    brokeline1,
    panelChart,
    getInstrument
  ],
  watch: {},
  created() {},
  mounted() {
    //渲染大地图的
    let mapChartId = document.getElementById("mapChartId"); // 地图
    this.getCrossCarMapChart(mapChartId);

    //渲染词云图的
    let wordChart = document.getElementById("wordChart");
    this.getCarPlateNumber(wordChart);

    //渲染折线图的
    // let brokegraphId = document.getElementById("brokeline");
    //     this.getBrokeLine(
    //   brokegraphId,
    //   dateX,
    //   peopleNum,
    //   bicycleNum,
    //   vehicleNum,
    //   manfaceNum
    // );
    // this.getBarList(bargraphId, dateY, vehicleList);

    // 渲染柱状图的
    let columnarChartId = document.getElementById("columnarChart");
    this.getcolumnarChart(columnarChartId);

    // 渲染折线图
    let brokegraphId1 = document.getElementById("brokeline1");
    this.getbrokelineChart(brokegraphId1);

    // 仪表盘1
    let panelId = document.getElementById("panelId");
    this.getPanelChart(panelId);

    // 仪表盘2
    let getInstrumentId = document.getElementById("getInstrumentId");
    this.getInstrumentChart(getInstrumentId);
    let peopleNum = this.getData(3859);
    let bicycleNum = this.getData(30);
    let vehicleNum = this.getData(50);
    let manfaceNum = this.getData(80);
    let dateX = this.oneMonthTime();

    // 渲染柱状图
    let bargraphId = document.getElementById("carCrossBarNumber");
    let dateY = this.oneMonthTime();
    let vehicleList = this.getData(3859);

  },
  methods: {
    //模拟的数据
    getData(num) {
      let arr = [];
      let start = num;
      for (let i = 0; i < 15; i++) {
        if (i % 3 != 0) {
          start += num;
        } else {
          start -= num;
        }
        arr.push(start);
      }
      return arr;
    },
    // 得到一个月的时间
    oneMonthTime() {
      let array = [];
      let Day = new Date();
      let year = Day.getFullYear();
      let month = Day.getMonth() + 1;
      let arr = 0;
      for (let i = 0; i < 15; i++) {
        arr += 1;
        array.push(arr);
      }
      for (let j in array) {
        array[j] = year + "-" + month + "-" + array[j];
      }
      return array;
    },
    closeDialog() {
      this.$router.push({ path: "/videoCombat/myCasCade?menuCode=124" });
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/app.css";
</style>
