<!--
 * @Author: chenxf
 * @Date: 2020-05-17 16:47:07
 * @LastEditTime : 2020-06-22 10:58:39
 * @LastEditors  : chenxf
 * @Description:
 * @FilePath: \vacp-wfes\src\page\casestudy\caseareastat.vue
 * @
 -->
<template>
  <div class="caseinfo">
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 ></router-link>
      <div class="sysname">&nbsp;案发区域统计</div>
    </div>
    <div class="mainbox">
      <div class="centermain">
        <div class="maintilebox">
          <p class="maintile">案发区域统计</p>
          <div class="main_top">
            <p>
              <span>省份：</span>
              <el-select v-model="provinceId" placeholder="请选择省份" @change="selectProvince">
                <el-option
                  v-for="item in getLoadProvinceData"
                  :key="item.regionId"
                  :label="item.regionName"
                  :value="item.regionId"
                ></el-option>
              </el-select>
            </p>
            <p class="margLR">
              <span>城市：</span>
              <el-select v-model="cityId" @change="selectCity" placeholder="请选择城市">
                <el-option
                  v-for="item in getLoadCityData"
                  :key="item.regionId"
                  :label="item.regionName"
                  :value="item.regionId"
                ></el-option>
              </el-select>
            </p>
            <p>
              <span>案发时间：</span>
              <el-input
                class="caseNameSelect timeSelect"
                type="text"
                id="startTime"
                readonly
                autocomplete="off"
                v-model="startTime"
                placeholder="请选择开始时间"
              >
                <i slot="prefix" class="el-input__icon el-icon-time"></i>
              </el-input>
              <span>-</span>
              <el-input
                class="caseNameSelect timeSelect"
                type="text"
                id="endTime"
                readonly
                autocomplete="off"
                v-model="endTime"
                placeholder="请选择结束时间"
              >
                <i slot="prefix" class="el-input__icon el-icon-time"></i>
              </el-input>
              <el-button type="primary" icon="el-icon-search" class="searchBtn" @click="getQuery">查询</el-button>
              <el-button type="warning" icon="el-icon-refresh" class="tryBtn" @click="getReset">重置</el-button>
              <el-button type="success" class="topBtn" @click="export2Excel">导出</el-button>
            </p>
          </div>
        </div>
        <div class="mainchars">
          <div class="mainContent" v-if="showChars">
            <div class="main_btn main_btnleft" id="one">
              <p class="btntitle">
                <img src="../../assets/images/count/lefticon.png" alt>案发区域{{title}}统计分析图
              </p>
              <button id="btn" title="保存为图片"></button>
              <div id="caseTimebar" style="width: 100%;height: calc(100% - 0.87rem);margin-top:0.25rem;"></div>
              <div id="sliders">
                <button class="changeChart" title="切换为折线图" type="button" id="clear-button"></button>
                <button class="changeChart" title="切换为柱状图" type="button" id="pie-button"></button>
                <button class="changeChart" title="还原" type="button" id="refresh-button"></button>
              </div>
            </div>
            <div class="main_btn main_btnright" id="two">
              <p class="btntitle">
                <img src="../../assets/images/count/righticon.png" alt>案发区域饼状统计分析图
              </p>
              <div id="caseTimepie" style="width: 100%;height: calc(100% - 0.47rem)"></div>
            </div>
          </div>
          <columnarCharts  ref="columnarCharts"></columnarCharts>
          <pieCharts ref="pieCharts"></pieCharts>
        </div>
      </div>
      <footerSecond/>
    </div>
  </div>
</template>

