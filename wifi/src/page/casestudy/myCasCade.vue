<!--
 * @Author: chenxf
 * @Date: 2020-05-17 16:45:20
 * @LastEditTime : 2020-12-16 16:48:42
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\page\casestudy\myCasCade.vue
 * @
 -->
<template>
  <div class="wrapper">
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/videoCombat',query:{menuCode:100}}">视频侦查></router-link>
      <p class="sysname">&nbsp;我的串并案</p>
    </div>
    <div class="contentBody">
      <div>
        <!-- <el-button class="searchBtn" @click="caseCadeNum = 1">串案列表</el-button> -->
        <!-- <el-button class="searchBtn" @click="caseCadeNum = 2">串案申请</el-button> -->
      </div>
      <div v-show="caseCadeNum == 1" class="content">
        <div class="contentTitle">
          <div class="searchCondition">
            <div v-show="showCase == 0" class="titleColor allCase">
              <el-checkbox :disabled="checkDisabled" v-model="checkAllCase">查看全部串并案</el-checkbox>
            </div>
            <div class="titleColor">串并案名称:&nbsp;</div>
            <el-input class="caseNameSelect" size="small" v-model="caseName" placeholder="请输入串并案名称"></el-input>
            <div v-show="showCase != 0" class="titleColor">串并案状态:&nbsp;&nbsp;</div>
            <el-select
              v-show="showCase != 0"
              v-model="comboState"
              size="small"
              placeholder="请选择串并案状态"
            >
              <el-option value key label="不限"></el-option>
              <el-option value="0" key="0" label="并案"></el-option>
              <el-option value="1" key="1" label="串案"></el-option>
            </el-select>
            <!-- <select class="caseNameSelect" v-model="comboState">
              <option value="">不限</option>
              <option value="0">并案</option>
              <option value="1">串案</option>
            </select>-->
            <!-- <div class="titleColor">创建用户:&nbsp;&nbsp;</div>
            <input type="text" class="caseNameSelect"  v-model="createUser">-->
            <div class="titleColor">创建时间:&nbsp;&nbsp;</div>
            <el-input
              id="beginTime"
              class="caseNameSelect timeSelect"
              placeholder="请选择开始时间"
              v-model="beginDateTime"
              autocomplete="off"
            >
              <i slot="prefix" class="el-input__icon el-icon-time"></i>
            </el-input>
            <p class="scItemP">-</p>
            <el-input
              id="endTime"
              class="caseNameSelect timeSelect"
              placeholder="请选择结束时间"
              v-model="endDateTime"
              autocomplete="off"
            >
              <i slot="prefix" class="el-input__icon el-icon-time"></i>
            </el-input>
            <div class="scItemBtn">
              <el-button
                type="primary"
                class="searchBtn"
                icon="el-icon-search"
                @click="checkCase"
              >查询</el-button>
              <el-button type="warning" class="tryBtn" icon="el-icon-refresh" @click="reset">重置</el-button>
              <!-- <el-button type="success" class="topBtn" icon="el-icon-plus" @click="addNew">新增</el-button>  -->
                <el-button
                v-show="true"
                type="success"
                class="topBtn"
                icon="el-icon-plus"
                @click="ViewInfo"
              >可视化</el-button>
              <el-button type="success" class="searchBtn" @click="getbackgroundImg">背景图</el-button>
            </div>
          </div>
        </div>
        <div class="needApproveContainer">
          <div class="contentTable">
            <div class="table">
              <el-table :data="tableData" max-height="600" style="width:100%;" border>
                <div slot="empty">
                  <div class="noImg">
                    <img src="../../assets/updataImg/NoData.png">
                  </div>
                </div>
                <el-table-column type="index" width="60" align="center" label="序号"></el-table-column>
                <el-table-column prop="caseName" align="center" show-overflow-tooltip label="串并案名称"></el-table-column>
                <el-table-column
                  prop="comboState"
                  align="center"
                  width="120"
                  show-overflow-tooltip
                  v-if="showCase != 0"
                  label="串并案状态"
                ></el-table-column>
                <el-table-column
                  prop="description"
                  align="center"
                  show-overflow-tooltip
                  label="串并案描述"
                ></el-table-column>
                <el-table-column
                  prop="createTime"
                  align="center"
                  show-overflow-tooltip
                  label="创建时间"
                ></el-table-column>
                <el-table-column
                  prop="approveOption"
                  align="center"
                  show-overflow-tooltip
                  v-if="showCase != 0"
                  label="审批意见"
                ></el-table-column>
                <el-table-column
                  prop="caseState"
                  align="center"
                  width="120"
                  show-overflow-tooltip
                  v-if="showCase != 0"
                  label="审批状态"
                  :formatter="formatStatus"
                ></el-table-column>
                <el-table-column
                  prop="approvePerson"
                  align="center"
                  show-overflow-tooltip
                  width="120"
                  v-if="showCase != 0"
                  label="审批人"
                ></el-table-column>
                <el-table-column
                  prop="updateTime"
                  align="center"
                  show-overflow-tooltip
                  label="更新时间"
                ></el-table-column>
                <el-table-column
                  label="操作"
                  :width="($route.path =='/casestudy/caseInfomanage' || checkBtnCase) ? 382 : 382"
                >
                  <template slot-scope="scope">
                    <div>
                      <el-button
                        v-show="isAllcase || scope.row.joinFlag"
                        :disabled="scope.row.caseState == 1"
                        size="mini"
                        class="searchBtn"
                        icon="el-icon-edit"
                        @click="goToEditViewPage(scope.row,scope.$index)"
                      >编辑</el-button>
                      <el-button
                        size="mini"
                        class="topBtn"
                        icon="el-icon-view"
                        @click="goToLookViewPage(scope.row,scope.$index)"
                      >查看</el-button>
                      <el-button
                        size="mini"
                        class="searchBtn"
                        icon="el-icon-caret-right"
                        @click="goToViewPlayer(scope.row,scope.$index)"
                      >播放</el-button>
                      <el-button
                        size="mini"
                        v-show="showCase != 0 && scope.row.caseState != 1 && !checkBtnCase"
                        type="success"
                        class="tryBtn"
                        icon="el-icon-printer"
                        @click="getSubmitTocase(scope.row)"
                      >并案审批</el-button>

                      <!-- <el-button  size="mini"  type="danger"  class="delBtn"  icon='el-icon-delete'  @click="deleteMessage(scope.row,scope.$index)">删除</el-button> -->
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pageNation">
              <pagination
                :total="totalNum"
                :current-page="pageNo"
                :page-size="pageSize"
                @sizeChange="sizeChange"
                @currentChange="currentChange"
              ></pagination>
            </div>
          </div>
        </div>
      </div>
      <div v-show="caseCadeNum == 2" class="content">
        <div class="needApproveContainer">
          <div class="contentTable">
            <div class="table">
              <el-table :data="tableData" max-height="600" style="width:100%;" border>
                <div slot="empty">
                  <div class="noImg">
                    <img src="../../assets/updataImg/NoData.png">
                  </div>
                </div>
                <el-table-column type="index" width="60" align="center" label="序号"></el-table-column>
                <el-table-column prop="caseName" align="center" show-overflow-tooltip label="案件名称"></el-table-column>
                <el-table-column
                  prop="comboState"
                  align="center"
                  show-overflow-tooltip
                  v-if="showCase != 0"
                  label="案件状态"
                ></el-table-column>
                <el-table-column
                  prop="description"
                  align="center"
                  show-overflow-tooltip
                  label="案件描述"
                ></el-table-column>
                <el-table-column
                  prop="createTime"
                  align="center"
                  show-overflow-tooltip
                  label="创建时间"
                ></el-table-column>
                <el-table-column
                  prop="caseState"
                  align="center"
                  show-overflow-tooltip
                  label="审批状态"
                  :formatter="formatStatus"
                ></el-table-column>
                <el-table-column
                  prop="updateTime"
                  align="center"
                  show-overflow-tooltip
                  label="更新时间"
                ></el-table-column>
                <el-table-column
                  prop="creatorOrg"
                  align="center"
                  width="150"
                  show-overflow-tooltip
                  label="部门名称"
                ></el-table-column>
                <el-table-column
                  prop="createUser"
                  align="center"
                  width="150"
                  show-overflow-tooltip
                  label="用户名称"
                ></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <div>
                      <el-button
                        size="mini"
                        type="success"
                        class="topBtn"
                        icon="el-icon-view"
                        @click="seekCaseCade(scope.row,scope.$index)"
                      >查看</el-button>
                      <el-button
                        size="mini"
                        type="primary"
                        class="searchBtn"
                        icon="el-icon-caret-right"
                        @click="goToViewPlayer(scope.row,scope.$index)"
                      >同意</el-button>
                      <el-button
                        :disabled="scope.row.caseState == 1"
                        size="mini"
                        type="warning"
                        class="tryBtn"
                        icon="el-icon-edit"
                        @click="goToEditViewPage(scope.row,scope.$index)"
                      >拒绝</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        class="delBtn"
                        icon="el-icon-delete"
                        @click="deleteMessage(scope.row,scope.$index)"
                      >删除</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pageNation">
              <pagination
                :total="totalNum"
                :current-page="pageNo"
                :page-size="pageSize"
                @sizeChange="sizeChange"
                @currentChange="currentChange"
              ></pagination>
            </div>
          </div>
        </div>
      </div>
      <footer_case></footer_case>
    </div>
    <caseCadeInfo></caseCadeInfo>
  </div>
