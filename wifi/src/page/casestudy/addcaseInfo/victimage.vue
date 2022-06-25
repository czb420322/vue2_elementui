<template>
 <div class="victimage">
    <el-table
      :data="VictimaddData"
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
        show-overflow-tooltip
        prop="victimName"
        label="目标名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="victimSex"
        width="80"
        :formatter='formaVictimSex'
        label="目标性别">
      </el-table-column>
      <el-table-column
        prop="victimPhone"
        label="目标电话">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="victimCard"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="victimAddress"
        label="地址">
      </el-table-column>
      <el-table-column
        label="操作"
        width="280">
        <template slot-scope="scope">
          <el-button class="topBtn" type="success" icon="el-icon-view" @click="see(scope.row.victimUuid)">查看</el-button>
          <el-button class="searchBtn" type="primary" icon="el-icon-edit" @click="edit(scope.row.victimUuid)">编辑</el-button>
          <el-button class="delBtn" type="danger" icon="el-icon-delete"  @click="ajaxDel(scope.row.victimUuid,scope.row)">删除</el-button>
          <!-- <el-button type="warning" icon="el-icon-printer" @click="distinguish(scope.row.victimUuid)">特征</el-button> -->
        </template>
      </el-table-column>
    </el-table>
 </div>
</template>

<script>
export default {
  data() {
    return {
      VictimaddData:[],//受害人数据
    };
  },
  components: {},
  created(){
    this.ajaxVictimadd()
  },
  methods:{
     //受害人列表渲染
    ajaxVictimadd(){
      let data = {
        caseUuid:this.$route.query.caseUuid,
      }
      this.$http.get('/pca/casemng/victim/list',{params:data})
      .then((res) => {
          if(res.data.code == 200){
            this.VictimaddData = res.data.data
          }
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
     this.$myconfirm({
        type: '提示',
        msg: '是否删除受害人',
        icon: 1,
        btn: {
          ok: '确定',
          no: '取消'
        }
      }).then(() => {
        let data =  {
          victimUuid:id
        }
        data = this.$qs.stringify(data);
        this.$http.post('/pca/casemng/victim/del',data)
        .then((response) => {
          //请求成功后删除行
        this.ajaxVictimadd()
          }).catch((error) => {
            this.$notify({
            type: 'error',
            message: '服务器繁忙，请稍后重试!',
            position: 'bottom-right',
            duration: 3000
          });
        });
      })
      .catch(() => {

      })


    },
    distinguish(id){
    },

    //过滤table数据
    formaVictimSex(row, column,cellValue){
        if (cellValue == 0){
            return '男';
        }else if (cellValue == 1){
            return '女';
        }
    },
  }
};
</script>

<style scoped>
@import '../../../assets/css/commom.css';
.victimage {
  /* border: 1px solid #000; */
  height: 5rem;
}

.victimage .el-button{
  padding: 0.05rem 0.1rem;
  margin: 0;
}
.victimage >>> .el-table th{
  background-color: #f3f6f8;
  text-align: center;
}
.victimage >>> .el-table td{
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
