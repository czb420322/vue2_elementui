<!--
 * @Author: your name
 * @Date: 2020-07-17 09:36:02
 * @LastEditTime: 2020-11-02 14:49:04
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\page\videoCombat\datacollection.vue
 -->
<template>
  <div class="parent">
    <!-- <headers/> -->
    <div class="topInfo">
        <img src="../../assets/updataImg/location.png" alt="">
        <span class="sysname childname">当前位置：</span>
        <router-link class="sysname" :to="{path:'/videoCombat',query:{menuCode:100}}">视频侦查> </router-link>
        <p class="sysname">&nbsp;数据采集</p>
    </div>
    <!-- <p class="splitline"></p> -->
    <div class="wrapper">
      <div class="searchInfo">
        <div class="searchkline">
          <!-- <span  @click="onlinecollect"></span> -->
          <!-- <span @click="getclick();getDownLoad();"></span> -->
          <span  @click="getclick();getDownLoad();" class="commBtn addBtn">离线视频上传</span>
          <!-- <el-button type="primary" @click="onlinecollect"><img src="../../assets/images/videoCombat/WIFI.png" alt="">标准采集</el-button> -->
          <!-- <el-button @click="getclick();getDownLoad();" type="warning"><img src="../../assets/images/videoCombat/offline.png" alt="">非标准采集</el-button> -->

        </div>
        <div class="searchLeft">
          <div class="searchItem item">
            <span class="textInfo">文件名称：</span>
            <el-input v-model="keyword" placeholder="请输入您要查找的文件"></el-input>
          </div>
        </div>
        <div class="searchRight">
          <div class="timer">
            开始时间：
            <input type="text" id="text1" readonly v-model="beginTime" placeholder="请输入开始时间：">
            结束时间：
            <input type="text" id="text2" readonly v-model="endTime" placeholder="请输入结束时间：">
          </div>
          <div class="searchsBtn">
            <!-- <span class="searchIcon"></span>查询 -->
            <el-button class="el-icon-search searchBtn" @click="getAllDataCell">&nbsp;查询</el-button>
            <el-button type="danger" class="el-icon-refresh tryBtn" @click="reset">&nbsp;重置</el-button>
          </div>
        </div>
      </div>
      <div class="line"></div>



        <el-table :data="tableData" border style="width: 100%" class="tables" height="5.35rem">
          <div slot="empty">
            <div class="noImg">
              <img src="../../assets/updataImg/NoData.png" />
            </div>
          </div>
          <el-table-column show-overflow-tooltip  type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="fileName" label="文件名称">
          </el-table-column>
          <el-table-column prop="fileSize" label="文件大小(M)" :formatter="fileSize">
          </el-table-column>
          <el-table-column prop="uploadTime" label="创建时间" :formatter="dateFormat">
          </el-table-column>
          <el-table-column prop="status" label="状态" :formatter="formatStatus">
          </el-table-column>
           <el-table-column label="进度">
             <template slot-scope="scope">
               <el-progress :percentage="scope.row.progress" color="#8e71c7"></el-progress>
             </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作">
            <template slot-scope="scope">

              <!-- <span  @click="stopTovideo(scope.row.fileUuid)" v-show="scope.row.status == 3" class="btn btn2"></span>
              <span v-show="scope.row.status != 3" class="btn btn2-1"></span>
              <span v-show="scope.row.status == 5"  @click="retry(scope.row.fileUuid)" class="btn btn3"></span>
              <span v-show="scope.row.status != 5" class="btn btn3-1"></span>
              <span @click="deleteVideo(scope.row.fileUuid)" class="btn btn4"></span> -->
               <!-- <el-button type="primary" class="searchBtn"  @click="stopTovideo(scope.row.fileUuid)" :disabled="scope.row.status != 3"><img src="../../assets/images/videoCombat/begin.png" alt="">&nbsp;&nbsp;停止</el-button> -->
              <!-- <el-button type="warning" class="tryBtn" @click="retry(scope.row.fileUuid)"  :disabled="scope.row.status != 5 "><img src="../../assets/images/videoCombat/suspend.png" alt="">&nbsp;&nbsp;重试</el-button> -->
              <el-button type="danger" class="delBtn" @click="deleteVideo(scope.row.fileUuid)"><img src="../../assets/images/videoCombat/cancel.png" alt="">&nbsp;&nbsp;删除</el-button>
              <!-- <el-button type="primary" @click="stopTovideo(scope.row.fileUuid)" :disabled="scope.row.status != 3">停止</el-button> -->
              <!-- <el-button type="success" @click="retry(scope.row.fileUuid)"  :disabled="scope.row.status != 5 ">重试</el-button> -->
              <!-- <el-button type="danger" @click="deleteVideo(scope.row.fileUuid)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>

      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
        </el-col>
      </el-row>
    </div>

    <!-- <el-dialog
      title="查看进度"
      :visible.sync="dialogVisible"
      @close="off"
      width="30%">
      <span>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="percent"></el-progress>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
     <footer>
      <p>
        <img src="../../assets/logo.png">&nbsp;
        武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span>
      </p>
    </footer>
  </div>
