<!--
 * @Author: chenxf
 * @Date: 2020-06-29 09:03:26
 * @LastEditTime : 2020-12-15 19:40:59
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\page\casestudy\editMyApprovePage.vue
 * @
 -->
<template>
  <!--查看页面-->
  <div class="wrapper">
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <router-link
        class="sysname"
        v-show="!videoCombat"
        :to="{path:'/casestudy',query:{menuCode:200}}"
      >案件库 ></router-link>
      <router-link
        class="sysname"
        v-show="videoCombat"
        :to="{path:'/videoCombat',query:{menuCode:100}}"
      >视频侦查></router-link>
      <!-- <router-link class="sysname" v-show="!videoCombat && (mycode == 1 ||mycode == 2)" tag='div' :to="{path:'/casestudy/myCaseCade',query:{menuCode:209}}">&nbsp;我的串并案 ></router-link> -->
      <router-link
        class="sysname"
        v-show="videoCombat && (mycode == 1 ||mycode == 2)"
        tag="div"
        :to="{path:'/videoCombat/myCasCade',query:{menuCode:124,aaa:isAllcase,}}"
      >&nbsp;我的串并案 ></router-link>
      <router-link
        class="sysname"
        v-show="!videoCombat && mycode == 3"
        tag="div"
        :to="{path:'/casestudy/cascadeView',query:{menuCode:219}}"
      >&nbsp;并案查看 ></router-link>
      <router-link
        class="sysname"
        v-show="!videoCombat && mycode == 4"
        tag="div"
        :to="{path:'/casestudy/myCaseCade',query:{menuCode:209,aaa:isAllcase}}"
      >&nbsp;我的串并案 ></router-link>
      <router-link
        class="sysname"
        v-show="!videoCombat && mycode == 5"
        tag="div"
        :to="{path:'/casestudy/myCaseCade',query:{menuCode:209,aaa:isAllcase}}"
      >&nbsp;我的串并案 ></router-link>
      <router-link
        class="sysname"
        v-show="!videoCombat && mycode == 6"
        tag="div"
        :to="{path:'/casestudy/cascadeApprove',query:{menuCode:211}}"
      >&nbsp;串并案审批 ></router-link>
      <p v-show="mycode == 1 || mycode == 5" class="sysname">&nbsp;编辑</p>
      <p v-show="mycode == 2 || mycode == 3 || mycode == 4" class="sysname">&nbsp;查看</p>
      <p v-show="mycode == 6" class="sysname">&nbsp;审批</p>
    </div>
    <div class="contentBody">
      <div class="content">
        <div class="top">
          <div class="topTitle">
            <div class="titleLine"></div>
            <div v-show="mycode == 1 || mycode == 5">串并案编辑</div>
            <div v-show="mycode == 2">串并案查看</div>
            <div v-show="mycode == 3 || mycode == 4">并案查看</div>
            <div v-show="mycode == 6">串并案审批</div>
          </div>
          <div class="topContent">
            <ul class="caseDetial">
              <li>
                <div style="width:100%">
                  <span style="width: 72px;display:inline-block">
                    <b v-if="mycode == 1 || mycode == 5" class="must">*</b>
                    {{(mycode == 1 || mycode == 2 || mycode == 4 || mycode == 5 || mycode == 6) ? '串并案名称' : '并&nbsp;案&nbsp;名&nbsp;称'}}:
                  </span>
                  <input
                    type="text"
                    readonly="readonly"
                    v-if="mycode == 2 || mycode == 3 || mycode == 4 || mycode == 6"
                    v-model="editCaseObj.caseName"
                    maxlength="50"
                    style="width:calc(100% - 90px) "
                    placeholder="请输入串并案名称"
                  >
                  <input
                    type="text"
                    v-else
                    v-model="editCaseObj.caseName"
                    maxlength="50"
                    style="width:calc(100% - 90px) "
                    placeholder="请输入串并案名称"
                  >
                </div>
              </li>
              <li>
                <div v-if="showCase != 0" style="width:40%;">
                  <span style="width:72px;display: inline-block;">
                    <b v-if="mycode == 1 || mycode == 5" class="must">&nbsp;</b>
                    {{(mycode == 1 || mycode == 2 || mycode == 4 || mycode == 5 || mycode == 6) ? '串并案状态' : '并&nbsp;案&nbsp;状&nbsp;态'}}:
                  </span>
                  <!--<input v-model="editCaseObj.comboState" style="width:calc(100% - 58px)" type="text" >-->
                  <span v-if="editCaseObj.comboState==0">并案</span>
                  <span v-else-if="editCaseObj.comboState==1">串案</span>
                  <span v-else></span>
                </div>
                <div style="width: 60%;">
                  <span
                    style="width: 55px;"
                  >{{(showCase == 0 && mycode == 2) ? '' : '&nbsp;'}}创&nbsp;建&nbsp;时&nbsp;间:&nbsp;</span>
                  <!--<input style="width: calc(100% - 55px)" type="text" v-model="editCaseObj.createTime">-->
                  <span v-text="editCaseObj.createTime"></span>
                </div>
              </li>
              <li>
                <div style="width: 40%">
                  <span style="width: 72px;display: inline-block;">
                    <b v-if="mycode == 1 || mycode == 5" class="must">&nbsp;</b>创&nbsp;建&nbsp;用&nbsp;户:
                  </span>
                  <!--<input  v-model="editCaseObj.createUser" style="width: calc(100% - 58px)" type="text">-->
                  <span v-show="mycode == 2 || mycode == 4" v-text="editCaseObj.createUser"></span>
                  <span
                    v-show="mycode == 1 || mycode == 3 || mycode == 6 || mycode == 5"
                    v-text="editCaseObj.creatorName"
                  ></span>
                </div>
                <div style="width:60%">
                  <span style="width: 55px;">&nbsp;创&nbsp;建&nbsp;部&nbsp;门:</span>
                  <!--<input style="width: calc(100% - 55px)" type="text"  v-model="editCaseObj.creatorOrg">-->
                  <span
                    v-show="mycode == 1 || mycode == 2 || mycode == 4"
                    v-text="editCaseObj.creatorOrg"
                  ></span>
                  <span
                    v-show="mycode == 3 || mycode == 6 || mycode == 5"
                    v-text="editCaseObj.creatorOrgName"
                  ></span>
                </div>
              </li>
              <li>
                <div style="display: flex;align-items: center;width: 72px;margin-top: -0.45rem;">
                  <b v-if="mycode == 1 || mycode == 5" class="must">*</b>
                  {{(mycode == 1 || mycode == 2 || mycode == 4 || mycode == 5 || mycode == 6) ? '串并案描述' : '并&nbsp;案&nbsp;描&nbsp;述'}}:
                </div>
                <div style="width: calc(100% - 90px);height: 0.7rem;">
                  <textarea
                    v-if="mycode == 2 || mycode == 3 || mycode == 4 || mycode == 6"
                    style="width: 100%;height: 100%;padding:3px;"
                    readonly="readonly"
                    name
                    maxlength="225"
                    v-model="editCaseObj.description"
                    placeholder="请输入串并案描述"
                  ></textarea>
                  <textarea
                    v-else
                    style="width: 100%;height: 100%;padding:3px;"
                    name
                    maxlength="225"
                    v-model="editCaseObj.description"
                    placeholder="请输入串并案描述"
                  ></textarea>
                </div>
              </li>

              <li v-show="(showCase == 2 || showCase == 1) && mycode == 2 || mycode == 4">
                <span style="width: 56px; padding-left:2px">审&nbsp;批&nbsp;状&nbsp;态:</span>
                <span v-if="editCaseObj.caseState==0">&nbsp;&nbsp;&nbsp;新建</span>
                <span v-if="editCaseObj.caseState==1">&nbsp;&nbsp;&nbsp;审批中</span>
                <span v-if="editCaseObj.caseState==2">&nbsp;&nbsp;&nbsp;审批通过</span>
                <span v-if="editCaseObj.caseState==3">&nbsp;&nbsp;&nbsp;审批不通过</span>
                <span v-else></span>
              </li>
              <li v-show="mycode == 6" class="Bigselect">
                <span style="width: 72px;">审&nbsp;批&nbsp;结&nbsp;果:</span>
                <!-- <select  style="width:calc(100% - 56px)"  v-model="approveStatus">
                  <option value="1" selected="selected">通过</option>
                  <option value="2">不通过</option>
                </select>-->
                <el-select v-model="approveStatus" placeholder="请选择审批结果">
                  <el-option value="1" label="通过"></el-option>
                  <el-option value="2" label="不通过"></el-option>
                </el-select>
              </li>
              <li v-show="mycode == 6">
                <span style="width: 72px;margin-top: -0.28rem;">审&nbsp;批&nbsp;意&nbsp;见:</span>
                <textarea
                  style="width:calc(100% - 56px);height: 0.5rem;"
                  maxlength="150"
                  cols="30"
                  rows="3"
                  v-model="approveOpinion"
                  placeholder="请输入审批意见"
                ></textarea>
              </li>
              <li>
                <div style=" visibility: hidden">返回上面&nbsp;:</div>
                <div
                  v-show="mycode == 1 || mycode == 5"
                  class="saveEdit topBtn"
                  @click="saveEdit()"
                >保存编辑</div>
                <div v-show="mycode == 6" class="saveEdit topBtn" @click="approveCase()">确认审批</div>
                <!-- <div v-if="editCaseObj.caseState != 1 && editCaseObj.caseState != 2 && showsave == 1 && showCase != 0" class="submitApprove topBtn" @click="getSubmitTocase()" >提交审批</div> -->
                <div class="backBtn searchBtn" @click="goback()">返回上一页</div>
                <div
                  v-show="mycode == 1 || mycode == 5"
                  class="saveEdit tryBtn restEdit"
                  @click="resetEdit()"
                >重置</div>
              </li>
            </ul>

            <div class="content1">
              <div id="mapContent"></div>
              <img
                class="dingwei"
                src="../../assets/case/quickPos.png"
                @click="loadCaseMap();initCasePoint();"
              >
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="topTitle">
            <div
              style="width: 2px; height:18px;background-color: #0a83f1; margin-top:2px;margin-left: 20px;margin-right: 10px"
            ></div>
            <div>子案件列表</div>
            <div
              v-show="mycode == 1 || mycode == 5"
              class="add el-icon-plus topBtn"
              @click="addCase"
            >新增</div>
            <!-- <div class="add el-icon-plus topBtn">新增</div> -->
          </div>
          <div class="bottomDetail">
            <div v-for="(item,index) in historyCaseList" class="detailItem" :key="index">
              <div class="detailItemImg" @click="lookCase(item)">
                <img
                  style="width: 100%;height: 100%"
                  :src="item.caseImgUrl == null ? $store.state.defaultImg : item.caseImgUrl"
                  :onerror="$store.state.defaultImg"
                  alt
                >
                <!-- <img style="width: 100%;height: 100%" :src="item.caseImgUrl" :onerror="$store.state.defaultImg" alt=""> -->
              </div>
              <div class="detailItemTxt">
                <div class="detailItemTxtTitle" :title="item.caseName">
                  案件名称:
                  <span v-text="item.caseName"></span>
                </div>
                <div class="detailItemTxtItem detailTxt">
                  <div class="detailItemTxtItemLeft">
                    <div>
                      案件编号:
                      <span v-text="item.caseLinkMark"></span>
                    </div>
                    <div>
                      案发时间:
                      <span v-text="item.timeLowLimit"></span>
                    </div>
                    <div class="detailItemTxtStatus">
                      案件类型:
                      <span v-text="item.caseCategoryDesc"></span>
                    </div>
                  </div>
                  <div class="detailItemTxtItemRight">
                    <div>
                      案发区域:
                      <span v-text="item.regionFullName"></span>
                    </div>
                    <div>
                      案件状态:
                      <span v-if="item.state==0">事件</span>
                      <span v-else-if="item.state==1">已立案</span>
                      <span v-else-if="item.state==2">已侦破</span>
                      <span v-else-if="item.state==3">侦破待复核</span>
                      <span v-else-if="item.state==4">已结案</span>
                      <span v-else-if="item.state==5">结案待复核</span>
                      <span v-else-if="item.state==6">并案待复核</span>
                      <span v-else-if="item.state==7">撤案待复核</span>
                      <span v-else-if="item.state==8">结案归档</span>
                      <span v-else-if="item.state==9">并案归档</span>
                      <span v-else-if="item.state==10">撤案归档</span>
                      <span v-else></span>
                    </div>
                    <div class="detailItemTxtStatus">
                      <span
                        v-show="showCase == 2 || showCase == 1"
                      >审批状态: {{item.approvalStatus | caseApprove}}</span>
                    </div>
                  </div>
                </div>
                <div class="detailItemTxtDetial detailTxt" :title="item.caseAbstract">
                  <span>案件描述: {{item.caseAbstract}}</span>
                </div>
              </div>
              <div v-show="mycode == 1 || mycode == 5" class="caseHandle">
                <el-button @click="deleteHistoryCase(index)" class="el-icon-delete delBtn">删除</el-button>
                <!-- <div @click="deleteHistoryCase(index)" style="background-color:#F56C6C;color: white;padding: 3px 5px;border-radius: 3px;cursor: pointer">
                  <span  style="font-size: 0.18rem" class="el-icon-delete delBtn"></span><span>删除</span>
                </div>-->
              </div>
            </div>
          </div>
        </div>
        <!--新增案件-->
        <el-dialog width="60%" title="新增案件" :visible.sync="innerVisible" append-to-body>
          <el-form
            :model="caseForm"
            :rules="rules"
            ref="caseForm"
            label-width="100px"
            class="demo-caseForm caseForm"
          >
            <el-form-item label="添加案件：" prop="cases">
              <el-tag
                class="cases"
                v-for="tag in multipleSelection"
                :key="tag.caseUuid"
                @close="removeItem(tag)"
                :title="tag.caseName"
                closable
              >{{tag.caseName}}</el-tag>
            </el-form-item>
          </el-form>

          <div class="caseSearch_pop">
            <div
              style="margin-top: 0.05rem;margin-left: 0.2rem;min-width: 0.68rem"
              class="titleColor"
            >案件类型:&nbsp;&nbsp;</div>
            <el-select v-model="caseGenre" class="caseNameSelect" placeholder="请选择案件类型">
              <el-option value label="全部"></el-option>
              <el-option
                v-for="(item,index) in CaseType"
                :value="item.value"
                :lable="item.value"
                :key="index"
              ></el-option>
            </el-select>
            <input v-model="caseKeyword" type="text" placeholder="请输入案件名称">
            <el-button
              type="primary"
              icon="el-icon-search"
              class="searchBtn"
              @click="historyNal()"
            >查询</el-button>
            <el-button
              type="warning"
              icon="el-icon-refresh"
              class="tryBtn"
              @click="getCaseListReset()"
            >重置</el-button>
          </div>
          <div class="table">
            <el-table :data="caseList" height="300" style="width:100%;" border>
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
                      icon="el-icon-plus"
                      class="topBtn"
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
          <span slot="footer" class="dialog-footer">
            <el-button type="primary cancleBtn" @click="resetForm()">取 消</el-button>
            <!--<el-button type="success" @click="addNewCase()">添加案件</el-button>-->
            <el-button type="primary passBtn" @click="saveCasCase()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <footer_case_look></footer_case_look>
  </div>
