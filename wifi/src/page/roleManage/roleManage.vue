<!--
 * @Author: your name
 * @Date: 2020-04-23 14:30:32
 * @LastEditTime : 2020-08-28 16:07:58
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\roleManage\roleManage.vue
 -->
<template>
  <div class="parent">
    <!-- <div class="topInfo">
            <p class="sysname" @click="gohome">系统管理</p>
            <p class="sysname childname">角色管理</p>
    </div>-->
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt>
      <span class="sysname childname">当前位置：</span>
      <p class="sysname" @click="gohome">系统管理 ></p>
      <p class="sysname">&nbsp;角色管理</p>
    </div>
    <div class="dicManageWrappr role">
      <div class="item">
        <!-- <el-button class="addBtn" icon="el-icon-plus" v-if="addBtn" @click="addData">新增角色</el-button> -->
        <div v-if="addBtn" @click="addData" class="el-icon-plus commBtn addBtn">新增角色</div>
        <div class="searchInfo">
          <input placeholder="请输入您要查找的角色名称/描述" v-model.trim="keyword" @keyup.enter="queryData">&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button @click="queryData" class="searchBtn" icon="el-icon-search">查询</el-button>
        </div>
      </div>
      <div class="content">
        <div class="table">
          <el-table
            ref="table1"
            :data="tableData"
            @sort-change="getsort"
            max-height="600"
            style="width: 100%"
          >
            <div slot="empty">
              <div class="noImg">
                <img src="../../assets/updataImg/NoData.png">
              </div>
            </div>
            <el-table-column type="index" align="center" width="80" label="编号"></el-table-column>
            <el-table-column
              prop="roleName"
              sortable="custom"
              align="center"
              show-overflow-tooltip
              label="角色名称"
            ></el-table-column>
            <el-table-column prop="ramark" align="center" show-overflow-tooltip label="描述"></el-table-column>
            <el-table-column
              prop="createrTime"
              sortable="custom"
              align="center"
              show-overflow-tooltip
              label="创建时间"
            ></el-table-column>
            <el-table-column prop="roleId" v-if="flag" align="center" label="id"></el-table-column>
            <el-table-column label="操作" align="center" width="260" v-if="editBtn || deleteBtn">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  v-if="editBtn"
                  class="searchBtn"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  class="delBtn"
                  v-if="deleteBtn"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pageWrapper">
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
      </div>
    </div>
    <footerSecond/>
    <el-dialog
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      :title="dialogTitle"
      class="dialog"
      @close="closeDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      :before-close="resetForm"
      width="7.5rem"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            v-model.trim="ruleForm.roleName"
            @blur="loseRole"
            maxlength="20"
            :readonly="dialogTitle == '编辑角色' && ruleForm.roleName == '系统管理'"
            placeholder="请输入角色名称"
          ></el-input>
          <span class="partBar" v-show="isLoseName">请输入角色名称</span>
        </el-form-item>
        <el-form-item label="描述" prop="ramark">
          <el-input
            type="textarea"
            v-model.trim="ruleForm.ramark"
            maxlength="100"
            placeholder="请输入描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="menusList" class="jur">
          <el-tree
            :data="treeData"
            v-model.trim="ruleForm.menusList"
            :props="defaultProps"
            @check="handleCheckChange"
            show-checkbox
            ref="tree"
            node-key="menuCode"
            default-expand-all
            :default-checked-keys="selectMenus"
          ></el-tree>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="reset('ruleForm')">取 消</el-button>
        <el-button type="primary passBtn" @click="submit('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import footerSecond from "../../components/footer_second";
