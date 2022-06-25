<template>
  <div class="mainBody">
    <Searchall/>
    <Uploadpicture v-show="status"/>
    <div class="contentwrap">
      <div class="contentleft">
        <div class="custom">
          <div class="mytable">
            <span>我的工作台</span>
            <span @click="add">自定义工作台</span>
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
        <!-- 案发统计图开始 -->
        <div class="statistic_info_list">
          <div class="statistic_info_item">
            <div class="statistic_info_title">
              <img class="time" src="../../assets/images/newIndex/accounticon1.png" alt>近一个月案发时间统计
            </div>
            <p class="ts" v-show="trafficChart">服务异常</p>
            <p class="ts" v-show="noTrafficChart">暂无数据</p>
            <div class="statistic_info_content" id="trafficChart"></div>
          </div>
          <div class="statistic_info_item m_sii">
            <div class="statistic_info_title">
              <img class="area" src="../../assets/images/newIndex/accounticon2.png" alt> 近一个月案件区域统计
            </div>
            <p class="ts" v-show="carTypeChartLeft">服务异常</p>
            <p class="ts" v-show="noCarTypeChartLeft">暂无数据</p>
            <div class="statistic_info_content" id="carTypeChartLeft"></div>
          </div>
          <div class="statistic_info_item">
            <div class="statistic_info_title">
              <img class="video" src="../../assets/images/newIndex/accounticon3.png" alt>近一个月案件类别统计
            </div>
            <p class="ts" v-show="carPlateChart">服务异常</p>
            <p class="ts" v-show="noCarPlateChart">暂无数据</p>
            <div class="statistic_info_content" id="carPlateChart"></div>
          </div>
        </div>
        <!-- 案发统计图结束 -->
      </div>
      <!-- 当前用户开始 -->
      <div class="contentright">

        <div class="my_info">
             <div class="current_user">
            <img src="../../assets/images/newIndex/usericon.png" alt> 当前用户
        </div>
          <div class="my_info_title">我的信息</div>
          <div class="my_info_cont">
            <div class="my_info_cont_l">
              <div class="user_info">
                <b
                  class="user_des"
                >用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;:</b>
                <span class="user_name">{{this.userinfo.userName}}</span>
              </div>
              <div class="user_info">
                <b
                  class="user_des"
                >姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;:</b>
                <span class="user_name">{{this.userinfo.trueName}}</span>
              </div>
              <div class="user_info">
                <b class="user_des">所&nbsp;&nbsp;属&nbsp;&nbsp;部&nbsp;&nbsp;门&nbsp;:</b>
                <span class="user_name" :title="userinfo.orgName">{{userinfo.orgName}}</span>
              </div>
              <div class="user_info">
                <b class="user_des">登&nbsp;&nbsp;录&nbsp;&nbsp;时&nbsp;&nbsp;间&nbsp;:</b>
                <span
                  class="user_name"
                  :title="this.userinfo.lastLoginTime"
                >{{this.userinfo.lastLoginTime}}</span>
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
            <span class="task_des">最新案件</span>
            <span class="more" @click="goToNewCase">
              <em>更多</em>
              <em>>></em>
            </span>
          </div>
          <div class="aj_info">
            <div class="aj_title">
              <b>案件名称</b>
              <b>案件类型</b>
              <b>创建人</b>
            </div>
            <p v-show="historia">服务异常</p>
            <div class="aj_cont" v-for="(item,index) in historyList" v-if="index < 4" :key="index">
              <span :title="item.caseName">{{item.caseName}}</span>
              <span :title="item.caseCategoryDesc">{{item.caseCategoryDesc}}</span>
              <span :title="item.creatorName">{{item.creatorName}}</span>
            </div>
          </div>
        </div>
        <div class="glaj">
          <div class="task_title">
            <span class="task_des">我的浏览</span>
            <span class="more" @click="gotoMyLooked">
              <em>更多</em>
              <em>>></em>
            </span>
          </div>
          <div class="aj_info">
            <div class="aj_title">
              <b>案件名称</b>
              <b>案件类型</b>
              <b>创建人</b>
            </div>
            <p v-show="underway">服务异常</p>
            <div
              class="aj_cont"
              v-for="(item,index) in thirdTableList"
              v-if="index < 4"
              :key="index"
            >
              <span :title="item.caseName">{{item.caseName}}</span>
              <span :title="item.caseCategoryDesc">{{item.caseCategoryDesc}}</span>
              <span :title="item.creatorName">{{item.creatorName}}</span>
            </div>
          </div>
        </div>
        <div class="glaj">
          <div class="task_title">
            <span class="task_des">我的收藏</span>
            <span class="more" @click="$router.push({path:'/casestudy/mycollect?menuCode=204'})">
              <em>更多</em>
              <em>>></em>
            </span>
          </div>
          <div class="aj_info">
            <div class="aj_title">
              <b>案件编号</b>
              <b>案件名称</b>
              <b>案件类型</b>
            </div>
            <p v-show="control">服务异常</p>
            <div
              class="aj_cont"
              v-for="(item,index) in secondTableList"
              v-if="index < 4"
              :key="index"
            >
              <span :title="item.caseLinkMark">{{item.caseLinkMark}}</span>
              <span :title="item.caseName">{{item.caseName}}</span>
              <span :title="item.caseCategoryDesc">{{item.caseCategoryDesc}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 当前用户结束 -->
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
        <!-- 点击控制打开隐藏 -->
        <div class="btn">
          <span @click="append"></span>
          <span @click="hidden"></span>
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
import echarts from "echarts";
import higgcharCommon from '../../api/casestudy/highcharCommon.js'

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
      getImgUrl: "sms/menu/getUserMenus", // 存数据接口
      leftUrl: "sms/usercore/workBench/getMyWork",
      okUrl: "sms/usercore/workBench/save",
      iconRedact: false,
      imgUrl: true,

      //过车流量统计
      dataList: [],

      //车辆类别百分比
      dataList1: [],
      vehicleClassList: [],
      vehicleKeyValueList: [],

      //车牌类别统计
      dataList3: [],
      vehiclePlateClassList: [],
      vehiclePlateClassCountList: [],

      //最新案件
      historyList: [],
      historia: false,

      //我的收藏
      secondTableList: [],
      control: false,

      // 我的浏览
      thirdTableList: [],
      underway: false,

      worklist: [],
      userinfo: {},

      trafficChart: false, // 图表默认false
      noTrafficChart: false,
      carTypeChartLeft: false,
      noCarTypeChartLeft: false,
      carPlateChart: false,
      noCarPlateChart: false,
      getCaseCategoryData: [], // 存储案件类别数据
      xShowData: [], // 图标数据存储
      showData: [], // 案件类别统计数据存储
      legendData: [],
      showPieData: [],
      showTimeData: [] // 近一个月案发时间统计
    };
  },
  mixins:[higgcharCommon],
  computed: {
    ...mapState(["status"]),
    currentImgList: function() {
      // 循环数组
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
      console.log(arr, 8888);
      return arr;
    }
  },
  created() {
    // 获取日期
    Date.prototype.Format = function(fmt) {
      var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        S: this.getMilliseconds() // 毫秒
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
  mounted() {
    this.getImgList(); // 自定义工作台
    this.getLeftImgList();
    this.getUserinfo(); // 获取用户信息
    this.getDataList(); // 案发时间统计
    this.getCaseCategory(); // 案件类别统计
    this.getDefaultRegion(); // 获取默认省份
    this.getOwnDeployList(); // 我的收藏
    this.getHistoryList(); // 最新案件
    this.getDispositioningList(); // 我的浏览
  },
  components: {
    Searchall,
    Uploadpicture,
    Footer
  },
  methods: {
    gotopath(cssobj, item) {
      if (item == 202) {
        this.$router.push({
          path: cssobj[1],
          query: { menuCode: item, synergy: "-1" }
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
            if (i == 12 || i == 13 || i == 14 || i == 15 || i == 16) {
              // this.requreImg(this.imgList[0].mcs);
            } else {
              this.requreImg(this.imgList[i].mlist);
            }
          }
        } else {
          // this.$alert("服务异常","消息提示");
        }
      });
    },
    getLeftImgList(leftImgList) {
      // 左边
      this.$http({
        // 调用接口
        method: "POST",
        url: this.leftUrl // this指data
      }).then(response => {
        // 接口返回数据
        if (response.data.code == 200) {
          let dd = response.data.data; // ['101','102']
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
    //案发时间统计
    getDataList() {
      this.dataList = [];
      let beginDate = new Date(
        new Date().getTime() - 30 * 24 * 60 * 60 * 1000
      ).Format("yyyy-MM-dd hh:mm:ss");
      let endDate = new Date().Format("yyyy-MM-dd hh:mm:ss");
      this.$http({
        url: "pca/statistics/caseTime",
        method: "get",
        params: {
          deptIdsArr: "",
          startTime: beginDate.split(" ")[0],
          endTime: endDate.split(" ")[0]
        }
      }).then(res => {
        if (res.data.code != 200) {
          this.trafficChart = true;
          return;
        } else {
          this.dataList = res.data.data.list;
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
          this.showTimeData = [];
          for (let i = 0; i < this.dataList.length; i++) {
            this.showTimeData.push({
              value: this.dataList[i],
              name: arr[i]
            });
          }
          let gdata = [];
          for (let i = 0; i < this.showTimeData.length; i++) {
            let idata = [];
            idata[0] = this.showTimeData[i].name;
            idata[1] = parseInt(this.showTimeData[i].value); // 字符串转浮点数
            gdata.push(idata);
          }
          console.log(gdata, "uuuuuu");
          let bargraphId = document.getElementById('trafficChart')
          this.getColumnar(bargraphId,gdata,false) //调用封装的柱状图
        }
      });
    },
    // 获取默认省份
    getDefaultRegion() {
      this.$http({
        url: "pca/statistics/defaultRegion",
        method: "get"
      })
        .then(resS => {
          if (resS.statusText == "OK" && resS.data.code == 200) {
            let provinceId = resS.data.data;
            this.$http({
              url: "pca/statistics/loadCity",
              method: "get",
              params: {
                id: provinceId
              }
            })
              .then(res => {
                if (res.statusText == "OK" && res.data.code == 200) {
                  this.getVehicleClassList(res.data.data[0].regionId);
                } else {
                  this.$notify({
                    type: "error",
                    message: "获取省份下城市列表失败！",
                    position: "bottom-right",
                    duration: 3000
                  });
                }
              })
              .catch(res => {});
          } else {
            this.$notify({
              type: "error",
              message: "获取默认省份失败！",
              position: "bottom-right",
              duration: 3000
            })
          }
        })
        .catch(res => {});
    },
    //获取案件区域统计
    getVehicleClassList(regionId) {
      this.dataList1 = [];
      this.vehicleClassList = [];
      this.vehicleKeyValueList = [];
      let beginDate = new Date(
        new Date().getTime() - 30 * 24 * 60 * 60 * 1000
      ).Format("yyyy-MM-dd hh:mm:ss");
      let endDate = new Date(new Date().getTime()).Format(
        "yyyy-MM-dd hh:mm:ss"
      );
      this.$http({
        url: "pca/statistics/caseArea",
        method: "get",
        params: {
          id: regionId,
          beginDate: beginDate.split(" ")[0],
          endDate: endDate.split(" ")[0]
        }
      }).then(res => {
        if (res.statusText == "OK" && res.data.code == 200) {
          this.vehicleKeyValueList = [];
          this.vehicleClassList = [];

          this.dataList1 = res.data.data;
          this.vehicleKeyValueList = this.dataList1.map(a => {
            return { value: a.count, name: a.regionName };
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
            this.vehicleClassList.push(this.vehicleKeyValueList[i].name);
          }

          if (this.vehicleClassList.length == 0) {
            this.noCarTypeChartLeft = true;
          } else {
            this.typeChartPercent();
          }
        } else {
          this.carTypeChartLeft = true;
        }
      });
    },
    // 车辆类别百分比统计图
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
          idata[0] = currentList.keyValueList[i].name
          idata[1] = parseInt(currentList.keyValueList[i].value) // 字符串转浮点数
          gdata.push(idata)
        }
        // carTypeChartLeft
      // 去除字体阴影
      $("tspan.highcharts-text-outline").css("fill","none");
      $("tspan.highcharts-text-outline").css("stroke","none");
      this.$highstock.chart('carTypeChartLeft', {
        chart: {
          type: 'pie',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          options3d: {
            enabled: true,
            alpha: 55,
            beta: 0
          }
        },
        title: {
          text: null // 设置标题不显示
        },
        exporting:{
          enabled: false
        },
        legend: {
          itemDistance: 20,//距离
          symbolWidth:12,  //设置为正方形
          symbolHeight:12,
          symbolRadius:0,
          itemHoverStyle: {
            color: '#409eff'
          },
          itemStyle:{   //设置字体颜色和加粗
            color:"rgb(153, 201, 250)",
            fontWeight:"normal"
          },
          itemMarginBottom: 10,
        },
        tooltip: {
          headerFormat: '{series.name}<br>',
          pointFormat: '{point.name}: <b>{point.y} ({point.percentage:.1f}%)</b>', // 悬停显示案件数量
          style:{
            fontSize: 14
          }
        },
        lang:{
          noData:'暂无数据'
        },
        noData: { //自定义样式
          position: { //相对于绘图区定位无数据标签的位置。 默认值：[object Object].
          },
          attr: { //无数据标签中额外的SVG属性
          //'stroke-width': 1,
          //stroke: '#cccccc'
          },
          style: { //对无数据标签的CSS样式。 默认值：[object Object].
            fontSize: '14px',
            color: 'rgb(153, 201, 250)'
          }
        },
        colors:this.$store.state.echarColorList,
          plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 30,
            showInLegend: true,
            dataLabels: {  // 设置字体颜色
              style:{
                color:'rgb(153, 201, 250)',
                fontSize: 14
              },
              enabled: true,
            }
          }
        },
        credits:{
          enabled: false,  // 去除网站链接
        },
        series: [{
          type: 'pie',
          name: '案件区域统计',
          data: gdata
        }]
      })
    },
    // 获取案件类别统计
    getCaseCategory() {
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "加载中"
      });
      let beginDate =
        new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).Format(
          "yyyy-MM-dd"
        ) + " 00:00:00";
      let endDate =
        new Date(new Date().getTime()).Format("yyyy-MM-dd") + " 23:59:59";
      this.$http({
        url: "pca/statistics/caseCategory",
        method: "get",
        params: {
          deptIdsArr: "",
          startTime: beginDate,
          endTime: endDate
        }
      })
        .then(res => {
          this.loading.close();
          if (res.statusText == "OK" && res.data.code == 200) {
            this.getCaseCategoryData = res.data.data;
            if (this.xShowData.length == 0) {
              for (let i = 0; i < this.getCaseCategoryData.length; i++) {
                this.xShowData.push(
                  this.getCaseCategoryData[i].caseCategoryDesc
                );
              }
            }
            this.showData = [];
            for (let i = 0; i < this.getCaseCategoryData.length; i++) {
              this.showData.push(this.getCaseCategoryData[i].countNum);
            }
            this.legendData = [];
            for (let i = 0; i < this.getCaseCategoryData.length; i++) {
              this.legendData.push(
                this.getCaseCategoryData[i].caseCategoryDesc
              );
            }
            this.showPieData = [];
            for (let i = 0; i < this.showData.length; i++) {
              // 获取柱状图的value和数量
              this.showPieData.push({
                value: this.showData[i],
                name: this.xShowData[i]
              });
            }
            this.$nextTick(() => {
              this.getEchar();
            });
          } else {
            this.$notify({
              type: "error",
              title: "",
              message: "获取案件类别统计数据失败！",
              position: "bottom-right",
              duration: 3000
            });
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    // echars图表
    getEchar() {
      let gdata = [];
      for (let i = 0; i < this.showPieData.length; i++) {
        // 取柱状图的value和数量
        let idata = [];
        idata[0] = this.showPieData[i].name;
        idata[1] = parseInt(this.showPieData[i].value); // 字符串转浮点数
        gdata.push(idata);
      }
      let bargraphId = document.getElementById('carPlateChart')
      this.getColumnar(bargraphId,gdata,false) //调用封装的柱状图
    },

    //最新案件
    getHistoryList() {
      let data = {
        pageNum: 1, //当前页
        pageSize: 4, //当前页结果数量
        orderBy: "update_time", //排序字段
        orderType: "desc", //排序方式
        orgId: this.$storage.getSession("userInfo").orgId,
        approvalStatus: "",
        status: 1,
        synergy: "-1"
      };
      this.$http
        .get("/pca/casemng/basecase/list", { params: data })
        .then(res => {
          console.log(res, 333333333333333333);
          this.historyList = res.data.data.list; //所有数据
          console.log(this.historyList, 4444444444444444444);
        })
        .catch(err => {});
    },

    //我的收藏
    getOwnDeployList() {
      this.$http({
        url: "/pca/case/related/myCollect",
        method: "get",
        params: {
          keyword: "",
          pageNum: 1,
          pageSize: 10
        }
      }).then(res => {
        if (res.data.code != 200) {
          // this.$alert("服务异常","消息提示");
          this.control = true;
          return;
        } else {
          this.secondTableList = res.data.data.list;
        }
      });
    },
    //我的浏览
    getDispositioningList() {
      this.$http({
        url: "pca/case/related/recentlyViewed",
        method: "get",
        params: {
          pageNum: 1,
          pageSize: 10,
          keyWord: ""
        }
      }).then(res => {
        if (res.data.code != 200) {
          // this.$alert("服务异常","消息提示");
          this.underway = true;
          return;
        } else {
          this.thirdTableList = res.data.data.list;
        }
      });
    },

    gotoMyCase() {
      this.$router.push({
        path: "/casestudy/myupload",
        query: { menuCode: 203 }
      });
    },
    // 我的浏览
    gotoMyLooked() {
      this.$router.push({
        path: "/casestudy/mybrowse",
        query: { menuCode: 205 }
      });
    },
    // 最新案件
    goToNewCase() {
      this.$router.push({
        path: "/casestudy/caseInfomanage?synergy=-1",
        query: { menuCode: 202 }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
  flex: 1;
  // background:#f4f4f4;
  //padding-top:0.1rem;
  overflow: hidden;
  .contentleft {
    display: flex;
    width: 75%;
    margin: 0 1%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .custom {
      display: flex;
      width: 100%;
      height: 3.5rem;
      flex-direction: column;
      background: url(../../assets/images/newIndex/wktable.png) center no-repeat;
      background-size: 100% 100%;
      // border: 1px solid rgba(15, 44, 79, 0.5);
      // background-color: rgba(16, 35, 56, 0.5);
      // background:#fff;
      // border: 1px solid #dcdfe6;
      // box-shadow:0 1px 1px rgba(15, 44, 79, 0.5);
      .mytable {
        display: flex;
        // align-items: center;
        // justify-content: space-between;
        height: 0.4rem;
        // padding-left: 0.2rem;
        color: #99c9fa;
        line-height: 0.4rem;
        font-size: 0.14rem;
        // background:#409eff;
        // background-color: rgba(16, 35, 56, 0.5);
        span {
          display: block;
          text-align: center;
          font-size: 0.14rem;
          background-size: cover;
          // margin-right: 0.1rem;
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
        /*align-items: center;*/
        .table_info_ {
          display: flex;
          flex-wrap: wrap;
          flex: 1;
          padding: 0.18rem 0;
          /*justify-content: space-around;*/
          .cc_ {
            // display: flex;
            // flex-direction: column;
            // justify-content: center;
            // align-items: center;
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
    .statistic_info_list {
      display: flex;
      flex: 1;
      /*height: 450px;*/
      width: 100%;
      justify-content: space-between;
      margin-top: 0.2rem;
      // margin-bottom: 10px;
      .statistic_info_item {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100%;
        background: url(../../assets/images/newIndex/account.png) center
          no-repeat;
        background-size: 100% 100%;
        border: 1px solid rgba(15, 44, 79, 0.5);
        // box-shadow:0 1px 1px #d8d8d8;
        .ts {
          color: #999;
          font-size: 0.14rem;
          margin: 2%;
        }
        .statistic_info_title {
          display: flex;
          align-items: center;
          height: 0.33rem;
          // width: 100%;
          margin: 0.1rem 0.16rem 0 0.16rem;
          // padding-left: 0.2rem;
          // line-height:0.33rem;
          font-size: 0.15rem;
          color: #cdcfd1;
          /*background: url('../assets/mytable.png') no-repeat;*/
          /*background-size: cover;*/
          background: url(../../assets/images/newIndex/title.png) center
            no-repeat;
          background-size: 100% 100%;
          img {
            border: none;
            margin: 0 0.1rem;
            // vertical-align: middle
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
          // background: yellow;
        }
      }
      .m_sii {
        margin: 0 0.2rem;
      }
    }
  }
  .contentright {
    display: flex;
    flex-direction: column;
    width: 22%;
    min-width: 3.5rem;
    background: url(../../assets/images/newIndex/user.png) center no-repeat;
    background-size: 100% 100%;
    border: 1px solid rgba(15, 44, 79, 0.5);
    // box-shadow:0 1px 1px #d8d8d8;
    .current_user {
      height: 0.3rem;
      color: white;
      margin: 0.1rem 0.1rem 0 0.1rem;
      padding-left: 0.37rem;
      /*background: url('../assets/mytable.png') no-repeat;*/
      /*background-size: cover;*/
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
      border-bottom: 1px solid rgba(15, 44, 79, 0.5);
      .my_info_title {
        display: flex;
        align-items: center;
        height: 0.35rem;
        padding: 0 0.1rem;
        font-size: 0.14rem;
        line-height: 0.35rem;
        color: #cdcfd1;
      }
      .my_info_cont {
        display: flex;
        /*height: 1.2rem;*/
        padding-left: 0.2rem;
        align-items: center;
        justify-content: space-around;

        // background: #409eff;
        .my_info_cont_l {
          /*display: flex;*/
          width: 2.8rem;
          font-size: 0.12rem;
          //border:1px solid rgba(15, 44, 79, 0.5);
          /*flex-direction: column;*/
          /*justify-content: space-around;*/
          /*height: 1.18rem;*/
          /*min-height: 108px;*/
          /*position: relative;*/
          .user_info {
            line-height: 0.3rem;
            color: #99c9fa;
            width: 2.5rem;
            overflow: hidden;
            /*height:0.3rem;*/
            /*position: relative;*/
            .user_des {
              /*line-height:0.3rem;*/
              width: 1.1rem;
              /*height: 0.3rem;*/
              /*position: absolute;*/
              float: left;
              /*top: 0;*/
              /*left: 0;*/
            }
            .user_name {
              width: 1.4rem;
              /*height: 0.3rem;*/
              /*line-height:0.3rem;*/
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              /*position: absolute;*/
              float: left;
              /*top: 0;*/
              /*left: 1.1rem;*/
            }
          }
        }
        .my_info_cont_r {
          flex: 1;
          margin: 0.1rem;
          img {
            width: 85%;
            height: 85%;

            // border:1px solid #b1cde1;
          }
        }
      }
    }
    .glaj {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid rgba(15, 44, 79, 0.5);
      .task_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 0.35rem;
        padding: 0 0.1rem;
        font-size: 0.14rem;
        line-height: 0.35rem;
        color: #cdcfd1;
        // background: url('../assets/mytable.png') no-repeat;
        // background-size: cover;
        .more {
          font-size: 0.12rem;
          cursor: pointer;
          color: #00a0ff;
        }
      }
      .aj_info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        font-size: 0.12rem;
        line-height: 0.3rem;
        color: #99c9fa;
        margin-bottom: 0.1rem;
        padding: 0 0.1rem;
        p {
          margin-left: 3%;
        }
        .aj_title {
          display: flex;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.05);
          b {
            // display: flex;
            // justify-content: center;
            text-align: left;
          }
          b:first-child {
            // flex: 1;
            width: 1rem;
          }
          b:nth-child(2) {
            // flex: 3;
            width: 1.2rem;
            //
          }
          b:last-child {
            // flex: 2;
            width: 1rem;
            //  text-align: center;
          }
        }
        .aj_cont {
          display: flex;
          justify-content: space-between;

          span {
            // display: flex;
            // white-space: nowrap;
            // justify-content: center;
            text-align: left;
            display: inline-block;
            height: 0.3rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span:first-child {
            // flex: 1;
            width: 1rem;
          }
          span:nth-child(2) {
            // flex: 1.5;
            width: 1.2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span:last-child {
            // flex: 2.3;
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

// 弹出框
.pop_up {
  // display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  // margin-top: 1.5rem;
  // margin-left: 2.5rem;
  background: rgba(0, 0, 0, 0.3);
  // opacity: 0.9;
  z-index: 9;
  .cont {
    width: 11.5rem;
    height: 6.65rem;
    background: url(../../assets/updataImg/home-bg.png) center no-repeat;
    background-size: 100% 100%;
    // background:#fff;
    // border-radius: 0.1rem;
    // padding: 0.2rem;
    margin: 5% auto;
  }
  .title {
    width: 100%;
    font-size: 0.18rem;
    border-bottom: 1px solid rgba(20, 57, 96, 0.8);
    padding: 5px 10px;
    background: rgba(20, 57, 96, 0.8);
    color: #cdcfd1;
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
      // background: #409eff;
      // line-height: 0.4rem;
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
      border-right: 1px solid rgba(20, 57, 96, 0.8);
      box-sizing: border-box;
      border-left: 1px solid rgba(20, 57, 96, 0.8);
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
        // display: flex;
        // justify-content: center;
        // align-items:center;
        // flex-wrap: wrap;
        // margin-top: 2%;
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
        // line-height:0.46rem;
        background: rgba(34, 70, 112, 0.09);
        // border-bottom: 1px solid #ccc;
        border-top: 1px solid rgba(20, 57, 96, 0.8);
        span {
          display: block;
          width: 0.8rem;
          font-size: 0.12rem;
          height: 0.25rem;
          line-height: 0.25rem;
          background: rgba(43, 66, 91, 0.5);
          margin: 0.08rem auto;
          text-align: center;
          color: #cdcfd1;
          border-radius: 0.02rem;
          border: 1px solid rgba(43, 66, 91, 1);
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
        background: rgba(20, 57, 96, 0.31);
        color: #cdcfd1;
        // border-bottom: 1px solid #ccc;
      }
      .r_cont {
        width: 100%;
        height: 5.45rem;
        overflow-y: auto;
        // background: #ccc;
        // border-bottom: 1px solid #ccc;
        p {
          width: 100%;
          line-height: 0.4rem;
          font-size: 0.14rem;
          color: #cdcfd1;
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
    // display: flex;
    // justify-content: center;
    background: rgba(20, 57, 96, 0.29);
    // border-top: 1px solid rgba(29, 74, 122, 0.29);
    // border-bottom: 1px solid rgba(29, 74, 122, 0.29);
    padding-right: 0.3rem;
    box-sizing: border-box;
    span {
      display: block;
      float: right;
      width: 0.78rem;
      height: 0.28rem;
      line-height: 0.28rem;
      margin-top: 0.1rem;
      // font-size: 0.2rem;
      // background:url(../../assets/images/confirm/truenormal.png) center no-repeat;
      // background-size: 100% 100%;
      // text-align: center;
      // border-radius: 0.05rem;
      // color: #fff;
      cursor: pointer;
      &:first-child {
        background: url(../../assets/images/confirm/truenormal.png) center
          no-repeat;
        background-size: 100% 100%;
      }
      &:last-child {
        margin-right: 0.07rem;
        // color: #606266;
        // border: 1px solid #dcdfe6;
        // background: #fff;
        background: url(../../assets/images/confirm/canclenormal.png) center
          no-repeat;
        background-size: 100% 100%;
      }
      &:first-child:hover {
        // color: #fff;
        // border-color: #66b1ff;
        background: url(../../assets/images/confirm/truehover.png) center
          no-repeat;
        background-size: 100% 100%;
      }
      &:last-child:hover {
        // color: #409eff;
        // border-color: #c6e2ff;
        background: url(../../assets/images/confirm/canclehover.png) center
          no-repeat;
        background-size: 100% 100%;
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
