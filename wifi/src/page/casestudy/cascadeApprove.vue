<!--
 * @Author: chenxf
 * @Date: 2020-05-17 16:47:07
 * @LastEditTime : 2020-09-01 14:47:18
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\page\casestudy\cascadeApprove.vue
 * @
 -->
<template>
  <div class="wrapper">
    <!-- <div class="topNav">
      <router-link class="nav-item" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}"></router-link>
      <div class="nav-item nav-item-search">串并案审批</div>
    </div> -->
    <div class="topInfo">
        <img src="../../assets/updataImg/location.png" alt="">
        <span class="sysname childname">当前位置：</span>
        <router-link class="sysname" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 > </router-link>
        <p class="sysname">&nbsp;串并案审批</p>
    </div>

    <div class="contentBody">
      <div class="content">
        <div class="contentTitle">
          <div @click="changeItem(1)" id="tabItem1" style="margin-right:0.2rem" class="contentTitleItem needApprove commBtn">
            <img v-show="imgFlag1" style="margin-right: 7px;height: 12px" src="../../assets/case/needapprove-icon-white.png" alt="">
            <img v-show="!imgFlag1" style="margin-right: 7px;height: 12px" src="../../assets/case/needapprove-icon.png" alt="">
            待审批
          </div>
          <div @click="changeItem(2)" id="tabItem2" class="contentTitleItem  approveHistory commBtn">
            <img v-show="imgFlag2" style="margin-right: 7px;height: 12px" src="../../assets/case/history-icon-white.png" alt="">
            <img v-show="!imgFlag2" style="margin-right: 7px;height: 12px" src="../../assets/case/history-icon.png" alt="">
            审批历史
          </div>

          <div v-show="imgFlag1" class="searchCondition">
            <div class="scItem">串并案名称:&nbsp;&nbsp;</div>
            <input type="text" class="caseNameSelect" v-model="caseName" placeholder="请输入串并案名称">
            <div class="scItem">创建时间:&nbsp;&nbsp;</div>
            <el-input id="beginTime" autocomplete="off" class="caseNameSelect timeSelect" placeholder="请选择开始时间" v-model="beginDateTime"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
            </el-input>
            <p class="scItemP">-</p>
            <el-input id="endTime" class="caseNameSelect timeSelect" autocomplete="off" placeholder="请选择结束时间" v-model="endDateTime"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
            </el-input>
            <div class="scItemBtn">
              <el-button type="primary" class="searchBtn" icon="el-icon-search" @click="pageNo = 1;getApproveCaseList()">查询</el-button>
              <el-button type="warning" class="tryBtn" icon="el-icon-refresh" @click="getReset1()">重置</el-button>
            </div>
          </div>

          <div v-show="imgFlag2" class="searchCondition">
            <div class="scItem">串并案名称:&nbsp;&nbsp;</div>
            <input type="text" class="caseNameSelect" v-model="caseName2" placeholder="请输入串并案名称">
            <div class="scItem">审批时间:&nbsp;&nbsp;</div>
            <input id="beginTime2" class="caseNameSelect timeSelect" autocomplete="off" placeholder="请选择开始时间" v-model="beginDateTime2">
            <p class="scItemP">-</p>
            <input id="endTime2" class="caseNameSelect timeSelect" autocomplete="off" placeholder="请选择结束时间" v-model="endDateTime2">
            <div class="scItemBtn">
              <el-button type="primary" class="searchBtn" icon="el-icon-search" @click="pageNo2 = 1;getApproveHistoryList()">查询</el-button>
              <el-button type="warning" class="tryBtn" icon="el-icon-refresh" @click="getReset2()">重置</el-button>
            </div>
          </div>


        </div>
        <!--待我审批页面-->
        <div id="tab1" class="needApproveContainer">
          <!-- <div class="needApproveTitle">
            <div class="needApproveTitleIcon"></div>
            <div class="needApproveTitleTxt">串并案待审批列表</div>
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
                  prop="caseName"
                  align="center"
                  show-overflow-tooltip
                  label="串并案名称">
                </el-table-column>
                <el-table-column
                  prop="comboState"
                  align="center"
                  show-overflow-tooltip
                  label="串并案状态">
                </el-table-column>
                <el-table-column
                  prop="createUser"
                  align="center"
                  show-overflow-tooltip
                  label="创建用户">
                </el-table-column>
                <el-table-column
                  prop="creatorOrg"
                  align="center"
                  show-overflow-tooltip
                  label="创建部门">
                </el-table-column>
                <el-table-column
                  prop="updateTime"
                  align="center"
                  show-overflow-tooltip
                  label="提交审批时间">
                </el-table-column>
                <el-table-column
                  prop="description"
                  align="center"
                  show-overflow-tooltip
                  label="串并案描述">
                </el-table-column>

                <el-table-column label="操作" align="center"  width="200">
                  <template slot-scope="scope">
                    <div>
                      <el-button  size="mini"  type="primary"  class="searchBtn"  icon='el-icon-caret-right'  @click="goToApprovePlayer(scope.row)">播放</el-button>
                      <!--<div class="approveBtn" @click="goToApprovePage(scope.row)"><img style="margin-right: 7px" src="../../assets/case/approve-icon.png" alt="">审批</div>-->
                      <!--<div class="playBtn" @click="goToApprovePlayer(scope.row)"><img style="margin-right: 7px" src="../../assets/case/player-ico.png" alt="">播放</div>-->
                      <el-button  size="mini"  type="warning"  class="tryBtn"  @click="goToApprovePage(scope.row)">
                        <img style="margin-right: 7px;vertical-align: -1px;" src="../../assets/case/approve-icon.png" alt="">审批
                      </el-button>


                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pageNation">
              <pagination :total="totalNum" :current-page="pageNo" :page-size="pageSize" @sizeChange="handleSizeChange" @currentChange="handleCurrentChange"></pagination>

              <!-- <el-pagination style="float: right;margin-right: 10px;"
               :background=true
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page="Number(pageNo)"
               :page-sizes="[10, 20, 30, 40, 50, 100]"
               :page-size="Number(pageSize)"
               layout="total, sizes, prev, pager, next, jumper"
               :total=Number(totalNum)>
              </el-pagination> -->
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
                  prop="caseName"
                  align="center"
                  show-overflow-tooltip
                  label="串并案名称">
                </el-table-column>
                <!--<el-table-column-->
                  <!--prop="comboState"-->
                  <!--align="center"-->
                  <!--show-overflow-tooltip-->
                  <!--label="案件状态">-->
                <!--</el-table-column>-->
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
                  prop="comboCaseState"
                  align="center"
                  show-overflow-tooltip
                  label="审批状态"
                  :formatter="formatStatus">
                </el-table-column>
                 <!-- <el-table-column
                  prop="twiceApprovalStatus"
                  align="center"
                  show-overflow-tooltip
                  label="二级审批状态"
                  :formatter="formattwiceStatus">
                </el-table-column> -->
                <el-table-column
                  prop="approveOption"
                  align="center"
                  show-overflow-tooltip
                  label="审批意见">
                </el-table-column>
                <el-table-column label="操作" align="center" width="250">
                  <template slot-scope="scope">
                    <el-button  size="mini"  type="success"  icon="el-icon-view"  class="topBtn"  @click="goToLookApprovePage(scope.row)">查看</el-button>
                    <!-- <el-button  size="mini" v-show="showclomn == 2 && (scope.row.twiceApprovalStatus == 2 || scope.row.twiceApprovalStatus == null)"  type="primary"  class="searchBtn"  icon='el-icon-caret-right'  @click="getSubmitTocase(scope.row)">并案审批</el-button> -->
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="pageNation">
            <pagination :total="totalNum2" :current-page="pageNo2" :page-size="pageSize2" @sizeChange="handleSizeChange2" @currentChange="handleCurrentChange2"></pagination>
            <!-- <el-pagination style="float: right;margin-right: 10px;"
             :background=true
             @size-change="handleSizeChange2"
             @current-change="handleCurrentChange2"
             :current-page="Number(pageNo2)"
             :page-sizes="[10, 20, 30, 40, 50, 100]"
             :page-size="Number(pageSize2)"
             layout="total, sizes, prev, pager, next, jumper"
             :total=Number(totalNum2)>
            </el-pagination> -->
          </div>
        </div>
      </div>
      <footer_case></footer_case>
    </div>
  </div>
