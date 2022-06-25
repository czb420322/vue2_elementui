<template>
  <div class="taskMange">
    <el-dialog
        title="离线视频列表"
        :visible.sync="dialogVisible"
        @close="closeDia"
        @open="opendia"
        width="70%">
        <span class="taskrelation">
          <el-table
          :data="tableData"
          border
          style="width: 100%"
          class="tables"
          height="4.9rem">
          <div slot="empty">
            <div class="noImg">
              <img src="../../../assets/updataImg/NoData.png" />
            </div>
          </div>
          <el-table-column
            prop="submiterName"
            label="序号"
            width="80"
            type="index">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="fileName"
            label="文件名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="fileSize"
            label="文件大小(M)"
            :formatter="fileSize">
          </el-table-column>
          <el-table-column
            prop="uploadTime"
            label="创建时间"
            :formatter="dateFormat">
          </el-table-column>
          <!-- <el-table-column
            prop="submiterOrg"
            show-overflow-tooltip
            label="提交人单位">
          </el-table-column> -->
          <el-table-column
            prop="status"
            label="状态"
            :formatter="formatStatus">
          </el-table-column>
         <el-table-column label="进度">
             <template slot-scope="scope">
               <el-progress :percentage="scope.row.progress" color="#8e71c7"></el-progress>
             </template>
          </el-table-column>
          <el-table-column
           label="操作">
          <template slot-scope="scope">
            <el-button class="delBtn" @click="delVideo(scope.row.fileUuid)">删除</el-button>
          </template>
          </el-table-column>
        </el-table>


        <el-pagination
          :background="true"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
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


    <!-- <el-dialog
      title="查看进度"
      :visible.sync="dialogVisible1"
      width="30%">
      <span>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="percent"></el-progress>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
      </span>
    </el-dialog> -->

  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
        dialogVisible:false,
        dialogVisible1:false,
        tableData:[],
        totalCount: 0, //当前数据总数
        currentPage: 1, // 当前页码
        pageSize: 10, //每页显示的条数
        pageSizes:[10,20,30],//下拉框选择的显示条数
        timeId:null, //
        // percent:0,
    }
  },
  filters: {


  },
  watch:{
      isgather(val){
        this.dialogVisible = val
      },
  },
  props:{
      isgather:Boolean,
      deviceid1:String
  },
  created () {
    // this.quertList();
  },
  methods:{
    opendia(){
      this.$nextTick(()=>{
        this.queryList()
        this.timeId = setInterval(()=>{
          this.queryList()
        },1000)
      })


    },
      //状态码判断
      formatStatus(row, column,cellValue) {
        if (row.deviceType == 0){
          return '格式不支持'
        }else {
          if (cellValue === 1) {
            return '上传中';
          } else if (cellValue == 2) {
            return '上传完成';
          } else if (cellValue == 3) {
            return '上传完成'
          } else if (cellValue == 4) {
            return '上传完成';
          } else if (cellValue == 5) {
            return '上传完成'
          }else if (cellValue == 6) {
            return '上传完成'
          }
        }
      },
        //时间过滤
      dateFormat(row, column) {
        var date = row[column.property];
          if (date == undefined) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
      //文件大小
      fileSize(row, column, cellValue){
        if(!cellValue || cellValue==-1){
          return ''
        }
        var cell = (cellValue / 1024 /1024).toFixed(2)+'M'
        return cell
      },
      closeDia(){
        this.$emit("childBygather",false)
        clearInterval(this.timeId)
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.queryList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.queryList();
      },
      // 删除视频
      delVideo(id){
        this.$myconfirm({
          type: '提示',
          msg: '是否删除这条视频',
          icon:1,
          btn: {
            ok: '确定',
            no: '取消'
          }
        }).then(() => {
           let data = {
             fileUuid: id
           }
           data = this.$qs.stringify(data);
           this.$http.post('vsas/collection/del',data).then(res=>{
             console.log(res,888);
             if(res.data.code == 200){
               this.queryList()
               this.$notify({
                 type: 'success',
                 message: '视频删除成功！',
                 position: 'bottom-right',
                 duration:3000
               });
             }else{
               this.$notify({
                 type: 'error',
                 message: '视频删除失败',
                 position: 'bottom-right',
                 duration: 3000
               });
             }
           })
        })
        .catch(() => {
        })
      },
      // 查询列表
      queryList(){

        let userId = this.$storage.getSession('userInfo').userId;
        let data = {
          pageNum:this.currentPage,//当前页
          pageSize:this.pageSize,//当前页结果数量
          deviceId:this.deviceid1,
          caseUuid:this.$route.query.caseUuid,
        };
        this.$http.get('vsas/collection/offline/list', {params:data}).then(res => {
          if(res.data.code == 200){
            this.tableData = res.data.data.list;
            this.totalCount = res.data.data.totalCount
            for (let i = 0; i < this.tableData.length; i++) {
              // if (this.tableData[i].status == 1 && this.tableData[i].deviceType != 0) {
                if (this.tableData[i].status == 1 && this.tableData[i].deviceType != 0) {
                this.tableData[i].progress = 0
                // let portMsg = sessionStorage.getItem(this.tableData[i].fileUuid)

                // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>1.6代码开始<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
                //  let portMsg = localStorage.getItem(this.tableData[i].fileUuid)
                // let url = "http://127.0.0.1:" + portMsg + "/DxHandler.js?cbk=OnPercent&req=0&fileUuid=" + this.tableData[i].fileUuid;
                // let g_socket = document.createElement("script");
                // g_socket.src = url;
                // document.body.appendChild(g_socket);
                // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>1.6代码结束<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

                
                // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>1.7代码开始<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

                   OnPercent(this.tableData[i].fileUuid)

                // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>1.7代码结束<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

                // let progress = sessionStorage.getItem(this.tableData[i].fileUuid + '1' )
                let progress = localStorage.getItem(this.tableData[i].fileUuid + '1' )
                this.tableData[i].progress = Number(progress)
              }
              else if (this.tableData[i].status != 1 && this.tableData[i].deviceType != 0) {
                this.tableData[i].progress = 100
              }
              // else if (this.tableData[i].status == 5 && this.tableData[i].deviceType != 0) {
              //   this.tableData[i].progress = 100
              // }
              else if (this.tableData[i].deviceType == 0) {
                this.tableData[i].progress = 0
              }
            }
          }
        })



        // let data = {

        // }
        // this.$http.get('vsas/collection/offline/list',{params:data})
        // .then(res=>{
        //   if(res.data.code == 200){
        //     this.tableData = res.data.data.list;
        //     this.totalCount = res.data.data.totalCount;//页面总数
        //     this.currentPage = res.data.data.pageNum;//当前页
        //     this.pageSize = res.data.data.pageSize;//每页条数
        //   }
        // })
      }


  }
}
</script>


