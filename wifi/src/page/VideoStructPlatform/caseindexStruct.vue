<template>
  <div class="mainBody">
    <Searchall/>
    <Uploadpicture v-show="status"/>
    <div class="contentwrap">
      <div class="contentleft">
        <div class="custom">
          <div class="mytable">
            <span>我的工作台</span>
            <span @click="add" style="font-size:14px;">自定义工作台</span>
          </div>
          <div class="table_info">
            <div class="table_info_">
              <template v-if="anotherImgList">
                <div class="cc_" v-for="(item, index) in anotherImgList" :key="index">
                  <div @click="gotopath(cssobj[item],item)" :class="cssobj[item][0]">
                    <img
                      :src="bigSrc['mm_'+item]"
                      :alt="'mm_'+item"
                      @mouseover="tohover($event,item)"
                      @mouseout="topre($event,item)"
                    >
                  </div>

                  <!-- <router-link tag="div" :to="{path:cssobj[item][1],query:{menuCode:item}}" :class="cssobj[item][0]">
                  <img :src="bigSrc['mm_'+item]" :alt="'mm_'+item"  @mouseover="tohover($event,item)" @mouseout="topre($event,item)">
                  </router-link>-->
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="contentright">
        <div class="my_info">
          <div class="current_user">
            <img src="../../assets/images/newIndex/usericon.png" alt> 当前用户
          </div>
          <div class="my_info_title">我的信息</div>
          <div class="my_info_cont">
            <div class="my_info_cont_l">
              <div class="user_info">
                <span
                  class="user_des"
                >用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;:</span>
                <span class="user_name">{{this.userinfo.userName}}</span>
              </div>
              <div class="user_info">
                <span
                  class="user_des"
                >姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;:</span>
                <span class="user_name">{{this.userinfo.trueName}}</span>
              </div>
              <div class="user_info">
                <span class="user_des">所&nbsp;&nbsp;属&nbsp;&nbsp;部&nbsp;&nbsp;门&nbsp;:</span>
                <span class="user_name" :title="userinfo.orgName">{{userinfo.orgName}}</span>
              </div>
              <div class="user_info">
                <span class="user_des">登&nbsp;&nbsp;录&nbsp;&nbsp;时&nbsp;&nbsp;间&nbsp;:</span>
                <span class="user_name" :title="userinfo.lastLoginTime">{{userinfo.lastLoginTime}}</span>
              </div>
            </div>
            <div class="my_info_cont_r">
              <img
                v-if="imgUrl"
                :src="this.userinfo.photoUrl == null ? $store.state.defaultcImg : this.userinfo.photoUrl"
                :onerror="$store.state.defaultcImg"
              >
              <img v-else src="../../assets/rl.png" onerror="../../assets/rl.png" alt>
            </div>
          </div>
        </div>
        <div class="glaj">
          <div class="task_title">
            <span class="task_des">我的任务</span>
            <span class="more" @click="gotoMyTask">
              <em>更多</em>
              <em>>></em>
            </span>
          </div>
          <div class="aj_info">
            <p v-show="tasklist.length == 0">暂无任务</p>
            <div class="aj_title" v-show="tasklist.length > 0">
              <span>任务编号</span>
              <span>任务名称</span>
              <span>任务位置</span>
            </div>
            <p v-show="control">服务异常</p>

            <div
              class="aj_cont"
              v-for="(item,index) in tasklist"
              v-if="index < 2"
              :key="index"
              @click="lookTaskInfo(item)"
            >
              <span :title="item.updateTime">{{item.updateTime}}</span>
              <span :title="item.taskName">{{item.taskName}}</span>
              <span :title="item.cameraName">{{item.cameraName}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="echartsarea">
      <div class="statistic_info_list">
        <div class="statistic_info_item">
          <div class="statistic_info_title">
            <img class="time" src="../../assets/images/newIndex/accounticon1.png" alt>近一个月每天新增结构化数量统计
          </div>
          <p class="ts" v-show="trafficChart">服务异常</p>
          <p class="ts" v-show="noTrafficChart">暂无数据</p>
          <div class="statistic_info_content" id="trafficChart" style="width: 100%;height:100%"></div>
        </div>

        <div class="statistic_info_item m_sii">
          <div class="statistic_info_title">
            <img class="area" src="../../assets/images/newIndex/accounticon2.png" alt>近一个月结构化总数量统计
          </div>
          <p class="ts" v-show="carTypeChartLeft">服务异常</p>
          <p class="ts" v-show="noCarTypeChartLeft">暂无数据</p>
          <!-- <div class="statistic_info_content" id="carTypeChartLeft"></div> -->
          <div class="statistic_info_content" id="carTypeChartLefts"></div>
        </div>

        <div class="statistic_info_item">
          <div class="statistic_info_title">
            <img class="video" src="../../assets/images/newIndex/accounticon3.png" alt>近一个月处理视频数量统计
          </div>
          <p class="ts" v-show="carPlateChart">服务异常</p>
          <p class="ts" v-show="noCarPlateChart">暂无数据</p>
          <div class="statistic_info_content" id="carPlateChart"></div>
          <!-- <div  class="statistic_info_content" id="xxxx"></div> -->
        </div>
      </div>
    </div>
    <Footer/>
    <!-- 弹出框 -->
    <div class="pop_up" v-show="pop">
      <div class="cont">
        <div class="title">
          <p>自定义工作台</p>
          <span @click="hidden()">
            <img src="../../assets/close_imgsearch.png">
          </span>
        </div>
        <div class="content">
          <div class="left">
            <div class="l_title">
              <h2>我的工作台</h2>
            </div>
            <div class="l_cont">
              <ul>
                <li
                  :class="{lactive:iconRedact}"
                  v-for="(item,index) in leftImgList"
                  @click="ltoggle(item,index)"
                  :key="index"
                >
                  <img
                    :src="src['m_'+item]"
                    alt
                    @mouseover="selftohover($event,item)"
                    @mouseout="selftopre($event,item)"
                  >
                </li>
                <li>
                  <img class="img" src="../../assets/images/module/redact.png" alt>
                </li>
              </ul>
            </div>
            <div class="l_btn">
              <span @click="redact">编辑</span>
            </div>
          </div>
          <div class="right">
            <div class="r_title">
              <h2>全部功能</h2>
            </div>
            <div class="r_cont">
              <div
                class="combat"
                v-for="(item,index) in currentImgList"
                v-if="item.mlist.length!=0"
                :key="index"
              >
                <p>{{item.name}}</p>
                <div class="combat_cont">
                  <ul>
                    <li
                      :class="{ractive:iconRedact}"
                      v-for="(menu, mindex) in item.mlist"
                      :key="mindex"
                      v-show="menu.rightToggle"
                      @click="rtoggle(menu.menuCode)"
                    >
                      <img
                        :src="src['m_'+menu.menuCode]"
                        :alt="'m_'+menu.menuCode"
                        @mouseover="selftohover($event,menu.menuCode)"
                        @mouseout="selftopre($event,menu.menuCode)"
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary cancleBtn" @click="hidden">取 消</el-button>
          <el-button type="primary passBtn" :disabled="clickdisable" @click="append">确 定</el-button>
          <!-- <span type="primary cancleBtn" @click="append">确 认</span>
          <span type="primary passBtn" @click="hidden">取 消</span>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Uploadpicture from "../../components/upload_picture";
import Searchall from "../../components/search_all";
import Footer from "../../components/footer";
import { mapState } from "vuex";
import { cssobj } from "../../common/js/workTableRouter.js";
// import { img_path } from "../../common/js/imgPath.js";
import echarts from "echarts";
import higgcharCommon from "../../api/casestudy/highcharCommon.js";
import brokelineCommon from "../../api/echarts/brokenlineCharts.js";
export default {
  data() {
    return {
      name: this.$storage.getSession("name")
        ? this.$storage.getSession("name")
        : "",
      cssobj: cssobj,

      //自定义菜单
      pop: false,
      imgList: [],
      leftImgList: [],
      defaultImgList: this.$storage.getSession("defaultImgList"), //["301", "302", "303", "304", "305", "306"],
      anotherImgList: [],
      src: {},
      bigSrc: {},
      getImgUrl: "sms/menu/getUserMenus", //存数据接口
      leftUrl: "sms/usercore/workBench/getMyWork",
      okUrl: "sms/usercore/workBench/save",
      iconRedact: false,
      imgUrl: true,

      //过车流量统计
      areaList: [],
      countList: [],
      dataList: [],

      //车辆类别百分比
      dataList1: [],
      vehicleClassList: [],
      vehicleKeyValueList: [],

      //车牌类别统计
      dataList3: [],
      vehiclePlateClassList: [],

      //我的串并案
      historyList: [],
      historia: false,

      //我的案事件
      secondTableList: [],
      control: false,

      // 我的协同作战
      thirdTableList: [],
      underway: false,

      worklist: [],
      userinfo: {},

      trafficChart: false,
      noTrafficChart: false,
      carTypeChartLeft: false,
      noCarTypeChartLeft: false,
      carPlateChart: false,
      noCarPlateChart: false,
      xShowData: [],
      legendData: [],
      showPieData: [],
      getCaseCategoryData: [],
      // colorArr: ['blue', 'green', 'yellow','pink', 'sky', '#333333']
      colorArr: this.$store.state.echarColorList,
      caseVideoLibraryFlag: 1,
      clickdisable: false, //暂时无用的
      caseUuid: "",
      tasklist: [], //任务数组

      todayAddValueList: [],
      dataList2: [] //
    };
  },
  mixins: [higgcharCommon, brokelineCommon],
  computed: {
    ...mapState(["status"]),
    currentImgList: function() {
      let arr = [];
      for (let i = 0; i < this.imgList.length; i++) {
        let temp = {
          mcs: this.imgList[i].mcs,
          mlist: [],
          name: this.imgList[i].name
        };
        for (let j = 0; j < this.imgList[i].mlist.length; j++) {
          if (this.leftImgList.length > 0) {
            for (let k = 0; k < this.leftImgList.length; k++) {
              if (this.imgList[i].mlist[j].menuCode == this.leftImgList[k]) {
                temp.mlist[j] = {
                  menuCode: this.imgList[i].mlist[j].menuCode,
                  menuName: this.imgList[i].mlist[j].menuName,
                  rightToggle: false
                };
                break;
              } else {
                temp.mlist[j] = {
                  menuCode: this.imgList[i].mlist[j].menuCode,
                  menuName: this.imgList[i].mlist[j].menuName,
                  rightToggle: true
                };
              }
            }
          } else {
            temp.mlist[j] = {
              menuCode: this.imgList[i].mlist[j].menuCode,
              menuName: this.imgList[i].mlist[j].menuName,
              rightToggle: true
            };
          }
        }
        arr.push(temp);
      }
      return arr;
    }
  },
  created() {
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
    this.caseVideoLibraryFlag = sessionStorage.getItem("caseVideoLibraryFlag");
  },
  mounted() {
    this.getImgList();
    this.getLeftImgList();
    this.getUserinfo();
    //左边的折线图
    //近一个月每天新增结构化数量
    this.getOneMonthStructList();

    //中间的饼图
    //近一个月结构化总数量统计
    this.getPieNumber();

    //一个月的结构化总数量
    //右边的柱状图
    this.getOneMonthStructAllNumber();

    this.localName();
    this.getMyTaskList();
  },
  updated() {},
  components: {
    Searchall,
    Uploadpicture,
    Footer
  },

  methods: {
    // 测试
    localName() {
      let TrueName = this.$storage.getSession("userInfo");
    },

    //跳转路由
    gotopath(cssobj, item) {
      if (item == 106) {
        // this.$router.push({path:'/videoCombat',query:{ menuCode: '100' }});
        OnInit4();
        setTimeout(() => {
          if (sessionStorage.getItem("lable1") == 2) {
            this.$myconfirm({
              type: "提示",
              msg: "是否下载目标轨迹标识",
              icon: 2,
              btn: {
                ok: "确定",
                no: "取消"
              }
            }).then(() => {
              var link = $(
                '<a href="/static/Videtek_ObjectTracker.exe" target="_blank"></a>'
              );
              link.get(0).click();
            });
          }
        }, 1000);
        return;
      }
      if (item == 107) {
        // this.$router.push({path:'/videoCombat',query:{ menuCode: '100' }});
        OnInit3();
        setTimeout(() => {
          if (sessionStorage.getItem("lable") == 1) {
            this.$myconfirm({
              type: "提示",
              msg: "是否下载视频模糊图像处理",
              icon: 2,
              btn: {
                ok: "确定",
                no: "取消"
              }
            })
              .then(() => {
                var link = $(
                  '<a href="/static/dimImg_deisponse.exe" target="_blank"></a>'
                );
                link.get(0).click();
                // window.open = window.origin + '/static/dimImg_deisponse.exe'
              })
              .catch(() => {});
          }
        }, 1000);
        return;
      }
      if (item == 115) {
        // this.$router.push({path:'/videoCombat',query:{ menuCode: '100' }});
        OnInit5();
        setTimeout(() => {
          if (sessionStorage.getItem("lable2") == 2) {
            this.$myconfirm({
              type: "提示",
              msg: "是否下载视频转码",
              icon: 2,
              btn: {
                ok: "确定",
                no: "取消"
              }
            })
              .then(() => {
                var link = $(
                  '<a href="/static/RecordConvertor.exe" target="_blank"></a>'
                );
                link.get(0).click();
                // window.open = window.origin + '/static/dimImg_deisponse.exe'
              })
              .catch(() => {});
          }
        }, 1000);
        return;
      }
      if (item == 120) {
        this.$router.push({
          path: cssobj[1],
          query: { menuCode: item, ismyupload: true, synergy: "-1" }
        });
        return;
      }
      if (item == 607) {
        this.$http.get("sms/monitor/toMonitor").then(res => {
          window.open(res.data.data, "_blank");
        });
        return;
      }
      this.$router.push({ path: cssobj[1], query: { menuCode: item } });
    },

    //获取用户信息
    getUserinfo() {
      this.userinfo = this.$storage.getSession("userInfo");
      if (this.userinfo.photoUrl == "") {
        this.imgUrl = false;
      }
    },

    //自定义工作台
    getImgList(imgList) {
      this.$http({
        //调用接口
        method: "POST",
        url: this.getImgUrl //this指data
      }).then(response => {
        //接口返回数据
        if (response.data.code == 200) {
          this.imgList = response.data.data;
          for (let i = 0; i < this.imgList.length; i++) {
            // 暂时没有图片，先过滤掉
            this.requreImg(this.imgList[i].mlist);
            // if (i == 12 || i == 13 || i == 14 || i == 15 || i == 16) {
            //   // this.requreImg(this.imgList[0].mcs);
            // } else {
            //   this.requreImg(this.imgList[i].mlist);
            // }
          }
        } else {
          // this.$alert("服务异常","消息提示");
        }
      });
    },
    getLeftImgList(leftImgList) {
      // 左边
      this.$http({
        //调用接口
        method: "POST",
        url: this.leftUrl //this指data
      }).then(response => {
        //接口返回数据
        if (response.data.code == 200) {
          let dd = response.data.data; //['101','102']
          if (dd.length == 0) {
            this.anotherImgList = [];
            this.leftImgList = [];
            this.defaultImgList.forEach(element => {
              this.leftImgList.push(element);
              this.anotherImgList.push(element);
              this.leftImgList.sort(function(a, b) {
                return a - b;
              });
              this.anotherImgList.sort(function(a, b) {
                return a - b;
              });
            });
          } else {
            this.anotherImgList = [];
            this.leftImgList = [];
            for (let i = 0; i < dd.length; i++) {
              this.leftImgList.push(dd[i].menuCode);
              this.anotherImgList.push(dd[i].menuCode);
              this.leftImgList.sort(function(a, b) {
                return a - b;
              });
              this.anotherImgList.sort(function(a, b) {
                return a - b;
              });
            }
          }
        } else {
          // this.$alert("服务异常","消息提示");
        }
      });
    },
    requreImg(arr) {
      arr.forEach(element => {
        this.src[
          "m_" + element.menuCode
        ] = require("../../assets/images/module/m_" +
          element.menuCode +
          ".png");
        this.bigSrc[
          "mm_" + element.menuCode
        ] = require("../../assets/images/index/mm_" +
          element.menuCode +
          ".png");
      });
    },
    // 添加图标弹出框
    add: function() {
      this.getLeftImgList();
      this.pop = true;
      this.iconRedact = false;
    },
    // 关闭弹出框
    hidden: function() {
      this.pop = false;
    },
    // 添加/删除选项
    ltoggle: function(item, index) {
      if (this.iconRedact == true) {
        if (this.leftImgList.length > 1) {
          this.leftImgList.splice(index, 1);
        } else {
          this.$notify({
            type: "warning",
            message: "最少不能小于1个菜单",
            position: "bottom-right",
            duration: 3000
          });
        }
      }
    },
    rtoggle: function(menuCode) {
      if (this.iconRedact == true) {
        if (this.leftImgList.length < 10) {
          this.leftImgList.push(menuCode);
        } else {
          this.$notify({
            type: "warning",
            message: "最多不能超过10个菜单",
            position: "bottom-right",
            duration: 3000
          });
          this.iconRedact = false;
        }
      }
    },
    append: function() {
      let param = { menusIds: this.leftImgList.join(",") };
      let data = this.$qs.stringify(param);
      this.$http({
        //调用接口
        method: "POST",
        url: this.okUrl,
        data: data
      }).then(response => {
        //接口返回数据
        if (response.data.code == 200) {
          this.anotherImgList = [];
          this.leftImgList.forEach(element => {
            this.anotherImgList.push(element);
            this.anotherImgList.sort(function(a, b) {
              return a - b;
            });
          });
        } else {
          this.$notify({
            type: "warning",
            message: "自定义工作台更新失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
      this.pop = false;
    },
    redact: function() {
      this.iconRedact = true;
    },
    tohover(el, code) {
      let img = require("../../assets/images/indexHover/mm_" + code + "_h.png");
      el.currentTarget.setAttribute("src", img);
    },
    topre(el, code) {
      let img = require("../../assets/images/index/mm_" + code + ".png");
      el.currentTarget.setAttribute("src", img);
    },
    selftohover(el, code) {
      let img = require("../../assets/images/indexHover/m_" + code + "_h.png");
      el.currentTarget.setAttribute("src", img);
    },
    selftopre(el, code) {
      let img = require("../../assets/images/module/m_" + code + ".png");
      el.currentTarget.setAttribute("src", img);
    },

    //近一个月每天新增结构化数量统计
    getOneMonthStructList() {
      let bargraphId = document.getElementById("trafficChart");
      this.$http.post("/vsas/structure/statistics/past/day").then(res => {
        let json = res.data.data;
        let Xdate = [];
        let face = [];
        let bicycle = [];
        let person = [];
        let vehicle = [];
        for (let i in json) {
          Xdate.push(json[i].date);
          face.push(json[i].face);
          bicycle.push(json[i].bicycle);
          person.push(json[i].person);
          vehicle.push(json[i].vehicle);
        }
        this.drawStructBrokeLine(
          bargraphId,
          Xdate,
          face,
          bicycle,
          person,
          vehicle
        );
      });
    },
    //模拟的数据
    getData(num) {
      let arr = [];
      let start = num;
      for (let i = 0; i < 30; i++) {
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
      for (let i = 0; i < 30; i++) {
        arr += 1;
        array.push(arr);
      }
      for (let j in array) {
        array[j] = year + "-" + month + "-" + array[j];
      }
      return array;
    },
    //对中间的饼图的结果数组进行处理
    getPieNumber() {
      this.$http.post("/vsas/structure/statistics/past/month").then(res => {
        let str = res.data.data;
        // let strs = [["人脸",1],["骑车人",10],["人",20],["车",30]]
        let data = [];
        for (let i in str) {
          let idata = [];
          if (i == "face") {
            idata[0] = "人脸";
            idata[1] = str[i];
          } else if (i == "bicycle") {
            idata[0] = "骑车人";
            idata[1] = str[i];
          } else if (i == "person") {
            idata[0] = "人";
            idata[1] = str[i];
          } else if (i == "vehicle") {
            idata[0] = "车";
            idata[1] = str[i];
          }
          data.push(idata);
        }
        this.getCommerPie(data);
      });
    },
    // 中间的饼图
    getCommerPie(gdata) {
      this.$highstock.chart("carTypeChartLefts", {
        chart: {
          type: "pie",
          backgroundColor: "rgba(0, 0, 0, 0)",
          options3d: {
            enabled: true,
            alpha: 55,
            beta: 0
          }
        },
        title: {
          text: null // 设置标题不显示
        },
        exporting: {
          enabled: false
        },
        colors: this.$store.state.echarColorList,
        tooltip: {
          style: {
            fontSize: 14
          }
        },
        lang: {
          noData: "暂无数据"
        },
        noData: {
          //自定义样式
          position: {
            //相对于绘图区定位无数据标签的位置。 默认值：[object Object].
          },
          attr: {
            //无数据标签中额外的SVG属性
            //'stroke-width': 1,
            //stroke: '#cccccc'
          },
          style: {
            //对无数据标签的CSS样式。 默认值：[object Object].
            fontSize: "14px",
            color: "rgb(153, 201, 250)"
          }
        },
        legend: {
          itemDistance: 20, //距离
          symbolWidth: 12, //设置为正方形
          symbolHeight: 12,
          symbolRadius: 0,
          itemHoverStyle: {
            color: "#409eff"
          },
          itemStyle: {
            //设置字体颜色和加粗
            color: "rgb(153, 201, 250)",
            fontWeight: "normal"
          },
          itemMarginBottom: 10
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            depth: 30,
            showInLegend: true,
            dataLabels: {
              // 设置字体颜色
              style: {
                color: "rgb(153, 201, 250)",
                fontSize: 14
              },
              enabled: true
            }
          }
        },
        credits: {
          enabled: false // 去除网站链接
        },
        series: [
          {
            type: "pie",
            name: "结构化数量",
            data: gdata
          }
        ]
      });
    },

    /**
     * @description: 渐变色设置
     * @param {type}
     * @return:
     * @Author: 李志远
     * @Date: 2020-01-03 16:48:10
     * @LastEditTime: Do not edit
     */
    //  this.setItemPointColor(chart)
    //  this.$router.push({path:'/videoCombat/caseInfomanage'})
    setItemPointColor(chart) {
      let pointList = chart.series[0].points;
      for (let i = 0; i < pointList.length; i++) {
        chart.series[0].points[i].update({
          color: {
            linearGradient: { x2: 0, y2: 1, x1: 0, y1: 0 },
            stops: [
              [
                0,
                this.$highstock
                  .Color(this.colorArr[i])
                  .setOpacity(1)
                  .get("rgba")
              ],
              [1, "rgb(255,255,255)"]
            ]
          }
        });
      }
    },

    //一个月处理视频统计
    //柱状图只有一个，由需求经理确认后，2020-12-22
    getOneMonthStructAllNumber() {
      this.$http.post("vsas/structure/statistics/past/videoCount").then(res => {
        let gdata = [["处理视频数量", res.data.data]];
        let bargraphId = document.getElementById("carPlateChart");
        this.getColumnar(bargraphId, gdata, false); //调用封装的柱状图
      });

       let gdata = [["处理视频数量", 524]];
       let bargraphId = document.getElementById("carPlateChart");
       this.getColumnar(bargraphId, gdata, false); //调用封装的柱状图

    },

    //获取任务列表
    getMyTaskList() {
      let userId = this.$storage.getSession("userInfo").userId;
      this.caseUuid = sessionStorage.getItem("exclusiveCaseUuid");
      let data = {
        orderBy: "updateTime",
        orderType: "desc",
        commitUser: userId,
        taskName: "",
        type: 1, //任务类型
        statusl: "", //任务状态
        begin: "",
        end: "",
        caseUuid: this.caseUuid,
        deviceId: "",
        pageNum: 1,
        pageSize: 10
      };
      this.$http
        .get("vsas/task/new/list", {
          params: data
        })
        .then(res => {
          if (res.data.code == 200) {
            let taskarr = res.data.data.list;
            for (let i in taskarr) {
              if (taskarr[i].status == 0) {
                this.tasklist.push(taskarr[i]);
              }
            }
          }
        });
    },
    //跳转到任务列表
    lookTaskInfo(row) {
      this.$router.push({
        path: "/videoStrucPlat/semanticSearch?menuCode=702",
        query: {
          taskinfo: row
        }
      });
    },

    gotoMyTask() {
      this.$router.push("/videoStrucPlat/taskManage?menuCode=701");
    },

  }
};
</script>

<style lang="scss" scoped>
.mainBody {
  display: flex;
  flex-direction: column;
  margin-top: 1.2rem;
  height: calc(100vh - 1.2rem);
  min-height: 660px;
}
.contentwrap {
  display: flex;
  width: 100%;
  //   flex: 1;
  //   height: 4rem;
  overflow: hidden;
  .contentleft {
    display: flex;
    width: 75%;
    height: 3.35rem;
    border: 1px solid rgba(84, 136, 189, 0.3);
    margin: 0 1%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .custom {
      display: flex;
      width: 100%;
      height: 3.5rem;
      flex-direction: column;
      // background: url(../../assets/images/newIndex/wktable.png) center no-repeat;
      // background-size: 100% 100%;
      @include background_custom("background_custom1");
      @include border("border_99c9fa");
      .mytable {
        display: flex;
        height: 0.4rem;
        color: #99c9fa;
        line-height: 0.4rem;
        font-size: 0.14rem;
        span {
          display: block;
          text-align: center;
          font-size: 0.14rem;
          background-size: cover;
          height: 0.4rem;
          width: 1.86rem;
          background: url(../../assets/images/newIndex/wksel.png) center
            no-repeat;
          background-size: 100% 95%;
        }
        & span:last-child {
          cursor: pointer;
          font-size: 0.14rem;
          background: url(../../assets/images/newIndex/wkys.png) center
            no-repeat;
          background-size: 100% 95%;
          margin-left: -0.22rem;
          margin-top: 0.03rem;
        }
      }
      .table_info {
        display: flex;
        flex: 1;
        .table_info_ {
          display: flex;
          flex-wrap: wrap;
          flex: 1;
          padding: 0.18rem 0;
          .cc_ {
            width: 18%;
            margin: 0 1%;
            cursor: pointer;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
  .contentright {
    display: flex;
    flex-direction: column;
    width: 22%;
    min-width: 3.5rem;
    height: 3.35rem;
    @include border("boder1");
    @include font_color("font_color1");
    .current_user {
      height: 0.3rem;
      // color: white;
      @include font_color_white("font_color_white1");
      margin: 0.1rem 0.1rem 0 0.1rem;
      padding-left: 0.37rem;
      font-size: 0.15rem;
      line-height: 0.3rem;
      background: url(../../assets/images/newIndex/title.png) center no-repeat;
      background-size: 100% 100%;
      position: relative;
      img {
        position: absolute;
        top: 0.05rem;
        left: 0.1rem;
        height: 0.18rem;
        width: 0.18rem;
      }
    }
    .my_info {
      display: flex;
      flex-direction: column;
      // border-bottom: 1px solid rgba(15, 44, 79, 0.5);
      @include border-bottom("boder_bottom1");
      .my_info_title {
        display: flex;
        align-items: center;
        height: 0.35rem;
        padding: 0 0.1rem;
        font-size: 0.14rem;
        line-height: 0.35rem;
        // color: #cdcfd1;
        @include font_color_gray("font_color_gray1");
      }
      .my_info_cont {
        display: flex;
        padding-left: 0.2rem;
        align-items: center;
        justify-content: space-around;
        // @include font_color('font_color1');
        .my_info_cont_l {
          width: 2.8rem;
          font-size: 0.12rem;
          .user_info {
            line-height: 0.3rem;
            width: 2.5rem;
            overflow: hidden;
            .user_des {
              width: 1.1rem;
              font-weight: 600;
              float: left;
            }
            .user_name {
              width: 1.4rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              float: left;
            }
          }
        }
        .my_info_cont_r {
          flex: 1;
          margin: 0.1rem;
          img {
            width: 85%;
            height: 85%;
          }
        }
      }
    }
    .glaj {
      display: flex;
      flex-direction: column;
      // border-bottom: 1px solid rgba(15, 44, 79, 0.5);
      @include border-bottom("boder_bottom1");
      .task_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 0.35rem;
        padding: 0 0.1rem;
        font-size: 0.14rem;
        line-height: 0.35rem;
        @include font_color_gray("font_color_gray1");
        .more {
          font-size: 0.12rem;
          cursor: pointer;
        }
      }
      .aj_info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        font-size: 0.12rem;
        line-height: 0.3rem;
        margin-bottom: 0.1rem;
        padding: 0 0.1rem;
        p {
          margin-left: 3%;
          text-align: center;
        }
        .aj_title {
          display: flex;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.05);
          font-weight: 600;
          span {
            text-align: left;
          }
          span:first-child {
            width: 1rem;
          }
          span:nth-child(2) {
            width: 1.2rem;
          }
          span:last-child {
            width: 1rem;
          }
        }
        .aj_cont {
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          span {
            text-align: left;
            display: inline-block;
            height: 0.3rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span:first-child {
            width: 1rem;
          }
          span:nth-child(2) {
            width: 1.2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span:last-child {
            width: 1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .glaj:last-child {
      border-bottom: none;
    }
  }
}

.menuList {
  .checkedList {
    border-bottom: 1px solid red;
  }
  .checkedList,
  .allList {
    display: flex;
    flex-wrap: wrap;
    .menuItem {
      width: 1.78rem;
      height: 0.8rem;
      margin: 0.1rem;
      cursor: pointer;
      background-color: #f0f5f9;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
}

.echartsarea {
  width: 98%;
  //   height: 4rem;
  margin: 0 auto;
  .statistic_info_list {
    display: flex;
    flex: 1;
    flex-direction: row;
    width: 100%;
    height: 4rem;
    justify-content: space-between;
    margin-top: 0.2rem;
    // border: 1px solid red;
    .statistic_info_item {
      // display: flex;
      // flex-direction: row;
      // flex: 1;
      width: 33%;
      height: 100%;
      //   border: 1px solid yellow;
      // border: 1px solid rgba(15, 44, 79, 0.5);
      //   @include border("boder_99c9fa");
      // @include border("border_99c9fa");
      .ts {
        color: #999;
        font-size: 0.14rem;
        margin: 2%;
      }
      .statistic_info_title {
        display: flex;
        align-items: center;
        height: 0.33rem;
        margin: 0.1rem 0.16rem 0 0.16rem;
        font-size: 0.15rem;
        // color: #cdcfd1;
        @include font_color_gray("font_color_gray1");
        background: url(../../assets/images/newIndex/title.png) center no-repeat;
        background-size: 100% 100%;
        img {
          border: none;
          margin: 0 0.1rem;
        }
        .time {
          border: none;
          width: 0.23rem;
          height: 0.18rem;
        }
        .area {
          width: 0.22rem;
          height: 0.14rem;
        }
        .video {
          width: 0.22rem;
          height: 0.17rem;
        }
      }
      .statistic_info_content {
        display: flex;
        flex: 1;
      }
    }
    .m_sii {
      margin: 0 0.2rem;
    }
  }
}

// 弹出框
.pop_up {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9;
  .cont {
    width: 11.5rem;
    height: 6.65rem;
    background: url(/static/img/home-bg.58f08e0.png) 50% no-repeat;
    background-size: 100% 100%;
    margin: 5% auto;
  }
  .title {
    width: 100%;
    font-size: 0.18rem;
    // border-bottom: 1px solid rgba(20, 57, 96, 0.8);
    @include layer-border-bottom_1("layer-border-bottom_1");
    padding: 5px 10px;
    // background: rgba(20, 57, 96, 0.8);
    @include layer-background_color_1("layer-background_color_1");
    // color: #cdcfd1;
    @include layer_font_color_1("layer_font_color_1");
    p {
      float: left;
    }
    span {
      float: right;
      margin-right: 1%;
      color: #64affa;
      cursor: pointer;
      img {
        width: 0.12rem;
      }
    }
  }
  .title::after {
    display: block;
    content: "";
    clear: both;
  }
  .content {
    width: 100%;
    height: 5.85rem;
    display: flex;
    h2 {
      width: 1.5rem;
      height: 0.2rem;
      line-height: 0.2rem;
      margin-top: 0.1rem;
      font-size: 0.16rem;
      margin-left: 0.3rem;
      padding-left: 0.1rem;
      border-left: 0.03rem solid #cdcfd1;
    }
    .left {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 27%;
      height: 5.85rem;
      //   border-right: 1px solid rgba(20, 57, 96, 0.8);
      @include layer-border-right_1("layer-border-right_1");
      box-sizing: border-box;
      //   border-left: 1px solid rgba(20, 57, 96, 0.8);
      @include layer-border-left_1("layer-border-left_1");
      .l_title {
        width: 100%;
        height: 0.4rem;
        background-color: rgba(34, 70, 112, 0.31);
        border-top: 1px solid rgba(20, 57, 96, 0.8);
        color: #cdcfd1;
      }
      .l_cont {
        width: 100%;
        height: 5rem;
        overflow: hidden;
        background: rgba(16, 35, 56, 0.31);
        padding: 6%;
        ul {
          width: 100%;
          height: 4.3rem;
          padding: 2%;
          overflow: hidden;
          li {
            display: inline-block;
            width: 1.15rem;
            height: 0.78rem;
            margin-bottom: 3%;
            cursor: pointer;
            margin-left: 5%;
            position: relative;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .lactive::after {
            content: " ";
            position: absolute;
            top: -0.05rem;
            right: -0.05rem;
            width: 0.2rem;
            height: 0.2rem;
            border-radius: 50%;
            background: url(../../assets/sm_minus.png) no-repeat center center;
          }
        }
      }
      .l_btn {
        width: 100%;
        height: 0.46rem;
        // background: rgba(34, 70, 112, 0.09);
        @include background_btnbj_2("background_btnbj_2");
        // border-top: 1px solid rgba(20, 57, 96, 0.8);
        @include layer-border-top_1("layer-border-top_1");
        span {
          display: block;
          width: 0.8rem;
          font-size: 0.12rem;
          height: 0.25rem;
          line-height: 0.25rem;
          //   background: rgba(43, 66, 91, 0.5);
          @include background_btnbj_4("background_btnbj_4");
          margin: 0.08rem auto;
          text-align: center;
          //   color: #cdcfd1;
          @include layer_font_color_2("layer_font_color_2");
          border-radius: 0.02rem;
          //   border: 1px solid rgba(43, 66, 91, 1);
          @include border_2("border_2");
          cursor: pointer;
        }
      }
    }
    .right {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 73%;
      height: 5.85rem;
      box-sizing: border-box;
      .r_title {
        width: 100%;
        height: 0.4rem;
        // background: rgba(20, 57, 96, 0.31);
        @include background_btnbj_3("background_btnbj_3");
        // color: #cdcfd1;
        @include layer_font_color_2("layer_font_color_2");
      }
      .r_cont {
        width: 100%;
        height: 5.45rem;
        overflow-y: auto;
        p {
          width: 100%;
          line-height: 0.4rem;
          font-size: 0.14rem;
          //   color: #cdcfd1;
          @include layer_font_color_2("layer_font_color_2");
          padding-left: 0.3rem;
        }
        .combat {
          width: 100%;
          margin-bottom: 2%;
          .combat_cont {
            width: 100%;
            padding-left: 0.3rem;
            cursor: pointer;
            ul {
              li {
                display: inline-block;
                width: 1.15rem;
                height: 0.78rem;
                cursor: pointer;
                margin-right: 2%;
                margin-bottom: 0.04rem;
                position: relative;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .ractive::after {
              content: " ";
              position: absolute;
              top: -0.05rem;
              right: -0.05rem;
              width: 0.2rem;
              height: 0.2rem;
              border-radius: 50%;
              background: url(../../assets/sm_add.png) no-repeat center center;
            }
          }
        }
      }
    }
  }
  .btn {
    background: rgba(20, 57, 96, 0.29);
    padding-right: 0.3rem;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    span {
      text-align: center;
      display: block;
      float: right;
      width: 0.78rem;
      height: 0.28rem;
      line-height: 0.28rem;
      margin-top: 0.1rem;
      cursor: pointer;
      &:first-child {
        @include layer-background_color_affirm("layer-background_color_affirm");
      }
      &:last-child {
        margin-right: 0.07rem;
        @include layer-background_color_cancel("layer-background_color_cancel");
      }
      &:first-child:hover {
        // background: url(../../assets/images/confirm/truehover.png) center
        //   no-repeat;
        // background-size: 100% 100%;
        @include layer-background_color_affirm(
          "layer-background_color_affirm_hover"
        );
      }
      &:last-child:hover {
        // background: url(../../assets/images/confirm/canclehover.png) center
        //   no-repeat;
        // background-size: 100% 100%;
        @include layer-background_color_cancel(
          "layer-background_color_cancel_hover"
        );
      }
    }
  }
  ::-webkit-scrollbar {
    width: 0.05rem;
    height: 0.05rem;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0.05rem;
    background-color: rgba(153, 201, 250, 0.38);
  }
}
</style>
