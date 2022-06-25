<!--
 * @Author: chenxf
 * @Date: 2020-05-17 16:47:07
 * @LastEditTime : 2020-11-05 13:49:58
 * @LastEditors  : Please set LastEditors
 * @Description:
 * @FilePath: \vacp-wfes\src\page\casestudy\addcaseInfo\uploadImg.vue
 * @
 -->
<template>
  <div class="taskMange">
     <el-dialog
        title="图片上传"
        :visible.sync="dialogVisible"
        @close="closeDia"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @open="opendia"
        width="15%">
        <span class="addaccess">
          <el-upload
            class="upload-demo"
            ref="upload"
            :limit='10'
            :auto-upload="false"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.GIF,.BMP"
            action="sms/uploadFile/upload"
            :before-upload="beforeAvatarUpload"
            :on-progress="progeress"
            :on-change="change"
            :on-success="successUpload"
            :on-remove="deleteUpload"
            :on-exceed="getNum"
            multiple>
            <i class="el-icon-plus"></i>
            <!-- <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> -->
            <div class="el-upload__text"><em>点击上传(单次最多上传10张图片)</em></div>
          </el-upload>
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary cancleBtn" @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary passBtn" @click="uploadImg" v-no-more-click>确 定</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data(){
    return{
      dialogVisible:false,
      flag :true, //是否禁用
      filelist:[],
      loading:null,
    }
  },
  mounted(){

  },
  watch:{
    isfileupload(val){
      this.dialogVisible = val
    }
  },
  props:{
    isfileupload:Boolean,
    pTinfo:Object,
    u_imgrul:String,
    u_id:String,
    hotspotId:String
  },
  methods:{
    //关闭模态框
    closeDia(){
      this.$emit('childbyfile', false)
      this.$refs.upload.clearFiles();
    },
    //打开模态框
    opendia(){

      this.filelist = []
    },
    successUpload(filelist){
      for (let i = 0; i < filelist.length; i++) {
        let jd = filelist[i].percentage;
        if(jd != 100){
          this.flag = true;
        }else{
          this.flag = false;
        }
      }
    },
    beforeAvatarUpload(file){
      if(file.type != "image/jpg" && file.type != "image/jpeg" && file.type != "image/bmp" && file.type != "image/png" && file.type != "image/gif"){
        this.$notify({
          type: 'warning',
          message: '只能上传bmp/jpg/jpeg/png/gif格式图片！',
          position: 'bottom-right',
          duration: 3000
        });
        this.flag = false;
        return false;
      }
    },
    getNum(file,filelist){
      this.$notify({
        type: 'warning',
        message: '单次最多上传10张图片',
        position: 'bottom-right',
        duration: 3000
      });
    },
    progeress(file){
      if(file.percentage == 100){
      }
    },
    change(file,filelist){
      const isImage = file.raw.type == 'image/png' || file.raw.type == 'image/jpg' ||  file.raw.type == 'image/jpeg' || file.raw.type == 'image/bmp' || file.raw.type == 'image/gif';
      if (!isImage) {
        filelist.splice(-1,1);
        setTimeout(()=>{
            this.$notify({
                type: 'warning',
                message: '只能上传bmp/jpg/jpeg/png/gif格式图片！',
                position: 'bottom-right',
                duration: 3000
            });
        },100)
        // this.$message.error('上传只能是png,jpg,jpeg,bmp,gif,webp格式!');
      }
      const imgLength = file.name.split('.')[0].length;
      if(imgLength > 80) {
        filelist.splice(-1,1);
        setTimeout(()=>{
            this.$notify({
                type: 'warning',
                message: '图片名称不能超过80个字！',
                position: 'bottom-right',
                duration: 3000
            });
        },100)

        return
      }
      // if(isImage){
      // }else{

      // }

    },
    deleteUpload(file,filelist){
      // for (let i = 0; i < this.filelist.length; i++) {
      //   if(file.uid == this.filelist[i][0]){
      //     this.filelist.splice(i,1)
      //   }
      // }
      //  if(this.filelist.length == 0) {
      //   this.flag = true;
      //   return
      // }
    },
     //压缩图片开始
    imagetoCanvas(image){
        var cvs = document.createElement("canvas");
        var ctx = cvs.getContext('2d');
        cvs.width = image.width;
        cvs.height = image.height;
        ctx.drawImage(image, 0, 0, cvs.width, cvs.height);
        return cvs ;
    },
    canvasResizetoFile(canvas,quality,fn){
        canvas.toBlob(function(blob) {
            // console.log(blob,25566);
            fn(blob);
        },'image/jpeg',quality);
    },
    filetoDataURL(file,fn){
        var reader = new FileReader();
        reader.onloadend = function(e){
            fn(e.target.result);
        };
        reader.readAsDataURL(file);
    },
    dataURLtoImage(dataurl,fn){
        var img = new Image();
        img.onload = function() {
            fn(img);
        };
        img.src = dataurl;
    },

     // 压缩图片结束
    fileResizetoFile(file,quality,fn){
        let _this = this
        _this.filetoDataURL (file,function(dataurl){
            _this.dataURLtoImage(dataurl,function(image){
            _this.canvasResizetoFile(_this.imagetoCanvas(image),quality,fn);
            })
        })
    },

    uploadImg(){
        if(this.$refs.upload.uploadFiles.length){
            this.loading = this.$loading({
                lock: true,
                background: "rgba(255,255,255,0.4)",
                text: "上传中"
            });
        }

        let _this = this
        let list = []
        for (let i = 0; i < this.$refs.upload.uploadFiles.length; i++) {
            if(this.$refs.upload.uploadFiles[i].raw.type == 'image/gif'){
                list.push(new Promise((resove,rej)=>{
                    let formData = new FormData();
                    formData.append("files", this.$refs.upload.uploadFiles[i].raw);
                    this.$http({url:'/sms/uploadFile/upload',method:'post',data:formData}).then(res=>{
                        resove(res.data.data[0])
                    })
                }))
            }else{
                list.push(new Promise((resove,rej)=>{
                    this.fileResizetoFile(this.$refs.upload.uploadFiles[i].raw,0.6,function(blob){
                        let formData = new FormData();
                        let file = new File([blob],new Date().getTime()+'.jpg');
                        formData.append('files',file);
                        _this.$http({url:'/sms/uploadFile/upload',method:'post',data:formData}).then(res=>{
                            resove(res.data.data[0])
                        })
                    })
                }))
            }

        }
        Promise.all(list).then(response=>{
            let operationType //1. 新增（多个图片地址用逗号分隔）；2.修改(当imgUrl 为null或""时表示删除)
            let imgurl = ''
            let id = ''
            let pointType = ''
            let pointId = ''
            if(this.pTinfo.listType == undefined){
                pointType = 6
                pointId = this.pTinfo.list.deviceUuid
            }else {
                pointType = 7
                pointId = this.hotspotId
            }
            imgurl = response.join(',')
            operationType = 1
            id = ''

            let data = {
                id:id,
                pointId:pointId,  //设备ID
                imgUrl:imgurl,
                pointType:pointType, //类型  6信息点 7案发点
                operationType:operationType,
                caseUuid:this.$route.query.caseUuid
            }
            data = this.$qs.stringify(data)
            this.$http.post('pca/point/img/relevance',data).then(res=>{
                if(res.data.code == 200){
                setTimeout(()=>{
                    this.dialogVisible = false
                    this.loading.close();
                    this.$notify({
                    type: 'success',
                    message: '上传成功！',
                    position: 'bottom-right',
                    duration: 3000
                    });
                },3000)
                }else{
                this.dialogVisible = false
                this.loading.close();
                this.$notify({
                    type: 'error',
                    message: '上传失败',
                    position: 'bottom-right',
                    duration: 3000
                });
                }
            })

        }).catch(()=>{
            this.$notify({
                type: 'error',
                message: '上传失败',
                position: 'bottom-right',
                duration: 3000
            });
            this.loading.close();
        })
    },
    // uploadImg(){
    //   // console.log(this.$refs.upload.uploadFiles);
    //   // return
    //   let formData = new FormData();
    //   if(!this.$refs.upload.uploadFiles.length) {
    //     this.$notify({
    //       type: 'warning',
    //       message: '请上传图片！',
    //       position: 'bottom-right',
    //       duration: 3000
    //     });
    //     return;
    //   }
    //   this.loading = this.$loading({
    //     lock: true,
    //     background: "rgba(255,255,255,0.4)",
    //     text: "上传中"
    //   });
    //   for (let i = 0; i < this.$refs.upload.uploadFiles.length; i++) {
    //     formData.append('files',this.$refs.upload.uploadFiles[i].raw);
    //   }
    //   this.$http({url:'/sms/uploadFile/upload',method:'post',data:formData}).then(res=>{
    //     if(res.data.code == 200){
    //       this.filelist = res.data.data
    //       let operationType //1. 新增（多个图片地址用逗号分隔）；2.修改(当imgUrl 为null或""时表示删除)
    //       let imgurl = ''
    //       let id = ''
    //       let pointType = ''
    //       let pointId = ''
    //       if(this.pTinfo.listType == undefined){
    //         pointType = 6
    //         pointId = this.pTinfo.list.deviceUuid
    //       }else {
    //         pointType = 7
    //         pointId = this.hotspotId
    //       }
    //       imgurl = this.filelist.join(',')
    //       // if(this.u_imgrul == ''){
    //       //   operationType = 1
    //       //   id = ''
    //       // }else{
    //       //   operationType = 2
    //       //   imgurl = imgurl +','+ this.u_imgrul
    //       //   id = this.u_id
    //       // }
    //       operationType = 1
    //       id = ''

    //       let data = {
    //         id:id,
    //         pointId:pointId,  //设备ID
    //         imgUrl:imgurl,
    //         pointType:pointType, //类型  6信息点 7案发点
    //         operationType:operationType,
    //         caseUuid:this.$route.query.caseUuid
    //       }
    //       data = this.$qs.stringify(data)
    //       this.$http.post('pca/point/img/relevance',data).then(res=>{
    //         if(res.data.code == 200){
    //           setTimeout(()=>{
    //             this.dialogVisible = false
    //             this.loading.close();
    //             this.$notify({
    //               type: 'success',
    //               message: '上传成功！',
    //               position: 'bottom-right',
    //               duration: 3000
    //             });
    //           },3000)
    //         }else{
    //           this.dialogVisible = false
    //           this.loading.close();
    //           this.$notify({
    //             type: 'error',
    //             message: '上传失败',
    //             position: 'bottom-right',
    //             duration: 3000
    //           });
    //         }
    //       })
    //     }else{
    //       this.loading.close();
    //     }
    //   });
    // }
  }

}
</script>


<style scoped>
@import '../../../assets/css/commom.css';
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
.addaccess >>> .el-upload-dragger .el-icon-plus{
  height:100px;
  line-height: 100px;
  font-size: 30px;
  font-weight: 800;
  color:#99c9fa
}
.taskMange >>> .el-upload-list__item:hover{
  background: rgba(37, 67, 100, 0.9);
  color: #99c9fa;
}
.addaccess >>> .el-upload-dragger .el-upload__text,
.taskMange >>>  .el-upload-list__item-name,
.taskMange >>> .el-upload-list__item .el-icon-close{
  color: #99c9fa;
}
.addaccess >>> .el-upload--text {
  padding: 0.4rem;
  color: #99c9fa;
  border: 1px dashed #4d6b8c;
}

</style>