</template>

<script>
import headers from '../../components/header'
import realvideo from "../../api/realvideo/realvideo.js";
import videoDown from '../../api/casestudy/videoDown.js'
import moment from 'moment'
import beginEnd from '../../api/realvideo/BenEedTime.js'
import DataCell from '../../api/newCaseVideo/DataCell.js'



export default {
  data() {
    return {
      modal: false,
      dialogTableVisible: false,
      time: "",
      orderType: "desc",//排序方式
      orderBy: "upload_time", //排序字段
      keyword: "", //账号查询字段
      currentPage: 1, // 当前页码
      pageSize: 10, //每页显示的条数
      totalCount: 0, //数据总条数
      tableData: [], // 表格数据
      percent:0, //C++进度 和 java进度
      flag:false,
      t: null,
      dialogVisible:false
    };
  },
  components: {
    headers
  },
  watch: {

  },
  mounted (){
    this.OpenTheTime('#text1','#text2');
    this.getAllDataCell();
    this.t = setInterval(()=>{
        if(this.$router.currentRoute.path == "/videoCombat/datacollection"){
          this.getAllDataCell();
        }else{
          clearInterval(this.t);
        }
      },1000);
  },
  mixins: [realvideo,videoDown,beginEnd,DataCell],
  methods: {
    onlinecollect() {
      this.$router.push({path:'/videoCombat/datacollection/onlinecollect',query:{ menuCode: '100' }});
    },
    // reset(){
    //   this.beginTime = ''
    //   this.endTime = ''
    //   this.keyword = ''
    //   this.getAllDataCell();
    // }
  }
};
</script>

<style scoped>
@import "../../assets/css/commom.css";
.parent {
  width: 100%;
  position: absolute;
  top: 0.6rem;
  bottom: 0px;
  left: 0px;
}

.tables .el-button {
  padding: 0.08rem 0.2rem;
}

.wrapper {
  padding: 0.4rem 0.34rem 0 0.34rem;
}
.wrapper /deep/ .cell {
  text-align: center !important;
}
.wrapper /deep/ .el-table th.is-leaf{
  background-color: #f3f6f8;
  font-size:0.14rem;
}

.searchInfo {
  display: flex;
  color: #606266;
  justify-content: space-between;
}
.searchRight,
.searchLeft,
.searchsBtn {
  display: flex;
}
.searchInfo .searchkline {
  margin-left: 0;
}
.searchkline span{
  display: inline-block;
  width: 1.2rem;
  height: 0.4rem;
  cursor: pointer;
  font-size: 0.12rem;
}

.searchItem {
  display: flex;
}

.textInfo {
  font-size: 0.14rem;
  line-height: 0.4rem;
  display: block;
  color: #c5c5c5;
  text-align: right;
}
.searchInfo >>> .el-input__inner{
  height: 0.4rem;
}
.searchInfo >>>  .el-date-editor .el-range__icon,
.searchInfo >>> .el-date-editor .el-range-separator {
    font-size: 0.14rem;
    line-height: 0.3rem;
}
.itemT {
  margin-left: 1rem;
}
.searchItem .el-input {
  width: 3.4rem;
  color: #909399;
  height: 0.36rem;
}
.timer {
  display: flex;
  margin-right: 0.5rem;
  line-height: 0.36rem;
  color: #c5c5c5;
}
.timer input{
  height: 0.4rem;
  background-color: rgba(0, 0, 0, 0.2) ;
  border: 1px solid #2A2D30 ;
  color: #c5c5c5;
  padding-left: 0.1rem;
}
.timer #text1{
  margin-right: 0.1rem;
}
.timeWrapper {
  width: 3rem;
  display: flex;
  align-items: center;
}
.line {
  width: 100%;
  margin: 0.3rem 0;
}
.el-col-6 {
  width: 25%;
  margin-right: 66px;
  margin-top: 20px;
}
.el-progress /deep/ .el-progress__text {
  width: 0.5rem;
  color: #99c9fa;
  margin-left:0.03rem;
  font-size: 0.12rem !important;
}




</style>





