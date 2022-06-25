<!--
 * @Author: chenxf
 * @Date: 2020-05-25 19:05:35
 * @LastEditTime : 2021-01-21 10:48:27
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\page\casestudy\caseApprove.vue
 * @
 -->
<template>
  <div class="wrapper">
    <!-- <div class="topNav">
      <router-link class="nav-item" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}"></router-link>
      <div class="nav-item nav-item-search">案件审批</div>
    </div> -->
     <div class="topInfo">
        <img src="../../assets/updataImg/location.png" alt="">
        <span class="sysname childname">当前位置：</span>
        <router-link class="sysname" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 > </router-link>
        <p class="sysname">&nbsp;案件审批</p>
    </div>

    <div class="contentBody">
      <div class="content">
        <div class="contentTitle">
          <div @click="changeItem(1)" id="tabItem1" style="margin-right:0.2rem"  class="contentTitleItem needApprove on">
            <img v-show="imgFlag1" style="margin-right: 7px;height: 12px" src="../../assets/case/needapprove-icon-white.png" alt="">
            <img v-show="!imgFlag1" style="margin-right: 7px;height: 12px" src="../../assets/case/needapprove-icon.png" alt="">待审批</div>
          <div @click="changeItem(2)" id="tabItem2"  class="contentTitleItem  approveHistory">
            <img v-show="imgFlag2" style="margin-right: 7px;height: 12px" src="../../assets/case/history-icon-white.png" alt="">
            <img v-show="!imgFlag2" style="margin-right: 7px;height: 12px" src="../../assets/case/history-icon.png" alt="">
            审批历史
          </div>

          <div v-show="imgFlag1" class="searchCondition">
            <div class="scItem">案件名称:&nbsp;&nbsp;</div>
            <input type="text" class="caseNameSelect" v-model="caseName" placeholder="请输入案件名称">
            <div class="scItem">案件编号:&nbsp;&nbsp;</div>
            <input type="text" class="caseNameSelect" v-model="caseNo" placeholder="请输入案件编号">
            <!--<div class="scItem">关键字:&nbsp;&nbsp;</div>-->
            <!--<input type="text" class="caseNameSelect" v-model="keyword">-->
            <div class="scItem">提交审批时间:&nbsp;&nbsp;</div>
            <el-input id="beginTime" class="caseNameSelect timeSelect" placeholder="请选择开始时间" autocomplete="off" v-model="beginDateTime"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
            </el-input>
            <p class="scItemP">-</p>
            <el-input id="endTime" class="caseNameSelect timeSelect" placeholder="请选择结束时间" autocomplete="off" v-model="endDateTime"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
            </el-input>

            <div class="scItemBtn" style="margin-left: 10px;">
              <el-button  type="primary" class="searchBtn" icon="el-icon-search" @click="pageNo = 1;getApproveCaseList()">查询</el-button>
              <el-button type="warning" class="tryBtn" icon="el-icon-refresh" @click="getReset1()">重置</el-button>
            </div>
          </div>

           <div  v-show="imgFlag2" class="searchCondition">
            <div class="scItem">案件名称:&nbsp;&nbsp;</div>
            <input type="text" class="caseNameSelect" v-model="caseName2" placeholder="请输入案件名称">
            <div class="scItem">案件编号:&nbsp;&nbsp;</div>
            <input type="text" class="caseNameSelect" v-model="caseNo2" placeholder="请输入案件编号">
            <!--<div class="scItem">关键字:&nbsp;&nbsp;</div>-->
            <!--<input type="text" class="caseNameSelect" v-model="keyword2">-->
            <div class="scItem">审批时间:&nbsp;&nbsp;</div>
            <el-input id="beginTime2" class="caseNameSelect timeSelect" placeholder="请选择开始时间" autocomplete="off" v-model="beginDateTime2"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
            </el-input>
            <p class="scItemP">-</p>
            <el-input id="endTime2" class="caseNameSelect timeSelect" placeholder="请选择结束时间" autocomplete="off" v-model="endDateTime2"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
            </el-input>
            <div class="scItemBtn">
              <el-button type="primary" icon="el-icon-search" class="searchBtn" @click="pageNo2 = 1;getApproveHistoryList()">查询</el-button>
              <el-button type="warning" icon="el-icon-refresh" class="tryBtn" @click="getReset2()">重置</el-button>
            </div>
          </div>
        </div>
        <!--待我审批页面-->
        <div id="tab1" class="needApproveContainer">
          <!-- <div class="needApproveTitle">
            <div class="needApproveTitleIcon"></div>
            <div class="needApproveTitleTxt">案件待审批列表</div>
          </div> -->
          <div class="contentTable">
            <div class="table">
              <el-table
                :data="casCaseList"
                max-height="500"
                style="width:100%;"
                border>
                <div slot="empty">
                  <div class="noImg">
                    <img src="../../assets/updataImg/NoData.png" />
                  </div>
                </div>
                <el-table-column
                  type="index"
                  align="center"
                  width="60"
                  label="序号">
                </el-table-column>
                <el-table-column
                  prop="caseLinkMark"
                  align="center"
                  show-overflow-tooltip
                  label="案件编号">
                </el-table-column>
                <el-table-column
                  prop="caseName"
                  align="center"
                  show-overflow-tooltip
                  label="案件名称">
                </el-table-column>
                <el-table-column
                  prop="creatorName"
                  align="center"
                  show-overflow-tooltip
                  label="创建用户">
                </el-table-column>
                <el-table-column
                  prop="updateTime"
                  align="center"
                  show-overflow-tooltip
                  label="提交审批时间">
                </el-table-column>
                <el-table-column label="操作" align="center" width="150">
                  <template slot-scope="scope">
                    <!--<div style="margin: 0 auto" class="approveBtn" @click="goToApprovePage(scope.row)">-->
                      <!--<img style="margin-right: 7px"src="../../assets/case/approve-icon.png"alt="">审批-->
                    <!--</div>-->
                    <el-button
                      size="mini"
                      type="warning"
                      class="tryBtn"
                      :disabled="scope.row.hasApproveingComb == 1"
                      :title="scope.row.hasApproveingComb == 1 ? '当前案件所在的串并案正在审批中' : null"
                      @click="goToApprovePage(scope.row)"
                    ><img style="margin-right: 7px;vertical-align: -1px;" src="../../assets/case/approve-icon.png" alt="">审批</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pageNation">
              <el-pagination style="text-align:right;margin-right: 10px;"
                :background=true
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="Number(pageNo)"
                :page-sizes="[10, 20, 30, 40, 50, 100]"
                :page-size="Number(pageSize)"
                layout="total, sizes, prev, pager, next, jumper"
                :total=Number(totalNum)>
              </el-pagination>
            </div>
          </div>
        </div>
        <!--审批历史页面-->
        <div id="tab2" class="needApproveContainer">
          <!-- <div class="needApproveTitle">
            <div class="needApproveTitleIcon"></div>
            <div class="needApproveTitleTxt">历史审批记录</div>
          </div> -->
          <div class="contentTable">
            <div class="table">
              <el-table
                :data="casApproveList"
                max-height="500"
                border
                style="width:100%;">
                <div slot="empty">
                  <div class="noImg">
                    <img src="../../assets/updataImg/NoData.png" />
                  </div>
                </div>
                <el-table-column
                  type="index"
                  align="center"
                  width="60"
                  label="序号">
                </el-table-column>
                <el-table-column
                  prop="caseLinkMark"
                  align="center"
                  show-overflow-tooltip
                  label="案件编号">
                </el-table-column>
                <el-table-column
                  prop="caseName"
                  align="center"
                  show-overflow-tooltip
                  label="案件名称">
                </el-table-column>
                <el-table-column
                  prop="approveUser"
                  align="center"
                  show-overflow-tooltip
                  label="审批人">
                </el-table-column>
                <el-table-column
                  prop="approveTime"
                  align="center"
                  show-overflow-tooltip
                  label="审批时间">
                </el-table-column>
                <el-table-column
                  prop="approveStatus"
                  align="center"
                  show-overflow-tooltip
                  label="审批状态"
                  :formatter="formatStatus2">
                </el-table-column>
                <el-table-column
                  prop="approveOpinion"
                  align="center"
                  show-overflow-tooltip
                  label="审批意见">
                </el-table-column>
                <!-- <el-table-column label="操作" align="center" width="150">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="success"
                      icon="el-icon-view"
                      class="topBtn"
                      @click="goToLookApprovePage(scope.row)">查看</el-button>
                  </template>
                </el-table-column> -->
              </el-table>
            </div>
            <div class="pageNation">
              <el-pagination style="text-align:right;margin-right: 10px;"
                 :background=true
                 @size-change="handleSizeChange2"
                 @current-change="handleCurrentChange2"
                 :current-page="Number(pageNo2)"
                 :page-sizes="[10, 20, 30, 40, 50, 100]"
                 :page-size="Number(pageSize2)"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total=Number(totalNum2)>
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
      <footer_case></footer_case>
    </div>
  </div>
