<template>
  <div class="collent">
    <div class="top">
      <p>|&nbsp;&nbsp;已完成任务列表</p>
    </div>
    <div class="coll">
      <el-row class="search">
        <el-col :span="6" class="taskname">任务名称：<el-input v-model="taskname" placeholder="请输入内容"></el-input> </el-col>
        <el-col :span="5">
          任务类型：
          <el-select v-model="tasktype" placeholder="请选择任务类型">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
            开始时间：
            <input type="text" id="text1" v-model="beginTime" placeholder="请输入开始时间：">
            结束时间：
            <input type="text" id="text2" v-model="endTime" placeholder="请输入结束时间：">
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="queryData" icon="el-icon-search">查询</el-button>
          <el-button type="warning" @click="reset" icon="el-icon-refresh">重置</el-button>
        </el-col>
      </el-row>

      <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="4rem">
        <el-table-column
          prop="taskId"
          label="编号"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="taskname"
          show-overflow-tooltip
          label="任务名称"
          width="150">
           <template slot-scope="scope">
            <span class="styles" @click="opdioag(scope.$index,scope.row)">{{scope.row.taskName}}</span>
          </template>
        </el-table-column>
         <el-table-column
          prop="caseName"
          label="案件名称">
        </el-table-column>
        <el-table-column
          prop="type"
           :formatter="formatasktype"
          label="任务类型">
        </el-table-column>
        <el-table-column
          prop="commitTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="commitUser"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="status"
          :formatter="formatStatus"
          label="任务状态">
        </el-table-column>
      </el-table>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30]"
            :page-size="pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
        </el-col>
      </el-row>
    </div>


     <!-- 任务详情检索 -->
    <el-dialog
      title="检索任务详情"
      :visible.sync="dialogVisible1"
      width="40%"
      class="dialog">
      <div>
        <div class="diatop">
          <div>
            <p>|&nbsp;&nbsp;分析规则设置</p>
           <span class="titleColor"> 大小：{{size | targetsize}}</span>&nbsp;&nbsp;&nbsp;
           <span class="titleColor"> 清晰度：{{clarity | targetqxd}}</span>&nbsp;&nbsp;&nbsp;
           <span class="titleColor"> 检索方式：{{type | retrimodel}}</span>
          </div>
        </div>
        <div class="diabtn">
          <p>|&nbsp;&nbsp;录像处理列表</p>
          <el-table
            :data="videoProse"
            border
            height="3rem"
            style="width: 100%">
            <el-table-column
              label="编号">
              <template slot-scope="scope">
                <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="任务名称">
              <template slot-scope="scope">
                {{DetailList2.taskName}}
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="fileUrl"
              :formatter="names"
              label="视频名称">
            </el-table-column>
            <el-table-column
              label="进度">
              <template slot-scope="scope">
                <el-progress :text-inside="true" :stroke-width="18" :percentage="parseInt(scope.row.progress)" status="exception"></el-progress>
              </template>
            </el-table-column>
            <el-table-column
              label="状态">
              <template slot-scope="scope">
                {{DetailList2.status | status }}
              </template>
            </el-table-column>
          </el-table>
          <detailRetervals :isOpenDetail="isOpenDetail" :detailist="detailist" @childByDetail="childByDetail"></detailRetervals>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="clickTerval(DetailList2)">详情</el-button>
        <!-- <el-button @click="dialogVisible1 = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
      </span>
    </el-dialog>



  </div>
</template>

