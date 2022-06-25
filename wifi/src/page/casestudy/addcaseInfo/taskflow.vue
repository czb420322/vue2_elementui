<!--
 * @Author: your name
 * @Date: 2020-07-17 09:36:06
 * @LastEditTime : 2020-08-28 16:15:22
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Editclic
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\page\casestudy\addcaseInfo\taskflow.vue
 -->
<template>
  <div>
    <el-dialog
      title="任务关系图"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="closeDia"
      width="80%"
    >
      <div v-if="dialogVisible" id="ContentWrap"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="dialogVisible = false">关 闭</el-button>
        <!-- <el-button class="cancleBtn" @click="dialogVisible = false">取 消</el-button> -->
        <!-- <el-button class="passBtn"  @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      AjaxtreeData: [],
      name: ""
    };
  },
  components: {},
  // computed(){
  //
  // },
  props: ["dataCaseInfo", "isflow"],
  watch: {
    isflow(val) {
      this.dialogVisible = val;
      if (val) {
        this.$nextTick(() => {
          this.getTree();
        });
      }
    }
  },

  methods: {
    closeDia() {
      this.$emit("childbyflow", false);
    },

    //获取树形图信息
    getTree() {
      let data = {
        caseUuid: this.$route.query.caseUuid
      };
      data = this.$qs.stringify(data);
      this.$http.post("/pca/synergyhandler/selectTreeList", data).then(res => {
        if (res.data.code == 200) {
          this.name = res.data.data.caseEstablisher;
          this.AjaxtreeData = res.data.data.hlist;
          let data = [];
          let obj;
          for (let i = 0; i < this.AjaxtreeData.length; i++) {
            obj = {
              // name:this.role(this.AjaxtreeData[i].distRole) +'：' + this.AjaxtreeData[i].user.trueName+"\n"+this.AjaxtreeData[i].user.orgName,
              name:
                `{aaa|${this.role(this.AjaxtreeData[i].distRole) +
                  "：" +
                  this.AjaxtreeData[i].user.trueName}}` +
                "\n" +
                "\n" +
                this.AjaxtreeData[i].user.orgName,
              // value: 4,
              symbol:
                "image://data:image/png;base64,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",
              // nodePadding: [100,30],
              // itemStyle: {
              //  normal: {
              label: {
                show: true,
                // position: 'right',
                rich: {
                  aaa: {
                    color: "#99c9fa"
                  },
                  bbb: {
                    color: "#fff"
                  }
                }
              },

              //  }
              //  },
              tooltip: {
                formatter: function(params) {
                  // console.log(params)
                  var newname1 = params.name.split("}")[0].split("|")[1];
                  var newname2 = params.name.split("}")[1];
                  return `${newname1}<br />${newname2}`;
                }
              },
              children: this.getTreeForData(i)
            };
            data.push(obj);
          }
          this.tree(data);
        }
      });
    },
    //内层循环
    getTreeForData(i) {
      if (this.AjaxtreeData[i].taskList.length != 0) {
        let data1 = [];
        let obj1;
        for (let j = 0; j < this.AjaxtreeData[i].taskList.length; j++) {
          let name = "";
          if (this.AjaxtreeData[i].taskList[j].finishTime == null) {
            this.AjaxtreeData[i].taskList[j].finishTime = "";
            name =
              `{aaa|${this.AjaxtreeData[i].taskList[j].taskName}  ：}` +
              `{bbb|${this.changeState(
                this.AjaxtreeData[i].taskList[j].taskStatus
              )}}` +
              "\n" +
              "\n" +
              "接收时间：" +
              this.AjaxtreeData[i].taskList[j].beginTime;
          } else {
            name =
              `{aaa|${this.AjaxtreeData[i].taskList[j].taskName} ：}` +
              `{bbb|${this.changeState(
                this.AjaxtreeData[i].taskList[j].taskStatus
              )}}` +
              "\n" +
              "\n" +
              "接收时间：" +
              this.AjaxtreeData[i].taskList[j].beginTime +
              "\n" +
              "\n" +
              "完成时间：" +
              this.AjaxtreeData[i].taskList[j].finishTime;
          }
          let status = this.changeState(
            this.AjaxtreeData[i].taskList[j].taskStatus
          );
          let finishTimestatus = this.AjaxtreeData[i].taskList[j].finishTime;
          obj1 = {
            // name: '（当前完成状态：'+ this.changeState(this.AjaxtreeData[i].taskList[j].taskStatus)  +'；接收时间：'+ this.AjaxtreeData[i].taskList[j].beginTime +'；完成时间：'+ this.AjaxtreeData[i].taskList[j].dealTime +'）',
            name: name,
            // value:  4,
            // symbol: 'image://data:image/png;base64,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',
            symbol: "emptyCircle",
            // nodePadding: [100,30],
            symbolSize: 10,
            // itemStyle: {
            // normal: {
            // color: '#fa6900',
            label: {
              show: true,
              // position: 'right',
              rich: {
                aaa: {
                  color: "#99c9fa"
                },
                bbb: {
                  color: "#abb1b7",
                  padding: [1, 5, 3, 5],
                  borderRadius: 2,
                  fontSize: 12,
                  verticalAlign: "middle",
                  backgroundColor:
                    status == "已完成"
                      ? "#2a6f38"
                      : status == "已处理"
                      ? "#2f5a87"
                      : "#8d5252"
                }
              }
            },
            // }
            // },
            tooltip: {
              formatter: function(params) {
                //  console.log(params)
                if (finishTimestatus == null || finishTimestatus == "") {
                  let newname1 = params.name.split("}{")[0].split("|")[1];
                  let newname2 = params.name.split("}{bbb|")[1].split("}")[0];
                  let newname3 = params.name.split("}{bbb|")[1].split("}")[1];
                  return `${newname1}${newname2}<br />${newname3}`;
                } else {
                  let newname1 = params.name.split("}{")[0].split("|")[1];
                  let newname2 = params.name.split("}{bbb|")[1].split("}")[0];
                  let newname3 = params.name
                    .split("}{bbb|")[1]
                    .split("}")[1]
                    .split("完成时间")[0];
                  let newname4 = params.name
                    .split("}{bbb|")[1]
                    .split("}")[1]
                    .split("完成时间：")[1];
                  return `${newname1}${newname2}<br />${newname3}<br />完成时间：${newname4}`;
                }
              }
            }
          };
          data1.push(obj1);
        }
        return data1;
      } else {
        return [];
      }
    },
    //任务状态转中文
    changeState(val) {
      if (val == 1) {
        return "未处理";
      }
      if (val == 2) {
        return "已处理";
      }
      if (val == 3) {
        return "已完成";
      }
      if (val == 4) {
        return "已撤销";
      }
    },
    role(val) {
      if (val == 1) {
        return "指挥员";
      } else if (val == 2) {
        return "侦查员";
      }
    },
    //打开树型图插件
    tree(treeData) {
      //   function strlen(str){
      //     var len = 0;
      //     for (var i=0; i<str.length; i++) {
      //       var c = str.charCodeAt(i);
      //       //单字节加1
      //       if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
      //         len++;
      //       }
      //       else {
      //         len+=2;
      //       }
      //     }
      //   return len;
      //  }
      //  console.log(treeData)
      let myChart = this.$echarts.init(
        document.getElementById("ContentWrap"),
        "macarons"
      );
      //  myChart.showLoading();
      //  myChart.hideLoading();

      // let option = {
      //     tooltip: {
      //         trigger: 'item',
      //         triggerOn: 'mousemove'
      //     },
      //     series: [
      //         {
      //             type: 'tree',

      //             data: treeData,

      //             top: '18%',
      //             bottom: '14%',

      //             layout: 'radial',

      //             symbol: 'emptyCircle',

      //             lineStyle:{
      //               curveness:0
      //             },

      //             symbolSize: 7,

      //             initialTreeDepth: 3,

      //             animationDurationUpdate: 750

      //         }
      //     ]
      // };

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
        series: [
          {
            // name:'树图',
            type: "tree",
            orient: "horizontal", // vertical horizontal
            left: "12%",
            right: "20%",
            rootLocation: { x: "left", y: "center" }, // 根节点位置  {x: 'center',y: 10}
            symbol:
              "image://data:image/png;base64,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",
            symbolSize: 30,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "left", //outside,inside
                  textStyle: {
                    color: "#2e93fb",
                    fontSize: 12,
                    fontWeight: "bolder"
                  }
                  // rich:{
                  //   aaa:{
                  //     color:'#99c9fa'
                  //   },
                  //   bbb:{
                  //      color:'#fff'
                  //   }
                  // }
                },
                lineStyle: {
                  color: "#46627e",
                  // width: 1,
                  type: "solid", // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                  curveness: 1,
                  height: "6rem"
                }
              },
              emphasis: {
                label: {
                  show: true
                }
              }
            },
            leaves: {
              label: {
                normal: {
                  position: "left",
                  align: "left"
                }
              }
            },
            data: [
              {
                name: `{aaa|案件名：${this.dataCaseInfo.caseName}}\n\n创建人:${
                  this.name
                }`,
                // value: 6,
                // nodePadding: [100,30],
                symbolSize: 30,
                symbol:
                  "image://data:image/png;base64,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",
                // itemStyle: {
                // normal: {
                label: {
                  show: true,
                  // position: 'left',
                  rich: {
                    aaa: {
                      color: "#99c9fa"
                    },
                    bbb: {
                      color: "#fff"
                    }
                  }
                },
                // }
                // },
                children: treeData,
                tooltip: {
                  formatter: function(params) {
                    // console.log(params)
                    var newname1 = params.name.split("}")[0].split("|")[1];
                    var newname2 = params.name.split("}")[1];
                    return `${newname1}<br />${newname2}`;
                  }
                }
              }
            ]
          }
        ]
      };

      myChart.setOption(option);
      myChart.resize();
      window.addEventListener("resize", function() {
        setTimeout(function() {
          myChart.resize();
        }, 100);
      });
      window.addEventListener("click", function() {
        setTimeout(function() {
          myChart.resize();
        }, 100);
      });
    }
  }
};
</script>

<style scoped>
@import "../../../assets/css/commom.css";
/* .el-dialog__wrapper >>> .el-dialog__header{
    background-color: #f3f6f8;
}
.el-dialog__wrapper >>> .el-dialog__footer{
    text-align: center;
    border-top: 1px solid #d5dade;
} */
.el-dialog__wrapper >>> .el-dialog__body {
  padding: 0.1rem 0.2rem;
}
#ContentWrap {
  height: 550px;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
