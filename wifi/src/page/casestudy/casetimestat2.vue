<template>
  <div class="caseinfo">
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 ></router-link>
      <div class="sysname">&nbsp;案发时段统计</div>
    </div>
    <div class="mainbox">
      <div class="centermain">
        <div class="maintilebox">
          <p class="maintile">案发时段统计</p>
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
                  style="padding-left:5px"
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
              <span>至</span>
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
              <el-button type="primary" class="searchBtn" icon="el-icon-search" @click="getQuery">查询</el-button>
              <el-button type="warning" class="tryBtn" icon="el-icon-refresh" @click="getReset">重置</el-button>
              <el-button type="success" class="topBtn" @click="export2Excel">导出</el-button>
            </p>
          </div>
        </div>
        <div class="mainchars">
          <div class="mainContent" v-if="showChars">
            <div class="main_btn main_btnleft" id="one">
              <p class="btntitle">
                <img src="../../assets/images/count/lefticon.png" alt>案发时段柱状统计分析图
              </p>
              <div id="caseTimebar" style="width: 100%;height:calc(100% - 0.47rem)"></div>
            </div>
            <div class="main_btn main_btnright" id="two">
              <p class="btntitle">
                <img src="../../assets/images/count/righticon.png" alt>案发时段饼状统计分析图
              </p>
              <div id="caseTimepie" style="width: 100%;height:calc(100% - 0.47rem)"></div>
            </div>
          </div>
        </div>
      </div>
      <footerSecond/>
    </div>
  </div>
</template>

