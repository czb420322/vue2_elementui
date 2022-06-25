<!--
 * @Author: your name
 * @Date: 2020-05-14 10:45:10
 * @LastEditTime : 2021-01-06 14:25:10
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\page\departmentManage\departmentManage.vue
 -->
<template>
    <div class="parent">
        <!-- <div class="topInfo">
            <p class="sysname" @click="gohome">系统管理</p>
            <p class="sysname childname">部门管理</p>
        </div> -->
        <div class="topInfo">
            <img src="../../assets/updataImg/location.png" alt="">
            <span class="sysname childname">当前位置：</span>
            <p class="sysname" @click="gohome">首页 > </p>
            <p class="sysname">&nbsp;部门管理</p>
        </div>
        <div class="dicManageWrappr">
            <div class="item">
                <!-- <el-button class="addBtn"  icon="el-icon-plus" @click="addData">新增部门</el-button> -->
                <div v-if="addBtn" @click="addData" class="el-icon-plus commBtn addBtn"> 新增部门</div>
                <div class="searchInfo">
                    <input placeholder="请输入您要查找的部门名称/描述" v-model.trim="keyword" @keyup.enter="getFilter">&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button @click="getFilter" class="searchBtn" icon="el-icon-search"> 查询</el-button>
                </div>
            </div>
            <div class="content">
              <div class="leftcontent leftTree">
                <div class="treecontent">
                  <el-tree
                    :data="treeData"
                    :props="defaultProps"
                    default-expand-all
                    check-strictly
                    :expand-on-click-node='false'
                    highlight-current
                    @node-click="handleNodeClick"
                    :filter-node-method="filterNode"
                    ref="tree"
                    node-key="orgId">
                      <span class="span-ellipsis" slot-scope="{ node, data }">
                        <span :title="node.label">{{ node.label }}</span>
                      </span>
                    </el-tree>
                </div>
              </div>
              <div class="rightcontent">
                <div class="table">
                  <el-table
                    ref="table1"
                    :data="currentData"
                    @sort-change="getsort"
                    height="5.33rem"
                    style="width:100%;">
                    <div slot="empty">
                      <div class="noImg">
                        <img src="../../assets/updataImg/NoData.png" />
                      </div>
                    </div>
                    <el-table-column
                      type="index"
                      align="center"
                      width="60"
                      label="编号">
                    </el-table-column>
                    <el-table-column
                      prop="orgName"

                      align="center"
                      show-overflow-tooltip
                      label="部门名称">
                    </el-table-column>
                    <el-table-column
                      prop="parentOrgName"
                      align="center"
                      show-overflow-tooltip
                      label="上级部门">
                    </el-table-column>
                    <el-table-column
                      prop="remark"
                      align="center"
                      show-overflow-tooltip
                      label="描述">
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="260" v-if="editBtn || deleteBtn">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          v-if="editBtn"
                          class="searchBtn"
                          icon="el-icon-edit"
                          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          class="delBtn"
                          v-if="deleteBtn"
                          icon="el-icon-delete"
                          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
                      :total="totalCount">
                    </el-pagination>
                    <!-- <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-sizes="[10, 20, 30]"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalCount">
                    </el-pagination> -->
                  </div>
                </div>

              </div>
            </div>
        </div>
        <footerSecond />
        <el-dialog
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            :destroy-on-close="true"
            width="7.5rem"
            :before-close="resetForm"
            :title="dialogTitle"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            class="dialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="部门名称" prop="orgName">
                    <el-input v-model="ruleForm.orgName" placeholder="请输入部门名称"></el-input>
                </el-form-item>
                <el-form-item label="上级部门" prop="parentOrgName" class="jur">
                    <el-tree :data="treeFormData" :props="defaultProps" @check="handleClick" show-checkbox ref="treeForm" check-strictly default-expand-all node-key="orgId"></el-tree>
                </el-form-item>
                <el-form-item label="描述" prop="remark">
                    <el-input type="textarea" v-model="ruleForm.remark" :rows="4" placeholder="请输入描述"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary cancleBtn" @click="reset('ruleForm')">取 消</el-button>
                <el-button type="primary passBtn" :diaable="isclick" @click="submit('ruleForm')">确 定</el-button>
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
    data () {
        return {
            addBtn:this.$storage.getSession("638")!=null?true:false,
            editBtn: this.$storage.getSession("639")!=null?true:false,
            deleteBtn: this.$storage.getSession("670")!=null?true:false,
            treeData: [],
            treeFormData:[],
            editDefaultNode: null,  //编辑部门时默认节点，以确认不可选的节点
            unClickNode: [],
            defaultProps: {
                children: 'children',
                isLeaf: 'leaf',
                label: 'orgName',
                disable: false
            },
            isclick:false, //添加点击事件
            ruleForm: {
                orgId: "",
                orgName: "",
                parentOrgName: "",
                remark: ""
            },
            formReadonly: false,
            isEdit: false,
            dialogTitle: "",
            dialogVisible: false,
            keyword: "",
            totalCount: 0,
            orderBy: "",
            orderType: "",
            pageSize: 10,
            currentPage: 1,
            tableData: [],
            currentData: [],
            orgParentId: "",
            currentOrgId: "",
            currentOrg: {},
            orgId: "",
            orgName: "",
            selectOrg: [],
            checkedNode: [], //关键字搜索结果
            i:0,
            nowoRgId:'',
            rules: {
                orgName: [
                    { required: true, message: '请输入部门名称', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                remark: [
                    { required: false, message: '请输入描述', trigger: 'blur' },
                    { min: 0, max: 255, message: '长度在255 个字符以内', trigger: 'blur' }
                ]
            }
        }
    },
    mounted () {
      this.getListOrg("");
      //表格重绘
      let _this = this;
      window.addEventListener("resize", function () {
        if(_this.$refs["table1"]){
          _this.$refs["table1"].doLayout();
        }
      });
    },
    computed: {

    },
    watch: {
      editDefaultNode(newValue){
        this.editableNode();
      },

    },
    methods: {
        loadNode (node, resolve) {
            if (node.level > 0) {
                if(!node.data.leaf){
                    let data = {orgParentId: node.data.orgId};
                    data = this.$qs.stringify(data);//post请求分离data
                    this.$http.get('/sms/org/listOrg',data).then(res=>{
                        resolve(res.data.data);
                    })
                }
            }
        },
        handleClick(data,checked, node) {

          if(this.isEdit){
            if(!this.editDefaultNode){
              //this.$alert("顶级部门没有可选的上级部门","消息提示");
              this.$refs.treeForm.setCheckedNodes([]);
              return false;
            }else if(this.unClickNode.join(",").indexOf(data.orgId) != -1) {
              //this.$alert("不可选择自己以及子部门为上级部门","消息提示");
              this.$refs.treeForm.setCheckedNodes([]);
              return false;
            }else{
              this.$refs.treeForm.setCheckedNodes([]);
              this.$refs.treeForm.setCheckedNodes([data]);
            }
          }else{
            this.$refs.treeForm.setCheckedNodes([]);
            this.$refs.treeForm.setCheckedNodes([data]);
          }

          // this.$refs.treeForm.setCheckedNodes([]);
          // this.$refs.treeForm.setCheckedNodes([data]);
        },
        editableNode (){
          this.unClickNode = [];
          for(let i=0;i<this.treeFormData.length;i++){
            this.disabledNode(this.treeFormData[i]);
          }
        },
        disabledNode(data){
          if(data.orgId == this.editDefaultNode){
            //data.disabled = true;
            this.disabledChildNode(data);
            this.unClickNode.push(data.orgId);
          }else{
            //data.disabled = false;
            if(data.children.length){
              for(let i=0;i<data.children.length;i++){
                this.disabledNode(data.children[i]);
              }
            }
          }
        },
        disabledChildNode (data){
           if(data.children.length){
             for(let i=0;i<data.children.length;i++){
               //data.children[i].disabled = true;
               this.disabledChildNode(data.children[i]);
               this.unClickNode.push(data.children[i].orgId);
             }
           }
        },

        // 获取部门列表
        getListOrg (id) {
            let data = {
                orgParentId: id
            };
            data = this.$qs.stringify(data);//post请求分离data
            this.$http.get('/sms/org/listOrg',data).then(res=>{
                if(res.data.code === 200){
                    this.treeData = res.data.data;
                    this.treeFormData = res.data.data;
                    if(this.currentOrgId == this.nowoRgId && this.nowoRgId != ''){
                       this.$nextTick(function () {
                        let node = this.$refs.tree.getNode(this.nowoRgId);
                        this.$refs.tree.setCurrentKey(this.nowoRgId);
                        this.getOrgListByTreeNode(node.data, node.parent?node.parent.data.orgName: "");
                      });
                    }else{
                      this.orgId = res.data.data[0].orgId;
                      this.getOrgListByTreeNode(this.treeData[0], "");
                    }
                    // if(!this.currentOrgId){
                    //   console.log(1122222);

                    // }else{
                    //   console.log(223333);

                    // }

                }else{
                  this.$notify({
                    type: 'error',
                    message: '获取部门列表失败！',
                    position: 'bottom-right',
                    duration: 3000
                  });
                }
            })
        },
        // 获取部门id
        handleNodeClick(data, node) {
          console.log(data,node,1112);
            this.keyword='';//keyword不为空查询功能有误
            //this.orgId = data.orgId;
            this.currentPage = 1;
            if(node.parent == null){
              this.getOrgListByTreeNode(data, "");
            }else{
              this.getOrgListByTreeNode(data, node.parent.data.orgName);
            }

        },
        //数组去重
        uniq(array) {
          let temp = [];
          let index = [];
          let l = array.length;
          for (let i = 0; i < l; i++) {
            for (let j = i + 1; j < l; j++) {
              if (array[i] === array[j]) {
                i++;
                j = i;
              }
            }
            temp.push(array[i]);
            index.push(i);
          }
          return temp;
        },
        getFilter(){
          this.checkedNode = [];
          this.$refs.tree.filter(this.keyword);
          this.checkedNode = this.uniq(this.checkedNode);

          this.tableData = [];
          for(let i=0;i<this.checkedNode.length;i++){
            let node = this.checkedNode[i];
            let data = node.data;
            let pName = node.parent?node.parent.data.orgName:"";
            this.tableData.push({
              orgCode: data.orgCode,
              orgId: data.orgId,
              orgName: data.orgName,
              parentOrgId: data.parentOrgId,
              parentOrgName: pName,
              remark: data.remark
            });
          }
          this.totalCount = this.tableData.length;

          this.currentPage = 1;
          this.queryData();

        },
        filterNode(value, data, node){
          // if(data.orgId !="" && data.orgId != null && data.orgId.indexOf(value) != -1){
          //   this.checkedNode.push(node);
          // }
          if(data.orgName !="" && data.orgName != null && data.orgName.indexOf(value) != -1){
            this.checkedNode.push(node);
          }
          // if(data.parentOrgId !="" && data.parentOrgId != null && data.parentOrgId.indexOf(value) != -1){
          //   this.checkedNode.push(node);
          // }
          if(data.parentOrgName !="" && data.parentOrgName != null && data.parentOrgName.indexOf(value) != -1){
            this.checkedNode.push(node);
          }
          if(data.remark !="" && data.remark != null && data.remark.indexOf(value) != -1){
            this.checkedNode.push(node);
          }
          return true;
        },
        getOrgListByTreeNode (data, parentOrgName){
          this.tableData = [];
          this.totalCount = 0;

          this.pushNode(data,parentOrgName);
          this.totalCount = this.tableData.length;

          this.queryData();
        },
        pushNode(data,parentOrgName){
          data.parentOrgName = parentOrgName;
          let parentNode = {
            orgCode: data.orgCode,
            orgId: data.orgId,
            orgName: data.orgName,
            parentOrgId: data.parentOrgId,
            parentOrgName: data.parentOrgName,
            remark: data.remark
          };
          this.tableData.push(parentNode);
          if(data.children.length){
            for(let i =0;i<data.children.length;i++){
              this.pushNode(data.children[i],data.orgName);
            }
          }
        },

        // 监听表格排序
        getsort (obj) {
            this.orderBy = obj.prop;
            this.orderType = obj.order == "descending" ? "desc" : "asc";
            this.queryData()
        },
        // 监听每页条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1;
            this.queryData()
        },
        // 监听当前页码
        handleCurrentChange(val) {
            this.currentPage = val;
            this.queryData()
        },
        // 编辑
        handleEdit (index, row) {

            this.editDefaultNode = row.orgId;

            this.dialogTitle = "编辑部门";
            this.dialogVisible = true;
            this.formReadonly = true;
            this.isEdit = true;

            this.ruleForm = {
              orgId: row.orgId,
              orgName: row.orgName,
              remark: row.remark
            };
          if(!this.$refs["treeForm"]){
            this.$nextTick(function () {
              console.log(this.$refs["treeForm"]);
              this.$refs["treeForm"].setCheckedKeys([row.parentOrgId]);
            });
          }else{
            console.log(this.$refs["treeForm"]);
            this.$refs["treeForm"].setCheckedKeys([row.parentOrgId]);
          }
        },
        //具体删除
        deleteItem(orgId){
            let data = {
              'orgId':orgId
            };
            data = this.$qs.stringify(data);//post请求分离data
            this.$http.post('/sms/org/delete',data).then(res=>{
                if(res.data!=null && res.data.code == 200){
                    this.orgId=orgId;
                    this.$notify({
                      type: 'success',
                      message: '删除成功！',
                      position: 'bottom-right',
                      duration: 3000
                    });
                     this.getListOrg();
                }else if(res.data.code == 100){
                  this.$notify({
                      type: 'warning',
                      message: '部门下存在用户或子部门,不能删除！',
                      position: 'bottom-right',
                      duration: 3000
                  });
                  // this.$nextTick( ()=>{
                  //     this.getListOrg("");

                  // })

                  return false;
                }else{
                  this.$notify({
                      type: 'error',
                      message: '删除失败！',
                      position: 'bottom-right',
                      duration: 3000
                  });

                  return false;
                }
            })
        },
        // 删除
        handleDelete (index, row) {
          this.$myconfirm({
          type: '提示',
          msg: '此操作将永久删除该部门, 是否继续?',
          icon:1,
          btn: {
            ok: '确定',
            no: '取消'
          }
          }).then(() => {
            this.nowoRgId = row.parentOrgId
            this.deleteItem(row.orgId);
          })
          .catch(() => {
          })
        },

        addDepartment(){
            this.isclick = true
            //新增
            let data={
              orgName:this.ruleForm.orgName,
              remark:this.ruleForm.remark,
              parentOrgId:this.$refs.treeForm.getCheckedKeys()[0]
            };
            data = this.$qs.stringify(data);//post请求分离data
            this.$http.post('/sms/org/insert',data).then(res=>{
                this.isclick = false
              if(res.data!=null && res.data.code == 200){
                this.$notify({
                  type: 'success',
                  message: '添加成功！',
                  position: 'bottom-right',
                  duration: 3000
                });
                let cNode = this.$refs.treeForm.getCheckedNodes();
                this.currentOrgId = cNode.length?cNode[0].orgId:"";
                this.getListOrg("");
                this.$refs.treeForm.setCheckedKeys([]);
                this.dialogVisible = false;
              }else if(res.data.code == 100){
                // this.$alert(res.data.data,"消息提示");
                 this.$notify({
                  type: 'warning',
                  message: res.data.message,
                  position: 'bottom-right',
                  duration: 3000
                });
                return false;
              }else{
                this.$notify({
                  type: 'error',
                  message: '添加失败！',
                  position: 'bottom-right',
                  duration: 3000
                });
                return false;
              }

            });

        },
        updateDepartment (){
            this.isclick = true
          //编辑
          let data={
            orgId: this.ruleForm.orgId,
            orgName:this.ruleForm.orgName,
            remark:this.ruleForm.remark,
            parentOrgId:this.$refs.treeForm.getCheckedKeys()[0]
          };
          data = this.$qs.stringify(data);//post请求分离data
          this.$http.post('/sms/org/update',data).then(res=>{
              this.isclick = false
            if(res.data!=null && res.data.code == 200){
              this.$notify({
                type: 'success',
                message: '修改成功！',
                position: 'bottom-right',
                duration: 3000
              });
              let cNode = this.$refs.treeForm.getCheckedNodes();
              this.currentOrgId = cNode.length?cNode[0].orgId:"";
              this.getListOrg("");
              this.$refs.treeForm.setCheckedKeys([]);
              this.dialogVisible = false;
            }else if(res.data.code == 201){
              this.$notify({
                type: 'warning',
                message: '用户未做修改',
                position: 'bottom-right',
                duration: 3000
              });
            }
            else{
               this.$notify({
                type: 'error',
                message: '修改失败！',
                position: 'bottom-right',
                duration: 3000
              });
              return false;
            }

          });
        },
        // 去管理菜单页
        gohome () {
            this.$router.push({path:'/videoStrucPlat',query:{ menuCode: '700' }})
        },

        // dialong 提交
        submit (formName) {
            this.$refs[formName].validate((valid) => {
                if(valid){
                    if(this.isEdit){
                      this.updateDepartment();
                      // this.getListOrg("");

                    }else{
                      this.addDepartment();
                      // this.getListOrg("");
                    }
                }
            });
        },
        // dialong 重置
        reset (formName) {
          this.editDefaultNode = null;
          this.selectOrg = [];
            this.$refs.treeForm.setCheckedKeys([]);
            this.$refs[formName].resetFields();
            this.dialogVisible = false;
            this.isclick = false
        },
        // 父页面新增按钮
        addData () {
            this.isclick = false
          this.editDefaultNode = null;
          this.dialogTitle = "新增部门";
            this.dialogVisible = true;
            this.formReadonly = false;
            this.isEdit = false;

            this.ruleForm = {
              orgId: '',
              orgName: '',
              remark: ''
            };
        },
        queryData () {
          let start = this.pageSize * (this.currentPage-1);
          let end = this.pageSize * (this.currentPage);
          this.currentData = this.tableData.slice(start, end);
        },
        resetForm(done){
          this.editDefaultNode = null;
          this.ruleForm.remark = "";
          this.ruleForm.orgName = "";
          this.selectOrg = [];

          if(!this.$refs["treeForm"]){
            this.$nextTick(function () {
              this.$refs["treeForm"].setCheckedKeys([]);
            });
          }else{
            this.$refs["treeForm"].setCheckedKeys([]);
          }

          this.$refs['ruleForm'].resetFields();
          done();
        }

    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/css/manage_third.css";
    @import "../../assets/css/commom.css";
    .dicManageWrappr{
      width: 97%;
      margin: 0 auto;
      height: calc(100% - 0.7rem);
    }
    .jur{
      height: 2.64rem;
    }
    .el-dialog  .jur  .el-tree{
      width: 100%;
      height: 2.55rem;
      margin-top: 0.1rem;
      overflow: auto;
    }
    .leftcontent{
      height: 5.33rem;
    //   border: 1px solid rgba(15, 44, 79, 0.5);
      @include border_depart_1("border_depart_1");
      @include background_depart_1("background_depart_1");
    //   background-color: rgba(16, 35, 56, 0.5);
      overflow: auto;
    }
    .el-table{
    //   border: 2px solid rgba(12,68,135,0.3) !important;
     @include border_tab_1("border_tab_1");
    }
    .el-table /deep/ td,
    .el-table /deep/ th.is-leaf {
    //   border: 1px solid rgba(12, 68, 135, 0.3) !important;
    @include border_tab_2("border_tab_2");
    }
    .el-table /deep/ th.gutter:last-of-type {
      border: 1px solid rgba(12, 68, 135, 0.3) !important;
    }

    .el-textarea >>> .el-textarea__inner{
        /* width: 100%; */
        padding-left: 0.1rem;
        color: #99c9fa;
        background-color: rgba(0, 0, 0, 0.2) !important;
        border: 1px solid #134276 !important;
    }

    .span-ellipsis{
    //   color: #99c9fa;
      @include font_color_subject("font_color_subject1");
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    @media (max-width:1440px){
        .el-icon-plus{
            width: 1.2rem;
        }
    }



</style>


