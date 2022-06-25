<template>
  <div class="accupload">
     <el-dialog
      title="附件上传"
      :visible.sync="dialogVisible"
      @close="closeDia"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @open="opendia"
      width="30%">
        <div class="addaccess">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="/sms/uploadFile/uploadCaseFile"
            :drag="true"
            :auto-upload="false"
            :before-upload="beforeAvatarUpload"
            :on-change="changeUpload"
            :on-remove="deleteUpload"
            multiple>
            <i class="el-icon-plus"></i>
            <div class="el-upload__text"><em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip">只能上传单个小于500M的文件，总大小1G的文件</div>
            <div slot="tip" class="el-upload__tip">剩余空间：<el-progress :percentage="approveProportion" class="colorChange"></el-progress></div>
          </el-upload>

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary cancleBtn" @click="dialogVisible = false">取 消</el-button>
           <el-button type="primary passBtn" v-no-more-click @click.prevent="uploadOk" >确 定</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>

export default {
  data(){
    return{
      dialogVisible:false,
      approveProportion:100,
      uploadList:[],
      successList:[],
      allsize:'',
      ismast:false,
      progress:'',
      loading:null
    }
  },
  mounted(){

  },
  watch:{
    openaccess(val){
      this.dialogVisible = val
    },
  },
  props:{
    openaccess:Boolean
  },
  methods:{
    //关闭模态框
    closeDia(){
      this.$emit('childByaccess',false)
      this.$refs.upload.clearFiles();
      this.uploadList = []
    },
    //打开模态框
    opendia(){
      this.getSize();
    },
    //查看文件还剩多少大小
    getSize(){
      let data ={
        caseUuid:this.$route.query.caseUuid
      }
      this.$http.get('sms/uploadFile/getRemainderFileSize',{params:data}).then(res=>{
        if(res.data.code == 200){
          this.allsize = res.data.data
          this.approveProportion = Number((Number(this.allsize) / (1024 * 1024 * 1024) * 100).toFixed(2))
          // console.log(this.approveProportion,"剩余空间");
        }
      })
    },
    deleteUpload(file,filelist){
      let size = 0
      if(filelist.length){
        for (let i = 0; i < filelist.length; i++) {
          size += Number(filelist[i].size)
        }
      }else {
        size = 0
      }
      this.uploadList = filelist
      // this.approveProportion = Number((Number(this.allsize - size) / (1024 * 1024 * 1024) * 100).toFixed(2))
      if(size > this.allsize){
        return
      }else{
        this.approveProportion = Number((Number(this.allsize - size) / (1024 * 1024 * 1024) * 100).toFixed(2))
      }
    },
    changeUpload(file,filelist){
      const isLt2M = file.size / 1024 / 1024 < 500
      // console.log(file.name,33333333333);-
      let imgLength = file.name.split('.')[0].length;
      if(imgLength > 80){
        filelist.splice(-1,1);
        this.$notify({
          type:'warning',
          message:'上传名称不能超过80个字！',
          position: 'bottom-right',
          duration: 3000
        })
      }
      if (!isLt2M) {
        this.$notify({
          type:'warning',
          message:'附件大小不能超过 500MB!',
          position: 'bottom-right',
          duration: 3000
        })
      }
      if(isLt2M){

      }else{
        filelist.splice(-1,1);
      }
      let size = 0
      if(filelist.length){
        for (let i = 0; i < filelist.length; i++) {
          size += Number(filelist[i].size)
        }
      }else {
        size = 0
      }
      if(size > this.allsize){
        this.$notify({
          type:'warning',
          message:'附件空间不足',
          position: 'bottom-right',
          duration: 3000
        })
        // this.$message.error('附件空间不足');
        filelist.splice(-1,1);
        return
      }else{
        this.approveProportion = Number((Number(this.allsize - size) / (1024 * 1024 * 1024) * 100).toFixed(2))
      }
      this.uploadList = filelist
    },
    uploadOk(){
        sessionStorage.setItem('isUploadTrue',1)
        if(!this.uploadList.length){
            this.$notify({
            type:'warning',
            message:'请上传附件！',
            position: 'bottom-right',
            duration: 3000
            })
            return
        }
        this.dialogVisible = false
        if(this.loading != null){
            return
        }
        this.loading = this.$loading({
            target:'.addaccess',
            lock: true,
            background: "rgba(255,255,255,0.4)",
            text: "正在上传..."
        });
        var count = 1
        let times = new Date().getTime()
        localStorage.setItem('caseInfo','')
        var config = {
            onUploadProgress: progressEvent => {
                // this.progress = ''
                var complete = Number((progressEvent.loaded / progressEvent.total * 100 | 0))
                this.progress = complete + '%'
                console.log(this.progress,'上传进度');
                if(complete > 0 && count == 1){
                    let arr = [
                        {
                        caseUuid:this.$route.query.caseUuid,
                        uuid:times
                        }
                    ]
                    localStorage.setItem('caseInfo',JSON.stringify(arr))
                    // if(localStorage.getItem('caseInfo') == null || localStorage.getItem('caseInfo') == undefined){
                    //     console.log('是否加载了caseInfo');
                    //     localStorage.setItem('caseInfo',JSON.stringify(arr))
                    // }else{
                    //     console.log('是否加载了caseInfo33333');
                    //     let caseInfo =  JSON.parse(localStorage.getItem('caseInfo'))
                    //     let obj =  {
                    //         caseUuid:this.$route.query.caseUuid,
                    //         uuid:times
                    //     }
                    //     caseInfo.push(obj)
                    //     localStorage.setItem('caseInfo',JSON.stringify(caseInfo))
                    // }
                    count++
                }
            }
        }


        let Allsize = 0
        for (let i = 0; i < this.uploadList.length; i++) {
            Allsize += Number(this.uploadList[i].size)
        }
        this.getAllsize(Allsize,times)
        let formdata = new FormData();
        for (let i = 0; i < this.uploadList.length; i++) {
            formdata.append('fileList', this.uploadList[i].raw)
        }
        formdata.append('caseUuid',this.$route.query.caseUuid)
        formdata.append('uuid',times)
        this.$http.post('/sms/uploadFile/uploadCaseFile',formdata,config).then(res=>{
            console.log(res,1323232232);
            if(res.data.code == 200){
                if(this.progress == '100%'){
                    sessionStorage.setItem('isUploadTrue',2)
                    this.$refs.upload.clearFiles();
                    this.loading.close();
                    this.loading = null
                    this.$notify({
                        type:'success',
                        message:'附件上传成功',
                        position: 'bottom-right',
                        duration: 3000
                    })
                }
            }else{
                sessionStorage.setItem('dddd',1)
                this.dialogVisible = false
                this.loading.close();
                this.loading = null
                this.$notify({
                    type: 'warning',
                    message: '附件上传失败',
                    position: 'bottom-right',
                    duration: 3000
                });
            }
        }).catch(()=>{
            sessionStorage.setItem('isUploadTrue',1)
            this.dialogVisible = false
            this.loading.close();
            this.loading = null
            this.$notify({
            type: 'warning',
            message: '附件上传失败',
            position: 'bottom-right',
            duration: 3000
            });
        })
      // }

    },
    //给后台数据总大小
    getAllsize(size,times){
      this.$http.get('sms/uploadFile/addFileSize?caseUuid='+this.$route.query.caseUuid+'&fileSize=' + size + '&uuid='+times).then(res=>{
      })
    },
    beforeAvatarUpload(file){
      // console.log(114111);
      let size = 0
      let isSize
      let type = file.type
      let name = file.name.indexOf('.')

      if(!type && name == -1){
        this.$notify({
          type: 'error',
          message: '请上传文件！',
          position: 'bottom-right',
          duration: 3000
        });
        return false;
      }
      if(this.uploadList.length){
        for (let i = 0; i < this.uploadList.length; i++) {
          size  += this.uploadList[i].size
        }
      }
      if(size > this.allsize){
        size = 0
        for (let i = 0; i < this.uploadList.length - 1; i++) {
          size  += this.uploadList[i].size
        }
      }else {
        isSize = file.size < (this.allsize - size + file.size)
      }
      let isLt2M = file.size / 1024 / 1024 < 500;
      if(!isLt2M){
        this.$notify({
          type: 'error',
          message: '请上传单个小于500M的视频文件！',
          position: 'bottom-right',
          duration: 3000
        });
        return false;
      }
      if(!isSize){
        this.$notify({
          type: 'error',
          message: '文件空间不足！',
          position: 'bottom-right',
          duration: 3000
        });
        return false;
      }
      return isLt2M && isSize && type;
    },
  }

}
</script>


