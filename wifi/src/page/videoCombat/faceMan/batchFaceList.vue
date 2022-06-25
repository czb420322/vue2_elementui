<template>
  <div class="taskMange">
    <el-dialog
        title="批量导入人脸"
        v-loading="loading"
        element-loading-text="上传中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :visible.sync="dialogVisible"
        @close="closeDia"
        @open="opendia"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        width="40%">
        <span class="taskrelation">
          <div>
            <el-button id="filePicker" class="searchBtn">导入压缩文件</el-button>
            <p class="supportFormat">
              *支持压缩格式: zip,7z
            </p>
            <p class="supportFormat">
              *支持批量增加人员信息导入模版: Excel文件和人像图片以压缩包形式上传;
            </p>
          </div>
          <div class="progress procenter">
            <p>上传文件进度：</p>
            <p>
              <el-progress :percentage="approveProportion" color="#67C23A"></el-progress>
            </p>
          </div>
          <div class="progress">
            <p>
              <span>解析文件进度</span>
              <span>
                文件总数：{{allNum}}
                成功数量：{{trueNum}}
                失败数量：{{falseNum}}
              </span>
            </p>
            <p >
              <el-progress :percentage="Proportion" color="#67C23A"></el-progress>
              <!-- <el-button class="searchBtn" @click="showseekMsg = true">查看日志</el-button> -->
            </p>
          </div>

        </span>
         <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false"></el-button>
            <el-button  @click="dialogVisible = false"></el-button>
        </span> -->
        <!-- //打开查看导入日志的页面 -->
        <toLeadMsg :showseekMsg="showseekMsg" @childbyToLead="childbyToLead"></toLeadMsg>
         <vue-upload
            ref="uploader"
            uploadButton="#filePicker"
            :md5s= "md5s"
            multiple
            :btnlibInfo="btnlibInfo"
            @fileInfo="fileInfo"
            @progress="onProgress"
            @success="onSuccess"
            @filedisable="filedisable"
        ></vue-upload>

    </el-dialog>

  </div>
</template>

<script>
import vueUpload from './uploader';

// $(function(){
//   $('#uploadFile').click(function(){
//     alert(56555)
//   })
// })



import toLeadMsg from './toleadMsg';  //引入查看导入日志
export default {
  data(){
    return{
      dialogVisible:false,
      approveProportion:0,
      showseekMsg:false,//打开查看日志
      allNum:0,
      trueNum:0,
      falseNum:0,
      Proportion:0,
      disable:false,
      md5s:0,
      loading: false
    }
  },
  mounted(){

  },
   computed: {
      uploader() {
          return this.$refs.uploader;
      }
  },
  watch:{
    showbatchFace(val){
      this.dialogVisible = val
    }
  },
  components:{
    toLeadMsg,
    vueUpload
  },
  props:{
    showbatchFace:Boolean,
    btnlibInfo:Object
  },
  methods:{
    //关闭模态框
    closeDia(){
      this.$emit('childBybatch',false);
      this.allNum = 0;
      this.trueNum = 0;
      this.falseNum = 0;
      this.Proportion = 0;
      this.approveProportion = 0
      this.disable = false
      this.md5s = 0
      this.$refs.uploader.removeResolveProgressBar();
      this.$refs.uploader.closeloadTime();
    },
    //打开模态框
    opendia(){
      // this.init()
      this.disable = false;
      this.md5s = new Date().getTime()
    },
    childbyToLead(val){
      this.showseekMsg = val
    },
    fileInfo(file){
      console.log(file,3333);
      if(file){
        this.allNum =  file.split('|')[0]
        this.trueNum =  file.split('|')[1]
        this.falseNum =  file.split('|')[2]
        if(this.allNum == 0){
          this.Proportion = 0
        }
        else {
          this.Proportion = Number(((Number(this.falseNum) + Number(this.trueNum)) / Number(this.allNum) * 100).toFixed(2))
            console.log(this.Proportion,88888);
          if(this.Proportion == 100){
            this.$notify({
            type: 'success',
            message: '导入完成！',
            position: 'bottom-right',
            duration: 3000
          });
            setTimeout(()=>{
              this.dialogVisible = false
              this.$refs.uploader.closeloadTime();
            },1000)
          }
        }
      }else{
        this.allNum = 0
        this.trueNum =  0
        this.falseNum =  0
        this.Proportion = 100
        this.$emit('refresh','数据')
        setTimeout(()=>{
          this.dialogVisible = false
          this.$refs.uploader.closeloadTime();
        },1000)
      }

    },
    onProgress(percentage){
      this.approveProportion = Number(percentage);
      console.log(this.approveProportion,6666666666666)
      if(this.approveProportion == 0){
        this.loading = true
      } else{
        this.loading = false
      }
    },
    onSuccess(){
    },
    filedisable(val){
      this.disable = val
    }
  }
}
</script>


<style scoped>
@import '../../../assets/css/commom.css';
@import '../../../assets/css/webuploader.css';
.taskrelation{
  color: #99c9fa;
}
.procenter{
  margin-top: 0.2rem;
  margin-bottom: 0.2rem
}
.supportFormat{
  padding-top: 0.1rem;
}
.progress .el-progress{
  width: 80%;
  display: inline-block;
}
.progress .el-progress /deep/ .el-progress__text{
    color: #99c9fa;
}

</style>