export default {
  components: {
    footerSecond
  },
  data() {
    return {
      addBtn: this.$storage.getSession("615") != null ? true : false,
      editBtn: this.$storage.getSession("613") != null ? true : false,
      deleteBtn: this.$storage.getSession("616") != null ? true : false,
      isEdit: false,
      treeData: [],
      ruleForm: {
        roleName: null,
        ramark: null,
        menusList: null
      },
      row: {},
      selectMenus: [],
      flag: false,
      dialogTitle: "",
      dialogVisible: false,
      keyword: "",
      totalCount: 0,
      orderBy: "createrTime",
      orderType: "desc",
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      isLoseName: false,
      defaultProps: {
        children: "child",
        label: "menuName"
      },
      rules: {
        // roleName: [
        //   { required: true, message: "请输入角色名称", trigger: "blur" },
        //   { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        // ],
        remark: [
          { required: false, message: "请输入描述", trigger: "blur" },
          { min: 0, max: 255, message: "长度在255 个字符以内", trigger: "blur" }
        ],
        menusList: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个权限",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.queryData();
  },
  mounted() {
    //表格重绘
    let _this = this;
    window.addEventListener("resize", function() {
      if (_this.$refs["table1"]) {
        _this.$refs["table1"].doLayout();
      }
    });
  },
  methods: {
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
      console.log(this.currentPage, "当前是在哪个页码进入的编辑");
      this.dialogTitle = "编辑角色";
      this.dialogVisible = true;
      this.isEdit = true;
      this.getRoleInfo(row.roleId);
    },
    // 删除
    handleDelete(index, row) {
      this.openMessageBox(row.roleId);
    },
    // tree选择
    handleCheckChange(data, checked) {
      this.ruleForm.menusList = checked.checkedKeys.concat(
        checked.halfCheckedKeys
      );
      this.$refs["ruleForm"].validate();
    },
    // 角色姓名失去焦点验证
    loseRole() {
      if (this.ruleForm.roleName == "") {
        this.isLoseName = true;
      } else {
        this.isLoseName = false;
      }
    },
    // 关闭弹层
    closeDialog() {
      this.isLoseName = false;
    },
    // 提示弹框
    openMessageBox(id) {
      this.$myconfirm({
        type: "提示",
        msg: "此操作将永久删除, 是否继续?",
        icon: 2,
        btn: {
          ok: "确定",
          no: "取消"
        }
      }).then(() => {
        this.deleteRoleInfo(id);
      });

      // let _this=this;
      // layer.open({
      //     content: '此操作将永久删除, 是否继续?'
      //     ,icon: 7
      //     ,btn: ['确定', '取消']
      //     ,yes: function(index, layero){
      //         //按钮【按钮一】的回调
      //         _this.deleteRoleInfo(id);
      //         layer.close(index);
      //     }
      //     ,btn2: function(index, layero){
      //     }
      // });
    },
    // 请求列表数据
    queryData() {
      let data = {
        keyword: this.keyword,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        orderBy: this.orderBy,
        orderType: this.orderType
      };
      console.log(data, "当前页面");
      data = this.$qs.stringify(data); //post请求分离data
      this.$http.post("/sms/role/list", data).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.list;
          this.totalCount = res.data.data.totalCount;

          if (!this.treeData.length) {
            this.getMenuFormat(); //初始化菜单列表
          }
        } else {
          this.$notify({
            type: "error",
            message: "获取角色列表失败",
            position: "bottom-right",
            duration: 3000
          });
          // this.$myconfirm({
          //   type: '提示',
          //   msg: '获取角色列表失败',
          //   icon:1,
          //   btn: {
          //     ok: '确定',
          //     no: '取消'
          //   }
          // })
          // layer.alert('获取角色列表失败', {icon: 5, title: "消息提示"});
        }
      });
    },
    // 获取角色权限列表
    getMenuFormat() {
      let that = this;
      that.$http.get("/sms/menu/menuFormat").then(res => {
        if (res.data.data && res.data.code == 200) {
          this.treeData = res.data.data;
        } else {
          this.$notify({
            type: "error",
            message: "获取权限列表失败",
            position: "bottom-right",
            duration: 3000
          });
          // this.$myconfirm({
          //   type: '提示',
          //   msg: '获取权限列表失败',
          //   icon:1,
          //   btn: {
          //     ok: '确定',
          //     no: '取消'
          //   }
          // })
          // layer.alert('获取权限列表失败', {icon: 5, title: "消息提示"});
        }
      });
    },
    // 去管理菜单页
    gohome() {
      this.$router.push({ path: "/manage", query: { menuCode: "600" } });
    },
    //关闭弹窗前重置数据
    resetForm(done) {
      this.ruleForm.roleId = "";
      this.ruleForm.ramark = "";
      this.ruleForm.roleName = "";
      this.selectMenus = [];
      if (!this.$refs["tree"]) {
        this.$nextTick(function() {
          this.$refs["tree"].setCheckedKeys([]);
        });
      } else {
        this.$refs["tree"].setCheckedKeys([]);
      }
      this.$refs["ruleForm"].resetFields();
      done();
    },
    // dialong 提交
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.$refs.tree.getCheckedKeys().length) {
          let checkedMenus = this.$refs.tree.getCheckedKeys();
          let halfMenus = this.$refs.tree.getHalfCheckedKeys();
          let menusList = checkedMenus.concat(halfMenus);
          let menus = menusList.join(",");
          this.dialogVisible = false;
          this.validRole(menus);
        } else {
          return false;
        }
      });
    },
    // dialong 重置
    reset(formName) {
      this.$refs[formName].resetFields();
      this.selectMenus = [];
      this.$refs.tree.setCheckedKeys([]);
      this.dialogVisible = false;
    },
    // 新增按钮
    addData() {
      this.isEdit = false;
      this.dialogTitle = "新增角色";
      this.dialogVisible = true;
      this.ruleForm.roleId = "";
      this.ruleForm.ramark = "";
      this.ruleForm.roleName = "";
      this.selectMenus = [];
      if (!this.$refs["tree"]) {
        this.$nextTick(function() {
          this.$refs["tree"].setCheckedKeys([]);
        });
      } else {
        this.$refs["tree"].setCheckedKeys([]);
      }
    },
    // 是新增还是编辑
    validRole(menus) {
      if (this.isEdit) {
        let data = {
          roleId: this.ruleForm.roleId,
          roleName: this.ruleForm.roleName,
          ramark: this.ruleForm.ramark,
          menus: menus
        };
        data = this.$qs.stringify(data); //post请求分离data
        this.$http.post("/sms/role/update", data).then(res => {
          if (res.data && res.data.code == 200) {
            this.$notify({
              type: "success",
              message: "编辑成功！",
              position: "bottom-right",
              duration: 3000
            });
            this.queryData();
          } else if(res.data.code == 100){
              this.$notify({
              type: "warning",
              message: "角色名称不能为空！",
              position: "bottom-right",
              duration: 3000
            });
          } else {
            this.$notify({
              type: "error",
              message: "编辑失败！",
              position: "bottom-right",
              duration: 3000
            });
          }
        });
      } else {
        let data = {
          roleName: this.ruleForm.roleName,
          ramark: this.ruleForm.ramark,
          menus: menus
        };
        data = this.$qs.stringify(data); //post请求分离data
        this.$http.post("/sms/role/add", data).then(res => {
          if (res.data.code == 200 && res.data.data) {
            this.queryData();
            this.$notify({
              type: "success",
              message: "添加成功！",
              position: "bottom-right",
              duration: 3000
            });
          }else if(res.data.code == 100){
              this.$notify({
              type: "warning",
              message: "角色名称不能为空！",
              position: "bottom-right",
              duration: 3000
            });
          } else {
            this.$notify({
              type: "error",
              message: "角色名称重复！",
              position: "bottom-right",
              duration: 3000
            });
          }
        });
      }
    },
    // 获取角色详情信息
    getRoleInfo(roleId) {
      let data = { roleId: roleId };
      data = this.$qs.stringify(data); //post请求分离data
      this.$http.post("/sms/role/info", data).then(res => {
        if (res.data && res.data.code == 200) {
          let roleItem = res.data.data.role;
          this.ruleForm.roleName = roleItem.roleName;
          this.ruleForm.ramark = roleItem.ramark;
          this.ruleForm.roleId = roleItem.roleId;
          this.ruleForm.menusList = res.data.data.selectMenus;
          let sMenu = res.data.data.selectMenus;
          this.selectMenus = [];

          for (let i = 0; i < sMenu.length; i++) {
            let node = this.$refs["tree"].getNode(sMenu[i]);
            if (node.childNodes.length == 0) {
              this.selectMenus.push(sMenu[i]);
            }
          }

          if (!this.$refs["tree"]) {
            this.$nextTick(function() {
              this.$refs["tree"].setCheckedKeys(this.selectMenus);
            });
          } else {
            this.$refs["tree"].setCheckedKeys(this.selectMenus);
          }
        } else {
          this.$notify({
            type: "error",
            message: "获取角色详细信息失败！",
            position: "bottom-right",
            duration: 3000
          });
          this.queryData();
        }
      });
    },
    // 删除用户信息
    deleteRoleInfo(id) {
      let that = this;
      this.$http.post("/sms/role/delete/" + id).then(res => {
        if (res.data.code == 200) {
          this.$notify({
            type: "success",
            message: "删除成功！",
            position: "bottom-right",
            duration: 3000
          });
          this.queryData();
        } else if (res.data.code == 100) {
          this.$notify({
            type: "warning",
            message: "该角色下还有用户,不能删除",
            position: "bottom-right",
            duration: 3000
          });
        } else {
          this.$notify({
            type: "error",
            message: "删除失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/manage_third.css";
@import "../../assets/css/commom.css";
.jur {
  height: 2.64rem;
}
.el-dialog .jur .el-tree {
  width: 100%;
  height: 2.55rem;
  overflow: auto;
}
.partBar {
  color: #f56c6c;
  position: absolute;
  width: 100px;
  top: 0.28rem;
  left: 0.1rem;
}
</style>


