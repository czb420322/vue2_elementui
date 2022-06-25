<template>
  <div class="parent">
    <!-- <div class="topInfo">
            <p class="sysname" @click="gohome">系统管理</p>
            <p class="sysname childname">字典管理</p>
        </div> -->
    <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt="">
      <span class="sysname childname">当前位置：</span>
      <p class="sysname" @click="gohome">系统管理首页 > </p>
      <p class="sysname">&nbsp;字典管理</p>
    </div>
    <div class="dicManageWrappr">
      <div class="dicWrap">
        <div class="dic">
          <div class="item">
            <el-button class="addBtn elBtncomm" v-if="addItemBtn" icon="el-icon-plus" @click="addData">新增数据类型</el-button>
            <div class="searchInfo">
              <input placeholder="请输入您要查找的数据类型/描述" style="margin-top:0.1rem;margin-right:0.1rem" v-model.trim="keyword" @keyup.enter="queryData" @blur="queryData">
              <el-button @click="queryData" class="searchBtn" style="margin-top:0.1rem" icon="el-icon-search">查询</el-button>
            </div>
          </div>
          <div class="content table">
            <el-table ref="table1" :data="tableData" :row-class-name="tableRowClassName" @sort-change="getsort" max-height="600">
              <div slot="empty">
                <div class="noImg">
                  <img src="../../assets/updataImg/NoData.png" />
                </div>
              </div>
              <el-table-column type="index" align="center" width="60" label="编号">
              </el-table-column>
              <el-table-column prop="itemName" sortable="custom" align="center" show-overflow-tooltip label="数据类型名称">
              </el-table-column>
              <el-table-column prop="itemCode" align="center" show-overflow-tooltip label="代码">
              </el-table-column>
              <el-table-column prop="remark" sortable="custom" align="center" show-overflow-tooltip label="描述">
              </el-table-column>
              <el-table-column label="操作" align="center" width="300">
                <template slot-scope="scope">
                  <el-button size="mini" icon="el-icon-view" type="success" class="topBtn" @click="handleLook(scope.$index, scope.row)">查看</el-button>
                  <el-button size="mini" type="primary" class="searchBtn" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" v-if="editItemBtn">编辑</el-button>
                  <el-button size="mini" type="danger" class="delBtn" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)" v-if="deleteItemBtn">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pageWrapper">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="dic">
          <div class="item">
            <el-button class="addBtn elBtncomm" v-if="addValueBtn" icon="el-icon-plus" @click="addSubData">新增类型具体值</el-button>
          </div>
          <div class="content table">
            <el-table ref="table2" :data="tableSubData" @sort-change="getSubsort" max-height="600">
              <div slot="empty">
                <div class="noImg">
                  <img src="../../assets/updataImg/NoData.png" />
                </div>
              </div>
              <el-table-column type="index" align="center" width="60" label="编号">
              </el-table-column>
              <el-table-column prop="valueName" sortable="custom" align="center" show-overflow-tooltip label="类型值名称">
              </el-table-column>
              <el-table-column prop="itemCode" align="center" show-overflow-tooltip label="代码">
              </el-table-column>
              <el-table-column prop="valueCode" align="center" show-overflow-tooltip label="字典值编码">
              </el-table-column>
              <el-table-column prop="valueId" v-if="flag" align="center" label="id">
              </el-table-column>
              <el-table-column prop="remark" sortable="custom" align="center" show-overflow-tooltip label="描述">
              </el-table-column>
              <el-table-column label="操作" align="center" width="200" v-if="editValueBtn || deleteValueBtn">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" class="searchBtn" icon="el-icon-edit" @click="handleSubEdit(scope.$index, scope.row)" v-if="editValueBtn">编辑</el-button>
                  <el-button size="mini" type="danger" class="delBtn" icon="el-icon-delete" @click="handleSubDelete(scope.$index, scope.row)" v-if="deleteValueBtn">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pageWrapper">
              <el-pagination background @size-change="handleSubSizeChange" @current-change="handleSubCurrentChange" :current-page="currentSubPage" :page-sizes="[10, 20, 30]" :page-size="pageSubSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSubCount">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
      <footerSecond />
    </div>
    <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false" :title="dialogTitle" class="dialog" :close-on-click-modal="false"
      :close-on-press-escape="false" :before-close="resetForm" width="5.10rem">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="1.2rem" class="demo-ruleForm">
        <el-form-item label="数据类型名称" prop="itemName">
          <el-input v-model="ruleForm.itemName" placeholder="请输入数据类型名称"></el-input>
        </el-form-item>
        <el-form-item label="数据类型代码" prop="itemCode">
          <el-input v-model="ruleForm.itemCode" :readonly="formReadonly" placeholder="请输入数据类型代码"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark" :rows="3" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reset('ruleForm')"></el-button>
        <el-button @click="psubmit('ruleForm')"></el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="subdialogVisible" :modal-append-to-body="false" :title="dialogSubTitle" :close-on-click-modal="false"
      :close-on-press-escape="false" class="dialog" :before-close="resetSubForm" width="5.10rem">
      <el-form :model="subRuleForm" :rules="subRules" ref="subRuleForm" label-width="1.2rem" class="demo-ruleForm">
        <el-form-item label="数据具体名称" prop="valueName">
          <el-input v-model="subRuleForm.valueName" placeholder="请输入数据具体名称"></el-input>
        </el-form-item>
        <el-form-item label="数据类型代码" prop="itemCode">
          <el-input v-model="subRuleForm.itemCode" :readonly="formReadonly" placeholder="请输入数据类型代码"></el-input>
        </el-form-item>
        <el-form-item label="数据具体代码" prop="valueCode">
          <el-input v-model="subRuleForm.valueCode" placeholder="请输入数据具体代码"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input type="textarea" v-model="subRuleForm.remark" :rows="3" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reset('subRuleForm')"></el-button>
        <el-button @click="ssubmit('subRuleForm')"></el-button>
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
    let validateWord = (rule, value, callback) => {
      let reg = /^[A-Za-z0-9]+$/;
      if (!reg.test(value)) {
        callback(new Error("含有非法字符（只能输入字母和数字）！"));
      } else {
        callback();
      }
    };
    let validateTxt = (rule, value, callback) => {
      let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
      if (!reg.test(value)) {
        callback(new Error("含有非法字符（只能输入汉字、字母和数字）！"));
      } else {
        callback();
      }
    };
    return {
      addItemBtn: this.$storage.getSession("626") != null ? true : false,
      editItemBtn: this.$storage.getSession("627") != null ? true : false,
      deleteItemBtn: this.$storage.getSession("622") != null ? true : false,
      addValueBtn: this.$storage.getSession("631") != null ? true : false,
      editValueBtn: this.$storage.getSession("633") != null ? true : false,
      deleteValueBtn: this.$storage.getSession("632") != null ? true : false,
      flag: false,
      isParent: true,
      isEdit: true,
      ruleForm: {
        itemName: "",
        itemCode: "",
        remark: ""
      },
      subRuleForm: {
        valueName: "",
        valueCode: "",
        itemCode: "",
        valueId: "",
        remark: ""
      },
      row: {
        valueCode: "",
        valueId: "",
        valueName: ""
      },
      formReadonly: false,
      dialogTitle: "",
      dialogVisible: false,
      dialogSubTitle: "",
      subdialogVisible: false,
      styleIndex: 0,
      keyword: "",
      totalCount: 0,
      orderBy: "itemName",
      orderType: "asc",
      pageSize: 10,
      currentPage: 1,
      currentSubPage: 1,
      pageSubSize: 10,
      totalSubCount: 100,
      orderSubBy: "valueCode",
      orderSubType: "asc",
      itemCode: "",
      vuleId: "",
      tableSubData: [],
      tableData: [],
      rules: {
        itemName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          },
          { validator: validateTxt, trigger: "blur" }
        ],
        itemCode: [
          { required: true, message: "请输入代码", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          },
          { validator: validateWord, trigger: "blur" }
        ],
        remark: [
          { required: false, message: "请输入描述", trigger: "blur" },
          { min: 0, max: 255, message: "长度在255 个字符以内", trigger: "blur" }
          // { validator: validateTxt, trigger: 'blur' }
        ]
      },
      subRules: {
        itemCode: [
          { required: true, message: "请输入代码", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        valueName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          },
          { validator: validateTxt, trigger: "blur" }
        ],
        valueCode: [
          { required: true, message: "请输入代码", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          },
          { validator: validateWord, trigger: "blur" }
        ],
        remark: [
          { required: false, message: "请输入描述", trigger: "blur" },
          { min: 0, max: 255, message: "长度在255 个字符以内", trigger: "blur" }
          // { validator: validateTxt, trigger: 'blur' }
        ]
      }
    };
  },
  watch: {
    itemCode() {}
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
      if (_this.$refs["table2"]) {
        _this.$refs["table2"].doLayout();
      }
    });
  },
  methods: {
    // 第一行高亮
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex == this.styleIndex) {
        return "active-row";
      }
      return "";
    },
    // 监听表格排序
    getsort(obj) {
      this.orderBy = obj.prop;
      this.orderType = obj.order == "descending" ? "desc" : "asc";
      this.queryData();
    },
    getSubsort(obj) {
      this.orderSubBy = obj.prop;
      this.orderSubType = obj.order == "descending" ? "desc" : "asc";
      this.querySubData();
    },
    // 监听每页条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.styleIndex = 0;
      this.queryData();
    },
    handleSubSizeChange(val) {
      this.pageSubSize = val;
      this.currentSubPage = 1;
      this.querySubData();
    },
    // 监听当前页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.styleIndex = 0;
      this.queryData();
    },
    handleSubCurrentChange(val) {
      this.currentSubPage = val;
      this.querySubData();
    },
    // 查看
    handleLook(index, row) {
      this.styleIndex = index;
      this.itemCode = row.itemCode;
      this.querySubData();
    },
    // 编辑
    handleEdit(index, row) {
      this.dialogTitle = "编辑数据类型";
      this.dialogVisible = true;
      this.subdialogVisible = false;
      this.isParent = true;
      this.isEdit = true;
      this.itemCode = row.itemCode;
      this.ruleForm = {
        itemCode: row.itemCode,
        itemName: row.itemName,
        remark: row.remark
      };
      this.formReadonly = true;
    },
    // 删除
    handleDelete(index, row) {
      this.openMessageBox(this.deleteDictionaryItem, row.itemCode);
    },
    // 编辑
    handleSubEdit(index, row) {
      this.dialogSubTitle = "编辑数据具体值";
      this.subdialogVisible = true;
      this.isParent = false;
      this.isEdit = true;
      this.formReadonly = true;
      this.subRuleForm = {
        itemCode: row.itemCode,
        valueId: row.valueId,
        valueCode: row.valueCode,
        valueName: row.valueName,
        remark: row.remark
      };
      this.row = row;
    },
    // 删除
    handleSubDelete(index, row) {
      this.row = row;
      this.openMessageBox(this.deleteDictionaryValue, this.row.valueId);
    },
    // 提示弹框
    openMessageBox(callback, itemCode) {
      this.$myconfirm({
        type: "提示",
        msg: "此操作将永久删除, 是否继续?",
        icon: 2,
        btn: {
          ok:  "确定",
          no: "取消"
        }
      }).then(() => {
        callback && callback(itemCode);
      });
      // layer.open({
      //     content: '此操作将永久删除, 是否继续?'
      //     ,icon: 7
      //     ,btn: ['确定', '取消']
      //     ,yes: function(index, layero){
      //         //按钮【按钮一】的回调
      //         callback && callback(itemCode)
      //         layer.close(index);
      //     }
      //     ,btn2: function(index, layero){
      //         //按钮【按钮二】的回调
      //         //return false 开启该代码可禁止点击该按钮关闭
      //     }
      // });
    },
    resetForm(done) {
      this.ruleForm.ramark = "";
      this.ruleForm.itemName = "";
      this.ruleForm.itemCode = "";
      this.$refs["ruleForm"].resetFields();
      done();
    },
    resetSubForm(done) {
      this.subRuleForm.ramark = "";
      this.subRuleForm.valueName = "";
      this.subRuleForm.valueCode = "";
      this.subRuleForm.valueId = "";
      this.subRuleForm.itemCode = "";
      this.$refs["subRuleForm"].resetFields();
      done();
    },
    // 请求字典列表数据
    queryData() {
      let data = {
        keyword: this.keyword,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        orderBy: this.orderBy,
        orderType: this.orderType
      };
      let _this = this;
      data = _this.$qs.stringify(data); //post请求分离data
      _this.$http.post("/sms/dictionary/listDictionaryItem", data).then(res => {
        if (res.data.code == 200) {
          if (res.data.data.list.length > 0) {
            this.tableData = res.data.data.list;
            this.totalCount = res.data.data.totalCount;
            this.itemCode = res.data.data.list[0].itemCode;
            this.styleIndex = 0;

            this.querySubData();
          } else {
            this.tableData = [];
            this.tableSubData = [];
            this.totalCount = 0;
            this.totalSubCount = 0;
          }
        }
      });
    },
    querySubData() {
      let data = {
        itemCode: this.itemCode,
        pageNum: this.currentSubPage,
        pageSize: this.pageSubSize,
        orderBy: this.orderSubBy,
        orderType: this.orderSubType
      };
      data = this.$qs.stringify(data); //post请求分离data
      this.$http.post("/sms/dictionary/listDictionaryValue", data).then(res => {
        if (res.data.code == 200) {
          if (res.data.data.list.length > 0) {
            this.tableSubData = res.data.data.list;
            this.totalSubCount = res.data.data.totalCount;
          } else {
            this.tableSubData = [];
            this.totalSubCount = 0;
          }
        }
      });
    },
    // 去管理菜单页
    gohome() {
      this.$router.push({ path: "/manage", query: { menuCode: "600" } });
    },
    // dialong 提交
    psubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.chooseapi(this.isParent, this.isEdit);
          // let _this = this;
          // layer.open({
          //     type: 0,
          //     icon:6,
          //     content: '添加成功！',
          //     title:"消息提示",
          //     yes:function(index){
          //         _this.chooseapi(this.isParent, this.isEdit);
          //         layer.close(index);
          //     }
          // });
        }
      });
    },
    ssubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.chooseapi(this.isParent, this.isEdit);
        }
      });
    },
    // dialong 重置
    reset(formName) {
      this.$refs[formName].resetFields();
      if (!this.isParent) {
        this.ruleForm.itemCode = this.itemCode;
        this.subdialogVisible = false;
      } else {
        this.dialogVisible = false;
      }
    },
    // 父页面新增按钮
    addData() {
      this.ruleForm = {
        itemCode: "",
        itemName: "",
        remark: ""
      };
      this.dialogTitle = "新增数据类型";
      this.dialogVisible = true;
      this.isParent = true;
      this.isEdit = false;
      this.formReadonly = false;
    },
    // 子页面新增按钮
    addSubData() {
      console.log(this.itemCode);
      this.subRuleForm = {
        itemCode: this.itemCode,
        valueName: "",
        valueCode: "",
        valueId: "",
        remark: ""
      };
      this.dialogVisible = false;
      this.dialogSubTitle = "新增数据具体值";
      this.subdialogVisible = true;
      this.isParent = false;
      this.isEdit = false;
      this.formReadonly = true;
    },

    // 区分主表和次表，编辑和新增
    chooseapi(isParent, isEdit) {
      if (isParent) {
        if (isEdit) {
          this.updateDictionaryItem();
        } else {
          this.insertDictionaryItem();
        }
      } else {
        if (isEdit) {
          this.updateDictionaryValue();
        } else {
          this.insertDictionaryValue();
        }
      }
    },
    // 新增字典项
    insertDictionaryItem() {
      let data = this.$qs.stringify(this.ruleForm); //post请求分离data
      this.$http
        .post("/sms/dictionary/insertDictionaryItem", data)
        .then(res => {
          if (res.data.code == 200) {
            this.dialogVisible = false;
            this.queryData();
            this.$notify({
              type: "success",
              message: "添加成功！",
              position: "bottom-right",
              duration: 3000
            });
            //  this.$myconfirm({
            //     type: '提示',
            //     msg: '添加成功！',
            //     icon:3,
            //     btn: {
            //       ok: '确定',
            //       no: '取消'
            //     }
            //   })
          } else {
            this.$notify({
              type: "error",
              message: "添加失败！",
              position: "bottom-right",
              duration: 3000
            });
            // this.$myconfirm({
            //       type: '提示',
            //       msg: '添加失败！',
            //       icon:1,
            //       btn: {
            //         ok: '确定',
            //         no: '取消'
            //       }
            //     })
            // layer.open({
            //     type: 0,
            //     icon:5,
            //     content: '添加失败！',
            //     title:"消息提示",
            //     yes:function(index){
            //         layer.close(index);
            //     }
            // });
            return false;
          }
        });
    },
    // 修改字典项
    updateDictionaryItem() {
      let data = {
        _method: "put",
        itemName: this.ruleForm.itemName,
        itemCode: this.ruleForm.itemCode,
        remark: this.ruleForm.remark
      };

      data = this.$qs.stringify(data); //post请求分离data
      this.$http
        .post("/sms/dictionary/updateDictionaryItem", data)
        .then(res => {
          if (res.data.code == 200) {
            this.dialogVisible = false;
            this.queryData();
            this.$notify({
              type: "success",
              message: "修改成功！",
              position: "bottom-right",
              duration: 3000
            });
            // this.$myconfirm({
            //     type: '提示',
            //     msg: '修改成功！',
            //     icon:3,
            //     btn: {
            //       ok: '确定',
            //       no: '取消'
            //     }
            //   }).then(()=>{
            //     this.dialogVisible = false
            //     this.queryData()
            //   })

            // let _this=this;
            // layer.open({
            //     type: 0,
            //     icon:6,
            //     content: '修改成功！',
            //     title:"消息提示",
            //     yes:function(index){
            //         layer.close(index);
            //         _this.dialogVisible = false;
            //         _this.queryData();
            //     }
            // });
          } else {
            this.$notify({
              type: "error",
              message: "修改失败！",
              position: "bottom-right",
              duration: 3000
            });
            //  this.$myconfirm({
            //       type: '提示',
            //       msg: '修改失败！',
            //       icon:1,
            //       btn: {
            //         ok: '确定',
            //         no: '取消'
            //       }
            //     }).then(()=>{
            //     })
            // layer.open({
            //     type: 0,
            //     icon:5,
            //     content: '修改失败！',
            //     title:"消息提示",
            //     yes:function(index){
            //         layer.close(index);
            //     }
            // });
            return false;
          }
        });
    },
    // 删除字典项
    deleteDictionaryItem(itemCode) {
      let data = { itemCode: itemCode };
      data = this.$qs.stringify(data); //post请求分离data
      this.$http
        .post("/sms/dictionary/deleteDictionaryItem", data)
        .then(res => {
          if (res.data && res.data.code == 200) {
            this.queryData();
            this.$notify({
              type: "success",
              message: "删除成功！",
              position: "bottom-right",
              duration: 3000
            });
            // this.$myconfirm({
            //     type: '提示',
            //     msg: '删除成功！',
            //     icon:3,
            //     btn: {
            //       ok: '确定',
            //       no: '取消'
            //     }
            //   }).then(()=>{
            //   })

            // layer.open({
            // type: 0,
            // icon:6,
            // content: '删除成功！',
            // title:"消息提示",
            // yes:function(index){
            //     layer.close(index);
            // }
            // });
          } else if (res.data.code == 100) {
            this.$notify({
              type: "warning",
              message: "该数据类型中有类型具体值，无法删除!",
              position: "bottom-right",
              duration: 3000
            });
            // this.$myconfirm({
            //       type: '提示',
            //       msg: '该数据类型中有类型具体值，无法删除!',
            //       icon:1,
            //       btn: {
            //         ok: '确定',
            //         no: '取消'
            //       }
            //     })
          } else {
            this.$notify({
              type: "error",
              message: "删除失败！",
              position: "bottom-right",
              duration: 3000
            });
            // this.$myconfirm({
            //       type: '提示',
            //       msg: '删除失败！',
            //       icon:1,
            //       btn: {
            //         ok: '确定',
            //         no: '取消'
            //       }
            //     })
          }
        });
    },
    // 新增字典值
    insertDictionaryValue() {
      let data = {
        itemCode: this.itemCode,
        valueCode: this.subRuleForm.valueCode,
        valueName: this.subRuleForm.valueName,
        remark: this.subRuleForm.remark
      };

      data = this.$qs.stringify(data); //post请求分离data
      this.$http
        .post("/sms/dictionary/insertDictionaryValue", data)
        .then(res => {
          if (res.data && res.data.code == 200) {
            this.subdialogVisible = false;
            this.querySubData();
            this.$notify({
              type: "success",
              message: "添加成功！",
              position: "bottom-right",
              duration: 3000
            });
            // let _this=this;
            // layer.open({
            // type: 0,
            // icon:6,
            // content: '添加成功！',
            // title:"消息提示",
            // yes:function(index){
            //     layer.close(index);
            //     _this.subdialogVisible = false;
            //     _this.querySubData();
            // }
            // });
          } else {
            this.$notify({
              type: "error",
              message: "添加失败！",
              position: "bottom-right",
              duration: 3000
            });
            // layer.open({
            //   type: 0,
            //   icon:5,
            //   content: '添加失败！',
            //   title:"消息提示",
            //   yes:function(index){
            //       layer.close(index);
            //   }
            //   });
            return false;
          }
        });
    },
    // 删除字典值
    deleteDictionaryValue(id) {
      let data = {
        valueId: id
      };
      data = this.$qs.stringify(data); //post请求分离data
      this.$http
        .post("/sms/dictionary/deleteDictionaryValue", data)
        .then(res => {
          if (res.data && res.data.code == 200) {
            // this.row = {
            //     valueCode: "",
            //     valueId: "",
            //     valueName: ""
            // };

            this.querySubData();
            this.$notify({
              type: "success",
              message: "删除成功！",
              position: "bottom-right",
              duration: 3000
            });
            // layer.open({
            // type: 0,
            // icon:6,
            // content: '删除成功！',
            // title:"消息提示",
            // yes:function(index){
            //     layer.close(index);
            // }
            // });
          } else {
            this.$notify({
              type: "error",
              message: "删除失败！",
              position: "bottom-right",
              duration: 3000
            });
            // layer.open({
            //   type: 0,
            //   icon:5,
            //   content: '删除失败！',
            //   title:"消息提示",
            //   yes:function(index){
            //       layer.close(index);
            //   }
            //   });
            return false;
          }
        });
    },
    // 修改字典值
    updateDictionaryValue() {
      let data = {
        _method: "put",
        valueId: this.row.valueId,
        itemCode: this.subRuleForm.itemCode,
        valueCode: this.subRuleForm.valueCode,
        valueName: this.subRuleForm.valueName,
        remark: this.subRuleForm.remark
      };

      data = this.$qs.stringify(data); //post请求分离data
      this.$http
        .post("/sms/dictionary/updateDictionaryValue", data)
        .then(res => {
          if (res.data && res.data.code == 200) {
            // this.row = {
            //     valueCode: "",
            //     valueId: "",
            //     valueName: ""
            // };
            this.subdialogVisible = false;
            this.querySubData();
            this.$notify({
              type: "success",
              message: "修改成功！",
              position: "bottom-right",
              duration: 3000
            });

            // layer.open({
            // type: 0,
            // icon:6,
            // content: '修改成功！',
            // title:"消息提示",
            // yes:function(index){
            //     layer.close(index);
            // }
            // });
          } else {
            this.$notify({
              type: "error",
              message: "修改失败！",
              position: "bottom-right",
              duration: 3000
            });
            // layer.open({
            // type: 0,
            // icon:5,
            // content: '修改失败！',
            // title:"消息提示",
            // yes:function(index){
            //     layer.close(index);
            // }
            // });
            return false;
          }
        });
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/manage_third.css";
@import "../../assets/css/commom.css";
/* .table .el-table >>> .el-table__body .active-row td{
    background:#e0eefb;
  } */
.dicManageWrappr {
  height: 97%;
}
.elBtncomm {
  color: #99c9fa;
}
</style>
