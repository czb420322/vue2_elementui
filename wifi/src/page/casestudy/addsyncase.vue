<template>
 <div class="addsyncase">
     <div class="topInfo">
      <img src="../../assets/updataImg/location.png" alt="">
      <span class="sysname childname">当前位置：</span>
      <router-link v-if="!showTwocase" class="sysname" :to="{path:'/casestudy',query:{menuCode:200}}">案件库 ></router-link>
      <router-link v-if="showTwocase" class="sysname" :to="{path:'/videoCombat',query:{menuCode:100}}">视频侦查></router-link>
      <router-link v-if="showTwocase" class="sysname" :to="{path:'/videoCombat/twoscout',query:{menuCode:114}}">&nbsp;协同作战 ></router-link>
      <router-link tag="div" :to="{path:'/casestudy/caseInfomanage',query:{menuCode:202}}" v-if="caseInfom" class="sysname sysnamesecond">&nbsp;案事件信息管理 ></router-link>
      <router-link tag="div" :to="{path:'/casestudy/myupload',query:{menuCode:203}}" v-if="myUploadTo" class="sysname sysnamesecond">&nbsp;我的案事件 ></router-link>
      <router-link tag="div" :to="{path:'/casestudy/mysynergy',query:{menuCode:222}}" v-if="mysynergy" class="sysname sysnamesecond">&nbsp;我的协同 ></router-link>
      <p class="sysname">&nbsp;案件信息</p>
    </div>


    <div class="main">
      <div class="mainCenter">
        <p class="maintitle"><span>1.</span>新增协同人员</p>
        <div class="mainDiv">
          <div>
            <p><img src="@/assets/images/caseStydy/addtime.png" alt="">新增团队</p>
            <ul class="mainul">
              <li>
                <span>选择部门：</span>
                   <div class="treeWrap" v-show="showOrg">
                     <el-tree :data="treeData" :props="orgProps"  @check="handleClick" show-checkbox ref="treeForm" check-strictly default-expand-all node-key="orgId" ></el-tree>
                   </div>
                   <input slot="reference" v-model.trim="orgName"  @focus="showOrg = true"  placeholder="请选择所属单位" title="请选择所属单位" />
              </li>
              <li>
                 <span>选择成员：</span>
                <!-- <select v-model="orgPerson" @change="getNumto">
                  <option v-for="(item,i) in departPerson" :value="item.userId">{{item.trueName}}</option>
                </select> -->

                <el-select
                  v-model.trim="orgPerson"
                  class="receivePerson err-receivePerson1"
                  filterable
                  placeholder="请选择接收人">
                  <el-option
                    v-for="(item,i) in departPerson"
                    :key="i"
                    :label="item.trueName"
                    :value="item.userId">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>团队角色：</span>
                <el-select v-model="trimRole" placeholder="请选择团队角色">
                  <el-option value="1" label="指挥员"></el-option>
                  <el-option value="2" label="侦查员"></el-option>
                  <!-- <el-option value="2" lable="侦查员"></el-option> -->
                </el-select>
                <!-- <select v-model="trimRole">
                  <option value="1">指挥员</option>
                  <option value="2">侦查员</option>
                </select> -->
              </li>
              <li>
                <span>描述信息：</span>
                <textarea v-model="describe" style="resize: none" placeholder="请输入描述"></textarea>
              </li>
              <li>
                <el-button type="primary" class="searchBtn" @click="addPerson">新增</el-button>
              </li>
            </ul>
          </div>

          <div class="mainright">
            <p><img src="@/assets/images/caseStydy/trim.png" alt=""> 团队列表</p>
            <div class="main_r">
              <el-table
              :data="tableData" border  style="width: 100%"
               class="tables"  height="4.4rem">
              <el-table-column
                show-overflow-tooltip
                type="index"
                width="80"
                label="编号">
              </el-table-column>
              <el-table-column
                prop="user.trueName"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="user.orgName"
                show-overflow-tooltip
                label="所属部门">
              </el-table-column>
              <el-table-column
                prop="distRole"
                :formatter="distRole"
                label="团队角色">
              </el-table-column>
              <el-table-column
               show-overflow-tooltip
                prop="user.phone"
                label="电话">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                 prop="establishUser.trueName"
                label="创建人">
              </el-table-column>
              <el-table-column
                prop="beginTime"
                width="160"
                label="创建时间">
              </el-table-column>
               <el-table-column
               show-overflow-tooltip
                prop="description"
                label="描述">
              </el-table-column>
              <el-table-column
                prop="operation"
                label="操作"
                width="180">
                <template slot-scope="scope">
                  <el-button type="primary" class="el-icon-edit searchBtn" @click="updateData(scope.row)">编辑</el-button>
                  <el-button type="danger" class="el-icon-delete delBtn" @click="deleteData(scope.row)">删除</el-button>
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
              :total="totalCount">
            </el-pagination>

            </div>


          </div>
        </div>
        <p class="main_btn">
          <el-button type="primary" class="cancleBtn" @click="gotoprev">上一步</el-button>
          <el-button type="success" class="passBtn" @click="gotoNext">下一步</el-button>
        </p>
      </div>
    </div>

    <el-dialog
      title="修改成员"
      :visible.sync="dialogVisible"
      width="30%">
      <span>
        <ul class="mainul">
              <li>
                <span>选择部门：</span>
                   <div class="treeWrap" v-show="showOrg1">
                     <el-tree :data="treeData" :props="orgProps"  @check="handleClick1" show-checkbox ref="treeForms" check-strictly default-expand-all node-key="orgId" ></el-tree>
                   </div>
                   <input slot="reference" v-model.trim="orgName"  @focus="showOrg1 = true"  placeholder="请选择所属单位" title="请选择所属单位" />
              </li>
              <li>
                 <span>选择成员：</span>
                  <el-select v-model="orgPerson1" placeholder="请选择成员">
                    <el-option v-for="(item,i) in departPerson" :value="item.userId" :label="item.trueName" :key="i"></el-option>
                  </el-select>
              </li>
              <li>
                <span>团队角色：</span>
                 <el-select v-model="trimRole1" placeholder="请选择团队角色">
                  <el-option value="1" label="指挥员"></el-option>
                  <el-option value="2" label="侦查员"></el-option>
                </el-select>
              </li>
              <li>
                <span>描述信息：</span>
                <textarea v-model="describe1" style="resize: none" placeholder="请选择描述信息"></textarea>
              </li>
            </ul>

      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false"></el-button>
        <el-button @click="updataList()"></el-button>
      </span>
    </el-dialog>


  <footer>
      <p><img src="../../assets/logo.png">武汉大千信息技术有限公司&copy;版权所有 2008-<span>{{ new Date().getFullYear() }}</span></p>
    </footer>
 </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible:false,
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
      tableData:[],
      currentPage:1,
      pageSize:10,
      totalCount:0,
      phone:'',
      caseUuid:'',  //案件ID
      edit:'',       //是否是编辑
      synergyCombat:'', //是否是协同,
      departPerson:[], //部门人员
      handlerId:'',
      orgName1:'',
      orgPerson1:'',
      trimRole1:'2',
      describe1:'',
      caseInfom:false,
      myUploadTo:false,
      mysynergy:false,
      showOrg:false,
      showOrg1:false,
      NumCount:'',
      showTwocase:true,
    };
  },
  created() {
    this.caseUuid = this.$route.query.caseUuid;
    this.edit = this.$route.query.edit;
    this.synergyCombat = this.$route.query.synergyCombat
    this.caseInfom = this.$route.query.caseInfom
    this.mysynergy = this.$route.query.mysynergy
    this.myUploadTo = this.$route.query.myUploadTo
    this.showTwocase = this.$route.query.showTwocase
  },
  mounted() {
    this.getListOrg();
    this.getAllData()

  },
  methods: {
    getNumto(){
      console.log(this.orgPerson,66);
      console.log(this.tableData,88);
      for (let i = 0; i < this.tableData.length; i++) {
        if(this.orgPerson == this.tableData[i].user.userId){
          this.orgPerson = ''
          return
        }
      }
    },
    distRole(row, column,cellValue){
      if (cellValue === 1){
          return '指挥员';
      }else if (cellValue === 2){
          return '侦查员';
      }
    },
    handleClick(data, checked) {
      this.$refs.treeForm.setCheckedNodes([]);
      this.$refs.treeForm.setCheckedNodes([data]);
      this.orgId = data.orgId;
      this.orgName = data.orgName;
      this.parentOrgId = data.parentOrgId;
      this.showOrg = false;
      this.getUserByOrg()
    },
    handleClick1(data, checked) {
      this.$refs.treeForms.setCheckedNodes([]);
      this.$refs.treeForms.setCheckedNodes([data]);
      this.orgId = data.orgId;
      this.orgName1 = data.orgName;
      this.parentOrgId = data.parentOrgId;
      this.showOrg1 = false
      this.getUserByOrg();
    },
    //选择部门下面的人
    getUserByOrg(){
      let data = {
        orgId:this.orgId
      }
      data = this.$qs.stringify(data)
      this.$http.post('sms/usercore/getUserByOrg',data).then(res=>{
        if(res.data.code == 200){
          this.departPerson = res.data.data
        }
      })
    },
    //删除数据
    deleteData(row){
      console.log(row.handlerId,222);
      let data ={
        handlerId:row.handlerId
      }
      data = this.$qs.stringify(data)
      this.$http.post('pca/synergyhandler/deleteHandler',data).then(res=>{
        if(res.data.code == 200){
          this.getAllData();
        }
      })
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
            type: 'error',
            message: '获取部门列表失败！',
            position: 'bottom-right',
            duration: 3000
          });
          // layer.alert("获取部门列表失败！", { icon: 5, title: "消息提示" });
        }
      });
    },
    //添加成员
    addPerson(){
      if(this.distRole == '' || this.orgId == '' || this.orgPerson == ''){
        this.$notify({
         type: 'warning',
         message: '描述不能为空',
         position: 'bottom-right',
         duration: 3000
       });
        // layer.alert("描述不能为空", { icon: 5, title: "消息提示" });
        return
      }
      let data = {
        userId:this.orgPerson,
        caseUuid:this.caseUuid,
        distRole:this.trimRole,
        deptId:this.orgId,
        handlerName:this.orgPerson,
        phone:'',
        description:this.describe,
      }
      data = this.$qs.stringify(data)
      this.$http.post('pca/synergyhandler/savehandler',data).then(res=>{
        if(res.data.code == 200){
          this.trimRole = '2'
          this.clearData();
          this.getAllData();
        }
        else if(res.data.code == 100){
          this.trimRole = '2'
           this.$notify({
              type: 'warning',
              message: '此案件已有指挥员',
              position: 'bottom-right',
              duration: 3000
            });
          this.clearData();
          this.getAllData();
        }
      })
    },
    clearData(){
      this.orgId = ''
      this.$refs.treeForm.setCheckedNodes([]);
      this.departPerson = []
      this.describe = this.phone = this.orgName =this.orgPerson ='';
      this.trimRole = '2'
    },
    //获取表格数据
    getAllData(){
      let data = {
        caseUuid: this.caseUuid,
        pageNum:this.currentPage,
        pageSize:this.pageSize,
        orderBy:'create_time',
        orderType:'desc'
      }
      data = this.$qs.stringify(data)
      this.$http.post('pca/synergyhandler/selectHandlerList',data).then(res=>{
        if(res.data.code == 200){
          console.log(res);
          this.tableData = res.data.data.list
          this.totalCount = res.data.data.totalCount
        }
      })
    },
    //编辑
    updateData(row){
      this.dialogVisible = true;
      console.log(row,777);
      this.orgName1 = row.user.orgName
      this.orgId = row.user.orgId
      this.orgPerson1 = row.userId
      this.describe1 = row.description
      this.trimRole1 = row.distRole.toString();
      this.handlerId = row.handlerId
      this.getUserByOrg(); //获取部门下面的人
      this.$nextTick(()=>{
        this.$refs["treeForms"].setCheckedKeys([this.orgId]);
      })
    },
    updataList(){
       let data = {
        handlerId:this.handlerId,
        distRole:this.trimRole1,
        deptId:this.orgId,
        handlerName:this.orgPerson1,
        description:this.describe1,
        userId:this.orgPerson1,
        caseUuid:this.caseUuid,
      }
      console.log(data,666);
      data = this.$qs.stringify(data)
      this.$http.post('pca/synergyhandler/updateHandler',data).then(res=>{
        if(res.data.code == 200){
          this.clearData();
          this.getAllData();
          this.dialogVisible = false
        }
        else if(res.data.code == 100){
           this.$notify({
              type: 'warning',
              message: '此案件已有指挥员',
              position: 'bottom-right',
              duration: 3000
            });
          //  layer.alert("此案件已有指挥员", { icon: 5, title: "消息提示" });
        }
      })
    },
    handleSizeChange(val){
      this.pageSize = val;
      this.getAllData();
    },
    handleCurrentChange(val){
      this.currentPage = val;
      this.getAllData();
    },
    //上一步
    gotoprev(){
      if(this.myUploadTo){
        this.$router.push({path:'/casestudy/caseInfomanage/addcase', query:{menuCode:200,caseUuid:this.caseUuid,edit:true,myUploadTo:true}})
      }else if(this.mysynergy){
        this.$router.push({path:'/casestudy/caseInfomanage/addcase', query:{menuCode:200,caseUuid:this.caseUuid,edit:true,mysynergy:true}})
      }else if(this.caseInfom){
        this.$router.push({path:'/casestudy/caseInfomanage/addcase', query:{menuCode:200,caseUuid:this.caseUuid,edit:true,caseInfom:true}})
      }else if(this.showTwocase){
        this.$router.push({path:'/videoCombat/twoscout', query:{menuCode:100,caseUuid:this.caseUuid,edit:true,showTwocase:true}})
      }

    },
    //下一步
    gotoNext(){
      if(this.myUploadTo){
        this.$router.push({path:'/casestudy/caseInfomanage/addcasetwo', query:{menuCode:200,caseUuid:this.caseUuid,edit:this.edit,myUploadTo:true,synergyCombat:this.synergyCombat}})
      }else if(this.mysynergy){
        this.$router.push({path:'/casestudy/caseInfomanage/addcasetwo', query:{menuCode:200,caseUuid:this.caseUuid,edit:this.edit,mysynergy:true,synergyCombat:this.synergyCombat}})
      }else if(this.caseInfom){
        this.$router.push({path:'/casestudy/caseInfomanage/addcasetwo', query:{menuCode:200,caseUuid:this.caseUuid,edit:this.edit,caseInfom:true,synergyCombat:this.synergyCombat}})
      }else if(this.showTwocase){
         this.$router.push({path:'/casestudy/caseInfomanage/addcasetwo?menuCode=200', query:{caseUuid:this.caseUuid,edit:this.edit,hide:false,synergyCombat:this.synergyCombat,showTwocase:this.showTwocase}})
      }

    },
  }
};
</script>

