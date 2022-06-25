<template>
  <div class="collent">
    <div class="top" id="top">
      <p>|&nbsp;&nbsp;未完成任务列表</p>
      <el-row>
        <el-col :span="2"><el-button type="primary" icon="el-icon-plus" @click="gotoNewtask">新增任务</el-button></el-col>
        <el-col :span="4" class="taskname">任务名称：<el-input v-model="TaskNames" placeholder="请输入内容"></el-input> </el-col>
        <el-col :span="4">
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
        <el-col :span="4">
          任务状态：
          <el-select v-model="taskstatus" placeholder="请选择任务状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="7">
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
    </div>
    <div class="nocoll">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="5.1rem"
        @sort-change="getsort"
        id="tables">
        <el-table-column
          label="编号"
          width="60">
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="任务名称"
          show-overflow-tooltip
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
          label="任务类型"
          sortable="custom"
          :formatter="formatasktype">
        </el-table-column>
        <!-- <el-table-column
          prop="beginTime"
          label="开始时间">
        </el-table-column> -->
        <el-table-column
          prop="commitTime"
          sortable="custom"
          show-overflow-tooltip
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="commitUser"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="status"
          sortable="custom"
          :formatter="formatStatus"
          label="任务状态">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
          width="450">
          <template slot-scope="scope" class="scopetype">
            <el-button type="primary" :disabled="isdisableBegin[scope.$index]" @click="beginTask(scope.row)"><img src="@/assets/images/videoCombat/begin.png" alt="">&nbsp;&nbsp;开始</el-button>
            <el-button type="success" :disabled="isdisableTop[scope.$index]" @click="getstick(scope.row)"><img src="../../../assets/images/videoCombat/Stick.png" alt="">&nbsp;&nbsp;置顶</el-button>
            <el-button type="primary" :disabled="isdisableSuspend[scope.$index]" @click="suspend(scope.$index,scope.row)"><img src="../../../assets/images/videoCombat/suspend.png" alt="">&nbsp;&nbsp;暂停</el-button>
            <el-button type="danger" :disabled="isdisabledCancel[scope.$index]"  @click="cancel(scope.row)"><img src="../../../assets/images/videoCombat/cancel.png" alt="">&nbsp;&nbsp;取消</el-button>
          </template>
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


    <!-- 任务详情的页面结构化 -->
    <el-dialog
      title="结构化任务详情"
      :visible.sync="dialogVisible"
      width="40%"
      class="dialog">
      <div>
        <div class="diabtn">
          <p>|&nbsp;&nbsp;录像处理列表</p>
          <el-table
            :data="videoproce"
            border
            height="3rem"
            @row-click="clickStuc"
            style="width: 100%">
            <el-table-column
              label="编号">
              <template slot-scope="scope">
                <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="任务名称">
              <template slot-scope="scope">
                {{DetailList.taskName}}
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
               prop="fileUrl"
              :formatter="names"
              label="视频名称">
            </el-table-column>
            <el-table-column
              prop="nprogress"
              label="进度">
              <template slot-scope="scope">
                <el-progress :text-inside="true" :stroke-width="18" :percentage="parseInt(scope.row.progress)" status="exception"></el-progress>
              </template>
            </el-table-column>
            <el-table-column
              label="状态">
              <template slot-scope="scope">
                {{DetailList.status | status }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>


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
            <span class="titleColor">清晰度：{{clarity | targetqxd}}</span>&nbsp;&nbsp;&nbsp;
            <span class="titleColor">检索方式：{{type | retrimodel}}</span>
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
  data() {
    return {
      dialogVisible: false,
      dialogVisible1:false,
      tableData: [],
      videoproce: [], //结构化视频
      videoProse:[],//检索视频
      currentPage: 1, // 当前页码
      pageSize: 10, //每页显示的条数
      totalCount: 0, //数据总条数
      orderBy: "commitTime",
      orderType: "desc",
      options: [
        {value: "",label: "全部"},
        {value: "1",label: "执行中"},
        {value: "2",label: "暂停"},
        {value: "3",label: "排队"},
        {value: "9",label: "取消"}
      ],
      options1: [
        {value: "",label: "全部"},
        {value: "0",label: "视频检索"},
        {value: "1",label: "视频结构化"},
        {value: "2",label: "态势感知"}
      ],
      tasktype: "", //任务类型
      taskstatus: "", //任务状态
      TaskNames: "", //任务名称
      name:'',    //人物名称
      DetailList: '',  //任务详情
      DetailList2:'',
      size:1,
      type:1,
      clarity:1,
      t:'',
      isdisableBegin:[],
      isdisableTop:[],
      isdisableSuspend:[],
      isdisabledCancel:[],
      flag:null,  //是否是流
      fileUrl:'',
      fileName:'',
      isOpenDetail:false,
      detailist:{},


    };
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
  watch: {

  },
  created() {

  },
  mixins: [beginEnd],
  mounted () {
    this.OpenTheTime();
    this.queryData();
    this.t = setInterval(()=>{
        if(this.$router.currentRoute.path == "/videoCombat/taskMan/nocolleted" ){
          this.queryData();
        }else{
          clearTimeout(this.t);
        }
      },3000);
  },
  components:{
    detailRetervals
  },
  methods: {
    childByDetail(val){
       this.isOpenDetail = val
     },
    names(row,column,val){
      var index = val.lastIndexOf("\/");
      val = val.substring(index + 1, val.length);
      return val
    },
    //状态码判断
    formatStatus(row, column, cellValue) {
      if (cellValue === 1){
          return '执行中';
      }else if (cellValue === 2){
          return '暂停';
      }else if (cellValue === 3){
          return '排队';
      }else if (cellValue === 9){
          return '取消';
      }
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
    //监听排序
    getsort(obj){
      this.orderBy = obj.prop;
      this.orderType = obj.order == "descending" ? "desc" : "asc";
      this.queryData();
    },
    //开始任务
    beginTask(row,e) {
      let data = {
        id: row.taskUuid
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/task/start", data).then(res => {
        if (res.data.code == 200) {
          this.queryData()
        }
      });
    },
    //置顶
    getstick(row) {
      let data = {
        id: row.taskUuid
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/task/top", data).then(res => {
        if(res.data.code == 200){
          this.queryData()
        }
      });
    },
    //暂停
    suspend(index,row){
      let data = {
        id: row.taskUuid
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/task/pause", data).then(res => {
        if (res.data.code == 200) {
          this.queryData()
        }
      });
    },
    //取消
    cancel(row) {
      let data = {
        id: row.taskUuid
      };
      data = this.$qs.stringify(data);
      this.$http.post("vsas/task/cancel", data).then(res => {
        if (res.data.code == 200) {
          this.queryData()
        }
      });
    },
    //任务名称
    opdioag(index,row) {
      console.log(row,666);
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
          //结构化
          else if(res.data.data.type == 1 && res.data.data.taskStructural.type == 2){
            this.DetailList = res.data.data
            this.dialogVisible = true;
            this.videoproce = res.data.data.taskFiles
          }
          //结构化在线
          else if(res.data.data.type == 1 && res.data.data.taskStructural.type == 1){
            let uuid = res.data.data.taskStructural.uuid
            let taskUuid = res.data.data.taskStructural.taskUuid
            this.$router.push({path:'/videoCombat/videomonitor',query:{menuCode:'103',uuid:uuid,taskUuid:taskUuid}})
          }
        }
      });
    },
    //详情页面table点击  结构化
    clickStuc(row){
      this.$router.push({path:'/videoCombat/detaukStruc',query:{menuCode:'108',id:row.taskUuid}})
    },
    // //检索
    // clickTerval(row,name,caseUuid){
    //   console.log(row);
    //   this.$router.push({path:'/videoCombat/DetailReterval',query:{menuCode:'108',id:row,name:name,caseUuid:caseUuid}})
    // },
    clickTerval(row){
      sessionStorage.setItem('imgurl', '');
      this.isOpenDetail= true
      this.detailist = row
       //  OnCaseInit();
    },
    //跳转首页
    gotoNewtask() {
      // this.$router.push('/videocombat/taskMan/newtask');
      this.$router.push({
        path: "/videoCombat/taskMan/newtask",
        query: { menuCode: "108" }
      });
    },
    // 监听每页条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.queryData();
    },
    // 监听当前页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryData();
    },
    //查询数据
    queryData() {
      let userId = this.$storage.getSession("userInfo").userId
      let data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        orderBy: this.orderBy,
        orderType: this.orderType,
        commitUser: userId,
        taskName: this.TaskNames,
        type: this.tasktype, //任务类型
        status: this.taskstatus, //任务状态
        begin: this.beginTime,
        end: this.endTime,
        caseUuid:'',
        deviceid:''
      };
      this.$http.get("vsas/task/list", {params: data}).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data.list;
          this.totalCount = res.data.data.totalCount;
          var status = []
          for (let i = 0; i < this.tableData.length; i++) {
            let status = this.tableData[i].status;
            if(status == 3){  //排队
              this.isdisableBegin[i] = true;  //开始
              this.isdisableTop[i] = false;    //置顶
              this.isdisableSuspend[i] = false;  //暂停
              this.isdisabledCancel[i] = false;  //取消
            }
            else if(status == 1){  //执行中
              this.isdisableBegin[i] = true;  //开始
              this.isdisableTop[i] = true;    //置顶
              this.isdisableSuspend[i] = false;  //暂停
              this.isdisabledCancel[i] = false;  //取消
            }
            else if(status == 2){  //暂停
              this.isdisableBegin[i] = false;  //开始
              this.isdisableTop[i] = true;    //置顶
              this.isdisableSuspend[i] = true;  //暂停
              this.isdisabledCancel[i] = true;  //取消
            }
            else if(status == 9){ //取消
              this.isdisableBegin[i] = false;  //开始
              this.isdisableTop[i] = true;    //置顶
              this.isdisableSuspend[i] = true;  //暂停
              this.isdisabledCancel[i] = true;  //取消
            }
          }
        }
      });

    },
    //重置
    reset(){
      this.TaskNames = ''
      this.endTime = ''
      this.beginTime = ''
      this.tasktype = "" //任务类型
      this.taskstatus=""//任务状态
      this.queryData()
    }

  }
};
</script>





