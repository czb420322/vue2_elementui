<template>
  <div class="navBar">
    <header class="header">
      <h3>昆仑平台-案件分析展示</h3>
    </header>
    <div class="contentBody">
      <div class="nav-left">
        <div class="nav-above">
          <div class="navBar-top-left padding-10">
            <p class="caseStatis">案件数量统计</p>
            <div class="contentTable">
              <p style="color:#fff">
                <i class="el-input__icon el-icon-time"></i>全市近期案件统计
              </p>
              <p class="hr"></p>
              <p class="caseMonth">本月案件统计</p>
              <div class="main-top">
                <div class="main-top-left">
                  <div id="caseMonthpie" style="width: 50%;height:100%"></div>
                  <div class="btntitle">
                    <p class="general">普通案件</p>
                    <p class="styleColor">案件总量：</p>
                    <p class="styleColor">普通案件：</p>
                  </div>
                </div>
                <div class="main-top-left">
                  <div id="synergyPie" style="width: 50%;height:100%"></div>
                  <div class="btntitle">
                    <p class="general">协同案件</p>
                    <p class="styleColor">案件总量：</p>
                    <p class="styleColor">普通案件：</p>
                  </div>
                </div>
              </div>
              <p class="caseMonth">案件警情统计</p>
              <div class="main-top">
                <div class="main-top-left">
                  <div id="yearPoliceId" style="width: 50%;height:100%"></div>
                  <div class="btntitle">
                    <p class="general">今年警情</p>
                    <p class="styleColor">案件总量：</p>
                    <p class="styleColor">普通案件：</p>
                  </div>
                </div>
                <div class="main-top-left">
                  <div id="lastPoliceId" style="width: 50%;height:100%"></div>
                  <div class="btntitle">
                    <p class="general">本月警情</p>
                    <p class="styleColor">案件总量：</p>
                    <p class="styleColor">普通案件：</p>
                  </div>
                </div>
                <div class="main-top-left">
                  <div id="weekPoliceId" style="width: 50%;height:100%"></div>
                  <div class="btntitle">
                    <p class="general">本周警情</p>
                    <p class="styleColor">案件总量：</p>
                    <p class="styleColor">普通案件：</p>
                  </div>
                </div>
                <div class="main-top-left">
                  <div id="todayPoliceId" style="width: 50%;height:100%"></div>
                  <div class="btntitle">
                    <p class="general">今日警情</p>
                    <p class="styleColor">案件总量：</p>
                    <p class="styleColor">普通案件：</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="navBar-top-right">
            <div class="chart-div" id="mapChartId">
              <div class="chart-loader">
                <div class="loader"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="navBar-bottom-left padding-10">
          <p class="caseStatis">协同作战警力情况</p>
          <div class="contentTable">
            <p style="color:#fff">
              <i class="el-input__icon el-icon-time"></i>全市案件警力部署分布情况
            </p>
            <p class="hr"></p>
            <p class="caseMonth">案件参与情况</p>
            <div id="gradualId" style="width: 100%;height:60%"></div>
          </div>
        </div>
        <div class="navBar-bottom-right padding-10">
          <p class="caseYear">年度案件线索统计</p>
          <div id="brokenlineId" style="width: 100%;height:85%"></div>
        </div>
      </div>
      <div class="nav-right">
        <div class="right-content padding-10">
          <p class="caseStatis">区县案件统计</p>
          <div class="contentTable">
            <p style="color:#fff">
              <i class="el-input__icon el-icon-time"></i>案发时间统计
            </p>
            <p class="hr"></p>
            <div class="rose-top-left">
              <div id="roseId" style="width: 100%;height:100%"></div>
            </div>
            <div class="rose-top-left">
              <div id="graphId" style="width: 100%;height:100%"></div>
            </div>
            <p style="color:#fff">
              <i class="el-input__icon el-icon-time"></i>案件类型统计
            </p>
            <p class="hr"></p>
            <div id="circleId" class="top-10" style="width: 100%;height:25%"></div>
            <p style="color:#fff">
              <i class="el-input__icon el-icon-time"></i>案件危害程度统计
            </p>
            <p class="hr"></p>
            <div id="cakepieId" class="top-10" style="width: 100%;height:35%"></div>
          </div>
        </div>
      </div>
    </div>
    <i class="el-icon-close map-dialog-close" @click="closeDialog"></i>
  </div>
</template>