<style scoped>
@import "../../assets/css/commom.css";
.addsyncase {
  width: 100%;
  position: absolute;
  top: 0.6rem;
  bottom: 0px;
  left: 0px;
}
.addsyncase .addcaseinfo {
  margin-left: -0.1rem;
}

.main {
  padding: 0.1rem 0.5rem;
}
.mainCenter {
  height: 100%;
  border: 1px solid #2c3c4f;
}
.maintitle {
  background-color: #0a1c30;
  line-height: 0.6rem;
  font-size: 0.16rem;
  padding-left: 0.2rem;
  color: #fff;
  border: 1px solid rgba(27,55,88,.5)
}
.maintitle span {
  font-size: 0.3rem;
  color: #fff;
  margin-right: 0.1rem;
}
.main_btn {
  width: 100%;
  text-align: center;
  background-color: #0a1c30;
  line-height: 0.6rem;
}
.main_btn .el-button{
  padding: 0.1rem 0.4rem;
}
.main_btn .el-button:first-child{
  margin-right: 0.3rem;
}
.mainDiv {
  width: 100%;
  padding: 0.2rem;
  height: calc(100% - 1.25rem);
  /* border: 1px solid #000; */
  font-size: 0.14rem;
}
.mainDiv >div:first-child {
  width: 25%;
  height: 100%;
  border: 1px solid #0e2847;
  background: rgba(28,60,95,.32);
  float: left;
}
.mainDiv >div:first-child p,
.mainDiv >div:last-child p {
  line-height: 0.5rem;
  background-color: #0e253f;
  color: #fff;
  border: 1px solid rgba(20,51,84,.5);
  padding: 0 0.2rem;
}
.mainDiv .mainright {
  margin-left: 26%;
  width: 74%;
  height: 100%;
  border: 1px solid #0e2847;
  background: rgba(28,60,95,.32);
}
.mainul li {
  padding: 0.1rem 0.2rem;
  position: relative;
}



