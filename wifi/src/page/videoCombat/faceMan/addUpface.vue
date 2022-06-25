<template>
  <div class="taskMange">
     <el-dialog
        :title="title"
        :visible.sync="openFace"
        @close="closeDia"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        @open="opendia"
        width="30%">
        <div class="taskrelation">
          <ul>
            <li>
              <span><b style="color:red">*</b>人脸名称：</span>
              <input type="text" maxlength="100" v-model="faceName" placeholder="请输入人脸名称">
              <div class="mustText mustText1" v-show="tenLength" >请输入小于100个字<i></i></div>
              <div class="mustText mustText1" v-show="emptyMust" >人脸名称不能为空<i></i></div>
            </li>
            <li>
              <span>身份证号：</span>
              <input type="text" maxlength="18" v-model="faceCard" placeholder="请输入身份证号码">
              <div class="mustText mustText1" v-show="idCard" >请输入正确的身份证号<i></i></div>
            </li>
            <li>
              <span>出生年月：</span>
              <input type="text" readonly v-model="birday" id="timeTxt" placeholder="请输入出生年月">
            </li>
            <li>
              <span>性别：</span>
              <el-radio v-model="sex" label="0">男</el-radio>
              <el-radio v-model="sex" label="1">女</el-radio>
              <el-radio v-model="sex" label="2">未知</el-radio>
            </li>
            <li>
              <span>备注：</span>
              <input type="text" maxlength="50" v-model="remark" placeholder="请输入备注">
              <div class="mustText mustText1" v-show="textLength" >请输入小于50个字<i></i></div>
            </li>
            <li v-show="title == '新增人员'">
              <el-upload
                class="upload-demo"
                ref="upload"
                name = 'file'
                action="sms/uploadFile/uploadFaceImage"
                :multiple = "true"
                :limit="3"
                :on-remove="deleteUpload"
                :on-exceed="handExceed"
                :on-success="beforeSuccess"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload">
                <b style="color:red">*</b>&nbsp;&nbsp;<el-button size="small" class="searchBtn" type="primary">点击上传</el-button>
              </el-upload>
            </li>
          </ul>

          <div v-show="showListImg" class="showupImg">
            <span v-for="(item,index) in imgFileList" :key="index">
              <img :src="item" class="showimgbox" @load="imgscale('.showimgbox')" alt="">
              <i class="el-icon-circle-close" @click="deleteUpload(item,fileList)"></i>
            </span>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary cancleBtn" @click="openFace = false">取 消</el-button>
          <el-button type="primary passBtn" v-no-more-click @click="addFaceToman">确 定</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