</template>

<script>
  import vehicle from '../../api/vehicle/vehicle.js'
  import '../../common/laydate/laydate.js'
  import Footer_case from "../../components/footer_case";
  export default {
    components: {Footer_case},
    data() {
      return {
        imgFlag1: true,
        imgFlag2: false,
        pageNo: 1,
        pageSize: 10,
        totalNum: 0,
        beginDateTime: "",
        endDateTime: "",
        caseName: '',
        pageNo2: 1,
        pageSize2: 10,
        totalNum2: 0,
        beginDateTime2: "",
        endDateTime2: "",
        caseName2: '',
        orderBy2: "approveTime",
        orderType2: "desc",
        createUser: '',
        comboState: 0,
        casCaseList: [],
        casApproveList: [],
        beginTime:null,
        endTime:null,
        beginTime2:null,
        endTime2:null,
        showclomn:1,
        ishis:false
      }
    },
    mixins: [vehicle],
    created(){
      this.showclomn = sessionStorage.getItem('currentDeploymentType')
      this.ishis = this.$route.query.his
    },
    methods: {
      //串并待审批列表
      getApproveCaseList() {
        this.$http({
          url: 'pca/approve/approveComboCase/approveWaitList',
          method: 'get',
          params: {
            startTime: this.beginDateTime,
            endTime: this.endDateTime,
            caseName: this.caseName,
            pageSize: this.pageSize,
            pageNum: this.pageNo
          }
        }).then(res => {
         if(res.statusText==='OK'&& res.data.code === 200){
           this.casCaseList = res.data.data.list;
           this.totalNum = res.data.data.totalCount
         }else{
            this.$notify({
              type: 'error',
              message: '获取串并案待审批列表失败！',
              position: 'bottom-right',
              duration: 3000
            });
          //  layer.alert("获取串并案待审批列表失败！",{icon:5,title:"消息提示"});
         }
        })
      },
      //历史审批列表
      getApproveHistoryList() {
        this.$http({
          url: 'pca/approve/approveComboCase/approvedList',
          method: 'get',
          params: {
            startTime: this.beginDateTime2,
            endTime: this.endDateTime2,
            caseName: this.caseName2,
            pageSize: this.pageSize2,
            pageNum: this.pageNo2,
            orderBy: this.orderBy2,
            orderType: this.orderType2
          }
        }).then(res => {
          if(res.statusText==='OK'&& res.data.code === 200) {
            this.casApproveList = res.data.data.list;
            this.totalNum2 = res.data.data.totalCount;
          }else{
            this.$notify({
              type: 'error',
              message: '获取串并案历史审批列表失败！',
              position: 'bottom-right',
              duration: 3000
            });
          }
        })
      },
      //状态码判断
      formatStatus(row, column,cellValue) {
        if(cellValue == 2){
          return '审批通过';
        }else if (cellValue == 3){
          this.disabled = true
          return '审批不通过';
        }else if(cellValue == null){

        }
      },
      // formatStatus(row, column,cellValue) {
      //   if(cellValue == 1){
      //     return '审批通过';
      //   }else if (cellValue == 2){
      //     return '审批不通过';
      //   }else if(cellValue == null){

      //   }
      // },
      formattwiceStatus(row, column,cellValue) {
        if(cellValue == 1){
          return '二次审批中';
        }else if (cellValue == 2){
          return '二次审批通过';
        }else if(cellValue == 3){
          return '二次审批不通过。'
        }else if(cellValue == null){
          return ''
        }
      },

      // 串并案上传到案件库
      getSubmitTocase(row){
        // console.log(row,2222);
        // return
        console.log('YYYYYYYYYYY');
        let data = {
          caseCombinationId:row.targetId
        }
        data = this.$qs.stringify(data)
        this.$http.post('vsas/merge/case/upload/caseCombination',data).then(res=>{
          if(res.data.code == 200){
            this.getApproveHistoryList();
            this.$notify({
              type: 'success',
              message: '提交成功',
              position: 'bottom-right',
              duration: 3000
            });
          }else{
            this.$notify({
              type: 'success',
              message: '提交失败',
              position: 'bottom-right',
              duration: 3000
            });
          }
        })
      },

      //重置
      getReset1(){
        console.log('测试流程225 - 226');
        this.caseName="";
        this.beginDateTime="";
        this.endDateTime="";
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
      getReset2(){
        this.caseName2="";
        this.beginDateTime2="";
        this.endDateTime2="";
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
        this.pageNo = 1;
        if(tabNum == 1){
          this.imgFlag1 = true;
          this.imgFlag2 = false;
          this.caseName2 = ''
          this.getApproveCaseList();
          document.getElementById('tabItem1').className = "contentTitleItem needApprove on commBtn";
          document.getElementById('tabItem2').className = "contentTitleItem approveHistory commBtn";
          document.getElementById('tab1').style.display='block';
          document.getElementById('tab2').style.display='none';
        }else if(tabNum == 2){
          this.imgFlag1 = false;
          this.imgFlag2 = true;
          this.caseName = ''
          this.getApproveHistoryList();
          document.getElementById('tabItem1').className = "contentTitleItem needApprove commBtn";
          document.getElementById('tabItem2').className = "contentTitleItem approveHistory on commBtn";
          document.getElementById('tab1').style.display='none';
          document.getElementById('tab2').style.display='block';
        }
      },
      //待审批列表分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.pageNo  = 1;
        this.getApproveCaseList();
      },
      handleCurrentChange(val) {
        this.pageNo = val;
        this.getApproveCaseList();
      },

     //历史审批列表分页
      handleSizeChange2(val) {
        this.pageSize2 = val;
        this.pageNo2 = 1;
        this.getApproveHistoryList();
      },
      handleCurrentChange2(val) {
        this.pageNo2 = val;
        this.getApproveHistoryList();
      },
      //跳转审批页
      goToApprovePage(obj) {
        this.$router.push({
          path: '/casestudy/editMyApprovePage?menuCode=211',
          query: {
            caseCombinationId: obj.caseCombinationId,
            mycode:6
          }
        })
      },
      //跳转播放页
      goToApprovePlayer(obj) {
        // this.$router.push({
        //   path: '/casestudy/casCadePlayer?menuCode=211',
        //   query: {
        //     caseCombinationId: obj.caseCombinationId
        //   }
        // });
        let routeData = this.$router.resolve({ path: '/casestudy/casCadePlayer', query: { caseCombinationId: obj.caseCombinationId,menuCode: 211}});
        window.open(routeData.href, '_blank');
      },
      //跳转查看页面
      goToLookApprovePage(obj){
        this.$router.push({
          path: '/casestudy/lookApprovePage?menuCode=211',
          query: {
            approveId: obj.approveId
          }
        })
      }
    },
    mounted: function () {
      document.getElementsByClassName("needApprove")[0].click();
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
        max: 1,//this.getCurrentDate(),
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
      this.getApproveCaseList();
      this.getApproveHistoryList();
      if(this.ishis){
        this.changeItem(2)
      }
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
    padding:0 10px;
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

