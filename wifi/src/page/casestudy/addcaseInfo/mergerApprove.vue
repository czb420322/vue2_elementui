<!--
 * @Author: your name
 * @Date: 2020-05-14 10:45:09
 * @LastEditTime : 2020-09-03 11:57:58
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\page\casestudy\addcaseInfo\mergerApprove.vue
 -->
<template>
 <div>
    <el-dialog
        width="60%"
        title="串案保存"
        :visible.sync="innerVisible"
        @close="closeDia('caseForm')"
        @open="openDia"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :destroy-on-close="true"
        append-to-body>
        <el-form :model="caseForm" :rules="rules" ref="caseForm" label-width="100px" class="demo-caseForm caseForm">
          <el-form-item label="串案名称" prop="addCaseName">
            <el-input v-model="caseForm.addCaseName" maxlength="50" placeholder="请输入串并案名称"></el-input>
          </el-form-item>
          <el-form-item label="串案描述" prop="addDescription">
            <el-input type="textarea" v-model="caseForm.addDescription" maxlength="255" :rows="2" placeholder="请输入串并案描述"></el-input>
          </el-form-item>
          <!-- <el-form-item label="添加案件" prop="cases">
            <el-tag
              class="cases"
              v-for="tag in multipleSelection"
              :key="tag.caseUuid"
              @close="removeItem(tag)"
              closable>
              {{tag.caseName}}
            </el-tag>
          </el-form-item> -->
        </el-form>
        <div class="contentTable">
          <!-- <div class="caseSearch_pop">
            <input v-model="caseKeyword" type="text" placeholder="请输入案件关键字" />
            <el-button type="primary" class="searchBtn" icon="el-icon-search" @click="searchCaseList()">搜索</el-button>
            <el-button type="warning" class="tryBtn" icon="el-icon-refresh" @click="getCaseListReset()">重置</el-button>
          </div> -->
          <div class="table">
            <el-table
              :data="caseList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              height="308"
              style="width:100%;"
              border>
              <div slot="empty">
                <div class="noImg">
                  <img src="../../../assets/updataImg/NoData.png" />
                </div>
              </div>
              <el-table-column
                type="index"
                width="60"
                align="center"
                label="序号">
              </el-table-column>
              <el-table-column
                prop="caseLinkMark"
                align="center"
                show-overflow-tooltip
                label="案件编号">
              </el-table-column>
              <el-table-column
                prop="caseName"
                align="center"
                show-overflow-tooltip
                label="案件名称">
              </el-table-column>
              <el-table-column
                prop="caseCategoryDesc"
                align="center"
                show-overflow-tooltip
                label="案件类型">
              </el-table-column>
              <el-table-column
                prop="caseAbstract"
                align="center"
                show-overflow-tooltip
                label="案件描述">
              </el-table-column>
              <el-table-column
                prop="creatorName"
                align="center"
                show-overflow-tooltip
                label="创建用户">
              </el-table-column>
              <el-table-column
                prop="creatorOrg"
                align="center"
                show-overflow-tooltip
                label="创建部门">
              </el-table-column>
              <el-table-column
                prop="createTime"
                align="center"
                show-overflow-tooltip
                label="创建时间">
              </el-table-column>
              <el-table-column label="操作" align="center" min-width="100">
                <template slot-scope="scope">
                  <div>
                    <!-- <el-button
                      v-if="!inArray(scope.row)"
                      size="mini"
                      type="success"
                      class="topBtn"
                      icon="el-icon-plus"
                      @click="addItem(scope.row)"></el-button> -->
                    <el-button
                      size="mini"
                      type="danger"
                      class="delBtn"
                      v-show="scope.row.sourceCase != 1"
                      icon='el-icon-delete'
                      @click="removeItem(scope.row)"></el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pageNation">
            <el-pagination style="float: right;margin-right: 10px;"
              :background=true
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[6, 12, 18]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount">
            </el-pagination>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" class="cancleBtn" @click="resetForm('caseForm')">取 消</el-button>
          <el-button type="primary" class="passBtn" @click="saveCasCase('caseForm')" v-no-more-click>确 定</el-button>
        </span>
      </el-dialog>

 </div>
