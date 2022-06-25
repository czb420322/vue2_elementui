<!--
 * @Author: chenxf
 * @Date: 2020-05-17 16:45:20
 * @LastEditTime : 2021-06-08 13:51:30
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\page\casestudy\caseinfomanage.vue
 * @
 -->
<template>
  <div class="wrapper">
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link
        class="sysname"
        v-show="!ismyupload"
        :to="{path:'/casestudy',query:{menuCode:200}}"
      >案件库 ></router-link>
      <router-link
        class="sysname"
        v-show="ismyupload"
        :to="{path:'/videoCombat',query:{menuCode:100}}"
      >视频侦查></router-link>
      <!-- <router-link v-if="mycase" class="sysname" :to="{path:'/videoCombat/caseInfomanage',query:{synergy:'-1',menuCode: 120,ismyupload:true}}">案事件信息管理 ></router-link> -->
      <p class="sysname" v-show="!ismyupload">&nbsp;案事件信息管理</p>
      <p class="sysname" v-show="ismyupload">&nbsp;我的案事件</p>
    </div>

    <div class="content">
      <div id="tab1" class="needApproveContainer">
        <!-- <div class="needApproveTitle">
          <div class="needApproveTitleIcon"></div>
          <div class="needApproveTitleTxt">串并案待审批列表</div>
        </div>-->
        <div class="searchCondition">
          <div v-show="showCase == 0" class="titleColor allCase">
            <el-checkbox :disabled="checkDisabled" v-model="checkAllCase">查看全部案件</el-checkbox>
          </div>
          <div style="margin-top: 0.05rem;min-width: 0.68rem" class="titleColor">案件名称:&nbsp;&nbsp;</div>
          <input
            autocomplete="off"
            type="text"
            v-model="searchData.caseName"
            style="padding-left:5px"
            placeholder="请输入案件名称"
          >
          <div
            style="margin-top: 0.05rem;margin-left: 0.2rem;min-width: 0.68rem"
            class="titleColor"
          >案件类型:&nbsp;&nbsp;</div>
          <el-select v-model="searchData.caseType" class="caseNameSelect" placeholder="请选择案件类型">
            <el-option value label="全部"></el-option>
            <el-option
              v-for="(item,index) in CaseType"
              :value="item.value"
              :lable="item.value"
              :key="index"
            ></el-option>
          </el-select>
          <div
            style="margin-top: 0.05rem;margin-left: 0.2rem;min-width: 0.68rem"
            class="titleColor"
          >审批状态:&nbsp;&nbsp;</div>
          <el-select
            class="caseNameSelect"
            v-model="searchData.approvalStatus"
            placeholder="请选择审批状态"
          >
            <el-option value label="全部"></el-option>
            <el-option v-show="showclomn == 1" value="0" label="新建"></el-option>
            <el-option value="1" label="审批中"></el-option>
            <el-option value="2" label="审批通过"></el-option>
            <el-option
              v-show="(showclomn == 2 && showCase == 2) || showclomn == 1"
              value="3"
              label="审批不通过"
            ></el-option>
          </el-select>
          <div
            style="margin-top: 0.05rem;margin-left: 0.2rem;min-width: 0.68rem"
            class="titleColor"
          >是否协同:&nbsp;&nbsp;</div>
          <el-select class="caseNameSelect" v-model="synergy" placeholder="请选择是否协同">
            <el-option value="-1" label="全部"></el-option>
            <el-option value="0" label="非协同"></el-option>
            <el-option value="1" label="协同"></el-option>
          </el-select>
          <div
            style="margin-top: 0.05rem;margin-left: 0.2rem;min-width: 0.68rem"
            class="titleColor"
          >案发时间:&nbsp;</div>
          <el-input
            id="timeBegin"
            class="caseNameSelect caseNameSelectDate"
            placeholder="请选择开始时间"
            autocomplete="off"
            readonly
            v-model="searchData.beginDateTime"
          >
            <i slot="prefix" class="el-input__icon el-icon-time"></i>
          </el-input>
          <span class="to">-</span>
          <el-input
            id="timeEnd"
            class="caseNameSelect caseNameSelectDate"
            placeholder="请选择结束时间"
            autocomplete="off"
            readonly
            v-model="searchData.endDateTime"
          >
            <i slot="prefix" class="el-input__icon el-icon-time"></i>
          </el-input>
          <div style="margin-left: 0.1rem;">
            <el-button
              style="margin-left:0.2rem"
              type="primary"
              class="searchBtn"
              icon="el-icon-search"
              @click="currentPage = 1;queryCase()"
            >查询</el-button>
            <el-button type="warning" icon="el-icon-refresh" class="tryBtn" @click="refresh">重置</el-button>
            <el-button
              type="success"
              class="searchBtn"
              v-show="ismyupload"
              icon="el-icon-plus"
              @click="goaddcase"
            >新增</el-button>
            <!-- <el-upload
                v-show="false"
              class="uploadCase"
              action="pca/generate/uploadCaseZip"
              name="file"
              ref="upload"
              :limit="10"
              accept=".zip"
              :before-upload="batchExportUpload"
              multiple
            >
              <el-button type="success" class="searchBtn" icon="el-icon-plus">批量导入</el-button>
            </el-upload>-->
          </div>
        </div>
        <p class="hr"></p>
        <div class="contentTable">
          <el-table :data="tableData" border stripe class="tables" height="4.83rem">
            <div slot="empty">
              <div class="noImg">
                <img src="../../assets/updataImg/NoData.png">
              </div>
            </div>
            <el-table-column show-overflow-tooltip prop="caseLinkMark" width="80" label="案件编号"></el-table-column>
            <el-table-column prop="caseName" show-overflow-tooltip width="150" label="案件名称"></el-table-column>
            <el-table-column prop="caseCategoryDesc" show-overflow-tooltip width="80" label="案件类型"></el-table-column>
            <el-table-column prop="regionFullName" show-overflow-tooltip label="案件区域"></el-table-column>
            <el-table-column prop="placeFullAddress" show-overflow-tooltip label="案发详址"></el-table-column>
            <el-table-column prop="caseAbstract" show-overflow-tooltip label="简要案情"></el-table-column>
            <el-table-column prop="timeLowLimit" show-overflow-tooltip label="案发时间" width="160"></el-table-column>
            <el-table-column
              prop="stateDesc"
              show-overflow-tooltip
              width="80"
              v-show="showclomn == 1 && showCase != 0"
              label="案件状态"
            ></el-table-column>
            <el-table-column
              prop="isSpecial"
              show-overflow-tooltip
              width="80"
              :formatter="formaIsSpecial"
              label="协同作战"
            ></el-table-column>
            <el-table-column prop="creatorName" show-overflow-tooltip width="80" label="创建用户"></el-table-column>
            <el-table-column
              prop="updateTime"
              v-if="$route.path != '/casestudy/caseInfomanage'"
              width="160"
              show-overflow-tooltip
              label="修改时间"
            ></el-table-column>
            <el-table-column
              v-if="$route.path == '/casestudy/caseInfomanage'"
              width="160"
              prop="uploadTime"
              show-overflow-tooltip
              label="上传时间"
            ></el-table-column>
            <el-table-column
              prop="approvalStatus"
              show-overflow-tooltip
              width="80"
              v-if="showCase != 0"
              :formatter="formaApprovalStatus"
              label="审批状态"
            ></el-table-column>
            <el-table-column
              v-if="showclomn == 2 && showCase == 2"
              prop="twiceApprovalStatus"
              show-overflow-tooltip
              width="110"
              :formatter="formaApprovalStatus"
              label="二级审批状态"
            ></el-table-column>
            <el-table-column
              prop="approvePerson"
              show-overflow-tooltip
              width="80"
              v-if="showCase != 0"
              label="审批人"
            ></el-table-column>
            <!-- <el-table-column
              prop="approveOption"
              show-overflow-tooltip
              width="80"
              v-if="showCase != 0"
              label="审批意见">
            </el-table-column>-->
            <el-table-column
              :width="($route.path =='/casestudy/caseInfomanage' || checkAllBtn) ? 300 : 400"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  v-show="ismyupload && scope.row.joinFlag"
                  :disabled="scope.row.approvalStatus == 1 || scope.row.approvalStatus == 4"
                  class="searchBtn"
                  icon="el-icon-edit"
                  @click="edit(scope.row,scope.row.caseUuid,true)"
                >编辑</el-button>
                <el-button
                  type="primary"
                  v-show="ismyupload"
                  class="topBtn"
                  icon="el-icon-view"
                  @click="govideodetails(scope.row)"
                >详情</el-button>
                <el-button
                  type="success"
                  v-show="!ismyupload"
                  class="topBtn"
                  icon="el-icon-view"
                  @click="godetails(scope.row.caseUuid)"
                >详情</el-button>
                <el-button
                  type="danger"
                  v-show="ismyupload  && scope.row.creator == $storage.getSession('userInfo').userId"
                  class="delBtn"
                  icon="el-icon-circle-close"
                  @click="openDelWin(scope.row.caseUuid)"
                >删除</el-button>
                <el-button
                  type="danger"
                  :disabled="scope.row.approvalStatus == 1 || scope.row.approvalStatus == 4"
                  v-show="showclomn == 1 && !checkAllBtn && showCase != 0 && scope.row.creator == $storage.getSession('userInfo').userId"
                  class="tryBtn"
                  icon="el-icon-printer"
                  @click="getSubmitTocase(scope.row)"
                >提交审批</el-button>
                <!-- 217上传案件库 -->
                <el-button
                  type="danger"
                  v-show="showCase == 2 && !checkAllBtn &&  showclomn == 2 && scope.row.approvalStatus == 2 && (scope.row.twiceApprovalStatus == 2 ||  scope.row.twiceApprovalStatus == null)"
                  class="tryBtn"
                  icon="el-icon-printer"
                  @click="getSubmitTocase(scope.row)"
                >提交审批</el-button>
                <!-- 225上传案件库 -->
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="pageNation">
          <pagination
            :total="totalCount"
            :current-page="currentPage"
            :page-size="pageSize"
            @sizeChange="sizeChange"
            @currentChange="currentChange"
          ></pagination>
        </div>
      </div>
    </div>
    <div class="footer">
      <img src="../../assets/logo.png">武汉大千信息技术有限公司&copy;版权所有 2008-2019
    </div>
    <batchEduce :isEduce="isEduce" @childEduce="childEduce" @childData="childData"></batchEduce>
  </div>
