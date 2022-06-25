<!--
 * @Author: your name
 * @Date: 2019-12-30 09:07:04
 * @LastEditTime : 2020-04-10 10:18:03
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\videoCombat\historyvideo.vue
 -->
<template>
  <div class="historyvideo">
    <!-- <headers/> -->
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/videoCombat',query:{menuCode:100}}">视频侦查></router-link>
      <p class="sysname">&nbsp;历史回放</p>

      <!-- <router-link class="sysname" :to="{path:'/videoCombat',query:{menuCode:100}}">视频侦查</router-link>
      <p class="childname">历史回放</p>-->
    </div>
    <!-- <p class="splitline"></p> -->
    <div class="main">
      <div class="left">
        <div class="left_t">
          <p>
            <i class="el-icon-search"></i>
            <input type="text" placeholder="请输入设备名称" v-model="filterText">
          </p>

          <!-- <ul class="showhide">
              <li v-for="(item,index) in treeData" @click="unfload(index)" :key="index">
                <i class="el-icon-caret-right"></i>{{item.name}}
                <p  v-for="(a,i) in item.apes" @click.stop="clickTree(a)" :key="i">{{a.name}}</p>
              </li>
          </ul>-->
          <ul class="showhide">
            <li v-for="(item,index) in treeData" @click="showhide(index)" :key="index">
              <i
                class="el-icon-caret-right"
                @click.stop="showtree(index)"
                v-show="!showlist[index].state"
              ></i>
              <i
                class="el-icon-caret-bottom"
                @click.stop="hidetree(index)"
                v-show="showlist[index].state"
              ></i>
              {{item.name}}
              <p
                v-show="showlist[index].state"
                :class="{spanellipsis : a.isOnline == 1 || a.isOnline === undefined,spancolor : a.isOnline == 2 || a.isOnline == 9 || a.isOnline === null,markNoBorder:i == nowIndex}"
                v-for="(a,i) in item.apes"
                @click.stop="clickTree(a,i)"
                :key="i"
              >{{a.name}}</p>
            </li>
          </ul>

          <!-- <el-tree class="filter-tree" :data="treeData" :props="defaultProps" @node-click="clickTree"
            default-expand-all :filter-node-method="filterNode" ref="tree2">
            <span  :class="{spanellipsis : data.isOnline == 1 || data.isOnline === undefined,spancolor : data.isOnline == 2 || data.isOnline == 9 || data.isOnline === null}" slot-scope="{ node, data }">
              <span :title="node.label">{{ node.label }}</span>
            </span>
          </el-tree>-->
        </div>
        <div class="left_b">
          <p>录像条件查询：{{videoName}}</p>
          <p>
            <span>开始时间：</span>
            <input
              class="timetoinput"
              type="text"
              readonly
              v-model="beginData"
              id="timeBegin"
              placeholder="请输入开始时间"
            >
          </p>
          <p>
            <span>结束时间：</span>
            <input
              class="timetoinput"
              type="text"
              readonly
              v-model="endData"
              id="timeEnd"
              placeholder="请输入结束时间"
            >
          </p>
          <p class="btn">
            <el-button icon="el-icon-search" class="searchBtn" @click="searchVideo()">查询</el-button>
            <el-button type="danger" icon="el-icon-refresh" class="tryBtn" @click="reset">重置</el-button>
          </p>
          <p>时间段列表：</p>
          <div class="tables">
            <el-table
              :data="timetable"
              border
              style="width: 100%"
              @row-click="playhisvideo"
              height="1.95rem"
            >
              <div slot="empty">
                <div class="noImg">
                  <img src="../../assets/updataImg/NoData.png">
                </div>
              </div>
              <el-table-column prop="timeid" label="编号" width="50">
                <template slot-scope="scope">
                  <span>{{scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="st" label="开始时间"></el-table-column>
              <el-table-column prop="et" label="结束时间"></el-table-column>
            </el-table>
            <!-- <el-button v-show="isgetmore" class="getMore searchBtn" @click="showData(timeNum)">加载更多</el-button> -->
          </div>
        </div>
        <div class="left_botton">
          <p>工具箱</p>
          <div>
            <span @click="screenshot"></span>
            <!-- <span @click="openHishandwork"></span> -->
          </div>
        </div>
      </div>
      <div class="right">
        <div class="hisvideo" id="hisIdPlayer">
          <div>
            <!-- <input id="idUrl" type="hidden" style="width:399px" value="gbudp://192.168.101.126:5000/34030102001310000005?t=2018-7-9_11:55:31@2018-7-9_12:25:29" /> -->
            <input id="idUrl" type="hidden" style="width:399px" value>
            <input id="idControl" type="hidden" style="width:30px" value="3">
          </div>
        </div>
        <div class="right_btn">
          <ul>
            <li>
              <img
                onclick="OnhisChangeViews(1)"
                src="../../assets/images/videoCombat/rtvideo/onenormal.png"
                alt
              >
              <img
                onclick="OnhisChangeViews(4)"
                src="../../assets/images/videoCombat/rtvideo/fournormal.png"
                alt
              >
              <img
                onclick="OnhisChangeViews(6)"
                src="../../assets/images/videoCombat/rtvideo/eightnormal.png"
                alt
              >
              <img
                onclick="OnhisChangeViews(9)"
                src="../../assets/images/videoCombat/rtvideo/ninenormal.png"
                alt
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 手工标注 -->
    <handword :showhandword="showhandword" :isonline="true" @childbyHandwork="childbyHandwork"></handword>

    <footer>
      <p>
        <img src="../../assets/logo.png">武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span>
      </p>
    </footer>
  </div>
</template>

<script>
import headers from "../../components/header";
import handword from "./fastFight/handworkLable";
import realvideo from "../../api/realvideo/realvideo.js";
import videoDown from "../../api/casestudy/videoDown.js";
import videoMarker from "../../api/realvideo/videoMarker.js";
import beginEnd from "../../api/realvideo/BenEedTime.js"; //时间
import { windowToCanvas, clearRect, imgwh } from "./canvas.js";

export default {
  data() {
    return {
      filterText: "", // 搜索点位
      treeData: [],
      defaultProps: {
        children: "apes",
        label: "name"
      },
      beginData: this.getEarlierDate(), // 开始时间
      endData: this.getCurrentDate(), // 结束时间
      timetable: [], // 视频列表
      DialogVisible1: false,
      HisImgseek: "", //图片网络地址和视频地址
      handShow: true,
      hisOk: true,
      abledBtn: true,
      disbaleHand: true, //禁用手工标注,
      timeNum: 20,
      tableData: [],
      isgetmore: false,
      timeUrl: null, //视频详情
      getApeId: "", //得到当前树的ID
      shebeiId: "", //设备ID
      showhandword: false, //显示手工标注
      videoName: "",
      nowIndex: null
    };
  },
  components: {
    headers
  },
  created() {
    this.getDownLoad();
    this.getVDByModel();
  },
  mixins: [realvideo, videoDown, videoMarker, beginEnd],
  // watch: {
  //   filterText(val) {
  //     this.$refs.tree2.filter(val);
  //   }
  // },
  mounted() {
    OnhisInit();

    this.OpenTheTime3("#timeBegin", "#timeEnd");
    // let selectWrap = this.$refs.table.querySelector('.el-table__body-wrapper')
    //  selectWrap.addEventListener('scroll', this.handscroll)
  },
  destroyed() {
    OnHisExits();
  },
  components: {
    handword
  },
  methods: {
    // el-table滚动条的时间 全局自定义指令
    tableLoadMore() {
      this.showData(this.timeNum);
    },
    // 截取图片
    screenshot() {
      if (
        document.getElementById("idUrl").value == "" ||
        document.getElementById("idUrl").value == null
      ) {
        this.$notify({
          type: "warning",
          message: "请播放天网视频！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      Ongetseeks();
    },
    //打开手工标注
    openHishandwork() {
      if (
        document.getElementById("idUrl").value == "" ||
        document.getElementById("idUrl").value == null
      ) {
        return;
      }
      OnHisSnapshot();
      this.$nextTick(() => {
        setTimeout(() => {
          if (
            window.window.imgurl != undefined &&
            window.window.imgurl.length > 20
          ) {
            this.showhandword = true;
            document.title = document.title.split("....")[0];
          }
        }, 1000);
      });
    },
    childbyHandwork(val, title) {
      this.showhandword = val;
      document.title = title;
    },
    clickTree(data, i) {
      this.nowIndex = i;
      this.videoName = data.name;
      this.getApeId = data.apeId;
      this.shebeiId = data.shebeiId;
    },
    //tree的搜索
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    //播放视频
    playhisvideo(row, event, column) {
        console.log(row);
      let begin = row.st.replace(' ','_');
      let end = row.et.replace(' ','_');
      let url = sessionStorage.getItem("controlHead");
      document.getElementById("idUrl").value =
        url + this.getApeId + "?t=" + begin + "@" + end; // 最终
        console.log(url + this.getApeId + "?t=" + begin + "@" + end);
      OnhisPlays(this.shebeiId);
    },
    //查询时间列表
    searchVideo() {
      if (this.getApeId == "" || this.getApeId == undefined) {
        this.$notify({
          type: "warning",
          message: "请选择天网探头",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.beginData == "") {
        this.$notify({
          type: "warning",
          message: "请选择开始时间",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.endData == "") {
        this.$notify({
          type: "warning",
          message: "请选择结束时间",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      this.timetable = []
      this.$http
        .post(
          "/history/GetRecordList?id=" +
            this.getApeId +
            "&st=" +
            this.beginData.replace(" ", "_") +
            "&et=" +
            this.endData.replace(" ", "_")
        )
        .then(res => {
          // console.log(res,"返回的数据");
          this.tableData = res.data.rcds;
          this.timeNum = 20;
          if (this.tableData.length) {
            // this.timetable = this.tableData.slice(0,this.timeNum)
            // this.tableData = "";
            this.inquireTime();
          } else {
            this.$notify({
              type: "warning",
              message: "暂无数据",
              position: "bottom-right",
              duration: 3000
            });
          }
        })
        .catch(() => {
          this.$notify({
            type: "error",
            message: "天网视频查询失败",
            position: "bottom-right",
            duration: 3000
          });
        });
    },
    // 将查询时间切割为一个小时的
    inquireTime() {
      // this.$refs.table.clearSelection();
      let begin = new Date(this.beginData).getTime();
      let end = new Date(this.endData).getTime();
      let beginStart = Math.ceil((end - begin) / (1000 * 60 * 60));
      if (beginStart > 0) {
        let storeTime = [this.gety(begin)];
        let timeArr = [];
        let beginDate = begin;
        for (let i = 0; i < beginStart; i++) {
          beginDate = beginDate + 1000 * 60 * 60;
          storeTime.push(this.gety(beginDate));
        }
        // return
        storeTime.splice(storeTime.length - 1, 1, this.endData);
        for (let i = 0; i < storeTime.length - 1; i++) {
          timeArr.push({
            id: i,
            st: storeTime[i],
            et: storeTime[i + 1]
          });
        }
        this.timetable = timeArr;
        console.log(this.timetable,"重新赋值");
      } else {
        let begin = new Date(this.beginData);
        let end = new Date(this.endData);
      }
    },

    showData(num) {
      num += 20;
      this.timetable = this.tableData.slice(0, num);
      this.timeNum = num;
    },
    //重置
    reset() {
      this.isgetmore = false;
      this.timetable = [];
      this.beginData = this.getEarlierDate();
      this.endData = this.getCurrentDate();
      this.resetTimetwo();
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/commom.css";

.el-table >>> ::-webkit-scrollbar {
  width: 0.05rem;
  height: 0.05rem;
}

.el-table >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 0.05rem;
  background-color: rgba(153, 201, 250, 0.38);
}

.historyvideo {
  width: 100%;
  position: absolute;
  top: 0.6rem;
  bottom: 0px;
  left: 0px;
}

.main {
  width: 100%;
  min-width: 1200px;
  position: absolute;
  top: 0.4rem;
  bottom: 0.6rem;
  left: 0px;
  overflow: auto;
  color: #fff;
  padding-bottom: 0rem;
}
.left {
  width: 24%;
  height: 100%;
  float: right;
  margin-right: 1%;
  padding: 0 0.1rem;
  font-size: 0.14rem;
  /* background-color: #222; */
  /* border: 1px solid #000; */
}
.left_t {
  /* background-color: #363636; */
  padding: 0.1rem 0.2rem;
  width: 100%;
  height: 30%;
  position: relative;
  background-color: rgba(10, 25, 42, 0.65);
}
.left_t > p {
  position: relative;
  color: #8a8f93;
  padding-bottom: 0.2rem;
}
.left_t p input {
  width: 100%;
  height: 0.25rem;
  font-size: 0.14rem;
  border: 0;
  color: #fff;
  background-color: #252424;
  padding-left: 0.35rem;
}
.left_t p i {
  font-size: 0.16rem;
  position: absolute;
  left: 0.1rem;
  top: 0.05rem;
}
.filter-tree,
.showhide {
  height: calc(100% - 0.5rem);
  overflow: auto;
  cursor: pointer;
}
.filter-tree >>> .el-tree-node__label {
  font-size: 0.14rem;
  color: #99c9fa;
}
.el-tree {
  background: transparent;
}
.filter-tree >>> .el-tree-node__content:hover,
.filter-tree >>> .el-tree-node:focus > .el-tree-node__content {
  background-color: rgba(49, 86, 131, 0.2);
  font-size: 0.14rem;
}
.el-date-editor >>> .el-input__inner {
  background-color: #252424;
  border: 0;
  height: 0.25rem;
}
.el-date-editor >>> .el-input__prefix,
.el-date-editor >>> .el-input__suffix {
  top: -0.08rem;
}
.el-table >>> td,
.el-table th {
  padding: 0.02rem 0 !important;
}

.left_b {
  /* background-color: #363636; */
  margin: 2% 0;
  height: 53%;
  /* border: 1px solid #000; */
  padding: 0.1rem 0.2rem;
  overflow: auto;
  background-color: rgba(10, 25, 42, 0.65);
}
.el-table .cell {
  padding-right: 0px;
  padding-left: 0px;
}
.left_b p {
  padding: 0.08rem 0;
  color: #99c9fa;
}
.left_b .btn {
  display: flex;
  justify-content: center;
}
.left_b .el-button {
  padding: 0.06rem 0.2rem;
}
.left_b >>> .el-input__icon {
  height: 100%;
  width: 0.25rem;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 0.4rem;
}
.left_botton {
  height: 15%;
  background: rgba(20, 57, 96, 0.29);
}
.left_botton p {
  line-height: 0.4rem;
  background: rgba(20, 57, 96, 0.33);
  padding-left: 0.1rem;
}
.left_botton div {
  height: calc(100% - 0.4rem);
  text-align: center;
  position: relative;
}
.left_botton div span {
  width: 0.52rem;
  height: 0.5rem;
  background: url("../../assets/images/videoCombat/history/imgcut.png");
  background-size: 100% 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.left_botton div span:hover {
  background: url("../../assets/images/videoCombat/history/cuthover.png");
}
/* .left_botton div span:last-child{
    background: url('../../assets/images/videoCombat/history/handable.png') no-repeat;
    left: 70%;
  }
  .left_botton div span:last-child:hover{
    background: url('../../assets/images/videoCombat/history/lableName.png') no-repeat;
    left: 70%;
  } */

.el-date-editor.el-input {
  width: 2.2rem;
}

.tables >>> .el-table--enable-row-hover .el-table__body tr:hover>td {
  color: #d9582a;
  cursor: pointer;
}

.right {
  margin-left: 1%;
  width: 74%;
  height: 100%;
  position: relative;
  background: rgba(20, 57, 96, 0.29);
}
.right_btn {
  position: absolute;
  height: 0.6rem;
  width: 100%;
  background-color: rgba(10, 25, 42, 0.65);
  bottom: 0;
}
.right_btn ul li {
  float: left;
  line-height: 0.6rem;
}
.right_btn li:first-child {
  width: 60%;
  text-align: center;
  height: 0.6rem;
}
.right_btn li:first-child img {
  margin-right: 10%;
  cursor: pointer;
}

.right_btn li:nth-child(2),
.right_btn li:nth-child(3) {
  width: 20%;
  font-size: 0.16rem;
  text-align: center;
  border-left: 1px solid #464646;
}
.right .hisvideo {
  width: 100%;
  height: calc(100% - 0.6rem);
}

.el-radio-group >>> .el-radio__label {
  color: #99c9fa;
  font-size: 0.14rem;
}

.timetoinput {
  padding-left: 0.1rem;
  border-radius: 5px;
  height: 0.25rem;
}

.el-dialog__wrapper >>> .el-dialog__header {
  background-color: #f3f6f8;
}
.el-dialog__wrapper >>> .el-dialog__footer {
  text-align: center;
  border-top: 1px solid #d5dade;
}
.el-dialog__wrapper >>> .el-dialog__body {
  padding: 0.1rem 0.2rem;
}
.getMore {
  margin-left: 38%;
  margin-top: 0.1rem;
}
.noImg {
  width: 1rem;
  height: 0.7rem;
}
.el-table >>> th {
  padding: 0.03rem 0 !important;
}
.el-table >>> .el-table__empty-text {
  top: 35%;
}

.showhide li {
  line-height: 0.26rem;
  color: #99c9fa;
}
.showhide li i {
  display: inline-block;
  width: 0.15rem;
  height: 0.15rem;
  color: #c0c4cc;
  margin-right: 0.05rem;
}
.showhide p {
  padding-left: 0.4rem;
  color: #99c9fa;
  line-height: 0.26rem;
}
.showhide .spanellipsis {
  color: #99c9fa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.showhide .spancolor {
  color: red;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.showhide li p:hover {
  background-color: rgba(49, 86, 131, 0.2);
}
.markNoBorder {
  background-color: rgba(49, 86, 131, 0.2);
}
</style>
