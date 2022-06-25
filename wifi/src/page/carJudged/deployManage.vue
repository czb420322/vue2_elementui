<template>
  <div class="wrapper">
    <!-- <div class="topNav">
      <router-link tag="div" :to="{path:'/carJudged',query:{menuCode:300}}" class="nav-item">车辆研判</router-link>
      <div class="nav-item nav-item-search">布控管理</div>
    </div> -->

    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt="">
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname"  :to="{path:'/carJudged',query:{menuCode:300}}">车辆研判 > </router-link>
      <p class="sysname">&nbsp;布控管理</p>
    </div>

    <div class="deployManage">
      <div class="content">
        <div class="contentTop">
          <div @click="changeTab('tab1')" class="topItem">待我审批</div>
          <div @click="changeTab('tab2')" class="topItem">我的布控</div>
          <div @click="changeTab('tab3')" class="topItem">布控中</div>
          <div @click="changeTab('tab4')" class="topItem">已关闭的布控</div>
        </div>
        <div id="tab1" class="contentDetail">
          <div class="DetailTile">
            <div class="titleIcon"></div>
            <span>待我审批</span></div>
          <div class="tableWrapper">
            <div class="table">
              <el-table
                ref="table1"
                :data="firstTableList"
                max-height="500"
                style="width: 100%">
                <div slot="empty">
                  <div class="noImg">
                    <img src="../../assets/updataImg/NoData.png" />
                  </div>
                </div>
                <el-table-column
                  type="index"
                  label="序号"
                  align="center"
                  width="60">
                </el-table-column>
                <el-table-column
                  prop="dispositionMode"
                  label="布控方式"
                  show-overflow-tooltip
                  align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.dispositionMode=== 10">按车牌布控</span>
                    <span v-else-if="scope.row.dispositionMode=== 20">按类别布控</span>
                    <span v-else-if="scope.row.dispositionMode === 30">按车型布控</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="beginTime"
                  align="center"
                  show-overflow-tooltip
                  label="开始时间">
                </el-table-column>
                <el-table-column
                  prop="endTime"
                  align="center"
                  show-overflow-tooltip
                  label="结束时间">
                </el-table-column>
                <el-table-column
                  prop="vehicleKine"
                  align="center"
                  show-overflow-tooltip
                  label="车辆类别">
                </el-table-column>
                <el-table-column
                  prop="vehicleBrand"
                  align="center"
                  show-overflow-tooltip
                  label="车辆品牌">
                </el-table-column>
                <el-table-column
                  prop="vehicleModel"
                  align="center"
                  show-overflow-tooltip
                  label="车辆型号">
                </el-table-column>
                <el-table-column
                  prop="plateNo"
                  align="center"
                  show-overflow-tooltip
                  label="车牌号">
                </el-table-column>
                <el-table-column
                  prop="reason"
                  align="center"
                  show-overflow-tooltip
                  label="布控原因">
                </el-table-column>
                <el-table-column
                  prop="applicantName"
                  align="center"
                  show-overflow-tooltip
                  label="提交人">
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  align="center"
                  show-overflow-tooltip
                  label="提交时间">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="操作"
                  width="280">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="warning"
                      v-if="approvalDeployBtn"
                      class="tryBtn"
                      icon="el-icon-tickets"
                      @click="passApprovalData(scope.row,scope.$index)">审批布控</el-button>
                    <el-button
                      size="mini"
                      type="primary"
                      class="searchBtn"
                      icon="el-icon-tickets"
                      v-if="btnSeeDeploy"
                      @click="passLookData(scope.row,scope.$index)">查看布控</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="pageNation">
            <el-pagination style="float:right"
               :background=true
               @size-change="handleSizeChange1"
               @current-change="handleCurrentChange1"
               :current-page="Number(this.FpageNo)"
               :page-sizes="[10, 20, 30, 40, 50, 100]"
               :page-size="Number(this.FpageSize)"
               layout="total, sizes, prev, pager, next, jumper"
               :total=Number(this.FtotalNum)>
            </el-pagination>
          </div>
        </div>
        <div id="tab2" class="contentDetail">
          <div class="DetailTile">
            <div class="titleIcon"></div>
            <span>我的布控</span></div>
          <div class="tableWrapper">
            <div class="table">
              <el-table
                ref="table2"
                :data="secondTableList"
                max-height="500"
                style="width: 100%">
                <div slot="empty">
                  <div class="noImg">
                    <img src="../../assets/updataImg/NoData.png" />
                  </div>
                </div>
                <el-table-column
                  type="index"
                  label="序号"
                  align="center"
                  width="60">
                </el-table-column>
                <el-table-column
                  prop="dispositionMode"
                  label="布控方式"
                  show-overflow-tooltip
                  align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.dispositionMode=== 10">按车牌布控</span>
                    <span v-else-if="scope.row.dispositionMode=== 20">按类别布控</span>
                    <span v-else-if="scope.row.dispositionMode===30">按车型布控</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="beginTime"
                  align="center"
                  show-overflow-tooltip
                  label="开始时间">
                </el-table-column>
                <el-table-column
                  prop="endTime"
                  align="center"
                  show-overflow-tooltip
                  label="结束时间">
                </el-table-column>
                <el-table-column
                  prop="vehicleKine"
                  align="center"
                  show-overflow-tooltip
                  label="车辆类别">
                </el-table-column>
                <el-table-column
                  prop="vehicleBrand"
                  align="center"
                  show-overflow-tooltip
                  label="车辆品牌">
                </el-table-column>
                <el-table-column
                  prop="vehicleModel"
                  align="center"
                  show-overflow-tooltip
                  label="车辆型号">
                </el-table-column>
                <el-table-column
                  prop="plateNo"
                  align="center"
                  show-overflow-tooltip
                  label="车牌号">
                </el-table-column>
                <el-table-column
                  prop="reason"
                  align="center"
                  show-overflow-tooltip
                  label="布控原因">
                </el-table-column>
                <el-table-column
                  prop=""
                  align="center"
                  show-overflow-tooltip
                  label="审批状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.approvalStatus=== 1">待审批</span>
                    <span v-else-if="scope.row.approvalStatus=== 2">审批通过</span>
                    <span v-else-if="scope.row.approvalStatus===3">审批不通过</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="approvalerName"
                  align="center"
                  show-overflow-tooltip
                  label="审批人">
                </el-table-column>
                <el-table-column
                  prop="updateTime"
                  align="center"
                  show-overflow-tooltip
                  label="审批时间">
                </el-table-column>
                <el-table-column
                  prop=""
                  align="center"
                  show-overflow-tooltip
                  label="布控状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.dispositionStatus=== 0">布控中</span>
                    <span v-else-if="scope.row.dispositionStatus=== 1">已撤控</span>
                    <span v-else-if="scope.row.dispositionStatus=== 2">布控到期</span>
                    <span v-else-if="scope.row.dispositionStatus===9">未布控</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  align="center"
                  show-overflow-tooltip
                  label="提交时间">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="操作"
                  width="160">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      class="searchBtn"
                      icon="el-icon-tickets"
                      v-if="btnSeeDeploy"
                      @click="passLookData(scope.row,scope.$index)">查看布控</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="pageNation">
            <el-pagination style="float:right"
               :background=true
               @size-change="handleSizeChange2"
               @current-change="handleCurrentChange2"
               :current-page="Number(this.SpageNo)"
               :page-sizes="[10, 20, 30, 40, 50, 100]"
               :page-size="Number(this.SpageSize)"
               layout="total, sizes, prev, pager, next, jumper"
               :total=Number(this.StotalNum)>
            </el-pagination>
          </div>
        </div>
        <div id="tab3" class="contentDetail">
          <div class="DetailTile">
            <div class="titleIcon"></div>
            <span>布控中</span></div>
          <div class="tableWrapper">
            <div class="table">
              <el-table
                ref="table3"
                :data="thirdTableList"
                max-height="500"
                style="width: 100%">
                 <div slot="empty">
                  <div class="noImg">
                    <img src="../../assets/updataImg/NoData.png" />
                  </div>
                </div>
                <el-table-column
                  type="index"
                  label="序号"
                  align="center"
                  width="60">
                </el-table-column>
                <el-table-column
                  prop="dispositionMode"
                  label="布控方式"
                  show-overflow-tooltip
                  align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.dispositionMode=== 10">按车牌布控</span>
                    <span v-else-if="scope.row.dispositionMode=== 20">按类别布控</span>
                    <span v-else-if="scope.row.dispositionMode===30">按车型布控</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="beginTime"
                  align="center"
                  show-overflow-tooltip
                  label="开始时间">
                </el-table-column>
                <el-table-column
                  prop="endTime"
                  align="center"
                  show-overflow-tooltip
                  label="结束时间">
                </el-table-column>
                <el-table-column
                  prop="vehicleKine"
                  align="center"
                  show-overflow-tooltip
                  label="车辆类别">
                </el-table-column>
                <el-table-column
                  prop="vehicleBrand"
                  align="center"
                  show-overflow-tooltip
                  label="车辆品牌">
                </el-table-column>
                <el-table-column
                  prop="vehicleModel"
                  align="center"
                  show-overflow-tooltip
                  label="车辆型号">
                </el-table-column>
                <el-table-column
                  prop="plateNo"
                  align="center"
                  show-overflow-tooltip
                  label="车牌号">
                </el-table-column>
                <el-table-column
                  prop="reason"
                  align="center"
                  show-overflow-tooltip
                  label="布控原因">
                </el-table-column>
                <el-table-column
                  prop="applicantName"
                  align="center"
                  show-overflow-tooltip
                  label="提交人">
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  align="center"
                  show-overflow-tooltip
                  label="提交时间">
                </el-table-column>
                <el-table-column
                  prop="approvalerName"
                  align="center"
                  show-overflow-tooltip
                  label="审批人">
                </el-table-column>
                <el-table-column
                  prop="approvalTime"
                  align="center"
                  show-overflow-tooltip
                  label="审批时间">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="操作"
                  width="280">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      icon="el-icon-tickets"
                      class="searchBtn"
                      v-if="btnSeeDeploy"
                      @click="passLookData(scope.row,scope.$index)">查看布控</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      class="delBtn"
                      v-if="closeDeployBtn"
                      @click="getDeployItemData(scope.row);closeDeployFlag=true">关闭布控</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="pageNation">
            <el-pagination style="float:right"
               :background=true
               @size-change="handleSizeChange3"
               @current-change="handleCurrentChange3"
               :current-page="Number(this.TpageNo)"
               :page-sizes="[10, 20, 30, 40, 50, 100]"
               :page-size="Number(this.TpageSize)"
               layout="total, sizes, prev, pager, next, jumper"
               :total=Number(this.TtotalNum)>
            </el-pagination>
          </div>
        </div>
        <div id="tab4" class="contentDetail">
          <div class="DetailTile">
            <div class="titleIcon"></div>
            <span>已关闭的布控</span></div>
          <div class="tableWrapper">
            <div class="table">
              <el-table
                ref="table4"
                :data="fourthTableList"
                max-height="500"
                style="width: 100%">
                <div slot="empty">
                  <div class="noImg">
                    <img src="../../assets/updataImg/NoData.png" />
                  </div>
                </div>
                <el-table-column
                  type="index"
                  label="序号"
                  align="center"
                  width="60">
                </el-table-column>
                <el-table-column
                  prop="dispositionMode"
                  label="布控方式"
                  show-overflow-tooltip
                  align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.dispositionMode=== 10">按车牌布控</span>
                    <span v-else-if="scope.row.dispositionMode=== 20">按类别布控</span>
                    <span v-else-if="scope.row.dispositionMode===30">按车型布控</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="beginTime"
                  align="center"
                  show-overflow-tooltip
                  label="开始时间">
                </el-table-column>
                <el-table-column
                  prop="endTime"
                  align="center"
                  show-overflow-tooltip
                  label="结束时间">
                </el-table-column>
                <el-table-column
                  prop="vehicleKine"
                  align="center"
                  show-overflow-tooltip
                  label="车辆类别">
                </el-table-column>
                <el-table-column
                  prop="vehicleBrand"
                  align="center"
                  show-overflow-tooltip
                  label="车辆品牌">
                </el-table-column>
                <el-table-column
                  prop="vehicleModel"
                  align="center"
                  show-overflow-tooltip
                  label="车辆型号">
                </el-table-column>
                <el-table-column
                  prop="plateNo"
                  align="center"
                  show-overflow-tooltip
                  label="车牌号">
                </el-table-column>
                <el-table-column
                  prop="reason"
                  align="center"
                  show-overflow-tooltip
                  label="布控原因">
                </el-table-column>
                <el-table-column
                  prop="applicantName"
                  align="center"
                  show-overflow-tooltip
                  label="提交人">
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  align="center"
                  show-overflow-tooltip
                  label="提交时间">
                </el-table-column>
                <el-table-column
                  prop="updateTime"
                  align="center"
                  show-overflow-tooltip
                  label="关闭时间">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="操作"
                  width="160">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      class="searchBtn"
                      icon="el-icon-tickets"
                      v-if="btnSeeDeploy"
                      @click="passLookData(scope.row,scope.$index)">查看布控</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="pageNation">
            <el-pagination style="float:right"
               :background=true
               @size-change="handleSizeChange4"
               @current-change="handleCurrentChange4"
               :current-page="Number(this.LpageNo)"
               :page-sizes="[10, 20, 30, 40, 50, 100]"
               :page-size="Number(this.LpageSize)"
               layout="total, sizes, prev, pager, next, jumper"
               :total=Number(this.LtotalNum)>
            </el-pagination>
          </div>
        </div>
      </div>
      <footerSecond />
    </div>
    <el-dialog
      width="30%"
      top="15%"
      title="撤销布控"
      :visible.sync="closeDeployFlag"
      append-to-body>
      <!--<span>{{deployItemData.bukongId}}</span>-->
      <div style="display: flex;width: 100%;height: 60%;margin-top: 20px"><div style="width: 62px;color:#99c9fa">撤控理由:</div> &nbsp;<textarea v-model="closeReason" style="width: calc(100% - 60px);height:120px;border: 1px solid #E8F0F4"></textarea></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDeployFlag=false"></el-button>
        <el-button @click="closeDisposition()"></el-button>
     </span>
    </el-dialog>
  </div>
