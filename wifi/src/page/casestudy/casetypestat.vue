<!--
 * @Author: your name
 * @Date: 2020-01-19 09:04:59
 * @LastEditTime : 2020-06-22 11:00:02
 * @LastEditors  : chenxf
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\casestudy\casetypestat.vue
 -->
<template>
  <div class="caseinfo">
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 ></router-link>
      <div class="sysname">&nbsp;案件类型统计</div>
    </div>
    <div class="mainbox">
      <div class="centermain">
        <div class="maintilebox">
          <p class="maintile">案件类型统计</p>
          <div class="main_top">
            <div class="dpa">
              <span>办案单位：</span>
              <el-popover placement="bottom-start" trigger="click">
                <el-tree
                  :data="getInitDeptData"
                  show-checkbox
                  default-expand-all
                  node-key="orgId"
                  ref="tree"
                  check-strictly
                  @check="handleClick"
                  :props="defaultProps"
                ></el-tree>
                <input
                  class="timeInput"
                  slot="reference"
                  readonly
                  v-model.trim="deptNames"
                  placeholder="请选择办案单位"
                  title="请选择办案单位"
                >
              </el-popover>
            </div>
            <p class="margLR">
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
              <el-button type="warning" class="tryBtn" icon="el-icon-refresh" @click="getReset">重置</el-button>
              <el-button type="success" class="topBtn" @click="export2Excel">导出</el-button>
            </p>
          </div>
        </div>
        <div class="mainchars">
          <div class="mainContent" v-if="showChars">
            <div class="main_btn main_btnleft" id="one">
              <p class="btntitle">
                <img src="../../assets/images/count/lefticon.png" alt>案件类型{{title}}统计分析图
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
                <img src="../../assets/images/count/righticon.png" alt>案件类型饼状统计分析图
              </p>
              <div id="caseTimepie" style="width: 100%;height: calc(100% - 0.47rem)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footerSecond/>
  </div>
</template>

