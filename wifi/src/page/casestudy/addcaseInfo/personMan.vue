<!--
 * @Author: your name
 * @Date: 2020-07-17 09:36:07
 * @LastEditTime : 2020-12-04 10:23:03
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit

 * @FilePath: \vacp-wfes-v1.7-dev\vacp-wfes\src\page\casestudy\addcaseInfo\personMan.vue
 -->
<template>
  <div class="taskMange">
    <el-dialog
        title="任务管理"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="closeDia"
        @open="openperMan"
        width="70%">
        <span class="taskrelation" v-if="dialogVisible">
            <el-radio-group v-model="mytask" @change="checkTask">
                <el-radio-button label="我的任务"></el-radio-button>
                <el-radio-button label="全部任务"></el-radio-button>
            </el-radio-group>
            <div class="relation_top">
              <div class="modelPartTitle">
                <div class="titleLine"></div>
                <div class="titleTxt">{{taskName}}</div>
              </div>
                <p class="rela_last">
                  <input type="text" v-model="keyword" placeholder="请输入任务名称">
                  <i class="el-icon-search searchBtn" @click="currentPage1 = 1;searchQuery()"></i>
                  <el-button class="searchBtn" type="primary" @click='isflow = true'>任务关系</el-button>
                </p>
            </div>
            <el-table
            :data="tableData"
            height="500"
            border
            style="width: 100%">
            <div slot="empty">
              <div class="noImg" v-if="showNoImg">
                <img src="../../../assets/updataImg/NoData.png" />
              </div>
            </div>
            <el-table-column
            show-overflow-tooltip
            type="index"
            width="80"
            label="编号">
            </el-table-column>
            <el-table-column
            show-overflow-tooltip
            prop="taskName"
            label="任务名称">
            </el-table-column>
            <el-table-column
            show-overflow-tooltip
            prop="establisher.trueName"
            label="任务创建人">
              <!-- <template slot-scope="scope">
                {{(scope.row.hlist == undefined || scope.row.hlist.length == 0)? '' : (scope.row.hlist[0].user == null ? '' : scope.row.hlist[0].user.trueName)}}
              </template> -->
            </el-table-column>
            <el-table-column
            show-overflow-tooltip
            prop="beginTime"
            width="180"
            label="创建时间">
            </el-table-column>
            <el-table-column
            show-overflow-tooltip
            prop="taskContent"
            label="任务描述">
            </el-table-column>
            <el-table-column
            show-overflow-tooltip
            prop="taskStatus"
            :formatter="taskStatus"
            label="任务状态">
            </el-table-column>
            <el-table-column
            show-overflow-tooltip
                prop="score"
                :formatter="scoreFomat"
                label="评分">
              </el-table-column>
            <el-table-column
            label="操作"
            v-if="mytask != '全部任务'"
            width="380">
                <template slot-scope="scope">
                    <el-button type="success" class="el-icon-time topBtn" @click="getrecord(scope.row)">&nbsp;&nbsp;记录</el-button>
                    <el-button type="primary" v-show="scope.row.taskStatus != 3" class="el-icon-edit searchBtn" :disabled="scope.row.taskStatus == 2" @click="disposeTask(scope.row,2)">&nbsp;&nbsp;处理</el-button>
                    <el-button  type="primary" class="el-icon-edit searchBtn" :disabled="scope.row.taskStatus == 3" @click="disposeTask(scope.row,3)">&nbsp;&nbsp;处理完成</el-button>
                    <el-button  type="warning" class="el-icon-view tryBtn" :disabled="isseek" @click="getdetail(scope.row)">&nbsp;&nbsp;查看</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
        </el-pagination>

        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary cancleBtn" @click="dialogVisible = false">关 闭</el-button>
            <!-- <el-button class="cancleBtn" @click="dialogVisible = false">取 消</el-button>
            <el-button class="passBtn" @click="dialogVisible = false">确 定</el-button> -->
        </span>
    </el-dialog>


    <!-- 查看 -->
    <el-dialog
        title="查看任务详情"
        :visible.sync="dialogVisible1"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="30%">
        <span>
            <div class="content">
                <p>
                    <span>任务名称：</span>
                    <span>{{seekName}}</span>
                </p>
                <p>
                    <span>任务内容：</span>
                    <textarea v-model="seekContent" readonly style="resize: none"></textarea>
                </p>
            </div>
        </span>
        <span slot="footer" class="dialog-footer">
            <!-- <el-button class="el-icon-edit searchBtn" @click="">处理</el-button> -->
            <!-- <el-button type="primary cancleBtn" @click="disposeTasks(seektaskId,2)">处理</el-button> -->
            <!-- <el-button class="el-icon-edit topBtn" type="success" @click="disposeTasks(seektaskId,3)">处理完成</el-button> -->
            <el-button type="primary" class="cancleBtn" @click="dialogVisible1 = false">关 闭</el-button>
        </span>
    </el-dialog>

     <!-- 任务操作记录 -->
    <el-dialog
      title="任务操作记录"
      :visible.sync="DialogVisible3"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="40%"
      class="dialog create">
      <span class="taskhandle">
          <el-table
          :data="taskhandle" border  style="width: 100%"
            class="tables"  height="4rem" append-to-body>
          <el-table-column
            show-overflow-tooltip
            type="index"
            width="80"
            label="编号">
          </el-table-column>
          <el-table-column
          show-overflow-tooltip
            prop="taskName"
            label="任务名称">
          </el-table-column>
           <el-table-column
           show-overflow-tooltip
            prop="description"
            label="操作说明">
          </el-table-column>
          <el-table-column
           show-overflow-tooltip
            prop="handlerTime"
            label="操作时间">
          </el-table-column>
          <el-table-column
          show-overflow-tooltip
            prop="user.trueName"
            label="操作人员">
          </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :current-page="currentPage1"
            :page-sizes="[10, 20, 30]"
            :page-size="pageSize1"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount1">
          </el-pagination>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary cancleBtn" @click="DialogVisible3 = false">关 闭</el-button>
        <!-- <el-button class="cancleBtn" @click="DialogVisible3 = false">取 消</el-button> -->
        <!-- <el-button class="passBtn" @click="DialogVisible3 = false">确 定</el-button> -->
      </span>
    </el-dialog>
  <taskflow :isflow="isflow" :dataCaseInfo="dataCaseInfo" @childbyflow ='childbyflow'></taskflow>
  </div>
