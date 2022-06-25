<template>
  <div class="wrapper">
      <div class="searchInfo">
        <div class="searchLeft">
          <div class="searchItem itemO">
            <span class="textInfo">账号：</span>
            <input type="text" class="input" v-model = "userName">
          </div>
          <!-- <div class="searchItem itemT">
            <span class="textInfo">关键字：</span>
            <input type="text" class="input">
          </div> -->
        </div>
        <div class="searchRight">
          <div class="timer">
            <span class="textInfo">时间：</span>
            <!-- <div class="input timeWrapper timeD">
              <span class="timeIcon calendIcon"></span>
              <input type="text" id="startD" class="startTimeD clooseTime" placeholder="开始日期">
              <span class="conline"></span>
              <input type="text" id="endD" class="endTimeD clooseTime" placeholder="结束日期">
            </div> -->
            <div class="input timeWrapper">
              <span class="timeIcon"></span>
              <input type="text" id="startT" class="startTimeH clooseTime" placeholder="请选择时间范围">
            </div>
          </div>
          <p class="searchBtn" @click = "query(currentPage)"><span class="searchIcon"></span>查询</p>
        </div>
      </div>
      <div class="line"></div>
      <table class="gridtable">
        <thead>
          <tr class="toptr" ref="toptr">
            <th v-for="(item,index) in colNames" :width='item.width' :key="index">{{item.text}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for ="(user,index) in colModel" :key="index">
            <td>{{user.logTime}}</td>
            <td>{{user.userName}}</td>
            <td>{{user.trueName}}</td>
            <td>{{user.logType}}</td>
            <td>{{user.logContent}}</td>
            <td>{{user.userIp}}</td>
<!--             <td>
              <div class="operating">
                <span class="reappear" v-on:click="remove(index)">重现
                  <span class="icon"></span>
                </span>
              </div>
            </td> -->
          </tr>
        </tbody>
      </table>
      <div class="nocontent" v-show="nocontentFlag"></div>
      <page v-show="!nocontentFlag"
        :totalPage = "totalPage"
        :currentPage = "currentPage"
        :totalRecord = "totalCount"
        :callback = "getCurrentPage"
      ></page>
      <el-button>按钮</el-button>
  </div>
</template>

<script>
import Page from '../otherPage/otherPage.vue'
import {getLogList} from '../../api/manages/logGrid.js'
export default {
  data () {
    return {
      nocontentFlag: false,
      beginTime:"",
      endTime:"",
      userName:"",
      currentPage:1,
      totalPage: 2,
      totalCount: 0,
      colNames: [{text : '操作时间', width : '14%'},{text : '账号', width : '14%'},{text : '真实姓名', width : '14%'},{text : '所属单位', width : '14%'},{text : '功能', width : '14%'},{text : 'IP', width : '14%'}],
      colModel: []
    }
  },
  methods: {
    getNowDay () {
      let day1 = new Date();
      let s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
      return s1
    },
    // 请求数据
    queryData (page) {
      let data = {
        beginTime: this.beginTime,
        endTime: this.endTime,
        keyword: this.userName,
        page: {
          pageNum: page,
          pageSize: 10,
        }
      }
      getLogList('107/systemManage/system/log/list',data,"v2-xfw234-1524338124-2B417DAC021AF59205772630A10945F0",
        (res) => {
        console.log(res)
        if(res.code == 200){
          if(res.data.list.length > 0){
            this.colModel = res.data.list
            this.totalPage = res.data.pages
            this.totalCount = res.data.totalCount
          }
          if(res.data.list.length == 0){
            this.colModel = res.data.list
            this.nocontentFlag = true
          }
        }
      })
    },
    getCurrentPage (page) {
      this.currentPage = page
    },
    query (page) {
      this.queryData(page)
    }
  },
  watch: {
    currentPage () {
      this.queryData(this.currentPage)
    }
  },
  created () {
    this.queryData(this.currentPage)
  },
  mounted () {
    let _this = this
    laydate.render({
      elem: '#startT',
      type: 'datetime',
      range: '至',
      done (val,object) {
        _this.beginTime = val.split("至")[0]
        _this.endTime = val.split("至")[1]
      }

    });
  },
  components: {
    Page
  }
}
</script>

<style scoped>
.wrapper{
  margin: 16px 34px 0 34px;
  position: relative;
}
.searchInfo {
  display: flex;
  color: #606266;
  justify-content: space-between;
}
.searchRight, .searchLeft{
  display: flex;
}
.textInfo {
  font-size: 14px;
  line-height: 36px;
}
.itemT{
  margin-left: 100px;
}
.input {
  width: 340px;
  height: 36px;
  padding-left: 10px;
  border: 1px solid #dcdfe6;
}
.timer{
  display: flex;
}
.timeWrapper{
  width: 310px;
  display: flex;
  align-items: center;
}
.timeIcon{
  width: 14px;
  height: 14px;
  display: inline-block;
  margin-right: 14px;
  background: url(../../assets/images/log/time.png)
}
.calendIcon{
  background: url(../../assets/images/log/calend.png)
}
.conline{
  background: #666;
  display: inline-block;
  width: 10px;
  height: 2px;
  margin-right: 30px;
}
.timeD{
  margin: 0 20px 0 6px;
}
.clooseTime{
  width: 260px;
  font-size: 12px;
  border: none
}
.searchBtn{
  width: 86px;
  height: 36px;
  background: #409eff;
  border: none;
  border-radius: 4px;
  color: #fff;
  line-height: 36px;
  cursor: pointer;
  margin-left: 36px;
}
.searchIcon{
  display: inline-block;
  width: 14px;
  height: 13px;
  margin: 0 10px 0 15px;
  background: url('../../assets/images/log/search.png')
}
.line{
  width: 100%;
  height: 2px;
  background: #d9dbdd;
  margin: 30px 0;
}

table.gridtable {
    font-family: verdana,arial,sans-serif;
    font-size:12px;
    color:#000;
    border-width: 1px;
    border-color: #ddd;
    border-collapse: collapse;
    width: 100%;
}
table.gridtable th,table.gridtable td{
    border-width: 1px;
    border-style: solid;
    border-color: #ddd;
}
th{
  font-size: 14px;
}

tr,th{
  text-align:center;
  height: 36px;
  line-height: 36px;
}
.toptr{
  background: #f9f9f9
}
.gridtable tbody tr:nth-of-type(odd){
  background: #fff
}
.gridtable tbody tr:nth-of-type(even){
  background: #f9f9f9
}
.reappear{
  position: relative;
  border-radius: 4px;
  display: inline-block;
  height: 26px;
  width: 60px;
  color: #fff;
  vertical-align: middle;
  line-height: 26px;
  text-indent: 20px;
  font-size: 12px;
  background: #67c23a;
  cursor: pointer;
}
.icon{
  position: absolute;
  width: 14px;
  height: 14px;
  top: 6px;
  left: 6px;
  background-image:  url('../../assets/images/log/reappear.png');
}
.record{
  font-size: 12px;
  color: #f00;
  margin-top: 10px;
}
.nocontent{
  position: absolute;
  top: 100px;
  min-height: 500px;
  z-index: 2;
  left: 0;
  right: 0;
  background: url(../../assets/images/log/nocontent.png) center no-repeat;
  background-color: #fff;
}
</style>