</template>

<script>
import vehicle from "../../api/vehicle/vehicle.js";
// import '../../common/laydate/laydate.js'
import Footer_case from "../../components/footer_case";
import caseCadeInfo from "./addcaseInfo/caseCadeInfo.vue";
export default {
  components: { Footer_case, caseCadeInfo },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      totalNum: 0,
      beginDateTime: "",
      endDateTime: "",
      tableData: [],
      caseName: "",
      comboState: "",
      createUser: "",
      innerVisible: false, //新增串并案弹窗控制
      caseList: [], //查询的案事件列表
      caseKeyword: "", //案事件搜索关键字
      pageNoCase: 1,
      pageSizeCase: 10,
      totalNumCase: 0,
      orderByCase: "createTime",
      orderTypeCase: "desc",
      multipleSelection: [], //选中的案事件
      //表单项
      caseForm: {
        addCaseName: "",
        addDescription: ""
      },
      //表单验证
      rules: {
        addDescription: [
          { required: false, message: "案件描述", trigger: "blur" },
          { min: 0, max: 255, message: "长度在255 个字符以内", trigger: "blur" }
        ]
      },

      beginTime: null,
      endTime: null,
      caseCadeNum: 1,
      showCase: 0, //0表示没有涉案视频 1 一级案件库 2 二级案件库
      loading: null,
      checkAllCase: false, //是否查看当前所有的串并案结果列表
      checkBtnCase: false, //通过查看当前所有串并案来禁用当前按钮
      isAllcase: true, // 是否展示编辑按钮,默认为true
      checkDisabled: false //禁用切换按钮
    };
  },
  mixins: [vehicle],
  watch: {
    checkAllCase(val) {
      this.pageNo = 1;
      this.checkCase();
    }
  },
  created() {
    if (this.$route.query.currentPage) {
      this.pageNo = this.$route.query.currentPage;
    }
    this.showCase = sessionStorage.getItem("caseVideoLibraryFlag");
    this.checkAllCase = this.$route.query.aaa;
    // 用户是第一次进入还是从编辑，查看页面返回的
    this.viewBack();
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val;
      this.queryAllData();
    },
    currentChange(val) {
      this.pageNo = val;
      this.queryAllData();
    },
    // 查看串并案的信息以及比对信息
    seekCaseCade(row, index) {},
    //切换查看案件
    checkCase() {
      this.pageNo = 1;
      this.queryAllData();
    },
    //获取所有的串并案列表
    // queryAllData(){
    //   let params = {
    //     startTime: this.beginDateTime,
    //     endTime: this.endDateTime,
    //     caseName: this.caseName,
    //     createUser:this.createUser,
    //     comboState: this.comboState,
    //     pageSize: this.pageSize,
    //     pageNum: this.pageNo
    //   };
    //   let data = this.$qs.stringify(params);
    //   this.$http({
    //     url: ' /pca/combo/myCombo/allCaseComboList',
    //     method: 'get',
    //     params:params
    //   }).then((res) => {
    //     if (res.statusText == 'OK' && res.data.code == 200) {
    //        this.checkBtnCase = true
    //        this.tableData = res.data.data.list;
    //        this.totalNum = Number(res.data.data.totalCount)
    //     }else{
    //       this.$notify({
    //         type: 'error',
    //         message: '获取我的串并案列表失败！',
    //         position: 'bottom-right',
    //         duration: 3000
    //       });
    //     }
    //   }).catch(res => {
    //     console.log(res)
    //   })
    // },
    queryAllData() {
      this.checkDisabled = true;
      let urls;
      if (this.checkAllCase) {
        urls = "pca/combo/myCombo/allCaseComboList";
        this.isAllcase = false;
        this.checkBtnCase = true;
      } else {
        urls = "pca/combo/myCombo/caseComboList";
        this.isAllcase = true;
        this.checkBtnCase = false;
      }
      let params = {
        startTime: this.beginDateTime,
        endTime: this.endDateTime,
        caseName: this.caseName,
        createUser: this.createUser,
        comboState: this.comboState,
        pageSize: this.pageSize,
        pageNum: this.pageNo
      };
      let data = this.$qs.stringify(params);
      this.$http({
        url: urls,
        method: "get",
        params: params
      })
        .then(res => {
          if (res.statusText == "OK" && res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.totalNum = Number(res.data.data.totalCount);
            setTimeout(() => {
              this.checkDisabled = false;
            }, 1000);
          } else {
            setTimeout(() => {
              this.checkDisabled = false;
            }, 1000);
            this.$notify({
              type: "error",
              message: "获取我的串并案列表失败！",
              position: "bottom-right",
              duration: 3000
            });
          }
        })
        .catch(res => {
          setTimeout(() => {
            this.checkDisabled = false;
          }, 1000);
          console.log(res);
        });
    },
    //获取自己的串并案列表
    // queryData() {
    //   let params = {
    //     startTime: this.beginDateTime,
    //     endTime: this.endDateTime,
    //     caseName: this.caseName,
    //     createUser:this.createUser,
    //     comboState: this.comboState,
    //     pageSize: this.pageSize,
    //     pageNum: this.pageNo
    //   };
    //   let data = this.$qs.stringify(params);
    //   this.$http({
    //     url: 'pca/combo/myCombo/caseComboList',
    //     method: 'get',
    //     params:params
    //   }).then((res) => {
    //     if (res.statusText == 'OK' && res.data.code == 200) {
    //       this.checkBtnCase = false
    //       this.tableData = res.data.data.list;
    //       this.totalNum = Number(res.data.data.totalCount)
    //     }else{
    //       this.$notify({
    //         type: 'error',
    //         message: '获取我的串并案列表失败！',
    //         position: 'bottom-right',
    //         duration: 3000
    //       });
    //     }
    //   }).catch(res => {
    //     console.log(res)
    //   })
    // },
    //状态码判断
    formatStatus(row, column, cellValue) {
      if (cellValue == 0) {
        return "新建";
      } else if (cellValue == 1) {
        return "审批中";
      } else if (cellValue == 2) {
        return "审批通过";
      } else if (cellValue == 3) {
        return "审批不通过";
      }
    },
    reset() {
      this.checkAllCase = false;
      this.beginDateTime = "";
      this.endDateTime = "";
      this.caseName = "";
      this.createUser = "";
      this.comboState = "";
      this.pageSize = 10;
      this.pageNo = 1;
      this.queryAllData();
      let maxDate = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(), //关键
        date: new Date().getDate(),
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds()
      };
      this.beginTime.config.max = maxDate;
      this.endTime.config.min = "1900-01-01 00:00:00";
    },
    addNew() {
      // console.log('测试打包217');
      this.innerVisible = true;
    },
    //保存串并案
    saveCasCase() {
      let _this = this;
      this.$refs["caseForm"].validate(valid => {
        if (valid) {
          if (this.multipleSelection.length < 2) {
            this.$notify({
              type: "warning",
              message: "至少选择两个案件！",
              position: "bottom-right",
              duration: 3000
            });
            return;
          }
          let ids = [];
          this.multipleSelection.forEach(element => {
            ids.push(element.caseUuid);
          });
          let params = {
            caseName: this.caseForm.addCaseName,
            description: this.caseForm.addDescription,
            ids: ids.join(",")
          };
          let data = this.$qs.stringify(params);
          this.$http({
            url: "pca/combo/myCombo/addCaseComboInfo",
            method: "post",
            data: data
          }).then(res => {
            if (res.data.code === 200) {
              this.$notify({
                type: "success",
                message: "保存串并案成功！",
                position: "bottom-right",
                duration: 3000
              });
              this.$refs["caseForm"].resetFields();
              this.multipleSelection = [];
              this.innerVisible = false;
              this.queryAllData();
            } else if (res.data.code == 100) {
              this.$notify({
                type: "warning",
                message: res.data.message,
                position: "bottom-right",
                duration: 3000
              });
              this.$refs["caseForm"].resetFields();
              this.multipleSelection = [];
              this.innerVisible = false;
            } else {
              this.$notify({
                type: "error",
                message: "保存串并案失败！",
                position: "bottom-right",
                duration: 3000
              });
              this.$refs["caseForm"].resetFields();
              this.multipleSelection = [];
              this.innerVisible = false;
            }
          });
        }
      });
    },
    resetForm() {
      this.$refs["caseForm"].resetFields();
      this.innerVisible = false;
    },
    // 串并案上传到案件库
    getSubmitTocase(row) {
      this.$myconfirm({
        type: "提示",
        msg: "如果串并的案件数据较多，上传时间会较长，是否提交审批？",
        icon: 2,
        btn: {
          ok: "确定",
          no: "取消"
        }
      })
        .then(() => {
          this.loading = this.$loading({
            lock: true,
            background: "rgba(255,255,255,0.4)",
            text: "提交审批中"
          });
          let data = {
            caseCombinationId: row.caseCombinationId
          };
          data = this.$qs.stringify(data);
          this.$http
            .post("vsas/merge/case/upload/caseCombination", data)
            .then(res => {
              this.loading.close();
              if (res.data.code == 200) {
                this.queryAllData();
                this.$notify({
                  type: "success",
                  message: "提交成功",
                  position: "bottom-right",
                  duration: 3000
                });
              } else if (res.data.code == 101) {
                this.$notify({
                  type: "warning",
                  message: "存在审批中或不通过的案事件,不允许提交审批.",
                  position: "bottom-right",
                  duration: 3000
                });
              } else if (res.data.code == 100) {
                this.$notify({
                  type: "warning",
                  message: "更新串并案状态为待审批状态时失败",
                  position: "bottom-right",
                  duration: 3000
                });
              } else {
                this.$notify({
                  type: "error",
                  message: "提交失败",
                  position: "bottom-right",
                  duration: 3000
                });
              }
            });
        })
        .catch(() => {});
    },
    //跳转查看页
    goToLookViewPage(obj) {
      this.$router.push({
        path: "/videoCombat/editMyApprovePage?menuCode=124",
        query: {
          caseCombinationId: obj.caseCombinationId,
          videoCombat: true,
          mycode: 2,
          pageNum: this.pageNo,
          isAllcase: this.checkAllCase
        }
      });
    },
    //跳转播放页
    goToViewPlayer(obj) {
      // let routeData = this.$router.resolve({ path: '/casestudy/caseViewPlayer', query: { caseCombinationId: obj.caseCombinationId ,menuCode: 209, myCombCase:true}});
      let routeData = this.$router.resolve({
        path: "/videoCombat/caseViewPlayer",
        query: {
          caseCombinationId: obj.caseCombinationId,
          menuCode: 124,
          myCombCase: true
        }
      });
      window.open(routeData.href, "_blank");
    },
    //跳转编辑页
    goToEditViewPage(obj) {
      this.$router.push({
        path: "/videoCombat/editMyApprovePage?menuCode=124",
        query: {
          caseCombinationId: obj.caseCombinationId,
          videoCombat: true,
          mycode: 1,
          pageNum: this.pageNo,
          isAllcase: this.checkAllCase
        }
      });
    },
    //删除
    deleteMessage(obj, index) {
      let _this = this;
      this.$myconfirm({
        type: "提示",
        msg: "此操作将永久删除该串并案, 是否继续?",
        icon: 2,
        btn: {
          ok: "确定",
          no: "取消"
        }
      }).then(() => {
        let params = {
          caseCombinationId: obj.caseCombinationId
        };
        let data = _this.$qs.stringify(params);
        this.$http({
          url: "pca/combo/myCombo/delCaseCombo",
          method: "post",
          data: data
        }).then(res => {
          if (res.statusText == "OK" && res.data.code == 200) {
            this.$notify({
              type: "success",
              message: "删除串并案成功！",
              position: "bottom-right",
              duration: 3000
            });
            this.queryAllData();
          } else {
            this.$notify({
              type: "error",
              message: "删除串并案失败！",
              position: "bottom-right",
              duration: 3000
            });
          }
        });
      });
    },

    //获取案件列表
    // getCaseList(){
    //   let params= {
    //     pageNum : this.pageNoCase,
    //     pageSize: this.pageSizeCase,
    //     orderBy: this.orderByCase,
    //     orderType: this.orderTypeCase,
    //     /*基本信息*/
    //     keyword:this.caseKeyword
    //   };
    //   let data = this.$qs.stringify(params);
    //   this.$http({
    //     url: 'pca/search/advanced/newLis111t',
    //     method: 'post',
    //     data:data
    //   }).then(res => {
    //     if ( res.data.code === 200) {
    //       if(res.data.data == "暂无数据"){
    //         this.caseList = [];
    //         this.totalNumCase = 0;
    //       }else{
    //         this.caseList = res.data.data.list;
    //         this.totalNumCase = res.data.data.totalCount;
    //         this.pageSizeCase = res.data.data.pageSize;
    //         this.pageNoCase = res.data.data.pageNum;
    //       }
    //     }else{
    //       this.$notify({
    //         type: 'error',
    //         message: '获取案件列表失败！',
    //         position: 'bottom-right',
    //         duration: 3000
    //       });
    //     }
    //   })
    // },
    // getCaseListReset(){
    //   this.pageNoCase = 1;
    //   this.pageSizeCase = 10;
    //   this.caseKeyword = "";
    //   // this.getCaseList();
    // },
    // 监听每页条数
    // handleSizeChangeCase(val) {
    //   this.pageSizeCase = val;
    //   this.pageNoCase = 1; //更改每页条数时，从第一页开始
    //   // this.getCaseList();
    // },
    // 监听当前页码
    // handleCurrentChangeCase(val) {
    //   this.pageNoCase = val;
    //   // this.getCaseList();
    // },
    //添加案事件
    addItem(item) {
      this.multipleSelection.push(item);
    },
    //移出选中的案事件
    removeItem(item) {
      let targetIndex = null;
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i].caseUuid === item.caseUuid) {
          targetIndex = i;
        }
      }
      this.multipleSelection.splice(targetIndex, 1);
    },
    //判断是否在数组里
    inArray(item) {
      let flag = false;
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i].caseUuid === item.caseUuid) {
          flag = true;
        }
      }
      return flag;
    },

    // 检测用户是否从查看页面返回的
    viewBack() {
      if (this.$route.query.currentPage) {
        this.pageNo = Number(this.$route.query.currentPage);
      }
    },
    //可视化
    ViewInfo() {
      this.$router.push("/videoCombat/viewinfo");
    },
    getbackgroundImg() {
      this.$router.push("/videoCombat/caseInfoExhibition");
    }
  },
  mounted: function() {
    // setTimeout(()=>{
    //   this.pageNo = 2
    // },2000)
    //初始化列表
    // if(this.pageNo != 1){
    // }
    // this.viewBack();
    this.queryAllData();
    //  console.log(this.pageNo,"每次进来的时候的页数");
    let _this = this;
    // this.getCaseList();
    this.beginTime = laydate.render({
      elem: "#beginTime",
      type: "datetime",
      btns: ["now", "confirm"],
      max: this.getCurrentDate(),
      done: function(value, date) {
        _this.beginDateTime = value;
        _this.endTime.config.min = {
          year: date.year,
          month: date.month - 1, //关键
          date: date.date,
          hours: date.hours,
          minutes: date.minutes,
          seconds: date.seconds
        };
      }
    });
    this.endTime = laydate.render({
      elem: "#endTime",
      type: "datetime",
      btns: ["now", "confirm"],
      max: 1,
      done: function(value, date) {
        _this.endDateTime = value;
        _this.beginTime.config.max = {
          year: date.year,
          month: date.month - 1, //关键
          date: date.date,
          hours: date.hours,
          minutes: date.minutes,
          seconds: date.seconds
        };
      }
    });
  }
};
</script>


