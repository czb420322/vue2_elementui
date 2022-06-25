<template>
 <div class="addaccess">
   <el-upload
      class="upload-demo"
      drag
      action="sms/uploadFile/upload"
      :before-upload="beforeAvatarUpload"
      :on-progress="progeress"
      :on-change="change"
      :on-remove="deleteUpload"
      multiple>
      <i class="el-icon-plus"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
 </div>
</template>

<script>

export default {
  data() {
    return {
      filelist:[],
      flag:true
    }
  },

  mounted () {

  },
  methods: {
    deleteUpload(file,filelist){
    },
    progeress(e,file,filelist){
      if(file.percentage == 100){
        this.flag = false
        this.incre();
      }
    },
    change(){
      this.flag = true;
    },
    beforeAvatarUpload(file){
      this.flag = true;
      this.filelist=[]
      let formData = new FormData();
      formData.append('files',file);
      this.$http({url:'/sms/uploadFile/upload',method:'post',data:formData}).then(res=>{
        if(res.data.code == 200){
          let arr = []
          arr.push(file.name,res.data.data[0])
          this.filelist.push(arr)
          this.flag = false
          this.incre();
        }
      });
    },
    incre(){
      this.$emit('incre', this.filelist,this.flag)
    }
  }
};
</script>

<style scoped>
.addaccess {
  width: 5rem;
  max-height: 5rem;
  margin: 0 auto;
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
.addaccess >>> .el-upload{
  width: 100%;
}
.addaccess >>> .el-upload-dragger{
  width: 100%;
background-color: rgba(16, 35, 56, 0.5);
border: 1px dashed #4d6b8c;
}
.addaccess >>> .el-upload-dragger .el-upload__text{
  color:#99c9fa
}
.addaccess >>> .el-upload-dragger .el-icon-plus{
  height:100px;
  line-height: 100px;
  font-size: 30px;
  font-weight: 800;
  color:#99c9fa
}
/* .hello {
  width: 650px;
  margin-left: 34%;
  text-align: center;
} */
</style>