<script>
import footerSecond from "../../components/footer_second";
import higgcharCommon from '../../api/casestudy/highcharCommon.js'
export default {
  components: {
    footerSecond
  },
  data() {
    return {
      loading: null,
      imgoneshow: false,
      imgtwoshow: true,
      caseTimebar: true,
      caseTimepie: false,
      time: [],
      getLoadProvinceData: [],
      getLoadCityData: [],
      getCaseAreaData: [],
      defaultProvince: "",
      provinceId: "",
      cityId: "--请选择--",
      regionId: "",
      xShowData: [],
      showData: [],
      legendData: [],
      showPieData: [],
      startTime: null, //this.getDateString(new Date().getTime() - 29*24*60*60*1000).split(' ')[0],
      endTime: null, //this.getDateString(new Date().getTime()).split(' ')[0],
      startTimeLayDate: null,
      endTimeLayDate: null,
      showChars: true
    };
  },
  mixins:[higgcharCommon],
  mounted() {
    let _this = this;
    this.startTimeLayDate = laydate.render({
      elem: "#startTime",
      type: "date",
      btns: ["now", "confirm"],
      max: 0,
      done: function(value, date) {
        _this.startTime = value;
        _this.endTimeLayDate.config.min = {
          year: date.year,
          month: date.month - 1, //关键
          date: date.date
        };
      }
    });
    this.endTimeLayDate = laydate.render({
      elem: "#endTime",
      type: "date",
      btns: ["now", "confirm"],
      max: 0,
      done: function(value, date) {
        _this.endTime = value;
        _this.startTimeLayDate.config.max = {
          year: date.year,
          month: date.month - 1, //关键
          date: date.date
        };
      }
    });
  },
  created() {
    this.getDefaultRegion();
    this.getLoadProvince();
  },
  methods: {
    // changetab() {
    //   this.$refs.two.classList.remove("active");
    //   this.$refs.one.classList.add("active");
    //   document.getElementById('one').style.display = 'block';
    //   document.getElementById('two').style.display = 'none';
    //   this.imgoneshow = false;
    //   this.imgtwoshow = true;
    // },
    // changetabs() {
    //   this.$refs.two.classList.add("active");
    //   this.$refs.one.classList.remove("active");
    //   document.getElementById('one').style.display = 'none';
    //   document.getElementById('two').style.display = 'block';
    //   this.getpie();
    //   this.imgoneshow = true;
    //   this.imgtwoshow = false;
    //   this.getpie();
    // },
    getEchar(bargraphId) {
      let gdata = [];
      for (let i = 0; i < this.showData.length; i++) {
        let idata = [];
        idata[0] = this.showData[i].name;
        idata[1] = parseInt(this.showData[i].value); // 字符串转浮点数
        gdata.push(idata);
      }
      this.getColumnar(bargraphId,gdata,true) //调用封装的柱状图
    },
    getpie(pieChartsId) {
      let gdata = [];
      for (let i = 0; i < this.showPieData.length; i++) {
        let idata = [];
        idata[0] = this.showPieData[i].name;
        idata[1] = parseInt(this.showPieData[i].value); // 字符串转浮点数
        gdata.push(idata);
      }
      let piesize = '100%'
      this.getPie(pieChartsId,gdata,true,piesize) //调用封装的饼状图
    },
    //获取省份
    getLoadProvince() {
      this.$http({
        url: "pca/statistics/loadProvince",
        method: "get"
      })
        .then(res => {
          if (res.statusText == "OK" && res.data.code == 200) {
            this.getLoadProvinceData = res.data.data;
          } else {
            layer.alert("获取省份列表失败！", { icon: 5, title: "消息提示" });
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    //获取默认省份
    getDefaultRegion() {
      this.$http({
        url: "pca/statistics/defaultRegion",
        method: "get"
      })
        .then(res => {
          if (res.statusText == "OK" && res.data.code == 200) {
            this.defaultProvince = res.data.data;
            this.provinceId = res.data.data;
            this.getLoadCity("first");
            //this.regionId = this.provinceId;
            //this.getCaseArea();
          } else {
            layer.alert("获取默认省份失败！", { icon: 5, title: "消息提示" });
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    //获取对应省份的所有城市
    getLoadCity(defaultCityNum) {
      this.$http({
        url: "pca/statistics/loadCity",
        method: "get",
        params: {
          id: this.provinceId
        }
      })
        .then(res => {
          if (res.statusText == "OK" && res.data.code == 200) {
            this.getLoadCityData = res.data.data;
            if (defaultCityNum == "first") {
              this.cityId = res.data.data[0].regionId;
              this.regionId = this.cityId;
              this.getCaseArea();
            }
          } else {
            layer.alert("获取省份下城市列表失败！", {
              icon: 5,
              title: "消息提示"
            });
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    //获取案件区域统计
    getCaseArea() {
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "加载中"
      });
      this.$http({
        url: "pca/statistics/caseArea",
        method: "get",
        params: {
          id: this.regionId,
          startTime: this.$commons.isEmpty(this.startTime)
            ? this.startTime
            : this.startTime + " 00:00:00",
          endTime: this.$commons.isEmpty(this.endTime)
            ? this.endTime
            : this.endTime + " 23:59:59"
        }
      })
        .then(res => {
          this.showChars = true;
          this.loading.close();
          if (res.statusText == "OK" && res.data.code == 200) {
            this.getCaseAreaData = res.data.data;
            this.xShowData.length = [];
            this.legendData = [];
            for (let i = 0; i < this.getCaseAreaData.length; i++) {
              this.xShowData.push(this.getCaseAreaData[i].regionName);
              this.legendData.push(this.getCaseAreaData[i].regionName);
            }

            this.showData = [];
            for (let i = 0; i < this.getCaseAreaData.length; i++) {
              this.showData.push({
                value: this.getCaseAreaData[i].count,
                name: this.getCaseAreaData[i].regionName
              });
            }
            this.$nextTick(() => {
              let bargraphId = document.getElementById('caseTimebar')
              this.getEchar(bargraphId);
            });

            this.showPieData = [];
            for (let i = 0; i < this.getCaseAreaData.length; i++) {
              this.showPieData.push({
                value: this.getCaseAreaData[i].count,
                name: this.getCaseAreaData[i].regionName
              });
            }
            this.$nextTick(() => {
              let pieChartsId = document.getElementById('caseTimepie')
              this.getpie(pieChartsId)
            });
          } else {
            layer.alert("获取案发区域统计数据失败！", {
              icon: 5,
              title: "消息提示"
            });
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    //查询
    getQuery() {
      this.showChars = false;
      this.getCaseArea();
    },
    //重置
    getReset() {
      this.showChars = false;
      this.cityId = "--请选择--";
      this.startTime = null; //this.getDateString(new Date().getTime() - 29*24*60*60*1000).split(' ')[0];
      this.endTime = null; //this.getDateString(new Date().getTime()).split(' ')[0];
      let maxDate = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(), //关键
        date: new Date().getDate()
      };
      this.startTimeLayDate.config.max = maxDate;
      this.endTimeLayDate.config.min = "1900-01-01";
      this.provinceId = this.defaultProvince;
      this.getLoadCity("first");
    },
    //获取选中的省份
    selectProvince(vId) {
      let obj = {};
      obj = this.getLoadProvinceData.find(item => {
        return item.regionId == vId;
      });
      this.provinceId = obj.regionId;
      this.cityId = "--请选择--";
      this.getLoadCity();
      this.regionId = this.provinceId;
      this.getCaseArea();
    },
    //获取选中的城市
    selectCity(vId) {
      let obj = {};
      obj = this.getLoadCityData.find(item => {
        return item.regionId == vId;
      });
      this.cityId = obj.regionId;
      this.regionId = this.cityId;
      this.getCaseArea();
    },

    getDateString(date) {
      //date 为毫秒数
      let d = new Date(date);
      let mm =
        d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
      let dd = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
      let hh = d.getHours() >= 10 ? d.getHours() : "0" + d.getHours();
      let MM = d.getMinutes() >= 10 ? d.getMinutes() : "0" + d.getMinutes();
      let ss = d.getSeconds() >= 10 ? d.getSeconds() : "0" + d.getSeconds();
      return d.getFullYear() + "-" + mm + "-" + dd + " 23:59:59";
    },

    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../vendor/Export2Excel");
        const tHeader = ["案发区域", "案件数量"];
        const filterVal = ["regionName", "count"];
        const list = this.getCaseAreaData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "案发区域统计列表");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
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
.main_btnleft {
  width: 9.25rem;
  background: url("../../assets/images/count/leftechart.png") center no-repeat;
  background-size: 100% 100%;
}
.main_btnleft .btntitle {
  display: flex;
  align-items: center;
  height: 0.47rem;
  line-height: 0.47rem;
  margin: 0 0.06rem;
  margin-top: 0.04rem;
  font-size: 0.18rem;
  padding-left: 0.3rem;
  color: #dcdfe0;
  background: url("../../assets/images/count/lefttitle.png") center no-repeat;
  background-size: 100% 100%;
}
.main_btnleft img {
  width: 0.22rem;
  height: 0.17rem;
  margin-right: 0.11rem;
  vertical-align: middle;
}
.main_btnright {
  width: 8.6rem;
  background: url("../../assets/images/count/rightechart.png") center no-repeat;
  background-size: 100% 100%;
}
.main_btnright .btntitle {
  display: flex;
  align-items: center;
  height: 0.47rem;
  line-height: 0.47rem;
  margin: 0 0.06rem;
  margin-top: 0.04rem;
  font-size: 0.18rem;
  padding-left: 0.3rem;
  color: #dcdfe0;
  background: url("../../assets/images/count/righttitle.png") center no-repeat;
  background-size: 100% 100%;
}
.main_btnright img {
  width: 0.22rem;
  height: 0.17rem;
  margin-right: 0.11rem;
  vertical-align: middle;
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
  background: url("../../assets/images/count/title.png") center no-repeat;
  background-size: 100% 100%;
  font-size: 0.2rem;
}
.caseNameSelect {
  width: 1.87rem;
  font-size: 0.14rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #606266;
}
.maintilebox {
  width: 100%;
  background-color: rgba(20, 38, 61, 0.9);
  border-top: 1px solid #235589;
  border-bottom: 1px solid #0c2a4e;
  display: flex;
  justify-content: space-between;
}
.main_top >>> .el-input__inner {
  width: 1.87rem;
}
#sliders{
  position: absolute;
  top: 0.6rem;
  right: 1.1rem;
}
.changeChart,#btn{
  color: rgb(153, 201, 250);
  background-color: #061220;
  border: none;
  cursor: pointer;
}
#btn{
  width: 0.3rem;
  height: 0.25rem;
  background: url('../../../src/assets/images/count/exportCharts1.png') no-repeat no-repeat;
  position: absolute;
  top: 0.15rem;
  right: 0.25rem;
}
#btn:hover{
  width: 0.3rem;
  height: 0.25rem;
  background: url('../../assets/images/count/exportChartshover1.png') no-repeat no-repeat;
  position: absolute;
  top: 0.15rem;
  right: 0.25rem;
}
#clear-button{
  width: 0.3rem;
  height: 0.25rem;
  background: url('../../assets/images/count/lineCharts1.png') no-repeat no-repeat;
  position: absolute;
  top: -0.45rem;
  right: 0.12rem;
}
  #clear-button:hover{
  width: 0.3rem;
  height: 0.25rem;
  background: url('../../assets/images/count/lineChartshover1.png') no-repeat no-repeat;
  position: absolute;
  top: -0.45rem;
  right: 0.12rem;
}
#refresh-button{
  width: 0.3rem;
  height: 0.25rem;
  background: url('../../assets/images/count/resetCharts1.png') no-repeat no-repeat;
  position: absolute;
  top: -0.45rem;
  right: -0.55rem;
}
#refresh-button:hover{
  width: 0.3rem;
  height: 0.25rem;
  background: url('../../assets/images/count/resetChartshover1.png') no-repeat no-repeat;
  position: absolute;
  top: -0.45rem;
  right: -0.55rem;
}
#pie-button{
  width: 0.3rem;
  height: 0.25rem;
  background: url('../../assets/images/count/columnar1.png') no-repeat no-repeat;
  position: absolute;
  top: -0.45rem;
  right: -0.25rem;
}
#pie-button:hover{
  width: 0.3rem;
  height: 0.25rem;
  background: url('../../assets/images/count/columnarhover1.png') no-repeat no-repeat;
  position: absolute;
  top: -0.45rem;
  right: -0.25rem;
}
</style>