<style lang="scss" scoped>
@import "../../assets/css/case_common.css";
@import "../../assets/css/commom.css";
.searchCondition {
  height: 0.56rem;
  width: 100%;
  display: flex;
  font-size: 0.14rem;
  padding-left: 0.2rem;
  align-items: center;
  color: #606266;
  line-height: 0.56rem;
}
.scItemP {
  margin: 0 0.1rem;
  font-size: 0.14rem;
  color: #99c9fa;
}
.scItemBtn {
  margin-left: 0.1rem;
}
.scItemBtn .el-button {
  /*width: 1rem;*/
  height: 0.28rem;
  font-size: 0.14rem;
  padding: 0 7px;
}
.scItemBtn .el-button + .el-button {
  margin-left: 0.1rem;
}

.searchCondition .caseNameSelect {
  width: 1.77rem;
  font-size: 0.14rem;
//   color: #606266;
 color: #99C9FA;
  height: 0.28rem;
  line-height: 0.28rem;
  margin-right: 0.15rem;
}
.searchCondition .timeSelect {
  margin-right: 0;
}
.contentTitle {
  height: 0.56rem;
  width: 100%;
  display: flex;
  align-items: center;
}
.el-checkbox /deep/ .el-checkbox__label,
.el-checkbox /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #99c9fa;
}

