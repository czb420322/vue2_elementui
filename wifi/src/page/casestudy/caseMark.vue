<template>
  <div class="wrapper">
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt="">
      <span class="sysname childname">当前位置：</span>
      <router-link class="nav-item sysname" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 ></router-link>
      <div class="nav-item nav-item-search sysname">&nbsp;案件评分</div>
    </div>

    <div class="contentBody">
      <div class="content">
        <div class="contentTitle">
          <div  @click="changeItem(1)" id="tabItem1" class="contentTitleItem needApprove on">
            <img v-show="imgFlag1" style="margin-right: 7px;height: 12px" src="../../assets/case/caseMark-icon-white.png" alt="">
            <img v-show="!imgFlag1" style="margin-right: 7px;height: 12px" src="../../assets/case/caseMark-icon.png" alt="">
            案件评分
          </div>
          <div   @click="changeItem(2)" id="tabItem2" class="contentTitleItem  approveHistory">
            <img v-show="imgFlag2"  style="margin-right: 7px;height: 12px" src="../../assets/case/caseMarkSet-icon-white.png" alt="">
            <img  v-show="!imgFlag2" style="margin-right: 7px;height: 12px" src="../../assets/case/caseMarkSet-icon.png" alt="">
            评分设置
          </div>
          <div class="searchCondition" v-show="imgFlag1">
            <div class="searchConditionContainer">
              <div class="scItem">关键字:&nbsp;&nbsp; </div>
              <input type="text" class="caseNameSelect timeSelect timeSelectkey" placeholder="请输入关键字" v-model="keywords">
              <div class="scItem">案发时间:&nbsp;&nbsp; </div>
              <el-input id="beginTime" class="caseNameSelect timeSelect" placeholder="请选择开始时间" autocomplete="off" v-model="beginDateTime"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
              </el-input>
              <p class="scItemP">-</p>
              <el-input id="endTime" class="caseNameSelect" placeholder="请选择结束时间" autocomplete="off" v-model="endDateTime"> <i slot="prefix" class="el-input__icon el-icon-time"></i>
              </el-input>
               <div class="scItemBtn">
                <el-button type="primary" class="searchBtn" icon="el-icon-search" @click="historyNal()">查询</el-button>
                <el-button type="warning" class="tryBtn" icon="el-icon-refresh" @click="resetSeek()">重置</el-button>
              </div>
            </div>
          </div>
        </div>
        <!--案件评分页面-->
        <div id="tab1" class="needApproveContainer">
          <!-- <div class="needApproveTitle">
            <div class="needApproveTitleIcon"></div>
            <div class="needApproveTitleTxt">案件评分列表</div>
          </div> -->

          <!-- <div class="searchCondition">
            <div class="searchConditionContainer">
              <div class="scItem">关键字:&nbsp;&nbsp; </div>
              <input type="text" class="caseNameSelect timeSelect" placeholder="请输入关键字搜索" v-model="keywords">
              <div class="scItem">案发时间:&nbsp;&nbsp; </div>
              <input id="beginTime" class="caseNameSelect timeSelect" placeholder="选择开始日期" v-model="beginDateTime" >
              <p class="scItemP">到</p>
              <input id="endTime" class="caseNameSelect" placeholder="选择结束日期" v-model="endDateTime"  >

              <div class="btnSearch" @click="getMarkList()"><span class="el-icon-search">查询</span></div>
              <div class="btnSearch1" @click="resetSeek()"><span class="el-icon-refresh">重置</span></div>
            </div>
          </div> -->
          <div class="contentTable">
            <div class="table">
              <el-table
                :data="caseMarkList"
                max-height="500"
                style="width:100%;"
                border>
                <div slot="empty">
                  <div class="noImg" v-if="showNoImg">
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
                  prop="caseAbstract"
                  align="center"
                  show-overflow-tooltip
                  label="案件描述">
                </el-table-column>
                <el-table-column
                  prop="caseCategoryDesc"
                  align="center"
                  show-overflow-tooltip
                  label="案件类型">
                </el-table-column>
                <el-table-column
                  prop="creatorName"
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
                  prop="caseLevelDesc"
                  align="center"
                  show-overflow-tooltip
                  label="危害程度">
                </el-table-column>
                <el-table-column
                  prop="timeLowLimit"
                  align="center"
                  show-overflow-tooltip
                  label="案发时间">
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  align="center"
                  show-overflow-tooltip
                  label="更新时间">
                </el-table-column>
                <el-table-column
                  prop="compositeScore"
                  align="center"
                  show-overflow-tooltip
                  label="综合评分">
                </el-table-column>

                <el-table-column label="操作" align="center"  min-width="150" >
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="success"
                      icon="el-icon-view"
                      class="topBtn"
                      @click="lookCase(scope.row,scope.$index)">查看</el-button>
                       <el-button
                      size="mini"
                      type="warning"
                      icon="el-icon-edit"
                      class="tryBtn"
                      @click=" markCase(scope.row,scope.$index)">评分</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="pageNation">
            <el-pagination style="float: right;margin-right: 10px;"
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
        <!--评分设置页面-->
        <div id="tab2" class="needApproveContainer setMark">
          <!-- <div class="needApproveTitle">
            <div class="needApproveTitleIcon"></div>
            <div class="needApproveTitleTxt">评分设置</div>
          </div> -->
          <div class="contentTable">
            <table>
              <thead>
                <tr>
                  <th>序号</th>
                  <th>规则描述</th>
                  <th>规则分数</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in setScoreList" :key="index">
                  <td>{{index+1}}</td>
                  <td><span :id="'ruleDesc_'+index">{{item.describ}}</span><input :id="'ruleDescIn_'+index" type="text" maxlength="50" v-model="item.describ"></td>
                  <td><span :id="'ruleScore_'+index">{{item.score}}</span><input class="scoreIn" :id="'ruleScoreIn_'+index" type="number" min="1" max="50" maxlength="50"  @keyup="checkScoreInput(item.score)" v-model="item.score" ></td>
                  <td style="width: 320px">
                    <div class="btnWrapper">
                      <el-button
                        :id="'ruleSave_'+index"
                        class="ruleSave topBtn"
                        size="mini"
                        type="success"
                        icon="el-icon-tickets"
                        @click="saveScoreSet(item,index)">保存</el-button>
                      <el-button
                        :id="'ruleEdit_'+index"
                        class="ruleEdit searchBtn "
                        size="mini"
                        type="warning"
                        icon="el-icon-edit"
                        @click="editScoreSet(item,index)">编辑</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        icon='el-icon-delete'
                        class="delBtn "
                        @click="deleteScoreSet(item,index)"
                      >删除</el-button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td><input id="addDesc" type="text" maxlength="50" v-model="addScoreDescribe"></td>
                  <td><input class="scoreIn" id="addScore" type="number" min="1" max="100"  ref="inputValue" @keyup="checkScoreInput(addScoreMark)" v-model="addScoreMark"></td>
                  <td>
                    <div class="btnWrapper">
                      <el-button
                        id="ruleSaveNew"
                        class="ruleSave topBtn"
                        size="mini"
                        type="success"
                        icon="el-icon-tickets"
                        @click="saveNewScoreSet()">保存</el-button>
                      <el-button
                        id="addMark"
                        class="addMarkRule topBtn"
                        size="mini"
                        type="success"
                        icon="el-icon-plus"
                        @click="addScoreSet()"></el-button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <footer_case></footer_case>
    </div>
    <!--案件详情弹窗-->
    <el-dialog
      title="案件详情"
      :visible.sync="dialogVisible"
      width="40%"
     >
      <div  class="dialogDetailContainer">
        <ul>
          <li>
            <div class="firstSpan"><span class="itemKey">案件名称: &nbsp;</span><span class="itemValue" v-text="caseMarkDetialObj.caseName">&nbsp;</span></div>
            <div class="secondSpan"><span class="itemKey ">案件编号:&nbsp;</span><span class="itemValue policeNo" v-text="caseMarkDetialObj.alarmLinkMark">&nbsp;</span></div>
          </li>
          <li>
            <div  class="firstSpan"><span class="itemKey">案发时间:&nbsp;</span><span class="itemValue" v-text="caseMarkDetialObj.timeUpLimit">&nbsp;</span></div>
            <div class="secondSpan"><span class="itemKey ">案件状态:&nbsp;</span>
                 <span v-if="caseMarkDetialObj.state==0">新建</span>
                 <span v-else-if="caseMarkDetialObj.state==1">已立案</span>
                 <span v-else-if="caseMarkDetialObj.state==2">已侦破</span>
                 <span v-else-if="caseMarkDetialObj.state==3">侦破待复核</span>
                 <span v-else-if="caseMarkDetialObj.state==4">已结案</span>
                 <span v-else-if="caseMarkDetialObj.state==5">结案待复核</span>
                 <span v-else-if="caseMarkDetialObj.state==6">并案待复核</span>
                 <span v-else-if="caseMarkDetialObj.state==7">撤案待复核</span>
                 <span v-else-if="caseMarkDetialObj.state==8">结案归档</span>
                 <span v-else-if="caseMarkDetialObj.state==9">并案归档</span>
                 <span v-else-if="caseMarkDetialObj.state==10">撤案归档</span>
                 <span v-else></span>
            </div>
          </li>
          <li>
            <div  class="firstSpan"><span class="itemKey">案发区域:&nbsp;</span><span class="itemValue" v-text="caseMarkDetialObj.regionFullName"></span></div>
            <div class="secondSpan"><span class="itemKey ">审批状态:&nbsp;</span>
                 <span v-if="caseMarkDetialObj.approvalStatus==0">新建</span>
                 <span v-else-if="caseMarkDetialObj.approvalStatus==1">审批中</span>
                 <span v-else-if="caseMarkDetialObj.approvalStatus==2">审批通过</span>
                 <span v-else-if="caseMarkDetialObj.approvalStatus==3">审批不通过</span>
                 <span v-else></span>
           </div>
          </li>
          <li>
              <div><span class="itemKey">案发地址:&nbsp;</span><span class="itemValue" v-text="caseMarkDetialObj.placeFullAddress">&nbsp;</span></div>
          </li>
          <li>
              <div class="secondSpan"><span class="itemKey ">受理单位:&nbsp;</span><span class="itemValue" v-text="caseMarkDetialObj.creatorOrg">&nbsp;</span></div>
          </li>
          <li>
              <div class="secondSpan"><span class="itemKey ">案件类型:&nbsp;</span><span class="itemValue" v-text="caseMarkDetialObj.caseCategoryDesc">&nbsp;</span></div>
              <div  class="firstSpan"><span class="itemKey">危害程度:&nbsp;</span><span class="itemValue" v-text="caseMarkDetialObj.caseLevelDesc">&nbsp;</span></div>
          </li>
          <li>
              <div  class="firstSpan"><span class="itemKey">作案时机:&nbsp;</span><span class="itemValue"  v-text="caseMarkDetialObj.caseOpportunityDesc">&nbsp;</span></div>
              <div class="secondSpan"><span class="itemKey ">作案手段:&nbsp;</span><span class="itemValue" v-text="caseMarkDetialObj.caseMethodDesc">&nbsp;</span></div>
          </li>
          <li>
            <div  class="firstSpan"><span class="itemKey">作案工具:&nbsp;</span><span class="itemValue" v-text="caseMarkDetialObj.caseToolDesc">&nbsp;</span></div>
            <div class="secondSpan"><span class="itemKey ">侵犯目标:&nbsp;</span><span class="itemValue" v-text="caseMarkDetialObj.caseTargetDesc">&nbsp;</span></div>
          </li>
          <li>
            <div ><span class="itemKey ">案件描述:&nbsp;</span><span v-text="caseMarkDetialObj.caseAbstract"></span></div></li>
          <li>
            <el-button type="primary" style="width: 100px;height: 36px">综合评分</el-button>
          </li>
          <li style="margin-top: 15px">
            <el-radio-group v-model="radio">
              <el-radio :label="1">优</el-radio>
              <el-radio :label="2" >良</el-radio>
              <el-radio :label="3" >中</el-radio>
              <el-radio :label="4" >差</el-radio>
            </el-radio-group>
          </li>
        </ul>
      </div>
      <div class="line"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" style="width: 100px;height: 36px;" @click=" goToSpaceMessage(caseMarkDetialObj); dialogVisible= false" >时空信息</el-button>
        <el-button @click="dialogVisible= false"   style="width: 70px;height: 36px;">关闭</el-button>
      </span>
    </el-dialog>
    <!--评分设置弹窗-->
    <el-dialog
      title="评分"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible2"
      width="50%"
    >
      <div  class="dialogDetailContainer">
        <div class="titlebox">
          <div :title="socreCaseObj.caseName"><span class="itemKey">案件名称:&nbsp;</span><span class="itemValue" v-text="socreCaseObj.caseName"></span></div>
          <div><span class="itemKey ">案件编号:&nbsp;</span><span class="itemValue policeNo" v-text="socreCaseObj.caseLinkMark"></span></div>
          <div>
            <span>案件评分:&nbsp;</span> <span style="color:#c2f8b8" v-text="totalScroe"></span> <span>分</span>
            <!--<span>综合评价:&nbsp;</span> <span style="color:#49A2FF" v-text="scrodeGrade">&nbsp;</span>-->
          </div>
        </div>

        <ul>
          <!-- <li>
            <div><span class="itemKey">案件名称:&nbsp;</span><span class="itemValue" v-text="socreCaseObj.caseName"></span></div>
          </li>
          <li>
            <div><span class="itemKey ">案件编号:&nbsp;</span><span class="itemValue policeNo" v-text="socreCaseObj.caseLinkMark"></span></div>
          </li>
          <li  style="justify-content: flex-end;">
            <div>
              <span>总分:&nbsp;</span> <span style="color:#49A2FF" v-text="totalScroe"></span>
            </div>
          </li> -->
          <li class="table">
            <el-table
              :data="socreCaseRulesList"
              height="4rem"
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
                prop="describ"
                align="center"
                show-overflow-tooltip
                label="规则描述">
              </el-table-column>
              <el-table-column
                prop="score"
                align="center"
                show-overflow-tooltip
                label="规则分数">
              </el-table-column>
              <el-table-column label="操作" align="center"  min-width="150" >
                <template slot-scope="scope">
                  <el-checkbox @change="calcCaseMark(scope.row,scope.$index)" v-model="checkList[scope.$index].isChecked"  class="markCheckBox"></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </li>
        </ul>
      </div>
      <!-- <div class="line"></div> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2= false"  class="cancleBtn" >关闭</el-button>
        <el-button @click="markRecord(socreCaseObj.caseUuid,socreCaseObj.caseName);dialogVisible3= true; dialogVisible2= false" class="rejectBtn" type="warning" >评分记录</el-button>
        <el-button type="primary"  class="passBtn" @click="saveCaseRule">保存评分</el-button>
      </span>
    </el-dialog>
    <!--评分记录弹窗-->
    <el-dialog
      title="评分记录"
      :visible.sync="dialogVisible3"
      width="50%"
    >
      <div  class="dialogDetailContainer">
        <ul>
          <li>
            <div><span class="itemKey">案件名称:&nbsp;</span><span class="itemValue" v-text="socreCaseObj.caseName"></span>  </div>
          </li>
          <li class="table">
            <el-table
              :data="markRecordList"
              max-height="4rem"
              style="width:100%;"
              border>
              <div slot="empty">
                <div class="noImg" v-if="showmarkImg">
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
                prop="userName"
                align="center"
                show-overflow-tooltip
                label="评分人">
              </el-table-column>
              <el-table-column
                prop="operationTime"
                align="center"
                show-overflow-tooltip
                label="评分时间">
              </el-table-column>
              <el-table-column
                prop="compositeScore"
                align="center"
                show-overflow-tooltip
                label="最终评分">
              </el-table-column>
            </el-table>
          </li>
        </ul>
      </div>
      <!-- <div class="line"></div> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3= false" class="cancleBtn"  >关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import vehicle from '../../api/vehicle/vehicle.js'
  import '../../common/laydate/laydate.js'
  import Footer_case from "../../components/footer_case";
  export default {
    components: {
      Footer_case
    },
    data() {
      return {
        imgFlag1:true,
        imgFlag2:false,
        dialogVisible: false,
        dialogVisible2:false,
        dialogVisible3:false,
        checked:true,
        radio:1,
        pageNo: 1,
        pageSize: 10,
        totalNum: 0,

        beginDateTime: "",
        endDateTime: "",
        markTableList:[],
        caseMarkList:[],
        caseMarkDetialObj:'',
        socreCaseObj:'',
        socreCaseRulesList:[],
        totalScroe:0,
        scrodeGrade:'差',
        keywords:'',
        checkList:[],
        ruleIdsList:[],
        setScoreList:[],
        setTotalScore:0,
        addScoreDescribe:'',
        addScoreMark:0,
        markRecordList:[],

        beginTime:null,
        endTime:null,
        endDateTime1: this.getCurrentDate().split(" ")[0] + " " + "23:59:59",
        showNoImg: false,
        showmarkImg:false
      }
    },
    mixins: [vehicle],
    mounted: function () {
      document.getElementsByClassName("needApprove")[0].click();
      let _this =this;
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
        max: this.endDateTime1,
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
      this.historyNal();  //初始化列表
      this.getSetScoreList()
    },
    methods: {
      historyNal(){
        this.pageNo = 1;
        this.getMarkList()
      },
      getMarkList(){
        let params = {
          startTime:this.beginDateTime,
          endTime:this.endDateTime,
          keyword:this.keywords,
          pageSize:this.pageSize,
          pageNum:this.pageNo
        };
        let data = this.$qs.stringify(params);
        this.$http({
          url:'pca/caseRule/caseList',
          method:'post',
          data:data
        }).then((res)=>{
          if(res.statusText=='OK'&& res.data.code==200){
             if(!this.caseMarkList.length){
              this.showNoImg = true
            }
            this.caseMarkList = res.data.data.list;
            this.totalNum = res.data.data.totalCount
          }else if(res.data.code == 100){
            this.$notify({
                 type: 'success',
                 title: '',
                 message: res.data.data,
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert(res.data.data,{icon:5,title:"消息提示"});
          }else{
               this.$notify({
                 type: 'error',
                 title: '',
                 message: "获取案件评分列表失败！",
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert("获取案件评分列表失败！",{icon:5,title:"消息提示"});
          }
        }).catch( err=>{
          // console.log(err)
        })
      },
      handleSizeChange(val) {
        this.pageSize=val;
        this.getMarkList();
      },
      handleCurrentChange(val) {
        this.pageNo=val;
        this.getMarkList();
      },
      //重置
      resetSeek(){
        this.beginDateTime = '';
        this.endDateTime = '';
        this.keywords ='';
        this.pageNo = 1;
        this.getMarkList();
        let maxDate =  {
          year: new Date().getFullYear(),
          month: new Date().getMonth(), //关键
          date: new Date().getDate(),
          hours: new Date().getHours(),
          minutes: new Date().getMinutes(),
          seconds: new Date().getSeconds()
        };
        this.beginTime.config.max = maxDate;
        this.endTime.config.min = '1900-01-01 00:00:00'
      },
      //查看
      lookCase(data,index){
        // this.$http({
        //   url:'pca/caseRule/getCaseInfo',
        //   method:'post',
        //   params:{
        //     caseUuid:data.caseUuid
        //   }
        // }).then((res)=>{
        //   if(res.statusText=='OK'&& res.data.code==200){
        //     this.caseMarkDetialObj=res.data.data;
        //     let score=this.caseMarkDetialObj.compositeScore;
        //     if(score>=80){  //0-60 差 60-80 中 80-100优
        //         this.radio=1
        //     }else if(score>=60&&score<80){
        //         this.radio=3
        //     }else if(score<60){
        //          this.radio=4
        //      }else {
        //          this.radio=2
        //      }
        //     this.dialogVisible = true
        //   }
        // }).catch( res=>{
        //   console.log(res)
        // })
        let routeData = this.$router.resolve({ path: '/casestudy/casePicture_look', query: { caseUuid:data.caseUuid ,menuCode: 221,isgrade:true}});
        window.open(routeData.href, '_blank');
      },
      //评分
      markCase(dataObj,index){
        this.socreCaseObj = dataObj;
        this.totalScroe = 0;
        this.ruleIdsList = [];
        let params = {
          caseUuid:dataObj.caseUuid
        };
        let data = this.$qs.stringify(params);
        this.$http({
          url:'pca/caseRule/caseRuleRelList',
          method:'post',
          data:data
        }).then((res)=>{
          if(res.statusText=='OK'&& res.data.code==200){
            this.socreCaseRulesList = res.data.data;
            let oldCheckedList = this.socreCaseRulesList;
            this.checkList = oldCheckedList.map( a => {
              return {isChecked: Boolean(a.meetRule)}
            });
            let scoreObj=this.socreCaseRulesList;
            for( let i=0;i<scoreObj.length;i++){
              if(Boolean(scoreObj[i].meetRule)){
                this.totalScroe += scoreObj[i].score;
                this.ruleIdsList.push(scoreObj[i].ruleId)
              }
            }
          }else{
            this.$notify({
                type: 'error',
                title: '',
                message: '获取案件评分信息失败！',
                position: 'bottom-right',
                duration:3000
              });
            // layer.alert("获取案件评分信息失败！",{icon:5,title:"消息提示"});
          }
        }).catch( err=>{
          console.log(err)
        });
        this.dialogVisible2 = true;
      },
      //计算总分数
      calcCaseMark(data,index){
        let caseChecked=document.getElementsByClassName("markCheckBox");
        let currentChecked = caseChecked[index].children[0].children[1].checked;
        if(currentChecked){
            this.totalScroe += data.score;
            this.ruleIdsList.push(data.ruleId);
          // if(this.totalScroe>100){
          //   this.$alert("总分不能大于100");
          //   this.totalScroe -= data.score;
          //   let index = this.ruleIdsList.indexOf(data.ruleId);
          //   console.log(index,999);
          //   this.ruleIdsList.splice(index,1);
          //   return;
          // }
        }else{
          this.totalScroe -= data.score;
          let index = this.ruleIdsList.indexOf(data.ruleId);
          this.ruleIdsList.splice(index,1)
        }
      },
      //保存评分规则
      saveCaseRule(){
        if(!this.socreCaseRulesList.length){
           this.$notify({
            type: 'warning',
            message: '评分不能为空！',
            position: 'bottom-right',
            duration:3000
          });
          return
        }
        let seletList = []
        for (let i = 0; i < this.checkList.length; i++) {
          seletList.push(this.checkList[i].isChecked)

        }
        if(seletList.indexOf(true) == -1) { // 不勾选时的判断
          this.$notify({
            type: 'warning',
            message: '请勾选评分规则！',
            position: 'bottom-right',
            duration: 3000
          });
          return
        }
        let params = {
          caseUuid:this.socreCaseObj.caseUuid,
          caseId:String(this.socreCaseObj.caseId),
          ruleIds:this.ruleIdsList.join(","),
          score:this.totalScroe
        };
        let data = this.$qs.stringify(params);
        this.$http({
          url:'pca/caseRule/saveScoreCase',
          method:'post',
          data:data
        }).then((res)=>{
          if(res.statusText=='OK'&& res.data.code==200){
            this.$notify({
                 type: 'success',
                 title: '',
                 message: '保存评分成功！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert('保存评分成功！',{icon:6,title:"消息提示"});
            //this.dialogVisible2 = false;
            this.getMarkList();
          }else{
             this.$notify({
                 type: 'error',
                 title: '',
                 message: '保存评分失败！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert('保存评分失败！',{icon:5,title:"消息提示"});
          }
        }).catch( err=>{
          console.log(err)
        })
      },
      //tabs切换
      changeItem(tabNum) {
        if(tabNum == 1){
          this.imgFlag1 = true;
          this.imgFlag2 = false;
          document.getElementById('tabItem1').className = "contentTitleItem needApprove on";
          document.getElementById('tabItem2').className = "contentTitleItem approveHistory";
          document.getElementById('tab1').style.display='block';
          document.getElementById('tab2').style.display='none';
        }else if(tabNum == 2){
          this.imgFlag1 = false;
          this.imgFlag2 = true;
          document.getElementById('tabItem1').className = "contentTitleItem needApprove";
          document.getElementById('tabItem2').className = "contentTitleItem approveHistory on";
          document.getElementById('tab1').style.display='none';
          document.getElementById('tab2').style.display='block';
        }
      },
      //跳转时空信息页面
      goToSpaceMessage(obj){
        this.$router.push({
          path: '/casestudy/spaceMessage?menuCode=200',
          query: {
            caseUuid: obj.caseUuid,
            compositeScore:obj.compositeScore
          }
        })
      },

      // 评分设置列表
      getSetScoreList(){
        this.$http({
          url:'pca/caseRule/caseRuleList',
          method:'get',
        }).then((res)=>{
          if(res.statusText=='OK'&& res.data.code==200){
            this.setScoreList = res.data.data;
          }else{
              this.$notify({
                 type: 'error',
                 title: '',
                 message: '获取评分设置列表失败！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert("获取评分设置列表失败！",{icon:5,title:"消息提示"});
          }
        }).catch( err=>{
          console.log(err)
        })
      },
      // 编辑评分设置
      editScoreSet(obj,index){
        $("#ruleDesc_"+index).hide();
        $("#ruleDescIn_"+index).show();
        $("#ruleScore_"+index).hide();
        $("#ruleScoreIn_"+index).show();
        $("#ruleSave_"+index).show();
        $("#ruleEdit_"+index).hide();
      },
      // 保存评分设置
      saveScoreSet(obj,index){
        if(obj.score > 100 || obj.score < 1){
          this.$notify({
            type: 'warning',
            message: '分值范围在1到100！',
            position: 'bottom-right',
            duration: 3000
          });
          return false;
        }
        let params = {
          ruleId:obj.ruleId,
          describ:obj.describ,
          score:obj.score,
          weight:obj.weight,
          parentRuleId:obj.parentRuleId
        };
        let data = this.$qs.stringify(params);
        this.$http({
          url:'pca/caseRule/updataeCaseRule',
          method:'post',
          data:data
        }).then((res)=>{

          if(res.statusText=='OK'&& res.data.code==200){
            this.$notify({
                 type: 'success',
                 title: '',
                 message: '保存成功！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert('保存成功！',{icon:6,title:"消息提示"});
            this.getSetScoreList();

            $("#ruleDesc_"+index).show();
            $("#ruleDescIn_"+index).hide();
            $("#ruleScore_"+index).show();
            $("#ruleScoreIn_"+index).hide();
            $("#ruleSave_"+index).hide();
            $("#ruleEdit_"+index).show();

          }else{
              this.$notify({
                 type: 'error',
                 title: '',
                 message: '保存失败！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert('保存失败！',{icon:5,title:"消息提示"});
          }
        }).catch( err=>{
          console.log(err)
        })
      },
      // 删除评分设置
      deleteScoreSet(obj,index){
        let params = {
          ruleId:obj.ruleId
        };
        let data = this.$qs.stringify(params);
        this.$http({
          url:'pca/caseRule/delCaseRule',
          method:'post',
          data:data
        }).then((res)=>{
          if(res.statusText=='OK'&& res.data.code==200){
            this.setScoreList.splice(index,1);
             this.$notify({
                 type: 'success',
                 title: '',
                 message: '删除成功！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert('删除成功！',{icon:6,title:"消息提示"});
          }else{
             this.$notify({
                 type: 'error',
                 title: '',
                 message: '删除失败！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert('删除失败！',{icon:5,title:"消息提示"});
          }
        }).catch( err=>{
          console.log(err)
        })
      },
      addScoreSet(){
        $("#addDesc").show();
        $("#addScore").show();
        $("#ruleSaveNew").show();
        $("#addMark").hide();
      },
      // 添加评分设置
      saveNewScoreSet(){
        let inputValue = this.addScoreMark;
        let describe = this.addScoreDescribe.trim();
        // console.log(describe.length,"描述的内容");
        if(describe === ''||describe === null){
          this.$notify({
              type: 'warning',
              message: '规则描述不能为空！',
              position: 'bottom-right',
              duration: 2000
            });
          return;
        }
        if(describe.length > 50){
          console.log(describe.length,"长度");
          this.$notify({
              type: 'warning',
              message: '规则描述最大字数为50！',
              position: 'bottom-right',
              duration: 3000
          })
          return
        }
        if(inputValue === ''||inputValue === null){
           this.$notify({
              type: 'warning',
              message: '分值不能为空！',
              position: 'bottom-right',
              duration: 3000
            });
          return;
        }
        if(inputValue > 100 ||inputValue < 1){
          this.$notify({
            type: 'warning',
            message: '分值范围在1到100！',
            position: 'bottom-right',
            duration: 3000
            });
          return false;
        }
        let params = {
          describ:this.addScoreDescribe,
          score:this.addScoreMark
        };
        let data = this.$qs.stringify(params);
        this.$http({
          url:'pca/caseRule/insertCaseRule',
          method:'post',
          data:data
        }).then((res)=>{
          if(res.statusText=='OK'&& res.data.code==200){
            this.$notify({
                 type: 'success',
                 title: '',
                 message: '添加成功！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert('添加成功！',{icon:6,title:"消息提示"});
            this.getSetScoreList();
            this.addScoreDescribe = '';
            this.addScoreMark = 0;

            $("#addDesc").hide();
            $("#addScore").hide();
            $("#ruleSaveNew").hide();
            $("#addMark").show();

          }else{
              this.$notify({
                 type: 'error',
                 title: '',
                 message: '添加失败！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert('添加失败！',{icon:5,title:"消息提示"});
          }
        }).catch( err=>{
          console.log(err)
        })
      },

      // 验证评分分值输入
      checkScoreInput(val){
        //this.addScoreMark = this.addScoreMark.replace(/\D/g,'');
        val = val.replace(/\D/g,'');
        if(val == ''){
          return
        }else if(val > 100 || val < 1){
          this.$notify({
            type: 'warning',
            title: '',
            message: '分值范围在1到100！',
            position: 'bottom-right',
            duration:3000
          });
          val = 0;
          return;
        }
        return val;
      },

     //评分记录
      markRecord(id){
         this.$http({
           url:'pca/caseRule/getRecord',
           method:'post',
           params:{
             caseUuid:id
           }
         }).then( res=>{
          if(res.statusText==="OK"&& res.data.code===200){
            if(!this.markRecordList.length){
              this.showmarkImg = true
            }
             this.markRecordList = res.data.data.data
          }else{

            this.$notify({
                 type: 'error',
                 title: '',
                 message: '获取评分记录失败！',
                 position: 'bottom-right',
                 duration:3000
               });
            // layer.alert("获取评分记录失败！",{icon:5,title:"消息提示"});
          }
         }).catch(res=>{
           console.log(res)
         })
       },

      reset(){
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
      }
    },
    watch:{
      // totalScroe:function () {
      //   if(this.totalScroe>=0&&this.totalScroe<=60){
      //     this.scrodeGrade="差"
      //   }else if(this.totalScroe>60&&this.totalScroe<80){
      //     this.scrodeGrade="中"
      //   }else{
      //     this.scrodeGrade="优"
      //   }
      // }
    }

  }
</script>


<style scoped>
  @import '../../assets/css/case_common.css';
 @import '../../assets/css/commom.css';
  .searchCondition {
    width: 100%;
    display: flex;
    font-size: 14px;
    padding-left: 20px;
    color:#99c9fa ;
   box-sizing: border-box;
    justify-content: flex-end;
  }
  .scItem{
    min-width: 68px;
  }
  .scItemP{
    margin:0 0.1rem;
  }
  .searchCondition .caseNameSelect{
    width: 1.87rem;
    font-size: 0.14rem;
    height:0.3rem;
    line-height: 0.3rem;
    /* color: #606266; */
    color: #99C9FA;
    margin-right:0.15rem;
  }
  .searchCondition .timeSelect{
    margin-right:0;
  }
  .searchCondition .timeSelectkey{
    margin-right:0.15rem;
  }
  .searchConditionContainer{
    display: flex;
    /* margin-right: 20px; */
    height:0.3rem;
    font-size: 0.14rem;
    color:#99c9fa ;
    line-height:0.3rem;
  }
   .btnSearch{
    width: 0.8rem;
    height: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor:pointer;
    margin-left: 0.1rem;
  }
  /*.btnSearch1{
    width: 0.78rem;
    height: 0.38rem;
    background-color: #e6a23c;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor:pointer;
    margin-left: 0.1rem;
  } */

  .itemIcon img {
    width: 100%;
    height: 100%;
  }
  .content {
    flex:1;
    position: relative;
    width: calc(100% - 0.4rem);
    margin: 0.1rem 0.2rem 0;
    display: flex;
    flex-direction: column;
    /* border: 1px solid #ECF0F3;
    box-shadow: 0 1px 1px #cdcdcd; */
  }
  .contentTitle{
    height: 0.56rem;
    width: 100%;
    /* background-color:#ECF0F3 ; */
    display: flex;
    align-items: center;

  }
  .contentTitleItem{
    width: 1rem;
    height: 0.32rem;
    text-align: center;
    line-height: 0.32rem;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
     background: url('../../assets/images/videoNewImg/bg/blue-bg-normal.png') no-repeat center center /100% 100% !important;
    color:#99c9fa ;
    font-size:0.12rem;
  }
  #tabItem1{
    margin-right:0.2rem;
  }

  .contentTitleItem.on{
   background: url('../../assets/images/videoNewImg/bg/blue-bg-hover.png') no-repeat center center /100% 100% !important;
    color:#99c9fa ;
  }
  .needApproveContainer{
    overflow: auto;
    width: 100%;
    height: 100%;
    /* background-color: #FCFDFD; */
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .needApproveTitle{
    height: 0.54rem;
    display: flex;
    width: 100%;
    align-items: center;
  }
  .needApproveTitleIcon{
    height: 35%;
    width: 2px;
    background-color: #58A9FF;
    margin-left: 20px;
  }
  .needApproveTitleTxt{
    color: #58A9FF;
    margin-left: 10px;
  }

  .searchCondition /deep/ .el-button+.el-button{
    margin-left: 0;
  }

  .approveBtn{
    width: 80px;
    height: 30px;
    background-color: #E6A23C;
    color: white;
    border-radius: 3px;
    margin: 5px auto;
    margin-right: 5px;
    cursor: pointer;
    display: inline-block;
  }
  .playBtn{
    width: 80px;
    height: 30px;
    background-color: #409EFF;
    color: white;
    border-radius: 3px;
    margin: 5px auto;
    margin-left: 5px;
    cursor: pointer;
    display: inline-block;
  }
  .scItemBtn .el-button{
    width: 0.8rem;
    height:0.3rem;
    font-size:0.14rem;
    padding:0 10px;
  }
  .btnWrapper{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
   }
  .btnWrapper .el-button{
    margin-left: 10px;
  }
  .ruleSave{
    display: none;
  }
  /* .delBtn{
    width: 80px;
    height: 30px;
    background-color: #F56C6C;
    color: white;
    border-radius: 3px;
    cursor: pointer;
    display: inline-block;
    margin-left: 5px;
    margin-top: 3px;
    margin-bottom: 3px;
  } */

  .saveBtn{
    width: 80px;
    height: 30px;
    background-color: #409EFF;
    color: white;
    border-radius: 3px;
    margin-right: 5px;
    cursor: pointer;
    display: inline-block;
    margin-top: 3px;
    margin-bottom: 3px;
  }
  .editBtn{
    width: 80px;
    height: 30px;
    background-color: #67C23A;
    color: white;
    border-radius: 3px;
    margin-right: 5px;
    cursor: pointer;
    display: inline-block;
    margin-top: 3px;
    margin-bottom: 3px;
  }

  .pageNation {
    margin-top: 5px;
    width: 100%;
    height: 30px;
  }

  .contentTable{
    /* padding-left: 20px;
    padding-right: 20px; */
    width: 100%;
    /* margin-top: 20px; */
    max-height: 6.5rem;
    /*overflow-y: auto;*/
  }
  .setMark .contentTable{
    margin-top: 0;
  }


  .dialogDetailContainer{
    width: 100%;
    height: calc( 100% - 100px);
  }

  .wrapper /deep/ .el-dialog__header{
    background-color: #F3F6F8;
    display: flex;
    align-items: center;
    padding: 10px 20px 10px;;
    font-size: 14px;
  }

  .wrapper /deep/ .el-dialog__headerbtn{
    top:15px;
    right: 15px;
  }
  .itemKey{
    float: left;
    color:#99c9fa;
    font-weight: 600;
  }
  .itemValue{
    color:#99c9fa;
    width: 3rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: normal;
    display: inline-block;
  }
  .policeNo{
    color:#99c9fa
  }
  .firstSpan{
    width: 50%;
  }
  .secondSpan{
    width: 50%;
  }
  .dialogDetailContainer ul li{
    display: flex;
    margin-top: 10px;
  }
  .line{
    width: 100%;
    height: 1px;
    background-color: #D8DDE0;
    margin-top: 30px;
  }
  .wrapper /deep/ .el-dialog__body {
    padding: 10px 20px;
    color: #606266;
    line-height: 24px;
    font-size: 14px;
  }

  .setMark table {
    /* width: calc(100% - 0.4rem); */
    width:100%;
    text-align: center;
    border-collapse: collapse;;
    font-size: 14px;
   color: #99c9fa ;
   border: 1px solid rgba(12, 68, 135, 0.3) !important;
    /* border-color: grey; */
  }

  .setMark thead {
    border: 1px solid rgba(12, 68, 135, 0.3) !important;
    color: #99c9fa ;
    font-size: 15px;
    font-weight: 500;
    text-align: center;
  }

  .setMark td {
    border: 2px solid rgba(12, 68, 135, 0.3) !important;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    /* line-height: 30px; */
    padding: 0.08rem 0;
    font-size: 0.14rem;
  }
  .setMark td input{
    display: none;
  }
  .setMark td .scoreIn{
    width: 200px;
  }
  .setMark th {
    white-space: nowrap;
    overflow: hidden;
    border: 2px solid rgba(12, 68, 135,0.6) !important;
    padding: 12px 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    background: rgba(12, 68, 135, 0.4);
    text-align: center;
    color: #99c9fa ;
    font-size: 0.16rem;
    font-weight: bold;
  }
  /* .setMark tr:nth-child(odd){
    background-color: #F6F8F9;
  } */
  .setMark tr:nth-child(2n) {
  background: rgba(24, 39, 59, 0.5) !important
}
  .setMark tr:hover td{
  background: rgba(36, 55, 81, 0.9) !important
  }
.titlebox{
  display: flex;
  color:#99c9fa ;
  justify-content:space-between;
}
/* .dialog-footer .el-button{
  width: 0.74rem;
  height: 0.26rem;
} */
</style>