.mainul li span {
  color: #99c9fa;
  width: 0.9rem;
  display: inline-block;
}
.mainul li input,
.mainul li select,
.mainul li textarea {
  width: 3rem;
  line-height: 0.3rem;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  padding: 0 0.1rem;
  color: #99c9fa;
}
select {
  height: 0.3rem;
}
textarea {
  height: 1rem;
  vertical-align: middle;
}
.treeWrap {
  width: 2.75rem;
  height: 2rem;
  overflow: auto;
  position: absolute;
  z-index: 2;
  left: 1.15rem;
  border-radius: 5px;
  padding: 0.1rem;
  background-color: #fff;
}
.treeWrap .el-tree{
  width: 100%;
  height: 100%;
}
.treeWrap >>> .el-tree-node__label {
  color: #606266;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis
}
.mainul li .el-button {
  float: right;
  padding: 0.1rem 0.3rem;
  margin-right: 0.2rem;
}
.mainright .main_r{
  position: relative;
  width: 100%;
  height: calc(100% - 0.5rem);
  padding: 0.1rem;
  /* border: 1px solid #000; */
}
.mainright .el-pagination{
  text-align: right;
  position: absolute;
  bottom: 0.1rem;
  right: 0.1rem;
  margin-top: 0.1rem;
}
.el-select >>> .el-input__inner{
  height: 0.3rem;
}

.mainright >>> .el-table th{
  background-color: #edf1f4;
  text-align: center;
}
.mainright >>> .el-table td{
  text-align: center;
  padding: 0.08rem 0;
}
.mainright >>> .el-table--border th,
.mainright >>> .el-table--border th{
  text-align: center;
  border-right: 1px solid #e6e6e6;
}
.mainright >>>  .el-table__body .el-button{
  padding: 0.05rem 0.1rem;
}
.receivePerson{
  width: 3rem;
  height: 0.3rem;
}
.receivePerson >>> .el-input{
  height: 0.3rem;
}
.receivePerson  >>> .el-input__inner{
  height: 0.3rem !important;
  color: #606266;
  cursor: text;
}
.treeWrap{
  background-color: rgba(16, 35, 56, 0.8) !important;
    border: 1px solid rgba(15, 44, 79, 0.8) !important;
}
.el-tree >>> .el-tree-node__label{
  color: #99c9fa;
}
    /* background-color: rgba(16, 35, 56, 0.8) !important;
    border: 1px solid rgba(15, 44, 79, 0.8) !important; */



</style>