import verify from '../../../api/casestudy/verify.js'
import scale from '../../../api/common/scale.js'
export default {


  data(){
    return{
      openFace:false,
      sex:'2',//性别
      imgFileList:[],//上传图片的地址
      fileList:[],
      showListImg:false,
      faceName:'',
      faceCard:'',
      birday:'',
      remark:'',
      beginTime:'',
    }
  },
  mounted(){

  },
  watch:{
    showAddface(val){
      this.openFace = val
    }
  },
  mixins:[verify,scale],
  props:{
    showAddface:Boolean,
    title:String,
    faceInfo:Object,
    btnlibInfo:Object
  },
  methods:{
    //关闭模态框
    closeDia(){
      this.$emit('childyFace',false)
      this.$refs.upload.clearFiles();
      this.imgFileList = [];
      this.fileList = []
      this.showListImg = false
      this.faceName = ''
      this.faceCard = ''
      this.birday = ''
      this.sex = '2'
      this.remark = ''
    },
    //打开模态框
    opendia(){
      if(this.title == '修改人员'){
        this.faceName = this.faceInfo.name
        this.faceCard = this.faceInfo.certNumber
        this.birday = this.faceInfo.birthday
        this.sex = this.faceInfo.sex
        this.remark = this.faceInfo.remark
      }
      this.$nextTick(()=>{
        let beginTime = laydate.render({
          elem: "#timeTxt",
          type: "date",
          btns: ["now", "confirm"],
          max: 0,
          done: (value, date)=> {
            this.birday = value;
            // timeEnd.config.min = {
            //   year: date.year,
            //   month: date.month - 1, //关键
            //   date: date.date
            // };
          }
        });
        // laydate.render({
        //   elem:'#timeTxt',
        //   max:0
        // })
      })

    },
    // 超出文件个数的回调
    handExceed(file,filelist){
      this.$notify({
          type: 'error',
          message: '当前限制文件个数3个',
          position: 'bottom-right',
          duration: 3000
        });
    },
    // 删除文件上传时候的回调
    deleteUpload(file,filelist){
      for (let i = 0; i < this.fileList.length; i++) {
        if(file == this.fileList[i].response.data){
          this.fileList.splice(i,1)
          this.imgFileList.splice(i,1)
        }
      }
      if(this.fileList.length == 0){
        this.showListImg = false
      }
    },
    // 文件上传成功时候的回调
    beforeSuccess(res,file,filelist){
      this.imgFileList = [];
      this.fileList = filelist
      let flag = true;
      for(let i=0;i<filelist.length;i++){
        if(filelist[i].response){
          if(filelist[i].response.code == 200){
            this.imgFileList.push(filelist[i].response.data)
          } else if(filelist[i].response.code == 100){
            filelist.splice(i,1)
            this.$notify({
              type: 'error',
              message: '未识别到人脸特征',
              position: 'bottom-right',
              duration: 3000
            });
          }else{
            filelist.splice(i,1)
             this.$notify({
              type: 'error',
              message: '请上传人脸图片',
              position: 'bottom-right',
              duration: 3000
            });
          }
        }

        // }else if(filelist[i].response.data == null){
        //   console.log(22);
        //   this.$notify({
        //     type: 'error',
        //     message: '请上传人脸图片',
        //     position: 'bottom-right',
        //     duration: 3000
        //   });
        // }else{
        //   flag = false;

        // }
      }
      if(this.imgFileList.length){
        this.showListImg = true
      }else{
        this.showListImg = false
      }
    },
    // 文件上传时的验证
    beforeAvatarUpload(file) {
      let isLt2M = file.size / 1024 / 1024 < 1;
      if (file.type != 'image/jpeg' && file.type != 'image/png' && file.type != 'image/jpg' && file.type != "image/bmp") {
        this.imgFileList = []
        this.$notify({
          type: 'error',
          message: '上传图片只能是 png,jpg,jpeg,bmp格式！',
          position: 'bottom-right',
          duration: 3000
        });
        this.showListImg = false
        return false
      }
      if(!isLt2M){
        this.showListImg = false
        this.$notify({
          type: 'error',
          message: '请上传单张小于1M的证件照！',
          position: 'bottom-right',
          duration: 3000
        });
      }
      return isLt2M;
    },

    //加入到人脸库
    addFaceToman(){
      let card = /^$|(^\d{15}$)|(^\d{17}(x|X|\d)$)/
      if(this.faceName == ''){
        this.emptyMust = true;
        setTimeout(()=>{
          this.emptyMust = false
        },1000)
        return
      }
      if(this.faceName.length > 100){
        this.tenLength = true;
        setTimeout(()=>{
          this.tenLength = false
        },1000)
        return
      }
      if (!card.test(this.faceCard)) {
        this.idCard = true;
        setTimeout(() => {
          this.idCard = false;
        }, 1000);
        return
      }
      if(this.remark.length > 50){
        this.textLength = true;
        setTimeout(() => {
          this.textLength = false;
        }, 1000);
        return
      }
      let imgurl = ''
      imgurl = this.imgFileList.join('@')
      if(this.title == '新增人员'){
        if(imgurl == ''){
           this.$notify({
              type: 'warning',
              message: '请上传图片',
              position: 'bottom-right',
              duration: 3000
            });
          return
        }
        let data = {
          faceDbPrimaryKey:this.btnlibInfo.id,
          faceUrls:imgurl,
          faceVo : JSON.stringify({
              name:this.faceName,
              certNumber:this.faceCard,
              birthday:this.birday,
              sex:this.sex,
              remark:this.remark
          })
        }
        data = this.$qs.stringify(data)
        this.$http.post('sms/face/addFace',data).then(res=>{
          this.openFace = false
          if(res.data.code == 200){
            this.$notify({
              type: 'success',
              message: '添加成功',
              position: 'bottom-right',
              duration: 3000
            });
          }else if(res.data.code == 100){
            this.$notify({
              type: 'warning',
              message: '服务异常',
              position: 'bottom-right',
              duration: 3000
            });
          }else{
            this.$notify({
              type: 'error',
              message: '添加失败',
              position: 'bottom-right',
              duration: 3000
            });
          }
        })
      }else{
        let info = {
          faceUuid:this.faceInfo.faceUuid,
          name:this.faceName,
          certNumber:this.faceCard,
          birthday:this.birday,
          sex:this.sex,
          remark:this.remark
        }
        info = JSON.stringify(info);
        let data = {
          faceDbPrimaryKey:this.btnlibInfo.id,
          faceVo :info
        }
        data = this.$qs.stringify(data)
        this.$http.post('sms/face/updateFaceInfo',data).then(res=>{
          this.openFace = false
          if(res.data.code == 200){
            this.$notify({
              type: 'success',
              message: '修改成功',
              position: 'bottom-right',
              duration: 3000
            });
          }else{
            this.$notify({
              type: 'error',
              message: '修改失败',
              position: 'bottom-right',
              duration: 3000
            });
          }
        })
      }
    }
  }

}
</script>


<style scoped>
@import '../../../assets/css/commom.css';
@import '../../../assets/css/verify.css';

.taskrelation ul{
  overflow: hidden;
}
.taskrelation ul li {
  color: #99c9fa;
  position: relative;
  line-height: 0.4rem;
}
.taskrelation ul li span{
  width: 0.9rem;
  text-align: right;
  display: inline-block;
}
.taskrelation ul li input{
  height: 0.3rem;
  width: 2rem;
  padding-left: 0.1rem;
}
.el-dialog__wrapper /deep/ .el-dialog{
  min-width: 0rem;
}
.showupImg{
  width: 100%;
  height: 1.5rem;
}
.showupImg span{
  display: inline-block;
  width: 30.5%;
  height: 100%;
  margin-right: 2%;
  position: relative;
  border: 1px solid #235588;
}
.showupImg span img{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.showupImg span i{
  width: 0.2rem;
  height: 0.2rem;
  line-height: 0.2rem;
  font-size: 0.15rem;
  text-align: center;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}
.mustText1{
  right:0.8rem
}

</style>
