<!--
 * @Author: chenxf
 * @Date: 2020-05-17 16:45:20
 * @LastEditTime : 2021-01-11 14:59:35
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\page\casestudy\cascadeView.vue
 * @
 -->
<template>
  <div class="wrapper">
    <!-- <div class="topNav">
      <router-link class="nav-item" tag="div" :to="{path:'/casestudy',query:{menuCode:200}}"></router-link>
      <div  class="nav-item nav-item-search">串并案查看</div>
    </div>-->
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link class="sysname" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 ></router-link>
      <p class="sysname">&nbsp;并案查看</p>
    </div>
    <div class="contentBody">
      <div class="content">
        <div class="contentTitle">
          <div class="searchCondition">
            <div class="scItem">并案名称:&nbsp;&nbsp;</div>
            <input class="caseNameSelect" type="text" v-model="caseName" placeholder="请输入并案名称">
            <div class="scItem">创建用户:&nbsp;&nbsp;</div>
            <input class="caseNameSelect" type="text" v-model="createUser" placeholder="请输入创建用户">
            <!-- <div class="scItem">创建用户:&nbsp;&nbsp; </div>
            <input class="caseNameSelect" type="text" v-model="createUser" >-->
            <div class="scItem">创建时间:&nbsp;&nbsp;</div>
            <el-input
              id="beginTime"
              class="caseNameSelect timeSelect"
              placeholder="请选择开始时间"
              autocomplete="off"
              v-model="beginDateTime"
            >
              <i slot="prefix" class="el-input__icon el-icon-time"></i>
            </el-input>
            <p class="scItemP">-</p>
            <el-input
              id="endTime"
              class="caseNameSelect timeSelect"
              placeholder="请选择结束时间"
              autocomplete="off"
              v-model="endDateTime"
            >
              <i slot="prefix" class="el-input__icon el-icon-time"></i>
            </el-input>

            <div class="scItemBtn">
              <el-button
                type="primary"
                class="searchBtn"
                icon="el-icon-search"
                @click="historyNal()"
              >查询</el-button>
              <el-button type="warning" class="tryBtn" icon="el-icon-refresh" @click="getReset()">重置</el-button>
              <el-button type="success" class="topBtn" icon="el-icon-plus" @click="addNew">新增</el-button>
            </div>
          </div>
        </div>
        <!--串并案查看页面-->
        <div class="needApproveContainer">
          <div class="contentTable">
            <div class="table">
              <el-table :data="tableData" max-height="600" style="width:100%;" border>
                <div slot="empty">
                  <div class="noImg">
                    <img src="../../assets/updataImg/NoData.png">
                  </div>
                </div>
                <el-table-column type="index" align="center" width="60" label="序号"></el-table-column>
                <el-table-column prop="caseName" align="center" show-overflow-tooltip label="并案名称"></el-table-column>
                <el-table-column
                  prop="comboState"
                  align="center"
                  show-overflow-tooltip
                  :formatter="formatcomStatus"
                  label="案件状态"
                ></el-table-column>
                <el-table-column
                  prop="description"
                  align="center"
                  show-overflow-tooltip
                  label="并案描述"
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
                  prop="createUser"
                  align="center"
                  show-overflow-tooltip
                  label="创建用户"
                ></el-table-column>
                <!-- <el-table-column
                prop="creatorOrg"
                align="center"
                show-overflow-tooltip
                label="创建部门">
                </el-table-column>-->
                <el-table-column label="操作" align="center" min-width="120">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="success"
                      icon="el-icon-view"
                      class="topBtn"
                      @click="goToLookViewPage(scope.row,scope.$index)"
                    >查看</el-button>
                    <el-button
                      size="mini"
                      type="primary"
                      class="searchBtn"
                      icon="el-icon-caret-right"
                      @click="goToViewPlayer(scope.row,scope.$index)"
                    >播放</el-button>
                    <!-- <el-button  size="mini" v-show="showclomn == 2 && showCase == 2 &&
                  (scope.row.caseState == 2 || scope.row.caseState == null)"  type="primary"  class="searchBtn"
                    icon='el-icon-caret-right'  @click="getSubmitTocase(scope.row)">并案审批</el-button>-->
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="pageNation">
            <el-pagination
              style="float: right;margin-right: 10px;"
              :background="true"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="Number(pageNo)"
              :page-sizes="[10, 20, 30, 40, 50, 100]"
              :page-size="Number(pageSize)"
              layout="total, sizes, prev, pager, next, jumper"
              :total="Number(totalNum)"
            ></el-pagination>
          </div>
        </div>
      </div>
      <footer_case></footer_case>

      <el-dialog
        width="60%"
        title="新增串并案"
        :visible.sync="innerVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="closeDia()"
        append-to-body
      >
        <el-form
          :model="caseForm"
          :rules="rules"
          ref="caseForm"
          label-width="100px"
          class="demo-caseForm caseForm"
        >
          <el-form-item label="串并案名称" prop="addCaseName">
            <el-input v-model="caseForm.addCaseName" placeholder="请输入串并案名称"></el-input>
          </el-form-item>
          <el-form-item label="串并案描述" prop="addDescription">
            <el-input
              type="textarea"
              v-model="caseForm.addDescription"
              :rows="2"
              placeholder="请输入串并案描述"
            ></el-input>
          </el-form-item>
          <el-form-item label="添加案件" prop="cases">
            <el-tag
              class="cases"
              v-for="tag in multipleSelection"
              :key="tag.caseUuid"
              @close="removeItem(tag)"
              closable
            >{{tag.caseName}}</el-tag>
          </el-form-item>
        </el-form>
        <div class="contentTable">
          <div class="caseSearch_pop">
            <input v-model="caseKeyword" type="text" placeholder="请输入案件名称">
            <el-button
              type="primary"
              class="searchBtn"
              icon="el-icon-search"
              @click="pageNoCase=1; getCaseList()"
            >搜索</el-button>
            <el-button
              type="warning"
              class="tryBtn"
              icon="el-icon-refresh"
              @click="getCaseListReset()"
            >重置</el-button>
          </div>
          <div class="table">
            <el-table :data="caseList" height="300" style="width:100%;" border>
              <div slot="empty">
                <div class="noImg">
                  <img src="../../assets/updataImg/NoData.png">
                </div>
              </div>
              <el-table-column type="index" width="60" align="center" label="序号"></el-table-column>
              <el-table-column
                prop="caseLinkMark"
                align="center"
                show-overflow-tooltip
                label="案件编号"
              ></el-table-column>
              <el-table-column prop="caseName" align="center" show-overflow-tooltip label="案件名称"></el-table-column>
              <el-table-column
                prop="caseCategoryDesc"
                align="center"
                show-overflow-tooltip
                label="案件类型"
              ></el-table-column>
              <el-table-column
                prop="caseAbstract"
                align="center"
                show-overflow-tooltip
                label="案件描述"
              ></el-table-column>
              <el-table-column prop="creatorName" align="center" show-overflow-tooltip label="创建用户"></el-table-column>
              <el-table-column prop="creatorOrg" align="center" show-overflow-tooltip label="创建部门"></el-table-column>
              <el-table-column prop="createTime" align="center" show-overflow-tooltip label="创建时间"></el-table-column>
              <el-table-column label="操作" align="center" min-width="100">
                <template slot-scope="scope">
                  <div>
                    <el-button
                      v-if="!inArray(scope.row)"
                      size="mini"
                      type="success"
                      class="topBtn"
                      icon="el-icon-plus"
                      @click="addItem(scope.row)"
                    ></el-button>
                    <el-button
                      v-if="inArray(scope.row)"
                      size="mini"
                      type="danger"
                      class="delBtn"
                      icon="el-icon-delete"
                      @click="removeItem(scope.row)"
                    ></el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pageNation">
            <el-pagination
              style="float: right;margin-right: 10px;"
              :background="true"
              @size-change="handleSizeChangeCase"
              @current-change="handleCurrentChangeCase"
              :current-page="Number(this.pageNoCase)"
              :page-sizes="[10, 20, 30, 40, 50, 100]"
              :page-size="Number(this.pageSizeCase)"
              layout="total, sizes, prev, pager, next, jumper"
              :total="Number(this.totalNumCase)"
            ></el-pagination>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="cancleBtn" type="primary" @click="resetForm()">取消</el-button>
          <el-button class="passBtn" type="primary" @click="saveCasCase()">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import vehicle from "../../api/vehicle/vehicle.js";
