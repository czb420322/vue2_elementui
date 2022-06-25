<template>
  <div class="dicManageWrappr userList">
    <div class="ulTitle">| 审批列表</div>
    <div class="content">
      <div class="table">
        <el-table ref="table1" :data="tableData" @sort-change="getsort" height="5.7rem" style="width: 100%">
          <div slot="empty">
            <div class="noImg">
              <img src="../../assets/updataImg/NoData.png" />
            </div>
          </div>
          <el-table-column type="index" align="center" width="60" label="编号">
          </el-table-column>
          <el-table-column prop="userName" sortable="custom" align="center" show-overflow-tooltip label="用户账号">
          </el-table-column>
          <el-table-column prop="trueName" sortable="custom" align="center" show-overflow-tooltip label="真实姓名">
          </el-table-column>
          <el-table-column prop="phone" align="center" sortable="custom" show-overflow-tooltip label="电话号码">
          </el-table-column>
          <el-table-column prop="orgName" align="center" sortable="custom" show-overflow-tooltip label="组织部门">
          </el-table-column>
          <el-table-column prop="lastLoginTime" align="center" sortable="custom" show-overflow-tooltip label="注册时间">
          </el-table-column>
          <el-table-column prop="roleId" v-if="flag" align="center" label="id">
          </el-table-column>
          <el-table-column label="操作" align="center" width="200" v-if="editBtn">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" class="searchBtn" v-if="editBtn" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">审批</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pageWrapper">
          <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 30, 45]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog class="dialog" :visible.sync="dialogVisible" :modal-append-to-body="false" :close-on-click-modal="false" :title="dialogTitle" :before-close="resetForm" width="10.40rem">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="sTitle"><span>|</span>添加用户信息</div>
        <div class="scont">
          <el-form-item label="用户账号：" prop="userName">
            <el-input v-model.trim="ruleForm.userName" :readonly="formReadonly" placeholder="请输入用户账号"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名：" prop="trueName">
            <el-input v-model.trim="ruleForm.trueName" :readonly="formReadonly" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="电话号码：" prop="phone">
            <el-input v-model.trim="ruleForm.phone" :readonly="formReadonly" placeholder="请输入电话号码"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="idCard">
            <el-input v-model.trim="ruleForm.idCard" :readonly="formReadonly" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label="组织部门：" prop="orgCode">
            <el-popover placement="bottom-start" trigger="click">
              <div class="treeWrap">
                <el-tree :data="treeData" :props="orgProps" @check-change="handleClick" show-checkbox ref="treeForm" check-strictly default-expand-all node-key="orgId"></el-tree>
              </div>
              <el-input slot="reference" v-model.trim="ruleForm.orgName" :readonly="formReadonly" placeholder="请输入机构名称"></el-input>
              <input v-model.trim="ruleForm.orgCode" type="hidden" />
            </el-popover>

          </el-form-item>
        </div>
        <div class="photo">
          <span style="color:#99c9fa;">照片采集：</span>
          <el-upload class="avatar-uploader" action="" name="" disabled :show-file-list="false">
            <img v-if="hasPhoto" :src="ruleForm.photoUrl" class="avatar">
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
            <img v-else src="../../assets/rl.png" class="avatar">
            <div class="el-upload__tip" style="color:#99c9fa;" slot="tip" v-show="!errTip.flag">只能上传jpg/png文件，且不超过2M</div>
          </el-upload>
          <div class="errTip" v-show="errTip.flag">{{errTip.txt}}</div>
          <!-- <el-upload class="avatar-uploader" action="sys/uploadFile/upload" name="files" :show-file-list="false" :before-upload="beforeAvatarUpload">
            <img v-if="hasPhoto" :src="ruleForm.photoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" style="color:#99c9fa;" slot="tip" v-show="!errTip.flag">只能上传jpg/jpeg/png文件，且不超过2M</div>
          </el-upload>
          <div class="errTip" v-show="errTip.flag">{{errTip.txt}}</div> -->
        </div>

        <div class="sTitle" v-show="false" ><span>|</span>用户权限设置</div>
        <el-form-item label="分配角色：" prop="roleList" class="roles" v-show="false">
          <el-checkbox-group v-model.trim="ruleForm.roleList">
            <el-checkbox v-for="item in checkList" :key="item.roleId" :label="item.roleId">{{item.roleName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancleBtn" type="primary" @click="reset('ruleForm')">取 消</el-button>
        <el-button class="rejectBtn" type="primary" @click="refuse('ruleForm',2)">拒 绝</el-button>
        <el-button class="passBtn" type="primary" @click="submit('ruleForm',1)">通 过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editBtn: this.$storage.getSession("618") != null ? true : false,
      treeData: [],
      hasPhoto: false,
      errTip: {
        flag: false,
        txt: ""
      },
      userId: "",
      ruleForm: {
        photoUrl: null,
        approvalStatus: 1, //approvalStatus  0.待审批;1.审批通过;2.审批不通过
        userName: null,
        trueName: null,
        phone: null,
        orgId: null,
        orgCode: null,
        orgName: null,
        idCard: null,
        roleList: [],
        roles: null //存放id
      },
      checkList: [],
      flag: false,
      formReadonly: true,
      dialogTitle: "",
      dialogVisible: false,
      totalCount: 0,
      orderBy: "creatorTime",
      orderType: "desc",
      pageSize: 15,
      currentPage: 1,
      tableData: [],
      orgProps: {
        children: "children",
        isLeaf: "leaf",
        label: "orgName"
      },
      defaultProps: {
        children: "child",
        label: "menuName"
      },
      rules: {
        roleList: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个角色",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.queryData();
  },
  methods: {
    handleClick(data, checked) {
      this.$refs.treeForm.setCheckedNodes([]);
      this.$refs.treeForm.setCheckedNodes([data]);
      this.ruleForm.orgName = data.orgName;
      this.ruleForm.orgCode = data.orgCode;
      this.ruleForm.orgId = data.orgId;
    },
    // 监听表格排序
    getsort(obj) {
      this.orderBy = obj.prop;
      this.orderType = obj.order == "descending" ? "desc" : "asc";
      this.queryData();
    },
    // 监听每页条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.queryData();
    },
    // 监听当前页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryData();
    },
    // 编辑
    handleEdit(index, row) {
      this.dialogTitle = "审批详情";
      this.dialogVisible = true;
      this.ruleForm.userName = row.userName;
      this.ruleForm.trueName = row.trueName;
      this.ruleForm.phone = row.phone;
      this.ruleForm.idCard = row.idCard;
      this.ruleForm.orgCode = row.orgCode;
      this.ruleForm.orgName = row.orgName;
      this.ruleForm.orgId = row.orgId;
      this.ruleForm.photoUrl = row.photoUrl;
      this.ruleForm.password = row.password;
      this.hasPhoto = !!row.photoUrl;
      this.userId = row.userId;

      let checkedKey = [];
      if (row.orgId) {
        checkedKey.push(row.orgId);
      }
      if (!this.$refs["treeForm"]) {
        this.$nextTick(function() {
          this.$refs["treeForm"].setCheckedKeys(checkedKey);
        });
      } else {
        this.$refs["treeForm"].setCheckedKeys(checkedKey);
      }
      this.getListOrg();
      this.getUserInfo(row.userId);
    },
    // 请求列表数据
    queryData() {
      let that = this;
      let data = {
        approvalStatus: 0,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        orderBy: this.orderBy,
        orderType: this.orderType
      };
      data = that.$qs.stringify(data); //post请求分离data
      that.$http.post("/sms/usercore/list", data).then(res => {
        if (res.data.code == 200) {
          if (res.data.data.list.length > 0) {
            this.tableData = res.data.data.list;
            this.totalCount = res.data.data.totalCount;
          } else {
            this.tableData = [];
            this.totalCount = 0;
          }

          if (!this.checkList.length) {
            this.getAllRole(); //初始化用户角色列表
          }
        } else {
          this.$notify({
            type: "error",
            message: "获取用户列表信息失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    // 获取所有的角色
    getAllRole() {
      this.$http.post("/sms/role/getAll").then(res => {
        if (res.data.code == 200) {
          this.checkList = res.data.data;
          /* 这一步是操作用户的角色的默认选中的操作 */
             this.ruleForm.roleList = []
          for (let i = 0; i < this.checkList.length; i++) {
              this.ruleForm.roleList.push(this.checkList[i].roleId)
          }
          this.ruleForm.roles = this.ruleForm.roleList.join(',')
        } else {
          this.$notify({
            type: "error",
            message: "获取角色列表失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
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
        }
      });
    },
    // 编辑用户
    editUser() {
      this.ruleForm.roles = this.ruleForm.roleList.join(",");
      let data = Object.assign(this.ruleForm, { userId: this.userId });
      data = this.$qs.stringify(data); //post请求分离data
      this.$http.post("/sms/usercore/updateByManage", data).then(res => {
        if (res.data.code == 200) {
          //编辑成功刷新审批列表
          if (this.ruleForm.approvalStatus == 1) {
            this.$notify({
              type: "success",
              message: "审核通过！",
              position: "bottom-right",
              duration: 3000
            });
          } else if (this.ruleForm.approvalStatus == 2) {
            this.$notify({
              type: "warning",
              message: "审核被拒绝！",
              position: "bottom-right",
              duration: 3000
            });
          }
          this.queryData();
        } else {
          this.$notify({
            type: "error",
            message: "审核失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },

    // 获取用户信息
    getUserInfo(id) {
      this.$http.get("/sms/usercore/getUserInfo/" + id).then(res => {
        if (res.data.code === 200) {
          if (res.data.data.roles.length) {
            this.ruleForm.roleList = res.data.data.roles;
          }
        } else {
          this.$notify({
            type: "error",
            message: "获取用户信息失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    //关闭弹窗前重置数据
    resetForm(done) {
      this.ruleForm.roleList = [];
      this.ruleForm.userName = "";
      this.ruleForm.trueName = "";
      this.ruleForm.phone = "";
      this.ruleForm.idCard = "";
      this.ruleForm.orgCode = "";
      this.ruleForm.status = "";
      this.ruleForm.roles = "";
      this.$refs["ruleForm"].resetFields();
      done();
    },
    // dialong 提交
    submit(formName, approvalStatus) {
      this.$refs[formName].validate(valid => {
        if (valid && this.ruleForm.roleList.length) {
          this.dialogVisible = false;
          this.ruleForm.approvalStatus = approvalStatus;
          //审批
          this.editUser();
        }
      });
    },
    refuse(formName, approvalStatus) {
      this.dialogVisible = false;
      this.ruleForm.approvalStatus = approvalStatus;
      //审批
      this.editUser();
    },
    // dialong 重置
    reset(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    }
  },
  mounted() {
    //表格重绘
    let _this = this;
    window.addEventListener("resize", function() {
      if (_this.$refs["table1"]) {
        _this.$refs["table1"].doLayout();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/manage_third.css";
@import "../../assets/css/commom.css";

.userList {
  width: 97%;
  height: 97%;
  margin: 0 auto;
}
.table {
  width: 100%;
}
.demo-ruleForm {
  position: relative;
}
.demo-ruleForm .sTitle {
  font-size: 0.16rem;
  font-weight: bold;
  line-height: 0.3rem;
  margin-bottom: 0.1rem;
  color: #e5e7e8;
}
.demo-ruleForm .sTitle span {
  color: #409eff;
  margin-right: 0.1rem;
}
.demo-ruleForm >>> .el-form-item__label,
.demo-ruleForm >>> .el-form-item__content {
  font-size: 0.14rem;
  line-height: 0.32rem;
}

.demo-ruleForm .scont {
  padding-left: 0.3rem;
  display: flex;
  flex-wrap: wrap;
  /*width:7.46rem;*/
}
.demo-ruleForm .el-form-item {
  width: 3.5rem;
}
.passBtn{
    margin-left: .2rem
}
.demo-ruleForm .roles {
  width: 100%;
  padding-left: 0.3rem;
}
.demo-ruleForm .photo {
  position: absolute;
  right: 0;
  top: 0.16rem;
  width: 2rem;
  height: 2.3rem;
}
.photo .errTip {
  font-size: 12px;
  color: #f56c6c;
}

.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 0.28rem;
  color: #8c939d;
  width: 1.2rem;
  height: 1.46rem;
  line-height: 1.46rem;
  text-align: center;
}
.avatar {
  width: 1.2rem;
  height: 1.46rem;
  display: block;
}

.el-checkbox {
  float: left;
  width: 2.24rem;
}
.el-checkbox + .el-checkbox {
  margin: 0;
}
.dicManageWrappr {
  padding: 0;
}
</style>