.needApproveContainer {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}
.el-select {
  margin-right: 0.1rem;
}
.el-select >>> .el-input__inner {
  height: 0.4rem;
}
.el-checkbox
  /deep/
  .el-checkbox__input.is-disabled.is-checked
  .el-checkbox__inner {
  background-color: #409eff;
  border-color: #409eff;
}
.el-checkbox /deep/ .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #99c9fa;
}

.needApproveContainer {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}
.el-select {
  margin-right: 0.1rem;
}
.el-select >>> .el-input__inner {
  height: 0.4rem;
}

.searchCondition /deep/ .el-button + .el-button {
  margin-left: 0;
}

.approveBtn {
  width: 80px;
  height: 30px;
  background-color: #67c23a;
  color: white;
  border-radius: 3px;
  margin: 5px auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.caseNameSelect {
  width: 1.5rem;
  color: #c5c5c5;
}
.caseNameSelectDate {
  width: 2rem;
  font-size: 0.14rem;
}
.playBtn {
  width: 80px;
  height: 30px;
  background-color: #409eff;
  color: white;
  border-radius: 3px;
  margin: 5px auto;
  margin-left: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-checkbox /deep/ .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #99c9fa;
}
.el-checkbox
  /deep/
  .el-checkbox__input.is-disabled.is-checked
  .el-checkbox__inner {
  background-color: #409eff;
  border-color: #409eff;
}

.editBtn {
  width: 80px;
  height: 30px;
  background-color: #e6a23c;
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
  padding: 0 0.15rem;
}
.caseForm {
  padding: 0 0.15rem;
}
.caseForm >>> .el-form-item__label {
  font-size: 0.14rem;
}

.caseSearch_pop {
  display: flex;
  margin: 0.1rem 0;
  align-items: center;
  justify-content: flex-end;
}
.caseSearch_pop input {
  width: 3rem;
  margin-right: 0.1rem;
  font-size: 0.14rem;
  height: 0.3rem;
  line-height: 0.3rem;
}
.caseSearch_pop .el-button {
  padding: 0.07rem 0.1rem;
  font-size: 0.14rem;
}
.cases {
  font-size: 0.14rem;
  margin: 0 4px;
  height: 0.32rem;
  line-height: 0.3rem;
}
.el-select >>> .el-input__inner {
  height: 0.28rem;
}
.searchCondition .caseNameSelect >>> .el-input__inner {
  height: 0.28rem;
}
.searchCondition .caseNameSelect {
  height: 0.28rem;
}
.allCase {
  margin-right: 0.2rem;
}
</style>