import "../../common/laydate/laydate.js";
import Footer_case from "../../components/footer_case";
export default {
  components: {
    Footer_case
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      totalNum: 0,
      beginDateTime: "",
      endDateTime: "",
      tableData: [],
      caseName: "",
      comboState: 0,
      createUser: "",
      beginTime: null,
      endTime: null,
      pageNoCase: 1,
      pageSizeCase: 10,
      totalNumCase: 100,
      multipleSelection: [], //选中的案事件
      caseKeyword: "",
      //表单项
      caseForm: {
        addCaseName: "",
        addDescription: ""
      },
      caseList: [],
      //表单验证
      rules: {
        addCaseName: [
          { required: true, message: "请输入串并案名称", trigger: "blur" },
          { min: 3, max: 50, message: "长度在3-50个字符以内", trigger: "blur" }
        ],
        addDescription: [
          { required: true, message: "请输入串并案描述", trigger: "blur" },
          { min: 0, max: 255, message: "长度在255 个字符以内", trigger: "blur" }
        ]
      },
      innerVisible: false,
      showclomn: "",
      showCase: 0, //0表示没有涉案视频 1 一级案件库 2 二级案件库
      createUser: ""
    };
  },
  mixins: [vehicle],
  created() {
    // this.viewBack();
    // this.historyNal();  //初始化列表
    this.showclomn = sessionStorage.getItem("currentDeploymentType");
    this.showCase = sessionStorage.getItem("caseVideoLibraryFlag");
  },
  methods: {
    // 监听每页条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.queryData();
    },
    // 监听当前页码
    handleCurrentChange(val) {
      this.pageNo = val;
      this.queryData();
    },
    handleSizeChangeCase(val) {
      this.pageSizeCase = val;
      this.pageNoCase = 1; //更改每页条数时，从第一页开始
      this.getCaseList();
    },
    handleCurrentChangeCase(val) {
      this.pageNoCase = val;
      this.getCaseList();
    },
    historyNal() {
      // this.pageNo = 1
      this.viewBack();
      this.queryData();
    },
    //获取列表
    queryData() {
      this.$http({
        url: "pca/combo/comboCase/caseComboList",
        method: "get",
        params: {
          startTime: this.beginDateTime,
          endTime: this.endDateTime,
          caseName: this.caseName,
          comboState: this.comboState,
          createUser: this.createUser,
          pageSize: this.pageSize,
          pageNum: this.pageNo,
          creatorName: this.createUser
        }
      })
        .then(res => {
          if (res.statusText == "OK" && res.data.code == 200) {
            this.tableData = res.data.data.list;
            this.totalNum = res.data.data.totalCount;
          } else {
            this.$notify({
              type: "error",
              message: "获取串并案列表失败！",
              position: "bottom-right",
              duration: 3000
            });
            // layer.alert('获取串并案列表失败！',{icon:5,title:"消息提示"});
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    formatcomStatus(row, column, cellValue) {
      if (cellValue == 0) {
        return "并案";
      } else if (cellValue == 1) {
        return "串案";
      }
    },
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
    //重置
    getReset() {
      this.caseName = "";
      this.comboState = 0;
      this.createUser = "";
      this.beginDateTime = "";
      this.endDateTime = "";
      this.pageSize = 10;
      this.pageNo = 1;
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
      this.queryData();
    },
    //跳转查看页
    goToLookViewPage(obj) {
      this.$router.push({
        path: "/casestudy/editMyApprovePage?menuCode=219",
        query: {
          caseCombinationId: obj.caseCombinationId,
          mycode: 3,
          pageNum: this.pageNo
        }
      });
    },
    // 串并案上传到案件库
    getSubmitTocase(row) {
      // console.log(row,2222);
      // return
      console.log("YYYYYYYYYYY");
      let data = {
        caseCombinationId: row.caseCombinationId
      };
      data = this.$qs.stringify(data);
      this.$http
        .post("vsas/merge/case/upload/caseCombination", data)
        .then(res => {
          if (res.data.code == 200) {
            this.getApproveHistoryList();
            this.$notify({
              type: "success",
              message: "提交成功",
              position: "bottom-right",
              duration: 3000
            });
          } else {
            this.$notify({
              type: "success",
              message: "提交失败",
              position: "bottom-right",
              duration: 3000
            });
          }
        });
    },

    //跳转播放页
    goToViewPlayer(obj) {
      // this.$router.push({
      //   path: '/casestudy/caseViewPlayer?menuCode=200',
      //   query: {
      //     caseCombinationId: obj.caseCombinationId
      //   }
      // })
      let routeData = this.$router.resolve({
        path: "/casestudy/caseViewPlayer",
        query: {
          caseCombinationId: obj.caseCombinationId,
          menuCode: 219,
          allCombCase: true
        }
      });
      window.open(routeData.href, "_blank");
    },
    //新增串并案
    addNew() {
      this.getCaseList();
      this.innerVisible = true;
    },
    //查询
    getCaseList() {
      // if(this.caseKeyword !='' || this)
      let data = {
        pageNum: this.pageNoCase,
        pageSize: this.pageSizeCase,
        orderBy: "update_time",
        orderType: "desc",
        begin: "",
        end: "",
        caseName: this.caseKeyword,
        caseCategory: "",
        approvalStatus: 2,
        status: 1,
        synergy: -1
      };
      this.$http
        .get("/pca/casemng/basecase/list", { params: data })
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.data.list.length == 0) {
              this.caseList = [];
              this.totalNumCase = 0;
            } else {
              this.caseList = res.data.data.list;
              this.totalNumCase = res.data.data.totalCount;
              this.pageSizeCase = res.data.data.pageSize;
              this.pageNoCase = res.data.data.pageNum;
            }
          }
        });

      // let params= {
      //   pageNum : this.pageNoCase,
      //   pageSize: this.pageSizeCase,
      //   orderBy: this.orderByCase,
      //   orderType: this.orderTypeCase,
      //   /*基本信息*/
      //   keyword:this.caseKeyword
      // };
      // let data = this.$qs.stringify(params);
      // this.$http({
      //   url: 'pca/search/advanced/newList',
      //   method: 'post',
      //   data:data
      // }).then(res => {
      //   if ( res.data.code === 200) {
      //     if(res.data.data == "暂无数据"){
      //       this.caseList = [];
      //       this.totalNumCase = 0;
      //     }else{
      //       this.caseList = res.data.data.list;
      //       this.totalNumCase = res.data.data.totalCount;
      //       this.pageSizeCase = res.data.data.pageSize;
      //       this.pageNoCase = res.data.data.pageNum;
      //     }
      //   }else{
      //     this.$notify({
      //       type: 'error',
      //       message: '获取案件列表失败！',
      //       position: 'bottom-right',
      //       duration: 3000
      //     });
      //   }
      // })
    },
    //重置
    getCaseListReset() {
      this.pageNoCase = 1;
      this.pageSizeCase = 10;
      this.caseKeyword = "";
      this.getCaseList();
    },
    //取消
    resetForm() {
      this.$refs["caseForm"].resetFields();
      this.innerVisible = false;
    },
    //确定
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
              this.queryData();
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
    //判断是否在数组中
    inArray(item) {
      let flag = false;
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i].caseUuid === item.caseUuid) {
          flag = true;
        }
      }
      return flag;
    },
    //添加
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
    closeDia() {
      this.multipleSelection = [];
    },
    viewBack() {
      console.log(this.$route.query.currentPage, "这个值有没有传过来");
      if (this.$route.query.currentPage) {
        this.pageNo = Number(this.$route.query.currentPage);
      } else {
        this.pageNo = 1;
      }
    }
  },
  beforeMount() {
    this.historyNal();
  },
  mounted: function() {
    // this.historyNal()
    let _this = this;
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


<style scoped>
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
.scItem {
  min-width: 68px;
  font-size: 0.14rem;
  color: #99c9fa;
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
  padding: 0 10px;
  height: 0.3rem;
  font-size: 0.14rem;
}
.scItemBtn .el-button + .el-button {
  margin-left: 0.1rem;
}

.searchCondition .caseNameSelect {
  width: 1.77rem;
  font-size: 0.14rem;
  height: 0.3rem;
  line-height: 0.3rem;
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

.needApproveContainer {
  /*width: 100%;*/
  /*height: calc(100% - 0.56rem);*/
  flex: 1;
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
  background-color: #67c23a;
  color: white;
  border-radius: 3px;
  margin: 5px auto;
  margin-right: 5px;
  cursor: pointer;
  display: inline-block;
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
  display: inline-block;
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
.cases {
  font-size: 0.14rem;
  margin: 0 4px;
  height: 0.32rem;
  line-height: 0.3rem;
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
.el-tag {
  max-width: 3rem;
  padding: 0 10px;
  padding-right: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
}
.el-tag >>> .el-icon-close {
  position: absolute;
  top: 7px;
  right: 5px;
}
.cases {
  background-color: transparent;
  color: #99c9fa;
  border: 1px solid #134276;
}
.el-tag >>> .el-tag__close {
  color: #99c9fa;
}
.el-tag >>> .el-tag__close:hover {
  background-color: transparent;
}
</style>

