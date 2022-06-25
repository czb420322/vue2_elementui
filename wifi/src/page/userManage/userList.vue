<!--
 * @Author: chenxf
 * @Date: 2020-05-17 16:47:06
 * @LastEditTime : 2021-08-04 15:16:01
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\page\userManage\userList.vue
 * @
 -->
<template>
  <div class="dicManageWrappr userList">
    <div class="modelPartTitle">
      <div class="titleLine"></div>
      <div class="titleTxt">用户列表</div>
    </div>
    <div class="additem">
      <!-- <el-button  class="addBtn" v-if="addBtn" icon="el-icon-plus" @click="addData">新增用户</el-button> -->
      <div v-if="addBtn" @click="addData" class="el-icon-plus commBtn addBtn">新增用户</div>
      <div class="searchInfo">
        <input placeholder="请输入账号/姓名/电话号码" v-model.trim="keyword" @keyup.enter="queryData">&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button @click="queryData" class="searchBtn" icon="el-icon-search">查询</el-button>
      </div>
    </div>
    <div class="content">
      <div class="table">
        <el-table   ref="table1"   :data="tableData"   @sort-change="getsort"   height="5.2rem"   style="width:100%" >
          <div slot="empty">
            <div class="noImg">
              <img src="../../assets/updataImg/NoData.png">
            </div>
          </div>
          <el-table-column type="index" align="center" width="60" label="编号"></el-table-column>
          <el-table-column
            prop="userName"
            sortable="custom"
            align="center"
            show-overflow-tooltip
            label="用户账号"
          ></el-table-column>
          <el-table-column
            prop="trueName"
            sortable="custom"
            align="center"
            show-overflow-tooltip
            label="真实姓名"
          ></el-table-column>
          <el-table-column
            prop="phone"
            align="center"
            show-overflow-tooltip
            sortable="custom"
            label="电话号码"
          ></el-table-column>
          <el-table-column
            prop="orgName"
            align="center"
            show-overflow-tooltip
            sortable="custom"
            label="组织部门"
          ></el-table-column>
          <el-table-column
            prop="status"
            align="center"
            sortable="custom"
            :formatter="formatStatus"
            label="状态"
          ></el-table-column>
          <el-table-column
            prop="userSource"
            align="center"
            sortable="custom"
            :formatter="formatUserSource"
            label="用户来源"
          ></el-table-column>
          <el-table-column
            prop="approvalStatus"
            align="center"
            sortable="custom"
            :formatter="formatApprovalStatus"
            label="审批状态"
          ></el-table-column>
          <el-table-column prop="roleId" v-if="flag" align="center" label="id"></el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="450"
            v-if="editBtn || statuBtn || resetPwdBtn"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                class="searchBtn"
                v-if="editBtn"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
              >修改</el-button>
              <el-button
                size="mini"
                type="info"
                class="beginBtn"
                icon="el-icon-info"
                @click="handleStatus(scope.$index, scope.row, $event)"
                v-show="scope.row.status && statuBtn"
              >{{scope.row.status | formatChangeStatus}}</el-button>
              <el-button
                size="mini"
                type="success"
                class="topBtn"
                icon="el-icon-success"
                @click="handleStatus(scope.$index, scope.row, $event)"
                v-show="!scope.row.status && statuBtn"
              >{{scope.row.status | formatChangeStatus}}</el-button>
              <el-button
                size="mini"
                type="warning"
                class="tryBtn"
                title="点击后密码将会重置为登陆用户名"
                v-if="resetPwdBtn"
                icon="el-icon-edit"
                @click="resetPwd(scope.$index, scope.row)"
              >重置密码</el-button>
              <el-button
                size="mini"
                class="delBtn"
                type="danger"
                icon="el-icon-circle-close-outline"
                :disabled="scope.row.userName == $storage.getSession('userInfo').userName"
                @click="force(scope.$index, scope.row)"
              >强制下线</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pageWrapper">
          <el-pagination
            @size-change="handleSizeChange"
            background
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[15, 30, 45]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </div>
      </div>
    </div>


    <!-- 新增用户的弹窗 -->
    <el-dialog
      class="dialog"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :title="dialogTitle"
      :before-close="resetForm"
      width="10.40rem" >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="1rem"
        class="demo-ruleForm"
      >
        <div class="sTitle">
          <span>|</span>添加用户信息
        </div>
        <div class="scont">
          <el-form-item label="用户账号：" prop="userName" title="建议以警号编码作为用户账号">
            <el-input
              v-model.trim="ruleForm.userName"
              :disabled="isEdit"
              minlength="0"
              maxlength="25"
              placeholder="请输入用户账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="真实姓名：" prop="trueName" title="请输入真实姓名">
            <el-input v-model.trim="ruleForm.trueName" maxlength="20" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="电话号码：" prop="phone">
            <el-input
              ref="phone"
              v-model.trim="ruleForm.phone"
              minlength="11"
              maxlength="11"
              placeholder="请输入电话号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="idCard">
            <el-input
              ref="idCard"
              v-model.trim="ruleForm.idCard"
              minlength="18"
              maxlength="18"
              placeholder="请输入身份证号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户状态：" prop="status" class="status">
            <el-select class="infoStatus" v-model.trim="ruleForm.status">
              <el-option label="启用" :value="0">启用</el-option>
              <el-option label="禁用" :value="1">禁用</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="组织部门：" prop="orgId">
            <el-popover placement="bottom-start" trigger="click" @show="showDefault">
              <div class="treeWrap">
                <el-tree
                  :data="treeData"
                  class="ccccc"
                  :props="orgProps"
                  @check="handleClick"
                  show-checkbox
                  ref="treeForm"
                  check-strictly
                  default-expand-all
                  node-key="orgId"
                ></el-tree>
              </div>
              <el-input
                slot="reference"
                readonly
                v-model.trim="ruleForm.orgName"
                placeholder="请输入机构名称"
              ></el-input>
              <input v-model.trim="ruleForm.orgId" readonly type="hidden">
            </el-popover>
          </el-form-item>
          <el-form-item v-if="registerUser" label="审批状态：" prop="approvalStatus" class="status">
            <el-select v-model.trim="ruleForm.approvalStatus">
              <el-option label="未审批" :value="0">未审批</el-option>
              <el-option label="审批通过" :value="1">审批通过</el-option>
              <el-option label="审批被拒绝" :value="2">审批被拒绝</el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="photo">
          <span>照片采集：</span>
          <el-upload
            class="avatar-uploader"
            action="sys/uploadFile/upload"
            name="files"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="hasPhoto" :src="ruleForm.photoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip" v-show="!errTip.flag">只能上传jpg/jpeg/png文件，且不超过2M</div>
          </el-upload>
          <div class="errTip" v-show="errTip.flag">{{errTip.txt}}</div>
        </div>

        <div class="sTitle" v-show="false">
          <span>|</span>用户权限设置
        </div>
        <el-form-item v-show="false" label="分配角色：" prop="roleList" class="roles">
          <el-checkbox-group v-model.trim="ruleForm.roleList">
            <el-checkbox
              v-for="item in checkList"
              :key="item.roleId"
              :label="item.roleId"
            >{{item.roleName}}</el-checkbox>
          </el-checkbox-group>
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
import md5 from "js-md5";
export default {
  data() {
    let validatePhone = (rule, value, callback) => {
      //let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      let reg = /^(1)\d{10}$/;
      if (!reg.test(value)) {
        callback(new Error("请正确输入手机号码"));
      } else {
        callback();
      }
    };
    let validateIdCard = (rule, value, callback) => {
      //let reg =
      let reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
      if (!reg.test(value)) {
        callback(new Error("请正确输入身份证号"));
      } else {
        callback();
      }
    };
    let validateIds = (rule, value, callback) => {
    // console.log(rule,11);
    // console.log(value,22);
    //  let reg = /^[a-zA-Z]{1}([a-zA-Z0-9])(0,24)$/;
    // let reg = /^[\u4e00-\u9fa5][a-zA-Z0-9-_$]{0,24} +$/;
       let reg  = /^[a-zA-Z0-9-_$]{0,24}$/;
      if (!reg.test(value)) {
        callback(new Error("用户名不能为中文字符"));
      } else {
        callback();
      }
    };
    let validateNumber = (rule, value, callback) => {
      // console.log(rule,7777);
      let data = {
        phone: value,
        userId: this.userInfo.userId
      };
      this.$http
        .get("/sms/static/checkPhone", { params: data })
        .then(response => {
          console.log(response, "手机号返回数据");
          //接口返回数据
          if (response.data.code != 200) {
            callback(new Error("手机号已存在"));
          } else {
            callback();
          }
        });
    };
    let validateIdUser = (rule, value, callback) => {
      if (this.isEdit == false) {
        this.$http
          .get("/sms/static/checkUserName?userName=" + value)
          .then(response => {
            //接口返回数据
            if (response.data.code != 200) {
              callback(new Error("用户名已存在"));
            } else {
              callback();
            }
          });
      } else {
        callback();
      }
    };
    return {
      addBtn: this.$storage.getSession("620") != null ? true : false,
      editBtn: this.$storage.getSession("618") != null ? true : false,
      statuBtn: this.$storage.getSession("619") != null ? true : false,
      resetPwdBtn: this.$storage.getSession("628") != null ? true : false,
      isEdit: false,
      treeData: [],
      defaultOrg: "",
      selectOrg: [],
      orgProps: {
        children: "children",
        isLeaf: "leaf",
        label: "orgName"
      },
      hasPhoto: false,
      errTip: {
        flag: false,
        txt: ""
      },
      registerUser: false,
      uploadloading: null,
      userId: "",
      ruleForm: {
        photoUrl: null,
        userName: null,
        trueName: null,
        phone: null,
        orgId: null,
        orgCode: null,
        orgName: null,
        idCard: null,
        status: null,
        roleList: [],
        approvalStatus: null,
        roles: null //存放id
      },
      userInfo: {},
      checkList: [],
      flag: false,
      dialogTitle: "",
      dialogVisible: false,
      keyword: "",
      totalCount: 0,
      orderBy: "creatorTime",
      orderType: "desc",
      pageSize: 15,
      currentPage: 1,
      tableData: [],
      defaultProps: {
        children: "child",
        label: "menuName"
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 25, message: "长度小于25 个字符", trigger: "blur" },
        //   { validator: validateIdUser, trigger: "blur" },
          { validator: validateIds, trigger: "blur" }
        ],
        trueName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          // { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' },
          { validator: validatePhone, trigger: "blur" },
          { validator: validateNumber, trigger: "blur" }
        ],
        idCard: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          // { min: 18, max: 18, message: '长度为18个字符', trigger: 'blur' },
          { validator: validateIdCard, trigger: "blur" }
        ],
        orgId: [
          { required: true, message: "请选择部门组织", trigger: "change" }
        ],
        status: [
          { required: true, message: "请选择启用或禁用", trigger: "change" }
        ],
        roleList: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个角色",
            trigger: "change"
          }
        ],
        approvalStatus: [
          { required: true, message: "请选择审批状态", trigger: "change" }
        ]
      }
    };
  },
  filters: {
    formatChangeStatus(val) {
      return val == 1 ? "启用" : "禁用";
    }
  },
  created() {
    this.queryData(); //初始化用户列表
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
    handleClick(data, checked) {
      this.$refs.treeForm.setCheckedNodes([]);
      this.$refs.treeForm.setCheckedNodes([data]);
      this.ruleForm.orgName = data.orgName;
      this.ruleForm.orgCode = data.orgCode;
      this.ruleForm.orgId = data.orgId;
    },
    showDefault() {
      if (!this.$refs["treeForm"]) {
        this.$nextTick(function() {
          this.$refs["treeForm"].setCheckedKeys([this.ruleForm.orgId]);
        });
      } else {
        this.$refs["treeForm"].setCheckedKeys([this.ruleForm.orgId]);
      }
    },
    beforeAvatarUpload(file) {
      if (
        (file.type == "image/jpeg" ||
          file.type == "image/jpg" ||
          file.type == "image/png") &&
        file.size / 1024 / 1024 < 2
      ) {
        this.errTip.flag = false;
        let formData = new FormData();
        formData.append("files", file);
        formData.append("description", "");
        let _this = this;
        this.$http({
          url: "/sms/uploadFile/upload",
          method: "post",
          data: formData,
          onUploadProgress: function(progressEvent) {
            if (progressEvent.loaded != progressEvent.total) {
              if (!_this.uploadloading) {
                _this.uploadloading = _this.$loading({
                  text: "正在上传...",
                  spinner: "el-icon-loading",
                  target: "#imgBox"
                });
              }
            }
          }
        }).then(res => {
          if (_this.uploadloading) {
            _this.uploadloading.close();
          }
          if (res.data.code == 200) {
            this.ruleForm.photoUrl = res.data.data[0];
            this.hasPhoto = true;
            this.$notify({
              type: "success",
              message: "上传成功！",
              position: "bottom-right",
              duration: 3000
            });
          } else {
            this.$notify({
              type: "error",
              message: "上传失败！",
              position: "bottom-right",
              duration: 3000
            });
          }
        });
      } else {
        this.$notify({
          type: "warning",
          message: "只能上传jpg/jpeg/png文件，且不超过2M",
          position: "bottom-right",
          duration: 3000
        });
        // layer.alert('只能上传jpg/jpeg/png格式图片，且不超过2M！',{icon:5,title:"消息提示"});
        // this.$myconfirm({
        //   type: "提示",
        //   msg: "只能上传jpg/png文件，且不超过2M",
        //   icon: 4,
        //   btn: {
        //     ok:  "确定"
        //   }
        // });
        this.errTip.txt = "只能上传jpg/jpeg/png文件，且不超过2M";
        this.errTip.flag = true;
        return false;
      }
      return false;
    },
    formatStatus(row, column) {
      return row.status == 1 ? "禁用" : "启用";
    },
    formatApprovalStatus(row, column) {
      if (!row.approvalStatus) {
        return "未审批";
      } else if (row.approvalStatus === 1) {
        return "审批通过";
      } else if (row.approvalStatus === 2) {
        return "审批被拒绝";
      }
    },
    formatUserSource(row, column) {
      if (row.userSource === 1) {
        return "管理员新增";
      } else if (row.userSource === 2) {
        return "用户注册";
      }
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
      // console.log(row,99);
      this.getListOrg();
      this.userInfo = row;
      this.dialogTitle = "修改信息";
      this.dialogVisible = true;
      this.isEdit = true;
      this.ruleForm.userName = row.userName;
      this.ruleForm.trueName = row.trueName;
      this.ruleForm.phone = row.phone;
      this.ruleForm.idCard = row.idCard;
      this.ruleForm.orgId = row.orgId ? row.orgId : this.defaultOrg;
      this.ruleForm.orgCode = row.orgCode;
      this.ruleForm.orgName = row.orgName;
      this.ruleForm.status = row.status;
      this.ruleForm.password = row.password;
      this.ruleForm.photoUrl = row.photoUrl;
      this.hasPhoto = !!row.photoUrl;
      this.userId = row.userId;
      this.registerUser = row.userSource == 2 ? true : false;
      this.ruleForm.approvalStatus = row.approvalStatus;
      this.getUserInfo(row.userId);
    },
    // 改变状态
    handleStatus(index, row, event) {
      this.$http.post("/sms/usercore/updataStatus/" + row.userId).then(res => {
        if (res.data.code === 200) {
          row.status = row.status ? 0 : 1;
        } else {
          this.$notify({
            type: "error",
            message: "更改状态失败！",
            position: "bottom-right",
            duration: 3000
          });
        }
      });
    },
    //重置密码
    resetPwd(index, row) {
      let pwd = row.userName;
      let _this = this;
      this.$myconfirm({
        type: "提示",
        msg: "请确认是否重置该用户的密码",
        icon: 2,
        btn: {
          ok: "确定",
          no: "取消"
        }
      }).then(() => {
        let param = {
          userId: row.userId,
          pwd: md5.hex(pwd)
        };
        let data = this.$qs.stringify(param);
        this.$http.post("/sms/usercore/resetUserPwd", data).then(res => {
          if (res.data.code === 200) {
            this.$notify({
              type: "success",
              message: "重置密码成功，新密码为：" + pwd,
              position: "bottom-right",
              duration: 3000
            });
          } else {
            this.$notify({
              type: "error",
              message: "重置密码失败！",
              position: "bottom-right",
              duration: 3000
            });
          }
        });
      });
    },
    //强制下线
    force(index, row) {
      let userName = this.$storage.getSession("userInfo").userName;
      if (userName == row.userName) {
        return;
      }
      let _this = this;

      this.$myconfirm({
        type: "提示",
        msg: "是否强制下线该用户",
        icon: 2,
        btn: {
          ok: "确定",
          no: "取消"
        }
      })
        .then(() => {
          let data = {
            tUserName: row.userName
          };
          data = this.$qs.stringify(data);
          this.$http.post("/sms/usercore/off-line", data).then(res => {
            if (res.data.code == 200) {
              this.$notify({
                type: "success",
                message: "下线成功！",
                position: "bottom-right",
                duration: 3000
              });
            } else {
              this.$notify({
                type: "error",
                message: "下线失败",
                position: "bottom-right",
                duration: 3000
              });
            }
          });
        })
        .catch(() => {});
    },
    // 请求列表数据
    queryData() {
      let that = this;
      let data = {
        approvalStatus:1,
        keyword: this.keyword,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        orderBy: this.orderBy,
        orderType: this.orderType
      };

      data = that.$qs.stringify(data); //post请求分离data
      that.$http.post("/sms/usercore/list", data).then(res => {
        if (res.data.code === 200) {
          if (res.data.data.list.length > 0) {
            this.tableData = res.data.data.list;
            console.log(this.tableData)
            this.totalCount = res.data.data.totalCount;
            console.log(this.totalCount)
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
      let that = this;
      that.$http.post("/sms/role/getAll").then(res => {
        if (res.data.code === 200) {
          this.checkList = res.data.data;
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
          this.defaultOrg = res.data.data[0].orgId;
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
    // 新增用户
    addUser() {
      let userName = this.ruleForm.userName;
      this.ruleForm.roles = this.ruleForm.roleList.join(",");
      this.ruleForm.password = md5.hex(userName);
      let data = this.$qs.stringify(this.ruleForm); //post请求分离data
      this.$http.post("/sms/usercore/addUserRole", data).then(res => {
        if (res.data.code === 200) {
          this.$notify({
            type: "success",
            message: "添加成功！新密码为：" + userName,
            position: "bottom-right",
            duration: 3000
          });
          this.queryData();
          this.$refs.ruleForm.resetFields();
        } else if (res.data.code == 100) {
          this.$notify({
            type: "warning",
            message: "用户名重复！",
            position: "bottom-right",
            duration: 3000
          });
          return false;
        } else {
          this.$notify({
            type: "error",
            message: "新增失败！",
            position: "bottom-right",
            duration: 3000
          });
          return false;
        }
      });
    },
    // 修改信息
    editUser() {
      this.ruleForm.roles = this.ruleForm.roleList.join(",");
      //this.ruleForm.password = md5.hex("Aa@123");
      let data = Object.assign(this.ruleForm, { userId: this.userId });
      data = this.$qs.stringify(data); //post请求分离data
      this.$http.post("/sms/usercore/updateByManage", data).then(res => {
        if (res.data && res.data.code == 200) {
          // console.log(this.$storage.getSession('userInfo').userId,111111)
          // console.log(res.data.data,33333);
          if (
            this.$storage.getSession("userInfo").userId == res.data.data.userId
          ) {
            this.$storage.setSession("userInfo", res.data.data);
          }

          // this.$storage.setSession("userInfo",res.data.data);
          //修改成功刷新用户列表
          this.$notify({
            type: "success",
            message: "修改成功！",
            position: "bottom-right",
            duration: 3000
          });
          this.queryData();
        } else {
          this.$notify({
            type: "error",
            message: "修改失败！",
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
      this.registerUser = false;
      this.ruleForm.userName = "";
      this.ruleForm.trueName = "";
      this.ruleForm.phone = "";
      this.ruleForm.idCard = "";
      this.ruleForm.orgId = "";
      this.ruleForm.orgCode = "";
      this.ruleForm.orgName = "";
      this.ruleForm.status = "";
      this.ruleForm.approvalStatus = null;
      if (!this.$refs["treeForm"]) {
        this.$nextTick(function() {
          this.$refs["treeForm"].setCheckedKeys([]);
        });
      } else {
        this.$refs["treeForm"].setCheckedKeys([]);
      }
      this.$refs["ruleForm"].resetFields();
      done();
    },
    // dialong 提交
    submit(formName) {
      // console.log(formName,"kkkkkkkkkkkkkkkkkkkkkkk");
      this.$refs[formName].validate(valid => {
        if (valid && this.ruleForm.roleList.length) {
          this.dialogVisible = false;
          if (this.isEdit) {
            this.editUser();
          } else {
            this.addUser();
          }
        }
      });
    },
    // dialog 重置
    reset(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    // 新增按钮
    addData() {
      this.dialogTitle = "新增用户";
      this.isEdit = false;
      this.dialogVisible = true;
      this.hasPhoto = false;
      //this.i = 0;
      this.ruleForm.userName = "";
      this.ruleForm.trueName = "";
      this.ruleForm.phone = "";
      this.ruleForm.idCard = "";
      this.ruleForm.orgId = "";
      this.ruleForm.orgCode = "";
      this.ruleForm.orgName = "";
      this.ruleForm.status = "";
      this.ruleForm.approvalStatus = "";
      this.ruleForm.photoUrl = "";
      this.getListOrg();
      //this.$refs['ruleForm'].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/manage_third.css";
@import "../../assets/css/commom.css";
.userList {
  width: 97%;
  height: 6.3rem;
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
.demo-ruleForm /deep/ .el-form-item__label,
.demo-ruleForm /deep/ .el-form-item__content {
  font-size: 0.14rem;
  line-height: 0.32rem;
  color: #99c9fa;
}
.el-checkbox-group /deep/ .el-checkbox__label {
  color: #99c9fa;
}
.modelPartTitle {
  width: 100%;
  height: 0.35rem;
  display: flex;
}
.el-checkbox-group /deep/ .el-checkbox__inner {
  background: transparent;
  border: 1px solid #409eff;
}
.el-checkbox-group /deep/ .el-checkbox__input {
  line-height: 0.5;
}
.el-checkbox-group /deep/ .el-checkbox__input.is-checked {
  background-color: #409eff;
  border-radius: 2px;
}
.photo,
.el-upload__tip {
  color: #99c9fa;
}
.infoStatus {
  width: 2.5rem;
}
.demo-ruleForm .scont {
  padding-left: 0.3rem;
  display: flex;
  flex-wrap: wrap;
}
.titleTxt {
  color: #fff;
  font-size: 0.16rem;
}
.demo-ruleForm .el-form-item {
  width: 3.5rem;
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
}
.photo .errTip {
  font-size: 12px;
  color: #f56c6c;
}

.avatar-uploader /deep/ .el-upload {
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
.avatar-uploader .el-upload__tip {
  margin-top: 0;
}
.el-checkbox {
  float: left;
  width: 2.24rem;
  margin-right: 0;
}
.el-checkbox + .el-checkbox {
  margin: 0;
}
.titleLine {
  width: 2px;
  height: 0.14rem;
  background-color: #fff;
  margin-right: 0.1rem;
  margin-top: 4px;
}
.el-dialog .demo-ruleForm .jur {
  width: 100%;
  height: 1.54rem;
}
.el-dialog .jur .el-tree {
  width: 100%;
  height: 1.54rem;
  overflow-y: auto;
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: rgba(49, 86, 131, 0.2);
}
.dicManageWrappr {
  padding: 0;
}
.photo /deep/ .el-upload {
  border: 1px dashed #99c9fa;
}
.el-upload /deep/ .avatar-uploader-icon {
  color: #99c9fa;
}
.ccccc {
  width: 2.2rem;
}
.additem {
  width: 100%;
  height: 0.64rem;
  margin-bottom: 0.1rem;
}
.additem .addBtn {
  margin-top: 0.15rem;
  float: left;
}
.additem .el-button {
  font-size: 0.14rem;
}
.additem .el-form-item >>> .el-form-item__label {
  font-size: 0.14rem;
}
.additem .el-form-item .el-button {
  padding: 0.1rem 0.2rem;
}

</style>


