<template>
  <div class="moreUpload" :style="{ 'margin-top': ($iosSystem + 45) + 'px' }">
    <div>
      <v-header :title="{ name: '影像信息' }"></v-header>
      <div style="background: #fff;">
        <p class="hint" style="padding-top: 10px;">为了保障您的权益请上传您的宠物图片</p>
        <!-- 安卓上传图片 -->
        <div class="gr-pdbox"  @click="uploading($event)"  v-if="!isIos">
          <van-uploader  v-model="carList" :max-count="3">
            <img class="upload-img" :src="$CTXBASE + '/img/carInsurance/bt_photo@2x.png'">
          </van-uploader>
        </div>
        <!-- ios上传图片 -->
        <div class="gr-pdbox" v-else>
          <van-uploader :after-read="afterRead" v-model="carList" :max-count="3">
            <img class="upload-img" :src="$CTXBASE + '/img/carInsurance/bt_photo@2x.png'">
          </van-uploader>
        </div>
      </div>
      <p class="hint" style="padding-top: 10px;margin-top: 10px;">请您按照以下要求上传照片</p>
      <div class="give_box">
          <div>
            <p>人宠合照</p>
            <img class="img" src="./../../../public/img/account/SL1_73.jpg" alt="">
          </div>
          <div  class="give_grid">
            <p>全身照</p>
            <img class="img" src="./../../../public/img/account/SL2_73.jpg" alt="">
          </div>
          <div>
            <p>正脸正对鼻纹照</p>
            <img class="img" src="./../../../public/img/account/SL3_73.jpg" alt="">
          </div>
        </div>

    </div>

    <footer class="footer_btn_bar">
      <van-button type="info" block color="linear-gradient(to right, #245cf6, #459cf8)" :disabled="disabled" @click="onSubmit(0)">下一步</van-button>
    </footer>
  </div>
</template>

<script>
import app from '../../assets/js/util/app';
import util from '../../assets/js/util/util';
import EventBus from '../../assets/js/util/EventBus';
import { mapState } from 'vuex'
export default {
  data() {
    return {
      agentCode: localStorage.getItem("agentCode"),
      isIos: app.isIos(),
      disabled: false,
      carList: [],//车辆照片
      num:0,//计数
      warrantyNumber:'',
      uploadFileList:[],
      orderNo:'',//订单号
      productDetail:'productDetail',//区分下单是是否分享页面还是正常页面（默认正常页面）
    }
  },
  computed: {
    ...mapState({
      phonotape: state => state.car.phonotape,
    })
  },

  created() {
    window.carInfoScanOpenAndroidCameraCallback = this.carInfoScanOpenAndroidCameraCallback;
    this.warrantyNumber = this.$route.query.warrantyNumber || '';  //投保单号
    this.orderNo = this.$route.query.orderNo || '';  //订单号
    this.productDetail = this.$route.query.objPage || 'productDetail';
  },
  methods: {
      //点击上传事件
    uploading(event){
      if(event.target.localName == 'input'){
           //安卓
        this.goGetPic()
      }
     
    }, 
    goGetPic() {
      console.log('安卓调用相册')
      app.getPhoto({ 'callbackMethod': 'carInfoScanOpenAndroidCameraCallback' })
    },
    // 摄像头回调函数
    carInfoScanOpenAndroidCameraCallback(result) {
      let code = result.code;
      if (code == 0) {
        this.afterRead('data:image/jpg;base64,' + result.object.base64Datas)
      }
    },
    async afterRead(src) {
      var fileFlow = ''
      if(!this.isIos){//安卓
        let file = util.base64to(src, Math.ceil(Math.random()*10))
        fileFlow = file
      }else{//是ios
        fileFlow = src.file
      }
      // fileFlow = await util.compressImg(fileFlow) //压缩
      if(!this.isIos){//安卓
        this.carList.push({
          'file':fileFlow,
          'content':src
        })
      }
    },
     //调用上传接口
    async goUploading(file){
      this.num ++;
      EventBus.$emit('GlobalLoadingTrigger', true);
      var formdata = new FormData();
      let uploadFileInfoStr = {
        businessNo: this.warrantyNumber,
      }
      formdata.append('uploadFileInfoStr', JSON.stringify(uploadFileInfoStr));
      formdata.append('file',file);
      this.instance.post('/applyAgent/uploadFilesNew', formdata).then((res) => {
        if (res.data.code === 0) {
          var content = res.data.content;
          if (content.code === 0) {
            var result = content.content.body;
            var resJson = JSON.parse(result);
            this.uploadFileList.push(resJson.data[0].fileUrl);
           
          }
        }
        EventBus.$emit('GlobalLoadingTrigger', false);
        if(this.num < this.carList.length){
          this.onSubmit(this.num)
        }else{
          this.updImg()
          if(this.productDetail == 'showProductDetail'){ //分享流程
            this.$router.push("wxOrderDetail?orderNo="+this.orderNo);
          }else{ //正常跳转流程
            this.$router.push(`confirmInsured?orderNo=${this.orderNo}`);
          }
          this.disabled = false;
        }
       
      }).catch(error=>{
          EventBus.$emit('GlobalLoadingTrigger', false);
          if(this.num < this.carList.length){
            this.onSubmit(this.num)
          }else{
            this.updImg()
            if(this.productDetail == 'showProductDetail'){ //分享流程
              this.$router.push("wxOrderDetail?orderNo="+this.orderNo);
            }else{ //正常跳转流程
              this.$router.push(`confirmInsured?orderNo=${this.orderNo}`);
            }
            this.disabled = false;
          }
        // this.$toast('上传失败');
      });
      

    },
    async onSubmit(carListIndex){
      if(this.carList.length < 3){
        this.$toast('请上传3张对应的图片');
        return;
      }
      this.disabled = true;
      if(carListIndex >= 0){
        this.goUploading(await util.compressImg(this.carList[carListIndex].file))
      }
    },
    async updImg() {
      const res = await this.$axios({
        url: this.$API.API_UPLOADFILESFORNFS,
        method: "post",
        data: {
          orderNo: this.orderNo, //订单号
          uploadFileList: this.uploadFileList,
        },
      });
    },
  }
}
</script>
<style lang="less">
.moreUpload {
  .gr-pdbox {
      padding: 10px;
      .upload-img {
        width: 100px;
        height: 100px;
      }
      .van-uploader__preview-image{
        width: 100px;
        height: 100px;
      }
    }
  .hint{
    font-size: 14px;
    color: #D21728;
    margin: 0;
    text-align: center;
    background: #Fff;
  }
  .footer_btn_bar{
    position: fixed;
    width: 90%;
    bottom: 2%;
    left: 5%;
  }
  .give_box{
    display: flex;
    text-align: center;
    font-size: 12px;
    background: #fff;
    padding: 0 10px;
    color: #124FC3;
    .img{
      max-width: 100%;
      height: auto;
    }
    .give_grid{
      margin: 0 10px;
    }
  }
}
</style>