<style lang="scss" scoped>
@import '../../../assets/css/commom.css';
.accupload .el-dialog__wrapper /deep/ .el-dialog__body{
    padding: 0 !important
}
.addaccess {
  width: 100%;
  min-height:2.35rem;
  max-height: 5.1rem;
  margin: 0 auto;
  padding: 0.2rem;
  overflow: auto;
}
.addaccess /deep/ .el-upload-list__item-name{
    color: #99c9fa;
}
.addaccess /deep/ .el-upload__tip{
    color: #99c9fa;
}
.addaccess /deep/ .el-progress__text {
    color: #99c9fa;
}
.upload_warp_img_div {
  position: relative;
  height: 2rem;
  width: 30%;
  border: 1px solid #ccc;
  margin: 0 1.4% 10px;
  float: left;
}
.upload_warp_img_div a {
  width: 100%;
  height: 100%;
  display: inline-block;
  text-align: center;
  /* vertical-align: middle; */
}
.upload_warp_img_div a img{
  width: 100%;
  height: 100%;
  display: inline-block;
  text-align: center;
}

.upload_warp_img_div_del {
  position: absolute;
  top: 6px;
  width: 16px;
  right: 4px;
}

.upload_warp_img_div_top {
  position: absolute;
  top: 0;
  width: 100%;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  line-height: 30px;
  text-align: left;
  color: #fff;
  font-size: 12px;
  text-indent: 4px;
}