<style scoped>
@import '../../../assets/css/commom.css';

/* .el-dialog__wrapper >>> .el-dialog__header{
    background-color: #f3f6f8;
}
.el-dialog__wrapper >>> .el-dialog__footer{
    text-align: center;
    border-top: 1px solid #d5dade;
}
.el-dialog__wrapper >>> .el-dialog__body{
    padding: 10px 20px;
}
.relation_top{
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
}
.el-radio-group >>> .el-radio-button__inner{
    padding: 10px 20px;
}
.relation_top p:first-child{
    color: #409eff;
    line-height:30px;
}
.rela_last .el-button{
    padding: 0 10px;
    height: 30px;
    font-size: 14px;
}
.rela_last{
    position: relative;
}
.rela_last input{
    width: 200px;
    line-height: 28px;
    border: 1px solid #d3d5dc;
    border-radius: 2px;
    margin-right: 60px;
}
.rela_last i{
    position: absolute;
    width: 50px;
    line-height: 30px;
    text-align: center;
    background-color: #409eff;
    color: #fff;
    left: 200px;
    border-radius: 2px;
}
.el-table >>> th{
    background-color:#e9eef1;
}
.el-table >>> td, .el-table >>> th{
    text-align: center;
}
.el-table >>> td{
    padding: 8px 0;
}
.el-table--border{
    border: 1px solid #d3d4d9;
}
.el-table--border >>> th,
.el-table--border >>> td{
    border-right: 1px solid #d3d4d9;
    border-bottom: 1px solid #d3d4d9;
}
.el-table >>> .el-button{
    padding: 5px 10px;
    font-size: 14px;
} */
.el-pagination{
    text-align: right;
    margin-top: 10px;
}
/* .styles {
  color: #4b9de8;
  cursor: pointer;
  text-decoration: underline;
} */
</style>