</template>

<script>
  export default {
    data () {
      return {
        innerVisible:false,
        caseForm: {
          addCaseName:'',
          addDescription:''
        },
        multipleSelection:[],
        caseList:[],
        currentPage:1,
        pageSize:6,
        totalCount:0,
        rules: {
          addCaseName: [
            { required: true, message: '请输入串并案名称', trigger: 'blur' },
            { min: 3, max: 50, message: '长度在3-50个字符以内', trigger: 'blur' }
          ],
          addDescription: [
            { required: true, message: '请输入串并案描述', trigger: 'blur' },
            { min: 0, max: 255, message: '长度在255 个字符以内', trigger: 'blur' }
          ]
        },
        caseKeyword:'',
      }
    },
    components: {

    },
    watch:{
      openmegerCase(val){
        this.innerVisible = val
      }
    },
    props:{
      openmegerCase:Boolean
    },
    methods: {
      closeDia(type){
        this.$emit('childbymeger',false);
        this.caseForm.addDescription = ''
        this.caseForm.addCaseName = '';
        // this.caseKeyword = ''
        if(type){
          this.$refs[type].resetFields()
        }
      },
      openDia(){
        this.getCaseList()
      },
      handleSizeChange(val){
        this.pageSize = val
        this.pageNoCase = 1; //更改每页条数时，从第一页开始
      },
      handleCurrentChange(val){
        this.currentPage = val
      },
      // 查询服务
      searchCaseList(){
        if(this.caseKeyword == '' || this.caseKeyword == null){
          this.currentPage = 1
          this.getCaseList();
        }else{
          let data = {
            originalCaseUuid:this.$route.query.caseUuid,
            keyword:this.caseKeyword,
          }
          data = this.$qs.stringify(data)
          this.$http.post('vsas/merge/case/list/case/by/OriginalCaseUuidAndKeyWord',data).then(res=>{
            console.log(res,1001);
            if(res.data.code == 200){
              if(res.data.data == null){
                this.currentPage = 1
                this.pageSize = 6
                this.caseList = []
                this.totalCount = 0
              }else{
                this.currentPage = 1;
                this.caseList = res.data.data
                this.totalCount = Number(this.caseList.length)
              }

            }
          })
        }

      },
      //搜索
      getCaseList(){
        let data = {
          originalCaseUuid:this.$route.query.caseUuid
        }
        data = this.$qs.stringify(data);
        this.$http.post('vsas/merge/case/list/case/by/OriginalCaseUuid',data).then(res=>{
          console.log(res,88);
          if(res.data.code == 200){
            if(res.data.data == null){
              this.caseList = []
              this.totalCount = 0
            }else{
              this.caseList = res.data.data
              this.totalCount = Number(this.caseList.length)
            }

          }
        })
      },
      //重置
      getCaseListReset(){
        this.caseKeyword = ''
        this.currentPage = 1
        this.pageSize = 6
        this.getCaseList();
      },

      //取消
      resetForm(formName){
          this.$refs[formName].resetFields()
          this.innerVisible = false;

      },
      //确定
      saveCasCase(){
        this.$parent.getLableIsOK().then(res=>{
          if(res.code == 200){
            if(res.data){
              this.$refs["caseForm"].validate((valid) => {
                if(valid){
                  if(this.caseList.length == 0){
                    this.$notify({
                      type: 'warning',
                      message: '请添加案件',
                      position: 'bottom-right',
                      duration: 3000
                    });
                    return
                  }
                  let arr = []
                  for (let i = 0; i < this.caseList.length; i++) {
                    arr.push(this.caseList[i].caseUuid)
                  }
                  let data = {
                    ids: arr.join(','),
                    caseName: this.caseForm.addCaseName,
                    description:this.caseForm.addDescription
                  }
                  data = this.$qs.stringify(data)
                  this.$http.post('pca/combo/myCombo/addCaseComboInfo',data).then(res=>{
                    this.innerVisible = false
                    if(res.data.code == 200){
                      this.removeAll();
                      this.$notify({
                        type: 'success',
                        message: '保存串案成功',
                        position: 'bottom-right',
                        duration: 3000
                      });
                    }else{
                      this.$notify({
                        type: 'error',
                        message: '保存串案失败',
                        position: 'bottom-right',
                        duration: 3000
                      });
                    }
                  })
                }
              });
            }else{
              this.$notify({
              type: 'warning',
              message: '标注未转完成，请稍等！',
              position: 'bottom-right',
              duration: 3000
            });
            }
          }else{
            this.$notify({
              type: 'warning',
              message: '标注未转完成，请稍等！',
              position: 'bottom-right',
              duration: 3000
            });
          }
        })
        return




      },
      //保存串并后清空池子
      removeAll(){
        let arr = []
        for (let i = 0; i < this.caseList.length; i++) {
          arr.push(this.caseList[i].caseUuid)
        }
        let data = {
          originalCaseUuid:this.$route.query.caseUuid,
          targetCaseUuids:arr.join(',')
        }
        console.log(data);
        data = this.$qs.stringify(data);
        this.$http.post('vsas/merge/case/delete/case/by/OriginalCaseUuid',data).then(res=>{
          if(res.data.code == 200){

          }
        })
      },
      //添加
      addItem(row){

      },
      //移除
      removeItem(row){
        this.currentPage = 1
        let data = {
          originalCaseUuid:this.$route.query.caseUuid,
          targetCaseUuids:row.caseUuid
        }
        console.log(data);
        data = this.$qs.stringify(data);
        this.$http.post('vsas/merge/case/delete/case/by/OriginalCaseUuid',data).then(res=>{
          if(res.data.code == 200){
            this.getCaseList();
            this.$notify({
              type: 'success',
              message: '删除成功',
              position: 'bottom-right',
              duration: 3000
            });
          }else{
             this.$notify({
              type: 'error',
              message: '删除失败',
              position: 'bottom-right',
              duration: 3000
            });
          }
        })
      },
      inArray(item){
        // let flag = false;
        // for(let i=0;i<this.multipleSelection.length;i++){
        //   if(this.multipleSelection[i].caseUuid === item.caseUuid){
        //     flag = true;
        //   }
        // }
        // return flag;
      },
    }
  }
</script>

<style scoped>
@import "../../../assets/css/commom.css";
.searchCondition {
    height:0.56rem;
    width: 100%;
    display: flex;
    font-size: 0.14rem;
    padding-left: 0.2rem;
    align-items: center;
    color:#606266;
    line-height:0.56rem;
  }


  .searchCondition /deep/ .el-button+.el-button{
    margin-left: 0;
  }
  .pageNation {
    margin-top: 5px;
    width: 100%;
    height: 30px;
  }
  .contentTable{
    margin-top: 0.2rem;
    padding-left: 15px;
    padding-right: 15px;
  }
  .cases{
    font-size:0.14rem;
    margin:0 4px;
    height: 0.32rem;
    line-height: 0.3rem;
  }
  .caseSearch_pop{
    display: flex;
    margin:0.1rem 0;
    align-items: center;
    justify-content: flex-end;
  }
  .caseSearch_pop input{
    width: 3rem;
    margin-right:0.1rem;
    font-size:0.14rem;
    height:0.3rem;
    line-height:0.3rem;
    padding-left: 0.1rem;
  }
  .caseSearch_pop .el-button{
    padding: 0.07rem 0.1rem;
    font-size:0.14rem;
  }


</style>