.upload_warp_img_div_text {
  white-space: nowrap;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.avatar{
  height: 100%;
  widows: 100%;
}






.upload_warp_img {
  max-height: 3rem;
  border-top: 1px solid #d2d2d2;
  padding: 0.1rem 0 0 0.1rem;
  overflow: auto;
}

.upload_warp_text {
  text-align: left;
  margin-bottom: 0.1rem;
  padding-top: 0.1rem;
  text-indent: 0.14rem;
  border-top: 1px solid #ccc;
  font-size: 0.14rem;
}

.upload_warp_right {
  float: left;
  width: 57%;
  margin-left: 2%;
  height: 100%;
  border: 1px dashed #999;
  border-radius: 4px;
  line-height: 130px;
  color: #999;
}

.upload_warp_left img {
  margin-top: 32px;
}

.upload_warp_left {
  float: left;
  width: 40%;
  height: 100%;
  border: 1px dashed #999;
  border-radius: 4px;
  cursor: pointer;
}

.upload_warp {
  margin: 14px;
  height: 130px;
}

.upload {
  border: 1px solid #ccc;
  background-color: #fff;
  text-align: center;
  box-shadow: 0px 1px 0px #ccc;
  border-radius: 4px;
}
/* .upload-demo /deep/ .el-upload-list__item .el-icon-close{
  color: #99c9fa;
}

.upload-demo /deep/ .el-upload-list__item-name{
  color: #99c9fa;
} */
.addaccess /deep/ .el-upload{
  width: 100%;
}
.upload-demo /deep/ .el-upload-list__item:hover{
  background: transparent;
}
/* .upload-demo /deep/ .el-upload__tip{
  color: #99c9fa;
} */
.el-progress{
  display: inline-block;
  width: calc(100% - 1rem);
  margin-left: 0.1rem;
}
.el-progress /deep/ .el-progress-bar{
  width: 95%;
}
.addaccess /deep/ .el-upload-dragger{
    width: 100%;
    @include background_depart_1("background_depart_1");
    border: 1px dashed #4d6b8c;
}
.addaccess /deep/ .el-upload-dragger .el-upload__text em{
    @include font_color("font_main_color");
}
.addaccess /deep/ .el-upload-dragger .el-icon-plus{
  height:100px;
  line-height: 100px;
  font-size: 30px;
  font-weight: 800;
}

.addaccess .colorChange /deep/ .el-progress-bar__outer{ background: #fff}

</style>
