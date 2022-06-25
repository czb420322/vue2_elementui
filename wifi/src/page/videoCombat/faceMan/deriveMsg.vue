<template>
  <div class="taskMange">
     <el-dialog
        title="查看导出日志"
        :visible.sync="dialogVisible"
        @close="closeDia"
        @open="opendia"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :append-to-body="true"
        width="40%">
        <span class="taskrelation">
          <ul>
            <li v-for="(item,index) in msgList" :key="index">
              <span>{{item.dateTime}}</span>
              <span @click="downzip(item)">{{item.content}}</span>
            </li>
          </ul>
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
          <el-button type="primary cancleBtn" @click="dialogVisible = false">关 闭</el-button>
            <!-- <el-button @click="dialogVisible = false"></el-button>
            <el-button  @click="dialogVisible = false"></el-button> -->
        </span>
    </el-dialog>

  </div>
</template>

<script>

export default {
  data(){
    return{
      dialogVisible:false,
      currentPage:1,
      pageSize:10,
      totalCount:0,
      msgList:[]
    }
  },
  mounted(){

  },
  watch:{
    openDerimsg(val){
      this.dialogVisible = val
    }
  },
  props:{
    openDerimsg:Boolean,
    btnlibInfo:Object
  },
  methods:{
    //关闭模态框
    closeDia(){
      this.$emit('childbydemsg',false)
    },
    //打开模态框
    opendia(){
      console.log(this.btnlibInfo,666);
      // 查看导入日志
      this.getMsg();
    },
    getMsg(){
      let data = {
        dbId:this.btnlibInfo.id,
        pageNum:this.currentPage,
        pageSize:this.pageSize
      }
      this.$http.get('sms/faceExport/showExportLogs',{params:data}).then(res=>{
        if(res.data.code == 200){
          this.msgList = res.data.data.list
          this.totalCount = res.data.data.totalCount
        }
      })
    },
     // 分页
    handleSizeChange(val){
      this.pageSize = val
      this.currentPage = 1;
      this.getMsg();
    },
    handleCurrentChange(val){
      this.currentPage = val
      this.getMsg();
    },
    downzip(row){
      window.open(row.path)
    }
  }

}
</script>


<style scoped>
@import '../../../assets/css/commom.css';
.taskrelation ul{
  overflow: auto;
  color: #99c9fa;
  height: 3.9rem;
}
.taskrelation ul li{
  margin-bottom: 0.15rem;
}
.taskrelation ul li span{
  margin-right: 0.3rem;
}
.taskrelation ul li span:last-child{
  text-decoration: underline;
  cursor: pointer;
}
.el-pagination{
  text-align: right;
  margin-top: 0.15rem;
}

</style>