<script>
import pieCharts from "../../api/echarts/pieCharts.js";
import roseCharts from "../../api/echarts/roseCharts.js";
import graphCharts from "../../api/echarts/graphCharts.js";
import circleCharts from "../../api/echarts/circleCharts.js";
import brokenlineCharts from "../../api/echarts/brokenlineCharts.js";
import getMapChart from "../../api/echarts/getMapChart.js";
import gradualCharts from "../../api/echarts/gradualCharts.js";
import cakePie from "../../api/echarts/cakePie.js";
export default {
  name: "caseInfoExhibition",
  props: {},
  data() {
    return {};
  },
  mixins: [
    pieCharts,
    roseCharts,
    graphCharts,
    circleCharts,
    brokenlineCharts,
    getMapChart,
    gradualCharts,
    cakePie
  ],
  computed: {},
  created() {
    this.launchFullscreen(document.documentElement);
  },
  mounted() {
    setTimeout(() => {
      this.$nextTick(() => {
        let pieChartsId = document.getElementById("caseMonthpie");
        let synergyPie = document.getElementById("synergyPie");
        let yearPoliceId = document.getElementById("yearPoliceId");
        let lastPoliceId = document.getElementById("lastPoliceId");
        let weekPoliceId = document.getElementById("weekPoliceId");
        let todayPoliceId = document.getElementById("todayPoliceId");
        let mapChartId = document.getElementById("mapChartId"); // 地图
        let roseId = document.getElementById("roseId"); // 玫瑰图
        let graphId = document.getElementById("graphId"); // 柱状图
        let circleId = document.getElementById("circleId"); // 半圆图
        let brokenlineId = document.getElementById("brokenlineId"); // 折线图
        let gradualId = document.getElementById("gradualId"); // 渐变饼图图
        let cakepieId = document.getElementById("cakepieId"); // 渐变饼图图
        let gdata = [
          {
            value: 1,
            name: "rose1",
            itemStyle: {
              color: "rgba(50,123,250,0.7)",
              borderWidth: 3
            }
          },
          {
            value: 2,
            name: "rose2",
            itemStyle: {
              color: "rgba(244,201,7,0.7)",
              borderWidth: 3
            }
          },
          ,
          {
            value: 3,
            name: "rose3",
            itemStyle: {
              color: "rgba(23,216,161,0.7)",
              borderWidth: 3
            }
          },
          {
            value: 4,
            name: "rose4",
            itemStyle: {
              color: "rgba(122,60,235,0.7)",
              borderWidth: 3
            }
          },
          {
            value: 5,
            name: "rose5",
            itemStyle: {
              color: "rgba(15,197,243,0.7)",
              borderWidth: 3
            }
          }
        ];
        let rosedata = [
          "rose1",
          "rose2",
          "rose3",
          "rose4",
          "rose5",
          "rose6",
          "rose7"
        ];
        var daa = [
          {
            name: "公司1",
            value: 300,
            percent: "43.47%"
          },
          {
            name: "公司2",
            value: 200,
            percent: "28.98%"
          },
          {
            name: "公司3",
            value: 100,
            percent: "14.49%"
          },
          {
            name: "公司4",
            value: 50,
            percent: "7.24%"
          },
          {
            name: "公司5",
            value: 25,
            percent: "2.89%"
          },
          {
            name: "公司6",
            value: 15,
            percent: "2.1%"
          }
        ];
        var data2 = [
          "2019-06",
          "2019-07",
          "2019-08",
          "2019-09",
          "2019-10",
          "2019-11",
          "2019-12"
        ];
        var data3 = [100, 78, 56, 124, 67, 65, 95];
        var data4 = ["A", "B", "C", "D", "E", "F"];
        var data5 = [502.84, 205.97, 332.79, 281.55, 398.35, 214.02];
        this.getpie(pieChartsId); // 饼状进度条
        this.getpie(synergyPie);
        this.getpie(yearPoliceId);
        this.getpie(lastPoliceId);
        this.getpie(weekPoliceId);
        this.getpie(todayPoliceId);
        this.getRose(roseId, rosedata, gdata); // 玫瑰图
        this.getCircle(circleId, daa);
        this.graphCharts(graphId, data2, data3);
        this.getbrokenline(brokenlineId, data4, data5); // 折线图
        this.getgradualpie(gradualId);
        this.getcakepie(cakepieId);
        this.$nextTick(() => {
          this.getMapChart(mapChartId);
        });
      });
    }, 100);
  },
  methods: {
    //进入全屏
    launchFullscreen(element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullscreen) {
        element.mozRequestFullscreen();
      } else if (element.wenkitRequestFullscreen) {
        element.wenkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    //退出全屏
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullscreen) {
        document.mozCancelFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    },
    closeDialog() {
      this.$router.push({ path: "/videoCombat/myCasCade?menuCode=124" });
    }
  },
  destroyed() {
    this.exitFullscreen();
  }
};
</script>

<style scoped>
@import "../../assets/css/echartall.css";
@import "../../assets/css/commom.css";
</style>