</template>

<script>
import taskflow from './taskflow'
import { mapMutations, mapState,mapGetters } from 'vuex'  //引入vuex
export default {
  data () {
    return {
        dialogVisible:false,
        dialogVisible1:false,
        DialogVisible3:false,
        mytask:'我的任务',  //我的任务  全部任务
        tableData:[],
        currentPage:1,
        pageSize:10,
        totalCount:0,
        currentPage1:1,
        pageSize1:10,
        totalCount1:100,
        taskName:'我的任务',
        taskhandle:[],
        isseek:false,
        isflow:false,
        seekName:'',
        seekContent:'',
        seekstatus:'',
        seektaskId:'',
        keyword:'',
        showNoImg: false,
    }
  },
  components: {
    taskflow
   },
  watch:{
      isPersonMan(val){
        this.dialogVisible = val
      }
  },
 computed:{
    ...mapGetters([
      'scottaskName'
    ]),
  },
  // props:{
  //     isPersonMan:{
  //       type:Boolean
  //     },
  //     dataCaseInfo:{
  //       type:Object
  //     }
  // },
  props:['isPersonMan','dataCaseInfo'],
  methods:{
    childbyflow(val){
      this.isflow = val
    },
     scoreFomat(row, column,cellValue){
      if(row.score == null){
        return 0
      }
      else{
        return cellValue
      }
    },
    //过滤
    taskStatus(row, column,cellValue) {
      if (cellValue === 1){
          return '未处理';
      }else if (cellValue === 2){
          return '已处理';
      }else if (cellValue === 3){
          return '已完成';
      }else if (cellValue === 4){
          return '已撤销';
      }
    },
      closeDia(){
        this.currentPage = 1
        this.currentPage1 = 1
        this.pageSize = 10
        this.$emit("childByOpen",false)
      },
      handleSizeChange(val){
        this.pageSize = val
        this.searchQuery()
      },
      handleCurrentChange(val){
        this.currentPage = val;
        this.searchQuery()
      },
      openperMan(){
        this.$nextTick(()=>{
          if(this.$route.query.showtask){
            this.keyword = this.$route.query.scotName
            this.currentPage = 1
          }else{
            this.keyword = ''
            this.currentPage = 1
          }
          this.userId =  this.$storage.getSession('userInfo').userId;
          this.mytask = '我的任务'
          this.searchQuery();
        })


      },
      //查询任务列表
      searchQuery(){
        if(this.keyword != '' && this.keyword != null){
          this.currentPage = 1
        }
        let data = {
        caseUuid:this.$route.query.caseUuid,
        handler:'',
        userId:this.userId,
        keyword:this.keyword ,  // 关键字    string     非必填
        pageNum:this.currentPage , //当前页  int
        pageSize:this.pageSize , //当前页结果数量  int
        orderBy:'begin_time'  ,//排序字段  string    非必填
        orderType:'asc',  //排序方式   string  非必填
        }
        data = this.$qs.stringify(data)
        this.$http.post('pca/synergytask/getConTaskPage',data).then(res=>{
          this.tableData = res.data.data.list
          if(!this.tableData.length){
            this.showNoImg = true
          }
          this.totalCount = res.data.data.totalCount
          // this.keyword = ''
        })
      },
      //详情
      getdetail(row){
        this.dialogVisible1 = true
        console.log(row,66);
        this.seekName = row.taskName
        this.seekContent = row.taskContent
        this.seektaskId = row.taskId
      },
      getrecord(row){
        this.taskId = row.taskId
        this.DialogVisible3 = true
        this.Taskrecord();
      },
       //任务操作记录
      Taskrecord(){
        let data ={
          taskId:this.taskId,
          caseUuid:this.caseUuid,
          pageNum:this.currentPage1,
          pageSize:this.pageSize1
        }
        data = this.$qs.stringify(data)
        this.$http.post('pca/synergytasklog/selectTaskloggerPage',data).then(res=>{
          if(res.data.code == 200){
            console.log(res,22255);
            this.taskhandle = res.data.data.list
            this.totalCount1 = res.data.data.totalCount
          }
        })
      },
       handleSizeChange1(val){
          this.pageSize1 = val;
          this.Taskrecord();
        },
        handleCurrentChange1(val){
          this.currentPage1 = val;
          this.Taskrecord();
        },
      //切换任务
      checkTask(val){
          this.currentPage = 1
          if(val == '我的任务'){
            this.taskName = val
            let userInfo =JSON.parse(sessionStorage.getItem('userInfo'));
            let userId = userInfo.value.userId;
            this.userId = userId
            this.isseek=false
            this.searchQuery()
          }
          else if(val =='全部任务'){
            this.userId = '';
            this.taskName = val;
            this.isseek=true;
            console.log(2222);
            this.searchQuery();
          }
      },
      //处理任务
      disposeTask(row,num){
        console.log(row);
        let data = {
          taskId:row.taskId,
          taskStatus:num
        }
        data = this.$qs.stringify(data)
        this.$http.post('pca/synergytask/cancleContask',data).then(res=>{
          if(res.data.code == 200){
            this.searchQuery();
          }
        })
      },

      disposeTasks(row,num){
        this.dialogVisible1 = false
        let data = {
          taskId:row,
          taskStatus:num
        }
        data = this.$qs.stringify(data)
        this.$http.post('pca/synergytask/cancleContask',data).then(res=>{
          if(res.data.code == 200){
            this.searchQuery();
          }
        })
      },
  }
}
</script>