</template>

<script>
  import footerSecond from '../../components/footer_second'
  export default {
    components: {
      footerSecond
    },
    data() {
      return {

        // btnSeeDeploy:this.$store.state.allRoles.hasOwnProperty(Symbol.for("54654"))?true:false,
        btnSeeDeploy:this.$storage.getSession("329")!=null?true:false,
        approvalDeployBtn:this.$storage.getSession("327")!=null?true:false,
        closeDeployBtn:this.$storage.getSession("328")!=null?true:false,
        FpageNo: 1,
        FpageSize: 10,
        FtotalNum: 0,
        SpageNo: 1,
        SpageSize: 10,
        StotalNum: 0,
        TpageNo: 1,
        TpageSize: 10,
        TtotalNum: 0,
        LpageNo: 1,
        LpageSize: 10,
        LtotalNum: 0,
        firstTableList: [],
        secondTableList: [],
        thirdTableList: [],
        fourthTableList: [],
        tableParams: {},
        deployItemData:{},
        closeDeployFlag:false,
        closeReason:'',
        closeDispositionMessage:'',
        loading:null,
        tableData: [
          // {
          //   date: '2016',
          //   name: '王小虎',
          //   address: '上海市普陀区金沙江路 1518 弄'
          // },
        ]
      }
    },
    methods: {
//待我审批
      getApproveList() {
        let _this = this;
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.$http({
          url: 'tvas/disposition/todoAppeoval',
          method: 'post',
          params: {
            pageNum: this.FpageNo,
            pageSize: this.FpageSize,
            orderType: 'desc',
            orderBy: 'createTime',
          }
        }).then((res) => {
          this.loading.close();
          if(res.statusText=='OK'&& res.data.code==200){
            this.firstTableList = res.data.data.list;
            this.FtotalNum = res.data.data.totalCount;
          }else{
             this.$notify({
                        type: 'error',
                        message: '获取待我审批列表失败',
                        position: 'bottom-right',
                        duration: 3000
                      });
           // layer.alert('获取待我审批列表失败', {icon:5, title: "消息提示"});
          }
        })

      },
    //我的布控
      getOwnDeployList() {
        let _this = this;
        this.loading = this.$loading({
                  lock: true,
                  background: "rgba(255,255,255,0.4)",
                  text: "加载中"
                });
        this.$http({
          url: 'tvas/disposition/myDisposition',
          method: 'post',
          params: {
            pageNum: this.SpageNo,
            pageSize: this.SpageSize,
            orderType: 'desc',
            orderBy: 'createTime'
          }
        }).then((res) => {
          this.loading.close();
          if(res.statusText=='OK'&& res.data.code==200){
            this.secondTableList = res.data.data.list;
            this.StotalNum = res.data.data.totalCount;
          }else{
             this.$notify({
                        type: 'error',
                        message: '获取我的布控列表失败',
                        position: 'bottom-right',
                        duration: 3000
                      });
           // layer.alert('获取我的布控列表失败', {icon:5, title: "消息提示"});
          }
        })
      },
    //撤销布控
      closeDisposition() {
        this.$http({
          url: 'tvas/disposition/revoke',
          method: 'post',
          params: {
            dispositionRemoveReason:this.closeReason,//撤控理由
            bukongId:this.deployItemData.bukongId//布控id
          }
        }).then((res) => {
          this.closeDeployFlag=false
          if(res.statusText=='OK' && res.data.code===200){
             this.$notify({
                        type: 'success',
                        message: '关闭布控成功',
                        position: 'bottom-right',
                        duration: 3000
                      });
           // layer.alert('关闭布控成功!',{icon:6,title:"消息提示"});
            this.getApproveList();
            this.getOwnDeployList();
            this.getDispositioningList();
            this.getDispositionclosedList()
          }else{
              this.$notify({
                        type: 'error',
                        message: '关闭布控失败！',
                        position: 'bottom-right',
                        duration: 3000
                      });
           // layer.alert('关闭布控失败！',{icon:5,title:"消息提示"});
          }
        })
      },
    //布控中
      getDispositioningList() {
        let _this = this;
        this.loading = this.$loading({
                  lock: true,
                  background: "rgba(255,255,255,0.4)",
                  text: "加载中"
                });
        this.$http({
          url: 'tvas/disposition/dispositioning',
          method: 'post',
          params: {
            pageNum: this.TpageNo,
            pageSize: this.TpageSize,
            orderType: 'desc',
            orderBy: 'approvalTime',
            // approvalStatus:2
          }
        }).then((res) => {
           this.loading.close();
          if(res.statusText=='OK'&& res.data.code==200){
            this.thirdTableList = res.data.data.list;
            this.TtotalNum = res.data.data.totalCount
          }else{
             this.$notify({
                        type: 'error',
                        message: '获取布控中的列表失败',
                        position: 'bottom-right',
                        duration: 3000
                      });
           // layer.alert('获取布控中的列表失败', {icon:5, title: "消息提示"});
          }
        })
      },

      //已关闭的布控
      getDispositionclosedList() {
        let _this = this;
        this.loading = this.$loading({
                  lock: true,
                  background: "rgba(255,255,255,0.4)",
                  text: "加载中"
                });
        this.$http({
          url: 'tvas/disposition/dispositionclosed',
          method: 'post',
          params: {
            pageNum: this.LpageNo,
            pageSize: this.LpageSize,
            orderType: 'desc',
            orderBy: 'updateTime',
            // approvalStatus:3
          }
        }).then((res) => {
          this.loading.close();
          if(res.statusText=='OK'&& res.data.code==200){
            this.fourthTableList = res.data.data.list;
            this.LtotalNum = res.data.data.totalCount;
          }else{
              this.$notify({
                        type: 'error',
                        message: '获取已关闭的布控列表失败',
                        position: 'bottom-right',
                        duration: 3000
                      });
           // layer.alert('获取已关闭的布控列表失败', {icon:5, title: "消息提示"});
          }
        })
      },

    //待我审批分页
      handleSizeChange1(val) {
        this.FpageSize = val;
        this.FpageNo = 1;
        this.getApproveList();
      },

      handleCurrentChange1(val) {
        this.FpageNo = val;
        this.getApproveList();
      },

//我的布控分页
      handleSizeChange2(val) {
        this.SpageSize = val;
        this.SpageNo = 1;
        this.getOwnDeployList();
      },

      handleCurrentChange2(val) {
        this.SpageNo = val;
        this.getOwnDeployList();
      },
//布控中分页
      handleSizeChange3(val) {
        this.TpageSize = val;
        this.TpageNo = 1;
        this.getDispositioningList();
      },

      handleCurrentChange3(val) {
        this.TpageNo = val;
        this.getDispositioningList();
      },
//已经关闭的布控分页
      handleSizeChange4(val) {
        this.LpageSize = val;
        this.LpageNo = 1;
        this.getDispositionclosedList();
      },

      handleCurrentChange4(val) {
        this.LpageNo = val;
        this.getDispositionclosedList();
      },
//跳转查看布控
      passLookData(data, index) {
        sessionStorage.removeItem("deployData");
        var deployData = JSON.stringify(data)
        sessionStorage.setItem("deployData", deployData)
        this.$router.push({path: '/carJudged/lookDeploy', query: {menuCode: 300}})
      },
//跳转审批布控
      passApprovalData(data, index) {
        sessionStorage.removeItem("approvalData");
        var approvalData = JSON.stringify(data)
        sessionStorage.setItem("approvalData", approvalData)
        this.$router.push({path: '/carJudged/approveDeploy', query: {menuCode: 300}})
      },
      //tab栏切换
      changeTab: function (item) {
        var tabs = ["tab1", "tab2", "tab3", "tab4"];
        var topItem = document.getElementsByClassName('topItem');
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i] == item) {
            document.getElementById(tabs[i]).style.display = "block";
            topItem[i].style.backgroundColor = 'RGB(33,71,110,0.5)'
            topItem[i].style.color = '#2e93fb'
            topItem[i].style.border = '1px solid RGB(78,117,163)'
          } else {
            document.getElementById(tabs[i]).style.display = "none";
            topItem[i].style.backgroundColor = ''
            topItem[i].style.color = ''
            topItem[i].style.border = ''
          }
        }

        if(item == "tab1"){
          this.getApproveList();
        }else if(item == "tab2"){
          this.getOwnDeployList();
        } else if(item == "tab3"){
          this.getDispositioningList();
        }else if(item == "tab4"){
          this.getDispositionclosedList();
        }
      },