</template>

<script>
import "../../common/laydate/laydate.js";
import vehicle from "../../api/vehicle/vehicle.js";
import batchEduce from "../../components/batchEduce";
export default {
  components: { batchEduce },
  data() {
    return {
      //查询数据
      searchData: {
        caseName: "",
        caseType: "",
        beginDateTime: "",
        endDateTime: "",
        approvalStatus: ""
      },
      CaseType: [],
      tableData: [],
      totalCount: 0,
      currentPage: 1, // 当前页码
      pageSize: 10, //每页显示的条数
      pageSizes: [10, 20, 30], //下拉框选择的显示条数
      timeBegin: "",
      timeEnd: "",
      layerOpen: "",
      layerOpen1: "",
      ismyupload: "", //是否是我的案事件
      synergy: "-1", //查询是否是我的协同
      showclomn: 1, //1表示实战平台 2 一级案件库 3 二级案件库
      showCase: 0, //0表示没有涉案视频 1 一级案件库 2 二级案件库
      loading: null,
      checkAllCase: false, //是否查看当前所有案件
      checkAllBtn: false, //通过查看当前所有案件来禁用按钮
      checkDisabled: false,
      isEduce: false, // 批量导入弹层
      kakou: [], //当前案件的所有卡口点集合
    };
  },
  mixins: [vehicle],
  created() {
    this.getCaseType();
    this.showclomn = sessionStorage.getItem("currentDeploymentType");
    this.showCase = sessionStorage.getItem("caseVideoLibraryFlag");
    this.ismyupload = this.$route.query.ismyupload;
    this.synergy = this.$route.query.synergy;

    this.checkAllCase = this.$route.query.aaa ? this.$route.query.aaa : false;
    this.checkAllBtn = this.$route.query.aaa ? this.$route.query.aaa : false;
    if (this.showCase == 0) {
      this.$nextTick(() => {
        if (this.checkAllCase) {
          this.checkAllList();
        } else {
          this.ajaxCaseList();
        }
      });
    } else {
      this.ajaxCaseList();
    }
  },

  destroyed() {
    this.checkAllCase = false;
    this.checkAllBtn = false;
  },
  watch: {
    checkAllCase(val) {
      if (this.showCase == 0) {
        if (val) {
          this.currentPage = 1;
          this.checkAllList();
        } else {
          this.currentPage = 1;
          this.ajaxCaseList();
        }
      }
    }
  },
  methods: {
    //案件类型
    getCaseType() {
      this.$http.get("sms/static/getTypeByCode?code=CaseType").then(res => {
        if (res.data.code == 200) {
          this.CaseType = res.data.data;
        }
      });
    },
    // 新增
    goaddcase() {
      let data = {
        caseLinkMark: "", //案件编号
        caseName: "未知", //案发名称
        timeLowLimit: this.getCurrentDate(), //案发开始时间
        timeUpLimit: this.getCurrentDate(), //案发结束时间
        placeCode: sessionStorage.getItem("defaultRegion"), //区/县 简码
        placeFullAddress: "", //案发详址
        longitude: "", //案发经度
        latitude: "", //案发纬度
        state: 0, //案件状态
        caseCategoryDesc: "其他", //案件类型
        caseToolDesc: "未知", //作案工具
        caseMethodDesc: "未知", //作案手段
        caseLevelDesc: "未知", //危害程度
        caseTargetDesc: "未知", //侵犯目标
        caseOpportunityDesc: "未知", //作案时机
        caseAbstract: "", //简要案情
        isSpecial: 0 //协同作战状态
      };
      data = this.$qs.stringify(data);
      this.$http.post("pca/casemng/baseinfo/save", data).then(res => {
        let caseUuid = res.data.data.caseUuid;
        this.$router.push({
          path: "/videoCombat/addcasetwo",
          query: {
            menuCode: "200",
            mycase: true,
            caseUuid: caseUuid,
            addmycase: true
          }
        });
      });
      //this.$router.push({path:'/casestudy/caseInfomanage/addcase?menuCode=200', query:{myUploadTo:true,edit:false}})
    },
    // 导入案件
    beforeAvatarUpload(file) {
      let longitude = sessionStorage.getItem("longitude");
      let latitude = sessionStorage.getItem("latitude");
      if (file.type != "application/x-zip-compressed") {
        this.$notify({
          type: "warning",
          message: "请导入文件类型为zip",
          position: "bottom-right",
          duration: 3000
        });
        return false;
      }
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "上传中..."
      });
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let formData = new FormData();
      formData.append("file", file);
      formData.append("longitude", longitude); // 追加经纬度
      formData.append("latitude", latitude);
      this.$http({
        url: "/pca/generate/uploadCaseZip",
        method: "post",
        data: formData
      }).then(res => {
        if (res.data.code == 200) {
          this.ajaxCaseList(); // 刷新数据列表
          this.loading.close();
          this.$notify({
            type: "success",
            message: "导入成功",
            position: "bottom-right",
            duration: 3000
          });
          // console.log(res.data.data, "res.data.data");
        } else {
          this.loading.close();
          this.$notify({
            type: "error",
            message: "导入失败",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
      return false;
    },
    //查询案件列表
    queryCase() {
      if (this.checkAllCase) {
        this.checkAllList();
      } else {
        this.ajaxCaseList();
      }
    },
    getData() {
      let userId = "";
      if (this.ismyupload) {
        userId = this.$storage.getSession("userInfo").userId;
      }
      let data = {
        pageNum: this.currentPage, //当前页
        pageSize: this.pageSize, //当前页结果数量
        orderBy: "update_time", //排序字段
        orderType: "desc", //排序方式
        begin: this.searchData.beginDateTime, //开始时间
        end: this.searchData.endDateTime, //结束时间
        caseName: this.searchData.caseName, //案件名称
        caseCategory: this.searchData.caseType, //案件类型
        approvalStatus: this.searchData.approvalStatus, //案件审批状态
        userId: userId,
        orgId: this.$storage.getSession("userInfo").orgId,
        status: this.ismyupload ? 0 : 1,
        synergy: this.synergy
      };
      return data;
    },

    //查询所有案件列表
    checkAllList() {
      this.checkDisabled = true;
      let data = this.getData();
      this.$http
        .get("/pca/casemng/basecase/list/all", { params: data })
        .then(res => {
          // console.log(res.data.data.list.length,"---------------");
          this.checkAllBtn = true;
          this.checkAllCase = true;
          setTimeout(() => {
            this.checkDisabled = false;
          }, 1000);
          this.tableData = res.data.data.list; //所有数据
          this.totalCount = res.data.data.totalCount; //页面总数
          this.currentPage = res.data.data.pageNum; //当前页
          this.pageSize = res.data.data.pageSize; //每页条数
        })
        .catch(() => {
          this.checkDisabled = false;
        });
    },
    delcase(id) {
      let data1 = {
        caseUuid: id,
        flag: 1
      };
      data1 = this.$qs.stringify(data1);
      this.$http.post("/pca/casemng/case/del", data1).then(response => {
        if (response.data.code == 200) {
          this.ajaxCaseList(false);
        }
      });
    },
    //查询所有列表
    ajaxCaseList(query, isDel) {
      let userId = this.$storage.getSession("userInfo").userId;
      this.checkDisabled = true;
      let data = this.getData();
      if (query) {
        this.currentPage = 1;
      }
      this.$http
        .get("/pca/casemng/basecase/list", { params: data })
        .then(res => {
          this.checkAllBtn = false;
          this.checkAllCase = false;
          setTimeout(() => {
            this.checkDisabled = false;
          }, 1000);
          let flag = false;
          let caseUuid = "";
          for (let i = 0; i < res.data.data.list.length; i++) {
            if (
              res.data.data.list[i].updateFlag == 0 &&
              res.data.data.list[i].caseSyncFlag == 0 &&
              userId == res.data.data.list[i].creator
            ) {
              caseUuid = res.data.data.list[i].caseUuid;
              flag = true;
            }
          }
          if (flag) {
            this.delcase(caseUuid);
          } else {
            this.tableData = res.data.data.list; //所有数据
            this.totalCount = res.data.data.totalCount; //页面总数
            this.currentPage = res.data.data.pageNum; //当前页
            this.pageSize = res.data.data.pageSize; //每页条数
          }
        });
      //   if (this.showclomn == 1) {
      //     this.$http
      //       .post("/pca/casemng/basecase/clean/my/empty/case")
      //       .then(res => {
      //         if (res.data.code == 200) {
      //           this.$http
      //             .get("/pca/casemng/basecase/list", { params: data })
      //             .then(res => {
      //               //  console.log(res.data.data.list.length,"=============")
      //               this.checkAllBtn = false;
      //               this.checkAllCase = false;
      //               setTimeout(()=>{
      //                 this.checkDisabled = false
      //               },1000)
      //               this.tableData = res.data.data.list; //所有数据
      //               this.totalCount = res.data.data.totalCount; //页面总数
      //               this.currentPage = res.data.data.pageNum; //当前页
      //               this.pageSize = res.data.data.pageSize; //每页条数
      //             });
      //         }
      //       }).catch(()=>{
      //           this.checkDisabled = false
      //       })
      //   } else {
      //     this.$http
      //       .get("/pca/casemng/basecase/list", { params: data })
      //       .then(res => {
      //         this.checkAllBtn = false;
      //         this.checkAllCase = false;
      //         setTimeout(()=>{
      //           this.checkDisabled = false
      //         },1000)
      //         this.tableData = res.data.data.list; //所有数据
      //         this.totalCount = res.data.data.totalCount; //页面总数
      //         this.currentPage = res.data.data.pageNum; //当前页
      //         this.pageSize = res.data.data.pageSize; //每页条数
      //       });
      //   }
    },
    //重置
    refresh() {
      this.synergy = "-1";
      this.searchData.caseName = "";
      this.searchData.caseType = "";
      this.searchData.beginDateTime = "";
      this.searchData.endDateTime = "";
      this.searchData.approvalStatus = "";
      this.currentPage = 1;
      this.pageSize = 10;
      this.checkAllBtn = false;
      this.checkAllCase = false;
      this.ajaxCaseList();
      let maxDate = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(), //关键
        date: new Date().getDate(),
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        seconds: new Date().getSeconds()
      };
      this.timeBegin.config.max = maxDate;
      this.timeEnd.config.min = "1900-01-01 00:00:00";
    },
    //编辑
    edit(row, id, edit) {
      if (row.hasApproveingComb == 1) {
        this.$myconfirm({
          type: "提示",
          msg:
            "当前案件对应的串并案已在审批中,需等该串并案审批通过后才能修改,如强制修改,将导致串并案中案件信息不一致！",
          icon: 2,
          btn: {
            ok: "确定",
            no: "取消"
          }
        })
          .then(() => {
            this.$router.push({
              path: "/videoCombat/addcasetwo?menuCode=100",
              query: {
                caseUuid: id,
                edit: edit,
                mycase: true,
                editmycase: true,
                isAllcase: this.checkAllCase
              }
            });
          })
          .catch(() => {});
      } else {
        this.$router.push({
          path: "/videoCombat/addcasetwo?menuCode=100",
          query: {
            caseUuid: id,
            edit: edit,
            mycase: true,
            editmycase: true,
            isAllcase: this.checkAllCase
          }
        });
      }
      // 之前的一套跳转
      // this.$router.push({path:'/casestudy/caseInfomanage/addcase?menuCode=200', query:{caseUuid:id,edit:edit,caseInfom:true}})
    },
    getCurrentCasePoints(id) {
      let kakouarray = [];
      let data = {
        caseUuid: id
      };
      this.$http
        .get("pca/casemng/device/rel/query", {
          params: data
        })
        .then(res => {
          let arr = res.data.data;

          for (let i in arr) {
            if (arr[i].cameraType == 8) {
               this.kakou.push(arr[i].deviceUuid);
            }
          }
        });
         this.deleteKakouPointDP(this.kakou);
    },
    //通过卡口点来和session里面存储的比对，然后删除进程
    deleteKakouPointDP(arr) {
      let device = JSON.parse(localStorage.getItem("finalDevice"));
    //   console.log(arr,"@@@@@@@@@111111111");
    //   console.log(device,"@@@@@@@@@@@@@@@@@@@");
      let id;
    //   for (let i in arr) {
    //       console.log(arr[i],"arr[i]");
    //     for (let j in device) {
    //     //   console.log(device[j].DP.split("&")[0], arr[i], "看看这两个值");
    //       if (device[j].DP.split("&")[0] == arr[i]) {
    //         id = device[j].DP.split("&")[1];
    //         this.closecaruplod(id);
    //       }
    //     }
    //   }
        for(let i in arr){
            console.log(arr[i],'111')
        }
    },
    //停止图片上传进程的函数
    closecaruplod(id) {
      $.ajax({
        url: "http://127.0.0.1:" + id + "?req=3",
        type: "GET",
        success: function(data) {},
        error: function(data) {}
      });
    },

    // 打开删除对话框
    openDelWin(caseUuid) {
    //   this.getCurrentCasePoints(caseUuid);

      this.$myconfirm({
        type: "提示",
        msg: "此操作将删除该案件相关的所有信息, 是否继续?",
        icon: 1,
        btn: {
          ok: "确定",
          no: "取消"
        }
      }).then(() => {
        let UuidPort = [];
        for (const key in localStorage) {
          if (key.indexOf("DxPort") != -1) {
            let arr = [];
            for (let i = 0; i < JSON.parse(localStorage[key]).length; i++) {
              arr.push({
                port: key,
                uuid: JSON.parse(localStorage[key])[i]
              });
            }
            UuidPort = UuidPort.concat(arr);
          }
        }
        //执行删除天网拉流的方法
        this.delSkynet(caseUuid);

        let data = {
          caseUuid: caseUuid
        };

        let id = {
          pageNum: 1,
          pageSize: 10000,
          caseUuid: caseUuid,
          submiterId: this.$storage.getSession("userInfo").userId,
          orderBy: "upload_time",
          orderType: "desc",
          infoKind: 0,
          status: 1
        };
        this.$http
          .get("vsas/collection/offline/list", { params: id })
          .then(res => {
            let arr = res.data.data.list;
            data = this.$qs.stringify(data);
            this.$http.post("vsas/task/temp/stopTask", data).then(res => {
              if (res.data.code == 200) {
                this.$http.post("pca/casemng/deleteCase", data).then(res => {
                  if (res.data.code == 200) {
                    this.ajaxCaseList(true, true);
                    if (arr.length) {
                      let arrport = [];
                      for (let i = 0; i < arr.length; i++) {
                        for (let j = 0; j < UuidPort.length; j++) {
                          if (arr[i].fileUuid == UuidPort[j].uuid) {
                            arrport.push(UuidPort[j].port);
                          }
                        }
                      }
                      //对端口进行去重
                      arrport = [...new Set(arrport)];
                      //然后执行删除进程方法
                      //拿到所有的端口，对数
                      for (const key in localStorage) {
                        //找出其中有DxPort所有key
                        for (let i = 0; i < arrport.length; i++) {
                          //如果所有的key等于端口，删除当前key中的所有的值，因为删除点位是批量删除
                          if (key == arrport[i]) {
                            let url =
                              "http://127.0.0.1:" +
                              key.substr(6, key.length) +
                              "/DxHandler.js?cbk=OnDeleteFile&req=0&fileuuidlist=" +
                              JSON.parse(localStorage[key]).join(";");
                            let g_socket = document.createElement("script");
                            g_socket.src = url;
                            document.body.appendChild(g_socket);
                          }
                        }
                      }
                    }
                    this.$notify({
                      type: "success",
                      message: "案件删除成功！",
                      position: "bottom-right",
                      duration: 3000
                    });
                  } else if (res.data.code == 100) {
                    this.$notify({
                      type: "warning",
                      message: res.data.message,
                      position: "bottom-right",
                      duration: 3000
                    });
                  } else {
                    this.$notify({
                      type: "error",
                      message: "案件删除失败！",
                      position: "bottom-right",
                      duration: 3000
                    });
                  }
                });
              } else {
                this.$notify({
                  type: "error",
                  message: "案件删除失败！",
                  position: "bottom-right",
                  duration: 3000
                });
              }
            });
          });
      });
    },
    delSkynet(id) {
      let data = {
        caseUuid: id
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/task/getSkyStreamList", data).then(res => {
        // console.log(res, 4444);
        if (res.data.data.length) {
          for (let i = 0; i < res.data.data.length; i++) {
            let url =
              sessionStorage.getItem("skyNetVideoSearchPath") +
              "/delete/?searchUuid=" +
              res.data.data[i];
            let onescript = document.createElement("script");
            onescript.src = url;
            document.body.appendChild(onescript);
          }
        }
      });
    },
    //删除
    // del(id) {
    //   let data = {
    //     caseUuid: id,
    //     flag: 0
    //   };
    //   data = this.$qs.stringify(data);
    //   this.$http.post("/pca/casemng/case/del", data).then(response => {
    //     if (response.data.code == 200) {
    //       if (response.data.data == 1) {
    //         this.$myconfirm({
    //           type: "提示",
    //           msg: "案件已被串并，是否仍要删除！",
    //           icon: 4,
    //           btn: {
    //             ok: "确定",
    //             no: "取消"
    //           }
    //         })
    //           .then(() => {
    //             let data1 = {
    //               caseUuid: id,
    //               flag: 1
    //             };
    //             data1 = this.$qs.stringify(data1);
    //             this.$http
    //               .post("/pca/casemng/case/del", data1)
    //               .then(response => {
    //                 if (response.data.code == 200) {
    //                   this.ajaxDataList(false, true);
    //                 }
    //               });
    //           })
    //           .catch(() => {});
    //       } else {
    //         this.$notify({
    //           type: "success",
    //           message: "删除成功！",
    //           position: "bottom-right",
    //           duration: 3000
    //         });
    //         this.ajaxCaseList(false, true);
    //       }
    //     } else {
    //       this.$notify({
    //         type: "error",
    //         message: "删除失败！",
    //         position: "bottom-right",
    //         duration: 3000
    //       });
    //     }
    //   });
    // },
    //去实战平台的详情页
    govideodetails(row) {
      let id = row.caseUuid;
      let flag = row.joinFlag;
      let isAllcase = this.checkAllCase;
      this.$router.push({
        path: "/videoCombat/casePicture_look?menuCode=120",
        query: {
          caseUuid: id,
          mycaseVideo: true,
          seek: true,
          create: flag,
          isAllcase: isAllcase
        }
      });
    },
    //去案件库的详情页
    godetails(id) {
      this.$router.push({
        path: "/casestudy/casePicture_look?menuCode=200",
        query: { caseUuid: id, caseManage: true }
      });
    },
    //table过滤数据
    formaApprovalStatus(row, column, cellValue) {
      if (cellValue == 0) {
        return "新建";
      } else if (cellValue == 1) {
        return "审批中";
      } else if (cellValue == 2) {
        return "审批通过";
      } else if (cellValue == 3) {
        return "审批不通过";
      } else if (cellValue == null) {
        return "";
      }
    },
    formaIsSpecial(row, column, cellValue) {
      if (cellValue == 0) {
        return "否";
      } else if (cellValue == 1) {
        return "是";
      }
    },
    sizeChange(val) {
      this.pageSize = val;
      if (this.checkAllBtn) {
        this.checkAllList();
      } else {
        this.ajaxCaseList();
      }
    },
    currentChange(val) {
      this.currentPage = val;
      if (this.checkAllBtn) {
        this.checkAllList();
      } else {
        this.ajaxCaseList();
      }
    },
    //上传到案件库
    //  caseLinkMark: '', //案件编号
    //     caseName: '未知', //案发名称
    getSubmitTocase(row) {
      let data = {
        caseUuid: row.caseUuid,
        taskType: 6
      };
      data = this.$qs.stringify(data);
      this.$http
        .post("vsas/task/checkTaskFinish", data)
        .then(res => {
          if (res.data.data) {
            if (
              row.caseCategoryDesc == "其他" &&
              row.caseName == "未知" &&
              row.stateDesc == "事件" &&
              row.caseLinkMark == "" &&
              row.placeFullAddress == "" &&
              row.caseLevelDesc == "未知" &&
              row.caseOpportunityDesc == "未知" &&
              row.caseMethodDesc == "未知" &&
              row.caseTargetDesc == "未知" &&
              row.caseToolDesc == "未知" &&
              row.caseAbstract == ""
            ) {
              this.$notify({
                type: "warning",
                message: "请修改案件属性",
                position: "bottom-right",
                duration: 3000
              });
              return;
            }
            this.$myconfirm({
              type: "提示",
              msg: "如果案件数据较多，上传时间会较长，是否提交审批？",
              icon: 2,
              btn: {
                ok: "确定",
                no: "取消"
              }
            }).then(() => {
              this.loading = this.$loading({
                lock: true,
                background: "rgba(255,255,255,0.4)",
                text: "提交审批中"
              });
              let data = {
                caseUuid: row.caseUuid
              };
              data = this.$qs.stringify(data);
              this.$http.post("vsas/case/audit/submit", data).then(res => {
                this.loading.close();
                if (res.data.code == 200) {
                  this.$notify({
                    type: "success",
                    message: "提交成功",
                    position: "bottom-right",
                    duration: 3000
                  });
                  this.ajaxCaseList();
                } else if (res.data.code == 100) {
                  this.$notify({
                    type: "warning",
                    message: "业务异常，提交审核失败",
                    position: "bottom-right",
                    duration: 3000
                  });
                } else if (res.data.code == 101) {
                  this.$notify({
                    type: "warning",
                    message:
                      "当前案事件所在的串并案正在审批中，待审批完成之后方可提交审批",
                    position: "bottom-right",
                    duration: 3000
                  });
                } else if (res.data.code == 50070) {
                  this.$notify({
                    type: "error",
                    message: "上传案件失败",
                    position: "bottom-right",
                    duration: 3000
                  });
                } else {
                  this.$notify({
                    type: "error",
                    message: "提交审核失败",
                    position: "bottom-right",
                    duration: 3000
                  });
                }
              });
            });
          } else {
            this.$notify({
              type: "warning",
              message: "标注未转完成，请稍等！",
              position: "bottom-right",
              duration: 3000
            });
          }
        })
        .catch(() => {
          this.$notify({
            type: "warning",
            message: "标注未转完成，请稍等！",
            position: "bottom-right",
            duration: 3000
          });
        });
      return;
    },
    childEduce(val) {
      this.isEduce = val;
      this.ajaxCaseList();
    },
    // 打开批量导入弹层
    batchExport() {
      this.isEduce = true;
    },
    childData(val) {
      this.ajaxCaseList();
    }
  },
  mounted() {
    this.timeBegin = laydate.render({
      elem: "#timeBegin",
      type: "datetime",
      //min: -90, //90天前
      max: this.getCurrentDate(), //0天后
      btns: ["now", "confirm"],
      done: (value, date, endDate) => {
        console.log(2222);
        this.searchData.beginDateTime = value;
        this.timeEnd.config.min = {
          year: date.year,
          month: date.month - 1, //关键
          date: date.date,
          hours: date.hours,
          minutes: date.minutes,
          seconds: date.seconds
        };
      }
    });

    this.timeEnd = laydate.render({
      elem: "#timeEnd",
      type: "datetime",
      // min: this.searchData.beginDateTime,
      max: 1,
      btns: ["now", "confirm"],
      done: (value, date, endDate) => {
        console.log(111);
        this.searchData.endDateTime = value;
        this.timeBegin.config.max = {
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
@import "../../assets/css/global.css";
@import "../../assets/css/commom.css";

.contentTable >>> .el-table {
  width: calc(100% - 0.4rem);
  text-align: center;
  border-collapse: collapse;
  font-size: 0.14rem;
  // color: #606266;
  color: red;
  -webkit-border-horizontal-spacing: 0px;
  -webkit-border-vertical-spacing: 0px;
  border-top-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 0px;
  border-left-width: 0px;
  border-color: grey;
  margin-bottom: 0.1rem;
  margin-top: 0.2rem;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}
.contentTable >>> .el-table th {
  background-color: #f3f6f8;
  text-align: center;
}

.el-button {
  padding: 0.07rem 0.14rem;
  margin: 0;
}

input,
select {
  height: 0.28rem;
  border: 0.01rem solid #2a2d30;
  padding-left: 0.05rem;
  background: transparent;
}

.searchCondition /deep/ .el-date-editor {
  height: 0.28rem;
}
.searchCondition /deep/ .el-date-editor .el-input__icon,
.searchCondition /deep/ .el-date-editor .el-range-separator {
  line-height: 0.2rem;
}
input:focus {
  border: 0.01rem solid #409eff;
}

.wrapper {
  position: absolute;
  width: 100%;
  min-width: 12rem;
  top: 0.6rem;
  height: calc(100% - 0.6rem);
  box-sizing: border-box;
  overflow: hidden;
}
.searchCondition {
  padding-bottom: 0.2rem;
  width: 100%;
  display: flex;
  font-size: 0.14rem;
  padding-left: 0.2rem;
  color: red;
  // @include font_color('font_color_3c93ec');
}
.hr {
  margin-left: 0.2rem;
  //   border: 0.01rem solid #1c5da7;
  @include border_hr_1("border_hr_1");
  width: calc(100% - 0.4rem);
}
/* .searchCondition p{
    width: 100%;
  } */
.caseNameSelect {
  width: 1.5rem;
  color: #c5c5c5;
}
.caseNameSelectDate {
  width: 2rem;
  font-size: 0.14rem;
  // @include layer-background_color_1('background_color1');
}
.searchCondition /deep/ .el-select {
  height: 0.28rem;
  font-size: 0.14rem;
}
.searchCondition /deep/ .el-input__inner {
  height: 0.28rem;
  font-size: 0.14rem;
  border-radius: 0;
}

.to {
  width: 0.2rem;
  line-height: 0.26rem;
  text-align: center;
  color: #99c9fa;
}

.itemIcon img {
  width: 100%;
  height: 100%;
}
.content {
  height: calc(100% - 0.54rem - 1rem);
  position: relative;
  width: calc(100% - 0.3rem);
  margin-left: 0.15rem;
  margin-right: 0.15rem;
  /* margin-top: 0.2rem; */
  display: flex;
  flex-direction: column;
  /* border:1px solid #ECF0F3; */
}

.needApprove {
  margin-left: 0.2rem;
}
.approveHistory {
  margin-left: -0.02rem;
}
.needApproveContainer {
  padding-top: 0.2rem;
  width: 100%;
  height: 100%;
  /* background-color: #FCFDFD; */
  position: relative;
  display: flex;
  flex-direction: column;
}

.searchCondition /deep/ .el-button + .el-button {
  margin-left: 0;
}

.approveBtn {
  width: 0.8rem;
  height: 0.3rem;
  background-color: #e6a23c;
  color: white;
  border-radius: 0.03rem;
  margin: 0.05rem auto;
  margin-right: 0.05rem;
  cursor: pointer;
  display: inline-block;
}
.playBtn {
  width: 0.8rem;
  height: 0.3rem;
  background-color: #67c23a;
  color: white;
  border-radius: 0.03rem;
  margin: 0.05rem auto;
  margin-left: 0.05rem;
  cursor: pointer;
  display: inline-block;
}
.el-table .el-button + .el-button {
  margin-left: 0.05rem;
}
.allCase {
  margin-top: 0.06rem;
  margin-right: 0.2rem;
  min-width: 0.68rem;
}

.pageNation {
  width: 100%;
  height: 0.3rem;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0.6rem;
  font-size: 0.14rem;
  line-height: 0.6rem;
  //   color: rgba(153, 201, 250, 0.4);
  @include font_color_footer("font_color_footer1");
  text-align: center;
}
.footer img {
  margin-right: 0.05rem;
}

.contentTable {
  height: 6rem;
  overflow-y: auto;
  overflow-x: hidden;
}
.el-table--striped /deep/ .el-table__body tr.el-table__row--striped td {
  background-color: transparent;
}

option {
  background: #030810;
}
option:hover {
  background: red;
}
.uploadCase {
  display: inline-block;
}
.allCase {
  margin-top: 0.06rem;
  margin-right: 0.2rem;
  min-width: 0.68rem;
}
.el-checkbox
  /deep/
  .el-checkbox__input.is-disabled.is-checked
  .el-checkbox__inner {
  background-color: #409eff;
  border-color: #409eff;
}
.el-checkbox /deep/ .el-checkbox__input.is-checked + .el-checkbox__label,
.el-checkbox /deep/ .el-checkbox__input.is-disabled + span.el-checkbox__label {
  @include font_color("font_main_color");
}
.el-checkbox {
  @include font_color("font_main_color");
}
//开始做一键换肤的部分
.topInfo a,
.topInfo p,
.topInfo span {
  @include font_color("font_main_color");
}
.titleColor {
  // color: red !important;
  @include font_color("font_color_3c93ec");
}
</style>