<style lang="scss" scoped>
@import '../../../assets/css/commom.css';
.el-dialog__wrapper /deep/ .el-dialog__header{
    background-color: #f3f6f8;
}
.el-dialog__wrapper /deep/ .el-dialog__footer{
    /* text-align: center; */
    border-top: 1px solid #d5dade;
}
.el-dialog__wrapper /deep/ .el-dialog__body{
    padding: 0.1rem 0.2rem;
}
.relation_top{
    display: flex;
    justify-content: space-between;
    margin: 0.05rem 0;
}
.el-radio-group /deep/ .el-radio-button__inner{
     padding: 0.1rem 0.2rem;
}
.modelPartTitle {
  width: 70%;
  height: 0.35rem;
  display: flex;
}
.titleLine{
  width: 2px;
  height:0.14rem;
  background-color:#fff;
  margin-right: 0.1rem;
  margin-top: 4px;
}
.titleTxt{
  color:#fff;font-size: 0.14rem;
}
.rela_last .el-button{
    padding: 0 0.1rem;
    height: 0.3rem;
    font-size: 0.14rem;
}
.rela_last{
    position: relative;
}
.rela_last input{
    width: 2rem;
    padding-left: 0.1rem;
    line-height: 0.28rem;
    border: 1px solid #d3d5dc;
    border-radius: 2px;
    margin-right: 0.6rem;
}
.rela_last i{
  position: absolute;
  width: 0.3rem;
  height:0.3rem;
  line-height: 0.3rem;
  text-align: center;
  background-color: #409eff;
  color: #fff;
  left: 2rem;
  margin-left: 0.05rem;
  border-radius: 2px;
}
.el-table /deep/ th{
    background-color:#e9eef1;
}
.el-table /deep/ td, .el-table /deep/ th{
    text-align: center;
}
.el-table /deep/ td{
    padding: 0.08rem 0;
}
.el-table--border{
    /* border: 1px solid #d3d4d9; */
    @include border('border1');
}
.el-table--border /deep/ th,
.el-table--border /deep/ td{
    border-right: 1px solid #d3d4d9;
    border-bottom: 1px solid #d3d4d9;
}
.el-table /deep/ .el-button{
    padding: 0.05rem 0.1rem;
    font-size: 0.14rem;
}
.el-pagination{
    text-align: right;
    margin-top: 0.1rem;
}
.content{
  width: 100%;
  height: 2.5rem;
  border: 1px solid rgba(15, 44, 79, 0.5);

}
.content p span{
  display: inline-block;
  padding: 0.1rem;
  font-size: 0.16rem;
  color: #99c9fa ;
}
.content p span:first-child{
  width: 1rem;
  text-align: right;
}
.content p span:last-child{
  padding: 0;
}
textarea{
  width: calc(100% - 1.5rem);
  /* width: 1rem; */
  height: 1rem;
  vertical-align: text-top;
  border: 0px solid #000;
}
 .taskrelation /deep/ .el-radio-button__inner{
    // background-color: #142942;
    @include background_color('background_partner1');
    color:#99c9fa ;
    border:none
 }
.taskrelation /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner{
    background-color: #112439;
    color: #2e93fb;
    border:none;
    box-shadow: 0px 0 0 0 #409EFF;
    position:relative
}
.taskrelation /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner::after{
  content:'';
  width: 100%;
  height:2px;
 background:#277ace;
 position:absolute;
 top:0;
 left:0
}
 .taskMange /deep/ .el-pagination .btn-prev{
    @include background_color('background_transpart');
    @include font_color('font_main_color');
   border-radius: 3px
 }
 .taskMange /deep/ .el-pagination .btn-next{
    @include background_color('background_transpart');
    @include font_color('font_main_color');
   border-radius: 3px
 }
 .taskMange /deep/ .el-pager li{
    @include background_color('background_transpart');
    @include font_color('font_main_color');

 }
 .taskMange /deep/ .el-pager li.active {
    color: #409EFF;
    cursor: default;
}
.dialog-footer .passBtn{
  height:0.32rem
}
</style>