//获取布控数据
      getDeployItemData(obj){
        this.deployItemData=obj
      }
    },
    mounted() {
      let tab = this.$router.currentRoute.query.typeCode;
      if(tab){
        this.changeTab(tab);
      }else{
        this.changeTab('tab1');
      }

      // this.getApproveList();
      // this.getOwnDeployList();
      // this.getDispositioningList();
      // this.getDispositionclosedList();

      //表格重绘
      let _this = this;
      window.addEventListener("resize", function () {
        if(_this.$refs["table1"]){
          _this.$refs["table1"].doLayout();
        }
        if(_this.$refs["table2"]){
          _this.$refs["table2"].doLayout();
        }
        if(_this.$refs["table3"]){
          _this.$refs["table3"].doLayout();
        }
        if(_this.$refs["table4"]){
          _this.$refs["table4"].doLayout();
        }
      });
    }

  }


</script>


<style scoped>
@import url('../../assets/css/commom.css');
  .wrapper {
    position: absolute;
    width: 100%;
    min-width: 1200px;
    top: 0.6rem;
    height: calc(100% - 0.6rem);
    box-sizing: border-box;
    overflow: auto;
  }
  .deployManage {
    height: calc(100% - 0.6rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .content {
    width: 100%;
    padding: 0.15rem 0.2rem;
    position: relative;
  }

  .contentTop {
    width: 100%;
    height: 0.5rem;
    display: flex;
    align-items: center;
  }

  .contentTop div {
    color: #99c9fa;
    width: 1.5rem;
    height: 0.4rem;
    border: 1px solid rgba(15, 44, 79, 0.5);
    background-color: rgba(16, 35, 56, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size:0.14rem;
    cursor: pointer;
  }

  .contentDetail {
    width: 100%;
  }

  .DetailTile {
    width: 100%;
    height: 0.7rem;
    display: flex;
    align-items: center;
    color: #68B0FF;
    font-size: 0.16rem;
  }

  .titleIcon {
    width: 2px;
    height: 20px;
    background-color: #68B0FF;
    display: inline-block;
    margin-right: 15px;
  }
  .pageNation {
    width: 100%;
    margin-top: 10px;
    height: 30px;
    position: relative;
    z-index: 9;
  }

  .handleBtn {
    width: 100px;
    height: 30px;
    background-color: #409EFF;
    color: white;
    border-radius: 5px;
    margin: 5px auto;
    cursor: pointer;
  }

  .approvalBtn {
    width: 100px;
    height: 30px;
    color: white;
    border-radius: 5px;
    margin: 5px 5px 5px 0;
    cursor: pointer;
    background-color: #E6A23C;
  }

  .handleBtn:hover {
    background-color: #5FADFF;
  }

  .approvalBtn:hover {
    background-color: #FFC974;
  }
  .el-dialog__wrapper /deep/ .el-dialog__header{
    background-color: #F3F6F8;
    padding:10px 20px 10px;
  }

  .table >>> .el-table{
    border: 2px solid rgba(12, 68, 135, 0.3);
  }
 /* .table >>> .el-table thead th{
  background:#e9eef1;
  } */

  .table >>> .el-table--border td,
  .table >>> .el-table--border th,
  .table >>> .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 2px solid rgba(12, 68, 135, 0.3);
  }
  .table >>> .el-table--border th,
  .table >>> .el-table__fixed-right-patch{
    border-bottom: 2px solid rgba(12, 68, 135, 0.3);
  }
  .table >>> .el-table td,
  .table >>> .el-table th.is-leaf {
    border-bottom: 2px solid rgba(12, 68, 135, 0.3);
    border-right: 2px solid rgba(12, 68, 135, 0.3);
  }
  .table >>> .el-table th>.cell{
    color:#545454;
    font-size: 0.16rem;
    font-weight: bold;
  }

  .table >>> .el-table th {
    padding: 0.12rem 0;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
  }
  .table >>> .el-table td{
    padding: 0.06rem 0;
    font-size:0.14rem;
  }
  .table >>> .el-button--mini{
    padding: 0.07rem 0.15rem;
    font-size:0.14rem;
  }

</style>

