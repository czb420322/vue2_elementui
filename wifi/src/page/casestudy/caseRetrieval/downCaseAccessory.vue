<template>
 <div class="downaccessory">
   <p style="cursor: pointer"><input type="text" placeholder="请输入关键字"><span class="el-icon-search"></span></p>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      class="tables"
      height="4.3rem">
      <el-table-column
        show-overflow-tooltip
        prop="fileName"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="uploadTime"
        label="视频名称">
      </el-table-column>
      <el-table-column
        prop="submiterOrg"
        label="格式">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="fileHash"
        label="上传人">
      </el-table-column>
      <el-table-column
        prop="address"
        label="上传时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-download">下载</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--<el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :small="true"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
      </el-pagination>-->
 </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, // 当前页码
      pageSize: 10, //每页显示的条数
      totalCount: 0 //数据总条数
    };
  },
  components: {},
  created(){
    this.ajaxEnclosureList()
  },
  methods:{

    handleSizeChange(val) {
        this.pageSize = val;
      },
      // 监听当前页码
      handleCurrentChange(val) {
        this.currentPage = val;
      }
  }
};
</script>

<style scoped>
.downaccessory {
  /* border: 1px solid #000; */
  height: 5rem;
}
.downaccessory p{
  float: right;
  margin-bottom: 0.1rem;
}
.downaccessory p input{
  height: 0.25rem;
  padding: 0.1rem;
  border: 1px solid #d5dade;
}
.downaccessory p span{
  display: inline-block;
  width: 0.4rem;
  line-height: 0.25rem;
  text-align: center;
  color: #fff;
  font-size: 0.16rem;
  /* vertical-align: bottom; */
  background-color: #409efe;
}
.downaccessory .el-button{
  padding: 0.05rem 0.1rem;
  margin: 0;
}
.downaccessory >>> .el-table th{
  background-color: #f3f6f8;
  text-align: center;
}
.downaccessory >>> .el-table td{
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