<script>
import footerSecond from "../../components/footer_second"
import higgcharCommon from '../../api/casestudy/highcharCommon.js'
export default {
  components: {
    footerSecond
  },
  mixins:[higgcharCommon],
  data() {
    return {
      loading: null,
      imgoneshow: false,
      imgtwoshow: true,
      caseTimebar: true,
      caseTimepie: false,
      time: [],
      getInitDeptData: [],
      defaultProps: {
        children: "children",
        label: "orgName"
      },
      deptNames: "",
      getCaseCategoryData: [],
      xShowData: [],
      showData: [],
      legendData: [],
      showPieData: [],
      deptIds: null,
      startTime: null, //this.getDateString(new Date().getTime() - 29*24*60*60*1000).split(' ')[0],
      endTime: null, //this.getDateString(new Date().getTime()).split(' ')[0],

      startTimeLayDate: null,
      endTimeLayDate: null,
      showChars: true
    };
  },
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
    this.getInitDept();
    this.getCaseCategory();
  },
  methods: {
    handleClick(data, checked) {
      this.deptNames = "";
      this.deptIds = checked.checkedKeys.join(",");
      if (checked.checkedNodes.length) {
        for (let i = 0; i < checked.checkedNodes.length; i++) {
          this.deptNames += checked.checkedNodes[i].orgName + ",";
        }
        this.deptNames = this.deptNames.substr(0, this.deptNames.length - 1);
      } else {
        this.deptNames = "";
      }
    },
    getEchar(bargraphId) {
      let gdata = [];
      for (let i = 0; i < this.showPieData.length; i++) {
        let idata = [];
        idata[0] = this.showPieData[i].name;
        idata[1] = parseInt(this.showPieData[i].value); // 字符串转浮点数
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
    //     console.log(res);
    //   })
    // },
    //获取办案单位
    getInitDept() {
      this.$http({
        url: "pca/statistics/initAllVsasDept",
        method: "get"
      })
        .then(res => {
          if (res.statusText == "OK" && res.data.code == 200) {
            let arr = [];
            for (const key in res.data.data) {
              arr.push(key);
            }
            let arr1 = [];
            for (let i = 0; i < arr.length; i++) {
              arr1.push(res.data.data[arr[i]]);
            }
            let ccc = [];
            for (let i = 0; i < arr1.length; i++) {
              ccc = ccc.concat(arr1[i]);
            }
            this.getInitDeptData = ccc;
          } else {
            this.$notify({
              type: "warning",
              message: "获取办案单位列表失败！",
              position: "bottom-right",
              duration: 3000
            });
          }
        })
        .catch(res => {
          // console.log(res)
        });
    },
    //获取案件类型统计
    getCaseCategory() {
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "加载中"
      });
      this.$http({
        url: "pca/statistics/caseCategory",
        method: "get",
        params: {
          deptIdsArr: this.deptIds,
          startTime: this.$commons.isEmpty(this.startTime)
            ? this.startTime
            : this.startTime + " 00:00:00",
          endTime: this.$commons.isEmpty(this.endTime)
            ? this.endTime
            : this.endTime + " 23:59:59"
        }
      })
        .then(res => {
          this.loading.close();
          this.showChars = true;
          if (res.statusText == "OK" && res.data.code == 200) {
            this.getCaseCategoryData = res.data.data;
            this.xShowData = [];
            for (let i = 0; i < this.getCaseCategoryData.length; i++) {
              this.xShowData.push(this.getCaseCategoryData[i].caseCategoryDesc);
            }
            this.showData = [];
            for (let i = 0; i < this.getCaseCategoryData.length; i++) {
              this.showData.push(this.getCaseCategoryData[i].countNum);
            }
            this.$nextTick(() => {});
            this.legendData = [];
            for (let i = 0; i < this.getCaseCategoryData.length; i++) {
              this.legendData.push(
                this.getCaseCategoryData[i].caseCategoryDesc
              );
            }
            this.showPieData = [];
            for (let i = 0; i < this.getCaseCategoryData.length; i++) {
              this.showPieData.push({
                value: this.getCaseCategoryData[i].countNum,
                name: this.legendData[i]
              });
            }
            this.$nextTick(() => {
              let bargraphId = document.getElementById("caseTimebar");
              this.getEchar(bargraphId);
              let pieChartsId = document.getElementById("caseTimepie");
              this.getpie(pieChartsId);
            });
          } else {
            this.$notify({
              type: "warning",
              message: "获取案件类型统计数据失败！",
              position: "bottom-right",
              duration: 3000
            });
          }
        })
        .catch(res => {});
    },

    //查询
    getQuery() {
      this.showChars = false;
      this.selectData = this.$refs.tree.getCheckedKeys();

      this.deptIds = this.selectData.join(",");
      this.getCaseCategory();
    },
    //重置
    getReset() {
      this.showChars = false;
      this.$refs.tree.setCheckedKeys([]);
      this.deptNames = "";
      this.deptIds = null;
      this.startTime = null; //this.getDateString(new Date().getTime() - 29*24*60*60*1000).split(' ')[0];
      this.endTime = null; //this.getDateString(new Date().getTime()).split(' ')[0];
      let maxDate = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(), //关键
        date: new Date().getDate()
      };
      this.startTimeLayDate.config.max = maxDate;
      this.endTimeLayDate.config.min = "1900-01-01";
      this.getCaseCategory();
    },
    //导出
    getExport() {
      this.$http({
        url: "pca/statistics/categoryExport",
        method: "get",
        params: {
          deptIdsArr: this.deptIds,
          startTime: this.startTime,
          endTime: this.endTime
        }
      })
        .then(res => {
          if (res.statusText == "OK") {
            alert("This method is disgusting！！！");
          }
        })
        .catch(res => {});
    },

    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../vendor/Export2Excel");
        const tHeader = ["案件类型", "案件数量"];
        const filterVal = ["caseCategoryDesc", "countNum"];
        const list = this.getCaseCategoryData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "案件类型统计列表");
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
.caseNameSelect {
  width: 1.87rem;
  font-size: 0.14rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #606266;
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
.maintilebox {
  width: 100%;
  background-color: rgba(20, 38, 61, 0.9);
  border-top: 1px solid #235589;
  border-bottom: 1px solid #0c2a4e;
  display: flex;
  justify-content: space-between;
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