<script>
import detailRetervals from '../detailRetervals'
import beginEnd from '../../../api/realvideo/BenEedTime.js'

 export default {
   data () {
      return {
        tableData:[],
        dialogVisible1:false,
        currentPage:1, // 当前页码
        pageSize: 10, //每页显示的条数
        totalCount:0, //数据总条数
        percentage:0,
        size:1,
        type:1,
        clarity:1,
        options1: [
          {value: "",label: "全部"},
          {value: "1",label: "视频结构化"},
          {value: "0",label: "视频检索"},
          {value: "2",label: "态势感知"}],
        tasktype: "",  //任务类型
        taskname:'',  //任务名称
        videoProse:[],
        DetailList2:'',
        isOpenDetail:false,
        detailist:{},
        t:null,  //刷新定时器
     }
   },
   watch: {

    },
    mixins:[beginEnd],
    mounted() {
      this.queryData();
      this.OpenTheTime();
    },
    filters: {
      //状态
      status(val){
        if(val == 1){
          val = '执行中'
        }
        if(val == 0){
          val = '已完成'
        }
        else if(val == 2){
          val = '暂停'
        }
        else if(val == 3){
          val = '排队'
        }
        else if(val == 9){
          val = '取消'
        }
        return val
      },
      retrimodel(val){
        if(val == 1){
          val = '区域'
        }
        else if(val == 2){
          val = '跨线'
        }
        else if(val == 3){
          val = '方向'
        }
        return val
      },
      targetsize(val){
        if(val == 1){
          val = '大'
        }
        else if(val == 2){
          val = '中'
        }
        else if(val == 3){
          val = '小'
        }
        return val
      },
      targetqxd(val){
        if(val == 1){
          val = '清晰'
        }
        else if(val == 2){
          val = '较清晰'
        }
        else if(val == 3){
          val = '模糊'
        }
        else if(val == 4){
          val = '较模糊'
        }
        return val
      },

    },
    components:{
      detailRetervals
    },
   methods:{
     childByDetail(val){
       this.isOpenDetail = val
     },
      names(row,column,val){
        var index = val.lastIndexOf("\/");
        val = val.substring(index + 1, val.length);
        return val
      },
      formatasktype(row,column,cellVlaue){
      if (cellVlaue === 0){
          return '视频检索';
      }else if (cellVlaue === 1){
          return '视频结构化';
      }else if (cellVlaue === 2){
          return '态势感知';
      }
    },
    formatStatus(row,column,cellVlaue){
      if(cellVlaue == 0){
        return '已完成'
      }
    },
     //跳转首页
      gotoNewtask(){
        this.$router.push('/videoCombat/taskMan/newtask');
      },
      // 监听每页条数
      handleSizeChange(val) {
        this.pageSize = val
        this.queryData()
      },
      // 监听当前页码
      handleCurrentChange(val) {
        this.currentPage = val
        this.queryData()
      },
      //获取所有的列表
      queryData(){
        let userId = this.$storage.getSession("userId")
        this.name = this.$storage.getSession("trueName")
        let data = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          orderBy: "commitTime",
          orderType: "desc",
          commitUser: userId,
          taskName: this.taskname,
          type: this.tasktype, //任务类型
          status: 0, //任务状态
          begin: this.beginTime,
          end: this.endTime
        };
        this.$http.get("vsas/task/list", {params: data}).then(res => {
          console.log(res,6666);
          if (res.data.code == 200) {
            console.log(res,8888);
            this.tableData = res.data.data.list
            this.totalCount = res.data.data.totalCount
          }
        });
      },
      //检索
      clickTerval(row){
        console.log(row,6666);
        this.isOpenDetail= true
        this.detailist = row
        //  OnCaseInit();
        //this.$router.push({path:'/videoCombat/DetailReterval',query:{menuCode:'108',id:row,name:name,caseUuid:caseUuid}})
      },
      //重置按钮
      reset(){
        this.taskname = ''
        this.tasktype = ''
        this.beginTime = ''
        this.endTime =''
        this.queryData()
      },
      //任务名称
      opdioag(index,row) {
        this.$http.get("vsas/task/detail?taskUuid="+row.taskUuid).then(res => {
          console.log(res,666);
          if (res.data.code == 200) {
            //检索
            if(res.data.data.type == 0){
              this.dialogVisible1 = true
              this.DetailList2 = res.data.data
              this.videoProse = res.data.data.taskFiles
              this.size = res.data.data.taskSearch.size
              this.clarity = res.data.data.taskSearch.clarity
              this.type = res.data.data.taskSearch.type
            }
            // //结构化
            // else if(res.data.data.type == 1 && res.data.data.taskStructural.type == 2){
            //   this.DetailList = res.data.data
            //   this.dialogVisible = true;
            //   this.videoproce = res.data.data.taskFiles
            // }
            // //结构化在线
            // else if(res.data.data.type == 1 && res.data.data.taskStructural.type == 1){
            //   let uuid = res.data.data.taskStructural.uuid
            //   let taskUuid = res.data.data.taskStructural.taskUuid
            //   this.$router.push({path:'/videocombat/videomonitor',query:{menuCode:'103',uuid:uuid,taskUuid:taskUuid}})
            // }
          }
        });
      },
   }

 }
</script>


<style scoped>
@import "../../../assets/css/commom.css";


  .styles {
    color: #4b9de8;
    cursor: pointer;
    text-decoration: underline;
  }
  .top p{
    font-size: 0.18rem;
    padding: 0.2rem 0;
    color: #4b9de8;
  }
  .coll >>> .el-col{
    font-size: 0.14rem;
  }
  .taskname div{
    width: 60%;
  }
  .coll >>>  .el-input__inner{
    height: 0.4rem;
    font-size: 0.14rem;
    padding: 0 0.15rem;
  }
  .el-select{
    width: 60%;
  }
  .el-button{
    padding: 0.1rem 0.2rem;
    font-size: 0.14rem;
  }
  .el-table{
    margin-top: 0.2rem;
  }
  .el-row--flex{
    margin-top: 0.2rem;
  }
  .coll >>> .el-table td{
    text-align: center;
    padding: 0.05rem 0;
  }
  /* .coll >>> .el-table th {
    background-color: #f3f6f8;
  } */
  .coll >>> .el-table .cell {
    font-size: 0.14rem;
  }
  .coll >>> .el-range-editor.el-input__inner{
    width: 70%;
  }

.coll /deep/ .el-table td,
.dialog /deep/ .el-table td {
  padding: 0.1rem 0;
  text-align: center;
}
.coll /deep/ .el-table th,
.dialog /deep/ .el-table th {
  padding: 0.15rem 0;
  /* background: #f3f6f8; */
  text-align: center;
}
.el-row >>> .el-col-10{
  line-height: 0.4rem;
}
.el-row >>> .el-col-10 input{
  height: 0.4rem;
  background-color: rgba(0, 0, 0, 0.2) !important;
  border: 1px solid #2A2D30 !important;
  color: #c5c5c5 !important;
  padding:0 0.1rem;
  border-radius: 5px;
  width: 1.7rem;
}


</style>