</template>

<script>
  import vehicle from '../../api/vehicle/vehicle.js'
  import  '../../common/laydate/laydate.js'
  import Footer_case from "../../components/footer_case";
  export default {
    components: { Footer_case },
    data() {
      return {
        imgFlag1: true,
        imgFlag2: false,
        pageNo: 1,
        pageSize: 10,
        totalNum: 0,
        beginDateTime: "",
        endDateTime: "",
        keyword:"",
        caseName: '',
        caseNo:'',

        pageNo2: 1,
        pageSize2: 10,
        totalNum2: 0,
        beginDateTime2: "",
        endDateTime2: "",
        caseName2: '',
        caseNo2:'',
        keyword2:"",

        createUser: '',
        comboState: 0,
        casCaseList: [],
        casApproveList: [],

        beginTime:null,
        endTime:null,
        beginTime2:null,
        endTime2:null,
      }
    },
    mixins: [vehicle],
    methods: {
    //案件待审批列表
      getApproveCaseList() {
        this.$http({
          url: 'pca/approve/approveCase/approveCaseList',
          method: 'get',
          params: {
            caseName: this.caseName,
            caseLinkMark: this.caseNo,
            startTime: this.beginDateTime,
            endTime: this.endDateTime,
            // keyword:this.keyword,
            pageSize: this.pageSize,
            pageNum: this.pageNo,
            orderType:"desc",
            orderBy:"update_time"
          }
        }).then(res => {
          if(res.data.code == 200){
            this.casCaseList = res.data.data.list;
            this.totalNum = res.data.data.totalCount
          }else{
            this.$notify({
              type: 'error',
              message: '获取案件待审批列表失败！',
              position: 'bottom-right',
              duration: 3000
            });
            // layer.alert("获取案件待审批列表失败！",{icon:5,title:"消息提示"});
          }
        })
      },

      //案件历史审批列表
      getApproveHistoryList() {
        // if(this.caseName2 !='' || this.beginDateTime2 !='' || this.endDateTime2 !=''){
        //   this.pageNo2 = 1
        // }
        this.$http({
          url: 'pca/approve/approveCase/approveHistory',
          method: 'get',
          params: {
            startTime: this.beginDateTime2,
            endTime: this.endDateTime2,
            caseName: this.caseName2,
            caseLinkMark:this.caseNo2,
            pageSize: this.pageSize2,
            pageNum: this.pageNo2,
            // keyword:this.keyword2,
            orderType:"desc",
            orderBy:"approveTime"
          }
        }).then(res => {
          if(res.data.code == 200){
            this.casApproveList = res.data.data.list;
            this.totalNum2 = res.data.data.totalCount;
          }else{
            this.$notify({
              type: 'error',
              message: '获取案件历史审批列表失败！',
              position: 'bottom-right',
              duration: 3000
            });
            // layer.alert("获取案件历史审批列表失败！",{icon:5,title:"消息提示"});
          }
        })
      },
      //状态码判断
      formatStatus(row, column,cellValue) {
        if(cellValue === 0){
          return '新建';
        }else if (cellValue === 1){
          return '已立案';
        }else if (cellValue === 2){
          return '已侦破';
        }else if (cellValue ===3){
          return '侦破待复核';
        }else if (cellValue === 4){
          return '已结案';
        }else if (cellValue === 5){
          return '结案待复核';
        }else if (cellValue === 6){
          return '并案待复核';
        }else if (cellValue === 7){
          return '撤案待复核';
        }else if (cellValue === 8){
          return '结案归档';
        }else if (cellValue === 9){
          return '并案归档';
        }
      },
      formatStatus2(row, column,cellValue) {
        if(cellValue === 1){
          return '审批通过';
        }else if (cellValue === 2){
          return '审批不通过';
        }
      },
      //重置
      getReset1(){
        this.caseName="";
        this.caseNo="";
        this.beginDateTime="";
        this.endDateTime="";
        this.keyword = "";
        this.pageNo = 1;
        this.pageSize = 10;
        let maxDate =  {
          year: new Date().getFullYear(),
          month: new Date().getMonth(), //关键
          date: new Date().getDate(),
          hours: new Date().getHours(),
          minutes: new Date().getMinutes(),
          seconds: new Date().getSeconds()
        };
        this.beginTime.config.max = maxDate;
        this.endTime.config.min = '1900-01-01 00:00:00';
        this.getApproveCaseList();
      },
      getReset2(tab){
        this.caseName2="";
        this.caseNo2="";
        this.beginDateTime2="";
        this.endDateTime2="";
        this.keyword2 = "";
        this.pageNo2 = 1;
        this.pageSize2 = 10;
        let maxDate =  {
          year: new Date().getFullYear(),
          month: new Date().getMonth(), //关键
          date: new Date().getDate(),
          hours: new Date().getHours(),
          minutes: new Date().getMinutes(),
          seconds: new Date().getSeconds()
        };
        this.beginTime2.config.max = maxDate;
        this.endTime2.config.min = '1900-01-01 00:00:00';
        this.getApproveHistoryList();
      },
      //tabs切换
      changeItem(tabNum) {
        if(tabNum == 1){
          this.imgFlag1 = true;
          this.imgFlag2 = false;
          this.pageNo = 1
          this.getApproveCaseList();
          document.getElementById('tabItem1').className = "contentTitleItem needApprove on";
          document.getElementById('tabItem2').className = "contentTitleItem approveHistory";
          document.getElementById('tab1').style.display='block';
          document.getElementById('tab2').style.display='none';
        }else if(tabNum == 2){
          this.imgFlag1 = false;
          this.imgFlag2 = true;
          this.pageNo2 = 1
          this.getApproveHistoryList()
          document.getElementById('tabItem1').className = "contentTitleItem needApprove";
          document.getElementById('tabItem2').className = "contentTitleItem approveHistory on";
          document.getElementById('tab1').style.display='none';
          document.getElementById('tab2').style.display='block';
        }
      },
      //案件待审批分页
      handleSizeChange(val) {
        this.pageNo = 1;
        this.pageSize = val;
        this.getApproveCaseList()
      },
      handleCurrentChange(val) {
        this.pageNo = val;
        this.getApproveCaseList()
      },
      //案件历史待审批分页
      handleSizeChange2(val) {
        this.pageNo2 = 1;
        this.pageSize2 = val;
        this.getApproveHistoryList()
      },
      handleCurrentChange2(val) {
        this.pageNo2 = val;
        this.getApproveHistoryList()
      },
      //跳转审批页
      goToApprovePage(obj) {
        this.$router.push({
          path: '/casestudy/casePicture_look',
          query: {
            caseUuid: obj.caseUuid,
            menuCode: 220,
            isTrial: true
          }
        })
      },
      //跳转查看页面
      goToLookApprovePage(obj){
        // this.$router.push({
        //   path: '/casestudy/casePicture_look?menuCode=200',
        //   query: {
        //     caseUuid: obj.targetId
        //   }
        // })
        let routeData = this.$router.resolve({ path: '/casestudy/casePicture_look', query: { caseUuid: obj.targetId ,menuCode: 200,isTrial:true}});
        window.open(routeData.href, '_blank');
      }
    },
    mounted: function () {
      let tabNum = this.$route.query.tab;
      if(tabNum){
        this.changeItem(tabNum);
      }else{
        this.changeItem(1);
      }

      let _this = this;
      this.beginTime = laydate.render({
        elem: '#beginTime',
        type: 'datetime',
        btns: ['now','confirm'],
        max: this.getCurrentDate(),
        done: function (value, date) {
          _this.beginDateTime = value;
          _this.endTime.config.min = {
            year: date.year,
            month: date.month - 1, //关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
        },
      });
      this.endTime = laydate.render({
        elem: '#endTime',
        type: 'datetime',
        btns: ['now','confirm'],
        max: 1,
        done: function (value, date) {
          _this.endDateTime = value;
          _this.beginTime.config.max = {
            year: date.year,
            month: date.month - 1, //关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
        },
      });
      this.beginTime2 = laydate.render({
        elem: '#beginTime2',
        type: 'datetime',
        btns: ['now','confirm'],
        max: this.getCurrentDate(),
        done: function (value, date) {
          _this.beginDateTime2 = value;
          _this.endTime2.config.min = {
            year: date.year,
            month: date.month - 1, //关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
        },
        ready: function () {
          // beginTime2.hint('当前月日期为黑色<br/>所选日期需小于当前日期');
        }
      });
      this.endTime2 = laydate.render({
        elem: '#endTime2',
        type: 'datetime',
        btns: ['now','confirm'],
        max: 1,
        done: function (value, date) {
          _this.endDateTime2 = value;
          _this.beginTime2.config.max = {
            year: date.year,
            month: date.month - 1, //关键
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
        },
        ready: function () {
          // endTime2.hint('当前月日期为黑色<br/>所选日期需小于当前日期');
        }
      });
      // this.getApproveCaseList();
      // this.getApproveHistoryList();
    }
  }
</script>


<style scoped>
  @import '../../assets/css/case_common.css';
  @import "../../assets/css/commom.css";

   .searchCondition {
    height:0.56rem;
    width: 100%;
    display: flex;
    font-size: 0.14rem;
    padding-left: 0.2rem;
    align-items: center;
    color: #606266;
    line-height:0.56rem;
    justify-content: flex-end;
    padding-right: 0.2rem;
  }
  .scItem{
    min-width: 68px;
    color: #99c9fa;
  }
  .scItemP{
    margin:0 0.1rem;
    color: #99c9fa;
  }
  .scItemBtn{
    margin-left: 0.1rem;
  }
  .scItemBtn .el-button{
    width: 0.8rem;
    height:0.3rem;
    font-size:0.14rem;
    padding:0;
  }
  .scItemBtn .el-button+.el-button{
    margin-left: 0.1rem;
  }
  .searchCondition .caseNameSelect {
    width: 1.87rem;
    font-size: 0.14rem;
    /* color: #606266; */
    color: #99C9FA;
    height:0.3rem;
    line-height: 0.3rem;
    margin-right:0.15rem;
  }
  .searchCondition .timeSelect{
    margin-right:0;
  }

  .itemIcon img {
    width: 100%;
    height: 100%;
  }



  .contentTitle {
    height: 0.56rem;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .contentTitleItem {
    width: 1rem;
    height: 0.32rem;
    text-align: center;
    line-height: 0.32rem;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color:#99c9fa;
    font-size:0.12rem;
    background: url('../../assets/images/videoNewImg/btnhover.png') no-repeat center center / 100% 100%;
  }
  .contentTitleItem:hover{
    background: url('../../assets/images/videoNewImg/btnhover.png') no-repeat center center / 100% 100%;
  }

  .needApprove {
    margin-left: 0.2rem;
  }


  .contentTitleItem.on{
    color:#3b9df4;
  }
  .needApproveContainer {
    width: 100%;
    height: calc(100% - 0.56rem);
    position: relative;
    display: flex;
    flex-direction: column;
  }

  /* .needApproveTitle {
    height: 0.54rem;
    display: flex;
    width: 100%;
    align-items: center;
  }

  .needApproveTitleIcon {
    height: 35%;
    width: 2px;
    background-color: #58A9FF;
    margin-left: 0.2rem;
  }

  .needApproveTitleTxt {
    color: #58A9FF;
    margin-left: 0.1rem;
  } */

  .searchCondition /deep/ .el-button + .el-button {
    margin-left: 0;
  }


  .approveBtn {
    width: 80px;
    height: 30px;
    background-color: #E6A23C;
    color: white;
    border-radius: 3px;
    margin: 5px auto;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .playBtn {
    width: 80px;
    height: 30px;
    background-color: #67C23A;
    color: white;
    border-radius: 3px;
    margin: 5px auto;
    margin-left: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pageNation {
    margin-top: 5px;
    width: 100%;
    height: 30px;
  }

  .contentTable {
    margin-top: 0.2rem;
    padding-left: 15px;
    padding-right: 15px;
  }

</style>