<style scoped>
@import "../../../assets/css/commom.css";

.nocoll /deep/ .el-table th,
.dialog /deep/ .el-table th {
  padding: 0.1rem 0;
  text-align: center;
}
.el-button {
  padding: 0.05rem 0.15rem;
}
.row-bg {
  margin-top: 0.1rem;
}
.nocoll >>> .el-table__body-wrapper .cell span {
  font-size: 0.14rem;
}
.dialog /deep/ .el-progress-bar__outer {
  height: 0.2rem !important;
}
.styles {
  color: #4b9de8;
  cursor: pointer;
  text-decoration: underline;
}
.top,
.dialog >>> .el-radio__label {
  font-size: 0.14rem;
}
.dialog p {
  color: #4b9de8;
  font-size: 0.14rem;
}


.top >>> .el-row .el-col .el-input__inner {
  height: 0.4rem !important;
  padding: 0 0.15rem;
  font-size: 0.14rem;
}
.top p {
  font-size: 0.18rem;
  padding: 0.2rem 0;
  color: #4b9de8;
}
.top .el-button {
  padding: 0.1rem 0.2rem;
  font-size: 0.14rem;
}
.top .el-select,
.taskname > div {
  width: 1.8rem;
}
.top .el-range-editor.el-input__inner {
  width: 5rem;
}
.top >>> .el-date-editor .el-range__icon,
.top >>> .el-date-editor .el-range-separator {
  font-size: 0.14rem;
  line-height: 0.35rem;
}
.taskname {
  line-height: 0.4rem;
  display: flex;
  padding: 0 0.1rem;
}
.nocoll {
  margin-top: 0.2rem;
}
.el-row >>> .el-col-7{
  line-height: 0.4rem;
}
.el-row >>> .el-col-7 input{
  height: 0.4rem;
  background-color: rgba(0, 0, 0, 0.2) !important;
  border: 1px solid #2A2D30 !important;
  color: #c5c5c5 !important;
  padding:0 0.1rem;
  border-radius: 5px;
  width: 1.7rem;
}
.el-row >>> .el-col-3{
  text-align: center;

}





</style>



