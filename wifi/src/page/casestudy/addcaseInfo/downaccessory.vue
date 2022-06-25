<!--
 * @Author: your name
 * @Date: 2019-12-06 10:43:59
 * @LastEditTime : 2020-12-30 16:42:30
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vacp-wfes-v1.6-dev\vacp-wfes\src\page\casestudy\addcaseInfo\downaccessory.vue
 -->
<template>
 <div class="downaccessory">
    <div class="progressbar">
     <span class="schedule" v-show="showProgress">上传附件进度条：</span>
     <el-progress v-for="(item,index) in percent" v-show="showProgress" :key="index" :percentage="item.per" color="#8e71c7" ></el-progress>
   </div>
    <el-table
      :data="tableData"
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      border
      style="width: 100%"
      height="4.4rem">
      <div slot="empty">
        <div class="noImg">
          <img src="../../../assets/updataImg/NoData.png" />
        </div>
      </div>
     <el-table-column
        show-overflow-tooltip
        label="编号">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column
      show-overflow-tooltip
        prop="localAttachmentFile"
        label="附件">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="createTime"
        label="上传时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button  class="searchBtn" icon="el-icon-download" @click="download(scope.$index)">下载</el-button>
          <el-button class="delBtn" type="danger"  icon="el-icon-delete" @click="deleteaccess(scope.row)" v-show="isNotDel">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <form action="sms/uploadFile/download" method="post" v-for="(item,index) in  tableData" :key="index" :id="'a'+index" v-show="false">
      <input type="text" :value="item.attachmentFile" name="url">
      <input type="text" :value="item.localAttachmentFile" name="filename">
    </form>
 </div>

</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, // 当前页码
      pageSize: 10, //每页显示的条数
      totalCount: 0, //数据总条数
      percent: [], // 进度条默认0
      time:null,
      showProgress: false,
      loading: false,
      caseInfo:[],
    };
  },
  watch:{
    // percent:{
    //   handler(val){
    //     console.log(val,555555);
    //      let arr = []
    //       for (let i = 0; i < val.length; i++) {
    //         if(this.percent[i].per == 100){
    //           arr.push(this.percent[i].uuid)
    //           console.log(arr,22333111);
    //         }
    //       }
    //       console.log(arr,2223333);
    //       //然后通过uuid来找到当前对应的localStorage
    //       let arr2 = []
    //       let arr3 = this.caseInfo
    //       for (let i = 0; i < arr.length; i++) {
    //         for (let j = 0; j < arr3.length; j++) {
    //           if(arr[i] == arr3[j].uuid){
    //             arr3.splice(j,1)
    //           }
    //         }
    //       }
    //       console.log(arr3,222);

    //   },
    //   deep:true
    // }
  },
  components: {},
  mounted(){
    // this.caseInfo = JSON.parse(localStorage.getItem('caseInfo'))
    this.queryaccessList();
    this.queryschedule();
    this.caseInfo = JSON.parse(localStorage.getItem('caseInfo'))
    this.time = setInterval(()=>{
      this.queryaccessList();
      this.queryschedule();
      this.caseInfo = JSON.parse(localStorage.getItem('caseInfo'))
      if(this.caseInfo.length >= 100){
        this.caseInfo.splice(0,80)
      }
      this.percent = []
    },2000)
    this.showProgress = false
  },
  props:['caseuuId','isNotDel'],
  methods:{
    //删除
    deleteaccess(row){
      this.$myconfirm({
        type: '提示',
        msg: '是否删除该附件?',
        icon: 1,
        btn: {
          ok: '确定',
          no: '取消'
        }
      }).then(() => {
        let data = {
          attachmentId:row.attachmentId
        }
        data = this.$qs.stringify(data)
        this.$http.post('pca/casemng/attachment/del',data)
        .then(res=>{
          if(res.data.code==200){
            this.queryaccessList();
             this.$notify({
              type: 'success',
              message: '附件删除成功！',
              position: 'bottom-right',
              duration: 3000
            });
          }else{
            this.$notify({
              type: 'error',
              message: '附件删除失败！',
              position: 'bottom-right',
              duration: 3000
            });
          }
        })
      })
      .catch(() => {
      })
    },
    //下载
    download(index){
       document.getElementById('a'+index).submit();
    },

    queryaccessList(){
        let data = {
          caseUuid:this.caseuuId
        }
        data = this.$qs.stringify(data);
          this.$http.post('pca/casemng/attachment/list',data).then(res=>{
          if(res.data.code == 200){
            this.tableData = res.data.data;
            console.log(res.data.data,"附件列表lllllllllllllllllllllllllllllllllllllll");
          }
        })
    },
    //获取进度条
    queryschedule(){
      if(this.caseInfo.length){
        for (let i = 0; i < this.caseInfo.length; i++) {
        let data = {
          caseUuid:this.caseuuId,
          uuid:this.caseInfo[i].uuid
        }
        this.$http.get('sms/uploadFile/getSchedule',{params:data}).then(res=>{
          if(res.data.code == 200){
            this.percent.push(
              {uuid:this.caseInfo[i].uuid,
              per:Number(res.data.data)}
            )
            let count = 0
            for (let i = 0; i < this.percent.length; i++) {
              if(this.percent[i].per == 100){
                count ++
              }
              if(count == this.percent.length){
                  setTimeout(()=>{
                      this.showProgress = false
                  },1000)

              }else{
                this.showProgress = true
              }
            }
          }
        })
        }
      }
    }
  },
  // 关闭时销毁定时器
  destroyed() {
    clearInterval(this.time)
  },
};
</script>

<style scoped>

@import "../../../../src/assets/css/commom.css";

.downaccessory {
  /* border: 1px solid #000; */
  height: 5rem;
}
.downaccessory .el-button{
  padding: 0.05rem 0.1rem !important;
  margin: 0!important;
}
.downaccessory >>> .el-table th{
  /* background-color: #f3f6f8; */
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
.progressbar{
    color: #fff;
    font-size: 0.16rem;
    margin-bottom: 0.1rem;
    max-height: 0.3rem;
}
.schedule{
  /* display: inline-block; */
  position: absolute;
  margin-left: 10px;
/**
 * @description:
 * @param {type}
 * @return:
 */
}
.progressbar >>> .el-progress {
  position: relative;
  line-height: 1;
  display: inline;
  margin-left: 5px;
}
.progressbar >>> .el-progress .el-progress-bar {
  padding-right: 50px;
  width: 80%;
  margin-right: -55px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.progressbar /deep/ .el-progress{
  margin-left: 1.5rem;
}
</style>
