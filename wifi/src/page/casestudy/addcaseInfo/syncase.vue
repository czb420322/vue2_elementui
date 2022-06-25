<!--
 * @Author: your name
 * @Date: 2020-06-19 16:44:55
 * @LastEditTime : 2020-12-17 14:37:14
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\page\casestudy\addcaseInfo\syncase.vue
 -->
<template>
  <div class="taskMange">
    <el-dialog
      title="协同分配列表"
      :visible.sync="dialogVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @close="closeDia"
      @open="opendia"
      width="80%"
    >
      <div class="syncase">
        <div class="mainleft">
          <p>
            <img src="@/assets/images/caseStydy/addtime.png" alt>新增团队
          </p>
          <ul class="mainul">
            <li>
              <span>
                <b class="must">*</b>选择部门：
              </span>
              <el-popover placement="bottom-start" trigger="click">
                <input
                  slot="reference"
                  v-model.trim="orgName"
                  @focus="showOrg = true"
                  readonly
                  placeholder="请选择所属单位"
                  title="请选择所属单位"
                >
                <div class="treeWrap" v-show="showOrg">
                  <el-tree
                    :data="treeData"
                    :props="orgProps"
                    @check="handleClick"
                    show-checkbox
                    ref="treeForm"
                    check-strictly
                    default-expand-all
                    node-key="orgId"
                  ></el-tree>
                </div>
              </el-popover>
            </li>
            <li>
              <span>
                <b class="must">*</b>选择成员：
              </span>
              <el-select
                v-model.trim="orgPerson"
                class="receivePerson err-receivePerson1"
                filterable
                placeholder="请选择团队成员"
              >
                <el-option
                  v-for="(item,i) in departPerson"
                  :key="i"
                  :label="item.trueName"
                  :value="item.userId"
                ></el-option>
              </el-select>
            </li>
            <li>
              <span>
                <b class="must">*</b>团队角色：
              </span>
              <el-select v-model="trimRole">
                <el-option value="1" label="指挥员"></el-option>
                <el-option value="2" label="侦查员"></el-option>
                <!-- <el-option value="2" lable="侦查员"></el-option> -->
              </el-select>
              <!-- <select v-model="trimRole">
                  <option value="1">指挥员</option>
                  <option value="2">侦查员</option>
              </select>-->
            </li>
            <li>
              <span>&nbsp;&nbsp;描述信息：</span>
              <textarea v-model="describe" maxlength="100" style="resize: none"></textarea>
            </li>
            <!-- <li>

            </li>-->
          </ul>
          <el-button type="primary" class="searchBtn" v-no-more-click @click="getequal(1)">新增</el-button>
        </div>

        <div class="mainright">
          <p>
            <img src="@/assets/images/caseStydy/trim.png" alt> 团队列表
          </p>
          <div class="main_r">
            <el-table :data="tableData" border style="width: 100%" class="tables" height="4.75rem">
              <el-table-column show-overflow-tooltip type="index" width="80" label="编号"></el-table-column>
              <el-table-column prop="user.trueName" show-overflow-tooltip label="姓名"></el-table-column>
              <el-table-column prop="user.orgName" show-overflow-tooltip label="所属部门"></el-table-column>
              <el-table-column prop="distRole" :formatter="distRole" label="团队角色"></el-table-column>
              <el-table-column show-overflow-tooltip prop="user.phone" label="电话"></el-table-column>
              <el-table-column show-overflow-tooltip prop="establishUser.trueName" label="创建人"></el-table-column>
              <el-table-column prop="beginTime" width="160" label="创建时间"></el-table-column>
              <el-table-column show-overflow-tooltip prop="description" label="描述"></el-table-column>
              <el-table-column prop="operation" label="操作" width="180">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    class="el-icon-edit searchBtn"
                    @click="updateData(scope.row)"
                  >编辑</el-button>
                  <el-button
                    type="danger"
                    class="el-icon-delete delBtn"
                    @click="deleteData(scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount"
            ></el-pagination>
          </div>
        </div>

        <el-dialog
          title="修改成员"
          :visible.sync="dialogVisible1"
          :append-to-body="true"
          :close-on-press-escape="false"
          :close-on-click-modal="false"
          @close="closeUpdia"
          width="30%"
        >
          <span>
            <ul class="mainul">
              <li>
                <span>
                  <b class="must">*</b>所属部门：
                </span>
                <el-popover placement="bottom-start" trigger="click" :disabled="true">
                  <div class="treeWrap" id="other" v-show="showOrg1">
                    <!-- <el-tree
                      :data="treeData"
                      :props="orgProps"
                      @check="handleClick1"
                      show-checkbox
                      ref="treeForms"
                      check-strictly
                      default-expand-all
                      node-key="orgId"
                    ></el-tree> -->
                  </div>
                  <input
                    slot="reference"
                    v-model.trim="orgName1"
                    readonly
                    :disabled="true"
                    @focus="showOrg1 = true"
                    placeholder=""
                    title=""
                  >
                </el-popover>
              </li>
              <li>
                <span>
                  <b class="must">*</b>所属成员：
                </span>
                <el-select v-model="orgPerson1" :disabled="true">
                  <el-option
                    v-for="(item,i) in departPerson"
                    :value="item.userId"
                    :label="item.trueName"
                    :key="i"
                  ></el-option>
                </el-select>
              </li>
              <li>
                <span>
                  <b class="must">*</b>团队角色：
                </span>
                <el-select v-model="trimRole1">
                  <el-option value="1" label="指挥员"></el-option>
                  <el-option value="2" label="侦查员"></el-option>
                </el-select>
              </li>
              <li>
                <span>&nbsp;&nbsp;描述信息：</span>
                <textarea v-model="describe1" maxlength="100" style="resize: none"></textarea>
              </li>
            </ul>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeGroup"></el-button>
            <el-button @click="getequal(2)" v-no-more-click></el-button>
          </span>
        </el-dialog>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="dialogVisible = false">关 闭</el-button>
        <!-- <el-button @click="dialogVisible = false"></el-button>
        <el-button  @click="dialogVisible = false"></el-button>-->
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      treeData: [],
      orgProps: {
        children: "children",
        isLeaf: "leaf",
        label: "orgName"
      },
      orgName: "", //部门名称
      orgId: "", //部门ID
      parentOrgId: "", //父级ID
      orgPerson: "", //成员名称
      trimRole: "2", // 团队角色
      describe: "", //信息描述
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      phone: "",
      caseUuid: "", //案件ID
      edit: "", //是否是编辑
      synergyCombat: "", //是否是协同,
      departPerson: [], //部门人员
      handlerId: "",
      orgName1: "",
      orgPerson1: "",
      trimRole1: "2",
      describe1: "",
      caseInfom: false,
      myUploadTo: false,
      mysynergy: false,
      showOrg: false,
      showOrg1: false,
      NumCount: "",
      showTwocase: true,
      masterId: "", //是否是案件创建人的id
      synergyList: {}
    };
  },
  mounted() {
    // this.$nextTick (()=>{
    //   document.querySelector('other').addEventListener('click',this.handclgg)
    // })
  },
  watch: {
    issyncase(val) {
      this.dialogVisible = val;
    }
  },
  props: {
    issyncase: Boolean
  },
  methods: {
    // handclgg(e){

    // },
    //关闭模态框
    closeDia() {
      this.$emit("childbysyn", false);
      this.orgName = "";
      this.orgPerson = "";
      this.describe = "";
      this.currentPage = 1;
      this.pageSize = 10;
      this.showOrg = false;
      this.showOrg1 = false;
      this.trimRole = "2";
      this.departPerson = [];
    },
    //打开模态框
    opendia() {
      this.caseUuid = this.$route.query.caseUuid;
      this.getListOrg();
      this.getAllData();
    },
    closeUpdia() {
      this.showOrg1 = false;
    },
    closeGroup() {
      this.dialogVisible1 = false;
      if (this.orgName == "" || this.orgName == null) {
        this.departPerson = [];
      } else {
        this.handleClick(this.synergyList);
      }
    },
    getNumto() {
      console.log(this.orgPerson, 66);
      console.log(this.tableData, 88);
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.orgPerson == this.tableData[i].user.userId) {
          this.orgPerson = "";
          return;
        }
      }
    },
    distRole(row, column, cellValue) {
      if (cellValue === 1) {
        return "指挥员";
      } else if (cellValue === 2) {
        return "侦查员";
      }
    },
    handleClick(data, checked) {
      this.synergyList = {};
      this.synergyList = data;
      this.$refs.treeForm.setCheckedNodes([]);
      this.$refs.treeForm.setCheckedNodes([data]);
      this.orgId = data.orgId;
      this.orgName = data.orgName;
      this.parentOrgId = data.parentOrgId;
      this.orgPerson = "";
      // this.showOrg = false;
      this.getUserByOrg();
    },
    handleClick1(data, checked) {
      this.$refs.treeForms.setCheckedNodes([]);
      this.$refs.treeForms.setCheckedNodes([data]);
      this.orgId = data.orgId;
      this.orgName1 = data.orgName;
      this.parentOrgId = data.parentOrgId;
      this.orgPerson1 = "";
      this.getUserByOrg();
    },
    //选择部门下面的人
    getUserByOrg() {
      let data = {
        orgId: this.orgId
      };
      data = this.$qs.stringify(data);
      this.$http.post("sms/usercore/getUserByOrg", data).then(res => {
        if (res.data.code == 200) {
          this.departPerson = res.data.data;
        }
      });
    },
    //删除数据
    deleteData(row) {
      if (row.userId === this.masterId) {
        this.$notify({
          type: "warning",
          message: "不能删除案件创始人!",
          position: "bottom-right",
          duration: 3000
        });
      } else {
        let data = {
          handlerId: row.handlerId
        };
        data = this.$qs.stringify(data);
        this.$http
          .post("pca/synergyhandler/checkHandlerHasTask", data)
          .then(res => {
            if (res.data.code == 200) {
              if (res.data.data) {
                this.$myconfirm({
                  type: "提示",
                  msg:
                    "该用户被分配了任务，删除后需要对这些任务进行重新分配，是否确认删除？",
                  icon: 1,
                  btn: {
                    ok: "确定",
                    no: "取消"
                  }
                }).then(() => {
                  this.$http
                    .post("pca/synergyhandler/deleteHandler", data)
                    .then(res => {
                      if (res.data.code == 200) {
                        this.currentPage = 1;
                        this.getAllData();
                      }
                    });
                });
              } else {
                this.$myconfirm({
                  type: "提示",
                  msg: "是否删除此人",
                  icon: 1,
                  btn: {
                    ok: "确定",
                    no: "取消"
                  }
                }).then(() => {
                  this.$http
                    .post("pca/synergyhandler/deleteHandler", data)
                    .then(res => {
                      if (res.data.code == 200) {
                        this.currentPage = 1;
                        this.getAllData();
                      }
                    });
                });
              }
            }
          });
        return;

        this.$myconfirm({
          type: "提示",
          msg: "是否删除此人",
          icon: 1,
          btn: {
            ok: "确定",
            no: "取消"
          }
        }).then(() => {});
      }
    },
    // 获取部门列表
    getListOrg() {
      let data = {
        orgParentId: ""
      };
      data = this.$qs.stringify(data); //post请求分离data
      this.$http.get("/sms/org/listOrg", data).then(res => {
        if (res.data.code == 200) {
          this.treeData = res.data.data;
        } else {
          this.$notify({
            type: "error",
            message: "获取部门列表失败！",
            position: "bottom-right",
            duration: 3000
          });
          // layer.alert("获取部门列表失败！", { icon: 5, title: "消息提示" });
        }
      });
    },
    getequal(val) {
      if (val == 2) {
        if (!this.orgPerson1) {
          this.$notify({
            type: "warning",
            message: "请选择成员",
            position: "bottom-right",
            duration: 3000
          });
          return;
        }
      }
      let person = "";
      let handlerId = "";
      if (val == 1) {
        if (
          this.orgName == "" ||
          this.orgName == undefined ||
          this.orgName == null
        ) {
          this.$notify({
            type: "warning",
            message: "请选择部门",
            position: "bottom-right",
            duration: 3000
          });
          return;
        } else {
          person = this.orgPerson;
          handlerId = "";
        }
      } else if (val == 2) {
        person = this.orgPerson1;
        handlerId = this.handlerId;
      }
      let data = {
        userId: person,
        caseUuid: this.caseUuid,
        handlerId: handlerId
      };
      if (val == 1) {
        if (!this.orgPerson) {
          this.$notify({
            type: "warning",
            message: "请选择成员",
            position: "bottom-right",
            duration: 3000
          });
          return;
        }
      }

      data = this.$qs.stringify(data);
      this.$http
        .post("pca/synergyhandler/checkHandlerIsExisted", data)
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.data == false && val == 1) {
              this.addPerson();
            } else if (res.data.data == false && val == 2) {
              this.updataList();
            } else if (res.data.data == true) {
              this.$notify({
                type: "warning",
                message: "成员已存在",
                position: "bottom-right",
                duration: 3000
              });
              this.clearData();
            }
          }
        });
    },

    //添加成员
    addPerson() {
      if (this.orgId == "" || this.orgPerson == "") {
        this.$notify({
          type: "warning",
          message: "分配人或描述不能为空",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.describe.length > 100) {
        this.$notify({
          type: "warning",
          message: "描述信息不能超过100字",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      let data = {
        userId: this.orgPerson,
        caseUuid: this.caseUuid,
        distRole: this.trimRole,
        deptId: this.orgId,
        handlerName: this.orgPerson,
        phone: "",
        description: this.describe
      };
      data = this.$qs.stringify(data);
      this.$http.post("pca/synergyhandler/savehandler", data).then(res => {
        if (res.data.code == 200) {
          this.trimRole = "2";
          this.clearData();
          this.getAllData();

          // this.$emit('childSynergy',this.trimRole)
        } else if (res.data.code == 100) {
          this.trimRole = "2";
          this.$notify({
            type: "warning",
            message: "此案件已有指挥员",
            position: "bottom-right",
            duration: 3000
          });
          // layer.alert("此案件已有指挥员", { icon: 5, title: "消息提示" });
          this.clearData();
          this.getAllData();
        }
      });
    },
    clearData() {
      this.orgId = "";
      this.$refs.treeForm.setCheckedNodes([]);
      this.departPerson = [];
      this.describe = "";
      this.phone = "";
      this.orgName = "";
      this.orgPerson = "";
      this.trimRole = "2";
    },
    //获取表格数据
    getAllData() {
      let data = {
        caseUuid: this.caseUuid,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        orderBy: "create_time",
        orderType: "desc"
      };
      data = this.$qs.stringify(data);
      this.$http
        .post("pca/synergyhandler/selectHandlerList", data)
        .then(res => {
          if (res.data.code == 200) {

            this.masterId = res.data.data.list[0].establishUser.userId;
            this.tableData = res.data.data.list;
            this.totalCount = res.data.data.totalCount;
          }
        });
    },

    //编辑
    updateData(row) {
      this.dialogVisible1 = true;
      this.orgName1 = row.user.orgName;
      this.orgId = row.user.orgId;
      this.orgPerson1 = row.userId;
      this.describe1 = row.description;
      this.trimRole1 = row.distRole.toString();
      this.handlerId = row.handlerId;
      this.getUserByOrg(); //获取部门下面的人
      // this.$nextTick(() => {
      //   this.$refs["treeForms"].setCheckedKeys([this.orgId]);
      // });
    },
    updataList() {
      if (this.orgId == "" || this.orgPerson1 == "") {
        this.$notify({
          type: "warning",
          message: "分配人或描述不能为空",
          position: "bottom-right",
          duration: 3000
        });
        return;
      }
      if (this.describe1 != null || this.describe1 != undefined) {
        if (this.describe1.length > 100) {
          this.$notify({
            type: "warning",
            message: "描述信息不能超过100字",
            position: "bottom-right",
            duration: 3000
          });
          return;
        }
      }

      let data = {
        handlerId: this.handlerId,
        distRole: this.trimRole1,
        deptId: this.orgId,
        handlerName: this.orgPerson1,
        description: this.describe1,
        userId: this.orgPerson1,
        caseUuid: this.caseUuid
      };
      console.log(data, 666);
      data = this.$qs.stringify(data);
      this.$http.post("pca/synergyhandler/updateHandler", data).then(res => {
        if (res.data.code == 200) {
            this.$notify({
              type: 'success',
              message: '修改成功！',
              position: 'bottom-right',
              duration: 3000
            });
            this.clearData();
            this.getAllData();
            this.dialogVisible1 = false;
            this.$emit("childSynergy", this.trimRole1);
        } else if (res.data.code == 100) {
          this.$notify({
            type: "warning",
            message: "此案件已有指挥员",
            position: "bottom-right",
            duration: 3000
          });
          //  layer.alert("此案件已有指挥员", { icon: 5, title: "消息提示" });
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getAllData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAllData();
    }
    //上一步
    // gotoprev(){
    //   if(this.myUploadTo){
    //     this.$router.push({path:'/casestudy/caseInfomanage/addcase', query:{menuCode:200,caseUuid:this.caseUuid,edit:true,myUploadTo:true}})
    //   }else if(this.mysynergy){
    //     this.$router.push({path:'/casestudy/caseInfomanage/addcase', query:{menuCode:200,caseUuid:this.caseUuid,edit:true,mysynergy:true}})
    //   }else if(this.caseInfom){
    //     this.$router.push({path:'/casestudy/caseInfomanage/addcase', query:{menuCode:200,caseUuid:this.caseUuid,edit:true,caseInfom:true}})
    //   }else if(this.showTwocase){
    //     this.$router.push({path:'/videoCombat/twoscout', query:{menuCode:100,caseUuid:this.caseUuid,edit:true,showTwocase:true}})
    //   }

    // },
    //下一步
    // gotoNext(){
    //   if(this.myUploadTo){
    //     this.$router.push({path:'/casestudy/caseInfomanage/addcasetwo', query:{menuCode:200,caseUuid:this.caseUuid,edit:this.edit,myUploadTo:true,synergyCombat:this.synergyCombat}})
    //   }else if(this.mysynergy){
    //     this.$router.push({path:'/casestudy/caseInfomanage/addcasetwo', query:{menuCode:200,caseUuid:this.caseUuid,edit:this.edit,mysynergy:true,synergyCombat:this.synergyCombat}})
    //   }else if(this.caseInfom){
    //     this.$router.push({path:'/casestudy/caseInfomanage/addcasetwo', query:{menuCode:200,caseUuid:this.caseUuid,edit:this.edit,caseInfom:true,synergyCombat:this.synergyCombat}})
    //   }else if(this.showTwocase){
    //      this.$router.push({path:'/casestudy/caseInfomanage/addcasetwo?menuCode=200', query:{caseUuid:this.caseUuid,edit:this.edit,hide:false,synergyCombat:this.synergyCombat,showTwocase:this.showTwocase}})
    //   }

    // },
  }
};
</script>
 <style >
 /* .el-table thead, {
     @include font_color('font_color1')
 } */
</style>


<style  scoped>
@import "../../../assets/css/commom.css";
.syncase {
  height: 6rem;
  color: #99c9fa;
}
.syncase .mainleft {
  width: 25%;
  height: 100%;
  float: left;
  border: 2px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
  padding: 0 0.1rem;
}
.mainright {
  margin-left: 26%;
  width: 74%;
  height: 100%;
  padding: 0 0.15rem;
  border: 2px solid rgba(15, 44, 79, 0.5);
  background-color: rgba(16, 35, 56, 0.5);
}
.syncase div p {
  height: 0.4rem;
  line-height: 0.4rem;
}
.mainleft .el-button {
  float: right;
  margin-right: 0.3rem;
}
.mainul {
  overflow: hidden;
  height: 2.5rem;
  color: #99c9fa;
}
.mainul li {
  height: 0.4rem;
  line-height: 0.4rem;
}
.mainul li input,
.mainul li textarea {
  width: calc(100% - 1rem);
  height: 0.3rem;
  padding-left: 0.15rem;
}
.mainul li textarea {
  height: 0.8rem;
}
.el-select {
  width: calc(100% - 1rem);
}
.mainul li /deep/ .el-input__inner {
  height: 0.3rem;
}
.treeWrap {
  overflow-y: auto;
  height: 2rem;
  /* width: 2.75rem;
  height: 2rem;
  overflow: auto;
  position: absolute;
  z-index: 2;
  left: 1.15rem;
  border-radius: 5px;
  padding: 0.1rem;
  background-color: #fff; */
}
.treeWrap .el-tree {
  width: 100%;
  height: 100%;
}
.treeWrap /deep/ .el-tree-node__label {
  color: #99c9fa;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.treeWrap {
  background-color: rgba(16, 35, 56, 0.8) !important;
  border: 1px solid rgba(15, 44, 79, 0.8) !important;
}
.el-pagination {
  text-align: right;
  margin-top: 0.15rem;
}
.el-popover {
  width: 3rem;
  height: 2.2rem;
}
.must {
  color: red;
  padding-right: 0.03rem;
}
</style>
