<template>
 <div class="downvideo">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      class="tables"
      height="4.4rem">
      <el-table-column
        show-overflow-tooltip
        label="编号">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="originVideoUrl"
        :formatter="names"
        label="视频名称">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="videoProcFlag"
        :formatter="status"
        label="视频状态">
      </el-table-column>
      <el-table-column
        label="操作"
        width="320">
        <template slot-scope="scope">
          <el-button type="danger" class="delBtn" icon="el-icon-delete" @click="deleteVideo(scope.row)" v-show="isNotDel">删除</el-button>
          <el-button   icon="el-icon-download" class="searchBtn"  @click="download(scope.$index)" :disabled="scope.row.videoProcFlag != 2">下载</el-button>
          <el-button type="info"  icon="el-icon-download" class="topBtn" @click="seekPro(scope.row,scope.$index)" :disabled="scope.row.videoProcFlag == 1 || scope.row.videoProcFlag == 2 ||scope.row.videoProcFlag == 3||scope.row.videoProcFlag == 6">查看进度</el-button>
        </template>
      </el-table-column>
    </el-table>
    <form action="sms/uploadFile/download" method="post" v-for="(item,index) in  tableData" :key="index" :id="'a'+index" v-show="false" >
      <input type="text" :value="item.storagePath" name="url">
      <input type="text" :value="item.title" name="filename">
    </form>


    <el-dialog
      title="查看进度"
      :visible.sync="dialogVisible"
      append-to-body
      width="30%">
      <span>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="percent"></el-progress>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">返 回</el-button>
      </span>
    </el-dialog>
 </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      percent:0,
      dialogVisible:false
    };
  },
  props:['caseuuId','isNotDel'],
  created(){
    this.queryList()
  },
  methods:{
    status(row,column,val){
      if(val == 1){
        return '排队中'
      }else if(val == 2){
        return '转码成功'
      }else if(val == 3){
        return '转码失败'
      }else if(val == 4){
        return '转码中'
      }else if(val == 5){
        return '上传中'
      }else if(val == 6){
        return '上传失败'
      }
    },
     names(row,column,val){
        var index = val.lastIndexOf("\/");
        val = val.substring(index + 1, val.length);
        return val
      },

      //删除
      deleteVideo(row){
        let data = {
          videoUuid:row.videoUuid
        }
        data = this.$qs.stringify(data)
        // this.$http.post('vsas/collection/pca/video/del',data)
        this.$http.post('pca/casemng/clue/video/del',data)
        .then(res=>{
          if(res.data.code==200){
            this.$emit('dwonvideo')
            this.queryList();
            this.$notify({
              type: 'success',
              message: '删除成功！',
              position: 'bottom-right',
              duration: 3000
            });
          }else{
             this.$notify({
              type: 'error',
              message: '删除失败，请稍后重试',
              position: 'bottom-right',
              duration: 3000
            });
            // layer.alert('删除失败，请稍后重试',{icon:2,title:"消息提示"})
          }
        })
      },
      //查看进度
      seekPro(row,index){
        console.log(row,666);
        this.dialogVisible = true;
        this.$http.get('vsas/collection/pca/progress?videoUuid='+row.videoUuid).then(res=>{
          if(res.data.code == 200){
            this.percent = Number(res.data.data)
          }
        })
      },

      //下载
      download(index){
        document.getElementById('a'+index).submit();
        // window.location.href = url
      },
      //查询视频列表
      queryList(){
        let data = {
          caseUuid:this.caseuuId
        }
        this.$http.get('pca/casemng/video/list',{params:data}).then(res=>{
          if(res.data.code == 200){
            this.tableData = res.data.data;
            // console.log(this.tableData)
          }else{
             this.$notify({
              type: 'error',
              message: '获取视频列表失败！',
              position: 'bottom-right',
              duration: 3000
            });
            // layer.alert('获取视频列表失败！',{icon:5,title:"消息提示"})
          }
        })
      },
  }
};
</script>

<style scoped>
@import "../../../../src/assets/css/commom.css";
.downvideo {
  /* border: 1px solid #000; */
  height: 5rem;
}
.downvideo .el-button{
  padding: 0.05rem 0.1rem !important;
  margin: 0!important;
}
.downvideo >>> .el-table th{
  /* background-color: #f3f6f8; */
  text-align: center;
}
.downvideo >>> .el-table td{
  text-align: center;
  padding: 0.05rem 0;
}


.el-pagination {
  float: right;
  margin-top: 0.2rem;
  margin-right: 0.2rem;
}
.el-pagination >>> .el-select .el-input .el-input__inner,
.el-pagination >>> .el-pagination__editor.el-input .el-input__inner{
  height: 0.25rem;
}
.el-pagination >>> .el-pagination__sizes .el-input .el-input__inner,
.el-pagination >>> .el-input{
  font-size: 0.13rem;
}
.el-pagination >>> .el-pager,
.el-pagination >>> button:disabled,
.el-pagination >>> .btn-next{
  margin-top: 0.03rem;
}
.el-pagination >>> span:not([class*=suffix]){
  font-size: 0.1rem;
}
</style>
