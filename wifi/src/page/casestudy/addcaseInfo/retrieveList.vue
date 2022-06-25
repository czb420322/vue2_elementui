<template>
  <div class="taskMange">
    <el-dialog
        title="任务管理"
        :visible.sync="dialogVisible"
        @close="closeDia"
        @open="quertList"
        width="70%">
        <span class="taskrelation">
        <el-radio-group v-model="mytask" @change="checkTask">
          <el-radio-button label="未完成任务"></el-radio-button>
          <el-radio-button label="已完成任务"></el-radio-button>
        </el-radio-group>
        <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="4.78rem"
        id="tables">
        <div slot="empty">
            <div class="noImg">
              <img src="../../../assets/updataImg/NoData.png" />
            </div>
          </div>
        <el-table-column
          label="序号"
          type="index"
          width="60">
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
          show-overflow-tooltip
          prop="caseName"
          label="案件名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="任务类型"
          :formatter="formatasktype">
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

        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false"></el-button>
            <el-button @click="dialogVisible = false"></el-button>
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
            大小：<span>{{size | targetsize}}</span>&nbsp;&nbsp;&nbsp;
            清晰度：<span>{{clarity | targetqxd}}</span>&nbsp;&nbsp;&nbsp;
            检索方式：<span>{{type | retrimodel}}</span>
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
              prop="nprogress"
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
        <el-button type="primary" @click="dialogVisible1 = false" class="cancleBtn">取 消</el-button>
        <el-button type="primary" @click="clickTerval(DetailList2)" class="passBtn">详 情</el-button>
      </span>
    </el-dialog>





  </div>
</template>

<script>
import detailRetervals from '../../videoCombat/detailRetervals'


export default {
  data () {
    return {
        dialogVisible:false,
        dialogVisible1:false,
        tableData:[],
        currentPage:1,
        pageSize:10,
        totalCount:0,
        size:1,
        type:1,
        clarity:1,
        videoProse:[],
        DetailList2:'',
        mytask:'未完成任务',
        isOpenDetail:false,
        detailist:{}
    }
  },
  filters: {
    status(val){
      if (val == 1){
            return '执行中';
        }else if (val == 2){
            return '暂停';
        }else if (val == 3){
            return '排队';
        }else if (val == 9){
            return '取消';
        }else if(val ==0){
          return '已完成'
        }
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
  watch:{
      isretriev(val){
        this.dialogVisible = val
      }
  },
  props:{
      isretriev:Boolean,
      deviceid:String
  },
  created () {
    this.quertList();
  },
  methods:{
    childByDetail(val){
       this.isOpenDetail = val
     },
      checkTask(val){
          if(val == '未完成任务'){
            this.quertList();
          }
          else if(val =='已完成任务'){
            this.quertListOK();
          }
      },
      //状态码判断
      formatStatus(row, column, cellValue) {
        if (cellValue == 1){
            return '执行中';
        }else if (cellValue == 2){
            return '暂停';
        }else if (cellValue == 3){
            return '排队';
        }else if (cellValue == 9){
            return '取消';
        }else if (cellValue == 10){
            return '失败';
        }else if (cellValue == 0){
            return '已完成';
        }
      },
      //状态码判断
      formatasktype(row,column,cellVlaue){
        if (cellVlaue === 0){
            return '视频检索';
        }else if (cellVlaue === 1){
            return '视频结构化';
        }
      },
      names(row,column,val){
        var index = val.lastIndexOf("\/");
        val = val.substring(index + 1, val.length);
        return val
      },
      closeDia(){
        this.$emit("childByRetri",false)
      },
      handleSizeChange(val){
        this.pageSize = val;
         if(val == '未完成任务'){
            this.quertList();
          }
          else if(val =='已完成任务'){
            this.quertListOK();
          }
      },
      handleCurrentChange(val){
        this.currentPage = val;
         if(val == '未完成任务'){
            this.quertList();
          }
          else if(val =='已完成任务'){
            this.quertListOK();
          }
      },
      // 未完成
      quertList(){
        this.mytask= '未完成任务';
         this.$http.get("vsas/task/pcaList?statusl=1,2,3,9,10&deviceId="+this.deviceid+'&caseUuid='+this.$route.query.caseUuid).then(res=>{
           if(res.data.code== 200){
             this.tableData = res.data.data.list
             this.totalCount = res.data.data.totalCount
           }
         })
      },
      // 完成
      quertListOK(){
         this.$http.get("vsas/task/pcaList?status=0&deviceId="+this.deviceid+'&caseUuid='+this.$route.query.caseUuid).then(res=>{
           if(res.data.code== 200){
             console.log(res,999);
             this.tableData = res.data.data.list
             this.totalCount = res.data.data.totalCount
           }
         })
      },
      opdioag(index,row){
        this.dialogVisible1 = true
        this.loading = this.$loading({
          lock: true,
          background: "rgba(255,255,255,0.4)",
          text: "加载中"
        });
        this.$http.get("vsas/task/detail?taskUuid="+row.taskUuid).then(res => {
          this.loading.close();
          if (res.data.code == 200) {
              this.dialogVisible1 = true
              this.DetailList2 = res.data.data
              this.videoProse = res.data.data.taskFiles
              this.size = res.data.data.taskSearch.size
              this.clarity = res.data.data.taskSearch.clarity
              this.type = res.data.data.taskSearch.type
          }
        });
      },
     //检索
      clickTerval(row){
        sessionStorage.setItem('imgurl', '');
        this.isOpenDetail= true
        this.detailist = row
        //  OnCaseInit();
      },
  }
}
</script>


<style scoped>
@import '../../../assets/css/commom.css';

.el-radio-group >>> .el-radio-button{
  background: url('../../../assets/images/videoNewImg/btnhover.png') no-repeat center center / 100% 100%;
}
.el-radio-group >>> .el-radio-button__inner{
    background-color: transparent;
    border-color: transparent;
}
.el-radio-group >>> .el-radio-button__inner{
  background: transparent;
  color: #99c9fa;
}
.el-radio-group >>> .el-radio-button__orig-radio:checked+.el-radio-button__inner{
  background-color: transparent;
  color: #2e93fb;
  box-shadow: 0 0 0;
  border-color:transparent;
}
.el-radio-group >>> .el-radio-button:first-child .el-radio-button__inner{
  border-left: 0px solid #dcdfe6;
}
.diatop,.diabtn{
  color: #99c9fa;
}
.el-pagination{
    text-align: right;
    margin-top: 0.1rem;
}
.styles {
  color: #4b9de8;
  cursor: pointer;
  text-decoration: underline;
}
.el-radio-group{
  margin-bottom: 0.1rem;
}
</style>
