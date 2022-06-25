<template>
 <div class="sutarget">
    <el-table
      :data="sutargetData"
      border
      style="width: 100%"
      class="tables"
      height="100%"
      >
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        width="150"
        show-overflow-tooltip
        prop="suspicionName"
        label="目标名称">
      </el-table-column>
      <el-table-column
        prop="suspicionType"
        width="80"
        :formatter='formaSuspicionType'
        label="目标类型">
      </el-table-column>
      <el-table-column
        prop="suspicionSex"
        width="80"
        :formatter='formaSuspicionSex'
        label="目标性别">
      </el-table-column>
      <el-table-column
        prop="suspicionPhone"
        label="目标电话">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="suspicionCard"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="suspicionAddress"
        label="地址">
      </el-table-column>
      <el-table-column
        label="操作"
        width="320">
        <template slot-scope="scope">
          <el-button type="success" class="topBtn" icon="el-icon-view" @click="see(scope.row.suspicionUuid)">查看</el-button>
          <el-button type="primary" class="searchBtn" icon="el-icon-edit" @click="edit(scope.row.suspicionUuid)">编辑</el-button>
          <el-button type="danger" class="delBtn" icon="el-icon-delete"  @click="ajaxDel(scope.row.suspicionUuid,scope.row)">删除</el-button>
          <el-button type="warning" class="tryBtn" icon="el-icon-printer" @click="distinguish(scope.row.suspicionUuid,scope.row.suspicionType)" :disabled="scope.row.suspicionType == '2'">特征</el-button>
        </template>
      </el-table-column>
    </el-table>
 </div>

</template>

<script>
export default {
  data() {
    return {
      sutargetData:[],//嫌疑人数据
    };
  },
  created(){
    this.ajaxSutarget()
  },
  components: {

  },
  methods:{
    //嫌疑人列表渲染
    ajaxSutarget(){
      let data = {
        caseUuid:this.$route.query.caseUuid,
      }
      this.$http.get('/pca/casemng/suspicion/list',{params:data})
      .then((res) => {
          this.sutargetData = res.data.data
          console.log('================'+JSON.stringify(this.sutargetData))
      }).catch(err => {

      })
    },
    //查看
    see(id){
      this.$emit('incre',false,true,id,true)
    },
    //编辑
    edit(id){
      this.$emit('incre',false,true,id,false)
    },
    //删除
    ajaxDel(id,obj){
      let data =  {
          suspicionUuid:id
      }
      data = this.$qs.stringify(data);
      this.$http.post('/pca/casemng/suspicion/del',data)
      .then((response) => {
       this.$emit('incre',true,false,id,false,false,'delOk')
       this.ajaxSutarget()
      }).catch((error) => {
        this.$notify({
         type: 'error',
         message: '服务器繁忙，请稍后重试！',
         position: 'bottom-right',
         duration: 3000
       });
        // layer.alert('服务器繁忙，请稍后重试!',{icon:7,title:"消息提示"});
      });
    },
    distinguish(id,type){
       this.$emit('incre',false,false,id,false,true,'',type)
    },
    //过滤table数据
    formaSuspicionSex(row, column,cellValue){
        if (cellValue == 0){
            return '男';
        }else if (cellValue == 1){
            return '女';
        }
    },
    formaSuspicionType(row, column,cellValue){
      if (cellValue == 1){
            return '人';
      }else if (cellValue == 2){
          return '骑车人';
      }else if (cellValue == 3){
          return '车辆';
      }
    },
  }
};
</script>

<style scoped>
 @import "../../../assets/css/commom.css";
.sutarget {
  border: 1px solid #000;
  height: 5rem;
}
.sutarget .el-button{
  padding: 0.05rem 0.1rem;
  margin: 0;
}
.sutarget >>> .el-table th{
  background-color: #f3f6f8;
  text-align: center;
}
.sutarget >>> .el-table td{
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