<script>
import footerSecond from "../../components/footer_second";
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
      getInitDeptData: [], //办案单位
      defaultProps: {
        children: "children",
        label: "orgName"
      },
      deptNames: "",
      getCaseTimeData: [],
      showData: [],
      getPieData: [],
      showPieData: [],
      deptIds: null,
      startTime: null,
      endTime: null,
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
    this.getCaseTime();
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
    getEchar() {
      var showData = this.showData;
      let myChart = this.$echarts.init(
        document.getElementById("caseTimebar"),
        "macarons"
      );
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
            saveAsImage: { show: true, name: "案发时段统计" }
          },
          x: 780,
          y: "top"
        },

        xAxis: {
          type: "category",
          data: [
            "00:00--03:00",
            "03:00--06:00",
            "06:00--09:00",
            "09:00--12:00",
            "12:00--15:00",
            "15:00--18:00",
            "18:00--21:00",
            "21:00--24:00"
          ],
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(153,201,250)",
              fontSize: 14
            }
          },
          //  axisLine:{
          //       lineStyle:{
          //         color:"rgba(153,201,250,.5)",
          //       }
          //   },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          minInterval: 1,
          name: "数量(件)",
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgba(153,201,250)",
              fontSize: 14
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: [
                "rgba(0,0,0,0)",
                "rgba(153,201,250,.5)",
                "rgba(153,201,250,.5)",
                "rgba(153,201,250,.5)",
                "rgba(153,201,250,.5)",
                "rgba(153,201,250,.5)",
                "rgba(153,201,250,.5)"
              ],
              type: "dashed"
            },
            show:false
          },
          axisLine: {
            lineStyle: {
              color: "rgba(153,201,250,.5)"
            }
          },
          splitArea: {
            show: false
          }
        },
        series: [
          {
            data: showData,
            barWidth: 30,
            // barGap: "10%",
            name: "案件数量",
            type: "bar",
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    "rgba(178,105,199,1)",
                    "rgba(156,112,209,1)",
                    "rgba(142,108,228,1)",
                    "rgba(102,99,230,1)",
                    "rgba(63,93,223,1)",
                    "rgba(52,126,227,1)",
                    "rgba(27,139,217,1)",
                    "rgba(46,121,245,1)",
                    "rgba(46,180,250,1)",
                    "rgba(107,163,255,1)",
                    "rgba(178,105,199,1)",
                    "rgba(156,112,209,1)",
                    "rgba(142,108,228,1)",
                    "rgba(102,99,230,1)",
                    "rgba(63,93,223,1)",
                    "rgba(52,126,227,1)",
                    "rgba(27,139,217,1)",
                    "rgba(46,121,245,1)",
                    "rgba(46,180,250,1)",
                    "rgba(107,163,255,1)"
                  ];
                  return colorList[params.dataIndex];
                }
              }
              // emphasis: {
              //   shadowBlur: 10,
              //   shadowOffsetX: 0,
              //   shadowColor: "rgba(0, 0, 0, 0.5)"
              // }
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
      // showPieData.forEach(v => {
      //   v.value = '案发数量' + v.value
      // })

      let myChart = this.$echarts.init(
        document.getElementById("caseTimepie"),
        "macarons"
      );
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
          left: "10%",
          top: "80%",
          width: "90%",
          height: "10%",
          itemGap: 15,
          textStyle: {
            color: "#99c9fa"
          },
          // orient: 'vertical',
          data: [
            "00:00--03:00",
            "03:00--06:00",
            "06:00--09:00",
            "09:00--12:00",
            "12:00--15:00",
            "15:00--18:00",
            "18:00--21:00",
            "21:00--24:00"
          ]
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
                  fontSize: 16 //文字的字体大小
                }
                // formatter:'{d}%'
              }
            },
            name: "案发时段统计",
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
                color: function(params) {
                  let colorList = [
                    "rgba(178,105,199,1)",
                    "rgba(156,112,209,1)",
                    "rgba(142,108,228,1)",
                    "rgba(102,99,230,1)",
                    "rgba(63,93,223,1)",
                    "rgba(52,126,227,1)",
                    "rgba(27,139,217,1)",
                    "rgba(46,121,245,1)",
                    "rgba(46,180,250,1)",
                    "rgba(107,163,255,1)",
                    "rgba(178,105,199,1)",
                    "rgba(156,112,209,1)",
                    "rgba(142,108,228,1)",
                    "rgba(102,99,230,1)",
                    "rgba(63,93,223,1)",
                    "rgba(52,126,227,1)",
                    "rgba(27,139,217,1)",
                    "rgba(46,121,245,1)",
                    "rgba(46,180,250,1)",
                    "rgba(107,163,255,1)"
                  ];
                  return colorList[params.dataIndex];
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
        }, 500);
      });
    },
    //  //获取办案单位
    // getInitDept(){
    //   this.$http({
    //     url:'pca/statistics/initDept',
    //     method:'get'
    //   }).then((res)=>{
    //     if(res.statusText=='OK'&& res.data.code==200){
    //       this.getInitDeptData = res.data.data;
    //     }else{
    //       layer.alert('获取办案单位列表失败！',{icon:5,title:"消息提示"});
    //     }
    //   }).catch( res=>{
    //     console.log(res)
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
          console.log(res);
        });
    },
    //获取案件时间统计
    getCaseTime() {
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "加载中"
      });
      this.$http({
        url: "pca/statistics/caseTime",
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
          this.showChars = true;
          this.loading.close();
          if (res.statusText == "OK" && res.data.code == 200) {
            this.getCaseTimeData = res.data.data.list;

            this.showData = [];
            for (let i = 0; i < this.getCaseTimeData.length; i++) {
              this.showData.push(this.getCaseTimeData[i]);
            }
            this.$nextTick(() => {
              this.getEchar();
            });

            this.getPieData = res.data.data.list;
            var arr = [
              "00:00--03:00",
              "03:00--06:00",
              "06:00--09:00",
              "09:00--12:00",
              "12:00--15:00",
              "15:00--18:00",
              "18:00--21:00",
              "21:00--24:00"
            ];
            this.showPieData = [];
            for (let i = 0; i < this.getPieData.length; i++) {
              this.showPieData.push({
                value: this.getPieData[i],
                name: arr[i]
              });
            }
            this.$nextTick(() => {
              this.getpie();
            });
          } else {
            this.$notify({
              type: "warning",
              message: "获取案发时段统计数据失败！",
              position: "bottom-right",
              duration: 3000
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
      this.selectData = this.$refs.tree.getCheckedKeys();
      this.deptIds = this.selectData.join(",");
      this.getCaseTime();
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
      this.getCaseTime();
    },

    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../vendor/Export2Excel");
        const tHeader = ["案发时段", "案件数量"];
        const filterVal = ["name", "value"];
        const list = this.showPieData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "案发时段统计列表");
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
.caseNameSelect {
  width: 1.87rem;
  font-size: 0.14rem;
  height: 0.3rem;
  line-height: 0.3rem;
  color: #606266;
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
.maintilebox {
  width: 100%;
  background-color: rgba(20, 38, 61, 0.9);
  border-top: 1px solid #235589;
  border-bottom: 1px solid #0c2a4e;
  display: flex;
  justify-content: space-between;
}
</style>