</template>

<script>
import vehicle from "../../api/vehicle/vehicle.js";
import mapFun from "../../api/vehicle/caseMapFun.js";
import Footer_case_look from "../../components/footer_case_look";
export default {
  components: { Footer_case_look },
  data() {
    return {
      caseCombinationId: "",
      editCaseObj: {},
      oldName: "",
      historyCaseList: [],
      historyIdList: [],
      getHotspotData: [],
      newpoints: [],
      innerVisible: false,
      caseList: [],
      multipleSelection: [],
      totalNumCase: "",
      caseForm: {},
      rules: {},
      caseKeyword: "",
      pageNoCase: 1,
      pageSizeCase: 10,
      videoCombat: false,
      showsave: "",
      showCase: 0, //0表示没有涉案视频 1 一级案件库 2 二级案件库
      CaseType: [], // 案件类型
      caseGenre: "",
      loading: null,
      markers: [],
      mycode: false, //1表示编辑,2查看
      approveStatus: "1",
      approveOpinion: "", // 审批意见
      currentPage: 0,
      isAllcase: false //是否查看全部床并按
    };
  },
  filters: {
    caseApprove(cellValue) {
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
    }
  },
  mixins: [vehicle, mapFun],
  watch: {
    historyCaseList: {
      handler(val) {
        if (val.length) {
          this.newpoints = [];
          for (let i = 0; i < val.length; i++) {
            if (val[i].longitude) {
              this.newpoints.push({
                longitude: val[i].longitude,
                latitude: val[i].latitude,
                caseName: val[i].caseName
              });
              this.initCasePoint();
            }
          }
        } else {
          this.loadCaseMap();
        }
      },
      deep: true
    }
  },
  methods: {
    //重置案件
    resetEdit() {
      this.mycode = this.$route.query.mycode;
      this.loadCaseMap();
      this.getCaseObj();
      this.getCaseInfo();
      this.getHotspot();
    },
    //案件类型
    getCaseType() {
      this.$http.get("sms/static/getTypeByCode?code=CaseType").then(res => {
        if (res.data.code == 200) {
          this.CaseType = res.data.data;
        }
      });
    },
    //案件列表
    getCaseObj() {
      this.$http({
        url: "pca/combo/myCombo/caseCombo",
        method: "get",
        params: {
          caseCombinationId: this.caseCombinationId
        }
      }).then(res => {
        if (res.statusText == "OK" && res.data.code == 200) {
          this.editCaseObj = res.data.data;

          this.oldName = this.editCaseObj.caseName;
        } else {
          this.$notify({
            type: "error",
            message: "获取案件信息失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    //获取历史列表
    getCaseInfo() {
      this.$http({
        url: "pca/combo/myCombo/getCaseInfo",
        method: "get",
        params: {
          caseCombId: this.caseCombinationId
        }
      })
        .then(res => {
          if (res.statusText == "OK" && res.data.code == 200) {
            this.historyCaseList = res.data.data;
          } else {
            this.$notify({
              type: "error",
              message: "获取串并案信息失败！",
              position: "bottom-right",
              duration: 3000
            });
          }
        })
        .catch(res => {});
    },
    //删除历史案件
    deleteHistoryCase(index) {
      this.historyCaseList.splice(index, 1);
    },
    //保存编辑
    saveEdit() {
      if (this.editCaseObj.caseName.length < 3) {
        this.$notify({
          type: "warning",
          message: "请输入3-50个字符以内",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.historyCaseList.length < 2) {
        this.$notify({
          type: "warning",
          message: "至少添加两个案件！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.editCaseObj.caseName == "") {
        this.$notify({
          type: "warning",
          message: "串并案名称不能为空",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.editCaseObj.description == "") {
        this.$notify({
          type: "warning",
          message: "串并案描述不能为空",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      let arr = [];
      for (let i = 0; i < this.historyCaseList.length; i++) {
        arr.push(this.historyCaseList[i].caseUuid);
      }
      let ids = arr.join(",");
      let params = {
        oldName: this.oldName,
        caseCombinationId: this.caseCombinationId,
        caseName: this.editCaseObj.caseName,
        description: this.editCaseObj.description,
        ids: ids
      };
      let data = this.$qs.stringify(params);
      this.$http({
        url: " pca/combo/myCombo/updateCaseCombo",
        method: "post",
        data: data
      }).then(res => {
        if (res.statusText === "OK" && res.data.code === 200) {
          this.$notify({
            type: "success",
            message: "保存成功！",
            position: "bottom-right",
            duration: 3000
          });
          this.getCaseObj();
        } else if (res.data.code == 100) {
          this.$notify({
            type: "warning",
            message: "串并案名称不能为空",
            position: "bottom-right",
            duration: 3000
          });
          this.getCaseObj();
        } else {
          this.$notify({
            type: "error",
            message: "保存失败！",
            position: "bottom-right",
            duration: 3000
          });
          this.getCaseObj();
        }
      });
    },
    // 审批
    approveCase(row, index) {
      this.$myconfirm({
        type: "提示",
        msg: "是否确认审批？",
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
            text: "正在审批中"
          });
          this.$http({
            url: "/pca/approve/approveComboCase/saveApprove",
            method: "get",
            params: {
              targetId: this.caseCombinationId, //目标编号 案事件uuid
              approveStatus: this.approveStatus, //审批状态  1通过 2不通过
              approveOpinion: this.approveOpinion //审批意见
            }
          }).then(res => {
            this.loading.close();
            if (res.statusText === "OK" && res.data.code === 200) {
              this.$notify({
                type: "success",
                message: "审批成功！",
                position: "bottom-right",
                duration: 3000
              });
              this.$router.push("/casestudy/cascadeApprove?menuCode=211");
            } else if (res.data.code == 100) {
              this.$notify({
                type: "warning",
                message: "审批失败！",
                position: "bottom-right",
                duration: 3000
              });
            } else {
              this.$notify({
                type: "error",
                message: "审批失败！",
                position: "bottom-right",
                duration: 3000
              });
            }
          });
        })
        .catch(() => {});
    },
    getSubmitTocase() {
      if (this.historyCaseList.length < 2) {
        this.$notify({
          type: "warning",
          message: "至少添加两个案件",
          position: "bottom-right",
          duration: 3000
        });
        return;
      } else {
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
            let data = {
              caseCombinationId: this.caseCombinationId
            };
            data = this.$qs.stringify(data);
            this.$http
              .post("vsas/merge/case/upload/caseCombination", data)
              .then(res => {
                if (res.data.code == 200) {
                  this.getCaseObj();
                  this.$notify({
                    type: "success",
                    message: "提交成功",
                    position: "bottom-right",
                    duration: 3000
                  });
                  this.$router.push("/videoCombat/myCasCade?menuCode=124");
                } else if (res.data.code == 100) {
                  this.$notify({
                    type: "warning",
                    message: "更新串并案状态为待审批状态时失败",
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
      }
    },

    //提交审批
    putApprove() {
      if (this.historyCaseList.length < 2) {
        this.$notify({
          type: "warning",
          message: "至少添加两个案件",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      this.loading = this.$loading({
        lock: true,
        background: "rgba(255,255,255,0.4)",
        text: "正在提交审批"
      });
      let arr = [];
      for (let i = 0; i < this.historyCaseList.length; i++) {
        arr.push(this.historyCaseList[i].caseUuid);
      }
      let ids = arr.join(",");
      let params = {
        comboState: this.editCaseObj.comboState,
        caseState: this.editCaseObj.caseState,
        oldName: this.oldName,
        caseCombinationId: this.caseCombinationId,
        caseName: this.editCaseObj.caseName,
        description: this.editCaseObj.description,
        ids: ids,
        postFlag: sessionStorage.getItem("currentDeploymentType")
      };
      let data = this.$qs.stringify(params);
      this.$http({
        url: "pca/combo/myCombo/toApprove",
        method: "post",
        data: data
      }).then(res => {
        this.loading.close();
        if (res.statusText === "OK" && res.data.code === 200) {
          this.$notify({
            type: "success",
            message: "提交审批成功！",
            position: "bottom-right",
            duration: 3000
          });
          this.getCaseObj();
        } else if (res.data.code == 100) {
          this.$notify({
            type: "warning",
            message: res.data.data,
            position: "bottom-right",
            duration: 3000
          });
          this.getCaseObj();
        } else {
          this.$notify({
            type: "error",
            message: "提交审批失败！",
            position: "bottom-right",
            duration: 3000
          });
          this.getCaseObj();
        }
      });
    },

    //获取案件点位信息
    getHotspot() {
      this.$http({
        url: "pca/combo/myCombo/getHotspot",
        method: "get",
        params: {
          caseCombId: this.caseCombinationId
        }
      })
        .then(res => {
          if (res.statusText == "OK" && res.data.code == 200) {
            this.getHotspotData = res.data.data;
            let arr = [];
            for (let i = 0; i < this.getHotspotData.length; i++) {
              if (this.getHotspotData[i] != null) {
                arr.push(this.getHotspotData[i]);
              }
            }
          } else {
            this.$notify({
              type: "error",
              message: "获取案件点位信息失败！",
              position: "bottom-right",
              duration: 3000
            });
          }
        })
        .catch(res => {});
    },

    getNewpoints(points) {
      if (points !== null && points.length !== 0) {
        for (let j = 0; j < points.length; j++) {
          if (points[j].longitude != null && points[j].longitude != 0) {
            this.newpoints.push({
              longitude: points[j].longitude,
              latitude: points[j].latitude,
              caseName: points[j].caseName
            });
          }
        }
        this.initCasePoint();
      }
    },
    //地图点位
    initCasePoint() {
      if (!this.historyCaseList.length || !this.newpoints.length) {
        return;
      }
      let _this = this;
      let caseObj = this.editCaseObj;
      this.markers = [];
      this.map.clearOverlays();
      let carIco = require("@/assets/images/device/duang.png");
      for (let i = 0; i < this.newpoints.length; i++) {
        //newpoints写死的数据
        let point = this.newpoints[i];
        let point_marker = new BMap.Point(
          point["longitude"],
          point["latitude"]
        );
        var myIcon = new BMap.Icon(carIco, new BMap.Size(35, 36), {});
        var marker = new BMap.Marker(point_marker, {
          offset: new BMap.Size(0, -20),
          icon: myIcon
        });
        this.markers.push(marker);
        //弹窗对象
        let opts = {
          width: 100,
          height: 80,
          title: "串并案信息"
        };
        //弹窗的内容
        let content = `<div style="display: flex;flex-direction: column">
             <div title="${
               point.caseName
             }" style="height: 20px ;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"><span>案件名称：</span>${
          point.caseName
        }</div>
               <div><span>经&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：</span>${
                 point.longitude
               }</div>
               <div><span>纬&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度：</span>${
                 point.latitude
               }</div>
            </div>`;
        let info_Window = new BMap.InfoWindow(content, opts);
        this.map.addOverlay(marker);
        marker.addEventListener("click", function() {
          this.openInfoWindow(info_Window);
        });
      }
      // //点位聚合对象
      // if (this.markerClusterer != null) {//判断markerClusterer对象是否存在
      //   this.markerClusterer.clearMarkers();
      //   this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers: this.markers});//所有标注创建完以后建立点聚合
      // } else {
      //   this.markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers: this.markers});//所有标注创建完以后建立点聚合
      // }
    },
    //返回上一页
    goback() {
      // console.log(this.videoCombat,"======")
      // console.log(this.mycode,"------")
      if (this.videoCombat && this.mycode == 1) {
        // this.$router.push('/videoCombat/myCasCade?menuCode=124&currentPage='+this.currentPage)
        this.$router.push({
          path: "/videoCombat/myCasCade",
          query: {
            menuCode: 124,
            aaa: this.isAllcase,
            currentPage: this.currentPage
          }
        });
      } else if (this.videoCombat && this.mycode == 2) {
        this.$router.push({
          path: "/videoCombat/myCasCade",
          query: {
            menuCode: 124,
            aaa: this.isAllcase,
            currentPage: this.currentPage
          }
        });
      } else if (!this.videoCombat && this.mycode == 3) {
        this.$router.push(
          "/casestudy/cascadeView?menuCode=219&currentPage=" + this.currentPage
        );
      } else if (!this.videoCombat && this.mycode == 4) {
        this.$router.push(
          "/casestudy/myCaseCade?menuCode=209&currentPage=" + this.currentPage
        );
      } else if (!this.videoCombat && this.mycode == 5) {
        this.$router.push(
          "/casestudy/myCaseCade?menuCode=209&currentPage=" + this.currentPage
        );
      } else if (!this.videoCombat && this.mycode == 6) {
        this.$router.push(
          "/casestudy/cascadeApprove?menuCode=211&currentPage=" +
            this.currentPage
        );
      }
    },
    //跳转查看案件
    lookCase(obj) {
      let routeData;
      if (this.$route.query.menuCode == 124) { // 实战平台
      console.log('触发这个');
        routeData = this.$router.resolve({
          path: "/videoCombat/casePicture_look",
          query: {
            caseUuid: obj.caseUuid,
            seek:true,
            isclick:true,
            menuCode: 120
          }
        });
      } else if (this.$route.query.menuCode == 219 || this.$route.query.menuCode == 211) {  // 案件库
        routeData = this.$router.resolve({
          path: "/casestudy/casePicture_look",
          query: {
            caseUuid: obj.caseUuid,
            menuCode: 200
          }
        });
      }
      window.open(routeData.href, "_blank");
    },
    // 新增案件
    addCase() {
      this.getCaseListReset();
      this.multipleSelection = [];
      this.innerVisible = true;
      this.getCaseType();
    },
    historyNal() {
      this.pageNoCase = 1;
      this.queryCaseList();
    },
    getCaseListReset() {
      this.pageNoCase = 1;
      this.pageSizeCase = 10;
      this.caseKeyword = "";
      this.caseGenre = "";
      let caseLise = sessionStorage.getItem("currentDeploymentType");
      let LibraryFlag = sessionStorage.getItem("caseVideoLibraryFlag");
      if (LibraryFlag == 0) {
        //表示只有侦查模块
        this.getAllList();
      } else {
        if (caseLise == 1) {
          this.newCaseList();
        } else {
          this.getCaseList();
        }
      }
    },

    //查询
    queryCaseList() {
      let caseLise = sessionStorage.getItem("currentDeploymentType");
      let LibraryFlag = sessionStorage.getItem("caseVideoLibraryFlag");
      if (LibraryFlag == 0) {
        //表示只有侦查模块
        this.getAllList();
      } else {
        if (caseLise == 1) {
          this.newCaseList();
        } else {
          this.getCaseList();
        }
      }
      // if(caseLise == 1) {
      //   this.newCaseList()
      // }else {
      //   this.getCaseList()
      // }
    },
    //单独侦查模块
    getAllList() {
      let data = {
        pageNum: this.pageNoCase, //当前页
        pageSize: this.pageSizeCase, //当前页结果数量
        orderBy: "update_time", //排序字段
        orderType: "desc", //排序方式
        begin: "", //开始时间
        end: "", //结束时间
        caseName: this.caseKeyword, //案件名称
        caseCategory: this.caseGenre, //案件类型
        approvalStatus: "", //案件审批状态
        userId: this.$storage.getSession("userInfo").userId,
        orgId: this.$storage.getSession("userInfo").orgId,
        status: 0,
        synergy: -1
      };
      this.$http
        .get("/pca/casemng/basecase/list/all", { params: data })
        .then(res => {
          this.caseList = res.data.data.list;
          this.totalNumCase = res.data.data.totalCount;
          this.pageSizeCase = res.data.data.pageSize;
          this.pageNoCase = res.data.data.pageNum;
        })
        .catch(() => {});
    },

    //   侦查模块中的查询，附带案管模块
    newCaseList() {
      let data = {
        pageNum: this.pageNoCase,
        pageSize: this.pageSizeCase,
        caseCategoryDesc: this.caseGenre,
        caseName: this.caseKeyword,
        caseCombinationId: this.editCaseObj.caseCombinationId
      };
      this.$http
        .get("/pca/casemng/allCase/list", { params: data })
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
    },
    //   一级案管模块
    getCaseList() {
      let data = {
        pageNum: this.pageNoCase,
        pageSize: this.pageSizeCase,
        orderBy: "update_time",
        orderType: "desc",
        begin: "",
        end: "",
        caseName: this.caseKeyword,
        caseCategory: this.caseGenre,
        approvalStatus: 2,
        status: 1,
        synergy: -1,
        qryListType: "addToCombo",
        comboId: this.editCaseObj.caseCombinationId
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
    },
    // 监听每页条数
    handleSizeChangeCase(val) {
      this.pageSizeCase = val;
      this.queryCaseList();
    },
    // 监听当前页码
    handleCurrentChangeCase(val) {
      this.pageNoCase = val;
      this.queryCaseList();
    },
    //添加案事件
    addItem(item) {
      if (
        this.historyCaseList.findIndex(c => {
          return c.caseUuid == item.caseUuid;
        }) != -1
      ) {
        this.$notify({
          type: "warning",
          message: "请勿添加重复案件！",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      //   return
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
    // 判断是否在数组里
    inArray(item) {
      let flag = false;
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (this.multipleSelection[i].caseUuid === item.caseUuid) {
          flag = true;
        }
      }
      return flag;
    },
    resetForm() {
      this.$refs["caseForm"].resetFields();
      this.innerVisible = false;
    },
    //保存串并案
    saveCasCase() {
      this.innerVisible = false;
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let a = true;
        for (let j = 0; j < this.historyCaseList.length; j++) {
          if (
            this.multipleSelection[i].caseUuid ==
            this.historyCaseList[j].caseUuid
          ) {
            a = false;
            break;
          }
        }
        if (a) {
          this.historyCaseList.push(this.multipleSelection[i]);
        } else {
        }
      }
    }
  },
  created() {
    this.caseCombinationId = this.$route.query.caseCombinationId;
    this.mycode = this.$route.query.mycode;
    this.videoCombat = this.$route.query.videoCombat;
    this.isAllcase = this.$route.query.isAllcase;
    this.showsave = sessionStorage.getItem("currentDeploymentType");
    this.showCase = sessionStorage.getItem("caseVideoLibraryFlag");
    this.getCaseType();
  },
  mounted() {
    this.mycode = this.$route.query.mycode;
    this.currentPage = this.$route.query.pageNum;
    this.loadCaseMap();
    this.getCaseObj();
    this.getCaseInfo();
    this.getHotspot();
  }
};
</script>

<style scoped>
@import "../../assets/css/case_common.css";
@import "../../assets/css/commom.css";
.content1 {
  position: relative;
  width: calc(60% - 0.24rem);
  height: 100%;
  border: 1px solid #dee1e8;
}
.dingwei {
  position: absolute;
  top: 210px;
  right: 38px;
}
.add {
  position: absolute;
  top: 5px;
  right: 0.1rem;
  width: 60px;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  text-align: center;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
}
.caseSearch_pop {
  width: 100%;
  display: flex;
  margin: 0.1rem 0;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: end;
  justify-content: flex-end;
}
.caseSearch_pop input {
  width: 3rem;
  margin-right: 0.1rem;
  font-size: 0.14rem;
  height: 0.3rem;
  line-height: 0.3rem;
}
.caseSearch_pop button {
  padding: 0.07rem 0.1rem;
  font-size: 0.14rem;
}
.el-button {
  padding: 0.08rem 0.12rem;
}
.el-pagination {
  text-align: right;
  margin-top: 0.1rem;
}
.el-input__inner {
  height: 30px;
}
.el-select {
  margin-right: 0.2rem;
}
.caseNameSelect /deep/ .el-input__inner {
  height: 0.3rem;
}
.detailItemTxtDetial {
  height: 0.22rem;
}
.detailItemTxtDetial span {
  width: 2.7rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
}
.detailItemTxtStatus {
  width: 100%;
  float: left;
}
.detailTxt {
  margin: 0;
}
.restEdit {
  width: 0.5rem;
  margin-left: 0.2rem;
}
.detailItemTxtTitle span {
  width: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
.el-tag {
  color: #99c9fa;
  background-color: transparent;
  border: 1px solid #134276;
}
.el-tag /deep/ .el-tag__close {
  color: #99c9fa;
}
.el-tag /deep/ .el-tag__close:hover {
  background-color: transparent;
  color: #99c9fa;
}
.delBtn {
  margin-left: 0rem;
}
.must {
  color: red;
}
</style>

